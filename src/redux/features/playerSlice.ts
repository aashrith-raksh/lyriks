import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SongCategory = "charts" | "artistTopSongs";

export interface Song {
  artworkUrl: string;
  previewUrl: string;
  id: string | number;
  title: string;
  artist: string;
  songCategory: SongCategory;
}

interface PlayerState {
  charts: Song[];
  artistTopSongs: Song[];
  activeSongCategory: SongCategory;
  activeSong: Song | null;
  isPlaying: boolean;
  activeSongIndex: number | null;
  volume: number;
  isMuted: boolean;
  duration?: number;
  currentTime: number;
}

const initialState: PlayerState = {
  charts: [],
  artistTopSongs: [],
  activeSong: null,
  activeSongCategory: "charts",
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
    setCharts: (state, action: PayloadAction<Song[]>) => {
      state.charts = action.payload;
    },
    setArtistTopSongs: (
      state,
      action: PayloadAction<{
        activeSongCategory: "artistTopSongs";
        artistTopSongs: Song[];
      }>
    ) => {
      state.activeSongCategory = action.payload.activeSongCategory;
      state.artistTopSongs = action.payload.artistTopSongs;
    },
    setActiveSongIndex: (state, action: PayloadAction<number>) => {
      state.activeSongIndex = action.payload;
      state.isPlaying = true;
    },
    setActiveSong: (
      state,
      action: PayloadAction<{ activeSongCategory: SongCategory }>
    ) => {
      state.activeSongCategory = action.payload.activeSongCategory
      if (action.payload.activeSongCategory == "artistTopSongs") {
        state.activeSong =
          state.activeSongIndex != null
            ? state.artistTopSongs[state.activeSongIndex]
            : null;
          }else{
            
            state.activeSong =
              state.activeSongIndex != null
                ? state.charts[state.activeSongIndex]
                : null;
      }
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
  setArtistTopSongs,
  resume,
  pause,
  setVolume,
  setIsMuted,
  setDuration,
  setCurrentTime,
  setActiveSong
} = playerSlice.actions;
