import React,{Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import PollCreator from './PollCreator';
import UserPolls from './UserPolls';
import {WELCOME_QUERY} from '../constants/messages';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userContent: '',
    };

    this.routeToNewPoll = this.routeToNewPoll.bind(this);
    this.routeToExistingPolls = this.routeToExistingPolls.bind(this);
  }

  routeToNewPoll() {
    this.setState({
      userContent: <PollCreator route={this.routeToExistingPolls} />,
    });
  }

  routeToExistingPolls() {
    this.setState({
      userContent: <UserPolls />,
    });
  }

  render() {
    return (
      <div>
        <div className="dashBoard">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className="subtitleLogin">{WELCOME_QUERY}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdOffset={4} sm={6} smOffset={3} xs={5} xsOffset={3} lg={6} lgOffset={4}>
              <Button className="dashBoardButton" bsStyle="danger" onClick={this.routeToNewPoll}>Create New Poll</Button>
              <Button className="dashBoardButton" bsStyle="danger" onClick={this.routeToExistingPolls}>My Polls</Button>
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
};

export default Dashboard;

