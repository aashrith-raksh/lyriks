import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Song {
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
  volume: number;
  isMuted: boolean;
  duration?: number;
  currentTime: number;
}

const initialState: PlayerState = {
  charts: [],
  isPlaying: false,
  activeSongIndex: null,
  volume: 75,
  isMuted: false,
  duration: undefined,
  currentTime: 0,
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
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setIsMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    setDuration: (state, action: PayloadAction<number | undefined>) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});

const playerReducer = playerSlice.reducer;
export default playerReducer;

export const {
  setActiveSongIndex,
  setCharts,
  resume,
  pause,
  setVolume,
  setIsMuted,
  setDuration,
  setCurrentTime
} = playerSlice.actions;
