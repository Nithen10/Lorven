"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { Noise } from "@/components/ui/background-noise";

const AppleIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="login-provider-icon">
    <path
      fill="currentColor"
      d="M15.152 3.367c0 1.103-.404 2.115-1.079 2.886-.736.825-1.938 1.462-3.077 1.373-.15-1.048.387-2.139 1.065-2.901.744-.84 2.023-1.454 3.091-1.358ZM19.46 17.563c-.444 1.016-.655 1.469-1.228 2.365-.801 1.252-1.93 2.816-3.329 2.828-1.245.012-1.566-.821-3.257-.812-1.69.008-2.044.827-3.289.815-1.4-.013-2.47-1.424-3.27-2.676-2.237-3.5-2.474-7.608-1.093-9.73.982-1.51 2.533-2.396 3.99-2.396 1.486 0 2.423.819 3.652.819 1.191 0 1.916-.82 3.64-.82 1.298 0 2.672.708 3.651 1.929-3.216 1.763-2.695 6.336.533 7.678Z"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="login-provider-icon">
    <path
      fill="currentColor"
      d="M21.805 10.023H12.24v3.955h5.487c-.236 1.274-.956 2.354-2.035 3.076v2.557h3.294c1.928-1.774 3.039-4.389 3.039-7.484 0-.711-.064-1.395-.22-2.104Z"
    />
    <path
      fill="currentColor"
      d="M12.24 22c2.744 0 5.045-.902 6.747-2.389l-3.294-2.557c-.916.611-2.087.984-3.453.984-2.651 0-4.898-1.789-5.7-4.193H3.14v2.637A10.183 10.183 0 0 0 12.24 22Z"
    />
    <path
      fill="currentColor"
      d="M6.54 13.845a6.117 6.117 0 0 1 0-3.891V7.317H3.14a10.185 10.185 0 0 0 0 9.165l3.4-2.637Z"
    />
    <path
      fill="currentColor"
      d="M12.24 5.762c1.491 0 2.829.513 3.881 1.522l2.913-2.913C17.279 2.738 14.978 2 12.24 2 8.27 2 4.829 4.273 3.14 7.317l3.4 2.637c.798-2.41 3.049-4.192 5.7-4.192Z"
    />
  </svg>
);

const MailIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="login-mail-icon">
    <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="3.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5.5 8.25 12 13l6.5-4.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="login-mail-icon">
    <circle cx="12" cy="8" r="3.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.75 20c0-3.6 3.4-5.75 7.25-5.75S19.25 16.4 19.25 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LockIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="login-mail-icon">
    <rect x="4.75" y="10.75" width="14.5" height="9.5" rx="2.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 10.75V8a4 4 0 1 1 8 0v2.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="login-eye-icon">
    <path d="M2.75 12s3-7.25 9.25-7.25S21.25 12 21.25 12s-3 7.25-9.25 7.25S2.75 12 2.75 12Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const EyeOffIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="login-eye-icon">
    <path d="M3.5 3.5l17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M9.5 5.2c.8-.2 1.65-.3 2.5-.3 6.25 0 9.25 7.1 9.25 7.1a16.7 16.7 0 0 1-3.1 4.1M6.4 6.9C3.6 8.7 2.75 12 2.75 12s3 7.25 9.25 7.25c1.65 0 3.1-.5 4.35-1.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

type Mode = "signin" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="login-screen">
      <div className="login-screen__vignette" aria-hidden="true" />
      <div className="login-screen__beam" aria-hidden="true" />
      <div className="login-screen__core-glow" aria-hidden="true" />
      <div className="login-screen__side-glow login-screen__side-glow--left" aria-hidden="true" />
      <div className="login-screen__side-glow login-screen__side-glow--right" aria-hidden="true" />

      <GridVignetteBackground
        className="absolute z-0 opacity-100"
        size={28}
        x={50}
        y={15}
        intensity={30}
        horizontalVignetteSize={80}
        verticalVignetteSize={55}
      />
      <Noise patternRefreshInterval={2} patternAlpha={16} />

      <section className="login-panel" aria-labelledby="login-heading">
        <h1 id="login-heading">
          Sign up below to unlock the
          <br />
          full potential of Lorven AI.
        </h1>
        <p>
          By continuing, you agree to our <a href="#">privacy policy</a>.
        </p>

        <div className="login-provider-stack">
          <button type="button" className="login-provider-button">
            <AppleIcon />
            <span>Continue with Apple</span>
          </button>
          <button type="button" className="login-provider-button">
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="login-divider" aria-hidden="true">
          <span>or</span>
        </div>

        <form className="login-credentials" onSubmit={(e) => e.preventDefault()}>
          {mode === "signup" && (
            <label className="login-email-field">
              <UserIcon />
              <input
                type="text"
                placeholder="enter your username"
                aria-label="Username"
                autoComplete="username"
              />
            </label>
          )}

          <label className="login-email-field">
            <MailIcon />
            <input
              type="email"
              placeholder={mode === "signin" ? "enter your mail or username" : "enter your mail"}
              aria-label="Email"
              autoComplete="email"
            />
          </label>

          <label className="login-email-field">
            <LockIcon />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter your password"
              aria-label="Password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
            <button
              type="button"
              className="login-eye-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </label>

          <button
            type="submit"
            className="login-email-button login-continue-button group"
          >
            <span className="login-continue-button__label">Continue</span>
            <span className="login-continue-button__hover">
              <span>Continue</span>
              <ArrowRight size={16} />
            </span>
          </button>

          <p className="login-credentials-toggle">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setMode("signup")}>
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => setMode("signin")}>
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>

        <Link href="/" className="login-close-link">
          Close
        </Link>
      </section>
    </main>
  );
}
