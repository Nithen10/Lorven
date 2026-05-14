"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Clock,
  Coins,
  Crown,
  GraduationCap,
  Heart,
  HeartPulse,
  MapPin,
  Repeat,
  Sparkles,
  Users,
  Users2,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/ui/footer-section";
import BackgroundNoise from "@/components/ui/background-noise";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { departments, experiences, jobs, locations } from "./jobs";

const ROLES = [
  "Front-end engineers",
  "Back-end engineers",
  "ML engineers",
  "Prompt engineers",
  "Deployment engineers",
  "AI researchers",
] as const;

type Perk = { icon: LucideIcon; title: string };

const PERKS: Perk[] = [
  { icon: Coins, title: "Competitive Salary & Equity" },
  { icon: HeartPulse, title: "Comprehensive Health Coverage" },
  { icon: GraduationCap, title: "Learning & Growth Budget" },
  { icon: Clock, title: "Flexible Work Hours" },
  { icon: Sparkles, title: "Annual Studio Retreat" },
];

type Value = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const VALUES: Value[] = [
  {
    id: "customer-centricity",
    title: "Customer Centricity",
    icon: Users,
    body:
      "Every tool we build starts with the people on set, in writers' rooms, and in edit bays. Their workflows shape our roadmap; their feedback shapes our craft.",
  },
  {
    id: "deliver-excellence",
    title: "Deliver Excellence",
    icon: Award,
    body:
      "Studio-quality is the floor, not the ceiling. We obsess over the details that turn a draft into something a director can actually shoot.",
  },
  {
    id: "iterate",
    title: "Iterate, Iterate, Iterate",
    icon: Repeat,
    body:
      "Great films and great models are never finished; they are released. We ship early, learn fast, and refine in the open with the teams that use what we make.",
  },
  {
    id: "act-like-an-owner",
    title: "Act Like an Owner",
    icon: Crown,
    body:
      "We treat every project as if our name is in the credits. Decisions stick, deadlines hold, and quality is everyone's responsibility.",
  },
  {
    id: "be-empathetic",
    title: "Be Empathetic",
    icon: Heart,
    body:
      "We build for creators who are pouring themselves into a story. That deserves tools that respect their time, taste, and intent, not ones that flatten them.",
  },
];

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [location, setLocation] = useState("All locations");
  const [experience, setExperience] = useState("All experience");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedValue, setExpandedValue] = useState<string | null>(VALUES[0].id);
  const [roleIndex, setRoleIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.classList.add("careers-route");
    return () => document.body.classList.remove("careers-route");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.getPropertyValue("--strip-offset");
    root.style.setProperty("--strip-offset", "0px");
    return () => {
      if (previous) root.style.setProperty("--strip-offset", previous);
      else root.style.removeProperty("--strip-offset");
    };
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduce]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      if (q && !j.title.toLowerCase().includes(q)) return false;
      if (department !== "All departments" && j.department !== department) return false;
      if (location !== "All locations" && j.location !== location) return false;
      if (experience !== "All experience" && j.experience !== experience) return false;
      return true;
    });
  }, [search, department, location, experience]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof jobs>();
    filtered.forEach((job) => {
      const list = map.get(job.department) ?? [];
      list.push(job);
      map.set(job.department, list);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const motionFadeUp = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16, filter: "blur(4px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <>
      <BackgroundNoise />
      <GridVignetteBackground size={24} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Link href="/" className="careers-home-link" aria-label="Lorven AI Studio home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-new.png" alt="Lorven" />
      </Link>

      <Link href="/login" className="careers-login-link" aria-label="Log in">
        <span className="careers-login-link__track">
          <span>LOG-IN</span>
          <span>LOG-IN</span>
        </span>
      </Link>

      <section className="careers-callout" aria-label="Careers introduction">
        <span className="careers-callout__accent" aria-hidden="true" />
        <div className="careers-callout__inner">
          <motion.h1 className="careers-callout__title" {...motionFadeUp}>
            Join Our Team And
            <br />
            Build The Future{" "}
            <span className="careers-callout__brand">Together</span>
          </motion.h1>
          <motion.p
            className="careers-callout__tagline"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 14, filter: "blur(4px)" },
                  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
                  viewport: { once: true, amount: 0.25 },
                  transition: {
                    duration: 0.5,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
          >
            Lorven AI Studio builds AI-native tools for film and TV teams,
            scripts, storyboards, pitch decks, and the operational glue between
            them. Join us in shaping how the next generation of stories gets
            made.
          </motion.p>
          <motion.p
            className="careers-callout__role-line"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
                  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
                  viewport: { once: true, amount: 0.25 },
                  transition: {
                    duration: 0.5,
                    delay: 0.16,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={roleIndex}
                className="careers-callout__role"
                initial={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 0, y: 10, filter: "blur(6px)" }
                }
                animate={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                exit={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 0, y: -10, filter: "blur(6px)" }
                }
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="careers-callout__role-suffix">
              {" "}wanted. The future, yours to build.
            </span>
          </motion.p>
        </div>
      </section>

      <main className="careers-page">
        <aside className="careers-aside">
          <motion.article className="careers-perks" {...motionFadeUp}>
            <p className="careers-perks__eyebrow">Our Perks</p>
            <span
              className="careers-perks__sprockets careers-perks__sprockets--left"
              aria-hidden="true"
            />
            <span
              className="careers-perks__sprockets careers-perks__sprockets--right"
              aria-hidden="true"
            />
            <div className="careers-perks__reel">
              <ul className="careers-perks__list">
                {PERKS.map(({ icon: Icon, title }) => (
                  <li key={title} className="careers-perks__item">
                    <span className="careers-perks__icon-square" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <span className="careers-perks__title">{title}</span>
                  </li>
                ))}
              </ul>
              <ul className="careers-perks__list" aria-hidden="true">
                {PERKS.map(({ icon: Icon, title }) => (
                  <li key={`dup-${title}`} className="careers-perks__item">
                    <span className="careers-perks__icon-square" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <span className="careers-perks__title">{title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          <motion.article
            className="careers-company"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
                  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
                  viewport: { once: true, amount: 0.25 },
                  transition: {
                    duration: 0.5,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
          >
            <p className="careers-company__eyebrow">Company</p>
            <ul className="careers-company__list">
              <li className="careers-company__row">
                <span className="careers-company__icon" aria-hidden="true">
                  <Users2 size={18} strokeWidth={1.6} />
                </span>
                <div>
                  <p className="careers-company__label">Team</p>
                  <p className="careers-company__value">32 people</p>
                </div>
              </li>
              <li className="careers-company__row">
                <span className="careers-company__icon" aria-hidden="true">
                  <MapPin size={18} strokeWidth={1.6} />
                </span>
                <div>
                  <p className="careers-company__label">Studio</p>
                  <p className="careers-company__value">
                    Road No. 5, Jubilee Hills, Hyderabad
                  </p>
                </div>
              </li>
            </ul>
          </motion.article>
        </aside>

        <section className="careers-positions">
          <header className="careers-positions__header">
            <h2>
              {filtered.length} Open Position{filtered.length === 1 ? "" : "s"}
            </h2>
            <p>Find a role where your passion meets purpose.</p>
          </header>

          <div className="careers-toolbar">
            <label className="careers-search">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
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
                <span className="careers-select__chevron" aria-hidden="true">
                  ▾
                </span>
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
                <span className="careers-select__chevron" aria-hidden="true">
                  ▾
                </span>
              </div>

              <div className="careers-select">
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  aria-label="Filter by experience"
                >
                  <option>All experience</option>
                  {experiences.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
                <span className="careers-select__chevron" aria-hidden="true">
                  ▾
                </span>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="careers-empty">
              No roles match your filters right now. Please check back soon.
            </div>
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
                              <span aria-hidden="true">·</span>
                              <span>{job.experience}</span>
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
                              transition={{
                                duration: 0.35,
                                ease: [0.16, 1, 0.3, 1],
                              }}
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
                                  <span className="careers-apply-cta__label">
                                    Apply for this role
                                  </span>
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

        <section className="careers-values">
          <motion.div className="careers-values__heading" {...motionFadeUp}>
            <p className="careers-values__eyebrow">OUR VALUES</p>
            <h2>What Drives Us For Success</h2>
            <p className="careers-values__lead">
              The principles we hire for, decide by, and hold each other to as
              we build studio-grade AI for the people making the work.
            </p>
          </motion.div>

          <ul className="careers-values__list">
            {VALUES.map((v, index) => {
              const open = expandedValue === v.id;
              const Icon = v.icon;
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
                          ease: [0.16, 1, 0.3, 1] as const,
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
                    <span className="careers-values__icon-square" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
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
      </main>

      <Footer />
    </>
  );
}
