import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { Link } from "react-router";

import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData); // call the signup function from the useAuthStore and pass the formData to it. The signup function will handle the signup process and set the authUser state in the useAuthStore.
  };

  return (
    <div className="relative w-full max-w-5xl h-auto md:h-[calc(100vh-3rem)] max-h-[750px] my-auto">
      <BorderAnimatedContainer>
        <div className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          {/* FORM COLUMN - LEFT SIDE  */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex items-center justify-center md:border-r border-slate-600/30">
            <div className="w-full max-w-md my-auto">
              {/* HEADING TEXT */}
              <div className="text-center mb-6 md:mb-8">
                <MessageCircleIcon className="w-10 h-10 md:w-12 md:h-12 mx-auto text-slate-400 mb-3" />
                <h2 className="text-xl md:text-2xl font-bold text-slate-200 mb-1 md:mb-2">
                  Create Account
                </h2>
                <p className="text-sm text-slate-400">Sign up for a new account</p>
              </div>
              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                {/* FULL NAME INPUT FIELD */}
                <div>
                  <label className="auth-input-label">Full Name</label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* EMAIL INPUT */}
                <div>
                  <label className="auth-input-label">Email</label>
                  <div className="relative">
                    <MailIcon className="auth-input-icon" />

                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input"
                      placeholder="johndoe@gmail.com"
                    />
                  </div>
                </div>

                {/* PASSWORD INPUT */}
                <div>
                  <label className="auth-input-label">Password</label>
                  <div className="relative">
                    <LockIcon className="auth-input-icon" />

                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="input"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  className="auth-btn"
                  type="submit"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <LoaderIcon className="w-full h-5 animate-spin text-center" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-4 md:mt-6 text-center">
                <Link to="/login" className="auth-link">
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          {/* FORM ILLUSTRATION - RIGHT SIDE */}
          <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
            <div className="max-w-sm text-center">
              <img
                src="/signup.png"
                alt="People using mobile devices"
                className="w-full max-h-64 object-contain mx-auto"
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg md:text-xl font-medium text-cyan-400">
                  Start Your Journey Today
                </h3>

                <div className="mt-4 flex justify-center gap-2 sm:gap-4 flex-wrap">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy Setup</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default SignUpPage;
