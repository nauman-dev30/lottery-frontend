"use client";
import React, { useState } from "react";
import { putRequest } from "@/backendServices/ApiCalls";
import { toast } from "react-toastify";

export default function ProfileSecuritySection() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Password handlers
  const handleEditPassword = () => {
    setIsPasswordEditable(true);
  };

  const handleCancelPassword = () => {
    setFormData(prev => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));
    setIsPasswordEditable(false);
  };

  const handleSavePassword = () => {
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setPasswordLoading(true);
    putRequest(
      "getUser/update",
      { password: formData.password },
      (res) => {
        if (res.data.success) {
          toast.success("Password updated successfully!");
          setFormData(prev => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));
          setIsPasswordEditable(false);
        }
        setPasswordLoading(false);
      },
      (err) => {
        console.error("Error updating password:", err);
        toast.error(err.response?.data?.message || "Failed to update password");
        setPasswordLoading(false);
      }
    );
  };

  return (
    <div className="col-lg-12">
      <div className="profile-security profile-infor">
        <div className="heading-left">
          <h4 className="title fw-9 mb-6 wow fadeInUp" data-wow-delay="0s">Security</h4>
          <p className="sub-title fw-4 type-secondary mb-30">Update your password</p>
          {isPasswordEditable ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleSavePassword} disabled={passwordLoading} className="tf-btn style-3 pd-0-46" style={{ cursor: passwordLoading ? "not-allowed" : "pointer", opacity: passwordLoading ? 0.6 : 1 }}>
                {passwordLoading ? "Saving..." : "Save"}
              </button>
              <button onClick={handleCancelPassword} disabled={passwordLoading} className="tf-btn style-3 pd-0-46" style={{ backgroundColor: "#6c757d" }}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleEditPassword} className="tf-btn style-3 pd-0-46">
              <i className="icon-write" style={{ marginRight: "6px" }} />
              Change Password
            </button>
          )}
        </div>
        <div className="edit-password">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="cols mb-30 relative has-verified z-5">
              <fieldset>
                <label>Password *</label>
                <input className="password p-10-19" type={showPass ? "text" : "password"} value={formData.password} onChange={handleChange} name="password" placeholder="Password" disabled={!isPasswordEditable} style={{ backgroundColor: !isPasswordEditable ? "#30335AFF" : "transparent", cursor: !isPasswordEditable ? "not-allowed" : "text" }} />
                {isPasswordEditable && (
                  <span onClick={() => setShowPass(pre => !pre)} className={`toggle-password ${showPass ? "unshow" : ""} first-time`}>
                    <i className="icon-view" />
                  </span>
                )}
              </fieldset>
            </div>
            <div className="cols relative has-verified z-5">
              <fieldset>
                <label>Confirm password *</label>
                <input className="password p-10-19" type={showPass2 ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} name="confirmPassword" placeholder="Password" disabled={!isPasswordEditable} style={{ backgroundColor: !isPasswordEditable ? "#30335AFF" : "transparent", cursor: !isPasswordEditable ? "not-allowed" : "text" }} />
                {isPasswordEditable && (
                  <span onClick={() => setShowPass2(pre => !pre)} className={`toggle-password ${showPass2 ? "unshow" : ""} second-time`}>
                    <i className="icon-view" />
                  </span>
                )}
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}