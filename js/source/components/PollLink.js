import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class PollLink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      link:"",
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
             <h1 className="pollLinkText"> {`Your new poll can be found at:`} </h1>
             <a href={`http://localhost:8080/#/${this.props.link}`}>
             <h2 className="pollLink"> {`http://localhost:8080/#/${this.props.link}`} </h2>
             </a>
          </Col>
        </Row>
    </div>
    );
  }



}

export default PollLink