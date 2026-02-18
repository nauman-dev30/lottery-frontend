"use client";
import React from "react";

export default function ContactForm() {
  return (
    <section className="s-send-message tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section">
              <h2 className="title">Send us a message</h2>
              <p className="sub-title">
                Our team of lottery experts is prepared to provide a quick and
                thorough <br />
                response to all your questions and concerns via email.
              </p>
            </div>
          </div>
          <div className="col-lg-12">
            <form
              action="#"
              onSubmit={(e) => e.preventDefault()}
              className="form-add-message wow fadeInUp"
              data-wow-delay="0s"
            >
              <div className="cols">
                <fieldset className="tf-field">
                  <label htmlFor="field1">Your name *</label>
                  <input
                    className="tf-input"
                    type="text"
                    id="field1"
                    placeholder="Your name"
                    required
                  />
                </fieldset>
              </div>
              <div className="cols">
                <fieldset>
                  <label htmlFor="field4">Email address</label>
                  <input type="email" id="field4" placeholder="Your email" />
                </fieldset>
                <fieldset>
                  <label htmlFor="field2">Phone number</label>
                  <input type="number" id="field2" placeholder="Your phone" />
                </fieldset>
              </div>
              <fieldset className="fieldText mb-30">
                <label htmlFor="field3">Your message</label>
                <textarea
                  id="field3"
                  placeholder="Your message"
                  defaultValue={""}
                />
              </fieldset>
              <div className="btn-send-comment flex justify-center">
                <button type="submit" className="btn-send tf-btn">
                  Send mesage <i className="icon-right" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
