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

//'use strict'
_sourceMapSupport2.default.install();

//let dbUrl = 'mongodb://127.0.0.1:27017/mydb'; //local db
var dbUrl = 'mongodb://localhost/local'; //local db

_mongodb.MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    return err;
  };

  console.log('db connected');

  var app = (0, _express2.default)();

  app.use(_express2.default.static('static'));
  app.use(_bodyParser2.default.json());

  app.post('/addUser', function (req, res) {

    db.collection('users').insertOne(req.body, function () {
      console.log('new user added to database');
      res.send('user added');
    });
  });

  app.post('/addPoll', function (req, res) {
    db.collection('users').findAndModify({ name: req.body.owner }, {}, //this must be here to work
    { $push: { polls: req.body }, $inc: { counter: 1 } }, { upsert: true }, function (err, result) {
      if (err) {
        return err;
      };
      res.send(result);
    });
  });

  //adds polls to collective list
  app.post('/addPollToAll', function (req, res) {
    db.collection('polls').insertOne(req.body, function (err, result) {
      if (err) {
        return err;
      };
      res.send(result);
    });
  });

  //returns all user polls
  app.get('/getAllPolls', function (req, res) {
    db.collection('polls').find({}).toArray(function (err, result) {
      if (err) {
        return err;
      };
      //console.dir(result);
      res.send(result);
    });
  });

  app.get('/poll/:name/:id', function (req, res) {
    db.collection('polls').find({ owner: req.params.name, id: req.params.id }).toArray(function (err, result) {
      if (err) {
        return err;
      };
      //console.dir(result);
      res.send(result);
    });
  });

  app.post('/answerPollForUsers', function (req, res) {
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

      db.collection('users').findAndModify({ name: req.body.name }, {}, { $set: { polls: userCopy[0].polls } }, { new: true }, { upsert: true }, function (err, result) {
        if (err) return err;
        // res.send(result);
      });
    });
  });

  app.post('/answerPollForAll', function (req, res) {
    db.collection('polls').find({ "choices.choice": req.body.answer }).toArray(function (err, result) {
      if (err) return err;
      var poll = result;

      poll[0].choices.map(function (answer) {
        if (answer.choice === req.body.answer) {
          answer.votes++;
        }
      });

      db.collection('polls').findAndModify({ "choices.choice": req.body.answer }, {}, { $set: { choices: poll[0].choices } }, { new: true }, { upsert: true }, function (err, result2) {

        console.log(result2);
        if (err) {
          console.dir(err);
        };
        res.send(result2);
      });
    });
  });

  app.post('/logOut', function (req, res) {
    db.collection('users').findAndModify({ name: req.body.name }, {}, //this must be here to work
    { $set: { loggedIn: false } }, { upsert: true }, function (err, result) {
      if (err) {
        return err;
      };
      res.send(result);
    });
  });

  app.post('/logIn', function (req, res) {

    db.collection('users').findAndModify({ name: req.body.name }, {}, { $set: { loggedIn: true } }, //true is being set for correct login but wrong password
    { new: true }, function (err, user) {
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
    /*
    db.collection('users').findOne({name:req.body.name}, (err, user) => {
          if (err) {res.json(err);}
          if (user) {
          if (user.password === req.body.password) {
            res.json({login:'success', response: user});
          }
          else {
            res.json({login:'fail', response: 'Invalid Password'});
          }
        }
        else {
            res.json({login:'fail', response: 'Invalid User'});
        }
    });*/
  });

  app.get('*', function (req, res) {
    res.send('no match');
  });

  app.listen(3000, function () {
    console.log('App started on port 3000');
  });
});
//# sourceMappingURL=server.js.map