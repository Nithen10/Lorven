import ClientEffects from "./ClientEffects";
import { HoverRevealButton } from "@/components/ui/button-5";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Navbar } from "@/components/ui/mini-navbar";
import { PricingSection } from "@/components/ui/pricing-section";
import { TiltCard } from "@/components/ui/tilt-card";

export default function Page() {
  return (
    <>
      <ClientEffects />

      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <Navbar />

      <main id="home">
        <section className="hero section reveal">
          <div className="particle-field" aria-hidden="true"></div>
          <h1>Lorven AI studio.</h1>
          <p>We develop custom AI solutions for innovative companies.</p>
          <div className="hero-actions">
            <a href="#services"><LiquidMetalButton label="our services" /></a>
            <a href="#contact"><HoverRevealButton label="contact us" /></a>
          </div>
        </section>

        <section className="intro section reveal">
          <p className="mega-watermark">Lorven</p>
          <h2>We&apos;re Lorven. We develop custom AI <em>solutions for innovative companies.</em></h2>
          <a href="#contact"><HoverRevealButton label="Get in touch" /></a>
        </section>

        <section className="section services" id="services">
          <h2 className="section-title">What we do</h2>
          <div className="service-grid">
            <TiltCard className="service-card span-6" index={0}>
              <div className="chat-preview">
                <div className="message-row">
                  <svg className="chat-star" viewBox="0 0 100 100" width="28" height="28">
                    <path d="M50 5 C52 38,62 48,95 50 C62 52,52 62,50 95 C48 62,38 52,5 50 C38 48,48 38,50 5Z" fill="#70befa"/>
                    <circle cx="80" cy="20" r="2.5" fill="#70befa" opacity=".5"/>
                    <circle cx="15" cy="75" r="2" fill="#70befa" opacity=".6"/>
                  </svg>
                  <div><strong>You</strong> <span>10:30 AM</span><p>Write a dramatic opening scene set in a rainy Mumbai street at night.</p></div>
                </div>
                <div className="message-row">
                  <svg className="chat-star" viewBox="0 0 100 100" width="28" height="28">
                    <path d="M50 5 C52 38,62 48,95 50 C62 52,52 62,50 95 C48 62,38 52,5 50 C38 48,48 38,50 5Z" fill="#70befa"/>
                    <circle cx="80" cy="20" r="2.5" fill="#70befa" opacity=".5"/>
                    <circle cx="15" cy="75" r="2" fill="#70befa" opacity=".6"/>
                  </svg>
                  <div><strong>Cine Scribe</strong> <span>10:30 AM</span><p>Scene 1 — EXT. MUMBAI STREET — NIGHT. Rain hammers the neon-lit pavement as a figure emerges from the shadows...</p></div>
                </div>
                <div className="input-bar"><span>Describe your next scene...</span><button aria-label="Send">^</button></div>
              </div>
              <h3>AI Script Writing</h3>
              <p>Transform your ideas into structured, compelling scripts using our intelligent AI tools with engaging dialogue and cinematic depth.</p>
            </TiltCard>
            <TiltCard className="service-card span-6" index={1}>
              <div className="image-generator">
                <div className="stars"></div>
                <button>generating <span>image...</span></button>
                <div className="input-bar"><span>Generate an image of...</span><button>Generate</button></div>
              </div>
              <h3>Story Visualization</h3>
              <p>Visualize scenes instantly — our AI-powered tools convert concepts into storyboards, sketches, and creative frames before production begins.</p>
            </TiltCard>
            <TiltCard className="service-card span-4" index={2}>
              <div className="automation-orbit">
                <span>*</span><span>◇</span><span>#</span><span>◆</span><div><strong>100+</strong><small>Automations</small></div>
              </div>
              <h3>Production Workflows</h3>
              <p>Streamline creative workflows from initial concept through execution, enabling smooth team collaboration across production stages.</p>
            </TiltCard>
            <TiltCard className="service-card span-4" index={3}>
              <div className="llm-stack">
                <div></div><div></div><div></div><div></div>
                <p>Where do quokka&apos;s live?<span>Quokka&apos;s live on Rottnest Island.</span></p>
                <div className="input-bar"><span>Write your prompt...</span><button aria-label="Send">^</button></div>
              </div>
              <h3>AI Story Engine</h3>
              <p>Turn raw ideas into unforgettable stories with our intelligent story engine that accelerates story development and content creation at scale.</p>
            </TiltCard>
            <TiltCard className="service-card span-4" index={4}>
              <div className="pitch-deck">
                <div className="slide slide-back"></div>
                <div className="slide slide-mid"></div>
                <div className="slide slide-front">
                  <div className="slide-header"><span className="slide-dot"></span><span className="slide-dot"></span><span className="slide-dot"></span></div>
                  <p className="slide-title">Film Pitch</p>
                  <div className="slide-bars"><span></span><span></span><span></span></div>
                  <p className="slide-label">Slide 1 of 12</p>
                </div>
              </div>
              <h3>Film Pitch &amp; Decks</h3>
              <p>Create compelling film pitches and presentations that communicate vision, emotion, and market potential to stakeholders in minutes.</p>
            </TiltCard>
          </div>
        </section>

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

        <section className="section products" id="products">
          <h2 className="section-title">Our products</h2>
          <div className="product-grid">
            <TiltCard className="product-card" index={0}><h3>Cine Sketch</h3><strong>AI-Powered Story Sketches</strong><p>Visualize scenes instantly — converts concepts into storyboards and creative frames before filming begins.</p></TiltCard>
            <TiltCard className="product-card" index={1}><h3>Cine Scribe</h3><strong>Intelligent Script Writing</strong><p>Turn ideas into structured scripts using intelligent AI tools with engaging dialogue and cinematic depth.</p></TiltCard>
            <TiltCard className="product-card" index={2}><h3>Pitch Craft</h3><strong>Film Pitches &amp; Decks</strong><p>Create compelling film pitches and presentations that convey vision, emotion, and market appeal in minutes.</p></TiltCard>
            <TiltCard className="product-card" index={3}><h3>Cine Flow</h3><strong>End-to-End Production</strong><p>Streamline creative workflows from initial concept through execution, enabling team collaboration and momentum.</p></TiltCard>
          </div>
        </section>

        <section className="section team" id="team">
          <h2 className="section-title">Meet our team</h2>
          <div className="team-track">
            <TiltCard className="team-card" index={0}><img src="https://framerusercontent.com/images/FuLkfY03g6UTvyUgiykCksQ60.png?width=600&height=600" alt="Team member" /><p>AI Developer</p><h3>Dave Jones</h3></TiltCard>
            <TiltCard className="team-card" index={1}><img src="https://framerusercontent.com/images/ZSaQbJuFS42W7zu7FI7QlZsxu58.png?width=600&height=600" alt="Team member" /><p>CEO</p><h3>Emily Branson</h3></TiltCard>
            <TiltCard className="team-card" index={2}><img src="https://framerusercontent.com/images/fmoq8UDKlfUrXummW5zaYwxCAZg.png?width=600&height=600" alt="Team member" /><p>Developer</p><h3>Jason Davis</h3></TiltCard>
            <TiltCard className="team-card" index={3}><img src="https://framerusercontent.com/images/FCIhg4w8Oic6PzzMBeFQQ09s200.png?width=600&height=600" alt="Team member" /><p>COO</p><h3>Maria Wilson</h3></TiltCard>
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
