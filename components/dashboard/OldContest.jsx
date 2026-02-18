"use client";
import React, { useState, useEffect } from "react";
import ContestImage from "./ContestImage";
import CountdownTimer from "@/components/common/Countdown";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setAllDraws } from "@/store/features/web3Slices/trdoLotterySlice";
import { triggerRefresh } from "@/store/features/web3Slices/refreshSlice";
import { fetchAllDraws } from "@/backendServices/drawService";

export default function OldContest() {
  const [showModal, setShowModal] = useState(false);
  const [selectedWinners, setSelectedWinners] = useState([]);
  const { allDraws } = useSelector((state) => state.trdoLottery);
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;

    // Check if there are any ended draws that are still processing (no winners yet)
    const hasProcessingDraws = allDraws?.some(
      (draw) =>
        Date.now() > Number(draw.drawEndTime) * 1000 &&
        !draw.areWinnersAnnounced
    );

    if (hasProcessingDraws) {
      intervalId = setInterval(async () => {
        try {
          // Poll backend instead of blockchain to save RPC limits
          const response = await fetchAllDraws();
          if (response.success && response.data) {
            // Re-map backend data to maintain formatting (like drawBanner, etc)
            // But specifically we need the latest 'isActive' from DB
            let transitionToCompleted = false;
            const updatedAllDraws = allDraws.map((d) => {
              const backendMatch = response.data.find(
                (bd) => Number(bd.drawId) === Number(d.drawId)
              );
              if (backendMatch) {
                // If draw just completed in backend, mark it completed locally
                const isNewlyCompleted = backendMatch.isActive === 2 && !d.areWinnersAnnounced;
                if (isNewlyCompleted) transitionToCompleted = true;

                return {
                  ...d,
                  backendStatus: backendMatch.isActive,
                  areWinnersAnnounced: d.areWinnersAnnounced || backendMatch.isActive === 2
                };
              }
              return d;
            });

            dispatch(setAllDraws(updatedAllDraws));

            // If any draw transitioned to completed, trigger a full refresh to sync blockchain data
            if (transitionToCompleted) {
              dispatch(triggerRefresh());
            }
          }
        } catch (error) {
          console.error("Failed to poll draw statuses:", error);
        }
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [allDraws, dispatch]);

  const openWinnerModal = (draw) => {
    const formatAddr = (addr) =>
      addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "Winner";

    const winners = [
      {
        position: "1st",
        name: formatAddr(draw.topWinners?.[0]),
        amount: draw.topWinnerAmounts?.[0] || 0,
      },
      {
        position: "2nd",
        name: formatAddr(draw.topWinners?.[1]),
        amount: draw.topWinnerAmounts?.[1] || 0,
      },
      {
        position: "3rd",
        name: formatAddr(draw.topWinners?.[2]),
        amount: draw.topWinnerAmounts?.[2] || 0,
      },
    ];
    setSelectedWinners(winners);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!allDraws || allDraws.length === 0) {
    return null;
  }

  const endedDraws = allDraws.filter(
    (draw) => Date.now() > Number(draw.drawEndTime) * 1000
  );

  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div className="favorite-game favorite">
            {/* Cards */}
            <div className="row">
              {endedDraws.length > 0 ? (
                endedDraws.map((draw) => {
                  const winUpTo =
                    draw.totalTickets * parseFloat(draw.ticketPrice) * 0.9;

                  // Format the ended date
                  const endedDate = new Date(Number(draw.drawEndTime) * 1000);
                  const formattedEndDate = endedDate.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      className="col-12 col-md-6 col-lg-4 mb-4"
                      key={draw.drawId}
                    >
                      <div className="wg-game style-5 hover-img">
                        <div className="wg-game-image image-wrap">
                          <ContestImage
                            className="lazyloaded"
                            alt={`Contest ${draw.drawId}`}
                            src={draw.drawBanner || "contest-1.jpg"}
                            width={700}
                            height={460}
                          />
                          <span
                            className="js-countdown text-left"
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              backdropFilter: "blur(2px)"
                            }}
                          >
                            <span>Ended: {formattedEndDate}</span>
                          </span>
                        </div>

                        <div className="content">
                          <div className="heading">
                            <h4 className="title fw-9">
                              <Link href={`/contest-details/${draw.drawId}`}>
                                {draw.ticketPrice} USDT
                              </Link>
                            </h4>

                            <ul className="sub-title-list">
                              <li className="item">
                                <i className="icon-remaining" />
                                <p>Contest No: Lo{draw.drawId}</p>
                              </li>
                              <li className="item">
                                <i className="icon-ticket" />
                                <p>
                                  <span>{draw.remainingTickets}</span> Remaining
                                </p>
                              </li>
                            </ul>

                            <p className="text fs-14 fw-9">Win up to</p>
                            <p className="money text-color-clip style-6">
                              {winUpTo.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                              USDT
                            </p>

                            <button
                              onClick={() => {
                                if (draw.areWinnersAnnounced)
                                  openWinnerModal(draw);
                              }}
                              className="tf-btn"
                              style={{
                                width: "100%",
                                opacity: draw.areWinnersAnnounced ? 1 : 0.8,
                                cursor: draw.areWinnersAnnounced
                                  ? "pointer"
                                  : "default",
                              }}
                            >
                              {draw.areWinnersAnnounced || draw.backendStatus === 2 ? (
                                <>
                                  Check Winner <i className="icon-right"></i>
                                </>
                              ) : draw.backendStatus === 1 ? (
                                <>
                                  {/* Buying Remaining Tickets */}
                                  processing draw <span className="spinner"></span>
                                </>
                              ) : draw.backendStatus === 3 ? (
                                <>
                                  Referral Distribution <span className="spinner"></span>
                                </>
                              ) : draw.backendStatus === 4 ? (
                                <>
                                  Deciding Winners <span className="spinner"></span>
                                </>
                              ) : draw.backendStatus === 5 ? (
                                <span style={{ fontWeight: "bold" }}>
                                  Error: Tickets Not Enough <i className="icon-close"></i>
                                </span>
                              ) : (
                                <>
                                  Processing Draw <span className="spinner"></span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12">
                  <p>No ended contests found.</p>
                </div>
              )}
            </div>

            {/* WINNER MODAL */}
            {showModal && (
              <div className="winner-overlay" onClick={closeModal}>
                <div
                  className="winner-card"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Energetic Heading */}
                  <h2 className="winner-heading">Congratulations!</h2>

                  {/* Centered Podium */}
                  <div className="podium-wrap">
                    {/* 1st Place */}
                    <div className="podium-column">
                      <div className="coin-wrap first">
                        <img
                          src="images/section/goldcoin.png"
                          className="coin"
                        />
                      </div>
                      <div className="podium-step step-1 ">
                        <p className="winner-step-name">
                          Address : {selectedWinners[0].name}
                        </p>
                        <p className="winner-step-amount">
                          Prize : {selectedWinners[0].amount} USDT
                        </p>
                      </div>
                    </div>

                    {/* 2nd Place */}
                    <div className="podium-column">
                      <div className="coin-wrap second">
                        <img
                          src="images/section/silvercoin.png"
                          className="coin"
                        />
                      </div>
                      <div className="podium-step step-2">
                        <p className="winner-step-name">
                          Address : {selectedWinners[1].name}
                        </p>
                        <p className="winner-step-amount">
                          Prize : {selectedWinners[1].amount} USDT
                        </p>
                      </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="podium-column">
                      <div className="coin-wrap third">
                        <img
                          src="images/section/bronze-coin.png"
                          className="coin"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div className="podium-step step-3">
                        <p className="winner-step-name">
                          Address : {selectedWinners[2].name}
                        </p>
                        <p className="winner-step-amount">
                          Prize : {selectedWinners[2].amount} USDT
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={closeModal}
                    className="tf-btn"
                    style={{ width: "100%", marginTop: "18px" }}
                  >
                    Close <i className="icon-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* All styles in one block outside the conditional */}
            <style jsx>{`
              .winner-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.25s ease-out;
              }

              .winner-card {
                width: 560px;
                padding: 40px;
                border-radius: 22px;
                background: rgba(20, 20, 32, 0.8);
                border: 1px solid rgba(160, 120, 255, 0.4);
                box-shadow: 0 0 50px rgba(140, 80, 255, 0.45);
                animation: cardPop 0.35s cubic-bezier(0.3, 1.4, 0.4, 1);
              }

              .winner-heading {
                text-align: center;
                font-size: 36px;
                font-weight: 800;
                color: #f5e4ff;
                margin-bottom: 30px;
                animation: headingBlast 0.55s ease-out forwards;
                opacity: 1;
              }

              @keyframes headingBlast {
                0% {
                  opacity: 0;
                  transform: scale(0.6) rotate(-8deg);
                  filter: blur(4px);
                }
                60% {
                  opacity: 1;
                  transform: scale(1.15);
                  filter: blur(0px);
                }
                100% {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              .podium-wrap {
                display: flex;
                justify-content: center;
                gap: 40px;
                align-items: flex-end;
              }

              .podium-column {
                display: flex;
                flex-direction: column;
                align-items: center;
              }

              .coin-wrap {
                width: 120px;
                height: 120px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 12px;
                animation: coinFloat 2s ease-in-out infinite;
              }

              .coin {
                width: 120px;
                height: 120px;
                object-fit: contain;
                animation: coinSpin 0.9s ease-out;
                filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.35));
              }

              @keyframes coinSpin {
                0% {
                  transform: rotateY(0deg) scale(0.5);
                  opacity: 0;
                }
                100% {
                  transform: rotateY(360deg) scale(1);
                  opacity: 1;
                }
              }

              @keyframes coinFloat {
                0% {
                  transform: translateY(0px);
                }
                50% {
                  transform: translateY(-10px);
                }
                100% {
                  transform: translateY(0px);
                }
              }

              .podium-step {
                width: 130px;
                border-radius: 12px;
                padding: 12px 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                background: linear-gradient(
                  180deg,
                  rgba(150, 100, 255, 0.25),
                  rgba(30, 20, 60, 0.7)
                );
                border: 1px solid rgba(160, 120, 255, 0.35);
                box-shadow: 0 0 22px rgba(140, 80, 255, 0.35);
              }

              .step-1 {
                height: 135px;
              }
              .step-2 {
                height: 110px;
              }
              .step-3 {
                height: 82px;
              }

              .winner-step-name {
                color: #f4e8ff;
                font-size: 17px;
                font-weight: 700;
                margin-bottom: 4px;
              }

              .winner-step-amount {
                color: #c7b4ff;
                font-size: 15px;
                font-weight: 600;
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }

              @keyframes cardPop {
                0% {
                  transform: scale(0.7) translateY(20px);
                  opacity: 0;
                }
                70% {
                  transform: scale(1.05);
                  opacity: 1;
                }
                100% {
                  transform: scale(1);
                }
              }

              .spinner {
                width: 18px;
                height: 18px;
                border: 2px solid #fff;
                border-top-color: transparent;
                border-radius: 50%;
                margin-left: 8px;
                display: inline-block;
                vertical-align: middle;
                animation: spin 1s linear infinite;
              }

              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}
