"use client";
import { useAppData } from "@/lib/web3/fetchBlockchainData/useAppData";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@/config";
import { useDispatch } from "react-redux";
import { setUserData } from "./features/web3Slices/userSlice";
import { useAccount, useDisconnect } from "wagmi";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

const StarterFunction = () => {
  const router = useRouter();
  const { isLoading } = useAppData();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  // const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const fetchUserData = async () => {
    if (!address) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/getUser`, {
        address,
        ref,
      }
      );

      console.log("Response from getUser:", response.data.user);
      if (response.data.success) {
        dispatch(setUserData(response.data.user));
        setError(null);
        router.push("/dashboard");
      } else {

      }
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
      const msg = error.response?.data?.message || "Failed to fetch user data";
      setError(msg);
      toast.error(msg, {
        toastId: "auth-error", // Prevent duplicate toasts
      });
      disconnect();
    }
  };

  useEffect(() => {
    if (address) {
      fetchUserData();
    }
  }, [address]);

  // You can access user data fields like:
  // userData?.email
  // userData?.refCode
  // userData?.refby
  // userData?.walletAddress

  return null;
};

export default StarterFunction;
