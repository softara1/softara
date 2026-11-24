/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v3.0.3 — منطق صفحة Softara Live TV (البث المباشر)
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

/* ─── فصل القنوات: عربية / أجنبية (v3.0.3) ───
   عربية إذا: اسمها بالعربية، أو حقل اللغة يبدأ بعربي، أو اسمها ينتهي بـArabic/Arabia،
   أو دولتها عربية (مع مراعاة «الإمارات · بث أمريكا»)، أو اسمها ضمن قائمة قنوات عربية معروفة بأسماء لاتينية */
var ARAB_COUNTRIES=['السعودية','الإمارات','قطر','مصر','العراق','الأردن','لبنان','سوريا','فلسطين','الكويت','البحرين','عُمان','عمان','اليمن','ليبيا','تونس','الجزائر','المغرب','السودان','موريتانيا','الصومال','جيبوتي','جزر القمر','المنطقة العربية','الشرق الأوسط'];
var ARAB_NAMES=['Mekameleen TV','Almahriah TV','Al Wilayah','Elsharq TV','Arabi TV','Ahlulbayt TV','Al-Mahdi TV','Alkarma TV Australia','Alkarma TV Family','Alkarma TV Middle East','Alkarma TV North America & Canada','Alkarma TV Praise','Alkarma TV Talmaza Discipleship','ATVSat','ABN Bible Movies Channel'];
function isArabicCh(c){
  if(/[\u0600-\u06FF]/.test(c.name))return true;
  if((c.lang||'').indexOf('عربي')===0)return true;
  if(/arab(ic|ia)\b/i.test(c.name))return true;
  var co=(c.country||'').split('·');
  for(var i=0;i<co.length;i++){if(ARAB_COUNTRIES.indexOf(co[i].trim())>-1)return true}
  return ARAB_NAMES.indexOf(c.name)>-1;
}
var channels=(DATA.items||[]).filter(function(i){return i.kind==='channel'&&!i.soon});
channels.forEach(function(c){c._ar=isArabicCh(c)});

/* ─────────── المشغل ─────────── */
var player=S.createPlayer({
  titleBase:DATA.page.title,
  onPlay:function(it){
    player.setPlaylist(channels); /* التنقل السابق/التالي داخل قائمة القنوات */
    renderChLists();
  },
  onEnded:function(it){/* البث المباشر لا ينتهي — لا فعل */},
  onFavsChange:function(){renderChLists()},
  onPickOther:function(){renderChLists()}
});

/* ─────────── القوائم والتصنيفات ─────────── */
function matches(c){
  var q=(state.query||'').trim().toLowerCase();
  var okCat=state.chFilter==='الكل'||c.cat===state.chFilter;
  var okGrp=(state.grp==='عربية')===!!c._ar;
  if(!q)return okGrp&&okCat;
  /* البحث يشمل كل القنوات بغض النظر عن مجموعة عربية/أجنبية */
  var hay=(c.name+' '+(c.cat||'')+' '+(c.country||'')+' '+(c.desc||'')).toLowerCase();
  return okCat&&hay.indexOf(q)>-1;
}
function filtered(){return channels.filter(matches)}

function renderChLists(){
  var inGrp=channels.filter(function(c){return (state.grp==='عربية')===!!c._ar});
  var cats=['الكل'];
  inGrp.forEach(function(c){if(cats.indexOf(c.cat)<0)cats.push(c.cat)});
  if(cats.indexOf(state.chFilter)<0)state.chFilter='الكل';
  /* شريط المجموعة (عربية/أجنبية) + أزرار التصنيفات — تُشتق آليًا من البيانات */
  ['stvChFiltersM','stvChFiltersD'].forEach(function(fid){
    var box=d.getElementById(fid);if(!box)return;
    var wrap=box.parentNode&&box.parentNode.classList&&box.parentNode.classList.contains('stv-fwrap')?box.parentNode:null;
    if(!wrap){
      wrap=d.createElement('div');wrap.className='stv-fwrap';
      box.parentNode.insertBefore(wrap,box);wrap.appendChild(box);
      var g0=d.createElement('div');g0.className='stv-grpbar';wrap.insertBefore(g0,box);
    }
    var gb=wrap.querySelector('.stv-grpbar');gb.innerHTML='';
    ['عربية','أجنبية'].forEach(function(g){
      var n=channels.filter(function(c){return (g==='عربية')===!!c._ar}).length;
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
        +'<div>'+(state.query?'لا توجد قنوات مطابقة لبحثك':'لا توجد قنوات في هذا التصنيف بعد — أضف قنوات من ملف البيانات')+'</div></div>';
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
