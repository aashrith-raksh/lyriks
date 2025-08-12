import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

interface GenreState {
    genre: string;
    searchTerm: string;
}

const initialState: GenreState = {
    genre: 'POP',
    searchTerm: ""
};

const songsFilterSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setGenre(state, action: PayloadAction<string>) {
            state.genre = action.payload;
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        
    },
});

export const { setGenre, setSearchTerm } = songsFilterSlice.actions;
const songsFilterReducer = songsFilterSlice.reducer
export default songsFilterReducer;