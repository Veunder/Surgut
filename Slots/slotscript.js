/* ============================================================
   БАЗА ДАННЫХ МЕМОВ
   Замени этот массив на свою базу.
   Поля каждого мема:
     id      — уникальный номер
     name    — короткое название (видно на барабане и карточке)
     emoji   — иконка для барабана
     history — текст истории мема
     media   — { type:"image"|"video", url:"ссылка" }
   Для video.url можно дать mp4-файл или YouTube-embed ссылку.
   ============================================================ */
   const MEMES = [
    {
      id: 1,
      name: "Сургута не существует",
      emoji: "🛐",
      history: "Согласно этому мему, город якобы был уничтожен во времена СССР с помощью секретного оружия, а информация о его существовании — фейк, созданный властями. Теория распространялась через социальные сети (например, «ВКонтакте»), мессенджеры, а также на других платформах.",
      media: { type: "image", url: "https://i.pinimg.com/736x/22/40/1e/22401e8ad92d810dbde3574f7cd0cd4e.jpg" }
    },
    {
      id: 2,
      name: "Житель Сургута",
      emoji: "☢",
      history: "Типичный постироничный мем про жителей каких-либо городов, выставляя их сверх людьми",
      media: { type: "image", url: "https://i.pinimg.com/736x/23/57/61/235761d0978d5b06dc2dbeadc948fe17.jpg" }
    },
    {
      id: 3,
      name: "СУРГУУУТ",
      emoji: "❓",
      history: "Большинство людей даже не нают где именно находится Сургут из этого вытекает: данный мем",
      media: { type: "image", url: "https://i.pinimg.com/736x/ea/b7/83/eab7836db86958ab6c0b02f25f43aaef.jpg" }
    },
    {
      id: 4,
      name: "Алексей Очкалов",
      emoji: "⚡",
      history: "Алексей Очкалов попоулярный публицист, который жил в Сургуте и в своём telegram канале публиковал мемы про Сургут",
      media: { type: "image", url: "https://i.pinimg.com/736x/f9/32/64/f932648da82704992a2bd78db4db1a87.jpg" }
    },
    {
      id: 5,
      name: "Вход В СУРГУТ",
      emoji: "💥",
      history: "Из-за своей непопулярности, сургут часто описывают как адское и ужасное место.",
      media: { type: "image", url: "https://i.pinimg.com/736x/02/11/f1/0211f10a62bccb5259226155d6e781f8.jpg" }
    },
    {
      id: 6,
      name: "СУРГУТ",
      emoji: "🌌",
      history: "Из-за своей непопулярности, сургут часто описывают как адское и ужасное место.",
      media: { type: "image", url: "https://i.pinimg.com/736x/a3/1a/a1/a31aa180a33f6957f2d430482d60db5d.jpg" }
    },
    {
      id: 7,
      name: "нАСЕЛЕНИЕ",
      emoji: "🏙",
      history: "Постироничный мем про Сургут, ничего необычного.",
      media: { type: "image", url: "https://i.pinimg.com/736x/29/4c/18/294c18199a59ea417bbd85ebc97c7e6e.jpg" }
    },
    {
      id: 8,
      name: "Сургут существует",
      emoji: "✅",
      history: "И в противовес мему про несуществование Сургута, есть мем про его существование.",
      media: { type: "image", url: "https://avatars.mds.yandex.net/i?id=e6004c5edf3b3fec20a0d5127e381cb05d15b04e-15423261-images-thumbs&n=13" }
    }
  ];
  /* ============================================================ */
  
  /* ---------- генерация снега ---------- */
  (function snow(){
    const box = document.getElementById('snow');
    const chars = ['❄','❅','❆','•'];
    for(let i=0;i<60;i++){
      const f = document.createElement('div');
      f.className='flake';
      f.textContent = chars[Math.floor(Math.random()*chars.length)];
      f.style.left = Math.random()*100+'vw';
      f.style.fontSize = (8+Math.random()*18)+'px';
      f.style.animationDuration = (6+Math.random()*10)+'s';
      f.style.animationDelay = (-Math.random()*12)+'s';
      f.style.opacity = .25+Math.random()*.6;
      box.appendChild(f);
    }
  })();
  
  /* ============================================================
     ЗВУК — Web Audio API, без файлов
     ============================================================ */
  const Sound = (function(){
    let ctx = null, enabled = true;
    function ac(){
      if(!ctx) ctx = new (window.AudioContext||window.webkitAudioContext)();
      if(ctx.state==='suspended') ctx.resume();
      return ctx;
    }
    /* короткий тон */
    function tone(freq,dur,type,vol,when){
      if(!enabled) return;
      const c = ac(), t = c.currentTime+(when||0);
      const osc = c.createOscillator(), g = c.createGain();
      osc.type=type||'square'; osc.frequency.value=freq;
      g.gain.setValueAtTime(0,t);
      g.gain.linearRampToValueAtTime(vol||0.15,t+0.01);
      g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
      osc.connect(g); g.connect(c.destination);
      osc.start(t); osc.stop(t+dur);
    }
    return {
      setEnabled(v){enabled=v;},
      isEnabled(){return enabled;},
      unlock(){ac();},
      /* щелчки во время кручения барабана */
      spinTicks(durationMs){
        if(!enabled) return;
        let elapsed=0, gap=55;
        const tick=()=>{
          if(elapsed>durationMs || !enabled) return;
          tone(420+Math.random()*120,0.04,'square',0.06);
          elapsed+=gap; gap*=1.06;          /* замедляется к концу */
          setTimeout(tick,gap);
        };
        tick();
      },
      /* барабан остановился */
      reelStop(){
        tone(180,0.12,'sine',0.22);
        tone(90,0.18,'sine',0.18,0.02);
      },
      /* наведение/выбор карточки */
      blip(){ tone(660,0.08,'triangle',0.12); },
      select(){
        tone(523,0.1,'triangle',0.16);
        tone(784,0.14,'triangle',0.16,0.09);
      },
      /* джекпот — восходящая фанфара */
      jackpot(){
        if(!enabled) return;
        const notes=[523,659,784,1047,1319];
        notes.forEach((n,i)=>tone(n,0.32,'square',0.16,i*0.12));
        notes.forEach((n,i)=>tone(n*2,0.32,'sine',0.07,i*0.12));
        tone(1568,0.7,'square',0.14,notes.length*0.12);
      },
      /* взрыв фейерверка — свист + хлопок */
      boom(){
        if(!enabled) return;
        const c = ac(), t = c.currentTime;
        /* свист подъёма */
        const w = c.createOscillator(), wg = c.createGain();
        w.type='sine';
        w.frequency.setValueAtTime(280,t);
        w.frequency.exponentialRampToValueAtTime(900,t+0.18);
        wg.gain.setValueAtTime(0.05,t);
        wg.gain.exponentialRampToValueAtTime(0.0001,t+0.2);
        w.connect(wg); wg.connect(c.destination);
        w.start(t); w.stop(t+0.22);
        /* хлопок — шумовой всплеск */
        const dur=0.32, sr=c.sampleRate;
        const buf=c.createBuffer(1,sr*dur,sr), d=buf.getChannelData(0);
        for(let i=0;i<d.length;i++){
          d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);
        }
        const src=c.createBufferSource(), ng=c.createGain();
        src.buffer=buf;
        ng.gain.setValueAtTime(0.22,t+0.18);
        ng.gain.exponentialRampToValueAtTime(0.0001,t+0.18+dur);
        src.connect(ng); ng.connect(c.destination);
        src.start(t+0.18);
      }
    };
  })();
  
  /* sound toggle button */
  const soundToggle = document.getElementById('soundToggle');
  soundToggle.addEventListener('click',()=>{
    const on = !Sound.isEnabled();
    Sound.setEnabled(on);
    soundToggle.textContent = on ? '🔊' : '🔇';
    if(on){ Sound.unlock(); Sound.blip(); }
  });
  
  /* ---------- элементы ---------- */
  const CELL_H = 150;
  const strips = [0,1,2].map(i=>document.getElementById('strip'+i));
  const reels  = document.querySelectorAll('.reel');
  const spinBtn = document.getElementById('spinBtn');
  const againBtn = document.getElementById('againBtn');
  const hint = document.getElementById('hint');
  const machine = document.getElementById('machine');
  const chooseBox = document.getElementById('choose');
  const cardsBox = document.getElementById('cards');
  const resultBox = document.getElementById('result');
  const jackpotBanner = document.getElementById('jackpotBanner');
  
  let spinning = false;
  let currentThree = [];
  
  function cellHTML(m){
    return '<div class="cell"><div class="emoji">'+m.emoji+'</div>'+
           '<div class="name">'+m.name+'</div></div>';
  }
  
  function buildStrip(strip, target){
    const REPEAT = 28;
    let html = '';
    for(let i=0;i<REPEAT-1;i++){
      const rnd = MEMES[Math.floor(Math.random()*MEMES.length)];
      html += cellHTML(rnd);
    }
    html += cellHTML(target);
    strip.innerHTML = html;
    return REPEAT;
  }
  
  /* три РАЗНЫХ мема — обычный спин */
  function pickThree(){
    const pool = [...MEMES];
    const out = [];
    for(let i=0;i<3 && pool.length;i++){
      out.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
    }
    return out;
  }
  
  /* три ОДИНАКОВЫХ мема — джекпот (3 в ряд) */
  function pickJackpot(){
    const m = MEMES[Math.floor(Math.random()*MEMES.length)];
    return [m,m,m];
  }
  
  function spinReel(strip, reelEl, target, delayMs){
    return new Promise(resolve=>{
      const total = buildStrip(strip, target);
      const endY = -(total-1)*CELL_H;
      strip.style.transition='none';
      strip.style.transform='translateY(0px)';
      reelEl.classList.remove('win');
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          const dur = 2400 + delayMs;
          strip.style.transition='transform '+dur+'ms cubic-bezier(.15,.85,.25,1)';
          strip.style.transform='translateY('+endY+'px)';
          setTimeout(()=>{
            reelEl.classList.add('win');
            Sound.reelStop();
            resolve();
          }, dur);
        });
      });
    });
  }
  
  /* ---------- главный спин ---------- */
  async function spin(){
    if(spinning) return;
    spinning = true;
    Sound.unlock();
    spinBtn.disabled = true;
    hint.textContent = 'Барабаны крутятся...';
    chooseBox.classList.remove('show');
    resultBox.classList.remove('show');
    reels.forEach(r=>r.classList.remove('jackpot'));
  
    /* джекпот решается ДО кручения: 5% шанс выбить 3 в ряд */
    const isJackpot = Math.random() < 0.05;
    currentThree = isJackpot ? pickJackpot() : pickThree();
  
    /* щелчки на всё время самого долгого барабана */
    Sound.spinTicks(2400 + 900);
  
    await Promise.all([
      spinReel(strips[0], reels[0], currentThree[0], 0),
      spinReel(strips[1], reels[1], currentThree[1], 450),
      spinReel(strips[2], reels[2], currentThree[2], 900)
    ]);
  
    spinning = false;
  
    if(isJackpot){
      triggerJackpot();
    } else {
      hint.textContent = 'Готово! Выбери один мем ниже';
      showChoices();
    }
  }
  
  /* ---------- ДЖЕКПОТ — 3 в ряд ---------- */
  function triggerJackpot(){
    hint.textContent = '★ ДЖЕКПОТ — 3 В РЯД! ★';
    machine.classList.add('shake');
    reels.forEach(r=>{r.classList.remove('win');r.classList.add('jackpot');});
    Sound.jackpot();
    jackpotBanner.classList.add('show');
    launchFireworks();
    setTimeout(()=>{
      machine.classList.remove('shake');
      jackpotBanner.classList.remove('show');
      reels.forEach(r=>r.classList.remove('jackpot'));
      hint.textContent = 'Тебе выпал особый мем';
      showChoices();
    }, 4000);
  }
  
  /* ---------- фейерверк на canvas ---------- */
  const fxCanvas = document.getElementById('confetti');
  const fctx = fxCanvas.getContext('2d');
  let fxParticles = [], fxRAF = null;
  
  function resizeCanvas(){
    fxCanvas.width = window.innerWidth;
    fxCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  /* один разрыв фейерверка в точке (x,y) */
  function burst(x,y){
    const palette = [
      ['#fff8d0','#f4c430','#b8860b'],
      ['#d6f4ff','#7fd4f0','#2b8fb3'],
      ['#ffd6d6','#ff6b6b','#c0392b'],
      ['#d6ffe0','#2ecc71','#1e8a4c'],
      ['#ffe6cc','#ffa94d','#d9822b']
    ][Math.floor(Math.random()*5)];
    const count = 46 + Math.floor(Math.random()*22);
    for(let i=0;i<count;i++){
      const ang = (Math.PI*2*i)/count + Math.random()*0.2;
      const speed = 2.4 + Math.random()*4.4;
      fxParticles.push({
        x:x, y:y,
        vx:Math.cos(ang)*speed,
        vy:Math.sin(ang)*speed,
        color:palette[Math.floor(Math.random()*palette.length)],
        size:1.6+Math.random()*2.4,
        life:1,
        decay:0.012+Math.random()*0.016,
        trail:[]
      });
    }
  }
  
  function launchFireworks(){
    fxParticles = [];
    if(fxRAF) cancelAnimationFrame(fxRAF);
    const start = performance.now();
    const W = fxCanvas.width, H = fxCanvas.height;
  
    /* серия залпов в разных точках экрана */
    const shots = [
      [0,    W*0.25, H*0.30],
      [250,  W*0.70, H*0.24],
      [500,  W*0.48, H*0.42],
      [800,  W*0.18, H*0.46],
      [1050, W*0.82, H*0.40],
      [1350, W*0.38, H*0.22],
      [1650, W*0.62, H*0.50],
      [2000, W*0.50, H*0.30],
      [2350, W*0.28, H*0.38],
      [2700, W*0.74, H*0.32]
    ];
    shots.forEach(([delay,x,y])=>{
      setTimeout(()=>{ burst(x,y); Sound.boom(); }, delay);
    });
  
    function frame(now){
      const t = now-start;
      /* лёгкий шлейф вместо полной очистки */
      fctx.globalCompositeOperation='source-over';
      fctx.fillStyle='rgba(13,27,42,0.22)';
      fctx.fillRect(0,0,fxCanvas.width,fxCanvas.height);
      fctx.globalCompositeOperation='lighter';
  
      fxParticles.forEach(p=>{
        p.vy += 0.045;            /* гравитация */
        p.vx *= 0.985;            /* сопротивление воздуха */
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        fctx.globalAlpha = Math.max(0,p.life);
        fctx.fillStyle = p.color;
        fctx.beginPath();
        fctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        fctx.fill();
      });
      fxParticles = fxParticles.filter(p=>p.life>0);
      fctx.globalAlpha = 1;
  
      if(t<4200){
        fxRAF=requestAnimationFrame(frame);
      } else {
        fctx.globalCompositeOperation='source-over';
        fctx.clearRect(0,0,fxCanvas.width,fxCanvas.height);
      }
    }
    fxRAF=requestAnimationFrame(frame);
  }
  
  /* ---------- фаза выбора ---------- */
  function showChoices(){
    cardsBox.innerHTML = '';
    /* при джекпоте все три одинаковы — показываем одну большую карточку */
    const same = currentThree[0]===currentThree[1] && currentThree[1]===currentThree[2];
    const list = same ? [currentThree[0]] : currentThree;
    list.forEach((m, idx)=>{
      const card = document.createElement('div');
      card.className='card'+(same?' jackpot-card':'');
      card.innerHTML =
        (same?'<div class="ribbon">3 в ряд</div>':'')+
        '<div class="emoji">'+m.emoji+'</div>'+
        '<div class="name">'+m.name+'</div>'+
        '<span class="pick">'+(same?'Открыть':'Выбрать')+'</span>';
      card.style.animation='fadeUp .5s '+(idx*.12)+'s both';
      card.addEventListener('mouseenter',()=>Sound.blip());
      card.addEventListener('click',()=>{Sound.select();showResult(m);});
      cardsBox.appendChild(card);
    });
    chooseBox.querySelector('h2').textContent = same
      ? 'ДЖЕКПОТ! Особый мем твой'
      : 'Выпало 3 мема — выбери один';
    chooseBox.classList.add('show');
    chooseBox.scrollIntoView({behavior:'smooth',block:'center'});
  }
  
  /* ---------- фаза результата ---------- */
  function showResult(m){
    const media = document.getElementById('media');
    if(m.media && m.media.type==='video'){
      if(/youtube|youtu\.be/.test(m.media.url)){
        media.innerHTML = '<iframe width="100%" height="420" src="'+m.media.url+
          '" frameborder="0" allowfullscreen></iframe>';
      } else {
        media.innerHTML = '<video controls autoplay muted loop><source src="'+
          m.media.url+'"></video>';
      }
    } else if(m.media){
      media.innerHTML = '<img src="'+m.media.url+'" alt="'+m.name+
        '" onerror="this.parentNode.innerHTML=\'<div style=&quot;padding:60px;text-align:center;color:#9bb3c7&quot;>Изображение не загрузилось</div>\'">';
    } else {
      media.innerHTML = '<div style="padding:60px;text-align:center;font-size:5rem">'+m.emoji+'</div>';
    }
    document.getElementById('resTitle').textContent = m.name;
    document.getElementById('resTag').textContent = 'Мем №'+m.id+' · Сургут';
    document.getElementById('resHistory').textContent = m.history;
  
    chooseBox.classList.remove('show');
    resultBox.classList.add('show');
    resultBox.scrollIntoView({behavior:'smooth',block:'center'});
  }
  
  /* ---------- кнопки ---------- */
  spinBtn.addEventListener('click', spin);
  againBtn.addEventListener('click', ()=>{
    Sound.blip();
    resultBox.classList.remove('show');
    spinBtn.disabled = false;
    hint.textContent = 'Нажми «Крутить», чтобы выбить 3 мема';
    machine.scrollIntoView({behavior:'smooth',block:'center'});
  });
  
  /* начальное состояние барабанов */
  [0,1,2].forEach(i=>buildStrip(strips[i], MEMES[i%MEMES.length]));
  [0,1,2].forEach(i=>{
    strips[i].style.transform='translateY('+(-(27)*CELL_H)+'px)';
  });
  