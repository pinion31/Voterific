import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
            <Link to={`/poll/${this.props.id}`}>
              <h2 className="pollLink"> {`${HOST}${this.props.id}`} </h2>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
/*
render() {
      console.log(`${HOST}${this.props.id}`);
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className="pollLinkText"> {'Your new poll can be found at:'} </h1>
            <Link to={`/poll/${this.props.id}`}>test</Link>
          </Col>
        </Row>
      </div>
    );
  }
}*/

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

PollLink.propTypes = {
  link: React.PropTypes.string,
};

export default connect(mapStateToProps, null) (PollLink);
