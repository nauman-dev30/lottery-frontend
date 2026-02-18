import { configureStore } from "@reduxjs/toolkit";
import refreshReducer from "./features/web3Slices/refreshSlice";
import trdoTokenReducer from "./features/web3Slices/trdoTokenSlice";
import trdoLotteryReducer from "./features/web3Slices/trdoLotterySlice";
import userReducer from "./features/web3Slices/userSlice";

const store = configureStore({
  reducer: {
    refresh: refreshReducer,
    trdoToken: trdoTokenReducer,
    trdoLottery: trdoLotteryReducer,
    user: userReducer,
  },
});

export default store;
