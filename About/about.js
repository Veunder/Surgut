/* Снег — заполняем общий .snow контейнер хлопьями
   (если menu.js успеет раньше, он увидит уже заполненный контейнер и пропустит) */
   (function(){
    const box = document.getElementById('snow');
    if (!box || box.children.length > 0) return;
    const chars = ['❄','❅','❆','✦','•','❋','✧'];
    for (let i = 0; i < 70; i++){
      const f = document.createElement('div');
      f.className = 'flake';
      f.textContent = chars[Math.floor(Math.random()*chars.length)];
      f.style.left = Math.random()*100 + 'vw';
      f.style.fontSize = (8 + Math.random()*18) + 'px';
      f.style.animationDuration = (7 + Math.random()*11) + 's';
      f.style.animationDelay = (-Math.random()*14) + 's';
      f.style.opacity = .3 + Math.random()*.55;
      box.appendChild(f);
    }
  })();