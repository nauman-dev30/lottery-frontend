import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDrawId: 0,
  trdoDrawInfo: null,
  allDraws: [],
  userAggregateStats: null,
  lotteryTeamInfo: null,
  userPurchasedTicketCount: 0,
  ownerAddress: "",
};

const trdoLotterySlice = createSlice({
  name: "trdoLottery",
  initialState,
  reducers: {
    setCurrentDrawId(state, action) {
      state.currentDrawId = action.payload;
    },
    setTrdoDrawInfo(state, action) {
      state.trdoDrawInfo = action.payload;
    },
    setAllDraws(state, action) {
      state.allDraws = action.payload;
    },
    setUserAggregateStats(state, action) {
      state.userAggregateStats = action.payload;
    },
    setLotteryTeamInfo(state, action) {
      state.lotteryTeamInfo = action.payload;
    },
    setUserPurchasedTicketCount(state, action) {
      state.userPurchasedTicketCount = action.payload;
    },
    setOwnerAddress: (state, action) => {
      state.ownerAddress = action.payload;
    },
  },
});

export const {
  setCurrentDrawId,
  setTrdoDrawInfo,
  setAllDraws,
  setUserAggregateStats,
  setLotteryTeamInfo,
  setUserPurchasedTicketCount,
  setOwnerAddress,
} = trdoLotterySlice.actions;

export default trdoLotterySlice.reducer;
