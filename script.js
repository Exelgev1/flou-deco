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
document.addEventListener('touchstart',e=>{
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend',e=>{
  let endX = e.changedTouches[0].clientX;
  if(startX - endX > 50) index = (index + 1) % cards.length;
  if(endX - startX > 50) index = (index - 1 + cards.length) % cards.length;
  updateCarousel();
});

/* PILIH */
chooseBtn.onclick = ()=>{
  window.location.href = cards[index].dataset.link;
};

/* MENU */
menuBtn.onclick = ()=>{
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
};
