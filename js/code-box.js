function copyCodeBox(button) {
  const container = button.closest('.code-box-container');
  const textarea = container.querySelector('.code-box-textarea');
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  try {
    document.execCommand('copy');
    const originalHTML = button.innerHTML;
    button.innerHTML = '✅ تم النسخ';
    button.classList.add('copied');
    setTimeout(function() {
      button.innerHTML = originalHTML;
      button.classList.remove('copied');
    }, 2000);
  } catch (err) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textarea.value).then(function() {
        button.innerHTML = '✅ تم النسخ';
        button.classList.add('copied');
        setTimeout(function() {
          button.innerHTML = '📋 نسخ';
          button.classList.remove('copied');
        }, 2000);
      }).catch(function() {
        alert('تعذر النسخ، حاول يدوياً.');
      });
    } else {
      alert('النسخ غير مدعوم. الرجاء تحديد النص ونسخه يدوياً.');
    }
  }
}

/* =====================================================================
   [SQ-R41.3-FORUM-MOD] Universal self-healing "forum topics" box.
   Carrier: js/code-box.js (defer script, template-wide, NEVER stored in
   sessionStorage) => also heals sessions whose engine is a stale cached
   copy (r41.0/r41.1) or the original pre-patch engine.

   Root cause fixed here: the legacy widget script boots at load+200ms,
   fetches api.rss2json.com (Cloudflare 403) and its .catch() wipes the
   whole .sf-vertical-ticker box ("fetch error"). We remove its anchor
   (#sf-vt-list id) BEFORE it boots => it early-returns with ZERO network.
   The box is then owned under the private id sf-vt-list-r41 (the same id
   the r41.2+ engine uses => collaboration, never conflict), filled from
   https://softara.yoo7.com/feed/ directly, and defended forever.

   Coexistence rules (all engine generations):
   - r41.3 engine: engine sees the private list already filled at load =>
     skip-if-filled guard adopts it. Exactly ONE feed fetch per page.
   - r41.1 cached engine: it rebuilds a PUBLIC list; module blinds the id
     within milliseconds (MutationObserver) so the legacy script still
     never fires, adopts the engine list, and re-adds the public id after
     the legacy one-shot is dead (load+300ms) so the engine watchdog sees
     a healthy box and never rebuilds again.
   - original (pre-patch) engine: module is the only forum logic - fills
     and defends on its own.
   ===================================================================== */
(function () {
  'use strict';
  if (window.__sqForumMod) return;
  window.__sqForumMod = true;
  try { window.SQ_FORUM_MOD = 1; } catch (e) {}

  var FEED = 'https://softara.yoo7.com/feed/';
  var PRIVATE = 'sf-vt-list-r41';
  var MAX_FETCHES = 2;
  var fetches = 0;
  var snap = '';            /* last healthy list markup (includes x2 duplication) */
  var graceful = false;     /* budget exhausted, retry link shown */
  var legacyDead = false;   /* true after the legacy one-shot could have run */

  function getBox() { return document.querySelector('.sf-vertical-ticker'); }
  function anyListInBox() { var b = getBox(); return b ? b.querySelector('ul') : null; }
  function privateList() { return document.getElementById(PRIVATE); }

  /* legacy killer: remove its anchor id so it early-returns, zero network */
  function blind() {
    var el = document.getElementById('sf-vt-list');
    if (el) el.removeAttribute('id');
  }

  /* after the legacy one-shot is dead: give the public id back (only when
     we are NOT in the private-id world) so a cached r41.1 engine watchdog
     sees a healthy box and stops rebuilding */
  function restorePublicId() {
    if (document.getElementById('sf-vt-list')) return;
    if (privateList()) return;
    var l = anyListInBox();
    if (l) l.id = 'sf-vt-list';
  }

  /* find or (re)build the box structure under the private id */
  function ensureList() {
    var box = getBox();
    if (!box) return null;
    var l = privateList();
    if (l) return l;
    box.innerHTML = '<div class="sf-vt-title">\u0645\u0648\u0627\u0636\u064A\u0639\u0020\u0627\u0644\u0645\u0646\u062A\u062F\u0649</div>'
      + '<div class="sf-vt-body"><ul id="' + PRIVATE + '"></ul></div>';
    return document.getElementById(PRIVATE);
  }

  function capture(l) {
    l = l || privateList() || anyListInBox();
    if (l && l.children.length >= 2) { snap = l.innerHTML; graceful = false; }
  }

  function showRetry() {
    var l = privateList() || anyListInBox() || ensureList();
    if (!l || graceful) return;
    graceful = true;
    l.innerHTML = '';
    var li = document.createElement('li');
    li.style.textAlign = 'center';
    li.style.padding = '14px 10px';
    var b = document.createElement('a');
    b.href = '#';
    b.textContent = '\u062A\u0639\u0630\u0631\u0020\u062A\u062D\u0645\u064A\u0644\u0020\u0627\u0644\u0645\u0648\u0627\u0636\u064A\u0639\u0020\u2014\u0020\u0627\u0636\u063A\u0637\u0020\u0644\u0644\u0625\u0639\u0627\u062F\u0629';
    b.style.color = '#9e44c9';
    b.addEventListener('click', function (ev) {
      ev.preventDefault();
      fetches = 0; graceful = false;
      var list = ensureList();
      if (list) list.innerHTML = '';
      fill();
    });
    li.appendChild(b); l.appendChild(li);
  }

  function buildItems(doc) {
    var items = doc.querySelectorAll('item');
    if (!items.length) return null;
    var frag = document.createDocumentFragment();
    var n = 0;
    for (var i = 0; i < items.length && n < 12; i++) {
      var t = items[i].querySelector('title'), l = items[i].querySelector('link');
      if (!t || !l) continue;
      var href = (l.textContent || '').trim();
      var title = (t.textContent || '').trim();
      if (!href || !title) continue;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = href; a.textContent = title;
      a.target = '_blank'; a.rel = 'noopener';
      li.appendChild(a); frag.appendChild(li); n++;
    }
    return n ? frag : null;
  }

  function fill(target) {
    if (snap) { render(); return; }            /* snapshot: zero network */
    if (fetches >= MAX_FETCHES) { showRetry(); return; }
    target = target || ensureList();
    if (!target || target.children.length) return;
    fetches++;
    fetch(FEED, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw 0; return r.text(); })
      .then(function (txt) {
        var doc = new DOMParser().parseFromString(txt, 'text/xml');
        var frag = buildItems(doc);
        if (!frag) throw 0;
        var cur = privateList() || anyListInBox() || ensureList();
        if (!cur) return;
        cur.innerHTML = '';
        cur.appendChild(frag);
        /* duplicate the content so the CSS -50% loop stays seamless */
        cur.innerHTML += cur.innerHTML;
        capture(cur); graceful = false;
      })
      .catch(function () {
        if (!snap) showRetry();
      });
  }

  /* render from snapshot - instant, zero network */
  function render() {
    var l = privateList() || anyListInBox() || ensureList();
    if (l && snap) { l.innerHTML = snap; graceful = false; }
  }

  /* eternal defender: if ANY script wipes or empties the box, heal it */
  function defend() {
    var box = getBox();
    if (!box) return;                          /* widget not on this page */
    if (!legacyDead) blind();
    var l = privateList() || anyListInBox();
    if (l) {
      if (l.children.length === 0) {
        if (snap) { l.innerHTML = snap; graceful = false; }
        else fill(l);
      } else if (l.children.length >= 2) {
        capture(l);
      }
      /* 1 child = graceful retry link: leave it alone */
    } else if (snap) {
      render();
    } else {
      fill();
    }
  }

  function boot() {
    blind();                                   /* kill the legacy rss2json boot */
    var box = getBox();
    if (!box) return;                          /* widget not on this page */
    var l = anyListInBox();
    if (l && l.children.length >= 2) {
      capture(l);                              /* engine already filled: adopt */
    } else {
      fill(ensureList());
    }
    if (window.MutationObserver) {
      try {
        new MutationObserver(defend).observe(box, { childList: true, subtree: true });
      } catch (e) {}
    }
    setInterval(defend, 1000);                 /* belt & suspenders, forever */
    if (document.readyState === 'complete') {
      setTimeout(function () { legacyDead = true; restorePublicId(); }, 300);
    } else {
      window.addEventListener('load', function () {
        setTimeout(function () { legacyDead = true; restorePublicId(); }, 300);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
