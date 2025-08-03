import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Song {
  artworkUrl: string;
  previewUrl: string;
  chartId: string | number;
  title: string;
  artist: string;
}

interface PlayerState {
  charts: Song[];
  isPlaying: boolean;
  activeSongIndex: number | null;
}

const initialState: PlayerState = {
  charts: [],
  isPlaying: false,
  activeSongIndex: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCharts: (state, action:PayloadAction<Song[]>) => {
      state.charts = action.payload;
    },
    setActiveSongIndex: (state, action: PayloadAction<number>) => {
      state.activeSongIndex = action.payload;
      state.isPlaying = true;
    },
    resume: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
  },
});

const playerReducer = playerSlice.reducer;
export default playerReducer;

export const {setActiveSongIndex, setCharts, resume, pause} = playerSlice.actions
