"use client";
import React from "react";
import Image from "next/image";
// We don't need the CountdownTimer component here anymore for the text display
import Link from "next/link";
import Information from "./affiliate/Information";
import Statistics from "./affiliate/Statistics";
import CountdownTimer from "../common/Countdown";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DashboardData() {
  const lotteryTeamInfo = useSelector(
    (state) => state.trdoLottery.lotteryTeamInfo
  );
  const trdoDrawInfo = useSelector((state) => state.trdoLottery.trdoDrawInfo);
  const trdoBalance = useSelector((state) => state.trdoToken.trdoBalance);
  const userAggregateStats = useSelector(
    (state) => state.trdoLottery.userAggregateStats
  );
  const [stats, setStats] = useState({ referredCount: 0, earningsLast30Days: 0 });
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const storedUser = localStorage.getItem("authUser");
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser?._id;

        if (!userId) return;

        const response = await axios.get(`${API_BASE}/api/v1/getUserStats`, {
          params: { id: userId },
        });

        if (response.data?.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchStats();
  }, [API_BASE]);

  const drawStartTimeInSeconds = trdoDrawInfo?.drawStartTime || 0;
  const drawEndTimeInSeconds = trdoDrawInfo?.drawEndTime || 0;

  // --- START: MODIFIED LOGIC FOR TEXT-BASED TIMER ---

  const drawStartTimeInMs = drawStartTimeInSeconds * 1000;
  const drawEndTimeInMs = drawEndTimeInSeconds * 1000;

  // This function now returns a formatted string instead of a component
  const renderTimerContent = () => {
    const now = Date.now();

    // If data hasn't loaded yet or draw is invalid
    if (drawEndTimeInMs === 0) {
      return "a moment";
    }

    // State 1: Draw has not started yet
    if (now < drawStartTimeInMs) {
      return "a moment (starting soon)";
    }

    // Calculate the difference in time
    const difference = drawEndTimeInMs - now;

    // State 3: Draw has ended (or is just ending)
    if (difference <= 0) {
      return "0 days";
    }

    // State 2: Draw is active. Calculate remaining days.
    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (daysLeft === 0) {
      return "less than a day";
    }
    if (daysLeft === 1) {
      return "1 day";
    }
    return `${daysLeft} days`;
  };

  // --- END: MODIFIED LOGIC ---

  return (
    <section className="section-online-lottery">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              {/* <div className="title wow fadeInUp" data-wow-delay="0s">
                Current contest
              </div>
              <p className="fs-14">
                Check your ticket number's to see if you are a Winner in the
                Dream Lottery.
              </p> */}
            </div>
          </div>
          <div className="mb-30">
            <div className="row">
              <div className="col-12 mb-20">
                <div className="wg-our-jackpot style-2 featured-draw-banner">
                  <div className="content">
                    <h2 className="mb-10 text-white">Next Featured Lottery</h2>
                    <h1 className="text-color-clip fs-60 mb-15">
                      {trdoDrawInfo?.drawTitle || "USDT MEGA DRAW"}
                    </h1>
                    
                    <div className="draw-info-grid mb-25">
                      <div className="info-item">
                        <span className="label">Ticket Price</span>
                        <span className="value">{trdoDrawInfo?.ticketPrice ?? 0} USDT</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Start Time</span>
                        <span className="value">
                          {trdoDrawInfo?.drawStartTime 
                            ? new Date(trdoDrawInfo.drawStartTime * 1000).toLocaleString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="countdown-wrapper mb-30">
                      <p className="countdown-label mb-10">Remaining Time</p>
                      {trdoDrawInfo?.drawEndTime ? (
                        <CountdownTimer 
                          style={2} 
                          targetDate={new Date(trdoDrawInfo.drawEndTime * 1000).toISOString()} 
                        />
                      ) : (
                        <span className="text-white">Calculating...</span>
                      )}
                    </div>

                    <Link
                      href={`/contest-details/${trdoDrawInfo?.drawId || 1}`}
                      className="tf-btn btn-lg style-1"
                    >
                      <span>Participate Now</span>
                      <i className="icon-right" />
                    </Link>
                  </div>
                  <div className="wrap-image d-none d-lg-block">
                    <Image
                      alt=""
                      src="/images/section/our-jackpot-2.png"
                      width={510}
                      height={492}
                      className="floating-anim"
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-lg-12 mb-10">
                <div className="wg-get-ticket full-width-balance">
                  <div className="balance-content">
                    <p className="text-color-clip style-2">User Total Balance</p>
                    <p className="text-color-clip fs-45">
                      {parseInt(trdoBalance).toString()} <span className="fs-35">USDT</span>
                    </p>
                  </div>
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/get-ticket.png"
                      width={542}
                      height={180}
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .featured-draw-banner {
              background: linear-gradient(135deg, rgba(23, 26, 48, 0.9) 0%, rgba(255, 107, 74, 0.1) 100%);
              border: 1px solid rgba(255, 107, 74, 0.2);
              border-radius: 24px;
              padding: 60px;
              position: relative;
              overflow: hidden;
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-shadow: 0 20px 50px rgba(0,0,0,0.3);
            }
            .draw-info-grid {
              display: grid;
              grid-template-columns: auto auto;
              gap: 40px;
              border-bottom: 1px solid rgba(255,255,255,0.1);
              padding-bottom: 20px;
            }
            .info-item .label {
              display: block;
              color: #a8b3cf;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 5px;
            }
            .info-item .value {
              font-size: 24px;
              font-weight: 700;
              color: #fff;
            }
            .countdown-label {
              color: #ff6b4a;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            :global(.featured-draw-banner .countdown__timer) {
              display: flex;
              gap: 20px;
            }
            :global(.featured-draw-banner .countdown__item) {
              display: flex;
              flex-direction: column;
              align-items: center;
              background: rgba(255, 255, 255, 0.05);
              padding: 10px 15px;
              border-radius: 12px;
              min-width: 80px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            :global(.featured-draw-banner .countdown__value) {
              font-size: 28px;
              font-weight: 800;
              color: #fff;
              line-height: 1;
              margin-bottom: 5px;
            }
            :global(.featured-draw-banner .countdown__label) {
              font-size: 11px;
              color: #a8b3cf;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .floating-anim {
              animation: float 6s ease-in-out infinite;
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
            .full-width-balance {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 30px 50px;
              background: rgba(255,255,255,0.05);
              border-radius: 20px;
            }
          `}</style>
          <Information />

          <div className="grid-column-3">
            <div className="wg-game style-6 wow fadeInUp" data-wow-delay={2}>
              <div className="wg-game-image">
                <Image
                  alt=""
                  src="/images/component/wg-game-5.png"
                  width="248"
                  height="206"
                />
              </div>
              <div className="content">
                <h4 className="title fw-9">Winning Stats</h4>
                <ul className="sub-title-list">
                  <li className="item">
                    <i className="icon-remaining" />
                    <p>
                      Total Winnings: {userAggregateStats?.totalWinnings || 0}
                    </p>
                  </li>
                  <li className="item">
                    <i className="icon-ticket" />
                    <p>
                      <span>
                        Total Purchased Tickets:{" "}
                        {userAggregateStats?.totalPurchasedTickets || 0}
                      </span>
                    </p>
                  </li>
                </ul>
                {/* <p className="text fs-14 fw-9">Win up to</p> */}
                <p className="money text-color-clip fs-50">{(parseFloat(lotteryTeamInfo?.unlockedCommission) || 0) + (parseFloat(userAggregateStats?.totalWinnings) || 0)}</p>
                <p className=" fs-14 fw-9">USDT</p>
                <p className=" fs-14 fw-9">Commission + Winnnings</p>
                <Link
                        href={`/level-income-report`}
                        className="tf-btn mt-3">

                  Check History
                  <i className="icon-right" />
                </Link>
              </div>
            </div>
            <div className="wg-game style-6 wow fadeInUp" data-wow-delay={2}>
              <div className="wg-game-image">
                <Image
                  alt=""
                  src="/images/component/wg-game-5.png"
                  width="248"
                  height="206"
                />
              </div>
              <div className="content">
                <h4 className="title fw-9">Affiliate Stats</h4>
                <ul className="sub-title-list">
                  <li className="item">
                    <i className="icon-remaining" />
                    <p>
                      Total Affiliates:{" "}
                      {stats.referredCount || 0}
                    </p>
                  </li>
                  <li className="item">
                    <i className="icon-ticket" />
                    <p>
                      <span>
                        Active Affiliates:{" "}
                        {userAggregateStats?.activeDirectAffiliates || 0}
                      </span>
                    </p>
                  </li>
                  <li className="item">
                    <i className="icon-remaining" />
                    <p>
                      <span>
                        Earnings last 30 days:{" "}
                        {stats.earningsLast30Days || 0}
                      </span>
                    </p>
                  </li>
                </ul>
                {/* <p className="text fs-14 fw-9">Win up to</p> */}
                <p className="money text-color-clip fs-50">
                  {lotteryTeamInfo?.unlockedCommission || 0}
                </p>
                <p className=" fs-14 fw-9">USDT</p>
                <p className=" fs-14 fw-9">Total Affiliate Commission</p>
                <Link
                        href={`/level-income-report`}
                        className="tf-btn mt-3">
                  Check History
                  <i className="icon-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
