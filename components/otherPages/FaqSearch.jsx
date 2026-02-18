"use client";
import React from "react";

export default function FaqSearch() {
  return (
    <section className="section-search tf-spacing-1">
      <div className="tf-container">
        <div className="col-12">
          <div className="row">
            <div className="form-help bg-multi-color">
              <div className="wrap-form">
                <div className="heading-section">
                  <div className="title">Hi we're here to help you</div>
                  <p>Please check this FAQ first before contacting us.</p>
                </div>
                <form
                  action="#"
                  className="form-search"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <fieldset>
                    <input
                      type="text"
                      placeholder="Enter your question or keyword"
                      required
                    />
                  </fieldset>
                  <button className="button-submit" type="submit">
                    <i className="icon-search" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
