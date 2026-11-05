/* ════════════════════════════════════════════════════════════════
   سوفتارا Media v3.0.0 — منطق الواجهة
   مكتبات عربية وعالمية · مجموعات (مسلسلات/قنوات) بحلقات حقيقية ·
   بحث فوري · مفضلة · متابعة مشاهدة · تحديث تلقائي لمكتبات القنوات ·
   ورقة تفاصيل بالحلقات والقوائم الكاملة · مشغل مثبّت أثناء التصفح
   ★ يعتمد على: softara-movies-player.js ثم هذا الملف (+ ملفا البيانات)
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var DATA = window.STM_DATA, CHN = window.STM_CHANNELS, P = window.STMPlayer;
  var d = document, w = window;

  if (!DATA || !P) {
    d.addEventListener('DOMContentLoaded', function () {
      var g = d.getElementById('stmGrid');
      if (g) g.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:44px 16px;color:#f87171;font-weight:800;line-height:2">تعذّر تحميل بيانات منصة سوفتارا من الشبكة.<br>تحقق من الاتصال ثم أعد تحميل الصفحة.</div>';
    });
    return;
  }

  /* ─────────── أدوات ─────────── */
  function $(s, r) { return (r || d).querySelector(s); }
  function $id(x) { return d.getElementById(x); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(tag, cls, html) {
    var n = d.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function store(k, v) { try { if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null } localStorage.setItem(k, JSON.stringify(v)) } catch (_) { return null } }
  function toast(msg, ok) {
    var box = $id('stmToasts'); if (!box) return;
    var t = el('div', 'stm-toast' + (ok ? ' ok' : ''), esc(msg));
    box.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; t.style.transition = 'opacity .4s'; }, 2400);
    setTimeout(function () { t.remove(); }, 2900);
  }

  /* ─────────── الحالة ─────────── */
  var state = { group: 'ar', lib: 'all', query: '', playing: null };
  var favs = store('stm_favs', []) || [];
  var prog = store('stm_prog', {}) || {};
  var isFav = function (k) { return favs.indexOf(k) > -1 };
  function toggleFav(k) {
    var i = favs.indexOf(k);
    if (i > -1) { favs.splice(i, 1); toast('أُزيل من المفضلة'); }
    else { favs.push(k); toast('أُضيف إلى المفضلة ★', true); }
    store('stm_favs', favs);
  }
  function saveProgress(k, p) { prog[k] = p; store('stm_prog', prog); }
  function getProgress(k) { return prog[k] || null; }

  /* ─────────── المشغل ─────────── */
  P.init({
    isFav: isFav, toggleFav: toggleFav,
    saveProgress: saveProgress, getProgress: getProgress,
    toast: toast,
    onPlay: function (item, ctx) {
      state.playing = item;
      renderEpsStrip(item, ctx);
      renderGrid(); renderContinue();
      /* على الهاتف: أعد المستخدم إلى المشغل عند اختيار عنصر من قوائم بعيدة */
      if (w.innerWidth < 1024) {
        var sw = $id('stmStagewrap');
        if (sw && sw.getBoundingClientRect().top < -10) {
          sw.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    onEnded: function (item, ctx) {
      /* الحلقة التالية تلقائيًا (للتشغيل المباشر mp4/hls) */
      if (ctx && ctx.list && ctx.idx != null) {
        var next = ctx.list[ctx.idx + 1];
        if (next) { toast('تشغيل العنصر التالي…', true); playEpisode(ctx.coll, ctx.list, ctx.idx + 1); }
      }
    }
  });

  /* ─────────── تشغيل العناصر ─────────── */
  function playEpisode(coll, list, idx) {
    var ep = list[idx];
    if (!ep) return;
    var item = {
      type: ep.type, src: ep.src, name: coll ? coll.name : ep.title,
      epTitle: ep.title, poster: ep.thumb || (coll && coll.poster) || '',
      favKey: (coll ? coll.id : 'x') + ':' + ep.src,
      collectionId: coll ? coll.id : null,
      collectionName: coll ? coll.name : null,
      variants: ep.variants, subs: ep.subs,
      provLabel: ep.provLabel
    };
    P.mount(item, { list: list, idx: idx, coll: coll });
    /* إبراز الحلقة الحالية في الشريط */
    var strip = $id('stmEps');
    if (strip) {
      Array.prototype.forEach.call(strip.querySelectorAll('.stm-ep'), function (b, i) {
        b.classList.toggle('on', i === idx);
        if (i === idx) b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    }
  }

  function playItem(it) {
    var item = {
      type: it.type, src: it.src, name: it.name, poster: it.poster,
      favKey: it.id, variants: it.variants, subs: it.subs, provLabel: it.provLabel
    };
    P.mount(item, { list: [item], idx: 0, coll: null });
  }

  /* ─────────── شريط الحلقات أسفل المشغل ─────────── */
  function renderEpsStrip(item, ctx) {
    var box = $id('stmEps');
    if (!box) return;
    if (!ctx || !ctx.list || ctx.list.length < 2) { box.classList.remove('show'); box.innerHTML = ''; return; }
    box.innerHTML = '<b>' + esc(item.name) + '</b>';
    ctx.list.forEach(function (ep, i) {
      var b = el('button', 'stm-ep' + (i === ctx.idx ? ' on' : ''), esc(ep.title || 'عنصر ' + (i + 1)));
      b.addEventListener('click', function () { playEpisode(ctx.coll, ctx.list, i); });
      box.appendChild(b);
    });
    box.classList.add('show');
  }

  /* ─────────── شريط التنقل (سابق/تالي) ─────────── */
  function bindUnderbar() {
    var prev = $id('stmPrevBtn'), next = $id('stmNextBtn');
    function step(dirn) {
      var ctx = P.context(); if (!ctx || !ctx.list) return;
      var i = ctx.idx + dirn;
      if (i < 0 || i >= ctx.list.length) { toast(dirn > 0 ? 'هذا آخر عنصر في القائمة' : 'هذا أول عنصر في القائمة'); return; }
      playEpisode(ctx.coll, ctx.list, i);
    }
    if (prev) prev.addEventListener('click', function () { step(-1) });
    if (next) next.addEventListener('click', function () { step(1) });
  }

  /* ─────────── التنقل بين المكتبات ─────────── */
  var GROUPS = [
    { id: 'ar', name: 'المكتبات العربية' },
    { id: 'world', name: 'المكتبات العالمية' }
  ];
  function libCards(libId) {
    var out = [];
    DATA.collections.forEach(function (c) { if (c.lib === libId) out.push({ coll: c }) });
    DATA.items.forEach(function (i) { if (i.lib === libId) out.push({ item: i }) });
    return out;
  }
  function libCount(libId) { return libCards(libId).length }

  function renderLibNav() {
    var nav = $id('stmLibNav'); if (!nav) return;
    nav.innerHTML = '';
    /* تبويبا المجموعتين */
    GROUPS.forEach(function (g) {
      var b = el('button', 'stm-libtab' + (state.group === g.id ? ' on' : ''),
        esc(g.name));
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', state.group === g.id);
      b.addEventListener('click', function () {
        state.group = g.id; state.lib = 'all'; state.query = '';
        var si = $id('stmSearch'); if (si) si.value = '';
        renderLibNav(); renderGrid();
      });
      nav.appendChild(b);
    });
    /* شرائح المكتبات داخل المجموعة */
    DATA.libraries.forEach(function (l) {
      if (l.group !== state.group) return;
      var n = libCount(l.id);
      var b = el('button', 'stm-libtab' + (state.lib === l.id ? ' on' : ''),
        icon(l.icon) + '<span>' + esc(l.name) + '</span><span class="cnt">' + n + '</span>');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', state.lib === l.id);
      b.addEventListener('click', function () {
        state.lib = l.id; state.query = '';
        var si = $id('stmSearch'); if (si) si.value = '';
        renderLibNav(); renderGrid();
      });
      nav.appendChild(b);
    });
    /* المفضلة */
    var fnav = el('button', 'stm-libtab' + (state.lib === 'favs' ? ' on' : ''),
      icon('heart') + '<span>المفضلة</span><span class="cnt">' + favs.length + '</span>');
    fnav.addEventListener('click', function () {
      state.lib = 'favs'; state.query = '';
      renderLibNav(); renderGrid();
    });
    nav.appendChild(fnav);
  }

  function icon(name) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + name + '"/></svg>' }

  /* ─────────── بطاقات العرض ─────────── */
  function posterOr(p, name, kind) {
    if (p) return p;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#123326"/><stop offset="1" stop-color="#0a1a13"/></linearGradient></defs>' +
      '<rect width="600" height="375" fill="url(#g)"/>' +
      '<text x="300" y="185" text-anchor="middle" font-family="Cairo,Tahoma" font-size="30" font-weight="900" fill="#eaf5ef">' + esc(String(name).slice(0, 22)) + '</text>' +
      '<text x="300" y="230" text-anchor="middle" font-family="Cairo,Tahoma" font-size="16" font-weight="700" fill="#5f7a6d">' + esc(kind || 'سوفتارا Media') + '</text></svg>');
  }

  function makeCard(o) {
    var card = el('div', 'stm-card');
    card.setAttribute('role', 'button'); card.tabIndex = 0;
    var coll = o.coll, item = o.item;
    var name = coll ? coll.name : item.name;
    var sub = coll
      ? [coll.kind === 'channel' ? 'قناة' : 'مسلسل', (coll.episodes || []).length + ' عنصر', coll.year, coll.country].filter(Boolean).join(' · ')
      : [item.year, item.cat, item.durText].filter(Boolean).join(' · ');
    var playing = state.playing && (coll
      ? (state.playing.collectionId === coll.id)
      : (state.playing.favKey === item.id));
    if (playing) card.classList.add('playing');
    var badges = '';
    if (coll && coll.catalog) badges += '<span class="stm-badge catalog">كتالوج رسمي</span>';
    if (coll && (coll.episodes || []).length) badges += '<span class="stm-badge new">' + (coll.episodes).length + ' عنصر</span>';
    if (item && item.durText) badges += '<span class="stm-badge">' + esc(item.durText) + '</span>';
    if (item && item.cat) badges += '<span class="stm-badge cat">' + esc(item.cat) + '</span>';
    if (playing) badges += '<span class="stm-badge playnow">▶ قيد التشغيل</span>';
    var fk = coll ? coll.id : item.id;
    card.innerHTML =
      '<span class="stm-card-media"><img loading="lazy" alt="' + esc(name) + '" src="' + esc(posterOr(coll ? coll.poster : item.poster, name, coll ? (coll.catalog ? 'كتالوج' : 'قناة/مسلسل') : 'فيلم')) + '">' +
      '<span class="stm-card-badges">' + badges + '</span>' +
      '<button class="stm-fav' + (isFav(fk) ? ' on' : '') + '" aria-label="المفضلة" tabindex="0">' + icon('heart') + '</button></span>' +
      '<span class="stm-card-body"><b>' + esc(name) + '</b><small>' + esc(sub) + '</small></span>';
    card.querySelector('.stm-fav').addEventListener('click', function (e) {
      e.stopPropagation(); toggleFav(fk);
      this.classList.toggle('on', isFav(fk));
      renderLibNav();
    });
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
    card.addEventListener('click', function () {
      if (coll) openDetail(coll);
      else { playItem(item); }
    });
    return card;
  }

  function renderGrid() {
    var grid = $id('stmGrid'); if (!grid) return;
    var q = state.query.trim().toLowerCase();
    var list = [];
    var title = $id('stmGridTitle'), count = $id('stmGridCount');

    if (state.lib === 'favs' && !q) {
      DATA.collections.forEach(function (c) { if (isFav(c.id)) list.push({ coll: c }) });
      DATA.items.forEach(function (i) { if (isFav(i.id)) list.push({ item: i }) });
      if (title) title.textContent = 'المفضلة';
    } else if (q) {
      /* بحث شامل: المجموعات + العناصر + الحلقات */
      DATA.collections.forEach(function (c) {
        if ((c.name + ' ' + (c.note || '')).toLowerCase().indexOf(q) > -1) list.push({ coll: c });
      });
      DATA.items.forEach(function (i) {
        if ((i.name + ' ' + (i.cat || '') + ' ' + (i.desc || '')).toLowerCase().indexOf(q) > -1) list.push({ item: i });
      });
      /* حلقات مطابقة: بطاقات تشغيل مباشر */
      DATA.collections.forEach(function (c) {
        (c.episodes || []).forEach(function (ep, i) {
          if ((ep.title || '').toLowerCase().indexOf(q) > -1 && list.length < 60) {
            list.push({ epHit: { coll: c, ep: ep, idx: i } });
          }
        });
      });
      if (title) title.textContent = 'نتائج البحث عن: «' + state.query + '»';
    } else {
      var libId = state.lib === 'favs' ? 'all' : state.lib;
      if (libId === 'all') {
        DATA.collections.forEach(function (c) { list.push({ coll: c }) });
        DATA.items.forEach(function (i) { list.push({ item: i }) });
        if (title) title.textContent = state.group === 'ar' ? 'المكتبات العربية' : 'المكتبات العالمية';
      } else {
        list = libCards(libId);
        var lib = DATA.libraries.filter(function (l) { return l.id === libId })[0];
        if (title) title.textContent = lib ? lib.name : '';
      }
    }
    if (count) count.textContent = list.length ? list.length + ' عنصر' : '';

    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = '<div class="stm-empty">' + icon(state.lib === 'favs' ? 'heart' : 'search') +
        '<div>' + (state.lib === 'favs' && !q ? 'لا يوجد محتوى في المفضلة بعد — اضغط القلب على أي بطاقة' : 'لا توجد نتائج مطابقة — جرّب كلمة أخرى') + '</div></div>';
      return;
    }
    list.forEach(function (o) {
      if (o.epHit) {
        var h = o.epHit;
        var card = el('div', 'stm-card');
        card.setAttribute('role', 'button'); card.tabIndex = 0;
        card.innerHTML = '<span class="stm-card-media"><img loading="lazy" alt="" src="' + esc(posterOr(h.ep.thumb || h.coll.poster, h.ep.title, 'حلقة')) + '">' +
          '<span class="stm-card-badges"><span class="stm-badge new">حلقة</span></span></span>' +
          '<span class="stm-card-body"><b>' + esc(h.ep.title) + '</b><small>' + esc(h.coll.name) + '</small></span>';
        var go = function () { playEpisode(h.coll, h.coll.episodes, h.idx); };
        card.addEventListener('click', go);
        card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
        grid.appendChild(card);
      } else grid.appendChild(makeCard(o));
    });
  }

  /* ─────────── ورقة التفاصيل ─────────── */
  var detailColl = null;
  function openDetail(coll) {
    detailColl = coll;
    var hero = $id('stmDetailHero');
    if (hero) {
      hero.innerHTML = '<img alt="' + esc(coll.name) + '" src="' + esc(posterOr(coll.poster, coll.name, 'سوفتارا Media')) + '">';
      var im = hero.querySelector('img');
      if (im) im.addEventListener('error', function () { this.onerror = null; this.src = posterOr('', coll.name, ''); });
    }
    var dn = $id('stmDetailName'); if (dn) dn.textContent = coll.name;
    var chips = [];
    chips.push('<span class="hot">' + (coll.catalog ? 'كتالوج' : ((coll.episodes || []).length + ' عنصرًا')) + '</span>');
    if (coll.year) chips.push('<span>' + esc(coll.year) + '</span>');
    if (coll.country) chips.push('<span>' + esc(coll.country) + '</span>');
    if (coll.kind === 'channel') chips.push('<span>قناة رسمية</span>');
    var dm = $id('stmDetailMeta'); if (dm) dm.innerHTML = chips.join('');
    var dd = $id('stmDetailDesc'); if (dd) dd.textContent = coll.note || '';
    var ds = $id('stmDetailSrc');
    if (ds) ds.innerHTML = icon('info') + '<span>' + esc(coll.source || 'مصدر رسمي موثّق') + '</span>';

    /* أزرار الإجراءات */
    var acts = $id('stmDetailActions'); acts.innerHTML = '';
    var favB = el('button', 'stm-btn stm-btn-ghost', icon('heart') + '<span>المفضلة</span>');
    favB.classList.toggle('stm-fav-on', false);
    favB.addEventListener('click', function () { toggleFav(coll.id); favB.classList.toggle('stm-fav-on', isFav(coll.id)); renderLibNav(); });
    acts.appendChild(favB);
    if (!coll.catalog) {
      var playB = el('button', 'stm-btn stm-btn-primary', icon('play') + '<span>تشغيل</span>');
      playB.addEventListener('click', function () { closeDetail(); playEpisode(coll, coll.episodes, 0); });
      acts.appendChild(playB);
    }
    if (coll.full) {
      var fullB = el('button', 'stm-btn stm-btn-ghost', icon('list') + '<span>القائمة الكاملة (تتحدث تلقائيًا)</span>');
      fullB.addEventListener('click', function () {
        closeDetail();
        P.mount({
          type: coll.full.type, src: coll.full.src,
          name: coll.name, epTitle: coll.full.title || 'القائمة الكاملة',
          poster: coll.poster, favKey: coll.id + ':full', collectionId: coll.id, collectionName: coll.name
        }, { list: [{ type: coll.full.type, src: coll.full.src, title: coll.full.title || 'القائمة الكاملة' }], idx: 0, coll: coll });
      });
      acts.appendChild(fullB);
    }

    /* روابط المشاهدة الرسمية (كتالوج) */
    var off = $id('stmDetailOfficial'); off.innerHTML = '';
    if (coll.catalog && coll.official) {
      coll.official.forEach(function (o) {
        var a = el('a', 'stm-official-link', icon('ext') + '<span>' + esc(o.label) + '</span>');
        a.href = o.url; a.target = '_blank'; a.rel = 'noopener nofollow noreferrer';
        off.appendChild(a);
      });
    }
    /* المقطع الرسمي للكتالوج */
    if (coll.catalog && coll.trailer) {
      var tb = el('button', 'stm-btn stm-btn-primary', icon('play') + '<span>' + esc(coll.trailer.title || 'المقطع الدعائي الرسمي') + '</span>');
      tb.addEventListener('click', function () {
        closeDetail(); playEpisode(coll, [coll.trailer], 0);
      });
      acts.appendChild(tb);
    }

    /* المواسم (كتالوج) */
    var seas = $id('stmDetailSeasons'); seas.innerHTML = '';
    if (coll.catalog && coll.seasons) {
      coll.seasons.forEach(function (s) {
        var b = el('button', '', esc(s.name) + ' (' + s.count + ')');
        seas.appendChild(b);
      });
    }

    /* الحلقات */
    var epsBox = $id('stmDetailEps'); epsBox.innerHTML = '';
    if (!coll.catalog) {
      var cur = P.current();
      (coll.episodes || []).forEach(function (ep, i) {
        var on = cur && cur.collectionId === coll.id && (P.context() && P.context().idx === i);
        var b = el('button', 'stm-detal' + (on ? ' on' : ''),
          '<span class="th"><img loading="lazy" alt="" src="' + esc(posterOr(ep.thumb || coll.poster, ep.title, '')) + '"></span>' +
          '<span class="tx"><b>' + esc(ep.title || 'عنصر ' + (i + 1)) + '</b><small>' + esc(coll.name) + '</small></span>');
        b.addEventListener('click', function () { closeDetail(); playEpisode(coll, coll.episodes, i); });
        epsBox.appendChild(b);
      });
      if (!(coll.episodes || []).length) epsBox.innerHTML = '<div class="stm-empty"><div>لا توجد حلقات مفحوصة بعد — استخدم القائمة الكاملة</div></div>';
    }

    /* مشابه */
    var sim = $id('stmDetailSimilar');
    if (sim) {
      var sims = DATA.collections.filter(function (c) { return c.lib === coll.lib && c.id !== coll.id }).slice(0, 8);
      if (sims.length) {
        sim.innerHTML = '<h4>محتوى مشابه</h4>';
        var row = el('div', 'stm-simil-row');
        sims.forEach(function (s) {
          var b = el('button', 'stm-simil',
            '<img loading="lazy" alt="" src="' + esc(posterOr(s.poster, s.name, '')) + '"><b>' + esc(s.name) + '</b>');
          b.addEventListener('click', function () { openDetail(s) });
          row.appendChild(b);
        });
        sim.appendChild(row);
      } else sim.innerHTML = '';
    }

    var sheet = $id('stmDetail');
    sheet.classList.add('open'); sheet.setAttribute('aria-hidden', 'false');
    try { d.body.style.overflow = 'hidden' } catch (_) { }
  }
  function closeDetail() {
    var dd = $id('stmDetail');
    if (!dd || !dd.classList.contains('open')) return;
    dd.classList.remove('open'); dd.setAttribute('aria-hidden', 'true');
    try { d.body.style.overflow = '' } catch (_) { }
    detailColl = null;
  }

  /* ─────────── متابعة المشاهدة ─────────── */
  function renderContinue() {
    var sec = $id('stmContinueSec'), box = $id('stmContinue');
    if (!sec || !box) return;
    var list = Object.keys(prog).map(function (k) { return { k: k, p: prog[k] } })
      .filter(function (o) { return o.p && o.p.at && o.p.t > 10 && !o.p.done && o.p.d && o.p.t < o.p.d - 15 })
      .sort(function (a, b) { return b.p.at - a.p.at }).slice(0, 10);
    if (!list.length) { sec.style.display = 'none'; return; }
    sec.style.display = '';
    box.innerHTML = '';
    list.forEach(function (o) {
      var nm = o.k.split(':');
      var card = el('div', 'stm-card');
      card.setAttribute('role', 'button'); card.tabIndex = 0;
      card.innerHTML = '<span class="stm-card-media"><span class="stm-prog"><i style="width:' +
        Math.min(100, Math.round(o.p.t / o.p.d * 100)) + '%"></i></span></span>' +
        '<span class="stm-card-body"><b>' + esc(nm[0]) + '</b><small>من ' + Math.floor(o.p.t / 60) + ' دقيقة</small></span>';
      /* البطاقة تعيد التشغيل عبر البحث في المجموعات */
      card.addEventListener('click', function () {
        /* نبحث عن المصدر المحفوظ بالمفتاح */
        var found = null;
        DATA.collections.forEach(function (c) {
          (c.episodes || []).forEach(function (ep, i) {
            if ((c.id + ':' + ep.src) === o.k) found = { coll: c, idx: i };
          });
        });
        if (found) playEpisode(found.coll, found.coll.episodes, found.idx);
        else toast('انتهت صلاحية موضع المشاهدة — اختر العنصر من مكتبته');
      });
      box.appendChild(card);
    });
  }

  /* ─────────── البحث ─────────── */
  var searchT = 0;
  function bindSearch() {
    var inp = $id('stmSearch'); if (!inp) return;
    inp.addEventListener('input', function () {
      var v = this.value; clearTimeout(searchT);
      searchT = setTimeout(function () {
        state.query = v; state.lib = state.query ? 'all' : state.lib;
        renderLibNav(); renderGrid();
        /* انتقل للشبكة عند البحث على الهاتف */
        if (w.innerWidth < 1024 && v) {
          var g = $id('stmGridTitle'); if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 180);
    });
    var clr = $id('stmSearchClear');
    if (clr) clr.addEventListener('click', function () { inp.value = ''; state.query = ''; renderLibNav(); renderGrid(); inp.focus(); });
    var btn = $id('stmSearchBtn');
    if (btn) btn.addEventListener('click', function () {
      var wrap = $id('stmSearchWrap'); var on = wrap.classList.toggle('open');
      this.setAttribute('aria-expanded', on);
      if (on) setTimeout(function () { inp.focus() }, 140);
    });
  }

  /* ─────────── تثبيت المشغل أثناء التصفح ─────────── */
  function bindSticky() {
    var wrap = $id('stmStagewrap'), shell = $id('stmShell');
    if (!wrap || !shell || !('IntersectionObserver' in w)) return;
    var sentinel = el('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:100%;pointer-events:none';
    wrap.parentNode.insertBefore(sentinel, wrap);
    var io = new IntersectionObserver(function (entries) {
      var stuck = !entries[0].isIntersecting;
      wrap.classList.toggle('is-stuck', stuck);
      shell.classList.toggle('stm-stuck', stuck);
    }, { threshold: 0 });
    io.observe(sentinel);
  }

  /* ─────────── التحديث التلقائي لمكتبات القنوات ───────────
     يحاول جلب RSS المباشر عبر وسائط CORS إن توفرت (best effort)؛
     وإلا يعتمد اللقطات + القائمة الكاملة الرسمية داخل المشغل. */
  var PROXIES = [
    function (u) { return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u) },
    function (u) { return 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(u) },
    function (u) { return 'https://corsproxy.io/?url=' + encodeURIComponent(u) }
  ];
  function parseRss(text) {
    var out = [];
    try {
      var xml = new DOMParser().parseFromString(text, 'text/xml');
      var entries = xml.querySelectorAll('entry');
      for (var i = 0; i < entries.length && i < 20; i++) {
        var e = entries[i];
        var vid = e.getElementsByTagName('yt:videoId')[0] || e.getElementsByTagName('videoId')[0];
        var ttl = e.getElementsByTagName('title')[0];
        if (vid && ttl) {
          out.push({ src: vid.textContent, title: ttl.textContent, thumb: 'https://i.ytimg.com/vi/' + vid.textContent + '/hqdefault.jpg' });
        }
      }
    } catch (_) { }
    return out;
  }
  function refreshChannel(channelKey, collId) {
    if (!CHN || !CHN.channels) return;
    var ch = null;
    CHN.channels.forEach(function (c) { if (c.id === channelKey) ch = c });
    if (!ch) return;
    var cacheKey = 'stm_chn_' + channelKey;
    var cached = store(cacheKey, null);
    var rss = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + ch.cid;
    var tryProxy = function (i) {
      if (i >= PROXIES.length) { apply(cached); return; }
      var ctrl = ('AbortController' in w) ? new AbortController() : null;
      var to = ctrl ? setTimeout(function () { ctrl.abort() }, 9000) : 0;
      fetch(PROXIES[i](rss), ctrl ? { signal: ctrl.signal } : {})
        .then(function (r) { clearTimeout(to); return r.ok ? r.text() : Promise.reject(r.status) })
        .then(function (t) {
          var vids = parseRss(t);
          if (!vids.length) throw new Error('no-entries');
          apply({ ts: Date.now(), videos: vids });
        })
        .catch(function () { clearTimeout(to); tryProxy(i + 1) });
    };
    function apply(data) {
      if (!data || !data.videos || !data.videos.length) return;
      /* دمج: الجديد أولًا ثم اللقطة، بلا تكرار، حتى 30 */
      var seen = {}, merged = [];
      data.videos.forEach(function (v) { if (!seen[v.src]) { seen[v.src] = 1; merged.push(v) } });
      ch.videos.forEach(function (v) { if (!seen[v.src]) { seen[v.src] = 1; merged.push(v) } });
      merged = merged.slice(0, 30);
      /* إن كانت المجموعة تُعرض حاليًا، حدّث حلقاتها حيًّا */
      DATA.collections.forEach(function (c) {
        if (c.id === collId) c.episodes = merged.map(function (v) { return { type: 'youtube', src: v.src, title: v.title, thumb: v.thumb } });
      });
      if (data.ts) store(cacheKey, { ts: data.ts, videos: merged.slice(0, 15) });
      if (state.query || state.lib === 'all' || true) renderGrid();
    }
    /* اللقطة المخزنة محليًا تعرض فورًا إن وجدت ثم نجرب التحديث */
    tryProxy(0);
  }

  /* ─────────── التهيئة العامة ─────────── */
  function applyPageMeta() {
    var h = $id('stmIdleTitle'); if (h) h.innerHTML = DATA.page.idleTitle;
    var p = $id('stmIdleText'); if (p) p.textContent = DATA.page.idleText;
    var iw = $id('stmIntroWord'); if (iw && DATA.page.introWord) iw.innerHTML = DATA.page.introWord;
    var is = $id('stmIntroSub'); if (is && DATA.page.introSub) is.textContent = DATA.page.introSub;
    var fc = $id('stmFooterTv');
    if (fc && DATA.links && DATA.links.tv) fc.href = DATA.links.tv;
    var br = $id('stmBrandSub');
    if (br) br.textContent = 'منصة الأفلام والمسلسلات والمكتبات — منتدى سوفتارا';
  }

  /* شريط الأخبار */
  function renderTicker(list) {
    var track = $id('stmTickerTrack'); if (!track) return;
    var chunk = (list || []).map(function (n) { return '<span>' + esc(n) + '<i class="sep"></i></span>' }).join('');
    if (!chunk) { var tk = $id('stmTicker'); if (tk) tk.style.display = 'none'; return; }
    track.innerHTML = chunk + '<span aria-hidden="true" style="display:contents">' + chunk + '</span>';
    track.style.setProperty('--tick-dur', Math.max(30, list.length * 9) + 's');
  }

  /* المقدمة */
  function maybeIntro(key, onDone) {
    var elx = $id('stmIntro');
    var done = onDone || function () { };
    if (!elx) { done(); return }
    var seen = false;
    try { seen = sessionStorage.getItem(key) === '1' } catch (_) { }
    if (seen) { if (elx.parentNode) elx.parentNode.removeChild(elx); done(); return }
    elx.classList.add('show'); elx.setAttribute('aria-hidden', 'false');
    var finished = false;
    var finish = function () {
      if (finished) return; finished = true;
      try { sessionStorage.setItem(key, '1') } catch (_) { }
      elx.classList.add('out'); elx.setAttribute('aria-hidden', 'true');
      setTimeout(function () { if (elx.parentNode) elx.parentNode.removeChild(elx) }, 500);
      done();
    };
    var skip = $id('stmIntroSkip'); if (skip) skip.addEventListener('click', finish);
    var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(finish, reduce ? 1200 : 4200);
  }

  /* السمة */
  function bindTheme() {
    var saved = 'dark';
    try { saved = localStorage.getItem('stm_theme') || 'dark' } catch (_) { }
    function apply(t) {
      d.documentElement.setAttribute('data-theme', t);
      var ic = $id('stmThemeIc'); if (ic) ic.setAttribute('href', t === 'dark' ? '#i-sun' : '#i-moon');
      var mt = $id('stmMetaTheme'); if (mt) mt.setAttribute('content', t === 'dark' ? '#0a0f0d' : '#f2f6f4');
    }
    apply(saved);
    var b = $id('stmThemeBtn');
    if (b && !b.dataset.bound) {
      b.dataset.bound = '1';
      b.addEventListener('click', function () {
        var cur = d.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('stm_theme', cur) } catch (_) { }
        apply(cur);
      });
    }
  }

  function init() {
    bindTheme();
    renderTicker(DATA.news);
    applyPageMeta();
    bindSearch(); bindUnderbar(); bindSticky();
    renderLibNav(); renderGrid(); renderContinue();
    var start = $id('stmStartBtn');
    if (start) start.addEventListener('click', function () {
      var t = $id('stmLibNav'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    var dc = $id('stmDetailClose'), db = $id('stmDetailBack');
    if (dc) dc.addEventListener('click', closeDetail);
    if (db) db.addEventListener('click', closeDetail);
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDetail() });
    maybeIntro(DATA.page.introKey, function () { });
    /* محاولة تحديث مكتبة القناة المطلوبة (وأشهر القنوات) بهدوء */
    setTimeout(function () {
      refreshChannel('turkish-dubbed-movies', 'ch-turkish-dubbed-movies');
      refreshChannel('kurtlar-arabic', 'ch-kurtlar-arabic');
    }, 2500);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
