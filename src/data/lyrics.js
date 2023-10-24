// Import individual album objects
const dangerouslyInLove = require('./dangerouslyInLove');
const bDay = require('./bDay');
const iAmSashaFierce = require('./iAmSashaFierce');
const four = require('./four');
const beyonce = require('./beyonce');
const lemonade = require('./lemonade');
const everythingIsLove = require('./everythingIsLove');
const theGift = require('./theGift');
const renaissance = require('./renaissance');
const features = require('./features');
const soundtracks = require('./soundtracks');

// Combine all the album objects into a single object
const lyrics = {
	dangerouslyInLove,
	bDay,
	iAmSashaFierce,
	four,
	beyonce,
	lemonade,
	everythingIsLove,
	theGift,
	renaissance,
	features,
	soundtracks,
};

// Export the combined object
module.exports = lyrics;
