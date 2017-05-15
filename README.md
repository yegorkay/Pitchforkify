# <a href="https://yegorkay.github.io/Pitchforkify/">Pitchforkify</a>
A Spotify library of Pitchfork's highest rated albums.

Latest update: 
- Now references the Pitchfork API instead of a local JSON file. So no more web scraping with Osmosis or Node. 
- Infinite scrolling is now implemented. 
- No more jQuery. Just JavaScript.

Features to add:
- Loading animations.
- Possible search utlity/categories.

Current demo requires mixed content to be enabled. In Chrome, a shield icon will appear at the end of the address bar, click it, then enable unsafe scripts (it's safe! The message only appears due to the Pitchfork API using `http` rather than `https` which results in mixed content). 
