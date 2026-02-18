"use client";
import React from "react";
import ContestImage from "./ContestImage";
import CountdownTimer from "@/components/common/Countdown";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function CurrentContest() {
  const { allDraws } = useSelector((state) => state.trdoLottery);

  if (!allDraws || allDraws.length === 0) {
    return null; // Or a loading state
  }

  // Find all active draws: ones that have NOT ended
  const activeDraws = allDraws.filter(
    (draw) => Date.now() <= Number(draw.drawEndTime) * 1000
  );

  if (activeDraws.length === 0) {
    return (
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="favorite-game favorite">
              <div className="heading-dashboard mb-30 wow fadeInUp">
                Active Contest
              </div>
              <div className="row">
                <div className="col-12">
                  <p>No active contests found.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div className="favorite-game favorite">
            <div className="heading-dashboard mb-30 wow fadeInUp">
              Active Contest
            </div>

            <div className="row">
              {activeDraws.map((draw) => {
                const winUpTo =
                  draw.totalTickets * parseFloat(draw.ticketPrice) * 0.9;
                
                const drawStartTimeInMs = Number(draw.drawStartTime) * 1000;
                const drawEndTimeInMs = Number(draw.drawEndTime) * 1000;
                const now = Date.now();

                const renderTimerContent = () => {
                  if (drawEndTimeInMs === 0) {
                    return <span>Loading draw info...</span>;
                  }
                  if (now < drawStartTimeInMs) {
                    return <span>Draw starting soon...</span>;
                  }
                  if (now >= drawStartTimeInMs && now < drawEndTimeInMs) {
                    return <CountdownTimer targetDate={drawEndTimeInMs} style={7} />;
                  }
                  return <span>Draw has ended.</span>;
                };

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
                          {renderTimerContent()}
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
                          <Link
                            href={`/contest-details/${draw.drawId}`}
                            className="tf-btn"
                          >
                            {draw.ticketPrice} USDT To play{" "}
                            <i className="icon-right"> </i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}