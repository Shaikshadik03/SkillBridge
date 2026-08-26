/**
 * SkillBridge Application Logic & Live Skill Matching Engine
 * Smart India Hackathon 2026 - SIH26044
 */

const DEFAULT_INTERNSHIPS = [
  {
    id: "INT-001",
    company: "Zoho Corporation",
    role: "Junior Software Engineer Intern",
    domain: "Software Dev",
    location: "Chennai / Remote",
    stipend: "₹25,000/month",
    duration: "6 Months",
    requiredSkills: ["Java", "JavaScript", "SQL", "Data Structures", "HTML/CSS"],
    description: "Work with Zoho core engineering teams developing scalable cloud business applications."
  },
  {
    id: "INT-002",
    company: "Freshworks",
    role: "Frontend Developer Intern",
    domain: "Software Dev",
    location: "Bengaluru / Hybrid",
    stipend: "₹30,000/month",
    duration: "3 Months",
    requiredSkills: ["JavaScript", "React", "HTML/CSS", "Tailwind CSS", "Figma"],
    description: "Design and build fast, responsive customer engagement interfaces using React."
  },
  {
    id: "INT-003",
    company: "Swiggy",
    role: "Data Analyst Intern",
    domain: "Data Science",
    location: "Bengaluru",
    stipend: "₹35,000/month",
    duration: "6 Months",
    requiredSkills: ["Python", "SQL", "Pandas", "Power BI", "Excel"],
    description: "Analyze delivery performance metrics and consumer demand trends using SQL & Python."
  },
  {
    id: "INT-004",
    company: "Zerodha",
    role: "Backend Engineering Intern",
    domain: "Software Dev",
    location: "Bengaluru",
    stipend: "₹40,000/month",
    duration: "6 Months",
    requiredSkills: ["Python", "SQL", "Node.js", "Data Structures", "Problem Solving"],
    description: "Build high-throughput, low-latency financial trading backend APIs."
  },
  {
    id: "INT-005",
    company: "Infosys",
    role: "Full Stack Developer Intern",
    domain: "Software Dev",
    location: "Hyderabad / Hybrid",
    stipend: "₹20,000/month",
    duration: "4 Months",
    requiredSkills: ["Java", "HTML/CSS", "JavaScript", "SQL", "Communication"],
    description: "Collaborate on enterprise modernization projects using modern web frameworks."
  },
  {
    id: "INT-006",
    company: "Cred",
    role: "Product & UI/UX Design Intern",
    domain: "Design",
    location: "Bengaluru",
    stipend: "₹35,000/month",
    duration: "3 Months",
    requiredSkills: ["Figma", "UI/UX Design", "Canva", "Adobe Photoshop", "Presentation"],
    description: "Craft slick, dark-mode visual assets and high-converting micro-interactions."
  },
  {
    id: "INT-007",
    company: "Tata Consultancy Services (TCS)",
    role: "Data Science & AI Intern",
    domain: "Data Science",
    location: "Pune / Remote",
    stipend: "₹22,000/month",
    duration: "6 Months",
    requiredSkills: ["Python", "Machine Learning", "NumPy", "SQL", "Pandas"],
    description: "Assist in building predictive machine learning models for predictive maintenance."
  },
  {
    id: "INT-008",
    company: "Razorpay",
    role: "Web Solutions Intern",
    domain: "Software Dev",
    location: "Bengaluru",
    stipend: "₹32,000/month",
    duration: "4 Months",
    requiredSkills: ["Node.js", "React", "JavaScript", "SQL", "Problem Solving"],
    description: "Develop and maintain merchant payment integration SDKs and web dashboards."
  },
  {
    id: "INT-009",
    company: "Groww",
    role: "Growth & Marketing Intern",
    domain: "Marketing",
    location: "Bengaluru",
    stipend: "₹20,000/month",
    duration: "3 Months",
    requiredSkills: ["Communication", "Excel", "Canva", "Presentation", "Teamwork"],
    description: "Analyze marketing campaign conversions and craft educational financial content."
  },
  {
    id: "INT-010",
    company: "Postman",
    role: "Developer Relations & QA Intern",
    domain: "Software Dev",
    location: "Bengaluru / Remote",
    stipend: "₹35,000/month",
    duration: "6 Months",
    requiredSkills: ["JavaScript", "Node.js", "Communication", "Problem Solving", "HTML/CSS"],
    description: "Test API collections, write developer tutorials, and engage technical communities."
  }
];

// App State
let internships = [];
let userSkills = new Set(["Python", "SQL", "HTML/CSS"]);
let selectedDomain = "all";
let currentSlide = 0;
let gapChartInstance = null;

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  await loadInternships();
  setupNavigation();
  initSkillCheckboxes();
  setupDomainFilters();
  recalculateAndRender();
  setupSlideDeck();
});

// Load Data
async function loadInternships() {
  try {
    const res = await fetch("data/internships.json");
    if (res.ok) {
      internships = await res.json();
    } else {
      internships = DEFAULT_INTERNSHIPS;
    }
  } catch (err) {
    internships = DEFAULT_INTERNSHIPS;
  }
}

// Navigation
function setupNavigation() {
  const navBtns = document.querySelectorAll(".nav-btn, [data-view-target]");
  navBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetView = btn.getAttribute("data-view-target") || btn.getAttribute("data-view");
      if (targetView) switchView(targetView);
    });
  });
}

function switchView(viewId) {
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(btn => {
    if (btn.getAttribute("data-view") === viewId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const activeSection = document.getElementById(viewId);
  if (activeSection) {
    activeSection.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (viewId === "gap-report-view") {
    renderGapReport();
  }
}

// Skill Checkboxes Setup
function initSkillCheckboxes() {
  const checkboxes = document.querySelectorAll('.skill-check-tag input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (userSkills.has(cb.value)) {
      cb.checked = true;
    }
    cb.addEventListener("change", () => {
      if (cb.checked) {
        userSkills.add(cb.value);
        showToast(`Added ${cb.value} to your profile!`);
      } else {
        userSkills.delete(cb.value);
      }
      recalculateAndRender();
    });
  });
}

function setupDomainFilters() {
  const domainSelect = document.getElementById("filter-domain");
  if (domainSelect) {
    domainSelect.addEventListener("change", (e) => {
      selectedDomain = e.target.value;
      recalculateAndRender();
    });
  }
}

// Core Matching Engine
function recalculateAndRender() {
  const scoredInternships = internships.map(item => {
    const totalReq = item.requiredSkills.length;
    const haveSkills = item.requiredSkills.filter(skill => userSkills.has(skill));
    const missingSkills = item.requiredSkills.filter(skill => !userSkills.has(skill));

    // Calculate match percentage
    const matchPct = totalReq > 0 ? Math.round((haveSkills.length / totalReq) * 100) : 0;

    return {
      ...item,
      matchPct,
      haveSkills,
      missingSkills
    };
  });

  // Filter by domain
  const filtered = scoredInternships.filter(item => {
    return selectedDomain === "all" || item.domain === selectedDomain;
  });

  // Sort descending by match percentage
  filtered.sort((a, b) => b.matchPct - a.matchPct);

  renderMatchingCards(filtered);
  updateSkillCountLabel();
}

function renderMatchingCards(list) {
  const container = document.getElementById("matched-internships-list");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="background:white; padding:3rem; text-align:center; border-radius:16px; border:1px solid #e2e8f0;">
        <h3>No internships found in this domain</h3>
        <p style="color:#64748b; margin-top:0.5rem;">Try selecting "All Domains" or pick more skills!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => {
    const tier = item.matchPct >= 80 ? "high" : item.matchPct >= 50 ? "med" : "low";
    const tierText = item.matchPct >= 80 ? "High Match" : item.matchPct >= 50 ? "Moderate" : "Gap Alert";

    return `
      <div class="internship-card">
        <div class="match-ring-box">
          <div class="match-ring ${tier}" style="--pct: ${item.matchPct}">
            <div class="match-ring-inner">${item.matchPct}%</div>
          </div>
          <span class="match-status-label ${tier}">${tierText}</span>
        </div>

        <div class="card-main">
          <h3 class="role-title">${item.role}</h3>
          <div class="company-row">
            <span class="company-name">🏢 ${item.company}</span>
            <span>•</span>
            <span>📍 ${item.location}</span>
          </div>

          <div class="meta-pills">
            <span>💰 ${item.stipend}</span>
            <span>⏱️ ${item.duration}</span>
            <span>🏷️ ${item.domain}</span>
          </div>

          <p style="font-size:0.88rem; color:#475569; margin-bottom:0.85rem;">${item.description}</p>

          <div style="font-size:0.8rem; font-weight:700; color:#64748b; margin-bottom:0.4rem;">
            Skill Breakdown (${item.haveSkills.length}/${item.requiredSkills.length} Matched):
          </div>

          <div class="skill-match-list">
            ${item.haveSkills.map(s => `<span class="skill-pill have">✓ ${s}</span>`).join("")}
            ${item.missingSkills.map(s => `<span class="skill-pill missing">✕ ${s}</span>`).join("")}
          </div>

          <div style="display:flex; gap:0.75rem; margin-top:1rem;">
            <button class="btn btn-primary" style="padding:0.5rem 1.25rem; font-size:0.85rem;" onclick="showToast('Redirecting to application portal...')">
              🚀 Apply Now
            </button>
            <button class="btn btn-secondary" style="padding:0.5rem 1.25rem; font-size:0.85rem;" onclick="switchView('gap-report-view')">
              📊 View Gap Roadmap
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function updateSkillCountLabel() {
  const lbl = document.getElementById("selected-skills-count");
  if (lbl) lbl.textContent = `${userSkills.size} Skills Selected`;
}

// Skill Gap Report & Priority Ranking
function renderGapReport() {
  const scored = internships.map(item => {
    const totalReq = item.requiredSkills.length;
    const have = item.requiredSkills.filter(s => userSkills.has(s));
    const missing = item.requiredSkills.filter(s => !userSkills.has(s));
    return { ...item, matchPct: Math.round((have.length / totalReq) * 100), missing };
  }).sort((a, b) => b.matchPct - a.matchPct);

  // Take top 5 matched internships and aggregate missing skills
  const topMatches = scored.slice(0, 5);
  const gapCounts = {};

  topMatches.forEach(item => {
    item.missing.forEach(skill => {
      gapCounts[skill] = (gapCounts[skill] || 0) + 1;
    });
  });

  const sortedGaps = Object.entries(gapCounts)
    .map(([skill, freq]) => ({ skill, freq }))
    .sort((a, b) => b.freq - a.freq);

  const container = document.getElementById("gap-list-container");
  if (container) {
    if (sortedGaps.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2rem;">
          <div style="font-size:3rem;">🎉</div>
          <h3>Zero Skill Gaps Detected!</h3>
          <p style="color:#64748b;">You meet 100% of the requirements for your top matched internships.</p>
        </div>
      `;
    } else {
      container.innerHTML = sortedGaps.map((item, idx) => `
        <div class="gap-skill-item">
          <div class="gap-info">
            <span class="gap-rank">#${idx + 1}</span>
            <div>
              <strong style="font-size:1.05rem; color:var(--text-main);">${item.skill}</strong>
              <div style="font-size:0.8rem; color:var(--text-muted);">
                Required in ${item.freq} of your top 5 target internships
              </div>
            </div>
          </div>
          <button class="btn btn-primary" style="padding:0.45rem 1rem; font-size:0.82rem;" onclick="markSkillAsLearned('${item.skill}')">
            ✅ Mark as Learned
          </button>
        </div>
      `).join("");
    }
  }

  // Render Chart.js Bar Chart
  const ctx = document.getElementById("skillGapChart")?.getContext("2d");
  if (ctx && sortedGaps.length > 0) {
    if (gapChartInstance) gapChartInstance.destroy();
    gapChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedGaps.map(g => g.skill),
        datasets: [{
          label: "Frequency in Top Internships",
          data: sortedGaps.map(g => g.freq),
          backgroundColor: "#4f46e5",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }
}

// Progress Tracker "Mark as Learned"
function markSkillAsLearned(skill) {
  userSkills.add(skill);
  const cb = document.querySelector(`.skill-check-tag input[value="${skill}"]`);
  if (cb) cb.checked = true;

  showToast(`🎉 "${skill}" marked as learned! Match scores recalculated.`);
  recalculateAndRender();
  renderGapReport();
}

// Toast
function showToast(msg) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  toast.querySelector("span").textContent = msg;
  toast.style.display = "flex";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}

// SIH Slide Deck Navigation
function setupSlideDeck() {
  const nextBtn = document.getElementById("slide-next-btn");
  const prevBtn = document.getElementById("slide-prev-btn");

  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));
  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));

  window.addEventListener("keydown", (e) => {
    if (document.getElementById("presentation-view")?.classList.contains("active")) {
      if (e.key === "ArrowRight" || e.key === "Space") changeSlide(1);
      if (e.key === "ArrowLeft") changeSlide(-1);
    }
  });
}

function changeSlide(dir) {
  const slides = document.querySelectorAll(".slide-content");
  const dots = document.querySelectorAll(".slide-dot");
  if (!slides.length) return;

  slides[currentSlide].classList.remove("active");
  if (dots[currentSlide]) dots[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + dir + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
  document.getElementById("slide-counter").textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
}

function jumpToSlide(idx) {
  const slides = document.querySelectorAll(".slide-content");
  const dots = document.querySelectorAll(".slide-dot");
  if (!slides.length) return;

  slides[currentSlide].classList.remove("active");
  if (dots[currentSlide]) dots[currentSlide].classList.remove("active");

  currentSlide = idx;
  slides[currentSlide].classList.add("active");
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
  document.getElementById("slide-counter").textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
}
