import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import {axisBottom, axisLeft} from 'd3-axis';

class BarChart extends Component {
   constructor(props){
      super(props)
      this.state = {
         data: this.props.data
      }
      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount() {
      //this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }

   createBarChart() {
      const node = this.node
      console.log('data is ' + this.props.data);
      const yScale = scaleLinear()
         .domain([0, max(this.props.data)])
         .range([0, this.props.size[1]])

      const newScale = scaleLinear()
         .domain([0, max(this.props.data)])
         .range([this.props.size[1],0])

      const margin = {top: 20, right: 30, bottom: 30, left: 40};
      const width = ((window.innerWidth/4) * 2) - margin.left - margin.right;
      const height = 300- margin.top - margin.bottom;
      const gapBetweenBars = 50;

      const yAxis = axisLeft()
         .scale(newScale)
         .ticks(5)

     select(node)
         .attr('width', width + margin.left + margin.right)
         .attr('height', height + margin.top + margin.bottom)

      select(node)
         .selectAll('foo')
         .data(this.props.data)
         .enter()
         .append('rect')
         .style('fill', '#8FB8F2')
         .attr('y',d => this.props.size[1] - yScale(d))
         .attr('x', (d,i) => (i * (width/this.props.data.length) + gapBetweenBars))
         .attr('height', d => yScale(d))
         .attr('width', (width/this.props.data.length) * .75)

      select(node)
         .selectAll('text')
         .data(this.props.choices)
         .enter()
         .append('text')
         .text(d => d)
         .attr('x', (d,i) => (i * (width/this.props.data.length) + gapBetweenBars) + (((width/this.props.data.length) * .65)/2))
         .attr('y', (d,i) => 275)
         .style('font-weight', 'bold')
         .exit()
         .remove()


      select(node)
         //.selectAll('g')
         .append('g')
         .attr("transform", "translate(25)")
         .call(yAxis)




   }

render() {
      return <svg className="barChart" ref={node => this.node = node}
      width={(window.innerWidth/4) * 2} height={300}>
      </svg>
   }
}
export default BarChart