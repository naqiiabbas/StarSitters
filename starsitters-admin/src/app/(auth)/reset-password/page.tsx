"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const canSubmit =
    newPassword.length >= 8 &&
    newPassword === confirmPassword &&
    confirmPassword !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 antialiased overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/login-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(30, 41, 59, 0.3), rgba(30, 41, 59, 0.3)), linear-gradient(180deg, rgba(15, 23, 42, 0.35) 0%, rgba(15, 23, 42, 0.7) 100%)",
          }}
        />
      </div>

      {/* Centered column */}
      <div className="w-full max-w-[480px] flex flex-col items-center">
        {/* Logo */}
        <div className="relative w-[88px] h-[88px] mb-6 rounded-full overflow-hidden">
          <Image
            src="/star-sitters-logo.png"
            alt="Star Sitters"
            fill
            sizes="88px"
            className="object-cover"
            priority
          />
        </div>

        {!isSuccess && (
          <div className="text-center mb-8">
            <h1 className="text-[28px] leading-[36px] font-bold text-white">
              Set New Password
            </h1>
            <p className="mt-2 text-[15px] leading-[24px] text-[#94a3b8]">
              Choose a strong password to secure your account
            </p>
          </div>
        )}

        {/* Card */}
        <div className="w-full bg-[#1e293b]/60 backdrop-blur-md border border-[#334155]/60 rounded-2xl px-8 py-10 sm:px-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
          {!isSuccess ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-[20px] leading-[28px] font-semibold text-white">
                  Create New Password
                </h2>
                <p className="mt-2 text-[14px] leading-[22px] text-[#94a3b8]">
                  Your new password must be different from previously used
                  passwords
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="new-password"
                    className="block text-[14px] leading-[20px] font-medium text-white"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 text-[#94a3b8] hover:text-white transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-[18px] h-[18px]" />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" />
                      )}
                    </button>
                    <input
                      id="new-password"
                      required
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full h-[48px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-11 pr-4 text-[15px] text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirm-password"
                    className="block text-[14px] leading-[20px] font-medium text-white"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 text-[#94a3b8] hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-[18px] h-[18px]" />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" />
                      )}
                    </button>
                    <input
                      id="confirm-password"
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full h-[48px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-11 pr-4 text-[15px] text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !canSubmit}
                  className="w-full h-[48px] bg-[#b8e0f0] hover:bg-[#c8e8f5] active:scale-[0.99] text-[#0a0f24] text-[16px] font-semibold rounded-[10px] transition-all flex items-center justify-center disabled:bg-[#b8e0f0]/50 disabled:text-[#0a0f24]/70 disabled:cursor-not-allowed disabled:hover:bg-[#b8e0f0]/50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              {/* Green checkmark badge */}
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-[#34d399]/15 flex items-center justify-center">
                  <CheckCircle2
                    className="w-9 h-9 text-[#34d399]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <h2 className="text-[20px] leading-[28px] font-semibold text-white">
                Password Reset!
              </h2>
              <p className="mt-3 text-[14px] leading-[22px] text-[#94a3b8]">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>

              <Link
                href="/"
                className="w-full mt-8 h-[48px] bg-[#b8e0f0] hover:bg-[#c8e8f5] text-[#0a0f24] text-[15px] font-semibold rounded-[10px] flex items-center justify-center transition-all"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Footer link — only on form state */}
        {!isSuccess && (
          <div className="mt-6 text-center text-[14px] leading-[22px]">
            <p className="text-[#94a3b8]">Remember your password?</p>
            <Link
              href="/"
              className="text-[#b8e0f0] hover:text-[#c8e8f5] font-medium transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
