(() => {
  const studies = window.portfolioStudies;
  const dialog = document.getElementById('study-dialog');
  const viewer = { id: null, step: 0, trigger: null };
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const locale = () => document.documentElement.lang === 'en' ? 'en' : 'fr';
  const text = (value, language = locale()) => value[language === 'fr' ? 0 : 1];
  const labels = () => window.portfolio[locale()];

  function preview(id, language) {
    const study = studies[id];
    if (!study) return '';
    const title = text(study.title, language);
    const label = window.portfolio[language].studyOpen;
    const media = study.cover
      ? `<img src="${escape(study.cover.src)}" alt="${escape(text(study.cover.alt, language))}" width="${study.cover.width}" height="${study.cover.height}" loading="lazy" decoding="async">`
      : `<div class="backend-preview" aria-hidden="true"><span>API REST</span><span>Services</span><span>PostgreSQL</span></div>`;
    return `<button class="study-preview" data-study="${escape(id)}" aria-haspopup="dialog" aria-controls="study-dialog" aria-label="${escape(label + ' : ' + title)}"><span class="preview-frame">${media}</span><span class="preview-action">${escape(label)}<span aria-hidden="true">↗</span></span></button>`;
  }

  function mediaFigure(media) {
    const caption = text(media.caption);
    const content = media.type === 'video'
      ? `<video controls playsinline preload="none" poster="${escape(media.poster)}" width="${media.width}" height="${media.height}" aria-label="${escape(text(media.alt))}"><source src="${escape(media.src)}" type="video/mp4"></video>`
      : `<a href="${escape(media.src)}" target="_blank" rel="noopener" aria-label="${escape(labels().studyZoom + ' : ' + caption)}"><img src="${escape(media.src)}" alt="${escape(text(media.alt))}" width="${media.width}" height="${media.height}" decoding="async"></a>`;
    return `<figure class="study-figure"><div class="study-media-frame">${content}</div><figcaption>${escape(caption)}</figcaption></figure>`;
  }

  function stepMarkup(study) {
    const step = study.steps[viewer.step];
    return `<section class="study-step" aria-labelledby="step-title"><p class="study-counter">${escape(labels().studyStep)} ${String(viewer.step + 1).padStart(2, '0')} / ${String(study.steps.length).padStart(2, '0')}</p><h3 id="step-title" tabindex="-1">${escape(text(step.title))}</h3><p class="step-description">${escape(text(step.body))}</p>${step.blocks?.length ? `<ol class="method-blocks">${step.blocks.map((block, i) => `<li><span class="method-number">${String(i + 1).padStart(2, '0')}</span><span>${escape(text(block))}</span></li>`).join('')}</ol>` : ''}${step.media?.length ? `<div class="study-media-grid ${step.media.length === 1 ? 'single-media' : ''} ${step.media.length > 4 ? 'sequence-media' : ''}">${step.media.map(mediaFigure).join('')}</div>` : ''}<div class="study-paging"><button class="button secondary" data-step="${viewer.step - 1}" ${viewer.step === 0 ? 'disabled' : ''}><span aria-hidden="true">←</span> ${escape(labels().studyPrevious)}</button><span>${viewer.step + 1} / ${study.steps.length}</span><button class="button secondary" data-step="${viewer.step + 1}" ${viewer.step === study.steps.length - 1 ? 'disabled' : ''}>${escape(labels().studyNext)} <span aria-hidden="true">→</span></button></div></section>`;
  }

  function pauseMedia() {
    dialog.querySelectorAll('video').forEach(video => video.pause());
  }

  function renderViewer() {
    pauseMedia();
    const study = studies[viewer.id];
    dialog.innerHTML = `<div class="study-shell"><header class="study-header"><div><p class="kicker">${locale() === 'fr' ? 'LE PROJET EN ÉTAPES' : 'THE PROJECT, STEP BY STEP'}</p><h2 id="study-title">${escape(text(study.title))}</h2><p id="study-intro">${escape(text(study.intro))}</p></div><button class="study-close" data-study-close aria-label="${escape(labels().studyClose)}" autofocus><span aria-hidden="true">×</span></button></header><dl class="study-stats">${study.stats.map(stat => `<div><dt>${escape(text(stat.label))}</dt><dd>${escape(stat.value)}</dd></div>`).join('')}</dl><div class="study-layout"><nav class="study-step-nav" aria-label="${escape(labels().studyOpen)}">${study.steps.map((step, i) => `<button data-step="${i}" ${i === viewer.step ? 'aria-current="step"' : ''}><span>${String(i + 1).padStart(2, '0')}</span>${escape(text(step.title))}</button>`).join('')}</nav><div id="study-step-content">${stepMarkup(study)}</div></div><details class="study-annex"><summary>${escape(labels().studyAnnex)}</summary><div class="annex-links">${study.annex.map(link => `<a href="${escape(link.href)}" target="_blank" rel="noopener">${escape(text(link.label))}<span aria-hidden="true">↗</span></a>`).join('')}</div></details></div>`;
  }

  function open(id, trigger) {
    if (!studies[id]) return;
    viewer.id = id;
    viewer.step = 0;
    viewer.trigger = trigger;
    renderViewer();
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('study-open');
  }

  function selectStep(number, focusHeading) {
    const study = studies[viewer.id];
    if (number < 0 || number >= study.steps.length || number === viewer.step) return;
    pauseMedia();
    viewer.step = number;
    dialog.querySelector('#study-step-content').innerHTML = stepMarkup(study);
    dialog.querySelectorAll('.study-step-nav button').forEach(button => {
      if (Number(button.dataset.step) === number) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    if (focusHeading) dialog.querySelector('#step-title').focus({ preventScroll: true });
    dialog.querySelector('#step-title').scrollIntoView({ block: 'nearest' });
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-study]');
    if (trigger) open(trigger.dataset.study, trigger);
  });
  dialog.addEventListener('click', event => {
    if (event.target.closest('[data-study-close]')) dialog.close();
    const button = event.target.closest('[data-step]');
    if (button && !button.disabled) selectStep(Number(button.dataset.step), Boolean(button.closest('.study-paging')));
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    pauseMedia();
    document.body.classList.remove('study-open');
    if (viewer.trigger?.isConnected) viewer.trigger.focus({ preventScroll: true });
  });
  window.caseStudies = { preview, open, refresh: () => { if (dialog.open) renderViewer(); } };
})();
