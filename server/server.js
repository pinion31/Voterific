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

  app.listen(3000, function(){
    console.log('App started on port 3000');
  });

});