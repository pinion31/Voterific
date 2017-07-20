import React from 'react';
import {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {HOST} from '../constants/actionTypes';

class PollLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: '',
    };
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className="pollLinkText"> {'Your new poll can be found at:'} </h1>
            <a href={`${HOST}${this.props.link.substring(5)}`}>
              <h2 className="pollLink"> {`${HOST}${this.props.link.substring(5)}`} </h2>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

PollLink.propTypes = {
  link: React.PropTypes.string,
};

export default PollLink;
