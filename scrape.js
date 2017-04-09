var osmosis = require('osmosis');

const fs = require('fs');
let savedData = [];

var pageNumber = 8; //this determines how many pages we scrape
//for loop below loops through url and scrapes data as needed
for (var i = 1; i < pageNumber; i += 1) {
var url = 'http://pitchfork.com/reviews/best/albums/?page=' + [i];
   osmosis
   .get(url)
   .follow('.fragment-list > .review @href')
   .find('hgroup')
   .set({
      artist: '.artist-links > li',
      album: '.review-title',
   })
   .find('.score-box')
   .set({
      score: '.score',
   })
   .find('.article-meta')
   .set ({
      date: '.pub-date',
   })
   .log(console.log)
   .data(function(data) {
      console.log(data);
      savedData.push(data);
   })
   .done(function() {
      fs.writeFile('data.json', JSON.stringify( savedData, null, 4), function(err) {
         if(err) console.error(err);
         else console.log('Data Saved to data.json file');
      })
   });
}
