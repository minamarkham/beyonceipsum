import { configureStore } from '@reduxjs/toolkit';
import loremIpsumReducer from './ipsum';

const store = configureStore({
	reducer: {
		loremIpsum: loremIpsumReducer,
	},
});

export default store;
