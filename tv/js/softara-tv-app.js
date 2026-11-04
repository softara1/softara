/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v2.1.2 — منطق التطبيق (مستخرج حرفيًا من النسخة المستقلة v2.1)
   الفرق الوحيد: بيانات المكتبة (STV_DATA) تُقرأ من الملف الخارجي softara-tv-data.js
   المكتبات الخارجية hls.js وYouTube IFrame API تُحمَّلان كسولًا كما في الأصل.
   ════════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════════
   سوفتارا TV — منطق التطبيق المستقل (المكتبات الخارجية الوحيدة hls.js وYouTube IFrame API تُحمَّلان كسولًا)
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ─────────── 1) الإعدادات والبيانات (عدّل هنا لإضافة المحتوى) ─────────── */
var STV_CONFIG = {
  hlsSrc: 'https://cdn.jsdelivr.net/npm/hls.js@1.7.4/dist/hls.min.js',
  hlsSrcFallback: 'https://unpkg.com/hls.js@1.7.4/dist/hls.min.js' /* بديل موثوق يعمل من أي نطاق */,
  storage: { favs:'stv_v2_favs', prog:'stv_v2_progress', theme:'stv_v2_theme', cc:'stv_cc' },
  autoplayDefault: true /* تشغيل القناة الافتراضية مكتومة عند الفتح */
};

/* مخطط البيانات — الإصدار 3:
   type = hls | mp4 | youtube | dailymotion | okru (المزوّد الخمسة)
   kind = channel | movie | series | program | wrestling | docs | kids
   items  : العناصر المفردة (قنوات/أفلام/وثائقيات…)
   groups : مسلسلات/قوائم حلقات — تُفكّ آليًا إلى عناصر حلقات أسفل هذا الكائن
   الحلقة e = {src: معرّف الفيديو أو رابط الملف, title: عنوان الحلقة, durText: المدة}
   كل الروابط أدناه فُحصت فعليًا يوم 2026-11-02 (الأدلة في research/content/*.json) */
var DEMO_AR_VTT = 'WEBVTT\nNOTE ترجمة تجريبية توضيحية — لعرض إمكانية الترجمة الخارجية (VTT) في مشغل سوفتارا TV.\nNOTE فيلم Big Buck Bunny لا يحتوي حوارًا أصلًا؛ هذه أوصاف مشاهد مكتوبة للعرض.\n\n1\n00:00:00.000 --> 00:00:08.000\nترجمة تجريبية — عرض إمكانية الترجمة الخارجية (ملف VTT مستقل)\n\n2\n00:00:08.000 --> 00:00:16.000\nالفيلم: Big Buck Bunny (2008) — فيلم قصير مفتوح المصدر من Blender Foundation\n\n3\n00:00:16.000 --> 00:00:24.000\nالمشهد: شاشة الافتتاح — شعار الاستوديو يظهر على خلفية داكنة\n\n4\n00:00:24.000 --> 00:00:32.000\nتُفتح الكاميرا على غابة هادئة في ضوء الصباح داخل وادٍ أخضر\n\n5\n00:00:32.000 --> 00:00:40.000\nيخرج الأرنب الكبير من جحوره داخل الشجرة ويتمدد تحت أشعة الشمس\n\n6\n00:00:40.000 --> 00:00:48.000\n[وصف مشهد تجريبي — الفيلم بلا حوار، فالأوصاف تُستخدم بديلًا عن الحوار]\n\n7\n00:00:48.000 --> 00:00:56.000\nفراشة ملونة ترفرف حول الأرنب وتثير اهتمامه ببطء\n\n8\n00:00:56.000 --> 00:01:04.000\nيلحق الأرنب بالفراشة بخطوات ثقيلة بين الأعشاب العالية\n\n9\n00:01:04.000 --> 00:01:12.000\nمشاهد كوميدية هادئة بلا كلام تناسب جميع الأعمار\n\n10\n00:01:12.000 --> 00:01:20.000\nالكاميرا تتبع الأرنب عبر مرج الأزهار المتلألئ\n\n11\n00:01:20.000 --> 00:01:26.000\nيمكنك إيقاف هذه الترجمة من قائمة CC في شريط التحكم — وسيتذكّرها المشغل\n\n12\n00:01:26.000 --> 00:01:30.000\nنهاية قسم الترجمة التجريبي لأول 90 ثانية من الفيلم';

var STV_DATA = window.STV_DATA;
if(!STV_DATA){
  document.addEventListener('DOMContentLoaded',function(){
    var g=document.getElementById('stvGrid');
    if(g)g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:44px 16px;color:#f87171;font-weight:800;line-height:2">تعذّر تحميل بيانات مكتبة سوفتارا TV من الشبكة.<br>تحقق من اتصال الإنترنت ثم أعد تحميل الصفحة.</div>';
  });
  return;
}

/* تفكيك المجموعات آليًا إلى عناصر حلقات قابلة للتشغيل (مع مواسم وحلقات ومصغرات) */
(function expandGroups(){
  var eps=[];var G=STV_DATA.groups;
  Object.keys(G).forEach(function(gid){
    var g=G[gid];
    (g.seasons||[]).forEach(function(se,si){
      (se.eps||[]).forEach(function(e,i){
        eps.push({id:gid+'-s'+(si+1)+'e'+(i+1),kind:g.kind||'series',group:gid,name:g.name,
          ep:'الحلقة '+(i+1),epNo:i+1,season:si+1,cat:g.cat,year:g.year,type:e.type||g.type,src:e.src,
          poster:g.poster,thumb:e.thumb||g.poster,durText:e.durText||'',desc:e.title||g.name,
          srcNote:g.srcNote,playlist:g.playlist,demo:g.demo});
      });
    });
    g.total=(g.seasons||[]).reduce(function(n,se){return n+(se.eps||[]).length},0);
  });
  STV_DATA.items=STV_DATA.items.concat(eps);
})();

/* ─────────── 2) أدوات مساعدة ─────────── */
var d=document, w=window;
function $(s){return d.querySelector(s)}
function icon(n,fill){return '<svg class="ic'+(fill?' ic-fill':'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>'}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fmtT(t){t=Math.max(0,Math.floor(t||0));var h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60,p=function(n){return (n<10?'0':'')+n};return (h?h+':'+p(m):p(m))+':'+p(s)}
function fmtAgo(ts){var m=Math.floor((Date.now()-ts)/60000);if(m<1)return 'الآن';if(m<60)return 'قبل '+m+' د';var h=Math.floor(m/60);if(h<24)return 'قبل '+h+' س';return 'قبل '+Math.floor(h/24)+' يوم'}
var IS_IOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1);
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
var CAT_COLORS={'أخبار':['#0ea5a0','#0f766e'],'رياضة':['#f5a524','#b45309'],'وثائقي':['#84cc16','#3f6212'],'عامة':['#14b8a6','#115e59'],'أنيميشن':['#22c55e','#15803d'],'خيال علمي':['#fb923c','#c2410c'],'فانتازيا':['#34d399','#047857'],'برامج وثائقية':['#2dd4bf','#0f766e'],'أفلام قصيرة':['#a3e635','#3f6212'],'عروض':['#f87171','#991b1b'],'عائلي':['#fbbf24','#92400e'],'غموض':['#fb923c','#9a3412'],'رعب':['#ef4444','#7f1d1d'],'كوميديا':['#fbbf24','#92400e'],'كوميديا صامتة':['#d97706','#92400e'],'برامج ترفيهية':['#f472b6','#9d174d'],'رياضة قتالية':['#f5a524','#b45309'],'تجريبي':['#34d399','#065f46'],'أطفال':['#fbbf24','#92400e']};
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

/* ─────────── 3) الحالة ─────────── */
var state={
  tab:'channel', query:'', chFilter:'الكل', items:STV_DATA.items||[],
  favs:store.get(STV_CONFIG.storage.favs,[]), prog:store.get(STV_CONFIG.storage.prog,{}),
  playlist:[], current:null, muted:false, theme:store.get(STV_CONFIG.storage.theme,'dark')
};
function isFav(id){return state.favs.indexOf(id)>-1}
function toggleFav(id){
  var i=state.favs.indexOf(id);
  if(i>-1){state.favs.splice(i,1);toast('أُزيل من المفضلة')}else{state.favs.push(id);toast('أُضيف إلى المفضلة ★')}
  store.set(STV_CONFIG.storage.favs,state.favs);
  syncFavUI();renderGrid();renderContinue();
}
function syncFavUI(){
  var c=state.current;
  var bf=$('#stvFavBtn');
  if(bf){bf.classList.toggle('is-fav',!!(c&&isFav(c.id)));bf.setAttribute('aria-label',c&&isFav(c.id)?'إزالة من المفضلة':'إضافة إلى المفضلة')}
  var tab=$('.stv-tab[data-tab="favs"] .cnt');if(tab)tab.textContent=state.favs.length;
}

/* ─────────── 4) عناصر المشغل ─────────── */
var shell=$('#stvShell'), video=$('#stvVideo'), ytBox=$('#stvYtBox'), embedBox=$('#stvEmbedBox');
var hls=null, ytPlayer=null, currentHlsLevels=null, retryCount=0, retryTimer=null, uiTimer=null, progTimer=0;
var nativeMode=false, embedMode=false, isLive=false;

function showLoader(v){$('#stvLoader').classList.toggle('show',!!v)}
function showErr(title,msg,url){
  $('#stvErrTitle').textContent=title;$('#stvErrMsg').textContent=msg||'';
  var la=$('#stvErrLink');
  if(la){ if(url){la.href=url;la.style.display=''}else{la.style.display='none'} }
  $('#stvErr').classList.add('show');showLoader(false);
}
function hideErr(){$('#stvErr').classList.remove('show')}
function showIdle(v){var el=$('#stvIdle');el.classList.toggle('show',!!v);el.setAttribute('aria-hidden',v?'false':'true')}
function setUi(v){shell.classList.toggle('stv-ui',!!v);scheduleUiHide()}
function scheduleUiHide(){
  clearTimeout(uiTimer);
  uiTimer=setTimeout(function(){
    if(!video.paused&&shell.classList.contains('stv-ui'))shell.classList.remove('stv-ui');
  },3500);
}
function showCenter(v){$('#stvCenterPlay').classList.toggle('show',!!v)}
function showUnmute(v){$('#stvUnmute').classList.toggle('show',!!v)}

/* ── تحميل hls.js كسولًا (CDN أساسي + نسخة محلية بديلة) ── */
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
    tryLoad(STV_CONFIG.hlsSrc,function(){ tryLoad(STV_CONFIG.hlsSrcFallback,null) });
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

/* ── المزوّدون: تسميات وقدرات صادقة (ما لا تتيحه المنصة يُعرض للمستخدم كما هو) ── */
var PROVIDERS={
  hls:        {label:'HLS · M3U8'},
  mp4:        {label:'MP4'},
  youtube:    {label:'YouTube'},
  dailymotion:{label:'DailyMotion'}, /* لا SDK تحكم عام — التشغيل/الصوت/الجودة من واجهة المشغل الداخلية */
  okru:       {label:'OK.ru'}        /* لا SDK ولا أحداث رسمية — نفس القيد */
};

/* ── تفضيل الترجمة الموحّد (يُحفظ محليًا وينطبق على كل فيديو جديد دون إعادة إيقاف) ── */
var ccPref=store.get(STV_CONFIG.storage.cc,{on:false,lang:''});
function saveCcPref(){store.set(STV_CONFIG.storage.cc,ccPref)}

/* ── إيقاف كل شيء: تفكيك جذري لكل مشغل سابق ──
   هذا هو العلاج من جذوره لمشكلة «الترجمة المعلقة عند تغيير القناة»:
   إيقاف → تفريغ وحدات الترجمة → تدمير المشغل → إزالة عناصر DOM والمسارات والمؤقتات →
   لا تنقل أي حالة للفيديو الجديد إلا تفضيل المستخدم المخزَّن عمدًا (ccPref). */
var ytSyncTimer=0, ytErrTimer=0, blobUrls=[], curProvider=null, curVariant=-1, qualSrc=null, mountSeq=0;
function teardownAll(){
  clearTimeout(retryTimer);clearTimeout(ytErrTimer);retryCount=0;stopYtSync();
  /* 1) YouTube: إيقاف → تفريغ وحدات الترجمة → تدمير → محو أي iframe متبقٍ */
  if(ytPlayer){
    try{ytPlayer.stopVideo()}catch(_){}
    try{
      var ms=(typeof ytPlayer.getOptions==='function')?(ytPlayer.getOptions()||[]):[];
      ms.forEach(function(m){try{ytPlayer.unloadModule(m)}catch(_){}});
    }catch(_){}
    try{ytPlayer.destroy()}catch(_){}
    ytPlayer=null;
  }
  try{ytBox.querySelectorAll('iframe').forEach(function(n){n.parentNode.removeChild(n)})}catch(_){}
  try{ytBox.innerHTML='<div id="stvYtMount"></div>'}catch(_){}
  /* 2) hls.js: إيقاف التحميل → فصل الوسائط → تدمير المثيل */
  if(hls){try{hls.stopLoad()}catch(_){}try{hls.detachMedia()}catch(_){}try{hls.destroy()}catch(_){}hls=null}
  /* 3) عنصر الفيديو: إيقاف → تعطيل مسارات الترجمة → إزالة track → تحرير Blob URLs */
  try{video.pause()}catch(_){}
  try{ if(video.textTracks){for(var i=video.textTracks.length-1;i>=0;i--){try{video.textTracks[i].mode='disabled'}catch(_){}}} }catch(_){}
  try{video.querySelectorAll('track').forEach(function(t){t.parentNode.removeChild(t)})}catch(_){}
  blobUrls.forEach(function(u){try{URL.revokeObjectURL(u)}catch(_){}});blobUrls=[];
  video.removeAttribute('src');try{video.load()}catch(_){}
  video.controls=false;shell.classList.remove('stv-native');
  /* 4) التضمينات (DailyMotion/OK.ru): إزالة iframe توقف التشغيل والصوت فورًا */
  try{embedBox.querySelectorAll('iframe').forEach(function(n){n.parentNode.removeChild(n)})}catch(_){}
  embedBox.innerHTML='';
  shell.classList.remove('stv-embed');embedMode=false;nativeMode=false;isLive=false;
  curProvider=null;curVariant=-1;qualSrc=null;
  $('#stvSeekRow').style.display='none';$('#stvQualBtn').style.display='none';closeQual();
  $('#stvCcBtn').style.display='none';closeCc();
  $('#stvLiveChip').style.display='none';$('#stvHd').style.display='none';$('#stvProv').style.display='none';
  $('#stvVolWrap').style.display='';$('#stvPlayBtn').style.display='';
  hideErr();showCenter(false);showUnmute(false);
}

/* ── عناصر التحكم المتاحة/غير المتاحة حسب المزوّد (بصدق: DM/OK بلا API تحكم) ── */
var hintTold=false;
function setEmbedControls(apiOn){
  $('#stvVolWrap').style.display=apiOn?'':'none';
  $('#stvPlayBtn').style.display=apiOn?'':'none';
  if(!apiOn&&!hintTold){hintTold=true;setTimeout(function(){toast('التحكم بالتشغيل والصوت من واجهة مشغل المنصة نفسها — قيد رسمي في التضمين')},900)}
}

/* ── تشغيل عنصر: تفكيك ثم بناء حالة نظيفة مستقلة لكل فيديو جديد ── */
function playItem(it,opts){
  opts=opts||{};
  if(!it)return;
  if(it.soon){ setNow(it); showErr('قريبًا','هذا القسم سيُزوَّد بمحتوى مرخّص رسميًا قريبًا. البنية التقنية جاهزة بالكامل — أضف المصادر من قسم البيانات.'); return }
  teardownAll();
  mountSeq++; /* مراجعة T7: جيل جديد — يُبطل أي تحميل كسول قديم معلّق فلا يُنشأ مشغل يتيم أبدًا */
  state.current=it;setNow(it);showIdle(false);showLoader(true);syncFavUI();
  savePlaylistFor(it);
  renderEps(it);
  try{d.title=it.name+(it.ep?' — '+it.ep:'')+' — سوفتارا TV'}catch(_){}
  var muted=opts.muted!==undefined?opts.muted:state.muted;
  state.muted=muted;
  var mount={hls:mountHls,mp4:mountMp4,youtube:mountYouTube,dailymotion:mountDailymotion,okru:mountOkru}[it.type];
  if(mount)mount(it,muted);
  else showErr('مصدر غير معروف','نوع المصدر غير مدعوم في هذه النسخة.');
}

/* ── المزوّد 1: HLS / M3U8 عبر hls.js (جودات + ترجمات مدمجة) أو HLS الأصلي (iOS) ── */
function mountHls(it,muted){
  curProvider='hls';
  var seq=mountSeq; /* مراجعة T7: حماية من سباق إعادة الاختيار أثناء نافذة التحميل الكسول */
  ensureHls().then(function(Hls){
    if(seq!==mountSeq||state.current!==it)return;
    if(Hls.isSupported()){
      hls=new Hls({capLevelToPlayerSize:true,enableWorker:true,maxBufferLength:30,backBufferLength:30});
      hls.on(Hls.Events.MANIFEST_PARSED,function(){
        if(seq!==mountSeq||state.current!==it)return;
        qualSrc={kind:'hls'};buildQualityMenu();$('#stvQualBtn').style.display='';
        tryPlay(muted);
      });
      hls.on(Hls.Events.LEVEL_SWITCHED,function(){updateQualLabel()});
      hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED,function(){
        if(seq!==mountSeq||state.current!==it)return;
        $('#stvCcBtn').style.display=(hls.subtitleTracks&&hls.subtitleTracks.length)?'':'none';
        ccApplyHls();buildCcMenu();
      });
      hls.on(Hls.Events.SUBTITLE_TRACK_SWITCH,function(){buildCcMenu()});
      hls.on(Hls.Events.ERROR,onHlsError);
      hls.loadSource(it.src);hls.attachMedia(video);
    }else if(video.canPlayType('application/vnd.apple.mpegurl')){
      nativeMode=true;shell.classList.add('stv-native');
      video.controls=true;video.src=it.src;
      video.addEventListener('loadedmetadata',function(){isLive=!isFinite(video.duration);if(video.textTracks.length){$('#stvCcBtn').style.display='';buildCcMenu()}}, {once:true});
      tryPlay(muted);
    }else{
      showErr('متصفح غير مدعوم','هذا المتصفح لا يدعم تشغيل HLS. جرّب Chrome أو Safari حديثًا.');
    }
  }).catch(function(){showErr('تعذّر تحميل محرك البث','تحقّق من الاتصال بالإنترنت ثم أعد المحاولة.')});
}

/* ── المزوّد 2: MP4 مباشر (جودات متعددة + ترجمة VTT خارجية عبر Blob) ── */
function mountMp4(it,muted){
  curProvider='mp4';
  var variants=it.variants&&it.variants.length>1?it.variants:null;
  qualSrc={kind:'mp4',variants:variants};
  var vsrc=(variants?variants[0]:it).src||it.src;
  curVariant=0;
  video.src=vsrc;
  if(variants){$('#stvQualBtn').style.display='';buildQualityMenu()}
  if(it.subs&&it.subs.length){
    it.subs.forEach(function(s){
      try{
        var tr=d.createElement('track');tr.kind='subtitles';tr.label=s.label;tr.srclang=s.lang||'ar';
        var u=null;try{u=URL.createObjectURL(new Blob([DEMO_AR_VTT],{type:'text/vtt;charset=utf-8'}));blobUrls.push(u)}catch(_){}
        if(u)tr.src=u;
        video.appendChild(tr);
      }catch(_){}
    });
    $('#stvCcBtn').style.display='';
  }
  buildCcMenu();
  tryPlay(muted);
}

/* ── المزوّد 3: YouTube عبر IFrame API الرسمية (ترجمة + مزامنة تحكم كاملة) ── */
function mountYouTube(it,muted){
  curProvider='youtube';
  shell.classList.add('stv-embed');embedMode=true;
  var seq=mountSeq; /* مراجعة T7 */
  ytErrTimer=setTimeout(function(){
    if(seq===mountSeq&&state.current===it&&curProvider==='youtube')showErr('تعذّر تحميل مشغل يوتيوب','الاتصال بطيء أو محجوب من شبكتك. أعد المحاولة أو افتح الفيديو على يوتيوب مباشرة.');
  },16000);
  ensureYT().then(function(YT){
    if(seq!==mountSeq||state.current!==it){clearTimeout(ytErrTimer);return}
    /* تفضيل الترجمة يُطبَّق عبر المعاملين الرسميين الموثّقين cc_load_policy وcc_lang_pref عند الإنشاء.
       ملاحظة مثبتة بالتجربة المعزولة: مشغل يوتيوب الحديث لم يعد يكشف وحدة captions عبر getOptions()
       فلا يمكن معرفة لغات الفيديو برمجيًا — لذا يُعرض زر CC دائمًا ليوتيوب ويطبّق التفضيل عند الإنشاء. */
    var pv={autoplay:1,mute:muted?1:0,playsinline:1,rel:0,enablejsapi:1,origin:w.location.origin,cc_load_policy:ccPref.on?1:0};
    if(ccPref.on&&ccPref.lang)pv.cc_lang_pref=ccPref.lang;
    ytPlayer=new YT.Player('stvYtMount',{
      videoId:it.src,host:'https://www.youtube.com',playerVars:pv,
      events:{
        onReady:function(e){
          if(seq!==mountSeq||state.current!==it)return;
          if($('#stvErr').classList.contains('show')){clearTimeout(ytErrTimer);return} /* مراجعة T7: لا صوت خلف شاشة الخطأ */
          clearTimeout(ytErrTimer);showLoader(false);setEmbedControls(true);
          e.target.playVideo();
          if(muted)showUnmute(true);
          setUi(true);
          /* مجسّ توافر الترجمات: يوقظ وحدة captions رسميًا ليُطلق onApiChange حتى لو كان التفضيل «إيقاف» */
          try{e.target.loadModule('captions')}catch(_){}
          ccApplyYt();buildCcMenu();
          startYtSync();
        },
        onApiChange:function(){ if(seq!==mountSeq||state.current!==it)return; ccApplyYt();buildCcMenu(); },
        onStateChange:function(e){
          if(seq!==mountSeq||state.current!==it)return;
          if(e.data===YT.PlayerState.PLAYING){showLoader(false);setUi(true);setPlayIcon(true)}
          if(e.data===YT.PlayerState.PAUSED)setPlayIcon(false);
          if(e.data===YT.PlayerState.ENDED)onEnded();
        },
        onError:function(ev){
          if(seq!==mountSeq||state.current!==it)return;
          clearTimeout(ytErrTimer);
          var msg={2:'معرّف الفيديو غير صالح.',5:'خطأ في مشغل HTML5 لهذا الفيديو.',100:'الفيديو غير موجود أو حُذف.',101:'ناشر الفيديو منع تضمينه خارج يوتيوب.',150:'ناشر الفيديو منع تضمينه خارج يوتيوب.',153:'يوتيوب يطلب تحققًا إضافيًا من هذا المصدر (قد يحدث في بعض الشبكات).'}[ev.data];
          showErr('تعذّر تشغيل فيديو يوتيوب',msg||'حدث خطأ غير معروف في مشغل يوتيوب.','https://www.youtube.com/watch?v='+it.src);
        }
      }
    });
  }).catch(function(){
    if(seq===mountSeq&&state.current===it)showErr('تعذّر تحميل مشغل يوتيوب','تعذّر تحميل واجهة يوتيوب من شبكتك. أعد المحاولة أو افتح الفيديو على يوتيوب مباشرة.');
  });
}

/* ── المزوّد 4: DailyMotion عبر التضمين الرسمي ── */
function mountDailymotion(it,muted){
  curProvider='dailymotion';
  embedMode=true;shell.classList.add('stv-embed');
  setEmbedControls(false);
  var allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
  embedBox.innerHTML='<iframe src="https://www.dailymotion.com/embed/video/'+encodeURIComponent(it.src)+'?autoplay=1&mute='+(muted?1:0)+'&queue-enable=0&sharing-enable=0&ui-logo=0" allow="'+allow+'" allowfullscreen loading="lazy"></iframe>';
  showLoader(false);
}

/* ── المزوّد 5: OK.ru عبر التضمين الرسمي ── */
function mountOkru(it,muted){
  curProvider='okru';
  embedMode=true;shell.classList.add('stv-embed');
  setEmbedControls(false);
  var allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
  embedBox.innerHTML='<iframe src="https://ok.ru/videoembed/'+encodeURIComponent(it.src)+'?autoplay=1" allow="'+allow+'" allowfullscreen loading="lazy"></iframe>';
  showLoader(false);
}

function tryPlay(muted){
  video.muted=!!muted;video.volume=$('#stvVol').value/100;
  var p=video.play();
  if(p&&p.then)p.then(function(){
    showLoader(false);
    if(muted&&!IS_IOS)showUnmute(true);
    setUi(true);
  }).catch(function(err){
    showLoader(false);
    /* حجب التشغيل التلقائي: نطلب نقرة المستخدم */
    showCenter(true);
    if(muted)showUnmute(true);
  });
}

/* ── الترجمة (CC): تطبيق موحّد على كل مزوّد ── */
/* YouTube: loadModule/unloadModule/getOptions موثقة ضمن IFrame API،
   وgetOption/setOption('captions',…) غير موثقة رسميًا في الجدول لكنها جزء من كود المشغل الرسمي —
   نستخدمها بحذر مع معاملات cc_load_policy/cc_lang_pref الموثقة، ونُظهر ما لا يعمل بصدق. */
function ccApplyYt(){
  if(!ytPlayer)return;
  try{
    /* إظهار دائم ليوتيوب: الـ API الحديث لا يكشف توافر الترجمات (مثبت تجريبيًا) فلا نستطيع الإخفاء المشروط بصدق */
    $('#stvCcBtn').style.display='';
    if(ccPref.on){
      try{ytPlayer.loadModule('captions')}catch(_){}
      $('#stvCcBtn').classList.add('on');
    }else{
      try{ytPlayer.unloadModule('captions')}catch(_){}
      $('#stvCcBtn').classList.remove('on');
    }
  }catch(_){}
}
function ccYtTracks(){
  var list=[];
  try{
    if(!ytPlayer||typeof ytPlayer.getOption!=='function')return list;
    var tl=ytPlayer.getOption('captions','tracklist',{includeAsr:true})||[];
    tl.forEach(function(t){
      var nm=t.languageName;
      if(nm&&typeof nm==='object')nm=nm.displayName||(nm.run&&nm.run[0]&&nm.run[0].text)||t.languageCode;
      list.push({code:t.languageCode,label:String(nm||t.languageCode),asr:t.kind==='asr'});
    });
  }catch(_){}
  return list;
}
function ccApplyHls(){
  if(!hls)return;
  try{
    if(ccPref.on&&hls.subtitleTracks&&hls.subtitleTracks.length){
      var idx=-1;
      if(ccPref.lang){for(var i=0;i<hls.subtitleTracks.length;i++){if(hls.subtitleTracks[i].lang===ccPref.lang){idx=i;break}}}
      hls.subtitleTrack=idx>=0?idx:0;
      $('#stvCcBtn').classList.add('on');
    }else{
      hls.subtitleTrack=-1;
      $('#stvCcBtn').classList.remove('on');
    }
  }catch(_){}
}
function buildCcMenu(){
  var menu=$('#stvCcMenu');if(!menu)return;
  menu.innerHTML='';
  var mk=function(label,active,onpick,sub){
    var b=d.createElement('button');b.setAttribute('role','menuitem');
    if(active)b.className='on';
    b.innerHTML='<span>'+esc(label)+(sub?' <small>'+esc(sub)+'</small>':'')+'</span>'+icon('check');
    b.addEventListener('click',function(){onpick();buildCcMenu()});
    menu.appendChild(b);
  };
  var tracks=[];
  if(curProvider==='youtube'&&ytPlayer)tracks=ccYtTracks();
  else if(curProvider==='hls'&&hls&&hls.subtitleTracks)tracks=hls.subtitleTracks.map(function(t,i){return {hlsIdx:i,code:t.lang||'',label:t.name||t.lang||('مسار '+(i+1))}});
  else if(curProvider==='mp4'||nativeMode){
    try{for(var i=0;i<video.textTracks.length;i++){var tt=video.textTracks[i];tracks.push({track:tt,code:tt.language||'',label:tt.label||tt.language||('مسار '+(i+1))})}}catch(_){}
  }
  if(curProvider==='youtube'&&!tracks.length){
    /* يوتيوب الحديث لا يكشف قائمة اللغات عبر الـ API (مثبت تجريبيًا) — قائمة صادقة بخيارين + إفصاح */
    mk('إيقاف الترجمة',!ccPref.on,function(){
      ccPref={on:false,lang:''};saveCcPref();ccApplyYt();
      toast('أُوقفت الترجمة — ستبقى موقفة لكل الفيديوهات الجديدة');
    });
    mk('تشغيل الترجمة'+(ccPref.lang?' ('+ccPref.lang+')':''),ccPref.on,function(){
      ccPref={on:true,lang:ccPref.lang||''};saveCcPref();ccApplyYt();
      toast('تشغيل الترجمة حسب لغات الفيديو المتاحة في مشغل يوتيوب');
    });
    var note=d.createElement('div');note.className='stv-cc-note';
    note.textContent='ملاحظة: مشغل يوتيوب الحديث لا يتيح للصفحات الخارجية قراءة قائمة لغات الترجمة — اللغة المحفوظة تُطبَّق تلقائيًا عند فتح أي فيديو إن وُجدت ضمن لغاته.';
    menu.appendChild(note);
    return;
  }
  if(!tracks.length){
    menu.innerHTML='<div class="stv-cc-note">لا توجد ترجمات متاحة لهذا الفيديو حاليًا — توفّرها ترجمات المصدر نفسه (أصلية أو تلقائية).</div>';
    return;
  }
  mk('إيقاف الترجمة',!ccPref.on,function(){
    ccPref={on:false,lang:''};saveCcPref();
    if(curProvider==='youtube')ccApplyYt();
    else if(curProvider==='hls'){try{hls.subtitleTrack=-1}catch(_){}}
    else{try{for(var j=0;j<video.textTracks.length;j++)video.textTracks[j].mode='disabled'}catch(_){}}
    $('#stvCcBtn').classList.remove('on');
    toast('أُوقفت الترجمة — ستبقى موقفة لكل الفيديوهات الجديدة');
  });
  tracks.forEach(function(t){
    var active=ccPref.on&&(ccPref.lang===(t.code||''));
    mk(t.label+(t.asr?' (تلقائية)':''),active,function(){
      ccPref={on:true,lang:t.code||''};saveCcPref();
      if(curProvider==='youtube')ccApplyYt();
      else if(curProvider==='hls'){try{hls.subtitleTrack=t.hlsIdx}catch(_){}}
      else{try{for(var j=0;j<video.textTracks.length;j++)video.textTracks[j].mode=(video.textTracks[j]===t.track)?'showing':'disabled'}catch(_){}}
      $('#stvCcBtn').classList.add('on');
      toast('الترجمة: '+t.label);
    });
  });
  if(curProvider==='youtube'){
    var note=d.createElement('div');note.className='stv-cc-note';
    note.textContent='اللغات يوفّرها الفيديو نفسه عبر مشغل يوتيوب الرسمي (ترجمات أصلية أو تلقائية ASR) — بعض الفيديوهات لا تتوفر لها ترجمات.';
    menu.appendChild(note);
  }
}
function closeCc(){$('#stvCcMenu').classList.remove('open');$('#stvCcBtn').setAttribute('aria-expanded','false')}

/* ── مزامنة شريط التحكم مع مشغل يوتيوب (getCurrentTime/getDuration رسمية) ── */
function startYtSync(){
  stopYtSync();
  ytSyncTimer=setInterval(function(){
    if(!ytPlayer||curProvider!=='youtube')return;
    var t=0,dur=0,st=-1;
    try{t=ytPlayer.getCurrentTime()||0;dur=ytPlayer.getDuration()||0;st=ytPlayer.getPlayerState()}catch(_){return}
    if(dur>0&&isFinite(dur)){
      $('#stvSeekRow').style.display='';
      if(!seeking){$('#stvSeek').value=Math.round(t/dur*1000)}
      $('#stvCur').textContent=fmtT(t);$('#stvDur').textContent=fmtT(dur);
      if(st===1)saveProgress(t,dur); /* مراجعة T7: حفظ فقط أثناء التشغيل الفعلي لا أثناء الإيقاف */
    }
  },600);
}
function stopYtSync(){ if(ytSyncTimer){clearInterval(ytSyncTimer);ytSyncTimer=0} }

/* ── حفظ موضع المشاهدة (لكل المزوّدين الذين يتيحون الموضع) ── */
function saveProgress(t,dur){
  var now=Date.now();
  if(now-progTimer<3000||!state.current||state.current.kind==='channel')return;
  if(t>25&&dur>0&&t<dur*.95){
    progTimer=now;
    state.prog[state.current.id]={t:t,d:dur,at:now,name:state.current.name,ep:state.current.ep||''};
    store.set(STV_CONFIG.storage.prog,state.prog);
  }
}
function onEnded(){
  if(state.current){delete state.prog[state.current.id];store.set(STV_CONFIG.storage.prog,state.prog);renderContinue()}
  /* الحلقة التالية تلقائيًا داخل المجموعة نفسها */
  if(state.current&&state.current.group){
    var list=state.items.filter(function(i){return i.group===state.current.group});
    var idx=list.map(function(i){return i.id}).indexOf(state.current.id);
    if(idx>-1&&list[idx+1]){toast('تشغيل الحلقة التالية…');playItem(list[idx+1])}
  }
}

function onHlsError(ev,data){
  if(!data||!data.fatal)return;
  if(data.type===w.Hls.ErrorTypes.NETWORK_ERROR){
    if(retryCount<3){
      retryCount++;
      showLoader(true);$('#stvLoader span').textContent='انقطع الاتصال… إعادة المحاولة ('+retryCount+'/3)';
      clearTimeout(retryTimer);
      retryTimer=setTimeout(function(){ if(hls){try{hls.startLoad()}catch(_){}} },1200*retryCount);
    }else{
      showErr('تعذّر الوصول إلى البث','قد يكون المصدر متوقفًا مؤقتًا أو غير متاح من شبكتك. جرّب قناة أخرى أو أعد المحاولة لاحقًا.');
    }
  }else if(data.type===w.Hls.ErrorTypes.MEDIA_ERROR){
    if(retryCount<2){retryCount++;try{hls.recoverMediaError()}catch(_){showErr('خطأ في الوسائط','تعذّر استعادة التشغيل — أعد المحاولة أو اختر قناة أخرى.')}}
    else showErr('خطأ في الوسائط','تعذّر استعادة التشغيل — أعد المحاولة أو اختر قناة أخرى.');
  }else{
    showErr('تعذّر التشغيل','حدث خطأ غير متوقع في هذا المصدر. اختر محتوى آخر أو أعد المحاولة.');
  }
}

/* ── الجودة: قائمة موحّدة لمستويات HLS أو ملفات MP4 المتعددة ── */
function buildQualityMenu(){
  var menu=$('#stvQualMenu');menu.innerHTML='';
  if(!qualSrc)return;
  var mk=function(label,active,onpick){
    var b=d.createElement('button');b.setAttribute('role','menuitem');
    if(active)b.className='on';
    b.innerHTML='<span>'+esc(label)+'</span>'+icon('check');
    b.addEventListener('click',function(){onpick();buildQualityMenu();closeQual()});
    menu.appendChild(b);
  };
  if(qualSrc.kind==='hls'&&hls){
    mk('تلقائي (تكيّفي)',hls.autoLevelEnabled,function(){try{hls.currentLevel=-1}catch(_){}updateQualLabel();toast('الجودة: تلقائي')});
    var seen={};
    var lvls=(hls.levels||[]).map(function(l,i){return {i:i,h:l.height||0}}).filter(function(l){return l.h>0}).sort(function(a,b){return b.h-a.h});
    lvls.forEach(function(l){
      if(seen[l.h])return;seen[l.h]=1;
      var idx=l.i;
      mk(l.h+'p',!hls.autoLevelEnabled&&hls.currentLevel===idx,function(){try{hls.currentLevel=idx}catch(_){}updateQualLabel();toast('الجودة: '+l.h+'p')});
    });
  }else if(qualSrc.kind==='mp4'&&qualSrc.variants){
    qualSrc.variants.forEach(function(v,i){
      mk(v.label,i===curVariant,function(){
        curVariant=i;
        var t=video.currentTime,wasPaused=video.paused;
        var expected=v.src;
        video.src=expected;
        try{video.load()}catch(_){}
        video.addEventListener('loadedmetadata',function(){
          if(video.src!==expected)return; /* مراجعة T7: أطفئ المستمع إذا تغيّر المصدر قبل اكتمال التحميل فلا قفز موضع */
          try{video.currentTime=t}catch(_){}
          if(!wasPaused)video.play().catch(function(){showCenter(true)});
        },{once:true});
        updateQualLabel();toast('الجودة: '+v.label);
      });
    });
  }
  updateQualLabel();
}
function updateQualLabel(){
  var btn=$('#stvQualBtn');if(!btn||!qualSrc)return;
  if(qualSrc.kind==='hls'&&hls){
    btn.textContent=hls.autoLevelEnabled?'جودة: تلقائي':(hls.levels&&hls.levels[hls.currentLevel]&&hls.levels[hls.currentLevel].height?('جودة: '+hls.levels[hls.currentLevel].height+'p'):'جودة');
  }else if(qualSrc.kind==='mp4'&&qualSrc.variants&&qualSrc.variants[curVariant]){
    btn.textContent='جودة: '+qualSrc.variants[curVariant].label;
  }
}
function closeQual(){$('#stvQualMenu').classList.remove('open');$('#stvQualBtn').setAttribute('aria-expanded','false')}

/* ── ملء الشاشة (متوافق مع كل المتصفحات + بديل iPhone) ── */
function fsElement(){return d.fullscreenElement||d.webkitFullscreenElement||d.webkitCurrentFullScreenElement||null}
function toggleFullscreen(){
  var fsEl=fsElement();
  if(fsEl){
    (d.exitFullscreen||d.webkitExitFullscreen||function(){}).call(d);
    return;
  }
  var req=shell.requestFullscreen||shell.webkitRequestFullscreen||shell.webkitRequestFullScreen;
  if(req){
    try{
      var p=req.call(shell,{navigationUI:'hide'});
      if(p&&p.catch)p.catch(function(){
        /* رفض المتصفح → جرّب ملء الشاشة الأصلي للفيديو (iPhone) */
        if(video.webkitEnterFullscreen){try{video.webkitEnterFullscreen()}catch(_){toast('ملء الشاشة غير متاح حاليًا',true)}}
        else if(embedMode)toast('على iPhone استخدم زر ملء الشاشة داخل مشغل المنصة نفسه',true);
        else toast('رفض المتصفح طلب ملء الشاشة',true);
      });
      return;
    }catch(_){/* يتابع للبديل أدناه */}
  }
  if(video.webkitEnterFullscreen){ try{video.webkitEnterFullscreen()}catch(_){toast('ملء الشاشة غير مدعوم هنا',true)} return }
  if(video.webkitSupportsFullscreen){ try{video.webkitEnterFullscreen()}catch(_){toast('ملء الشاشة غير مدعوم هنا',true)} return }
  if(embedMode)toast('استخدم زر ملء الشاشة داخل مشغل المنصة نفسه',true);
  else toast('ملء الشاشة غير مدعوم في هذا المتصفح',true);
}
['fullscreenchange','webkitfullscreenchange'].forEach(function(ev){
  d.addEventListener(ev,function(){
    var on=!!fsElement();
    $('#stvFsIc').setAttribute('href',on?'#i-min':'#i-max');
    $('#stvFsBtn').setAttribute('aria-label',on?'الخروج من ملء الشاشة':'ملء الشاشة');
    if(on)setUi(true);
  });
});

/* ── شريط التحكم: ربط الأحداث ── */
function setPlayIcon(playing){$('#stvPlayIc').setAttribute('href',playing?'#i-pause':'#i-play')}
video.addEventListener('play',function(){setPlayIcon(true);setUi(true);showCenter(false)});
video.addEventListener('pause',function(){setPlayIcon(false);setUi(true);clearTimeout(uiTimer)});
video.addEventListener('waiting',function(){showLoader(true)});
video.addEventListener('playing',function(){showLoader(false);showCenter(false);retryCount=0;$('#stvLoader span').textContent='جارٍ تحميل البث…'});
video.addEventListener('volumechange',function(){
  var ic=$('#stvVolIc');ic.setAttribute('href',video.muted||video.volume===0?'#i-mute':'#i-vol');
  if(!IS_IOS)$('#stvVol').value=video.muted?0:Math.round(video.volume*100);
});
video.addEventListener('error',function(){
  if(hls||embedMode||!video.getAttribute('src'))return;
  showErr('تعذّر تشغيل هذا المصدر','قد يكون الرابط متوقفًا أو الصيغة غير مدعومة في متصفحك. جرّب مصدرًا آخر.');
});
video.addEventListener('timeupdate',function(){
  if(!isFinite(video.duration)||!video.duration)return;
  var s=$('#stvSeek');if(s&&!seeking){s.value=Math.round(video.currentTime/video.duration*1000)}
  $('#stvCur').textContent=fmtT(video.currentTime);$('#stvDur').textContent=fmtT(video.duration);
  /* حفظ موضع المشاهدة (الأفلام والمسلسلات فقط — ليس البث المباشر) */
  saveProgress(video.currentTime,video.duration);
});
video.addEventListener('ended',onEnded);
/* عند جاهزية MP4: طبّق تفضيل الترجمة على المسارات الخارجية (لا نُفرض الترجمة إن أوقفها المستخدم) */
video.addEventListener('loadedmetadata',function(){
  try{
    var n=video.textTracks?video.textTracks.length:0;
    if(n&&curProvider!=='hls'){for(var i=0;i<n;i++){video.textTracks[i].mode=(ccPref.on&&i===0)?'showing':'disabled'}}
  }catch(_){}
});
/* لمس الفيديو = إظهار/إخفاء عناصر التحكم (بدون حجب) */
var lastTap=0;
shell.addEventListener('click',function(e){
  if(e.target.closest('.stv-ctrls,.stv-topbar,.stv-err,.stv-qualmenu,.stv-center-play,.stv-unmute,.stv-ytbox,.stv-embedbox'))return;
  if(embedMode)return;
  var now=Date.now();
  if(now-lastTap<300){ toggleFullscreen(); lastTap=0; return } /* نقرة مزدوجة = ملء الشاشة */
  lastTap=now;
  shell.classList.contains('stv-ui')?shell.classList.remove('stv-ui'):setUi(true);
});
function togglePlay(){
  if(curProvider==='youtube'&&ytPlayer){
    try{ (ytPlayer.getPlayerState()===1)?ytPlayer.pauseVideo():ytPlayer.playVideo() }catch(_){}
    return;
  }
  if(embedMode)return; /* DailyMotion/OK.ru: التحكم من واجهة مشغلهما الداخلية */
  video.paused?video.play().catch(function(){showCenter(true)}):video.pause();
}
$('#stvPlayBtn').addEventListener('click',togglePlay);
$('#stvCenterPlay button').addEventListener('click',function(){
  showCenter(false);
  if(embedMode){ if(curProvider==='youtube'&&ytPlayer){try{ytPlayer.playVideo()}catch(_){}} return }
  video.play().catch(function(){});
});
$('#stvMuteBtn').addEventListener('click',function(){
  if(curProvider==='youtube'&&ytPlayer){
    var m=false;try{m=ytPlayer.isMuted()}catch(_){}
    try{ m?ytPlayer.unMute():ytPlayer.mute() }catch(_){}
    if(m){var v=$('#stvVol').value/100;try{ytPlayer.setVolume(Math.round(v*100))}catch(_){}}
    showUnmute(false);
    setTimeout(function(){var m2=false;try{m2=ytPlayer.isMuted()}catch(_){}$('#stvVolIc').setAttribute('href',m2?'#i-mute':'#i-vol')},150);
    return;
  }
  video.muted=!video.muted; if(!video.muted&&video.volume===0)video.volume=.6;
  showUnmute(false);
});
$('#stvVol').addEventListener('input',function(){
  if(curProvider==='youtube'&&ytPlayer){
    try{ytPlayer.setVolume(Number(this.value)); if(this.value>0)ytPlayer.unMute()}catch(_){}
    return;
  }
  video.muted=this.value==0; video.volume=this.value/100;
});
$('#stvUnmute').addEventListener('click',function(){
  if(curProvider==='youtube'&&ytPlayer){try{ytPlayer.unMute();ytPlayer.setVolume(60)}catch(_){} $('#stvVol').value=60;}
  else{ video.muted=false; if(video.volume===0){video.volume=.6;$('#stvVol').value=60} }
  showUnmute(false);
});
$('#stvFsBtn').addEventListener('click',toggleFullscreen);
$('#stvFavBtn').addEventListener('click',function(){ if(state.current&&!state.current.soon)toggleFav(state.current.id) });
$('#stvQualBtn').addEventListener('click',function(e){e.stopPropagation();var m=$('#stvQualMenu');var on=m.classList.toggle('open');this.setAttribute('aria-expanded',on)});
$('#stvCcBtn').addEventListener('click',function(e){e.stopPropagation();var m=$('#stvCcMenu');var on=m.classList.toggle('open');this.setAttribute('aria-expanded',on)});
d.addEventListener('click',function(e){ if(!e.target.closest('#stvQualMenu,#stvQualBtn'))closeQual() });
d.addEventListener('click',function(e){ if(!e.target.closest('#stvCcMenu,#stvCcBtn'))closeCc() });
/* أزرار صندوق الخطأ */
$('#stvErrRetry').addEventListener('click',function(){ hideErr(); if(state.current)playItem(state.current) });
$('#stvErrOther').addEventListener('click',function(){ hideErr(); showIdle(true); state.current=null; try{d.title='سوفتارا TV — مركز التلفزيون والترفيه'}catch(_){} });
/* شريط التقدم */
var seeking=false;
$('#stvSeek').addEventListener('input',function(){
  seeking=true;
  var dur=video.duration;
  if(curProvider==='youtube'&&ytPlayer){try{dur=ytPlayer.getDuration()||0}catch(_){}}
  $('#stvCur').textContent=fmtT(this.value/1000*(dur||0));
});
$('#stvSeek').addEventListener('change',function(){
  seeking=false;
  var frac=this.value/1000;
  if(curProvider==='youtube'&&ytPlayer){try{ytPlayer.seekTo(frac*(ytPlayer.getDuration()||0),true)}catch(_){}}
  else try{video.currentTime=frac*video.duration}catch(_){}
});
/* PiP */
function pipAvailable(){return !IS_IOS&&d.pictureInPictureEnabled&&('pictureInPictureEnabled' in d)}
if(pipAvailable()){ $('#stvPipBtn').style.display='';$('#stvPipBtn2').style.display=''; }
function togglePip(){
  if(d.pictureInPictureElement){d.exitPictureInPicture()}
  else if(pipAvailable()&&video.src){video.requestPictureInPicture().catch(function(){toast('تعذّر فتح الصورة داخل صورة',true)})}
  else if(!video.src){toast('الصورة داخل صورة متاحة مع مشغّل الصفحة (HLS/MP4) فقط — التضمينات الخارجية يديرها مشغّل المنصة')} }
$('#stvPipBtn').addEventListener('click',togglePip);
$('#stvPipBtn2').addEventListener('click',togglePip);

/* ─────────── 5) واجهة القوائم والشبكة ─────────── */
function setNow(it){
  $('#stvName').textContent=it.name+(it.ep?' — '+it.ep:'');
  $('#stvNowName').textContent=it.name+(it.ep?' — '+it.ep:'');
  $('#stvLiveChip').style.display=(it.kind==='channel'&&!it.soon)?'':'none';
  $('#stvHd').style.display=it.hd?'':'none';
  var pv=$('#stvProv');
  if(pv){var p=PROVIDERS[it.type];if(p){pv.textContent=p.label;pv.style.display=''}else{pv.style.display='none'}}
}
function savePlaylistFor(it){
  if(it.kind==='channel'){ state.playlist=state.items.filter(function(i){return i.kind==='channel'&&!i.soon}) }
  else if(it.group){ state.playlist=state.items.filter(function(i){return i.group===it.group}) }
  else { state.playlist=state.items.filter(function(i){return i.kind===it.kind&&!i.soon}) }
}
function step(n){
  if(!state.current)return;
  var ids=state.playlist.map(function(i){return i.id});var idx=ids.indexOf(state.current.id);
  if(idx<0)return;
  var next=state.playlist[(idx+n+state.playlist.length)%state.playlist.length];
  playItem(next);
}
$('#stvPrevBtn').addEventListener('click',function(){step(-1)});
$('#stvNextBtn').addEventListener('click',function(){step(1)});

/* قائمة القنوات (تُعرض في لوحتي الهاتف والحاسب) */
function renderChLists(){
  var chans=state.items.filter(function(i){return i.kind==='channel'});
  var cats=['الكل'];chans.forEach(function(c){if(cats.indexOf(c.cat)<0)cats.push(c.cat)});
  ['stvChFiltersM','stvChFiltersD'].forEach(function(fid){
    var box=d.getElementById(fid);if(!box)return;box.innerHTML='';
    cats.forEach(function(cat){
      var b=d.createElement('button');b.className='stv-chip-f'+(state.chFilter===cat?' on':'');b.textContent=cat;
      b.addEventListener('click',function(){state.chFilter=cat;renderChLists()});
      box.appendChild(b);
    });
  });
  ['stvChListM','stvChListD'].forEach(function(lid){
    var list=d.getElementById(lid);if(!list)return;list.innerHTML='';
    chans.filter(function(c){return state.chFilter==='الكل'||c.cat===state.chFilter}).forEach(function(c){
      var b=d.createElement('button');b.className='stv-ch'+(state.current&&state.current.id===c.id?' on':'');
      b.innerHTML='<span class="stv-ch-av" style="background:'+gradCss(c.cat)+'">'+esc(c.name.trim().charAt(0))+'</span>'
        +'<span class="stv-ch-meta"><b>'+esc(c.name)+'</b><small><i class="dotl"></i>'+esc(c.cat)+' · '+esc(c.country||'')+(c.hd?' <span class="stv-badge-hd">HD</span>':'')+'</small></span>'
        +icon(state.current&&state.current.id===c.id?'pause':'play');
      b.addEventListener('click',function(){playItem(c);if(w.innerWidth<1024){toast('جارٍ تشغيل: '+c.name)}});
      list.appendChild(b);
    });
    if(!list.children.length)list.innerHTML='<div class="stv-empty">لا توجد قنوات في هذا التصنيف بعد</div>';
  });
}
/* فتح/إغلاق قائمة القنوات على الهاتف */
$('#stvPanelBtn').addEventListener('click',function(){
  var p=$('#stvChPanel');var on=p.classList.toggle('open');
  this.setAttribute('aria-expanded',on);
  if(on)setTimeout(function(){p.scrollIntoView({behavior:'smooth',block:'nearest'})},180);
});

/* حلقات المسلسل */
function renderEps(it){
  var box=$('#stvEps');
  if(!it||!it.group){box.classList.remove('show');box.innerHTML='';return}
  var list=state.items.filter(function(i){return i.group===it.group});
  box.innerHTML='<b>'+esc(it.name)+' — الحلقات</b>';
  list.forEach(function(e){
    var b=d.createElement('button');b.className='stv-ep'+(e.id===it.id?' on':'');
    b.textContent=e.ep||e.name;
    b.addEventListener('click',function(){playItem(e)});
    box.appendChild(b);
  });
  box.classList.add('show');
}

/* الأقسام */
var TABS=[
  {id:'channel',name:'البث المباشر',ic:'tv'},
  {id:'movie',name:'الأفلام',ic:'film'},
  {id:'series',name:'المسلسلات',ic:'series'},
  {id:'program',name:'البرامج',ic:'clap'},
  {id:'wrestling',name:'المصارعة',ic:'zap'},
  {id:'docs',name:'وثائقيات',ic:'book'},
  {id:'kids',name:'أطفال',ic:'kid'},
  {id:'favs',name:'المفضلة',ic:'heart'}
];
var TAB_TITLES={channel:'البث المباشر',movie:'الأفلام',series:'المسلسلات',program:'البرامج',wrestling:'المصارعة',docs:'وثائقيات',kids:'أطفال',favs:'المفضلة'};
function renderTabs(){
  var box=$('#stvTabs');box.innerHTML='';
  TABS.forEach(function(t){
    var b=d.createElement('button');
    b.className='stv-tab'+(state.tab===t.id?' on':'');b.setAttribute('role','tab');
    b.setAttribute('aria-selected',state.tab===t.id);
    b.dataset.tab=t.id;
    b.innerHTML=icon(t.ic)+'<span>'+t.name+'</span>'+(t.id==='favs'?'<span class="cnt">'+state.favs.length+'</span>':'');
    b.addEventListener('click',function(){
      state.tab=t.id;state.query='';state.chFilter='الكل';$('#stvSearch').value='';
      renderTabs();renderTabFilters();renderGrid();
      if(t.id!=='channel'){ $('#stvGrid').scrollIntoView({behavior:'smooth',block:'start'}) }
    });
    box.appendChild(b);
  });
}
function renderTabFilters(){
  var box=$('#stvTabFilters');box.innerHTML='';
  var items=viewItems();
  var cats=[];items.forEach(function(i){if(i.cat&&cats.indexOf(i.cat)<0)cats.push(i.cat)});
  if(cats.length<2){box.style.display='none';return}
  box.style.display='';
  var all=d.createElement('button');all.className='stv-chip-f'+(state.chFilter==='الكل'?' on':'');all.textContent='الكل';
  all.addEventListener('click',function(){state.chFilter='الكل';renderTabFilters();renderGrid()});box.appendChild(all);
  cats.forEach(function(cat){
    var b=d.createElement('button');b.className='stv-chip-f'+(state.chFilter===cat?' on':'');b.textContent=cat;
    b.addEventListener('click',function(){state.chFilter=cat;renderTabFilters();renderGrid()});box.appendChild(b);
  });
}
/* بطاقات المجموعات: مسلسل/قائمة تظهر كبطاقة واحدة تفتح ورقة التفاصيل */
var GROUP_KINDS={series:1,program:1,wrestling:1,kids:1};
function groupCard(gid){
  var g=STV_DATA.groups[gid];
  return {isGroup:true,id:gid,kind:(g.kind||'series'),name:g.name,cat:g.cat,year:g.year,poster:g.poster,demo:g.demo,desc:g.desc,total:g.total||0};
}
function groupCardsFor(kind){
  var out=[];
  Object.keys(STV_DATA.groups).forEach(function(gid){ if((STV_DATA.groups[gid].kind||'series')===kind)out.push(groupCard(gid)) });
  state.items.forEach(function(i){ if(i.kind===kind&&!i.group&&!i.soon)out.push(i) });
  return out;
}
function viewItems(){
  if(state.tab==='favs'){
    var out=state.items.filter(function(i){return isFav(i.id)});
    Object.keys(STV_DATA.groups).forEach(function(gid){ if(isFav(gid))out.push(groupCard(gid)) });
    return out;
  }
  if(GROUP_KINDS[state.tab])return groupCardsFor(state.tab);
  return state.items.filter(function(i){return i.kind===state.tab});
}
/* الشبكة */
function renderGrid(){
  var grid=$('#stvGrid');
  var items=viewItems();
  var q=(state.query||'').trim().toLowerCase();
  var title=$('#stvGridTitle'),count=$('#stvGridCount');
  if(q){
    var matched=state.items.filter(function(i){
      /* مراجعة T7: إذا طابقت المجموعة نفسها في البحث تُستبعد حلقاتها من النتائج فلا ازدواجية عرض */
      if(i.group){ var gg=STV_DATA.groups[i.group]; if(gg&&(gg.name+' '+(gg.cat||'')+' '+(gg.desc||'')).toLowerCase().indexOf(q)>-1)return false }
      return (i.name+' '+(i.cat||'')+' '+(i.country||'')+' '+(i.desc||'')+' '+(i.ep||'')+' '+(i.durText||'')).toLowerCase().indexOf(q)>-1;
    });
    var gc=[];
    Object.keys(STV_DATA.groups).forEach(function(gid){
      var g=STV_DATA.groups[gid];
      if((g.name+' '+(g.cat||'')+' '+(g.desc||'')).toLowerCase().indexOf(q)>-1)gc.push(groupCard(gid));
    });
    items=gc.concat(matched);
    title.textContent='نتائج البحث عن: «'+state.query+'»';
    count.textContent=items.length+' نتيجة';
  }else{
    title.textContent=TAB_TITLES[state.tab]||'';
    count.textContent=items.length?items.length+' عنصر':'';
  }
  if(state.chFilter!=='الكل'&&!q)items=items.filter(function(i){return i.cat===state.chFilter});
  grid.innerHTML='';
  if(!items.length){
    grid.innerHTML='<div class="stv-empty" style="grid-column:1/-1">'+icon(state.tab==='favs'?'heart':'search')
      +'<div>'+(q?'لا توجد نتائج مطابقة لبحثك':'لا يوجد محتوى هنا بعد — أضف عناصر من قسم البيانات في الصفحة')+'</div></div>';
    return;
  }
  var isChannelGrid=(state.tab==='channel'&&!q);
  items.forEach(function(it){
    grid.appendChild(makeCard(it,isChannelGrid));
  });
}
function makeCard(it,channelStyle){
  /* مراجعة T7: زر داخل زر مخالف لنموذج محتوى HTML — البطاقة الآن div قابل للوحة المفاتيح */
  var card=d.createElement('div');
  card.setAttribute('role','button');card.tabIndex=0;
  card.setAttribute('aria-label',it.name+(it.isGroup?' — عرض الحلقات':' — تشغيل'));
  card.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click()} });
  var playing=state.current&&(state.current.id===it.id||state.current.group===it.id);
  card.className='stv-card'+(channelStyle?'':' poster')+(playing?' playing':'');
  var media;
  if(channelStyle){
    media='<span class="stv-card-av" style="background:'+gradCss(it.cat)+'">'+esc(it.name.trim().charAt(0))+'</span>';
  }else{
    var psrc=it.poster||it.thumb||posterSVG(it,600,900);
    media='<img loading="lazy" alt="'+esc(it.name)+'" src="'+esc(psrc)+'">';
  }
  var badges='';
  if(it.kind==='channel'&&!it.soon)badges+='<span class="stv-badge live">● مباشر</span>';
  if(it.hd)badges+='<span class="stv-badge hd">HD</span>';
  if(it.demo)badges+='<span class="stv-badge demo">تجريبي</span>';
  if(it.isGroup)badges+='<span class="stv-badge ep">'+(it.total||0)+' حلقة</span>';
  else if(it.ep)badges+='<span class="stv-badge ep">'+esc(it.ep)+'</span>';
  if(it.durText&&!it.isGroup)badges+='<span class="stv-badge dur">'+esc(it.durText)+'</span>';
  if(it.soon)badges+='<span class="stv-badge demo">قريبًا</span>';
  var provLbl=PROVIDERS[it.type]?PROVIDERS[it.type].label:'';
  if(provLbl)badges+='<span class="stv-badge prov">'+esc(provLbl)+'</span>';
  card.innerHTML=
    '<span class="stv-card-media">'+media+
      '<span class="stv-card-badges">'+badges+'</span>'+
      '<button class="stv-fav'+(isFav(it.id)?' on':'')+'" aria-label="المفضلة" tabindex="0">'+icon('heart')+'</button>'+
    '</span>'+
    '<span class="stv-card-body"><b>'+esc(it.name)+'</b><small>'+esc([it.year,it.cat,it.country,(it.desc||'').slice(0,42)].filter(Boolean).join(' · '))+'</small></span>';
  card.querySelector('.stv-fav').addEventListener('click',function(e){e.stopPropagation();toggleFav(it.id)});
  card.addEventListener('click',function(){
    if(it.isGroup){openDetail(it.id);return}
    playItem(it);
    if(w.innerWidth<1024)setTimeout(function(){shell.scrollIntoView({behavior:'smooth',block:'start'})},120);
    renderChLists();
  });
  var im=card.querySelector('img');
  if(im)im.addEventListener('error',function(){this.onerror=null;this.src=posterSVG(it,600,900)});
  return card;
}

/* متابعة المشاهدة */
function renderContinue(){
  var sec=$('#stvContinueSec'),box=$('#stvContinue');
  var list=Object.keys(state.prog).map(function(id){var p=state.prog[id];var it=null;
    for(var i=0;i<state.items.length;i++)if(state.items[i].id===id)it=state.items[i];
    return it?{it:it,p:p}:null;}).filter(Boolean).sort(function(a,b){return b.p.at-a.p.at}).slice(0,10);
  if(!list.length){sec.style.display='none';box.classList.remove('show');return}
  sec.style.display='';box.classList.add('show');box.innerHTML='';
  list.forEach(function(o){
    var card=d.createElement('button');card.className='stv-card';
    var psrc=o.it.poster||o.it.thumb||posterSVG(o.it,600,340);
    card.innerHTML='<span class="stv-card-media"><img loading="lazy" alt="'+esc(o.it.name)+'" src="'+esc(psrc)+'"></span>'+
      '<span class="stv-card-body"><b>'+esc(o.it.name)+'</b><small>'+esc((o.it.ep?o.it.ep+' · ':'')+'من '+fmtT(o.p.t)+' · '+fmtAgo(o.p.at))+'</small></span>'+
      '<span class="stv-prog"><i style="width:'+Math.min(100,Math.round(o.p.t/o.p.d*100))+'%"></i></span>';
    card.addEventListener('click',function(){playItem(o.it)});
    var im=card.querySelector('img');
    if(im)im.addEventListener('error',function(){this.onerror=null;this.src=posterSVG(o.it,600,340)});
    box.appendChild(card);
  });
}
/* استكمال تلقائي عند فتح مصدر له سجل */
video.addEventListener('loadedmetadata',function(){
  var isChannel=!!(state.current&&state.current.kind==='channel');
  isLive=isChannel||!isFinite(video.duration);
  $('#stvSeekRow').style.display=isFinite(video.duration)&&!isLive?'':'none';
  if(!isChannel&&state.current&&state.prog[state.current.id]){
    var p=state.prog[state.current.id];
    if(p.t>25&&p.t<video.duration*.95){try{video.currentTime=p.t;toast('تم استكمال المشاهدة من '+fmtT(p.t))}catch(_){}}
  }
});

/* ─────────── 6) البحث والسمة والاختصارات ─────────── */
var searchT=null;
$('#stvSearch').addEventListener('input',function(){
  var v=this.value;clearTimeout(searchT);
  searchT=setTimeout(function(){state.query=v;state.chFilter='الكل';renderGrid()},180);
});
$('#stvSearchClear').addEventListener('click',function(){
  $('#stvSearch').value='';state.query='';renderGrid();$('#stvSearch').focus();
});
$('#stvSearchBtn').addEventListener('click',function(){
  var wrap=$('#stvSearchWrap');var on=wrap.classList.toggle('open');
  this.setAttribute('aria-expanded',on);
  if(on)setTimeout(function(){$('#stvSearch').focus()},120);
});
function applyTheme(){
  d.documentElement.setAttribute('data-theme',state.theme);
  $('#stvThemeIc').setAttribute('href',state.theme==='dark'?'#i-sun':'#i-moon');
  var mt=$('#stvMetaTheme');if(mt)mt.setAttribute('content',state.theme==='dark'?'#0a0f0d':'#f2f6f4');
}
$('#stvThemeBtn').addEventListener('click',function(){
  state.theme=state.theme==='dark'?'light':'dark';
  store.set(STV_CONFIG.storage.theme,state.theme);applyTheme();
});
d.addEventListener('keydown',function(e){
  var tag=(e.target.tagName||'').toLowerCase();
  if(tag==='input'||tag==='textarea')return;
  /* Space/Enter تُفعّل العنصر المركّز نفسه (زر/تبويب/قائمة) — لا نختطفها لمشغل الفيديو (مراجعة T7) */
  if(e.key===' '&&e.target.closest('button,a,[role="tab"],[role="menuitem"]'))return;
  if(e.key==='/' ){e.preventDefault();$('#stvSearchWrap').classList.add('open');$('#stvSearch').focus();return}
  if(e.key==='Escape'){closeDetail();return}
  if(embedMode&&curProvider!=='youtube')return;
  switch(e.key){
    case ' ':case 'k':e.preventDefault();togglePlay();break;
    case 'f':toggleFullscreen();break;
    case 'm':$('#stvMuteBtn').click();break;
    case 'n':step(1);break;
    case 'p':step(-1);break;
    case 'ArrowUp':case 'ArrowDown':{
      e.preventDefault();
      var dir=e.key==='ArrowUp'?10:-10;
      var v=Math.max(0,Math.min(100,Number($('#stvVol').value)+dir));
      $('#stvVol').value=v;$('#stvVol').dispatchEvent(new Event('input'));
      break;
    }
  }
});
/* حفظ الموضع عند مغادرة الصفحة */
d.addEventListener('visibilitychange',function(){
  if(d.visibilityState==='hidden'&&state.current&&state.current.kind!=='channel'&&isFinite(video.duration)&&video.currentTime>25&&video.currentTime<video.duration*.95){
    state.prog[state.current.id]={t:video.currentTime,d:video.duration,at:Date.now(),name:state.current.name,ep:state.current.ep||''};
    store.set(STV_CONFIG.storage.prog,state.prog);
  }
});

/* ─────────── 6ب) ورقة تفاصيل العنوان (مواسم/حلقات/مشابه) ─────────── */
var detailGid=null,detailSeason=0;
function firstWatchableEp(gid){
  var list=state.items.filter(function(i){return i.group===gid});
  var best=null;
  list.forEach(function(e){ if(state.prog[e.id]&&(!best||state.prog[e.id].at>state.prog[best.id].at))best=e });
  return best||list[0];
}
function updateDetailPlayLbl(gid){
  var lbl='تشغيل';
  var best=firstWatchableEp(gid);
  if(best&&state.prog[best.id])lbl='متابعة — '+best.ep;
  else if(best)lbl='تشغيل — '+best.ep;
  $('#stvDetailPlayLbl').textContent=lbl;
}
function openDetail(gid){
  var g=STV_DATA.groups[gid];if(!g)return;
  detailGid=gid;detailSeason=0;
  var card={name:g.name,cat:g.cat,year:g.year,kind:g.kind||'series'};
  var hero=$('#stvDetailHero');
  hero.innerHTML=g.poster?'<img alt="'+esc(g.name)+'" src="'+esc(g.poster)+'">':'<img alt="'+esc(g.name)+'" src="'+posterSVG(card,900,420)+'">';
  var hImg=hero.querySelector('img');
  if(hImg)hImg.addEventListener('error',function(){this.onerror=null;this.src=posterSVG(card,900,420)});
  $('#stvDetailName').textContent=g.name;
  var chips=[];
  if(g.total)chips.push('<span class="hot">'+g.total+' حلقة</span>');
  if(g.year)chips.push('<span>'+esc(g.year)+'</span>');
  if(g.cat)chips.push('<span>'+esc(g.cat)+'</span>');
  if(g.playlist)chips.push('<span>قائمة أصلية على المنصة</span>');
  if(g.demo)chips.push('<span class="hot">تجريبي</span>');
  $('#stvDetailMeta').innerHTML=chips.join('');
  $('#stvDetailDesc').textContent=g.desc||'';
  $('#stvDetailSrc').innerHTML=icon('info')+'<span>'+esc(g.srcNote||'مصدر المحتوى مرفق مع كل عنصر')+'</span>';
  $('#stvDetailPlay').onclick=function(){ var first=firstWatchableEp(gid); closeDetail(); if(first)playItem(first) };
  updateDetailPlayLbl(gid);
  var fb=$('#stvDetailFav');
  fb.onclick=function(){ toggleFav(gid); fb.classList.toggle('is-fav',isFav(gid)) };
  fb.classList.toggle('is-fav',isFav(gid));
  renderDetailSeasons(gid);renderDetailEps(gid);renderDetailSimilar(gid);
  var dd=$('#stvDetail');dd.classList.add('open');dd.setAttribute('aria-hidden','false');
  try{d.body.style.overflow='hidden'}catch(_){}
}
function closeDetail(){
  var dd=$('#stvDetail');if(!dd.classList.contains('open'))return;
  dd.classList.remove('open');dd.setAttribute('aria-hidden','true');
  try{d.body.style.overflow=''}catch(_){}
  detailGid=null;
}
function renderDetailSeasons(gid){
  var g=STV_DATA.groups[gid];var box=$('#stvDetailSeasons');box.innerHTML='';
  if(!g||!g.seasons||g.seasons.length<2)return;
  g.seasons.forEach(function(se,si){
    var b=d.createElement('button');b.className=si===detailSeason?'on':'';
    b.textContent=se.name+' ('+(se.eps?se.eps.length:0)+')';
    b.addEventListener('click',function(){detailSeason=si;renderDetailSeasons(gid);renderDetailEps(gid)});
    box.appendChild(b);
  });
}
function renderDetailEps(gid){
  var g=STV_DATA.groups[gid];var box=$('#stvDetailEps');box.innerHTML='';
  if(!g)return;
  var se=(g.seasons||[])[detailSeason]||{eps:[]};
  se.eps.forEach(function(e,i){
    var epId=gid+'-s'+(detailSeason+1)+'e'+(i+1);
    var it=null;
    for(var k=0;k<state.items.length;k++)if(state.items[k].id===epId){it=state.items[k];break}
    var b=d.createElement('button');b.className='stv-detal'+(state.current&&state.current.id===epId?' on':'');
    var p=state.prog[epId];
    var pct=p?Math.min(100,Math.round(p.t/p.d*100)):0;
    b.innerHTML='<span class="th">'+((e.thumb||g.poster)?'<img loading="lazy" alt="'+esc(e.title||'')+'" src="'+esc(e.thumb||g.poster)+'">':'')
      +'<span class="stv-badge dur">'+esc(e.durText||'')+'</span>'
      +(pct?'<span class="stv-prog"><i style="width:'+pct+'%"></i></span>':'')+'</span>'
      +'<span class="tx"><b>الحلقة '+(i+1)+'</b><small>'+esc(e.title||'')+'</small></span>';
    b.addEventListener('click',function(){ closeDetail(); if(it)playItem(it) });
    var im=b.querySelector('img');
    if(im)im.addEventListener('error',function(){this.onerror=null;this.src=posterSVG({name:g.name,cat:g.cat,kind:g.kind||'series'},640,360)});
    box.appendChild(b);
  });
}
function renderDetailSimilar(gid){
  var g=STV_DATA.groups[gid];var box=$('#stvDetailSimilar');
  if(!g){box.innerHTML='';return}
  var sims=[];
  Object.keys(STV_DATA.groups).forEach(function(other){
    var og=STV_DATA.groups[other];
    if(other!==gid&&og.cat===g.cat)sims.push({gid:other,g:og});
  });
  state.items.forEach(function(i){
    if(!i.group&&i.cat===g.cat&&i.poster&&sims.length<8)sims.push({item:i});
  });
  if(!sims.length){box.innerHTML='';return}
  box.innerHTML='<h4>محتوى مشابه</h4>';
  var row=d.createElement('div');row.className='stv-simil-row';
  sims.slice(0,8).forEach(function(s){
    var b=d.createElement('button');b.className='stv-simil';
    var nm=s.g?s.g.name:s.item.name;
    var po=s.g?s.g.poster:s.item.poster;
    b.innerHTML='<img loading="lazy" alt="'+esc(nm)+'" src="'+esc(po||posterSVG(s.g?{name:nm,cat:s.g.cat,kind:s.g.kind}:s.item,300,450))+'"><b>'+esc(nm)+'</b>';
    b.addEventListener('click',function(){ if(s.g)openDetail(s.gid); else {closeDetail();playItem(s.item)} });
    row.appendChild(b);
  });
  box.appendChild(row);
}
$('#stvDetailClose').addEventListener('click',closeDetail);
$('#stvDetailBack').addEventListener('click',closeDetail);

/* ─────────── 7) شريط الأخبار ─────────── */
function renderTicker(){
  var track=$('#stvTickerTrack');if(!track)return;
  var list=STV_DATA.news||[];
  var chunk=list.map(function(n){return '<span>'+esc(n)+'<i class="sep"></i></span>'}).join('');
  /* مراجعة T7: النسخة المكررة للتمرير السلس مخفية عن قارئات الشاشة والأصل مقروء */
  track.innerHTML=chunk+'<span aria-hidden="true" style="display:contents">'+chunk+'</span>';
  track.style.setProperty('--tick-dur',Math.max(30,list.length*9)+'s');
}

/* ─────────── 8) البدء: المقدمة الافتتاحية ثم التشغيل الافتراضي ─────────── */
/* المقدمة: SVG/CSS خالص (بديل ثابت مضمون — لا فيديو خارجي ولا صوت ولا أثر على سرعة الفتح)،
   تُعرض مرة واحدة في الجلسة، قابلة للتخطي، وتحترم تفضيل تقليل الحركة */
function bootDefault(){
  if(state.current)return;
  if(STV_CONFIG.autoplayDefault){
    var featured=state.items.filter(function(i){return i.featured})[0]||state.items.filter(function(i){return i.kind==='channel'})[0];
    if(featured){playItem(featured,{muted:true});return}
  }
  showIdle(true); /* مراجعة T7: شاشة بداية رشيقة إذا عُطّل التشغيل التلقائي أو لا توجد قنوات */
}
function maybeIntro(){
  var el=$('#stvIntro');
  if(!el){bootDefault();return}
  var seen=false;
  try{seen=sessionStorage.getItem('stv_intro_done')==='1'}catch(_){}
  if(seen){ if(el.parentNode)el.parentNode.removeChild(el); bootDefault(); return }
  el.classList.add('show');el.setAttribute('aria-hidden','false');
  var done=false;
  var finish=function(){
    if(done)return;done=true;
    try{sessionStorage.setItem('stv_intro_done','1')}catch(_){}
    el.classList.add('out');el.setAttribute('aria-hidden','true');
    setTimeout(function(){ if(el.parentNode)el.parentNode.removeChild(el) },480);
    bootDefault();
  };
  $('#stvIntroSkip').addEventListener('click',finish);
  var reduce=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(finish,reduce?1500:5600);
}
function init(){
  applyTheme();renderTicker();renderTabs();renderChLists();renderTabFilters();renderGrid();renderContinue();
  $('#stvStartBtn').addEventListener('click',function(){
    var featured=state.items.filter(function(i){return i.kind==='channel'})[0];
    if(featured){playItem(featured,{muted:false});state.muted=false}
  });
  maybeIntro();
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})();
