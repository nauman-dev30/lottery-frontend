"use client";

import { useState } from "react";
import Image from "next/image";
import CreditCard from "./CreditCard";
export default function Wallet() {
  const titles = ["Balance", "Deposit", "Withdrawal", "Transactions history"];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="">
      <div className="widget-tabs page-dashboard-wallet">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <ul className="widget-menu-tab mb-40 overflow-x-auto">
                {titles.map((title, index) => (
                  <li
                    key={index}
                    className={`item-title ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="widget-content-tab">
            <div
              className={`widget-content-inner ${
                activeIndex == 0 ? "active" : ""
              }  `}
            >
              <div className="row">
                <div className="col-xl-4">
                  <div className="currency-box mt--10">
                    <input
                      type="radio"
                      id="usd"
                      name="currency"
                      defaultChecked
                    />
                    <div className="currency-box-content">
                      <label htmlFor="usd" className="box w100">
                        <span className="btn-radio" />
                        <div className="wallet-balance">
                          <div className="wallet-balance-title">
                            <div className="text">Default</div>
                          </div>
                          <div className="content-input">
                            <input
                              type="number"
                              id="usd1"
                              className="currency-input"
                              defaultValue={0}
                            />
                            <span className="currency">USD</span>
                          </div>
                          <div className="content">
                            <div className="content-inner pl-12">
                              <span className="fw-7">0</span>
                              <span>Withdrawable</span>
                            </div>
                            <span className="line" />
                            <div className="content-inner">
                              <span className="fw-7">0</span>
                              <span>Locked by bonus</span>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="tf-btn border-node-backgroud full-w"
                          >
                            Deposit
                          </a>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="currency-box w100 ml--4 mt--10">
                    <input type="radio" id="eur" name="currency" />
                    <div className="currency-box-content">
                      <label htmlFor="eur" className="box w100">
                        <span className="btn-radio" />
                        <div className="wallet-balance">
                          <div className="wallet-balance-title">
                            <div className="text">Make default</div>
                          </div>
                          <div className="content-input">
                            <input
                              type="number"
                              placeholder=""
                              id="eur1"
                              className="currency-input"
                              defaultValue={0}
                            />
                            <span className="currency">EUR</span>
                          </div>
                          <div className="content">
                            <div className="content-inner pl-12">
                              <span className="fw-7">0</span>
                              <span>Withdrawable</span>
                            </div>
                            <span className="line" />
                            <div className="content-inner">
                              <span className="fw-7">0</span>
                              <span>Locked by bonus</span>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="tf-btn border-node-backgroud full-w"
                          >
                            Deposit
                          </a>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="wallet-balance-add ml--4 mt--10">
                    <div className="icon">
                      <Image
                        src="/images/icon/icon-add-new.png"
                        alt=""
                        className="lazyload"
                        width={80}
                        height={86}
                      />
                    </div>
                    <div className="text">ADD NEW</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`widget-content-inner ${
                activeIndex == 1 ? "active" : ""
              }  `}
            >
              <form
                className="wallet-deposit pt-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="row">
                  <div className="col-xl-5">
                    <div className="balance">
                      <div className="title">
                        <span className="text">Balance</span>
                        <div className="tf-control-sorting">
                          <div className="tf-dropdown-sort style-2">
                            <div
                              className="node-border-node-backgroud"
                              data-bs-toggle="dropdown"
                            >
                              <span className="text-sort-value">0 EUR</span>
                              <i className="icon-arrow-down" />
                            </div>
                            <div className="dropdown-menu">
                              <div className="select-item active">
                                <span className="text-value-item">0 EUR</span>
                              </div>
                              <div className="select-item">
                                <span className="text-value-item">25 EUR</span>
                              </div>
                              <div className="select-item">
                                <span className="text-value-item">50 EUR</span>
                              </div>
                              <div className="select-item">
                                <span className="text-value-item">100 EUR</span>
                              </div>
                              <div className="select-item">
                                <span className="text-value-item">200 EUR</span>
                              </div>
                              <div className="select-item">
                                <span className="text-value-item">500 EUR</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="balance-list">
                        <div className="list">
                          <div className="icon">
                            <Image
                              src="/images/icon/visa.svg"
                              alt=""
                              className="lazyload"
                              width={68}
                              height={21}
                            />
                          </div>
                          <div className="icon">
                            <Image
                              src="/images/icon/maestro.svg"
                              alt=""
                              className="lazyload"
                              width={54}
                              height={32}
                            />
                          </div>
                          <div className="icon">
                            <Image
                              src="/images/icon/mastercard.svg"
                              alt=""
                              className="lazyload"
                              width={86}
                              height={16}
                            />
                          </div>
                        </div>
                        <div className="list">
                          <div className="icon">
                            <Image
                              src="/images/icon/ecopays.svg"
                              alt=""
                              className="lazyload"
                              width={84}
                              height={19}
                            />
                          </div>
                          <div className="icon">
                            <Image
                              src="/images/icon/rapid.svg"
                              alt=""
                              className="lazyload"
                              width={73}
                              height={22}
                            />
                          </div>
                          <div className="icon">
                            <Image
                              src="/images/icon/mifinity.svg"
                              alt=""
                              className="lazyload"
                              width={85}
                              height={34}
                            />
                          </div>
                        </div>
                        <div className="list">
                          <div className="icon">
                            <Image
                              src="/images/icon/Skrill.svg"
                              alt=""
                              className="lazyload"
                              width={72}
                              height={24}
                            />
                          </div>
                          <div className="icon">
                            <Image
                              src="/images/icon/neteuer.svg"
                              alt=""
                              className="lazyload"
                              width={79}
                              height={14}
                            />
                          </div>
                          <div className="icon">
                            <Image
                              src="/images/icon/eps.svg"
                              alt=""
                              className="lazyload"
                              width={56}
                              height={56}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-7">
                    <CreditCard />
                  </div>
                </div>
              </form>
            </div>
            <div
              className={`widget-content-inner ${
                activeIndex == 2 ? "active" : ""
              }  `}
            >
              <div className="wallet-withdrawal">
                <div className="row">
                  <div className="col-12">
                    <div className="top">
                      <div className="wallet-withdrawal-content w-100">
                        <div className="bg bg-7" />
                        <div className="icon">
                          <Image
                            src="/images/icon/total.png"
                            alt=""
                            className="lazyload"
                            width={140}
                            height={140}
                          />
                        </div>
                        <div className="text">
                          <p>Total</p>
                          <p className="price">$56.64</p>
                        </div>
                      </div>
                      <div className="wallet-withdrawal-content w-100">
                        <div className="bg bg-8" />
                        <div className="icon">
                          <Image
                            src="/images/icon/available.png"
                            alt=""
                            className="lazyload"
                            width={141}
                            height={140}
                          />
                        </div>
                        <div className="text">
                          <p>Available for withdrawal</p>
                          <p className="price">$47.64</p>
                        </div>
                      </div>
                      <div className="wallet-withdrawal-content w-100">
                        <div className="bg bg-9" />
                        <div className="icon">
                          <Image
                            src="/images/icon/bonuses.png"
                            alt=""
                            className="lazyload"
                            width={141}
                            height={140}
                          />
                        </div>
                        <div className="text">
                          <p>Bonuses</p>
                          <p className="price">$9.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-8">
                    <form
                      className="wallet-withdrawal-form"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="tf-dropdown-sort">
                        <div className="bank" data-bs-toggle="dropdown">
                          <div className="img">
                            <Image
                              className="lazyload"
                              src="/images/icon/visa.svg"
                              width={68}
                              height={21}
                              alt=""
                            />
                          </div>
                          <div className="text">
                            <p className="name">Vietcombank up to : $47.64</p>
                            <p className="fs-14">51790431_vcb</p>
                          </div>
                          <i className="icon-arrow-down" />
                        </div>
                        <div className="dropdown-menu">
                          <div className="select-item style-2 active">
                            <div className="bank">
                              <div className="img">
                                <Image
                                  alt=""
                                  className="lazyload"
                                  src="/images/icon/visa.svg"
                                  width={68}
                                  height={21}
                                />
                              </div>
                              <div className="text">
                                <p className="name">
                                  Vietcombank up to : $47.64
                                </p>
                                <p>51790431_vcb</p>
                              </div>
                            </div>
                          </div>
                          <div className="select-item style-2">
                            <div className="bank">
                              <div className="img">
                                <Image
                                  alt=""
                                  className="lazyload"
                                  src="/images/icon/visa.svg"
                                  width={68}
                                  height={21}
                                />
                              </div>
                              <div className="text">
                                <p className="name">
                                  Vietcombank up to : $47.64
                                </p>
                                <p>51790431_vcb</p>
                              </div>
                            </div>
                          </div>
                          <div className="select-item style-2">
                            <div className="bank">
                              <div className="img">
                                <Image
                                  alt=""
                                  className="lazyload"
                                  src="/images/icon/visa.svg"
                                  width={68}
                                  height={21}
                                />
                              </div>
                              <div className="text">
                                <p className="name">
                                  Vietcombank up to : $47.64
                                </p>
                                <p>51790431_vcb</p>
                              </div>
                            </div>
                          </div>
                          <div className="select-item style-2">
                            <div className="bank">
                              <div className="img">
                                <Image
                                  alt=""
                                  className="lazyload"
                                  src="/images/icon/visa.svg"
                                  width={68}
                                  height={21}
                                />
                              </div>
                              <div className="text">
                                <p className="name">
                                  Vietcombank up to : $47.64
                                </p>
                                <p>51790431_vcb</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="amount">
                        <div className="content-input p-0-16">
                          <input
                            type="number"
                            className="currency-input"
                            placeholder="Amount"
                          />
                        </div>
                        <span className="amount-text">
                          <i className="icon-clock" /> We will process your
                          request as quickly as possible.
                        </span>
                      </div>
                      <div className="name pb-0">
                        <div className="name-title">Full name</div>
                        <div className="content-input p-14-16">
                          <input
                            type="text"
                            className="currency-input"
                            defaultValue="Name"
                          />
                        </div>
                      </div>
                      <div className="account-number">
                        <div className="account-number-title">
                          Bank account number
                        </div>
                        <fieldset>
                          <textarea
                            className="content-input p-21-19"
                            name="account-number"
                            placeholder="Number"
                            id="account-number"
                            defaultValue={""}
                          />
                        </fieldset>
                      </div>
                      <a href="#" className="tf-btn full-w">
                        Send a request
                      </a>
                    </form>
                  </div>
                  <div className="col-xl-4">
                    <div className="wallet-withdrawal-note">
                      <i className="icon-infor-1" />
                      <div className="text">
                        <p className="fs-14">
                          Minimum withdrawal amount $15.00
                        </p>
                        <p className="fs-14">
                          The money will be debited from the account when the
                          request is processed.
                        </p>
                        <p className="fs-14">
                          Withdrawals are processed by the same payment systems,
                          used to deposit money into the system
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`widget-content-inner ${
                activeIndex == 3 ? "active" : ""
              }  `}
            >
              <div className="row">
                <div className="col-12">
                  <div className="table-lottery-results mb-40">
                    <div className="title">
                      <div>Lottery</div>
                      <div>Winners</div>
                      <div>Time</div>
                      <div>Winning numbers</div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-table">
                      <div>
                        <a href="#">Australia - Monday Lotto</a>
                      </div>
                      <div>
                        <a href="#">Eleanor Pena</a>
                      </div>
                      <div>01 Jan 17:30</div>
                      <div>
                        <ul className="number-list">
                          <li>12</li>
                          <li>88</li>
                          <li>26</li>
                          <li>95</li>
                          <li>47</li>
                          <li className="active">17</li>
                          <li className="active">34</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
