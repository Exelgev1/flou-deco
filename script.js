/* =========================================================
   CONFIG & ELEMENT
   ========================================================= */
const cards = document.querySelectorAll('.card');
const carouselArea = document.querySelector('.carousel-wrapper');
const chooseBtn = document.getElementById('chooseBtn');
const menuBtn = document.getElementById('menuBtn');
const popup = document.getElementById('popup');
const audio = document.getElementById('bgm');
const body = document.body;
const liquid = document.querySelector('.liquid-bg');

/* =========================================================
   STATE
   ========================================================= */
let index = 0;
let startX = 0;
let audioUnlocked = false;
let liquidOffset = 0;

/* =========================================================
   CAROUSEL + THEME
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
   AUDIO — UNLOCK ON FIRST GESTURE
   ========================================================= */
function unlockAudio(){
  if(audioUnlocked) return;
  audio.volume = 1;
  audio.play().then(()=>{
    audioUnlocked = true;
  }).catch(()=>{});
}

/* =========================================================
   SWIPE (ONLY ON CAROUSEL)
   ========================================================= */
carouselArea.addEventListener('touchstart', e=>{
  startX = e.touches[0].clientX;
  unlockAudio(); // 🔊 swipe pertama = audio nyala
},{ passive:true });

carouselArea.addEventListener('touchmove', e=>{
  const dx = e.touches[0].clientX - startX;

  /* Liquid follow swipe */
  liquidOffset = dx * 0.2;
  liquid.style.transform = `translateX(${liquidOffset}px)`;
},{ passive:true });

carouselArea.addEventListener('touchend', e=>{
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if(diff > 50) index = (index + 1) % cards.length;
  if(diff < -50) index = (index - 1 + cards.length) % cards.length;

  updateCarousel();

  /* Liquid inertia balik halus */
  const relax = ()=>{
    liquidOffset *= 0.85;
    liquid.style.transform = `translateX(${liquidOffset}px)`;
    if(Math.abs(liquidOffset) > 0.5){
      requestAnimationFrame(relax);
    }
  };
  relax();
});

/* =========================================================
   BUTTON & MENU
   ========================================================= */
chooseBtn.onclick = ()=>{
  window.location.href = cards[index].dataset.link;
};

menuBtn.onclick = ()=>{
  popup.style.display =
    popup.style.display === 'block' ? 'none' : 'block';
};
