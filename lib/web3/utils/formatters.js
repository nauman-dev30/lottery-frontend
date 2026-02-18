// In your helpers file
import { formatUnits } from "viem";

export const formatTokenValue = (value, decimals, fixed = 4) => {
  // Handle cases where the value might be null or undefined
  if (value === undefined || value === null) {
    return "0.0000";
  }

  // 1. Get the full-precision string from formatUnits. This is safe.
  // e.g., "999999483669316297.000000000000000000"
  const formattedString = formatUnits(value, decimals);

  const dotIndex = formattedString.indexOf(".");

  // 2. If there's no decimal point, add one with the required zeros.
  // e.g., "123" -> "123.0000"
  if (dotIndex === -1) {
    return formattedString + "." + "0".repeat(fixed);
  }

  // 3. If there is a decimal point, just take the part of the string you need.
  // This performs truncation, not rounding.
  const integerPart = formattedString.substring(0, dotIndex);
  const fractionalPart = formattedString.substring(dotIndex + 1);

  // Combine the parts, ensuring the fractional part has the correct length.
  if (fractionalPart.length > fixed) {
    return `${integerPart}.${fractionalPart.substring(0, fixed)}`;
  } else {
    return `${integerPart}.${fractionalPart.padEnd(fixed, "0")}`;
  }
};

export const numberToSuffix = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

export const formatDuration = (totalDays) => {
  if (totalDays <= 0) return "0 days";
  if (totalDays < 1) return "Less than a day";

  // Use Math.round for a more intuitive result (e.g., 29.9 days is 30 days)
  const roundedDays = Math.round(totalDays);

  // If it's less than a month, no need for complex logic.
  if (roundedDays < 30) {
    return `${roundedDays} day${roundedDays !== 1 ? "s" : ""}`;
  }

  const years = Math.floor(roundedDays / 365);
  const months = Math.floor((roundedDays % 365) / 30);

  // --- THIS IS THE PART WE ARE ADDING BACK ---
  const days = Math.floor((roundedDays % 365) % 30);
  // ------------------------------------------

  const parts = [];

  if (years > 0) {
    parts.push(`${years} year${years > 1 ? "s" : ""}`);
  }
  if (months > 0) {
    parts.push(`${months} month${months > 1 ? "s" : ""}`);
  }
  // --- AND WE ADD ITS DISPLAY LOGIC BACK ---
  if (days > 0) {
    parts.push(`${days} day${days > 1 ? "s" : ""}`);
  }
  // -----------------------------------------

  // This fallback ensures that if parts somehow ends up empty,
  // it will still return a sensible value.
  return parts.length > 0 ? parts.join(", ") : `${roundedDays} days`;
};
