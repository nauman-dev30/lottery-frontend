"use client";

import React, { useState } from "react";
import { useAccount, useConfig } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { parseUnits } from "viem";
import { toast } from "react-toastify";
import { lotteryWriteFunction } from "@/lib/web3/hooks/lotteryContract";
import { Calendar, Clock, DollarSign, Sparkles, Database, Image, Text } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "@/components/dashboard/date-time-picker-modal/DateTimePickerModal";
import styles from "./CreateDraw.module.css";
import { triggerRefresh } from "@/store/features/web3Slices/refreshSlice";

export default function CreateDraw() {
  const { isConnected, address } = useAccount();
  const dispatch = useDispatch();
  const config = useConfig();
  const { open } = useAppKit();
  const trdoDecimals = useSelector((state) => state.trdoToken.trdoDecimals);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  const initialFormData = {
    ticketPrice: "",
    totalTickets: "",
    drawStartTime: null,
    drawEndTime: null,
    drawTitle: "",
    drawBanner: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [bannerPreview, setBannerPreview] = useState(null);

  // ... (all your handler functions remain the same)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      setFormData({ ...formData, drawBanner: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadBannerAndTitle = async () => {
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    const formDataUpload = new FormData();
    formDataUpload.append('drawBanner', formData.drawBanner);
    formDataUpload.append('drawTitle', formData.drawTitle);

    try {
      const response = await fetch(`${API_BASE}/api/v1/uploadBanner`, {
        method: 'POST',
        body: formDataUpload,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to upload banner and title');
      }

      return result.data; // This contains the uploadId
    } catch (error) {
      console.error('❌ Error uploading banner and title:', error);
      throw error;
    }
  };

  const handleConnect = async () => {
    try {
      await open();
    } catch (e) {
      console.error("Wallet connection failed:", e);
      toast.error("Wallet connection cancelled or failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalTickets = parseInt(formData.totalTickets);
    if (!isConnected) return toast.error("Please connect your wallet first.");
    if (!formData.ticketPrice || parseFloat(formData.ticketPrice) <= 0)
      return toast.error("Please enter a valid ticket price.");
    if (!totalTickets || totalTickets < 100 || totalTickets % 100 !== 0)
      return toast.error("Total tickets must be 100 or a multiple of 100.");
    if (!formData.drawStartTime)
      return toast.error("Please select a draw start time.");
    if (!formData.drawEndTime)
      return toast.error("Please select a draw end time.");
    if (!formData.drawTitle || formData.drawTitle.trim() === "")
      return toast.error("Please enter a draw title.");
    if (!formData.drawBanner)
      return toast.error("Please select a banner image.");
    if (formData.drawStartTime.getTime() < Date.now() - 60000)
      return toast.error("Draw start time cannot be in the past.");
    if (formData.drawEndTime <= formData.drawStartTime)
      return toast.error("End time must be after the start time.");

    setIsSubmitting(true);
    try {
      // First upload the banner and title to backend
      toast.info("Uploading banner and title...");
      const uploadResult = await uploadBannerAndTitle();
      toast.success("Banner and title uploaded successfully!");

      const tokenPriceBigInt = parseUnits(formData.ticketPrice, trdoDecimals);
      const totalTicketsBigInt = Number(formData.totalTickets);
      const drawStartTimeSecs = Math.floor(
        formData.drawStartTime.getTime() / 1000
      );
      const durationInSeconds = Math.floor(
        (formData.drawEndTime.getTime() - formData.drawStartTime.getTime()) /
        1000
      );

      const transactionPromise = lotteryWriteFunction(config, "createNewDraw", [
        tokenPriceBigInt,
        drawStartTimeSecs,
        durationInSeconds,
        totalTicketsBigInt,
      ]);

      // Wait for the blockchain transaction
      const txResult = await toast.promise(transactionPromise, {
        pending: "Transaction is pending...",
        success: "Draw created successfully! 🎉",
        error: "Transaction failed. Please try again.",
      });

      // Get the drawId from the transaction result if possible
      // (This depends on what the contract returns)
      // If we can't get drawId from the transaction, we'll assume it's the next sequential ID
      // For now we'll use the typical method of getting the draw ID from blockchain events
      // But we'll need to update the temporary record to have the actual drawId
      // by calling the update-draw-id endpoint

      // We need to derive the drawId somehow - usually the contract will create draws with 
      // sequential IDs, so we might need to track this differently

      dispatch(triggerRefresh());
      setFormData(initialFormData);
      setBannerPreview(null);
    } catch (error) {
      console.error("❌ Error creating draw:", error);
      toast.error(error.message || "An error occurred during the process");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTime = (date) => {
    if (!date) return "Select Date & Time";
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <div className="main-content-dashboard">
        {/* Use the standard tf-container for consistent spacing */}
        <div className="tf-container">
          <div className="page-heading">
            <h2 className="fw-9">Create New Draw</h2>
            <p className="text">Set up your lottery draw parameters</p>
          </div>

          {/* This card now uses a generic style that matches 'balance-wrap' */}
          <div className={styles.formCard}>
            {isConnected && address && (
              <div className={styles.walletStatusBar}>
                <span className={styles.statusText}>Connected:</span>
                <span className={styles.addressTag}>{`${address.slice(
                  0,
                  6
                )}...${address.slice(-4)}`}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className={styles.formSectionNew}>
                <div className={styles.formSectionHeader}>
                  <p>⚙️ Configure core draw parameters</p>
                </div>
                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label>
                      <Text size={14} /> Draw Title
                    </label>
                    <input
                      type="text"
                      name="drawTitle"
                      className={styles.formInput}
                      value={formData.drawTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., Monthly Jackpot Draw"
                      disabled={!isConnected}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <Image size={14} /> Banner Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerChange}
                      disabled={!isConnected}
                      style={{ display: 'none' }}
                      id="banner-upload"
                    />
                    <label
                      htmlFor="banner-upload"
                      className={`${styles.formInput} ${styles.fileInputLabel}`}
                      style={{
                        cursor: isConnected ? 'pointer' : 'not-allowed',
                        border: bannerPreview ? 'none' : '1px solid #2c326b',
                        backgroundColor: bannerPreview ? 'transparent' : '#0f123d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        minHeight: '120px',
                        padding: '10px'
                      }}
                    >
                      {bannerPreview ? (
                        <img
                          src={bannerPreview}
                          alt="Banner preview"
                          style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
                        />
                      ) : (
                        <span style={{ color: '#a1a6c5' }}>Click to upload banner image</span>
                      )}
                    </label>
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <DollarSign size={14} /> Ticket Price (in token)
                    </label>
                    <input
                      type="number"
                      name="ticketPrice"
                      className={styles.formInput}
                      value={formData.ticketPrice}
                      onChange={handleInputChange}
                      placeholder="e.g., 100"
                      disabled={!isConnected}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <Database size={14} /> Total Tickets
                    </label>
                    <input
                      type="number"
                      name="totalTickets"
                      className={styles.formInput}
                      value={formData.totalTickets}
                      onChange={handleInputChange}
                      placeholder="e.g., 5000"
                      disabled={!isConnected}
                      min="100"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <Calendar size={14} /> Draw Start Time
                    </label>
                    <div className={styles.datetimeInputGroup}>
                      <div
                        className={`${styles.datetimeDisplay} ${formData.drawStartTime ? styles.hasValue : ""
                          }`}
                        onClick={() => setIsStartModalOpen(true)}
                      >
                        {formatDateTime(formData.drawStartTime)}
                      </div>
                      {/* Using global button classes: tf-btn and style-3 */}
                      <button
                        type="button"
                        className="tf-btn style-3"
                        onClick={() => setIsStartModalOpen(true)}
                        disabled={!isConnected || isSubmitting}
                      >
                        <Calendar size={16} /> Pick
                      </button>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <Clock size={14} /> Draw End Time
                    </label>
                    <div className={styles.datetimeInputGroup}>
                      <div
                        className={`${styles.datetimeDisplay} ${formData.drawEndTime ? styles.hasValue : ""
                          }`}
                        onClick={() => setIsEndModalOpen(true)}
                      >
                        {formatDateTime(formData.drawEndTime)}
                      </div>
                      {/* Using global button classes: tf-btn and style-3 */}
                      <button
                        type="button"
                        className="tf-btn style-3"
                        onClick={() => setIsEndModalOpen(true)}
                        disabled={!isConnected || isSubmitting}
                      >
                        <Clock size={16} /> Pick
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                {isConnected ? (
                  // Using the primary global button class: tf-btn
                  <button
                    type="submit"
                    className="tf-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        <Sparkles size={18} /> Create Draw
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="tf-btn"
                    onClick={handleConnect}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modals remain unchanged */}
      <DateTimePickerModal
        show={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        onSave={(date) => setFormData({ ...formData, drawStartTime: date })}
        initialDate={formData.drawStartTime}
        title="Select Start Date & Time"
      />
      <DateTimePickerModal
        show={isEndModalOpen}
        onClose={() => setIsEndModalOpen(false)}
        onSave={(date) => setFormData({ ...formData, drawEndTime: date })}
        initialDate={formData.drawEndTime}
        minDate={formData.drawStartTime}
        title="Select End Date & Time"
      />
    </>
  );
}
