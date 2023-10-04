import { createSlice } from '@reduxjs/toolkit';
import lyrics from '../data/lyrics';

const initialState = {
	text: '',
	includeExplicit: false,
	includeGreeting: false,
};

const slayArray = ["'Cause I slay", 'I slay', "We gon' slay", 'We slay'];

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
		// Generate the Lorem Ipsum text based on the selected options
		let ipsumText = '';
		let isFirstParagraph = true;

		for (let i = 0; i < paragraphs; i++) {
			const album = getRandomAlbum(selectedAlbums);
			const lyricsArray = includeExplicit
				? [...album.explicit, ...album.clean]
				: album.clean;
			const paragraph = generateParagraph(
				lyricsArray,
				paragraphLength,
				includeSlay,
				includeGreeting,
				isFirstParagraph,
			);
			isFirstParagraph = false;
			ipsumText += paragraph + '\n\n';
		}

		dispatch(setLoremIpsum(ipsumText));
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

const generateParagraph = (
	lyricsArray,
	paragraphLength,
	includeSlay,
	includeGreeting,
	isFirstParagraph,
) => {
	const sentences = [];
	const numSentences =
		paragraphLength === 'short' ? 3 : paragraphLength === 'medium' ? 5 : 7;
	const paragraphMarkup = '<p>'; // Add desired paragraph markup

	// Add the greeting to the first paragraph
	if (isFirstParagraph && includeGreeting) {
		sentences.push('Hey, Ms. Carter!');
	}

	if (lyricsArray && lyricsArray.length > 0) {
		for (let i = 0; i < numSentences; i++) {
			const randomIndex = Math.floor(Math.random() * lyricsArray.length);
			const sentence = lyricsArray[randomIndex] + '.';
			sentences.push(sentence);

			// Add a "slay" phrase at the end of the sentence if includeSlay is true
			if (includeSlay && Math.random() < 0.5) {
				const randomSlayIndex = getRandomSlayIndex();
				const slayPhrase = slayArray[randomSlayIndex] + '.';
				sentences.push(slayPhrase);
			}
		}
	}

	const paragraph = paragraphMarkup + sentences.join(' ') + '</p>'; // Wrap the sentences in paragraph markup
	return paragraph;
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

export const getRandomLyricFromRandomAlbum = (beyonceLyrics) => {
	// Extract album names from the keys of beyonceLyrics
	const albumNames = Object.keys(beyonceLyrics);

	// Check if there are albums available
	if (albumNames.length > 0) {
		// Get a random album name from the array
		const randomAlbumName =
			albumNames[Math.floor(Math.random() * albumNames.length)];

		// Retrieve the selected album object
		const selectedAlbum = beyonceLyrics[randomAlbumName];

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
