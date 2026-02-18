"use client";

import CountdownTimer from "@/components/common/Countdown";
import Cta from "@/components/common/Cta";
import CollapseMenu from "@/components/dashboard/CollapseMenu";
import DashboardMibilemenuToggler from "@/components/dashboard/DashboardMibilemenuToggler";
import DashboardMobileMenu from "@/components/dashboard/DashboardMobileMenu";
import RightSidebarToggler from "@/components/dashboard/RightSidebarToggler";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import SupportForm from "@/components/dashboard/SupportForm";
import Footer1 from "@/components/footers/Footer1";
import CoinSelect from "@/components/headers/CoinSelect";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { getRequest, postRequest } from "@/backendServices/ApiCalls";
import { useSelector } from "react-redux";
import { useAppKit } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext"
import { useAccount } from "wagmi";
import { fetchLatestDraw } from "@/backendServices/drawService";
import axios from 'axios';
import AuthConnectButton from "@/components/auth/AuthConnectButton";
import GoogleTranslate from "@/components/common/GoogleTranslate";

export default function Layout({ children }) {

  const { open } = useAppKit();
  // const { user } = useAuth()
  const { isConnected, address } = useAccount();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const user = useSelector((state) => state.user.userData);

  const currentDrawId = useSelector((state) => state.trdoLottery.currentDrawId);
  const trdoDrawInfo = useSelector((state) => state.trdoLottery.trdoDrawInfo);
  const allDraws = useSelector((state) => state.trdoLottery.allDraws);
  const drawStartTimeInSeconds = trdoDrawInfo?.drawStartTime || 0;
  const drawEndTimeInSeconds = trdoDrawInfo?.drawEndTime || 0;

  const [latestDraw, setLatestDraw] = useState(null);
  const [latestDrawLoading, setLatestDrawLoading] = useState(true);
  const [activeContests, setActiveContests] = useState([]);
  const [endedContest, setEndedContest] = useState(null);

  const [displayableBannerUrl, setDisplayableBannerUrl] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


  useEffect(() => {
    const getLatestDraw = async () => {
      try {
        const draw = await fetchLatestDraw();
        setLatestDraw(draw);
      } catch (error) {
        console.error("Failed to fetch latest draw:", error);
      } finally {
        setLatestDrawLoading(false);
      }
    };

    getLatestDraw();
  }, []);

  useEffect(() => {
    // This effect runs whenever latestDraw changes
    if (latestDraw && latestDraw.drawBanner) {
      let objectUrl = null;
      const imageUrl =
        latestDraw.drawBanner.startsWith("http") ||
          latestDraw.drawBanner.startsWith("/")
          ? latestDraw.drawBanner
          : `${API_BASE}/uploads/${latestDraw.drawBanner}`;

      const fetchImageAsBlob = async () => {
        try {
          const response = await fetch(imageUrl);
          if (response.ok) {
            const blob = await response.blob();
            objectUrl = URL.createObjectURL(blob);
            setDisplayableBannerUrl(objectUrl);
          } else {
            console.error(
              "Failed to fetch banner image, status:",
              response.status
            );
            // Fallback to a default image if fetch fails
            setDisplayableBannerUrl("/images/sidebar/contest-1.jpg");
          }
        } catch (error) {
          console.error("Error fetching banner image:", error);
          // Fallback to a default image on error
          setDisplayableBannerUrl("/images/sidebar/contest-1.jpg");
        }
      };

      fetchImageAsBlob();

      // Cleanup function to revoke the object URL and prevent memory leaks
      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    } else if (!latestDrawLoading) {
      // If loading is finished and there's no banner, set a default
      setDisplayableBannerUrl("/images/sidebar/contest-1.jpg");
    }
  }, [latestDraw, latestDrawLoading, API_BASE]); // Dependencies for the effect

  useEffect(() => {
    if (!allDraws || allDraws.length === 0) return;

    const now = Date.now();

    // Filter active contests (not ended yet)
    const active = allDraws.filter(
      (draw) => now <= Number(draw.drawEndTime) * 1000
    );

    // Sort by drawId descending (highest/newest first) and take top 3
    const sortedActive = active
      .sort((a, b) => b.drawId - a.drawId)
      .slice(0, 3);

    setActiveContests(sortedActive);

    // Filter ended contests
    const ended = allDraws.filter(
      (draw) => now > Number(draw.drawEndTime) * 1000
    );

    // Sort by drawEndTime descending (most recently ended first)
    const mostRecentEnded = ended.sort(
      (a, b) => Number(b.drawEndTime) - Number(a.drawEndTime)
    )[0] || null;

    setEndedContest(mostRecentEnded);
  }, [allDraws]);




  useEffect(() => {
    const fetchUserData = () => {
      if (!address) return;

      postRequest(
        "getUser",
        { address },
        (res) => {
          console.log("User data:", res.data);
          const user = res.data.user;
          console.log("user", user);
          setUsername(user.username);
          setAvatar(user.avatar);
        },
        (err) => {
          console.error("Error fetching user:", err);
        }
      );
    };

    fetchUserData();
  }, [address]);

  useEffect(() => {
    if (user) {
      const link = `${window.location.origin}/register?ref=${user.refCode}`;
      setReferralLink(link);
    }
  }, [user]);

  // Helper function to get contest image URL with fallback
  const getContestImageUrl = (drawBanner, fallbackIndex = 1) => {
    const fallbackImages = [
      "/images/sidebar/contest-1.jpg",
      "/images/sidebar/contest-2.png",
      "/images/sidebar/contest-3.png",
    ];

    if (!drawBanner) {
      return fallbackImages[fallbackIndex - 1] || fallbackImages[0];
    }

    // If drawBanner is a full URL or starts with /, use it directly
    if (drawBanner.startsWith("http") || drawBanner.startsWith("/")) {
      return drawBanner;
    }

    // Otherwise, construct the URL with API_BASE
    return `${API_BASE}/uploads/${drawBanner}`;
  };

  const handleCopy = () => {
    if (!referralLink) return;

    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  };
  return (

    <>
      <div className="layout-wrap relative ">
        {/* button-show-hide */}
        <DashboardMibilemenuToggler />
        {/* /button-show-hide */}
        {/* section-menu-left */}
        <div className="section-menu-left">
          <div className="center ">
            <div className="sidebar-scroll top-scroll">
              {/* Scrollable*/}
              <div className="center-item">
                <SidebarMenu />
              </div>

              <div className="divider" />

              <div className="center-item">
                <div className="community">
                  <div className="tite-item">Join Our Community</div>
                  <ul className="tf-social style-1 flex-wrap">
                    <li><a href="#"><i className="icon-facebook" /></a></li>
                    <li><a href="#"><i className="icon-send" /></a></li>
                    <li><a href="#"><i className="icon-linkedin2" /></a></li>
                    <li><a href="#"><i className="icon-twitter" /></a></li>
                    <li><a href="#"><i className="icon-youtube" /></a></li>
                    <li><a href="#"><i className="icon-tiktok" /></a></li>
                    <li><a href="#"><i className="icon-skype" /></a></li>
                  </ul>
                </div>
              </div>

              <div className="divider" />

              <div className="center-item">
                <div className="invite">
                  <div className="tite-item">Invite your Friends</div>
                  <div className="text">
                    Refer users using your referral link and earn up to 20% of
                    their winnings.
                  </div>
                  <div className="box-link style-1">
                    <input
                      id="coppy1"
                      type="text"
                      className="box-link-content"
                      value={referralLink}
                      readOnly
                      required
                    />
                    <i onClick={handleCopy}
                      style={{ cursor: "pointer" }} className={copied ? "icon-check" : "icon-coppy"} />

                  </div>
                </div>
              </div>
              <div className="divider" />
              <div className="center-item pb-10">
                <CollapseMenu />
              </div>
            </div>
          </div>
        </div>

        {/* header-dashboard */}
        <div className="header-dashboard  ">
          <div className="wrap">
            <div className="header-left">
              <div className="header-logo">
                <Link href={`/`}>
                  <Image
                    alt="avatar"
                    data-retina="/images/logo/logo@2x.png"
                    src="/images/logo/logo.png"
                    width={170}
                    height={60}
                  />
                </Link>
              </div>
            </div>
            <div className="header-right">
              <GoogleTranslate />
              <div className="header-wallet">
                {/* <a onClick={handleConnect} className="tf-btn" href="#">
                  <i className="icon-wallets" />
                  <span>
                    {address
                      ? `${address.substring(0, 6)}...${address.substring(
                        address.length - 4
                      )}`
                      : "Connect Wallet"}
                  </span>
                </a> */}

                <AuthConnectButton />
              </div>
              <div className="header-account">
                <div className="popup-wrap account">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="popup-top">
                        <span className="image">
                          <Image
                            src={API_BASE + "/" + user?.avatar}
                            alt="avatar"
                            width={100}
                            height={100}
                          />
                        </span>
                        <span className="name">
                          <span className="text">{username}</span>
                          <i className="icon-arrow-down" />
                        </span>
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      {/* <li>
                        <Link href={`/dashboard-my-account`} className="item">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            className="me-1"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.4993 4C10.4993 4.66304 10.2359 5.29893 9.7671 5.76777C9.29826 6.23661 8.66237 6.5 7.99933 6.5C7.33629 6.5 6.70041 6.23661 6.23157 5.76777C5.76273 5.29893 5.49933 4.66304 5.49933 4C5.49933 3.33696 5.76273 2.70107 6.23157 2.23223C6.70041 1.76339 7.33629 1.5 7.99933 1.5C8.66237 1.5 9.29826 1.76339 9.7671 2.23223C10.2359 2.70107 10.4993 3.33696 10.4993 4ZM3 13.412C3.02142 12.1002 3.55756 10.8494 4.49278 9.92936C5.42801 9.00929 6.68739 8.49365 7.99933 8.49365C9.31127 8.49365 10.5707 9.00929 11.5059 9.92936C12.4411 10.8494 12.9772 12.1002 12.9987 13.412C11.4303 14.1312 9.72477 14.5023 7.99933 14.5C6.21533 14.5 4.522 14.1107 3 13.412Z"
                              stroke="#fff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {"My account"}
                        </Link>
                      </li> */}
                      <li>
                        <LogoutButton />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /header-dashboard */}
        {/* sidebar-dashboard */}
        {/* <div className="sidebar-dashboard ">
          ... (sidebar content)
        </div>
        <RightSidebarToggler /> */}
      </div>
      {/* /sidebar-dashboard */}
      <div className="main-content-dashboard-wrap">
        <DashboardMobileMenu />
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </div>
    </>

  );
}
