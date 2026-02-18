// components/LineChart.js
"use client"; // required for app directory in Next.js 13+

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    ctx.canvas.height = 80;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Cleanup previous instance
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
        ],
        datasets: [
          {
            data: [
              0, 0.35, 0.25, 0.68, 0.47, 0.68, 0.45, 0.85, 0.61, 0.58, 0.7,
              0.52, 0.5, 0.78,
            ],
            backgroundColor: ["rgba(254, 140, 69, 1)"],
            borderColor: ["rgba(254, 140, 69, 1)"],
            borderWidth: 2,
            tension: 0,
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
        responsive: true,
        scales: {
          x: {
            grid: {
              color: "rgba(249, 249, 249, 0.1)",
            },
            ticks: {
              display: false,
            },
          },
          y: {
            grid: {
              color: "rgba(249, 249, 249, 0.1)",
            },
            ticks: {
              callback: function (value) {
                return "$ " + value;
              },
              stepSize: 0.2,
              font: {
                size: 14,
                family: '"Red Hat Display", sans-serif',
              },
              color: "#7791ba",
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Optional: cleanup on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
