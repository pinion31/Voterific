//'use strict'
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();

import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';


//let dbUrl = 'mongodb://127.0.0.1:27017/mydb'; //local db
let dbUrl = 'mongodb://localhost/local'; //local db

MongoClient.connect(dbUrl, (err, db) => {
  if (err) {return err};

  console.log('db connected');


  const app = express();

  app.use(express.static('static'));
  app.use(bodyParser.json());

  app.post('/addUser', (req,res) => {

    db.collection('users').insertOne(req.body, () => {
      console.log('new user added to database');
      res.send('user added');
    });
  });

  app.post('/addPoll', (req,res) => {
      db.collection('users').findAndModify(
          {name: req.body.owner},
          {},  //this must be here to work
          {$push:{polls:req.body}, $inc:{counter:1}},
          {upsert:true},
          function(err,result) {
            if(err) {return err};
            res.send(result);
          }
      );
  });

  //adds polls to collective list
  app.post('/addPollToAll',(req,res) => {
         db.collection('polls').insertOne(
          req.body,
          (err,result) => {
            if (err) {return err};
            res.send(result);
          }
       );
  });

  //returns all user polls
  app.get('/getAllPolls', (req,res) => {
      db.collection('polls').find({}).toArray((err,result) => {
        if (err) {return err};
        //console.dir(result);
        res.send(result);
      });
  });

  app.get('/poll/:name/:id', (req,res) => {
      db.collection('polls').find({owner:req.params.name, id:req.params.id}).toArray((err,result) => {
        if (err) {return err};
        //console.dir(result);
        res.send(result);
      });
  });


  app.post('/answerPollForUsers', (req,res) => {
      db.collection('users').find({name:req.body.name}).toArray((err,user) => {
        if (err) return err;

        let userCopy = user;
        userCopy[0].polls.map((poll) => {
           if (poll.id === req.body.id) {
              poll.choices.map((choice => {
                if (choice.choice === req.body.answer) {
                  choice.votes++;
                }
              }));
           }
        });

        db.collection('users').findAndModify(
          {name: req.body.name},
          {},
          {$set:{polls:userCopy[0].polls}},
          {new:true},
          {upsert:true},
          function(err, result) {
            if (err) return err;
           // res.send(result);
          }
          );

      });


  });

  app.post('/answerPollForAll', (req,res) => {
       db.collection('polls').find(
        {"choices.choice":req.body.answer})
       .toArray(
          (err, result) => {
            if (err) return err;
            let poll = result;

            poll[0].choices.map((answer) => {
              if (answer.choice === req.body.answer) {
                answer.votes++;
              }
            });

            db.collection('polls').findAndModify(
                {"choices.choice":req.body.answer},
                {},
                {$set:{choices: poll[0].choices}},
                {new:true},
                {upsert:true},
                function(err, result2) {

                  console.log(result2);
                  if (err) {console.dir(err);};
                  res.send(result2);
                }
            );
          }
        );
  });

  app.post('/logOut', (req,res) => {
      db.collection('users').findAndModify(
          {name: req.body.name},
          {},  //this must be here to work
          {$set: {loggedIn:false}},
          {upsert:true},
          function(err,result) {
            if(err) {return err};
            res.send(result);
           }
      );
  });

  app.post('/logIn', (req,res) => {

       db.collection('users').findAndModify(
          {name:req.body.name},
          {},
          {$set: {loggedIn:true}}, //true is being set for correct login but wrong password
          {new:true},
          (err, user) => {
          if (err) {res.json(err);}

          if (user.value) {
            if (user.value.password === req.body.password) {
              res.json({login:'success', response: user.value});
            }
            else {
              res.json({login:'fail', response: 'Invalid Password'});
            }
          }
          else {
              res.json({login:'fail', response: 'Invalid User'});
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

  app.get('*', (req,res) => {
    res.send('no match');

  });

  app.listen(3000, function(){
    console.log('App started on port 3000');
  });

});