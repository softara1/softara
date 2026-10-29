/* =====================================================================
   Z-Zone × AwesomeBB — تكامل الواجهة (zz-ui.js)
   الإصدار: 1.0.0
   ---------------------------------------------------------------------
   الدور: تحسين الصفحات الأصلية لمنصة أحلى منتدى (AwesomeBB) بهوية
   Z-Zone المرجعية، دون استبدال أي وظيفة أصلية:
     - تفعيل الشريط العلوي الأصلي (الرابط النشط، الصورة الرمزية، الإشعارات،
       زر القائمة، زر المظهر، شارة غير المقروء)
     - بوابة الهيرو + رادار المستجدات في الصفحة الرئيسية (من صفحة /latest الأصلية)
     - إعادة بناء ترويسة الموضوع (tz-topic-header-top)
     - لوحة إحصائيات «المتصلون الآن» + بطاقات إحصائيات الفوتر + عدّادات متحركة
     - شبكة الأقسام الفرعية + تلوين الأقسام + شارة التوقيع
     - أعمدة الفوتر (آخر المواضيع / الأكثر مشاركة / آخر الأعضاء) من صفحات
       المنصة الأصلية نفسها مع تخزين مؤقت قصير
   ملاحظات:
     - لا يحذف أي روابط منصة من الفوتر (التزامًا بشروط الاستخدام).
     - قابل لإعادة التنفيذ بعد التنقل الديناميكي عبر حدث «zz:page:swapped».
     - كل ميزة محمية بـ try/catch مستقل، ولا تعتمد الواجهة على وجوده.
   ===================================================================== */

(function () {
    'use strict';

    if (window.__ZZ_UI_ACTIVE__) return;
    window.__ZZ_UI_ACTIVE__ = true;

    /* ------------------------- الإعدادات ------------------------- */
    var CFG = window.ZZ_CONFIG || {};
    var RADAR_SOURCE = CFG.radarSource || '/latest';   // مصدر رادار المستجدات
    var RADAR_MAX = CFG.radarMax || 8;                 // أقصى عدد شرائح
    var FOOTER_COLS = CFG.footerColumns !== false;     // تفعيل أعمدة الفوتر
    var FOOTER_TTL = CFG.footerCacheTTL || 10 * 60 * 1000; // تخزين مؤقت 10 دقائق
    var HERO_ON_HOME = CFG.heroOnHome !== false;       // بوابة الهيرو في الرئيسية

    var COUNTER_COLORS = [
        { hex: '#2563eb', rgb: '37, 99, 235' },
        { hex: '#10b981', rgb: '16, 185, 129' },
        { hex: '#8b5cf6', rgb: '139, 92, 246' },
        { hex: '#f59e0b', rgb: '245, 158, 11' },
        { hex: '#ef4444', rgb: '239, 68, 68' },
        { hex: '#0ea5e9', rgb: '14, 165, 233' },
        { hex: '#f43f5e', rgb: '244, 63, 94' },
        { hex: '#14b8a6', rgb: '20, 184, 166' }
    ];
    var CAT_ICONS = ['local_fire_department', 'rocket_launch', 'diamond', 'star', 'bolt', 'electric_bolt', 'workspace_premium', 'military_tech'];
    var SF_STYLES = [
        { c: '#2563eb', bg: 'rgba(37, 99, 235, 0.08)', ic: 'folder_special' },
        { c: '#10b981', bg: 'rgba(16, 185, 129, 0.08)', ic: 'grid_view' },
        { c: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.08)', ic: 'inventory_2' },
        { c: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)', ic: 'library_books' },
        { c: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)', ic: 'label' },
        { c: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.08)', ic: 'bookmark' },
        { c: '#f43f5e', bg: 'rgba(244, 63, 94, 0.08)', ic: 'folder_open' },
        { c: '#14b8a6', bg: 'rgba(20, 184, 166, 0.08)', ic: 'category' }
    ];

    function ud() { return (window._userdata && typeof window._userdata === 'object') ? window._userdata : {}; }
    function isLogged() { return parseInt(ud().session_logged_in, 10) === 1; }
    function path() { return window.location.pathname; }
    function isHome() { return path() === '/' || path() === '/forum' || path() === '/forum/'; }

    /* --------------------- العدّادات المتحركة --------------------- */
    function runCounters(container) {
        if (!container) return;
        setTimeout(function () {
            var counters = container.querySelectorAll('.tz-counter');
            counters.forEach(function (counter) {
                if (counter.getAttribute('data-tz-done')) return;
                counter.setAttribute('data-tz-done', '1');
                var targetText = counter.getAttribute('data-target') || '0';
                var target = parseInt(String(targetText).replace(/,/g, '').trim(), 10) || 0;
                if (target === 0) { counter.innerHTML = targetText; return; }
                var duration = 2000, startTimestamp = null;
                function step(timestamp) {
                    if (!startTimestamp) startTimestamp = timestamp;
                    var progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    var easeOut = 1 - Math.pow(1 - progress, 3);
                    counter.innerHTML = Math.floor(easeOut * target).toLocaleString('en-US');
                    if (progress < 1) window.requestAnimationFrame(step);
                    else counter.innerHTML = targetText;
                }
                window.requestAnimationFrame(step);
            });
        }, 100);
    }

    /* --------------------- الشريط العلوي الأصلي --------------------- */
    function initCeilingBar() {
        try {
            var bar = document.getElementById('tzCeilingBar');
            if (!bar) return;

            /* الرابط النشط حسب المسار */
            var cur = path();
            bar.querySelectorAll('a.tz-sov-item').forEach(function (a) {
                var href = a.getAttribute('href') || '';
                var isActive = (href === '/' && (cur === '/' || cur === '/forum')) ||
                    (href.length > 1 && cur.indexOf(href) === 0);
                a.classList.toggle('is-active', isActive);
            });

            /* زر القائمة: يفتح درج أحلى منتدى الأصلي دون أي استبدال */
            var menuBtn = document.getElementById('tzMenuBtn');
            var nativeMenuBtn = document.getElementById('main-menu-btn');
            if (menuBtn && nativeMenuBtn) {
                if (!menuBtn.getAttribute('data-tz-wired')) {
                    menuBtn.setAttribute('data-tz-wired', '1');
                    menuBtn.addEventListener('click', function () {
                        nativeMenuBtn.click();
                        var drawer = document.getElementById('main-menu');
                        menuBtn.setAttribute('aria-expanded', drawer && !drawer.classList.contains('hidden') ? 'true' : 'false');
                    });
                }
            }

            /* زر الإشعارات: يفتح قائمة الإشعارات الأصلية نفسها */
            var notifBtn = document.getElementById('tzCustomNotifBtn');
            var nativeNotif = document.getElementById('header-notif');
            if (notifBtn) {
                if (isLogged() && nativeNotif) {
                    notifBtn.removeAttribute('hidden');
                    if (!notifBtn.getAttribute('data-tz-wired')) {
                        notifBtn.setAttribute('data-tz-wired', '1');
                        notifBtn.addEventListener('click', function () { nativeNotif.click(); });
                    }
                } else {
                    notifBtn.setAttribute('hidden', '');
                }
            }

            /* الصورة الرمزية واسم الحساب وشارة غير المقروء */
            var acc = bar.querySelector('.tz-btn-account .tz-avatar-slot');
            if (acc && isLogged()) {
                var av = ud().avatar_link;
                if (av && !acc.querySelector('img')) {
                    acc.innerHTML = '';
                    var img = document.createElement('img');
                    img.src = av;
                    img.alt = '';
                    img.width = 24; img.height = 24;
                    acc.appendChild(img);
                }
                var nameEl = bar.querySelector('.tz-acc-name');
                var uname = ud().username;
                if (nameEl && uname && !nameEl.getAttribute('data-tz-name')) {
                    nameEl.setAttribute('data-tz-name', '1');
                    nameEl.textContent = uname;
                }
                var unread = (window._toolbar && _toolbar.notifications && parseInt(_toolbar.notifications.unread, 10)) || 0;
                var badge = bar.querySelector('.tz-n-badge');
                if (badge && notifBtn) {
                    if (unread > 0) { badge.textContent = unread; badge.removeAttribute('hidden'); notifBtn.classList.add('has-unread'); }
                    else { badge.setAttribute('hidden', ''); notifBtn.classList.remove('has-unread'); }
                }
            }

            /* زر المظهر في الشريط: نفس آلية كوكي أحلى منتدى الأصلية */
            var darkBtn = document.getElementById('tzDarkToggle');
            if (darkBtn && !darkBtn.getAttribute('data-tz-wired')) {
                darkBtn.setAttribute('data-tz-wired', '1');
                darkBtn.setAttribute('aria-pressed', document.documentElement.classList.contains('fa_darkmode') ? 'true' : 'false');
                darkBtn.addEventListener('click', function () {
                    var nowOn = !document.documentElement.classList.contains('fa_darkmode');
                    document.documentElement.classList.toggle('fa_darkmode', nowOn);
                    document.body.classList.toggle('fa_darkmode', nowOn);
                    document.cookie = 'fa_darkmode=' + (nowOn ? '1' : '0') + ';path=/;max-age=31536000';
                    darkBtn.setAttribute('aria-pressed', nowOn ? 'true' : 'false');
                    var sw = document.getElementById('button-dm');
                    if (sw) sw.classList.toggle('checked', nowOn);
                });
            }
        } catch (e) { if (window.console) console.error('ZZ ui: ceiling bar', e); }
    }

    /* --------------------- ترويسة الموضوع --------------------- */
    function initTopicHeader() {
        try {
            var topicHeader = document.querySelector('.topic-header');
            if (!topicHeader || document.querySelector('.tz-topic-header-top')) return;
            var h1 = topicHeader.querySelector('h1');
            var btns = Array.prototype.slice.call(topicHeader.querySelectorAll('a.btn'));
            var breadcrumbs = document.getElementById('breadcrumbs');
            var topWrapper = document.createElement('div');
            topWrapper.className = 'tz-topic-header-top';
            var titleContainer = document.createElement('div');
            titleContainer.className = 'tz-topic-title-container';
            if (h1) {
                var bell = h1.querySelector('#push-bell');
                if (bell) bell.style.display = 'none';
                titleContainer.appendChild(h1);
            }
            var btnsContainer = document.createElement('div');
            btnsContainer.className = 'tz-topic-btns-container';
            btns.forEach(function (btn) { btnsContainer.appendChild(btn); });
            topWrapper.appendChild(titleContainer);
            topWrapper.appendChild(btnsContainer);
            topicHeader.innerHTML = '';
            topicHeader.appendChild(topWrapper);
            if (breadcrumbs) topicHeader.appendChild(breadcrumbs);
        } catch (e) { if (window.console) console.error('ZZ ui: topic header', e); }
    }

    /* --------------------- بوابة الهيرو + الرادار --------------------- */
    function initHeroPortal() {
        try {
            if (!HERO_ON_HOME || !isHome()) return;
            var wrapEl = document.getElementById('wrap');
            if (!wrapEl || document.getElementById('tzVirginPortal')) return;

            var siteName = (document.querySelector('#logo-text h1') || {}).textContent ||
                (document.title || '').trim() || 'المنتدى';
            var siteDesc = (document.querySelector('#header-banner h2') || {}).textContent || '';

            var btn1 = isLogged()
                ? '<a href="/search?search_id=egosearch" class="tz-btn tz-btn-primary"><i class="material-symbols-outlined">manage_accounts</i> مشاركاتي</a>'
                : '<a href="/register" class="tz-btn tz-btn-primary"><i class="material-symbols-outlined">person_add</i> حساب جديد</a>';

            var portalDiv = document.createElement('div');
            portalDiv.id = 'tzVirginPortal';
            portalDiv.className = 'tz-virgin-portal';
            portalDiv.innerHTML =
                '<div class="tz-portal-flex">' +
                    '<div class="tz-hero-box">' +
                        '<span class="tz-pill">COMMUNITY PORTAL</span>' +
                        '<h1 class="tz-hero-title"></h1>' +
                        '<p class="tz-hero-desc"></p>' +
                        '<div class="tz-actions">' + btn1 +
                            '<a href="/search?search_id=newposts" class="tz-btn tz-btn-secondary"><i class="material-symbols-outlined">explore</i> أحدث المواضيع</a>' +
                        '</div>' +
                    '</div>' +
                    '<div class="tz-slider-box" id="tzSliderBoxWrapper">' +
                        '<div class="tz-slider-header">' +
                            '<h3 class="tz-slider-title"><i class="material-symbols-outlined">campaign</i> رادار المستجدات</h3>' +
                            '<div class="tz-slider-controls">' +
                                '<button id="tzArrRight" type="button" title="الموضوع السابق"><i class="material-symbols-outlined" style="font-size:14px;">chevron_right</i></button>' +
                                '<button id="tzArrLeft" type="button" title="الموضوع التالي"><i class="material-symbols-outlined" style="font-size:14px;">chevron_left</i></button>' +
                            '</div>' +
                        '</div>' +
                        '<div id="tzSlideArea" class="tz-slide-content">' +
                            '<div class="tz-slide-top-row"><span class="tz-forum-badge"><i class="material-symbols-outlined" style="font-size:12px;">folder</i> جارِ المزامنة...</span><div class="tz-slide-author">بواسطة: <span>النظام</span></div></div>' +
                            '<a href="#" class="tz-slide-text" style="pointer-events: none;">جارِ جلب أحدث المواضيع...</a>' +
                            '<div class="tz-slide-meta"><i class="material-symbols-outlined" style="font-size:12px;">schedule</i><span>التاريخ: الآن</span></div>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            /* العنوان والوصف من بيانات المنصة الأصلية نفسها */
            portalDiv.querySelector('.tz-hero-title').textContent = siteName;
            if (siteDesc) portalDiv.querySelector('.tz-hero-desc').textContent = siteDesc;
            else portalDiv.querySelector('.tz-hero-desc').style.display = 'none';

            wrapEl.insertBefore(portalDiv, wrapEl.firstChild);

            /* شريط إعلان إداري (اختياري عبر ZZ_CONFIG.adminNotice) */
            var notice = CFG.adminNotice;
            if (notice && notice.text) {
                var noticeDiv = document.createElement('div');
                noticeDiv.id = 'tzAdminNotice';
                noticeDiv.className = 'tz-admin-notice';
                var txt = document.createElement('span');
                txt.className = 'tz-notice-text';
                txt.innerHTML = '<i class="material-symbols-outlined">notifications_active</i> ';
                txt.appendChild(document.createTextNode(notice.text));
                noticeDiv.appendChild(txt);
                if (notice.link && notice.label) {
                    var a = document.createElement('a');
                    a.className = 'tz-notice-btn';
                    a.href = notice.link;
                    a.textContent = notice.label;
                    noticeDiv.appendChild(a);
                }
                portalDiv.after(noticeDiv);
            }

            /* رادار المستجدات: يقرأ صفحة /latest الأصلية نفسها */
            var radarTopics = [], currentNewsIndex = 0, autoTimer = null;
            var slideContainer = document.getElementById('tzSlideArea');
            var sliderBox = document.getElementById('tzSliderBoxWrapper');

            function renderRadarItem(index) {
                if (!slideContainer || !radarTopics[index]) return;
                var item = radarTopics[index];
                var MAX_TITLE_LENGTH = 55;
                var displayTitle = item.title.length > MAX_TITLE_LENGTH ? item.title.substring(0, MAX_TITLE_LENGTH) + '...' : item.title;
                slideContainer.style.opacity = '0';
                setTimeout(function () {
                    slideContainer.innerHTML =
                        '<div class="tz-slide-top-row">' +
                            '<span class="tz-forum-badge" title=""><i class="material-symbols-outlined" style="font-size:12px;">folder_open</i>&nbsp;القسم: <span class="tz-slide-forum"></span></span>' +
                            '<div class="tz-slide-author">بواسطة: <span class="tz-slide-author-name"></span></div>' +
                        '</div>' +
                        '<a href="#" class="tz-slide-text"></a>' +
                        '<div class="tz-slide-meta"><i class="material-symbols-outlined" style="font-size:12px;">history</i><span>التاريخ: <span class="tz-slide-time"></span></span></div>';
                    /* نصوص آمنة عبر textContent (حماية من أي محتوى غير موثوق) */
                    slideContainer.querySelector('.tz-slide-forum').textContent = item.forumName || 'القسم العام';
                    var authorSpan = slideContainer.querySelector('.tz-slide-author-name');
                    if (item.authorNode) authorSpan.appendChild(item.authorNode);
                    else authorSpan.textContent = item.authorName || 'عضو';
                    var linkEl = slideContainer.querySelector('.tz-slide-text');
                    linkEl.href = item.link || '#';
                    linkEl.textContent = displayTitle;
                    slideContainer.querySelector('.tz-slide-time').textContent = item.time || 'اليوم';
                    slideContainer.style.opacity = '1';
                }, 200);
            }

            function startAutoRadar() {
                if (radarTopics.length === 0) return;
                if (autoTimer) clearInterval(autoTimer);
                autoTimer = setInterval(function () {
                    currentNewsIndex = (currentNewsIndex + 1) % radarTopics.length;
                    renderRadarItem(currentNewsIndex);
                }, 4000);
            }

            if (sliderBox) {
                sliderBox.addEventListener('mouseenter', function () { if (autoTimer) clearInterval(autoTimer); });
                sliderBox.addEventListener('mouseleave', startAutoRadar);
            }

            fetch(RADAR_SOURCE, { credentials: 'same-origin' })
                .then(function (res) { if (!res.ok) throw new Error('radar http ' + res.status); return res.text(); })
                .then(function (htmlString) {
                    var doc = new DOMParser().parseFromString(htmlString, 'text/html');
                    doc.querySelectorAll('.block-topics').forEach(function (row) {
                        if (radarTopics.length >= RADAR_MAX) return;
                        var titleEl = row.querySelector('.block-topics-details h2 a.topictitle');
                        if (!titleEl) return;
                        var catEl = row.querySelector('.block-topics-category');
                        var authorEl = row.querySelector('.block-topics-author a');
                        var lastpost = row.querySelector('.block-topics-lastpost');
                        var timeTxt = lastpost ? lastpost.textContent.split(',')[1] : '';
                        radarTopics.push({
                            title: titleEl.textContent.trim(),
                            link: titleEl.getAttribute('href'),
                            authorName: authorEl ? authorEl.textContent.trim() : '',
                            authorNode: authorEl ? authorEl.cloneNode(true) : null,
                            forumName: catEl ? catEl.textContent.trim() : 'القسم العام',
                            time: (timeTxt || 'اليوم').trim() || 'اليوم'
                        });
                    });
                })
                .catch(function () { })
                .then(function () {
                    if (radarTopics.length === 0) {
                        radarTopics = [{ title: 'لا توجد مواضيع جديدة حالياً.', link: '#', authorName: 'النظام', forumName: 'تنبيه', time: 'الآن' }];
                    }
                    renderRadarItem(0);
                    startAutoRadar();
                });

            document.getElementById('tzArrRight') && document.getElementById('tzArrRight').addEventListener('click', function () {
                if (radarTopics.length === 0) return;
                currentNewsIndex = (currentNewsIndex - 1 + radarTopics.length) % radarTopics.length;
                renderRadarItem(currentNewsIndex);
            });
            document.getElementById('tzArrLeft') && document.getElementById('tzArrLeft').addEventListener('click', function () {
                if (radarTopics.length === 0) return;
                currentNewsIndex = (currentNewsIndex + 1) % radarTopics.length;
                renderRadarItem(currentNewsIndex);
            });
        } catch (e) { if (window.console) console.error('ZZ ui: hero portal', e); }
    }

    /* --------------------- لوحة إحصائيات المتصلين --------------------- */
    function initOnlineDashboard() {
        try {
            var onlineBlock = document.getElementById('block-online');
            if (!onlineBlock || onlineBlock.classList.contains('tz-dashboard-injected')) return;
            var htmlContent = onlineBlock.innerHTML;
            var totalMatch = htmlContent.match(/ككل هناك.*?<strong>(\d+)<\/strong>/) || [0, 0];
            var breakdownMatch = htmlContent.match(/(\d+)\s*أعضاء?.*?(\d+)\s*عُضو مُختفي.*?(\d+)\s*زائر/) || [0, 0, 0, 0];
            var maxMatch = htmlContent.match(/كان\s*<strong>(\d+)<\/strong>\s*بتاريخ\s*(.*?)(?:<br|$)/) || [0, 0, ''];
            var stats = {
                total: parseInt(totalMatch[1], 10) || 0,
                members: parseInt(breakdownMatch[1], 10) || 0,
                hidden: parseInt(breakdownMatch[2], 10) || 0,
                guests: parseInt(breakdownMatch[3], 10) || 0,
                maxNum: parseInt(maxMatch[1], 10) || 0,
                maxDate: maxMatch[2] || 'غير متوفر'
            };

            function formatUserLinks(htmlFragment) {
                if (!htmlFragment) return '';
                var temp = document.createElement('div');
                temp.innerHTML = htmlFragment;
                return Array.from(temp.querySelectorAll('a')).map(function (a) { return a.outerHTML; }).join('');
            }
            var currentOnlineMatch = htmlContent.match(/الأعضاء المتواجدون في المنتدى:\s*(.*?)(?:<br|<div)/);
            var past192Match = htmlContent.match(/192 ساعة الماضية\.\s*(.*?)(?:<br|<div)/);
            var currentUsersList = currentOnlineMatch ? formatUserLinks(currentOnlineMatch[1]) : '';
            var past192UsersList = past192Match ? formatUserLinks(past192Match[1]) : '';
            var bdays = htmlContent.indexOf('لا احد يحتفل اليوم بعيد ميلاده') > -1 ? 'لا يوجد أعياد ميلاد اليوم.' : '';

            var legendHtml = '';
            onlineBlock.querySelectorAll('em').forEach(function (em) {
                if (em.textContent.indexOf('المفتاح') > -1 || em.innerHTML.indexOf('&nbsp;:&nbsp;') > -1) {
                    var bTags = Array.prototype.slice.call(em.querySelectorAll('b'));
                    legendHtml = bTags.map(function (b) {
                        var a = b.querySelector('a');
                        if (a && a.style.color) b.setAttribute('style', '--grp-color: ' + a.style.color + ';');
                        else b.setAttribute('style', '--grp-color: var(--tz-primary);');
                        return b.outerHTML;
                    }).join('');
                }
            });

            onlineBlock.classList.add('tz-dashboard-injected');
            onlineBlock.innerHTML = '';
            var dashboard = document.createElement('div');
            dashboard.className = 'tz-dashboard-wrapper';
            dashboard.innerHTML =
                '<div class="tz-dash-header">' +
                    '<h3 class="tz-dash-title"><i class="material-symbols-outlined">radar</i><a href="/viewonline" rel="nofollow">الإحصائيات</a></h3>' +
                    '<div class="tz-record-text"><i class="material-symbols-outlined" style="font-size:18px;">emoji_events</i><span>أعلى تواجد: <strong class="tz-counter" data-target="' + stats.maxNum + '">0</strong> بتاريخ <span class="tz-max-date"></span></span></div>' +
                '</div>' +
                '<div class="tz-dash-grid">' +
                    '<div class="tz-dash-counter-card card-total"><div class="dash-card-header"><i class="material-symbols-outlined">monitoring</i><span class="tz-counter-label">إجمالي التواجد</span></div><span class="tz-counter-num tz-counter" data-target="' + stats.total + '">0</span></div>' +
                    '<div class="tz-dash-counter-card card-members"><div class="dash-card-header"><i class="material-symbols-outlined">groups</i><span class="tz-counter-label">الأعضاء</span></div><span class="tz-counter-num tz-counter" data-target="' + stats.members + '">0</span></div>' +
                    '<div class="tz-dash-counter-card card-hidden"><div class="dash-card-header"><i class="material-symbols-outlined">visibility_off</i><span class="tz-counter-label">المخفيون</span></div><span class="tz-counter-num tz-counter" data-target="' + stats.hidden + '">0</span></div>' +
                    '<div class="tz-dash-counter-card card-guests"><div class="dash-card-header"><i class="material-symbols-outlined">person_outline</i><span class="tz-counter-label">الزوار</span></div><span class="tz-counter-num tz-counter" data-target="' + stats.guests + '">0</span></div>' +
                '</div>' +
                (currentUsersList ? '<div class="tz-dash-users-title"><i class="material-symbols-outlined">how_to_reg</i> الأعضاء المتواجدون حالياً:</div><div class="tz-dash-users-list">' + currentUsersList + '</div>' : '') +
                (past192UsersList ? '<div class="tz-dash-users-title"><i class="material-symbols-outlined">history</i> أعضاء تواجدوا خلال 192 ساعة الماضية:</div><div class="tz-dash-users-list tz-past-users">' + past192UsersList + '</div>' : '') +
                '<div class="tz-dash-footer">' +
                    (bdays ? '<span><i class="material-symbols-outlined" style="font-size:16px;vertical-align:middle;">cake</i> <span class="tz-bdays"></span></span>' : '') +
                    (legendHtml ? '<div class="tz-legend-wrapper"><div class="tz-legend-title"><i class="material-symbols-outlined">vpn_key</i> <strong>المفتاح:</strong></div><div class="tz-legend-grid">' + legendHtml + '</div></div>' : '') +
                '</div>';
            /* نصوص مُمرَّرة عبر textContent للأمان */
            var maxDateEl = dashboard.querySelector('.tz-max-date');
            if (maxDateEl) maxDateEl.textContent = stats.maxDate;
            var bdaysEl = dashboard.querySelector('.tz-bdays');
            if (bdaysEl) bdaysEl.textContent = bdays;

            onlineBlock.appendChild(dashboard);
            runCounters(dashboard);
        } catch (e) { if (window.console) console.error('ZZ ui: online dashboard', e); }
    }

    /* --------------------- بطاقات إحصائيات الفوتر --------------------- */
    function initFooterStats() {
        try {
            var statsContainer = document.getElementById('forum-statistics');
            if (!statsContainer || document.getElementById('tz-custom-stats')) return;
            var contributions = '0', members = '0', newestMemberHTML = '<b>عضو</b>';
            var mainDivs = statsContainer.querySelectorAll(':scope > div');
            if (mainDivs.length >= 3) {
                var postsText = mainDivs[0].textContent || '';
                var postsMatch = postsText.match(/\d+(?:,\d+)*/);
                if (postsMatch) contributions = postsMatch[0];
                var usersText = mainDivs[1].textContent || '';
                var usersMatch = usersText.match(/\d+(?:,\d+)*/);
                if (usersMatch) members = usersMatch[0];
                var userLink = mainDivs[2].querySelector('a');
                if (userLink) newestMemberHTML = userLink.outerHTML;
                else {
                    var highlight = mainDivs[2].querySelector('strong, b, span');
                    if (highlight) newestMemberHTML = highlight.outerHTML;
                    else {
                        var rawText = (mainDivs[2].textContent || '').replace(/.*(?:هو|:|is)\s*/i, '').trim();
                        newestMemberHTML = '<b></b>';
                    }
                }
            }
            var newStatsGrid = document.createElement('div');
            newStatsGrid.id = 'tz-custom-stats';
            newStatsGrid.innerHTML =
                '<div class="tz-stat-card"><div class="tz-stat-icon blue"><i class="material-symbols-outlined">forum</i></div><div class="tz-stat-info"><span>المساهمات والمواضيع</span><strong class="tz-counter" data-target="' + contributions + '">0</strong></div></div>' +
                '<div class="tz-stat-card"><div class="tz-stat-icon purple"><i class="material-symbols-outlined">group</i></div><div class="tz-stat-info"><span>الأعضاء المسجلين</span><strong class="tz-counter" data-target="' + members + '">0</strong></div></div>' +
                '<div class="tz-stat-card"><div class="tz-stat-icon cyan"><i class="material-symbols-outlined">person_add</i></div><div class="tz-stat-info"><span>أحدث عضو انضم إلينا</span><strong class="tz-newest"></strong></div></div>';
            var newestSlot = newStatsGrid.querySelector('.tz-newest');
            if (newestSlot) newestSlot.innerHTML = newestMemberHTML;
            statsContainer.classList.add('tz-stats-hidden');
            statsContainer.before(newStatsGrid);
            runCounters(newStatsGrid);
        } catch (e) { if (window.console) console.error('ZZ ui: footer stats', e); }
    }

    /* --------------------- تلوين الأقسام + الأقسام الفرعية --------------------- */
    function initForums() {
        try {
            document.querySelectorAll('.forum.type-table-forum, .forum.type-table-classified, .block-topics').forEach(function (forum, index) {
                if (forum.getAttribute('data-tz-colored')) return;
                forum.setAttribute('data-tz-colored', '1');
                var color = COUNTER_COLORS[index % COUNTER_COLORS.length];
                forum.style.setProperty('--f-color', color.hex);
                forum.style.setProperty('--f-rgb', color.rgb);
                var catIcon = forum.querySelector('.category-title i');
                var iconWrapper = forum.querySelector('.forum-icon');
                if (catIcon && catIcon.textContent.trim().length <= 25) {
                    var iconName = CAT_ICONS[index % CAT_ICONS.length];
                    catIcon.textContent = iconName;
                }
                if (iconWrapper && catIcon) iconWrapper.title = 'قسم ' + catIcon.textContent;
            });

            document.querySelectorAll('.block-topics .block-content').forEach(function (forum, index) {
                if (forum.getAttribute('data-tz-colored')) return;
                forum.setAttribute('data-tz-colored', '1');
                var color = COUNTER_COLORS[index % COUNTER_COLORS.length];
                forum.style.setProperty('--f-color', color.hex);
                forum.style.setProperty('--f-rgb', color.rgb);
            });

            document.querySelectorAll('.forum-description').forEach(function (desc) {
                if (desc.querySelector('.tz-subforums-wrapper')) return;
                var subForums = Array.from(desc.querySelectorAll(':scope > a.gensmall'));
                if (subForums.length === 0) return;
                Array.from(desc.childNodes).forEach(function (node) {
                    if (node.nodeType === 3 && node.textContent.trim() === ',') node.remove();
                });
                var wrapper = document.createElement('div');
                wrapper.className = 'tz-subforums-wrapper';
                var titleBox = document.createElement('div');
                titleBox.className = 'tz-subforums-title';
                titleBox.textContent = 'الأقسام الفرعية:';
                var grid = document.createElement('div');
                grid.className = 'tz-subforums-grid';
                subForums.forEach(function (sf, index) {
                    var link = document.createElement('a');
                    link.href = sf.href;
                    link.className = 'tz-subforum-item';
                    var style = SF_STYLES[index % SF_STYLES.length];
                    link.style.setProperty('--sf-color', style.c);
                    link.style.setProperty('--sf-bg', style.bg);
                    var icon = document.createElement('span');
                    icon.className = 'tz-sf-icon';
                    icon.style.cssText = 'background: ' + style.bg + ';border: 1px solid ' + style.c + '40; margin-left: 10px;';
                    icon.innerHTML = '<i class="material-symbols-outlined" style="color: ' + style.c + ';">' + style.ic + '</i>';
                    var txt = document.createElement('span');
                    txt.className = 'tz-sf-text';
                    txt.style.cssText = 'color: var(--tz-text-main); flex: 1;text-align: right;';
                    txt.textContent = sf.textContent.trim();
                    link.appendChild(icon);
                    link.appendChild(txt);
                    grid.appendChild(link);
                    sf.remove();
                });
                wrapper.appendChild(titleBox);
                wrapper.appendChild(grid);
                desc.appendChild(wrapper);
            });

            document.querySelectorAll('.post-signature').forEach(function (sig) {
                if (sig.querySelector('.tz-sig-badge')) return;
                var badge = document.createElement('div');
                badge.className = 'tz-sig-badge';
                badge.innerHTML = '<i class="material-symbols-outlined">format_quote</i> التوقيع';
                sig.insertBefore(badge, sig.firstChild);
            });

            document.querySelectorAll('.topic-title[title], .topictitle[title]').forEach(function (el) {
                el.setAttribute('data-tz-title', el.getAttribute('title'));
                el.removeAttribute('title');
            });

            /* تنظيف مقتطفات قوائم الأقسام من بيانات روابط التحميل الخام
               (تُترك عمدًا داخل المواضيع لسكربت «روابط التحميل»، لكنها
               تظهر كنص خام في المقتطفات المختصرة للقوائم) */
            var DL_RE = /(div\s*class\s*=\s*["']?dl-raw-data[\s\S]*?$|DL_TYPE:\S*|DL_LINK_TYPE:\S*|DL_LINK:\S*|DL_IMG:\S*)/g;
            document.querySelectorAll('.forum-section, .posts-section, .block-blogrow, .block-topics').forEach(function (row) {
                if (row.getAttribute('data-tz-dl-clean')) return;
                row.setAttribute('data-tz-dl-clean', '1');
                var walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT, null, false);
                var nodes = [];
                while (walker.nextNode()) nodes.push(walker.currentNode);
                nodes.forEach(function (node) {
                    if (node.nodeValue.indexOf('DL_LINK') > -1 || node.nodeValue.indexOf('dl-raw-data') > -1 || node.nodeValue.indexOf('DL_TYPE') > -1) {
                        node.nodeValue = node.nodeValue.replace(DL_RE, '').replace(/\s+/g, ' ').trim();
                    }
                });
            });
        } catch (e) { if (window.console) console.error('ZZ ui: forums', e); }
    }

    /* --------------------- أعمدة الفوتر من بيانات أصلية --------------------- */
    function fetchDoc(url) {
        return fetch(url, { credentials: 'same-origin' })
            .then(function (res) { if (!res.ok) throw new Error('http ' + res.status); return res.text(); })
            .then(function (t) { return new DOMParser().parseFromString(t, 'text/html'); });
    }

    function parseLatest(doc, limit) {
        var out = [];
        doc.querySelectorAll('.block-topics').forEach(function (row) {
            if (out.length >= limit) return;
            var a = row.querySelector('.block-topics-details h2 a.topictitle');
            if (!a) return;
            var author = row.querySelector('.block-topics-author a');
            var cat = row.querySelector('.block-topics-category');
            out.push({
                title: a.textContent.trim(),
                link: a.getAttribute('href'),
                author: author ? author.textContent.trim() : '',
                forum: cat ? cat.textContent.trim() : ''
            });
        });
        return out;
    }

    function parseMembers(doc, limit) {
        var out = [];
        doc.querySelectorAll('.member-block').forEach(function (row) {
            if (out.length >= limit) return;
            var a = row.querySelector('.member-header a[href^="/u"], a[href^="/u"]');
            if (!a) return;
            var img = row.querySelector('.avatar-default img, .avatar-mini img, img');
            var stats = row.textContent.match(/(\d+)\s*(?:مساهم|مشارك)/);
            out.push({
                name: a.textContent.trim(),
                link: a.getAttribute('href'),
                avatar: img ? img.getAttribute('src') : '',
                meta: stats ? stats[1] + ' مساهمة' : ''
            });
        });
        return out;
    }

    function buildFooterCols() {
        try {
            var footer = document.getElementById('page-footer');
            if (!footer || !FOOTER_COLS || document.getElementById('tzFooterCols')) return;
            /* إذا كانت ويجدتات الفوتر الأصلية مفعّلة نتركها وحدها (لا تكرار) */
            if (document.querySelector('.footer_widgets')) return;
            var host = document.createElement('div');
            host.className = 'wrap';
            host.id = 'tzFooterCols';
            host.innerHTML =
                '<div class="tz-footer-cols">' +
                    '<div class="tz-footer-col"><h3 class="tz-footer-col-title"><i class="material-symbols-outlined">schedule</i> آخر المواضيع</h3><div class="tz-footer-col-body" data-col="latest"><div class="tz-footer-empty">جارِ التحميل...</div></div></div>' +
                    '<div class="tz-footer-col"><h3 class="tz-footer-col-title"><i class="material-symbols-outlined">leaderboard</i> الأكثر مشاركة</h3><div class="tz-footer-col-body" data-col="top"><div class="tz-footer-empty">جارِ التحميل...</div></div></div>' +
                    '<div class="tz-footer-col"><h3 class="tz-footer-col-title"><i class="material-symbols-outlined">group_add</i> آخر الأعضاء</h3><div class="tz-footer-col-body" data-col="new"><div class="tz-footer-empty">جارِ التحميل...</div></div></div>' +
                '</div>';
            footer.insertBefore(host, footer.firstChild);

            var CACHE_KEY = 'zz_footer_cols_v1';
            var data = null;
            try {
                var raw = sessionStorage.getItem(CACHE_KEY);
                if (raw) {
                    var parsed = JSON.parse(raw);
                    if (parsed && parsed.ts && (Date.now() - parsed.ts) < FOOTER_TTL) data = parsed.data;
                }
            } catch (e) { }

            function fill(col, items, mode) {
                var body = host.querySelector('[data-col="' + col + '"]');
                if (!body) return;
                if (!items || items.length === 0) {
                    body.innerHTML = '<div class="tz-footer-empty">لا تتوفر بيانات حالياً</div>';
                    return;
                }
                body.innerHTML = '';
                items.forEach(function (it) {
                    var a = document.createElement('a');
                    a.className = 'tz-footer-item';
                    a.href = it.link || '#';
                    if (mode === 'topic') {
                        a.innerHTML = '<span class="tz-fi-icon"><i class="material-symbols-outlined">chat_bubble_outline</i></span>';
                        var t = document.createElement('span');
                        t.className = 'tz-fi-text';
                        t.textContent = it.title;
                        a.appendChild(t);
                        var m = document.createElement('span');
                        m.className = 'tz-fi-meta';
                        m.textContent = it.author || it.forum || '';
                        a.appendChild(m);
                    } else {
                        if (it.avatar) {
                            var im = document.createElement('img');
                            im.src = it.avatar;
                            im.alt = '';
                            im.loading = 'lazy';
                            a.appendChild(im);
                        } else {
                            var ic = document.createElement('span');
                            ic.className = 'tz-fi-icon';
                            ic.innerHTML = '<i class="material-symbols-outlined">person</i>';
                            a.appendChild(ic);
                        }
                        var n = document.createElement('span');
                        n.className = 'tz-fi-text';
                        n.textContent = it.name;
                        a.appendChild(n);
                        if (it.meta) {
                            var mm = document.createElement('span');
                            mm.className = 'tz-fi-meta';
                            mm.textContent = it.meta;
                            a.appendChild(mm);
                        }
                    }
                    body.appendChild(a);
                });
            }

            if (data) {
                fill('latest', data.latest, 'topic');
                fill('top', data.top, 'member');
                fill('new', data.newMembers, 'member');
                return;
            }

            var latestP = fetchDoc('/latest').then(function (d) { return parseLatest(d, 6); }).catch(function () { return []; });
            var topP = fetchDoc('/memberlist?mode=post_count&order=DESC').then(function (d) { return parseMembers(d, 5); }).catch(function () { return []; });
            var newP = fetchDoc('/memberlist?mode=joined&order=DESC').then(function (d) { return parseMembers(d, 5); }).catch(function () { return []; });

            Promise.all([latestP, topP, newP]).then(function (r) {
                fill('latest', r[0], 'topic');
                fill('top', r[1], 'member');
                fill('new', r[2], 'member');
                try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: { latest: r[0], top: r[1], newMembers: r[2] } })); } catch (e) { }
            });
        } catch (e) { if (window.console) console.error('ZZ ui: footer cols', e); }
    }

    /* --------------------- توقيع المنصة أسفل الفوتر --------------------- */
    function initFooterSignature() {
        try {
            var footerLinks = document.querySelector('#page-footer .navbar');
            if (!footerLinks || document.getElementById('tz-signature')) return;
            var siteName = (document.querySelector('#logo-text h1') || {}).textContent || '';
            var sig = document.createElement('div');
            sig.id = 'tz-signature';
            sig.className = 'tz-footer-sig';
            sig.textContent = (siteName || 'Z-ZONE PLATFORM') + ' © 2026';
            footerLinks.appendChild(sig);
        } catch (e) { }
    }

    /* --------------------- نقطة التشغيل --------------------- */
    function initAll() {
        initCeilingBar();
        initTopicHeader();
        initHeroPortal();
        initOnlineDashboard();
        initFooterStats();
        initForums();
        buildFooterCols();
        initFooterSignature();
    }

    document.addEventListener('zz:page:swapped', function () {
        /* بعد التنقل الديناميكي: إعادة تشغيل التحسينات على المحتوى الجديد */
        setTimeout(initAll, 30);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    /* فحص متأخر لعناصر تُحمَّل ديناميكيًا (مثل بطاقات الفوتر البطيئة) */
    setTimeout(initAll, 1500);
})();
