"use client";
import React, { useState, useEffect } from "react";
import { getRequest, walletRequestAPI } from "@/backendServices/ApiCalls";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/contexts/AuthContext";
import ProfileAvatarSection from "./ProfileAvatarSection";
import ProfileSecuritySection from "./ProfileSecuritySection";
import ProfileWalletSection from "./ProfileWalletSection";

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const [pendingRequest, setPendingRequest] = useState(null);
  const [walletRequestStatus, setWalletRequestStatus] = useState("");

  // Fetch data
  const fetchUserData = () => {
    if (!user?.walletAddress) return;

    setIsDataLoading(true);
    postRequest(
      "getUser",
      { address: user.walletAddress },
      (res) => {
        const userData = res.data.user;
        console.log("userData", userData);

        // Update the user context with fresh data
        setUser(prev => ({
          ...prev,
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          avatar: userData.avatar,
          walletAddress: userData.walletAddress,
          walletUpdateRequest: userData.walletUpdateRequest,
          _id: userData._id
        }));

        setWalletAddress(userData.walletAddress || "");
        setWalletRequestStatus(userData.walletUpdateRequest || "");
        setIsDataLoading(false);
      },
      (err) => {
        console.error("Error fetching user:", err);
        setIsDataLoading(false);
      }
    );
  };

  const fetchPendingRequest = () => {
    if (!user?.walletAddress) return;

    walletRequestAPI.getMyRequests(
      user.walletAddress,
      (res) => {
        const requests = res.data.data.requests;
        const sorted = requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPendingRequest(sorted[0]);
      },
      (err) => console.error("Error fetching requests:", err)
    );
  };

  useEffect(() => {
    if (user?.walletAddress) {
      fetchUserData();
      fetchPendingRequest();
    }
  }, [user?.walletAddress]);


  if (isDataLoading && !user?.avatar) {
    return (
      <div className="my-account-profile">
        <div className="tf-container">
          <div className="text-center py-5">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-account-profile">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" style={{ marginTop: "40px" }} />
      <div className="tf-container">
        <div className="row">
          {/* Avatar and Personal Info Section */}
          <ProfileAvatarSection
            user={user}
            setUser={setUser}
            fetchUserData={fetchUserData}
          />

          {/* Security Section */}
          {/* <ProfileSecuritySection /> */}

          {/* Wallet Update Section */}
          <ProfileWalletSection
            walletAddress={walletAddress}
            walletRequestStatus={walletRequestStatus}
            pendingRequest={pendingRequest}
            fetchPendingRequest={fetchPendingRequest}
            fetchUserData={fetchUserData}
          />
        </div>
      </div>
    </div>
  );
}