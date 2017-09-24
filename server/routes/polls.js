const express = require('express');
const router = express.Router();
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
  db.collection('users').findAndModify(
    {name: req.body.owner},
    {}, // this must be here to work
    {$push: {polls: req.body}, $inc: {counter: 1}},
    {new: true},
    {upsert: true},
    (err, result) => {
      if (err) { throw err; }
      res.send(result.polls);
    },
  );
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
        console.log(poll);
        userPoll = poll;
      }
    });

    res.send(userPoll);
  });
});

//* *************ANSWER POLL***************************

router.post('/answerPollForUsers', (req, res) => {
  db = req.db;
  db.collection('users').find({name: req.body.name}).toArray((err, user) => {
    if (err) throw err;

    const userCopy = user;
    userCopy[0].polls.map((poll) => {
      if (poll.id === req.body.id) {
        poll.choices.map(((choice) => {
          if (choice.choice === req.body.answer) {
            choice.votes++;
          }
        }));
      }
    });

    db.collection('users').findAndModify(
      {name: req.body.name},
      {},
      {$set: {polls: userCopy[0].polls}},
      {new: true},
      {upsert: true},
      (err) => {
        if (err) throw err;
      },
    );
  });
});

module.exports = router;
