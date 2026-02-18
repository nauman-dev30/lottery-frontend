"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "react-toastify";
import { postRequestWithOutToken } from "@/backendServices/ApiCalls";
import { useAuth } from "@/contexts/AuthContext";
import { useDispatch } from "react-redux";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const modalRef = useRef(null);
  const { login } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap");
      const modalElement = document.getElementById("modallogin");

      if (modalElement) {
        const myModal = new bootstrap.Modal(modalElement, { keyboard: false });
        setTimeout(() => {
          myModal.show();
        }, 1500);
      }
    };

    showModal();
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      try {
        const response = await postRequestWithOutToken("auth/login", payload);

        if (response?.data?.success) {
          const token = response.data.data.token;
          const user = response.data.data.user;

          login(token, user);

          toast.dismiss();
          toast.success("Login successful!", { position: "top-right" });

          resetForm();

          setTimeout(() => {
            const loginModal = document.getElementById("modallogin");
            const bootstrap = require("bootstrap");
            const loginModalInstance = bootstrap.Modal.getInstance(loginModal);
            if (loginModalInstance) loginModalInstance.hide();
          }, 1000);
        } else {
          toast.error(response?.data?.message || "Invalid credentials.", {
            position: "top-right",
            toastId: "login-error",
          });
        }
      } catch (error) {
        console.error("❌ Login error:", error);
        const errorData = error?.response?.data;

        if (errorData?.errors && Array.isArray(errorData.errors)) {
          errorData.errors.forEach((err, index) => {
            toast.error(err.msg || "Validation error occurred.", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              pauseOnHover: true,
              closeOnClick: true,
              draggable: true,
              toastId: `login-error-${index}`,
            });
          });
        }
        else if (errorData?.message) {
          toast.error(errorData.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            toastId: "login-error",
          });
        }
        else {
          toast.error(error.message || "An error occurred during login.", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            toastId: "login-error-fallback",
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>

      <div
        ref={modalRef}
        className="modal fade modalCenter auto-popup"
        id="modallogin"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content modal-sm">
            <div className="login-wrap">
              <div className="image">
                <Image
                  className="lazyload"
                  src="/images/section/login.png"
                  alt="Login"
                  width={1480}
                  height={1665}
                />
              </div>

              <div className="content">
                <div className="close-form">
                  <a href="#" className="btn-hide-popup" data-bs-dismiss="modal">
                    <i className="icon-close" />
                  </a>
                </div>

                <h4 className="title">Welcome to Tronado Lottery</h4>

                <form
                  onSubmit={formik.handleSubmit}
                  id="form-login"
                  className="form-login"
                >
                  <div className="cols mb-20">
                    <fieldset>
                      <label htmlFor="email">Email address*</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="error text-danger small mt-1">
                          {formik.errors.email}
                        </div>
                      )}
                    </fieldset>
                  </div>

                  <div className="cols mb-20 relative">
                    <fieldset>
                      <label htmlFor="password">Password *</label>
                      <input
                        className="password"
                        id="password"
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                      />
                      <span
                        onClick={() => setShowPass((pre) => !pre)}
                        className={`toggle-password ${showPass ? "unshow" : ""}`}
                      >
                        <i className="icon-view" />
                      </span>
                      {formik.touched.password && formik.errors.password && (
                        <div className="error text-danger small mt-1">
                          {formik.errors.password}
                        </div>
                      )}
                    </fieldset>
                  </div>

                  <div className="checkbox-item flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="btn-checkbox" />
                      <span>Keep me signed in</span>
                    </label>
                    <a href="#" className="type-main-color">
                      Forgot my password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="btn-login tf-btn full-w"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Logging in..." : "Log in"}
                  </button>
                </form>

                <p className="bottom-form">
                  Not registered yet?{" "}
                  <a
                    href="#modalregister"
                    data-bs-toggle="modal"
                    className="type-main-color"
                  >
                    Create a FREE Account
                  </a>{" "}
                  and start playing!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
