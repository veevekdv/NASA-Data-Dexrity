const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  Heading: { type: String },
  Link: { type: String },
  Authors: { type: String },
  Background: { type: String },
  Journal: { type: String },
}, { timestamps: true });

const Articles = mongoose.model('Articles', dataSchema);
module.exports = Articles;