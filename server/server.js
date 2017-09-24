// 'use strict'
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import polls from './routes/polls';
import users from './routes/users';
import getDB from './db';

const path = require('path');
SourceMapSupport.install();

// const dbUrl = 'mongodb://localhost/local'; // local db
const dbUrl = process.env.MONGOLAB_URI; // production db

MongoClient.connect(dbUrl, (err, db) => {
  if (err) { return err; }

  const passDB = (req, res, next) => {
    req.db = db;
    next();
  };

  const app = express();

  app.use(express.static('static'));
  app.use(bodyParser.json());

  app.use('/users', passDB, users);
  app.use('/polls', passDB, polls);

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../static', 'index.html'));
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log('App started');
  });
});
