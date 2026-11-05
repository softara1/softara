/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v2.2.0 — النواة المشتركة (Softara Shared Core)
   أدوات مساعدة + تخزين محلي + إشعارات + ألوان التصنيفات + ملصقات SVG
   + محمّلات hls.js وYouTube IFrame API كسولًا + تفضيل الترجمة الموحّد
   ★ مشترك بين صفحتي: Softara Live TV وSoftara Movies & Media
   ★ لا يحتوي أي منطق عرض — ذلك في softara-live-app.js / softara-media-app.js
     ومحرك المشغل في softara-player.js
   ════════════════════════════════════════════════════════════════ */
window.STV=(function(){
'use strict';
var d=document,w=window;

/* ─────────── الإعدادات المشتركة ─────────── */
var CONFIG={
  hlsSrc:'https://cdn.jsdelivr.net/npm/hls.js@1.7.4/dist/hls.min.js',
  hlsSrcFallback:'https://unpkg.com/hls.js@1.7.4/dist/hls.min.js' /* بديل موثوق يعمل من أي نطاق */,
  storage:{ favs:'stv_v2_favs', prog:'stv_v2_progress', theme:'stv_v2_theme', cc:'stv_cc' }
};

/* ترجمة VTT تجريبية مدمجة (توضيحية — تُستخدم فقط إذا طلبت البيانات ترجمة خارجية بلا رابط) */
var DEMO_AR_VTT='WEBVTT\nNOTE ترجمة تجريبية توضيحية — لعرض إمكانية الترجمة الخارجية (VTT) في مشغل سوفتارا TV.\nNOTE فيلم Big Buck Bunny لا يحتوي حوارًا أصلًا؛ هذه أوصاف مشاهد مكتوبة للعرض.\n\n1\n00:00:00.000 --> 00:00:08.000\nترجمة تجريبية — عرض إمكانية الترجمة الخارجية (ملف VTT مستقل)\n\n2\n00:00:08.000 --> 00:00:16.000\nالفيلم: Big Buck Bunny (2008) — فيلم قصير مفتوح المصدر من Blender Foundation\n\n3\n00:00:16.000 --> 00:00:24.000\nالمشهد: شاشة الافتتاح — شعار الاستوديو يظهر على خلفية داكنة\n\n4\n00:00:24.000 --> 00:00:32.000\nتُفتح الكاميرا على غابة هادئة في ضوء الصباح داخل وادٍ أخضر\n\n5\n00:00:32.000 --> 00:00:40.000\nيخرج الأرنب الكبير من جحوره داخل الشجرة ويتمدد تحت أشعة الشمس\n\n6\n00:00:40.000 --> 00:00:48.000\n[وصف مشهد تجريبي — الفيلم بلا حوار، فالأوصاف تُستخدم بديلًا عن الحوار]\n\n7\n00:00:48.000 --> 00:00:56.000\nفراشة ملونة ترفرف حول الأرنب وتثير اهتمامه ببطء\n\n8\n00:00:56.000 --> 00:01:04.000\nيلحق الأرنب بالفراشة بخطوات ثقيلة بين الأعشاب العالية\n\n9\n00:01:04.000 --> 00:01:12.000\nمشاهد كوميدية هادئة بلا كلام تناسب جميع الأعمار\n\n10\n00:01:12.000 --> 00:01:20.000\nالكاميرا تتبع الأرنب عبر مرج الأزهار المتلألئ\n\n11\n00:01:20.000 --> 00:01:26.000\nيمكنك إيقاف هذه الترجمة من قائمة CC في شريط التحكم — وسيتذكّرها المشغل\n\n12\n00:01:26.000 --> 00:01:30.000\nنهاية قسم الترجمة التجريبي لأول 90 ثانية من الفيلم';

/* ─────────── أدوات مساعدة ─────────── */
function $(s){return d.querySelector(s)}
function icon(n,fill){return '<svg class="ic'+(fill?' ic-fill':'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>'}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fmtT(t){t=Math.max(0,Math.floor(t||0));var h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60,p=function(n){return (n<10?'0':'')+n};return (h?h+':'+p(m):p(m))+':'+p(s)}
function fmtAgo(ts){var m=Math.floor((Date.now()-ts)/60000);if(m<1)return 'الآن';if(m<60)return 'قبل '+m+' د';var h=Math.floor(m/60);if(h<24)return 'قبل '+h+' س';return 'قبل '+Math.floor(h/24)+' يوم'}
var IS_IOS=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
if(IS_IOS)d.documentElement.classList.add('stv-ios');
var store={
  get:function(k,f){try{var v=localStorage.getItem(k);return v==null?f:JSON.parse(v)}catch(_){return f}},
  set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}}
};
function toast(msg,isErr){
  var box=$('#stvToasts');if(!box)return;
  var t=d.createElement('div');t.className='stv-toast'+(isErr?' err':'');
  t.innerHTML=icon(isErr?'alert':'check')+'<span>'+esc(msg)+'</span>';
  box.appendChild(t);setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(function(){t.remove()},320)},3000);
}

/* ألوان حسب التصنيف */
var CAT_COLORS={'أخبار':['#0ea5a0','#0f766e'],'رياضة':['#f5a524','#b45309'],'رياضية':['#f5a524','#b45309'],'وثائقي':['#84cc16','#3f6212'],'عامة':['#14b8a6','#115e59'],'أنيميشن':['#22c55e','#15803d'],'خيال علمي':['#fb923c','#c2410c'],'فانتازيا':['#34d399','#047857'],'برامج وثائقية':['#2dd4bf','#0f766e'],'أفلام قصيرة':['#a3e635','#3f6212'],'عروض':['#f87171','#991b1b'],'عائلي':['#fbbf24','#92400e'],'غموض':['#fb923c','#9a3412'],'رعب':['#ef4444','#7f1d1d'],'كوميديا':['#fbbf24','#92400e'],'كوميديا صامتة':['#d97706','#92400e'],'برامج ترفيهية':['#f472b6','#9d174d'],'ترفيهية':['#f472b6','#9d174d'],'رياضة قتالية':['#f5a524','#b45309'],'تجريبي':['#34d399','#065f46'],'أطفال':['#fbbf24','#92400e']};
function catColors(cat){return CAT_COLORS[cat]||['#2dd4bf','#115e59']}
function gradCss(cat){var c=catColors(cat);return 'linear-gradient(135deg,'+c[0]+','+c[1]+')'}

/* ملصق SVG مولَّد (بديل عن الصور الخارجية — يعمل دائمًا وبدون تحميل) */
function posterSVG(it,w,h){
  w=w||600;h=h||900;var c=catColors(it.cat||it.kind);
  var name=it.name||'';var words=name.split(' ');var l1='',l2='';
  for(var i=0;i<words.length;i++){ if((l1+' '+words[i]).trim().length<=20&&i<Math.ceil(words.length/2)||(l2===''&&l1.length>6)) {if(l1.length+words[i].length<20&&l2===''){l1=(l1+' '+words[i]).trim()}else{l2=(l2+' '+words[i]).trim()}} }
  if(!l1)l1=name;
  var kindLabel={movie:'فيلم',series:'مسلسل',program:'برنامج',wrestling:'مصارعة',channel:'قناة',docs:'وثائقي',kids:'أطفال'}[it.kind]||'';
  var svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 600 900">'
    +'<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></linearGradient>'
    +'<linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(0,0,0,0)"/><stop offset="1" stop-color="rgba(2,10,8,.88)"/></linearGradient></defs>'
    +'<rect width="600" height="900" fill="url(#g)"/>'
    +'<circle cx="470" cy="180" r="230" fill="rgba(255,255,255,.10)"/><circle cx="110" cy="700" r="180" fill="rgba(2,10,8,.14)"/>'
    +'<path d="M240 330v240a22 22 0 0 0 33 19l190-120a22 22 0 0 0 0-38l-190-120a22 22 0 0 0-33 19Z" fill="rgba(255,255,255,.22)"/>'
    +'<rect width="600" height="900" fill="url(#s)"/>'
    +'<text x="300" y="78" text-anchor="middle" font-family="Cairo,Tahoma,sans-serif" font-size="24" font-weight="800" fill="rgba(255,255,255,.85)">سوفتارا TV</text>'
    +'<text x="300" y="740" text-anchor="middle" font-family="Cairo,Tahoma,sans-serif" font-size="40" font-weight="900" fill="#fff">'+esc(l1)+'</text>'
    +(l2?'<text x="300" y="792" text-anchor="middle" font-family="Cairo,Tahoma,sans-serif" font-size="40" font-weight="900" fill="#fff">'+esc(l2)+'</text>':'')
    +'<text x="300" y="846" text-anchor="middle" font-family="Cairo,Tahoma,sans-serif" font-size="22" font-weight="700" fill="rgba(255,255,255,.75)">'+esc([kindLabel,it.year,it.cat].filter(Boolean).join(' · '))+'</text>'
    +'</svg>';
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}

/* ── المزوّدون: تسميات وقدرات صادقة (ما لا تتيحه المنصة يُعرض للمستخدم كما هو) ── */
var PROVIDERS={
  hls:        {label:'HLS · M3U8'},
  mp4:        {label:'MP4'},
  youtube:    {label:'YouTube'},
  dailymotion:{label:'DailyMotion'}, /* لا SDK تحكم عام — التشغيل/الصوت/الجودة من واجهة المشغل الداخلية */
  okru:       {label:'OK.ru'}        /* لا SDK ولا أحداث رسمية — نفس القيد */
};

/* ── تحميل hls.js كسولًا (CDN أساسي + نسخة بديلة) ── */
var hlsPromise=null;
function ensureHls(){
  if(w.Hls&&w.Hls.isSupported())return Promise.resolve(w.Hls);
  if(hlsPromise)return hlsPromise;
  hlsPromise=new Promise(function(res,rej){
    var tryLoad=function(src,next){
      var s=d.createElement('script');s.src=src;s.async=true;
      s.onload=function(){ (w.Hls&&w.Hls.isSupported())?res(w.Hls):next?next():rej(new Error('no-hls')) };
      s.onerror=function(){ s.remove(); next?next():rej(new Error('hls-load-failed')) };
      d.head.appendChild(s);
    };
    tryLoad(CONFIG.hlsSrc,function(){ tryLoad(CONFIG.hlsSrcFallback,null) });
  });
  /* عند الفشل نسمح بإعادة المحاولة لاحقًا بدل قفل الوعد المرفوض للأبد (مراجعة T7) */
  hlsPromise.catch(function(){hlsPromise=null});
  return hlsPromise;
}
/* ── YouTube IFrame API (كسول) ── */
var ytPromise=null;
function ensureYT(){
  if(w.YT&&w.YT.Player)return Promise.resolve(w.YT);
  if(ytPromise)return ytPromise;
  ytPromise=new Promise(function(res,rej){
    var done=false;
    /* مراجعة T7: سلسلة أي معالج سابق للصفحة المضيفة + onerror يرفض بدل وعد معلق أبدًا */
    var prev=w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady=function(){ try{if(prev)prev()}catch(_){} if(!done){done=true;res(w.YT)} };
    var s=d.createElement('script');s.src='https://www.youtube.com/iframe_api';s.async=true;
    s.onerror=function(){ if(!done){done=true;rej(new Error('yt-load-failed'))} };
    d.head.appendChild(s);
  });
  ytPromise.catch(function(){ytPromise=null});
  /* إن لم يجهز السكربت خلال 20 ثانية نسمح بإعادة المحاولة في النداء التالي (مراجعة T7) */
  var to=setTimeout(function(){ if(!w.YT||!w.YT.Player)ytPromise=null },20000);
  ytPromise.then(function(){clearTimeout(to)},function(){clearTimeout(to)});
  return ytPromise;
}

/* ── تفضيل الترجمة الموحّد (يُحفظ محليًا وينطبق على كل فيديو جديد) ── */
var ccPref=store.get(CONFIG.storage.cc,{on:false,lang:''});
function saveCcPref(){store.set(CONFIG.storage.cc,ccPref)}

/* ── المفضلة المشتركة (نفس مفاتيح v2.1.2 → تفضيلات المستخدم تُحفظ عبر الترقية) ── */
var favs=store.get(CONFIG.storage.favs,[]);
function isFav(id){return favs.indexOf(id)>-1}
function toggleFav(id){
  var i=favs.indexOf(id);
  if(i>-1){favs.splice(i,1);toast('أُزيل من المفضلة')}else{favs.push(id);toast('أُضيف إلى المفضلة ★')}
  store.set(CONFIG.storage.favs,favs);
  return isFav(id);
}
function favCount(){return favs.length}

/* ── السمة (ليلي/نهاري) — مشتركة وربطها تلقائي عند وجود الأزرار ── */
var theme=store.get(CONFIG.storage.theme,'dark');
function applyTheme(){
  d.documentElement.setAttribute('data-theme',theme);
  var ic=$('#stvThemeIc');if(ic)ic.setAttribute('href',theme==='dark'?'#i-sun':'#i-moon');
  var mt=$('#stvMetaTheme');if(mt)mt.setAttribute('content',theme==='dark'?'#0a0f0d':'#f2f6f4');
}
function bindThemeBtn(){
  var b=$('#stvThemeBtn');
  if(b&&!b.dataset.stvBound){b.dataset.stvBound='1';b.addEventListener('click',function(){theme=theme==='dark'?'light':'dark';store.set(CONFIG.storage.theme,theme);applyTheme()})}
}

/* شريط الأخبار المشترك */
function renderTicker(list){
  var track=$('#stvTickerTrack');if(!track)return;
  var chunk=(list||[]).map(function(n){return '<span>'+esc(n)+'<i class="sep"></i></span>'}).join('');
  if(!chunk){var tk=$('#stvTicker');if(tk)tk.style.display='none';return}
  /* مراجعة T7: النسخة المكررة للتمرير السلس مخفية عن قارئات الشاشة والأصل مقروء */
  track.innerHTML=chunk+'<span aria-hidden="true" style="display:contents">'+chunk+'</span>';
  track.style.setProperty('--tick-dur',Math.max(30,list.length*9)+'s');
}

/* المقدمة الافتتاحية: SVG/CSS خالص، مرة كل جلسة لكل صفحة، قابلة للتخطي، تحترم تقليل الحركة */
function maybeIntro(storageKey,onDone){
  var el=$('#stvIntro');
  var done=onDone||function(){};
  if(!el){done();return}
  var seen=false;
  try{seen=sessionStorage.getItem(storageKey)==='1'}catch(_){}
  if(seen){ if(el.parentNode)el.parentNode.removeChild(el); done(); return }
  el.classList.add('show');el.setAttribute('aria-hidden','false');
  var finished=false;
  var finish=function(){
    if(finished)return;finished=true;
    try{sessionStorage.setItem(storageKey,'1')}catch(_){}
    el.classList.add('out');el.setAttribute('aria-hidden','true');
    setTimeout(function(){ if(el.parentNode)el.parentNode.removeChild(el) },480);
    done();
  };
  var skip=$('#stvIntroSkip');if(skip)skip.addEventListener('click',finish);
  var reduce=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(finish,reduce?1500:5600);
}

/* الواجهة العامة للنواة */
return {
  CONFIG:CONFIG, DEMO_AR_VTT:DEMO_AR_VTT, PROVIDERS:PROVIDERS,
  d:d, w:w, $:$, icon:icon, esc:esc, fmtT:fmtT, fmtAgo:fmtAgo, IS_IOS:IS_IOS,
  store:store, toast:toast, catColors:catColors, gradCss:gradCss, posterSVG:posterSVG,
  ensureHls:ensureHls, ensureYT:ensureYT,
  ccPref:function(){return ccPref}, setCcPref:function(v){ccPref=v;saveCcPref()}, saveCcPref:saveCcPref,
  isFav:isFav, toggleFav:toggleFav, favCount:favCount,
  theme:function(){return theme}, applyTheme:applyTheme, bindThemeBtn:bindThemeBtn,
  renderTicker:renderTicker, maybeIntro:maybeIntro,
  VERSION:'2.2.0'
};
})();
