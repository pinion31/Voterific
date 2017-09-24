const express = require('express');
const router = express.Router();
let db;


router.post('/deletePollForUsers', (req, res) => {
  db = res.db;

  db.collection('users').find({name: req.body.name})
    .toArray((err, user) => {
      if (err) return err;
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
          if (err) return err;
          res.send(result);
        },
      );
    });
});

// delete polls from collective list
router.post('/deletePollForAll', (req) => {
  db = res.db;
  db.collection('polls').deleteOne(
    {id: req.body.id.toString(), owner: req.body.name},
    (err) => {
      if (err) { return err; }
    },
  );
});

//* *************ADD POLL***************************

router.post('/addPoll', (req, res) => {
  db = res.db;
  db.collection('users').findAndModify(
    {name: req.body.owner},
    {}, // this must be here to work
    {$push: {polls: req.body}, $inc: {counter: 1}},
    {upsert: true},
    (err, result) => {
      if (err) { return err; }
      res.send(result);
    },
  );
});

// adds polls to collective list
router.post('/addPollToAll', (req, res) => {
  db = res.db;
  db.collection('polls').insertOne(
    req.body,
    (err, result) => {
      if (err) { return err; }
      res.send(result);
    },
  );
});

//* *************GET POLLS***************************

// returns all user polls
router.get('/getAllPolls', (req, res) => {
  db = res.db;
  db.collection('polls').find({}).toArray((err, result) => {
    if (err) { return err; }
    res.send(result);
  });
});

router.get('/:name/:id', (req, res) => {
  db = res.db;
  db.collection('polls').find({owner: req.params.name, id: req.params.id}).toArray((err, result) => {
    if (err) { return err; }
    res.send(result);
  });
});

//* *************ANSWER POLL***************************

router.post('/answerPollForUsers', (req) => {
  db = res.db;
  db.collection('users').find({name: req.body.name}).toArray((err, user) => {
    if (err) return err;

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
        if (err) return err;
      },
    );
  });
});

router.post('/answerPollForAll', (req, res) => {
  db = res.db;
  db.collection('polls').find(
    {'choices.choice': req.body.answer})
    .toArray(
      (err, result) => {
        if (err) return err;
        const poll = result;

        poll[0].choices.map((answer) => {
          if (answer.choice === req.body.answer) {
            answer.votes++;
          }
        });

        db.collection('polls').findAndModify(
          {'choices.choice': req.body.answer},
          {},
          {$set: {choices: poll[0].choices}},
          {new: true},
          {upsert: true},
          (err, result2) => {
            if (err) { throw err; }
            res.send(result2);
          },
        );
      },
    );
});

module.exports = router;