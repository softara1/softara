/* -----------------------------------------------------------------------------
   Softara Original UI Kit — v0.3.1 (سُطور / Sutūr Design Language)
   -----------------------------------------------------------------------------
   جزء أصيل من استايل Softara Original — أول استايل أصلي بالكامل من صنع سوفتارا
   التصميم والتكويد: سوفتارا — https://softara.yoo7.com
   © 2026 Softara. عمل أصلي — يُمنع النسب الزائف لهذا العمل.
   -----------------------------------------------------------------------------
   المهام: تبديل الوضع + تكثيف الترويسة + متحف الكود (رأس لغة + نسخ + شارة)
           + خط المحرر داخل iframe + حارس تلوين دائم + معالج أزرار الأيقونات
           + بصمة الهوية window.SoftaraOriginal
   القواعد: صفر اعتماديات خارجية — jQuery اختياري فقط إن وجد.
   ============================================================================= */
(function (window, document) {
  'use strict';

  var VERSION = '0.3.1';

  /* بصمة الهوية — الحقوق جزء من الكود نفسه */
  window.SoftaraOriginal = {
    name: 'Softara Original',
    lang: 'Sutūr Design Language (سُطور)',
    version: VERSION,
    author: 'Softara — سوفتارا',
    home: 'https://softara.yoo7.com',
    license: '© 2026 Softara. عمل أصلي — تقليد النسب مخالف لروح المجتمع.',
    built: '2026-10-05'
  };

  /* ---------------- 1) الوضع الليلي/النهاري ---------------- */
  var THEME_KEY = 'so-theme';
  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute('data-so-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, animate) {
    if (animate) {
      root.classList.add('so-theme-anim');
      window.setTimeout(function () { root.classList.remove('so-theme-anim'); }, 400);
    }
    root.setAttribute('data-so-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* خصوصية التصفح */ }
    updateToggleIcon();
    /* إشعار الأنماط الحية (iframe المحرر) بإعادة التلوين */
    try { document.dispatchEvent(new CustomEvent('so-themechange', { detail: { theme: theme } })); } catch (e) { }
  }

  function updateToggleIcon() {
    var btn = document.getElementById('so-theme-toggle');
    if (!btn) { return; }
    var isDark = currentTheme() === 'dark';
    var icon = btn.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    }
    btn.setAttribute('aria-label', isDark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي');
  }

  function bindThemeToggle() {
    var btn = document.getElementById('so-theme-toggle');
    if (!btn || btn.getAttribute('data-so-bound') === '1') { return; }
    btn.setAttribute('data-so-bound', '1');
    btn.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
    updateToggleIcon();
  }

  /* ---------------- 2) تكثيف الترويسة عند التمرير ---------------- */
  var lastCondensed = false;

  function onScroll() {
    var condensed = (window.scrollY || document.documentElement.scrollTop || 0) > 120;
    if (condensed === lastCondensed) { return; }
    lastCondensed = condensed;
    var header = document.querySelector('header');
    if (header) {
      header.classList.toggle('so-condensed', condensed);
    }
  }

  /* ---------------- 3) البحث على الجوال (توسيع الحقل) ---------------- */
  function bindMobileSearch() {
    var form = document.getElementById('search-main');
    if (!form || form.getAttribute('data-so-bound') === '1') { return; }
    form.setAttribute('data-so-bound', '1');
    var input = form.querySelector('input[type=text]');
    if (input) {
      input.addEventListener('focus', function () { form.classList.add('open'); });
      input.addEventListener('blur', function () {
        if (!input.value) { form.classList.remove('open'); }
      });
    }
  }

  /* ---------------- 4) متحف الكود — رأس اللغة + النسخ + شارة سوفتارا ---------------- */
  function enhanceCodebox(codebox) {
    if (codebox.getAttribute('data-so-museum') === '1') { return; }
    var bar = codebox.querySelector(':scope > p');
    var code = codebox.querySelector(':scope > code') || codebox.querySelector('code, pre');
    if (!bar || !code) { return; }
    codebox.setAttribute('data-so-museum', '1');

    var lang = '';
    var m = (code.className || '').match(/(?:language|lang)-([\w-]+)/);
    if (m) { lang = m[1]; }
    else {
      /* AwesomeBB: highlight.js يضيف اللغة كصنف مجرد بجانب hljs */
      var cls = (code.className || '').split(/\s+/).filter(function (c) {
        return c && c !== 'hljs';
      });
      if (cls.length) { lang = cls[0]; }
    }

    var meta = document.createElement('span');
    meta.className = 'so-code-meta';
    meta.style.display = 'inline-flex';
    meta.style.alignItems = 'center';
    meta.style.gap = '10px';
    meta.style.minWidth = '0';

    var langEl = document.createElement('span');
    langEl.textContent = lang ? lang : 'code';
    langEl.setAttribute('dir', 'ltr');

    var badge = document.createElement('span');
    badge.className = 'so-code-badge';
    badge.textContent = 'Softara Code';
    badge.title = 'جزء أصيل من استايل Softara Original — © 2026 Softara';

    meta.appendChild(langEl);
    meta.appendChild(badge);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'so-code-copy';
    btn.setAttribute('aria-label', 'نسخ الكود');
    btn.innerHTML = '<i class="material-symbols-outlined" aria-hidden="true">content_copy</i><span>نسخ</span>';

    btn.addEventListener('click', function () {
      var txt = code.textContent || '';
      var done = function () {
        btn.classList.add('so-copied');
        btn.innerHTML = '<i class="material-symbols-outlined" aria-hidden="true">check</i><span>تم النسخ</span>';
        window.setTimeout(function () {
          btn.classList.remove('so-copied');
          btn.innerHTML = '<i class="material-symbols-outlined" aria-hidden="true">content_copy</i><span>نسخ</span>';
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(txt, done); });
      } else {
        fallbackCopy(txt, done);
      }
    });

    bar.textContent = '';
    bar.appendChild(meta);
    bar.appendChild(btn);

    /* highlight.js يُطبق أصناف اللغة بعد جاهزية jQuery — نلتقطها لاحقًا */
    if (!lang) {
      var tries = 0;
      var langTimer = window.setInterval(function () {
        var c2 = codebox.querySelector('code, pre');
        var L = '';
        if (c2) {
          var m2 = (c2.className || '').match(/(?:language|lang)-([\w-]+)/);
          if (m2) { L = m2[1]; }
          else {
            var cs2 = (c2.className || '').split(/\s+/).filter(function (x) { return x && x !== 'hljs'; });
            if (cs2.length) { L = cs2[0]; }
          }
        }
        if (L) { langEl.textContent = L; window.clearInterval(langTimer); }
        else if (++tries >= 8) { window.clearInterval(langTimer); }
      }, 500);
    }
  }

  function fallbackCopy(txt, done) {
    try {
      var ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) { /* بيئة بلا نسخ */ }
  }

  function initMuseum() {
    var boxes = document.querySelectorAll('div.codebox, dl.codebox');
    for (var i = 0; i < boxes.length; i++) { enhanceCodebox(boxes[i]); }
  }

  /* ---------------- 5) خط المحرر داخل iframe (وضعا سُطور) ---------------- */
  function paintEditorFrame(iframe) {
    var doc = null;
    try { doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document); } catch (e) { doc = null; }
    if (!doc || !doc.body) { return false; }
    var dark = root.getAttribute('data-so-theme') === 'dark';
    var s = doc.getElementById('so-editor-style');
    if (!s) {
      s = doc.createElement('style');
      s.id = 'so-editor-style';
      doc.head.appendChild(s);
    }
    s.textContent = 'html{background:' + (dark ? '#1a1824' : '#ffffff') + ';}body{font-family:"IBM Plex Sans Arabic","Alexandria",sans-serif;font-size:14.5px;line-height:1.8;' +
      'color:' + (dark ? '#eceaf4' : '#171522') + ';background:' + (dark ? '#1a1824' : '#ffffff') + ';padding:12px 14px;margin:0;' +
      'overflow-wrap:break-word;} a{color:' + (dark ? '#a08bff' : '#6c4cf1') + ';} pre,code{font-family:"JetBrains Mono",monospace;' +
      'background:rgba(160,139,255,.08);border-radius:6px;padding:2px 6px;} blockquote{border-inline-start:3px solid #6c4cf1;' +
      'margin:8px 0;padding:6px 14px;background:rgba(160,139,255,.08);}' +
      'img{max-width:100%;height:auto;}';
    doc.body.style.color = dark ? '#eceaf4' : '#171522';
    doc.body.style.background = dark ? '#1a1824' : '#ffffff';
    try { doc.documentElement.style.background = dark ? '#1a1824' : '#ffffff'; } catch (e) { }
    return true;
  }

  function paintEditorFrames() {
    var frames = document.querySelectorAll('.sceditor-container iframe');
    for (var i = 0; i < frames.length; i++) {
      (function (fr) {
        paintEditorFrame(fr);
        fr.removeEventListener('load', fr.__soPaint || function () { });
        fr.__soPaint = function () { paintEditorFrame(fr); };
        fr.addEventListener('load', fr.__soPaint);
      })(frames[i]);
    }
  }

  function watchEditorFrames() {
    var scans = 0;
    var timer = window.setInterval(function () {
      paintEditorFrames();
      healIconButtons();
      if (++scans >= 12) {
        window.clearInterval(timer);
        /* حارس دائم خفيف: يلتقط أي إعادة بناء للمحرر أو أيقونة منكسرة جديدة */
        window.setInterval(function () {
          guardEditorFrames();
          healIconButtons();
        }, 3000);
      }
    }, 1000);
    document.addEventListener('so-themechange', paintEditorFrames);
    /* مراقب سمات الجذر: أي تغيير للوضع من أي مصدر يعيد تلوين المحرر فورًا */
    try {
      var mo = new MutationObserver(function () { paintEditorFrames(); });
      mo.observe(root, { attributes: true, attributeFilter: ['data-so-theme'] });
    } catch (e) { /* متصفح بلا MutationObserver — الحارس الدائم يكفي */ }
  }

  /* الحارس: يعيد التلوين فقط عند انحراف لون جسم iframe عن المتوقع */
  function guardEditorFrames() {
    var dark = root.getAttribute('data-so-theme') === 'dark';
    var expected = dark ? 'rgb(26, 24, 36)' : 'rgb(255, 255, 255)';
    var frames = document.querySelectorAll('.sceditor-container iframe');
    for (var i = 0; i < frames.length; i++) {
      var doc = null;
      try { doc = frames[i].contentDocument; } catch (e) { doc = null; }
      if (doc && doc.body) {
        var bg = '';
        try { bg = getComputedStyle(doc.body).backgroundColor; } catch (e) { bg = ''; }
        if (bg !== expected) { paintEditorFrame(frames[i]); }
      }
    }
  }

  /* ---------------- 5ب) معالج أزرار القيم الأيقونية ----------------
     المنصة تستخدم قيمة الزر كاسم أيقونة (send/save/…) ويكسر خطنا العام
     ربطها — نعيد خط Material Symbols لأي زر قيمته اسم أيقونة معروف */
  var SO_ICON_NAMES = {
    send: 1, save: 1, search: 1, visibility: 1, visibility_off: 1, delete: 1,
    edit: 1, lock: 1, reply: 1, check: 1, close: 1, done: 1, cancel: 1,
    add: 1, remove: 1, star: 1, share: 1, notifications: 1, create: 1,
    mode_edit: 1, arrow_forward: 1, arrow_back: 1, arrow_upward: 1,
    delete_forever: 1, content_copy: 1, chat: 1, forum: 1, help: 1,
    info: 1, warning: 1, favorite: 1, thumb_up: 1, print: 1,
    attach_file: 1, insert_link: 1, undo: 1, redo: 1
  };

  function healIconButtons() {
    var btns = document.querySelectorAll('input[type=submit], input[type=button], button');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      if (b.getAttribute('data-so-icon') === '1' || b.children.length) { continue; }
      var v = (b.value || '').trim();
      if (v && SO_ICON_NAMES[v]) {
        b.setAttribute('data-so-icon', '1');
        b.style.fontFamily = "'Material Symbols Outlined', sans-serif";
        b.style.fontSize = '20px';
        b.style.fontWeight = 'normal';
        b.style.lineHeight = '1';
        b.style.direction = 'ltr';
      }
    }
  }

  /* ---------------- 6) الإقلاع ---------------- */
  function init() {
    bindThemeToggle();
    bindMobileSearch();
    initMuseum();
    healIconButtons();
    watchEditorFrames();
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
