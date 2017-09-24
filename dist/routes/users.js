'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = void 0;

router.post('/addUser', function (req, res) {
  db = res.db;
  db.collection('users').find({ name: req.body.name }).toArray(function (err, user) {
    if (err) return err;
    if (user.length > 0) {
      res.status(400).send(false);
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          var newUser = req.body;
          newUser.password = hash;

          db.collection('users').insertOne(newUser, function () {
            res.status(201).send(true);
          });
        });
      });
    }
  });
});

router.post('/logOut', function (req, res) {
  db = res.db;
  db.collection('users').findAndModify({ name: req.body.name }, {}, // this must be here to work
  { $set: { loggedIn: false } }, { upsert: true }, function (err, result) {
    if (err) {
      return err;
    }
    res.send(result);
  });
});

router.post('/logIn', function (req, res) {
  db = res.db;
  db.collection('users').findAndModify({ name: req.body.name }, {}, { $set: { loggedIn: true } }, { new: true }, function (err, user) {
    if (err) {
      res.json(err);
    }
    if (user.value) {
      bcrypt.compare(req.body.password, user.value.password, function (err, match) {
        if (match) {
          res.json({ login: 'success', response: user.value });
        } else {
          res.json({ login: 'fail', response: 'Invalid Password' });
        }
      });
    } else {
      res.json({ login: 'fail', response: 'Invalid User' });
    }
  });
});

module.exports = router;
//# sourceMappingURL=users.js.map