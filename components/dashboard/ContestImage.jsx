"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ContestImage({ src, alt, className, width, height }) {
  const [displayableUrl, setDisplayableUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get API_BASE inside the component to ensure it's available on client-side
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    if (src) {
      let objectUrl = null;
      const imageUrl =
        src.startsWith("http") || src.startsWith("/")
          ? src
          : `${API_BASE}/uploads/${src}`;

      const fetchImageAsBlob = async () => {
        try {
          const response = await fetch(imageUrl);
          if (response.ok) {
            const blob = await response.blob();
            objectUrl = URL.createObjectURL(blob);
            setDisplayableUrl(objectUrl);
          } else {
            console.error(
              "ContestImage - Failed to fetch banner image, status:",
              response.status,
              "URL:",
              imageUrl
            );
            setDisplayableUrl("/images/component/contest-1.jpg");
          }
        } catch (error) {
          console.error("ContestImage - Error fetching banner image:", error, "URL:", imageUrl);
          setDisplayableUrl("/images/component/contest-1.jpg");
        } finally {
          setLoading(false);
        }
      };

      fetchImageAsBlob();

      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    } else {
      setDisplayableUrl("/images/component/contest-1.jpg");
      setLoading(false);
    }
  }, [src]);

  if (loading || !displayableUrl) {
    return (
      <Image
        className={className}
        alt="Loading..."
        src="/images/component/contest-1.jpg"
        width={width || 700}
        height={height || 460}
      />
    );
  }

  return (
    <Image
      className={className}
      alt={alt || "Contest Banner"}
      src={displayableUrl}
      width={width || 700}
      height={height || 460}
      unoptimized
    />
  );
}
