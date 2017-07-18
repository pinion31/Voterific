import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import 'whatwg-fetch';
import BarChart from './BarChart.jsx';

class PollResults extends Component {

  constructor(props) {
    super(props);
    this.state= {
      poll:{questions:"", choices:[{choice:"1",votes:"1"}]},
    }
    this.retrievePollData = this.retrievePollData.bind(this);
  }

  componentDidMount() {
    this.retrievePollData();
  }

  getChart() {
    /*
    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const y = d3.scaleLinear()
      .range([height,0])
      .domain([0,10]);

    const x = d3.scaleTime()
      .range([0,width])
      .domain([0,10]);

    const chart = d3.select('svg')
      .attr('width', width)
      .attr('height', height);

    const xAxis = d3.axisBottom()
      .scale(x);

    const yAxis = d3.axisLeft()
      .scale(y)

    const barWidth = 2;

    const div = d3.select('body').append('div')
      .style("opacity", 0);

    const bar = chart.selectAll('g')
      .data([1,2,3,4,5,6,7])
      .enter().append('g')
      .attr('transform', (d,i) => "translate(" + (i * barWidth - margin.left + 80) + "," + margin.top + ")");

    bar.append('rect')
      .attr('y', d => y(d[1]) )
      .attr('height', d => height - y(d[1]))
      .attr('width', barWidth)

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
      .call(xAxis);

    //add y Axis to chart
    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis);
*/

  }
  retrievePollData() {
     fetch(`/poll/${this.props.match.params.name}/${this.props.match.params.id}`)
    .then(result => {
      result.json().then(poll => {
        this.setState({
          poll:poll[0],
        });
      });
    }).
    catch(err => {
      if (err){return err};
    });
  }

  render() {
    return (
      <div>
      <h1 className="results"> Results</h1>
      <h2 className="resultQuestion"> {this.state.poll.question} </h2>
      <BarChart title={this.state.poll.question} data={this.state.poll.choices} />
      </div>
    );
    //400  100
  }

}

export default PollResults

/*

render() {
    return (
      <div>
      <h1> results</h1>
      <h2> {this.state.poll.question} </h2>
      {this.state.poll.choices.map((ch, key)=> {
         return <div key={key}>
            <p>{ch.choice}</p>
            <p>{ch.votes}</p>
          </div>
        })
      }
      </div>
    );

  }
*/