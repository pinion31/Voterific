import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {HOST} from '../constants/actionTypes';
import {POLL_LOCATION} from '../constants/messages';

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
            <h1 className="pollLinkText"> {POLL_LOCATION} </h1>
            <Link to={`/poll/${this.props.id}`}>
              <h2 className="pollLink"> {`${HOST}${this.props.id}`} </h2>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

PollLink.propTypes = {
  link: React.PropTypes.string,
};

export default connect(mapStateToProps, null) (PollLink);
