"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/backendServices/ApiCalls";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const storedUser = localStorage.getItem("authUser");
      const storedWallet = localStorage.getItem("walletAddress");

      if (storedUser && storedWallet) {
        // Since we are removing token, we identify user by wallet
        postRequest(
          "getUser",
          { address: storedWallet },
          (res) => {
            const user = res.data.user;
            setUser(user);
            setWalletAddress(storedWallet || user.walletAddress);
          },
          (err) => {
            console.error("Error fetching user:", err);
          }
        );
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (token, user, address) => {
    try {
      const authUser = user;
      localStorage.setItem("authUser", JSON.stringify(authUser));
      if (address) {
        localStorage.setItem("walletAddress", address);
        setWalletAddress(address);
      }
      setUser(authUser);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("walletAddress");
    setUser(null);
    setWalletAddress(null);
    router.push("/");
  };

  const isAuthenticated = () => {
    return !!(user && walletAddress);
  };

  const value = {
    setUser,
    user,
    walletAddress,
    setWalletAddress,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
