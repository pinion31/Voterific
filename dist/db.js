'use strict';

var _mongodb = require('mongodb');

module.exports = function myDB() {
  var thisDb = void 0;

  function connectDb() {
    var dbUrl = process.env.MONGOLAB_URI; // production db

    _mongodb.MongoClient.connect(dbUrl, function (err, db) {
      thisdb = db;
    });
  }
};
//# sourceMappingURL=db.js.map