const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const dbConnectionUrl = 'mongodb://localhost:27017/usersDatabase';
let db;

MongoClient.connect(dbConnectionUrl, (err, client) => {
  if (err) return console.log(err)
  db = client.db('usersDatabase') // whatever your database name is
  // let collection = db.collection("users");
  // let users = [{name: "Bob", age: 34} , {name: "Alice", age: 21}, {name: "Tom", age: 45}];
  // collection.insertMany(users, function(err, result){         
    // if (err) { return console.log(err); }
  // });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    db.collection("users").find().toArray(function(err, results){
      console.log(results);
      res.send(results)
    })
});

app.listen(3000, () => {
  console.log('listening on 3000')
});
