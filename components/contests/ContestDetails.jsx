"use client";
import Image from "next/image";
import ContestImage from "../dashboard/ContestImage";
import CountdownTimer from "../common/Countdown";
import Descriptions from "./Descriptions";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { lotteryWriteFunction } from "@/lib/web3/hooks/lotteryContract";

import { toast } from "react-toastify";
import { useAccount, useConfig } from "wagmi";
import { parseUnits } from "viem";
import { trdoTokenWriteFunction } from "@/lib/web3/hooks/trdoToken";
import { CONTRACT_ADDRESSES } from "@/lib/web3/smartContracts/addresses";
import ReferalRewardHistory from "../referal-reward-history/ReferalRewardHistory";
import { fetchGlobalData } from "@/lib/web3/fetchBlockchainData/globalReadFunctions";
import { globalDataMapper } from "@/lib/web3/mappers/globalDataMapper";
import { triggerRefresh, selectRefreshCounter } from "@/store/features/web3Slices/refreshSlice";
import { useEffect } from "react";
import { CloudCog } from "lucide-react";

export default function ContestDetails({ contest, id }) {
  const { address } = useAccount();
  const trdoDrawInfoGlobal = useSelector((state) => state.trdoLottery.trdoDrawInfo);
  const [trdoDrawInfo, setTrdoDrawInfo] = useState(null);
  const currentDrawId = useSelector((state) => state.trdoLottery.currentDrawId);
  const trdoAllowance = useSelector((state) => state.trdoToken.trdoAllowance);
  const ownerAddress = useSelector((state) => state.trdoLottery.ownerAddress);
  const trdoDecimals = useSelector((state) => state.trdoToken.trdoDecimals);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const config = useConfig();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const refreshCounter = useSelector(selectRefreshCounter);
  console.log("id", id);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const globalResults = await fetchGlobalData(config, id);
          console.log("globalResults", globalResults);
          const { formattedTrdoDrawInfo, formattedAllDraws } = await globalDataMapper(
            globalResults,
            dispatch
          );

          if (formattedAllDraws && formattedAllDraws.length > 0) {
            const specificDraw = formattedAllDraws.find(d => d.drawId === Number(id));

            if (specificDraw) {
              setTrdoDrawInfo(specificDraw);
            } else {
              // Fallback if not found, though unlikely if id is valid
              setTrdoDrawInfo(formattedTrdoDrawInfo);
            }
          } else if (formattedTrdoDrawInfo) {
            setTrdoDrawInfo(formattedTrdoDrawInfo);
          }
        } catch (error) {
          console.error("Error fetching draw data:", error);
        }
      } else {
        setTrdoDrawInfo(trdoDrawInfoGlobal);
      }
    };
    fetchData();
  }, [id, config, dispatch, refreshCounter]);

  const sponsorAddress =
    !userData?.sponserAddress || userData?.sponserAddress === "No Sponser Found"
      ? ownerAddress
      : userData.sponserAddress;
  console.log("sponsorAddress s", sponsorAddress);
  const ticketPrice = trdoDrawInfo?.ticketPrice;
  // console.log("userData S", userData);
  // console.log("sponsorAddress S", userData?.sponserAddress);
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  const buyTickets = async () => {
    console.log(
      userData?.walletAddress,
      address,
      "usersssssssssssssssssssssssssss"
    );

    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }


    console.log(userData, "usersssssssssssssssssssssssssss");
    let sponserWalletAddress;



    console.log("userData", userData.refCode, ticketPrice, trdoDecimals, currentDrawId, userData?.sponsorAddress);
    if (userData?.sponsorAddress == "No Sponsor Found") {

      sponserWalletAddress = ownerAddress;
    } else {
      sponserWalletAddress = userData?.sponsorAddress;
    }

    // Use the specific draw ID from the displayed draw info
    const targetDrawId = trdoDrawInfo?.drawId || currentDrawId;

    if (!ticketPrice || trdoDecimals === undefined || !targetDrawId) {
      toast.warn("Draw information is not yet loaded. Please wait.");
      return;
    }

    if (Date.now() < Number(trdoDrawInfo.drawStartTime) * 1000) {
      toast.warn("Draw has not started yet.");
      return;
    }

    if (Date.now() > Number(trdoDrawInfo.drawEndTime) * 1000) {
      toast.warn("Draw has ended.");
      return;
    }

    console.log(sponserWalletAddress, "sponerMila");

    if (isLoading) return;

    const totalCostNumber = Number(ticketPrice) * quantity;
    const totalCostBigInt = parseUnits(
      totalCostNumber.toString(),
      trdoDecimals
    );

    setIsLoading(true);
    try {
      if (Number(trdoAllowance) < totalCostNumber) {
        toast.info("Approval required. Please confirm in your wallet.");
        await trdoTokenWriteFunction(config, "approve", [
          CONTRACT_ADDRESSES.LOTTERY_CONTRACT,
          totalCostBigInt,
        ]);
        dispatch(triggerRefresh());
        toast.success("Approval successful! Now confirming your purchase...");
      }

      console.log(targetDrawId, quantity, sponserWalletAddress);

      await lotteryWriteFunction(config, "purchaseTickets", [
        targetDrawId,
        quantity,
        sponserWalletAddress,
      ]);
      dispatch(triggerRefresh());
      toast.success("Purchase successful! Your transaction has been sent.");
    } catch (error) {
      console.error("Error during purchase:", error);
      toast.error(
        error.shortMessage || "Transaction failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sold = trdoDrawInfo?.ticketsSold || 0;
  const total = trdoDrawInfo?.totalTickets || 0;
  const progressPercentage = total > 0 ? (sold / total) * 100 : 0;

  console.log("progressPercentage", progressPercentage);

  return (
    <div className="tf-container tf-spacing-1">
      <div className="row">
        <div className="col-lg-12">
          <div className="heading-page">
            <p className="sub-title type-main-color">
              The chance to win belongs to you
            </p>
            <h2 className="title">
              {contest.title ? contest.title : "The Tronadoo Lottery IX"}
            </h2>
            <p className="text type-secondary">
              This competition has a maximum of {total.toLocaleString()}{" "}
              entries.
            </p>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="content">
            <div className="wg-countdown">
              <h5 className="title">Countdown to the end of the contest:</h5>
              <span className="js-countdown style-2">
                {!trdoDrawInfo ? (
                  <span>Loading...</span>
                ) : (Date.now() < Number(trdoDrawInfo.drawStartTime) * 1000) ? (
                  <span>Draw is not started yet</span>
                ) : (Date.now() > Number(trdoDrawInfo.drawEndTime) * 1000) ? (
                  <span>Draw Ended</span>
                ) : (
                  <CountdownTimer
                    targetDate={Number(trdoDrawInfo.drawEndTime) * 1000}
                  />
                )}
              </span>
            </div>
            <div className="image">
              {!trdoDrawInfo ? (
                <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '400px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <span className="text-secondary">Loading...</span>
                </div>
              ) : trdoDrawInfo.drawBanner ? (
                <ContestImage
                  alt=""
                  src={trdoDrawInfo.drawBanner}
                  width={1316}
                  height={608}
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '400px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <span className="text-secondary">Image Not Found</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* progress-wrap */}
        <div className="col-lg-5 wow fadeInLeft" data-wow-delay="0s">
          <div className="wrap-progress">
            <div className="header-progress">
              <div className="content-right">
                Tickets Sold: <span>{sold}</span>
              </div>
              <span>{total.toLocaleString()}</span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${progressPercentage}%` }}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <p>
              Only {trdoDrawInfo?.remainingTickets?.toLocaleString() || 0}{" "}
              remaining!
            </p>
          </div>
        </div>
        {/* /progress-wrap */}
        {/* price-wrap */}
        <div className="col-lg-7 wow fadeInRight" data-wow-delay="0s">
          <div className="price-wrap">
            <div className="price">
              <span style={{ whiteSpace: "nowrap", display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "16px", marginRight: "4px", fontWeight: "700" }}>
                  USDT
                </span>
                <span style={{ fontSize: "24px", fontWeight: "700" }}>
                  {ticketPrice || "0.00"}
                </span>
              </span>
              <p>/ per ticket</p>
            </div>
            <div className="wrap-quatity" style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
              {!trdoDrawInfo ? (
                <div className="d-flex align-items-center">Loading...</div>
              ) : (
                <>
                  {Date.now() < Number(trdoDrawInfo.drawStartTime) * 1000 && (
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Draw Not Started Yet</div>
                  )}
                  {Date.now() > Number(trdoDrawInfo.drawEndTime) * 1000 && (
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Draw Ended</div>
                  )}

                  <div className="d-flex align-items-center gap-3">
                    <div className="wg-quantity">
                      <span
                        className="btn-quantity minus-btn"
                        onClick={() => setQuantity((pre) => (pre <= 1 ? 1 : pre - 1))}
                      >
                        <i className="icon-minus" />
                      </span>
                      <input
                        type="number"
                        value={quantity}
                        name="number"
                        onChange={handleQuantityChange}
                        min="1"
                      />
                      <span
                        className="btn-quantity plus-btn"
                        onClick={() => setQuantity((pre) => pre + 1)}
                      >
                        <i className="icon-plus" />
                      </span>
                    </div>
                    <div className="btn-buy-tickets">
                      <button
                        className="tf-btn"
                        onClick={buyTickets}
                        disabled={isLoading}
                      >
                        <i className="icon-tickets" />
                        {isLoading ? "Processing..." : "Buy Ticket(s)"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <ReferalRewardHistory />
        <div className="col-lg-12">
          <div className="wg-social">
            <p className="caption type-secondary">Share this contest</p>
            <ul className="list-social">
              <li className="item">
                <a href="#" className="">
                  <i className="icon-facebook" />
                </a>
              </li>
              <li className="item">
                <a href="#" className="">
                  <i className="icon-twitter" />
                </a>
              </li>
              <li className="item">
                <a href="#" className="">
                  <i className="icon-tiktok" />
                </a>
              </li>
              <li className="item">
                <a href="#" className="">
                  <i className="icon-youtube" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-12">
          <Descriptions />
        </div>
      </div>
    </div>
  );
}
