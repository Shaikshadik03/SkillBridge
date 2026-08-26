/**
 * SkillBridge Application Logic & Live Cyber Matching Engine
 */

const DEFAULT_INTERNSHIPS = [
  {
    "id": "INT-001",
    "company": "Zoho Corporation",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    "role": "Junior Software Engineer Intern",
    "domain": "Software Dev",
    "location": "Chennai / Remote",
    "stipend": "₹25,000/month",
    "duration": "6 Months",
    "requiredSkills": ["Java", "JavaScript", "SQL", "Data Structures", "HTML/CSS"],
    "description": "Work with Zoho core engineering teams developing scalable cloud business applications."
  },
  {
    "id": "INT-002",
    "company": "Freshworks",
    "logo": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
    "role": "Frontend Developer Intern",
    "domain": "Software Dev",
    "location": "Bengaluru / Hybrid",
    "stipend": "₹30,000/month",
    "duration": "3 Months",
    "requiredSkills": ["JavaScript", "React", "HTML/CSS", "Tailwind CSS", "Figma"],
    "description": "Design and build fast, responsive customer engagement interfaces using React."
  },
  {
    "id": "INT-003",
    "company": "Swiggy",
    "logo": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80",
    "role": "Data Analyst Intern",
    "domain": "Data Science",
    "location": "Bengaluru",
    "stipend": "₹35,000/month",
    "duration": "6 Months",
    "requiredSkills": ["Python", "SQL", "Pandas", "Power BI", "Excel"],
    "description": "Analyze delivery performance metrics and consumer demand trends using SQL & Python."
  },
  {
    "id": "INT-004",
    "company": "Zerodha",
    "logo": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&auto=format&fit=crop&q=80",
    "role": "Backend Engineering Intern",
    "domain": "Software Dev",
    "location": "Bengaluru",
    "stipend": "₹40,000/month",
    "duration": "6 Months",
    "requiredSkills": ["Python", "SQL", "Node.js", "Data Structures", "Problem Solving"],
    "description": "Build high-throughput, low-latency financial trading backend APIs."
  },
  {
    "id": "INT-005",
    "company": "Infosys",
    "logo": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80",
    "role": "Full Stack Developer Intern",
    "domain": "Software Dev",
    "location": "Hyderabad / Hybrid",
    "stipend": "₹20,000/month",
    "duration": "4 Months",
    "requiredSkills": ["Java", "HTML/CSS", "JavaScript", "SQL", "Communication"],
    "description": "Collaborate on enterprise modernization projects using modern web frameworks."
  },
  {
    "id": "INT-006",
    "company": "Cred",
    "logo": "https://images.unsplash.com/photo-1558655146-d09347e92766?w=120&auto=format&fit=crop&q=80",
    "role": "Product & UI/UX Design Intern",
    "domain": "Design",
    "location": "Bengaluru",
    "stipend": "₹35,000/month",
    "duration": "3 Months",
    "requiredSkills": ["Figma", "UI/UX Design", "Canva", "Adobe Photoshop", "Presentation"],
    "description": "Craft slick visual assets and high-converting micro-interactions."
  },
  {
    "id": "INT-007",
    "company": "Tata Consultancy Services (TCS)",
    "logo": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=120&auto=format&fit=crop&q=80",
    "role": "Data Science & AI Intern",
    "domain": "Data Science",
    "location": "Pune / Remote",
    "stipend": "₹22,000/month",
    "duration": "6 Months",
    "requiredSkills": ["Python", "Machine Learning", "NumPy", "SQL", "Pandas"],
    "description": "Assist in building predictive machine learning models for predictive maintenance."
  },
  {
    "id": "INT-008",
    "company": "Razorpay",
    "logo": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80",
    "role": "Web Solutions Intern",
    "domain": "Software Dev",
    "location": "Bengaluru",
    "stipend": "₹32,000/month",
    "duration": "4 Months",
    "requiredSkills": ["Node.js", "React", "JavaScript", "SQL", "Problem Solving"],
    "description": "Develop and maintain merchant payment integration SDKs and web dashboards."
  }
];

let internships = [];
let userSkills = new Set(["Python", "SQL", "HTML/CSS"]);
let selectedDomain = "all";
let gapChartInstance = null;

document.addEventListener("DOMContentLoaded", async () => {
  await loadInternships();
  setupNavigation();
  initSkillCheckboxes();
  setupDomainFilters();
  recalculateAndRender();
});

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

function initSkillCheckboxes() {
  const checkboxes = document.querySelectorAll('.skill-check-tag input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (userSkills.has(cb.value)) {
      cb.checked = true;
    }
    cb.addEventListener("change", () => {
      if (cb.checked) {
        userSkills.add(cb.value);
        showToast(`+ Added ${cb.value}`);
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

function recalculateAndRender() {
  const scoredInternships = internships.map(item => {
    const totalReq = item.requiredSkills.length;
    const haveSkills = item.requiredSkills.filter(skill => userSkills.has(skill));
    const missingSkills = item.requiredSkills.filter(skill => !userSkills.has(skill));
    const matchPct = totalReq > 0 ? Math.round((haveSkills.length / totalReq) * 100) : 0;

    return {
      ...item,
      matchPct,
      haveSkills,
      missingSkills
    };
  });

  const filtered = scoredInternships.filter(item => {
    return selectedDomain === "all" || item.domain === selectedDomain;
  });

  filtered.sort((a, b) => b.matchPct - a.matchPct);
  renderMatchingCards(filtered);
  updateSkillCountLabel();
}

function renderMatchingCards(list) {
  const container = document.getElementById("matched-internships-list");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:3rem; text-align:center; border-radius:16px;">
        <h3 style="color:#ffffff;">No internships found in this domain</h3>
        <p style="color:#94a3b8; margin-top:0.5rem;">Select "All Domains" or toggle more skills to expand search results.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => {
    const tier = item.matchPct >= 80 ? "high" : item.matchPct >= 50 ? "med" : "low";
    const tierColor = item.matchPct >= 80 ? "#10b981" : item.matchPct >= 50 ? "#f59e0b" : "#f43f5e";
    const tierText = item.matchPct >= 80 ? "High Match" : item.matchPct >= 50 ? "Moderate" : "Gap Alert";

    return `
      <div class="cyber-card">
        <img src="${item.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80'}" alt="${item.company}" class="company-logo">

        <div class="card-main">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <h3 class="role-title">${item.role}</h3>
              <div class="company-row">
                <span class="company-name">${item.company}</span>
                <span>•</span>
                <span>📍 ${item.location}</span>
              </div>
            </div>

            <div class="neon-gauge-box">
              <div class="neon-gauge-ring ${tier}" style="--pct: ${item.matchPct}">
                <div class="neon-gauge-inner">${item.matchPct}%</div>
              </div>
              <span style="font-size:0.62rem; font-weight:800; text-transform:uppercase; color:${tierColor};">${tierText}</span>
            </div>
          </div>

          <div style="display:flex; gap:0.75rem; font-size:0.8rem; color:#94a3b8; margin:0.5rem 0 0.85rem;">
            <span>💰 ${item.stipend}</span>
            <span>⏱️ ${item.duration}</span>
            <span>🏷️ ${item.domain}</span>
          </div>

          <p style="font-size:0.86rem; color:#cbd5e1; margin-bottom:0.85rem;">${item.description}</p>

          <div style="font-size:0.78rem; font-weight:700; color:#94a3b8; margin-bottom:0.4rem;">
            Skill Breakdown (${item.haveSkills.length}/${item.requiredSkills.length} Matched):
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1rem;">
            ${item.haveSkills.map(s => `<span class="skill-pill have">✓ ${s}</span>`).join("")}
            ${item.missingSkills.map(s => `<span class="skill-pill missing">✕ ${s}</span>`).join("")}
          </div>

          <div style="display:flex; gap:0.75rem;">
            <button class="btn btn-cyber-primary" style="padding:0.45rem 1.25rem; font-size:0.82rem;" onclick="showToast('Application sent to ${item.company} pipeline!')">
              ⚡ Apply Now
            </button>
            <button class="btn btn-cyber-outline" style="padding:0.45rem 1.25rem; font-size:0.82rem;" onclick="switchView('gap-report-view')">
              📊 Gap Roadmap
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

function renderGapReport() {
  const scored = internships.map(item => {
    const totalReq = item.requiredSkills.length;
    const have = item.requiredSkills.filter(s => userSkills.has(s));
    const missing = item.requiredSkills.filter(s => !userSkills.has(s));
    return { ...item, matchPct: Math.round((have.length / totalReq) * 100), missing };
  }).sort((a, b) => b.matchPct - a.matchPct);

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
          <h3 style="color:#ffffff;">Zero Skill Gaps Detected!</h3>
          <p style="color:#94a3b8;">You meet 100% of the prerequisites for your target internships.</p>
        </div>
      `;
    } else {
      container.innerHTML = sortedGaps.map((item, idx) => `
        <div class="gap-item">
          <div style="display:flex; align-items:center; gap:0.85rem;">
            <span style="font-family:var(--font-mono); font-size:1.1rem; font-weight:800; color:var(--neon-indigo);">#${idx + 1}</span>
            <div>
              <strong style="font-size:1rem; color:#ffffff;">${item.skill}</strong>
              <div style="font-size:0.78rem; color:#94a3b8;">
                Required in ${item.freq} of your top target roles
              </div>
            </div>
          </div>
          <button class="btn btn-cyber-primary" style="padding:0.4rem 0.9rem; font-size:0.78rem;" onclick="markSkillAsLearned('${item.skill}')">
            ✅ Mark Learned
          </button>
        </div>
      `).join("");
    }
  }

  const ctx = document.getElementById("skillGapChart")?.getContext("2d");
  if (ctx && sortedGaps.length > 0) {
    if (gapChartInstance) gapChartInstance.destroy();
    gapChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedGaps.map(g => g.skill),
        datasets: [{
          label: "Frequency in Target Roles",
          data: sortedGaps.map(g => g.freq),
          backgroundColor: "#6366f1",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, color: "#94a3b8" },
            grid: { color: "rgba(255,255,255,0.05)" }
          },
          x: {
            ticks: { color: "#cbd5e1" },
            grid: { display: false }
          }
        }
      }
    });
  }
}

function markSkillAsLearned(skill) {
  userSkills.add(skill);
  const cb = document.querySelector(`.skill-check-tag input[value="${skill}"]`);
  if (cb) cb.checked = true;

  showToast(`⚡ Skill "${skill}" mastered! Compatibility updated.`);
  recalculateAndRender();
  renderGapReport();
}

function showToast(msg) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  toast.querySelector("span").textContent = msg;
  toast.style.display = "flex";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}
