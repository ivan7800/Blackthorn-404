const CACHE='blackthorn404-v1.1.4-combat-animation';
const SHELL=['./','./index.html','./css/app.css?v=1.1.4','./js/bundle.js?v=1.1.4','./js/combat-animation-hotfix.js?v=1.1.4','./manifest.webmanifest?v=1.1.4','./assets/icons/icon.svg','./assets/icons/icon-192.png','./assets/icons/icon-512.png','./assets/art/title_hero.jpg','./assets/art/scene_manor.png','./assets/art/scene_medieval.png','./assets/art/scene_ancient.png','./assets/art/scene_modern.png','./assets/art/scene_boss.png','./assets/art/scene_void.png'];
const OPTIONAL=[];
const CORE_RE=/\/(?:js\/bundle\.js|js\/combat-animation-hotfix\.js|css\/app\.css|manifest\.webmanifest)$/;
self.addEventListener('install',event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(SHELL);await Promise.allSettled(OPTIONAL.map(x=>c.add(x)));await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('blackthorn404-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{try{const res=await fetch(event.request,{cache:'no-store'});if(res&&res.ok){const c=await caches.open(CACHE);await c.put('./index.html',res.clone());}return res;}catch{return (await caches.match('./index.html'))||(await caches.match('./'));}})());
    return;
  }
  if(CORE_RE.test(url.pathname)){
    event.respondWith((async()=>{try{const res=await fetch(event.request,{cache:'no-store'});if(res&&res.ok){const c=await caches.open(CACHE);await c.put(event.request,res.clone());}return res;}catch{return (await caches.match(event.request))||Response.error();}})());
    return;
  }
  event.respondWith((async()=>{const cached=await caches.match(event.request);const refresh=fetch(event.request).then(async res=>{if(res&&res.ok){const c=await caches.open(CACHE);await c.put(event.request,res.clone());}return res;}).catch(()=>null);if(cached){event.waitUntil(refresh);return cached;}return (await refresh)||Response.error();})());
});
