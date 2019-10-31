const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('../db/db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('client'));

app.get('/behavioral', (req, res) => {
  db.BehavioralQs.find({}, (err, results) => {
    if (err || results.length === 0) {
      console.log('ErrorTell', err);
      res.status(404).send(err);
    } else {
      console.log('Success', results);
      res.status(200).send(results);
    }
  });
});


app.post('/behavioral', (req, res) => {
  const { question } = req.body;
  db.BehavioralQs.create({ question: req.body.question }, (err, results) => {
    if (err) {
      console.log('Error.');
      res.status(404).send(err);
    } else {
      res.send(results);
    }
  });
});


app.put('/behavioral', (req, res) => {
  db.BehavioralQs.updateOne({ question: req.body.old }, { question: req.body.new }, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.delete('/behavioral', (req, res) => {
  const { question } = req.body;
  db.BehavioralQs.deleteOne({ question }, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send('Question successfully deleted.');
    }
  });
});

app.get('/technical', (req, res) => {
  db.TechnicalQs.find({}, (err, results) => {
    mongoose.set('debug', true);
    if (err || results.length === 0) {
      console.log('ErrorTell', err);
      res.status(404).send(err);
    } else {
      console.log('Success', results);
      res.status(200).send(results);
    }
  });
});


app.post('/technical', (req, res) => {
  db.TechnicalQs.create({ question: 'What is a hash table?' }, (err, results) => {
    if (err) {
      console.log('Error.');
      res.status(404).send(err);
    } else {
      res.send(results);
    }
  });
});


app.put('/technical', (req, res) => {
  db.TechnicalQs.updateOne({ question: 'What is a hash table?' }, { question: 'WHAT is a hash table?' }, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.delete('/technical', (req, res) => {
  db.TechnicalQs.deleteOne({ question: 'WHAT is a hash table?' }, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send('Question successfully deleted.');
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
