"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import styles from "./DateTimePickerModal.module.css";

// Helper function to convert a Date object to our tempTime state format
const dateToTempTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  return { hours: hours.toString(), minutes, period };
};

/**
 * A reusable modal component for selecting a date and time.
 * @param {boolean} show - Controls the visibility of the modal.
 * @param {function} onClose - Function to call when the modal should close.
 * @param {function} onSave - Callback function that receives the selected Date object.
 * @param {Date} [initialDate] - The initial date to display. Defaults to now.
 * @param {Date} [minDate] - The minimum selectable date.
 * @param {string} title - The title to display in the modal header.
 */
export default function DateTimePickerModal({
  show,
  onClose,
  onSave,
  initialDate,
  minDate,
  title = "Select Date & Time",
}) {
  const [tempDate, setTempDate] = useState(initialDate || new Date());
  const [tempTime, setTempTime] = useState(
    dateToTempTime(initialDate || new Date())
  );

  const [displayMonth, setDisplayMonth] = useState(
    (initialDate || new Date()).getMonth()
  );
  const [displayYear, setDisplayYear] = useState(
    (initialDate || new Date()).getFullYear()
  );

  // Reset internal state whenever the modal is opened
  useEffect(() => {
    if (show) {
      const date = initialDate || new Date();
      setTempDate(date);
      setTempTime(dateToTempTime(date));
      setDisplayMonth(date.getMonth());
      setDisplayYear(date.getFullYear());
    }
  }, [show, initialDate]);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const generateCalendarDays = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInPrevMonth = getDaysInMonth(month - 1, year);
    const days = [];

    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isOtherMonth: true,
        date: new Date(year, month - 1, daysInPrevMonth - i),
      });
    }
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isOtherMonth: false,
        date: new Date(year, month, i),
      });
    }
    // Next month's days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isOtherMonth: true,
        date: new Date(year, month + 1, i),
      });
    }
    return days;
  };

  const handleSave = () => {
    let hours = parseInt(tempTime.hours);
    if (tempTime.period === "PM" && hours !== 12) hours += 12;
    if (tempTime.period === "AM" && hours === 12) hours = 0;

    const newDate = new Date(tempDate);
    newDate.setHours(hours, parseInt(tempTime.minutes) || 0, 0, 0);

    onSave(newDate);
    onClose();
  };

  if (!show) return null;

  const calendarDays = generateCalendarDays(displayMonth, displayYear);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <Calendar size={24} style={{ color: "#ff8c42" }} />
          <h3>{title}</h3>
        </div>
        <div className={styles.monthYearSelector}>
          <button onClick={handlePrevMonth}>‹</button>
          <span className={styles.monthYearDisplay}>
            {monthNames[displayMonth]} {displayYear}
          </span>
          <button onClick={handleNextMonth}>›</button>
        </div>
        <div className={styles.calendarGrid}>
          {dayNames.map((day) => (
            <div key={day} className={styles.calendarHeader}>
              {day}
            </div>
          ))}
          {calendarDays.map((dayObj, idx) => {
            const isToday =
              dayObj.date.toDateString() === new Date().toDateString();
            const isSelected =
              dayObj.date.toDateString() === tempDate.toDateString();

            // Disable past dates, and dates before the provided minDate
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(23, 59, 59, 999);

            let isPast = dayObj.date < yesterday;
            if (minDate) {
              const min = new Date(minDate);
              min.setHours(0, 0, 0, 0);
              if (dayObj.date < min) isPast = true;
            }

            const dayClasses = [
              styles.calendarDay,
              isSelected ? styles.selected : "",
              dayObj.isOtherMonth ? styles.otherMonth : "",
              isToday ? styles.today : "",
              isPast ? styles.disabled : "",
            ].join(" ");

            return (
              <div
                key={idx}
                className={dayClasses}
                onClick={() =>
                  !dayObj.isOtherMonth && !isPast && setTempDate(dayObj.date)
                }
              >
                {dayObj.day}
              </div>
            );
          })}
        </div>
        <div className={styles.timePicker}>
          <input
            type="number"
            min="1"
            max="12"
            className={styles.timeInput}
            placeholder="HH"
            value={tempTime.hours}
            onChange={(e) =>
              setTempTime({ ...tempTime, hours: e.target.value })
            }
          />
          <input
            type="number"
            min="0"
            max="59"
            className={styles.timeInput}
            placeholder="MM"
            value={tempTime.minutes}
            onChange={(e) =>
              setTempTime({
                ...tempTime,
                minutes: e.target.value.padStart(2, "0"),
              })
            }
          />
          <select
            className={styles.timeInput}
            value={tempTime.period}
            onChange={(e) =>
              setTempTime({ ...tempTime, period: e.target.value })
            }
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btnPrimary} onClick={handleSave}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
