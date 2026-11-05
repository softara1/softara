/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v2.2.0 — مكتبة الأيقونات SVG المشتركة
   يُحقن هذا الملف حزمة الرموز (sprite) في أعلى الصفحة تلقائيًا،
   بديل جذري عن الإيموجي — بلا طلبات شبكة إضافية داخل الرموز.
   ★ مشترك بين صفحتي: Softara Live TV وSoftara Movies & Media
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var SPRITE='<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">'
+'<symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z" fill="currentColor" stroke="none"/></symbol>'
+'<symbol id="i-pause" viewBox="0 0 24 24"><rect x="6" y="4" width="4.5" height="16" rx="1.5" fill="currentColor" stroke="none"/><rect x="13.5" y="4" width="4.5" height="16" rx="1.5" fill="currentColor" stroke="none"/></symbol>'
+'<symbol id="i-vol" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.6 5.4a9.4 9.4 0 0 1 0 13.2"/></symbol>'
+'<symbol id="i-mute" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m16.5 9 5 6"/><path d="m21.5 9-5 6"/></symbol>'
+'<symbol id="i-max" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/></symbol>'
+'<symbol id="i-min" viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></symbol>'
+'<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></symbol>'
+'<symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></symbol>'
+'<symbol id="i-heart" viewBox="0 0 24 24"><path d="M19 14c1.6-1.6 2.1-3.1 2.1-4.6A4.6 4.6 0 0 0 16.5 4.8c-1.8 0-3.1.9-4.5 2.6-1.4-1.7-2.7-2.6-4.5-2.6A4.6 4.6 0 0 0 2.9 9.4c0 1.5.5 3 2.1 4.6l7 7Z"/></symbol>'
+'<symbol id="i-tv" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="m17 2-5 5-5-5"/></symbol>'
+'<symbol id="i-film" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M2 9h5"/><path d="M2 15h5"/><path d="M17 9h5"/><path d="M17 15h5"/></symbol>'
+'<symbol id="i-series" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M10 7.2l4.5 2.8-4.5 2.8Z" fill="currentColor" stroke="none"/></symbol>'
+'<symbol id="i-clap" viewBox="0 0 24 24"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.4Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></symbol>'
+'<symbol id="i-zap" viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></symbol>'
+'<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></symbol>'
+'<symbol id="i-moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></symbol>'
+'<symbol id="i-chev-l" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>'
+'<symbol id="i-chev-r" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>'
+'<symbol id="i-alert" viewBox="0 0 24 24"><path d="m10.3 3.9-8.5 14.2a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></symbol>'
+'<symbol id="i-refresh" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/></symbol>'
+'<symbol id="i-list" viewBox="0 0 24 24"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></symbol>'
+'<symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>'
+'<symbol id="i-pip" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><rect x="12" y="12" width="7" height="5" rx="1" fill="currentColor" stroke="none"/></symbol>'
+'<symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></symbol>'
+'<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>'
+'<symbol id="i-ext" viewBox="0 0 24 24"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></symbol>'
+'<symbol id="i-star" viewBox="0 0 24 24"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1Z"/></symbol>'
+'<symbol id="i-cc" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M10.5 10.2a2.3 2.3 0 0 0-4 .8 2.5 2.5 0 0 0 0 2 2.3 2.3 0 0 0 4 .8"/><path d="M17.5 10.2a2.3 2.3 0 0 0-4 .8 2.5 2.5 0 0 0 0 2 2.3 2.3 0 0 0 4 .8"/></symbol>'
+'<symbol id="i-book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></symbol>'
+'<symbol id="i-kid" viewBox="0 0 24 24"><path d="M12 21a8 8 0 1 1 8-8c0 4-3.6 5-8 5"/><circle cx="9" cy="11" r=".6" fill="currentColor"/><circle cx="15" cy="11" r=".6" fill="currentColor"/><path d="M9.5 15c1.5 1 3.5 1 5 0"/><path d="M12 2V0.5"/></symbol>'
+'</svg>';
function inject(){
  var holder=document.createElement('div');
  holder.innerHTML=SPRITE;
  document.body.insertBefore(holder.firstChild,document.body.firstChild);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);
else inject();
})();
