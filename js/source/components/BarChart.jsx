

//import Chart from 'react-d3-core'.Chart;
//import LineChart from 'react-d3-basic'.BarChart;
import React, { Component } from 'react';
var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;



class BarChart extends Component {

    constructor(props) {
      super(props);
      this.state = {
        title: this.props.title,
        data: this.props.data,
      }
    }

    render() {
      var width = (window.innerWidth/4) * 2,
        height = 300,
        margins = {left: 100, right: 100, top: 50, bottom: 50},
        title = this.props.title,
        // chart series,
        // field: is what field your data want to be selected
        // name: the name of the field that display in legend
        // color: what color is the line
        chartSeries = {
           field: 'BMI',
           name: 'BMI',
           color: '#ff7f0e'

        },
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
        <LineChart
          showXGrid= {false}
          showYGrid= {false}
          margins= {margins}
          title={title}
          data={this.props.data}
          width={width}
          height={height}
          chartSeries={chartSeries}
          x={x}
        />
      </Chart>
    }

}
export default BarChart