const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost/flashcards', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We are connected!');
});

const behavioralSchema = new mongoose.Schema({
  question: String,
  answer: { type: String, default: 'Needs answer! Edit to add an answer.' },
});

const technicalSchema = new mongoose.Schema({
  question: String,
  answer: { type: String, default: 'Needs answer! Edit to add an answer.' },
});

const systemDesignSchema = new mongoose.Schema({
  question: String,
  answer: { type: String, default: 'Needs answer! Edit to add an answer.' },
});

const BehavioralQs = mongoose.model('BehavioralQs', behavioralSchema);
const TechnicalQs = mongoose.model('TechnicalQs', technicalSchema);
const SystemDesignQs = mongoose.model('SystemDesignQs', systemDesignSchema);

module.exports.db = db;
module.exports.BehavioralQs = BehavioralQs;
module.exports.TechnicalQs = TechnicalQs;
module.exports.SystemDesignQs = SystemDesignQs;
