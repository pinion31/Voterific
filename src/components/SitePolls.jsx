import React from 'react';
import {Component} from 'react';
import 'whatwg-fetch';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getAllPolls} from '../actions/pollActions';
import {NO_POLLS} from '../constants/messages';

class SitePolls extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllPolls();
  }

  shouldComponentUpdate(newProps) {
    let componentShouldUpdate = false;

    if (this.props.polls.length !== newProps.polls.length) {
      return true;
    }

    this.props.polls.map((poll, key) => {
      if (poll._id !== newProps.polls[key]._id) {
        componentShouldUpdate = true;
      }
    });

    return componentShouldUpdate;
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h1 className="homePageTitle">Latest Polls</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={8} xsOffset={2} sm={8} smOffset={2} md={8} mdOffset={2} lg={8} lgOffset={2} >
            {this.props.polls ? (
              this.props.polls.map(poll => (
                <div key={poll._id} className="sitePollsLinkText">
                  <Link to={`/poll/${poll._id}`} key={poll._id} className="sitePollsLinkText">
                    <div className="pollContainer">{poll.question}</div>
                  </Link>
                </div>
              ))
            ) : <div>{NO_POLLS}</div>
            }
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    polls: state.polls[0],
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllPolls
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SitePolls);
