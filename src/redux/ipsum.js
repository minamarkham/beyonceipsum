import { createSlice } from '@reduxjs/toolkit';
import lyrics from '../data/lyrics';

const initialState = {
	text: '',
	includeExplicit: false,
	includeGreeting: false,
};

const slayArray = [
	'Slay',
	"'Cause I slay",
	'I slay',
	"We gon' slay",
	'We slay',
];

export const generateLoremIpsum =
	({
		paragraphs,
		paragraphLength,
		includeSlay,
		includeExplicit,
		includeGreeting,
		selectedAlbums,
	}) =>
	(dispatch) => {
		let ipsumText = '';
		let isFirstParagraph = true;
		const numSentences =
			paragraphLength === 'short'
				? 3
				: paragraphLength === 'medium'
				? 5
				: 7;

		for (let i = 0; i < paragraphs; i++) {
			let paragraph = '';

			// Add the greeting to the first paragraph
			if (isFirstParagraph && includeGreeting) {
				paragraph += 'Hey, Ms. Carter! ';
			}

			for (let j = 0; j < numSentences; j++) {
				const album = getRandomAlbum(selectedAlbums);
				const lyricsArray = includeExplicit
					? [...album.explicit, ...album.clean]
					: album.clean;
				const sentence = generateSentence(
					lyricsArray,
					includeSlay,
					includeGreeting && isFirstParagraph,
				);
				paragraph += sentence + ' ';
			}

			// Add paragraph markup
			paragraph = `<p>${paragraph.trim()}</p>`;
			isFirstParagraph = false;
			ipsumText += paragraph + '\n\n';
		}

		dispatch(setLoremIpsum(ipsumText));
	};

// Modify the generateSentence function to generate a single sentence
const generateSentence = (lyricsArray, includeSlay) => {
	const sentenceParts = [];
	const randomIndex = Math.floor(Math.random() * lyricsArray.length);
	const sentence = lyricsArray[randomIndex] + '.';

	sentenceParts.push(sentence);

	// Add a "slay" phrase at the end of the sentence if includeSlay is true
	if (includeSlay && Math.random() < 0.5) {
		const randomSlayIndex = getRandomSlayIndex();
		const slayPhrase = slayArray[randomSlayIndex] + '.';
		sentenceParts.push(slayPhrase);
	}

	return sentenceParts.join(' ');
};

const getRandomAlbum = (selectedAlbums) => {
	const availableAlbums =
		selectedAlbums.length > 0 ? selectedAlbums : Object.keys(lyrics);

	const randomKey =
		availableAlbums[Math.floor(Math.random() * availableAlbums.length)];
	return lyrics[randomKey];
};

const getRandomSlayIndex = () => {
	return Math.floor(Math.random() * slayArray.length);
};

const loremIpsumSlice = createSlice({
	name: 'loremIpsum',
	initialState,
	reducers: {
		setLoremIpsum: (state, action) => {
			state.text = action.payload;
		},
		clearLoremIpsum: (state) => {
			state.text = '';
		},
	},
});

export const { setLoremIpsum, clearLoremIpsum } = loremIpsumSlice.actions;

export const getRandomLyricFromRandomAlbum = () => {
	// Extract album names from the keys of beyonceLyrics
	const albumNames = Object.keys(lyrics);

	// Check if there are albums available
	if (albumNames.length > 0) {
		// Get a random album name from the array
		const randomAlbumName =
			albumNames[Math.floor(Math.random() * albumNames.length)];

		// Retrieve the selected album object
		const selectedAlbum = lyrics[randomAlbumName];

		// Check if the selected album has clean lyrics
		if (
			selectedAlbum &&
			selectedAlbum.clean &&
			selectedAlbum.clean.length > 0
		) {
			// Get a random clean lyric from the selected album
			const randomIndex = Math.floor(
				Math.random() * selectedAlbum.clean.length,
			);
			return selectedAlbum.clean[randomIndex];
		}
	}

	// Return a default message if no suitable lyric is found
	return 'To the left, to the left!';
};

export default loremIpsumSlice.reducer;
