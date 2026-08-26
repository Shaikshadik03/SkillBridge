# 🎓 SkillBridge — Skill-to-Internship Matching & Skill Gap Analysis Portal

[![SIH 2026](https://img.shields.io/badge/SIH_2026-Problem_ID:_SIH26044-blue.svg)](https://sih.gov.in)
[![Ministry](https://img.shields.io/badge/Ministry-Ministry_of_Ayush_%2F_MSDE-orange.svg)](#)
[![Status](https://img.shields.io/badge/Prototype-Functional_Demo-brightgreen.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](#)

> **"Know Your Fit, Close Your Gap"**  
> An intelligent career tech platform that calculates a student's real-time match percentage against internship roles and generates a personalized skill-gap roadmap.

---

## 📌 Executive Summary

* **Problem Statement:** College students apply blindly to dozens of internships without knowing why they get rejected or what specific skills they lack for their dream roles.
* **Our Solution:** SkillBridge provides a **live skill-compatibility scoring engine** and an **aggregate Skill Gap Frequency report** showing students exactly which skills to learn next to maximize their placement odds.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    A[👨‍🎓 Student Profile] -->|Selects Skills & Domain| B[⚙️ Compatibility Calculator]
    C[(📁 Internship Dataset - JSON)] --> B
    B -->|Computes Jaccard / Overlap Score| D[🎯 Ranked Internship Matches]
    D -->|Green: Acquired Skills / Red: Missing Skills| E[📄 Match Detail Card]
    D -->|Aggregates Missing Skills| F[📊 Skill Gap Frequency Report (Chart.js)]
    F -->|'Mark as Learned' Loop| A
```

---

## ⚡ Live Match Percentage & Gap Formula

### 1. Match Percentage Formula:
$$\text{Match \%} = \left( \frac{\text{Count of Student's Matching Skills}}{\text{Total Required Skills for that Role}} \right) \times 100$$

* **🟢 High Match (80%+):** Ready to apply now!
* **🟡 Moderate Match (50–79%):** Minor skill gaps to bridge.
* **🔴 High Gap (<50%):** Requires foundational learning.

### 2. Skill Gap Aggregator:
The system extracts missing skills from the top matched roles and counts their occurrences:
$$\text{Priority Score}(\text{Skill } X) = \sum \text{Frequency of } X \text{ across top matched roles}$$
Rendered as an interactive bar chart so students know what high-ROI skill to learn first.

---

## 🌟 Core Features

- [x] **Interactive Multi-Category Skill Selector:** Programming, Web Tech, Data Science, Soft Skills, Design.
- [x] **Real-time Match Badges:** Dynamic color-coded progress rings that recalculate instantly as skills are checked.
- [x] **Visual Skill Gap Breakdown:** Required skills tagged in **Green (Possessed)** vs **Red (Missing)**.
- [x] **Prioritized 'Skills to Learn Next' Chart:** Powered by Chart.js.
- [x] **Dynamic Progress Tracker:** "Mark as Learned" button that recalculates matches on the fly.
- [x] **Pre-loaded Industry Data:** 15+ curated internships from Infosys, TCS, Zoho, Freshworks, and fast-growing startups.

---

## 🛠️ Tech Stack & Justification

| Layer | Technology | Why Chosen? |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, Modern ES6 JavaScript | Instant responsive client-side reactive state management. |
| **Theme & UI** | Blue & Indigo Professional Design | Clean, distraction-free "career-ready" aesthetic. |
| **Data Engine** | `internships.json` + LocalStorage | Keeps student profile state persistent across browser refreshes. |
| **Analytics** | Chart.js | Visual bar charts for skill gap frequency distribution. |

---

## 🚀 Quick Start Guide

```bash
# 1. Clone the repository
git clone https://github.com/Shaikshadik03/SkillBridge.git

# 2. Open the project folder
cd SkillBridge

# 3. Run with any local server or open directly
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## 🎤 2-Minute Presentation Pitch for Judges

<details>
<summary><b>Click to expand speaking points for presentation</b></summary>

1. **Hook:** "Students send out hundreds of resumes blindly, receiving zero feedback on why they were rejected."
2. **Problem:** "Standard job portals list requirements as a wall of text without telling the candidate their actual compatibility score."
3. **Solution:** "SkillBridge turns job hunting into an actionable learning roadmap."
4. **Demo Moment:** "Watch this: As I select `Python` and `SQL`, my match for the Data Analyst role at Zoho jumps from 25% to 75%. And look at the Gap Report below — it tells me that learning `Power BI` will unlock 4 more opportunities."
5. **Future Scope:** "Direct integration with Coursera/YouTube APIs for recommended tutorials and college placement cell aggregate dashboards."
</details>
