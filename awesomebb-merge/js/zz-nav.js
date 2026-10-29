/* =====================================================================
   Z-Zone × AwesomeBB — التنقل الديناميكي المحافظ (zz-nav.js)
   الإصدار: 1.0.0
   ---------------------------------------------------------------------
   الفكرة: تحسين سرعة التصفح دون إعادة تحميل على المسارات الآمنة فقط،
   مع الحفاظ الكامل على:
     - الروابط المباشرة وفتح أي رابط من الصفر (كل شيء يبقى صفحات حقيقية).
     - الرجوع/التقدم عبر سجل المتصفح (popstate).
     - عنوان الصفحة والرابط الأساسي canonical بعد كل تبديل.
     - سلوك طبيعي للروابط الخارجية، والروابط في نافذة جديدة، والروابط
       المعلَّقة بمعرّف (#)، والنماذج وأزرار المشاركة.
   حدود مقصودة (لضمان سلامة الوظائف):
     - صفحات المواضيع (/tN) تُحمَّل بشكل كامل: لضمان عمل المحرر، الرد
       السريع، الاقتباس، زر «تم الحل»، أزرار الإعجاب، والاستطلاعات.
     - صفحات النشر/الرسائل/الدخول/الإدارة والبحث مُستثناة.
     - أي فشل في الجلب أو التحليل يعيد التحميل الكامل تلقائيًا.
     - أقسام «القسم الخاص» (denyForumIds) مُستثناة لأن سكربت القسم
       الخاص الموجود يعمل على التحميل الكامل.
   ===================================================================== */

(function () {
    'use strict';

    if (window.__ZZ_NAV_ACTIVE__) return;
    window.__ZZ_NAV_ACTIVE__ = true;

    var CFG = window.ZZ_CONFIG || {};
    if (CFG.dynamicNav === false) return;

    /* ------------------------- الإعدادات ------------------------- */
    var SWAP_SELECTOR = '#wrap';
    var FETCH_TIMEOUT = 8000;
    var PREFETCH_DELAY = 110;
    var PREFETCH_TTL = 60 * 1000;
    var PREFETCH_MAX = 8;

    /* المسارات المسموح تبديل محتواها ديناميكيًا (قائمة آمنة مقصودة) */
    var ALLOW = [
        /^\/$/,
        /^\/forum\/?$/,
        /^\/c\d+/,
        /^\/f\d+/,
        /^\/latest\/?$/,
        /^\/discover\/?$/,
        /^\/faq/
    ];

    /* استثناءات صريحة تتفوق على قائمة السماح */
    var DENY = [
        /\/post/, /\/privmsg/, /\/login/, /\/register/, /\/modcp/, /\/admin/,
        /\/contact/, /\/abuse/, /\/report/, /\/statistics/, /\/chatbox/,
        /\/publi/, /\/buy-credits/, /\/profile/, /\/sta\//, /\/tags/, /\/groups/,
        /\/memberlist/, /\/u\d+/, /\/search/, /\/h\d/, /\?logout/,
        /mode=editprofile/, /view=/, /\.(png|jpe?g|gif|webp|svg|css|js|zip|xml|txt|pdf|ics|rss)$/i,
        /\/images/, /\/pdf/
    ];

    /* أقسام مستثناة بالمعرّف (القسم الخاص: سكربت التصفية يعمل على التحميل الكامل) */
    var DENY_FORUM_IDS = (CFG.denyForumIds || [4, 5]);

    /* معاملات استعلام مسموحة فقط (ترقيم الصفحات) */
    var SAFE_QUERY = /^[?&]*(start|page)=\d+(&[?&]*(start|page)=\d+)*$/;

    /* ------------------------- أدوات ------------------------- */
    function isAllowedPath(pathname) {
        for (var i = 0; i < DENY.length; i++) if (DENY[i].test(pathname)) return false;
        for (var j = 0; j < ALLOW.length; j++) if (ALLOW[j].test(pathname)) return true;
        return false;
    }

    function isAllowedUrl(url) {
        try {
            var u = new URL(url, location.href);
            if (u.origin !== location.origin) return false;
            if (!/^https?:$/.test(u.protocol)) return false;
            if (!isAllowedPath(u.pathname)) return false;
            var fm = u.pathname.match(/^\/f(\d+)/);
            if (fm && DENY_FORUM_IDS.indexOf(parseInt(fm[1], 10)) > -1) return false;
            if (u.search) {
                var q = u.search.replace(/^\?/, '');
                if (q && !SAFE_QUERY.test(q)) return false;
            }
            return true;
        } catch (e) { return false; }
    }

    var cache = new Map();          // url -> {ts, title, content, canonical}
    var inFlight = new Map();       // url -> AbortController
    var prefetchTimer = null;

    function cacheGet(url) {
        var e = cache.get(url);
        if (e && (Date.now() - e.ts) < PREFETCH_TTL) return e;
        if (e) cache.delete(url);
        return null;
    }

    function cachePut(url, entry) {
        cache.set(url, entry);
        if (cache.size > PREFETCH_MAX) {
            var oldest = cache.keys().next().value;
            cache.delete(oldest);
        }
    }

    function fetchPage(url, signal) {
        return fetch(url, {
            credentials: 'same-origin',
            signal: signal,
            headers: { 'X-Requested-With': 'ZZ-Nav' }
        }).then(function (res) {
            if (!res.ok) throw new Error('http ' + res.status);
            return res.text();
        });
    }

    function extract(htmlText, url) {
        var doc = new DOMParser().parseFromString(htmlText, 'text/html');
        var wrap = doc.querySelector(SWAP_SELECTOR);
        if (!wrap) throw new Error('no swap target');
        var canonical = doc.querySelector('link[rel="canonical"]');
        return {
            title: doc.title || '',
            content: wrap.innerHTML,
            canonical: canonical ? canonical.getAttribute('href') : null
        };
    }

    function applySwap(url, entry, isPop) {
        var wrap = document.querySelector(SWAP_SELECTOR);
        if (!wrap) { location.assign(url); return; }
        wrap.innerHTML = entry.content;
        document.title = entry.title;
        var link = document.querySelector('link[rel="canonical"]');
        if (entry.canonical) {
            if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
            link.setAttribute('href', entry.canonical);
        }
        if (!isPop) {
            try { history.pushState({ zz: true, url: url }, entry.title, url); } catch (e) { }
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
        /* إعادة تشغيل تحسينات الواجهة على المحتوى الجديد */
        document.dispatchEvent(new CustomEvent('zz:page:swapped', { detail: { url: url } }));
    }

    function navigate(url, isPop) {
        if (!isAllowedUrl(url)) { location.assign(url); return; }
        var hit = cacheGet(url);
        if (hit) { applySwap(url, hit, isPop); return; }

        var existing = inFlight.get(url);
        if (existing) return;

        var ctrl = new AbortController();
        inFlight.set(url, ctrl);
        var timer = setTimeout(function () { ctrl.abort(); }, FETCH_TIMEOUT);

        fetchPage(url, ctrl.signal).then(function (text) {
            clearTimeout(timer);
            inFlight.delete(url);
            var entry = extract(text, url);
            entry.ts = Date.now();
            cachePut(url, entry);
            applySwap(url, entry, isPop);
        }).catch(function () {
            clearTimeout(timer);
            inFlight.delete(url);
            /* أي فشل: تحميل كامل آمن */
            if (!isPop) location.assign(url);
            else location.reload();
        });
    }

    /* ------------------------- التقاط النقرات ------------------------- */
    document.addEventListener('click', function (e) {
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        var el = e.target;
        while (el && el !== document) {
            if (el.tagName === 'A') break;
            if (el.tagName === 'FORM' || el.isContentEditable) return;
            el = el.parentNode;
        }
        if (!el || el.tagName !== 'A') return;

        var a = el;
        if (a.target && a.target !== '_self') return;
        if (a.hasAttribute('download') || a.hasAttribute('data-nozz')) return;
        var href = a.getAttribute('href');
        if (!href) return;
        if (href.charAt(0) === '#') return;
        var abs = a.href; /* الرابط المطلق بعد معالجة المتصفح */
        if (!abs || abs.indexOf('javascript:') === 0) return;
        if (!isAllowedUrl(abs)) return;

        /* منع التبديل إن كنا على نفس الرابط تمامًا (تلميح داخلي) */
        if (abs.split('#')[0] === location.href.split('#')[0]) return;

        e.preventDefault();
        navigate(abs, false);
    }, false);

    /* ------------------------- الرجوع/التقدم ------------------------- */
    window.addEventListener('popstate', function (e) {
        if (e.state && e.state.zz) {
            navigate(location.href, true);
        } else if (!e.state && (isAllowedUrl(location.href))) {
            /* دخول مباشر ثم زر رجوع إلى حالة لا تخص zz */
            navigate(location.href, true);
        }
    });

    /* استبدال حالة الدخول الأصلية حتى يعمل الرجوع الأول بشكل صحيح */
    try { history.replaceState({ zz: true, url: location.href }, document.title, location.href); } catch (err) { }

    /* ------------------------- الجلب المسبق عند المرور ------------------------- */
    if (CFG.prefetch !== false && (window.matchMedia ? !window.matchMedia('(prefers-reduced-data: reduce)').matches : true)) {
        document.addEventListener('mouseover', function (e) {
            var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!a) return;
            var abs = a.href;
            if (!abs || !isAllowedUrl(abs)) return;
            if (cacheGet(abs) || inFlight.has(abs)) return;
            if (prefetchTimer) clearTimeout(prefetchTimer);
            prefetchTimer = setTimeout(function () {
                if (cacheGet(abs) || inFlight.has(abs)) return;
                var ctrl = new AbortController();
                inFlight.set(abs, ctrl);
                fetchPage(abs, ctrl.signal).then(function (text) {
                    inFlight.delete(abs);
                    var entry = extract(text, abs);
                    entry.ts = Date.now();
                    cachePut(abs, entry);
                }).catch(function () { inFlight.delete(abs); });
            }, PREFETCH_DELAY);
        }, { passive: true });
    }
})();
