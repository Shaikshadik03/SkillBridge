# 🎤 SkillBridge — Teammate Explanation & Pitch Guide

Use this guide to explain the project in **2 minutes** to judges or teammates with zero confusion.

---

## ⏱️ 2-Minute Judge Pitch Script (Word-for-Word)

> **"Hello respected judges, we are presenting SkillBridge for Problem Statement SIH26044 under the Ministry of Ayush / MSDE.**
>
> **The Problem:** Indian college students face massive rejection rates when applying to internships because they apply blindly without knowing how their skills match up against real industry requirements. Existing portals like LinkedIn or Internshala show long lists of skills but never tell the student their **actual compatibility score** or what to learn next.
>
> **Our Solution:** **SkillBridge** is an intelligent skill mapping and gap analysis platform. It calculates a student's real-time match percentage against live internship listings and generates an automated, prioritized learning roadmap.
>
> **Demo Walkthrough:**
> 1. In our **Find Match** interface, when a student toggles skills like *Python* and *SQL*, our matching engine computes the exact set-overlap against industry requirements in real-time.
> 2. Every role card displays an instant **circular compatibility score (e.g. 80% High Match)** and breaks down requirements with **Green badges for possessed skills** and **Red badges for missing skills**.
> 3. Click on the **Skill Gap Roadmap**: The system aggregates missing skills across top dream roles and prioritizes them by frequency using an interactive **Chart.js bar chart**.
> 4. The student can click **'Mark as Learned'**, which dynamically updates their profile and recalculates their placement readiness on the fly!
>
> **Impact:** SkillBridge replaces blind rejection with a clear, actionable skill-building pathway for every Indian student. Thank you!"

---

## 🛠️ How to Explain the Tech Stack

| Question | What to Say |
| :--- | :--- |
| **"What tech stack is SkillBridge built on?"** | "It is built with **HTML5, Custom Modern CSS, and reactive ES6 JavaScript**, paired with **Chart.js** for analytics and structured JSON competency taxonomies with LocalStorage state persistence." |
| **"What is the matching formula?"** | "We calculate compatibility using set-overlap math: $\text{Match \%} = \frac{\text{matching skills count}}{\text{total required skills for role}} \times 100$. It executes client-side with zero latency." |
| **"How does the gap aggregator work?"** | "It inspects the top 5 ranked matches, collects all missing skill tags, computes their occurrence frequency, and sorts them to show the highest ROI skills to learn first." |

---

## ❓ Probable Judge Questions & Ready Answers

**Q1: How do you keep internship data up to date?**
> *Answer:* "In production, we connect via API integrations with partner job portals (e.g. Internshala, LinkedIn API) and college placement cell databases to ingest fresh role requirements weekly."

**Q2: Can universities use this for their curriculum planning?**
> *Answer:* "Yes! Our institutional analytics mode aggregates skill gap data across the entire college batch, allowing professors and placement cells to identify missing competencies and conduct targeted workshops."

**Q3: How do you help students actually learn the missing skills?**
> *Answer:* "Our roadmap links each missing skill to free, high-quality learning resources like NPTEL courses, Swayam portals, and top YouTube tutorials."
