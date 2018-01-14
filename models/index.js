var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely_test");

//require Album S1S3 TC
var Album = require('./album');

//export Album S1S3 TC
module.exports.Album = Album;
