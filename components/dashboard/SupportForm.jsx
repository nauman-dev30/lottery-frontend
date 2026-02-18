"use client";
import Image from "next/image";
import React from "react";

export default function SupportForm() {
  return (
    <div className="sidebar-support">
      <div className="heading">
        <div className="icon">
          <Image alt="" src="/images/item/item-3.png" width={48} height={48} />
        </div>
        Online support
      </div>
      <div className="wrap">
        <div className="content">
          <Image
            alt=""
            src="/images/sidebar/support.png"
            width={112}
            height={112}
          />
          Do you have questions about the Lottery? Please chat with our friendly
          staff.
        </div>
        <form
          action="#"
          onSubmit={(e) => e.preventDefault()}
          className="form-send-message"
        >
          <fieldset>
            <input type="text" placeholder="Message..." required />
          </fieldset>
          <button className="button-submit" type="submit">
            <i className="icon-send-message" />
          </button>
        </form>
      </div>
    </div>
  );
}
