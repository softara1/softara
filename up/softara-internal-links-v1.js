/* softara-internal-links-v1 — ربط داخلي تلقائي يعزز الأرشفة
   الفكرة (نفس ما تفعل المنتديات الكبيرة): عناوين المواضيع المنشورة تُحوَّل — عند ورودها داخل نص أي مشاركة —
   إلى روابط داخلية للموضوع المقصود. Google يفهرس الروابط الداخلية المحقونة بجافاسكربت (يصيّر الصفحة كاملة).
   ضوابط: أول ظهور فقط لكل عنوان، بحد أقصى 4 روابط لكل مشاركة، بلا مساس بالأكواد والاقتباسات والروابط القائمة،
   والفهرس يُبنى من تغذيات RSS الرسمية للمنتدى ويُخزَّن محلياً 6 ساعات. */
(function () {
  "use strict";
  if (window.softaraILinks) return;
  window.softaraILinks = true;

  var CACHE_KEY = "sa_ilink_idx_v1";
  var TTL = 6 * 3600 * 1000;
  var MAX_ITEMS = 300;
  var MAX_PHRASES = 70;
  var MAX_PER_POST = 4;
  var FEEDS = ["/feed/", "/feed/?f=11", "/feed/?f=15", "/feed/?f=16", "/feed/?f=19", "/feed/?f=21", "/feed/?f=23", "/feed/?f=25"];
  var SKIP_TAGS = { A: 1, CODE: 1, PRE: 1, SCRIPT: 1, STYLE: 1, TEXTAREA: 1, KBD: 1, SAMP: 1, BUTTON: 1 };

  var CSS = ".sa-ilink{color:inherit;text-decoration:none;border-bottom:1.5px dotted rgba(139,92,246,.55);transition:color .15s,border-color .15s}" +
    ".sa-ilink:hover{color:var(--primary-color,#7c3aed);border-bottom-style:solid;border-bottom-color:var(--primary-color,#8b5cf6)}" +
    "@media (max-width:768px){.sa-ilink{border-bottom-width:1px}}";

  /* تطبيع عربي بمستوى الحرف (يحفظ المواضع) */
  function normChar(c) {
    if (c === "أ" || c === "إ" || c === "آ" || c === "ٱ") return "ا";
    if (c === "ة") return "ه";
    if (c === "ى") return "ي";
    if (c === "ؤ") return "و";
    if (c === "ئ") return "ي";
    return c.toLowerCase();
  }
  function norm(s) {
    var out = "";
    for (var i = 0; i < s.length; i++) out += normChar(s.charAt(i));
    return out;
  }
  function isWordChar(c) {
    return /[\u0621-\u064A0-9A-Za-z_]/.test(c);
  }

  function cleanTitle(t) {
    t = (t || "").replace(/\s+/g, " ").trim();
    t = t.replace(/[|«»"'`*_~()\[\]]+/g, " ").replace(/\s+/g, " ").trim();
    return t;
  }

  /* كلمات وظيفية لا تصلح لبداية/نهاية عبارة رابط */
  var STOP = { "في": 1, "من": 1, "على": 1, "إلى": 1, "عن": 1, "مع": 1, "هذا": 1, "هذه": 1, "الذي": 1, "التي": 1,
    "كيف": 1, "ماذا": 1, "لماذا": 1, "أفضل": 1, "افضل": 1, "شرح": 1, "جديد": 1, "جديدة": 1, "أحلى": 1, "احلى": 1,
    "2025": 1, "2026": 1, "ساري": 1, "متجدد": 1, "منتهي": 1, "عرض": 1 };

  /* استخراج عبارات قابلة للربط: العنوان الكامل + نوافذ 3 كلمات + ثنائيات كلماتها الطويلة */
  function buildPhrases(items) {
    var out = [], seen = {};
    function push(p, it) {
      p = (p || "").replace(/\s+/g, " ").trim();
      if (p.length < 9) return;
      var w = p.split(" ");
      if (w.length < 2) return;
      if (STOP[w[0]] || STOP[w[w.length - 1]]) return;
      var k = norm(p);
      if (seen[k]) return;
      seen[k] = 1;
      out.push({ title: p, url: it.url, t: it.t });
    }
    for (var i = 0; i < items.length; i++) {
      var w = items[i].title.split(" ");
      push(items[i].title, items[i]);
      for (var s = 0; s + 3 <= w.length; s++) push(w.slice(s, s + 3).join(" "), items[i]);
      for (var s2 = 0; s2 + 2 <= w.length; s2++) {
        if (w[s2].length >= 4 && w[s2 + 1].length >= 4) push(w[s2] + " " + w[s2 + 1], items[i]);
      }
    }
    out.sort(function (a, b) { return b.title.length - a.title.length; });
    return out.slice(0, MAX_PHRASES);
  }

  /* فهرس العناوين */
  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var d = JSON.parse(raw);
      if (!d || !d.items || !d.items.length || !d.t) return null;
      return d;
    } catch (e) { return null; }
  }

  function writeCache(items) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), items: items })); } catch (e) {}
  }

  function parseFeed(xmlText, out) {
    var doc = new DOMParser().parseFromString(xmlText, "text/xml");
    var items = doc.querySelectorAll("item");
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var ti = it.querySelector("title");
      var ln = it.querySelector("link");
      if (!ti || !ln) continue;
      var href = (ln.textContent || "").trim().split("#")[0];
      var m = href.match(/\/t(\d+)/);
      if (!m) continue;
      var title = cleanTitle(ti.textContent);
      if (title.length < 8) continue;
      out.push({ t: m[1], title: title, url: href });
    }
  }

  function refreshCache(done) {
    var collected = [];
    var old = readCache();
    var pending = FEEDS.length;
    var finished = false;
    function fin() {
      if (finished) return;
      finished = true;
      /* دمج مع الفهرس القديم: القديم أولاً ثم الجديد بلا تكرار */
      var seen = {}, merged = [];
      function push(it) {
        var k = it.t;
        if (seen[k]) return;
        seen[k] = 1;
        merged.push(it);
      }
      if (old && old.items) for (var i = 0; i < old.items.length && merged.length < MAX_ITEMS; i++) push(old.items[i]);
      for (var j = 0; j < collected.length && merged.length < MAX_ITEMS; j++) push(collected[j]);
      if (merged.length) writeCache(merged);
      if (done) done();
    }
    for (var f = 0; f < FEEDS.length; f++) {
      (function (url) {
        var x = new XMLHttpRequest();
        x.open("GET", url, true);
        x.timeout = 8000;
        x.onload = function () {
          try { if (x.status === 200) parseFeed(x.responseText, collected); } catch (e) {}
          if (--pending === 0) fin();
        };
        x.onerror = x.ontimeout = function () { if (--pending === 0) fin(); };
        x.send();
      })(FEEDS[f]);
    }
    setTimeout(fin, 9000); /* شبكة أمان */
  }

  /* مطابقة نصية بحدود كلمات */
  function findPhrase(hayNorm, phraseNorm) {
    var idx = hayNorm.indexOf(phraseNorm);
    while (idx !== -1) {
      var before = idx > 0 ? hayNorm.charAt(idx - 1) : " ";
      var after = idx + phraseNorm.length < hayNorm.length ? hayNorm.charAt(idx + phraseNorm.length) : " ";
      if (!isWordChar(before) && !isWordChar(after)) return idx;
      idx = hayNorm.indexOf(phraseNorm, idx + 1);
    }
    return -1;
  }

  function linkPhrase(root, phrase, url) {
    var pNorm = norm(phrase);
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || SKIP_TAGS[p.nodeName]) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest(".sa-ilink, .flx-auto-tags, h1, h2, .page-title")) return NodeFilter.FILTER_REJECT;
        if (!n.nodeValue || n.nodeValue.length < phrase.length) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var node;
    while ((node = walker.nextNode())) {
      var vNorm = norm(node.nodeValue);
      var idx = findPhrase(vNorm, pNorm);
      if (idx === -1) continue;
      var a = document.createElement("a");
      a.href = url;
      a.className = "sa-ilink";
      a.title = "موضوع ذو صلة في سوفتارا: " + phrase;
      a.textContent = node.nodeValue.substr(idx, phrase.length);
      var after = node.splitText(idx + phrase.length);
      node.parentNode.insertBefore(a, after);
      node.nodeValue = node.nodeValue.substr(0, idx);
      return true;
    }
    return false;
  }

  function processPage(items) {
    var st = document.createElement("style");
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);

    var curUrl = (document.querySelector('meta[property="og:url"]') || {}).content || location.pathname;
    var curM = curUrl.match(/\/t(\d+)/);
    var curT = curM ? curM[1] : null;

    /* جذر كل مشاركة (الأولى والردود) */
    var arts = document.querySelectorAll("article[id^='p']");
    var roots = [];
    for (var i = 0; i < arts.length && roots.length < 12; i++) {
      var c = arts[i].querySelector(".content") || arts[i].querySelector(".postbody");
      if (c) roots.push(c);
    }
    if (!roots.length) return;

    var phrases = buildPhrases(items);

    for (var r = 0; r < roots.length; r++) {
      var used = 0;
      for (var p = 0; p < phrases.length && used < MAX_PER_POST; p++) {
        if (curT && phrases[p].t === curT) continue;
        if (linkPhrase(roots[r], phrases[p].title, phrases[p].url)) used++;
      }
    }
  }

  function main() {
    if (!/^\/t\d+/.test(location.pathname)) return;
    /* لا نربط داخل صفحات التحرير/الرد السريع */
    if (location.search.indexOf("mode=") !== -1) return;
    var cache = readCache();
    if (cache && Date.now() - cache.t < TTL) {
      processPage(cache.items);
    } else {
      refreshCache(function () {
        var c2 = readCache();
        if (c2) processPage(c2.items);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();