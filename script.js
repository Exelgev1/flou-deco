/* =========================================================
   ELEMENT REFERENCES
   ========================================================= */
const body        = document.body;
const intro       = document.getElementById('intro');
const mainContent = document.querySelector('.main-content');

const cards       = document.querySelectorAll('.card');
const carousel    = document.querySelector('.carousel-wrapper');
const chooseBtn   = document.querySelector('.glass-btn');
const popup       = document.getElementById('popup');
const menuBtn     = document.querySelector('.menu');
const audio       = document.getElementById('bgm');

/* =========================================================
   CONFIG (AMAN DIUBAH)
   ========================================================= */
let index = 0;
let startX = 0;
let audioUnlocked = false;

const SWIPE_THRESHOLD = 40;   // sensitivitas swipe
const INTRO_KEY = 'flou_intro_seen'; // key sessionStorage

/* =========================================================
   INTRO SCREEN LOGIC (ONE-TIME)
   ========================================================= */
function playIntro(){
  // urutan timing intro (ms)
  const TYPING_DONE   = 1400;
  const ZOOM_DURATION = 600;
  const SLIDE_DELAY   = 200;

  // zoom-out cinematic
  setTimeout(()=>{
    intro.classList.add('zoom-out');
  }, TYPING_DONE);

  // slide up & masuk ke main
  setTimeout(()=>{
    intro.classList.add('slide-up');

    // aktifkan halaman utama (masih tanpa carousel)
    mainContent.classList.remove('hidden');
    mainContent.classList.add('show');

    // hapus intro dari DOM (bersih & ringan)
    setTimeout(()=>{
      intro.remove();
    }, 900);

  }, TYPING_DONE + ZOOM_DURATION + SLIDE_DELAY);
}

// cek apakah intro sudah pernah tampil
if(sessionStorage.getItem(INTRO_KEY)){
  // skip intro
  intro.remove();
  mainContent.classList.remove('hidden');
  mainContent.classList.add('show');
}else{
  // tampilkan intro
  sessionStorage.setItem(INTRO_KEY, '1');
  playIntro();
}

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

// render awal (posisi card siap, tapi masih tersembunyi)
updateCarousel();

/* =========================================================
   SWIPE HANDLER
   - swipe pertama: munculkan carousel + tombol
   - swipe valid: ganti card
   - swipe pertama: nyalakan audio
   ========================================================= */
let firstSwipeDone = false;

carousel.addEventListener('touchstart', e=>{
  startX = e.touches[0].clientX;
},{ passive:true });

carousel.addEventListener('touchend', e=>{
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  let didSwipe = false;

  if(diff > SWIPE_THRESHOLD){
    index = (index + 1) % cards.length;
    didSwipe = true;
  }

  if(diff < -SWIPE_THRESHOLD){
    index = (index - 1 + cards.length) % cards.length;
    didSwipe = true;
  }

  if(!didSwipe) return;

  /* ===== FIRST SWIPE ===== */
  if(!firstSwipeDone){
    firstSwipeDone = true;

    // munculkan carousel & tombol sepenuhnya
    carousel.style.opacity = 1;
    chooseBtn.style.opacity = 1;

    // nyalakan audio
    if(!audioUnlocked){
      audio.volume = 1; // atur volume di sini
      audio.play().then(()=>{
        audioUnlocked = true;
      }).catch(()=>{});
    }
  }

  updateCarousel();
});

/* =========================================================
   ACTION BUTTON (PILIH)
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
