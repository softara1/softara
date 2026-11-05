/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v2.2.0 — منطق صفحة Softara Movies & Media
   الأفلام · المسلسلات · البرامج · المصارعة · الوثائقيات · الأطفال
   أقسام وتصنيفات · بحث فوري · ورقة تفاصيل بالمواسم والحلقات ·
   متابعة المشاهدة · تشغيل تلقائي للحلقة التالية · مفضلة
   ★ يعتمد على: softara-shared.js ثم softara-player.js ثم هذا الملف
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var S=window.STV, DATA=window.STV_MEDIA_DATA;
if(!S||!DATA){
  document.addEventListener('DOMContentLoaded',function(){
    var g=document.getElementById('stvGrid');
    if(g)g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:44px 16px;color:#f87171;font-weight:800;line-height:2">تعذّر تحميل بيانات مكتبة سوفتارا من الشبكة.<br>تحقق من اتصال الإنترنت ثم أعد تحميل الصفحة.</div>';
  });
  return;
}
var d=S.d,w=S.w,$=S.$,esc=S.esc,icon=S.icon,fmtT=S.fmtT,fmtAgo=S.fmtAgo;

/* تفكيك المجموعات آليًا إلى عناصر حلقات قابلة للتشغيل (مع مواسم وحلقات ومصغرات) */
var GROUPS=DATA.groups||{};
(function expandGroups(){
  var eps=[];
  Object.keys(GROUPS).forEach(function(gid){
    var g=GROUPS[gid];
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
  DATA.items=(DATA.items||[]).concat(eps);
})();

/* ─────────── الحالة ─────────── */
var state={ tab:'movie', query:'', chFilter:'الكل', items:DATA.items||[] };

/* ─────────── المشغل ─────────── */
var player=S.createPlayer({
  titleBase:DATA.page.title,
  onPlay:function(it){
    savePlaylistFor(it);
    renderEps(it);
    renderGrid();
  },
  onEnded:function(it){
    renderContinue();
    /* الحلقة التالية تلقائيًا داخل المجموعة نفسها */
    if(it&&it.group){
      var list=state.items.filter(function(i){return i.group===it.group});
      var idx=list.map(function(i){return i.id}).indexOf(it.id);
      if(idx>-1&&list[idx+1]){S.toast('تشغيل الحلقة التالية…');player.play(list[idx+1])}
    }
  },
  onFavsChange:function(){syncFavCount();renderGrid();renderContinue()},
  onPickOther:function(){renderGrid()},
  onEscape:function(){closeDetail()}
});

function isFav(id){return S.isFav(id)}
function toggleFav(id){S.toggleFav(id)}
function syncFavCount(){
  var c=$('.stv-tab[data-tab="favs"] .cnt');if(c)c.textContent=S.favCount();
}

/* ─────────── قوائم التشغيل والتنقل ─────────── */
function savePlaylistFor(it){
  if(it.group){ player.setPlaylist(state.items.filter(function(i){return i.group===it.group})) }
  else{ player.setPlaylist(state.items.filter(function(i){return i.kind===it.kind&&!i.soon})) }
}

/* حلقات المسلسل الحالي (شريط أسفل المشغل) */
function renderEps(it){
  var box=$('#stvEps');
  if(!box)return;
  if(!it||!it.group){box.classList.remove('show');box.innerHTML='';return}
  var list=state.items.filter(function(i){return i.group===it.group});
  box.innerHTML='<b>'+esc(it.name)+' — الحلقات</b>';
  list.forEach(function(e){
    var b=d.createElement('button');b.className='stv-ep'+(e.id===it.id?' on':'');
    b.textContent=e.ep||e.name;
    b.addEventListener('click',function(){player.play(e)});
    box.appendChild(b);
  });
  box.classList.add('show');
}

/* ─────────── الأقسام ─────────── */
var TABS=[
  {id:'movie',name:'الأفلام',ic:'film'},
  {id:'series',name:'المسلسلات',ic:'series'},
  {id:'program',name:'البرامج',ic:'clap'},
  {id:'wrestling',name:'المصارعة',ic:'zap'},
  {id:'docs',name:'وثائقيات',ic:'book'},
  {id:'kids',name:'أطفال',ic:'kid'},
  {id:'favs',name:'المفضلة',ic:'heart'}
];
var TAB_TITLES={movie:'الأفلام',series:'المسلسلات',program:'البرامج',wrestling:'المصارعة',docs:'وثائقيات',kids:'أطفال',favs:'المفضلة'};
function renderTabs(){
  var box=$('#stvTabs');if(!box)return;box.innerHTML='';
  TABS.forEach(function(t){
    var b=d.createElement('button');
    b.className='stv-tab'+(state.tab===t.id?' on':'');b.setAttribute('role','tab');
    b.setAttribute('aria-selected',state.tab===t.id);
    b.dataset.tab=t.id;
    b.innerHTML=icon(t.ic)+'<span>'+t.name+'</span>'+(t.id==='favs'?'<span class="cnt">'+S.favCount()+'</span>':'');
    b.addEventListener('click',function(){
      state.tab=t.id;state.query='';state.chFilter='الكل';
      var si=$('#stvSearch');if(si)si.value='';
      renderTabs();renderTabFilters();renderGrid();
      var g=$('#stvGrid');if(g)g.scrollIntoView({behavior:'smooth',block:'start'});
    });
    box.appendChild(b);
  });
}
function renderTabFilters(){
  var box=$('#stvTabFilters');if(!box)return;box.innerHTML='';
  var items=viewItems();
  var cats=[];items.forEach(function(i){if(i.cat&&cats.indexOf(i.cat)<0)cats.push(i.cat)});
  if(cats.length<2){box.style.display='none';return}
  box.style.display='';
  var all=d.createElement('button');all.className='stv-chip-f'+(state.chFilter==='الكل'?' on':'');all.textContent='الكل';
  all.setAttribute('aria-pressed',state.chFilter==='الكل');
  all.addEventListener('click',function(){state.chFilter='الكل';renderTabFilters();renderGrid()});box.appendChild(all);
  cats.forEach(function(cat){
    var b=d.createElement('button');b.className='stv-chip-f'+(state.chFilter===cat?' on':'');b.textContent=cat;
    b.setAttribute('aria-pressed',state.chFilter===cat);
    b.addEventListener('click',function(){state.chFilter=cat;renderTabFilters();renderGrid()});box.appendChild(b);
  });
}
/* بطاقات المجموعات: مسلسل/قائمة تظهر كبطاقة واحدة تفتح ورقة التفاصيل */
var GROUP_KINDS={series:1,program:1,wrestling:1,kids:1};
function groupCard(gid){
  var g=GROUPS[gid];
  return {isGroup:true,id:gid,kind:(g.kind||'series'),name:g.name,cat:g.cat,year:g.year,poster:g.poster,demo:g.demo,desc:g.desc,total:g.total||0};
}
function groupCardsFor(kind){
  var out=[];
  Object.keys(GROUPS).forEach(function(gid){ if((GROUPS[gid].kind||'series')===kind)out.push(groupCard(gid)) });
  state.items.forEach(function(i){ if(i.kind===kind&&!i.group&&!i.soon)out.push(i) });
  return out;
}
function viewItems(){
  if(state.tab==='favs'){
    var out=state.items.filter(function(i){return isFav(i.id)});
    Object.keys(GROUPS).forEach(function(gid){ if(isFav(gid))out.push(groupCard(gid)) });
    return out;
  }
  if(GROUP_KINDS[state.tab])return groupCardsFor(state.tab);
  return state.items.filter(function(i){return i.kind===state.tab});
}

/* ─────────── الشبكة ─────────── */
function renderGrid(){
  var grid=$('#stvGrid');if(!grid)return;
  var items=viewItems();
  var q=(state.query||'').trim().toLowerCase();
  var title=$('#stvGridTitle'),count=$('#stvGridCount');
  if(q){
    var matched=state.items.filter(function(i){
      /* مراجعة T7: إذا طابقت المجموعة نفسها في البحث تُستبعد حلقاتها من النتائج فلا ازدواجية عرض */
      if(i.group){ var gg=GROUPS[i.group]; if(gg&&(gg.name+' '+(gg.cat||'')+' '+(gg.desc||'')).toLowerCase().indexOf(q)>-1)return false }
      return (i.name+' '+(i.cat||'')+' '+(i.country||'')+' '+(i.desc||'')+' '+(i.ep||'')+' '+(i.durText||'')).toLowerCase().indexOf(q)>-1;
    });
    var gc=[];
    Object.keys(GROUPS).forEach(function(gid){
      var g=GROUPS[gid];
      if((g.name+' '+(g.cat||'')+' '+(g.desc||'')).toLowerCase().indexOf(q)>-1)gc.push(groupCard(gid));
    });
    items=gc.concat(matched);
    if(title)title.textContent='نتائج البحث عن: «'+state.query+'»';
    if(count)count.textContent=items.length+' نتيجة';
  }else{
    if(title)title.textContent=TAB_TITLES[state.tab]||'';
    if(count)count.textContent=items.length?items.length+' عنصر':'';
  }
  if(state.chFilter!=='الكل'&&!q)items=items.filter(function(i){return i.cat===state.chFilter});
  grid.innerHTML='';
  if(!items.length){
    grid.innerHTML='<div class="stv-empty" style="grid-column:1/-1">'+icon(state.tab==='favs'?'heart':'search')
      +'<div>'+(q?'لا توجد نتائج مطابقة لبحثك':(state.tab==='favs'?'لا يوجد محتوى في المفضلة بعد — اضغط القلب على أي بطاقة':'لا يوجد محتوى هنا بعد — أضف عناصر من ملف البيانات'))+'</div></div>';
    return;
  }
  items.forEach(function(it){ grid.appendChild(makeCard(it)) });
}
function makeCard(it){
  /* مراجعة T7: زر داخل زر مخالف لنموذج محتوى HTML — البطاقة div قابل للوحة المفاتيح */
  var card=d.createElement('div');
  card.setAttribute('role','button');card.tabIndex=0;
  card.setAttribute('aria-label',it.name+(it.isGroup?' — عرض الحلقات':' — تشغيل'));
  card.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click()} });
  var cur=player.current();
  var playing=cur&&(cur.id===it.id||cur.group===it.id);
  card.className='stv-card poster'+(playing?' playing':'');
  var psrc=it.poster||it.thumb||S.posterSVG(it,600,900);
  var media='<img loading="lazy" alt="'+esc(it.name)+'" src="'+esc(psrc)+'">';
  var badges='';
  if(it.kind==='channel'&&!it.soon)badges+='<span class="stv-badge live">● مباشر</span>';
  if(it.hd)badges+='<span class="stv-badge hd">HD</span>';
  if(it.demo)badges+='<span class="stv-badge demo">تجريبي</span>';
  if(it.isGroup)badges+='<span class="stv-badge ep">'+(it.total||0)+' حلقة</span>';
  else if(it.ep)badges+='<span class="stv-badge ep">'+esc(it.ep)+'</span>';
  if(it.durText&&!it.isGroup)badges+='<span class="stv-badge dur">'+esc(it.durText)+'</span>';
  if(it.soon)badges+='<span class="stv-badge demo">قريبًا</span>';
  var provLbl=S.PROVIDERS[it.type]?S.PROVIDERS[it.type].label:'';
  if(provLbl)badges+='<span class="stv-badge prov">'+esc(provLbl)+'</span>';
  card.innerHTML=
    '<span class="stv-card-media">'+media+
      '<span class="stv-card-badges">'+badges+'</span>'+
      '<button class="stv-fav'+(isFav(it.id)?' on':'')+'" aria-label="المفضلة" tabindex="0">'+icon('heart')+'</button>'+
    '</span>'+
    '<span class="stv-card-body"><b>'+esc(it.name)+'</b><small>'+esc([it.year,it.cat,it.country,(it.desc||'').slice(0,42)].filter(Boolean).join(' · '))+'</small></span>';
  card.querySelector('.stv-fav').addEventListener('click',function(e){e.stopPropagation();toggleFav(it.id);renderGrid();syncFavCount()});
  card.addEventListener('click',function(){
    if(it.isGroup){openDetail(it.id);return}
    player.play(it);
    if(w.innerWidth<1024)setTimeout(function(){var sh=$('#stvShell');if(sh)sh.scrollIntoView({behavior:'smooth',block:'start'})},120);
  });
  var im=card.querySelector('img');
  if(im)im.addEventListener('error',function(){this.onerror=null;this.src=S.posterSVG(it,600,900)});
  return card;
}
/* ─────────── متابعة المشاهدة ─────────── */
function renderContinue(){
  var sec=$('#stvContinueSec'),box=$('#stvContinue');
  if(!sec||!box)return;
  var prog=player.prog();
  var list=Object.keys(prog).map(function(id){var p=prog[id];var it=null;
    for(var i=0;i<state.items.length;i++)if(state.items[i].id===id)it=state.items[i];
    return it?{it:it,p:p}:null;}).filter(Boolean).sort(function(a,b){return b.p.at-a.p.at}).slice(0,10);
  if(!list.length){sec.style.display='none';box.classList.remove('show');return}
  sec.style.display='';box.classList.add('show');box.innerHTML='';
  list.forEach(function(o){
    var card=d.createElement('button');card.className='stv-card';
    var psrc=o.it.poster||o.it.thumb||S.posterSVG(o.it,600,340);
    card.innerHTML='<span class="stv-card-media"><img loading="lazy" alt="'+esc(o.it.name)+'" src="'+esc(psrc)+'"></span>'+
      '<span class="stv-card-body"><b>'+esc(o.it.name)+'</b><small>'+esc((o.it.ep?o.it.ep+' · ':'')+'من '+fmtT(o.p.t)+' · '+fmtAgo(o.p.at))+'</small></span>'+
      '<span class="stv-prog"><i style="width:'+Math.min(100,Math.round(o.p.t/o.p.d*100))+'%"></i></span>';
    card.addEventListener('click',function(){player.play(o.it)});
    var im=card.querySelector('img');
    if(im)im.addEventListener('error',function(){this.onerror=null;this.src=S.posterSVG(o.it,600,340)});
    box.appendChild(card);
  });
}

/* ─────────── البحث ─────────── */
var searchT=null;
function bindSearch(){
  var inp=$('#stvSearch');if(!inp)return;
  inp.addEventListener('input',function(){
    var v=this.value;clearTimeout(searchT);
    searchT=setTimeout(function(){state.query=v;state.chFilter='الكل';renderGrid()},180);
  });
  var clr=$('#stvSearchClear');
  if(clr)clr.addEventListener('click',function(){inp.value='';state.query='';renderGrid();inp.focus()});
  var btn=$('#stvSearchBtn');
  if(btn)btn.addEventListener('click',function(){
    var wrap=$('#stvSearchWrap');var on=wrap.classList.toggle('open');
    this.setAttribute('aria-expanded',on);
    if(on)setTimeout(function(){inp.focus()},120);
  });
}

/* ─────────── ورقة تفاصيل العنوان (مواسم/حلقات/مشابه) ─────────── */
var detailGid=null,detailSeason=0;
function firstWatchableEp(gid){
  var list=state.items.filter(function(i){return i.group===gid});
  var best=null;
  list.forEach(function(e){ if(player.progOf(e.id)&&(!best||player.progOf(e.id).at>player.progOf(best.id).at))best=e });
  return best||list[0];
}
function updateDetailPlayLbl(gid){
  var lbl='تشغيل';
  var best=firstWatchableEp(gid);
  if(best&&player.progOf(best.id))lbl='متابعة — '+best.ep;
  else if(best)lbl='تشغيل — '+best.ep;
  var l=$('#stvDetailPlayLbl');if(l)l.textContent=lbl;
}
function openDetail(gid){
  var g=GROUPS[gid];if(!g)return;
  detailGid=gid;detailSeason=0;
  var card={name:g.name,cat:g.cat,year:g.year,kind:g.kind||'series'};
  var hero=$('#stvDetailHero');
  if(hero){
    hero.innerHTML=g.poster?'<img alt="'+esc(g.name)+'" src="'+esc(g.poster)+'">':'<img alt="'+esc(g.name)+'" src="'+S.posterSVG(card,900,420)+'">';
    var hImg=hero.querySelector('img');
    if(hImg)hImg.addEventListener('error',function(){this.onerror=null;this.src=S.posterSVG(card,900,420)});
  }
  var dn=$('#stvDetailName');if(dn)dn.textContent=g.name;
  var chips=[];
  if(g.total)chips.push('<span class="hot">'+g.total+' حلقة</span>');
  if(g.year)chips.push('<span>'+esc(g.year)+'</span>');
  if(g.cat)chips.push('<span>'+esc(g.cat)+'</span>');
  if(g.playlist)chips.push('<span>قائمة أصلية على المنصة</span>');
  if(g.demo)chips.push('<span class="hot">تجريبي</span>');
  var dm=$('#stvDetailMeta');if(dm)dm.innerHTML=chips.join('');
  var dd=$('#stvDetailDesc');if(dd)dd.textContent=g.desc||'';
  var dsrc=$('#stvDetailSrc');if(dsrc)dsrc.innerHTML=icon('info')+'<span>'+esc(g.srcNote||'مصدر المحتوى مرفق مع كل عنصر')+'</span>';
  var dp=$('#stvDetailPlay');
  if(dp)dp.onclick=function(){ var first=firstWatchableEp(gid); closeDetail(); if(first)player.play(first) };
  updateDetailPlayLbl(gid);
  var fb=$('#stvDetailFav');
  if(fb){ fb.onclick=function(){ toggleFav(gid); fb.classList.toggle('is-fav',isFav(gid)); syncFavCount(); renderGrid() };
    fb.classList.toggle('is-fav',isFav(gid)); }
  renderDetailSeasons(gid);renderDetailEps(gid);renderDetailSimilar(gid);
  var sheet=$('#stvDetail');sheet.classList.add('open');sheet.setAttribute('aria-hidden','false');
  try{d.body.style.overflow='hidden'}catch(_){}
}
function closeDetail(){
  var dd=$('#stvDetail');if(!dd||!dd.classList.contains('open'))return;
  dd.classList.remove('open');dd.setAttribute('aria-hidden','true');
  try{d.body.style.overflow=''}catch(_){}
  detailGid=null;
}
function renderDetailSeasons(gid){
  var g=GROUPS[gid];var box=$('#stvDetailSeasons');if(!box)return;box.innerHTML='';
  if(!g||!g.seasons||g.seasons.length<2)return;
  g.seasons.forEach(function(se,si){
    var b=d.createElement('button');b.className=si===detailSeason?'on':'';
    b.textContent=se.name+' ('+(se.eps?se.eps.length:0)+')';
    b.addEventListener('click',function(){detailSeason=si;renderDetailSeasons(gid);renderDetailEps(gid)});
    box.appendChild(b);
  });
}
function renderDetailEps(gid){
  var g=GROUPS[gid];var box=$('#stvDetailEps');if(!box)return;box.innerHTML='';
  if(!g)return;
  var se=(g.seasons||[])[detailSeason]||{eps:[]};
  se.eps.forEach(function(e,i){
    var epId=gid+'-s'+(detailSeason+1)+'e'+(i+1);
    var it=null;
    for(var k=0;k<state.items.length;k++)if(state.items[k].id===epId){it=state.items[k];break}
    var b=d.createElement('button');b.className='stv-detal'+(player.current()&&player.current().id===epId?' on':'');
    var p=player.progOf(epId);
    var pct=p?Math.min(100,Math.round(p.t/p.d*100)):0;
    b.innerHTML='<span class="th">'+((e.thumb||g.poster)?'<img loading="lazy" alt="'+esc(e.title||'')+'" src="'+esc(e.thumb||g.poster)+'">':'')
      +'<span class="stv-badge dur">'+esc(e.durText||'')+'</span>'
      +(pct?'<span class="stv-prog"><i style="width:'+pct+'%"></i></span>':'')+'</span>'
      +'<span class="tx"><b>الحلقة '+(i+1)+'</b><small>'+esc(e.title||'')+'</small></span>';
    b.addEventListener('click',function(){ closeDetail(); if(it)player.play(it) });
    var im=b.querySelector('img');
    if(im)im.addEventListener('error',function(){this.onerror=null;this.src=S.posterSVG({name:g.name,cat:g.cat,kind:g.kind||'series'},640,360)});
    box.appendChild(b);
  });
}
function renderDetailSimilar(gid){
  var g=GROUPS[gid];var box=$('#stvDetailSimilar');if(!box)return;
  if(!g){box.innerHTML='';return}
  var sims=[];
  Object.keys(GROUPS).forEach(function(other){
    var og=GROUPS[other];
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
    b.innerHTML='<img loading="lazy" alt="'+esc(nm)+'" src="'+esc(po||S.posterSVG(s.g?{name:nm,cat:s.g.cat,kind:s.g.kind}:s.item,300,450))+'"><b>'+esc(nm)+'</b>';
    b.addEventListener('click',function(){ if(s.g)openDetail(s.gid); else {closeDetail();player.play(s.item)} });
    row.appendChild(b);
  });
  box.appendChild(row);
}
function bindDetail(){
  var c=$('#stvDetailClose');if(c)c.addEventListener('click',closeDetail);
  var bk=$('#stvDetailBack');if(bk)bk.addEventListener('click',closeDetail);
}

/* ─────────── نصوص الهوية والروابط من ملف البيانات ─────────── */
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

/* ─────────── البدء ─────────── */
function init(){
  S.applyTheme();S.bindThemeBtn();
  S.renderTicker(DATA.news);
  applyPageMeta();
  bindSearch();bindDetail();renderTabs();renderTabFilters();renderGrid();renderContinue();
  var start=$('#stvStartBtn');
  if(start)start.addEventListener('click',function(){
    var t=$('#stvTabs');if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
  });
  S.maybeIntro(DATA.page.introKey,function(){ player.showIdle(true) });
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})();
