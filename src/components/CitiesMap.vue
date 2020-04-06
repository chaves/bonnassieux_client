<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-range-slider
                  v-model="range_slider"
                  :min="range_min"
                  :max="range_max"
                  thumb-label="always"
                  :thumb-size="thumb_size"
                  :key="slider_key"
                  class="mt-6"
          ></v-range-slider>
        </v-col>
        <v-col cols="12" md="2">
          <v-switch
                  v-model="range_bool"
                  label="fixed range ?"
                  class="ml-6"
          ></v-switch>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
                  v-if="range_bool"
                  v-model="range_fixed"
                  :items="range_items"
                  label="Range years"
                  :key="slider_key"
          ></v-select>
        </v-col>

        <v-col cols="12" md="2">
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <div id="map_container"></div>
    </v-card-text>
  </v-card>
</template>

<script>

import * as d3 from "d3";

const RANGE_MIN = 1700;
const RANGE_MAX = 1792;
const MAP_JSON = process.env.BASE_URL + 'assets/world.geojson';

export default {

  data: function () {
    return {
      features_map: {},
      dataFetched: null,
      // slider
      markers: null,
      thumb_size: 35,
      slider_key: 1, // to force update
      // svg
      svgWidth: 780,
      svgHeight: 760,
      scale: 3000,
      // ranges
      range_min: RANGE_MIN,
      range_max: RANGE_MAX,
      range_slider: [RANGE_MIN, RANGE_MAX],
      range_slider_tempo: [RANGE_MIN, RANGE_MAX],
      range_bool: false,
      range_fixed: 5,
      range_items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30],
      // map
      map_center: [2, 47],
      // domain
      domain_min: 1,
      domain_max: 1,
    }
  },
  computed: {
    translate: function () {
      return [ this.svgWidth/2.2, this.svgHeight/2.3 ];
    }
  },
  mounted () {
    this.renderMap();
  },
  watch: {
    'range_slider': 'updateMap',
    'range_bool': 'changeRangeBool',
    'range_fixed': 'changeRange'
  },
  methods: {
    makeMarkers() {
      // get data years range
      const data_filtered = this.dataFetched.filter(x => (x.year >= this.range_slider[0]) && (x.year <= this.range_slider[1]));
      // make new array with the totals by city
      const result = [];
      data_filtered.reduce(function(res, value) {
        if (!res[value.city_id]) {
          res[value.city_id] = { city_id: value.city_id, nom: '', total: 0 };
          result.push(res[value.city_id])
        }
        res[value.city_id].total += value.total;
        res[value.city_id].nom = value.nom;
        res[value.city_id].longitude = +value.longitude;
        res[value.city_id].latitude = +value.latitude;
        return res;
      }, {});

      // make markers
      this.markers = result.map(x => x = ({
        long: x.longitude,
        lat: x.latitude,
        name: x.nom,
        count: x.total
      }));
      const counts = this.markers.map(x => x.count);
      this.domain_min = Math.min(...counts);
      this.domain_max = Math.max(...counts);
    },

    makeCircles() {

      const projection = d3.geoMercator()
          .center(this.map_center)
          .scale(this.scale)
          .translate(this.translate);

      // Add a scale for bubble size
      const size = d3.scaleSqrt()
          .domain([this.domain_min,this.domain_max])  // What's in the data
          .range(this.map_center);  // Size in pixel

      // create a tooltip
      const map_container = d3.select("#map_container");

      map_container.selectAll("div").remove();

      const Tooltip = map_container
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

      // Add circles:
      const svg = d3.select("svg");
        svg.selectAll("circle").remove();
        svg.selectAll("line").remove();
        svg.selectAll("text").remove();

      const circles =
        svg.select("g")
        .selectAll("circle")
        .data(this.markers);

      circles
        .enter()
        .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", function(d){ return size(d.count) })
        .style("fill", '#402D54')
        .attr("stroke", '#402D54')
        .attr("stroke-width", 1)
        .attr("fill-opacity", .4)
        .on("mouseover", function(d) {
          Tooltip
            .style("opacity", 1)
            .html(d.name + "<br>" + "total: " + d.count)
            .style("position", "absolute")
            .style("left", (d3.mouse(this)[0]+10) + "px")
            .style("top", (d3.mouse(this)[1]) + "px");
            d3.select(this)
                    .transition()
                    .style("fill", 'red')
                    .attr("fill-opacity", 1)
        })
        .on("mouseleave", function() {
          Tooltip.style("opacity", 0);
          d3.select(this)
                  .transition()
                  .style("fill", '#402D54')
                  .attr("fill-opacity", .4)
        });

      function compare_desc(a, b) {
        let comparison = 0;
        a.count < b.count ? comparison = 1 : comparison = -1;
        return comparison;
      }

      const markers_ordered = this.markers.sort(compare_desc);

      const legend_items = [
        markers_ordered[0],
        markers_ordered[5],
      ];

      const xCircle = 50;
      const xLabel = 110;
      const yCircle = 100;
      svg
        .selectAll("legend")
        .data(legend_items)
        .enter()
        .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d){ return yCircle - size(d.count) } )
        .attr("r", function(d){ return size(d.count) })
        .style("fill", "none")
        .attr("stroke", "black");

      // Add legend: segments
      svg
        .selectAll("legend")
        .data(legend_items)
        .enter()
        .append("line")
        .attr('x1', function(d){ return xCircle + size(d.count) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return yCircle - size(d.count) } )
        .attr('y2', function(d){ return yCircle - size(d.count) } )
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'));
      // Add legend: labels
      svg
        .selectAll("legend")
        .data(legend_items)
        .enter()
        .append("text")
        .attr('x', xLabel)
        .attr('y', function(d){ return yCircle - size(d.count) } )
        .text( function(d){ return d.count + ' : ' + d.name.toLowerCase() } )
        .style("font-size", 14)
        .attr('alignment-baseline', 'middle');

    },
    renderMap() {
      const projection = d3.geoMercator()
              .center(this.map_center)
              .scale(this.scale)
              .translate(this.translate);

      // Le svg
      const svg = d3.select("#map_container")
        .append("svg")
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight);

      // Draw the map
      d3.json(MAP_JSON).then(function (data) {
        data.features = data.features.filter( function(d){return d.properties.name=="France"} );
        
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "#b8b8b8")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "black")
            .style("opacity", .3);
      });

      fetch(process.env.VUE_APP_API_URL+ 'cities/map')
        .then(res => res.json())
        .then(res => {
          this.dataFetched = res;
          this.makeMarkers();
          this.makeCircles();
        }).catch(err => {
          console.log(err)
        });
    },

    updateMap() {
      this.updateRange();
      this.makeMarkers();
      this.makeCircles();
      this.range_slider_tempo = this.range_slider;
    },

    changeRange() {
      this.range_slider[1] = this.range_slider[0] + this.range_fixed;
      this.slider_key +=1; // to force update
      this.updateMap();
    },

    changeRangeBool() {
      if(this.range_bool) {
        this.range_slider[0] = this.range_min;
        this.range_slider[1] = this.range_slider[0] + this.range_fixed;
        this.slider_key +=1; // to force update
        this.updateMap();
      }
    },

    updateRange() {
      if(this.range_bool) {
        // bouton max actionné
        if(this.range_slider[1] !== this.range_slider_tempo[1]) {
          if (this.range_slider[1] - this.range_fixed >= this.range_min) {
            this.range_slider[0] = this.range_slider[1] - this.range_fixed;
          }
        }
        // bouton min actionné
        if(this.range_slider[0] !== this.range_slider_tempo[0]) {
          if (this.range_slider[0] + this.range_fixed <= this.range_max) {
            this.range_slider[1] = this.range_slider[0] + this.range_fixed;
          }
        }
      }
    }
  }
}
</script>

<style>

</style>