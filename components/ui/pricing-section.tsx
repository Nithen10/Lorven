"use client";

import React, { useState, useRef, useEffect } from "react";
import { TiltCard } from "./tilt-card";
import { LiquidMetalButton } from "./liquid-metal-button";

const plans = [
  {
    name: "Basic",
    monthly: 750,
    description: "For businesses looking to start with AI and automations.",
    features: ["1 developer", "Basic chatbots & LLMs", "5 monthly workflow automations"],
  },
  {
    name: "Professional",
    monthly: 1500,
    description: "For businesses looking to outperform their competition with AI.",
    features: ["2 developers", "Custom chatbots & LLMs", "15 monthly workflow automations"],
  },
  {
    name: "Enterprise",
    monthly: 3000,
    description: "For businesses looking to fully leverage AI and automation.",
    features: ["3 developers", "Custom chatbots & LLMs", "Unlimited workflow automations"],
  },
];

function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US");
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const annualRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorPos, setIndicatorPos] = useState({ monthlyLeft: 8, monthlyWidth: 80, annualLeft: 96, annualWidth: 130, top: 8, height: 36 });

  useEffect(() => {
    const measure = () => {
      if (monthlyRef.current && annualRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const mRect = monthlyRef.current.getBoundingClientRect();
        const aRect = annualRef.current.getBoundingClientRect();
        setIndicatorPos({
          monthlyLeft: mRect.left - containerRect.left,
          monthlyWidth: mRect.width,
          annualLeft: aRect.left - containerRect.left,
          annualWidth: aRect.width,
          top: mRect.top - containerRect.top,
          height: mRect.height,
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="section pricing" id="pricing">
      <div className="center-title">
        <h2>Subscriptions</h2>
        <p>Three different subscriptions to match your companies&apos; needs.</p>
        <div
          ref={containerRef}
          className="relative inline-flex items-center gap-2 rounded-full px-2 py-2 overflow-hidden"
          style={{
            boxShadow: "0 2px 16px rgba(0, 0, 0, 0.15)",
            margin: "24px auto 0",
          }}
        >
          {/* Glass layers */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backdropFilter: "blur(16px) saturate(1.8)",
              WebkitBackdropFilter: "blur(16px) saturate(1.8)",
              borderRadius: "inherit",
            }}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{ background: "rgba(0, 0, 0, 0.06)", borderRadius: "inherit" }}
          />
          <div
            className="absolute inset-0 z-[2]"
            style={{
              boxShadow:
                "inset 0 1.5px 1px 0 rgba(0, 0, 0, 0.6), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.15), inset 1px 0 1px 0 rgba(0, 0, 0, 0.2), inset -1px 0 1px 0 rgba(0, 0, 0, 0.2)",
              borderRadius: "inherit",
            }}
          />
          <div
            className="absolute inset-0 z-[3]"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              borderRadius: "inherit",
              pointerEvents: "none",
            }}
          />
          {/* Sliding glass indicator */}
          <div
            className="absolute z-[5] rounded-full overflow-hidden"
            style={{
              left: isAnnual ? `${indicatorPos.annualLeft}px` : `${indicatorPos.monthlyLeft}px`,
              width: isAnnual ? `${indicatorPos.annualWidth}px` : `${indicatorPos.monthlyWidth}px`,
              top: `${indicatorPos.top}px`,
              height: `${indicatorPos.height}px`,
              transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: "none",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0, 0, 0, 0.12)", borderRadius: "inherit" }}
            />
            <div
              className="absolute inset-0"
              style={{
                boxShadow:
                  "inset 0 1px 1px 0 rgba(0, 0, 0, 0.5), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.1), inset 1px 0 1px 0 rgba(0, 0, 0, 0.15), inset -1px 0 1px 0 rgba(0, 0, 0, 0.15)",
                borderRadius: "inherit",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.25)",
                borderRadius: "inherit",
              }}
            />
          </div>
          {/* Buttons */}
          <button
            ref={monthlyRef}
            onClick={() => setIsAnnual(false)}
            className="relative z-10 rounded-full px-6 py-2.5 text-sm font-medium cursor-pointer"
            style={{
              background: "transparent",
              color: !isAnnual ? "#0a0a0a" : "#666666",
              border: "none",
              transition: "color 0.3s ease",
            }}
          >
            Monthly
          </button>
          <button
            ref={annualRef}
            onClick={() => setIsAnnual(true)}
            className="relative z-10 rounded-full px-6 py-2.5 text-sm font-medium cursor-pointer"
            style={{
              background: "transparent",
              color: isAnnual ? "#0a0a0a" : "#666666",
              border: "none",
              transition: "color 0.3s ease",
            }}
          >
            Annually (-20%)
          </button>
        </div>
      </div>
      <div className="pricing-grid">
        {plans.map((plan, i) => {
          const price = isAnnual
            ? Math.round(plan.monthly * 0.8)
            : plan.monthly;
          return (
            <TiltCard className="pricing-card" index={i} key={plan.name}>
              <h3>{plan.name}</h3>
              <strong>
                ${formatPrice(price)} <span>/{isAnnual ? "year" : "month"}</span>
              </strong>
              <p>{plan.description}</p>
              <LiquidMetalButton label="Choose this plan" />
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
