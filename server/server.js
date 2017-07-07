//'use strict'
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();

//const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';

const app = express();

app.use(express.static('static'));

app.listen(3000, function(){
  console.log('App started on port 3000');
})