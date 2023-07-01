const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  EnergyType: { type: String },
  pathInProject: { type: String }
}, { timestamps: true });

const Images = mongoose.model('Images', dataSchema);
module.exports = Images;