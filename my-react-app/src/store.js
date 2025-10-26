import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import postsReducer from './slices/postsSlice';
import postReducer from './slices/postSlice';
import reduxFormSliceReducer from './slices/reduxFormSlice';
import formikFormSliceReducer from './slices/formikFormSlice'
const store = configureStore({
    reducer: {
        theme: themeReducer,
        posts: postsReducer,
        post: postReducer,
        reduxForm: reduxFormSliceReducer,
        formikForm: formikFormSliceReducer,
    },
});

export default store;