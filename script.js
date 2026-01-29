/* =========================================================
   ELEMENTS
   ========================================================= */
const body = document.body;
const cards = document.querySelectorAll('.card');
const carouselArea = document.querySelector('.carousel-wrapper');
const chooseBtn = document.querySelector('.glass-btn');
const audio = document.getElementById('bgm');
const liquid = document.querySelector('.liquid-bg');

/* =========================================================
   STATE
   ========================================================= */
let index = 0;
let startX = 0;
let audioUnlocked = false;

/* =========================================================
   THEMES
   ========================================================= */
const THEMES = [
  'theme-essential',
  'theme-classic',
  'theme-signature',
  'theme-luxury',
  'theme-dream'
];

function applyTheme(card){
  THEMES.forEach(t => body.classList.remove(t));
  body.classList.add(`theme-${card.dataset.theme}`);
}

/* =========================================================
   CAROUSEL
   ========================================================= */
function updateCarousel(){
  cards.forEach((card,i)=>{
    card.className = 'card';

    if(i === index){
      card.classList.add('active');
      applyTheme(card);
    }else if(i === (index - 1 + cards.length) % cards.length){
      card.classList.add('prev');
    }else if(i === (index + 1) % cards.length){
      card.classList.add('next');
    }else{
      card.classList.add('hidden');
    }
  });
}

updateCarousel();

/* =========================================================
   AUDIO (UNLOCK ON FIRST SWIPE)
   ========================================================= */
function unlockAudio(){
  if(audioUnlocked) return;
  audio.play().then(()=> audioUnlocked = true).catch(()=>{});
}

/* =========================================================
   SWIPE
   ========================================================= */
carouselArea.addEventListener('touchstart', e=>{
  startX = e.touches[0].clientX;
  unlockAudio();
},{ passive:true });

carouselArea.addEventListener('touchend', e=>{
  const diff = startX - e.changedTouches[0].clientX;

  if(diff > 40) index = (index + 1) % cards.length;
  if(diff < -40) index = (index - 1 + cards.length) % cards.length;

  updateCarousel();
});

/* =========================================================
   BUTTON
   ========================================================= */
chooseBtn.addEventListener('click', ()=>{
  window.location.href = cards[index].dataset.link;
});
