import ClientEffects from "./ClientEffects";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Navbar } from "@/components/ui/mini-navbar";

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
            <a href="#contact"><LiquidMetalButton label="contact us" /></a>
            <a href="#contact"><LiquidMetalButton viewMode="icon" /></a>
          </div>
        </section>

        <section className="intro section reveal">
          <p className="mega-watermark">Lorven</p>
          <h2>We&apos;re Lorven. We develop custom AI <em>solutions for innovative companies.</em></h2>
          <a href="#contact"><LiquidMetalButton label="Get in touch" /></a>
        </section>

        <section className="section services reveal" id="services">
          <h2 className="section-title">What we do</h2>
          <div className="service-grid">
            <article className="service-card span-6">
              <div className="chat-preview">
                <div className="message-row">
                  <img src="https://framerusercontent.com/images/CSr01inYFSNcBiRsiHyP21guEk.png" alt="" className="avatar" />
                  <div><strong>You</strong> <span>8:15 AM</span><p>Schedule a Google meeting with John for 3:45PM tomorrow!</p></div>
                </div>
                <div className="message-row">
                  <div className="ai-badge">AI</div>
                  <div><strong>AI Assistant</strong> <span>8:15 AM</span><p>I&apos;ve successfully scheduled a Google meeting with John for 3:45PM tomorrow.</p></div>
                </div>
                <div className="input-bar"><span>Message AI Assistant...</span><button aria-label="Send">^</button></div>
              </div>
              <h3>Chatbot Development</h3>
              <p>We develop intelligent chatbots that leverage advanced NLP to elevate customer interactions and streamline your business processes.</p>
            </article>
            <article className="service-card span-6">
              <div className="image-generator">
                <div className="stars"></div>
                <button>generating <span>image...</span></button>
                <div className="input-bar"><span>Generate an image of...</span><button>Generate</button></div>
              </div>
              <h3>Content Creation</h3>
              <p>Our content creation solutions effortlessly generate high-quality, engaging content according to your brand&apos;s guidelines to captivate your audience.</p>
            </article>
            <article className="service-card span-4">
              <div className="automation-orbit">
                <span>*</span><span>◇</span><span>#</span><span>◆</span><div><strong>100+</strong><small>Automations</small></div>
              </div>
              <h3>Workflow Automations</h3>
              <p>We automate your workflows to streamline repetitive tasks, enhance efficiency, save time, and eliminate errors.</p>
            </article>
            <article className="service-card span-4">
              <div className="llm-stack">
                <div></div><div></div><div></div><div></div>
                <p>Where do quokka&apos;s live?<span>Quokka&apos;s live on Rottnest Island.</span></p>
                <div className="input-bar"><span>Write your prompt...</span><button aria-label="Send">^</button></div>
              </div>
              <h3>LLM Development</h3>
              <p>We develop Large Language Models that transform how your company interacts with data and customers.</p>
            </article>
            <article className="service-card span-4">
              <div className="chart-card">
                <svg viewBox="0 0 420 220" role="img" aria-label="Efficiency chart">
                  <path d="M0 180 L70 168 L135 92 L205 105 L278 42 L350 60 L420 34" fill="none" stroke="#70BEFA" strokeWidth="4"/>
                  <path d="M0 180 L70 168 L135 92 L205 105 L278 42 L350 60 L420 34 V220 H0 Z" fill="url(#chartGlow)"/>
                  <defs><linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#70BEFA" stopOpacity=".22"/><stop offset="1" stopColor="#70BEFA" stopOpacity="0"/></linearGradient></defs>
                </svg>
                <span className="tag up">Efficiency +103%</span><span className="tag down">Cost -67%</span>
              </div>
              <h3>AI Consulting</h3>
              <p>Our experts provide strategic guidance, enabling your business to implement AI solutions that drive transformative growth.</p>
            </article>
          </div>
        </section>

        <section className="section process reveal" id="process">
          <h2 className="section-title">The process</h2>
          <div className="process-grid">
            <article className="process-card">
              <div className="logo-matrix"><span>▾</span><span>◎</span><span>*</span><span>◆</span><span>*</span><span>~</span></div>
              <h3><span>01</span> Analyze</h3>
              <p>We start with a thorough analysis of your current workflows to see how AI could improve your processes.</p>
            </article>
            <article className="process-card">
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
              <p>Then, our developers craft custom AI solutions while continuously prioritising quality and safety.</p>
            </article>
            <article className="process-card">
              <div className="update-panel">
                <button>Update available</button>
                <p>Security <span>+8%</span></p><p>Operational cost <span>-11%</span></p><p>Workflow efficiency <span>+25%</span></p><p>Software speed <span>+38%</span></p>
              </div>
              <h3><span>03</span> Maintain &amp; improve</h3>
              <p>After deployment, our team provides support and continuously improves the implemented solutions.</p>
            </article>
          </div>
        </section>

        <section className="section products reveal" id="products">
          <h2 className="section-title">Our products</h2>
          <div className="product-grid">
            <article><h3>Cine Sketch</h3><strong>AI-Powered Story Sketches</strong><p>Visualize scenes instantly — converts concepts into storyboards and creative frames before filming begins.</p></article>
            <article><h3>Cine Scribe</h3><strong>Intelligent Script Writing</strong><p>Turn ideas into structured scripts using intelligent AI tools with engaging dialogue and cinematic depth.</p></article>
            <article><h3>Pitch Craft</h3><strong>Film Pitches &amp; Decks</strong><p>Create compelling film pitches and presentations that convey vision, emotion, and market appeal in minutes.</p></article>
            <article><h3>Cine Flow</h3><strong>End-to-End Production</strong><p>Streamline creative workflows from initial concept through execution, enabling team collaboration and momentum.</p></article>
          </div>
        </section>

        <section className="section team reveal" id="team">
          <h2 className="section-title">Meet our team</h2>
          <div className="team-track">
            <article><img src="https://framerusercontent.com/images/FuLkfY03g6UTvyUgiykCksQ60.png?width=600&height=600" alt="Team member" /><p>AI Developer</p><h3>Dave Jones</h3></article>
            <article><img src="https://framerusercontent.com/images/ZSaQbJuFS42W7zu7FI7QlZsxu58.png?width=600&height=600" alt="Team member" /><p>CEO</p><h3>Emily Branson</h3></article>
            <article><img src="https://framerusercontent.com/images/fmoq8UDKlfUrXummW5zaYwxCAZg.png?width=600&height=600" alt="Team member" /><p>Developer</p><h3>Jason Davis</h3></article>
            <article><img src="https://framerusercontent.com/images/FCIhg4w8Oic6PzzMBeFQQ09s200.png?width=600&height=600" alt="Team member" /><p>COO</p><h3>Maria Wilson</h3></article>
          </div>
        </section>

        <section className="section pricing reveal" id="pricing">
          <div className="center-title">
            <h2>Subscriptions</h2>
            <p>Three different subscriptions to match your companies&apos; needs.</p>
            <div className="segmented"><button>Monthly</button><span>Annually (-20%)</span></div>
          </div>
          <div className="pricing-grid">
            <article>
              <h3>Basic</h3>
              <strong>EUR 750 <span>/month</span></strong>
              <p>For businesses looking to start with AI and automations.</p>
              <LiquidMetalButton label="Choose this plan" />
              <ul><li>1 developer</li><li>Basic chatbots &amp; LLMs</li><li>5 monthly workflow automations</li></ul>
            </article>
            <article>
              <h3>Professional</h3>
              <strong>EUR 1.500 <span>/month</span></strong>
              <p>For businesses looking to outperform their competition with AI.</p>
              <LiquidMetalButton label="Choose this plan" />
              <ul><li>2 developers</li><li>Custom chatbots &amp; LLMs</li><li>15 monthly workflow automations</li></ul>
            </article>
            <article>
              <h3>Enterprise</h3>
              <strong>EUR 3.000 <span>/month</span></strong>
              <p>For businesses looking to fully leverage AI and automation.</p>
              <LiquidMetalButton label="Choose this plan" />
              <ul><li>3 developers</li><li>Custom chatbots &amp; LLMs</li><li>Unlimited workflow automations</li></ul>
            </article>
          </div>
        </section>

        <section className="section faq reveal" id="faq">
          <div className="center-title"><h2>Answers</h2><p>We&apos;ve gone ahead and answered some of the questions you might have.</p></div>
          <div className="faq-grid">
            <details><summary>What services do you offer?</summary><p>Custom AI assistants, automations, content systems, LLM workflows, and strategy.</p></details>
            <details><summary>Are your solutions secure?</summary><p>Security and privacy are part of the design from day one.</p></details>
            <details><summary>Do you offer continuous support?</summary><p>Yes, we monitor, maintain, and improve deployed systems.</p></details>
            <details><summary>Can I cancel my subscription at any time?</summary><p>Yes, monthly plans can be cancelled before the next billing cycle.</p></details>
          </div>
        </section>

        <section className="section contact reveal" id="contact">
          <div className="contact-copy">
            <h2>Let&apos;s talk!</h2>
            <p>Office:</p><strong>Lorven AI Studio<br/>Innovation District<br/>Amsterdam<br/>Local time: <span id="time">21:19:53</span></strong>
            <hr /><p>Email:</p><a href="mailto:info@lorven.ai">info@lorven.ai</a><hr /><p>Phone:</p><a href="tel:+31203439223">+31 (0) 20 3 43 9223</a>
          </div>
          <form className="contact-form">
            <label>Name<input placeholder="John Doe" /></label>
            <label>Email<input placeholder="john@example.com" /></label>
            <label>Phone<input placeholder="+31 (0) 20 3 43 9223" /></label>
            <label>Message<textarea placeholder="Hi team Lorven! I'm reaching out for..."></textarea></label>
            <LiquidMetalButton label="Submit" />
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="newsletter">
          <div><h2>Get the Lorven newsletter</h2><p>Subscribe to get the latest updates on AI into your inbox every month.</p></div>
          <form className="newsletter-form-row">
            <input placeholder="name@email.com" />
            <LiquidMetalButton label="subscribe" />
          </form>
        </div>
        <div className="footer-grid">
          <a className="brand" href="#home"><img className="brand-logo" src="/logo-new.png" alt="Lorven" /></a>
          <div><h3>Socials</h3><a>Instagram</a><a>Twitter</a><a>LinkedIn</a><a>Facebook</a></div>
          <div><h3>Links</h3><a href="#services">Services</a><a href="#process">Process</a><a href="#team">Team</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
          <div><h3>Credits</h3><p>Template inspired by Halo<br/>Rebuilt for Lorven AI Studio</p></div>
        </div>
        <p className="copyright">&copy; 2026, Lorven Inc - All rights reserved.</p>
      </footer>
    </>
  );
}
