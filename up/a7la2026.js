(function() {
    const myUrl = "https://www.facebook.com/Flying1free"; 
    const myName = "تصميم و برمجة :- الطائر الحر";

    function checkDesignerRights() {
        var linkEl = document.getElementById('designer-copy-link');
        var isTampered = false;

        if (!linkEl) {
            isTampered = true;
        } else {
            var currentHref = linkEl.getAttribute('href') || "";
            if (!currentHref.includes(myUrl)) {
                isTampered = true;
            }
            if (!linkEl.innerText.includes(myName)) {
                isTampered = true;
            }
            var styles = window.getComputedStyle(linkEl);
            if (styles.display === 'none' || styles.visibility === 'hidden' || parseFloat(styles.opacity) === 0 || parseFloat(styles.fontSize) === 0) {
                isTampered = true;
            }
        }

        if (isTampered) {
            document.body.innerHTML = `
                <div style="display:flex; justify-content:center; align-items:center; height:100vh; background-color:#111827; color:#f9fafb; flex-direction:column; text-align:center; padding:20px; font-family:'Tajawal', Arial, sans-serif; direction:rtl;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 5rem; color: #ef4444; margin-bottom: 20px;"></i>
                    <h1 style="color:#ef4444; font-size:3rem; margin-bottom:15px; font-weight:900; word-spacing: 8px;">تم&nbsp;إيقاف&nbsp;الموقع!</h1>
                    <p style="font-size:1.5rem; line-height:1.8; word-spacing: 5px;">عذراً،&nbsp;لقد&nbsp;تم&nbsp;إزالة&nbsp;أو&nbsp;التلاعب&nbsp;بحقوق&nbsp;المصمم&nbsp;الأصلي&nbsp;للموقع.<br>يرجى&nbsp;استرجاع&nbsp;حقوق&nbsp;<a href="${myUrl}" target="_blank" style="color:#3b82f6; text-decoration:underline; font-weight:bold;">${myName}</a>&nbsp;ليعمل&nbsp;الموقع&nbsp;بشكل&nbsp;طبيعي.</p>
                </div>
            `;
            document.body.style.overflow = "hidden";
        }
    }

    window.addEventListener('DOMContentLoaded', checkDesignerRights);
    setInterval(checkDesignerRights, 2000);
})();

const root = document.documentElement;
const dummySearchData = [
    { title: "تعلم الجافاسكريبت من الصفر للاحتراف", section: "تطوير الويب" },
    { title: "أفضل كاميرات التصوير لعام 2024", section: "القسم العام" },
    { title: "شروط التسجيل في المنتدى", section: "الإعلانات" }
];
let currentFontSize = 16;

function setForumLayout(layout, btn) {
    if (layout === 'grid') {
        $('body').addClass('grid-layout');
        localStorage.setItem('forum_layout', 'grid');
        fetchThumbnails();
    } else {
        $('body').removeClass('grid-layout');
        localStorage.setItem('forum_layout', 'list');
    }
    if (btn) {
        $('.layout-modes .theme-btn').removeClass('active-btn');
        $(btn).addClass('active-btn');
    }
}

function fetchThumbnails() {
    if (!$('body').hasClass('grid-layout')) return;

    $('.board-row').each(function () {
        var $row = $(this);
        var $link = $row.find('.lp-title a.topic-title').length ? $row.find('.lp-title a.topic-title') : $row.find('.lp-title a').last();
        var topicLink = $link.attr('href');
        var $thumbnail = $row.find('.topic-thumbnail');

        if (topicLink && !$thumbnail.attr('data-loaded')) {
            $thumbnail.attr('data-loaded', 'loading');

            $.ajax({
                url: topicLink,
                type: 'GET',
                success: function (response) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(response, "text/html");
                    var $img = $(doc).find('.post-content img, .content img, .postbody .content img, .entry-content img')
                        .not('img[src*="smilies"]')
                        .not('img[src*="avatar"]')
                        .not('img[src*="icon"]')
                        .first();

                    if ($img.length > 0 && $img.attr('src')) {
                        var imgSrc = $img.attr('src');
                        $thumbnail.css('background-image', 'url(' + imgSrc + ')');
                        $thumbnail.find('i').fadeOut();
                        $thumbnail.attr('data-loaded', 'true');
                    } else {
                        $thumbnail.attr('data-loaded', 'no-image');
                    }
                },
                error: function () {
                    $thumbnail.attr('data-loaded', 'error');
                }
            });
        }
    });
}

function shareTopic(platform) {
    var url = encodeURIComponent(window.location.href.split('#')[0]);
    var title = encodeURIComponent(document.title);
    var shareLink = '';
    
    if (platform === 'wa') { shareLink = 'https://api.whatsapp.com/send?text=' + title + ' - ' + url; } 
    else if (platform === 'fb') { shareLink = 'https://www.facebook.com/sharer/sharer.php?u=' + url; } 
    else if (platform === 'tw') { shareLink = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url; }
    else if (platform === 'cp') {
        var dummy = document.createElement('input'), text = window.location.href.split('#')[0];
        document.body.appendChild(dummy); dummy.value = text; dummy.select();
        document.execCommand('copy'); document.body.removeChild(dummy);
        alert('تم نسخ رابط الموضوع بنجاح!'); return;
    }
    
    if(shareLink !== '') { window.open(shareLink, '_blank', 'width=600,height=400'); }
}

function openAuthModal(tabType) { 
    const authModal = document.getElementById('authModal');
    if(authModal) {
        authModal.classList.add('active'); 
        switchAuthTab(tabType);
    }
}

function closeAuthModal() { 
    const authModal = document.getElementById('authModal');
    if(authModal) authModal.classList.remove('active'); 
}

function switchAuthTab(tabType) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form-container').forEach(f => f.classList.remove('active'));
    
    const selectedTab = document.getElementById(`tab-${tabType}`);
    const selectedForm = document.getElementById(`form-${tabType}`);
    if(selectedTab) selectedTab.classList.add('active');
    if(selectedForm) selectedForm.classList.add('active');
}

function toggleMenu(menuId) {
    const menus = ['settingsPanel', 'notificationsBox', 'userDropdown'];
    menus.forEach(id => { 
        const el = document.getElementById(id); 
        if (el) { if (id === menuId) el.classList.toggle('active'); else el.classList.remove('active'); } 
    });
}

function openSearch() { document.getElementById('searchModal').classList.add('active'); document.getElementById('searchInput').focus(); }
function closeSearch() { document.getElementById('searchModal').classList.remove('active'); document.getElementById('searchInput').value = ''; document.getElementById('searchResults').innerHTML = '<div class="search-placeholder">قم بكتابة حرفين على الأقل لبدء البحث...</div>'; }

var _liveSearchTimer = null;
function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('searchResults');
    if(query.length < 2) { resultsContainer.innerHTML = '<div class="search-placeholder">قم بكتابة حرفين على الأقل لبدء البحث...</div>'; return; }

    clearTimeout(_liveSearchTimer);
    _liveSearchTimer = setTimeout(function() {
        resultsContainer.innerHTML = '<div class="search-placeholder"><i class="fas fa-spinner fa-spin"></i> جارِ البحث في المنتدى...</div>';
        fetch('/search?search_keywords=' + encodeURIComponent(query))
            .then(function(r) { return r.text(); })
            .then(function(html) {
                var doc = new DOMParser().parseFromString(html, 'text/html');
                var links = doc.querySelectorAll('a[href^="/t"]');
                var seen = {};
                var out = '';
                var count = 0;
                links.forEach(function(a) {
                    if (count >= 10) { return; }
                    var href = a.getAttribute('href') || '';
                    var m = href.match(/^\/t(\d+)[p-]/);
                    if (!m) { return; }
                    var title = (a.textContent || '').trim();
                    if (title.length < 3 || seen[m[1]]) { return; }
                    seen[m[1]] = true;
                    count++;
                    out += '<div class="search-result-item"><h4><a href="' + href + '">' + title.replace(/</g,'&lt;') + '</a></h4></div>';
                });
                if (count === 0) {
                    resultsContainer.innerHTML = '<div class="search-placeholder">لا توجد نتائج مطابقة لـ "' + query.replace(/</g,'&lt;') + '" — اضغط Enter للبحث المتقدم</div>';
                } else {
                    out += '<div style="text-align:center; padding:10px;"><a href="/search?search_keywords=' + encodeURIComponent(query) + '" style="color: var(--primary-color, #8b5cf6); font-weight:bold;">عرض كل النتائج <i class="fas fa-arrow-left"></i></a></div>';
                    resultsContainer.innerHTML = out;
                }
            })
            .catch(function() {
                resultsContainer.innerHTML = '<div class="search-placeholder">تعذر البحث الفوري — اضغط Enter للانتقال لصفحة البحث</div>';
            });
    }, 400);
}

function changeFontSize(step) {
    currentFontSize += step;
    if(currentFontSize < 12) currentFontSize = 12; 
    if(currentFontSize > 24) currentFontSize = 24; 
    const fontDisplay = document.getElementById('fontSizeDisplay');
    if(fontDisplay) fontDisplay.innerText = currentFontSize;
    root.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('f_font_num', currentFontSize);
}

function setSetting(type, value, element) {
    if(element) {
        const siblings = element.parentElement.children;
        for(let el of siblings) { el.classList.remove('active-btn'); if(el.querySelector('i') && type==='theme') el.querySelector('i').style.color = ''; }
        element.classList.add('active-btn');
    }
    if(type === 'theme') {
        if(value === 'dark') document.body.classList.add('dark-theme'); else document.body.classList.remove('dark-theme');
        localStorage.setItem('f_theme', value);
    }
    else if(type === 'color') { 
        root.style.setProperty('--primary-color', value); localStorage.setItem('f_color', value); 
        const profileHeader = document.getElementById('profileHeaderBox');
        if(profileHeader) profileHeader.style.backgroundColor = value;
    }
    else if(type === 'header') {
        if(value === 'none') root.style.setProperty('--header-display', 'none'); else { root.style.setProperty('--header-display', 'flex'); root.style.setProperty('--header-image', value); }
        localStorage.setItem('f_header', value);
    }
}

function loadSettings() {
    const fontNum = localStorage.getItem('f_font_num'); const theme = localStorage.getItem('f_theme'); const color = localStorage.getItem('f_color'); const header = localStorage.getItem('f_header');
    
    if(fontNum) { currentFontSize = parseInt(fontNum); const fontDisp = document.getElementById('fontSizeDisplay'); if(fontDisp) fontDisp.innerText = currentFontSize; root.style.fontSize = currentFontSize + 'px'; }
    if(theme) setSetting('theme', theme, document.querySelector(`.theme-btn[data-theme="${theme}"]`));
    if(color) { 
        setSetting('color', color, document.querySelector(`.color-circle[data-color="${color}"]`)); 
        const profileHeader = document.getElementById('profileHeaderBox');
        if(profileHeader) profileHeader.style.backgroundColor = color; 
    }
    if(header) {
        const imgOptions = document.querySelectorAll('.img-option'); let targetEl = null;
        for(let el of imgOptions) if(el.dataset.img === header) targetEl = el;
        if(targetEl) setSetting('header', header, targetEl);
    }
}

function resetSettings() { localStorage.clear(); location.reload(); }

function toggleSubBoards(btn) {
    const container = btn.closest('.board-row').querySelector('.sub-boards-container');
    const icon = btn.querySelector('i');
    if(container.style.display === 'block') {
        container.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    } else {
        container.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    }
}

function initUserDataAndNotifications() {
    /* حارس تشغيل-مرة-واحدة: يمنع الربط المزدوج لو تحمّل الملف مرتين */
    if (window.__flxUserNotifDone) { return; }
    window.__flxUserNotifDone = true;

    if (typeof _userdata !== "undefined") {
        if (_userdata.avatar && _userdata.avatar !== "") {
            let extractedAvatar = "";
            if (_userdata.avatar.includes('<img')) {
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = _userdata.avatar;
                let imgEl = tempDiv.querySelector('img');
                if(imgEl) extractedAvatar = imgEl.src;
            } else {
                extractedAvatar = _userdata.avatar;
            }
            if (extractedAvatar) {
                document.querySelectorAll('#customUserAvatar, #customUserAvatarLarge').forEach(el => {
                    el.src = extractedAvatar;
                });
            }
        }
        if (_userdata.username && _userdata.username !== "") {
            const userNameEl = document.getElementById('customUserName');
            if(userNameEl) userNameEl.textContent = _userdata.username;
        }
    }

    /* ==========================================================
       محرك الإشعارات المستقل — يجلب الإشعارات مباشرة من نقطة
       /notif الرسمية للمنصة دون أي اعتماد على شريط الأدوات
       (الشريط لا يُنشأ أصلاً مع قوالب awesomebb المخصصة).
       يغذي: شارة الجرس customNotifBadge + قائمة notificationsBox
       ========================================================== */
    var _notifStore = [];
    var _notifUnread = 0;

    function flxEscapeHtml(s) {
        return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function flxNotifIcon(type) {
        var map = {0:'fa-envelope', 1:'fa-flag', 2:'fa-user-plus', 3:'fa-users', 4:'fa-check', 5:'fa-comment', 6:'fa-exclamation-triangle', 7:'fa-reply', 8:'fa-at', 9:'fa-hashtag', 10:'fa-bullhorn', 11:'fa-heart', 12:'fa-heart-broken', 13:'fa-folder-open', 14:'fa-medal', 15:'fa-star', 16:'fa-comment-dots', 17:'fa-gift'};
        return map[type] || 'fa-bell';
    }

    function flxNotifText(item) {
        var t = (item && item.text) || {};
        var rawName = (t.from && t.from.name) ? String(t.from.name) : '';
        var name = rawName ? ('<b>' + flxEscapeHtml(rawName) + '</b> ') : '';
        var rawTitle = (t.post && t.post.topic_title) ? String(t.post.topic_title) : '';
        var T = rawTitle ? (' «' + flxEscapeHtml(rawTitle) + '»') : '';
        switch (t.type) {
            case 0:  return name + 'أرسل إليك رسالة خاصة';
            case 1:  return name + 'قدّم بلاغاً يحتاج مراجعة';
            case 2:  return name + 'أرسل إليك طلب صداقة';
            case 3:  return name + 'طلب الانضمام إلى مجموعة تديرها';
            case 4:  return name + 'قبل طلب الصداقة';
            case 5:  return name + 'كتب على حائط ملفك الشخصي';
            case 6:  return 'بلاغ إساءة جديد بحاجة للمراجعة';
            case 7:  return name + 'رد في موضوع تتابعه' + T;
            case 8:  return name + 'أشار إليك في موضوع' + T;
            case 9:  return name + 'استخدم وسمك في موضوع' + T;
            case 10: return 'إعلان جديد في المنتدى';
            case 11: return name + 'أعجب بمشاركتك' + T;
            case 12: return name + 'أبدى عدم إعجابه بمشاركتك' + T;
            case 13: return name + 'أنشأ موضوعاً في قسم تتابعه' + T;
            case 14: return 'حصلت على وسام أو جائزة جديدة';
            case 15: return name + 'نشر موضوعاً جديداً' + T;
            case 16: return name + 'نشر رداً جديداً' + T;
            case 17: return name + 'أرسل لك تبرعاً';
            default: return 'إشعار جديد لديك';
        }
    }

    function flxNotifLink(item) {
        var t = (item && item.text) || {};
        switch (t.type) {
            case 0:  return '/privmsg?folder=inbox';
            case 2:
            case 3:  return '/profile?mode=editprofile&page_profil=friends';
            case 5:  return '/u' + ((typeof _userdata !== 'undefined' && _userdata.user_id) || '');
            case 14: return '/profile?mode=editprofile&page_profil=awards';
            default: break;
        }
        if (t.post && t.post.topic_id) { return '/t' + t.post.topic_id; }
        if (t.from && t.from.id) { return '/u' + t.from.id; }
        return '/';
    }

    function flxApplyBadge() {
        var badge = document.getElementById('customNotifBadge');
        if (!badge) { return; }
        if (_notifUnread > 0) {
            badge.textContent = _notifUnread > 99 ? '+99' : String(_notifUnread);
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }

    function flxRenderNotifList() {
        var listContainer = document.getElementById('customNotifList');
        if (!listContainer) { return; }
        if (!_notifStore.length) {
            listContainer.innerHTML = '<div style="text-align:center; padding:24px 12px; color:#94a3b8;"><i class="far fa-bell-slash" style="font-size:26px; display:block; margin-bottom:8px;"></i>لا توجد إشعارات حالياً</div>';
            return;
        }
        var out = '<ul style="list-style:none; margin:0; padding:0;">';
        _notifStore.forEach(function(item) {
            var isUnread = !item.read;
            out += '<li style="display:flex; gap:10px; align-items:flex-start; padding:10px 12px; border-bottom:1px solid rgba(148,163,184,.15);' + (isUnread ? ' background:rgba(139,92,246,.07);' : ' opacity:.6;') + '">'
                 + '<i class="fas ' + flxNotifIcon(item.text && item.text.type) + '" style="margin-top:3px; color:var(--primary-color, #8b5cf6); width:16px; text-align:center;"></i>'
                 + '<a href="' + flxNotifLink(item) + '" style="color:inherit; text-decoration:none; line-height:1.7; flex:1;">' + flxNotifText(item) + '</a>'
                 + (isUnread ? '<span title="غير مقروء" style="width:8px; height:8px; border-radius:50%; background:#ef4444; margin-top:7px; flex-shrink:0;"></span>' : '')
                 + '</li>';
        });
        out += '</ul>';
        listContainer.innerHTML = out;
    }

    function flxMarkAllRead() {
        var ids = [];
        _notifStore.forEach(function(it) {
            if (!it.read && it.text && it.text.id) { ids.push(it.text.id); }
        });
        if (!ids.length) { return; }
        jQuery.post('/notif', { id: ids }).done(function() {
            _notifStore.forEach(function(it) { it.read = 1; });
            _notifUnread = 0;
            flxApplyBadge();
            flxRenderNotifList();
        });
    }
    window.flxMarkAllRead = flxMarkAllRead;

    window.flxRefreshNotifications = function(callback) {
        if (typeof jQuery === 'undefined') { return; }
        jQuery.getJSON('/notif').done(function(data) {
            _notifStore = (data && data.store) || [];
            _notifUnread = (data && data.unread) || 0;
            flxApplyBadge();
            if (typeof callback === 'function') { callback(); }
        }).fail(function() {
            if (typeof callback === 'function') { callback(); }
        });
    };

    var customNotifBtn = document.getElementById('customNotifBtn');
    if (customNotifBtn) {
        customNotifBtn.addEventListener('click', function(e) {
            var box = document.getElementById('notificationsBox');
            /* الفتح تتم إدارته عبر toggleMenu — نحدّث القائمة فقط عند الفتح الفعلي */
            if (box && !box.classList.contains('active')) { return; }
            var listContainer = document.getElementById('customNotifList');
            if (!listContainer) { return; }
            if (!_notifStore.length) {
                listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#888;">جاري تحميل الإشعارات... <i class="fas fa-spinner fa-spin"></i></div>';
            }
            window.flxRefreshNotifications(function() {
                flxRenderNotifList();
                /* تحديد الكل كمقروء بعد 3 ثوانٍ من الفتح (نفس سلوك المنصة) */
                setTimeout(flxMarkAllRead, 3000);
            });
        });
    }

    /* جلب فوري عند تحميل الصفحة + تحديث دوري كل 45 ثانية */
    window.flxRefreshNotifications();
    setInterval(function() { window.flxRefreshNotifications(); }, 45000);
}

(function() {
    const topicsData = [
        { id: 0, img: 'https://i88.servimg.com/u/f88/18/93/95/45/app-de10.jpg', tag: '<i class="fas fa-bolt"></i> ', title: '', author: '', time: '' },
        { id: 1, img: 'https://i88.servimg.com/u/f88/18/93/95/45/yooo-a10.jpg', tag: '', title: '', author: '', time: '' },
        { id: 2, img: 'https://i88.servimg.com/u/f88/18/93/95/45/ao-ai-10.jpg', tag: '', title: '', author: '', time: '' }
    ];

    let currentActiveSlide = 0; 
    let slideIntervalTimer;

    function buildSideList() {
        const listContainer = document.getElementById('sideTopicsList');
        if(!listContainer) return;
        listContainer.innerHTML = '';
        topicsData.forEach((topic, index) => {
            const itemHTML = `<div class="side-item ${index === currentActiveSlide ? 'active-slide' : ''}" data-index="${index}">
                    <div class="side-img" style="background-image: url('${topic.img}');"></div>
                    <div class="side-info"><span>${topic.tag.replace(/<[^>]*>?/gm, '')}</span><h4>${topic.title}</h4></div>
                </div>`;
            listContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
        document.querySelectorAll('.side-item').forEach(item => {
            item.addEventListener('click', function() { changeSlide(parseInt(this.getAttribute('data-index'))); });
        });
    }

    function renderHero(index) {
        const data = topicsData[index];
        const heroBg = document.getElementById('heroBg');
        if(heroBg) heroBg.style.backgroundImage = `url('${data.img}')`;
        const heroTag = document.getElementById('heroTag');
        if(heroTag) heroTag.innerHTML = data.tag;
        const heroTitle = document.getElementById('heroTitle');
        if(heroTitle) heroTitle.innerText = data.title;
        const heroAuthor = document.getElementById('heroAuthor');
        if(heroAuthor) heroAuthor.innerHTML = `<i class="fas fa-user"></i> ${data.author}`;
        const heroTime = document.getElementById('heroTime');
        if(heroTime) heroTime.innerHTML = `<i class="fas fa-clock"></i> ${data.time}`;
        
        const sideItems = document.querySelectorAll('.side-item');
        sideItems.forEach(item => item.classList.remove('active-slide'));
        if(sideItems[index]) sideItems[index].classList.add('active-slide');
    }

    function changeSlide(index) { currentActiveSlide = index; renderHero(index); resetSlideTimer(); }
    function autoNextSlide() { currentActiveSlide = (currentActiveSlide + 1) % topicsData.length; renderHero(currentActiveSlide); }
    function startSlideTimer() { slideIntervalTimer = setInterval(autoNextSlide, 4000); }
    function resetSlideTimer() { clearInterval(slideIntervalTimer); startSlideTimer(); }

    document.addEventListener("DOMContentLoaded", function() {
        const sliderSection = document.getElementById('sliderSection');
        if(sliderSection) {
            sliderSection.addEventListener('mouseenter', () => clearInterval(slideIntervalTimer));
            sliderSection.addEventListener('mouseleave', startSlideTimer);
        }
        buildSideList(); 
        renderHero(0); 
        startSlideTimer();
    });
})();

document.addEventListener("DOMContentLoaded", function () {
    const authModalEl = document.getElementById('authModal');
    if(authModalEl) {
        authModalEl.addEventListener('click', function(e) { if(e.target === this) closeAuthModal(); });
    }
    const searchModalEl = document.getElementById('searchModal');
    if(searchModalEl) {
        searchModalEl.addEventListener('click', function(e) { if(e.target === this) closeSearch(); });
    }
    /* إغلاق كل النوافذ المنبثقة (التخصيص/الإشعارات/قائمة العضو) عند النقر خارجها */
    document.addEventListener('click', function(event) {
        if (event.target.closest && event.target.closest('[onclick*="toggleMenu"]')) { return; }
        var panelIds = ['settingsPanel', 'notificationsBox', 'userDropdown'];
        for (var pi = 0; pi < panelIds.length; pi++) {
            var pnl = document.getElementById(panelIds[pi]);
            if (pnl && pnl.contains(event.target)) { return; }
        }
        if (event.target.closest && (event.target.closest('.dropdown-panel') || event.target.closest('.settings-sidebar'))) { return; }
        panelIds.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) { el.classList.remove('active'); }
        });
        document.querySelectorAll('.dropdown-panel').forEach(function(d) { d.classList.remove('active'); });
    });
    /* ومفتاح Escape يغلقها أيضاً */
    document.addEventListener('keydown', function(event) {
        if (event.key !== 'Escape') { return; }
        ['settingsPanel', 'notificationsBox', 'userDropdown'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) { el.classList.remove('active'); }
        });
        document.querySelectorAll('.dropdown-panel').forEach(function(d) { d.classList.remove('active'); });
    });

    loadSettings(); 
    initUserDataAndNotifications();

    /* حارس تشغيل-مرة-واحدة للسلايدر (نفس السلايدر موجود في a7la-Topics.js
       والتشغيل المزدوج كان يضاعف سرعة التبديل ويكرر الاحداث) */
    if (window.__flxSliderDone) { return; }
    window.__flxSliderDone = true;

    const sliderContainer = document.getElementById('flx-dynamic-slider');
    if (!sliderContainer) return;

    const sideItems = document.querySelectorAll('.flx-side-item');
    if (sideItems.length === 0) return;

    let currentActiveSlide = 0;
    let slideIntervalTimer;
    const fallbackImage = 'https://i88.servimg.com/u/f88/18/93/95/45/organi10.jpg';

    async function extractImageFromMetaTags(url, itemElement, index) {
        try {
            let cleanUrl = url.split('#')[0];
            let response = await fetch(cleanUrl);
            let htmlText = await response.text();
            let parser = new DOMParser();
            let doc = parser.parseFromString(htmlText, 'text/html');
            let ogImageTag = doc.querySelector('meta[property="og:image"]');
            let finalImageUrl = fallbackImage;

            if (ogImageTag && ogImageTag.content) {
                let fetchedImg = ogImageTag.content;
                if (!fetchedImg.includes('illiweb.com') && !fetchedImg.includes('hitskin.com') && !fetchedImg.includes('logo')) {
                    finalImageUrl = fetchedImg;
                }
            }

            let imgDiv = itemElement.querySelector('.flx-side-img');
            if (imgDiv) {
                imgDiv.style.backgroundImage = `url('${finalImageUrl}')`;
                imgDiv.classList.remove('flx-loading-img');
            }
            itemElement.setAttribute('data-img', finalImageUrl);

            if (index === currentActiveSlide) {
                document.getElementById('flx-heroBg').style.backgroundImage = `url('${finalImageUrl}')`;
            }
        } catch (error) {
            console.error(error);
            let imgDiv = itemElement.querySelector('.flx-side-img');
            if (imgDiv) {
                imgDiv.style.backgroundImage = `url('${fallbackImage}')`;
                imgDiv.classList.remove('flx-loading-img');
            }
        }
    }

    sideItems.forEach((item, index) => {
        item.setAttribute('data-img', fallbackImage);
        let linkEl = item.querySelector('.flx-post-title');
        if (linkEl && linkEl.href) {
            extractImageFromMetaTags(linkEl.href, item, index);
        }
        item.addEventListener('click', () => { changeSlide(index); });
    });

    function renderHero(index) {
        const item = sideItems[index];
        if (!item) return;

        try {
            const titleEl = item.querySelector('.flx-post-title');
            const timeEl = item.querySelector('.flx-time-val');
            const authorEl = item.querySelector('.flx-author-val');
            const img = item.getAttribute('data-img');
            const title = titleEl ? titleEl.innerText : 'بدون عنوان';
            const link = titleEl ? titleEl.href : '#';
            const timeText = timeEl ? timeEl.innerText.replace('access_time', '').trim() : '';
            const authorText = authorEl ? authorEl.innerText.replace('person', '').trim() : 'عضو';

            document.getElementById('flx-heroBg').style.backgroundImage = `url('${img}')`;
            document.getElementById('flx-heroTitle').innerText = title;
            document.getElementById('flx-heroTitle').href = link;
            document.getElementById('flx-heroAuthor').innerHTML = `<i class="fas fa-user"></i> ${authorText}`;
            document.getElementById('flx-heroTime').innerHTML = `<i class="fas fa-clock"></i> ${timeText}`;

            sideItems.forEach(el => el.classList.remove('flx-active-slide'));
            item.classList.add('flx-active-slide');
        } catch (e) { console.error(e); }
    }

    function changeSlide(index) { currentActiveSlide = index; renderHero(index); resetSlideTimer(); }
    function autoNextSlide() { currentActiveSlide = (currentActiveSlide + 1) % sideItems.length; renderHero(currentActiveSlide); }
    function startSlideTimer() { slideIntervalTimer = setInterval(autoNextSlide, 4500); }
    function resetSlideTimer() { clearInterval(slideIntervalTimer); startSlideTimer(); }

    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideIntervalTimer));
    sliderContainer.addEventListener('mouseleave', startSlideTimer);

    renderHero(0);
    startSlideTimer();
});

$(document).ready(function() {
    /* حارس تشغيل-مرة-واحدة: هذه الكتلة مكررة في a7la-Topics.js و a7la2026.js
       وكان تكرار ربط الاحداث يسبب: وميض زر بيانات التواصل (فتح ثم اغلاق فوري)
       وارسال الاعجاب مرتين وجلب صور المعجبين مرتين */
    if (window.__flxTopicUiDone) { return; }
    window.__flxTopicUiDone = true;
    var savedLayout = localStorage.getItem('forum_layout');
    if (savedLayout === 'grid') {
        setForumLayout('grid');
        $('.layout-modes button[data-layout="grid"]').addClass('active-btn').siblings().removeClass('active-btn');
    }

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.flx-contact-wrapper').length) {
            $('.flx-contact-toggle.active').removeClass('active');
            $('.flx-contact-list:visible').slideUp(200);
        }
    });

    $('.content img:not(.smilies):not([src*="illiweb"]):not([src*="hits"])').each(function() {
        var $img = $(this);
        var parentA = $img.closest('a');
        if (parentA.length > 0) {
            parentA.attr('data-fancybox', 'gallery'); 
            parentA.attr('href', $img.attr('src')); 
            parentA.css('cursor', 'zoom-in');
            parentA.on('click', function(e) { e.preventDefault(); });
        } else {
            $img.wrap('<a href="' + $img.attr('src') + '" data-fancybox="gallery" style="cursor: zoom-in;"></a>');
        }
    });

    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox="gallery"]', {
            Toolbar: { display: { left: ["infobar"], middle: [], right: ["zoomIn", "zoomOut", "close"] } }
        });
    }

    $('.flx-contact-toggle').on('click', function(e) {
        e.preventDefault();
        var $btn = $(this);
        var $list = $btn.siblings('.flx-contact-list');

        $btn.toggleClass('active');
        
        if($list.text().trim() === "" && $list.find('img').length === 0) {
            $list.html('<span style="font-size:12px;color:gray;padding:0 5px;">لا توجد بيانات</span>');
        }

        $list.slideToggle(250);
    });
    
    $('.flx-main-topic').first().find('.show-only-first-post').show();

    $('.flx-main-topic, .flx-reply-topic').each(function() {
        var $card = $(this);
        var $userLink = $card.find('.flx-get-uid a');
        if ($userLink.length > 0) {
            var profileUrl = $userLink.attr('href');
            var match = profileUrl.match(/\/u(\d+)/);
            if (match && match[1]) { $card.find('.flx-put-uid').text(match[1]); } 
            else { $card.find('.flx-put-uid').text('غير محدد'); }
        } else { $card.find('.flx-put-uid').text('زائر'); }
    });

    var avatarCache = {}; 

    $('.raw-likes-data').each(function() {
        var $box = $(this);
        var likers = $box.find('.hidden-raw-likes a'); 
        
        if (likers.length > 0) {
            $box.css('display', 'block'); 
            var likersHTML = '';
            
            likers.each(function() {
                var username = $(this).text().trim();
                var profileUrl = $(this).attr('href');
                var tempId = 'like-chip-' + Math.floor(Math.random() * 1000000); 
                
                if(username !== "" && profileUrl !== "#") {
                    var defaultAvatar = 'https://i.servimg.com/u/f60/19/93/33/22/user10.png'; 
                    likersHTML += '<a href="'+profileUrl+'" class="flx-liker-chip" id="'+tempId+'" data-title="'+username+'" title="'+username+'"><img src="'+defaultAvatar+'" alt="'+username+'"> <span>'+username+'</span></a>';
                    
                    if(avatarCache[profileUrl]) {
                        setTimeout(function(){ $('#' + tempId + ' img').attr('src', avatarCache[profileUrl]); }, 0);
                    } else {
                        $.get(profileUrl, function(data) {
                            var avatarSrc = $(data).find('.user-avatar img, .avatar img, .forumline .row1 img.avatar, .module .avatar img, dl.left-box.details img, #profile-advanced-add img, .user-profile-avatar img, .page-content .row1 img').first().attr('src');
                            if(avatarSrc) { 
                                avatarCache[profileUrl] = avatarSrc; 
                                $('#' + tempId + ' img').attr('src', avatarSrc); 
                            }
                        });
                    }
                }
            });
            $box.find('.flx-likers-container').html(likersHTML); 
        }
    });

    $('.fa_like_div .rep-button').each(function() {
        var vanillaEl = this;
        var clone = vanillaEl.cloneNode(true);
        vanillaEl.parentNode.replaceChild(clone, vanillaEl);
    });

    $(document).on('click', '.fa_like_div .rep-button', function(e) {
        e.preventDefault();
        
        if(typeof _userdata === "undefined" || _userdata.session_logged_in != 1) {
            alert("يجب تسجيل الدخول للإعجاب بالمواضيع.");
            return;
        }

        var $btn = $(this);
        if($btn.hasClass('flx-processing')) return; 
        
        var $article = $btn.closest('article');
        var postId = $article.attr('id').replace('p', '');
        var $likesBox = $('#likes_p' + postId);
        var $likersContainer = $likesBox.find('.flx-likers-container');
        
        var urlLike = $btn.attr('data-href');
        var urlRmLike = $btn.attr('data-href-rm');
        
        var currentUserIdUrl = '/u' + _userdata.user_id;
        var myName = _userdata.username;
        var myAvatar = 'https://i.servimg.com/u/f60/19/93/33/22/user10.png';
        
        if (_userdata.avatar && _userdata.avatar !== "") {
            if (_userdata.avatar.indexOf('<img') !== -1) {
                var match = _userdata.avatar.match(/src=["'](.*?)["']/);
                if (match && match[1]) myAvatar = match[1];
            } else {
                myAvatar = _userdata.avatar;
            }
        }

        var $existingChip = $likersContainer.find('a[href^="'+currentUserIdUrl+'"]');
        var isLiked = $existingChip.length > 0;
        
        var targetUrl = isLiked ? urlRmLike : urlLike;
        if(!targetUrl || targetUrl === '') return;

        $btn.addClass('flx-processing').css('opacity', '0.6');

        $.get(targetUrl, function() {
            $btn.removeClass('flx-processing').css('opacity', '1');
            
            var currentCount = parseInt($btn.find('.like-count').text().replace(/[^0-9]/g, '')) || 0;

            if(isLiked) {
                $existingChip.fadeOut(200, function() { 
                    $(this).remove(); 
                    if($likersContainer.children('.flx-liker-chip').length === 0) {
                        $likesBox.slideUp(250);
                    }
                });
                
                $btn.find('.like-icon').text('thumb_up_off_alt');
                $btn.find('.like-text').text('إعجاب');
                var newCount = Math.max(0, currentCount - 1);
                $btn.find('.like-count').text(newCount > 0 ? newCount : '');
                
            } else {
                var chipHtml = '<a href="'+currentUserIdUrl+'" class="flx-liker-chip" style="display:none;"><img src="'+myAvatar+'" alt="'+myName+'"> <span>'+myName+'</span></a>';
                
                if($likesBox.is(':hidden')) {
                    $likersContainer.empty(); 
                    $likesBox.slideDown(250);
                }
                
                $likersContainer.prepend(chipHtml);
                $likersContainer.find('a:first').fadeIn(300);
                
                $btn.find('.like-icon').text('thumb_up');
                $btn.find('.like-text').text('إلغاء الإعجاب');
                $btn.find('.like-count').text(currentCount + 1);
            }
        }).fail(function() {
            $btn.removeClass('flx-processing').css('opacity', '1');
        });
    });

    var titleText = $('#topic-main-title').text().replace(/<[^>]+>/g, ' ').trim();
    var contentText = $('#first-post-content').text().replace(/<[^>]+>/g, ' ').trim();

    var stopWords = ['في','من','على','إلى','عن','مع','هذا','هذه','أن','إن','ولا','وما','كيف','كان','كانت','التي','الذي','هو','هي','تم','كل','وقد','أو','كما','بين','عند','بعد','قبل','حتى','إذا','فقط','غير','ذلك','هل','ولم','أنه','بها','به','عليه','إليه','أنا','نحن','لكن','ليس','ولكن','إلا','أكثر','بعض','أيضا','حيث','ومن','فإن','أجل','ذات','دون','أما'];
    var wordCounts = {};

    function extractWords(text, weight) {
        var words = text.split(/\s+/);
        words.forEach(function(word) {
            word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()""''؟،]/g,"").trim();
            if(word.length > 3 && stopWords.indexOf(word) === -1 && isNaN(word)) {
                wordCounts[word] = (wordCounts[word] || 0) + weight;
            }
        });
    }

    extractWords(titleText, 3);
    extractWords(contentText, 1);

    var sortedWords = Object.keys(wordCounts).sort(function(a, b) { return wordCounts[b] - wordCounts[a]; });
    var topTags = sortedWords.slice(0, 6); 
    
    if(topTags.length > 0) {
        $('#dynamic-meta-box').css('display', 'flex');
        $('#flx-auto-tags').css('display', 'flex');
        topTags.forEach(function(tag) { 
            var searchUrl = '/search?search_keywords=' + encodeURIComponent(tag);
            $('#flx-auto-tags .tags-container').append('<a href="' + searchUrl + '" title="البحث عن: ' + tag + '">#' + tag + '</a>'); 
        });
    }

    var seenUsers = {};
    var participantsCount = 0;
    
    $('#flx-participants .avatars-container').empty();

    $('.flx-main-topic, .flx-reply-topic').each(function() {
        var $card = $(this);
        var $userLinkObj = $card.find('.flx-get-uid a');
        var userLink = $userLinkObj.length > 0 ? $userLinkObj.attr('href') : null;
        var userName = $card.find('.flx-get-uid').text().trim();
        var userAvatarSrc = $card.find('.flx-avatar-box img').attr('src');
        var uniqueKey = userLink ? userLink : 'guest_' + userName;

        if (userName && userName !== "" && !seenUsers[uniqueKey] && userAvatarSrc) {
            seenUsers[uniqueKey] = true;
            participantsCount++;
            
            var avatarHTML = '';
            if (userLink) {
                avatarHTML = '<a href="'+userLink+'" title="'+userName+'"><img src="'+userAvatarSrc+'" alt="'+userName+'"></a>';
            } else {
                avatarHTML = '<span title="'+userName+'"><img src="'+userAvatarSrc+'" alt="'+userName+'"></span>';
            }
            $('#flx-participants .avatars-container').append(avatarHTML);
        }
    });

    if(participantsCount > 0) {
        $('#dynamic-meta-box').css('display', 'flex');
        $('#flx-participants').css('display', 'flex');
    }

    if(typeof _userdata !== "undefined" && _userdata.session_logged_in == 1) {
        $('#current-user-name').text(_userdata.username);
        if(_userdata.avatar) {
            var avatarMatch = _userdata.avatar.match(/src="([^"]+)"/);
            if(avatarMatch && avatarMatch[1]) { $('#current-user-avatar').attr('src', avatarMatch[1]); }
        }
    }

    $('#flx-mod-form a').each(function() {
        var $link = $(this);
        var href = $link.attr('href').toLowerCase();
        var title = $link.attr('title') || $link.find('img').attr('title') || $link.find('img').attr('alt') || '';
        var icon = 'settings'; 

        if(href.indexOf('delete') !== -1) { icon = 'delete'; title = 'حذف'; }
        else if(href.indexOf('move') !== -1) { icon = 'drive_file_move'; title = 'نقل'; }
        else if(href.indexOf('lock') !== -1) { icon = 'lock'; title = 'إغلاق'; }
        else if(href.indexOf('unlock') !== -1) { icon = 'lock_open'; title = 'فتح'; }
        else if(href.indexOf('split') !== -1) { icon = 'call_split'; title = 'فصل'; }
        else if(href.indexOf('merge') !== -1) { icon = 'merge_type'; title = 'دمج'; }
        else if(href.indexOf('trash') !== -1) { icon = 'restore_from_trash'; title = 'سلة المهملات'; }
        else if(href.indexOf('sticky') !== -1) { icon = 'push_pin'; title = 'تثبيت'; }
        
        $link.empty();
        $link.addClass('mod-css-btn');
        $link.html('<i class="material-icons">'+icon+'</i> ' + title);
    });
});
