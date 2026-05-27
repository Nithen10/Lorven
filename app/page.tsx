import { CylinderCarousel } from "@/components/ui/cylinder-carousel";
import ClientEffects from "./ClientEffects";
import SectionSnap from "./SectionSnap";
import { HoverRevealButton } from "@/components/ui/button-5";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Navbar } from "@/components/ui/mini-navbar";
import { TiltCard } from "@/components/ui/tilt-card";
import { ServicesScroll } from "@/components/ui/services-scroll";
import { ProcessSection } from "@/components/ui/process-section";
import { ProductsScrollSection } from "@/components/products/ProductsScrollSection";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import BackgroundNoise from "@/components/ui/background-noise";
import { Footer } from "@/components/ui/footer-section";
import ShutterText from "@/components/ui/shutter-text";

export default function Page() {
  return (
    <>
      <ClientEffects />
      <SectionSnap />

      <BackgroundNoise />
      <GridVignetteBackground size={24} />
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      <Navbar />

      <main id="home">
        <section className="hero section reveal">
          <div className="particle-field" aria-hidden="true"></div>
          <div className="hero-content">
            <h1>
              <span className="hero-line"><ShutterText text="LIGHTS." variant="lights" /></span>
              <span className="hero-line"><ShutterText text="CAMERA." variant="camera" /></span>
              <span className="hero-line"><ShutterText text="INTELLIGENCE." variant="intelligence" /></span>
            </h1>
            <div className="hero-meta">
              <p>Custom AI tools for film and TV teams. Scripts, storyboards, pitch decks, and the glue between them.</p>
              <div className="hero-actions">
                <a href="#services"><LiquidMetalButton label="our services" /></a>
                <a href="#contact"><HoverRevealButton label="contact us" size="md" /></a>
              </div>
            </div>
          </div>
          <div className="hero-carousel-frame" aria-hidden="true">
            <div className="hero-carousel">
              <CylinderCarousel />
            </div>
          </div>
        </section>

        <section className="intro section reveal">
          <p className="mega-watermark">Lorven</p>
          <h2>We&apos;re Lorven. We build AI tools for the film teams <em>that actually have to ship.</em></h2>
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
            <TiltCard className="faq-card" index={0}><details><summary>What does Lorven AI Studio provide?</summary><p>Lorven AI Studio builds AI tools for film and television teams across writing, visualization, pitch development, and production workflow management. We offer both ready-to-use products and tailored solutions designed to fit a studio&apos;s existing creative and operational pipeline.</p></details></TiltCard>
            <TiltCard className="faq-card" index={1}><details><summary>Which AI products and solutions do you offer?</summary><p>Our current product suite includes Cine Scribe for script development, Cine Sketch for storyboards and visual references, Pitch Craft for pitch decks, and Cine Flow for connected production workflows. We also develop custom tools when a team requires capabilities beyond our existing product set.</p></details></TiltCard>
            <TiltCard className="faq-card" index={2}><details><summary>Do I need technical experience to use your tools?</summary><p>No technical background is required. Our tools are designed for creative teams and can be used through simple, natural inputs such as scene descriptions, story notes, and project references, without the need for engineering expertise.</p></details></TiltCard>
            <TiltCard className="faq-card" index={3}><details><summary>How can I get started with Lorven AI Studio?</summary><p>You can get started by reaching out through our contact form. Once we hear from you, we schedule an initial conversation to understand your goals, review your workflow, and recommend the products or custom solutions that best fit your team.</p></details></TiltCard>
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

      <Footer />
    </>
  );
}
