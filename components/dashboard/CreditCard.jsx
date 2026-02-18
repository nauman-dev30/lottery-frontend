"use client";

import Image from "next/image";
import { useState } from "react";
const items = [25, 50, 100, 200, 500];

export default function CreditCard() {
  const [activeValue, setActiveValue] = useState(25); // Default active: 25

  return (
    <div className="credit-card">
      <div className="title">
        <h4 className="credit-card-title">Credit card</h4>
        <div className="brand">
          <div className="icon">
            <Image
              src="/images/icon/veri.svg"
              alt=""
              className="lazyload"
              width={81}
              height={46}
            />
          </div>
          <span className="line" />
          <div className="icon">
            <Image
              src="/images/icon/mastercart-id.svg"
              alt=""
              className="lazyload"
              width={92}
              height={44}
            />
          </div>
        </div>
      </div>
      <div className="deposit-sum">
        <div className="deposit-sum-title">
          <span className="text"> Deposit sum </span>
          <span className="text-1">Instant | Min: 20 • Max: 4,000</span>
        </div>
        <div className="widget-tabs1">
          <ul className="widget-menu-tab1 overflow-x-auto mb-15">
            {items.map((item) => (
              <li
                key={item}
                className={`item-title1 ${activeValue == item ? "active" : ""}`}
                onClick={() => setActiveValue(item)}
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="widget-content-tab1">
            <div className="widget-content-inner active" style={{}}>
              <fieldset className="content-input">
                <input
                  type="number"
                  className="currency-input"
                  value={activeValue}
                  onChange={(e) => setActiveValue(e.target.value)}
                />
                <span className="currency">EUR</span>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div className="card-input card-number">
        <fieldset>
          <label className="text-2"> Card number </label>
          <fieldset className="content-input">
            <input
              type="number"
              className="currency-input"
              placeholder={"0123456789012345"}
            />
          </fieldset>
        </fieldset>
      </div>
      <div className="card-input name">
        <fieldset>
          <label className="text-2"> Name on card </label>
          <div className="content-input">
            <input
              type="text"
              className="currency-input"
              placeholder="eg.JOHN DOE"
            />
          </div>
        </fieldset>
      </div>
      <div className="card-input expiry-date">
        <fieldset>
          <label className="text-2"> Expiry date </label>
          <div className="content-input">
            <input type="date" className="currency-input" />
          </div>
        </fieldset>
      </div>
      <div className="card-input CVV pb-34">
        <fieldset>
          <label className="text-2"> CVV </label>
          <div className="content-input">
            <input type="text" className="currency-input" placeholder="CVV" />
          </div>
        </fieldset>
      </div>
      <div className="card-input available-bonuses">
        <fieldset>
          <div className="card-input-title">
            <label className="text-2">Available Bonuses</label>
            <div className="check mt--6">
              <div className="text-2">Use bonuses</div>
              <input
                className="switch-item"
                type="checkbox"
                name="check"
                defaultChecked
              />
            </div>
          </div>
          <div className="content-input">
            <input
              type="text"
              className="currency-input"
              placeholder="Promocode (optional)"
            />
          </div>
        </fieldset>
      </div>
      <div className="info">
        <div className="info-title">
          <i className="icon-casino fs-15" />
          <span className="ml-4 fs-15 mr-4">CASINO</span>
          <i className="icon-infor" />
          <div className="title-text">First Deposit HR Bonus 50%</div>
        </div>
        <div className="info-text">
          <span className="text-main-color pb-1">
            Min deposit sum 1,000 EUR
          </span>
          <span className="text pb-3">Wager 50x</span>
          <span className="text">Max bonus 500 EUR</span>
        </div>
      </div>
      <a href="#" className="tf-btn full-w">
        Deposit 50 EUR
      </a>
      <div className="note">
        <div className="icon">
          <Image
            src="/images/icon/credit-card-note-icon.png"
            alt=""
            className="lazyload"
            width={72}
            height={72}
          />
        </div>
        <div className="text">
          Please, keep in mind that 3-D Secure code can be requested several
          times in order to process the deposit transaction.
        </div>
      </div>
    </div>
  );
}
