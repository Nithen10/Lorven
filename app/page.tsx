import ClientEffects from "./ClientEffects";
import { HoverRevealButton } from "@/components/ui/button-5";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Navbar } from "@/components/ui/mini-navbar";
import { PricingSection } from "@/components/ui/pricing-section";
import { TiltCard } from "@/components/ui/tilt-card";
import { ServicesScroll } from "@/components/ui/services-scroll";
import { ProductsScrollSection } from "@/components/products/ProductsScrollSection";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";
import BackgroundNoise from "@/components/ui/background-noise";

export default function Page() {
  return (
    <>
      <ClientEffects />

      <BackgroundNoise />
      <GridVignetteBackground size={24} />

      <a
        href="#contact"
        className="fixed top-0 left-0 right-0 z-40 h-8 bg-black flex items-center justify-center gap-2 text-white text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#1a1a1a] transition-colors"
      >
        <span>WELCOME TO LORVEN AI STUDIO</span>
        <span aria-hidden="true">→</span>
      </a>

      <Navbar />

      <main id="home">
        <section className="hero section reveal">
          <div className="particle-field" aria-hidden="true"></div>
          <h1>Lorven AI studio.</h1>
          <p>We develop custom AI solutions for innovative companies.</p>
          <div className="hero-actions">
            <a href="#services"><LiquidMetalButton label="our services" /></a>
            <a href="#contact"><HoverRevealButton label="contact us" size="md" /></a>
          </div>
        </section>

        <section className="intro section reveal">
          <p className="mega-watermark">Lorven</p>
          <h2>We&apos;re Lorven. We develop custom AI <em>solutions for innovative companies.</em></h2>
          <a href="#contact"><HoverRevealButton label="Get in touch" size="md" /></a>
        </section>

        <ServicesScroll />

        <section className="section process" id="process">
          <h2 className="section-title">The process</h2>
          <div className="process-grid">
            <TiltCard className="process-card" index={0}>
              <div className="logo-matrix"><span>▾</span><span>◎</span><span>*</span><span>◆</span><span>*</span><span>~</span></div>
              <h3><span>01</span> Analyze</h3>
              <p>We begin by understanding your storytelling vision, analyzing your creative workflows and identifying where AI can accelerate your production pipeline.</p>
            </TiltCard>
            <TiltCard className="process-card" index={1}>
              <div className="code-window">
                <div className="tabs"><span></span><span></span><span></span><b>HTML</b><em>React</em><em>CSS</em></div>
                <pre>{`1  <html lang="en">
2  <head>
3    <meta charset="UTF-8">
4    <meta name="viewport"
5      content="width=device-width">
6  <title>Lorven</title>`}</pre>
              </div>
              <h3><span>02</span> Build &amp; Implement</h3>
              <p>Our team builds AI-powered tools tailored to your content creation needs — from scriptwriting and visualization to pitch deck generation.</p>
            </TiltCard>
            <TiltCard className="process-card" index={2}>
              <div className="update-panel">
                <button>Update available</button>
                <p>Security <span>+8%</span></p><p>Operational cost <span>-11%</span></p><p>Workflow efficiency <span>+25%</span></p><p>Software speed <span>+38%</span></p>
              </div>
              <h3><span>03</span> Maintain &amp; improve</h3>
              <p>After deployment, we continuously refine and enhance your AI storytelling tools to keep pace with evolving production demands.</p>
            </TiltCard>
          </div>
        </section>

        <ProductsScrollSection />

        <section className="section team" id="team">
          <h2 className="section-title">Meet our team</h2>
          <div className="team-track">
            <TiltCard className="team-card" index={0}><img src="https://framerusercontent.com/images/FuLkfY03g6UTvyUgiykCksQ60.png?width=600&height=600" alt="Team member" /><p>AI Developer</p><h3>Dave Jones</h3></TiltCard>
            <TiltCard className="team-card" index={1}><img src="https://framerusercontent.com/images/ZSaQbJuFS42W7zu7FI7QlZsxu58.png?width=600&height=600" alt="Team member" /><p>CEO</p><h3>Emily Branson</h3></TiltCard>
            <TiltCard className="team-card" index={2}><img src="https://framerusercontent.com/images/fmoq8UDKlfUrXummW5zaYwxCAZg.png?width=600&height=600" alt="Team member" /><p>Developer</p><h3>Jason Davis</h3></TiltCard>
          </div>
        </section>

        <PricingSection />

        <section className="section faq" id="faq">
          <div className="center-title"><h2>Answers</h2><p>We&apos;ve gone ahead and answered some of the questions you might have.</p></div>
          <div className="faq-grid">
            <TiltCard className="faq-card" index={0}><details><summary>What services do you offer?</summary><p>Custom AI assistants, automations, content systems, LLM workflows, and strategy.</p></details></TiltCard>
            <TiltCard className="faq-card" index={1}><details><summary>Are your solutions secure?</summary><p>Security and privacy are part of the design from day one.</p></details></TiltCard>
            <TiltCard className="faq-card" index={2}><details><summary>Do you offer continuous support?</summary><p>Yes, we monitor, maintain, and improve deployed systems.</p></details></TiltCard>
            <TiltCard className="faq-card" index={3}><details><summary>Can I cancel my subscription at any time?</summary><p>Yes, monthly plans can be cancelled before the next billing cycle.</p></details></TiltCard>
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
