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
          <v-text-field
              v-if="range_bool"
              label="Range years"
              v-model="range_fixed"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2">
          <v-text-field
              label="circle ratio"
              v-model="circle_ratio"
          ></v-text-field>
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

export default {

  data: function () {
    return {
      features_map: {},
      dataFetched: null,
      // slider
      markers: null,
      thumb_size: 35,
      // svg
      svgWidth: 780,
      svgHeight: 760,
      scale: 3000,
      // ranges
      range_min: RANGE_MIN,
      range_max: RANGE_MAX,
      range_slider: [RANGE_MIN, RANGE_MAX],
      range_bool: false,
      range_fixed:20,
      // circles
      circle_ratio:10,
      // map
      map_center: [2, 47]
    }
  },
  mounted () {
    this.renderMap();
  },
  watch: {
    'range_slider': 'updateMap',
    'range_bool': 'updateMap',
    'circle_ratio': 'updateMap',
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
        count: x.total,
        size: x.total / this.circle_ratio
      }));
    },

    makeCircles() {

      const projection = d3.geoMercator()
          .center(this.map_center)
          .scale(this.scale)
          .translate([ this.svgWidth/2.2, this.svgHeight/2.3 ]);

      // Add a scale for bubble size
      const size = d3.scaleLinear()
          .domain([1,100])  // What's in the data
          .range([ 4, 50]);  // Size in pixel

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

        // Three function that change the tooltip when user hover / move / leave a cell
        const mouseover = function() {
            Tooltip.style("opacity", 1);
          };
        const mousemove = function(d) {
            Tooltip
              .html(d.name + "<br>" + "total: " + d.count)
              .style("position", "absolute")
              .style("left", (d3.mouse(this)[0]+10) + "px")
              .style("top", (d3.mouse(this)[1]) + "px");
          };
        const mouseleave = function() {
            Tooltip.style("opacity", 0)
          };

        // Add circles:
        const svg = d3.select("svg");
          svg.selectAll("circle").remove();

        const circles = svg.select("g")
            .selectAll("circle")
            .data(this.markers);

        circles.enter()
            .append("circle")
            .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
            .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
            .attr("r", function(d){ return size(d.size) })
            .style("fill", '#402D54')
            .attr("stroke", '#402D54')
            .attr("stroke-width", 1)
            .attr("fill-opacity", .4)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

    },
    renderMap() {

      let projection = d3.geoMercator()
          .center([2, 47])
          .scale(this.scale)
          .translate([ this.svgWidth/2.2, this.svgHeight/2.3 ]);

      // Le svg
      let svg = d3.select("#map_container")
        .append("svg")
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight);

      // Draw the map
      d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (data) {
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
    },
    updateRange() {
      if(this.range_bool) {
        if (this.range_slider[1] - this.range_fixed >= this.range_min) {
          this.range_slider[0] = this.range_slider[1] - this.range_fixed;
        }
      }
    }
  }
}
</script>

<style>

</style>