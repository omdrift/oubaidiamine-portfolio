(() => {
  const data = window.portfolio;
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalise = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const state = {lang:'fr', category:0, query:'', project:null, trigger:null, dark:false};
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
    const cover = window.portfolioStudies[p.id]?.cover;
    if(cover)return `<div class="project-image"><img src="${esc(cover.src)}" alt="${esc(text(cover.alt))}" width="${cover.width}" height="${cover.height}" loading="lazy"></div>`;
    const labels = {
      'cv-matcher':[['Profil & documents','Profile & documents'],['RAG / LLM'],['Offres & matching','Jobs & matching'],['Candidatures & suivi','Applications & tracking']],
      rag:[['Corpus PDF'],['Embeddings / RAG'],['Recherche & classification','Retrieval & classification']],
      maritime:[['Vidéo + IMU','Video + IMU'],['CNN / LSTM'],['Estimation du mouvement','Motion estimation']],
      hackathon:[['Texte & images','Text & images'],['VLM + LLM'],['XML structuré','Structured XML']],
      pdf:[['Annotations PDF'],['Extraction & contexte','Extraction & context'],['JSON / CSV']],
      xiatech:[['Événements','Events'],['Relations & provenance','Relations & provenance'],['Visualisation','Visualisation']]
    };
    return `<div class="project-graphic"><span class="graphic-caption">${esc(p.id==='cv-matcher'?'CAREERPILOT':'SYSTEM / '+p.id.toUpperCase())}</span><div class="graphic-nodes">${(labels[p.id]||[['API'],['Services'],['Data']]).map((x,n)=>`<span class="graphic-node ${n===1?'node-accent':''}">${esc(x[i()]||x[0])}</span>`).join('')}</div></div>`;
  }
  function card(p) {
    return `<article class="project-card" id="project-${esc(p.id)}" data-id="${esc(p.id)}"><button class="project-cover" data-project="${esc(p.id)}" aria-haspopup="dialog" aria-controls="project-dialog" aria-label="${esc(t().details+' : '+text(p.title))}">${graphic(p)}</button><div class="project-card-body"><div class="project-meta"><span>${esc(text(p.context))}</span><span>${esc(p.year)}</span></div><p class="project-kind">${esc(t().filters[p.cats[0]])}</p><h3><button data-project="${esc(p.id)}" aria-haspopup="dialog" aria-controls="project-dialog">${esc(text(p.title))}</button></h3><p class="project-summary">${esc(text(p.summary))}</p>${p.deployment?`<p class="deployment-chip"><span class="status-dot"></span>${esc(text(p.deployment))}</p>`:facts(p.facts?.slice(0,3))}${tags(p.stack.slice(0,6))}<div class="project-actions"><button class="text-button" data-project="${esc(p.id)}" aria-haspopup="dialog" aria-controls="project-dialog">${esc(t().details)} <span aria-hidden="true">↗</span></button>${window.portfolioStudies[p.id]?`<button class="text-button subdued" data-study="${esc(p.id)}" aria-haspopup="dialog" aria-controls="study-dialog">${state.lang==='fr'?'Médias & documents':'Media & documents'}</button>`:''}</div></div></article>`;
  }
  function filterProjects() {
    const query=normalise(state.query.trim());let count=0;
    for(const p of data.projects){
      const corpus=normalise([p.title,p.summary,p.problem,p.contribution,p.detail,p.stack,p.context,...(p.sections||[]).flatMap(s=>[s.title,...s.items])].flat(Infinity).join(' '));
      const show=(!state.category||p.cats.includes(state.category))&&(!query||corpus.includes(query));
      $('project-'+p.id).hidden=!show;if(show)count++;
    }
    $('result-count').textContent=`${count} / ${data.projects.length} ${t().count}`;
    $('empty').hidden=count>0;
    $('reset').hidden=!state.category&&!state.query;
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.filter)===state.category)));
  }
  function renderProjectDialog() {
    const p=data.projects.find(p=>p.id===state.project);if(!p)return;
    $('project-dialog').innerHTML=`<div class="project-dialog-shell"><header class="project-dialog-header"><div><p class="kicker">${esc(text(p.context))} / ${esc(p.year)}</p><h2 id="project-title">${esc(text(p.title))}</h2><p class="dialog-intro">${esc(text(p.summary))}</p>${p.deployment?`<p class="deployment-chip"><span class="status-dot"></span>${esc(text(p.deployment))}</p>`:''}</div><button class="dialog-close" data-project-close aria-label="${esc(t().projectClose)}" autofocus>×</button></header><div class="project-dialog-layout"><aside class="project-sidebar"><h3>${esc(t().tools)}</h3>${tags(p.stack)}${facts(p.facts)}${documents(p.documents)}${p.repo?`<a class="resource-link" href="${esc(p.repo)}" target="_blank" rel="noopener">${esc(t().repo)} ↗</a>`:''}${window.portfolioStudies[p.id]?`<button class="button secondary" data-open-study="${esc(p.id)}">${esc(t().studyOpen)} ↗</button>`:''}</aside><div class="project-story"><section><h3>${esc(t().projectOverview)}</h3><p>${esc(text(p.problem)||text(p.summary))}</p></section><section><h3>${esc(t().contribution)}</h3><p>${esc(text(p.contribution))}</p><p>${esc(text(p.detail))}</p></section>${(p.sections||[]).map((s,n)=>`<section class="story-section">${p.id==='cv-matcher'?'':`<p class="story-index">${String(n+1).padStart(2,'0')}</p>`}<h3>${esc(text(s.title))}</h3>${s.items.map(x=>`<p>${esc(text(x))}</p>`).join('')}</section>`).join('')}</div></div></div>`;
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
    document.documentElement.lang=state.lang;document.title='Amine Oubaidi — '+(state.lang==='fr'?'Ingénieur IA & Data Scientist':'AI Engineer & Data Scientist');
    document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t()[el.dataset.t]);
    document.querySelectorAll('[data-html]').forEach(el=>el.innerHTML=t()[el.dataset.html]);
    ['fr','en'].forEach(l=>$(l).setAttribute('aria-pressed',String(l===state.lang)));
    const nav=['projects','expertise','experience','contact'].map((id,n)=>`<a href="#${id}" data-section="${id}">${esc(t().nav[n])}</a>`).join('');document.querySelector('.nav').innerHTML=nav;$('mobile-nav').innerHTML=nav;
    $('menu').setAttribute('aria-label',t().menu);$('search').placeholder=t().searchPlaceholder;
    $('filters').setAttribute('aria-label',state.lang==='fr'?'Filtrer les projets':'Filter projects');$('filters').innerHTML=t().filters.map((label,n)=>`<button data-filter="${n}" aria-pressed="${n===state.category}">${esc(label)}</button>`).join('');
    $('hero-facts').innerHTML=t().heroFacts.map(x=>`<span>${esc(x)}</span>`).join('');$('ribbon').innerHTML=t().ribbon.map(x=>`<span>${esc(x)}</span>`).join('');
    $('project-grid').innerHTML=data.projects.map(card).join('');filterProjects();
    $('skills').innerHTML=data.skills.map((s,n)=>`<article class="skill-card"><div class="skill-heading"><span class="skill-index">${String(n+1).padStart(2,'0')}</span><h3>${esc(text(s.title))}</h3></div><p>${esc(text(s.note))}</p>${tags(s.items)}<div class="skill-evidence"><span>${esc(t().skillsEvidence)}</span>${s.projects.map(id=>{const p=data.projects.find(p=>p.id===id);return `<button data-project="${esc(id)}" aria-haspopup="dialog" aria-controls="project-dialog">${esc(text(p.title))} ↗</button>`;}).join('')}</div></article>`).join('');
    $('practice').innerHTML=t().practice.map(x=>`<span>${esc(x)}</span>`).join('');renderExperience();
    $('education').innerHTML=t().education.map(x=>`<article class="education-item"><span>${esc(x[0])}</span><h4>${esc(x[1])}</h4><p>${esc(x[2])}</p><p>${esc(x[3])}</p></article>`).join('');$('certifications').innerHTML=data.certs.map(x=>`<li>${esc(x)}</li>`).join('');
    updateTheme();if($('project-dialog').open)renderProjectDialog();window.caseStudies.refresh();
  }
  function reset(){state.category=0;state.query='';$('search').value='';filterProjects();}
  function closeMenu(){$('mobile-nav').hidden=true;$('menu').setAttribute('aria-expanded','false');$('menu').setAttribute('aria-label',t().menu);}
  document.addEventListener('click',event=>{
    const p=event.target.closest('[data-project]');if(p)openProject(p.dataset.project,p);
    const filter=event.target.closest('[data-filter]');if(filter){state.category=Number(filter.dataset.filter);filterProjects();}
    if(event.target.closest('[data-project-close]'))$('project-dialog').close();
    const study=event.target.closest('[data-open-study]');if(study){const trigger=state.trigger;$('project-dialog').close();window.caseStudies.open(study.dataset.openStudy,trigger);}
    if(event.target.closest('#mobile-nav a'))closeMenu();
  });
  $('project-dialog').addEventListener('close',()=>{document.body.classList.remove('project-open');if(state.trigger?.isConnected)state.trigger.focus({preventScroll:true});});
  $('project-dialog').addEventListener('click',event=>{if(event.target===$('project-dialog')){const r=$('project-dialog').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)$('project-dialog').close();}});
  $('search').addEventListener('input',e=>{state.query=e.target.value;filterProjects();});$('reset').addEventListener('click',reset);$('empty-reset').addEventListener('click',reset);
  ['fr','en'].forEach(l=>$(l).addEventListener('click',()=>{state.lang=l;try{localStorage.setItem('ao-lang',l);}catch{}render();}));
  $('theme').addEventListener('click',()=>{state.dark=!state.dark;try{localStorage.setItem('ao-theme',state.dark?'dark':'light');}catch{}updateTheme();});
  $('menu').addEventListener('click',()=>{const open=$('mobile-nav').hidden;$('mobile-nav').hidden=!open;$('menu').setAttribute('aria-expanded',String(open));$('menu').setAttribute('aria-label',open?t().closeMenu:t().menu);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)document.querySelectorAll('[data-section]').forEach(a=>{const active=a.dataset.section===entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-15% 0px -65% 0px'});['projects','expertise','experience','contact'].forEach(id=>observer.observe($(id)));}
  render();
})();
