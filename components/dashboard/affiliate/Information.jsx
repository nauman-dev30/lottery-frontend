"use client";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { data } from "autoprefixer";
import { useSelector } from "react-redux";
import ReferralLink from "./ReferralLink";
export default function Information() {
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  // const [avatar,setAvatar] =useState("");

  // const { user } = useAuth(); // Get the logged-in user from AuthContext
  const userAggregateStats = useSelector(
    (state) => state.trdoLottery.userAggregateStats
  );

  const user = useSelector((state) => state.user.userData);

  const referredCount = 0;
  return (
    <div className="tf-container wrap-our-jackpot">
      <div className="row">
        <div className="col-12">
          <div className="wg-infomation">
            <div className="row">
              <div className="col-md-6 mb-10">
                <div className="left mb-20-mobile">
                  <div className="image">
                    <Image
                      alt=""
                      src={API_BASE + "/" + user?.avatar}
                      width={180}
                      height={180}
                    />
                  </div>
                  <div className="flex-grow">
                    Sponsor Address
                    <div className="name">
                      {user?.refby || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6  mb-10">
                <div className="right">
                  <div className="title">
                    <i className="icon-statistics" />
                    Statistics
                  </div>
                  <ul>
                    <li>
                      <div className="item">
                        <div className="item-icon">
                          <Image
                            alt=""
                            src="/images/item/statistics-1.png"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div>
                          <div className="price">
                            $
                            {userAggregateStats?.totalWinnings
                              ? userAggregateStats?.totalWinnings
                              : "0.00"}
                          </div>
                          <div className="sub">Total earnings</div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="item">
                        <div className="item-icon">
                          <Image
                            alt=""
                            src="/images/item/statistics-2.png"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div>
                          {/* <div className="price">{user.usersReferred || 0}</div> */}
                          <div className="price">
                            {referredCount || 0}
                          </div>
                          <div className="sub">Users Referred</div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="item">
                        <div className="item-icon">
                          <Image
                            alt=""
                            src="/images/item/statistics-3.png"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div>
                          <div className="price">
                            $
                            {user?.earningsLast30Days
                              ? user?.earningsLast30Days.toFixed(2)
                              : "0.00"}
                          </div>
                          <div className="sub">Earnings last 30 days</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ReferralLink />
        </div>
      </div>
    </div>
  );
}
