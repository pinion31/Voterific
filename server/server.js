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
          {$push:{polls:req.body}},
          {upsert:true},
          function(err,result) {
            if(err) {return err};
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
           }
      );
  });

  app.post('/logIn', (req,res) => {

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

  app.listen(3000, function(){
    console.log('App started on port 3000');
  });

});