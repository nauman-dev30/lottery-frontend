import { lotteryReadFunction } from "../hooks/lotteryContract";
import { trdoTokenReadFunction } from "../hooks/trdoToken";
import { CONTRACT_ADDRESSES } from "../smartContracts/addresses";

export const fetchUserData = async (config, address) => {
  const [
    rawTrdoBalance,
    rawTrdoAllowance,
    rawUserAggregateStats,
    rawCurrentDrawId,
  ] = await Promise.all([
    trdoTokenReadFunction(config, "balanceOf", [address]),
    trdoTokenReadFunction(config, "allowance", [
      address,
      CONTRACT_ADDRESSES.LOTTERY_CONTRACT,
    ]),
    lotteryReadFunction(config, "getUserAggregateStats", [address]),
    lotteryReadFunction(config, "currentDrawId"),
  ]);

  let rawLotteryTeamInfo = null;
  let userPurchasedTicketCount = 0;

  const currrentDrawId = Number(rawCurrentDrawId);
  if (currrentDrawId > 0) {
    rawLotteryTeamInfo = await lotteryReadFunction(config, "getTeamInfo", [
      currrentDrawId,
      address,
    ]);

    userPurchasedTicketCount = await lotteryReadFunction(
      config,
      "getUserTicketCount",
      [currrentDrawId, address]
    );
  }

  console.log("rawTrdoBalance", rawTrdoBalance);
  return {
    rawTrdoBalance,
    rawTrdoAllowance,
    rawUserAggregateStats,
    rawLotteryTeamInfo,
    userPurchasedTicketCount,
  };
};
