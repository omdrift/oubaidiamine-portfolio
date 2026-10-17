# Amine Oubaidi · AI engineering portfolio

Bilingual French/English static portfolio: five featured projects, research and industry experience, project media, reports and a downloadable CV.

The homepage pairs a full-width flagship project with four complementary case studies. Cards use three technology tags and keep the detailed contribution, methodology and resources in dialogs. Existing screenshots and model outputs are distinguished from pipeline diagrams; plume animations start only on request. The header keeps the CV accessible on mobile.

## Project structure

- `amine-portfolio/index.html`: page structure and contact / CV links.
- `amine-portfolio/data.js`: translated copy, project descriptions and skills.
- `amine-portfolio/app.js`: rendering, search, filters, featured-project toggle and project dialogs.
- `amine-portfolio/studies.js` and `case-studies.js`: visual case studies.
- `amine-portfolio/style.css`: responsive light / dark styling.
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

Descriptions distinguish implemented features from planned work. The CareerPilot case study describes its current `develop` MVP; its application repository remains private. Update the downloadable CV and the corresponding text together when the professional profile changes.

`featuredProjects` controls the curated selection; optional `cardTags` chooses the three homepage tags without shortening the detailed stack. Keep image captions accurate when replacing project media.
