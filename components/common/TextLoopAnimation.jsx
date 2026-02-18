"use client";
import React, { useEffect, useState } from "react";
const defaultStrings = ["Text to Image", "Text to Image", "Text to Image"];
export default function TextLoopAnimation({ strings = defaultStrings }) {
  const [activeSctingIndex, setActiveSctingIndex] = useState(0);
  useEffect(() => {
    const reapetTyping = setInterval(() => {
      setTimeout(() => {
        setActiveSctingIndex((pre) => {
          if (pre == strings.length - 1) {
            return 0;
          } else {
            return pre + 1;
          }
        });
      }, 600);
    }, 2200);

    // Cleanup function to destroy the Typed instance
    return () => {
      clearInterval(reapetTyping);
    };
  }, []);
  return (
    <>
      {strings.map((elm, i) => (
        <span
          key={i}
          className={`item-text ${
            activeSctingIndex == i ? "is-visible" : "is-hidden"
          } `}
        >
          {elm}
        </span>
      ))}
    </>
  );
}
