"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function Statistics() {
  const [refData, setRefData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const userId = authUser?._id;
    if (!userId) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE}/api/v1/getReferalHistory`, {
        params: { id: userId },
      })
      .then((res) => {
        setRefData(res.data);
      })
      .catch((err) => console.error("Error fetching referral data:", err))
      .finally(() => setLoading(false));
  }, []);

  const formatDateTime = (isoString, part) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    if (part === "date") {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    if (part === "time") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    return "Invalid Date";
  };

  const truncateWalletAddress = (address) => {
    if (!address || address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  if (loading) {
    return (
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div
              className="heading-dashboard mb-30 wow fadeInUp"
              data-wow-delay="0s"
            >
              Statistical
            </div>
            <div className="table-statistical mb-30">
              <p
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#a1a6c5",
                }}
              >
                Loading referral history...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (
    !refData ||
    !refData.referredUsers ||
    refData.referredUsers.length === 0
  ) {
    return (
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div
              className="heading-dashboard mb-30 wow fadeInUp"
              data-wow-delay="0s"
            >
              Statistical
            </div>
            <div className="table-statistical mb-30">
              <p
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#a1a6c5",
                }}
              >
                No users have been referred yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalUsers = refData.referredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = refData.referredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  return (
    <>
      <style jsx global>{`
        .table-statistical > .title,
        .table-statistical > .item-table {
          display: grid;
          /* ✅ FIX: Adjusted column widths to give Date and Time more space */
          grid-template-columns: 1.5fr 2fr 1.5fr 1.2fr 1fr;
          width: 100%;
        }
        .table-statistical > .item-table > div {
          /* ✅ FIX: Removed properties that caused "..." */
          white-space: normal; /* Allow wrapping for very long emails if needed */
          overflow-wrap: break-word; /* Break long words to prevent overflow */
        }
      `}</style>
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div
              className="heading-dashboard mb-30 wow fadeInUp"
              data-wow-delay="0s"
            >
              Statistical
            </div>
          </div>
          <div className="col-12">
            <div className="table-statistical mb-30">
              <div className="title">
                <div>Username</div>
                <div>Email</div>
                <div>Wallet Address</div>
                <div>Date</div>
                <div>Time</div>
              </div>
              {currentUsers.map((user, index) => (
                <div className="item-table" key={user._id || index}>
                  <div className="author no-avatar">
                    <a href="#">{user.name || "Unnamed User"}</a>
                  </div>
                  <div>{user.email || "N/A"}</div>
                  <div>
                    {truncateWalletAddress(user.walletAddress) || "N/A"}
                  </div>
                  <div>{formatDateTime(user.createdAt, "date")}</div>
                  <div>{formatDateTime(user.createdAt, "time")}</div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <ul className="wg-pagination justify-start">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage - 1);
                    }}
                  >
                    <i className="icon-back" />
                  </a>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={currentPage === i + 1 ? "active" : ""}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage + 1);
                    }}
                  >
                    <i className="icon-next" />
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
