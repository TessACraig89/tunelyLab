var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

//require albums.js S1S3 TC
var Album = require('./album');
//require songs.js S3S1 TC
var Song = require('./song');

//export Album S1S3 TC
module.exports.Album = Album;
//export Song S3S1 TC
module.exports.Song = Song;
