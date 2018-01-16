var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//require song model S3S1 TC
var Song = require('./song');

//add a model for our albums. You should be able to determine the datatypes based on the sample data in the server S1S3 TC
//create new schema, AlbumSchema
  //keys used to define properties and their schema types
  // songs key's value is a songs array that uses Song model's schema S3S1 TC
var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  songs: [Song.schema]
});

//compile Album schema into Album model S1S3 TC
//each document will be a 'Album' with properties declared in schema
var Album = mongoose.model('Album', AlbumSchema);

//export Album S1S3 TC
module.exports = Album;
