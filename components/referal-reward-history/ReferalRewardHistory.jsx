"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Users,
  Award,
  Lock,
  Unlock,
  TrendingUp,
  DollarSign,
  Gift,
  Layers,
  Ticket,
} from "lucide-react";
import styles from "./ReferralRewardHistory.module.css";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function ReferalRewardHistory() {
  const userPurchasedTicketCount = useSelector(
    (state) => state.trdoLottery.userPurchasedTicketCount
  );
  const currentDrawId = useSelector((state) => state.trdoLottery.currentDrawId);
  const [refData, setRefData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const userId = authUser?._id;

    // if (!userId || !currentDrawId) {
    //   alert("salman", userId, currentDrawId)
    //   console.log("salman", userId, currentDrawId)
    //   setLoading(false);
    //   return;
    // }

    axios
      .get(`${API_BASE}/api/v1/getReferalRewardHistory`, {
        params: { userId, drawId: currentDrawId },
      })
      .then((res) => {
        console.log(res.data?.data, "======")
        setRefData(res.data?.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching data:", err);
      })
      .finally(() => setLoading(false));
  }, [currentDrawId]);

  if (loading) {
    return (
      <div className="main-content-dashboard">
        <div className={styles.stateContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.stateText}>Loading referral rewards...</p>
        </div>
      </div>
    );
  }

  const { levels = [], summary = {} } = refData || {};
  const canViewRewards = userPurchasedTicketCount > 0;

  if (!refData || levels.length === 0) {
    return (
      <div className="main-content-dashboard">
        <div className="tf-container">
          <div className={`page-heading ${styles.referralHeading}`}>
            <h2 className="fw-9">Referral Rewards</h2>
            <p className="text">View rewards earned from your network.</p>
          </div>
          <div className={styles.stateContainer}>
            <p className={styles.stateText}>
              No referral reward data found for Contest No: Lo:{" "}
              {currentDrawId || "N/A"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content-dashboard">
      <div className="tf-container">
        {/* ✅ NEW DYNAMIC & ATTRACTIVE HEADER */}
        <div className={styles.summaryHeader}>
          <div className={styles.headerTitle}>
            <Gift size={32} />
            <h2>Referral Rewards</h2>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statItem}>
              <Ticket size={18} />
              <span>
                Contest No: Lo <strong>{currentDrawId}</strong>
              </span>
            </div>
            <div className={styles.statItem}>
              <Layers size={18} />
              <span>
                Reward Levels: <strong>{levels.length}</strong>
              </span>
            </div>
            <div className={styles.statItem}>
              <Users size={18} />
              <span>
                Total Users in Network:{" "}
                <strong>{summary.grandTotalUsers || 0}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.referralGrid}>
          {levels.map((lvl) => (
            <div className={styles.levelCard} key={lvl.level}>
              <div className={styles.levelHeader}>
                <Award size={20} />
                <h3>Level {lvl.level}</h3>
              </div>
              <div className={styles.levelBody}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Users size={20} />
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoValue}>{lvl.totalUsers}</span>
                    <span className={styles.infoLabel}>Total Users</span>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div
                    className={`${styles.infoIcon} ${!canViewRewards ? styles.locked : ""
                      }`}
                  >
                    {canViewRewards ? <Unlock size={20} /> : <Lock size={20} />}
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoValue}>
                      {canViewRewards ? lvl.totalAmount : "---"}
                    </span>
                    <span className={styles.infoLabel}>Total Amount</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!canViewRewards && (
          <div className={styles.unlockPrompt}>
            <Lock size={24} />
            <p>
              Purchase at least one ticket in the current draw to view your
              referral earnings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
