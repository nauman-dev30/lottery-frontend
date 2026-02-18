import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trdoDecimals: 18,
  trdoBalance: 0,
  trdoAllowance: 0,
};

const trdoTokenSlice = createSlice({
  name: "trdoToken",
  initialState,
  reducers: {
    setTrdoDecimals: (state, action) => {
      state.trdoDecimals = action.payload;
    },
    setTrdoBalance: (state, action) => {
      state.trdoBalance = action.payload;
    },
    setTrdoAllowance: (state, action) => {
      state.trdoAllowance = action.payload;
    },
  },
});

export const { setTrdoDecimals, setTrdoBalance, setTrdoAllowance } =
  trdoTokenSlice.actions;

export default trdoTokenSlice.reducer;
