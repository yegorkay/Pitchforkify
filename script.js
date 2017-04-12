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
      //Looping Spotify Search URL
      var spotifyURL = 'https://api.spotify.com/v1/search?q=album:' + dateSort[i].album + '%20artist:' + dateSort[i].artist + '&type=album';
      //Making our Ajax call to the Spotify API
      $.ajax ({
          url: spotifyURL,
          data: {
             q: 'album',
             type: 'album'
          },
          success: function(data) {
             var openURL = data.albums.items[0].external_urls.spotify;
             var albumImage = data.albums.items[0].images[0].url;
             var artistName = data.albums.items[0].artists[0].name;
             var albumName = data.albums.items[0].name;
             var albumInfo = `<div class="album">
                                 <a target="_blank" href=${openURL}>
                                    <img src=${albumImage}>
                                 </a>
                                 <div>
                                    <p>${artistName}</p>
                                    <p>${albumName}</p>
                                 </div>
                              </div>`
             document.getElementById('container').innerHTML += albumInfo;
          },
          error: function() {
             console.log("Error retrieving spotify API");
          }
     });
  }
});
