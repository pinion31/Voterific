import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import {axisBottom, axisLeft} from 'd3-axis';
//import Chart from 'react-d3-core'.Chart;
//import LineChart from 'react-d3-basic'.BarChart;

var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;

const BarChart = (title, data) => {
 var width = (window.innerWidth/4) * 2,
    height = 300,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    title = title,
    // chart series,
    // field: is what field your data want to be selected
    // name: the name of the field that display in legend
    // color: what color is the line
    chartSeries = data,
    // your x accessor
    x = function(d) {
      return d.index;
    }

    return  <Chart
      title={title}
      width={width}
      height={height}
      margins= {margins}
      >
      <BarChart
        showXGrid= {false}
        showYGrid= {false}
        margins= {margins}
        title={title}
        data={chartData}
        width={width}
        height={height}
        chartSeries={chartSeries}
        x={x}
      />
    </Chart>

}
export default BarChart