const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
let db;

router.post('/deletePollForUsers', (req, res) => {
  db = req.db;

  db.collection('users').find({name: req.body.name})
    .toArray((err, user) => {
      if (err) throw err;
      const userCopy = user;

      userCopy[0].polls = userCopy[0].polls.filter((poll) => {
        if (poll.id !== req.body.id) {
          return poll;
        }
      });

      db.collection('users').findAndModify(
        {name: req.body.name},
        {},
        {$set: {polls: userCopy[0].polls}},
        {new: true},
        {upsert: true},
        (err, result) => {
          if (err) throw err;
          res.send(result);
        },
      );
    });
});

//* *************ADD POLL***************************

router.post('/addPoll', (req, res) => {
  db = req.db;
  db.collection('polls').insertOne(req.body)
    .then((result) => {
       db.collection('users').findAndModify(
        {name: req.body.owner},
        {}, // this must be here to work
        {$push: {polls: result.insertedId}}, // add _id of new poll to
        {upsert: true},                   // owner poll array
        (err, response) => {
          if (err) { throw err; }
          res.send(req.body); //send poll back
        },
        );
    });
});

//* *************GET POLLS***************************

// returns all user polls
router.get('/getAllPolls', (req, res) => {
  db = req.db;
  let polls = [];
  db.collection('users').find({}).toArray((err, users) => {
    if (err) { throw err; }

    users.forEach((user) => {
      polls = polls.concat(user.polls);
    });

    res.send(polls);
  });
});

router.get('/:name/:id', (req, res) => {
  db = req.db;
  let userPoll = {};

  db.collection('users').find({name: req.params.name}).toArray((err, user) => {
    if (err) { throw err; }

    user[0].polls.forEach((poll) => {
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
router.post('/answerPollForUsers', (req, res) => {
  db = req.db;
  const newChoices = Array.from(req.body.choices);
  db.collection('polls').findAndModify(
    {_id: ObjectId(req.body._id)},
    {},
    {$set:{ choices: newChoices}},
    {update: true},
    (err, poll) => {
      if (err) { throw err; }
      res.send(poll);
    });
});

module.exports = router;
