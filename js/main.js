/* ===================== Tab navigation ===================== */
const TABS=['home','gallery','reviews','about','contact'];
function show(id,skipScroll){
  if(!TABS.includes(id))id='home';
  document.querySelectorAll('.tab').forEach(s=>s.classList.toggle('active', s.id===id));
  document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active', b.dataset.tab===id));
  closeNav();
  try{history.replaceState(null,'','#'+id);}catch(e){}
  if(!skipScroll)window.scrollTo({top:0,behavior:'smooth'});
  syncSlides();
}
window.addEventListener('hashchange',()=>{
  const id=location.hash.replace('#','');
  if(TABS.includes(id))show(id,true);
});

/* ===================== Mobile nav ===================== */
const header=document.getElementById('siteHeader');
const navToggle=header.querySelector('.nav-toggle');
function toggleNav(){
  const open=header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded',String(open));
}
function closeNav(){
  header.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded','false');
}

/* ===================== Dialogs (lightbox + prenota) ===================== */
let lastFocus=null;
function openDialog(el){
  lastFocus=document.activeElement;
  el.classList.add('open');
  const btn=el.querySelector('.close');
  if(btn)btn.focus();
}
function closeDialog(el){
  if(!el.classList.contains('open'))return;
  el.classList.remove('open');
  if(lastFocus&&lastFocus.focus)lastFocus.focus();
  lastFocus=null;
}

const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
const bookModal=document.getElementById('bookModal');

function openLightbox(trigger){
  const img=trigger.querySelector('img');
  lightboxImg.src=trigger.dataset.lightbox;
  lightboxImg.alt=img?img.alt:'';
  openDialog(lightbox);
}
function closeLightbox(){closeDialog(lightbox);}
function openBook(){closeNav();openDialog(bookModal);}
function closeBook(){closeDialog(bookModal);}

/* Un solo listener per tutti i click: niente handler inline, compatibile con la Content-Security-Policy */
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-tab],[data-lang],[data-action],[data-lightbox]');
  if(el){
    if(el.dataset.tab)return show(el.dataset.tab);
    if(el.dataset.lang)return setLang(el.dataset.lang);
    if(el.dataset.lightbox)return openLightbox(el);
    switch(el.dataset.action){
      case 'toggle-nav':return toggleNav();
      case 'book':return openBook();
      case 'close-book':return closeBook();
      case 'close-lightbox':return closeLightbox();
      case 'toggle-slides':return toggleSlides(el);
    }
  }
  // click sullo sfondo: la lightbox si chiude ovunque, la modale solo fuori dalla scheda
  if(lightbox.contains(e.target))closeLightbox();
  else if(e.target===bookModal)closeBook();
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeLightbox();closeBook();}
  // mantiene il focus da tastiera dentro la finestra aperta
  if(e.key==='Tab'){
    const dlg=[bookModal,lightbox].find(d=>d.classList.contains('open'));
    if(!dlg)return;
    const f=dlg.querySelectorAll('a[href],button');
    const first=f[0],last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
});

/* ===================== Home: immagini a scorrimento ===================== */
const slides=[...document.querySelectorAll('.hero-slide')];
const SLIDE_MS=7000;              // tempo di permanenza di ogni immagine
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let slideIdx=0,slideTimer=null,slidesPaused=false;

// chiede al browser di scaricare subito un'immagine marcata come "lazy"
function preload(img){if(img.loading==='lazy')img.loading='eager';}
function nextSlide(){
  const n=(slideIdx+1)%slides.length;
  // se la prossima foto non è ancora arrivata (rete lenta) si resta sull'attuale: mai uno sfondo vuoto
  if(!slides[n].complete||!slides[n].naturalWidth){preload(slides[n]);return;}
  slides[slideIdx].classList.remove('is-active');
  slides[n].classList.add('is-active');
  slideIdx=n;
  preload(slides[(n+1)%slides.length]);
}
function canPlay(){
  return slides.length>1&&!slidesPaused&&!reduceMotion.matches&&!document.hidden
    &&document.getElementById('home').classList.contains('active');
}
// riparte solo quando serve: niente cambi di immagine in schede nascoste o fuori dalla home
function syncSlides(){
  if(canPlay()){if(!slideTimer){preload(slides[(slideIdx+1)%slides.length]);slideTimer=setInterval(nextSlide,SLIDE_MS);}}
  else{clearInterval(slideTimer);slideTimer=null;}
}
function toggleSlides(btn){
  slidesPaused=!slidesPaused;
  btn.setAttribute('aria-pressed',String(slidesPaused));
  syncSlides();
}
document.addEventListener('visibilitychange',syncSlides);
reduceMotion.addEventListener('change',syncSlides);

/* ===================== Year ===================== */
document.getElementById('year').textContent=new Date().getFullYear();

/* ===================== Lingua ===================== */
const LANGS=Object.keys(T);

/* Testi con corsivo: nelle traduzioni il corsivo è scritto tra asterischi (*così*).
   Va trasformato in <em> SENZA usare innerHTML, per restare compatibili con la CSP. */
function renderRich(el,text){
  // TODO(human): sostituire con il rendering di *…* in <em> (vedi richiesta in chat)
  el.textContent=text.replace(/\*/g,'');
}

function setLang(lang){
  if(!LANGS.includes(lang))lang='it';
  const d=T[lang];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(!Object.prototype.hasOwnProperty.call(d,k))return;
    if(el.hasAttribute('data-i18n-rich'))renderRich(el,d[k]);
    else el.textContent=d[k];
  });
  document.documentElement.lang=lang;
  document.querySelectorAll('.lang-btn').forEach(b=>{
    const on=b.dataset.lang===lang;
    b.classList.toggle('active',on);
    b.setAttribute('aria-pressed',String(on));
  });
  try{localStorage.setItem('sds_lang',lang);}catch(e){}
}

(function init(){
  let lang='it';
  try{lang=localStorage.getItem('sds_lang')||'it';}catch(e){}
  setLang(lang);
  const id=location.hash.replace('#','');
  if(TABS.includes(id)&&id!=='home')show(id,true);
  syncSlides();
})();
