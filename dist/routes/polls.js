'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var db = void 0;

// input: {id: String, user:{user:String, polls: Array, loggedIn: Boolean }}
// output: polls:[] (newPolls minus deletedPoll)
router.post('/deletePollForUsers', function (req, res) {
  db = req.db;
  db.collection('polls').deleteOne({ _id: ObjectId(req.body.id) }, function () {

    var newPolls = req.body.user.polls;
    var pollListToInsertIntoDB = [];

    // simultaneously created updated array of _ids to insert into user db
    // and creates new array of polls to send back to client
    newPolls = newPolls.filter(function (poll) {
      if (poll._id !== req.body.id) {
        pollListToInsertIntoDB.push(poll._id); // adds id here
        return poll;
      }
    });

    // insert new list of ids into user.polls
    db.collection('users').findAndModify({ name: req.body.user.name }, {}, // this must be here to work
    { $set: { polls: pollListToInsertIntoDB } }, { update: true, new: true }, function (err, user) {
      if (err) {
        throw err;
      }
      res.send({ user: user.value.name, loggedIn: true, polls: newPolls }); // sends back updated array of polls to client
    });
  });
});

//* *************ADD POLL***************************

router.post('/addPoll', function (req, res) {
  db = req.db;
  db.collection('polls').insertOne(req.body.poll).then(function (result) {
    db.collection('users').findAndModify({ name: req.body.poll.owner }, {}, // this must be here to work
    { $push: { polls: result.insertedId } }, // add _id of new poll to
    { new: true }, // owner poll array
    function (err, response) {
      if (err) {
        throw err;
      }
      res.send({
        user: req.body.user.user,
        loggedIn: true,
        polls: [].concat(_toConsumableArray(req.body.user.polls), [req.body.poll])
      }); // send user with polls back
    });
  });
});

//* *************GET POLLS***************************

// returns all user polls
router.get('/getAllPolls', function (req, res) {
  db = req.db;
  var polls = [];
  db.collection('users').find({}).toArray(function (err, users) {
    if (err) {
      throw err;
    }

    users.forEach(function (user) {
      polls = polls.concat(user.polls);
    });

    res.send(polls);
  });
});

//* *************ANSWER POLL***************************

// input: {user: {user:String, loggedIn: true, polls: Array },
// poll: {_id:String, question: String, choices: Array, owner: Strgin}
// output: (user with updated poll) {user: {user:String, loggedIn: true, polls: Array },
router.post('/answerPollForUsers', function (req, res) {
  db = req.db;

  var newChoices = Array.from(req.body.poll.choices);
  db.collection('polls').findAndModify({ _id: ObjectId(req.body.poll._id) }, {}, { $set: { choices: newChoices } }, { update: true }, function (err, poll) {
    if (err) {
      throw err;
    }
    res.send({
      user: req.body.user.user,
      loggedIn: true,
      polls: [].concat(_toConsumableArray(req.body.user.polls))
    });
  });
});

module.exports = router;
//# sourceMappingURL=polls.js.map