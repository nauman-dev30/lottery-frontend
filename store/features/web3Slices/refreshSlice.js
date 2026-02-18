import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    triggerRefresh: (state) => {
      state.counter += 1;
    },
  },
});

export const { triggerRefresh } = refreshSlice.actions;

export const selectRefreshCounter = (state) => state.refresh.counter;

export default refreshSlice.reducer;
