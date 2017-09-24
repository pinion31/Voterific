'use strict';

var express = require('express');
var router = express.Router();
var db = void 0;

router.post('/deletePollForUsers', function (req, res) {
  db = res.db;

  db.collection('users').find({ name: req.body.name }).toArray(function (err, user) {
    if (err) return err;
    var userCopy = user;

    userCopy[0].polls = userCopy[0].polls.filter(function (poll) {
      if (poll.id !== req.body.id) {
        return poll;
      }
    });

    db.collection('users').findAndModify({ name: req.body.name }, {}, { $set: { polls: userCopy[0].polls } }, { new: true }, { upsert: true }, function (err, result) {
      if (err) return err;
      res.send(result);
    });
  });
});

// delete polls from collective list
router.post('/deletePollForAll', function (req) {
  db = res.db;
  db.collection('polls').deleteOne({ id: req.body.id.toString(), owner: req.body.name }, function (err) {
    if (err) {
      return err;
    }
  });
});

//* *************ADD POLL***************************

router.post('/addPoll', function (req, res) {
  db = res.db;
  db.collection('users').findAndModify({ name: req.body.owner }, {}, // this must be here to work
  { $push: { polls: req.body }, $inc: { counter: 1 } }, { upsert: true }, function (err, result) {
    if (err) {
      return err;
    }
    res.send(result);
  });
});

// adds polls to collective list
router.post('/addPollToAll', function (req, res) {
  db = res.db;
  db.collection('polls').insertOne(req.body, function (err, result) {
    if (err) {
      return err;
    }
    res.send(result);
  });
});

//* *************GET POLLS***************************

// returns all user polls
router.get('/getAllPolls', function (req, res) {
  db = res.db;
  db.collection('polls').find({}).toArray(function (err, result) {
    if (err) {
      return err;
    }
    res.send(result);
  });
});

router.get('/:name/:id', function (req, res) {
  db = res.db;
  db.collection('polls').find({ owner: req.params.name, id: req.params.id }).toArray(function (err, result) {
    if (err) {
      return err;
    }
    res.send(result);
  });
});

//* *************ANSWER POLL***************************

router.post('/answerPollForUsers', function (req) {
  db = res.db;
  db.collection('users').find({ name: req.body.name }).toArray(function (err, user) {
    if (err) return err;

    var userCopy = user;
    userCopy[0].polls.map(function (poll) {
      if (poll.id === req.body.id) {
        poll.choices.map(function (choice) {
          if (choice.choice === req.body.answer) {
            choice.votes++;
          }
        });
      }
    });

    db.collection('users').findAndModify({ name: req.body.name }, {}, { $set: { polls: userCopy[0].polls } }, { new: true }, { upsert: true }, function (err) {
      if (err) return err;
    });
  });
});

router.post('/answerPollForAll', function (req, res) {
  db = res.db;
  db.collection('polls').find({ 'choices.choice': req.body.answer }).toArray(function (err, result) {
    if (err) return err;
    var poll = result;

    poll[0].choices.map(function (answer) {
      if (answer.choice === req.body.answer) {
        answer.votes++;
      }
    });

    db.collection('polls').findAndModify({ 'choices.choice': req.body.answer }, {}, { $set: { choices: poll[0].choices } }, { new: true }, { upsert: true }, function (err, result2) {
      if (err) {
        throw err;
      }
      res.send(result2);
    });
  });
});

module.exports = router;
//# sourceMappingURL=polls.js.map