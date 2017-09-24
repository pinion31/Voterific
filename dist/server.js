'use strict';

require('babel-polyfill');

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _polls = require('./routes/polls');

var _polls2 = _interopRequireDefault(_polls);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 'use strict'
var path = require('path');
_sourceMapSupport2.default.install();

// const dbUrl = 'mongodb://localhost/local'; // local db
var dbUrl = process.env.MONGOLAB_URI; // production db

_mongodb.MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    return err;
  }

  var passDB = function passDB(req, res, next) {
    req.db = db;
    next();
  };

  var app = (0, _express2.default)();

  app.use(_express2.default.static('static'));
  app.use(_bodyParser2.default.json());

  app.use('/users', passDB, _users2.default);
  app.use('/polls', passDB, _polls2.default);

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../static', 'index.html'));
  });

  app.listen(process.env.PORT || 3000, function () {
    console.log('App started');
  });
});
//# sourceMappingURL=server.js.map