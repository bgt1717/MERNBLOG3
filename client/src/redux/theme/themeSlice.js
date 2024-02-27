import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            // if the state theme is light change to dark, otherwise change to light. 
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        }
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;