import React from 'react'

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="relative w-full max-w-5xl h-auto md:h-[calc(100vh-3rem)] max-h-[700px] my-auto">
      <BorderAnimatedContainer>
        <div className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          {/* FORM COLUMN - LEFT SIDE */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex items-center justify-center md:border-r border-slate-600/30">
            <div className="w-full max-w-md my-auto">
              {/* HEADING TEXT */}
              <div className="text-center mb-6 md:mb-8">
                <MessageCircleIcon className="w-10 h-10 md:w-12 md:h-12 mx-auto text-slate-400 mb-3" />
                <h2 className="text-xl md:text-2xl font-bold text-slate-200 mb-1 md:mb-2">Welcome Back</h2>
                <p className="text-sm text-slate-400">Login to access your account</p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* EMAIL INPUT */}
                <div>
                  <label className="auth-input-label">Email</label>
                  <div className="relative">
                    <MailIcon className="auth-input-icon" />

                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <LoaderIcon className="w-full h-5 animate-spin text-center" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-4 md:mt-6 text-center">
                <Link to="/signup" className="auth-link">
                  Don't have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* FORM ILLUSTRATION - RIGHT SIDE */}
          <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
            <div className="max-w-sm text-center">
              <img
                src="/login.png"
                alt="People using mobile devices"
                className="w-full max-h-64 object-contain mx-auto"
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg md:text-xl font-medium text-cyan-400">Connect anytime, anywhere</h3>

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
}
export default LoginPage;