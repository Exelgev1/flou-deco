const body = document.body;
const cards = document.querySelectorAll('.card');
const carousel = document.querySelector('.carousel-wrapper');
const chooseBtn = document.querySelector('.glass-btn');
const popup = document.getElementById('popup');
const menuBtn = document.querySelector('.menu');
const audio = document.getElementById('bgm');

let index = 0;
let startX = 0;
let audioUnlocked = false;

const THEMES = ['essential','classic','signature','luxury','dream'];

function updateCarousel(){
  cards.forEach((card,i)=>{
    card.className = 'card';

    if(i === index){
      card.classList.add('active');
      body.className = `theme-${card.dataset.theme}`;
    }else if(i === (index-1+cards.length)%cards.length){
      card.classList.add('prev');
    }else if(i === (index+1)%cards.length){
      card.classList.add('next');
    }else{
      card.classList.add('hidden');
    }
  });
}
updateCarousel();

/* SWIPE */
carousel.addEventListener('touchstart',e=>{
  startX = e.touches[0].clientX;
  if(!audioUnlocked){
    audio.play().catch(()=>{});
    audioUnlocked = true;
  }
},{passive:true});

carousel.addEventListener('touchend',e=>{
  const diff = startX - e.changedTouches[0].clientX;
  if(diff > 40) index = (index+1)%cards.length;
  if(diff < -40) index = (index-1+cards.length)%cards.length;
  updateCarousel();
});

/* BUTTON */
chooseBtn.onclick = ()=>{
  location.href = cards[index].dataset.link;
};

/* POPUP */
menuBtn.onclick = ()=>{
  popup.style.display = popup.style.display==='block'?'none':'block';
};
