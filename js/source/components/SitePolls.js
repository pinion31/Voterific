import React from 'react';
import {Component} from 'react';
import 'whatwg-fetch';
import {Row, Col} from 'react-bootstrap';

class SitePolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: [],
    };

    this.loadAllPolls = this.loadAllPolls.bind(this);
  }

  componentDidMount() {
    this.loadAllPolls();
  }

  loadAllPolls() {
    fetch('/polls/getAllPolls')
      .then((response) => {
        response.json().then((poll) => {
          this.setState({
            poll,
          });
        });
      }).catch(err => `Error in getting polls from server:${err.message}`);
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
            {this.state.poll.map((result, key) => (
              <div
                key={key}
                className="sitePollsLinkText"
                onClick={() => { this.props.history.push(`/poll/${result.owner}/${result.id}`); }}
              >
                <div className="pollContainer" key={key}>{result.question}</div>
              </div>
            ))
            }
          </Col>
        </Row>
      </div>
    );
  }
}

SitePolls.propTypes = {
  poll: React.PropTypes.any,
};

export default SitePolls;
