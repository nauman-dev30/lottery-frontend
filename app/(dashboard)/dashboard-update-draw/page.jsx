"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useConfig } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { parseUnits } from "viem";
import { toast } from "react-toastify";
import { lotteryWriteFunction } from "@/lib/web3/hooks/lotteryContract";
import {
  Calendar,
  Clock,
  DollarSign,
  Sparkles,
  Database,
  Power,
  Image,
  Text,
} from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DateTimePickerModal from "@/components/dashboard/date-time-picker-modal/DateTimePickerModal";
import styles from "./UpdateDrawModel.module.css";
import { triggerRefresh } from "@/store/features/web3Slices/refreshSlice";

export default function UpdateDrawModel() {
  const dispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const config = useConfig();
  const { open } = useAppKit();
  const router = useRouter();
  const trdoDecimals = useSelector((state) => state.trdoToken.trdoDecimals);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [drawId, setDrawId] = useState(null);

  const initialFormData = {
    drawStartTime: null,
    drawEndTime: null,
    pauseAndPlay: "true",
    drawTitle: "",
    drawBanner: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerLoadError, setBannerLoadError] = useState(false);

  useEffect(() => {
    const storedDraw = localStorage.getItem("drawToUpdate");
    if (storedDraw) {
      try {
        const draw = JSON.parse(storedDraw);
        setDrawId(draw.drawId);

        setFormData((prev) => ({
          /* ... your existing setFormData logic ... */
          ...prev,
          drawStartTime: draw.drawStartTime
            ? new Date(draw.drawStartTime)
            : null,
          drawEndTime: draw.drawEndTime ? new Date(draw.drawEndTime) : null,
          pauseAndPlay:
            typeof draw.isActive === "boolean"
              ? draw.isActive.toString()
              : prev.pauseAndPlay,
          drawTitle: draw.drawTitle || "",
          drawBanner: draw.drawBanner || null, // This will be the filename
        }));

        // Set banner preview if there's an existing banner
        if (draw.drawBanner) {
          const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
          const rawFilename = draw.drawBanner;
          console.log("[UpdateDraw] raw draw.drawBanner value:", rawFilename);
          const filename = encodeURIComponent(String(rawFilename).trim());
          const url = `${API_BASE}/uploads/${filename}`;
          console.log("[UpdateDraw] bannerPreview URL (encoded):", url);

          // Try to fetch the image to detect 404/CORS issues before setting preview
          (async () => {
            try {
              const res = await fetch(url, {
                method: "GET",
                cache: "no-cache",
              });
              console.log(
                "[UpdateDraw] fetch banner response:",
                res.status,
                res.statusText
              );
              if (res.ok) {
                // CORRECTED LOGIC:
                // Instead of using the direct URL, fetch the image as a blob
                // to create an object URL. This bypasses CORS issues for the <img> tag.
                const imageBlob = await res.blob();
                const objectURL = URL.createObjectURL(imageBlob);
                setBannerPreview(objectURL);
                setBannerLoadError(false);
              } else {
                console.warn(
                  "[UpdateDraw] Banner fetch returned non-OK status:",
                  res.status
                );
                // If fetch fails, we still show the error. Keep the URL for the "Open image" link.
                setBannerPreview(url);
                setBannerLoadError(true);
              }
            } catch (err) {
              console.error("[UpdateDraw] Banner fetch failed:", err);
              // If fetch fails, we still show the error. Keep the URL for the "Open image" link.
              setBannerPreview(url);
              setBannerLoadError(true);
            }
          })();
        }

        const loadToastId = `loading-draw-${draw.drawId}`;
        if (!toast.isActive(loadToastId)) {
          toast.info(`Loading Draw #${draw.drawId} for update`, {
            toastId: loadToastId,
          });
        }
      } catch (error) {
        console.error("Error loading draw data:", error);
        toast.error("Failed to load draw data");
      }
    } else {
      toast.warning("No draw data found. Please select a draw to update.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
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

  const handleConnect = async () => {
    try {
      await open();
    } catch (e) {
      console.error("Wallet connection failed:", e);
      toast.error("Wallet connection cancelled or failed");
    }
  };

  const updateBannerAndTitle = async () => {
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    const formDataUpload = new FormData();
    if (formData.drawBanner instanceof File) {
      formDataUpload.append("drawBanner", formData.drawBanner);
    }
    formDataUpload.append("drawTitle", formData.drawTitle);

    try {
      const response = await fetch(
        `${API_BASE}/api/v1/uploadBanner/update/${drawId}`,
        {
          method: "PUT",
          body: formDataUpload,
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to update banner and title");
      }

      return result.data;
    } catch (error) {
      console.error("❌ Error updating banner and title:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!drawId)
      return toast.error("Draw ID not found. Please select a draw to update.");
    if (!isConnected) return toast.error("Please connect your wallet first.");
    if (!formData.drawStartTime)
      return toast.error("Please select a draw start time.");
    if (!formData.drawEndTime)
      return toast.error("Please select a draw end time.");
    if (!formData.drawTitle || formData.drawTitle.trim() === "")
      return toast.error("Please enter a draw title.");
    if (formData.drawEndTime <= formData.drawStartTime)
      return toast.error("End time must be after the start time.");

    setIsSubmitting(true);
    try {
      if (formData.drawTitle || formData.drawBanner) {
        // Update banner and title if they were changed
        toast.info("Updating banner and title...");
        await updateBannerAndTitle();
        toast.success("Banner and title updated successfully!");
      }

      const durationInSeconds = Math.floor(
        (formData.drawEndTime.getTime() - formData.drawStartTime.getTime()) /
        1000
      );
      const isActiveBoolean = formData.pauseAndPlay === "true";

      const transactionPromise = lotteryWriteFunction(config, "updateDraw", [
        drawId,
        durationInSeconds,
        isActiveBoolean,
      ]);

      await toast.promise(transactionPromise, {
        pending: "Updating draw...",
        success: "Draw updated successfully! 🎉",
        error: "Update failed. Please try again.",
      });
      dispatch(triggerRefresh());
      const channel = new BroadcastChannel("drawUpdates");
      channel.postMessage("updated");
      channel.close();

      localStorage.removeItem("drawToUpdate");
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Error updating draw:", error);
      toast.error(error.message || "An error occurred during the update");
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
        <div className="tf-container">
          <div className="page-heading">
            <h2 className="fw-9">Update Draw {drawId ? `#${drawId}` : ""}</h2>
            <p className="text">Modify your lottery draw parameters</p>
          </div>

          <div className={styles.formCard}>
            {isConnected && address && (
              <div className={styles.walletStatusBar}>
                <span className={styles.statusText}>Connected:</span>
                <span className={styles.addressTag}>
                  {`${address.slice(0, 6)}...${address.slice(-4)}`}
                </span>
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
                      style={{ display: "none" }}
                      id="banner-update-upload"
                    />
                    <label
                      htmlFor="banner-update-upload"
                      className={`${styles.formInput} ${styles.fileInputLabel}`}
                      style={{
                        cursor: isConnected ? "pointer" : "not-allowed",
                        border: bannerPreview ? "none" : "1px solid #2c326b",
                        backgroundColor: bannerPreview
                          ? "transparent"
                          : "#0f123d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        minHeight: "120px",
                        padding: "10px",
                      }}
                    >
                      {bannerPreview ? (
                        bannerLoadError ? (
                          <div style={{ textAlign: "center" }}>
                            <div style={{ color: "#ff8c42", marginBottom: 8 }}>
                              Failed to load banner preview
                            </div>
                            <a
                              href={bannerPreview}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#ff8c42" }}
                            >
                              Open image in new tab
                            </a>
                          </div>
                        ) : (
                          <img
                            src={bannerPreview}
                            alt="Banner preview"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100px",
                              objectFit: "contain",
                            }}
                            onError={(e) => {
                              console.error(
                                "[UpdateDraw] Failed to load banner image:",
                                e
                              );
                              setBannerLoadError(true);
                            }}
                          />
                        )
                      ) : (
                        <span style={{ color: "#a1a6c5" }}>
                          Click to upload banner image
                        </span>
                      )}
                    </label>
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <Power size={14} /> Draw Status (Is Active)
                    </label>
                    <select
                      name="pauseAndPlay"
                      className={styles.formInput}
                      value={formData.pauseAndPlay}
                      onChange={handleInputChange}
                      disabled={!isConnected}
                    >
                      <option value="true">Active (True)</option>
                      <option value="false">Paused (False)</option>
                    </select>
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
                  <button
                    type="submit"
                    className="tf-btn"
                    disabled={isSubmitting || !drawId}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        <Sparkles size={18} /> Update Draw
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
