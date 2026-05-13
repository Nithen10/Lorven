"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { Noise } from "@/components/ui/background-noise";
import {
  AppleIcon,
  GoogleIcon,
  MailIcon,
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "@/components/ui/auth-icons";

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
      <Noise patternRefreshInterval={3} patternAlpha={7} />

      <div className="login-shell">
        <aside className="login-image" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/login-hero.jpg" alt="" />
        </aside>

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
      </div>
    </main>
  );
}
