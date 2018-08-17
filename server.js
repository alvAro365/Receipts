import express from '../../Library/Caches/typescript/2.9/node_modules/@types/express';
import bodyParser from '../../Library/Caches/typescript/2.9/node_modules/@types/body-parser';
import path from 'path';
// import * as mongodb from 'mongodb';
import { MongoClient } from '../../Library/Caches/typescript/2.9/node_modules/@types/mongodb'
import { request } from 'https';
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

  app.get('/', (request, response) => res.send('Hello World'))

  app.listen(3000, () => console.log('The service is running...'));
