import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
  name: 'songs',
  initialState: { list: [] },
  reducers: {
    fetchSongs: () => { },
    setSongs: (state, action) => {
      state.list = action.payload;
    },
    addSong: () => { },
    updateSong: () => { },
    deleteSong: () => { },
  },
});

export const { fetchSongs, setSongs, addSong, updateSong, deleteSong } = songSlice.actions;
export default songSlice.reducer;