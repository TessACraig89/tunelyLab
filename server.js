// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var mongoose = require('mongoose');
//add bodyParser S2S3 TC
var bodyParser = require('body-parser');
// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
// use body parser S2S3 TC
app.use(bodyParser.urlencoded({ extended: true }));


/************
 * DATABASE *
 ************/

//require models S1S5 TC
var db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

// when routed to http://localhost:3000/ homepage function is called TC
  // respond by sending '/views/index.html' file
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

// when user routes to '/api/albums' albumsIndex function is called S1S2 TC
  // find and respond with all albums in Album db S1S5 TC
    // since API route send JSON S1S2 TC
app.get('/api/albums', function albumsIndex(req, res) {
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
