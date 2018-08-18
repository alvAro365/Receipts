import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb'
var db;
let app = express();
app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost:27017', function(error, client) {
    if (error) {
      console.error('Failed to connect to the database!');
      console.log(error);
    } else {
      console.log('Successfully connected to the database!');
        db = client.db('test');
        // db.collection('receipts').insert({
        //     id: 1234,
        //     name: 'Iphone 6'
        // }, (error, result) => { dokumentet har lagts in, console.log(result)})
    }
  });

app.get('/receipts', (request, response) => {
    db.collection('receipts').find().toArray((error, result) => error ? response.status(500).send(error) : response.send(result))
})

app.get('/:ID', (request, response) => (
    db.collection('receipts').find({ id: { $eq: request.params.ID } }).toArray((error, result) => 
        error ? response.status(500).send(error) : response.send(result))
    )
)

app.put('/receipts/update/:ID', (request, response) => {
    console.log(request.body)
    db.collection('receipts')
    .update({ id: request.params.ID }, {
        $set: {
            name: request.body.name,
            category: request.body.category
        }
    }, (error, result) => 
        error ? response.send(error) : response.send(result)
    )
})

app.delete('/receipts/delete/:ID', (request, response) => {
    db.collection('receipts')
    .remove({ id: request.params.ID },
    (error, result) => error ? response.send(error) : response.send(result))
})

app.post('/receipts', (request, response) => {
    db.collection('receipts').insert(
        request.body, 
        (error, result) => error ? response.send(error) : response.status(201).send(result))
})

app.listen(3000, () => console.log('The service is running...'));