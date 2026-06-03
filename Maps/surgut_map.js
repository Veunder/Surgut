/* ---------- снег ---------- */
(function snow(){
    const box=document.getElementById('snow');
    if(!box) return;
    const chars=['❄','❅','❆','•'];
    for(let i=0;i<60;i++){
      const f=document.createElement('div');
      f.className='flake';
      f.textContent=chars[Math.floor(Math.random()*chars.length)];
      f.style.left=Math.random()*100+'vw';
      f.style.fontSize=(8+Math.random()*18)+'px';
      f.style.animationDuration=(6+Math.random()*10)+'s';
      f.style.animationDelay=(-Math.random()*12)+'s';
      f.style.opacity=.25+Math.random()*.6;
      box.appendChild(f);
    }
  })();
  
  /* ---------- Яндекс.Карты: построение маршрутов ---------- */
  const SURGUT_COORDS=[61.254,73.396];
  
  const startInput=document.getElementById('startPoint');
  const endInput=document.getElementById('endPoint');
  const buildBtn=document.getElementById('buildRouteBtn');
  const geoBtn=document.getElementById('geoRouteBtn');
  const routeDetails=document.getElementById('routeDetails');
  
  let mapInstance=null;
  let currentRoute=null;
  
  function initMap(){
    mapInstance=new ymaps.Map('yandexMap',{
      center:SURGUT_COORDS,
      zoom:12,
      controls:['zoomControl','fullscreenControl']
    });
    const surgutPin=new ymaps.Placemark(
      SURGUT_COORDS,
      {balloonContent:'Сургут'},
      {preset:'islands#redIcon'}
    );
    mapInstance.geoObjects.add(surgutPin);
    buildRouteFromInputs();
  }
  
  function clearCurrentRoute(){
    if(currentRoute){
      mapInstance.geoObjects.remove(currentRoute);
      currentRoute=null;
    }
  }
  
  function attachRouteListener(multiRoute, fromLabel, toLabel){
    multiRoute.model.events.add('requestsuccess',()=>{
      const routes=multiRoute.getRoutes();
      if(routes && routes.length>0){
        const r=routes[0];
        const distance=r.properties.get('distance').text;
        const duration=r.properties.get('duration').text;
        routeDetails.innerHTML=`
          <p>✅ Маршрут построен</p>
          <p>🚗 ${distance}</p>
          <p>⏱️ ${duration}</p>
          <p>📍 ${fromLabel} → ${toLabel}</p>
        `;
      }
    });
    multiRoute.model.events.add('requestfail',()=>{
      routeDetails.innerHTML='<p>❌ Не удалось построить маршрут</p>';
    });
  }
  
  function buildRouteFromInputs(){
    if(!mapInstance) return;
    const startAddr=startInput.value.trim();
    const endAddr=endInput.value.trim();
    if(!startAddr || !endAddr){
      routeDetails.innerHTML='<p>⚠️ Заполните оба поля</p>';
      return;
    }
    clearCurrentRoute();
    const multiRoute=new ymaps.multirouter.MultiRoute(
      {
        referencePoints:[startAddr,endAddr],
        params:{routingMode:'auto'}
      },
      {
        boundsAutoApply:true,
        routeActiveStrokeColor:'f4c430',
        routeActiveStrokeWidth:5
      }
    );
    attachRouteListener(multiRoute, startAddr, endAddr);
    mapInstance.geoObjects.add(multiRoute);
    currentRoute=multiRoute;
  }
  
  function buildRouteFromUserLocation(){
    if(!mapInstance) return;
    if(!('geolocation' in navigator)){
      routeDetails.innerHTML='<p>❌ Геолокация не поддерживается браузером</p>';
      return;
    }
    routeDetails.innerHTML='<p>📡 Получаем геопозицию…</p>';
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const lat=position.coords.latitude;
        const lon=position.coords.longitude;
        clearCurrentRoute();
        const multiRoute=new ymaps.multirouter.MultiRoute(
          {
            referencePoints:[[lat,lon],SURGUT_COORDS],
            params:{routingMode:'auto'}
          },
          {
            boundsAutoApply:true,
            routeActiveStrokeColor:'2ecc71',
            routeActiveStrokeWidth:5
          }
        );
        attachRouteListener(multiRoute,'Моя геопозиция','Сургут');
        mapInstance.geoObjects.add(multiRoute);
        currentRoute=multiRoute;
      },
      ()=>{
        routeDetails.innerHTML='<p>❌ Не удалось получить геопозицию</p>';
      }
    );
  }
  
  buildBtn.addEventListener('click', buildRouteFromInputs);
  geoBtn.addEventListener('click', buildRouteFromUserLocation);
  
  /* ============================================================
     Пасхалка: нажми "A" или "А" — пролетает самолёт Aviasales.
     Клик по самолёту → открывает Aviasales с маршрутом до Сургута.
     Регистрируется ДО ymaps.ready(), чтобы пасхалка работала
     даже если API карт по какой-то причине не загрузится.
     ============================================================ */
  const AVIASALES_URL = (() => {
    /* дата вылета — через 30 дней */
    const d = new Date(); d.setDate(d.getDate() + 30);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    /* MOW → SGC (Москва → Сургут); измените origin_iata на свой город */
    return 'https://search.aviasales.com/flights/?origin_iata=MOW'
         + '&destination_iata=SGC'
         + '&depart_date=' + yyyy + '-' + mm + '-' + dd
         + '&adults=1&children=0&infants=0&trip_class=0&one_way=true';
  })();
  
  const PLANE_SVG = `
    <svg viewBox="0 0 470 70" xmlns="http://www.w3.org/2000/svg">
      <!-- трос от баннера к хвосту самолёта -->
      <line x1="262" y1="24" x2="362" y2="38" stroke="#0a1828" stroke-width="1.5"/>
  
      <!-- БАННЕР с надписью AVIASALES -->
      <path d="M18 22 Q70 16 130 22 T260 22
               L260 56 Q200 62 130 56 T18 56 Z"
            fill="#1976d2" stroke="#0a1828" stroke-width="2"/>
      <text x="138" y="45" text-anchor="middle"
            font-family="Arial Black, Arial, sans-serif"
            font-weight="900" font-size="21" fill="#ffffff" letter-spacing="2">
        AVIASALES
      </text>
  
      <!-- САМОЛЁТ -->
      <!-- хвост -->
      <path d="M365 38 L353 14 L373 14 L385 38 Z"
            fill="#1565c0" stroke="#0a1828" stroke-width="2" stroke-linejoin="round"/>
      <!-- крыло -->
      <path d="M395 44 L410 62 L438 62 L426 44 Z"
            fill="#1565c0" stroke="#0a1828" stroke-width="2" stroke-linejoin="round"/>
      <!-- фюзеляж -->
      <ellipse cx="412" cy="38" rx="58" ry="12"
               fill="#42a5f5" stroke="#0a1828" stroke-width="2"/>
      <!-- лобовое стекло -->
      <path d="M450 31 Q462 34 466 38 Q462 42 450 45 Z"
            fill="#bbdefb" stroke="#0a1828" stroke-width="1.5"/>
      <!-- нос -->
      <path d="M466 38 Q472 35 472 38 Q472 41 466 38 Z" fill="#0a1828"/>
      <!-- иллюминаторы -->
      <g fill="#e3f2fd" stroke="#0a1828" stroke-width="0.8">
        <circle cx="378" cy="37" r="2"/>
        <circle cx="392" cy="37" r="2"/>
        <circle cx="406" cy="37" r="2"/>
        <circle cx="420" cy="37" r="2"/>
        <circle cx="434" cy="37" r="2"/>
      </g>
    </svg>
  `;
  
  let planeFlying = false;
  function launchAviasalesPlane(){
    if(planeFlying) return;
    planeFlying = true;
    const plane = document.createElement('a');
    plane.className = 'aviasales-plane';
    plane.href = AVIASALES_URL;
    plane.target = '_blank';
    plane.rel = 'noopener noreferrer';
    plane.title = 'Aviasales — рейс до Сургута';
    plane.innerHTML = PLANE_SVG;
    document.body.appendChild(plane);
    plane.addEventListener('animationend', () => {
      plane.remove();
      planeFlying = false;
    });
  }
  
  document.addEventListener('keydown', (e) => {
    /* не мешать сочетаниям клавиш */
    if(e.ctrlKey || e.metaKey || e.altKey) return;
    /* не срабатывать при вводе в полях "Откуда" / "Куда" */
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if(tag === 'INPUT' || tag === 'TEXTAREA') return;
    /* поддержка латинской A/a и кириллической А/а, плюс физическая клавиша KeyA */
    const k = (e.key || '').toLowerCase();
    if(k === 'a' || k === 'а' || e.code === 'KeyA'){
      launchAviasalesPlane();
    }
  });
  
  /* запуск, когда API Яндекс.Карт готов */
  ymaps.ready(initMap);