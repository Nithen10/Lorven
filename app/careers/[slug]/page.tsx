"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Paperclip, X } from "lucide-react";
import BackgroundNoise from "@/components/ui/background-noise";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import { getJobBySlug } from "../jobs";

type Tab = "overview" | "application";

export default function JobApplyPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const job = slug ? getJobBySlug(slug) : undefined;

  const [tab, setTab] = useState<Tab>("overview");
  const [resumeName, setResumeName] = useState<string>("");
  const resumeInputRef = useRef<HTMLInputElement | null>(null);

  const clearResume = () => {
    if (resumeInputRef.current) resumeInputRef.current.value = "";
    setResumeName("");
  };

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.getPropertyValue("--strip-offset");
    root.style.setProperty("--strip-offset", "0px");
    return () => {
      if (previous) root.style.setProperty("--strip-offset", previous);
      else root.style.removeProperty("--strip-offset");
    };
  }, []);

  if (!job) {
    return (
      <main className="careers-apply-page careers-apply-page--missing">
        <BackgroundNoise />
        <GridVignetteBackground size={24} />
        <div className="careers-apply-missing">
          <h1>Role not found</h1>
          <p>This position is no longer open or the link is incorrect.</p>
          <Link href="/careers" className="careers-apply-cta" aria-label="Back to careers">
            <span className="careers-apply-cta__layer careers-apply-cta__blur" />
            <span className="careers-apply-cta__layer careers-apply-cta__tint" />
            <span className="careers-apply-cta__layer careers-apply-cta__rim" />
            <span className="careers-apply-cta__layer careers-apply-cta__border" />
            <span className="careers-apply-cta__label">Back to careers</span>
            <span className="careers-apply-cta__hover">
              <span>Back to careers</span>
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <BackgroundNoise />
      <GridVignetteBackground size={24} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <main className="careers-apply-page">
        <header className="careers-apply-topbar">
          <Link href="/careers" className="careers-apply-back" aria-label="Back to careers">
            <ArrowLeft size={20} />
          </Link>
          <Link href="/" className="careers-apply-logo" aria-label="Lorven AI Studio home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-new.png" alt="Lorven" />
          </Link>
          <span aria-hidden="true" />
        </header>

        <div className="careers-apply-shell">
          <aside className="careers-apply-meta">
            <h1>{job.title}</h1>
            <dl>
              <div>
                <dt>Location</dt>
                <dd>{job.location}</dd>
              </div>
              <div>
                <dt>Employment Type</dt>
                <dd>{job.type}</dd>
              </div>
              <div>
                <dt>Location Type</dt>
                <dd>{job.workMode}</dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>{job.department}</dd>
              </div>
            </dl>
          </aside>

          <section className="careers-apply-content">
            <div className="careers-apply-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "overview"}
                className="careers-apply-tab"
                data-active={tab === "overview"}
                onClick={() => setTab("overview")}
              >
                Overview
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "application"}
                className="careers-apply-tab"
                data-active={tab === "application"}
                onClick={() => setTab("application")}
              >
                Application
              </button>
            </div>

            {tab === "overview" ? (
              <div className="careers-job-details careers-job-details--standalone">
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
              </div>
            ) : (
              <form
                className="careers-apply-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <h2>Application details</h2>

                <label className="careers-apply-field">
                  <span>
                    Name<em>*</em>
                  </span>
                  <input type="text" placeholder="Type here..." required />
                </label>

                <label className="careers-apply-field">
                  <span>
                    Email<em>*</em>
                  </span>
                  <input type="email" placeholder="hello@example.com..." required />
                </label>

                <label className="careers-apply-field">
                  <span>
                    Phone number<em>*</em>
                  </span>
                  <input type="tel" placeholder="+91 90000 00000" required />
                </label>

                <div className="careers-apply-field">
                  <span>
                    Resume<em>*</em>
                  </span>
                  <label className="careers-apply-dropzone" data-has-file={!!resumeName}>
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? "")}
                      required
                    />
                    <span className="careers-apply-dropzone__btn">
                      <Paperclip size={16} />
                      Upload File
                    </span>
                    <span className="careers-apply-dropzone__hint">
                      {resumeName || "or drag and drop here"}
                    </span>
                    {resumeName && (
                      <button
                        type="button"
                        className="careers-apply-dropzone__clear"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          clearResume();
                        }}
                        aria-label="Remove uploaded file"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </label>
                </div>

                <label className="careers-apply-field">
                  <span>LinkedIn URL</span>
                  <input type="url" placeholder="https://linkedin.com/in/..." />
                </label>

                <label className="careers-apply-field">
                  <span>Why do you want to work at Lorven AI Studio?</span>
                  <textarea rows={5} placeholder="Type here..." />
                </label>

                <div className="careers-apply-submit">
                  <button
                    type="submit"
                    className="careers-apply-submit-btn group"
                    aria-label="Submit Application"
                  >
                    <span className="careers-apply-submit-btn__layer careers-apply-submit-btn__blur" />
                    <span className="careers-apply-submit-btn__layer careers-apply-submit-btn__tint" />
                    <span className="careers-apply-submit-btn__layer careers-apply-submit-btn__rim" />
                    <span className="careers-apply-submit-btn__layer careers-apply-submit-btn__border" />
                    <span className="careers-apply-submit-btn__label">Submit Application</span>
                    <span className="careers-apply-submit-btn__hover">
                      <span>Submit Application</span>
                      <ArrowRight size={16} />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
