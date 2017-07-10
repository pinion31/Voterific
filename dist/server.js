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
    { $push: { polls: req.body } }, { upsert: true }, function (err, result) {
      if (err) {
        return err;
      };
    });
  });

  app.post('/logOut', function (req, res) {
    db.collection('users').findAndModify({ name: req.body.name }, {}, //this must be here to work
    { $set: { loggedIn: false } }, { upsert: true }, function (err, result) {
      if (err) {
        return err;
      };
    });
  });

  app.post('/logIn', function (req, res) {

    db.collection('users').findOne({ name: req.body.name }, function (err, user) {

      if (err) {
        res.json(err);
      }

      if (user) {
        if (user.password === req.body.password) {
          res.json({ login: 'success', response: user });
        } else {
          res.json({ login: 'fail', response: 'Invalid Password' });
        }
      } else {
        res.json({ login: 'fail', response: 'Invalid User' });
      }
    });

    /*
    let user = db.collection('users').findAndModify(
        {name: req.body.name, password: req.body.password},
        {},  //this must be here to work
        {$set: {loggedIn:true}},
        {new:true},
      ).then(() => {
      if (user) {
        res.send(JSON.stringify(user));
      }
      else {
        res.send('no match');
      }
      });*/
  });

  app.listen(3000, function () {
    console.log('App started on port 3000');
  });
});
//# sourceMappingURL=server.js.map