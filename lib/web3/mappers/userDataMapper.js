import {
  setTrdoAllowance,
  setTrdoBalance,
} from "@/store/features/web3Slices/trdoTokenSlice";
import { formatTokenValue } from "../utils/formatters";
import {
  setLotteryTeamInfo,
  setUserAggregateStats,
  setUserPurchasedTicketCount,
} from "@/store/features/web3Slices/trdoLotterySlice";

export const userDataMapper = (data, address, decimals, dispatch) => {
  const {
    rawTrdoBalance,
    rawTrdoAllowance,
    rawUserAggregateStats,
    rawLotteryTeamInfo,
    userPurchasedTicketCount,
  } = data;

  dispatch(setTrdoBalance(formatTokenValue(rawTrdoBalance, decimals?.trdoDecs)));
  dispatch(
    setTrdoAllowance(formatTokenValue(rawTrdoAllowance, decimals?.trdoDecs))
  );

  const [
    totalWinnings,
    totalWins,
    totalPurchasedTickets,
    totalDirectAffiliates,
    activeDirectAffiliates,
  ] = rawUserAggregateStats;
  dispatch(
    setUserAggregateStats({
      totalWinnings: formatTokenValue(totalWinnings, decimals?.trdoDecs),
      totalWins: Number(totalWins),
      totalPurchasedTickets: Number(totalPurchasedTickets),
      totalDirectAffiliates: Number(totalDirectAffiliates),
      activeDirectAffiliates: Number(activeDirectAffiliates),
    })
  );

  if (rawLotteryTeamInfo) {
    const [
      totalTeamMembers,
      totalTeamInvestment,
      lockedCommission,
      unlockedCommission,
      levelCounts,
      levelIncomes,
    ] = rawLotteryTeamInfo;

    dispatch(
      setLotteryTeamInfo({
        totalTeamMembers: Number(totalTeamMembers),
        totalTeamInvestment: formatTokenValue(
          totalTeamInvestment,
          decimals?.trdoDecs
        ),
        lockedCommission: formatTokenValue(lockedCommission, decimals?.trdoDecs),
        unlockedCommission: formatTokenValue(
          unlockedCommission,
          decimals?.trdoDecs
        ),
        levelCounts: levelCounts.map((count) => Number(count)),
        levelIncomes: levelIncomes.map((income) =>
          formatTokenValue(income, decimals?.trdoDecs)
        ),
      })
    );
  }

  dispatch(setUserPurchasedTicketCount(Number(userPurchasedTicketCount)));
};
