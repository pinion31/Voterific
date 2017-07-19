import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import PollCreator from './PollCreator';
import UserPolls from './UserPolls';
import PollLink from './PollLink';
import { Row, Col, Button } from 'react-bootstrap';


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userContent: "",
      returnLink: this.returnPollLink.bind(this),

    };
  }

  _routeToNewPoll() {
      this.setState({
        userContent:<PollCreator returnLink= {this.state.returnLink} />,
        });
  }

  _routeToExistingPolls() {
      this.setState({
        userContent:<UserPolls/>,
      });
  }

  //returns link to user poll
  returnPollLink(link="temp") {
      this.setState({
        userContent:<PollLink link={link} />,
      });
  }

  render() {
    return (
       <div>
        <div className="dashBoard">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className="subtitleLogin"> What would you like to do today?</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdOffset={4} sm={6}  smOffset={4} xs={6}  xsOffset={4} lg={6} lgOffset={4}>
              <Button className="dashBoardButton" bsStyle="danger" onClick={this._routeToNewPoll.bind(this)}> Create New Poll </Button>
              <Button className="dashBoardButton" bsStyle="danger" onClick={this._routeToExistingPolls.bind(this)}> My Polls </Button>
            </Col>
          </Row>
       </div>
       {this.state.userContent}

       </div>

    );
  }

}

Dashboard.propTypes = {
  userContent: React.PropTypes.any,
  returnLink: React.PropTypes.func,
}

export default Dashboard

