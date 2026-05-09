"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import { Footer } from "@/components/ui/footer-section";
import BackgroundNoise from "@/components/ui/background-noise";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { departments, jobs, locations } from "./jobs";

const VALUES = [
  {
    id: "customer-centricity",
    title: "Customer Centricity",
    body:
      "Every tool we build starts with the people on set, in writers' rooms, and in edit bays. Their workflows shape our roadmap; their feedback shapes our craft.",
  },
  {
    id: "deliver-excellence",
    title: "Deliver Excellence",
    body:
      "Studio-quality is the floor, not the ceiling. We obsess over the details that turn a draft into something a director can actually shoot.",
  },
  {
    id: "iterate",
    title: "Iterate, Iterate, Iterate",
    body:
      "Great films and great models are never finished — they are released. We ship early, learn fast, and refine in the open with the teams that use what we make.",
  },
  {
    id: "act-like-an-owner",
    title: "Act Like an Owner",
    body:
      "We treat every project as if our name is in the credits. Decisions stick, deadlines hold, and quality is everyone's responsibility.",
  },
  {
    id: "be-empathetic",
    title: "Be Empathetic",
    body:
      "We build for creators who are pouring themselves into a story. That deserves tools that respect their time, taste, and intent — not ones that flatten them.",
  },
] as const;

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [location, setLocation] = useState("All locations");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedValue, setExpandedValue] = useState<string | null>(VALUES[0].id);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.getPropertyValue("--strip-offset");
    root.style.setProperty("--strip-offset", "0px");
    return () => {
      if (previous) root.style.setProperty("--strip-offset", previous);
      else root.style.removeProperty("--strip-offset");
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      if (q && !j.title.toLowerCase().includes(q)) return false;
      if (department !== "All departments" && j.department !== department) return false;
      if (location !== "All locations" && j.location !== location) return false;
      return true;
    });
  }, [search, department, location]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof jobs>();
    filtered.forEach((job) => {
      const list = map.get(job.department) ?? [];
      list.push(job);
      map.set(job.department, list);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <BackgroundNoise />
      <GridVignetteBackground size={24} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Navbar />

      <main className="careers-page">
        <section className="careers-hero">
          <div className="careers-hero__media" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img6.webp" alt="" />
            <div className="careers-hero__overlay" />
          </div>
          <div className="careers-hero__copy">
            <h1>Work at Lorven AI Studio</h1>
            <p>
              We are reinventing how stories get made. Lorven AI Studio builds
              AI-native tools across the filmmaking pipeline — from script to
              screen — empowering creators to bring imagination to life faster,
              freer, and at studio quality.
            </p>
          </div>
        </section>

        <section className="careers-values">
          <motion.div
            className="careers-values__heading"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
                  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
                  viewport: { once: true, amount: 0.25 },
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                })}
          >
            <h2>
              Our<br />Values
            </h2>
          </motion.div>

          <ul className="careers-values__list">
            {VALUES.map((v, index) => {
              const open = expandedValue === v.id;
              return (
                <motion.li
                  key={v.id}
                  className="careers-values__item"
                  data-expanded={open}
                  {...(reduce
                    ? {}
                    : {
                        initial: { opacity: 0, y: 16, filter: "blur(4px)" },
                        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
                        viewport: { once: true, amount: 0.25 },
                        transition: {
                          delay: 0.12 + index * 0.08,
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      })}
                >
                  <button
                    type="button"
                    className="careers-values__row"
                    aria-expanded={open}
                    aria-controls={`value-${v.id}`}
                    onClick={() => setExpandedValue(open ? null : v.id)}
                  >
                    <span className="careers-values__title">{v.title}</span>
                    <span
                      className="careers-values__icon"
                      data-expanded={open}
                      aria-hidden="true"
                    >
                      <span className="careers-values__icon-bar careers-values__icon-bar--h" />
                      <span className="careers-values__icon-bar careers-values__icon-bar--v" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        id={`value-${v.id}`}
                        className="careers-values__body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p>{v.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </section>

        <section className="careers-positions">
          <header className="careers-positions__header">
            <h2>{filtered.length} Open Position{filtered.length === 1 ? "" : "s"}</h2>
            <p>Find a role where your passion meets purpose.</p>
          </header>

          <div className="careers-toolbar">
            <label className="careers-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search roles"
              />
            </label>

            <div className="careers-filters">
              <div className="careers-select">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  aria-label="Filter by department"
                >
                  <option>All departments</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <span className="careers-select__chevron" aria-hidden="true">▾</span>
              </div>

              <div className="careers-select">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Filter by location"
                >
                  <option>All locations</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                <span className="careers-select__chevron" aria-hidden="true">▾</span>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="careers-empty">No roles match your filters right now. Please check back soon.</div>
          ) : (
            grouped.map(([dept, list]) => (
              <div key={dept} className="careers-group">
                <div className="careers-group__header">
                  <span className="careers-group__label">{dept.toUpperCase()}</span>
                  <span className="careers-group__count">{list.length}</span>
                </div>

                <ul className="careers-job-list">
                  {list.map((job) => {
                    const expanded = expandedId === job.id;
                    return (
                      <li
                        key={job.id}
                        className="careers-job-card"
                        data-expanded={expanded}
                      >
                        <button
                          type="button"
                          className="careers-job-card__row"
                          onClick={() => setExpandedId(expanded ? null : job.id)}
                          aria-expanded={expanded}
                          aria-controls={`job-${job.id}`}
                        >
                          <div className="careers-job-card__head">
                            <h3>{job.title}</h3>
                            <p>
                              <span>{job.location}</span>
                              <span aria-hidden="true">·</span>
                              <span>{job.type}</span>
                              <span aria-hidden="true">·</span>
                              <span>{job.workMode}</span>
                            </p>
                          </div>
                          <span
                            className="careers-job-card__chevron"
                            data-expanded={expanded}
                            aria-hidden="true"
                          >
                            ›
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              key="details"
                              id={`job-${job.id}`}
                              className="careers-job-card__details"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <div className="careers-job-details">
                                <section>
                                  <h4>About Lorven AI Studio</h4>
                                  <p>{job.about}</p>
                                </section>

                                <section>
                                  <h4>Key Responsibilities</h4>
                                  <ul>
                                    {job.responsibilities.map((item) => (
                                      <li key={item}>{item}</li>
                                    ))}
                                  </ul>
                                </section>

                                <section>
                                  <h4>Required Skills</h4>
                                  <ul>
                                    {job.skills.map((item) => (
                                      <li key={item}>{item}</li>
                                    ))}
                                  </ul>
                                </section>

                                <section>
                                  <h4>What We Offer</h4>
                                  <ul>
                                    {job.offers.map((item) => (
                                      <li key={item}>{item}</li>
                                    ))}
                                  </ul>
                                </section>

                                <Link
                                  href={`/careers/${job.id}`}
                                  className="careers-apply-cta group"
                                  aria-label="Apply for this role"
                                >
                                  <span className="careers-apply-cta__layer careers-apply-cta__blur" />
                                  <span className="careers-apply-cta__layer careers-apply-cta__tint" />
                                  <span className="careers-apply-cta__layer careers-apply-cta__rim" />
                                  <span className="careers-apply-cta__layer careers-apply-cta__border" />
                                  <span className="careers-apply-cta__label">Apply for this role</span>
                                  <span className="careers-apply-cta__hover">
                                    <span>Apply for this role</span>
                                    <ArrowRight size={16} />
                                  </span>
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
