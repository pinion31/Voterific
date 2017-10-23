const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;
let db;

//  input: {name: String, password: String, email: String}
//  output: {user: String, loggedIn: Boolean}
router.post('/addUser', (req, res) => {
  db = req.db;
  const newUser = req.body.payload;
  db.collection('users').find({name: newUser.name}).toArray((err, user) => {
    if (err) return err;
    if (user.name && user.length > 0) {
      res.status(400).json({user: 'invalid', loggedIn: false});
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;

          db.collection('users').insertOne(newUser, () => {
            res.status(201).json({user: newUser.name, loggedIn: true, polls: []});
          });
        });
      });
    }
  });
});

router.post('/LoginUser', (req, res) => {
  db = req.db;
  db.collection('users').findAndModify(
    {name: req.body.name},
    {},
    {$set: {loggedIn: true}},
    {new: true},
    (err, user) => {
      if (err) { res.json(err); }
      if (user.value.password) {
        bcrypt.compare(req.body.password, user.value.password, (err, match) => {
          if (match) {
            // populate user polls before sending back
            const ObjectIds = [];
            user.value.polls.map(pollId => {
              ObjectIds.push(ObjectId(pollId));
            });

            db.collection('polls').find({_id: {$in: ObjectIds}}).toArray((err, polls) => {
              if (err) { throw err; }
              res.json({user: user.value.name, loggedIn: true, polls});
            });
          } else {
            res.json({user: 'Invalid Password', loggedIn: false, polls: []});
          }
        });
      } else {
        res.json({user: 'Invalid User', loggedIn: false, polls: []});
      }
    });
});

module.exports = router;
