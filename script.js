/* =========================================================
   ELEMENT REFERENCES
   ========================================================= */
const body      = document.body;
const cards     = document.querySelectorAll('.card');
const carousel  = document.querySelector('.carousel-wrapper');
const chooseBtn = document.querySelector('.glass-btn');
const popup     = document.getElementById('popup');
const menuBtn   = document.querySelector('.menu');
const audio     = document.getElementById('bgm');

/* =========================================================
   CONFIG
   ========================================================= */
let index = 0;
let startX = 0;
let audioUnlocked = false;

const SWIPE_THRESHOLD = 40;

/* =========================================================
   CAROUSEL RENDER
   ========================================================= */
function updateCarousel(){
  cards.forEach((card,i)=>{
    card.className = 'card';

    if(i === index){
      card.classList.add('active');
      body.className = `theme-${card.dataset.theme}`;
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
   TOUCH START (AUDIO + SWIPE START)  🔑
   ========================================================= */
carousel.addEventListener('touchstart', e=>{
  startX = e.touches[0].clientX;

  // 🔊 unlock audio di gesture yang sama
  if(!audioUnlocked){
    audio.volume = 1;
    audio.play().then(()=>{
      audioUnlocked = true;
    }).catch(()=>{});
  }
},{ passive:true });

/* =========================================================
   TOUCH END (SWIPE DETECTION)
   ========================================================= */
carousel.addEventListener('touchend', e=>{
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if(diff > SWIPE_THRESHOLD){
    index = (index + 1) % cards.length;
  }

  if(diff < -SWIPE_THRESHOLD){
    index = (index - 1 + cards.length) % cards.length;
  }

  updateCarousel();
});

/* =========================================================
   CLICK FALLBACK (AUDIO SAFETY)
   ========================================================= */
document.addEventListener('click', ()=>{
  if(!audioUnlocked){
    audio.volume = 1;
    audio.play().then(()=>{
      audioUnlocked = true;
    }).catch(()=>{});
  }
},{ once:true });

/* =========================================================
   BUTTON PILIH
   ========================================================= */
chooseBtn.addEventListener('click', ()=>{
  const link = cards[index].dataset.link;
  if(link) location.href = link;
});

/* =========================================================
   MENU POPUP
   ========================================================= */
menuBtn.addEventListener('click', ()=>{
  popup.style.display =
    popup.style.display === 'block' ? 'none' : 'block';
});
