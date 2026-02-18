import React from "react";
import Image from "next/image";
export default function Account() {
  return (
    <div className="my-account-main">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-4">
            <div className="user-wrap">
              <div className="infor">
                <div className="image">
                  <Image
                    alt=""
                    src="/images/section/member-3.jpg"
                    width={381}
                    height={396}
                  />
                </div>
                <div className="right">
                  <p className="title fw-759 fs-18 mb-6">User8237233</p>
                  <a
                    href="#"
                    className="change-infor type-main-color fw-467 fs-15"
                  >
                    <i className="icon-write fs-20" />
                    Change
                  </a>
                </div>
              </div>
              <ul className="detail-infor-list">
                <li className="total">
                  <p className="text">Total all-time wins</p>
                  <p className="number fw-645">$0.00</p>
                </li>
                <li className="win">
                  <p className="text">Wins due</p>
                  <p className="number fw-645">$0.00</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="balance-wrap">
              <div className="heading">
                <p className="title fs-18 fw-759 mb-6">Balance</p>
                <h2 className="money-total fs-40 fw-759">$47.80</h2>
              </div>
              <ul className="money-detail-list">
                <li className="item">
                  <p className="text">Real money</p>
                  <p className="number fw-645">$0.00</p>
                </li>
                <li className="item">
                  <p className="text">Bonus money</p>
                  <p className="number fw-645">$0.00</p>
                </li>
                <li className="item">
                  <p className="text">Pending Withdrawals</p>
                  <p className="number fw-645">$0.00</p>
                </li>
              </ul>
              <div className="money-btn">
                <a href="#" className="tf-btn full-w">
                  <i className="icon-deposit" />
                  Deposit
                </a>
                <a href="#" className="tf-btn full-w style-3">
                  <i className="icon-withdrawal" />
                  Withdrawal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
