import { formatUnits } from "viem";
import { setTrdoDecimals } from "@/store/features/web3Slices/trdoTokenSlice";
import {
  setCurrentDrawId,
  setOwnerAddress,
  setTrdoDrawInfo,
  setAllDraws,
} from "@/store/features/web3Slices/trdoLotterySlice";
import { formatTokenValue } from "../utils/formatters";
import { CloudCog } from "lucide-react";
import { fetchAllDraws } from "@/backendServices/drawService";

export const globalDataMapper = async (results, dispatch) => {
  const {
    rawTrdoDecimals,
    rawCurrentDrawId,
    rawTrdoDrawInfo,
    rawAllDraws,
    ownerAddress,
  } = results;

  const trdoDecs = Number(rawTrdoDecimals) || 18;
  dispatch(setTrdoDecimals(trdoDecs));

  dispatch(setCurrentDrawId(Number(rawCurrentDrawId)));

  dispatch(setOwnerAddress(ownerAddress));

  // Fetch backend draw data to get drawBanner and drawTitle
  let backendDrawsMap = {};
  try {
    const backendResponse = await fetchAllDraws();
    if (backendResponse.success && backendResponse.data) {
      // Create a map of drawId -> backend draw data for easy lookup
      backendDrawsMap = backendResponse.data.reduce((acc, draw) => {
        acc[Number(draw.drawId)] = draw;
        return acc;
      }, {});
      console.log("Backend draws loaded:", backendDrawsMap);
    }
  } catch (error) {
    console.error("Failed to fetch backend draws:", error);
  }

  const formatDraw = (draw) => {
    const {
      drawId,
      drawStartTime,
      drawEndTime,
      ticketPrice,
      totalTickets,
      remainingTickets,
      winningPoolAmounts,
      isActive,
      winnersAnnounced,
      ticketsSold,
      referralPercents,
      topWinnerAmounts,
      topWinners,
      adminFeePool,
      rewardsCalculated,
      rewardAmountFirst,
      rewardAmountSecond,
      rewardAmountThird,
      rewardAmountGroupA,
      rewardAmountGroupB,
      rewardAmountGroupC,
      endGroupA,
      endGroupB,
      endGroupC,
    } = draw;

    const numericDrawId = Number(drawId);
    const backendDraw = backendDrawsMap[numericDrawId] || {};

    return {
      drawId: numericDrawId,
      drawStartTime: Number(drawStartTime),
      drawEndTime: Number(drawEndTime),
      ticketPrice: formatTokenValue(ticketPrice, trdoDecs, 2),
      totalTickets: Number(totalTickets),
      remainingTickets: Number(remainingTickets),
      totalPrizePool: formatTokenValue(winningPoolAmounts, trdoDecs, 2),
      isActive: isActive,
      isEnded: winnersAnnounced,
      ticketsSold: Number(ticketsSold),
      referralPercents: referralPercents.map(Number),
      topWinnerAmounts: topWinnerAmounts.map((amount) =>
        formatTokenValue(amount, trdoDecs, 2)
      ),
      topWinners: topWinners,
      areWinnersAnnounced: winnersAnnounced,
      winningPoolAmounts: formatTokenValue(winningPoolAmounts, trdoDecs, 2),
      // Add backend data
      drawBanner: backendDraw.drawBanner || null,
      drawTitle: backendDraw.drawTitle || null,
      backendStatus: backendDraw.isActive ?? 0,
      adminFeePool: formatTokenValue(adminFeePool, trdoDecs, 2),
    };
  };

  if (rawAllDraws && rawAllDraws.length > 0) {
    const formattedAllDraws = rawAllDraws.map(formatDraw);
    console.log("formattedAllDraws with backend data", formattedAllDraws);
    dispatch(setAllDraws(formattedAllDraws));

    // Set the latest draw as the current info, or find the active one?
    // For now, let's set the latest one as trdoDrawInfo to maintain compatibility
    // with components that rely on it (like if they haven't been updated yet).
    // But ideally components should use allDraws.
    const latestDraw = formattedAllDraws[formattedAllDraws.length - 1];
    dispatch(setTrdoDrawInfo(latestDraw));

    return { trdoDecs, formattedTrdoDrawInfo: latestDraw, formattedAllDraws };
  } else if (rawTrdoDrawInfo) {
    // Fallback if rawAllDraws is not present but rawTrdoDrawInfo is
    const formattedTrdoDrawInfo = formatDraw(rawTrdoDrawInfo);
    dispatch(setTrdoDrawInfo(formattedTrdoDrawInfo));
    return { trdoDecs, formattedTrdoDrawInfo };
  }

  return { trdoDecs };
};
