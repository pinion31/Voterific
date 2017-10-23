'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var ObjectId = require('mongodb').ObjectId;
var db = void 0;

//  input: {name: String, password: String, email: String}
//  output: {user: String, loggedIn: Boolean}
router.post('/addUser', function (req, res) {
  db = req.db;
  var newUser = req.body.payload;
  db.collection('users').find({ name: newUser.name }).toArray(function (err, user) {
    if (err) return err;
    if (user.name && user.length > 0) {
      res.status(400).json({ user: 'invalid', loggedIn: false });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          newUser.password = hash;

          db.collection('users').insertOne(newUser, function () {
            res.status(201).json({ user: newUser.name, loggedIn: true, polls: [] });
          });
        });
      });
    }
  });
});

router.post('/LoginUser', function (req, res) {
  db = req.db;
  db.collection('users').findAndModify({ name: req.body.name }, {}, { $set: { loggedIn: true } }, { new: true }, function (err, user) {
    if (err) {
      res.json(err);
    }
    if (user.value.password) {
      bcrypt.compare(req.body.password, user.value.password, function (err, match) {
        if (match) {
          // populate user polls before sending back
          var ObjectIds = [];
          user.value.polls.map(function (pollId) {
            ObjectIds.push(ObjectId(pollId));
          });

          db.collection('polls').find({ _id: { $in: ObjectIds } }).toArray(function (err, polls) {
            if (err) {
              throw err;
            }
            res.json({ user: user.value.name, loggedIn: true, polls: polls });
          });
        } else {
          res.json({ user: 'Invalid Password', loggedIn: false, polls: [] });
        }
      });
    } else {
      res.json({ user: 'Invalid User', loggedIn: false, polls: [] });
    }
  });
});

module.exports = router;
//# sourceMappingURL=users.js.map