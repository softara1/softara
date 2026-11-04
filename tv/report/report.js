/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v2.1.2 — سلوك التقرير: أزرار نسخ/تحديد الكود + تمييز القسم الحالي
   (نفس منطق النسخة المستقلة؛ تمييز الأقسام صار يُهيَّأ بعد تحميل المحتوى الخارجي)
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
/* أزرار النسخ والتحديد في صناديق الكود */
function toast(msg,ok){
  var t=document.createElement('div');
  t.textContent=msg;
  t.style.cssText='position:fixed;bottom:18px;inset-inline-start:50%;transform:translateX(50%);background:'+(ok?'#0e9f6e':'#b91c1c')+';color:#fff;padding:9px 18px;border-radius:999px;font-weight:800;font-size:13.5px;z-index:9999;box-shadow:0 6px 20px rgba(0,0,0,.25);transition:opacity .3s';
  document.body.appendChild(t);
  setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.remove()},320)},1900);
}
function codeOf(btn){
  var box=btn.closest('.codebox');
  var code=box?box.querySelector('code'):null;
  return code?code.textContent:'';
}
function flash(btn){
  var old=btn.textContent;
  btn.textContent='✓ تم';btn.classList.add('done');
  setTimeout(function(){btn.textContent=old;btn.classList.remove('done')},1600);
}
document.addEventListener('click',function(e){
  var btn=e.target.closest('.codebox .hd button');
  if(!btn)return;
  var act=btn.getAttribute('data-act');
  var txt=codeOf(btn);
  if(!txt)return;
  if(act==='copy'){
    function fallback(){
      var ta=document.createElement('textarea');
      ta.value=txt;ta.style.cssText='position:fixed;opacity:0';
      document.body.appendChild(ta);ta.select();
      try{document.execCommand('copy');toast('تم نسخ الكود',true);flash(btn)}
      catch(_){toast('تعذّر النسخ — استخدم زر التحديد',false)}
      ta.remove();
    }
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(txt).then(function(){toast('تم نسخ الكود',true);flash(btn)}).catch(fallback);
    }else fallback();
  }else if(act==='sel'){
    var code=btn.closest('.codebox').querySelector('code');
    var rng=document.createRange();rng.selectNodeContents(code);
    var sel=window.getSelection();sel.removeAllRanges();sel.addRange(rng);
    toast('حددنا الكود — انسخه بـ Ctrl+C / Cmd+C',true);
  }
});
/* تمييز القسم الحالي في شريط التنقل — تُهيَّأ بعد حقن المحتوى عبر stvReportInit() */
window.stvReportInit=function(){
  var links=[].slice.call(document.querySelectorAll('nav.toc a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
  if(!links.length)return;
  function pick(){
    var y=window.scrollY+90,cur=0;
    secs.forEach(function(s,i){if(s.offsetTop<=y)cur=i});
    links.forEach(function(a,i){a.classList.toggle('here',i===cur)});
  }
  window.addEventListener('scroll',pick,{passive:true});pick();
};
})();
