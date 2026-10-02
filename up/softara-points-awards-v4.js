/* ═══════════════════════════════════════════════════════════════
   سوفتارا — نظام الجوائز والنقاط (softara-points-awards) v4
   1) زر «الجوائز» في المواضيع + في الملف الشخصي (تحت الرتبة في العمود الرأسي)
      • ترتيب الجوائز حسب الأحدث (v4) — عكس الترتيب الأصلي الأقدم-أولاً
   2) إشعار النقاط اليومي في زر الإشعارات بالهيدر
   يعتمد على نظام الأوسمة الأصلي في أحلى منتدى (/uNawards)
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__softaraAwardsLoaded) return;
  window.__softaraAwardsLoaded = true;

  /* ---------- أدوات مساعدة ---------- */
  /* هوية سوفتارا: صورة رمزية وغلاف افتراضي (v4) */
  var DEFAULT_AVATAR = 'https://i.servimg.com/u/f32/20/62/55/94/tm/softar53.jpg';
  var DEFAULT_COVER = 'https://i.servimg.com/u/f32/20/62/55/94/softar54.jpg';
  /* ملاحظة: لا تستخدم Regex فيه شرطة عكسية — حزم أحلى منتدى تفسدها */
  function uidFromHref(href) {
    var s = String(href || '');
    var i = s.indexOf('/u');
    if (i < 0) return null;
    var j = i + 2, out = '';
    while (j < s.length) {
      var c = s.charCodeAt(j);
      if (c >= 48 && c <= 57) { out += s.charAt(j); j++; } else break;
    }
    return out || null;
  }
  function isProfilePath() {
    var p = location.pathname.split('?')[0].split('#')[0];
    if (p.length < 3 || p.charAt(0) !== '/' || p.charAt(1) !== 'u') return false;
    for (var i = 2; i < p.length; i++) {
      var c = p.charCodeAt(i);
      if (c < 48 || c > 57) return false;
    }
    return true;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  /* قراءة أوسمة عضو من صفحة /uNawards مع تخزين مؤقت بالجلسة
     v4: الترتيب حسب الأحدث — الصفحة ترتب الأقدم أولاً فنعكسها */
  var awCache = {};
  function fetchAwards(uid, cb) {
    if (awCache[uid]) return cb(awCache[uid]);
    var key = 'sa_aw2_' + uid; /* مفتاح جديد لإبطال كاش الترتيب القديم */
    try {
      var saved = sessionStorage.getItem(key);
      if (saved) { awCache[uid] = JSON.parse(saved); return cb(awCache[uid]); }
    } catch (e) {}
    fetch('/u' + uid + 'awards', { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (h) {
        var doc = new DOMParser().parseFromString(h, 'text/html');
        var out = [];
        var rows = doc.querySelectorAll('.award_row');
        for (var i = 0; i < rows.length; i++) {
          var aw = rows[i].querySelector('.award');
          var nm = rows[i].querySelector('.award_desc b');
          var ds = rows[i].querySelector('.award_desc p');
          if (aw && nm) {
            var cls = (aw.className.match(/aw-[a-z0-9-]+/) || [''])[0];
            out.push({ c: cls, n: nm.textContent.trim(), d: ds ? ds.textContent.trim() : '' });
          }
        }
        out.reverse(); /* الأحدث أولاً (v4) — يعكس قبل التخزين ليتسق الكاش والجلب */
        awCache[uid] = out;
        try { sessionStorage.setItem(key, JSON.stringify(out)); } catch (e) {}
        cb(out);
      })
      .catch(function () { cb([]); });
  }
  /* بناء مكوّن زر الجوائز */
  function buildAwardsWidget(uid, compact) {
    var wrap = document.createElement('div');
    wrap.className = 'sa-awards';
    wrap.dataset.saUid = uid;
    wrap.innerHTML = '<button type="button" class="sa-awards-btn" aria-expanded="false"><i class="fas fa-medal"></i><span class="sa-awards-lbl">الجوائز</span></button>' +
      '<div class="sa-awards-pop" role="menu"></div>';
    var btn = wrap.querySelector('.sa-awards-btn');
    var pop = wrap.querySelector('.sa-awards-pop');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = pop.classList.contains('open');
      closeAllPops();
      if (isOpen) return;
      if (!pop.dataset.loaded) {
        pop.innerHTML = '<div style="text-align:center;color:#94a3b8;font-size:12px;padding:8px 4px;"><i class="fas fa-spinner fa-spin"></i> جاري التحميل...</div>';
        fetchAwards(uid, function (list) {
          if (!list.length) {
            pop.innerHTML = '<div style="text-align:center;color:#94a3b8;font-size:12px;padding:10px 4px;">لا توجد جوائز بعد — شارك واكسب أوسمتك <i class="fas fa-medal"></i></div>';
          } else {
            var html = '';
            for (var i = 0; i < list.length; i++) {
              var it = list[i];
              html += '<div class="sa-awards-row">' +
                '<div class="award ' + esc(it.c) + '"></div>' +
                '<div><div class="sa-aw-name">' + esc(it.n) + '</div>' +
                (it.d ? '<div class="sa-aw-desc">' + esc(it.d) + '</div>' : '') + '</div></div>';
            }
            pop.innerHTML = html;
          }
          pop.dataset.loaded = '1';
        });
      }
      pop.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    });
    return wrap;
  }
  function closeAllPops() {
    var ops = document.querySelectorAll('.sa-awards-pop.open');
    for (var i = 0; i < ops.length; i++) {
      ops[i].classList.remove('open');
      var b = ops[i].parentElement.querySelector('.sa-awards-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.sa-awards')) closeAllPops();
  });

  /* ---------- 1) المواضيع: زر الجوائز تحت اسم الكاتب ---------- */
  /* ملاحظة: للزوار اسم الكاتب بلا رابط — نستخرج الهوية من بحث قائمة الأعضاء */
  function resolveUid(authorBlock, cb) {
    var link = authorBlock.querySelector('a[href*="/u"]');
    if (link) { var u = uidFromHref(link.getAttribute('href')); if (u) return cb(u); }
    var nameEl = authorBlock.querySelector('.flx-username');
    var name = nameEl ? nameEl.textContent.trim() : '';
    if (!name || name.length > 40) return cb(null);
    var key = 'sa_uid_' + name;
    try {
      var saved = localStorage.getItem(key);
      if (saved && saved.length <= 6) return cb(saved);
    } catch (e) {}
    fetch('/memberlist?username=' + encodeURIComponent(name), { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (h) {
        var uid = null;
        var i = h.indexOf('href="/u');
        while (i > -1 && uid === null) {
          var seg = h.slice(i + 8, i + 20), num = '';
          for (var k = 0; k < seg.length; k++) {
            var ch = seg.charAt(k);
            if (ch >= '0' && ch <= '9') num += ch;
            else break;
          }
          if (num) uid = num;
          i = h.indexOf('href="/u', i + 1);
        }
        if (uid) { try { localStorage.setItem(key, uid); } catch (e) {} }
        cb(uid);
      })
      .catch(function () { cb(null); });
  }
  function injectTopics() {
    /* يغطي: منطقة الكاتب الأفقية (المشاركة الأولى) + العمود الرأسي (الردود)
       — وقسم المكتبة الرقمية f32 لأن أول مشاركاته بنمط الردود */
    var authors = document.querySelectorAll('.flx-author-info, .flx-reply-topic .flx-sidebar');
    for (var i = 0; i < authors.length; i++) {
      if (authors[i].querySelector('.sa-awards')) continue;
      /* تجاهل مساهمات الإعلانات — بلا كاتب حقيقي */
      var nmEl0 = authors[i].querySelector('.flx-username');
      var nm0 = nmEl0 ? nmEl0.textContent.trim() : '';
      if (!nm0 || nm0 == 'محتوى إعلاني') continue;
      var author = authors[i];
      resolveUid(author, (function (holder0) {
        return function (uid) {
          if (!uid || document.body.contains(holder0) === false) return;
          if (holder0.querySelector('.sa-awards')) return;
          var w = buildAwardsWidget(uid, true);
          if (holder0.classList && holder0.classList.contains('flx-author-info')) {
            /* الأفقية: داخل كتلة الاسم كما هي معتمدة */
            var holder = holder0.children[1] || holder0;
            if (!holder.querySelector('.flx-username')) holder = holder0;
            holder.appendChild(w);
          } else {
            /* الرأسية (v3): تحت الرتبة مباشرة — الرتبة هي العنصر التالي للاسم في العمود */
            var un = holder0.querySelector('.flx-username');
            var rk = un ? un.nextElementSibling : null;
            if (rk && rk.classList && rk.classList.contains('flx-stats-container')) rk = null;
            if (rk && rk.parentElement) {
              if (rk.insertAdjacentElement) rk.insertAdjacentElement('afterend', w);
              else rk.parentElement.insertBefore(w, rk.nextSibling);
            } else {
              /* احتياطي: قبل صندوق الإحصائيات أو أسفل الاسم */
              var st = holder0.querySelector('.flx-stats-container');
              if (st && st.parentElement) st.parentElement.insertBefore(w, st);
              else if (un && un.parentElement) un.parentElement.insertBefore(w, un.nextSibling);
              else holder0.appendChild(w);
            }
          }
          fetchAwards(uid, function (wrap2) {
            return function (list) {
              var lbl = wrap2.querySelector('.sa-awards-lbl');
              if (lbl && list.length) lbl.textContent = 'الجوائز (' + list.length + ')';
            };
          }(w));
        };
      })(author));
    }
  }

  /* ---------- 2) الملف الشخصي: صف جوائز مصغّر ---------- */
  function injectProfile() {
    if (!isProfilePath() || document.querySelector('.pro-user-info .sa-awards')) return;
    var uid = uidFromHref(location.pathname);
    var box = document.querySelector('.pro-user-info');
    if (!uid || !box) return;
    var w = buildAwardsWidget(uid, false);
    box.appendChild(w);
    fetchAwards(uid, function (list) {
      var lbl = w.querySelector('.sa-awards-lbl');
      if (lbl && list.length) lbl.textContent = 'الجوائز (' + list.length + ')';
    });
  }

  /* ---------- 3) إشعار النقاط اليومي ---------- */
  function localDate() {
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function readPoints(cb) {
    if (typeof _userdata === 'undefined' || !_userdata.user_id) return cb(null);
    fetch('/u' + _userdata.user_id, { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (h) {
        var doc = new DOMParser().parseFromString(h, 'text/html');
        var dts = doc.querySelectorAll('dt.pf-label, dt');
        for (var i = 0; i < dts.length; i++) {
          if (dts[i].textContent.indexOf('نقاط') > -1) {
            var dd = dts[i].nextElementSibling;
            if (dd) {
              var tx = dd.textContent, num = '';
              for (var k = 0; k < tx.length; k++) {
                var ch = tx.charAt(k);
                if (ch >= '0' && ch <= '9') num += ch;
              }
              if (num) return cb(parseInt(num, 10));
            }
          }
        }
        cb(null);
      })
      .catch(function () { cb(null); });
  }
  function bumpBadge() {
    var b = document.getElementById('customNotifBadge');
    if (!b) return;
    var cur = parseInt(b.textContent, 10) || 0;
    b.textContent = cur + 1;
    b.style.display = '';
  }
  var dailyInjected = false;
  function injectDailyLi(points) {
    var list = document.getElementById('customNotifList');
    if (!list || dailyInjected) return;
    var ul = list.querySelector('ul');
    var li = document.createElement('li');
    li.className = 'sa-daily-notif unread-notif';
    li.style.cssText = 'display:flex;flex-direction:column;align-items:flex-start;gap:4px;padding:10px 12px;border-bottom:1px solid rgba(148,163,184,.15);';
    var pts = points ? 'رصيدك الآن <b>' + points.toLocaleString('ar-EG') + '</b> نقطة' : 'تواجدك اليوم زاد رصيدك';
    li.innerHTML = '<div style="display:flex;gap:10px;align-items:flex-start;width:100%;">' +
      '<i class="fas fa-gift sa-daily-gift"></i>' +
      '<a href="/u' + (typeof _userdata !== 'undefined' ? _userdata.user_id : '') + '" style="color:inherit;text-decoration:none;line-height:1.6;flex:1;">' +
      '<b>ربحت 10 نقاط</b> مقابل تواجدك اليوم في سوفتارا — ' + pts + '</a>' +
      '<span title="غير مقروء" style="width:8px;height:8px;border-radius:50%;background:#ef4444;margin-top:7px;flex-shrink:0;"></span></div>' +
      '<div class="notif-time"><i class="far fa-clock"></i> الآن</div>';
    if (!ul) {
      list.innerHTML = '';
      ul = document.createElement('ul');
      ul.style.cssText = 'list-style:none;margin:0;padding:0;';
      list.appendChild(ul);
    }
    ul.insertBefore(li, ul.firstChild);
    dailyInjected = true;
    bumpBadge();
  }
  function setupDaily() {
    if (typeof _userdata === 'undefined' || !_userdata.session_logged_in) return;
    var uid = _userdata.user_id;
    var key = 'sa_daily_' + uid;
    var today = localDate();
    var stored = null;
    try { stored = localStorage.getItem(key); } catch (e) {}
    if (stored === today) return;
    var flag = 'sa_daily_shown_' + uid + '_' + today;
    try { if (sessionStorage.getItem(flag)) { dailyInjected = true; return; } } catch (e) {}
    readPoints(function (pts) {
      if (pts !== null) { try { localStorage.setItem(key, today); } catch (e) {} }
      try { sessionStorage.setItem(flag, '1'); } catch (e) {}
      if (pts !== null) injectDailyLi(pts);
    });
    /* بعد أي إعادة رسم لقائمة الإشعارات أعِد لصق إشعار اليوم */
    var list = document.getElementById('customNotifList');
    if (list && 'MutationObserver' in window) {
      new MutationObserver(function () {
        if (dailyInjected && !document.querySelector('#customNotifList .sa-daily-notif')) {
          dailyInjected = false;
          readPoints(function (pts) { if (pts !== null) injectDailyLi(pts); });
        }
      }).observe(list, { childList: true, subtree: false });
    }
  }

  /* ---------- 4) هوية موحّدة (v4) ---------- */
  /* استبدال الصورة الرمزية الافتراضية الفارغة بصورة سوفتارا — فقط لمن ليس بصورة مخصصة
     (روابط pp-blank-thumb خاصة بمنصة أحلى منتدى ولا تُستخدم لصور الأعضاء المخصصة إطلاقاً) */
  function isBlankAvatar(src) {
    return !src || src.indexOf('pp-blank-thumb') > -1;
  }
  function fixDefaultAvatars() {
    var imgs = document.querySelectorAll('img[src*="pp-blank-thumb"], img#customUserAvatar, img#customUserAvatarLarge');
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      var src = im.getAttribute('src') || '';
      if (isBlankAvatar(src)) {
        im.src = DEFAULT_AVATAR;
        im.style.objectFit = 'cover';
      }
    }
  }
  /* رابط معرض الصور في قائمة المستخدم المنسدلة — تحت «مواضيعي ومشاركاتي» */
  function ensureGalleryLink() {
    var list = document.querySelector('#userDropdown .dropdown-menu-list');
    if (!list || list.querySelector('a[href="/gallery/"], a[href*="/gallery"]')) return;
    var li = document.createElement('li');
    li.innerHTML = '<a href="/gallery/"><span>معرض الصور</span> <i class="fas fa-images"></i></a>';
    var anchor = null;
    var as = list.querySelectorAll('a');
    for (var i = 0; i < as.length; i++) {
      if ((as[i].getAttribute('href') || '').indexOf('search_id=egosearch') > -1) { anchor = as[i]; break; }
    }
    if (anchor && anchor.parentElement && anchor.parentElement.parentElement === list) {
      anchor.parentElement.insertAdjacentElement('afterend', li);
    } else {
      list.appendChild(li);
    }
  }
  /* غلاف افتراضي للبطاقات بلا صورة في قوائم المواضيع */
  function fixNoImageCovers() {
    var th = document.querySelectorAll('.topic-thumbnail[data-loaded="no-image"]');
    for (var i = 0; i < th.length; i++) {
      if (th[i].dataset.saCover) continue;
      th[i].dataset.saCover = '1';
      th[i].style.backgroundImage = 'url(' + DEFAULT_COVER + ')';
      th[i].style.backgroundSize = 'cover';
      th[i].style.backgroundPosition = 'center';
      var ic = th[i].querySelector('i');
      if (ic) ic.style.display = 'none';
    }
  }
  var sweepTimer = null;
  function sweep() {
    fixDefaultAvatars();
    ensureGalleryLink();
    fixNoImageCovers();
  }
  function scheduleSweep() {
    if (sweepTimer) return;
    sweepTimer = setTimeout(function () { sweepTimer = null; sweep(); }, 250);
  }

  /* ---------- تشغيل ---------- */
  function boot() {
    injectTopics();
    injectProfile();
    setupDaily();
    sweep();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', function () { setTimeout(boot, 400); });
  /* أي إعادة رسم (قائمة المستخدم، بطاقات تُحمّل لاحقاً…) تعيد الفحص تلقائياً */
  if ('MutationObserver' in window) {
    new MutationObserver(scheduleSweep).observe(document.documentElement, { childList: true, subtree: true });
  }
})();