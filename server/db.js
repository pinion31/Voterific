import {MongoClient} from 'mongodb';

module.exports = function myDB() {
  let thisDb;

  function connectDb() {
    const dbUrl = process.env.MONGOLAB_URI; // production db

    MongoClient.connect(dbUrl, (err, db) => {
      thisdb = db;
    }
  }
}