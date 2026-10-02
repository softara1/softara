/* ═══════════════════════════════════════════════════════════════
   سوفتارا — خانة الأوسمة الشرفية (softara-honors) v1
   تظهر بعد الرتبة وقبل زر الجوائز في المواضيع والملف الشخصي
   الإسناد يدوي من الإدارة — عدّل قائمة HONORS أدناه فقط
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__softaraHonorsLoaded) return;
  window.__softaraHonorsLoaded = true;

  /* ═════ الإسناد اليدوي ═════
     الأوسمة المتاحة: نجم الشهر | نجم المنتدى | عضو موثوق | وسام التميز
     الاسم يجب أن يطابق اسم العضو في المنتدى حرفياً */
  var HONORS = {
    'دمعه السعودية': ['نجم المنتدى'],
    'msrooor': ['نجم الشهر'],
    'maly-mzaj': ['عضو موثوق'],
    'عوض السوداني': ['عضو موثوق']
  };

  var BADGES = {
    'نجم الشهر':   { icon: 'fa-star',         cls: 'sa-hn-star'   },
    'نجم المنتدى': { icon: 'fa-certificate',  cls: 'sa-hn-legend' },
    'عضو موثوق':   { icon: 'fa-check-circle', cls: 'sa-hn-trust'  },
    'وسام التميز': { icon: 'fa-award',        cls: 'sa-hn-award'  }
  };

  var CSS = '.sa-honors{display:flex;flex-wrap:wrap;gap:4px;margin:5px 0 3px}' +
    '.sa-hn{display:inline-flex;align-items:center;gap:4px;padding:2px 9px;border-radius:14px;font:700 11.5px cairo,sans-serif;white-space:nowrap;line-height:1.7}' +
    '.sa-hn i{font-size:11px}' +
    '.sa-hn-star{color:#78350f;background:linear-gradient(135deg,#fde68a,#f59e0b);border:1px solid #d97706}' +
    '.sa-hn-legend{color:#fff;background:linear-gradient(135deg,#7c3aed,#db2777);border:1px solid #a21caf}' +
    '.sa-hn-trust{color:#0c4a6e;background:linear-gradient(135deg,#bae6fd,#38bdf8);border:1px solid #0284c7}' +
    '.sa-hn-award{color:#064e3b;background:linear-gradient(135deg,#a7f3d0,#34d399);border:1px solid #059669}' +
    /* ═══ شارات الرتب (sr-*) — نفس الأصناف المضمنة في عناوين الرتب ═══ */
    '.sr-rank{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font:700 13px cairo,sans-serif;white-space:nowrap;line-height:1.7;vertical-align:middle}' +
    '.sr-rank i{font-size:12px}' +
    '.sr-badr{border:1px solid #64748B;color:#475569;background:rgba(100,116,139,.08)}' +
    '.sr-sharik{border:1px solid #16A34A;color:#15803D;background:rgba(22,163,74,.08)}' +
    '.sr-fael{border:1px solid #EA580C;color:#C2410C;background:rgba(234,88,12,.08)}' +
    '.sr-mumayiz{border:1px solid #7C3AED;color:#6D28D9;background:rgba(124,58,237,.08)}' +
    '.sr-brins{border:1px solid #D4AF37;color:#92700C;background:linear-gradient(135deg,#FDF6D8,#F5D66B)}' +
    '.sr-ostora{border:1px solid transparent;color:#fff;background:linear-gradient(90deg,#DC2626,#7C3AED)}' +
    '.sr-aliya{border:1px solid #0F172A;color:#fff;background:linear-gradient(135deg,#0F172A,#1E293B)}' +
    '.sr-musharif{border:1px solid #0284C7;color:#fff;background:linear-gradient(135deg,#0284C7,#0369A1)}' +
    '.sr-muraqib{border:1px solid #7C3AED;color:#fff;background:linear-gradient(135deg,#7C3AED,#6D28D9)}' +
    '.sr-nukhba{border:1px solid #D4AF37;color:#fff;background:linear-gradient(135deg,#D4AF37,#B8860B)}';

  function injectCSS() {
    if (document.getElementById('softara-honors-css')) return;
    var st = document.createElement('style');
    st.id = 'softara-honors-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function buildHonors(name) {
    var list = HONORS[name];
    if (!list || !list.length) return null;
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var b = BADGES[list[i]];
      if (!b) continue;
      html += '<span class="sa-hn ' + b.cls + '"><i class="fa ' + b.icon + '"></i>' + esc(list[i]) + '</span>';
    }
    if (!html) return null;
    var div = document.createElement('div');
    div.className = 'sa-honors';
    div.innerHTML = html;
    return div;
  }

  /* الترتيب النهائي المضمون: الاسم ← الرتبة ← الأوسمة الشرفية ← زر الجوائز */
  function fixOrder(holder) {
    var hn = holder.querySelector('.sa-honors');
    var aw = holder.querySelector('.sa-awards');
    if (hn && aw && aw.parentElement === hn.parentElement && aw.previousElementSibling !== hn) {
      aw.parentElement.insertBefore(hn, aw);
    }
  }

  function injectAreas() {
    var areas = document.querySelectorAll('.flx-author-info, .flx-reply-topic .flx-sidebar, .pro-user-info');
    for (var i = 0; i < areas.length; i++) {
      var holder = areas[i];
      if (holder.querySelector('.sa-honors')) { fixOrder(holder); continue; }
      /* تجاهل مساهمات الإعلانات */
      var nmEl = holder.querySelector('.flx-username, .profile-username');
      var name = nmEl ? nmEl.textContent.trim() : '';
      if (!name || name === 'محتوى إعلاني' || name.length > 40) continue;
      var hn = buildHonors(name);
      if (!hn) continue;
      if (holder.classList.contains('pro-user-info')) {
        /* الملف الشخصي: بعد الرتبة مباشرة */
        var prk = holder.querySelector('.profile-rank');
        var awp = holder.querySelector('.sa-awards');
        if (prk && prk.parentElement === holder) prk.insertAdjacentElement('afterend', hn);
        else if (awp && awp.parentElement === holder) holder.insertBefore(hn, awp);
        else holder.appendChild(hn);
      } else {
        /* المواضيع: بعد عنصر الرتبة (التالي للاسم) وقبل الجوائز */
        var un = holder.querySelector('.flx-username');
        var rk = un ? un.nextElementSibling : null;
        if (rk && rk.classList && rk.classList.contains('flx-stats-container')) rk = null;
        if (rk && rk.parentElement) rk.insertAdjacentElement('afterend', hn);
        else if (un && un.parentElement) un.insertAdjacentElement('afterend', hn);
        else holder.appendChild(hn);
      }
      fixOrder(holder);
    }
  }

  function boot() {
    injectCSS();
    injectAreas();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', function () { setTimeout(boot, 500); });
  /* أي إعادة رسم تعيد الفحص — مثل نظام الجوائز */
  if ('MutationObserver' in window) {
    var t = null;
    new MutationObserver(function () {
      if (t) return;
      t = setTimeout(function () { t = null; injectAreas(); }, 300);
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();