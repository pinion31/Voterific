'use strict';

require('babel-polyfill');

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport2.default.install();

// const dbUrl = 'mongodb://localhost/local'; // local db
// 'use strict'
var dbUrl = process.env.MONGOLAB_URI; // production db

_mongodb.MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    return err;
  }

  var app = (0, _express2.default)();

  app.use(_express2.default.static('static'));
  app.use(_bodyParser2.default.json());

  //* **************ADD NEW USER********************
  app.post('/addUser', function (req, res) {
    db.collection('users').find({ name: req.body.name }).toArray(function (err, user) {
      if (err) return err;
      if (user.length > 0) {
        res.status(400).send(false);
      } else {
        db.collection('users').insertOne(req.body, function () {
          res.status(201).send(true);
        });
      }
    });
  });

  //* *************DELETE POLL***************************
  app.post('/deletePollForUsers', function (req, res) {
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
  app.post('/deletePollForAll', function (req) {
    db.collection('polls').deleteOne({ id: req.body.id.toString(), owner: req.body.name }, function (err) {
      if (err) {
        return err;
      }
    });
  });

  //* *************ADD POLL***************************

  app.post('/addPoll', function (req, res) {
    db.collection('users').findAndModify({ name: req.body.owner }, {}, // this must be here to work
    { $push: { polls: req.body }, $inc: { counter: 1 } }, { upsert: true }, function (err, result) {
      if (err) {
        return err;
      }
      res.send(result);
    });
  });

  // adds polls to collective list
  app.post('/addPollToAll', function (req, res) {
    db.collection('polls').insertOne(req.body, function (err, result) {
      if (err) {
        return err;
      }
      res.send(result);
    });
  });

  //* *************GET POLLS***************************

  // returns all user polls
  app.get('/getAllPolls', function (req, res) {
    db.collection('polls').find({}).toArray(function (err, result) {
      if (err) {
        return err;
      }
      res.send(result);
    });
  });

  app.get('/poll/:name/:id', function (req, res) {
    db.collection('polls').find({ owner: req.params.name, id: req.params.id }).toArray(function (err, result) {
      if (err) {
        return err;
      }
      res.send(result);
    });
  });

  //* *************ANSWER POLL***************************

  app.post('/answerPollForUsers', function (req) {
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

  app.post('/answerPollForAll', function (req, res) {
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
          console.dir(err);
        }
        res.send(result2);
      });
    });
  });

  //* *************LOG OUT***************************

  app.post('/logOut', function (req, res) {
    db.collection('users').findAndModify({ name: req.body.name }, {}, // this must be here to work
    { $set: { loggedIn: false } }, { upsert: true }, function (err, result) {
      if (err) {
        return err;
      }
      res.send(result);
    });
  });
  //* *************LOG IN***************************
  app.post('/logIn', function (req, res) {
    db.collection('users').findAndModify({ name: req.body.name }, {}, { $set: { loggedIn: true } }, { new: true }, function (err, user) {
      if (err) {
        res.json(err);
      }

      if (user.value) {
        if (user.value.password === req.body.password) {
          res.json({ login: 'success', response: user.value });
        } else {
          res.json({ login: 'fail', response: 'Invalid Password' });
        }
      } else {
        res.json({ login: 'fail', response: 'Invalid User' });
      }
    });
  });

  app.get('*', function (req, res) {
    res.send('no match');
  });

  app.listen(3000, function () {
    console.log('App started on port 3000');
  });
});
//# sourceMappingURL=server.js.map