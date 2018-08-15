import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
// import * as mongodb from 'mongodb';
import { MongoClient } from 'mongodb'
// var MongoClient = mongodb.MongoClient;
var db;
let cities;
let app = express();
app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost:27017', function(error, client) {
    if (error) {
      console.error('Failed to connect to the database!');
      console.log(error);
    } else {
      console.log('Successfully connected to the database!');
      db = client.db('cities');
      db.collection('persons').insert({
          firstName: 'Hallå Hallåå',
          surname: 'Helgi Sallo'
        }, function (error, result) {
            // Dokumentet har lagts in.
            // console.log(result)

        });
    }
  });

  app.listen(3000, () => console.log('The service is running...'));

  export default app