const body = document.body;
const intro = document.getElementById('intro');
const mainContent = document.querySelector('.main-content');
const cards = document.querySelectorAll('.card');
const carousel = document.querySelector('.carousel-wrapper');
const chooseBtn = document.querySelector('.glass-btn');
const popup = document.getElementById('popup');
const menuBtn = document.querySelector('.menu');
const audio = document.getElementById('bgm');

let index = 0;
let startX = 0;
let audioUnlocked = false;
let firstSwipe = false;

const SWIPE = 40;
const INTRO_KEY = 'flou_intro_seen';

/* ===== INTRO ===== */
function playIntro(){
  setTimeout(()=> intro.classList.add('zoom-out'), 1400);
  setTimeout(()=>{
    intro.classList.add('slide-up');
    mainContent.classList.remove('hidden');
    mainContent.classList.add('show');
    setTimeout(()=> intro.remove(), 900);
  }, 2200);
}
if(sessionStorage.getItem(INTRO_KEY)){
  intro.remove();
  mainContent.classList.remove('hidden');
  mainContent.classList.add('show');
}else{
  sessionStorage.setItem(INTRO_KEY, '1');
  playIntro();
}

/* ===== CAROUSEL ===== */
function updateCarousel(){
  cards.forEach((c,i)=>{
    c.className = 'card';
    if(i===index){
      c.classList.add('active');
      body.className = `theme-${c.dataset.theme}`;
    }else if(i===(index-1+cards.length)%cards.length){
      c.classList.add('prev');
    }else if(i===(index+1)%cards.length){
      c.classList.add('next');
    }else{
      c.classList.add('hidden');
    }
  });
}
updateCarousel();

/* ===== SWIPE ===== */
carousel.addEventListener('touchstart',e=>{
  startX = e.touches[0].clientX;
},{passive:true});

carousel.addEventListener('touchend',e=>{
  const diff = startX - e.changedTouches[0].clientX;
  if(Math.abs(diff)<SWIPE) return;

  index = diff>0 ? (index+1)%cards.length : (index-1+cards.length)%cards.length;

  if(!firstSwipe){
    firstSwipe = true;
    audio.play().then(()=> audioUnlocked=true).catch(()=>{});
  }
  updateCarousel();
});

/* ===== BUTTON ===== */
chooseBtn.onclick = ()=> location.href = cards[index].dataset.link;

/* ===== POPUP ===== */
menuBtn.onclick = ()=>{
  popup.style.display = popup.style.display==='block'?'none':'block';
};
