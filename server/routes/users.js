const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
let db;

//  input: {name: String, password: String, email: String}
//  output: {user: String, loggedIn: Boolean}
router.post('/addUser', (req, res) => {
  db = req.db;
  const newUser = req.body.payload;
  console.log(newUser);
  db.collection('users').find({name: newUser.name}).toArray((err, user) => {
    if (err) return err;
    if (user.name && user.length > 0) {
      res.status(400).json({user: 'invalid', loggedIn: false});
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;

          db.collection('users').insertOne(newUser, () => {
            res.status(201).json({user: newUser.name, loggedIn: true});
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
      console.log('at user', user);
      if (user.value.password) {
        bcrypt.compare(req.body.password, user.value.password, (err, match) => {
          if (match) {
            res.json({user: user.value.name, loggedIn: true});
          } else {
            res.json({user: 'Invalid Password', loggedIn: false});
          }
        });
      } else {
        res.json({user: 'Invalid User', loggedIn: false});
      }
    });
});

module.exports = router;
