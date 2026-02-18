"use client";
import { selectRefreshCounter } from "@/store/features/web3Slices/refreshSlice";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useConfig } from "wagmi";
import { globalDataMapper } from "../mappers/globalDataMapper";
import { userDataMapper } from "../mappers/userDataMapper";
import { fetchGlobalData } from "./globalReadFunctions";
import { fetchUserData } from "./userReadFunctions";

export function useAppData() {
  const userData = useSelector((state) => state.user.userData);
  const address = userData?.walletAddress;
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const config = useConfig();
  const refreshCounter = useSelector(selectRefreshCounter);

  const init = useCallback(async () => {
    // We don't need to show loading for manual refreshes, only initial load.
    // setIsLoading(true); // You can decide if you want a loading state on manual refresh too.

    try {
      const [globalResults] = await Promise.all([fetchGlobalData(config)]);
      const decimals = await globalDataMapper(globalResults, dispatch);
      if (address) {
        const [userResultsObjectFinal] = await Promise.all([
          fetchUserData(config, address),
        ]);
        userDataMapper(userResultsObjectFinal, address, decimals, dispatch);
      }
    } catch (error) {
      console.error("Error fetching application data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [address, config, dispatch]);

  useEffect(() => {
    console.log(
      "Data fetch triggered. Reason: Initial load or manual refresh."
    );
    init();
  }, [init, refreshCounter]);

  // The hook can return a loading state for the UI to use
  return { isLoading };
}
