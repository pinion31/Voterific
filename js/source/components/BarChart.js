import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import {axisBottom, axisLeft} from 'd3-axis';

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount() {
      this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }

   createBarChart() {
      const node = this.node
      const dataMax = max(this.props.data)
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])

      let barHeight = 0;

     const yAxis = axisLeft()
      .scale(yScale)
      .ticks(1);

   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')


   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#8FB8F2')
      //.attr('x', (d,i) => (i * 75) + 125)
      .attr('x', (d,i) => ((window.innerWidth/(this.props.data.length * 2)) * i) + 25  )
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', window.innerWidth/(this.props.data.length*2.5))

   select(node)
      .selectAll('g')
      .data(this.props.data)
      .enter()
      .append('text')



   select(node)
      .selectAll('g')
      .data(this.props.choices)
      .exit()
      .remove()


   select(node)
      .selectAll('text')
      .data(this.props.choices)
      .text(d => d)
      .attr('x', (d,i) =>
         (((window.innerWidth/(this.props.data.length * 2)) * i) + 5)
          + ((window.innerWidth/(this.props.data.length*2.5))/2)  )
      .attr('y', 290)


/*
 select(node)
      .selectAll('g')
      .data(this.props.data)
      .enter()
      .append('g')


   select(node)
      .selectAll('g')
      .data(this.props.data)
      .call(yAxis)
      .exit()
      .remove()*/

/*
   select(node)
      .append('g')
     // .attr('transform',`translate(35,0)`)
      .call(yAxis);*/
   }

render() {
      return <svg className="barChart" ref={node => this.node = node}
      width={(window.innerWidth/4) * 2} height={300}>
      </svg>
   }
}
export default BarChart