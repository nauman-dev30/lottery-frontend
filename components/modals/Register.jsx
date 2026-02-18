"use client";
import React from "react";
import RegisterForm from "../register-form/RegisterForm";

export default function RegisterModal() {
  return (
    <div
      className="modal fade modalCenter"
      id="modalregister"
      tabIndex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content modal-sm">
          {/* The entire form logic is now inside this component */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
