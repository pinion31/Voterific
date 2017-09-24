const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
let db;

router.post('/addUser', (req, res) => {
  db = res.db;
  db.collection('users').find({name: req.body.name}).toArray((err, user) => {
    if (err) return err;
    if (user.length > 0) {
      res.status(400).send(false);
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          const newUser = req.body;
          newUser.password = hash;

          db.collection('users').insertOne(newUser, () => {
            res.status(201).send(true);
          });
        });
      });
    }
  });
});

router.post('/logOut', (req, res) => {
  db = res.db;
  db.collection('users').findAndModify(
    {name: req.body.name},
    {}, // this must be here to work
    {$set: {loggedIn: false}},
    {upsert: true},
    (err, result) => {
      if (err) { return err; }
      res.send(result);
    },
  );
});

router.post('/logIn', (req, res) => {
  db = res.db;
  db.collection('users').findAndModify(
    {name: req.body.name},
    {},
    {$set: {loggedIn: true}},
    {new: true},
    (err, user) => {
      if (err) { res.json(err); }
      if (user.value) {
        bcrypt.compare(req.body.password, user.value.password, (err, match) => {
          if (match) {
            res.json({login: 'success', response: user.value});
          } else {
            res.json({login: 'fail', response: 'Invalid Password'});
          }
        });
      } else {
        res.json({login: 'fail', response: 'Invalid User'});
      }
    });
});

module.exports = router;
