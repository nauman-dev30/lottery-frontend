import React from "react";
import LineChart from "./Chart";

export default function Earnings() {
  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-12">
          <div
            className="heading-dashboard mb-30 wow fadeInUp"
            data-wow-delay="0s"
          >
            Affiliate Earnings
          </div>
        </div>
        <div className="col-12">
          <div className="chart-box">
            <div className="title">
              <div className="number">$0.00</div>
              <div className="tf-control-sorting">
                <div className="tf-dropdown-sort">
                  <div className="tf-btn style-2" data-bs-toggle="dropdown">
                    <span className="text-sort-value">Last 30 Days</span>
                    <i className="icon-arrow-down" />
                  </div>
                  <div className="dropdown-menu">
                    <div className="select-item">
                      <span className="text-value-item"> Today </span>
                    </div>
                    <div className="select-item">
                      <span className="text-value-item"> Last 7 Days </span>
                    </div>
                    <div className="select-item active">
                      <span className="text-value-item">Last 30 Days</span>
                    </div>
                    <div className="select-item">
                      <span className="text-value-item"> All Time </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <canvas id="lineChart" /> */}
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
}
