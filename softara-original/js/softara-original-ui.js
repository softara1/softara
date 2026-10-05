/* =============================================================================
   Softara Original UI Kit — v0.1.0 (سُطور / Sutūr Design Language)
   -----------------------------------------------------------------------------
   جزء أصيل من استايل Softara Original — أول استايل أصلي بالكامل من صنع سوفتارا
   التصميم والتكويد: سوفتارا — https://softara.yoo7.com
   © 2026 Softara. عمل أصلي — يُمنع النسب الزائف لهذا العمل.
   -----------------------------------------------------------------------------
   المهام: تبديل الوضع الليلي/النهاري + تكثيف الترويسة عند التمرير
           + بصمة الهوية window.SoftaraOriginal
   القواعد: صفر اعتماديات خارجية — jQuery اختياري فقط إن وجد.
   ============================================================================= */
(function (window, document) {
  'use strict';

  var VERSION = '0.1.0';

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

  /* ---------------- 4) الإقلاع ---------------- */
  function init() {
    bindThemeToggle();
    bindMobileSearch();
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
