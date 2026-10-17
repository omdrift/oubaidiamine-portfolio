(() => {
  const data = window.portfolio;
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalise = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const state = {lang:'fr', category:0, query:'', project:null, trigger:null, dark:false, showAll:false, animateFlow:false, page:1};
  const pageSize=4;
  try {state.lang=localStorage.getItem('ao-lang')==='en'?'en':'fr';state.dark=localStorage.getItem('ao-theme')==='dark';} catch {}
  const i = () => state.lang==='fr'?0:1;
  const t = () => data[state.lang];
  const text = value => Array.isArray(value)?value[i()]:value;
  const tags = items => `<div class="tags">${items.map(s=>`<span>${esc(text(s))}</span>`).join('')}</div>`;
  const facts = items => items?.length?`<dl class="project-facts">${items.map(f=>`<div><dt>${esc(text(f.label))}</dt><dd>${esc(f.value)}</dd></div>`).join('')}</dl>`:'';
  function documents(items=[]) {
    return items.length?`<div class="document-links">${items.filter(x=>x.href).map(x=>`<a class="document-link" href="${esc(x.href)}" target="_blank" rel="noopener"><span>${esc(text(x.label)||t().documentLabels[x.kind])}</span><span>${esc(x.format||'PDF')} ↗</span>${x.caption?`<small>${esc(text(x.caption))}</small>`:''}</a>`).join('')}</div>`:'';
  }
  function graphic(p) {
    if(p.id==='flow')return `<span class="flow-comparison">${[
      {still:'flow-real-11.png',motion:'real-sequence.gif',label:t().realSample},
      {still:'flow-predicted-11.png',motion:'generated-sequence.gif',label:t().generatedSample}
    ].map(s=>`<span class="flow-sample"><span class="sample-label">${esc(s.label)}</span><img src="images/flow/${esc(state.animateFlow?s.motion:s.still)}" data-flow-still="images/flow/${esc(s.still)}" data-flow-motion="images/flow/${esc(s.motion)}" alt="${esc(s.label)}" width="267" height="267" decoding="async"></span>`).join('')}</span>`;
    const cover = p.id==='face'
      ? {src:'images/face/face-app.png',alt:['Interface du projet MLOps : filtres et images par attribut','MLOps project interface: attribute filters and images'],width:1280,height:672}
      : p.id==='mice'
        ? {src:'images/mice/mice-tracking.png',alt:['Détection des points anatomiques de deux souris','Keypoint detections on two mice'],width:887,height:774}
        : window.portfolioStudies[p.id]?.cover;
    if(cover)return `<span class="project-image"><img src="${esc(cover.src)}" alt="${esc(text(cover.alt))}" width="${cover.width}" height="${cover.height}" loading="lazy" decoding="async"></span>`;
    if(p.id==='rag'||p.id==='cv-matcher') {
      const steps=p.id==='rag'
        ? [['Corpus PDF','PDF corpus'],['Index vectoriel','Vector index'],['LLM + API','LLM + API']]
        : [['Profil & offres','Profile & jobs'],['RAG & agents','RAG & agents'],['Candidatures','Applications']];
      return `<span class="project-graphic pipeline-graphic"><span class="graphic-caption">${esc(p.id==='rag'?t().ragDiagram:t().careerDiagram)}</span><span class="pipeline-nodes">${steps.map((label,n)=>`<span class="pipeline-node ${n===1?'node-accent':''}"><span class="node-number">0${n+1}</span><span>${esc(text(label))}</span></span>${n<2?'<span class="pipeline-arrow" aria-hidden="true">→</span>':''}`).join('')}</span><span class="pipeline-note">${esc(p.id==='rag'?t().ragDiagramNote:t().careerDiagramNote)}</span></span>`;
    }
    const labels = {
      maritime:[['Vidéo + IMU','Video + IMU'],['CNN / LSTM'],['Estimation du mouvement','Motion estimation']],
      hackathon:[['Texte & images','Text & images'],['VLM + LLM'],['XML structuré','Structured XML']],
      pdf:[['Annotations PDF'],['Extraction & contexte','Extraction & context'],['JSON / CSV']],
      xiatech:[['Événements','Events'],['Relations & provenance','Relations & provenance'],['Visualisation','Visualisation']]
    };
    return `<span class="project-graphic"><span class="graphic-caption">${esc(t().pipelineLabel)}</span><span class="graphic-nodes">${(labels[p.id]||[['API'],['Services'],['Data']]).map((x,n)=>`<span class="graphic-node ${n===1?'node-accent':''}">${esc(x[i()]||x[0])}</span>`).join('')}</span></span>`;
  }
  function card(p) {
    const code = p.repo ? `<a class="text-button project-source" href="${esc(p.repo)}" target="_blank" rel="noopener">${esc(p.repoType==='report'?t().reportShort:t().codeLink)} <span aria-hidden="true">↗</span></a>` : '';
    const caption=p.id==='flow'?(state.animateFlow?t().flowSequenceCaption:t().flowStillCaption):p.id==='face'?t().interfaceCaption:p.id==='mice'?t().trackingCaption:window.portfolioStudies[p.id]?.cover?t().projectVisualCaption:t().diagramCaption;
    return `<article class="project-card ${p.id==='flow'?'is-flagship':''}" id="project-${esc(p.id)}" data-id="${esc(p.id)}"><div class="project-media project-media--${esc(p.id)}"><button class="project-cover" data-project="${esc(p.id)}" aria-haspopup="dialog" aria-controls="project-dialog" aria-label="${esc(t().details+' : '+text(p.title))}">${graphic(p)}</button><div class="media-toolbar"><span class="media-caption" ${p.id==='flow'?'id="flow-caption"':''}>${esc(caption)}</span>${p.id==='flow'?`<button class="motion-toggle" data-toggle-flow aria-pressed="${state.animateFlow}">${esc(state.animateFlow?t().pauseFlow:t().animateFlow)}</button>`:''}</div></div><div class="project-card-body"><div class="project-meta"><span>${esc(text(p.context))}</span><span>${esc(p.year)}</span></div><p class="project-kind">${esc(p.id==='flow'?t().flagshipLabel:t().filters[p.cats[0]])}</p><h3><button data-project="${esc(p.id)}" aria-haspopup="dialog" aria-controls="project-dialog">${esc(text(p.title))}</button></h3><p class="project-summary">${esc(text(p.summary))}</p>${tags((p.cardTags||p.stack).slice(0,3))}<div class="project-actions"><button class="project-details" data-project="${esc(p.id)}" aria-haspopup="dialog" aria-controls="project-dialog">${esc(t().details)} <span aria-hidden="true">↗</span></button>${code}</div></div></article>`;
  }
  function updateFlowMotion() {
    document.querySelectorAll('[data-flow-still]').forEach(img=>{img.src=state.animateFlow?img.dataset.flowMotion:img.dataset.flowStill;});
    const button=document.querySelector('[data-toggle-flow]');
    button.setAttribute('aria-pressed',String(state.animateFlow));
    button.textContent=state.animateFlow?t().pauseFlow:t().animateFlow;
    $('flow-caption').textContent=state.animateFlow?t().flowSequenceCaption:t().flowStillCaption;
  }
  function renderPagination(pageCount) {
    const controls=`<button class="page-direction" data-project-page="${state.page-1}" aria-controls="project-grid" ${state.page===1?'disabled':''}><span aria-hidden="true">←</span><span>${esc(t().previousPage)}</span></button><div class="page-numbers">${Array.from({length:pageCount},(_,n)=>`<button data-project-page="${n+1}" aria-controls="project-grid" aria-label="${esc(t().pageLabel+' '+(n+1))}" ${state.page===n+1?'aria-current="page"':''}>${n+1}</button>`).join('')}</div><button class="page-direction" data-project-page="${state.page+1}" aria-controls="project-grid" ${state.page===pageCount?'disabled':''}><span>${esc(t().nextPage)}</span><span aria-hidden="true">→</span></button>`;
    for(const id of ['project-pagination-top','project-pagination-bottom']){
      const pager=$(id);pager.hidden=pageCount<2;pager.setAttribute('aria-label',t().paginationLabel);
      pager.innerHTML=pageCount>1?controls:'';
    }
  }
  function filterProjects() {
    const query=normalise(state.query.trim());
    const filtering=Boolean(state.category||query);
    const curated=!filtering&&!state.showAll;
    const matching=data.projects.filter(p=>{
      const corpus=normalise([p.title,p.summary,p.problem,p.contribution,p.detail,p.stack,p.context,...(p.sections||[]).flatMap(s=>[s.title,...s.items])].flat(Infinity).join(' '));
      return (!state.category||p.cats.includes(state.category))&&(!query||corpus.includes(query));
    });
    const results=curated?matching.filter(p=>data.featuredProjects.includes(p.id)):matching;
    const pageCount=curated?1:Math.max(1,Math.ceil(results.length/pageSize));
    state.page=Math.max(1,Math.min(state.page,pageCount));
    const offset=curated?0:(state.page-1)*pageSize;
    const visible=curated?results:results.slice(offset,offset+pageSize);
    const shown=new Set(visible.map(p=>p.id));
    for(const p of data.projects)$('project-'+p.id).hidden=!shown.has(p.id);
    $('project-grid').classList.toggle('featured-view',curated);
    $('result-count').textContent=curated?`${results.length} / ${data.projects.length} ${t().count}`:results.length?`${offset+1}–${offset+visible.length} ${t().rangeOf} ${results.length} ${t().count}`:`0 ${t().count}`;
    renderPagination(pageCount);
    $('empty').hidden=results.length>0;
    $('reset').hidden=!filtering;
    $('show-projects').hidden=filtering;
    $('show-projects').setAttribute('aria-expanded',String(state.showAll));
    $('show-projects').textContent=(state.showAll?t().showFeaturedProjects:t().showAllProjects).replace('{count}',data.projects.length);
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.filter)===state.category)));
    if($('project-flow').hidden&&state.animateFlow){state.animateFlow=false;updateFlowMotion();}
  }
  function focusResults() {
    const target=$('project-pagination-top').hidden?$('project-grid'):$('project-pagination-top');
    target.scrollIntoView({block:'start',behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    document.querySelector('.project-card:not([hidden]) h3 button')?.focus({preventScroll:true});
  }
  function updateBackToTop() {
    $('back-to-top').hidden=(window.scrollY||document.documentElement.scrollTop||0)<Math.max(320,(window.innerHeight||700)*.55);
  }
  function renderProjectDialog() {
    const p=data.projects.find(p=>p.id===state.project);if(!p)return;
    $('project-dialog').innerHTML=`<div class="project-dialog-shell"><header class="project-dialog-header"><div><p class="kicker">${esc(text(p.context))} / ${esc(p.year)}</p><h2 id="project-title">${esc(text(p.title))}</h2><p class="dialog-intro">${esc(text(p.summary))}</p>${p.deployment?`<p class="deployment-chip"><span class="status-dot"></span>${esc(text(p.deployment))}</p>`:''}</div><button class="dialog-close" data-project-close aria-label="${esc(t().projectClose)}" autofocus>×</button></header><div class="project-dialog-layout"><aside class="project-sidebar"><h3>${esc(t().tools)}</h3>${tags(p.stack)}${facts(p.facts)}${documents(p.documents)}${p.repo?`<a class="resource-link" href="${esc(p.repo)}" target="_blank" rel="noopener">${esc(p.repoType==='report'?t().report:t().repo)} ↗</a>`:''}${window.portfolioStudies[p.id]?`<button class="button secondary" data-open-study="${esc(p.id)}">${esc(t().studyOpen)} ↗</button>`:''}</aside><div class="project-story"><section><h3>${esc(t().projectOverview)}</h3><p>${esc(text(p.problem)||text(p.summary))}</p></section><section><h3>${esc(t().contribution)}</h3><p>${esc(text(p.contribution))}</p><p>${esc(text(p.detail))}</p></section>${(p.sections||[]).map((s,n)=>`<section class="story-section">${p.id==='cv-matcher'?'':`<p class="story-index">${String(n+1).padStart(2,'0')}</p>`}<h3>${esc(text(s.title))}</h3>${s.items.map(x=>`<p>${esc(text(x))}</p>`).join('')}</section>`).join('')}</div></div></div>`;
  }
  function openProject(id,trigger) {
    state.project=id;state.trigger=trigger;renderProjectDialog();$('project-dialog').showModal();$('project-dialog').scrollTop=0;document.body.classList.add('project-open');
  }
  function renderExperience() {
    $('timeline').innerHTML=t().experience.map(x=>{
      const work=data.experienceWork[x[5]];
      return `<article class="timeline-item" id="experience-${esc(x[5])}"><span class="timeline-year">${esc(x[0])}</span><div><h3>${esc(x[1])}</h3><p class="timeline-role">${esc(x[2])}</p><p class="timeline-location">${esc(x[3])}</p><p>${esc(x[4])}</p>${documents(work.documents)}<details class="experience-details"><summary>${esc(t().experienceDetails)}</summary>${work.items.map(p=>`<section class="experience-achievement"><h4>${esc(text(p.title))}</h4><p>${esc(text(p.contribution))}</p><p>${esc(text(p.detail))}</p>${tags(p.stack)}${p.repo?`<a class="resource-link" href="${esc(p.repo)}" target="_blank" rel="noopener">${esc(p.repoType==='report'?t().report:t().repo)} ↗</a>`:''}</section>`).join('')}</details>${window.caseStudies.preview(x[5],state.lang)}</div></article>`;
    }).join('');
  }
  function updateTheme() {
    document.body.classList.toggle('dark',state.dark);document.body.classList.toggle('light',!state.dark);
    $('theme').setAttribute('aria-pressed',String(state.dark));$('theme').setAttribute('aria-label',t().switchTheme);
    document.querySelector('meta[name="theme-color"]').content=state.dark?'#101b2b':'#f6f7fa';
  }
  function render() {
    document.documentElement.lang=state.lang;document.title='Amine Oubaidi — '+(state.lang==='fr'?'Ingénieur IA junior · Deep Learning':'Junior AI Engineer · Deep Learning');
    document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t()[el.dataset.t]);
    document.querySelectorAll('[data-html]').forEach(el=>el.innerHTML=t()[el.dataset.html]);
    ['fr','en'].forEach(l=>$(l).setAttribute('aria-pressed',String(l===state.lang)));
    const nav=['projects','expertise','experience','contact'].map((id,n)=>`<a href="#${id}" data-section="${id}">${esc(t().nav[n])}</a>`).join('');document.querySelector('.nav').innerHTML=nav;$('mobile-nav').innerHTML=nav;
    $('header-cv').setAttribute('aria-label',t().cvDownload);
    $('menu').setAttribute('aria-label',$('mobile-nav').hidden?t().menu:t().closeMenu);$('search').placeholder=t().searchPlaceholder;
    $('filters').setAttribute('aria-label',state.lang==='fr'?'Filtrer les projets':'Filter projects');$('filters').innerHTML=t().filters.map((label,n)=>`<button data-filter="${n}" aria-pressed="${n===state.category}">${esc(label)}</button>`).join('');
    $('hero-facts').innerHTML=t().heroFacts.map(x=>`<div><dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd></div>`).join('');
    $('project-grid').innerHTML=data.projects.map(card).join('');filterProjects();
    $('skills').innerHTML=data.skills.map((s,n)=>`<article class="skill-card"><div class="skill-heading"><span class="skill-index">${String(n+1).padStart(2,'0')}</span><h3>${esc(text(s.title))}</h3></div><p>${esc(text(s.note))}</p>${tags(s.items)}<div class="skill-evidence"><span>${esc(t().skillsEvidence)}</span>${s.projects.map(id=>{const p=data.projects.find(p=>p.id===id);return `<button data-project="${esc(id)}" aria-haspopup="dialog" aria-controls="project-dialog">${esc(text(p.title))} ↗</button>`;}).join('')}</div></article>`).join('');
    $('practice').innerHTML=t().practice.map(x=>`<span>${esc(x)}</span>`).join('');renderExperience();
    $('education').innerHTML=t().education.map(x=>`<article class="education-item"><span>${esc(x[0])}</span><h4>${esc(x[1])}</h4><p>${esc(x[2])}</p><p>${esc(x[3])}</p></article>`).join('');$('certifications').innerHTML=data.certs.map(x=>`<li>${esc(x)}</li>`).join('');
    updateTheme();updateBackToTop();if($('project-dialog').open)renderProjectDialog();window.caseStudies.refresh();
  }
  function reset(){state.category=0;state.query='';state.page=1;$('search').value='';filterProjects();}
  function closeMenu(){$('mobile-nav').hidden=true;$('menu').setAttribute('aria-expanded','false');$('menu').setAttribute('aria-label',t().menu);}
  document.addEventListener('click',event=>{
    const p=event.target.closest('[data-project]');if(p)openProject(p.dataset.project,p);
    const filter=event.target.closest('[data-filter]');if(filter){state.category=Number(filter.dataset.filter);state.page=1;filterProjects();}
    const page=event.target.closest('[data-project-page]');if(page&&!page.disabled){state.page=Number(page.dataset.projectPage);filterProjects();focusResults();}
    if(event.target.closest('[data-project-close]'))$('project-dialog').close();
    const study=event.target.closest('[data-open-study]');if(study){const trigger=state.trigger;$('project-dialog').close();window.caseStudies.open(study.dataset.openStudy,trigger);}
    if(event.target.closest('#mobile-nav a'))closeMenu();
    if(event.target.closest('[data-toggle-flow]')){state.animateFlow=!state.animateFlow;updateFlowMotion();}
    if(!event.target.closest('.header'))closeMenu();
  });
  $('project-dialog').addEventListener('close',()=>{document.body.classList.remove('project-open');if(state.trigger?.isConnected)state.trigger.focus({preventScroll:true});});
  $('project-dialog').addEventListener('click',event=>{if(event.target===$('project-dialog')){const r=$('project-dialog').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)$('project-dialog').close();}});
  $('show-projects').addEventListener('click',()=>{state.showAll=!state.showAll;state.page=1;filterProjects();focusResults();});
  $('search').addEventListener('input',e=>{state.query=e.target.value;state.page=1;filterProjects();});$('reset').addEventListener('click',reset);$('empty-reset').addEventListener('click',reset);
  $('back-to-top').addEventListener('click',event=>{event.preventDefault();window.scrollTo({top:0,behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});$('hero-title').focus({preventScroll:true});});
  window.addEventListener('scroll',updateBackToTop,{passive:true});
  window.addEventListener('resize',updateBackToTop);
  ['fr','en'].forEach(l=>$(l).addEventListener('click',()=>{state.lang=l;try{localStorage.setItem('ao-lang',l);}catch{}render();}));
  $('theme').addEventListener('click',()=>{state.dark=!state.dark;try{localStorage.setItem('ao-theme',state.dark?'dark':'light');}catch{}updateTheme();});
  $('menu').addEventListener('click',()=>{const open=$('mobile-nav').hidden;$('mobile-nav').hidden=!open;$('menu').setAttribute('aria-expanded',String(open));$('menu').setAttribute('aria-label',open?t().closeMenu:t().menu);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  if('matchMedia' in window){const motion=window.matchMedia('(prefers-reduced-motion: reduce)');motion.addEventListener('change',()=>{if(motion.matches&&state.animateFlow){state.animateFlow=false;updateFlowMotion();}});}
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)document.querySelectorAll('[data-section]').forEach(a=>{const active=a.dataset.section===entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-15% 0px -65% 0px'});['projects','expertise','experience','contact'].forEach(id=>observer.observe($(id)));}
  render();
})();
