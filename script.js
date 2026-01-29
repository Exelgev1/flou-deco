const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.card');
const chooseBtn = document.getElementById('chooseBtn');
const menuBtn = document.getElementById('menuBtn');
const popup = document.getElementById('popup');

let index = 1;

function updateCarousel(){
  cards.forEach((card,i)=>{
    card.classList.toggle('inactive', i!==index);
  });
  carousel.style.transform = `translateX(${-index*268 + 268}px)`;
}

updateCarousel();

// swipe mobile
let startX=0;
carousel.addEventListener('touchstart',e=>startX=e.touches[0].clientX);
carousel.addEventListener('touchend',e=>{
  let endX=e.changedTouches[0].clientX;
  if(startX-endX>50){ index=(index+1)%cards.length; }
  if(endX-startX>50){ index=(index-1+cards.length)%cards.length; }
  updateCarousel();
});

chooseBtn.onclick=()=>{
  const link = cards[index].dataset.link;
  window.location.href = link;
}

menuBtn.onclick=()=>{
  popup.style.display = popup.style.display==='block'?'none':'block';
}
