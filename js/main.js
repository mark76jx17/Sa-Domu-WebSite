/* ===================== Tab navigation ===================== */
const TABS=['home','menu','gallery','reviews','about','contact'];
function show(id,skipScroll){
  if(!TABS.includes(id))id='home';
  document.querySelectorAll('.tab').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active', b.dataset.tab===id));
  closeNav();
  try{history.replaceState(null,'','#'+id);}catch(e){}
  if(!skipScroll)window.scrollTo({top:0,behavior:'smooth'});
}
window.addEventListener('hashchange',()=>{
  const id=location.hash.replace('#','');
  if(TABS.includes(id))show(id,true);
});

/* ===================== Mobile nav ===================== */
function toggleNav(){document.getElementById('siteHeader').classList.toggle('nav-open');}
function closeNav(){document.getElementById('siteHeader').classList.remove('nav-open');}

/* ===================== Lightbox ===================== */
function openLightbox(src){
  document.getElementById('lightboxImg').src=src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(){document.getElementById('lightbox').classList.remove('open');}

/* ===================== Modal ===================== */
function openBook(){document.getElementById('bookModal').classList.add('open');closeNav();}
function closeBook(){document.getElementById('bookModal').classList.remove('open');}

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();closeBook();}});

/* ===================== Year ===================== */
document.getElementById('year').textContent=new Date().getFullYear();

function setLang(lang){
  const d=T[lang]||T.it;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(d[k]!==undefined) el.textContent=d[k];
  });
  document.documentElement.lang=lang;
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  try{localStorage.setItem('sds_lang',lang);}catch(e){}
}

(function init(){
  let lang='it';
  try{lang=localStorage.getItem('sds_lang')||'it';}catch(e){}
  if(!T[lang])lang='it';
  setLang(lang);
  const id=location.hash.replace('#','');
  if(TABS.includes(id)&&id!=='home')show(id,true);
})();
