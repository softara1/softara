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

function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    if(query.length < 2) { resultsContainer.innerHTML = '<div class="search-placeholder">قم بكتابة حرفين على الأقل لبدء البحث...</div>'; return; }
    const filtered = dummySearchData.filter(item => item.title.toLowerCase().includes(query));
    if(filtered.length === 0) { resultsContainer.innerHTML = '<div class="search-placeholder">لا توجد نتائج مطابقة لـ "'+query+'"</div>'; return; }
    let html = '';
    filtered.forEach(item => { html += `<div class="search-result-item"><h4><a href="#">${item.title}</a></h4><span><i class="fas fa-folder-open"></i> ${item.section}</span></div>`; });
    resultsContainer.innerHTML = html;
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

    setInterval(function() {
        const faNotif = document.getElementById('fa_notifications');
        const customBadge = document.getElementById('customNotifBadge');
        if(faNotif && customBadge) {
            const notifCount = faNotif.textContent || faNotif.innerText;
            if(notifCount && parseInt(notifCount) > 0) {
                customBadge.textContent = notifCount;
                customBadge.style.display = 'inline-block';
            } else {
                customBadge.style.display = 'none';
            }
        }
    }, 1000);

    const customNotifBtn = document.getElementById('customNotifBtn');
    if(customNotifBtn) {
        customNotifBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const listContainer = document.getElementById('customNotifList');
            if(!listContainer) return;
            
            listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#888;">جاري تحميل الإشعارات... <i class="fas fa-spinner fa-spin"></i></div>';

            const faNotifBtn = document.getElementById('fa_notifications');
            if (faNotifBtn) {
                faNotifBtn.click(); 
                
                let checkAttempts = 0;
                const checkNotifs = setInterval(function() {
                    const nativeNotifs = document.getElementById('notif_list');
                    if (nativeNotifs && nativeNotifs.innerHTML.trim() !== '') {
                        clearInterval(checkNotifs); 
                        listContainer.innerHTML = nativeNotifs.innerHTML;
                        
                        const liveNotif = document.getElementById('live_notif');
                        if(liveNotif) liveNotif.style.display = 'none';
                    }
                    checkAttempts++;
                    if(checkAttempts >= 20) {
                        clearInterval(checkNotifs);
                        if (listContainer.innerHTML.includes('جاري تحميل')) {
                            listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#888;">لا توجد إشعارات جديدة حالياً.</div>';
                        }
                    }
                }, 200);
            } else {
                listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#e74c3c;">شريط أدوات المنتدى مخفي، لا يمكن جلب الإشعارات.</div>';
            }
        });
    }
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
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-icons') && !event.target.closest('#settingsPanel')) { 
            document.querySelectorAll('.dropdown-panel').forEach(d => d.classList.remove('active')); 
        }
    });

    loadSettings(); 
    initUserDataAndNotifications();

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

    Fancybox.bind('[data-fancybox="gallery"]', {
        Toolbar: { display: { left: ["infobar"], middle: [], right: ["zoomIn", "zoomOut", "close"] } }
    });

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
                    likersHTML += '<a href="'+profileUrl+'" class="flx-liker-chip" id="'+tempId+'"><img src="'+defaultAvatar+'" alt="'+username+'"> <span>'+username+'</span></a>';
                    
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
