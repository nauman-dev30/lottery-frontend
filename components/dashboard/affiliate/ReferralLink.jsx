"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { API_BASE } from "@/config";
import { useSelector } from "react-redux";

export default function ReferralLink() {
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy link");
  const user = useSelector((state) => state.user.userData);


  useEffect(() => {
    if (user) {
      const link = `${window.location.origin}/register?ref=${user.refCode}`;
      setReferralLink(link);
    }
  }, [user]);



  const handleCopy = () => {
    if (!referralLink) return;

    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true);
        setCopyButtonText("Copied!");

        setTimeout(() => {
          setCopied(false);
          setCopyButtonText("Copy link");
        }, 2000);
      })
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  };

  if (!user) {
    return (
      <div className="tf-container wrap-our-jackpot">
        <div className="row">
          <div className="col-12">
            <div className="wg-infomation">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="the-vault-content">
        <div className="right">
          <div>
            <div className="title">Your referral link</div>
            <div className="box-link style-1">
              <input
                id="coppy1"
                type="text"
                className="box-link-content"
                value={referralLink}
                readOnly
                required
              />
              <div
                className="button-coppy"
                onClick={handleCopy}
                style={{ cursor: "pointer" }}
              >
                <i className={copied ? "icon-check" : "icon-coppy"} />
                {copyButtonText}
              </div>
            </div>
          </div>
          <div>
            <div className="title">Share your referral link</div>
            <div>
              <ul className="tf-social style-1">
                {/* These can be made dynamic later with a library like react-share */}
                <li>
                  <a href="#">
                    <i className="icon-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-send" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-discord" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-linkedin2" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-youtube" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-tiktok" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-skype" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}