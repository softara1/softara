/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v3.0.4 — منطق صفحة Softara Live TV (البث المباشر)
   هذه الصفحة للقنوات المباشرة فقط:
   تصنيفات مشتقة آليًا من البيانات · بحث فوري · تنقّل سابق/تالي ·
   لوحة قنوات للهاتف ولوح جانبي للحاسب · تشغيل تلقائي مكتوم للقناة المميزة
   ★ يعتمد على: softara-shared.js ثم softara-player.js ثم هذا الملف
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var S=window.STV, DATA=window.STV_LIVE_DATA;
if(!S||!DATA){
  document.addEventListener('DOMContentLoaded',function(){
    var box=document.getElementById('stvChListM');
    if(box)box.innerHTML='<div class="stv-empty">تعذّر تحميل بيانات القنوات من الشبكة.<br>تحقق من اتصال الإنترنت ثم أعد تحميل الصفحة.</div>';
  });
  return;
}
var d=S.d,w=S.w,$=S.$,esc=S.esc,icon=S.icon,fmtT=S.fmtT;

/* ─────────── الحالة ─────────── */
var state={ query:'', chFilter:'الكل', grp:'عربية' };

/* ─── فصل القنوات إلى مجموعات (v3.0.4) ───
   المرجع: لغة البث المسجلة لكل قناة في فهرس iptv-org (feeds) + لغة البيانات + مراجعة يدوية للملتبس.
   عربية = لغة البث الأولى عربية · غير محدد/متعددة = لغات مختلطة أو لا مصدر موثوق للغة · أجنبية = الباقي.
   (لا يُستخدم بلد القناة ولا حروف الاسم كدليل لغة.) القنوات المضافة لاحقًا تُصنَّف أجنبية حتى تُدرج هنا. */
var GRP_AR=["ch-aj","ch-alarabiya","ch-sna","ch-dw","ch-trt","ch-hadath","ch-asharqnews","ch-ekhbariya","ch-alarabiya-biz","ch-cnbc-arabia","ch-f24-ar","ch-ajm","ch-kurdsat-news","ch-al24","ch-ktv-news","ch-medi1","x-AlAlamAlYawm.sa","x-AlMasarTV.ly","x-AlMasirah.ye","x-AlNajahNews.ps","x-AlYaumTV.ae","x-AlghadeerTV.iq","x-AlmahriahTV.tr","x-AltaghierTV.jo","x-BBCArabic.uk","x-CGTNArabic.cn","x-DijlahTV.iq","x-HalabTodayTV.sy","x-i24NEWSArabic.il","x-Medi1TVMaghreb.ma","x-MekameleenTV.tr","x-PalestineAlYawm.lb","x-PalestineToday.ps","x-SerajTV.ps","x-VoiceofLebanon.lb","x-WelatTV.sy","ch-ktv-sport","ch-ktv-sport-plus","ch-oman-sport","x-BahrainSports1.bh","x-BahrainSports2.bh","x-Prime.sy","x-AlIraqiaSport","ch-aflam","x-MixHollywood.eg","x-ThikrayatTV.sa","x-MBCDrama","ch-babalhara","ch-mbc-drama","ch-mbc-masr-drama","ch-jordan-drama","x-Maraya.sa","x-MBCDramaUSA","ch-sat7kids","ch-atfal","x-AlSouriyaTV.sy","x-KoogiTV.eg","x-MBC3USA.us","x-SpacetoonArabic.ae","x-GodStandsKidsClubTVArabic","ch-quran-qatar","ch-iqraa","ch-iqraa-quran","ch-alistiqama","ch-assirat","ch-maaref","x-ABNsat.iq","x-AghapyTV.eg","x-AlQuranAlKareemTV.sa","x-AlSunnahAlNabawiyahTV.sa","x-AlWilayah.ir","x-AlJawadainTV.iq","x-AlSahatTV.ye","x-AlabbassiaTV.iq","x-AlkarmaTVAustralia.us","x-AlkarmaTVFamily.us","x-AlkarmaTVMiddleEast.us","x-AlkarmaTVNorthAmericaCanada.us","x-AlkarmaTVPraise.us","x-AlkarmaTVTalmazaDiscipleship.us","x-AlkarmaTVYouthEnglish.us","x-AlmagdTVMiddleEast.us","x-AlmagdTVNorthAmerica.us","x-Alquran.iq","x-ATVSat.us","x-BahrainQuran.bh","x-Ch4TeenDocumentary.kw","x-CharityTV.lb","x-HolyQuranRadio.sa","x-KTVAlQurain.kw","x-LogosTV.us","x-LoveWorldArabic.ng","x-MahdawiounTV.iq","x-MarjaeyatTVArabic.iq","x-NourAlKoddass.lb","x-NourAlSharq.lb","ch-mbc1","ch-mbc4","ch-mbc5","ch-mbc-masr","ch-mbc-masr2","ch-mbc-iraq","ch-iraqia","ch-ktv1","ch-ktv-ethraa","ch-qatar-tv","ch-alsaudiya","ch-ksa-now","ch-sbc","ch-thaqafiya","ch-sharjah","ch-sharjah2","ch-jordan-tv","ch-jordan-comedy","ch-jordan-kitchen","ch-mtv-lebanon","ch-future","ch-chada","ch-2m","ch-alaraby","ch-alaraby2","ch-syria","ch-palestine","ch-falastini","ch-watania1","ch-dabanga","ch-libya","ch-yemen-today","ch-kurdsat","ch-zagros","x-HyaTV.eg","ch-asharq-disc","ch-jordan-tourism","x-AlArabiyaPrograms.ae","x-KarbalaDocumentary.iq","x-AsharqDocumentary","ch-mbc-mood","ch-fairuz","ch-tarab","ch-rabeh-saqer","ch-aghani","x-JeddahRadio.sa","x-mfm.lb","x-MosaiqueFM.tn","x-PanoramaFM.sa","x-AsharqRadio.sa","x-QBC.qa","x-AlHiwarTV.uk","x-KTVArabe.kw","x-AjmanTV.ae","x-AlRayyanOldTV.qa","x-AlRayyanTV.qa","x-AlSharqiyaMinKabla.ae","x-AlWoustaTV.ae","x-Althania.sy","x-ElWatania2.tn","x-ElsharqTV.tr","x-MusawaChannel.ps","x-PalestineMubasher.ps","x-RajeenTV.ps","x-SharjahRadio.ae","x-UTV.iq","x-WatanTV.eg","x-WatarRadio.ae","ch-aje"];
var GRP_MX=["ch-rbtv","ch-movies-action","ch-movies-thriller","ch-babyfirst","x-Pulse95Radio.ae","x-RojavaTV.sy","x-RonahiTV.sy","x-MBCBollywood.ae"];
var GROUPS=['عربية','أجنبية','غير محدد'];
function grpOf(c){return GRP_AR.indexOf(c.id)>-1?'عربية':GRP_MX.indexOf(c.id)>-1?'غير محدد':'أجنبية'}
var channels=(DATA.items||[]).filter(function(i){return i.kind==='channel'&&!i.soon});
channels.forEach(function(c){c._g=grpOf(c)});

/* ─────────── المشغل ─────────── */
var player=S.createPlayer({
  titleBase:DATA.page.title,
  onPlay:function(it){
    renderChLists();
  },
  onEnded:function(it){/* البث المباشر لا ينتهي — لا فعل */},
  onFavsChange:function(){renderChLists()},
  onPickOther:function(){renderChLists()}
});

/* ─────────── القوائم والتصنيفات ─────────── */
function matches(c){
  var q=(state.query||'').trim().toLowerCase();
  var okCat=(state.chFilter==='الكل'||c.cat===state.chFilter)&&c._g===state.grp;
  if(!q)return okCat;
  var hay=(c.name+' '+(c.cat||'')+' '+(c.country||'')+' '+(c.desc||'')).toLowerCase();
  return okCat&&hay.indexOf(q)>-1;
}
function filtered(){return channels.filter(matches)}

function renderChLists(){
  var inGrp=channels.filter(function(c){return c._g===state.grp});
  var cats=['الكل'];
  inGrp.forEach(function(c){if(cats.indexOf(c.cat)<0)cats.push(c.cat)});
  if(cats.indexOf(state.chFilter)<0)state.chFilter='الكل';
  /* شريط المجموعة + أزرار التصنيفات — تُشتق آليًا من البيانات */
  ['stvChFiltersM','stvChFiltersD'].forEach(function(fid){
    var box=d.getElementById(fid);if(!box)return;
    var wrap=box.parentNode.classList.contains('stv-fwrap')?box.parentNode:null;
    if(!wrap){
      wrap=d.createElement('div');wrap.className='stv-fwrap';
      box.parentNode.insertBefore(wrap,box);wrap.appendChild(box);
      var g0=d.createElement('div');g0.className='stv-grpbar';wrap.insertBefore(g0,box);
    }
    var gb=wrap.querySelector('.stv-grpbar');gb.innerHTML='';
    GROUPS.forEach(function(g){
      var n=channels.filter(function(c){return c._g===g}).length;
      if(!n)return;
      var b=d.createElement('button');b.className='stv-chip-f stv-grp'+(state.grp===g?' on':'');
      b.textContent=g+' · '+n;
      b.setAttribute('aria-pressed',state.grp===g);
      b.addEventListener('click',function(){if(state.grp!==g){state.grp=g;state.chFilter='الكل';renderChLists()}});
      gb.appendChild(b);
    });
    box.innerHTML='';
    cats.forEach(function(cat){
      var b=d.createElement('button');b.className='stv-chip-f'+(state.chFilter===cat?' on':'');b.textContent=cat;
      b.setAttribute('aria-pressed',state.chFilter===cat);
      b.addEventListener('click',function(){state.chFilter=cat;renderChLists()});
      box.appendChild(b);
    });
  });
  var list=filtered();
  /* السابق/التالي يتبعان المجموعة والتصنيف والبحث الظاهرة؛ القناة الجارية تبقى في أول القائمة إن كانت خارجها */
  var cur=player.current(),pl=list;
  if(cur&&list.every(function(c){return c.id!==cur.id}))pl=[cur].concat(list);
  player.setPlaylist(pl);
  /* عدّاد القنوات في ترويسة اللوح الجانبي */
  var cnt=d.getElementById('stvChCount');
  if(cnt)cnt.textContent=list.length+(list.length===channels.length?' قناة':' / '+channels.length);
  ['stvChListM','stvChListD'].forEach(function(lid){
    var el=d.getElementById(lid);if(!el)return;el.innerHTML='';
    list.forEach(function(c){
      var on=player.current()&&player.current().id===c.id;
      var b=d.createElement('button');b.className='stv-ch'+(on?' on':'');
      b.setAttribute('aria-label','تشغيل قناة '+c.name);
      var av='<span class="stv-ch-av" style="background:'+S.gradCss(c.cat)+'">'+esc(c.name.trim().charAt(0))+'</span>';
      /* v2.4.0: شعار القناة فوق الحرف — عند فشل تحميل الشعار يُزال فيظهر الحرف تلقائيًا */
      if(c.logo){av='<img class="stv-ch-logo" loading="lazy" alt="" src="'+esc(c.logo)+'" onerror="this.remove()">'+av}
      b.innerHTML='<span class="stv-ch-avwrap">'+av+'</span>'
        +'<span class="stv-ch-meta"><b>'+esc(c.name)+'</b><small><i class="dotl"></i>'+esc(c.cat)+' · '+esc(c.country||'')+(c.lang?' · '+esc(c.lang):'')+(c.hd?' <span class="stv-badge-hd">HD</span>':'')+'</small></span>'
        +icon(on?'pause':'play');
      b.addEventListener('click',function(){
        player.play(c);
        if(w.innerWidth<1024){S.toast('جارٍ تشغيل: '+c.name)}
      });
      el.appendChild(b);
    });
    if(!el.children.length){
      el.innerHTML='<div class="stv-empty">'+icon(state.query?'search':'tv')
        +'<div>'+(state.query?'لا نتائج في «'+state.grp+' · '+state.chFilter+'» — جرّب «الكل» أو مجموعة أخرى':'لا توجد قنوات في هذا التصنيف بعد — أضف قنوات من ملف البيانات')+'</div></div>';
    }
  });
}

/* فتح/إغلاق قائمة القنوات على الهاتف */
function bindPanelBtn(){
  var btn=$('#stvPanelBtn');if(!btn)return;
  btn.addEventListener('click',function(){
    var p=$('#stvChPanel');if(!p)return;var on=p.classList.toggle('open');
    this.setAttribute('aria-expanded',on);
    if(on)setTimeout(function(){p.scrollIntoView({behavior:'smooth',block:'nearest'})},180);
  });
}

/* ─────────── البحث ─────────── */
var searchT=null;
function bindSearch(){
  var inp=$('#stvSearch');if(!inp)return;
  inp.addEventListener('input',function(){
    var v=this.value;clearTimeout(searchT);
    searchT=setTimeout(function(){state.query=v;renderChLists()},180);
  });
  var clr=$('#stvSearchClear');
  if(clr)clr.addEventListener('click',function(){
    inp.value='';state.query='';renderChLists();inp.focus();
  });
  var btn=$('#stvSearchBtn');
  if(btn)btn.addEventListener('click',function(){
    var wrap=$('#stvSearchWrap');var on=wrap.classList.toggle('open');
    this.setAttribute('aria-expanded',on);
    if(on)setTimeout(function(){inp.focus()},120);
  });
}

/* ─────────── البدء ─────────── */
function bootDefault(){
  if(player.current())return;
  var featured=null;
  channels.forEach(function(c){if(c.featured)featured=c});
  if(featured){player.play(featured,{muted:true});return}
  player.showIdle(true);
}
/* نصوص الهوية والروابط من ملف البيانات */
function applyPageMeta(){
  var h=$('#stvIdleTitle');if(h)h.innerHTML=DATA.page.idleTitle;
  var p=$('#stvIdleText');if(p)p.textContent=DATA.page.idleText;
  var iw=$('#stvIntroWord');if(iw&&DATA.page.introWord)iw.innerHTML=DATA.page.introWord;
  var is=$('#stvIntroSub');if(is&&DATA.page.introSub)is.textContent=DATA.page.introSub;
  var fc=$('#stvFooterCompanion');
  if(fc){ if(DATA.links&&DATA.links.companion){fc.href=DATA.links.companion;fc.style.display=''}else{fc.style.display='none'} }
  var fr=$('#stvFooterReport');
  if(fr){ if(DATA.links&&DATA.links.report){fr.href=DATA.links.report;fr.style.display=''}else{fr.style.display='none'} }
}

function init(){
  S.applyTheme();S.bindThemeBtn();
  S.renderTicker(DATA.news);
  applyPageMeta();
  bindSearch();bindPanelBtn();renderChLists();
  var start=$('#stvStartBtn');
  if(start)start.addEventListener('click',function(){
    var first=channels.filter(function(c){return c.featured})[0]||channels[0];
    if(first){player.play(first,{muted:false});player.muted(false)}
  });
  S.maybeIntro(DATA.page.introKey,bootDefault);
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})();
