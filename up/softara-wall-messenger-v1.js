/* ═══════════════════════════════════════════════════════════════
   softara-wall-messenger-v1 — صندوق تعليق الحائط المدمج (نمط ماسنجر)
   ─────────────────────────────────────────────────────────────
   المهمة: محرر تعليقات الحائط مدمجاً في صفحة الملف الشخصي /uN
   وصفحة الحائط /uNwall — نشر فوري AJAX بدون أي إعادة تحميل.
   ─────────────────────────────────────────────────────────────
   • كود مستقل كلياً: لا يمس الحزمة المدمجة ولا أي كود آخر
   • النشر للأعضاء المسجلين فقط — الزائر يرى دعوة لتسجيل الدخول
   • جوال أولاً + RTL + تكيّف تلقائي مع الوضع الداكن
   • النشر عبر النموذج الرسمي /postp/N (يحفظ رسمياً ويظهر بالسجل)
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.SA_WALL_V1) return;
  window.SA_WALL_V1 = 1;

  var mPath = location.pathname.match(/^\/u(\d+)(wall)?\/?$/);
  if (!mPath) return;
  var wallUid = mPath[1];

  /* ── أدوات ── */
  function qs(s, r) { return (r || document).querySelector(s); }
  function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) { var d = document.createElement('div'); d.textContent = t == null ? '' : String(t); return d.innerHTML; }

  function meLink() {
    return qs('.dropdown-menu-list a[href^="/u"], #userDropdown a[href^="/u"], .navbar a[href^="/u"], a.mainmenu[href^="/u"]');
  }
  function meId() {
    var a = meLink(); if (!a) return 0;
    var x = (a.getAttribute('href') || '').match(/\/u(\d+)/);
    return x ? +x[1] : 0;
  }
  function meName() {
    var a = meLink(); if (!a) return '';
    var t = a.getAttribute('title') || a.textContent || '';
    return t.trim().replace(/\s*\(متصل\)\s*$/, '');
  }
  function meAvatar() {
    var img = qs('#fa_toolbar img[alt="avatar"], .fa_avatar img, #userDropdown img, .dropdown-header-box img');
    return (img && img.src) ? img.src : '';
  }
  function isDark() {
    var c = getComputedStyle(document.body).backgroundColor || '';
    var m = c.match(/\d+/g);
    if (!m) return false;
    return (+m[0] * 0.299 + +m[1] * 0.587 + +m[2] * 0.114) < 120;
  }

  /* ── CSS ── */
  var CSS = ''
    + '.sa-wm-card{background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:14px;margin:14px 0;direction:rtl;text-align:right;box-shadow:0 1px 4px rgba(0,0,0,.05)}'
    + '.sa-wm-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}'
    + '.sa-wm-head i,.sa-wm-head .sa-wm-ic{color:#7c3aed;font-size:17px}'
    + '.sa-wm-title{font-weight:800;font-size:15.5px;color:#1f2937;flex:1}'
    + '.sa-wm-all{font-size:12.5px;color:#7c3aed;text-decoration:none;font-weight:700;white-space:nowrap}'
    + '.sa-wm-composer{display:flex;gap:9px;align-items:flex-start}'
    + '.sa-wm-av{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #ede9fe;flex-shrink:0;background:#f3f4f6}'
    + '.sa-wm-main{flex:1;min-width:0}'
    + '.sa-wm-ta{width:100%;box-sizing:border-box;min-height:58px;max-height:150px;resize:vertical;border:1.5px solid #d1d5db;border-radius:12px;padding:9px 11px;font:inherit;font-size:14px;line-height:1.55;background:#fafafa;color:#111827;direction:rtl;text-align:right}'
    + '.sa-wm-ta:focus{outline:none;border-color:#7c3aed;background:#fff;box-shadow:0 0 0 3px rgba(124,58,237,.12)}'
    + '.sa-wm-foot{display:flex;align-items:center;gap:8px;margin-top:7px}'
    + '.sa-wm-hint{font-size:11.5px;color:#9ca3af;flex:1}'
    + '.sa-wm-send{border:0;background:linear-gradient(135deg,#7c3aed,#8b5cf6);color:#fff;font-weight:800;font-size:13.5px;padding:8px 16px;border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-family:inherit}'
    + '.sa-wm-send:hover{filter:brightness(1.07)}'
    + '.sa-wm-send[disabled]{opacity:.55;cursor:wait}'
    + '.sa-wm-guest{font-size:13px;color:#6b7280;background:#f9fafb;border:1.5px dashed #d1d5db;border-radius:12px;padding:12px;text-align:center}'
    + '.sa-wm-guest a{color:#7c3aed;font-weight:800;text-decoration:none}'
    + '.sa-wm-list{margin-top:12px;display:flex;flex-direction:column;gap:10px}'
    + '.sa-wm-item{display:flex;gap:9px;align-items:flex-start;background:#f9fafb;border:1px solid #f3f4f6;border-radius:12px;padding:10px}'
    + '.sa-wm-item-av{width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0;background:#e5e7eb}'
    + '.sa-wm-item-body{flex:1;min-width:0}'
    + '.sa-wm-item-top{display:flex;align-items:baseline;gap:7px;flex-wrap:wrap}'
    + '.sa-wm-item-name{font-weight:800;font-size:13px;text-decoration:none}'
    + '.sa-wm-item-time{font-size:11px;color:#9ca3af}'
    + '.sa-wm-item-txt{font-size:13.5px;line-height:1.65;color:#374151;margin-top:3px;word-break:break-word;overflow-wrap:anywhere}'
    + '.sa-wm-item-txt img{max-width:100%;height:auto}'
    + '.sa-wm-empty{font-size:12.5px;color:#9ca3af;text-align:center;padding:10px 0 2px}'
    + '.sa-wm-toast{position:fixed;bottom:18px;right:50%;transform:translateX(50%) translateY(20px);background:#1f2937;color:#fff;font-size:13.5px;font-weight:700;padding:11px 20px;border-radius:999px;box-shadow:0 6px 20px rgba(0,0,0,.25);opacity:0;transition:.3s;z-index:99999;pointer-events:none;white-space:nowrap}'
    + '.sa-wm-toast.show{opacity:1;transform:translateX(50%) translateY(0)}'
    + '.sa-wm-dark{background:#1e293b;border-color:#334155}'
    + '.sa-wm-dark .sa-wm-title{color:#e2e8f0}'
    + '.sa-wm-dark .sa-wm-ta{background:#0f172a;border-color:#334155;color:#e2e8f0}'
    + '.sa-wm-dark .sa-wm-ta:focus{background:#111c31}'
    + '.sa-wm-dark .sa-wm-guest{background:#0f172a;border-color:#334155;color:#94a3b8}'
    + '.sa-wm-dark .sa-wm-item{background:#0f172a;border-color:#1e293b}'
    + '.sa-wm-dark .sa-wm-item-txt{color:#cbd5e1}'
    + '.sa-wm-dark .sa-wm-item-name{color:#e2e8f0}'
    + '.sa-wm-dark .sa-wm-empty,.sa-wm-dark .sa-wm-hint{color:#64748b}'
    + '@media (max-width:600px){.sa-wm-card{margin:10px 0;padding:12px;border-radius:12px}.sa-wm-ta{font-size:16px}.sa-wm-send{padding:9px 18px;font-size:14px}}';

  function addCss() {
    var s = document.createElement('style');
    s.id = 'sa-wm-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  var toastEl = null;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'sa-wm-toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ── النشر عبر النموذج الرسمي ── */
  function postWall(text, cb) {
    fetch('/postp/' + wallUid, { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var d = document.implementation.createHTMLDocument('');
        d.documentElement.innerHTML = html;
        var f = qs('form[action*="post_profile"]', d) || qs('form[action*="privmsg"]', d);
        if (!f) { cb(false, 'noform'); return; }
        var fd = new FormData();
        qsa('input,select', f).forEach(function (el) {
          if (!el.name || el.disabled) return;
          var ty = (el.type || '').toLowerCase();
          if (ty === 'submit' || ty === 'button' || ty === 'reset' || ty === 'image' || ty === 'file') return;
          if (ty === 'checkbox' || ty === 'radio') { if (el.checked) fd.append(el.name, el.value || 'on'); }
          else fd.append(el.name, el.value);
        });
        fd.set('subject', 'تعليق على الحائط');
        fd.set('message', text);
        fd.set('post', '1');
        var action = f.getAttribute('action') || '/privmsg?mode=post_profile';
        if (action.charAt(0) === '/') action = location.origin + action;
        fetch(action, { method: 'POST', credentials: 'same-origin', body: fd })
          .then(function (r) {
            return r.text().then(function (t) {
              var flood = /يجب أن تنتظر|بين كل مساهمة/.test(t.slice(0, 6000));
              cb(r.ok && !flood, flood ? 'flood' : '');
            });
          });
      })
      .catch(function () { cb(false, 'net'); });
  }

  /* ── استخراج تعليقات الحائط من صفحة /uNwall ── */
  function fetchWallItems(cb) {
    fetch('/u' + wallUid + 'wall', { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var d = document.implementation.createHTMLDocument('');
        d.documentElement.innerHTML = html;
        var items = qsa('.friend-block-big', d).filter(function (el) { return qs('.friend-extra', el); });
        cb(items);
      })
      .catch(function () { cb([]); });
  }

  function itemText(extra) {
    if (!extra) return '';
    var p = qs('p', extra);
    if (p) return p.innerHTML; /* نص الرسالة الفعلي فقط (بلا عنوان الموضوع) */
    return extra.innerHTML.replace(/<b>[\s\S]*?<\/b>/i, '');
  }

  function renderItems(listEl, items, max) {
    listEl.innerHTML = '';
    if (!items.length) {
      listEl.innerHTML = '<div class="sa-wm-empty">لا توجد تعليقات بعد — كن أول المعلّقين ♥</div>';
      return;
    }
    items.slice(0, max || 4).forEach(function (it) {
      var av = qs('.avatar-big img', it);
      var nameA = qs('.friend-header a[href^="/u"]', it);
      var time = qs('.friend-header div:last-child', it);
      var extra = qs('.friend-extra', it);
      var li = document.createElement('div');
      li.className = 'sa-wm-item';
      li.innerHTML = ''
        + '<img class="sa-wm-item-av" loading="lazy" alt="" src="' + (av ? av.getAttribute('src') : '') + '"/>'
        + '<div class="sa-wm-item-body">'
        + '<div class="sa-wm-item-top">'
        + (nameA ? '<a class="sa-wm-item-name" href="' + nameA.getAttribute('href') + '">' + esc(nameA.textContent.trim()) + '</a>' : '')
        + (time ? '<span class="sa-wm-item-time">' + esc(time.textContent.trim()) + '</span>' : '')
        + '</div>'
        + '<div class="sa-wm-item-txt">' + itemText(extra) + '</div>'
        + '</div>';
      listEl.appendChild(li);
    });
  }

  /* ── بناء البطاقة ── */
  function buildCard() {
    var card = document.createElement('div');
    card.id = 'sa-wm-card';
    card.className = 'sa-wm-card';
    var uid = meId();
    var guest = !uid;
    var av = meAvatar();
    card.innerHTML = ''
      + '<div class="sa-wm-head"><span class="sa-wm-ic"><i class="fas fa-pen-nib"></i></span>'
      + '<span class="sa-wm-title">حائط التعليقات</span>'
      + '<a class="sa-wm-all" href="/u' + wallUid + 'wall">عرض الكل ←</a></div>'
      + (guest
        ? '<div class="sa-wm-guest">سجّل الدخول لتكتب تعليقاً على الحائط — <a href="/login">تسجيل الدخول</a></div>'
        : '<div class="sa-wm-composer">'
          + (av ? '<img class="sa-wm-av" alt="أنا" src="' + av + '"/>' : '')
          + '<div class="sa-wm-main">'
          + '<textarea class="sa-wm-ta" maxlength="420" placeholder="اكتب تعليقاً على الحائط…"></textarea>'
          + '<div class="sa-wm-foot"><span class="sa-wm-hint"><span class="sa-wm-num">0</span>/420 حرف — Enter للنشر</span>'
          + '<button type="button" class="sa-wm-send"><i class="fas fa-paper-plane"></i> تعليق</button></div>'
          + '</div></div>')
      + '<div class="sa-wm-list" aria-live="polite"></div>';

    var ta = qs('.sa-wm-ta', card);
    var send = qs('.sa-wm-send', card);
    var num = qs('.sa-wm-num', card);
    var list = qs('.sa-wm-list', card);

    if (ta) {
      ta.addEventListener('input', function () { num.textContent = String(ta.value.length); });
      ta.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send.click(); }
      });
      send.addEventListener('click', function () {
        var txt = (ta.value || '').trim();
        if (!txt) { toast('اكتب شيئاً أولاً ♥'); ta.focus(); return; }
        if (send.disabled) return;
        send.disabled = true;
        send.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جارٍ النشر…';
        postWall(txt, function (ok, err) {
          send.disabled = false;
          send.innerHTML = '<i class="fas fa-paper-plane"></i> تعليق';
          if (ok) {
            ta.value = ''; num.textContent = '0';
            toast('نُشر تعليقك على الحائط ♥');
            /* فقاعة فورية (نمط ماسنجر) ثم تحديث صامت للقائمة */
            var li = document.createElement('div');
            li.className = 'sa-wm-item';
            li.innerHTML = (av ? '<img class="sa-wm-item-av" alt="" src="' + av + '"/>' : '')
              + '<div class="sa-wm-item-body"><div class="sa-wm-item-top">'
              + '<a class="sa-wm-item-name" href="/u' + uid + '">' + esc(meName() || 'أنا') + '</a>'
              + '<span class="sa-wm-item-time">الآن</span></div>'
              + '<div class="sa-wm-item-txt">' + esc(txt) + '</div></div>';
            list.insertBefore(li, list.firstChild);
            var empty = qs('.sa-wm-empty', list); if (empty) empty.remove();
            setTimeout(function () { fetchWallItems(function (items) { renderItems(list, items, maxItems()); }); }, 1200);
          } else {
            toast(err === 'flood' ? 'النظام مشغول — انتظر لحظة وحاول مجدداً'
              : err === 'noform' ? 'تعذّر فتح نموذج التعليق — أعد المحاولة'
              : 'تعذّر النشر — تحقق من الاتصال');
          }
        });
      });
    }

    fetchWallItems(function (items) { renderItems(list, items, maxItems()); });

    function refreshDark() {
      if (isDark()) card.classList.add('sa-wm-dark');
      else card.classList.remove('sa-wm-dark');
    }
    refreshDark();
    setTimeout(refreshDark, 1500);
    setTimeout(refreshDark, 4000);

    return card;
  }

  function maxItems() { return onWallPage() ? 8 : 4; }
  function onWallPage() { return /wall\/?$/.test(location.pathname); }

  /* ── التثبيت ── */
  function mount() {
    if (qs('#sa-wm-card')) return;
    addCss();

    if (onWallPage()) {
      /* صفحة الحائط: أزل بقايا الصناديق الخاملة القديمة ثم ركّب صندوقي قبل التعليقات */
      ['#sa-wall-box', '#sa-wall-fullwrap'].forEach(function (sel) {
        var el = qs(sel); if (el) el.remove();
      });
      var first = qs('.friend-block-big');
      var card = buildCard();
      if (first && first.parentNode) first.parentNode.insertBefore(card, first);
      else {
        var main = qs('main#profile, #profile, .panel') || document.body;
        main.insertBefore(card, main.firstChild);
      }
    } else {
      /* صفحة الملف الشخصي: بطاقة الحائط بعد صندوق التبويبات مباشرة */
      var anchor = qs('.pro-tabs-container');
      var card2 = buildCard();
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(card2, anchor.nextSibling);
      else {
        var body = qs('.pro-tabs-body');
        if (body && body.parentNode) body.parentNode.insertBefore(card2, body.nextSibling);
        else {
          var prof = qs('main#profile, #profile') || document.body;
          prof.insertBefore(card2, prof.firstChild);
        }
      }
    }
  }

  /* انتظر بناء الشريط العلوي (الهوية) ثم ركّب — مع إعادة محاولة قصيرة */
  var tries = 0;
  (function waitAndMount() {
    tries++;
    if (qs('#sa-wm-card')) return;
    if (meId() || tries > 20) { mount(); return; }
    setTimeout(waitAndMount, 300);
  })();

  /* دعم تبويبات الملف الشخصي AJAX: أعد التركيب إن أزيلت البطاقة */
  setInterval(function () {
    if (!qs('#sa-wm-card')) mount();
  }, 2500);
})();