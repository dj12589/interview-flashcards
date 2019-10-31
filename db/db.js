var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/flashcards', {useNewUrlParser: true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected!')
});

var behavioralSchema = new mongoose.Schema({
  question:  String,
});

var technicalSchema = new mongoose.Schema({
  question:  String,
  answer: String,
});

var BehavioralQs = mongoose.model('BehavioralQs', behavioralSchema);
var TechnicalQs = mongoose.model('TechnicalQs', technicalSchema);

module.exports.db = db;
module.exports.BehavioralQs = BehavioralQs;
module.exports.TechnicalQs = TechnicalQs;
