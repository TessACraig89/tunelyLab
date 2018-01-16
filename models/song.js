var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create new schema, song Schema S3S1 TC
  //keys used to define properties and their schema types
var SongSchema = new Schema({
  name: String,
  trackNumber: Number
});

var Song = mongoose.model('Song', SongSchema);

module.exports = Song;
