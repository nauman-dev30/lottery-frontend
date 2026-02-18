import { lotteryReadFunction } from "../hooks/lotteryContract";
import { trdoTokenReadFunction } from "../hooks/trdoToken";

export const fetchGlobalData = async (config, drawId = null) => {
  const [rawTrdoDecimals, rawCurrentDrawId, ownerAddress] = await Promise.all([
    trdoTokenReadFunction(config, "decimals"),
    lotteryReadFunction(config, "currentDrawId"),
    lotteryReadFunction(config, "admin"),
  ]);

  console.log("rawCurrentDrawId", Number(rawCurrentDrawId));
  let rawTrdoDrawInfo = null;
  let rawAllDraws = [];

  const currentId = Number(rawCurrentDrawId);
  if (currentId > 0) {
    // Fetch all draws
    const drawPromises = [];
    for (let i = 1; i <= currentId; i++) {
      drawPromises.push(lotteryReadFunction(config, "getDrawInfo", [i]));
    }
    rawAllDraws = await Promise.all(drawPromises);

    // Keep rawTrdoDrawInfo as the latest one for backward compatibility if needed,
    // or just use the last one.
    if (rawAllDraws.length > 0) {
      rawTrdoDrawInfo = rawAllDraws[rawAllDraws.length - 1];
    }
  }

  console.log("rawTrdoDecimals", rawTrdoDecimals);
  console.log("currentDrawId", rawCurrentDrawId);
  console.log("ownerAddress read", ownerAddress);
  console.log("rawAllDraws", rawAllDraws);

  return {
    rawTrdoDecimals,
    rawCurrentDrawId,
    rawTrdoDrawInfo,
    rawAllDraws,
    ownerAddress,
  };
};
