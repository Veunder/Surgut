/* ============================================================
   Меню сайта (бургер + всплывающее окно).
   Сам внедряется в DOM при загрузке страницы.
   Автоматически определяет, в подпапке ли мы (Slots/),
   и подставляет правильные относительные пути.
   ============================================================ */
(function(){
  const pathLower = window.location.pathname.toLowerCase();
  /* если страница лежит в /Slots/ — нужно подняться на уровень выше */
  const inSlots = pathLower.includes('/slots/');
  const prefix = inSlots ? '../' : '';

  /* пункты меню — БЕЗ ссылки на лендинг (туда возвращаемся по клику на «СУРГУТ») */
  const items = [
    { ico:'🎰', label:'Слот-машина мемов',    href: prefix + 'Slots/slot_machine.html' },
    { ico:'🗺️', label:'Маршруты по городу',   href: prefix + 'Maps/surgut_map.html' },
    { ico:'⭐', label:'Известные люди Сургута',        href: prefix + 'Fame/famous_people.html' },
    { ico:'ℹ️', label:'О нас',                 href: prefix + 'About/about.html' }
  ];

  /* текущий файл для подсветки активного пункта */
  const currentFile = (pathLower.split('/').pop() || '').toLowerCase();

  /* ---------- кнопка-бургер ---------- */
  const btn = document.createElement('button');
  btn.className = 'menu-burger';
  btn.type = 'button';
  btn.setAttribute('aria-label','Открыть меню');
  btn.setAttribute('aria-expanded','false');
  btn.innerHTML =
    '<span class="bar"></span>' +
    '<span class="bar"></span>' +
    '<span class="bar"></span>';

  /* ---------- оверлей с меню ---------- */
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML =
    '<nav class="menu-card" role="dialog" aria-label="Меню сайта">' +
      '<h2>Меню</h2>' +
      '<ul>' +
        items.map(function(i){
          const fname = i.href.split('/').pop().toLowerCase();
          const cur = fname === currentFile ? ' current' : '';
          return '<li><a href="'+i.href+'" class="'+cur.trim()+'">'+
                 '<span class="ico">'+i.ico+'</span>'+
                 '<span class="lbl">'+i.label+'</span>'+
                 '</a></li>';
        }).join('') +
      '</ul>' +
    '</nav>';

  /* добавляем в body, когда DOM готов */
  function inject(){
    document.body.appendChild(btn);
    document.body.appendChild(overlay);
    populateSnowIfEmpty();
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  /* ---------- открыть / закрыть ---------- */
  function setOpen(open){
    btn.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    btn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  btn.addEventListener('click', function(){
    setOpen(!btn.classList.contains('open'));
  });
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) setOpen(false);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && btn.classList.contains('open')) setOpen(false);
  });

  /* ---------- снег: если на странице есть <div class="snow">, но он пустой
                — заполнить его. Если страница сама заполняет .snow,
                этот код не помешает (children.length будет > 0). ---------- */
  function populateSnowIfEmpty(){
    const box = document.querySelector('.snow');
    if(!box || box.children.length > 0) return;
    const chars = ['❄','❅','❆','•'];
    for(let i=0;i<60;i++){
      const f = document.createElement('div');
      f.className = 'flake';
      f.textContent = chars[Math.floor(Math.random()*chars.length)];
      f.style.left = Math.random()*100 + 'vw';
      f.style.fontSize = (8 + Math.random()*18) + 'px';
      f.style.animationDuration = (6 + Math.random()*10) + 's';
      f.style.animationDelay = (-Math.random()*12) + 's';
      f.style.opacity = .25 + Math.random()*.6;
      box.appendChild(f);
    }
  }
})();
