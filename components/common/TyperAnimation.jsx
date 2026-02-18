"use client";
import React, { useEffect, useRef, useState } from "react";

export default function TyperAnimation({ text = "Tronado Lottery" }) {
  const [isAnimated, setIsAnimated] = useState(false);
  const typeitRef = useRef(null);

  useEffect(() => {
    // Start typing animation by setting width to 0
    if (typeitRef.current) {
      typeitRef.current.style.width = "0px";

      // Animate in after a short delay
      setTimeout(() => {
        if (typeitRef.current) {
          typeitRef.current.style.width =
            typeitRef.current.scrollWidth + 10 + "px";
        }

        // Mark animation as complete so we stop triggering it
        setIsAnimated(true);
      }, 500); // Adjust timing as needed
    }
  }, []);

  return (
    <span
      ref={typeitRef}
      className="cd-words-wrapper typeanimation"
      style={{
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        transition: isAnimated ? "width 0.6s ease" : "none",
      }}
    >
      <span className="item-text is-visible">{text}</span>
    </span>
  );
}
