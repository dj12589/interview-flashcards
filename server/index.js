const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const db = require('../db/db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('client'));

app.get('/behavioral', (req, res) => {
  db.BehavioralQs.find({}, (err, results) => {
    if (err || results.length === 0) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/behavioral', (req, res) => {
  db.BehavioralQs.create({ question: req.body.question }, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(results);
    }
  });
});

app.put('/behavioral', (req, res) => {
  if (req.body.type === 'question') {
    db.BehavioralQs.updateOne({ question: req.body.old }, { question: req.body.new }, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  } else if (req.body.type === 'answer') {
    db.BehavioralQs.updateOne({ question: req.body.old }, { answer: req.body.new }, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  }
});

app.delete('/behavioral', (req, res) => {
  const { question } = req.body;
  db.BehavioralQs.deleteOne({ question }, (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send('Question successfully deleted.');
    }
  });
});

app.get('/technical', (req, res) => {
  db.TechnicalQs.find({}, (err, results) => {
    if (results.length === 0) {
      db.TechnicalQs.create({ question: 'What is a hash table?' }, (error, firstQ) => {
        if (error) {
          res.status(404).send(error);
        } else {
          res.status(200).send(firstQ);
        }
      });
    } else if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});


app.post('/technical', (req, res) => {
  const { question } = req.body;
  db.TechnicalQs.create({ question: req.body.question }, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(results);
    }
  });
});


app.put('/technical', (req, res) => {
  if (req.body.type === 'question') {
    db.TechnicalQs.updateOne({ question: req.body.old }, { question: req.body.new }, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  } else if (req.body.type === 'answer') {
    db.TechnicalQs.updateOne({ question: req.body.old }, { answer: req.body.new }, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  }
});

app.delete('/technical', (req, res) => {
  const { question } = req.body;
  db.TechnicalQs.deleteOne({ question }, (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send('Question successfully deleted.');
    }
  });
});

app.get('/systemdesign', (req, res) => {
  db.SystemDesignQs.find({}, (err, results) => {
    if (results.length === 0) {
      db.SystemDesignQs.create({ question: 'System design question' }, (error, firstQ) => {
        if (error) {
          res.status(404).send(err);
        } else {
          res.status(200).send(firstQ);
        }
      });
    } else if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/systemdesign', (req, res) => {
  const { question } = req.body;
  db.SystemDesignQs.create({ question: req.body.question }, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(results);
    }
  });
});

app.put('/systemdesign', (req, res) => {
  if (req.body.type === 'question') {
    db.SystemDesignQs.updateOne({ question: req.body.old }, { question: req.body.new }, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  } else if (req.body.type === 'answer') {
    db.SystemDesignQs.updateOne({ question: req.body.old }, { answer: req.body.new }, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  }
});

app.delete('/systemdesign', (req, res) => {
  const { question } = req.body;
  db.SystemDesignQs.deleteOne({ question }, (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send('Question successfully deleted.');
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
