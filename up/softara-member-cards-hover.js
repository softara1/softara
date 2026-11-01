/* ============================================================
   بطاقات الأعضاء عند التمرير + الغلاف والخلفية - سوفتارا
   (صفحة جافاسكربت من لوحة التحكم - تعمل على جميع الصفحات)
   ------------------------------------------------------------
   الإصدار 2 - إصلاحات:
   1) مفاتيح كاش جديدة (v2) لتجاهل الكاش الأسبوعي المسمّم الذي كان
      يعرض نفس الصورة القديمة لكل الأعضاء.
   2) كشف الصورة الافتراضية (pp-blank-thumb / empty / no_avatar)
      وعرض شعار "س" المتحرك بدلها.
   3) منتقيات مرتبة حسب الأولوية: صورة الملف الشخصي أولاً، والبحث
      العام يستبعد صور الهيدر والقوائم وشريط الأدوات.
   4) تنسيق البطاقة الكامل مدمج داخل الملف (لم يكن موجوداً في أي
      ملف، فكانت البطاقة تظهر بلا تنسيق ولا تموضع).
   5) إظهار البطاقة بلوحة المفاتيح (focus) وإغلاقها بزر Escape.
   ============================================================ */
jQuery(document).ready(function ($) {
    'use strict';

    /* ---------- 1) تنسيق البطاقة والشعار (حقن مرة واحدة) ---------- */
    if (!document.getElementById('flx-softara-cards-css')) {
        var cardsCss = document.createElement('style');
        cardsCss.id = 'flx-softara-cards-css';
        cardsCss.textContent = [
            '/* بطاقة العضو عند التمرير - سوفتارا */',
            '#custom-hover-card{position:fixed;z-index:99999;width:300px;max-width:calc(100vw - 20px);background:var(--card-bg,#ffffff);border:1px solid var(--border-color,#e5e7eb);border-radius:14px;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,.25);display:none;direction:rtl;text-align:right;font-family:inherit;}',
            '#custom-hover-card .chc-cover{height:90px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);background-size:cover;background-position:center;}',
            '#custom-hover-card .chc-body{display:flex;gap:12px;padding:12px;align-items:flex-start;}',
            '#custom-hover-card .chc-avatar{width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid var(--card-bg,#ffffff);box-shadow:0 2px 8px rgba(0,0,0,.2);flex-shrink:0;margin-top:-44px;background:#e5e7eb;}',
            '#custom-hover-card .chc-info{flex:1;min-width:0;}',
            '#custom-hover-card .chc-name{margin:0 0 2px 0;font-size:1rem;font-weight:800;color:var(--text-color,#1f2937);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
            '#custom-hover-card .chc-rank{display:inline-flex;align-items:center;gap:4px;font-size:.8rem;color:var(--text-muted,#6b7280);}',
            '#custom-hover-card .chc-actions{margin-top:8px;}',
            '#custom-hover-card .chc-profile-link{display:inline-block;background:var(--primary-color,#8b5cf6);color:#fff;font-size:.8rem;font-weight:700;padding:6px 14px;border-radius:20px;text-decoration:none;transition:opacity .2s;}',
            '#custom-hover-card .chc-profile-link:hover{opacity:.85;}',
            '/* شعار سوفتارا المتحرك (CSS خالص - بدون صور) للأعضاء بدون صورة شخصية */',
            '.flx-chc-logo{width:64px;height:64px;border-radius:50%;padding:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:conic-gradient(from 0deg,#8b5cf6,#06b6d4,#ec4899,#8b5cf6);animation:flxLogoSpin 3.2s linear infinite;margin-top:-44px;}',
            '.flx-chc-logo span{width:100%;height:100%;border-radius:50%;background:linear-gradient(135deg,#171a2e,#232852);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:26px;}',
            '@keyframes flxLogoSpin{to{transform:rotate(360deg)}}',
            '/* خلفية غلاف قائمة العضو في الهيدر */',
            '#profileHeaderBox{background-size:cover;background-position:center;}',
            '@media (prefers-reduced-motion: reduce){.flx-chc-logo{animation:none;}}'
        ].join('\n');
        (document.head || document.body).appendChild(cardsCss);
    }

    /* ---------- 2) أيقونات تبويبات الملف الشخصي الأصلية ---------- */
    if ($('.pro-native-tabs').length) {
        $('.pro-native-tabs li a').each(function () {
            var aText = $(this).text();
            var aHref = $(this).attr('href');
            var iconHtml = '';
            if (!aHref) { return; }
            if (aHref.indexOf('wall') !== -1) { iconHtml = '<i class="material-symbols-outlined">chat</i> '; }
            else if (aHref.indexOf('stats') !== -1) { iconHtml = '<i class="material-symbols-outlined">pie_chart</i> '; }
            else if (aHref.indexOf('friends') !== -1) { iconHtml = '<i class="material-symbols-outlined">group</i> '; }
            else if (aHref.indexOf('followers') !== -1) { iconHtml = '<i class="material-symbols-outlined">rss_feed</i> '; }
            else if (aHref.indexOf('groups') !== -1) { iconHtml = '<i class="material-symbols-outlined">style</i> '; }
            else if (aHref.indexOf('awards') !== -1) { iconHtml = '<i class="material-symbols-outlined">military_tech</i> '; }
            else if (aHref.indexOf('rpg') !== -1) { iconHtml = '<i class="material-symbols-outlined">sports_esports</i> '; }
            else if (aHref.indexOf('attachments') !== -1) { iconHtml = '<i class="material-symbols-outlined">attachment</i> '; }
            else { iconHtml = '<i class="material-symbols-outlined">person</i> '; }
            if (!$(this).find('.material-symbols-outlined').length) { $(this).html(iconHtml + aText); }
        });
    }

    /* ---------- 3) تمييز التبويب النشط ---------- */
    var currentPath = window.location.pathname;
    if ($('.pro-native-tabs').length) {
        $('.pro-native-tabs li a').each(function () {
            var tabHref = $(this).attr('href');
            if (tabHref && (currentPath === tabHref || (currentPath.indexOf('/u') === 0 && tabHref.indexOf('/u') === 0 && currentPath.length === tabHref.length))) {
                $(this).addClass('active');
            }
        });
    }

    /* ---------- 4) الغلاف وخلفية صفحة العضو ---------- */
    window.updateCoverAndBg = function () {
        var userIdMatch = currentPath.match(/\/u(\d+)/);
        var uId = userIdMatch ? userIdMatch[1] : null;
        if (!uId) { return; }
        var coverKey = 'user_cover_' + uId;
        var bgKey = 'user_bg_' + uId;
        var avatarKey = 'user_avatar_' + uId;
        var applyStyles = function (coverVal, bgVal) {
            if (coverVal && coverVal.length > 5 && coverVal.indexOf('http') !== -1) {
                $('#dynamic-cover').css('background-image', 'url(' + coverVal + ')');
            }
            if (bgVal && bgVal.length > 5 && bgVal.indexOf('http') !== -1) {
                $('body').css({
                    'background-image': 'url(' + bgVal + ')',
                    'background-size': 'cover',
                    'background-attachment': 'fixed',
                    'background-position': 'center'
                });
            }
        };
        var extractFields = function () {
            var extractedCover = '';
            var extractedBg = '';
            var extractedAvatar = '';
            $('td, th, dt, .label, .field-label, span, p, div').each(function () {
                var $el = $(this);
                if ($el.children().length > 3) { return; }
                var text = $el.text().trim();
                var isCover = text === 'الغلاف' || text.indexOf('الغلاف') !== -1;
                var isBg = text === 'الخلفية' || text.indexOf('الخلفية') !== -1;
                if (!isCover && !isBg) { return; }
                var $valContainer = $el.next('td, dd, .value, span, div');
                if ($valContainer.length === 0) { $valContainer = $el.parent().find('td, dd, .value').not($el); }
                var val = '';
                var $img = $valContainer.find('img');
                if ($img.length) { val = $img.attr('src'); }
                else {
                    var rawText = $valContainer.text();
                    var urlMatch = rawText.match(/https?:\/\/[^\s<"'\[\]]+/);
                    val = urlMatch ? urlMatch[0] : '';
                }
                val = val.replace(/\[img\]/gi, '').replace(/\[\/img\]/gi, '').trim();
                if (isCover && val) { extractedCover = val; }
                if (isBg && val) { extractedBg = val; }
            });
            var $avatarImg = $('#profile-advanced-right .avatar img, .module-avatar img, .avatar img, .main-avatar img').first();
            if ($avatarImg.length) { extractedAvatar = $avatarImg.attr('src'); }
            return { cover: extractedCover, bg: extractedBg, avatar: extractedAvatar };
        };
        var hasFields = document.body.innerText.indexOf('الغلاف') !== -1 || document.body.innerText.indexOf('الخلفية') !== -1;
        var isProfilePage = currentPath.indexOf('/u' + uId) !== -1 || currentPath.indexOf('/profile') !== -1;
        if (isProfilePage && hasFields) {
            var fields = extractFields();
            if (fields.cover || fields.bg || fields.avatar) {
                if (fields.cover) { localStorage.setItem(coverKey, fields.cover); }
                if (fields.bg) { localStorage.setItem(bgKey, fields.bg); }
                if (fields.avatar) { localStorage.setItem(avatarKey, fields.avatar); }
                applyStyles(fields.cover, fields.bg);
            }
        } else {
            var cachedCover = localStorage.getItem(coverKey);
            var cachedBg = localStorage.getItem(bgKey);
            if (cachedCover || cachedBg) { applyStyles(cachedCover, cachedBg); }
        }
    };
    window.updateCoverAndBg();

    /* ---------- 5) جلب بيانات العضو مع كاش أسبوعي (النسخة 2) ---------- */
    var SoftaraProfile = (function () {
        var CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
        var KEY_PREFIX = 'sfrc2_';
        var inflight = {};
        function lsGet(key) {
            try { return window.localStorage.getItem(key); }
            catch (eGet) { return null; }
        }
        function lsSet(key, val) {
            try { window.localStorage.setItem(key, val); }
            catch (eSet) { return; }
        }
        function parseHTML(html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            var scripts = doc.querySelectorAll('script');
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].parentNode) { scripts[i].parentNode.removeChild(scripts[i]); }
            }
            return doc;
        }
        function firstUrl(text) {
            var m = String(text || '').match(/https?:\/\/[^\s<>"']+/);
            return m ? m[0].replace(/\[img\]/gi, '').replace(/\[\/img\]/gi, '').trim() : '';
        }
        /* الصور الافتراضية للمنصة ليست صوراً حقيقية: نعيد سلسلة فارغة
           لتظهر شارة الشعار المتحرك بدل صورة فارغة. */
        function isDefaultAvatar(url) {
            var u = String(url || '').toLowerCase();
            if (!u) { return true; }
            return (u.indexOf('pp-blank-thumb') !== -1 ||
                    u.indexOf('empty.gif') !== -1 ||
                    u.indexOf('no_avatar') !== -1 ||
                    u.indexOf('default_avatar') !== -1 ||
                    u.indexOf('blank.') !== -1);
        }
        function pickProfileAvatar(doc) {
            var specific = [
                '.pro-avatar-box img',
                '#profile-advanced-avatar img',
                '#profile-advanced-right .avatar img',
                '.module-avatar img',
                '.main-avatar img'
            ];
            for (var s = 0; s < specific.length; s++) {
                var el = doc.querySelector(specific[s]);
                if (el && el.getAttribute('src')) { return el.getAttribute('src'); }
            }
            /* احتياطي أخير: أول صورة أفاتار خارج الهيدر والقوائم */
            var all = doc.querySelectorAll('img[src*="/avatars/"]');
            for (var a = 0; a < all.length; a++) {
                var img = all[a];
                var bad = false;
                try {
                    if (img.closest('header, nav, .navbar, .nav-icons, #userDropdown, #profileHeaderBox, .dropdown-panel, #fa_toolbar, #fa_toolbar_hidden')) {
                        bad = true;
                    }
                } catch (eClosest) { bad = false; }
                if (!bad && img.getAttribute('src')) { return img.getAttribute('src'); }
            }
            return '';
        }
        function extract(doc) {
            var res = { avatar: '', cover: '', name: '' };
            var rawAvatar = pickProfileAvatar(doc);
            res.avatar = isDefaultAvatar(rawAvatar) ? '' : rawAvatar;
            var nameEl = doc.querySelector('.profile-username');
            if (nameEl) { res.name = (nameEl.textContent || '').replace(/\s+/g, ' ').trim(); }
            var cover = '';
            var covEl = doc.querySelector('#dynamic-cover, .pro-cover-bg');
            if (covEl) {
                var st = covEl.getAttribute('style') || '';
                var mUrl = st.match(/url\((['"]?)([^'"]+)\1\)/);
                if (mUrl) { cover = mUrl[2]; }
            }
            if (!cover) {
                var candidates = doc.querySelectorAll('dt, .label, .field-label, th, span, p, div, b');
                for (var i = 0; i < candidates.length; i++) {
                    var el = candidates[i];
                    if (!el || !el.textContent) { continue; }
                    var txt = String(el.textContent).replace(/\s+/g, ' ').trim();
                    if (txt.indexOf('الغلاف') === -1) { continue; }
                    var val = '';
                    var valEl = el.nextElementSibling;
                    var hops = 0;
                    while (valEl && hops < 3 && !val) {
                        var img = valEl.querySelector ? valEl.querySelector('img') : null;
                        if (img && img.getAttribute('src')) { val = img.getAttribute('src'); break; }
                        val = firstUrl(valEl.textContent);
                        if (val) { break; }
                        valEl = valEl.nextElementSibling;
                        hops++;
                    }
                    if (!val && el.parentElement) {
                        var box = el.parentElement.querySelector('dd, td, .field_uneditable, .value');
                        if (box) {
                            var img2 = box.querySelector('img');
                            if (img2 && img2.getAttribute('src')) { val = img2.getAttribute('src'); }
                            else { val = firstUrl(box.textContent); }
                        }
                    }
                    if (val && val.indexOf('http') === 0) { cover = val; break; }
                }
            }
            res.cover = cover;
            return res;
        }
        function get(uId, callback) {
            var now = Date.now();
            var ts = parseInt(lsGet(KEY_PREFIX + 'ts_' + uId) || '0', 10);
            var cached = {
                avatar: lsGet(KEY_PREFIX + 'avatar_' + uId) || '',
                cover: lsGet(KEY_PREFIX + 'cover_' + uId) || '',
                name: lsGet(KEY_PREFIX + 'name_' + uId) || ''
            };
            if ((cached.avatar || cached.name) && ts && (now - ts) < CACHE_TTL) {
                callback({ avatar: cached.avatar, cover: cached.cover, name: cached.name, fromCache: true });
                return;
            }
            if (inflight[uId]) { inflight[uId].push(callback); return; }
            inflight[uId] = [callback];
            jQuery.get('/u' + uId).done(function (html) {
                var info = {};
                try { info = extract(parseHTML(html)); }
                catch (eParse) { info = { avatar: '', cover: '', name: '' }; }
                if (info.avatar) { lsSet(KEY_PREFIX + 'avatar_' + uId, info.avatar); }
                if (info.cover) { lsSet(KEY_PREFIX + 'cover_' + uId, info.cover); }
                if (info.name) { lsSet(KEY_PREFIX + 'name_' + uId, info.name); }
                lsSet(KEY_PREFIX + 'ts_' + uId, String(now));
                var queue = inflight[uId] || [];
                delete inflight[uId];
                var payload = {
                    avatar: info.avatar || cached.avatar,
                    cover: info.cover || cached.cover,
                    name: info.name || cached.name
                };
                for (var q = 0; q < queue.length; q++) {
                    try { queue[q](payload); }
                    catch (eCb) { continue; }
                }
            }).fail(function () {
                var queue = inflight[uId] || [];
                delete inflight[uId];
                for (var q = 0; q < queue.length; q++) {
                    try { queue[q](cached); }
                    catch (eCb2) { continue; }
                }
            });
        }
        return { get: get };
    })();

    /* ---------- 6) بطاقة التمرير ---------- */
    if ($('#custom-hover-card').length === 0) {
        $('body').append(
            '<div id="custom-hover-card">' +
            '<div class="chc-cover"></div>' +
            '<div class="chc-body">' +
            '<img class="chc-avatar" src="" alt="Avatar">' +
            '<div class="chc-info">' +
            '<h4 class="chc-name"></h4>' +
            '<span class="chc-rank"><i class="material-symbols-outlined" style="font-size:16px;">badge</i> عضو بالمنتدى</span>' +
            '<div class="chc-actions">' +
            '<a href="#" class="chc-profile-link">عرض الملف الشخصي</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    var $card = $('#custom-hover-card');
    var hoverTimer = null;
    var hideTimer = null;

    function chcApplyAvatar(info) {
        var img = $card.find('.chc-avatar');
        var logo = $card.find('.flx-chc-logo');
        if (info && info.avatar) {
            logo.remove();
            img.css('display', '').attr('src', info.avatar);
        } else {
            img.css('display', 'none').attr('src', '');
            if (logo.length === 0) {
                img.after('<span class="flx-chc-logo" aria-hidden="true"><span>س</span></span>');
            }
        }
    }

    function chcShow(uId, linkEl, posX, posY) {
        var fallbackName = (($(linkEl).text() || '').replace(/\s+/g, ' ').trim()) || 'عضو المنتدى';
        $card.attr('data-uid', uId);
        $card.find('.chc-name').text(fallbackName);
        $card.find('.chc-profile-link').attr('href', '/u' + uId);
        SoftaraProfile.get(uId, function (info) {
            if ($card.attr('data-uid') !== uId) { return; }
            chcApplyAvatar(info);
            if (info && info.name) { $card.find('.chc-name').text(info.name); }
            if (info && info.cover) {
                $card.find('.chc-cover').css('background-image', 'url("' + info.cover + '")');
            } else {
                $card.find('.chc-cover').css('background-image', '');
            }
            var cardWidth = $card.outerWidth() || 300;
            var cardHeight = $card.outerHeight() || 180;
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var leftPos = posX + 15;
            var topPos = posY + 15;
            if (leftPos + cardWidth > windowWidth - 10) { leftPos = posX - cardWidth - 15; }
            if (topPos + cardHeight > windowHeight - 10) { topPos = posY - cardHeight - 15; }
            if (leftPos < 8) { leftPos = 8; }
            if (topPos < 8) { topPos = 8; }
            $card.css({ top: topPos + 'px', left: leftPos + 'px', right: 'auto' }).stop(true, true).fadeIn(150);
        });
    }

    function chcSchedule(linkEl, evt) {
        var href = $(linkEl).attr('href');
        if (!href) { return; }
        var match = href.match(/\/u(\d+)/);
        if (!match) { return; }
        var uId = match[1];
        var px = evt && evt.clientX ? evt.clientX : ($(window).width() / 2);
        var py = evt && evt.clientY ? evt.clientY : 120;
        if (evt && evt.clientX === 0 && evt.clientY === 0 && linkEl.getBoundingClientRect) {
            var r = linkEl.getBoundingClientRect();
            px = r.left + r.width / 2;
            py = r.bottom;
        }
        clearTimeout(hideTimer);
        $card.stop(true, true);
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () { chcShow(uId, linkEl, px, py); }, 200);
    }

    function chcHideSoon() {
        clearTimeout(hoverTimer);
        hideTimer = setTimeout(function () {
            if (!$card.is(':hover')) { $card.stop(true, true).fadeOut(150); }
        }, 200);
    }

    $(document).on('mouseenter', 'a[href*="/u"]', function (e) { chcSchedule(this, e); });
    $(document).on('mouseleave', 'a[href*="/u"]', function () { chcHideSoon(); });
    $(document).on('focus', 'a[href*="/u"]', function () {
        var r = this.getBoundingClientRect ? this.getBoundingClientRect() : null;
        var fakeEvt = r ? { clientX: r.left + r.width / 2, clientY: r.bottom } : null;
        chcSchedule(this, fakeEvt);
    });
    $(document).on('blur', 'a[href*="/u"]', function () { chcHideSoon(); });
    $card.on('mouseleave', function () { $card.stop(true, true).fadeOut(150); });
    $(window).on('scroll', function () {
        clearTimeout(hoverTimer);
        $card.stop(true, true).fadeOut(120);
    });
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            clearTimeout(hoverTimer);
            $card.stop(true, true).fadeOut(120);
        }
    });

    /* ---------- 7) غلاف قائمة العضو في الهيدر ---------- */
    function applyDropdownCover() {
        var linkEl = document.getElementById('customProfileLink');
        var href = linkEl ? (linkEl.getAttribute('href') || '') : '';
        var match = href.match(/\/u(\d+)/);
        if (!match) { return; }
        SoftaraProfile.get(match[1], function (info) {
            var box = document.getElementById('profileHeaderBox');
            if (box && info && info.cover) {
                box.style.backgroundImage = 'linear-gradient(to top, rgba(10,14,30,.88) 0%, rgba(10,14,30,.45) 45%, rgba(10,14,30,.55) 100%), ' + 'url("' + info.cover + '")';
            }
            if (info && info.avatar) {
                var av = document.getElementById('customUserAvatarLarge');
                if (av && av.src !== info.avatar) { av.src = info.avatar; }
            }
        });
    }
    $(document).on('click', '[onclick*="userDropdown"]', function () { applyDropdownCover(); });
    setTimeout(applyDropdownCover, 1200);
});