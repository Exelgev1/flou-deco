/* =========================================================
   FLOU DECO — FINAL CLEAN SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     ELEMENT REFERENCES
  ================================= */
  const body = document.body;
  const intro = document.getElementById("intro");
  const mainContent = document.querySelector(".main-content");
  const cards = document.querySelectorAll(".card");
  const carousel = document.querySelector(".carousel-wrapper");
  const chooseBtn = document.querySelector(".glass-btn");
  const popup = document.getElementById("popup");
  const menuBtn = document.querySelector(".menu");
  const audio = document.getElementById("bgm");

  /* ================================
     CONFIGURATION (EDIT MUDAH)
  ================================= */
  const INTRO_DURATION = 2500;   // durasi intro (ms)
  const INTRO_ONCE_KEY = "flou_intro_seen";
  const SWIPE_THRESHOLD = 40;    // jarak swipe minimal
  const ENABLE_INTRO_ONCE = true; // false = selalu tampil intro

  /* ================================
     STATE
  ================================= */
  let index = 0;
  let startX = 0;
  let audioStarted = false;

  /* =========================================================
     INTRO CONTROL (NETFLIX STYLE)
  ========================================================= */

  function showMainContent() {
    if (!mainContent) return;
    mainContent.classList.remove("hidden");
    mainContent.classList.add("show");
  }

  function startIntro() {
    if (!intro) {
      showMainContent();
      return;
    }

    intro.classList.add("play");

    setTimeout(() => {
      intro.classList.add("hide");
      showMainContent();

      setTimeout(() => {
        intro.remove();
      }, 1000);

    }, INTRO_DURATION);
  }

  if (ENABLE_INTRO_ONCE) {
    if (sessionStorage.getItem(INTRO_ONCE_KEY)) {
      if (intro) intro.remove();
      showMainContent();
    } else {
      sessionStorage.setItem(INTRO_ONCE_KEY, "1");
      startIntro();
    }
  } else {
    startIntro();
  }

  /* =========================================================
     CAROUSEL SYSTEM
  ========================================================= */

  function updateCarousel() {
    cards.forEach((card, i) => {

      card.className = "card";

      if (i === index) {
        card.classList.add("active");

        /* Update Theme */
        body.className = "";
        body.classList.add(`theme-${card.dataset.theme}`);

      } else if (i === (index - 1 + cards.length) % cards.length) {
        card.classList.add("prev");

      } else if (i === (index + 1) % cards.length) {
        card.classList.add("next");

      } else {
        card.classList.add("hidden");
      }
    });
  }

  updateCarousel();

  /* =========================================================
     SWIPE HANDLING
  ========================================================= */

  carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener("touchend", e => {

    const diff = startX - e.changedTouches[0].clientX;

    if (Math.abs(diff) < SWIPE_THRESHOLD) return;

    index = diff > 0
      ? (index + 1) % cards.length
      : (index - 1 + cards.length) % cards.length;

    updateCarousel();

    /* Start audio only once on first swipe */
    if (!audioStarted) {
      audio.play().catch(() => {});
      audioStarted = true;
    }

  });

  /* =========================================================
     BUTTON ACTION
  ========================================================= */

  if (chooseBtn) {
    chooseBtn.addEventListener("click", () => {
      window.location.href = cards[index].dataset.link;
    });
  }

  /* =========================================================
     POPUP MENU
  ========================================================= */

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      popup.style.display =
        popup.style.display === "block" ? "none" : "block";
    });
  }

});
