/* ---------- снег ---------- */
(function(){
  const box=document.getElementById('snow');
  const chars=['❄','❅','❆','•'];
  for(let i=0;i<50;i++){
    const f=document.createElement('div');
    f.className='flake';
    f.textContent=chars[Math.floor(Math.random()*chars.length)];
    f.style.left=Math.random()*100+'vw';
    f.style.fontSize=(8+Math.random()*16)+'px';
    f.style.animationDuration=(6+Math.random()*10)+'s';
    f.style.animationDelay=(-Math.random()*12)+'s';
    f.style.opacity=.2+Math.random()*.55;
    box.appendChild(f);
  }
})();

/* ---------- бургер-меню ---------- */
const burger=document.getElementById('burger');
const nav=document.getElementById('nav');
burger.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>nav.classList.remove('open'));
});

/* ---------- появление при скролле ---------- */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
/* перерисовать линии после завершения reveal-анимации кружочков */
document.querySelectorAll('.timeline .node').forEach(n=>{
  n.addEventListener('transitionend',()=>{ if(window.drawTimelineLinks) window.drawTimelineLinks(); });
});

/* ---------- карусель ---------- */
const carousel=document.getElementById('carousel');
const step=()=> Math.min(carousel.clientWidth*0.8, 360);
document.getElementById('cPrev').addEventListener('click',()=>{
  carousel.scrollBy({left:-step(),behavior:'smooth'});
});
document.getElementById('cNext').addEventListener('click',()=>{
  carousel.scrollBy({left:step(),behavior:'smooth'});
});

/* ---------- линии, соединяющие кружочки таймлайна ---------- */
function drawTimelineLinks(){
  const svg=document.getElementById('links');
  const timeline=document.querySelector('.timeline');
  if(!svg||!timeline) return;
  const dots=[...document.querySelectorAll('.timeline .dot')];
  const box=timeline.getBoundingClientRect();
  svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);
  svg.setAttribute('width',box.width);
  svg.setAttribute('height',box.height);
  svg.innerHTML='';
  const pts=dots.map(d=>{
    const r=d.getBoundingClientRect();
    return { x:r.left-box.left+r.width/2, y:r.top-box.top+r.height/2 };
  });
  for(let i=0;i<pts.length-1;i++){
    const ln=document.createElementNS('http://www.w3.org/2000/svg','line');
    ln.setAttribute('x1',pts[i].x);   ln.setAttribute('y1',pts[i].y);
    ln.setAttribute('x2',pts[i+1].x); ln.setAttribute('y2',pts[i+1].y);
    svg.appendChild(ln);
  }
}
window.drawTimelineLinks=drawTimelineLinks;
window.addEventListener('load',drawTimelineLinks);
window.addEventListener('resize',drawTimelineLinks);
/* перерисовать после появления секции (анимации reveal могут сдвинуть layout) */
setTimeout(drawTimelineLinks,300);
setTimeout(drawTimelineLinks,900);