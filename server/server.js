// 'use strict'
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';

SourceMapSupport.install();

// let dbUrl = 'mongodb://127.0.0.1:27017/mydb'; //local db
const dbUrl = 'mongodb://localhost/local'; // local db

MongoClient.connect(dbUrl, (err, db) => {
  if (err) { return err; }

  const app = express();

  app.use(express.static('static'));
  app.use(bodyParser.json());

  //* **************ADD NEW USER********************
  app.post('/addUser', (req, res) => {
    db.collection('users').find({name: req.body.name}).toArray((err, user) => {
      if (err) return err;
      if (user.length > 0) {
        res.status(400).send(false);
      } else {
        db.collection('users').insertOne(req.body, () => {
          res.status(201).send(true);
        });
      }
    });
  });

  //* *************DELETE POLL***************************
  app.post('/deletePollForUsers', (req, res) => {
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
  app.post('/deletePollForAll', (req) => {
    db.collection('polls').deleteOne(
      {id: req.body.id.toString(), owner: req.body.name},
      (err) => {
        if (err) { return err; }
      },
    );
  });

  //* *************ADD POLL***************************

  app.post('/addPoll', (req, res) => {
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
  app.post('/addPollToAll', (req, res) => {
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
  app.get('/getAllPolls', (req, res) => {
    db.collection('polls').find({}).toArray((err, result) => {
      if (err) { return err; }
      res.send(result);
    });
  });

  app.get('/poll/:name/:id', (req, res) => {
    db.collection('polls').find({owner: req.params.name, id: req.params.id}).toArray((err, result) => {
      if (err) { return err; }
      res.send(result);
    });
  });

  //* *************ANSWER POLL***************************

  app.post('/answerPollForUsers', (req) => {
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

  app.post('/answerPollForAll', (req, res) => {
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
              if (err) { console.dir(err); }
              res.send(result2);
            },
          );
        },
      );
  });

  //* *************LOG OUT***************************

  app.post('/logOut', (req, res) => {
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
  //* *************LOG IN***************************
  app.post('/logIn', (req, res) => {
    db.collection('users').findAndModify(
      {name: req.body.name},
      {},
      {$set: {loggedIn: true}},
      {new: true},
      (err, user) => {
        if (err) { res.json(err); }

        if (user.value) {
          if (user.value.password === req.body.password) {
            res.json({login: 'success', response: user.value});
          } else {
            res.json({login: 'fail', response: 'Invalid Password'});
          }
        } else {
          res.json({login: 'fail', response: 'Invalid User'});
        }
      });
  });

  app.get('*', (req, res) => {
    res.send('no match');
  });

  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
});
