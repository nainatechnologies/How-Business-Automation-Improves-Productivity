/**
 * NAINA TECHNOLOGIES - TECHNOLOGY DISCOVERY HUB JAVASCRIPT
 * Compact 2-Column Interactivity: Category Filtering, Interactive Topic Briefings, Dark Mode
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Reading Progress Bar & Header Scroll Effect ---
  const progressBar = document.getElementById('reading-progress');
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // --- 2. Dark / Light Mode Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = localStorage.getItem('naina_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('naina_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, '🎨');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'dark') {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  // --- 3. Category Filter Logic for Technology Cards ---
  const filterChips = document.querySelectorAll('.category-filter-chips .filter-chip');
  const techCards = document.querySelectorAll('#technology-cards-grid .blog-card');
  const trendingCard = document.getElementById('trending-topics');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const category = chip.getAttribute('data-category');
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      techCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });

      if (trendingCard) {
        trendingCard.style.display = (category === 'all') ? 'flex' : 'none';
      }
    });
  });

  window.filterByTopic = function(category) {
    const targetChip = document.querySelector(`.filter-chip[data-category="${category}"]`);
    if (targetChip) {
      targetChip.click();
      document.getElementById('discovery-hub')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- 4. Topic Knowledge Briefing Panels (Modal Data) ---
  const topicDetails = {
    web: {
      title: "Modern Web Development",
      badge: "WEB DEVELOPMENT",
      tagline: "High-Performance Interfaces & Responsive Digital Experiences",
      leadImage: "assets/card_webdev.jpg",
      intro: "In modern business, your web interface is the primary touchpoint for customers, partners, and enterprise stakeholders. High-performance web development ensures that digital applications deliver speed, cross-device accessibility, and seamless user experiences.",
      content: `
        <h2>Engineering Fast, Scalable Web Applications</h2>
        <p>At <strong>Naina Technologies</strong>, we design and build bespoke web platforms using modern architectures, robust APIs, and lightweight frameworks. We focus on clean code, responsive layouts, and optimal core web vitals.</p>
        <ul>
          <li><strong>Responsive Architecture:</strong> Engineered to provide smooth user experiences on desktop, tablet, and mobile devices.</li>
          <li><strong>Speed & Performance:</strong> Optimized asset pipelines, asset minification, and clean frontend standards.</li>
          <li><strong>Enterprise Security:</strong> Modern HTTPS practices, token authentication, and data encryption.</li>
        </ul>
        <div class="article-cta-box" style="margin-top: 30px;">
          <h3 class="cta-box-title">Explore Web Development with Naina Technologies</h3>
          <p class="cta-box-desc">Connect with our engineering team to discuss custom web applications and portal solutions tailored to your operational goals.</p>
          <a href="#contact" onclick="closeArticleModal()" class="cta-contact-pill" style="display: inline-flex; margin-top: 10px;">Contact Naina Technologies →</a>
        </div>
      `
    },
    ai: {
      title: "Smarter Business Automation",
      badge: "AI & AUTOMATION",
      tagline: "Smarter Workflows. Less Manual Effort. Better Business Results.",
      leadImage: "assets/hero_automation.jpg",
      intro: "Business automation helps organizations simplify everyday operations by using technology to perform routine tasks, streamline workflows, and improve overall productivity. Combining AI with workflow orchestration reduces repetitive tasks and elevates human strategic capacity.",
      content: `
        <h2>How Business Automation Improves Productivity</h2>
        <p>In today's fast-moving digital world, businesses need to work smarter, faster, and more efficiently to stay competitive. However, repetitive tasks, manual data entry, disconnected systems, and time-consuming processes can slow down business growth.</p>
        <p>Business automation helps organizations simplify everyday operations by using technology to perform repetitive tasks, streamline workflows, and improve overall productivity.</p>
        
        <h2>5 Key Advantages of Automated Workflows</h2>
        <ol>
          <li><strong>Reduces Repetitive Manual Work:</strong> Frees your staff from mundane data entry and repetitive record tracking.</li>
          <li><strong>Improves Accuracy and Consistency:</strong> Standardizes operations and minimizes human calculation errors.</li>
          <li><strong>Saves Time and Operational Resources:</strong> Speeds up approvals, invoice routing, and document indexing.</li>
          <li><strong>Connects Different Business Systems:</strong> Bridges CRM, ERP, finance, and support platforms.</li>
          <li><strong>Supports Scalable Growth:</strong> Enables your company to handle increased transaction volumes without proportional headcount increases.</li>
        </ol>

        <div class="article-cta-box" style="margin-top: 30px;">
          <h3 class="cta-box-title">Ready to automate your core processes?</h3>
          <p class="cta-box-desc">Partner with Naina Technologies to assess your workflows and implement practical automation solutions.</p>
          <a href="#contact" onclick="closeArticleModal()" class="cta-contact-pill" style="display: inline-flex; margin-top: 10px;">Contact Naina Technologies →</a>
        </div>
      `
    },
    cloud: {
      title: "Cloud Technology Explained",
      badge: "CLOUD & DEVOPS",
      tagline: "Resilient Infrastructure, Automated Pipelines, High Availability",
      leadImage: "assets/insta_server.jpg",
      intro: "Cloud infrastructure and DevOps enable organizations to eliminate server bottlenecks, reduce infrastructure overhead, and release product enhancements with confidence and speed.",
      content: `
        <h2>Scalable Cloud Architectures & Continuous Delivery</h2>
        <p>Migrating to or optimizing modern cloud platforms (AWS, Microsoft Azure, Google Cloud) empowers businesses to scale dynamically as demands increase, without worrying about on-premise hardware constraints.</p>
        <ul>
          <li><strong>Continuous Integration & Deployment (CI/CD):</strong> Automated testing and instant rollouts that reduce deployment risk.</li>
          <li><strong>Infrastructure Monitoring:</strong> Real-time telemetry, proactive health checks, and automated failover.</li>
          <li><strong>Cost Optimization:</strong> Resource right-sizing and serverless configurations that keep operational expenditures lean.</li>
        </ul>
        <div class="article-cta-box" style="margin-top: 30px;">
          <h3 class="cta-box-title">Modernize Your Cloud Infrastructure</h3>
          <p class="cta-box-desc">Discuss your infrastructure reliability and DevOps requirements with Naina Technologies.</p>
          <a href="#contact" onclick="closeArticleModal()" class="cta-contact-pill" style="display: inline-flex; margin-top: 10px;">Contact Naina Technologies →</a>
        </div>
      `
    },
    enterprise: {
      title: "Connecting Business Systems",
      badge: "ENTERPRISE INTEGRATION",
      tagline: "Seamless API Connectivity, Synchronized Data, Zero Silos",
      leadImage: "assets/post_strategy.jpg",
      intro: "Enterprise integration connects disparate ERP, CRM, billing, and inventory applications to enable frictionless, real-time data flow across your entire company.",
      content: `
        <h2>Bridging Fragmented Enterprise Systems</h2>
        <p>When enterprise systems operate in isolation, employees waste hours manually copying data between tools, leading to errors and delays. Modern API integration establishes automated bridges that sync records in milliseconds.</p>
        <ul>
          <li><strong>API Gateways & Webhooks:</strong> Real-time bi-directional data flow between internal and third-party SaaS services.</li>
          <li><strong>Data Standardization:</strong> Unified schemas that ensure every department operates on the exact same single source of truth.</li>
          <li><strong>High Reliability:</strong> Message queues and retry handlers that protect against data loss during network hiccups.</li>
        </ul>
        <div class="article-cta-box" style="margin-top: 30px;">
          <h3 class="cta-box-title">Unify Your Enterprise Tools</h3>
          <p class="cta-box-desc">Let Naina Technologies architect seamless API integrations across your software ecosystem.</p>
          <a href="#contact" onclick="closeArticleModal()" class="cta-contact-pill" style="display: inline-flex; margin-top: 10px;">Contact Naina Technologies →</a>
        </div>
      `
    },
    software: {
      title: "Software Built for Your Business",
      badge: "CUSTOM SOFTWARE",
      tagline: "Tailored Digital Engineering Designed Around Your Unique Workflows",
      leadImage: "assets/post_camera.jpg",
      intro: "Standard off-the-shelf software often forces businesses to compromise on processes. Custom software development delivers digital platforms engineered precisely for your unique operational requirements.",
      content: `
        <h2>Bespoke Software That Fits Your Organization</h2>
        <p>Custom software aligns directly with how your teams work, removing manual workarounds and driving operational competitive advantages.</p>
        <ul>
          <li><strong>Tailored Functionality:</strong> Every module is constructed to solve specific operational friction.</li>
          <li><strong>Ownership & Flexibility:</strong> Full control over future updates, integrations, and compliance.</li>
          <li><strong>Scalable Foundations:</strong> Modular codebases that adapt as your client base expands.</li>
        </ul>
        <div class="article-cta-box" style="margin-top: 30px;">
          <h3 class="cta-box-title">Build Software That Scales With You</h3>
          <p class="cta-box-desc">Partner with Naina Technologies to architect and deliver custom software solutions.</p>
          <a href="#contact" onclick="closeArticleModal()" class="cta-contact-pill" style="display: inline-flex; margin-top: 10px;">Contact Naina Technologies →</a>
        </div>
      `
    },
    transformation: {
      title: "Transforming Business Operations",
      badge: "DIGITAL TRANSFORMATION",
      tagline: "Practical Modernization That Simplifies Workflows and Unlocks Growth",
      leadImage: "assets/insta_team.jpg",
      intro: "Digital transformation is a strategic journey that replaces manual friction with intelligent, future-proof digital workflows, enabling companies to adapt to rapid market evolution.",
      content: `
        <h2>A Practical Roadmap to Modernized Operations</h2>
        <p>Successful transformation starts with understanding real organizational bottlenecks, setting measurable milestones, and implementing technology that your staff enthusiastically adopts.</p>
        <ul>
          <li><strong>Process Discovery:</strong> Auditing routine activities to pinpoint prime automation opportunities.</li>
          <li><strong>Incremental Rollout:</strong> Agile deployment that proves ROI without disrupting daily operations.</li>
          <li><strong>Long-Term Evolution:</strong> Continuous monitoring and improvements to support sustained business growth.</li>
        </ul>
        <div class="article-cta-box" style="margin-top: 30px;">
          <h3 class="cta-box-title">Begin Your Digital Transformation</h3>
          <p class="cta-box-desc">Discover how Naina Technologies can guide your operational modernization journey.</p>
          <a href="#contact" onclick="closeArticleModal()" class="cta-contact-pill" style="display: inline-flex; margin-top: 10px;">Contact Naina Technologies →</a>
        </div>
      `
    }
  };

  // --- 5. Modal Display Logic & Full Executive Guide ---
  const modalBackdrop = document.getElementById('article-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const modalTitle = document.getElementById('modal-article-title');
  const modalTagline = document.getElementById('modal-article-tagline');
  const modalLeadImg = document.getElementById('modal-lead-image');
  const modalProse = document.getElementById('modal-article-prose');

  // Cache the complete, comprehensive "How Business Automation Improves Productivity" guide HTML
  const initialGuideHTML = modalProse ? modalProse.innerHTML : '';
  const initialGuideTitle = modalTitle ? modalTitle.textContent.trim() : "How Business Automation Improves Productivity";
  const initialGuideTagline = modalTagline ? modalTagline.textContent.trim() : "Smarter Workflows. Less Manual Effort. Better Business Results.";
  const initialGuideImg = modalLeadImg ? modalLeadImg.getAttribute('src') || "assets/hero_automation.jpg" : "assets/hero_automation.jpg";

  /**
   * Opens the full-length Executive Technology Guide containing the exact
   * matter uploaded: Introduction, What Is Business Automation, 5 Ways Automation
   * Improves Productivity, ROI Calculator, The Role of AI, Common Processes,
   * 5-Step Roadmap, Naina Technologies Solutions & Contact CTA.
   */
  window.openArticleModal = function(postId = 'post-featured') {
    if (modalTitle) modalTitle.textContent = initialGuideTitle;
    if (modalTagline) modalTagline.textContent = initialGuideTagline;
    if (modalLeadImg) {
      modalLeadImg.src = initialGuideImg;
      modalLeadImg.alt = initialGuideTitle;
    }
    if (modalProse && initialGuideHTML) {
      modalProse.innerHTML = initialGuideHTML;
      initRoiCalculator();
    }

    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      const container = modalBackdrop.querySelector('.article-modal-container');
      if (container) container.scrollTop = 0;
    }
  };

  /**
   * Opens specialized interactive topic briefs (Web, AI, Cloud, Enterprise, Software, Transformation)
   */
  window.openTopicModal = function(topicKey) {
    if (topicKey === 'post-featured' || topicKey === 'featured' || topicKey === 'automation') {
      return window.openArticleModal('post-featured');
    }

    const data = topicDetails[topicKey] || topicDetails['ai'];

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalTagline) modalTagline.textContent = data.tagline;
    if (modalLeadImg) {
      modalLeadImg.src = data.leadImage;
      modalLeadImg.alt = data.title;
    }
    if (modalProse) {
      modalProse.innerHTML = `
        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-main); font-weight: 500;">
          ${data.intro}
        </p>
        ${data.content}
      `;
    }

    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      const container = modalBackdrop.querySelector('.article-modal-container');
      if (container) container.scrollTop = 0;
    }
  };

  window.closeArticleModal = function() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Bind Hero click targets to openArticleModal
  const heroBtn = document.getElementById('hero-read-more-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openArticleModal('post-featured');
    });
  }

  const heroHeading = document.getElementById('hero-title');
  if (heroHeading) {
    heroHeading.addEventListener('click', () => window.openArticleModal('post-featured'));
  }

  const heroImgWrapper = document.querySelector('.featured-image-wrapper');
  if (heroImgWrapper) {
    heroImgWrapper.addEventListener('click', () => window.openArticleModal('post-featured'));
  }

  // Bind modal closing handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeArticleModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeArticleModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeArticleModal();
    }
  });

  // --- Interactive ROI Calculator Widget in Guide ---
  function initRoiCalculator() {
    const teamInput = document.getElementById('calc-team-size');
    const rateInput = document.getElementById('calc-hourly-rate');
    const hoursInput = document.getElementById('calc-hours-wasted');

    const valTeam = document.getElementById('val-team-size');
    const valRate = document.getElementById('val-hourly-rate');
    const valHours = document.getElementById('val-hours-wasted');

    const resHours = document.getElementById('res-hours-saved');
    const resCost = document.getElementById('res-cost-saved');
    const resEff = document.getElementById('res-efficiency');

    if (!teamInput || !rateInput || !hoursInput) return;

    function recalculate() {
      const team = parseInt(teamInput.value, 10) || 25;
      const rate = parseInt(rateInput.value, 10) || 55;
      const hours = parseInt(hoursInput.value, 10) || 10;

      if (valTeam) valTeam.textContent = team;
      if (valRate) valRate.textContent = `$${rate}`;
      if (valHours) valHours.textContent = `${hours} hrs`;

      const hoursSaved = Math.round(team * hours * 52 * 0.7);
      const costSaved = Math.round(hoursSaved * rate);
      const efficiency = Math.min(95, Math.round(50 + (hours * 2.5)));

      if (resHours) resHours.textContent = hoursSaved.toLocaleString();
      if (resCost) resCost.textContent = `$${costSaved.toLocaleString()}`;
      if (resEff) resEff.textContent = `+${efficiency}%`;
    }

    teamInput.oninput = recalculate;
    rateInput.oninput = recalculate;
    hoursInput.oninput = recalculate;
    recalculate();
  }

  // Initialize ROI Calculator immediately on load
  initRoiCalculator();

  // --- 6. Share Utility ---
  window.shareArticle = function() {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Topic link copied to clipboard!', '🔗');
      });
    } else {
      showToast('Topic link copied!', '🔗');
    }
  };

  // --- 7. Toast Notification Utility ---
  window.showToast = function(msg, icon = '✨') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };
});
