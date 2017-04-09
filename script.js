//Loading Pitchfork JSON data
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function() {
       if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
       }
    }
    xobj.send(null);
}

loadJSON(function(response) {
    //Grabbing the JSON and sorting it by date (newest to oldest)
    var pitchforkJSON = JSON.parse(response);
    var dateSort = pitchforkJSON.sort(function(a,b) {
      return new Date(b.date) - new Date(a.date);
   });

   for (var i = 0; i < dateSort.length; i += 1) {
      //Big dirty Spotify Search URL
      var spotifyURL = encodeURI('https://api.spotify.com/v1/search?q=album:' + dateSort[i].album + '%20artist:' + dateSort[i].artist + '&type=album').replace(/25/g,'');
      //Making our Ajax call to the Spotify API
      $.ajax ({
          url: spotifyURL,
          data: {
             q: 'album',
             type: 'album'
          },
          success: function(data) {
             var openURL = data.albums.items[0].external_urls.spotify; //open Spotify
             var albums = data.albums.items[0].images[0].url; //album images
             var artistName = data.albums.items[0].artists[0].name;
             var albumName = data.albums.items[0].name;
             var albumInfo = '<div class="album"><a target="_blank" href={{url}}><img src={{image}}></a><div><p>{{artist}}</p><p>{{album}}</p></div></div>'
             var template = Handlebars.compile(albumInfo);
             var data = template({url: openURL,
                image: albums,
                artist: artistName,
                album: albumName,
             });
             document.getElementById('container').innerHTML += data;
          },
          error: function() {
             console.log("Error retrieving spotify API");
          }
     });
  }
});
