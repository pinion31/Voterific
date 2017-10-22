import React, {Component} from 'react';
import {Row, Button, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class PollContainer extends Component {
  render() {
    return (
      <div >
        <Row>
          <div className="questionContainer">
            <Link to={`/poll/${this.props.poll._id}`}>
              <div className="pollContainer">
                {this.props.poll.question}
              </div>
            </Link>
            <Button className="dashBoardButton deletePollButton" bsStyle="danger" onClick={() => { this.deleteAPoll(poll.id, poll.owner); }}>{'Delete  '}<Glyphicon className="trash" glyph="trash" /> </Button>
          </div>
        </Row>
      </div>
    );
  }
}

export default PollContainer;
