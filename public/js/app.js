/* CLIENT-SIDE JS

/* document ready */
//use ajax to get the albums. Render them on the page. S1S2 TC
//use ajax $.get to get all albums from server
// on success render each album for all albums
$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/albums').success(function (albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
    });
  });

// get albumn-form by id attach a submit event to it S2S2 TC
  //triggers function that prevents default, send content of the form to the server right away
  // serialize album form values and store in formData variable
  //console.log form data
  // use ajax $.post to send request to /api/albums, send formData with request, if request succeeds triggers function that S2S4
    // logs album after post
    //render new album
  // then reset
  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/albums', formData, function(album) {
      console.log('album after POST', album);
      renderAlbum(album);
    });
    $(this).trigger("reset");
  });

  // attach click event to albums div that triggers function if on .add-song handle S3S4 TC
    //  add set id to the album id
    // log id
    // set album-id data-attribute on songModal to be id
    // open song modal by calling .modal
  $('#albums').on('click', '.add-song', function(e) {
    var id= $(this).parents('.album').data('album-id');
    console.log('id',id);
    $('#songModal').data('album-id', id);
    $('#songModal').modal();
  });
  // call handleNewSongSubmit function when saveSong modal button is clicked S3S5 TC
  $('#saveSong').on('click', handleNewSongSubmit);
  // call handleDeleteAlbumClick function when delete-album modal button is clicked S4S2 TC
  $('#albums').on('click', '.delete-album', handleDeleteAlbumClick);
  // call handleEditAlbumClick function when edit-album modal button is clicked S5S1 TC
  $('#albums').on('click', '.edit-album', handleEditAlbumClick);
  // call handleEditSongsClick function when save changes modal button is clicked S6 TC
  $('#albums').on('click', '.put-album', handleSaveChangesClick);
  // call handleEditSongsClick function when edit-songs modal button is clicked S6 TC
  $('#albums').on('click', '.edit-songs', handleEditSongsClick);
  // call handleEditSongsClick function when delete-song modal button is clicked S6 TC
  $('#editSongsModal').on('click', '.delete-song', handleDeleteSongClick);

  $('#editSongsModal').on('submit', 'form', handleUpdateSong);
});

/* End document ready */

//edit each song S6S2
//  handleUpdateSong function S6S2
  //triggers function that prevents default, send content of the form to the server right away
  // get the values from the item on the modal and store in variables
  // log 'PUT ', url, name, trackNumber
  //use ajax $.get to sned
  //PUT request to update current url /api/albums/:album_id/songs/:song_id
  // add object containing trackNumber and name to request
  // on success call function that takes data from put request as parameter
    // update songs by calling updateSongsList function, passing in current albumId as parameter
function handleUpdateSong(e) {
  e.preventDefault();
  var albumId = $(this).attr('id');
  var trackNumber = $(this).find('.song-trackNumber').val();
  var name = $(this).find('.song-name').val();
  var songId = $(this).find('.delete-song').attr('data-song-id');
  var url = '/api/albums/' + albumId + '/songs/' + songId;
  console.log('PUT ', url, name, trackNumber);
  $.ajax({
    method: 'PUT',
    url: url,
    data: { trackNumber: trackNumber, name: name },
    success: function (data) {
      updateSongsList(albumId);
    }
  });
}

// handleEditSongsClick function S6S2
  //triggers function that prevents default, send content of the form to the server right away
  // get current album's album-id data and store in albumId variable
  //use ajax $.get to request songs from server
  //call generateEditSongsModalHtml function and store in formHtml variable
  //set editSongsModalBody inner html to be songs after edit form is made for them
function handleEditSongsClick(e) {
  e.preventDefault();
  var albumId = $(this).parents('.album').data('album-id');
  $.get('/api/albums/' + albumId + '/songs').success(function(songs) {
    var formHtml = generateEditSongsModalHtml(songs, albumId);
    $('#editSongsModalBody').html(formHtml);
    // When 'Edit Songs' is clicked open the modal S6S1 TC
    $('#editSongsModal').modal('show');
  });
}

// takes an array of songs and generates an EDIT form for them S6S2 TC
// we want to have both the albumId and songId available
// Your form will need to be put into an HTML string S6S2
//generateEditSongsModalHtml function
  //create variable html and set value to be empty string
  //for each song in songs array
  //Develop a form for editing the song list
function generateEditSongsModalHtml(songs, albumId) {
  var html = '';
  songs.forEach(function(song) {
    html += '<form class="form-inline" id="' + albumId  + '"' +
            '  <div class="form-group">' +
            '    <input type="text" class="form-control song-trackNumber" value="' + song.trackNumber + '">' +
            '  </div>'+
            '  <div class="form-group">' +
            '    <input type="text" class="form-control song-name" value="' + song.name + '">' +
            '  </div>'+
            '  <div class="form-group">' +
            '    <button class="btn btn-danger delete-song" data-song-id="' + song._id + '">x</button>' +
            '  </div>'+
            '  <div class="form-group">' +
            '    <button type="submit" class="btn btn-success save-song" data-song-id="' + song._id + '">save</span></button>' +
            '  </div>'+
            '</form>';
  });

  return html;
}

//delete a song S6S2
//  handleDeleteSongClick function
  //triggers function that prevents default, send content of the form to the server right away
  // get the values from the item on the modal and store in variables
  // log 'PUT ', url, name, trackNumber
  //use ajax $.get to sned
  //PUT request to update current url /api/albums/:album_id/songs/:song_id
  // add object containing trackNumber and name to request
  // on success call function that takes data from put request as parameter
    // update songs by calling updateSongsList function, passing in current albumId as parameter
function handleDeleteSongClick(e) {
  e.preventDefault();
  var songId = $(this).data('song-id');
  var albumId = $(this).closest('form').attr('id');
  var $thisSong = $(this);
  var requestUrl = ('/api/albums/' + albumId + '/songs/' + songId);
  console.log('DELETE ', requestUrl);
  $.ajax({
    method: 'DELETE',
    url: requestUrl,
    success: function(data) {
      $thisSong.closest('form').remove();
      updateSongsList(albumId);
    }
  });
}

// get the songs again (now that one is gone) and then we'll fix the <li> on the package
//  updateSongsList function
  //use ajax $.get to request all songs from server
  //console.log 'replacement albums' some albums
function updateSongsList(albumId) {
  $.get('/api/albums/' + albumId + '/songs').success(function(someAlbums) {
    console.log('replacement albums', someAlbums);
    // build a new song li
    var replacementLi = buildSongsHtml(someAlbums);
    // now replace the <li> with the songs on it
    //get specific album's song list and store in variable $originalLi
    // replace $originalLi with replacementLi
    var $originalLi = $('[data-album-id=' + albumId + '] .songs-list');
    $($originalLi).replaceWith(replacementLi);
  });
}

// accepts an album id (mongo id) and return the row in which that album exists
function getAlbumRowById(id) {
  return $('[data-album-id=' + id + ']');
}

//Use jQuery to react to clicks on these buttons and determine the correct Album._id. console.log it S5S1 TC
// handleEditAlbumClick function
  // get current album's album-id data and store in albumId variable
  // call getAlbumRowById with albumId as argument, store returned row in $albumRow variable
function handleEditAlbumClick(e) {
  var albumId = $(this).parents('.album').data('album-id');
  var $albumRow = getAlbumRowById(albumId);
  // log 'attempt to edit id' and albumId
  console.log('attempt to edit id', albumId);

//Replace the Edit button with a Save Changes button when clicked S5S1 TC
  //find and hide edit button by class for current album
  //find and show save changes button by class for current album
  $(this).parent().find('.btn').hide();
  $(this).parent().find('.default-hidden').show();

//Also replace the major fields on the Album with input elements S5S1 TC
  // find albumRow's album-name span's text and store in albumName variable
  // set album-name span's html to be input with class of edit-album-name and value of albumName
  var albumName = $albumRow.find('span.album-name').text();
  $albumRow.find('span.album-name').html('<input class="edit-album-name" value="' + albumName + '"></input>');
  // find albumRow's artist-name span's text and store in artistName variable
  // set artist-name span's html to be input with class of edit-artist-name and value of artistName
  var artistName = $albumRow.find('span.artist-name').text();
  $albumRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');
  // find albumRow's release-date span's text and store in releaseDate variable
  // set album-release-date span's html to be input with class of edit-album-release-date and value of releaseDate
  var releaseDate = $albumRow.find('span.album-release-date').text();
  $albumRow.find('span.album-release-date').html('<input class="edit-album-release-date" value="' + releaseDate + '"></input>');
}

//When Save Changes is clicked, react to it S5S2 TC
// handleSaveChangesClick function
  // get current album's album-id data and store in albumId variable
  // call getAlbumRowById with albumId as argument, store returned row in $albumRow variable
function handleSaveChangesClick(e) {
  var albumId = $(this).parents('.album').data('album-id');
  var $albumRow = getAlbumRowById(albumId);
  // data object
    // find and get edit-album-name value of albumName and make value of name key
    // find and get edit-artist-name value of artistName and make value of artistName key
    // find and get edit-album-release-date value of releaseDate and make value of releaseDate key
  var data = {
    name: $albumRow.find('.edit-album-name').val(),
    artistName: $albumRow.find('.edit-artist-name').val(),
    releaseDate: $albumRow.find('.edit-album-release-date').val()
  };
//Prepare an AJAX call to the server at PUT /api/albums/:id S5S2 TC
  //use $.ajax to send a
    //PUT request to update /api/albums/:album_id
    // on success call function
      // log data
      //replace albumRow with data after passing into generateAlbumHtml as an argument
  $.ajax({
    method: 'PUT',
    url: '/api/albums/' + albumId,
    data: data,
    success: function(data) {
      console.log(data);
      $albumRow.replaceWith(generateAlbumHtml(data));
    }
  });
}


// handleDeleteAlbumClick function S4S1 TC
  // get current album's album-id data and store in albumId variable
  // log someone wants to delete album  and albumId
  // get value from songName input field and store in songName variable
  //use $.ajax to send a S4S3 TC
    //DELETE request to /api/albums/:album_id
    // on success call function
      // log that album has been deleted
      // select album using using data-album-id and albumId and remove
function handleDeleteAlbumClick(e) {
  var albumId = $(this).parents('.album').data('album-id');
  console.log('someone wants to delete album id=' + albumId );
  $.ajax({
    method: 'DELETE',
    url: ('/api/albums/' + albumId),
    success: function() {
      console.log("He's dead Jim");
      $('[data-album-id='+ albumId + ']').remove();
    }
  });
}

// handles the modal fields and POSTing the form to the server
// handleNewSongSubmit function S3S5 TC
  // get song modal's album-id data and store in albumId variable
  // get value from songName input field and store in songName variable
  //get value from trackNumber input field and store in trackNumber variable
function handleNewSongSubmit(e) {
  var albumId = $('#songModal').data('album-id');
  var songName = $('#songName').val();
  var trackNumber = $('#trackNumber').val();
  //formData object containing S3S5 TC
    // songName input data
    // trackNumber input data
  var formData = {
    name: songName,
    trackNumber: trackNumber
  };
  // build url /api/albums/:album_id/songs and save as postUrl variable S3S5 TC
  var postUrl = '/api/albums/' + albumId + '/songs';
  console.log('posting to ', postUrl, ' with data ', formData);
  //use ajax $.post to send request to postUrl, send formData with request S3S5 TC
    // if succesfull call function to
      // log song
  $.post(postUrl, formData)
    .success(function(song) {
      console.log('song', song);
      // re-get full album and render on page S3S7
      //use ajax $.get to request specific album by id from server
      $.get('/api/albums/' + albumId).success(function(album) {
        //on success remove old copy
        $('[data-album-id='+ albumId + ']').remove();
        //on success render a replacement
        renderAlbum(album);
      });

      //clear form
      $('#songName').val('');
      $('#trackNumber').val('');
      $('#songModal').modal('hide');

    });
}


// build Songs Html function, songs parameter S3S3 TC
  //set songText to include long dash using &ndash
  // for each song in songs array
  //change songText to be songText(long dash with space in front) (song track number) song name long dash
  // set song Html to be new list element that contains Songs header and uses songText as content
  // return songsHtml string
function buildSongsHtml(songs) {
  var songText = "    &ndash; ";
  songs.forEach(function(song) {
    songText = songText + "(" + song.trackNumber + ") " + song.name + " &ndash; ";
  });
  var songsHtml  =
   "                      <li class='list-group-item songs-list'>" +
   "                        <h4 class='inline-header'>Songs:</h4>" +
   "                         <span>" + songText + "</span>" +
   "                      </li>";
  return songsHtml;
}

// generate just the html for an Album row
function generateAlbumHtml(album) {
  var albumHtml =
  "        <!-- one album -->" +
            // each album has data-album-id attribute that's value is album._id S3S4
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" + album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-release-date'>" + album.releaseDate + "</span>" +
  "                      </li>" +
//call buildSongsHtml with album songs as argument S3S3 TC
  buildSongsHtml(album.songs) +

  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
                  // Add a new button in panel-footer to add song S3S4 TC
  "                <button class='btn btn-primary add-song'>Add Song</button>" +
                  // Add a new button in panel-footer to edit album S5S1 TC
  "                <button class='btn btn-info edit-album'>Edit Album</button>" +
                  // Add a new button to each panel-footer S6S1 TC
  "                <button class='btn btn-info edit-songs'>Edit Songs</button>" +
                  // Add a new button in panel-footer to delete album S4S1 TC
  "                <button class='btn btn-danger delete-album'>Delete Album</button>" +
  "                <button class='btn btn-success put-album default-hidden'>Save Changes</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";
  return albumHtml;
 }

// this function takes a single album and renders it to the page
//edit the function renderAlbum to display one Album on the page. S1S1
function renderAlbum(album) {
  var html = generateAlbumHtml(album);
  console.log('rendering album:', album);

  $('#albums').prepend(html);
}
