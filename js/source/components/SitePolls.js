import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import 'whatwg-fetch';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class SitePolls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      poll:[],
    }

    this.loadAllPolls = this.loadAllPolls.bind(this);
  }

  componentDidMount() {
    this.loadAllPolls();

  }

  loadAllPolls() {
    fetch('/getAllPolls')
    .then((response) => {
      response.json().then(poll => {
        this.setState({
          poll,
        });
      })
    }).catch(err => {
      console.log('Error in getting polls from server:' + err.message);
    });


  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h1 className="homePageTitle">Latest Polls </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={8} xsOffset={2} sm={8} smOffset={2} md={8} mdOffset={2} lg={8} lgOffset={2} >
            {this.state.poll.map((result,key) => {
              return(
                  <div key={key} className="sitePollsLinkText">
                    <a href={`http://localhost:8080/#/poll/${result.owner}/${result.id}`} key={key}>
                      <div className="pollContainer" key={key}>{result.question}</div>
                    </a>
                  </div>
                );
              })
            }
          </Col>
        </Row>
      </div>
    );
  }

}

export default SitePolls