"use client";
import React, { useState, useMemo, useEffect } from "react";
import { walletRequestAPI } from "@/backendServices/ApiCalls";
import { RefreshCw, CheckCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { exportToCSV } from "@/utils/csvExport";
import { lotteryWriteFunction } from "@/lib/web3/hooks/lotteryContract";
import { useConfig } from "wagmi";

// Confirmation Modal Component
function ConfirmationModal({ isOpen, onClose, onConfirm, type, loading }) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const isApprove = type === "approve";
  const modalColor = isApprove ? "#10b981" : "#f87171";
  const modalIcon = isApprove ? "✓" : "✗";
  const modalTitle = isApprove ? "Approve Request" : "Reject Request";
  const modalMessage = isApprove
    ? "Are you sure you want to approve this wallet update request? This action will update the user's wallet address."
    : "Are you sure you want to reject this wallet update request? Please provide a reason for rejection.";

  const handleSubmit = () => {
    if (!isApprove && reason.trim() === "") {
      toast.error("Please provide a reason for rejection");
      return;
    }
    onConfirm(isApprove ? null : reason);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        animation: "fadeIn 0.2s ease-out",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(30, 30, 45, 0.95) 0%, rgba(20, 20, 35, 0.98) 100%)",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          border: `2px solid ${modalColor}40`,
          boxShadow: `0 20px 60px ${modalColor}30`,
          animation: "slideUp 0.3s ease-out",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            cursor: loading ? "not-allowed" : "pointer",
            color: "#fff",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            opacity: loading ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          ×
        </button>

        {/* Icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${modalColor}20 0%, ${modalColor}40 100%)`,
            border: `3px solid ${modalColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: "40px",
            color: modalColor,
            animation: "scaleIn 0.4s ease-out 0.1s backwards",
          }}
        >
          {modalIcon}
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#fff",
            textAlign: "center",
            marginBottom: "16px",
            animation: "fadeInUp 0.4s ease-out 0.2s backwards",
          }}
        >
          {modalTitle}
        </h2>

        {/* Message */}
        <p
          style={{
            fontSize: "15px",
            color: "#a8b3cf",
            textAlign: "center",
            lineHeight: "1.6",
            marginBottom: !isApprove ? "24px" : "32px",
            animation: "fadeInUp 0.4s ease-out 0.3s backwards",
          }}
        >
          {modalMessage}
        </p>

        {/* Reason Input (only for rejection) */}
        {!isApprove && (
          <div
            style={{
              marginBottom: "32px",
              animation: "fadeInUp 0.4s ease-out 0.4s backwards",
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#fff",
                marginBottom: "8px",
              }}
            >
              Reason for Rejection *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for rejecting this request..."
              disabled={loading}
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "14px 16px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "2px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                transition: "all 0.3s ease",
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = modalColor;
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            animation: "fadeInUp 0.4s ease-out 0.5s backwards",
          }}
        >
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              flex: 1,
              padding: "16px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "2px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              flex: 1,
              padding: "16px",
              background: loading
                ? "rgba(168, 179, 207, 0.2)"
                : `linear-gradient(135deg, ${modalColor} 0%, ${modalColor}dd 100%)`,
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: loading ? "none" : `0 4px 20px ${modalColor}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 6px 25px ${modalColor}50`;
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 20px ${modalColor}40`;
              }
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderTop: "2px solid #fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                ></span>
                Processing...
              </>
            ) : (
              <>
                {modalIcon} {isApprove ? "Approve" : "Reject"}
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        textarea::placeholder { color: rgba(168, 179, 207, 0.5); }
      `}</style>
    </div>
  );
}

export default function WalletRequestsAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    requestId: null,
  });
  const itemsPerPage = 8;
  const [columnFilters, setColumnFilters] = useState({
    status: "pending",
  });
  const [copiedId, setCopiedId] = useState(null);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const config = useConfig();

  // Fetch all requests
  const fetchRequests = () => {
    setLoading(true);
    walletRequestAPI.getAllRequests(
      "",
      (res) => {
        setRequests(res.data.data.requests || []);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setColumnFilters({ status: "" });
    setCurrentPage(1);
  };

  const handleColumnFilterChange = (column, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
    setCurrentPage(1);
  };

  const handleCopy = (text, id) => {
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => {
          setCopiedId(null);
        }, 2000);
      })
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const searchLower = searchTerm.toLowerCase();
      const userId = request.userId?.email || request.userId?.refCode || "";
      const oldWallet = request.oldWalletAddress || "";
      const newWallet = request.newWalletAddress || "";
      const status = request.status || "";
      const dateTime = new Date(request.createdAt).toLocaleString();

      const matchesSearch =
        userId.toLowerCase().includes(searchLower) ||
        oldWallet.toLowerCase().includes(searchLower) ||
        newWallet.toLowerCase().includes(searchLower) ||
        status.toLowerCase().includes(searchLower) ||
        dateTime.toLowerCase().includes(searchLower);

      const matchesStatus =
        columnFilters.status === "" ||
        status.toLowerCase() === columnFilters.status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [requests, searchTerm, columnFilters]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleUpdateWalletsOnChain = async (requestsToProcess) => {
    if (!requestsToProcess || requestsToProcess.length === 0) return;

    const oldWallets = requestsToProcess.map((r) => r.oldWalletAddress);
    const newWallets = requestsToProcess.map((r) => r.newWalletAddress);
    const ids = requestsToProcess.map((r) => BigInt(`0x${r._id}`));

    console.log("Processing wallet updates on-chain:", {
      oldWallets,
      newWallets,
      ids,
    });

    try {
      await lotteryWriteFunction(config, "updateWalletsInActiveDraws", [
        oldWallets,
        newWallets,
        ids,
      ]);
      return true;
    } catch (error) {
      console.error("Error updating wallets on-chain:", error);
      toast.error(
        error.shortMessage ||
          "Failed to update wallets on-chain. Please try again.",
      );
      return false;
    }
  };

  const handleApproveAll = async () => {
    const pendingRequests = requests.filter((r) => r.status === "pending");
    if (pendingRequests.length === 0) {
      toast.info("No pending requests to approve.");
      return;
    }

    const batchSize = 50;
    const requestsToProcess = pendingRequests.slice(0, batchSize);

    toast.info(
      `Initiating approval for ${requestsToProcess.length} requests...`,
    );

    setIsProcessingBatch(true);

    const success = await handleUpdateWalletsOnChain(requestsToProcess);

    if (success) {
      toast.success(`Transaction submitted. Waiting 15s for confirmation...`);

      setTimeout(() => {
        fetchRequests(); // Refresh list
        setIsProcessingBatch(false);
        toast.success(`Successfully processed requests!`);
      }, 15000);
    } else {
      setIsProcessingBatch(false);
    }
  };

  const openModal = (type, requestId) => {
    setModalState({ isOpen: true, type, requestId });
  };

  const closeModal = () => {
    if (!actionLoading) {
      setModalState({ isOpen: false, type: null, requestId: null });
    }
  };

  const handleConfirmAction = async (reason) => {
    const { type, requestId } = modalState;
    setActionLoading(true);

    if (type === "approve") {
      const request = requests.find((r) => r._id === requestId);
      if (request) {
        const success = await handleUpdateWalletsOnChain([request]);
        if (success) {
          toast.success("Transaction submitted. Waiting for confirmation...");
          setTimeout(() => {
            fetchRequests();
            setActionLoading(false);
            closeModal();
            toast.success("Request approved successfully!");
          }, 15000);
        } else {
          setActionLoading(false);
        }
        return;
      }
    }

    const payload = { status: "rejected", reason };

    walletRequestAPI.updateRequestStatus(
      requestId,
      payload,
      (res) => {
        console.log(`Request rejected:`, res.data);
        setActionLoading(false);
        closeModal();

        toast.success("Request rejected successfully!");

        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: payload.status, reason: payload.reason }
              : request,
          ),
        );
      },
      (err) => {
        setActionLoading(false);
        toast.error("Failed to reject request!");
      },
    );
  };

  const handleExportCSV = () => {
    if (filteredRequests.length === 0) {
      alert("No data to export");
      return;
    }
    const exportData = filteredRequests.map((r, index) => ({
      "Sr #": filteredRequests.length - index,
      "User ID": r.userId?.email || r.userId?.refCode || "N/A",
      "Old Wallet": r.oldWalletAddress || "N/A",
      "New Wallet": r.newWalletAddress || "N/A",
      Status: r.status || "N/A",
      Reason: r.reason || "N/A",
      Timestamp: new Date(r.createdAt).toLocaleString(),
    }));
    exportToCSV(exportData, "Wallet_Updation_Requests");
  };

  const stats = useMemo(() => {
    const approved = filteredRequests.filter(
      (r) => r.status === "approved",
    ).length;
    const pending = filteredRequests.filter(
      (r) => r.status === "pending",
    ).length;
    const rejected = filteredRequests.filter(
      (r) => r.status === "rejected",
    ).length;
    return { approved, pending, rejected, total: filteredRequests.length };
  }, [filteredRequests]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ color: "#fff", fontSize: "18px" }}>
          Loading requests...
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        style={{
          marginTop: "40px",
          zIndex: 99999,
        }}
      />
      <div
        style={{
          minHeight: "100vh",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          alignItems: "flex-start",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <ConfirmationModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onConfirm={handleConfirmAction}
          type={modalState.type}
          loading={actionLoading}
        />
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "85%" }}>
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
              animation: "fadeInDown 0.6s ease-out",
            }}
          >
            <h1
              style={{
                fontSize: "42px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #ff6b4a 0%, #ff8c42 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "12px",
                letterSpacing: "-0.5px",
              }}
            >
              Wallet Update Requests
            </h1>
            <p
              style={{ color: "#a8b3cf", fontSize: "16px", fontWeight: "400" }}
            >
              Review and manage user wallet update requests
            </p>
          </div>

          {/* Stats Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
              width: "100%",
            }}
          >
            {[
              { label: "Pending", value: stats.pending, color: "#f59e0b" },
              { label: "Approved", value: stats.approved, color: "#10b981" },
              { label: "Rejected", value: stats.rejected, color: "#f87171" },
              { label: "Total Requests", value: stats.total, color: "#8b5cf6" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s backwards`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${stat.color}40`;
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                }}
              >
                <div
                  style={{
                    color: "#a8b3cf",
                    fontSize: "14px",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{ color: "#fff", fontSize: "32px", fontWeight: "700" }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Search and Filter */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              marginBottom: "24px",
              animation: "fadeIn 0.6s ease-out 0.3s backwards",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Search by user, wallet address, status..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  flex: "1",
                  minWidth: "250px",
                  padding: "14px 20px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
              <button
                onClick={clearFilters}
                style={{
                  padding: "14px 28px",
                  background:
                    "linear-gradient(135deg, #ff6b4a 0%, #ff8c42 100%)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(255, 107, 74, 0.3)",
                }}
              >
                Clear Filters
              </button>
              <button
                onClick={handleExportCSV}
                style={{
                  padding: "14px 28px",
                  background:
                    "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(34, 197, 94, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(34, 197, 94, 0.3)";
                }}
              >
                Export CSV
              </button>

              <select
                value={columnFilters.status}
                onChange={(e) =>
                  handleColumnFilterChange("status", e.target.value)
                }
                style={{
                  padding: "12px 16px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <option value="" style={{ background: "#1a1047" }}>
                  Filter Status
                </option>
                <option value="" style={{ background: "#1a1047" }}>
                  All
                </option>
                <option value="approved" style={{ background: "#1a1047" }}>
                  Approved
                </option>
                <option value="pending" style={{ background: "#1a1047" }}>
                  Pending
                </option>
                <option value="rejected" style={{ background: "#1a1047" }}>
                  Rejected
                </option>
              </select>

              <button
                onClick={fetchRequests}
                style={{
                  padding: "12px 10px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                <RefreshCw size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Approve All Button */}
          {stats.pending > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px",
                animation: "fadeIn 0.6s ease-out 0.35s backwards",
              }}
            >
              <button
                onClick={handleApproveAll}
                disabled={isProcessingBatch}
                style={{
                  padding: "14px 28px",
                  background: isProcessingBatch
                    ? "rgba(16, 185, 129, 0.5)"
                    : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: isProcessingBatch ? "not-allowed" : "pointer",
                  boxShadow: isProcessingBatch
                    ? "none"
                    : "0 4px 15px rgba(16, 185, 129, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isProcessingBatch) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(16, 185, 129, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isProcessingBatch) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(16, 185, 129, 0.4)";
                  }
                }}
              >
                {isProcessingBatch ? (
                  <>
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderTop: "2px solid #fff",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    ></span>
                    Processing Batch...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Approve All ({Math.min(stats.pending, 50)})
                  </>
                )}
              </button>
            </div>
          )}

          {/* Table */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              overflow: "hidden",
              animation: "fadeInUp 0.6s ease-out 0.4s backwards",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "135%",
                  borderCollapse: "collapse",
                  minWidth: "900px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "2px solid rgba(255, 107, 74, 0.3)",
                    }}
                  >
                    <th
                      style={{
                        padding: "20px",
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "14px",
                        width: "77px",
                      }}
                    >
                      Sr #
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      User
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      Old Wallet
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      New Wallet
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        padding: "20px",
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          padding: "60px 20px",
                          textAlign: "center",
                          color: "#a8b3cf",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                          🔍
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          No results found
                        </div>
                        <div style={{ fontSize: "14px" }}>
                          Try adjusting your search or filters
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedRequests.map((request, index) => (
                      <tr
                        key={request._id}
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <td
                          style={{
                            padding: "20px",
                            color: "#a8b3cf",
                            fontSize: "15px",
                            fontWeight: "600",
                          }}
                        >
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td
                          style={{
                            padding: "20px",
                            color: "#ff6b4a",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {request.userId?.email || "N/A"}
                        </td>
                        <td
                          style={{
                            padding: "20px",
                            color: "#a8b3cf",
                            fontSize: "13px",
                            maxWidth: "150px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          value={request.oldWalletAddress}
                        >
                          {request.oldWalletAddress}
                          <div
                            style={{
                              marginLeft: "8px",
                              cursor: "pointer",
                              color:
                                copiedId === `old-${request._id}`
                                  ? "#10b981"
                                  : "#a8b3cf",
                            }}
                            onClick={() =>
                              handleCopy(
                                request.oldWalletAddress,
                                `old-${request._id}`,
                              )
                            }
                            className="box-link-content"
                            title="Copy to clipboard"
                          >
                            <i
                              style={{ cursor: "pointer", fontSize: "14px" }}
                              className={
                                copiedId === `old-${request._id}`
                                  ? "icon-check"
                                  : "icon-coppy"
                              }
                            />
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "20px",
                            color: "#fff",
                            fontSize: "13px",
                            fontWeight: "600",
                            maxWidth: "150px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          value={request.newWalletAddress}
                        >
                          {request.newWalletAddress}
                          <div
                            style={{
                              marginLeft: "8px",
                              cursor: "pointer",
                              color:
                                copiedId === `new-${request._id}`
                                  ? "#10b981"
                                  : "#a8b3cf",
                            }}
                            onClick={() =>
                              handleCopy(
                                request.newWalletAddress,
                                `new-${request._id}`,
                              )
                            } // Fixed: was copying oldWalletAddress
                            className="box-link-content"
                            title="Copy to clipboard"
                          >
                            <i
                              style={{ cursor: "pointer", fontSize: "14px" }}
                              className={
                                copiedId === `new-${request._id}`
                                  ? "icon-check"
                                  : "icon-coppy"
                              }
                            />
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "20px",
                            color: "#a8b3cf",
                            fontSize: "13px",
                          }}
                        >
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "20px" }}>
                          <span
                            style={{
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "600",
                              background:
                                request.status === "approved"
                                  ? "#10b98120"
                                  : request.status === "rejected"
                                    ? "#f8717120"
                                    : "#f59e0b20",
                              color:
                                request.status === "approved"
                                  ? "#10b981"
                                  : request.status === "rejected"
                                    ? "#f87171"
                                    : "#f59e0b",
                            }}
                          >
                            {request.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: "20px" }}>
                          {request.status === "pending" ? (
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button
                                onClick={() =>
                                  openModal("approve", request._id)
                                }
                                style={{
                                  padding: "8px 16px",
                                  background: "#10b981",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(-2px)";
                                  e.currentTarget.style.boxShadow =
                                    "0 4px 12px rgba(16, 185, 129, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(0)";
                                  e.currentTarget.style.boxShadow = "none";
                                }}
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => openModal("reject", request._id)}
                                style={{
                                  padding: "8px 16px",
                                  background: "#f87171",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(-2px)";
                                  e.currentTarget.style.boxShadow =
                                    "0 4px 12px rgba(248, 113, 113, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(0)";
                                  e.currentTarget.style.boxShadow = "none";
                                }}
                              >
                                ✗
                              </button>
                            </div>
                          ) : (
                            <span
                              style={{ color: "#a8b3cf", fontSize: "13px" }}
                            >
                              {request.approvedBy?.email
                                ? `By: ${request.approvedBy.email}`
                                : "Processed"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "10px 16px",
                    background:
                      currentPage === 1
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    color: currentPage === 1 ? "#666" : "#fff",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  ← Previous
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        style={{
                          padding: "10px 16px",
                          background:
                            currentPage === pageNum
                              ? "linear-gradient(135deg, #ff6b4a 0%, #ff8c42 100%)"
                              : "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "8px",
                          color: "#fff",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "600",
                          minWidth: "44px",
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span
                        key={pageNum}
                        style={{ padding: "10px", color: "#666" }}
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "10px 16px",
                    background:
                      currentPage === totalPages
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    color: currentPage === totalPages ? "#666" : "#fff",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>

        <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder { color: rgba(168, 179, 207, 0.5); }
        input:focus::placeholder { color: rgba(168, 179, 207, 0.7); }
      `}</style>
      </div>
    </>
  );
}
