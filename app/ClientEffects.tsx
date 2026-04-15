"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        }
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const sections = [...document.querySelectorAll("main section[id]")];
    const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { threshold: [0.18, 0.35, 0.55], rootMargin: "-18% 0px -56% 0px" }
    );

    sections.forEach((section) => activeObserver.observe(section));

    const field = document.querySelector(".particle-field") as HTMLElement | null;
    if (field && !field.dataset.ready) {
      field.dataset.ready = "true";
      for (let i = 0; i < 36; i += 1) {
        const dot = document.createElement("i");
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 6}s`;
        field.appendChild(dot);
      }
    }

    const reviewTrack = document.querySelector(".review-track") as HTMLElement | null;
    if (reviewTrack && !reviewTrack.dataset.ready) {
      reviewTrack.dataset.ready = "true";
      reviewTrack.innerHTML += reviewTrack.innerHTML;
    }

    const timeNode = document.getElementById("time");
    function tick() {
      if (!timeNode) return;
      timeNode.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Amsterdam",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
    }

    tick();
    const timer = window.setInterval(tick, 1000);

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
