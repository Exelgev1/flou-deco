/* =========================================================
   BASIC ELEMENT REFERENCES
   (jangan diubah kecuali class/id di HTML berubah)
   ========================================================= */
const body       = document.body;
const cards      = document.querySelectorAll('.card');
const carousel   = document.querySelector('.carousel-wrapper');
const chooseBtn  = document.querySelector('.glass-btn');
const popup      = document.getElementById('popup');
const menuBtn    = document.querySelector('.menu');
const audio      = document.getElementById('bgm');

/* =========================================================
   CONFIGURABLE VALUES (AMAN UNTUK DIUBAH)
   ========================================================= */

// index awal card (0 = card pertama)
let index = 0;

// jarak swipe minimum agar berpindah card (px)
// BESARKAN → swipe harus lebih jauh
// KECILKAN → swipe lebih sensitif
const SWIPE_THRESHOLD = 40;

// daftar theme (sesuai data-theme di HTML & CSS)
const THEMES = ['essential','classic','signature','luxury','dream'];

/* =========================================================
   INTERNAL STATE (jangan diubah)
   ========================================================= */
let startX = 0;
let audioUnlocked = false;

/* =========================================================
   CAROUSEL RENDER FUNCTION
   - atur posisi card (active / prev / next)
   - ganti theme background
   ========================================================= */
function updateCarousel(){
  cards.forEach((card,i)=>{
    // reset class
    card.className = 'card';

    if(i === index){
      // card utama (tengah)
      card.classList.add('active');

      // ganti theme body
      body.className = `theme-${card.dataset.theme}`;

    }else if(i === (index - 1 + cards.length) % cards.length){
      // card kiri
      card.classList.add('prev');

    }else if(i === (index + 1) % cards.length){
      // card kanan
      card.classList.add('next');

    }else{
      // card tersembunyi
      card.classList.add('hidden');
    }
  });
}

// render pertama kali
updateCarousel();

/* =========================================================
   AUDIO UNLOCK (MOBILE SAFE)
   - audio baru boleh play setelah interaksi user
   - otomatis jalan di gesture pertama apa pun
   ========================================================= */
function unlockAudio(){
  if(audioUnlocked) return;

  audio.volume = 1;       // atur volume di sini (0.0 - 1.0)
  audio.play().then(()=>{
    audioUnlocked = true;
  }).catch(()=>{});
}

// gesture pertama → audio nyala
['touchstart','touchend','click'].forEach(evt=>{
  document.addEventListener(evt, unlockAudio, { once:true });
});

/* =========================================================
   SWIPE HANDLER (CAROUSEL)
   ========================================================= */
carousel.addEventListener('touchstart', e=>{
  startX = e.touches[0].clientX;
},{ passive:true });

carousel.addEventListener('touchend', e=>{
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if(diff > SWIPE_THRESHOLD){
    // swipe ke kiri → card berikutnya
    index = (index + 1) % cards.length;
  }

  if(diff < -SWIPE_THRESHOLD){
    // swipe ke kanan → card sebelumnya
    index = (index - 1 + cards.length) % cards.length;
  }

  updateCarousel();
});

/* =========================================================
   ACTION BUTTON (PILIH)
   - redirect sesuai card aktif
   ========================================================= */
chooseBtn.addEventListener('click', ()=>{
  const target = cards[index].dataset.link;
  if(target) location.href = target;
});

/* =========================================================
   MENU POPUP (INFO PERUSAHAAN)
   ========================================================= */
menuBtn.addEventListener('click', ()=>{
  popup.style.display =
    popup.style.display === 'block' ? 'none' : 'block';
});
