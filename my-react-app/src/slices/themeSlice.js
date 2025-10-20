import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'світла',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        switchTheme: (state) => {
            state.theme = state.theme === 'світла' ? 'темна' : 'світла';
        },
    },
})

export const { setTheme, switchTheme } = themeSlice.actions;
export default themeSlice.reducer; 
