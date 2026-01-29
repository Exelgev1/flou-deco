const body = document.body;
const cards = document.querySelectorAll('.card');
const chooseBtn = document.getElementById('chooseBtn');
const popup = document.getElementById('popup');
const menuBtn = document.getElementById('menuBtn');
const audio = document.getElementById('bgm');

let index = 0;
let startX = 0;
let audioUnlocked = false;

function applyTheme(){
  body.className = cards[index].dataset.theme
    ? `theme-${cards[index].dataset.theme}`
    : '';
}

function updateCarousel(){
  cards.forEach((c,i)=>{
    c.classList.toggle('active', i === index);
  });
  applyTheme();
}

updateCarousel();

/* swipe */
const carousel = document.getElementById('carousel');

carousel.addEventListener('touchstart', e=>{
  startX = e.touches[0].clientX;
  if(!audioUnlocked){
    audio.play().catch(()=>{});
    audioUnlocked = true;
  }
},{passive:true});

carousel.addEventListener('touchend', e=>{
  const diff = startX - e.changedTouches[0].clientX;
  if(diff > 40) index = (index+1)%cards.length;
  if(diff < -40) index = (index-1+cards.length)%cards.length;
  updateCarousel();
});

/* button */
chooseBtn.onclick = ()=>{
  location.href = cards[index].dataset.link;
};

/* popup */
menuBtn.onclick = ()=>{
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
};
