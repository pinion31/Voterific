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
        pollListToInsertIntoDB.push(poll._id); // adds id here
        return poll;
      }
    });

    // insert new list of ids into user.polls
    db.collection('users').findAndModify(
      {name: req.body.user.name},
      {}, // this must be here to work
      {$set: {polls: pollListToInsertIntoDB}},
      {update: true, new: true},
      (err, user) => {
        if (err) {throw err;}
        res.send({user: user.value.name, loggedIn: true, polls: newPolls}); // sends back updated array of polls to client
      });
  });
});

//* *************ADD POLL***************************

router.post('/addPoll', (req, res) => {
  db = req.db;
  db.collection('polls').insertOne(req.body.poll)
    .then((result) => {
      db.collection('users').findAndModify(
        {name: req.body.poll.owner},
        {}, // this must be here to work
        {$push: {polls: result.insertedId}}, // add _id of new poll to
        {new: true },                   // owner poll array
        (err) => {
          if (err) { throw err; }
          res.send({
            user: req.body.user.user,
            loggedIn: true,
            polls: [...req.body.user.polls, req.body.poll]
          }); // send user with polls back
        },
      );
    });
});

//* *************GET POLLS***************************

// returns all user polls
router.get('/getAllPolls', (req, res) => {
  db = req.db;
  db.collection('polls').find({}).toArray((err, polls) => {
    if (err) { throw err; }
      res.send(polls);
  });
});

//* *************ANSWER POLL***************************

// input: {user: {user:String, loggedIn: true, polls: Array },
// poll: {_id:String, question: String, choices: Array, owner: Strgin}
// output: (user with updated poll) {user: {user:String, loggedIn: true, polls: Array },
router.post('/answerPollForUsers', (req, res) => {
  db = req.db;

  const newChoices = Array.from(req.body.poll.choices);
  db.collection('polls').findAndModify(
    {_id: ObjectId(req.body.poll._id)},
    {},
    {$set:{ choices: newChoices}},
    {update: true},
    (err, poll) => {
      if (err) { throw err; }
      res.send({
        user: req.body.user.user,
        loggedIn: true,
        polls: [...req.body.user.polls]
      });
    });
});

module.exports = router;
