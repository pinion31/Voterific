import React, {Component} from 'react';
import {Row, Button, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
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
            <Button
              className="dashBoardButton deletePollButton"
              bsStyle="danger"
              onClick={() => { this.props.deletePoll(this.props.poll._id, this.props.user); }}>{'Delete  '}
              <Glyphicon className="trash" glyph="trash" />
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps, null) (PollContainer);
