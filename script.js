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
const audioBtn = document.querySelector('.audio');

let audioReady = false;
let audioOn = false;

// trigger autoplay on FIRST interaction (wajib di mobile)
function enableAudio(){
  if(audioReady) return;

  audio.play().then(()=>{
    audioOn = true;
    audioReady = true;
    audioBtn.classList.remove('off');
  }).catch(()=>{});

  document.removeEventListener('touchstart', enableAudio);
}

// trigger dari gesture pertama
document.addEventListener('touchstart', enableAudio, { once:true });

// toggle manual
audioBtn.addEventListener('click',()=>{
  if(!audioReady){
    enableAudio();
    return;
  }

  if(audioOn){
    audio.pause();
    audioBtn.classList.add('off');
  }else{
    audio.play();
    audioBtn.classList.remove('off');
  }

  audioOn = !audioOn;
});

document.body.addEventListener('click', () => {
  audio.play()
    .then(() => console.log('AUDIO PLAY OK'))
    .catch(err => console.log('AUDIO ERROR:', err));
}, { once:true });


