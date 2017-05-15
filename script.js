function generateContent (x) {
	if (x.albums.items[0]) {
		var openURL = x.albums.items[0].external_urls.spotify;
		var albumImage = x.albums.items[0].images[0].url;
		var artistName = x.albums.items[0].artists[0].name;
		var albumName = x.albums.items[0].name;
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
	} else {
		console.log('This album is not on Spotify.');
	};
};

function pitchforkify (y) {
	for (n = 0; n < 12; n++) {
		if (y.results[n].artists[0]) {
			var spotifyURL = encodeURI('https://api.spotify.com/v1/search?q=album:' + y.results[n].tombstone.albums[0].album.display_name + '%20artist:' + y.results[n].artists[0].display_name + '&type=album').replace(/25/g, '');
			fetch(spotifyURL)
			 .then(spotifyData => spotifyData.json())
			 .then(spotifyData => generateContent(spotifyData));
		} else {
			console.log('This album is not on Spotify.');
		};
	};
};

document.body.onload = function Init () {
	var initialURL = 'http://api.pitchfork.com/api/v1/albumreviews/?bnm=1&limit=12';
	fetch(initialURL)
		.then(initialData => initialData.json())
		.then(initialData => pitchforkify(initialData));
};

var offsetNumber = 0;

document.body.onscroll = function Scrolling (e) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
  		var endpoint = 'http://api.pitchfork.com/api/v1/albumreviews/?bnm=1&limit=12&offset=' + (offsetNumber += 12);
  		fetch(endpoint)
  		  .then(data => data.json())
		  .then(data => pitchforkify(data));
    };
};
