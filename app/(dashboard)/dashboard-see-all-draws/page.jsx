"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Edit2,
  Clock,
  Ticket,
  DollarSign,
  Calendar,
  Database,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Image,
  Text,
} from "lucide-react";
import styles from "./UpdateDraw.module.css";

export default function UpdateDraw() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 10;
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/v1/getData`);
      const fetched = response.data.data || [];
      console.log("[SeeAllDraws] fetched draws:", fetched);

      // Sort by drawId in descending order (higher IDs first)
      const sortedData = fetched.sort((a, b) => {
        // Convert drawId to numbers if they're stored as strings and sort in descending order
        const idA = Number(a.drawId) || 0;
        const idB = Number(b.drawId) || 0;
        return idB - idA; // Descending order: higher IDs first
      });

      setData(sortedData);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [API_BASE]);

  useEffect(() => {
    const handleFocus = () => {
      fetchData();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel("drawUpdates");
    channel.onmessage = (event) => {
      if (event.data === "updated") {
        console.log("📡 Broadcast: data updated — refreshing draws");
        fetchData();
      }
    };
    return () => channel.close();
  }, []);

  const handleUpdate = (draw) => {
    localStorage.setItem("drawToUpdate", JSON.stringify(draw));
    router.push("/dashboard-update-draw");
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const toggleReferralDropdown = (drawId) => {
    setExpandedRow(expandedRow === drawId ? null : drawId);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    setExpandedRow(null);
  };

  const goToPrevious = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="main-content-dashboard">
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading draws...</p>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="main-content-dashboard">
        <div className={styles.emptyContainer}>
          <Ticket className={styles.emptyIcon} />
          <p className={styles.emptyText}>No draws available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content-dashboard">
      <div className="tf-container">
        <div className="page-heading">
          <h2 className="fw-9">All Draws</h2>
          <p className="text">Manage and update your lottery draws</p>
        </div>

        <div className={styles.drawsCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Draw ID</th>
                  <th>Title</th>
                  <th>Ticket Price</th>
                  <th>Total Tickets</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Banner</th>
                  <th>Referral %</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((draw) => (
                  <React.Fragment key={draw._id}>
                    <tr>
                      <td>
                        <div className={styles.drawIdBadge}>#{draw.drawId}</div>
                      </td>
                      <td>
                        <div className={styles.cellWithIcon}>
                          <Text size={16} />
                          <span title={draw.drawTitle || ""}>
                            {draw.drawTitle || "No title"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.cellWithIcon}>
                          <DollarSign size={16} />
                          {draw.ticketPrice}
                        </div>
                      </td>
                      <td>
                        <div className={styles.cellWithIcon}>
                          <Database size={16} />
                          {draw.totalTickets}
                        </div>
                      </td>
                      <td>
                        <div className={styles.dateCell}>
                          <Calendar size={14} />
                          {formatDateTime(draw.drawStartTime)}
                        </div>
                      </td>
                      <td>
                        <div className={styles.dateCell}>
                          <Clock size={14} />
                          {formatDateTime(draw.drawEndTime)}
                        </div>
                      </td>
                      <td>
                        {draw.drawBanner ? (
                          <div
                            className={styles.bannerPreview}
                            onClick={() => {
                              const API_BASE =
                                process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
                              const bannerUrl = `${API_BASE}/uploads/${draw.drawBanner}`;
                              window.open(bannerUrl, "_blank");
                            }}
                            title={`Click to view banner: ${draw.drawBanner}`}
                          >
                            <Image size={16} />
                            <span>Click to View</span>
                          </div>
                        ) : (
                          <span
                            style={{ color: "#a1a6c5", fontStyle: "italic" }}
                          >
                            No banner
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className={styles.compactBtn}
                          onClick={() => toggleReferralDropdown(draw._id)}
                          title="View commission levels"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => handleUpdate(draw)}
                          className={styles.compactBtn}
                          title="Update draw"
                        >
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>

                    {expandedRow === draw._id && (
                      <tr className={styles.expandedRow}>
                        <td colSpan="9">
                          <div className={styles.referralDropdown}>
                            <div className={styles.referralHeader}>
                              <span className={styles.referralTitle}>
                                👥 Commission Rates
                              </span>
                            </div>
                            <div className={styles.referralGrid}>
                              {draw.referralPercents &&
                                draw.referralPercents.map((percent, index) => (
                                  <div
                                    className={styles.referralItem}
                                    key={index}
                                  >
                                    <div className={styles.levelLabel}>
                                      Level {index + 1}
                                    </div>
                                    <div className={styles.percentValue}>
                                      {percent}%
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className="tf-btn style-3"
                onClick={goToPrevious}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className={styles.pageNumbers}>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.pageNumber} ${
                      currentPage === index + 1 ? styles.active : ""
                    }`}
                    onClick={() => goToPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                className="tf-btn style-3"
                onClick={goToNext}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          <div className={styles.paginationInfo}>
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
            {data.length} draws
          </div>
        </div>
      </div>
    </div>
  );
}
