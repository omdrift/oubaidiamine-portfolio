(() => {
  const data = window.portfolio;
  const studies = window.portfolioStudies;
  const byId = new Map(data.projects.map(project => [project.id, project]));
  const $ = id => document.getElementById(id);
  const home = document.body.dataset.page === 'home';
  const params = new URLSearchParams(location.search);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const normalise = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const copy = {
    fr: {
      skip: 'Aller au contenu',
      role: 'Ingénieur IA junior · Vision et deep learning',
      bio: 'Je travaille sur l’analyse vidéo et l’évaluation des modèles. Au L3i, j’ai adapté un détecteur de points anatomiques pour suivre des souris en vidéo. Chez Enedis, j’ai automatisé le contrôle de documents.',
      email: 'Email',
      projects: 'Projets',
      experience: 'Parcours',
      references: 'Recommandations',
      skills: 'Compétences',
      education: 'Formation',
      availability: 'Disponibilité',
      degree: 'Master Ingénierie des Données · La Rochelle Université, 2026',
      location: 'Île-de-France · CDI junior ou doctorat en deep learning',
      flowMeta: 'Projet de recherche · Master 2, 2026',
      flowTitle: 'Prévision de panaches industriels',
      flowLead: 'Je pars de cinq images d’un panache pour prévoir les quinze suivantes. L’étude compare plusieurs représentations VQGAN et mesure si celles qui reconstruisent bien les images aident aussi à prévoir leur évolution.',
      flowStatus: 'Protocole et vérifications publiés. Le comparatif final de prévision reste à établir.',
      flowDiagrams: 'Méthode et schémas',
      flowAlt: 'Panache au-dessus d’un site industriel dans le clip RISE nº 6',
      flowCaption: 'Image source · clip RISE nº 6',
      source: 'Code source',
      otherProjects: 'Autres projets',
      search: 'Filtrer par titre ou outil',
      searchPlaceholder: 'Ex. PyTorch, RAG…',
      results: 'projets',
      top: 'Haut de page ↑',
      backProjects: 'Tous les projets',
      backExperience: 'Retour au parcours',
      figures: 'Méthodes et visuels',
      documents: 'Documents et liens',
      missing: 'Projet introuvable',
    },
    en: {
      skip: 'Skip to content',
      role: 'Junior AI engineer · Computer vision and deep learning',
      bio: 'I work on video analysis and model evaluation. At L3i, I adapted a keypoint detector to track mice in video. At Enedis, I automated document checks.',
      email: 'Email',
      projects: 'Projects',
      experience: 'Experience',
      references: 'References',
      skills: 'Skills',
      education: 'Education',
      availability: 'Availability',
      degree: 'MSc in Data Engineering · La Rochelle Université, 2026',
      location: 'Paris region · Junior permanent role or deep learning PhD',
      flowMeta: 'MSc research project · 2026',
      flowTitle: 'Industrial Plume Forecasting',
      flowLead: 'I start with five frames of a plume and forecast the next fifteen. The study compares VQGAN representations to see whether those that reconstruct images well also help predict what happens next.',
      flowStatus: 'Protocol and verification published. The final forecasting benchmark is pending.',
      flowDiagrams: 'Method and diagrams',
      flowAlt: 'Smoke above an industrial site in RISE clip 6',
      flowCaption: 'Source frame · RISE clip 6',
      source: 'Source code',
      otherProjects: 'Other projects',
      search: 'Filter by title or tool',
      searchPlaceholder: 'E.g. PyTorch, RAG…',
      results: 'projects',
      top: 'Back to top ↑',
      backProjects: 'All projects',
      backExperience: 'Back to experience',
      figures: 'Methods and figures',
      documents: 'Documents and links',
      missing: 'Project not found',
    }
  };

  let lang = 'fr';
  let dark = false;
  try {
    lang = localStorage.getItem('ao-lang') === 'en' ? 'en' : 'fr';
    dark = localStorage.getItem('ao-theme') === 'dark';
  } catch {}
  const ui = () => copy[lang];
  const labels = () => data[lang];
  const local = value => Array.isArray(value) ? value[lang === 'fr' ? 0 : 1] : value;
  const phrase = value => escape(local(value));
  const projectHref = project => local(project.presentation) || `projet.html?id=${encodeURIComponent(project.id)}`;
  const experienceHref = id => `projet.html?experience=${encodeURIComponent(id)}`;
  const projectLink = project => `<a href="${escape(projectHref(project))}">${phrase(project.title)}</a>`;

  function documentLinks(items = []) {
    const unique = new Map(items.filter(item => item.href).map(item => [local(item.href), item]));
    if (!unique.size) return '';
    return `<ul class="inline-links document-links" aria-label="${escape(ui().documents)}">${Array.from(unique, ([href, item]) => {
      const label = local(item.label) || labels().documentLabels[item.kind];
      const format = item.format || (href.endsWith('.pdf') ? 'PDF' : '');
      const suffix = format && !label.toUpperCase().includes(format.toUpperCase()) ? ` <small>${escape(format)}</small>` : '';
      return `<li><a href="${escape(href)}">${escape(label)}${suffix}</a></li>`;
    }).join('')}</ul>`;
  }

  function searchProjects() {
    const query = normalise($('search').value.trim());
    let matches = 0;
    for (const row of $('project-list').children) {
      row.hidden = !row.dataset.search.includes(query);
      if (!row.hidden) matches++;
    }
    $('search-result').hidden = !query;
    $('search-result').textContent = matches ? `${matches} ${ui().results}` : labels().empty;
  }

  function renderHome() {
    const flow = byId.get('flow');
    $('flow-link').href = projectHref(flow);
    $('flow-method').href = `${projectHref(flow)}#flow`;
    $('profile-meta').innerHTML = [[ui().education, ui().degree], [ui().availability, ui().location]]
      .map(([label, value]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('');
    const featured = data.featuredProjects.filter(id => id !== 'flow');
    const order = ['mice', ...featured.filter(id => id !== 'mice')];
    const others = [...order.map(id => byId.get(id)), ...data.projects.filter(p => p.id !== 'flow' && !order.includes(p.id))];
    $('project-list').innerHTML = others.map(project => {
      const title = `<h4>${projectLink(project)}</h4>`;
      const searchText = normalise([project.title, project.summary, project.context, project.stack, project.sections?.flatMap(section => section.items)].flat(Infinity).join(' '));
      return `<li class="project-row" id="project-${escape(project.id)}" data-search="${escape(searchText)}">
        <div>${title}<p>${phrase(project.summary)}</p></div>
        <span class="entry-meta">${phrase(project.context)} · ${escape(project.year)}</span>
      </li>`;
    }).join('');
    $('search').placeholder = ui().searchPlaceholder;
    searchProjects();

    $('experience-list').innerHTML = labels().experience.map(([year, name, role, place, summary, id]) => `
      <article class="experience-entry" id="experience-${escape(id)}">
        <p class="entry-meta">${escape(year)}</p>
        <div><h3><a href="${experienceHref(id)}">${escape(role)}</a></h3>
        <p class="entry-meta">${escape(name)} · ${escape(place)}</p>
        <p>${escape(summary)}</p>${documentLinks(data.experienceWork[id].documents)}</div>
      </article>`).join('');
    $('education').innerHTML = `<h3>${escape(ui().education)}</h3><ul>${labels().education.map(([date, degree, institution, description]) => `<li><strong>${escape(degree)}</strong><span>${escape(institution)} · ${escape(date)}</span><span>${escape(description)}</span></li>`).join('')}</ul>`;
    $('references-list').innerHTML = data.recommendations.map(letter => `
      <li><div><h3><a href="${escape(letter.href)}" type="application/pdf" hreflang="fr">${escape(letter.author)} <small>PDF</small></a></h3>
      <p>${phrase(letter.context)}</p></div><time class="entry-meta" datetime="${escape(letter.date)}">${phrase(letter.displayDate)}</time></li>`).join('');
    $('skills-list').innerHTML = data.skills.map(skill => `
      <div><dt>${phrase(skill.title)}</dt><dd><p>${phrase(skill.note)}</p>
      <p class="skill-tools">${skill.items.map(phrase).join(' · ')}</p>
      <ul class="inline-links">${skill.projects.map(id => `<li>${projectLink(byId.get(id))}</li>`).join('')}</ul></dd></div>`).join('') + `
      <div><dt>${escape(labels().certTitle)}</dt><dd>${data.certs.map(escape).join(' · ')}</dd></div>
      <div><dt>${escape(labels().languagesTitle)}</dt><dd>${escape(labels().languageBody)}</dd></div>`;
  }

  function mediaFigure(media) {
    const src = escape(media.src);
    const description = phrase(media.alt || media.caption);
    const dimensions = `width="${escape(media.width)}" height="${escape(media.height)}"`;
    const content = media.type === 'video'
      ? `<video controls playsinline preload="none" poster="${escape(media.poster)}" ${dimensions} aria-label="${description}"><source src="${src}" type="video/mp4"></video>`
      : `<a href="${src}"><img src="${src}" ${dimensions} alt="${description}" loading="lazy" decoding="async"></a>`;
    return `<figure>${content}<figcaption>${phrase(media.caption)}</figcaption></figure>`;
  }

  function studySections(study) {
    if (!study) return '';
    return `<section class="detail-section" id="figures"><h2>${escape(ui().figures)}</h2>
      ${study.steps.map(step => `<section class="detail-step"><h3>${phrase(step.title)}</h3>
        <p>${phrase(step.body)}</p>
        ${step.blocks?.length ? `<ul>${step.blocks.map(block => `<li>${phrase(block)}</li>`).join('')}</ul>` : ''}
        ${step.media?.length ? `<div class="detail-media">${step.media.map(mediaFigure).join('')}</div>` : ''}
      </section>`).join('')}
      </section>`;
  }

  function stack(items) {
    return items?.length ? `<p class="detail-tools">${items.map(phrase).join(' · ')}</p>` : '';
  }

  function facts(items) {
    return items?.length ? `<dl class="detail-facts">${items.map(item => `<div><dt>${phrase(item.label)}</dt><dd>${escape(item.value)}</dd></div>`).join('')}</dl>` : '';
  }

  function projectDetail(project) {
    const study = studies[project.id];
    const docs = [...(project.documents || []), ...(study?.annex || [])];
    if (project.repo) docs.unshift({href: project.repo, label: project.repoType === 'report' ? labels().report : ui().source});
    if (project.presentation) docs.unshift({href: project.presentation, label: ui().flowDiagrams});
    return `
      <p class="detail-back"><a href="index.html#project-${escape(project.id)}">← ${escape(ui().backProjects)}</a></p>
      <header class="detail-intro"><p class="entry-meta">${phrase(project.context)} · ${escape(project.year)}</p>
      <h1>${phrase(project.title)}</h1><p class="detail-lead">${phrase(project.summary)}</p>${stack(project.stack)}${facts(project.facts || study?.stats)}
      ${documentLinks(docs)}</header>
      <section class="detail-section"><h2>${escape(labels().contribution)}</h2><p>${phrase(project.contribution)}</p><p>${phrase(project.detail)}</p></section>
      ${project.problem ? `<section class="detail-section"><h2>${escape(labels().projectOverview)}</h2><p>${phrase(project.problem)}</p></section>` : ''}
      ${(project.sections || []).map(section => `<section class="detail-section"><h2>${phrase(section.title)}</h2>${section.items.map(item => `<p>${phrase(item)}</p>`).join('')}</section>`).join('')}
      ${studySections(study)}`;
  }

  function experienceDetail([year, name, role, place, summary, id]) {
    const work = data.experienceWork[id];
    const study = studies[id];
    return `
      <p class="detail-back"><a href="index.html#experience-${escape(id)}">← ${escape(ui().backExperience)}</a></p>
      <header class="detail-intro"><p class="entry-meta">${escape(name)} · ${escape(place)} · ${escape(year)}</p>
      <h1>${escape(role)}</h1><p class="detail-lead">${escape(summary)}</p>${facts(study?.stats)}
      ${documentLinks([...(work.documents || []), ...(study?.annex || [])])}</header>
      ${work.items.map(item => `<section class="detail-section"><h2>${phrase(item.title)}</h2>
        <p>${phrase(item.contribution)}</p><p>${phrase(item.detail)}</p>${stack(item.stack)}
        ${item.repo ? documentLinks([{href:item.repo,label:item.repoType === 'report' ? labels().report : ui().source}]) : ''}</section>`).join('')}
      ${studySections(study)}`;
  }

  function renderDetail() {
    const project = byId.get(params.get('id'));
    const experience = labels().experience.find(entry => entry[5] === params.get('experience'));
    $('detail-content').innerHTML = project ? projectDetail(project) : experience ? experienceDetail(experience)
      : `<h1>${escape(ui().missing)}</h1><p><a href="index.html#projects">${escape(ui().backProjects)}</a></p>`;
    document.title = `${project ? local(project.title) : experience?.[2] || ui().missing} — Amine Oubaidi`;
  }

  function applyTheme() {
    document.documentElement.classList.toggle('dark', dark);
    $('theme').setAttribute('aria-pressed', String(dark));
    $('theme').setAttribute('aria-label', labels().switchTheme);
    document.querySelector('meta[name="theme-color"]').content = dark ? '#1e2323' : '#fcfaf6';
  }

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-copy]').forEach(node => { node.textContent = ui()[node.dataset.copy]; });
    document.querySelectorAll('[data-alt]').forEach(node => { node.alt = ui()[node.dataset.alt]; });
    $('language').textContent = lang === 'fr' ? 'EN' : 'FR';
    $('language').setAttribute('aria-label', lang === 'fr' ? 'Read in English' : 'Lire en français');
    if (home) {
      document.title = lang === 'fr' ? 'Amine Oubaidi — Ingénieur IA' : 'Amine Oubaidi — AI Engineer';
      renderHome();
    } else {
      renderDetail();
    }
    applyTheme();
  }

  $('language').addEventListener('click', () => {
    lang = lang === 'fr' ? 'en' : 'fr';
    try { localStorage.setItem('ao-lang', lang); } catch {}
    render();
  });
  $('theme').addEventListener('click', () => {
    dark = !dark;
    try { localStorage.setItem('ao-theme', dark ? 'dark' : 'light'); } catch {}
    applyTheme();
  });
  if (home) $('search').addEventListener('input', searchProjects);
  render();
})();
