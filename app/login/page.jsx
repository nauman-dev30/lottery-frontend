"use client";
import RegisterForm from "@/components/register-form/RegisterForm";
import React, { Suspense } from "react";

const FormLoading = () => {
  return <div>Loading form...</div>;
};

export default function LoginPage() {
  return (
    // We add some classes here to center the form and give it the right styling context.
    // This replicates the styling from your screenshot.
    <main className="tf-container my-5">
      <div className="row justify-content-center  align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-md-8 col-lg-8">
          <div
            className="modal-content modal-sm"
            style={{ background: "transparent", border: "none" }}
          >
            <Suspense fallback={<FormLoading />}>
              {/* --- CHANGE: Pass the isPage prop --- */}
              <RegisterForm isPage={true} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
