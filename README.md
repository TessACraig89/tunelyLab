# tunelyLab

## Sprints Overview

### Sprint 1
    
    1. display hard-coded data from `app.js` on `index.html`

    2. add index route `/api/albums` on server

    3. set up the database

    4. seed database

    5. use seeded database in `/api/albums`

### Sprint 2
    
    1. use bootstrap to create a form to input album

    2. use jQuery to capture && serialize form values

    3. add a `.post` method to our server so that it can receive the form's data

    4.
    - client side: setup your form handler to make an AJAX post with the data
    - server-side: break the data we're getting in the  `genre` field into an array.

    5. Connect the POST route to the database to  return the new album

    6. Display server returned JSON on page

    Challenges:
    - Add HTML5 form validations to the form
    - In form replace textarea for genre with a field that has a button to add a new field for each genre
    - Convert the form to a modal && add a link to the right-side of the "Albums" header to open it!

### Sprint 3
    
    1. Create the new model
    - Create && export `models/song.js`
    - require in `./albums.js`
    - change Album schema to have songs array using `Song.schema`

    2.  
    - copy sample songs into `seed.js`
    - use a forEach loop to add sample songs to each sample album in `seed.js`

    3.
    - in `app.js` create `buildSongsHtml()` function, takes songs array as parameter && returns HTML string
    - call function in `renderAlbum` to add <li> to each album

    4. create functionality to add new songs using button to open boostrap modal by setting `album-id` attribute on the modal when it is displayed

    5. add a function to handle the submit on the modal and POST the form data as a new song

    6. add the POST route on the server, using request-params (URL parameters)

    7. `GET /api/albums/:id` route and use that to re-render the altered album, remove old copy, close mode

    Challenges:
    - Add the remaining GET and POST routes to *Create* and *Read*
    - Add imageUrl as a property on Albums.  Update everything to use it!
    - Add track length as a field for each album

### Sprint 4
    
    0. checkout the solutions branch 3, create a new branch from this

    1. on the front-end add a button to delete an album

    2.
    - add a route for `DELETE /api/albums/:id` to our server
    - test with curl or postman
    - Connect it to the database and delete the specified album

    3. when delete button is clicked, send DELETE request to the server and remove album from page

    Challenges:
    - Prompt the user with an alert "Are you sure?" when they click delete.
    - Add an animation for album deletion.

### Sprint 5
    
    1. add button for users to edit each album
    Replace `Edit` with `Save Changes` button when clicked, use jQuery

    2.
    - react to `Save Changes` being clicked  
    - Prepare an AJAX call to the server at `PUT /api/albums/:id`

    3.  
    - Add the `app.put` method on the server
    - connect it to the database

    Challenges:
    - When an edit is in progress disable or hide the other buttons.
    - Add a new modal instead of making changes directly in the album row.
    - Add a cancel button for the edits

### Sprint 6
    
    1.
    - Add new modal to page
    - Add new button 'Edit Songs' in the panel-footer of each album row
    - When 'Edit Songs' is clicked open modal

    2.
    - create form for deleting and editing each song
    - write a function that puts form into a HTML string
    - Embed id's in `data-` attributes in form
    - use a `GET /api/albums/:album_id/songs` index route to get all songs for a particular album

    3.
    - Create the server-side routes for `DELETE /api/albums/:album_id/songs/:id` and `PUT /api/albums/:album_id/songs/:id`
    - Write client-side AJAX to delete items when the delete button is clicked
    - Make sure deleted input is removed && song list on the page is updated

    4.
    - After user clicks a 'Save' button, make an AJAX `PUT` request for edited song
    - Update the page with the changed song
    - close modal when close button is clicked

    5. Add functionality so user can create new songs && have them added to the list from within the modal.

    Challenges:
    - Add a _saving_ spinner or animation for each song when it is saving.
    - Save each song when the user leaves the input box.
    - Client-side validations: make sure trackNumbers are numbers & unique. In the form sort them by trackNumber.
    - Consider using a Bootstrap theme && Font Awesome.

## Task Assignments
Create a public folder with static images
    
    * HTML - Chris
    * CSS - Tess
    * JS - All

Create app.js file with middleware - Neo

Routes file - Tess

Create database - Tess

Seed database - Neo

Deployment - Chris
