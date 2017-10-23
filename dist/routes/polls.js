'use strict';

var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var db = void 0;

router.post('/deletePollForUsers', function (req, res) {
  db = req.db;

  db.collection('users').find({ name: req.body.name }).toArray(function (err, user) {
    if (err) throw err;
    var userCopy = user;

    userCopy[0].polls = userCopy[0].polls.filter(function (poll) {
      if (poll.id !== req.body.id) {
        return poll;
      }
    });

    db.collection('users').findAndModify({ name: req.body.name }, {}, { $set: { polls: userCopy[0].polls } }, { new: true }, { upsert: true }, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

//* *************ADD POLL***************************

router.post('/addPoll', function (req, res) {
  db = req.db;
  db.collection('polls').insertOne(req.body).then(function (result) {
    db.collection('users').findAndModify({ name: req.body.owner }, {}, // this must be here to work
    { $push: { polls: result.insertedId } }, // add _id of new poll to
    { upsert: true }, // owner poll array
    function (err, response) {
      if (err) {
        throw err;
      }
      res.send(req.body); //send poll back
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

router.get('/:name/:id', function (req, res) {
  db = req.db;
  var userPoll = {};

  db.collection('users').find({ name: req.params.name }).toArray(function (err, user) {
    if (err) {
      throw err;
    }

    user[0].polls.forEach(function (poll) {
      if (poll.id.toString() === req.params.id.toString()) {
        userPoll = poll;
      }
    });

    res.send(userPoll);
  });
});

//* *************ANSWER POLL***************************

// input: {question: String, choices:Array, _id:String, owner:String }
// output: updated poll ({question: String, choices:Array, _id:String, owner:String })
router.post('/answerPollForUsers', function (req, res) {
  db = req.db;
  var newChoices = Array.from(req.body.choices);
  db.collection('polls').findAndModify({ _id: ObjectId(req.body._id) }, {}, { $set: { choices: newChoices } }, { update: true }, function (err, poll) {
    if (err) {
      throw err;
    }
    res.send(poll);
  });
});

module.exports = router;
//# sourceMappingURL=polls.js.map