const cards = document.querySelectorAll('.card');
const chooseBtn = document.getElementById('chooseBtn');
const menuBtn = document.getElementById('menuBtn');
const popup = document.getElementById('popup');

let index = 0;

function updateCarousel(){
  cards.forEach((card,i)=>{
    card.className = 'card';

    if(i === index){
      card.classList.add('active');
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

/* SWIPE */
let startX = 0;
let isSwiping = false;

document.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isSwiping = true;
}, { passive: true });

document.addEventListener('touchmove', e => {
  if(isSwiping){
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchend', e => {
  if(!isSwiping) return;

  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if(diff > 50) index = (index + 1) % cards.length;
  if(diff < -50) index = (index - 1 + cards.length) % cards.length;

  updateCarousel();
  isSwiping = false;
});

/* PILIH */
chooseBtn.onclick = ()=>{
  window.location.href = cards[index].dataset.link;
};

/* MENU */
menuBtn.onclick = ()=>{
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
};

/* AUDIO */
const audio = document.getElementById('bgm');
let audioUnlocked = false;

// fungsi unlock audio
function unlockAudio(){
  if(audioUnlocked) return;

  audio.volume = 1;
  audio.play().then(()=>{
    audioUnlocked = true;
  }).catch(()=>{});
}

// gesture PERTAMA apa pun → musik nyala
['touchstart','touchend','click'].forEach(evt=>{
  document.addEventListener(evt, unlockAudio, { once:true });
});

const body = document.body;
const liquid = document.querySelector('.liquid-bg');

let offsetX = 0;
let velocity = 0;

// ===== GANTI TEMA SESUAI CARD =====
function applyTheme(card){
  const theme = card.dataset.theme;
  body.className = body.className.replace(/theme-\w+/g,'');
  body.classList.add(`theme-${theme}`);
}

// panggil saat carousel update
function updateCarousel(){
  cards.forEach((card,i)=>{
    card.className='card';

    if(i===index){
      card.classList.add('active');
      applyTheme(card);
    }else if(i===(index-1+cards.length)%cards.length){
      card.classList.add('prev');
    }else if(i===(index+1)%cards.length){
      card.classList.add('next');
    }else{
      card.classList.add('hidden');
    }
  });
}

// ===== LIQUID FOLLOW SWIPE =====
let startX=0;

document.addEventListener('touchstart',e=>{
  startX=e.touches[0].clientX;
},{passive:true});

document.addEventListener('touchmove',e=>{
  const dx=e.touches[0].clientX-startX;
  velocity=dx*0.4;
  offsetX+=velocity;
  liquid.style.transform=`translateX(${offsetX}px)`;
},{passive:true});

document.addEventListener('touchend',()=>{
  // inertia balik pelan
  const decay=()=>{
    offsetX*=0.85;
    liquid.style.transform=`translateX(${offsetX}px)`;
    if(Math.abs(offsetX)>0.5){
      requestAnimationFrame(decay);
    }
  };
  decay();
});
