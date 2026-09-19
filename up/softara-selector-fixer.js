/* ============================================================
   سوفتارا — مُصحّح المحددات المعطوبة في /99720.js
   ============================================================
   الخطأ #5: منصة Forumotion تجمع الـ <script> المضمّنة في القوالب
   في ملف /99720.js. بعض القوالب القديمة تستخدم محددات معطوبة:
     - 'aref*="/u"]'  بدل  'a[href*="/u"]'
     - 'linkref*="Material+Symbols+Outlined"]'  بدل  'link[href*="Material+Symbols+Outlined"]'
     - 'linkref*="Alexandria"]'  بدل  'link[href*="Alexandria"]'

   الأثر العملي:
     - بطاقة العضو عند التمرير (#custom-hover-card) لا تظهر أبداً.
     - محاولة querySelector('linkref*=...') ترمي SyntaxError في الـ Console.

   الحل:
     نُعيد تعريف دالة chcSchedule ونربطها يدوياً بـ mouseenter/mouseleave
     على كل روابط /u* بعد تحميل الصفحة، متجاوزين الكود المعطوب في 99720.js.

   يُحمَّل من: softara1.github.io/softara/up/softara-selector-fixer.js
   ============================================================ */
(function () {
    'use strict';

    /* ننتظر تحميل jQuery و #custom-hover-card (الذي يُنشئه 99720.js) */
    function init() {
        if (typeof jQuery === 'undefined') {
            setTimeout(init, 50);
            return;
        }
        var $ = jQuery;
        var $card = $('#custom-hover-card');
        if ($card.length === 0) {
            /* الكارت لم يُنشأ بعد — قد يكون 99720.js تأخر */
            setTimeout(init, 100);
            return;
        }

        /* ============================================================
           1) إصلاح بطاقة العضو عند التمرير (aref*= → a[href*=)
           ============================================================ */

        /* نتحقق أولاً هل الدوال الأصلية (chcSchedule, chcHideSoon) موجودة
           فإن كانت كذلك نعيد استخدامها، وإلا نُعيد بناءها محلياً. */
        var useOriginalFuncs = (typeof window.chcSchedule === 'function' && typeof window.chcHideSoon === 'function');

        if (!useOriginalFuncs) {
            /* نُعيد بناء الدوال محلياً بنفس منطق 99720.js لكن بمحددات صحيحة */
            var hoverTimer = null;
            var hideTimer = null;

            function flxIsDefaultAvatar(url) {
                var u = String(url || '').toLowerCase();
                if (!u) { return true; }
                return (u.indexOf('pp-blank-thumb') !== -1 || u.indexOf('empty.gif') !== -1 ||
                        u.indexOf('no_avatar') !== -1 || u.indexOf('default_avatar') !== -1 ||
                        u.indexOf('blank.') !== -1);
            }

            function flxPickProfileAvatar(doc) {
                var selectors = ['.pro-avatar-box img', '#profile-advanced-avatar img',
                                 '#profile-advanced-right .avatar img', '.module-avatar img',
                                 '.main-avatar img'];
                for (var i = 0; i < selectors.length; i++) {
                    var el = doc.querySelector(selectors[i]);
                    if (el && el.getAttribute('src')) { return el.getAttribute('src'); }
                }
                var all = doc.querySelectorAll('img[src*="/avatars/"]');
                for (var j = 0; j < all.length; j++) {
                    var img = all[j];
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

            function flxExtractProfile(doc) {
                var res = { avatar: '', cover: '', name: '' };
                var rawAvatar = flxPickProfileAvatar(doc);
                res.avatar = flxIsDefaultAvatar(rawAvatar) ? '' : rawAvatar;
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
                    for (var k = 0; k < candidates.length; k++) {
                        var el = candidates[k];
                        if (!el || !el.textContent) { continue; }
                        var txt = String(el.textContent).replace(/\s+/g, ' ').trim();
                        if (txt.indexOf('الغلاف') === -1) { continue; }
                        var val = '';
                        var valEl = el.nextElementSibling;
                        var hops = 0;
                        while (valEl && hops < 3 && !val) {
                            var img2 = valEl.querySelector ? valEl.querySelector('img') : null;
                            if (img2 && img2.getAttribute('src')) { val = img2.getAttribute('src'); break; }
                            var urlMatch = String(valEl.textContent || '').match(/https?:\/\/[^\s<>"']+/);
                            val = urlMatch ? urlMatch[0] : '';
                            if (val) { break; }
                            valEl = valEl.nextElementSibling;
                            hops++;
                        }
                        if (val && val.indexOf('http') === 0) { cover = val; break; }
                    }
                }
                res.cover = cover;
                return res;
            }

            var CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
            var KEY_PREFIX = 'sfrc2_';
            var inflight = {};

            function flxLsGet(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } }
            function flxLsSet(key, val) { try { window.localStorage.setItem(key, val); } catch (e) {} }

            window.SoftaraProfile = {
                get: function (uId, callback) {
                    var now = Date.now();
                    var ts = parseInt(flxLsGet(KEY_PREFIX + 'ts_' + uId) || '0', 10);
                    var cached = {
                        avatar: flxLsGet(KEY_PREFIX + 'avatar_' + uId) || '',
                        cover: flxLsGet(KEY_PREFIX + 'cover_' + uId) || '',
                        name: flxLsGet(KEY_PREFIX + 'name_' + uId) || ''
                    };
                    if ((cached.avatar || cached.name) && ts && (now - ts) < CACHE_TTL) {
                        callback({ avatar: cached.avatar, cover: cached.cover, name: cached.name, fromCache: true });
                        return;
                    }
                    if (inflight[uId]) { inflight[uId].push(callback); return; }
                    inflight[uId] = [callback];
                    $.get('/u' + uId).done(function (html) {
                        var info = {};
                        try {
                            var doc = new DOMParser().parseFromString(html, 'text/html');
                            var scripts = doc.querySelectorAll('script');
                            for (var i = 0; i < scripts.length; i++) {
                                if (scripts[i].parentNode) { scripts[i].parentNode.removeChild(scripts[i]); }
                            }
                            info = flxExtractProfile(doc);
                        } catch (eParse) { info = { avatar: '', cover: '', name: '' }; }
                        if (info.avatar) { flxLsSet(KEY_PREFIX + 'avatar_' + uId, info.avatar); }
                        if (info.cover) { flxLsSet(KEY_PREFIX + 'cover_' + uId, info.cover); }
                        if (info.name) { flxLsSet(KEY_PREFIX + 'name_' + uId, info.name); }
                        flxLsSet(KEY_PREFIX + 'ts_' + uId, String(now));
                        var queue = inflight[uId] || [];
                        delete inflight[uId];
                        var payload = { avatar: info.avatar || cached.avatar, cover: info.cover || cached.cover, name: info.name || cached.name };
                        for (var q = 0; q < queue.length; q++) {
                            try { queue[q](payload); } catch (eCb) { continue; }
                        }
                    }).fail(function () {
                        var queue = inflight[uId] || [];
                        delete inflight[uId];
                        for (var q2 = 0; q2 < queue.length; q2++) {
                            try { queue[q2](cached); } catch (eCb2) { continue; }
                        }
                    });
                }
            };

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
                window.SoftaraProfile.get(uId, function (info) {
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

            window.chcSchedule = chcSchedule;
            window.chcHideSoon = chcHideSoon;
        }

        /* نُزيل أي ربط معطوب من 99720.js (لن يحدث شيء لأن aref*= غير صالح)
           ثم نربط الأحداث بالمحدد الصحيح a[href*="/u"] */
        $(document)
            .off('mouseenter', 'a[href*="/u"]')
            .off('mouseleave', 'a[href*="/u"]')
            .off('focus', 'a[href*="/u"]')
            .off('blur', 'a[href*="/u"]');

        $(document)
            .on('mouseenter', 'a[href*="/u"]', function (e) { window.chcSchedule(this, e); })
            .on('mouseleave', 'a[href*="/u"]', function () { window.chcHideSoon(); })
            .on('focus', 'a[href*="/u"]', function () {
                var r = this.getBoundingClientRect ? this.getBoundingClientRect() : null;
                var fakeEvt = r ? { clientX: r.left + r.width / 2, clientY: r.bottom } : null;
                window.chcSchedule(this, fakeEvt);
            })
            .on('blur', 'a[href*="/u"]', function () { window.chcHideSoon(); });

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

        /* نُطبّق غلاف العضو على قائمة الهيدر عند النقر على صورة العضو */
        function applyDropdownCover() {
            var linkEl = document.getElementById('customProfileLink');
            var href = linkEl ? (linkEl.getAttribute('href') || '') : '';
            var match = href.match(/\/u(\d+)/);
            if (!match) { return; }
            window.SoftaraProfile.get(match[1], function (info) {
                var box = document.getElementById('profileHeaderBox');
                if (box && info && info.cover) {
                    box.style.backgroundImage = 'linear-gradient(to top, rgba(10,14,30,.88) 0%, rgba(10,14,30,.45) 45%, rgba(10,14,30,.55) 100%), url("' + info.cover + '")';
                }
                if (info && info.avatar) {
                    var av = document.getElementById('customUserAvatarLarge');
                    if (av && av.src !== info.avatar) { av.src = info.avatar; }
                }
            });
        }
        $(document).on('click', '[onclick*="userDropdown"]', function () { setTimeout(applyDropdownCover, 100); });
        setTimeout(applyDropdownCover, 1500);

        /* ============================================================
           2) استبدال فحص linkref*= بفحص link[href*= صحيح
           الكود الأصلي يحاول: document.querySelector('linkref*="Material+Symbols+Outlined"]')
           الذي يرمي SyntaxError. نُحمّل الخطوط يدوياً إن لم تكن موجودة.
           ============================================================ */
        function loadFontIfMissing(hrefSubstring, fullHref) {
            /* نستخدم querySelectorAll وفلترة في JS بدل selector معطوب */
            var links = document.querySelectorAll('link[rel="stylesheet"]');
            for (var i = 0; i < links.length; i++) {
                if (links[i].href && links[i].href.indexOf(hrefSubstring) !== -1) { return; }
            }
            /* لم يُحمَّل بعد — نُحمّله */
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fullHref;
            document.head.appendChild(link);
        }
        loadFontIfMissing('Material+Symbols+Outlined',
            'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        loadFontIfMissing('Alexandria',
            'https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800;900&display=swap');

        if (window.console && console.info) {
            console.info('[softara] ✅ تم تحميل مُصحّح المحددات (aref*= → a[href*=) و (linkref*= → link[href*=)');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 200); });
    } else {
        setTimeout(init, 200);
    }
})();
