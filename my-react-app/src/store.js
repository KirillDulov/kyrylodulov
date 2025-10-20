import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import postsReducer from './slices/postsSlice';
import postReducer from './slices/postSlice';

const store = configureStore( {
    reducer: {
        theme: themeReducer,
        posts: postsReducer,
        post: postReducer,
    },
});

export default store;