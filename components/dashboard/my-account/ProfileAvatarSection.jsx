"use client";
import React, { useState } from "react";
import Image from "next/image";
import { putRequest, putRequestWithFile } from "@/backendServices/ApiCalls";
import { toast } from "react-toastify";

export default function ProfileAvatarSection({ user, setUser, fetchUserData }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isInfoEditable, setIsInfoEditable] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  // Store original data for reset
  const [originalData, setOriginalData] = useState({
    email: "",
    phone: "",
  });

  React.useEffect(() => {
    if (user) {
      const userInfo = {
        email: user.email || "",
        // username: user.username || "",
        phone: user.phone || ""
      };
      setFormData(prev => ({ ...prev, ...userInfo }));
      setOriginalData(userInfo);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Avatar handlers
  const handleSaveAvatar = () => {
    if (!avatarFile) {
      toast.error("Please select an image first");
      return;
    }

    setUploadLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("avatar", avatarFile);
    formDataToSend.append("walletAddress", user?.walletAddress);
    formDataToSend.append("userId", user?._id);

    putRequestWithFile(
      "getUser/update",
      formDataToSend,
      (res) => {
        if (res.data.success) {
          toast.success("Profile picture updated successfully!");
          const newAvatarPath = res.data?.user?.avatar;
          if (newAvatarPath) {
            setUser(prev => ({ ...prev, avatar: newAvatarPath }));
          }
          setShowModal(false);
          setAvatarFile(null);
          setTimeout(() => fetchUserData(), 500);
        } else {
          toast.error(res.data.message || "Failed to update profile picture");
        }
        setUploadLoading(false);
      },
      (err) => {
        console.error("Error uploading avatar:", err);
        toast.error(err.response?.data?.message || "Failed to upload profile picture");
        setUploadLoading(false);
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size should be less than 50MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      setAvatarFile(file);
    }
  };

  const handleDeleteAvatar = () => {
    putRequest(
      "getUser/update",
      { avatar: '/update/avatars/default.png' },
      (res) => {
        if (res.data.success) {
          setShowDeleteConfirm(false);
          toast.success("Profile picture deleted successfully!");
          setUser(prev => ({ ...prev, avatar: '/update/avatars/default.png' }));
          setTimeout(() => fetchUserData(), 500);
        }
      },
      (err) => {
        console.error("Error deleting avatar:", err);
        toast.error(err.response?.data?.message || "Failed to delete profile picture");
      }
    );
  };

  // Personal info handlers
  const handleEditInfo = () => {
    setIsInfoEditable(true);
  };

  const handleCancelInfo = () => {
    setFormData(prev => ({
      ...prev,
      email: originalData.email,
      phone: originalData.phone,
    }));
    setIsInfoEditable(false);
  };

  const handleSaveInfo = () => {

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    setInfoLoading(true);
    const dataToUpdate = {
      email: formData.email,
      phone: formData.phone,
      walletAddress: user?.walletAddress,
      userId: user?._id
    };
    console.log("Sending data to backend:", dataToUpdate);

    putRequest(
      "getUser/update",
      dataToUpdate,
      (res) => {
        if (res.data.success) {
          toast.success("Profile information updated successfully!");
          setUser(prev => ({
            ...prev,
            email: formData.email,
            phone: formData.phone,
          }));
          setOriginalData({
            email: formData.email,
            phone: formData.phone,
          });
          setIsInfoEditable(false);
          setTimeout(() => {
            fetchUserData();
          }, 1000);
        }
        setInfoLoading(false);
      },
      (err) => {
        console.error("Error updating profile:", err);
        toast.error(err.response?.data?.message || "Failed to update profile");
        setInfoLoading(false);
      }
    );
  };

  return (
    <>
      {/* Avatar Section */}
      <div className="col-lg-12">
        <h3 className="fw-9 pb-34 wow fadeInUp" data-wow-delay="0s">Edit profile</h3>
        <div className="profile-avatar">
          <div className="heading-left">
            <h4 className="title fw-9 mb-6 wow fadeInUp" data-wow-delay="0s">Avatar</h4>
            <p className="sub-title fw-4 type-secondary">Edit your profile picture</p>
          </div>
          <div className="edit-avatar relative">
            <div className="image">
              {user?.avatar && (
                <Image
                  id="previewAvt"
                  alt="Profile Avatar"
                  src={API_BASE_URL + "/" + user?.avatar}
                  width={381}
                  height={396}
                  key={user?.avatar}
                />
              )}
            </div>
            <button className="ic-edit" onClick={() => setShowModal(true)}>
              <i className="icon-write" />
            </button>
            <button className="ic-del" onClick={() => setShowDeleteConfirm(true)}>
              <i className="icon-delete" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal fade modalCenter auto-popup show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content modal-sm">
              <div className="login-wrap">
                <div className="content">
                  <div className="close-form">
                    <a href="#" onClick={(e) => { e.preventDefault(); setShowDeleteConfirm(false); }}>
                      <i className="icon-close" />
                    </a>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Delete Profile Picture?</h3>
                  <p className="text-center m-4">Are you sure you want to remove your profile picture?</p>
                  <button type="button" className="btn-login tf-btn w-full mt-4 max-w-48 mx-auto" onClick={handleDeleteAvatar}>
                    <i className="icon-delete mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Edit Modal */}
      {showModal && (
        <div className="modal fade modalCenter auto-popup show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content modal-sm">
              <div className="login-wrap">
                <div className="content">
                  <div className="close-form">
                    <a href="#" onClick={(e) => { e.preventDefault(); setShowModal(false); setAvatarFile(null); }}>
                      <i className="icon-close" />
                    </a>
                  </div>
                  <h4 className="title text-center">Edit Profile Picture</h4>
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image src={API_BASE_URL + "/" + user?.avatar} alt="Preview" width={96} height={96} />
                    </div>
                  </div>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input type="file" id="fileInput" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
                    <div className="cols mb-15 mt-20 text-center">
                      <button type="button" className="w-full p-3 border rounded" onClick={() => document.getElementById("fileInput").click()} disabled={uploadLoading}>
                        {avatarFile ? avatarFile.name : "Click to select image"}
                      </button>
                    </div>
                    <button type="button" className="btn-login tf-btn w-full" onClick={handleSaveAvatar} disabled={uploadLoading || !avatarFile} style={{ cursor: (uploadLoading || !avatarFile) ? "not-allowed" : "pointer", opacity: (uploadLoading || !avatarFile) ? 0.6 : 1 }}>
                      {uploadLoading ? "Uploading..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Info Section */}
      <div className="col-lg-12">
        <div className="profile-infor">
          <div className="heading-left">
            <h4 className="title fw-9 mb-6">Personal information</h4>
            <p className="sub-title fw-4 type-secondary mb-30">Change your identity information</p>
            {isInfoEditable ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleSaveInfo} disabled={infoLoading} className="tf-btn style-3 pd-0-46" style={{ cursor: infoLoading ? "not-allowed" : "pointer", opacity: infoLoading ? 0.6 : 1 }}>
                  {infoLoading ? "Saving..." : "Save"}
                </button>
                <button onClick={handleCancelInfo} disabled={infoLoading} className="tf-btn style-3 pd-0-46" style={{ backgroundColor: "#6c757d" }}>
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={handleEditInfo} className="tf-btn style-3 pd-0-46">
                <i className="icon-write" style={{ marginRight: "6px" }} />
                Edit
              </button>
            )}
          </div>
          <div className="edit-infor">
            <form onSubmit={(e) => e.preventDefault()}>
              {/* <div className="cols mb-30">
                <fieldset>
                  <label>Your name</label>
                  <input name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Your name" disabled={!isInfoEditable} style={{ backgroundColor: !isInfoEditable ? "#30335AFF" : "transparent", cursor: !isInfoEditable ? "not-allowed" : "text" }} />
                </fieldset>
              </div> */}
              <div className="cols mb-30 has-verified">
                <fieldset>
                  <label>Email address</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your email" disabled={!isInfoEditable} style={{ backgroundColor: !isInfoEditable ? "#30335AFF" : "transparent", cursor: !isInfoEditable ? "not-allowed" : "text" }} />
                </fieldset>
              </div>
              <div className="cols has-verified">
                <fieldset>
                  <label>Phone (optional)</label>
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="0123456789" disabled={!isInfoEditable} style={{ backgroundColor: !isInfoEditable ? "#30335AFF" : "transparent", cursor: !isInfoEditable ? "not-allowed" : "text" }} />
                </fieldset>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}