const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
let db;

// input: {id: String, user:{user:String, polls: Array, loggedIn: Boolean }}
// output: polls:[] (newPolls minus deletedPoll)
router.post('/deletePollForUsers', (req, res) => {
  db = req.db;
  db.collection('polls').deleteOne({_id: ObjectId(req.body.id)}, () => {

    let newPolls = req.body.user.polls;
    const pollListToInsertIntoDB = [];

    // simultaneously created updated array of _ids to insert into user db
    // and creates new array of polls to send back to client
    newPolls = newPolls.filter((poll) => {
      if (poll._id !== req.body.id) {
        pollListToInsertIntoDB.push(poll._id);  // adds id here
        return poll;
      }
    });

    // insert new list of ids into user.polls
    db.collection('users').findAndModify(
      {name: req.body.user.user},
      {}, // this must be here to work
      {$set: {polls: pollListToInsertIntoDB}},
      {update: true},
      (err, poll) => {
        if (err) {throw err;}
        console.log('polls 33', newPolls);
        res.send(newPolls); // sends back updated array of polls to client
      });
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
