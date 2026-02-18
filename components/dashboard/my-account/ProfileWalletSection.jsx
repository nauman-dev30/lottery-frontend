"use client";
import React, { useState, useRef, useEffect } from "react";
import { walletRequestAPI } from "@/backendServices/ApiCalls";

export default function ProfileWalletSection({ walletAddress, walletRequestStatus, pendingRequest, fetchPendingRequest, fetchUserData }) {
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [isWalletEditable, setIsWalletEditable] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const walletInputRef = useRef(null);

  const [walletError, setWalletError] = useState("");
  const [walletSuccess, setWalletSuccess] = useState("");
  const [showApprovedBox, setShowApprovedBox] = useState(true);

  useEffect(() => {
    setNewWalletAddress(walletAddress || "");
  }, [walletAddress]);

  // Reset showApprovedBox when status changes to approved
  useEffect(() => {
    if (walletRequestStatus === "approved") {
      setShowApprovedBox(true);
    }
  }, [walletRequestStatus]);

  // Wallet handlers
  const handleEditWallet = () => {
    setIsWalletEditable(true);
    setNewWalletAddress("");
    setTimeout(() => walletInputRef.current?.focus(), 0);
  };

  const handleCancelWallet = () => {
    setIsWalletEditable(false);
    setNewWalletAddress(walletAddress);
    setWalletError("");
    setWalletSuccess("");
  };

  const handleWalletUpdate = () => {
    setWalletError("");
    setWalletSuccess("");

    if (!newWalletAddress || newWalletAddress.trim().length < 20) {
      setWalletError("Please enter a valid wallet address (minimum 20 characters)");
      return;
    }

    if (newWalletAddress.trim() === walletAddress) {
      setWalletError("New wallet address cannot be the same as current address");
      return;
    }

    setWalletLoading(true);
    walletRequestAPI.createRequest(
      {
        newWalletAddress: newWalletAddress.trim(),
        currentWalletAddress: walletAddress
      },
      (res) => {
        setWalletSuccess("Your request is sent to the admin for approval.");
        setIsWalletEditable(false);
        setNewWalletAddress(walletAddress);
        fetchPendingRequest();
        fetchUserData();
        setWalletLoading(false);
      },
      (err) => {
        console.error("Update error:", err);
        setWalletError(err.response?.data?.message || "Failed to submit request");
        setWalletLoading(false);
      }
    );
  };

  const handleMakeNewRequest = () => {
    fetchPendingRequest();
    setIsWalletEditable(true);
    setNewWalletAddress("");
    setWalletError("");
    setWalletSuccess("");
  };

  const handleCloseApprovedBox = () => {
    setShowApprovedBox(false);
  };

  const getWalletStatusDisplay = () => {
    if (!pendingRequest) return null;

    if (walletRequestStatus === "approved" && showApprovedBox) {
      return (
        <div style={{ marginTop: "50px", padding: "10px 14px", border: "1px solid #28a745", borderRadius: "5px", position: "relative" }}>
          <button
            onClick={handleCloseApprovedBox}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              color: "#28a745",
              fontSize: "20px",
              cursor: "pointer",
              padding: "0",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            aria-label="Close"
          >
            ×
          </button>
          <div className="d-flex align-items-center gap-2">
            <i className="icon-check-1" style={{ color: "#28a745", fontSize: "20px" }} />
            <div>
              <p className="mb-1 title fw-9 mb-6" style={{ color: "#28a745", fontSize: "17px" }}>
                Request Approved
              </p>
              <p className="mb-0 sub-title fw-4 type-secondary">
                Your request for new Wallet Address "{pendingRequest.newWalletAddress}" has been approved.
              </p>
              <p className="mb-0 sub-title fw-4 type-secondary">
                Your wallet address has been successfully updated.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (walletRequestStatus === "rejected") {
      return (
        <div style={{ marginTop: "50px", padding: "10px 14px", border: "1px solid #cc0000", borderRadius: "5px" }}>
          <div className="d-flex align-items-center gap-2">
            <div>
              <p className="mb-1 title fw-9 mb-6" style={{ color: "#cc0000", fontSize: "17px" }}>
                Request Rejected
              </p>
              <p className="mb-0 sub-title fw-4 type-secondary">
                Your request for approval for new Wallet Address "{pendingRequest.newWalletAddress}" has been rejected.
              </p>
              <p className="mb-0 sub-title fw-4 type-secondary">
                Reason: {pendingRequest.reason}
              </p>
              <button onClick={handleMakeNewRequest} className="btn btn-sm btn-danger" style={{ padding: "6px 16px", fontSize: "14px", marginTop: "8px" }}>
                <i className="icon-write" style={{ marginRight: "6px" }} />
                Make New Request
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (walletRequestStatus === "pending") {
      return (
        <div className="p-3 bg-opacity-10 border border-warning rounded" style={{ marginTop: "5rem" }}>
          <div className="d-flex align-items-center gap-2">
            <i className="icon-time text-warning" />
            <div>
              <p className="mb-1 title fw-9 mb-6 text-warning">Pending Approval</p>
              <p className="mb-0 sub-title fw-4 type-secondary">
                Your approval for new Wallet Address "{pendingRequest.newWalletAddress}" is in process.
              </p>
              <p className="mb-0 sub-title fw-4 type-secondary">
                Submitted: {new Date(pendingRequest.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="col-lg-12">
      <div className="profile-security">
        <div className="heading-left">
          <h4 className="title fw-9 mb-6">Wallet Update</h4>
          <p className="sub-title fw-4 type-secondary mb-30">Request wallet address change</p>
          {isWalletEditable ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleWalletUpdate} disabled={walletLoading || (pendingRequest && pendingRequest.status === "pending")} className="tf-btn style-3 pd-0-46" style={{ cursor: (walletLoading || (pendingRequest && pendingRequest.status === "pending")) ? "not-allowed" : "pointer", opacity: (walletLoading || (pendingRequest && pendingRequest.status === "pending")) ? 0.5 : 1 }}>
                {walletLoading ? "Submitting..." : "Submit Request"}
              </button>
              <button onClick={handleCancelWallet} disabled={walletLoading} className="tf-btn style-3 pd-0-46" style={{ backgroundColor: "#6c757d" }}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleEditWallet} disabled={pendingRequest && pendingRequest.status === "pending"} className="tf-btn style-3 pd-0-46" style={{ cursor: (pendingRequest && pendingRequest.status === "pending") ? "not-allowed" : "pointer", opacity: (pendingRequest && pendingRequest.status === "pending") ? 0.5 : 1 }}>
              <i className="icon-write" style={{ marginRight: "6px" }} />
              {(pendingRequest && pendingRequest.status === "pending") ? "Request Pending" : "Edit Wallet"}
            </button>
          )}
        </div>
        <div className="edit-password">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="cols relative" style={{ top: '25px' }}>
              <fieldset>
                <label>Current Wallet Address</label>
                <input ref={walletInputRef} type="text" value={newWalletAddress} onChange={(e) => { setNewWalletAddress(e.target.value); setWalletError(""); setWalletSuccess(""); }} disabled={!isWalletEditable || (pendingRequest && pendingRequest.status === "pending")} className="p-10-19" placeholder="Enter new wallet address" style={{ cursor: (isWalletEditable && !(pendingRequest && pendingRequest.status === "pending")) ? "text" : "not-allowed", borderColor: walletError ? "#dc3545" : (walletSuccess ? "#28a745" : ""), backgroundColor: (isWalletEditable && !(pendingRequest && pendingRequest.status === "pending")) ? "transparent" : "#30335AFF" }} />
              </fieldset>
            </div>

            {walletError && (
              <div style={{ marginTop: "20px", padding: "10px 12px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#dc3545", fontSize: "14px" }}>{walletError}</span>
              </div>
            )}

            {walletSuccess && (
              <div style={{ marginTop: "20px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="icon-check-1" style={{ color: "#28a745", fontSize: "16px" }} />
                <span style={{ color: "#28a745", fontSize: "14px" }}>{walletSuccess}</span>
              </div>
            )}

            {getWalletStatusDisplay()}
          </form>
        </div>
      </div>
    </div>
  );
}