# Amine Oubaidi · AI engineering portfolio

Bilingual French/English static portfolio: five featured projects, research and industry experience, project media, reports and a downloadable CV.

The homepage opens with a research note on industrial plume forecasting. A curated project grid, linked skills and experience come next. The references section links to the two signed academic letters, with the author, project and issue date. The full project list and filtered results use four projects per page, with synchronized pagination above and below the cards. Cards use three technology tags and link to case studies and supporting material. The header keeps the CV accessible on mobile.

Visual case studies keep their close control and previous/next navigation outside the scrolling content. A step selector provides direct access to every step, including on mobile.

## Project structure

- `amine-portfolio/index.html`: page structure and contact / CV links.
- `amine-portfolio/data.js`: translated copy, project descriptions and skills.
- `amine-portfolio/app.js`: rendering, search, filters, featured-project toggle and project dialogs.
- `amine-portfolio/studies.js` and `case-studies.js`: visual case studies.
- `amine-portfolio/style.css`: responsive light / dark styling.
- `amine-portfolio/presentation-panaches*.html` and `plume.css`: bilingual plume case study, diagrams and method details.
- `amine-portfolio/documents/` and `images/`: published supporting documents and media.

## Deployment

The existing public portfolio is hosted at <https://oubaidiamine-portfolio.netlify.app/>.

For a Netlify deployment connected to this repository, `netlify.toml` sets the publish directory to `amine-portfolio`; no build command or dependency installation is required. Connecting the Git repository is a separate Netlify account action.

For a manual update, upload the **contents of `amine-portfolio/`** to the existing site's production deploy area. Keep the images, documents and JavaScript files together with `index.html`.

## Local inspection

From the repository root:

```bash
python3 -m http.server 8000 --directory amine-portfolio
```

Open <http://localhost:8000/>. Check both languages, mobile layouts, project filters, dialogs, theme switching and CV downloads after changes.

## Content maintenance

Descriptions distinguish implemented features from planned work. The CareerPilot card and case study present the documented final product vision, explicitly labelled as a target version in development in both languages. They describe the intended user journey, architecture and acceptance criteria rather than the current MVP. Source documents: `README.md`, `docs/PLAN_PROJET.md` and `docs/PLAN_PREMIER_DEPLOIEMENT.md` from the application’s `feature/production-onboarding` branch at `f7dee66314efa3d8d682d3ccd5c3c1b413fb7460`. Its application repository remains private. Do not turn target capabilities into delivered claims or add unverified performance results. Update the downloadable CV and the corresponding text together when the professional profile changes.

`featuredProjects` controls the curated selection; optional `cardTags` chooses the three homepage tags without shortening the detailed stack. Keep image captions accurate when replacing project media.

## Master’s multi-object tracking project

The `multi-object-tracking` entry appears in the full project list and the Vision & video filter, outside the curated five. Its French/English case study describes adaptive-background segmentation, morphology, Kalman prediction and Hungarian assignment. The original 13-page presentation is published as `amine-portfolio/documents/presentation-master-multi-object-tracking.pdf`; `images/multi-object-tracking/tracking-result.jpeg` is extracted unchanged from page 11. The visual walkthrough explicitly distinguishes this static output from a temporal evaluation. No source code, full video, tracking accuracy or speed benchmark is claimed. Re-identification, MOG2 and optical-flow fusion remain proposed improvements. The exact academic year is not established by the slides; the date field is labelled “Master”.

## Industrial Plume Forecasting

The plume project and its French/English pages describe the 36-frame, 5-observation / 15-future protocol. The illustrated walkthrough covers per-frame CLIPSeg, the D4 / D8 / D256 VQGAN comparison, autoregressive generation, and evaluation of uniform Flow, weighted Flow, persistence and Farnebäck optical flow. The two held-out splits separate new dates from new views. The case study links to the protocol, experiment matrix and recorded software verification. The consolidated forecasting benchmark is pending. The source still is the first frame of RISE clip 6, which is included as a CC0 source-video example.

## Academic recommendations

- Jean-Christophe Burie, 23 October 2026, for the 2025 multi-mouse tracking internship. The existing `documents/recommandation-l3i-2025.pdf` URL refers to the internship year.
- Damien Muselet, 6 November 2026, for the Master's research project on plume forecasting. The letter is at `documents/recommandation-damien-muselet-2026.pdf`.
