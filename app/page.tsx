import { SplineRobot } from "@/components/ui/spline-robot";
import ClientEffects from "./ClientEffects";
import { HoverRevealButton } from "@/components/ui/button-5";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Navbar } from "@/components/ui/mini-navbar";
import { TiltCard } from "@/components/ui/tilt-card";
import { ServicesScroll } from "@/components/ui/services-scroll";
import { ProcessSection } from "@/components/ui/process-section";
import { ProductsScrollSection } from "@/components/products/ProductsScrollSection";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import BackgroundNoise from "@/components/ui/background-noise";

export default function Page() {
  return (
    <>
      <ClientEffects />

      <BackgroundNoise />
      <GridVignetteBackground size={24} />
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      <a
        href="#contact"
        className="fixed top-0 left-0 right-0 z-40 h-8 bg-[#70befa] flex items-center justify-center gap-2 text-white text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#5fb5f8] transition-colors"
      >
        <span>WELCOME TO LORVEN AI STUDIO</span>
        <span aria-hidden="true">→</span>
      </a>

      <Navbar />

      <main id="home">
        <section className="hero section reveal">
          <div className="particle-field" aria-hidden="true"></div>
          <div className="hero-3d" aria-hidden="true">
            <SplineRobot />
          </div>
          <div className="hero-content">
            <h1>Lorven AI studio.</h1>
            <p className="hero-catchphrase"><em>Where intelligence meets imagination.</em></p>
            <p>We develop custom AI solutions for innovative companies.</p>
            <div className="hero-actions">
              <a href="#services"><LiquidMetalButton label="our services" /></a>
              <a href="#contact"><HoverRevealButton label="contact us" size="md" /></a>
            </div>
          </div>
        </section>

        <section className="intro section reveal">
          <p className="mega-watermark">Lorven</p>
          <h2>We&apos;re Lorven. We develop custom AI <em>solutions for innovative companies.</em></h2>
          <a href="#contact"><HoverRevealButton label="Get in touch" size="md" /></a>
        </section>

        <ServicesScroll />

        <ProcessSection />

        <ProductsScrollSection />

        <section className="section team" id="team">
          <h2 className="section-title">Meet our team</h2>
          <div className="team-track">
            <TiltCard className="team-card" index={0}><img src="https://framerusercontent.com/images/FuLkfY03g6UTvyUgiykCksQ60.png?width=600&height=600" alt="Team member" /><p>AI Developer</p><h3>Dave Jones</h3></TiltCard>
            <TiltCard className="team-card" index={1}><img src="https://framerusercontent.com/images/ZSaQbJuFS42W7zu7FI7QlZsxu58.png?width=600&height=600" alt="Team member" /><p>CEO</p><h3>Emily Branson</h3></TiltCard>
            <TiltCard className="team-card" index={2}><img src="https://framerusercontent.com/images/fmoq8UDKlfUrXummW5zaYwxCAZg.png?width=600&height=600" alt="Team member" /><p>Developer</p><h3>Jason Davis</h3></TiltCard>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="center-title"><h2>Answers</h2><p>We&apos;ve gone ahead and answered some of the questions you might have.</p></div>
          <div className="faq-grid">
            <TiltCard className="faq-card" index={0}><details><summary>What does Lorven AI Studio do?</summary><p>We build custom AI-powered tools for filmmakers, content teams, and studios — accelerating every step from scriptwriting and storyboarding to pitch decks and production workflows.</p></details></TiltCard>
            <TiltCard className="faq-card" index={1}><details><summary>Which AI products do you offer?</summary><p>Cine Scribe for AI scriptwriting, Cine Sketch for instant storyboards, Pitch Craft for compelling pitch decks, and Cine Flow for end-to-end production workflows. Custom tools are built on request.</p></details></TiltCard>
            <TiltCard className="faq-card" index={2}><details><summary>Do I need technical experience to use the tools?</summary><p>No. Everything is designed for creative teams — write a prompt, sketch an idea, get results. We handle the AI plumbing.</p></details></TiltCard>
            <TiltCard className="faq-card" index={3}><details><summary>How do I get started with Lorven?</summary><p>Book a discovery call through our contact form. We&apos;ll learn your pipeline, recommend the right product mix, and have a tailored AI workflow up and running in days.</p></details></TiltCard>
          </div>
        </section>

        <section className="section contact reveal" id="contact">
          <div className="contact-copy">
            <h2>Let&apos;s talk!</h2>
            <p>Office:</p><strong>Lorven AI Studio<br/>House No: 8-2-293/K/132, 133,<br/>Kamalapuri Colony, Srinagar Colony,<br/>Hyderabad, Telangana</strong>
            <hr /><p>Email:</p><a href="mailto:info@lorvenaistudio.com">info@lorvenaistudio.com</a><hr /><p>Phone:</p><a href="tel:+919000000000">+91 90000 00000</a>
          </div>
          <form className="contact-form">
            <label>Name<input placeholder="John Doe" /></label>
            <label>Email<input placeholder="john@example.com" /></label>
            <label>Phone<input placeholder="+91 90000 00000" /></label>
            <label>Message<textarea placeholder="Hi team Lorven! I'm reaching out for..."></textarea></label>
            <LiquidMetalButton label="Submit" />
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <a className="brand" href="#home"><img className="brand-logo" src="/logo-new.png" alt="Lorven" /></a>
          <div><h3>Socials</h3><a>Instagram</a><a>Twitter</a><a>LinkedIn</a><a>Facebook</a></div>
          <div><h3>Links</h3><a href="#services">Services</a><a href="#process">Process</a><a href="#team">Team</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
        </div>
        <p className="copyright">&copy; 2026, Lorven Inc - All rights reserved.</p>
      </footer>
    </>
  );
}
