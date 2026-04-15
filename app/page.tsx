import ClientEffects from "./ClientEffects";

const pageMarkup = String.raw`
  <div class="ambient ambient-one"></div>
  <div class="ambient ambient-two"></div>
  <header class="topbar">
    <a class="brand" href="#home" aria-label="Lorven AI Studio home"><img class="brand-logo" src="/logo-new.png" alt="Lorven"></a>
    <nav class="nav" aria-label="Primary navigation">
      <a href="#services">services</a>
      <a href="#process">process</a>
      <a href="#team">team</a>
      <a href="#pricing">pricing</a>
      <a href="#reviews">reviews</a>
      <a href="#faq">FAQ</a>
      <a href="#contact">contact</a>
      <a class="nav-cta" href="#contact">Get template</a>
    </nav>
    <a class="button ghost desktop-cta" href="#contact">Get this <span>template</span></a>
  </header>

  <main id="home">
    <section class="hero section reveal">
      <div class="particle-field" aria-hidden="true"></div>
      <h1>Lorven AI studio.</h1>
      <p>We develop custom AI solutions for innovative companies.</p>
      <div class="hero-actions">
        <a class="button muted" href="#services">our services</a>
        <a class="button primary" href="#contact">contact us <span aria-hidden="true">-&gt;</span></a>
      </div>
    </section>

    <section class="intro section reveal">
      <p class="mega-watermark">Lorven</p>
      <h2>We're Lorven. We develop custom AI <em>solutions for innovative companies.</em></h2>
      <a class="button muted" href="#contact">Get in touch</a>
    </section>

    <section class="section services reveal" id="services">
      <h2 class="section-title">What we do</h2>
      <div class="service-grid">
        <article class="service-card span-6">
          <div class="chat-preview">
            <div class="message-row">
              <img src="https://framerusercontent.com/images/CSr01inYFSNcBiRsiHyP21guEk.png" alt="" class="avatar">
              <div><strong>You</strong> <span>8:15 AM</span><p>Schedule a Google meeting with John for 3:45PM tomorrow!</p></div>
            </div>
            <div class="message-row">
              <div class="ai-badge">AI</div>
              <div><strong>AI Assistant</strong> <span>8:15 AM</span><p>I've successfully scheduled a Google meeting with John for 3:45PM tomorrow.</p></div>
            </div>
            <div class="input-bar"><span>Message AI Assistant...</span><button aria-label="Send">^</button></div>
          </div>
          <h3>Chatbot Development</h3>
          <p>We develop intelligent chatbots that leverage advanced NLP to elevate customer interactions and streamline your business processes.</p>
        </article>
        <article class="service-card span-6">
          <div class="image-generator">
            <div class="stars"></div>
            <button>generating <span>image...</span></button>
            <div class="input-bar"><span>Generate an image of...</span><button>Generate</button></div>
          </div>
          <h3>Content Creation</h3>
          <p>Our content creation solutions effortlessly generate high-quality, engaging content according to your brand's guidelines to captivate your audience.</p>
        </article>
        <article class="service-card span-4">
          <div class="automation-orbit">
            <span>*</span><span>◇</span><span>#</span><span>◆</span><div><strong>100+</strong><small>Automations</small></div>
          </div>
          <h3>Workflow Automations</h3>
          <p>We automate your workflows to streamline repetitive tasks, enhance efficiency, save time, and eliminate errors.</p>
        </article>
        <article class="service-card span-4">
          <div class="llm-stack">
            <div></div><div></div><div></div><div></div>
            <p>Where do quokka's live?<span>Quokka's live on Rottnest Island.</span></p>
            <div class="input-bar"><span>Write your prompt...</span><button aria-label="Send">^</button></div>
          </div>
          <h3>LLM Development</h3>
          <p>We develop Large Language Models that transform how your company interacts with data and customers.</p>
        </article>
        <article class="service-card span-4">
          <div class="chart-card">
            <svg viewBox="0 0 420 220" role="img" aria-label="Efficiency chart">
              <path d="M0 180 L70 168 L135 92 L205 105 L278 42 L350 60 L420 34" fill="none" stroke="#70BEFA" stroke-width="4"/>
              <path d="M0 180 L70 168 L135 92 L205 105 L278 42 L350 60 L420 34 V220 H0 Z" fill="url(#chartGlow)"/>
              <defs><linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#70BEFA" stop-opacity=".22"/><stop offset="1" stop-color="#70BEFA" stop-opacity="0"/></linearGradient></defs>
            </svg>
            <span class="tag up">Efficiency +103%</span><span class="tag down">Cost -67%</span>
          </div>
          <h3>AI Consulting</h3>
          <p>Our experts provide strategic guidance, enabling your business to implement AI solutions that drive transformative growth.</p>
        </article>
      </div>
    </section>

    <section class="section process reveal" id="process">
      <h2 class="section-title">The process</h2>
      <div class="process-grid">
        <article class="process-card">
          <div class="logo-matrix"><span>▾</span><span>◎</span><span>*</span><span>◆</span><span>*</span><span>~</span></div>
          <h3><span>01</span> Analyze</h3>
          <p>We start with a thorough analysis of your current workflows to see how AI could improve your processes.</p>
        </article>
        <article class="process-card">
          <div class="code-window">
            <div class="tabs"><span></span><span></span><span></span><b>HTML</b><em>React</em><em>CSS</em></div>
            <pre>1  &lt;html lang="en"&gt;
2  &lt;head&gt;
3    &lt;meta charset="UTF-8"&gt;
4    &lt;meta name="viewport"
5      content="width=device-width"&gt;
6  &lt;title&gt;Lorven&lt;/title&gt;</pre>
          </div>
          <h3><span>02</span> Build &amp; Implement</h3>
          <p>Then, our developers craft custom AI solutions while continuously prioritising quality and safety.</p>
        </article>
        <article class="process-card">
          <div class="update-panel">
            <button>Update available</button>
            <p>Security <span>+8%</span></p><p>Operational cost <span>-11%</span></p><p>Workflow efficiency <span>+25%</span></p><p>Software speed <span>+38%</span></p>
          </div>
          <h3><span>03</span> Maintain &amp; improve</h3>
          <p>After deployment, our team provides support and continuously improves the implemented solutions.</p>
        </article>
      </div>
    </section>

    <section class="section stats reveal">
      <h2 class="section-title">Our statistics</h2>
      <div class="stat-grid">
        <article><h3>Projects completed</h3><strong>93+</strong><p>We've successfully completed 93 top-tier projects.</p></article>
        <article><h3>Satisfied customers</h3><strong>100%</strong><p>We ensure a 100% satisfaction level for our clients.</p></article>
        <article><h3>Hours saved per day</h3><strong>3h</strong><p>Our solutions save our clients an average of 3 hours of work per day.</p></article>
        <article><h3>Cost saved per month</h3><strong>80k</strong><p>Our automations create measurable savings every month.</p></article>
      </div>
    </section>

    <section class="section team reveal" id="team">
      <h2 class="section-title">Meet our team</h2>
      <div class="team-track">
        <article><img src="https://framerusercontent.com/images/FuLkfY03g6UTvyUgiykCksQ60.png?width=600&amp;height=600" alt="Team member"><p>AI Developer</p><h3>Dave Jones</h3></article>
        <article><img src="https://framerusercontent.com/images/ZSaQbJuFS42W7zu7FI7QlZsxu58.png?width=600&amp;height=600" alt="Team member"><p>CEO</p><h3>Emily Branson</h3></article>
        <article><img src="https://framerusercontent.com/images/fmoq8UDKlfUrXummW5zaYwxCAZg.png?width=600&amp;height=600" alt="Team member"><p>Developer</p><h3>Jason Davis</h3></article>
        <article><img src="https://framerusercontent.com/images/FCIhg4w8Oic6PzzMBeFQQ09s200.png?width=600&amp;height=600" alt="Team member"><p>COO</p><h3>Maria Wilson</h3></article>
      </div>
    </section>

    <section class="section pricing reveal" id="pricing">
      <div class="center-title">
        <h2>Subscriptions</h2>
        <p>Three different subscriptions to match your companies' needs.</p>
        <div class="segmented"><button>Monthly</button><span>Annually (-20%)</span></div>
      </div>
      <div class="pricing-grid">
        <article><h3>Basic</h3><strong>EUR 750 <span>/month</span></strong><p>For businesses looking to start with AI and automations.</p><button>Choose this plan</button><ul><li>1 developer</li><li>Basic chatbots &amp; LLMs</li><li>5 monthly workflow automations</li></ul></article>
        <article><h3>Professional</h3><strong>EUR 1.500 <span>/month</span></strong><p>For businesses looking to outperform their competition with AI.</p><button>Choose this plan</button><ul><li>2 developers</li><li>Custom chatbots &amp; LLMs</li><li>15 monthly workflow automations</li></ul></article>
        <article><h3>Enterprise</h3><strong>EUR 3.000 <span>/month</span></strong><p>For businesses looking to fully leverage AI and automation.</p><button>Choose this plan</button><ul><li>3 developers</li><li>Custom chatbots &amp; LLMs</li><li>Unlimited workflow automations</li></ul></article>
      </div>
    </section>

    <section class="section reviews reveal" id="reviews">
      <h2 class="section-title">Reviews</h2>
      <div class="review-marquee">
        <div class="review-track">
          <article><p>"Lorven's AI solutions save us a ton of money every month."</p><div><img src="https://framerusercontent.com/images/tbEP47AHjLgpXqLCE4KFSaVoqM.png?width=200&amp;height=200" alt=""><span>David Williams<br><small>CTO - Wave</small></span></div></article>
          <article><p>"Lorven significantly enhanced our efficiency."</p><div><img src="https://framerusercontent.com/images/g4kry3jwbz453lTYar8A9urtFU.png?width=200&amp;height=200" alt=""><span>Jessica Miller<br><small>CCO - Kama Inc.</small></span></div></article>
          <article><p>"Highly recommended for any data-intensive business."</p><div><img src="https://framerusercontent.com/images/QjIomPBIRm6WjTT6cigOGykqtTc.png?width=200&amp;height=200" alt=""><span>Michael Anderson<br><small>CEO - Verdant Inc.</small></span></div></article>
          <article><p>"A game-changer for leveraging AI effectively."</p><div><img src="https://framerusercontent.com/images/tKYULxCnQMpNOdbs5SSCxRzrw6I.png?width=200&amp;height=200" alt=""><span>Olivia Johnson<br><small>CEO - Nara Innovations</small></span></div></article>
        </div>
      </div>
    </section>

    <section class="section faq reveal" id="faq">
      <div class="center-title"><h2>Answers</h2><p>We've gone ahead and answered some of the questions you might have.</p></div>
      <div class="faq-grid">
        <details><summary>What services do you offer?</summary><p>Custom AI assistants, automations, content systems, LLM workflows, and strategy.</p></details>
        <details><summary>Are your solutions secure?</summary><p>Security and privacy are part of the design from day one.</p></details>
        <details><summary>Do you offer continuous support?</summary><p>Yes, we monitor, maintain, and improve deployed systems.</p></details>
        <details><summary>Can I cancel my subscription at any time?</summary><p>Yes, monthly plans can be cancelled before the next billing cycle.</p></details>
      </div>
    </section>

    <section class="section contact reveal" id="contact">
      <div class="contact-copy">
        <h2>Let's talk!</h2>
        <p>Office:</p><strong>Lorven AI Studio<br>Innovation District<br>Amsterdam<br>Local time: <span id="time">21:19:53</span></strong>
        <hr><p>Email:</p><a href="mailto:info@lorven.ai">info@lorven.ai</a><hr><p>Phone:</p><a href="tel:+31203439223">+31 (0) 20 3 43 9223</a>
      </div>
      <form class="contact-form">
        <label>Name<input placeholder="John Doe"></label>
        <label>Email<input placeholder="john@example.com"></label>
        <label>Phone<input placeholder="+31 (0) 20 3 43 9223"></label>
        <label>Message<textarea placeholder="Hi team Lorven! I'm reaching out for..."></textarea></label>
        <button type="button">Submit</button>
      </form>
    </section>
  </main>

  <footer class="footer">
    <div class="newsletter">
      <div><h2>Get the Lorven newsletter</h2><p>Subscribe to get the latest updates on AI into your inbox every month.</p></div>
      <form><input placeholder="name@email.com"><button type="button">subscribe</button></form>
    </div>
    <div class="footer-grid">
      <a class="brand" href="#home"><img class="brand-logo" src="/logo-new.png" alt="Lorven"></a>
      <div><h3>Socials</h3><a>Instagram</a><a>Twitter</a><a>LinkedIn</a><a>Facebook</a></div>
      <div><h3>Links</h3><a href="#services">Services</a><a href="#process">Process</a><a href="#team">Team</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
      <div><h3>Credits</h3><p>Template inspired by Halo<br>Rebuilt for Lorven AI Studio</p></div>
    </div>
    <p class="copyright">© 2026, Lorven Inc - All rights reserved.</p>
  </footer>
`;

export default function Page() {
  return (
    <>
      <ClientEffects />
      <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />
    </>
  );
}
