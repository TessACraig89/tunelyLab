// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var mongoose = require('mongoose');
// add body parser S2S3
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/

//require models TC
var db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */
//request / enpoint from client using get, on success execute homepage function TC
  // respond to client by sending '/views/index.html' file
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/albums', function albumsIndex(req, res) {
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
});


/*
 * JSON API Endpoints
 */

// request /api endpoint from client using get, on success execute api_index function TC
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
//create a new route for /api/albums S1S2 TC
// request /api/albums endpoint from client using get, on success execute albumsIndex function
  // find and respond with all albums in Album db S1S5 TC
    // since API route send JSON S1S2 TC
app.get('/api/albums', function albumsIndex(req, res) {
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
});

// send /api/albums to client using post, on success execute albumsCreate function S2S3 TC
//log and object containing parsed text from /api/albums body
app.post('/api/albums', function albumCreate(req, res) {
  console.log('body', req.body);

  // split the data in req.body.genres field at comma, map into new genres array, and remove trailing space using .trim S2S4
  // set /api/albums body data to genres array
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;

//connect app.post route to album db S2S5
  // create record in album database that has attributes of req.body
    // logs error if err occurs
    // logs new album if no eror
    // respond with new album
  db.Album.create(req.body, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(album);
    res.json(album);
  });

});

// request /api/albums/:id endpoint from client using get, on success execute albumShow function  TC
  // log requested album's id
  // find one album from album db using album id from request, on success call function
    // respond with json of album
app.get('/api/albums/:id', function albumShow(req, res) {
  console.log('requested album id=', req.params.id);
  db.Album.findOne({_id: req.params.id}, function(err, album) {
    res.json(album);
  });
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// request /api/albums/:id endpoint from client using get, on success execute albumsShow function TC
app.get('/api/albums/:id/songs', function albumShow(req, res) {
  console.log('requested album id=', req.params.id);
  db.Album.findOne({_id: req.params.id}, function(err, album) {
    res.json(album.songs);
  });
});
/////////////////////////////////////////////////////////////./////////////////////////////////////////////////////////////////
// send /api/albums/:albumId/songs to client, on success run songsCreate function S3S6 TC
  // log body
  // find one album from album db using albumid from request, on success call function
  // if err log error
app.post('/api/albums/:albumId/songs', function songsCreate(req, res) {
  console.log('body', req.body);
  db.Album.findOne({_id: req.params.albumId}, function(err, album) {
    if (err) { console.log('error', err); }
    //create new db song and store in song variable
    // add new song to album by pushing song to album.songs
    // save album
      // if err log
      // else log saved album
      // respond to client with song as json
    var song = new db.Song(req.body);
    album.songs.push(song);
    album.save(function(err, savedAlbum) {
      if (err) { console.log('error', err); }
      console.log('album with new song saved:', savedAlbum);
      res.json(song);
    });
  });
});

// send request to /api/albums/:id to , on success run deleteAlbum function S4S2 TC
  // log deleting request id
  // remove specific album fron album db using id
    // if err log error
    // else log removal of id successful
    // send 200 status code to say everything is a-OK
app.delete('/api/albums/:id', function deleteAlbum(req, res) {
  console.log('deleting id: ', req.params.id);
  db.Album.remove({_id: req.params.id}, function(err) {
    if (err) { return console.log(err); }
    console.log("removal of id=" + req.params.id  + " successful.");
    res.status(200).send();
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Add the app.put method on the server S5S3
// send request to /api/albums/:id to , on success run updateAlbum function
  // log 'updating id' of request album's id
  // log 'received body' of request album's new body object
app.put('/api/albums/:id', function updateAlbum(req, res) {
  console.log('updating id ', req.params.id);
  console.log('received body ', req.body);
//Connect it to the database S5S3
  //find one album from album db using album id from request on success run function
  // if err log err
  // else set foundAlbum.artistname to be the request album's new body object's artistName
  // set foundAlbum.name to be the request album's new body object's name
  // set foundAlbum.releaseDate to be the request album's new body object's releaseDate
  // save  foundAlbum function
    // if err log
    // else
    //respond to client with json of saved 
  db.Album.findOne({_id: req.params.id}, function(err, foundAlbum) {
    if (err) { console.log('error', err); }
    foundAlbum.artistname = req.body.artistName;
    foundAlbum.name = req.body.name;
    foundAlbum.releaseDate = req.body.releaseDate;
    foundAlbum.save(function(err, saved) {
      if(err) { console.log('error', err); }
      res.json(saved);
    });
  });
});


app.put('/api/albums/:albumId/songs/:id', function(req, res) {
  var albumId = req.params.albumId;
  var songId = req.params.id;
  db.Album.findOne({_id: albumId}, function (err, foundAlbum) {
    // find song embedded in album
    var foundSong = foundAlbum.songs.id(songId);
    foundSong.name = req.body.name;
    foundSong.trackNumber = req.body.trackNumber;

    // save changes
    foundAlbum.save(function(err, saved) {
      if(err) { console.log('error', err); }
      res.json(saved);
    });
  });
});



app.delete('/api/albums/:albumId/songs/:id', function(req, res) {
  var albumId = req.params.albumId;
  var songId = req.params.id;
  console.log(req.params);
  db.Album.findOne({_id: albumId}, function (err, foundAlbum) {
    if (err) {console.log(error, err);}
    // find song embedded in album
    var foundSong = foundAlbum.songs.id(songId);

    // delete
    foundSong.remove();
    // save changes
    foundAlbum.save(function(err, saved) {
      if(err) { console.log('error', err); }
      res.json(saved);
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/albums', function albumsIndex(req, res) {
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
});

app.post('/api/albums', function albumCreate(req, res) {
  console.log('body', req.body);

  // split at comma and remove and trailing space
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;

  db.Album.create(req.body, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(album);
    res.json(album);
  });

});

/**********
 * SERVER *
 **********/

 // listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
