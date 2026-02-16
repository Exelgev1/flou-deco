document.addEventListener("DOMContentLoaded",()=>{

const body=document.body;
const cards=document.querySelectorAll(".card");
const carousel=document.querySelector(".carousel-wrapper");
const chooseBtn=document.getElementById("chooseBtn");
const popup=document.getElementById("popup");
const menuBtn=document.querySelector(".menu");
const audio=document.getElementById("bgm");

let index=0;
let startX=0;
let audioStarted=false;
const SWIPE=40;

/* CAROUSEL */
function update(){
cards.forEach((c,i)=>{
c.className="card";
if(i===index){
c.classList.add("active");
body.className="theme-"+c.dataset.theme;
}
else if(i===(index-1+cards.length)%cards.length){
c.classList.add("prev");
}
else if(i===(index+1)%cards.length){
c.classList.add("next");
}
else{
c.classList.add("hidden");
}
});
}
update();

/* SWIPE */
carousel.addEventListener("touchstart",e=>{
startX=e.touches[0].clientX;
},{passive:true});

carousel.addEventListener("touchend",e=>{
const diff=startX-e.changedTouches[0].clientX;
if(Math.abs(diff)<SWIPE) return;

index=diff>0?(index+1)%cards.length:(index-1+cards.length)%cards.length;
update();

if(!audioStarted){
audio.play().catch(()=>{});
audioStarted=true;
}
});

/* BUTTON */
chooseBtn.onclick=()=>location.href=cards[index].dataset.link;

/* POPUP */
menuBtn.onclick=()=>{
popup.style.display=popup.style.display==="block"?"none":"block";
};

});
