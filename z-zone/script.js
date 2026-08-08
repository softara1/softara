var servImgAccount = window.servImgAccount || 'salveb@mamabood.com';
var servImgId = window.servImgId || 'f16a39f08e356f7d8da4511105f405d8';
var servImgF = window.servImgF || '13386037';
var servImgTB = window.servImgTB || '1637088248';
var servImgSL = window.servImgSL || '';
var servImgMode = window.servImgMode || 'fae';
var iframeSrc = '/smilies?mode=smilies_frame&t=1785531294';
var SCE_TopicID = '';
var illiwebDomain = 'https://illipro.net/';
var servimgDomain = 'servimg.com';
var INTRANET = 0;
var quick_reply = '';

(function initThemes() {
    try {
        const savedTheme = localStorage.getItem('zzone_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    } catch (e) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

function toggleDarkMode() {
    const root = document.documentElement;
    const isLight = root.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    try {
        localStorage.setItem('zzone_theme', newTheme);
    } catch (e) {
        console.warn("Could not save theme to localStorage", e);
    }
    const btn = document.getElementById('darkModeBtn');
    if (btn) {
        btn.innerHTML = isLight ? '<i class="material-symbols-outlined">dark_mode</i>' : '<i class="material-symbols-outlined">light_mode</i>';
    }
}

function enforceGroupIcons() {
    document.querySelectorAll('.group-icon, i[class*="group-icon"]').forEach(icon => {
        if (!icon.classList.contains('material-symbols-outlined')) {
            icon.classList.add('material-symbols-outlined');
            icon.style.cssText = "font-family: 'Material Symbols Outlined' !important; font-size: 16px !important; vertical-align: middle !important; margin: 0 4px !important; line-height: 1 !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; font-feature-settings: 'liga' !important; font-style: normal !important; font-weight: normal !important; text-transform: none !important; word-wrap: normal !important; direction: ltr !important; -webkit-font-smoothing: antialiased !important;";
        }
    });
}

const uiObserver = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    mutations.forEach(m => { 
        if (m.addedNodes.length > 0) {
            shouldUpdate = true; 
        }
    });
    if (shouldUpdate) {
        enforceGroupIcons();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const dmBtn = document.getElementById('darkModeBtn');
    if (dmBtn) {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        dmBtn.innerHTML = isLight ? '<i class="material-symbols-outlined">dark_mode</i>' : '<i class="material-symbols-outlined">light_mode</i>';
    }
    enforceGroupIcons();
    uiObserver.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
    
    document.body.addEventListener('click', function(e) {
        const link = e.target.closest('a[data-route]');
        if (link) {
            e.preventDefault();
            const url = link.getAttribute('href');
            const routeType = link.getAttribute('data-route');
            
            if (routeType === 'topic') openTopic(url);
            else if (routeType === 'forum') {
                const fid = url.split('/f')[1].split('-')[0].split('?')[0];
                loadForumData(parseInt(fid), link.textContent.trim(), url);
            }
        }
    });
});

$(document).ready(function ($) {
    'use strict';
    
    var _originalJQLoad = $.fn.load;
    $.fn.load = function(url, params, callback) {
        if (typeof url === "function") {
            return this.on("load", url);
        }
        return _originalJQLoad.apply(this, arguments);
    };

    window.sceditor = window.sceditor || {};
    $.sceditor = $.sceditor || {};
    $.sceditor.locale = $.sceditor.locale || {};
    $.sceditor.locale["ar"] = {
        "Bold": "خط عريض", 
        "Italic": "خط مائل", 
        "Underline": "خط في الأسفل", 
        "Strikethrough": "خط في المنتصف",
        "Align left": "انحياز الى اليسار", 
        "Center": "توسيط", 
        "Align right": "انحياز الى اليمين", 
        "Justify": "ملأ السطر",
        "Bullet list": "قائمة نُقطية", 
        "Numbered list": "قائمة رقمية", 
        "Insert a horizontal rule": "إدراج سطر أُفقي",
        "Insert a Quote": "إدراج اقتباس", 
        "Code": "إدراج أكواد برمجة", 
        "Spoiler": "إخفاء الرد", 
        "Hidden": "إخفاء مُقترن بالمساهمات", 
        "Insert a table": "إدراج جدول", 
        "Host an image": "رفع الصور", 
        "Insert an image": "إدراج صورة", 
        "Insert a GIF": "اختر ملف GIF", 
        "Insert an email": "إضافة بريد الكتروني", 
        "Insert a link": "إدراج رابط", 
        "Unlink": "حذف الوصلة", 
        "Insert a YouTube video": "إدراج رابط فيديو من موقع Youtube", 
        "Insert a Dailymotion Video": "إدخال رابط فيديو من موقع Dailymotion", 
        "Flash": "إدراج رابط ملف فلاشي", 
        "Format Headers": "تنسيق العناوين", 
        "Font Size": "حجم خط الكتابة", 
        "Font Color": "لون خط الكتابة", 
        "Font Name": "نوع خط الكتابة", 
        "Remove Formatting": "إزالة تنسيق النص", 
        "Mention a user": "وسم عضو", 
        "Embed a link": "تضمين المحتوى",
        "Subscript": "حرف دليلي تحت السطر", 
        "Superscript": "حرف دليلي فوق السطر", 
        "Horizontal scrolling": "استعراض افقي", 
        "Vertical scrolling": "استعراض عمودي", 
        "Random": "عشوائي", 
        "Dices roll": "رمي النرد (لعب الأدوار)",
        "Insert an emoticon": "الوجوه الضاحكة", 
        "Insert current date": "تاريخ اليوم", 
        "Insert current time": "التوقيت الحالي", 
        "Paste Text": "إدراج نص بدون تنسيقه الأصلي", 
        "Switch Editor Mode": "تغيير نمط نافذة الإرسال",
        "color_dark_red": "احمر قاتم", 
        "color_red": "احمر", 
        "color_orange": "برتقالي", 
        "color_brown": "بني", 
        "color_yellow": "اصفر", 
        "color_green": "اخضر", 
        "color_olive": "زيتوني", 
        "color_cyan": "ازرق سماوي", 
        "color_blue": "ازرق", 
        "color_dark_blue": "ازرق قاتم", 
        "color_indigo": "نيلي", 
        "color_violet": "بنفسجي", 
        "color_grey": "رمادي", 
        "color_white": "ابيض", 
        "color_black": "اسود",
        "More": "إظهار / إخفاء المزيد من الأزرار", 
        "Search": "بحـث", 
        "Insert": "إدراج", 
        "URL:": "رابط", 
        "Invalid YouTube video": "يوجد هناك خطئ في الفيديو", 
        "Author (optional)": "الكاتب (حقل غير إجباري)", 
        "Title (optional)": "العنوان (حقل غير إجباري)", 
        "Cols:": "أعمدة", 
        "Rows:": "خطوط", 
        "Width (optional):": "عرض (حقل اختياري)", 
        "Height (optional):": "ارتفاع (حقل اختياري)", 
        "Description (optional):": "وصف (حقل اختياري)", 
        "Paste your text inside the following box:": "قم بلصق النص المنسوخ أسفله لحذف تنسيقه الأصلي", 
        "Border": "إطار", 
        "dateFormat": "day.month.year"
    };

    var plugin = 'bbcode';
    var locale = 'ar';
    var isRtl = 1;
    var cssFile = 'https://illipro.net/rs3/18/frm/SCEditor/minified/jquery.sceditor.default.min.css';
    var emoticonsEnabled = 1;
    var smileys = { 
        ":D": "https://2img.net/i/fa/i/smiles/icon_biggrin.png", 
        ":)": "https://2img.net/i/fa/i/smiles/icon_smile.gif" 
    };
    var fullToolbar = 'bold,italic,underline,strike|left,center,right,justify|bulletlist,orderedlist,horizontalrule|quote,code,faspoiler,table|servimg,image,link,embed,youtube,emoticon|headers,size,color,font,removeformat|more|subscript,superscript|fascroll,faupdown,farand|mention,twemojifa,date,time,pastetext,source';
    var simpleToolbar = 'bold,italic,underline,strike,mention,faspoiler,emoticon,source';

    const iframeCSS = `
        html, body { 
            background: transparent !important; 
            color: inherit !important; 
            font-family: 'Alexandria', sans-serif !important; 
            font-size: 14px !important; 
            direction: rtl; 
            padding: 12px !important; 
            margin: 0 !important; 
            scrollbar-width: none !important; 
            -ms-overflow-style: none !important; 
        } 
        html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar { 
            display: none !important; 
            width: 0 !important; 
            height: 0 !important; 
        } 
        blockquote, code { 
            background: rgba(0,0,0,0.05) !important; 
            border: 1px solid rgba(128,128,128,0.2) !important; 
            border-right: 4px solid #00e5ff !important; 
            padding: 16px !important; 
            margin: 10px 0 !important; 
            border-radius: 8px !important; 
            display: block !important; 
            color: inherit !important; 
        } 
        blockquote cite { 
            font-weight: bold !important; 
            display: block !important; 
            margin-bottom: 8px !important; 
            border-bottom: 1px dashed rgba(128,128,128,0.2); 
            padding-bottom: 4px; 
        }
    `;

    window.initSCEditor = function(selector, isSimple) {
        if ($(selector).length === 0) {
            return;
        }
        var tBar = isSimple ? simpleToolbar : fullToolbar;
        try {
            $(selector).sceditor({
                plugins: plugin, 
                style: cssFile, 
                locale: locale, 
                rtl: isRtl, 
                toolbar: tBar,
                emoticonsEnabled: emoticonsEnabled, 
                emoticonsCompat: true, 
                dropdownZIndex: 999999,
                emoticons: { 
                    dropdown: smileys 
                }, 
                width: "100%", 
                height: isSimple ? "200px" : "350px", 
                autoUpdate: true
            });
            var instance = $(selector).sceditor('instance');
            if (instance) { 
                instance.css(iframeCSS); 
                instance.bind('ready', function() { 
                    instance.css(iframeCSS); 
                }); 
            }
        } catch(e) {
            console.error("SCEditor Init Error:", e);
        }
    };
    
    window.initSCEditor('#topicContent', false);
    window.initSCEditor('#editContent', false);
    window.initSCEditor('#qrContent', true);
});

let currentForumId = null;
let currentForumName = '';
let isCurrentLocked = false;
let currentTopicUrl = null;
let editActionUrl = '';
let activeReplyFormHTML = '';
window.currentUserIsGuest = true;

function switchView(viewId) {
    const views = ['categoriesView', 'listView', 'topicView', 'discoverView', 'settingsView'];
    const currentActive = document.querySelector('.active-view');
    const nextActive = document.getElementById(viewId);
    if (currentActive && currentActive.id === viewId) {
        return;
    }
    if (viewId === 'settingsView') {
        document.body.classList.add('settings-active');
    } else {
        document.body.classList.remove('settings-active');
    }
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const navLinks = document.querySelectorAll('.nav-links a');
    if (viewId === 'categoriesView' && navLinks[0]) {
        navLinks[0].classList.add('active');
    }
    if (viewId === 'discoverView' && navLinks[1]) {
        navLinks[1].classList.add('active');
    }
    if (currentActive) {
        currentActive.style.animation = 'proFadeSlideOut 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        setTimeout(() => {
            currentActive.classList.remove('active-view');
            currentActive.style.animation = '';
            if (nextActive) {
                nextActive.classList.add('active-view');
                nextActive.style.animation = 'proFadeSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            }
            window.scrollTo({top: 0, behavior: 'smooth'});
        }, 300);
    } else {
        views.forEach(v => { 
            const el = document.getElementById(v); 
            if (el) {
                el.classList.remove('active-view'); 
            }
        });
        if (nextActive) {
            nextActive.classList.add('active-view');
            nextActive.style.animation = 'proFadeSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        }
    }
}

function showToast(text, isError=false) {
    const t = document.getElementById('toast');
    t.style.background = isError ? 'var(--danger)' : 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
    t.style.color = isError ? '#fff' : 'var(--primary-text)';
    t.querySelector('i').innerText = isError ? 'error' : 'check_circle';
    document.getElementById('toastMsg').innerText = text;
    t.classList.add('show');
    setTimeout(() => {
        t.classList.remove('show');
    }, 3500);
}

function getCleanUsername(node, returnHtml = false) {
    if (!node) {
        return returnHtml ? 'زائر' : 'زائر';
    }
    let clone = node.cloneNode(true);
    let iconHtml = '';
    let iconEl = clone.querySelector('.group-icon');
    if (iconEl) {
        let iconText = iconEl.textContent.trim();
        iconHtml = ` <i class="material-symbols-outlined group-icon-custom" style="font-size:16px !important; vertical-align:middle !important; line-height:1 !important; display:inline-flex !important; align-items:center !important; justify-content:center !important; margin:0 4px !important;">${iconText}</i>`;
    }

    clone.querySelectorAll('i, svg, img').forEach(el => el.remove());

    let text = clone.innerText || clone.textContent || '';
    let pureText = text.replace(/بواسطة|by|من طرف|في/g, '').replace(/\s+/g, ' ').trim() || 'زائر';
    let escapedText = pureText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return returnHtml ? escapedText + iconHtml : escapedText;
}

function openModal(id) {
    const allowedForGuests = ['authModal', 'goodbyeModal', 'postModal', 'previewModal', 'adminModal'];
    if (!allowedForGuests.includes(id) && window.currentUserIsGuest) { 
        showToast('يرجى تسجيل الدخول أولاً للإجراء المطلوب!', true); 
        return; 
    }
    document.getElementById(id).classList.add('active');
    
    if (id === 'previewModal') {
        const modal = document.getElementById(id);
        modal.style.zIndex = "3000"; 
    }
}

function closeModal(id) { 
    document.getElementById(id).classList.remove('active'); 
    
    if (id === 'previewModal') {
        const modal = document.getElementById(id);
        modal.style.zIndex = "";
    }
}

async function updateServimgTokens() {
    try {
        let res = await fetch('/privmsg?mode=post');
        let html = await res.text();
        let accMatch = html.match(/servImgAccount\s*=\s*['"]([^'"]+)['"]/);
        let idMatch = html.match(/servImgId\s*=\s*['"]([^'"]+)['"]/);
        let fMatch = html.match(/servImgF\s*=\s*['"]([^'"]+)['"]/);
        let tbMatch = html.match(/servImgTB\s*=\s*['"]([^'"]+)['"]/);
        let slMatch = html.match(/servImgSL\s*=\s*['"]([^'"]+)['"]/);
        let modeMatch = html.match(/servImgMode\s*=\s*['"]([^'"]+)['"]/);
        let iframeMatch = html.match(/iframeSrc\s*=\s*['"]([^'"]+)['"]/);

        if (accMatch && accMatch[1]) window.servImgAccount = accMatch[1];
        if (idMatch && idMatch[1]) window.servImgId = idMatch[1];
        if (fMatch && fMatch[1]) window.servImgF = fMatch[1];
        if (tbMatch && tbMatch[1]) window.servImgTB = tbMatch[1];
        if (slMatch && slMatch[1]) window.servImgSL = slMatch[1];
        if (modeMatch && modeMatch[1]) window.servImgMode = modeMatch[1];

        window.iframeSrc = 'https://servimg.com/multiupload.php?mode=' + (window.servImgMode || 'fae') + 
                           '&account=' + encodeURIComponent(window.servImgAccount || '') + 
                           '&id=' + (window.servImgId || '') + 
                           '&f=' + (window.servImgF || '') + 
                           '&tb=' + (window.servImgTB || '') + 
                           '&sl=' + (window.servImgSL || '1');
    } catch(e) {
        console.warn("Could not update servimg tokens", e);
    }
}

const AppCache = {};
const CACHE_LIMIT = 20;

async function fetchWithCache(url) {
    if (AppCache[url]) {
        return AppCache[url];
    }
    try {
        const res = await fetch(url);
        const html = await res.text();
        if (Object.keys(AppCache).length >= CACHE_LIMIT) {
            const firstKey = Object.keys(AppCache)[0];
            delete AppCache[firstKey];
        }
        AppCache[url] = html; 
        return html;
    } catch (error) { 
        console.error("Fetch Error:", error);
        return ""; 
    }
}

function extractNumbers(str) {
    let nums = [];
    let current = '';
    for (let i = 0; i < str.length; i++) {
        let ch = str.charAt(i);
        if (ch >= '0' && ch <= '9') {
            current += ch; 
        } else { 
            if (current !== '') { 
                nums.push(current); 
                current = ''; 
            } 
        }
    }
    if (current !== '') {
        nums.push(current);
    }
    return nums;
}

async function initUserSession() {
    const panel = document.getElementById('userPanel');
    let isLogged = false;
    let username = 'زائر';
    let avatar = 'https://2img.net/i/fa/modernbb/pp-blank-thumb.png';
    let logoutUrl = '';
    let posts = 0;
    let points = 0;
    try {
        let res = await fetch('/forum?_t=' + Date.now());
        let html = await res.text();
        if (!html.includes('session_logged_in')) {
            res = await fetch('/?_t=' + Date.now()); 
            html = await res.text();
        }
        if (html.indexOf('"session_logged_in"] = 1') !== -1 || html.indexOf('"session_logged_in"]=1') !== -1) {
            isLogged = true;
            let uParts = html.split('_userdata["username"] = "'); 
            if (uParts.length < 2) {
                uParts = html.split("_userdata['username'] = '");
            }
            if (uParts.length >= 2) {
                username = uParts[1].split('"')[0].split("'")[0];
            }
            let aParts = html.split('_userdata["avatar_link"] = "'); 
            if (aParts.length >= 2) {
                avatar = aParts[1].split('"')[0];
            }
            let oParts = html.split('_userdata["page_logout"] = "'); 
            if (oParts.length >= 2) {
                logoutUrl = oParts[1].split('"')[0];
            }
            let poParts = html.split('_userdata["user_posts"] = '); 
            if (poParts.length >= 2) {
                posts = parseInt(poParts[1]);
            }
            let ptParts = html.split('_userdata["user_points"] = '); 
            if (ptParts.length >= 2) {
                points = parseInt(ptParts[1]);
            }
        }
    } catch(e) {
        console.error("Session Init Error", e);
    }
    window.currentUserIsGuest = !isLogged;
    const guestNameGroup = document.getElementById('guestNameGroup');
    const qrGuestName = document.getElementById('qrGuestName');
    if (guestNameGroup) {
        guestNameGroup.style.display = isLogged ? 'none' : 'block';
    }
    if (qrGuestName) {
        qrGuestName.style.display = isLogged ? 'none' : 'block';
    }
    if (isLogged) {
        panel.innerHTML = `
            <div class="user-panel-pill" style="padding: 5px 15px 5px 5px; height: auto;">
                <div class="user-info-link" style="cursor: default;">
                    <img src="${avatar}" class="user-avatar-img" title="صورة الحساب" style="cursor: default;">
                    <div style="display:flex; flex-direction:column; line-height: 1.2;">
                        <span style="font-weight:800; font-size:14px; color:var(--text-strong);">${username}</span>
                        <div style="display:flex; gap:8px; font-size:12px; color:var(--text-muted); font-weight:600; margin-top:2px;">
                            <span title="المساهمات"><i class="material-symbols-outlined" style="font-size:12px; color:var(--primary); vertical-align:middle;">chat</i> ${posts}</span>
                            <span title="النقاط"><i class="material-symbols-outlined" style="font-size:12px; color:#fbbf24; vertical-align:middle;">stars</i> ${points}</span>
                        </div>
                    </div>
                </div>
                <div style="width:1px; height:35px; background:var(--border); margin:0 8px;"></div>
                <a href="/profile?mode=editprofile" onclick="event.preventDefault(); loadSettingsPage('/profile?mode=editprofile');" title="إعدادات الحساب" style="color:var(--text-muted); display:flex; align-items:center; justify-content:center; padding:5px; transition:0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">
                    <i class="material-symbols-outlined" style="font-size:24px;">settings</i>
                </a>
                <a href="javascript:void(0)" onclick="performLogout('${logoutUrl}')" title="تسجيل الخروج" style="color:var(--danger); display:flex; align-items:center; justify-content:center; padding:5px; margin-right:5px;">
                    <i class="material-symbols-outlined" style="font-size:22px;">logout</i>
                </a>
            </div>
        `;
        updateServimgTokens();
    } else {
        panel.innerHTML = `
            <a href="javascript:void(0)" onclick="openAuthModal('/login', 'تسجيل الدخول', 'login')" style="font-weight:700; display:flex; align-items:center; gap:5px; color:var(--text-strong);">
                <i class="material-symbols-outlined">login</i> دخول
            </a>
            <button class="btn-action" onclick="openAuthModal('/register', 'إنشاء حساب جديد', 'person_add')" style="padding:8px 16px; font-size:14px;">
                <i class="material-symbols-outlined">person_add</i> تسجيل
            </button>
        `;
    }
}

window.toggleFlipSection = function(element, isSubforum) {
    const header = $(element);
    const content = isSubforum ? header.next('.subforums-list') : header.next('.node-list');
    const icon = header.find('.flip-icon');
    content.stop(true, true).slideToggle(350); 
    icon.toggleClass('flipped');
};

const BASE_APP_PATH = window.location.pathname;

function safeEncode(str) {
    if (!str) {
        return ''; 
    }
    let enc = encodeURIComponent(str);
    enc = enc.split("'").join("%27").split("(").join("%28").split(")").join("%29"); 
    return enc;
}

function scrollToReply() {
    const qrBox = document.getElementById('quickReplyBox');
    if (qrBox && qrBox.style.display !== 'none') {
        qrBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        let scInst = $('#qrContent').sceditor('instance'); 
        if (scInst) {
            scInst.focus(); 
        } else {
            document.getElementById('qrContent').focus();
        }
    } else {
        showToast('عذراً، هذا الموضوع مغلق أو لا تملك صلاحية الرد.', true);
    }
}

async function loadAnnouncements() {
    const container = document.getElementById('announcementsSection'); 
    if (!container) {
        return;
    }
    const targetForums = [2]; 
    try {
        let allTopics = [];
        let processed = new Set();
        const fetchPromises = targetForums.map(fid => fetchWithCache('/f' + fid + '-montada?_t=' + Date.now()));
        const responses = await Promise.all(fetchPromises);
        responses.forEach(html => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            Array.from(doc.querySelectorAll('div.post-wrap, .posts-section, .block-topics-content, li.row, tr.topicrow, div.topic')).forEach(t => {
                const linkNode = t.querySelector('.posts-description h3 a, .topic-title, .topictitle');
                if (linkNode) {
                    const href = linkNode.getAttribute('href');
                    if (!processed.has(href)) {
                        processed.add(href);
                        let cloneTitle = linkNode.cloneNode(true); 
                        cloneTitle.querySelectorAll('img, i, svg').forEach(el => el.remove());
                        let authorNode = t.querySelector('.topic-author a, .posts-description p a[href^="/u"], .post-author-name a, .name strong a');
                        allTopics.push({ 
                            link: href, 
                            title: cloneTitle.textContent.split('notifications').join('').trim(), 
                            author: authorNode ? getCleanUsername(authorNode, true) : 'الإدارة' 
                        });
                    }
                }
            });
        });
        allTopics = allTopics.slice(0, 5);
        if (allTopics.length > 0) {
            let cardsHtml = allTopics.map((t, index) => `
                <div class="pro-announce-card ${index === 0 ? 'active' : ''}" onclick="event.preventDefault(); openTopic('${t.link}')">
                    <div class="pro-announce-icon">
                        <i class="material-symbols-outlined">campaign</i>
                    </div>
                    <div class="pro-announce-info">
                        <span class="pro-announce-badge">إشعار إداري هام</span>
                        <h4 class="pro-announce-title">${t.title}</h4>
                        <div class="pro-announce-author">
                            <i class="material-symbols-outlined">person</i> بواسطة: <span style="display:inline-flex; align-items:center;">${t.author}</span>
                        </div>
                    </div>
                    <div class="pro-announce-action">
                        <button><i class="material-symbols-outlined">arrow_back</i></button>
                    </div>
                </div>
            `).join('');
            container.innerHTML = `
                <div class="pro-announcements-container">
                    <div class="pro-announcements-slider" id="proAnnSlider">${cardsHtml}</div>
                    ${allTopics.length > 1 ? `<div class="pro-announce-dots">${allTopics.map((_, i) => `<span class="dot ${i===0?'active':''}"></span>`).join('')}</div>` : ''}
                </div>
            `;
            container.style.display = 'block';
            if (allTopics.length > 1) {
                const cards = container.querySelectorAll('.pro-announce-card');
                const dots = container.querySelectorAll('.dot');
                let currentIdx = 0;
                setInterval(() => {
                    cards[currentIdx].classList.remove('active'); 
                    dots[currentIdx].classList.remove('active');
                    currentIdx = (currentIdx + 1) % cards.length;
                    cards[currentIdx].classList.add('active'); 
                    dots[currentIdx].classList.add('active');
                }, 5000); 
            }
        } else {
            container.style.display = 'none'; 
        }
    } catch(e) { 
        container.style.display = 'none'; 
    }
}

async function loadPremiumCategories(skipPush = false) {
    if (!skipPush) {
        window.history.pushState({}, '', BASE_APP_PATH);
    }
    switchView('categoriesView'); 
    document.getElementById('mainActionBtn').style.display = 'none';
    const container = document.getElementById('categoriesContainer');
    if (container.innerHTML === '' || container.innerHTML.includes('جاري')) {
        container.innerHTML = '<div class="loader" style="margin:80px auto; display:block;"></div>';
    }
    try {
        let html = await fetchWithCache('/forum?_t=' + Date.now());
        let doc = new DOMParser().parseFromString(html, 'text/html');
        let categories = doc.querySelectorAll('div.forum, div.forabg, div.forumbg, table.forumline, .category, .borderwrap, .block-category');
        if (categories.length === 0) {
            html = await fetchWithCache('/?_t=' + Date.now());
            doc = new DOMParser().parseFromString(html, 'text/html');
            categories = doc.querySelectorAll('div.forum, div.forabg, div.forumbg, table.forumline, .category, .borderwrap, .block-category');
        }
        if (categories.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="margin: 20px; padding: 40px; text-align: center;">
                    <i class="material-symbols-outlined" style="font-size:48px; color:var(--danger); margin-bottom:15px; display:block;">error</i>
                    <h3 style="font-size:18px; margin-bottom:10px;">عذراً، لا توجد أقسام لعرضها!</h3>
                    <p style="color:var(--text-muted);">تأكد من إنشاء أقسام في المنتدى، أو أنك تملك صلاحية رؤيتها.</p>
                </div>
            `;
            return;
        }
        let finalHTML = ''; 
        categories.forEach((cat, index) => {
            const catTitleNode = cat.querySelector('.category-title h2, .category-title span, h2.maintitle, .category-title span h2, h2, h3, .maintitle, .header');
            if (!catTitleNode) {
                return;
            }
            const catTitle = catTitleNode.textContent.trim(); 
            let forumsHTML = '';
            cat.querySelectorAll('.forum-section, li.row, tr.forumrow, tr.row1, tr.row2, .board, dl.icon').forEach((forumEl, fIdx) => {
                const aTag = forumEl.querySelector('a.forumtitle, .forum-description h3 a, h2 a, a.forumlink, h3 a'); 
                if (!aTag) {
                    return;
                }
                const name = aTag.textContent.trim();
                const url = aTag.getAttribute('href') || '';
                let id = 0; 
                if (url.indexOf('/f') !== -1) {
                    id = parseInt(url.split('/f')[1].split('-')[0]);
                }
                let isLocked = forumEl.classList.contains('forum_locked') || String(forumEl.className).includes('locked') || forumEl.querySelector('img[src*="locked"]');
                let lockBadge = isLocked ? '<span style="background:var(--danger); color:#fff; padding:2px 8px; border-radius:6px; font-size:12px; margin-left:8px; display:inline-flex; align-items:center; gap:3px;"><i class="material-symbols-outlined" style="font-size:14px;">lock</i> مغلق</span>' : '';
                let nodeIcon = isLocked ? 'lock' : 'forum';
                let descNode = forumEl.querySelector('.forum-description p, .forum-desc');
                let desc = descNode ? descNode.textContent.trim() : '';
                let subforumsHTML = '';
                
                forumEl.querySelectorAll('.forum-description a.gensmall, .subforums a').forEach(sub => {
                    const sName = sub.textContent.trim();
                    const sHref = sub.getAttribute('href') || '';
                    if (sName) { 
                        subforumsHTML += `<a href="${sHref}" data-route="forum" class="subforum-link"><i class="material-symbols-outlined" style="font-size:16px;">subdirectory_arrow_left</i> ${sName}</a>`; 
                    }
                });
                
                let topics = '0';
                let posts = '0';
                const statNums = extractNumbers(forumEl.querySelector('.forum-statistics, .topics, .posts, .stats')?.textContent || '');
                if (statNums && statNums.length >= 2) { 
                    topics = statNums[0]; 
                    posts = statNums[1]; 
                }
                let lpAvatar = 'https://2img.net/i/fa/modernbb/pp-blank-thumb.png';
                let avatarImg = forumEl.querySelector('img.avatar, .avatar img, .lastpost-avatar img, .avatar-default img');
                if (avatarImg) {
                    lpAvatar = avatarImg.getAttribute('src') || avatarImg.getAttribute('data-src') || lpAvatar;
                }
                let lpTitle = 'لا توجد مواضيع';
                let lpTopicUrl = 'javascript:void(0)';
                let lpUser = '';
                let lpTime = '';
                let isCategoryEmpty = true; 
                const lpEl = forumEl.querySelector('.forum-lastpost-inner, .forum-lastpost, dd.lastpost, .last-post');
                if (lpEl) {
                    const topicLink = lpEl.querySelector('a.topic-title, a.topictitle, a[href^="/t"]:not(:has(img))');
                    if (topicLink) {
                        let href = topicLink.getAttribute('href') || '';
                        if (href) {
                            lpTopicUrl = href;
                            isCategoryEmpty = false;
                            lpTitle = topicLink.getAttribute('title') || topicLink.textContent.trim();
                        }
                    }
                    if (lpTitle.length > 14) {
                        lpTitle = lpTitle.substring(0, 14) + '...';
                    }
                    if (!isCategoryEmpty) {
                        const authorNode = lpEl.querySelector('.forum-lastpost-author a[href^="/u"], .forum-lastpost-author strong');
                        if (authorNode) {
                            lpUser = getCleanUsername(authorNode, true);
                        } else {
                            lpUser = 'عضو';
                        }
                        const timeNode = lpEl.querySelector('.forum-lastpost-time a, .forum-lastpost-time');
                        if (timeNode) {
                            let tTxt = timeNode.textContent;
                            tTxt = tTxt.replace(/access_time|person|calendar_month/g, '');
                            lpTime = tTxt.trim();
                        }
                    }
                }
                if (nodeIcon === 'forum') { 
                    const icons = ['forum', 'chat', 'memory', 'router', 'public', 'bolt', 'terminal', 'code_blocks']; 
                    nodeIcon = icons[fIdx % icons.length]; 
                }
                
                let lastPostBlock = isCategoryEmpty ? `
                    <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: var(--text-muted); font-weight: 800; font-size: 14px; gap: 8px;">
                        <i class="material-symbols-outlined">info</i> لا توجد مواضيع
                    </div>` : `
                    <div class="lp-icon" style="width: 48px; height: 48px; border-radius: 50%; overflow: hidden; border: 2px solid var(--primary); display: flex; align-items: center; justify-content: center; background: rgba(0, 229, 255, 0.05); flex-shrink: 0; padding: 0;">
                        <img src="${lpAvatar}" alt="avatar" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="lp-info" style="justify-content: center;">
                        <a href="${lpTopicUrl}" data-route="topic" class="lp-title" style="font-weight: 800; color: var(--text-strong); font-size: 14px; text-decoration: none; transition: 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-strong)'">${lpTitle}</a>
                        <span style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 4px; font-size: 13px; color: var(--text-muted);">
                            <span style="display: flex; align-items: center; gap: 4px;">
                                <i class="material-symbols-outlined" style="font-size: 15px;">person</i> 
                                <span style="display:inline-flex; align-items:center; cursor:default;">${lpUser}</span>
                            </span>
                            <span style="color: var(--border);">|</span>
                            <span style="display: flex; align-items: center; gap: 4px;">
                                <i class="material-symbols-outlined" style="font-size: 15px;">calendar_month</i> ${lpTime}
                            </span>
                        </span>
                    </div>`;
                forumsHTML += `
                    <div class="node-row">
                        <div class="node-icon">
                            <i class="material-symbols-outlined">${nodeIcon}</i>
                        </div>
                        <div class="node-main">
                            <a href="${url}" data-route="forum" class="node-title">${lockBadge}${name}</a>
                            <div class="node-desc">${desc}</div>
                            ${subforumsHTML ? `
                                <div class="subforums-wrapper">
                                    <div class="subforums-label clickable-header" onclick="event.stopPropagation(); toggleFlipSection(this, true)">
                                        <i class="material-symbols-outlined" style="font-size: 18px;">account_tree</i> الأقسام الفرعية 
                                        <i class="material-symbols-outlined flip-icon" style="font-size: 18px;">expand_more</i>
                                    </div>
                                    <div class="subforums-list" style="display: none;">${subforumsHTML}</div>
                                </div>
                            ` : ''}
                        </div>
                        <div class="node-stats">
                            <span>المواضيع: <strong>${topics}</strong></span>
                            <span>المشاركات: <strong>${posts}</strong></span>
                        </div>
                        <div class="node-lastpost" style="width: 290px; justify-content: ${isCategoryEmpty ? 'center' : 'flex-start'};">
                            ${lastPostBlock}
                        </div>
                    </div>`;
            });
            if (forumsHTML) {
                finalHTML += `
                    <div class="category-block">
                        <div class="category-header clickable-header" onclick="toggleFlipSection(this, false)" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <i class="material-symbols-outlined">dashboard</i> ${catTitle}
                            </div>
                            <i class="material-symbols-outlined flip-icon">expand_less</i>
                        </div>
                        <div class="node-list">${forumsHTML}</div>
                    </div>`;
            }
        });
        container.innerHTML = finalHTML;
        enforceGroupIcons();
    } catch (e) {
        container.innerHTML = `
            <div class="empty-state" style="margin: 20px; padding: 40px; text-align: center;">
                <i class="material-symbols-outlined" style="font-size:48px; color:var(--danger); margin-bottom:15px; display:block;">wifi_off</i>
                <h3 style="font-size:18px;">خطأ في الإتصال بالخادم</h3>
            </div>
        `;
        console.error("Load Categories Error:", e);
    }
}

function extractPagination(doc, containerIds, callback) {
    const containers = containerIds.map(id => document.getElementById(id)).filter(c => c);
    containers.forEach(c => {
        c.innerHTML = '';
    });
    const pagNodes = doc.querySelectorAll('.pagination'); 
    if (pagNodes.length === 0) {
        return;
    }
    const elements = pagNodes[0].querySelectorAll('a, strong, b');
    const addedPages = new Set();
    const buttonsToAppend = [];
    elements.forEach(el => {
        if (el.closest('.mobile-hidden-imp')) {
            return;
        }
        let text = el.textContent.trim().split(String.fromCharCode(10)).join(' ').split(String.fromCharCode(13)).join(' ').split(' ').join('');
        const isActive = (el.tagName === 'STRONG' || el.tagName === 'B') && !el.getAttribute('href');
        let isPrev = text.includes('السابق') || text === '<' || el.className.includes('prev');
        let isNext = text.includes('التالي') || text === '>' || el.className.includes('next');
        let btnContent = el.textContent.trim();
        if (isPrev) {
            btnContent = '<i class="material-symbols-outlined">chevron_right</i>';
        }
        if (isNext) {
            btnContent = '<i class="material-symbols-outlined">chevron_left</i>';
        }
        if (!btnContent && !isPrev && !isNext) {
            return;
        }
        const identifier = isPrev ? 'prev' : (isNext ? 'next' : text);
        if (!identifier || addedPages.has(identifier)) {
            return;
        }
        addedPages.add(identifier);
        const btn = document.createElement('a'); 
        btn.className = 'page-btn'; 
        btn.innerHTML = btnContent;
        const href = el.getAttribute('href');
        if (isActive) { 
            btn.classList.add('active'); 
            buttonsToAppend.push(btn); 
        } else if (href && !href.includes('javascript:')) { 
            btn.onclick = (e) => { 
                e.preventDefault(); 
                callback(href); 
            }; 
            buttonsToAppend.push(btn); 
        }
    });
    containers.forEach(container => { 
        buttonsToAppend.forEach(btn => { 
            const clone = btn.cloneNode(true); 
            if (!clone.classList.contains('active')) {
                clone.onclick = btn.onclick; 
            }
            container.appendChild(clone); 
        }); 
    });
}

async function loadForumData(id, name, pageUrl = null, skipPush = false){
    const fetchUrl = pageUrl ? pageUrl : `/f${id}-montada`;
    let cleanUrl = fetchUrl.split('_t=')[0];
    if (cleanUrl.endsWith('?') || cleanUrl.endsWith('&')) {
        cleanUrl = cleanUrl.substring(0, cleanUrl.length - 1);
    }
    if (!skipPush) {
        window.history.pushState({}, '', BASE_APP_PATH + '?target=' + cleanUrl);
    }
    currentForumId = id; 
    currentForumName = name;
    switchView('listView'); 
    document.getElementById('secTitle').innerHTML = name ? name : '';
    const container = document.getElementById('topicsContainer');
    const banner = document.getElementById('lockedBanner');
    const actionBtn = document.getElementById('mainActionBtn');
    const actionBtnBottom = document.getElementById('mainActionBtnBottom');
    const lvPermBox = document.getElementById('lvPermissionsBox');
    const lvPerms = document.getElementById('lvPermissions');
    container.innerHTML = '<div class="loader" style="margin:80px auto; display:block;"></div>'; 
    document.getElementById('forumPaginationTop').innerHTML = ''; 
    document.getElementById('forumPaginationBottom').innerHTML = '';
    banner.style.display = 'none'; 
    lvPermBox.style.display = 'none';
    try {
        const html = await fetchWithCache(`${fetchUrl}${fetchUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const newBtn = doc.querySelector('a[href*="mode=newtopic"]');
        if (!newBtn) {
            actionBtn.style.display = 'none'; 
            if (actionBtnBottom) {
                actionBtnBottom.style.display = 'none';
            }
        } else if (newBtn.querySelector('img[src*="locked"]') || newBtn.textContent.includes('مغلق') || doc.querySelector('.forum_locked')) {
            isCurrentLocked = true; 
            banner.style.display = 'flex';
            actionBtn.className = 'btn-locked'; 
            actionBtn.innerHTML = '<i class="material-symbols-outlined">lock</i> مغلق'; 
            actionBtn.style.display = 'inline-flex'; 
            actionBtn.onclick = null;
            if (actionBtnBottom) { 
                actionBtnBottom.className = 'btn-locked'; 
                actionBtnBottom.innerHTML = '<i class="material-symbols-outlined">lock</i> مغلق'; 
                actionBtnBottom.style.display = 'inline-flex'; 
                actionBtnBottom.onclick = null; 
            }
        } else {
            isCurrentLocked = false;
            actionBtn.className = 'btn-action'; 
            actionBtn.innerHTML = '<i class="material-symbols-outlined">add_circle</i> موضوع جديد'; 
            actionBtn.style.display = 'inline-flex'; 
            actionBtn.onclick = preparePostModal;
            if (actionBtnBottom) { 
                actionBtnBottom.className = 'btn-action'; 
                actionBtnBottom.innerHTML = '<i class="material-symbols-outlined">add_circle</i> موضوع جديد'; 
                actionBtnBottom.style.display = 'inline-flex'; 
                actionBtnBottom.onclick = preparePostModal; 
            }
        }
        if (id === 'latest') { 
            actionBtn.style.display = 'none'; 
            if (actionBtnBottom) {
                actionBtnBottom.style.display = 'none'; 
            }
        }
        const permsBlock = Array.from(doc.querySelectorAll('.block-content')).find(b => b.textContent.includes('تستطيع'));
        if (permsBlock && id !== 'latest') {
            let h = permsBlock.innerHTML.toLowerCase().split('<br>').join(String.fromCharCode(10)).split('<br/>').join(String.fromCharCode(10)).split('<br />').join(String.fromCharCode(10));
            let cleanLines = [];
            h.split(String.fromCharCode(10)).forEach(line => {
                let cleanText = line.replace(/<[^>]*>?/gm, '').trim();
                if (cleanText && !cleanText.includes('الإشراف') && !cleanText.includes('تستطيع الإشراف')) {
                    cleanText = cleanText.split('هذا المنتدى').join('هذا القسم');
                    let iconName = cleanText.includes('لا تستطيع') ? 'cancel' : 'check_circle';
                    let iconColor = cleanText.includes('لا تستطيع') ? 'var(--danger)' : 'var(--primary)';
                    cleanLines.push(`<div style="display:flex; align-items:center; gap:6px; font-size:13px; font-weight:700;"><i class="material-symbols-outlined" style="color:${iconColor}; font-size:18px;">${iconName}</i> ${cleanText}</div>`);
                }
            });
            if (cleanLines.length > 0) { 
                lvPerms.innerHTML = cleanLines.join(''); 
                lvPermBox.style.display = 'block'; 
            }
        }
        let rawTopics = Array.from(doc.querySelectorAll('div.post-wrap, .posts-section, .block-topics-content, li.row, tr.topicrow, div.topic'));
        let processedTopics = new Set();
        let uniqueTopics = [];
        rawTopics.forEach(t => {
            const linkNode = t.querySelector('.posts-description h3 a, .topic-title, .topictitle');
            if (linkNode) { 
                const href = linkNode.getAttribute('href'); 
                if (!processedTopics.has(href)) { 
                    processedTopics.add(href); 
                    uniqueTopics.push(t); 
                } 
            }
        });
        
        container.innerHTML = '';
        
        if (uniqueTopics.length === 0) { 
            container.innerHTML = `
                <div class="empty-state" style="display:flex; justify-content:center; align-items:center; flex-direction:column; gap:10px; padding: 25px;">
                    <i class="material-symbols-outlined" style="font-size:40px;">info</i> لا يوجد مواضيع في هذا القسم
                </div>
            `; 
            return; 
        }
        uniqueTopics.forEach(t => {
            const titleNode = t.querySelector('.posts-description h3 a, .topic-title, .topictitle');
            let cloneTitle = titleNode.cloneNode(true); 
            cloneTitle.querySelectorAll('img, i, svg').forEach(el => el.remove());
            const title = cloneTitle.textContent.split('notifications').join('').trim();
            const link = titleNode.getAttribute('href');
            let typeBadge = '';
            let h3Node = titleNode.closest('h3') || titleNode.parentNode;
            if (h3Node) {
                let cloneH3 = h3Node.cloneNode(true); 
                cloneH3.querySelectorAll('a, span.radio, input').forEach(el => el.remove());
                let typeText = cloneH3.textContent.trim();
                if (typeText.endsWith(':') || typeText.endsWith('：')) {
                    typeText = typeText.substring(0, typeText.length - 1).trim();
                }
                if (typeText.indexOf('إعلان عام') !== -1) {
                    typeBadge = `<span style="background: var(--danger); color: #fff; padding: 3px 8px; border-radius: 8px; margin-left: 8px;">إعلان عام</span>`;
                } else if (typeText.indexOf('إعلان') !== -1) {
                    typeBadge = `<span style="background: var(--accent); color: #fff; padding: 3px 8px; border-radius: 8px; margin-left: 8px;">إعلان</span>`;
                } else if (typeText.indexOf('مثبت') !== -1) {
                    typeBadge = `<span style="background: var(--primary); color: #000; padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px; font-weight: 800;">مثبت</span>`;
                } else if (typeText) {
                    typeBadge = `<span style="background: rgba(255,255,255,0.1); color: #fff; padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px;">${typeText}</span>`;
                }
            }
            let author = 'زائر';
            let authorColor = 'var(--text-muted)';
            let authorNode = t.querySelector('.topic-author a, .posts-description p a[href^="/u"], .post-author-name a, .name strong a');
            if (!authorNode) {
                authorNode = t.querySelector('.topic-author, .post-author-name, .name strong, .posts-description p');
            }
            if (authorNode) {
                author = getCleanUsername(authorNode, true); 
                let colNode = authorNode.querySelector('[style*="color"], font[color]') || authorNode;
                if (colNode.style && colNode.style.color) {
                    authorColor = colNode.style.color; 
                } else if (colNode.getAttribute('color')) {
                    authorColor = colNode.getAttribute('color');
                }
            }
            if (!author || author.includes('عضو') || author.includes('زائر')) {
                let fallbackNode = t.querySelector('.forum-lastpost-author, .last-post-author, .topic-author, .post-author-name');
                if (fallbackNode) { 
                    author = getCleanUsername(fallbackNode, true); 
                    let colNode = fallbackNode.querySelector('[style*="color"], font[color]') || fallbackNode; 
                    if (colNode.style && colNode.style.color) {
                        authorColor = colNode.style.color; 
                    }
                }
            }
            const repliesNode = t.querySelector('.posts-statistics-replies, td.posts, .block-topics-views'); 
            let replies = 0;
            if (repliesNode) { 
                let rNums = extractNumbers(repliesNode.textContent); 
                if (rNums.length > 0) {
                    replies = parseInt(rNums[0]); 
                }
            }
            let lockIcon = t.innerHTML.includes('مغلق') || t.querySelector('img[src*="lock"]') ? '<i class="material-symbols-outlined" style="color:var(--danger)">lock</i> ' : '';
            
            container.insertAdjacentHTML('beforeend', `
                <div class="topic-item">
                    <div class="ti-icon"><i class="material-symbols-outlined">chat_bubble</i></div>
                    <div class="ti-details">
                        <h3>
                            <a href="${link}" data-route="topic" class="ti-title-link">
                                ${lockIcon}${typeBadge}${title}
                            </a>
                        </h3>
                        <div class="ti-meta">
                            <span>
                                <i class="material-symbols-outlined" style="color:${authorColor};">person</i> 
                                <span style="color:${authorColor}; display:inline-flex; align-items:center; cursor:default;">${author}</span>
                            </span>
                        </div>
                    </div>
                    <div class="ti-stats">
                        <b>${replies}</b>
                        <small>تفاعل</small>
                    </div>
                </div>
            `);
        });
        extractPagination(doc, ['forumPaginationTop', 'forumPaginationBottom'], (url) => loadForumData(id, name, url));
        enforceGroupIcons();
    } catch(e) {
        console.error("Load Forum Data Error:", e);
    }
}

async function loadLatestTopics(skipPush = false) {
    const targetUrl = '/search?search_id=newposts';
    if (!skipPush) {
        window.history.pushState({}, '', BASE_APP_PATH + '?target=' + targetUrl);
    }
    switchView('listView'); 
    document.getElementById('secTitle').innerHTML = '<i class="material-symbols-outlined">whatshot</i> أحدث المواضيع'; 
    document.getElementById('mainActionBtn').style.display = 'none'; 
    document.getElementById('lockedBanner').style.display = 'none';
    const container = document.getElementById('topicsContainer'); 
    container.innerHTML = '<div class="loader" style="margin:80px auto; display:block;"></div>'; 
    document.getElementById('forumPaginationTop').innerHTML = ''; 
    document.getElementById('forumPaginationBottom').innerHTML = '';
    try {
        const doc = new DOMParser().parseFromString(await fetchWithCache(targetUrl + '&_t=' + Date.now()), 'text/html');
        let processedTopics = new Set();
        let uniqueTopics = [];
        doc.querySelectorAll('.block-topics, div.post-wrap, .posts-section, .block-topics-content, li.row, tr.topictitle, .topiclist li.row, div.topic-item, .forumbg .row').forEach(t => {
            const linkNode = t.querySelector('.posts-description h3 a, .topic-title, .topictitle, a.topictitle, h2 a.topictitle');
            if (linkNode) { 
                const href = linkNode.getAttribute('href'); 
                if (!processedTopics.has(href)) { 
                    processedTopics.add(href); 
                    uniqueTopics.push(t); 
                } 
            }
        });
        
        container.innerHTML = '';
        
        if (uniqueTopics.length === 0) { 
            container.innerHTML = `
                <div class="empty-state" style="display:flex; justify-content:center; align-items:center; flex-direction:column; gap:10px; padding: 25px;">
                    <i class="material-symbols-outlined" style="font-size:40px;">info</i> لا توجد مواضيع حديثة
                </div>
            `; 
            return; 
        }
        uniqueTopics.forEach(t => {
            const titleNode = t.querySelector('.posts-description h3 a, .topic-title, .topictitle, a.topictitle, h2 a.topictitle');
            let cloneTitle = titleNode.cloneNode(true); 
            cloneTitle.querySelectorAll('img, i, svg').forEach(el => el.remove());
            const title = cloneTitle.textContent.split('notifications').join('').trim();
            const link = titleNode.getAttribute('href');
            let typeBadge = '';
            let h3Node = titleNode.closest('h3') || titleNode.parentNode;
            if (h3Node) {
                let cloneH3 = h3Node.cloneNode(true); 
                cloneH3.querySelectorAll('a, span.radio, input').forEach(el => el.remove());
                let typeText = cloneH3.textContent.trim(); 
                if (typeText.endsWith(':') || typeText.endsWith('：')) {
                    typeText = typeText.substring(0, typeText.length - 1).trim();
                }
                if (typeText.indexOf('إعلان عام') !== -1) {
                    typeBadge = `<span style="background: var(--danger); color: #fff; padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px;">إعلان عام</span>`;
                } else if (typeText.indexOf('إعلان') !== -1) {
                    typeBadge = `<span style="background: var(--accent); color: #fff; padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px;">إعلان</span>`;
                } else if (typeText.indexOf('مثبت') !== -1) {
                    typeBadge = `<span style="background: var(--primary); color: #000; padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px; font-weight: 800;">مثبت</span>`;
                } else if (typeText) {
                    typeBadge = `<span style="background: var(--item-bg); color: var(--text-strong); padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px; border: 1px solid var(--item-border);">${typeText}</span>`;
                }
            }
            let author = 'زائر';
            let authorColor = 'var(--text-muted)';
            let authorNode = t.querySelector('.topic-author a, .posts-description p a[href^="/u"], .post-author-name a, .name strong a, .author a, .block-topics-author a');
            if (!authorNode) {
                authorNode = t.querySelector('.topic-author, .post-author-name, .name strong, .posts-description p, .author');
            }
            if (authorNode) { 
                author = getCleanUsername(authorNode, true); 
                let colNode = authorNode.querySelector('[style*="color"], font[color]') || authorNode; 
                if (colNode.style && colNode.style.color) {
                    authorColor = colNode.style.color; 
                }
            }
            if (!author || author.includes('عضو') || author.includes('زائر')) { 
                let fbNode = t.querySelector('.forum-lastpost-author, .last-post-author, .block-topics-lastpost-author'); 
                if (fbNode) {
                    author = getCleanUsername(fbNode, true); 
                }
            }
            const repliesNode = t.querySelector('.posts-statistics-replies, td.posts, .block-topics-views, dd.posts, .block-topics-posts'); 
            let replies = 0;
            if (repliesNode) { 
                let rNums = extractNumbers(repliesNode.textContent); 
                if (rNums.length > 0) {
                    replies = parseInt(rNums[0]); 
                }
            }
            container.insertAdjacentHTML('beforeend', `
                <div class="topic-item">
                    <div class="ti-icon"><i class="material-symbols-outlined">forum</i></div>
                    <div class="ti-details">
                        <h3>
                            <a href="${link}" data-route="topic" class="ti-title-link">
                                ${typeBadge}${title}
                            </a>
                        </h3>
                        <div class="ti-meta">
                            <span>
                                <i class="material-symbols-outlined" style="color:${authorColor}">person</i> 
                                <span style="color:${authorColor}; display:inline-flex; align-items:center; cursor:default;">${author}</span>
                            </span>
                        </div>
                    </div>
                    <div class="ti-stats">
                        <b>${replies}</b>
                        <small>تفاعل</small>
                    </div>
                </div>
            `);
        });
        extractPagination(doc, ['forumPaginationTop', 'forumPaginationBottom'], (url) => loadForumData('latest', 'أحدث المواضيع', url));
        enforceGroupIcons();
    } catch(e) {
        console.error("Load Latest Topics Error:", e);
    }
}

async function loadDiscoverActivity(skipPush = false) {
    if (!skipPush) {
        window.history.pushState({}, '', BASE_APP_PATH + '?target=/discover');
    }
    switchView('discoverView'); 
    const container = document.getElementById('discoverContainer'); 
    container.innerHTML = '<div class="loader" style="margin:80px auto; display:block;"></div>';
    try {
        const doc = new DOMParser().parseFromString(await fetchWithCache('/discover?_t=' + Date.now()), 'text/html');
        const items = doc.querySelectorAll('.feed-item');
        
        container.innerHTML = '';
        
        if (items.length === 0) {
            container.innerHTML = window.currentUserIsGuest ? `
                <div class="empty-state" style="padding:25px;">
                    <i class="material-symbols-outlined" style="font-size: 40px; margin-bottom: 10px; display: block; color: var(--danger);">lock</i>يجب تسجيل الدخول لمعاينة الأنشطة.
                </div>
            ` : `
                <div class="empty-state" style="padding:25px;">لا توجد أنشطة لعرضها</div>
            `;
            return;
        }
        items.forEach(item => {
            let styleAttr = item.getAttribute('style') || '';
            let avatar = 'https://2img.net/i/fa/modernbb/pp-blank-thumb.png';
            if (styleAttr.indexOf('url(') !== -1) { 
                let urlPart = styleAttr.split('url(')[1].split(')')[0]; 
                avatar = urlPart.split("'").join("").split('"').join(""); 
            }
            const time = item.querySelector('.time')?.textContent || ''; 
            let textNode = item.querySelector('.text');
            if (textNode) {
                textNode.querySelectorAll('a').forEach(a => {
                    const href = a.getAttribute('href');
                    if (href && href.indexOf('/u') === 0) {
                        let span = document.createElement('span');
                        span.innerHTML = getCleanUsername(a, true);
                        span.style.cssText = "display:inline-flex; align-items:center; color:var(--primary); font-weight:900; cursor:default;";
                        a.replaceWith(span);
                    } else if (href && (href.indexOf('/t') === 0 || href.indexOf('/r') === 0)) { 
                        a.setAttribute('data-route', 'topic');
                        a.removeAttribute('onclick');
                    }
                });
            }
            container.insertAdjacentHTML('beforeend', `
                <div class="activity-item">
                    <img src="${avatar}">
                    <div class="activity-details">
                        <div class="activity-time">
                            <i class="material-symbols-outlined" style="font-size:16px;">schedule</i> ${time}
                        </div>
                        <div style="font-size:14px; font-weight:600">${textNode ? textNode.innerHTML : ''}</div>
                    </div>
                </div>
            `);
        });
        enforceGroupIcons();
    } catch(e) {
        console.error("Load Discover Error:", e);
    }
}

async function openTopic(url, skipPush = false){
    let cleanUrl = url.split('_t=')[0]; 
    if (cleanUrl.endsWith('?') || cleanUrl.endsWith('&')) {
        cleanUrl = cleanUrl.substring(0, cleanUrl.length - 1);
    }
    if (!skipPush) {
        window.history.pushState({}, '', BASE_APP_PATH + '?target=' + cleanUrl);
    }
    currentTopicUrl = cleanUrl; 
    switchView('topicView');
    document.getElementById('tvTitle').textContent = 'جاري التحميل...'; 
    document.getElementById('tvPostsContainer').innerHTML = '<div class="loader" style="margin:80px auto; display:block;"></div>'; 
    document.getElementById('topicPaginationTop').innerHTML = ''; 
    document.getElementById('topicPaginationBottom').innerHTML = '';
    const replyTop = document.getElementById('replyBtnTop');
    const replyBottom = document.getElementById('replyBtnBottom');
    let scInst = $('#qrContent').sceditor('instance'); 
    if (scInst) {
        scInst.val(''); 
    } else {
        document.getElementById('qrContent').value = '';
    }
    try {
        const html = await fetchWithCache(`${cleanUrl}${cleanUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const fLinks = Array.from(doc.querySelectorAll('a.nav, .breadcrumb a, .pathname-box a, p.nav a'));
        for (let i = fLinks.length - 1; i >= 0; i--) {
            let href = fLinks[i].getAttribute('href');
            if (href && href.indexOf('/f') !== -1) { 
                currentForumId = parseInt(href.split('/f')[1].split('-')[0].split('?')[0]); 
                currentForumName = fLinks[i].textContent.trim(); 
                break; 
            }
        }
        activeReplyFormHTML = doc.querySelector('#quick_reply')?.outerHTML || '';
        const replyBtn = doc.querySelector('a[href*="mode=reply"]');
        const hasQuickReplyForm = doc.querySelector('#quick_reply') || doc.querySelector('form[name="post"][action*="mode=reply"]');
        const isTopicLocked = html.includes('هذا الموضوع مقفل') || html.includes('btn-topic-locked') || (replyBtn && (replyBtn.textContent.includes('مغلق') || replyBtn.querySelector('img[src*="locked"]')));
        if (!replyBtn && !hasQuickReplyForm) {
            document.getElementById('quickReplyBox').style.display='none'; 
            if (replyTop) replyTop.style.display='none'; 
            if (replyBottom) replyBottom.style.display='none';
        } else if (isTopicLocked || isCurrentLocked) {
            document.getElementById('quickReplyBox').style.display='none';
            if (replyTop) { 
                replyTop.className = 'btn-locked'; 
                replyTop.innerHTML = '<i class="material-symbols-outlined">lock</i> مغلق'; 
                replyTop.style.display = 'inline-flex'; 
                replyTop.onclick = null; 
            }
            if (replyBottom) { 
                replyBottom.className = 'btn-locked'; 
                replyBottom.innerHTML = '<i class="material-symbols-outlined">lock</i> مغلق'; 
                replyBottom.style.display = 'inline-flex'; 
                replyBottom.onclick = null; 
            }
        } else {
            document.getElementById('quickReplyBox').style.display='block';
            if (replyTop) { 
                replyTop.className = 'btn-action'; 
                replyTop.innerHTML = '<i class="material-symbols-outlined">reply</i> رد جديد'; 
                replyTop.style.display = 'inline-flex'; 
                replyTop.onclick = scrollToReply; 
            }
            if (replyBottom) { 
                replyBottom.className = 'btn-action'; 
                replyBottom.innerHTML = '<i class="material-symbols-outlined">reply</i> رد جديد'; 
                replyBottom.style.display = 'inline-flex'; 
                replyBottom.onclick = scrollToReply; 
            }
        }
        let titleNode = doc.querySelector('.topic-header h1 a, h1');
        if (titleNode) { 
            let cloneTitle = titleNode.cloneNode(true); 
            cloneTitle.querySelectorAll('img, i, svg').forEach(el => el.remove()); 
            document.getElementById('tvTitle').textContent = cloneTitle.textContent.split('notifications').join('').trim(); 
        } else {
            document.getElementById('tvTitle').textContent = 'موضوع';
        }
        const permsBlock = Array.from(doc.querySelectorAll('.block-content')).find(b => b.textContent.includes('تستطيع')); 
        let permsHTML = '<p style="color: var(--text-muted);">الصلاحيات غير متوفرة</p>';
        if (permsBlock) {
            let h = permsBlock.innerHTML.toLowerCase().split('<br>').join(String.fromCharCode(10)).split('<br/>').join(String.fromCharCode(10)).split('<br />').join(String.fromCharCode(10));
            let cleanLines = [];
            h.split(String.fromCharCode(10)).forEach(line => {
                let cleanText = line.replace(/<[^>]*>?/gm, '').trim();
                if (cleanText && !cleanText.includes('الإشراف') && !cleanText.includes('تستطيع الإشراف')) {
                    cleanText = cleanText.split('هذا المنتدى').join('هذا القسم');
                    let iconName = cleanText.includes('لا تستطيع') ? 'cancel' : 'check_circle';
                    let iconColor = cleanText.includes('لا تستطيع') ? 'var(--danger)' : 'var(--primary)';
                    cleanLines.push(`<div class="perms-item"><i class="material-symbols-outlined" style="color:${iconColor};">${iconName}</i> ${cleanText}</div>`);
                }
            });
            if (cleanLines.length > 0) {
                permsHTML = cleanLines.join(''); 
            } else {
                permsHTML = '<p style="color: var(--text-muted);">لا توجد صلاحيات لعرضها.</p>';
            }
        }
        document.getElementById('tvPermissions').innerHTML = permsHTML;
        const adminTools = doc.querySelector('.topic-admin');
        const tvAdmin = document.getElementById('tvAdminTools');
        const tvAdminBottom = document.getElementById('tvAdminToolsBottom');
        tvAdmin.innerHTML = ''; 
        if (tvAdminBottom) {
            tvAdminBottom.innerHTML = '';
        }
        if (adminTools) {
            let adminButtonsHTML = '';
            adminTools.querySelectorAll('a').forEach(a => {
                const href = a.getAttribute('href'); 
                if (!href || href.includes('split') || href.includes('merge') || href.includes('trash')) {
                    return;
                }
                let icon = 'settings';
                let customTitle = 'إجراء';
                let isTopicDel = false;
                if (href.includes('delete')) { 
                    icon = 'delete_forever'; 
                    customTitle = 'حذف الموضوع'; 
                    isTopicDel = true; 
                } else if (href.includes('lock')) { 
                    icon = 'lock'; 
                    customTitle = 'قفل الموضوع'; 
                } else if (href.includes('unlock')) { 
                    icon = 'lock_open'; 
                    customTitle = 'فتح الموضوع'; 
                } else if (href.includes('move')) { 
                    icon = 'drive_file_move'; 
                    customTitle = 'نقل الموضوع'; 
                }
                const btnClass = isTopicDel ? 'btn-icon danger' : 'btn-icon';
                if (href.includes('move')) {
                    adminButtonsHTML += `<button class="${btnClass}" onclick="openActionModal('${href}', '${customTitle}')" title="${customTitle}"><i class="material-symbols-outlined">${icon}</i></button>`;
                } else {
                    adminButtonsHTML += `<button class="${btnClass}" onclick="silentAdminAction('${href}', '${customTitle}', ${isTopicDel})" title="${customTitle}"><i class="material-symbols-outlined">${icon}</i></button>`;
                }
            });
            tvAdmin.innerHTML = adminButtonsHTML; 
            if (tvAdminBottom) {
                tvAdminBottom.innerHTML = adminButtonsHTML;
            }
        }
        const container = document.getElementById('tvPostsContainer'); 
        container.innerHTML = '';
        let rawPosts = Array.from(doc.querySelectorAll('div.post-wrap')); 
        if (rawPosts.length === 0) {
            rawPosts = Array.from(doc.querySelectorAll('div.post'));
        }
        let processedPosts = new Set();
        let uniquePosts = [];
        rawPosts.forEach(p => { 
            let pid = p.getAttribute('id') || (p.querySelector('a[name]')?.name) || Math.random().toString(); 
            if (!processedPosts.has(pid)) { 
                processedPosts.add(pid); 
                uniquePosts.push(p); 
            } 
        });
        uniquePosts.forEach(post => {
            let authorNode = post.querySelector('.post-author-name a, .name strong a, .name a, .name strong, .name, .post-author-name, .author');
            let pureAuthor = getCleanUsername(authorNode, false);
            let authorHtmlContent = getCleanUsername(authorNode, true);
            let avatar = post.querySelector('.avatar-big img, .post-author-avatar img')?.src || 'https://2img.net/i/fa/modernbb/pp-blank-thumb.png';
            let date = post.querySelector('.post-date')?.textContent || '';
            let authorColor = 'var(--text-strong)';
            if (authorNode) { 
                let colNode = authorNode.querySelector('[style*="color"], font[color]') || authorNode; 
                if (colNode.style && colNode.style.color) {
                    authorColor = colNode.style.color; 
                } else if (colNode.getAttribute('color')) {
                    authorColor = colNode.getAttribute('color');
                }
            }
            let rankNode = post.querySelector('.post-author-title, .tz-rank');
            let rankHTML = rankNode ? rankNode.innerHTML : 'عضو';
            let sigHTML = '';
            let sigNode = post.querySelector('.post-signature, .signature_div, .sig-content, div[id^="sig"], div[class*="signature"]');
            if (sigNode) {
                sigHTML = sigNode.innerHTML;
            }
            let contentClone = post.querySelector('.post-content, .content, .entry-content')?.cloneNode(true);
            if (contentClone) { 
                let innerSig = contentClone.querySelector('.post-signature, .signature_div, div[id^="sig"], div[class*="signature"]'); 
                if (innerSig) {
                    innerSig.remove(); 
                }
                contentClone.querySelectorAll('.attachbox').forEach(e => e.remove()); 
            }
            let contentHTML = contentClone ? contentClone.innerHTML : '';
            let attachHTML = post.querySelector('.attachbox')?.outerHTML || '';
            let messages = '0';
            let points = '0';
            let dts = post.querySelectorAll('.post-author-details dt');
            if (dts.length > 0) { 
                dts.forEach(dt => { 
                    const label = dt.textContent.trim();
                    const dd = dt.nextElementSibling; 
                    if (dd && dd.tagName.toLowerCase() === 'dd') { 
                        if (label.includes('المساهمات') || label.includes('مشاركات')) {
                            messages = dd.textContent.trim(); 
                        } else if (label.includes('نقاط')) {
                            points = dd.textContent.trim(); 
                        }
                    } 
                }); 
            } else { 
                const txt = post.querySelector('.post-author, .postprofile')?.textContent || ''; 
                if (txt.indexOf('المساهمات') !== -1 || txt.indexOf('مشاركات') !== -1) { 
                    let parts = txt.indexOf('المساهمات') !== -1 ? txt.split('المساهمات') : txt.split('مشاركات'); 
                    let nums = extractNumbers(parts[1]); 
                    if (nums.length > 0) {
                        messages = nums[0]; 
                    }
                } 
                if (txt.indexOf('نقاط') !== -1 || txt.indexOf('النقاط') !== -1) { 
                    let parts = txt.indexOf('نقاط') !== -1 ? txt.split('نقاط') : txt.split('النقاط'); 
                    let nums = extractNumbers(parts[1]); 
                    if (nums.length > 0) {
                        points = nums[0]; 
                    }
                } 
            }
            const btnEdit = post.querySelector('a[href*="mode=editpost"]')?.getAttribute('href');
            const btnDel = post.querySelector('a[href*="mode=delete"]')?.getAttribute('href');
            
            let bs = String.fromCharCode(92);
            let safeAuthor = pureAuthor.split(bs).join(bs+bs).split("'").join(bs+"'").split('"').join('&quot;');
            let safeHTML = contentHTML.split(bs).join(bs+bs).split("'").join(bs+"'").split('"').join('&quot;');
            
            let btnsHTML = '';
            if (replyBtn || hasQuickReplyForm) {
                btnsHTML += `<button class="btn-icon" onclick="quotePost(decodeURIComponent('${safeEncode(safeAuthor)}'), decodeURIComponent('${safeEncode(safeHTML)}'))" title="اقتباس"><i class="material-symbols-outlined">format_quote</i></button>`;
            }
            if (btnEdit) {
                btnsHTML += `<button class="btn-icon" onclick="prepareEdit('${btnEdit}')" title="تعديل"><i class="material-symbols-outlined">edit</i></button>`;
            }
            if (btnDel) {
                btnsHTML += `<button class="btn-icon danger" onclick="silentAdminAction('${btnDel}', 'حذف المساهمة', false)" title="حذف الرد"><i class="material-symbols-outlined">delete</i></button>`;
            }
            const authorHtml = `<span style="color:${authorColor}; display:inline-flex; align-items:center; cursor:default;">${authorHtmlContent}</span>`;
            let postOriginalId = post.getAttribute('id') || ''; 
            if (!postOriginalId && btnEdit) { 
                if (btnEdit.indexOf('p=') !== -1) {
                    postOriginalId = 'post-' + btnEdit.split('p=')[1].split('&')[0]; 
                }
            }
            container.insertAdjacentHTML('beforeend', `
                <div class="post-card" id="${postOriginalId}">
                    <div class="pc-sidebar">
                        <div class="pc-avatar" style="border-color:${authorColor}; cursor:default;">
                            <img src="${avatar}">
                        </div>
                        <div class="pc-author">${authorHtml}</div>
                        <div class="pc-rank" style="color:${authorColor}; border-color:${authorColor}; display:flex; justify-content:center; align-items:center;">
                            ${rankHTML}
                        </div>
                        <div class="pc-stats">
                            <div><i class="material-symbols-outlined" style="color: var(--primary);">chat</i> مساهمات: <b style="color:var(--text-strong);">${messages}</b></div>
                            <div><i class="material-symbols-outlined" style="color: #fbbf24;">stars</i> نقاط: <b style="color:var(--text-strong);">${points}</b></div>
                        </div>
                    </div>
                    <div class="pc-content">
                        <div class="pc-meta">
                            <div class="pc-date"><i class="material-symbols-outlined">schedule</i> ${date}</div>
                            <div class="p-actions">${btnsHTML}</div>
                        </div>
                        <div class="pc-html">${contentHTML} ${attachHTML}</div>
                        ${sigHTML ? `<div class="pc-signature">${sigHTML}</div>` : ''}
                    </div>
                </div>
            `);
        });
        setTimeout(applyLuffyAddons, 100);
        extractPagination(doc, ['topicPaginationTop', 'topicPaginationBottom'], (pUrl) => openTopic(pUrl));
        enforceGroupIcons();
    } catch(e) {
        console.error("Open Topic Error:", e);
    }
}

function applyLuffyAddons() {
    $('.pc-html').find('.codebox, blockquote').each(function() {
        var $orig = $(this); 
        if ($orig.hasClass('Luffy-built')) return;
        var isCode = $orig.hasClass('codebox') || $orig[0].tagName.toLowerCase() === 'code' || $orig.find('code').length > 0;
        if (!isCode) return; 
        $orig.addClass('Luffy-built');
        var cleanHTML = ($orig.find('code').length ? $orig.find('code') : $orig).html();
        var tpl = `
            <div class="Luffy-code-wrapper">
                <div class="Luffy-code-header">
                    <div class="Luffy-mac-dots">
                        <span class="Luffy-dot-r"></span>
                        <span class="Luffy-dot-y"></span>
                        <span class="Luffy-dot-g"></span>
                    </div>
                    <span class="Luffy-code-title">CODE / BISS KEY</span>
                    <button type="button" class="Luffy-copy-action">
                        <i class="material-symbols-outlined" style="font-size:14px">content_copy</i> نسخ الكود
                    </button>
                </div>
                <div class="Luffy-code-area">
                    <code>${cleanHTML}</code>
                </div>
            </div>
        `;
        $orig.replaceWith(tpl);
    });
    $('.pc-html').each(function() {
        $(this).find('a').each(function() {
            var $lnk = $(this);
            var h = $lnk.attr('href') || '';
            if (h === '' || h.indexOf('javascript:')===0 || h.indexOf('#')===0 || $lnk.hasClass('Luffy-dl-btn')) {
                return;
            }
            var isCloud = false;
            var clouds = ['mediafire.com', 'mega.nz', 'drive.google', 'dropbox.com', 'github.com']; 
            clouds.forEach(c => { 
                if (h.toLowerCase().indexOf(c) !== -1) {
                    isCloud = true; 
                }
            });
            var extRegex = false;
            var extStr = h.split('?')[0].toLowerCase();
            var exts = ['.zip', '.rar', '.7z', '.apk', '.exe', '.bin', '.mp4', '.mp3', '.pdf', '.iso']; 
            exts.forEach(e => { 
                if (extStr.endsWith(e)) {
                    extRegex = true; 
                }
            });
            if (isCloud || extRegex) {
                var fileTxt = $lnk.text().trim(); 
                if (fileTxt.indexOf('http')===0 || fileTxt.length > 45 || fileTxt==='') {
                    fileTxt = "ملف للتحميل المباشر";
                }
                var tpl = `
                    <div class="Luffy-dl-card">
                        <div class="Luffy-dl-right">
                            <div class="Luffy-dl-icon-wrap">
                                <i class="material-symbols-outlined">folder_zip</i>
                            </div>
                            <div class="Luffy-dl-meta">
                                <span class="Luffy-dl-title" title="${fileTxt}">${fileTxt}</span>
                                <span class="Luffy-dl-sub">
                                    <i class="material-symbols-outlined">verified_user</i> آمن وجاهز للتحميل
                                </span>
                            </div>
                        </div>
                        <a href="${h}" target="_blank" class="Luffy-dl-btn" rel="nofollow noopener">
                            <i class="material-symbols-outlined" style="font-size:18px">download</i> تحميل
                        </a>
                    </div>
                `;
                $lnk.replaceWith(tpl);
            }
        });
    });
    var $firstPost = $('.post-card').first();
    if ($firstPost.length && !$('.Luffy-hub-container').length) {
        var rawTitle = $('#tvTitle').text().trim() || document.title;
        var cleanUrl = window.location.href.split('#')[0];
        var u = encodeURIComponent(cleanUrl);
        var t = encodeURIComponent(rawTitle);
        var waSvg = '<svg viewBox="0 0 24 24"><path d="M12.031 0C5.395 0 0 5.394 0 12.033c0 2.115.553 4.181 1.603 5.998L.526 23.518l5.62-1.474a11.97 11.97 0 0 0 5.885 1.526h.005c6.634 0 12.034-5.396 12.034-12.035C24.07 4.903 18.672 0 12.031 0zm0 19.563c-1.79 0-3.542-.482-5.08-1.393l-.364-.216-3.774.99.999-3.681-.237-.378A9.997 9.997 0 0 1 2.006 12.03c0-5.523 4.495-10.02 10.024-10.02 5.526 0 10.02 4.498 10.02 10.02 0 5.525-4.492 10.02-10.019 10.02z"/></svg>';
        var tgSvg = '<svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>';
        var fbSvg = '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
        var xSvg = '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
        var rdSvg = '<svg viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.249-1.25-1.249zm-2.752 4.698c-1.514 0-2.626-.715-2.714-.793a.31.31 0 0 1-.046-.44.309.309 0 0 1 .439-.046c.045.037.957.659 2.321.659 1.366 0 2.277-.622 2.323-.659a.311.311 0 0 1 .439.046.31.31 0 0 1-.046.44c-.088.078-1.2.793-2.716.793z"/></svg>';
        var inSvg = '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';
        var hubHtml = `
            <div class="Luffy-hub-container">
                <div class="Luffy-hub-card">
                    <div class="Luffy-hub-title">
                        <i class="material-symbols-outlined">share</i>
                        <span>مشاركة الموضوع:</span>
                    </div>
                    <div class="Luffy-hub-actions">
                        <a href="https://api.whatsapp.com/send?text=${t}%20-%20${u}" target="_blank" class="Luffy-chip Luffy-c-wa">${waSvg}</a>
                        <a href="https://t.me/share/url?url=${u}&text=${t}" target="_blank" class="Luffy-chip Luffy-c-tg">${tgSvg}</a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" class="Luffy-chip Luffy-c-fb">${fbSvg}</a>
                        <a href="https://twitter.com/intent/tweet?text=${t}&url=${u}" target="_blank" class="Luffy-chip Luffy-c-x">${xSvg}</a>
                        <a href="https://www.reddit.com/submit?url=${u}&title=${t}" target="_blank" class="Luffy-chip Luffy-c-rd">${rdSvg}</a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${u}" target="_blank" class="Luffy-chip Luffy-c-in">${inSvg}</a>
                        <button type="button" class="Luffy-chip Luffy-c-copy" id="Luffy-hub-copy">
                            <i class="material-symbols-outlined">content_copy</i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        $firstPost.find('.pc-html').after(hubHtml);
    }
}

$(document).on('click', '.Luffy-copy-action', async function() {
    var $btn = $(this);
    var txt = $btn.closest('.Luffy-code-wrapper').find('.Luffy-code-area code').text();
    
    try {
        await navigator.clipboard.writeText(txt);
        $btn.html('<i class="material-symbols-outlined" style="font-size:14px">done</i> تم النسخ'); 
        setTimeout(() => { 
            $btn.html('<i class="material-symbols-outlined" style="font-size:14px">content_copy</i> نسخ الكود'); 
        }, 2000); 
    } catch(e) {
        console.error("Copy failed", e);
    }
});

$(document).on('click', '#Luffy-hub-copy', async function() {
    var rawTitle = $('#tvTitle').text().trim() || document.title;
    var cleanUrl = window.location.href.split('#')[0];
    let nl = String.fromCharCode(10);
    let cr = String.fromCharCode(13);
    
    let textToCopy = "📋 موضوع: " + rawTitle + cr + nl + "🔗 الرابط: " + cleanUrl;
    
    try {
        await navigator.clipboard.writeText(textToCopy);
        showToast('تم نسخ الرابط!'); 
    } catch (err) {
        console.error("Copy failed", err);
    }
});

function backToList() { 
    if (currentForumId) {
        loadForumData(currentForumId, currentForumName); 
    } else {
        loadPremiumCategories(); 
    }
}

async function solveRecaptcha(form) {
    const spamParams = new URLSearchParams();
    form.querySelectorAll('input[type="hidden"], input[type="text"], input[type="password"], input[type="email"], select, textarea, input[type="radio"]:checked, input[type="checkbox"]:checked').forEach(inp => { 
        if (inp.name && inp.name !== 'g-recaptcha-response') {
            spamParams.append(inp.name, inp.value); 
        }
    });
    if (form.querySelector('button[name="post"]') || form.querySelector('input[name="post"]')) {
        spamParams.append('post', '1');
    }
    if (form.querySelector('input[name="confirm"]')) {
        spamParams.append('confirm', '1');
    }
    let sitekey = '';
    let rDiv = form.querySelector('.g-recaptcha'); 
    if (rDiv && rDiv.getAttribute('data-sitekey')) {
        sitekey = rDiv.getAttribute('data-sitekey');
    }
    if (!sitekey) {
        let rcScript = document.querySelector('script[src*="recaptcha/api.js?render="]');
        if (rcScript) {
            try {
                const urlObj = new URL(rcScript.src);
                sitekey = urlObj.searchParams.get('render') || rcScript.src.split('render=')[1].split('&')[0];
            } catch (e) {
                sitekey = rcScript.src.split('render=')[1].split('&')[0];
            }
        }
    }
    const token = await new Promise(resolve => { 
        if (sitekey && window.grecaptcha && typeof grecaptcha.execute === 'function') {
            grecaptcha.ready(() => { 
                grecaptcha.execute(sitekey, {action: 'submit'}).then(resolve).catch(() => resolve('')); 
            }); 
        } else {
            resolve(''); 
        }
    });
    if (token) {
        spamParams.append('g-recaptcha-response', token); 
    }
    return spamParams;
}

async function handleSilentRequest(url, formData) {
    let res = await fetch(url, { method: 'POST', body: formData });
    let html = await res.text();
    let doc = new DOMParser().parseFromString(html, 'text/html');
    const spamForm = Array.from(doc.querySelectorAll('form')).find(f => 
        f.querySelector('.cf-turnstile') || 
        f.querySelector('.g-recaptcha') || 
        f.querySelector('input[name="post_confirm"]') || 
        (f.querySelector('input[name="confirm"]') && !f.id.includes('search')) 
    );
    if (spamForm) {
        if (spamForm.querySelector('.cf-turnstile')) {
            return new Promise((resolve, reject) => {
                openModal('adminModal'); 
                document.getElementById('adminModalTitle').innerHTML = '<i class="material-symbols-outlined">security</i> تأكيد الأمان';
                if (!document.querySelector('script[src*="turnstile"]')) { 
                    const cfScript = document.createElement('script'); 
                    cfScript.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"; 
                    cfScript.async = true; 
                    cfScript.defer = true; 
                    document.head.appendChild(cfScript); 
                }
                spamForm.onsubmit = async (e) => {
                    e.preventDefault(); 
                    const btn = spamForm.querySelector('input[type="submit"], button[type="submit"]');
                    let btnName = btn ? (btn.name || 'post') : 'post';
                    let btnVal = btn ? btn.value : '1';
                    if (btn) { 
                        btn.value = 'جاري التحقق...'; 
                        btn.disabled = true; 
                    }
                    const fd = new FormData(spamForm); 
                    fd.set(btnName, btnVal); 
                    if (!fd.has('post')) {
                        fd.set('post', '1');
                    }
                    let actionAttr = spamForm.getAttribute('action');
                    let fetchUrl = actionAttr ? new URL(actionAttr, new URL(url, window.location.origin)).toString() : url;
                    try { 
                        let finalHtml = await handleSilentRequest(fetchUrl, fd); 
                        closeModal('adminModal'); 
                        resolve(finalHtml); 
                    } catch(err) { 
                        if (btn) { 
                            btn.value = 'تأكيد'; 
                            btn.disabled = false; 
                        } 
                        reject(err); 
                    }
                };
                const submitBtn = spamForm.querySelector('input[type="submit"]'); 
                if (submitBtn) { 
                    submitBtn.className = 'btn-action'; 
                    submitBtn.style.cssText = 'width: 100%; padding: 16px; font-size: 14px; margin-top: 15px; border: none; cursor: pointer; display: flex; justify-content: center;'; 
                }
                spamForm.querySelectorAll('p').forEach(p => p.style.display = 'none'); 
                document.getElementById('adminActionContent').innerHTML = ''; 
                document.getElementById('adminActionContent').appendChild(spamForm);
                setTimeout(() => { 
                    if (window.turnstile) {
                        spamForm.querySelectorAll('.cf-turnstile').forEach(el => turnstile.render(el)); 
                    }
                }, 500);
            });
        } else {
            const spamParams = await solveRecaptcha(spamForm); 
            let actionAttr = spamForm.getAttribute('action');
            let fetchUrl = actionAttr ? new URL(actionAttr, new URL(url, window.location.origin)).toString() : url;
            return await handleSilentRequest(fetchUrl, spamParams);
        }
    }
    
    return html;
}

async function appendGlobalTokens(fd, doc, actionName = 'submit') {
    let sitekey = '';
    let rcScript = (doc ? doc.querySelector('script[src*="recaptcha/api.js?render="]') : null) || document.querySelector('script[src*="recaptcha/api.js?render="]');
    
    if (rcScript) {
        try {
            sitekey = rcScript.src.split('render=')[1].split('&')[0];
        } catch(e) {}
    }
    
    if (sitekey) {
        if (!document.querySelector(`script[src*="${sitekey}"]`)) {
            await new Promise(resolve => {
                let script = document.createElement('script');
                script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }
        
        if (window.grecaptcha) {
            const token = await new Promise(resolve => {
                grecaptcha.ready(() => {
                    grecaptcha.execute(sitekey, {action: actionName})
                        .then(resolve)
                        .catch(() => resolve(''));
                });
            });
            if (token) fd.set('g-recaptcha-response', token);
        }
    }
}

async function preparePostModal() {
    const btn = document.getElementById('mainActionBtn');
    const btnBottom = document.getElementById('mainActionBtnBottom');
    const origText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.innerHTML = '<i class="material-symbols-outlined" style="animation: spin 1s infinite;">hourglass_empty</i> جاري التحضير...';
    }
    if (btnBottom) {
        btnBottom.innerHTML = '<i class="material-symbols-outlined" style="animation: spin 1s infinite;">hourglass_empty</i> جاري التحضير...';
    }
    try {
        const res = await fetch('/post?f=' + currentForumId + '&mode=newtopic');
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const types = doc.querySelectorAll('input[name="topictype"]');
        const group = document.querySelector('#postModal .radio-group');
        if (group) {
            group.innerHTML = '';
            if (types.length > 0) {
                types.forEach((t, index) => {
                    let val = t.value;
                    let labelText = 'عادي';
                    if (val === '1') {
                        labelText = 'مثبت'; 
                    } else if (val === '2') {
                        labelText = 'إعلان'; 
                    } else if (val === '3') {
                        labelText = 'إعلان عام';
                    } else { 
                        let next = t.nextSibling; 
                        if (next && next.nodeType === 3 && next.textContent.trim()) {
                            labelText = next.textContent.trim(); 
                        }
                    }
                    group.insertAdjacentHTML('beforeend', `<label><input type="radio" name="topictype" value="${val}" ${(t.hasAttribute('checked') || index === 0) ? 'checked' : ''}> ${labelText}</label>`);
                });
            } else {
                group.innerHTML = `<label><input type="radio" name="topictype" value="0" checked> عادي</label>`;
            }
        }
        document.getElementById('topicTitle').value = '';
        let scInst = $('#topicContent').sceditor('instance');
        if (scInst) {
            scInst.val(''); 
        } else {
            document.getElementById('topicContent').value = '';
        }
        openModal('postModal');
    } catch (e) { 
        showToast('حدث خطأ أثناء فتح المحرر!', true); 
        console.error("Prepare Post Modal Error:", e);
    } finally { 
        if (btn) {
            btn.innerHTML = origText; 
        }
        if (btnBottom) {
            btnBottom.innerHTML = origText; 
        }
    }
}

async function submitTopic() {
    let scInst = $('#topicContent').sceditor('instance'); 
    if (scInst) {
        scInst.updateOriginal();
    }
    const subject = document.getElementById('topicTitle').value.trim();
    const message = document.getElementById('topicContent').value.trim();
    const btn = document.getElementById('submitBtn');
    
    if (!subject || !message) {
        return showToast('يجب تعبئة العنوان والمحتوى!', true);
    }
    
    btn.innerHTML = '<i class="material-symbols-outlined" style="animation: spin 1s infinite;">hourglass_empty</i> جاري النشر...'; 
    btn.disabled = true;
    
    try {
        const fRes = await fetch('/post?f=' + currentForumId + '&mode=newtopic');
        const fText = await fRes.text();
        const doc = new DOMParser().parseFromString(fText, 'text/html');
        const form = doc.querySelector('form[name="post"]');
        
        if (!form) {
             throw new Error("تعذر الوصول لنموذج النشر. تأكد من صلاحياتك.");
        }
        
        const fd = new FormData(form);
        fd.set('subject', subject); 
        fd.set('message', message); 
        fd.set('post', '1');
        
        const tType = document.querySelector('input[name="topictype"]:checked')?.value || '0'; 
        fd.set('topictype', tType);
        
        if (window.currentUserIsGuest) { 
            const gName = document.getElementById('guestName')?.value.trim(); 
            fd.set('username', gName ? gName : 'زائر'); 
        }
        
        await appendGlobalTokens(fd, doc, 'submit');
        
        let finalHtml = await handleSilentRequest('/post', fd); 
        
        let errDoc = new DOMParser().parseFromString(finalHtml, 'text/html');
        let errorEl = errDoc.querySelector('.errorwrap, .error, p.error, .block-content-error, .error-box, .msg');
        let hasPostForm = errDoc.querySelector('form[name="post"]');
        let hasSuccessMsg = finalHtml.includes('بنجاح') || finalHtml.includes('تم إرسال') || finalHtml.includes('تفعيل');

        if (errorEl && errorEl.textContent.trim()) {
             throw new Error(errorEl.textContent.trim());
        } else if (hasPostForm && !hasSuccessMsg) {
             throw new Error("حدث خطأ أثناء النشر. تأكد من إكمال البيانات المطلوبة.");
        }

        showToast('تم إرسال الموضوع بنجاح!');
        
        document.getElementById('topicTitle').value = ''; 
        if (scInst) {
            scInst.val(''); 
        } else {
            document.getElementById('topicContent').value = '';
        }
        
        for (let key in AppCache) {
            delete AppCache[key]; 
        }
        
        setTimeout(() => { 
            closeModal('postModal'); 
            loadForumData(currentForumId, currentForumName); 
        }, 1500);
        
    } catch(e) { 
        showToast(e.message || 'فشل النشر! يرجى المحاولة مرة أخرى.', true); 
        console.error("Submit Topic Error:", e);
    } finally { 
        btn.innerHTML = '<i class="material-symbols-outlined">publish</i> نشر الموضوع'; 
        btn.disabled = false; 
    }
}

async function submitReply() {
    let scInst = $('#qrContent').sceditor('instance'); 
    if (scInst) {
        scInst.updateOriginal();
    }
    const message = document.getElementById('qrContent').value.trim();
    const btn = document.getElementById('qrSubmitBtn');
    
    if (!message) {
        return showToast('لا يمكنك إرسال رد فارغ!', true);
    }
    
    btn.innerHTML = '<i class="material-symbols-outlined" style="animation: spin 1s infinite;">hourglass_empty</i> جاري النشر...'; 
    btn.disabled = true;
    
    try {
        let fd;
        let activeDoc;
        
        if (activeReplyFormHTML) { 
            const temp = document.createElement('div'); 
            temp.innerHTML = activeReplyFormHTML; 
            const form = temp.querySelector('form[name="post"]'); 
            if (form) {
                fd = new FormData(form); 
                activeDoc = document; 
            }
        }
        if (!fd) { 
            let tid = 0; 
            if (currentTopicUrl.indexOf('/t') !== -1) {
                tid = parseInt(currentTopicUrl.split('/t')[1].split('-')[0]); 
            }
            const fRes = await fetch('/post?t=' + tid + '&mode=reply'); 
            const docText = await fRes.text();
            activeDoc = new DOMParser().parseFromString(docText, 'text/html');
            const form = activeDoc.querySelector('form[name="post"]');
            if (!form) throw new Error("لا تملك صلاحية الرد على هذا الموضوع.");
            fd = new FormData(form); 
        }
        
        fd.set('message', message); 
        fd.set('post', '1');
        
        if (window.currentUserIsGuest) { 
            const qName = document.getElementById('qrGuestName')?.value.trim(); 
            fd.set('username', qName ? qName : 'زائر'); 
        }
        
        await appendGlobalTokens(fd, activeDoc, 'submit');
        
        let finalHtml = await handleSilentRequest('/post', fd); 
        
        let errDoc = new DOMParser().parseFromString(finalHtml, 'text/html');
        let errorEl = errDoc.querySelector('.errorwrap, .error, p.error, .block-content-error, .error-box, .msg');
        let hasPostForm = errDoc.querySelector('form[name="post"]');
        let hasSuccessMsg = finalHtml.includes('بنجاح') || finalHtml.includes('تم إرسال') || finalHtml.includes('تفعيل');

        if (errorEl && errorEl.textContent.trim()) {
             throw new Error(errorEl.textContent.trim());
        } else if (hasPostForm && !hasSuccessMsg) {
             throw new Error("حدث خطأ أثناء إرسال الرد. تأكد من إكمال البيانات المطلوبة.");
        }

        showToast('تم إرسال الرد بنجاح!');
        
        if (scInst) {
            scInst.val(''); 
        } else {
            document.getElementById('qrContent').value = '';
        }
        
        for (let key in AppCache) {
            delete AppCache[key];
        }
        
        setTimeout(() => openTopic(currentTopicUrl), 1000);
        
    } catch(e) { 
        showToast(e.message || 'فشل إرسال الرد!', true); 
        console.error("Submit Reply Error:", e);
    } finally { 
        btn.innerHTML = '<i class="material-symbols-outlined">send</i> نشر الرد'; 
        btn.disabled = false; 
    }
}

async function previewTopic() {
    let scInst = $('#topicContent').sceditor('instance'); 
    if (scInst) {
        scInst.updateOriginal();
    }
    const subject = document.getElementById('topicTitle').value.trim();
    const message = document.getElementById('topicContent').value.trim();
    const btn = document.getElementById('previewBtn');
    if (!subject || !message) {
        return showToast('يجب تعبئة العنوان والمحتوى للمعاينة!', true);
    }
    btn.innerHTML = 'جاري المعاينة...'; 
    btn.disabled = true;
    try {
        const fRes = await fetch('/post?f=' + currentForumId + '&mode=newtopic');
        const form = new DOMParser().parseFromString(await fRes.text(), 'text/html').querySelector('form[name="post"]');
        if (!form) {
            throw new Error("Form not found");
        }
        const fd = new FormData(form); 
        fd.set('subject', subject); 
        fd.set('message', message); 
        fd.set('preview', '1');
        if (window.currentUserIsGuest) { 
            const gName = document.getElementById('guestName')?.value.trim(); 
            fd.set('username', gName ? gName : 'زائر'); 
        }
        const res = await fetch('/post', { method: 'POST', body: fd });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const previewBlock = doc.querySelector('.post-entry, .content, .postbody, .preview-content, div[class*="content"]');
        if (previewBlock) { 
            previewBlock.querySelectorAll('.attachbox').forEach(e => e.remove()); 
            document.getElementById('previewContentHtml').innerHTML = previewBlock.innerHTML; 
            openModal('previewModal'); 
            setTimeout(applyLuffyAddons, 100); 
        } else {
            showToast('تعذر استخراج المعاينة من السيرفر.', true);
        }
    } catch(e) { 
        showToast('حدث خطأ أثناء الاتصال للمعاينة!', true); 
    } finally { 
        btn.innerHTML = '<i class="material-symbols-outlined">visibility</i> معاينة الموضوع'; 
        btn.disabled = false; 
    }
}

async function previewReply() {
    let scInst = $('#qrContent').sceditor('instance'); 
    if (scInst) {
        scInst.updateOriginal();
    }
    const message = document.getElementById('qrContent').value.trim();
    const btn = document.getElementById('qrPreviewBtn');
    
    if (!message) {
        return showToast('لا يمكنك معاينة رد فارغ!', true);
    }
    
    btn.innerHTML = '<i class="material-symbols-outlined" style="animation: spin 1s infinite;">hourglass_empty</i> جاري المعاينة...'; 
    btn.disabled = true;
    
    try {
        let fd;
        if (activeReplyFormHTML) { 
            const temp = document.createElement('div'); 
            temp.innerHTML = activeReplyFormHTML; 
            const form = temp.querySelector('form[name="post"]'); 
            if (form) fd = new FormData(form); 
        }
        if (!fd) { 
            let tid = 0; 
            if (currentTopicUrl.indexOf('/t') !== -1) {
                tid = parseInt(currentTopicUrl.split('/t')[1].split('-')[0]); 
            }
            const fRes = await fetch('/post?t=' + tid + '&mode=reply'); 
            fd = new FormData(new DOMParser().parseFromString(await fRes.text(), 'text/html').querySelector('form[name="post"]')); 
        }
        
        fd.set('message', message); 
        fd.set('preview', '1');
        
        if (window.currentUserIsGuest) { 
            const qName = document.getElementById('qrGuestName')?.value.trim(); 
            fd.set('username', qName ? qName : 'زائر'); 
        }
        
        const res = await fetch('/post', { method: 'POST', body: fd });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const previewBlock = doc.querySelector('.post-entry, .content, .postbody, .preview-content, div[class*="content"]');
        
        if (previewBlock) { 
            previewBlock.querySelectorAll('.attachbox').forEach(e => e.remove()); 
            document.getElementById('previewContentHtml').innerHTML = previewBlock.innerHTML; 
            openModal('previewModal'); 
            setTimeout(applyLuffyAddons, 100); 
        } else {
            showToast('تعذر استخراج المعاينة من السيرفر.', true);
        }
    } catch(e) { 
        showToast('حدث خطأ أثناء الاتصال للمعاينة!', true); 
    } finally { 
        btn.innerHTML = '<i class="material-symbols-outlined">visibility</i> معاينة الرد'; 
        btn.disabled = false; 
    }
}

async function prepareEdit(url) {
    editActionUrl = url; 
    const btn = document.getElementById('editSubmitBtn'); 
    btn.innerText = 'جاري الجلب...'; 
    btn.disabled = true; 
    openModal('editModal');
    try {
        const doc = new DOMParser().parseFromString(await (await fetch(url)).text(), 'text/html');
        const msgVal = doc.querySelector('textarea[name="message"]')?.value || '';
        let scInst = $('#editContent').sceditor('instance'); 
        if (scInst) {
            scInst.val(msgVal); 
        } else {
            document.getElementById('editContent').value = msgVal;
        }
        btn.innerHTML = '<i class="material-symbols-outlined">save</i> حفظ التعديلات'; 
        btn.disabled = false;
    } catch(e) { 
        closeModal('editModal'); 
    }
}

async function previewEdit() {
    let scInst = $('#editContent').sceditor('instance'); 
    if (scInst) {
        scInst.updateOriginal();
    }
    const message = document.getElementById('editContent').value.trim();
    const btn = document.getElementById('editPreviewBtn');
    
    if (!message) {
        return showToast('لا يمكنك معاينة نص فارغ!', true);
    }
    
    btn.innerHTML = '<i class="material-symbols-outlined" style="animation: spin 1s infinite;">hourglass_empty</i> جاري المعاينة...'; 
    btn.disabled = true;
    
    try {
        const formHTML = await (await fetch(editActionUrl)).text();
        const form = new DOMParser().parseFromString(formHTML, 'text/html').querySelector('form[name="post"]');
        const fd = new FormData(form);
        
        fd.set('message', message); 
        fd.set('preview', '1');
        
        const res = await fetch('/post', { method: 'POST', body: fd });
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const previewBlock = doc.querySelector('.post-entry, .content, .postbody, .preview-content, div[class*="content"]');
        
        if (previewBlock) { 
            previewBlock.querySelectorAll('.attachbox').forEach(e => e.remove()); 
            document.getElementById('previewContentHtml').innerHTML = previewBlock.innerHTML; 
            
            closeModal('editModal');
            openModal('previewModal'); 
            
            const backBtn = document.querySelector('#previewModal .btn-action');
            if(backBtn) {
                backBtn.onclick = function() {
                    closeModal('previewModal');
                    openModal('editModal');
                };
            }
            
            setTimeout(applyLuffyAddons, 100); 
        } else {
            showToast('تعذر استخراج المعاينة من السيرفر.', true);
        }
    } catch(e) { 
        showToast('حدث خطأ أثناء الاتصال للمعاينة!', true); 
    } finally { 
        btn.innerHTML = '<i class="material-symbols-outlined">visibility</i> معاينة التعديل'; 
        btn.disabled = false; 
    }
}

async function submitEdit() {
    let scInst = $('#editContent').sceditor('instance'); 
    if (scInst) {
        scInst.updateOriginal();
    }
    const message = document.getElementById('editContent').value.trim();
    const btn = document.getElementById('editSubmitBtn');
    btn.innerText = 'جاري الحفظ...'; 
    btn.disabled = true;
    try {
        const form = new DOMParser().parseFromString(await (await fetch(editActionUrl)).text(), 'text/html').querySelector('form[name="post"]');
        const fd = new FormData(form);
        fd.set('message', message); 
        fd.set('post', '1');
        await appendGlobalTokens(fd, document, 'submit');
        await handleSilentRequest('/post', fd); 
        showToast('تم التعديل بنجاح!');
        if (scInst) {
            scInst.val(''); 
        } else {
            document.getElementById('editContent').value = '';
        }
        for (let key in AppCache) {
            delete AppCache[key];
        }
        setTimeout(() => { 
            closeModal('editModal'); 
            openTopic(currentTopicUrl); 
        }, 1000);
    } catch(e) { 
        showToast('فشل التعديل!', true); 
    } finally { 
        btn.innerHTML = '<i class="material-symbols-outlined">save</i> حفظ التعديلات'; 
        btn.disabled = false; 
    }
}

function quotePost(author, htmlContent) {
    const temp = document.createElement('div'); 
    temp.innerHTML = htmlContent;
    const quoteStr = String.fromCharCode(10) + '[quote="' + author + '"]' + temp.textContent.trim() + '[/quote]' + String.fromCharCode(10);
    let scInst = $('#qrContent').sceditor('instance'); 
    if (scInst) {
        scInst.insert(quoteStr); 
    } else {
        document.getElementById('qrContent').value += quoteStr;
    }
    document.getElementById('quickReplyBox').scrollIntoView({ behavior: 'smooth' }); 
    showToast('تم إدراج الاقتباس بنجاح!');
}

async function silentAdminAction(url, actionName, isTopicDelete = false) {
    try {
        showToast('جاري تنفيذ: ' + actionName + '...');
        const form = new DOMParser().parseFromString(await (await fetch(url)).text(), 'text/html').querySelector('form[action*="/modcp"], form[action*="/post"]');
        if (form) { 
            const fd = new FormData(form); 
            fd.set('confirm', '1'); 
            let actionAttr = form.getAttribute('action');
            let fetchUrl = actionAttr ? new URL(actionAttr, new URL(url, window.location.origin)).toString() : url; 
            await handleSilentRequest(fetchUrl, fd); 
        }
        showToast('تم ' + actionName + ' بنجاح!'); 
        for (let key in AppCache) {
            delete AppCache[key];
        }
        setTimeout(() => { 
            if (isTopicDelete) {
                backToList(); 
            } else {
                openTopic(currentTopicUrl); 
            }
        }, 1000);
    } catch(e) { 
        showToast('فشل الإجراء: ' + actionName, true); 
    }
}

async function openActionModal(url, title) {
    openModal('adminModal'); 
    document.getElementById('adminModalTitle').innerHTML = '<i class="material-symbols-outlined">settings</i> ' + title; 
    const content = document.getElementById('adminActionContent'); 
    content.innerHTML = '<div class="loader" style="display:block; margin:40px auto;"></div>';
    try {
        const form = new DOMParser().parseFromString(await (await fetch(url)).text(), 'text/html').querySelector('form[action*="/modcp"]');
        if (form) {
            form.querySelectorAll('table, tbody, tr, td, th').forEach(el => { 
                el.style.display = 'block'; 
                el.style.width = '100%'; 
                el.style.border = 'none'; 
                el.style.background = 'transparent'; 
                el.style.padding = '0'; 
                el.style.margin = '0'; 
                el.style.textAlign = 'right'; 
            });
            form.querySelectorAll('.forumline').forEach(el => { 
                el.style.border = 'none'; 
                el.style.background = 'transparent'; 
            });
            form.querySelectorAll('span.gen, span.genmed, span.gensmall, .cattitle, .maintitle').forEach(el => { 
                el.style.fontSize = '14px'; 
                el.style.color = 'var(--text-strong)'; 
                el.style.display = 'block'; 
                el.style.marginBottom = '12px'; 
                el.style.fontWeight = '800'; 
            });
            form.querySelectorAll('br').forEach(br => br.remove());
            form.querySelectorAll('select').forEach(sel => { 
                sel.className = 'form-input'; 
                sel.style.cssText = 'width: 100%; padding: 14px 16px; margin-bottom: 20px; background: var(--item-bg); color: var(--text-strong); border: 1px solid var(--item-border); border-radius: 12px; font-family: var(--font-main); font-size: 14px; outline: none; cursor: pointer; transition: 0.3s;'; 
                sel.onfocus = () => { 
                    sel.style.borderColor = 'var(--primary)'; 
                    sel.style.background = 'var(--primary-glow)'; 
                }; 
                sel.onblur = () => { 
                    sel.style.borderColor = 'var(--item-border)'; 
                    sel.style.background = 'var(--item-bg)'; 
                }; 
            });
            const btnContainer = document.createElement('div'); 
            btnContainer.style.display = 'flex'; 
            btnContainer.style.flexDirection = 'column'; 
            btnContainer.style.gap = '10px'; 
            btnContainer.style.marginTop = '20px';
            form.querySelectorAll('input[type="submit"], button[type="submit"]').forEach(btn => { 
                btn.className = 'btn-action'; 
                btn.style.width = '100%'; 
                btn.style.margin = '0'; 
                btn.style.padding = '14px'; 
                btn.style.fontSize = '14px'; 
                btn.style.justifyContent = 'center'; 
                btn.parentNode.insertBefore(btnContainer, btn); 
                btnContainer.appendChild(btn); 
            });
            const radios = form.querySelectorAll('input[type="radio"]');
            if (radios.length > 0) {
                const rGroup = document.createElement('div'); 
                rGroup.className = 'radio-group'; 
                rGroup.style.display = 'flex'; 
                rGroup.style.gap = '15px'; 
                rGroup.style.justifyContent = 'center'; 
                rGroup.style.marginTop = '20px'; 
                rGroup.style.marginBottom = '15px'; 
                let parentTd = radios[0].closest('td') || form;
                radios.forEach(r => { 
                    let val = r.value;
                    let textNode = r.nextSibling;
                    let labelText = (val === '1' || val === 'yes') ? 'نعم' : 'لا'; 
                    if (textNode && textNode.nodeType === 3 && textNode.textContent.trim().length > 0) { 
                        labelText = textNode.textContent.trim(); 
                        textNode.textContent = ''; 
                    } 
                    const lbl = document.createElement('label');
                    const newR = r.cloneNode(true); 
                    lbl.appendChild(newR); 
                    lbl.appendChild(document.createTextNode(' ' + labelText)); 
                    rGroup.appendChild(lbl); 
                    r.remove(); 
                }); 
                parentTd.appendChild(rGroup);
            }
            form.onsubmit = async (e) => {
                e.preventDefault(); 
                const fd = new FormData(form); 
                fd.set('confirm', '1'); 
                const submitBtn = form.querySelector('input[type="submit"]'); 
                if (submitBtn) { 
                    submitBtn.value = 'جاري التنفيذ...'; 
                    submitBtn.disabled = true; 
                }
                try { 
                    let actionAttr = form.getAttribute('action');
                    let fetchUrl = actionAttr ? new URL(actionAttr, new URL(url, window.location.origin)).toString() : url; 
                    await handleSilentRequest(fetchUrl, fd); 
                    showToast('تم ' + title + ' بنجاح!'); 
                    closeModal('adminModal'); 
                    backToList(); 
                } catch(err) { 
                    showToast('فشل تنفيذ الإجراء!', true); 
                    if (submitBtn) { 
                        submitBtn.value = 'تأكيد'; 
                        submitBtn.disabled = false; 
                    } 
                }
            };
            content.innerHTML = ''; 
            content.appendChild(form);
        } else {
            content.innerHTML = '<p style="text-align:center; color:var(--danger); font-weight:bold;">لا يمكن تنفيذ هذا الإجراء هنا.</p>';
        }
    } catch(e) { 
        content.innerHTML = '<div class="empty-widget">فشل جلب البيانات.</div>'; 
    }
}

async function openAuthModal(url, title, icon = 'login') {
    openModal('authModal'); 
    document.getElementById('authModalTitle').innerHTML = '<i class="material-symbols-outlined">' + icon + '</i> ' + title; 
    const content = document.getElementById('authContent'); 
    content.innerHTML = '<div class="loader" style="display:block; margin:40px auto;"></div>';
    try { 
        processAuthHTML(await (await fetch(url)).text(), url, title, icon); 
    } catch(e) { 
        content.innerHTML = '<div class="empty-widget">حدث خطأ أثناء الاتصال</div>'; 
    }
}

function processAuthHTML(html, url, title, icon) {
    const content = document.getElementById('authContent');
    const doc = new DOMParser().parseFromString(html, 'text/html');
    let formNode = doc.querySelector('form[name="form_login"], form[action*="/login"], form[action*="/register"], form#frmAgreement, form[name="form_confirm"], form[name="post"], form[name="register"], form#ucp');
    if (!formNode) { 
        const pForms = Array.from(doc.querySelectorAll('form')).filter(f => f.method && f.method.toLowerCase() === 'post' && !f.action.includes('search')); 
        if (pForms.length > 0) {
            formNode = pForms[0]; 
        }
    }
    let mainBox;
    if (formNode) {
        mainBox = formNode.closest('.panel, .forumline, .body-content, .cp, .main-inner');
        if (!mainBox || mainBox.id === 'wrap' || mainBox.classList.contains('layout')) {
            mainBox = formNode.parentElement;
        }
    } else {
        let agreeLink = doc.querySelector('a[href*="agreed=true"]');
        if (agreeLink) {
            mainBox = agreeLink.closest('.panel, .forumline, .body-content, .cp, .main-inner') || agreeLink.parentElement;
        } else {
            let infoBlock = doc.querySelector('.block, .errorwrap, .error-box, p.error, .forumline');
            if (infoBlock && !infoBlock.querySelector('#search-main')) {
                mainBox = infoBlock;
            }
        }
    }
    if (!mainBox) { 
        closeModal('authModal'); 
        showToast('تمت العملية، جاري التحديث...'); 
        setTimeout(() => location.reload(), 1500); 
        return; 
    }
    let strayError = doc.querySelector('.errorwrap, .error-box, p.error'); 
    if (strayError && !mainBox.contains(strayError)) {
        mainBox.prepend(strayError);
    }
    mainBox.querySelectorAll('header, #page-footer, .navbar, .page-header, script, aside').forEach(el => el.remove());
    mainBox.querySelectorAll('a').forEach(a => {
        let text = a.textContent;
        let href = a.getAttribute('href');
        if (href && href.includes('/privacy')) { 
            let span = document.createElement('span'); 
            span.innerHTML = a.innerHTML; 
            span.style.color = 'var(--primary)'; 
            span.style.fontWeight = 'bold'; 
            a.replaceWith(span); 
        } else if (text.includes('اضغط هنا') || text.includes('لقد نسيت') || text.includes('الرجوع')) {
            a.remove();
        } else if (url.includes('login') && href && href.includes('/register')) {
            a.remove();
        } else if (href && !href.startsWith('javascript:') && !href.startsWith('#')) { 
            a.onclick = (e) => { 
                e.preventDefault(); 
                openAuthModal(new URL(href, new URL(url, window.location.origin)).toString(), title, icon); 
            }; 
            if (href.includes('agreed=true')) {
                a.className = 'btn-action';
                a.style.cssText = 'width: 100%; padding: 16px; font-size: 14px; margin-top: 15px; border: none; cursor: pointer; display: flex; justify-content: center;';
            } else {
                a.style.color = 'var(--primary)'; 
                a.style.fontWeight = 'bold'; 
                a.style.textDecoration = 'none'; 
            }
        }
    });
    const walkText = document.createTreeWalker(mainBox, NodeFilter.SHOW_TEXT, null, false); 
    let n; 
    while(n = walkText.nextNode()) { 
        let val = n.nodeValue; 
        if (val.includes('اضغط هنا') || val.includes('للرجوع') || val.includes('أو')) {
            n.nodeValue = val.replace(/اضغط هنا/g, '').replace(/للرجوع/g, '').replace(/ أو /g, '').replace(/أو/g, '').trim(); 
        }
    }
    mainBox.querySelectorAll('.block-header').forEach(h => { 
        h.style.color = 'var(--primary)'; 
        h.style.fontSize = '16px'; 
        h.style.fontWeight = '900'; 
        h.style.marginBottom = '15px'; 
        h.style.borderBottom = '1px solid var(--item-border)';
        h.style.paddingBottom = '10px';
    });
    mainBox.querySelectorAll('.block-content').forEach(c => { 
        c.style.color = 'var(--text-strong)'; 
        c.style.fontSize = '14px'; 
        c.style.lineHeight = '1.8'; 
        c.style.textAlign = 'center';
    });
    mainBox.querySelectorAll('input[type="text"], input[type="password"], input[type="email"], select').forEach(inp => { 
        inp.className = 'form-input'; 
        inp.style.cssText = 'width: 100%; background: var(--input-bg); color: var(--text-strong); border: 1px solid var(--item-border); padding: 14px; border-radius: 12px; font-family: var(--font-main); outline: none; font-size: 14px; margin-top:5px; margin-bottom:20px;'; 
    });
    mainBox.querySelectorAll('input[type="submit"], button[type="submit"]').forEach(btn => { 
        btn.className = 'btn-action'; 
        btn.style.cssText = 'width: 100%; padding: 16px; font-size: 14px; margin-top: 15px; border: none; cursor: pointer; display: flex; justify-content: center;'; 
    });
    mainBox.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(inp => { 
        inp.style.cssText = 'width: 20px; height: 20px; margin-left: 10px; cursor: pointer; vertical-align: middle;'; 
    });
    mainBox.querySelectorAll('span, p, td, th, label, h2, h1, h3').forEach(el => { 
        el.style.color = 'var(--text-strong)'; 
        if (el.tagName === 'TH' || el.tagName === 'H2') { 
            el.style.color = 'var(--primary)'; 
            el.style.fontSize = '16px'; 
            el.style.marginBottom = '20px'; 
            el.style.display = 'block'; 
        } 
    });
    mainBox.querySelectorAll('table, td, tr, div').forEach(el => { 
        el.style.backgroundColor = 'transparent'; 
        if (el.tagName === 'TABLE') {
            el.style.width = '100%'; 
        }
    });
    content.innerHTML = ''; 
    content.appendChild(mainBox);
    let dynamicKey = '';
    let rcScript = doc.querySelector('script[src*="recaptcha/api.js?render="]');
    if (rcScript) {
        try {
            const urlObj = new URL(rcScript.src);
            dynamicKey = urlObj.searchParams.get('render') || rcScript.src.split('render=')[1].split('&')[0];
        } catch(e) {
            dynamicKey = rcScript.src.split('render=')[1].split('&')[0];
        }
    }
    if (!dynamicKey) {
        let rDiv = doc.querySelector('.g-recaptcha');
        if (rDiv) {
            dynamicKey = rDiv.getAttribute('data-sitekey');
        }
    }
    if (dynamicKey && !document.querySelector(`script[src*="${dynamicKey}"]`)) {
        const rcLoad = document.createElement('script');
        rcLoad.src = "https://www.google.com/recaptcha/api.js?render=" + dynamicKey;
        document.head.appendChild(rcLoad);
    }
    const turnstileDivs = content.querySelectorAll('.cf-turnstile');
    if (turnstileDivs.length > 0) {
        if (!document.querySelector('script[src*="turnstile"]')) { 
            const cfScript = document.createElement('script'); 
            cfScript.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; 
            cfScript.async = true; 
            cfScript.defer = true; 
            document.head.appendChild(cfScript); 
        }
        const renderTurnstile = () => { 
            if (window.turnstile) { 
                turnstileDivs.forEach(el => { 
                    if (!el.innerHTML.trim()) { 
                        try { 
                            turnstile.render(el, { sitekey: el.getAttribute('data-sitekey'), action: el.getAttribute('data-action') || 'register' }); 
                        } catch(e) {} 
                    } 
                }); 
            } else {
                setTimeout(renderTurnstile, 100); 
            }
        };
        setTimeout(renderTurnstile, 200);
    }
    const recaptchaDivs = content.querySelectorAll('.g-recaptcha');
    if (recaptchaDivs.length > 0) { 
        setTimeout(() => { 
            if (window.grecaptcha && grecaptcha.render) { 
                recaptchaDivs.forEach(el => { 
                    if (!el.innerHTML.trim()) { 
                        try { 
                            grecaptcha.render(el, { 'sitekey': el.getAttribute('data-sitekey') }); 
                        } catch(e) {} 
                    } 
                }); 
            } 
        }, 500); 
    }
    content.querySelectorAll('form').forEach(f => {
        f.onsubmit = async (e) => {
            e.preventDefault(); 
            const submitBtn = e.submitter || f.querySelector('input[type="submit"], button[type="submit"]');
            let origVal = submitBtn ? (submitBtn.value || submitBtn.textContent) : 'معالجة';
            if (submitBtn && submitBtn.tagName !== 'FORM') { 
                if (submitBtn.tagName === 'INPUT') {
                    submitBtn.value = 'جاري المعالجة...'; 
                } else {
                    submitBtn.textContent = 'جاري المعالجة...'; 
                }
                submitBtn.disabled = true; 
            }
            try {
                const isGet = f.method && f.method.toUpperCase() === 'GET'; 
                let actionAttr = f.getAttribute('action');
                let fetchUrl = actionAttr ? new URL(actionAttr, new URL(url, window.location.origin)).toString() : url;
                let fetchOptions = {}; 
                const fd = new FormData(f);
                if (turnstileDivs.length > 0 && !fd.get('cf-turnstile-response')) { 
                    showToast('الرجاء التأكيد على أنك لست روبوت!', true); 
                    if (submitBtn && submitBtn.tagName !== 'FORM') { 
                        if (submitBtn.tagName === 'INPUT') {
                            submitBtn.value = origVal; 
                        } else {
                            submitBtn.textContent = origVal; 
                        }
                        submitBtn.disabled = false; 
                    } 
                    return; 
                }
                if (e.submitter && e.submitter.name) {
                    fd.set(e.submitter.name, e.submitter.value || '1'); 
                } else if (submitBtn && submitBtn.name) {
                    fd.set(submitBtn.name, submitBtn.value || '1');
                }
                if (f.id === 'frmAgreement') { 
                    fd.set('agreed', 'true'); 
                    fd.set('agreement', '1'); 
                    fd.set('privacy', '1'); 
                    fd.set('step', '2'); 
                }
                let hasV2Token = false; 
                if (recaptchaDivs.length > 0 && window.grecaptcha && typeof grecaptcha.getResponse === 'function') { 
                    try { 
                        const v2Response = grecaptcha.getResponse(); 
                        if (v2Response) { 
                            fd.set('g-recaptcha-response', v2Response); 
                            hasV2Token = true; 
                        } 
                    } catch(e) {} 
                }
                if (!hasV2Token && dynamicKey && window.grecaptcha && typeof grecaptcha.execute === 'function') {
                    let rcAction = fetchUrl.includes('register') ? 'register' : 'submit';
                    const token = await new Promise(resolve => { 
                        const timer = setTimeout(() => resolve(null), 5000); 
                        grecaptcha.ready(async () => { 
                            try { 
                                const t = await grecaptcha.execute(dynamicKey, {action: rcAction}); 
                                clearTimeout(timer); 
                                resolve(t); 
                            } catch (err) { 
                                clearTimeout(timer); 
                                resolve(null); 
                            } 
                        }); 
                    });
                    if (token) {
                        fd.set('g-recaptcha-response', token);
                    }
                }
                if (isGet) { 
                    const urlObj = new URL(fetchUrl, window.location.origin); 
                    for (const [key, value] of fd.entries()) {
                        urlObj.searchParams.append(key, value); 
                    }
                    fetchUrl = urlObj.toString(); 
                    fetchOptions = { method: 'GET' }; 
                } else { 
                    if (!fd.has('login') && fetchUrl.includes('login')) {
                        fd.append('login', '1'); 
                    }
                    fetchOptions = { method: 'POST', body: fd }; 
                }
                const postHtml = await (await fetch(fetchUrl, fetchOptions)).text();
                let isLoginTrue = postHtml.includes('تم دخولك') || postHtml.includes('لقد تم دخولك') || postHtml.indexOf('"session_logged_in"] = 1') !== -1 || postHtml.indexOf('"session_logged_in"]=1') !== -1;
                if (isLoginTrue || postHtml.includes('تم تسجيل') || postHtml.includes('نجاح') || postHtml.includes('بريدك الإلكتروني') || postHtml.includes('حسابك')) {
                    if ((url.includes('register') || fetchUrl.includes('register') || postHtml.includes('تفعيل') || postHtml.includes('مراجعة') || postHtml.includes('تسجيلك')) && !isLoginTrue) {
                        closeModal('authModal');
                        document.body.insertAdjacentHTML('beforeend', `
                            <div class="modal-overlay active" id="regSuccessModal" style="z-index: 999999; opacity: 1; visibility: visible;">
                                <div class="modal-box" style="max-width: 500px; text-align: center; padding: 40px 30px; transform: scale(1);">
                                    <i class="material-symbols-outlined" style="font-size: 80px; color: #10b981; margin-bottom: 20px;">task_alt</i>
                                    <h2 style="color: var(--text-strong); font-size: 1.8rem; font-weight: 900; margin-bottom: 15px;">تم التسجيل بنجاح!</h2>
                                    <p style="color: var(--text-muted); font-size: 14px; line-height: 1.8; margin-bottom: 25px;">المنتدى يتطلب تفعيل الاشتراك من قِبل الإدارة.<br>حسابك الآن قيد المراجعة.</p>
                                    <button onclick="document.getElementById('regSuccessModal').remove(); location.reload();" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; padding: 16px; border-radius: 12px; font-weight: bold; background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: var(--primary-text); border: none; box-shadow: 0 4px 15px var(--primary-glow); cursor: pointer; transition: 0.3s;">
                                        <i class="material-symbols-outlined" style="font-size: 24px;">home</i> العودة للمنتدى
                                    </button>
                                </div>
                            </div>
                        `);
                    } else if (isLoginTrue || postHtml.includes('نجاح')) {
                        showToast('تمت العملية بنجاح!'); 
                        closeModal('authModal'); 
                        await initUserSession(); 
                        loadPremiumCategories();
                    } else {
                        const nextDoc = new DOMParser().parseFromString(postHtml, 'text/html'); 
                        let errorEl = nextDoc.querySelector('.errorwrap, .error, p.error, .block-content-error'); 
                        let errorText = errorEl ? errorEl.textContent.trim() : ''; 
                        let isError = errorEl && errorText !== '' && !postHtml.includes('agreed=true') && !errorText.includes('نجاح') && !errorText.includes('إجبارية') && !errorText.includes('*');
                        if (isError) { 
                            showToast(errorText, true); 
                            if (submitBtn && submitBtn.tagName !== 'FORM') { 
                                if (submitBtn.tagName === 'INPUT') {
                                    submitBtn.value = origVal; 
                                } else {
                                    submitBtn.textContent = origVal; 
                                }
                                submitBtn.disabled = false; 
                            } 
                        } else {
                            processAuthHTML(postHtml, fetchUrl, title, icon);
                        }
                    }
                } else {
                    const nextDoc = new DOMParser().parseFromString(postHtml, 'text/html'); 
                    let errorEl = nextDoc.querySelector('.errorwrap, .error, p.error, .block-content-error'); 
                    let errorText = errorEl ? errorEl.textContent.trim() : ''; 
                    let isError = errorEl && errorText !== '' && !postHtml.includes('agreed=true') && !errorText.includes('نجاح') && !errorText.includes('إجبارية') && !errorText.includes('*');
                    if (isError) { 
                        showToast(errorText, true); 
                        if (submitBtn && submitBtn.tagName !== 'FORM') { 
                            if (submitBtn.tagName === 'INPUT') {
                                submitBtn.value = origVal; 
                            } else {
                                submitBtn.textContent = origVal; 
                            }
                            submitBtn.disabled = false; 
                        } 
                    } else {
                        processAuthHTML(postHtml, fetchUrl, title, icon);
                    }
                }
            } catch(err) {
                showToast('حدث خطأ في الاتصال!', true); 
                if (submitBtn && submitBtn.tagName !== 'FORM') { 
                    if (submitBtn.tagName === 'INPUT') {
                        submitBtn.value = origVal; 
                    } else {
                        submitBtn.textContent = origVal; 
                    }
                    submitBtn.disabled = false; 
                }
            }
        };
    });
}

async function performLogout(url) {
    showToast('جاري تسجيل الخروج...');
    try { 
        await fetch(url); 
        window.currentUserIsGuest = true; 
        await initUserSession(); 
        openModal('goodbyeModal'); 
        setTimeout(() => { 
            closeModal('goodbyeModal'); 
            loadPremiumCategories(); 
        }, 3000); 
    } catch(e) { 
        showToast('فشل تسجيل الخروج', true); 
    }
}

async function loadSettingsPage(url, skipPush = false) {
    if (!skipPush) {
        window.history.pushState({}, '', BASE_APP_PATH + '?target=' + url);
    }
    let container = document.getElementById('settingsView');
    if (!container) { 
        container = document.createElement('div'); 
        container.id = 'settingsView'; 
        container.className = 'view-section'; 
        document.querySelector('.main-content').appendChild(container); 
    }
    switchView('settingsView'); 
    document.getElementById('secTitle').innerHTML = '<i class="material-symbols-outlined">manage_accounts</i> إعدادات الحساب';
    container.innerHTML = `
        <div class="section-toolbar">
            <h2 class="section-title"><i class="material-symbols-outlined">manage_accounts</i> الإعدادات والتفضيلات</h2>
        </div>
        <div class="settings-page-wrapper">
            <div class="settings-page-sidebar" id="settingsTabsList">
                <div class="loader" style="width:20px; height:20px; border-width:2px; margin:30px auto; display:block;"></div>
            </div>
            <div class="settings-page-content" id="settingsContentArea">
                <div class="loader" style="margin:80px auto; display:block;"></div>
            </div>
        </div>
    `;
    try {
        let html = await fetchWithCache(url + (url.includes('?') ? '&' : '?') + '_t=' + Date.now());
        let doc = new DOMParser().parseFromString(html, 'text/html');
        let rawTabs = doc.querySelectorAll('.cp-sidebar .tabs li a, #tabs li a');
        if (rawTabs.length > 0) {
            let tabsHTML = '';
            rawTabs.forEach(t => {
                let tName = t.textContent.trim();
                let tHref = t.getAttribute('href'); 
                if(!tHref || tHref === '#') {
                    tHref = url;
                }
                if(tName.includes('أصدقاء') || tName.includes('منبوذين') || tName.includes('متابعة') || tName.includes('إشعار') || tName.includes('مراقبة') || tName.includes('مفضل')) {
                    return; 
                }
                let cleanHref = tHref.split('&_t=')[0];
                let cleanCurrent = url.split('&_t=')[0];
                let isActive = cleanHref === cleanCurrent || t.parentElement.classList.contains('activetab');
                let icon = 'settings'; 
                if(tName.includes('معلومات')) {
                    icon = 'badge'; 
                } else if(tName.includes('تفضيلات')) {
                    icon = 'tune'; 
                } else if(tName.includes('صورة')) {
                    icon = 'account_circle';
                }
                tabsHTML += `<a href="${cleanHref}" onclick="event.preventDefault(); loadSettingsPage('${cleanHref}')" class="settings-tab-link ${isActive ? 'active' : ''}"><i class="material-symbols-outlined">${icon}</i> <span>${tName}</span></a>`;
            });
            document.getElementById('settingsTabsList').innerHTML = tabsHTML;
        }
        let formNode = null;
        let allForms = doc.querySelectorAll('form');
        for(let f of allForms) {
            let fid = f.getAttribute('id') || '';
            let faction = f.getAttribute('action') || '';
            let fname = f.getAttribute('name') || '';
            if(fid === 'search-main' || faction.includes('search_where') || faction.includes('search_keywords')) {
                continue;
            }
            if(fid === 'ucp' || faction.includes('profile') || fname === 'post' || faction.includes('search_id=') || f.querySelector('.block') || f.querySelector('.forumline')) { 
                formNode = f; 
                break; 
            }
        }
        if (formNode) {
            formNode.querySelectorAll('label, tr').forEach(el => { 
                let htmlContent = el.innerHTML || ''; 
                if (htmlContent.includes('تغيير كلمة السر') || htmlContent.includes('change_password') || htmlContent.includes('تصدير البيانات') || htmlContent.includes('rgpd.php')) {
                    el.style.display = 'none';
                } 
            });
            formNode.querySelectorAll('.block').forEach(b => {
                if(b.innerHTML.includes('rgpd.php')) {
                    b.style.display = 'none';
                }
                b.className = 'settings-card'; 
            });
            formNode.className = 'settings-card'; 
            formNode.style.display = 'block';
            formNode.querySelectorAll('.block-header').forEach(h => { 
                h.className = 'settings-card-header'; 
                h.innerHTML = `<i class="material-symbols-outlined">edit_note</i> ${h.innerHTML}`; 
            });
            formNode.querySelectorAll('table').forEach(tbl => { 
                tbl.style.width = '100%'; 
                tbl.style.color = 'var(--text-strong)'; 
                tbl.style.borderCollapse = 'collapse'; 
            });
            formNode.querySelectorAll('th, td').forEach(td => { 
                td.style.padding = '12px'; 
                td.style.borderBottom = '1px solid var(--item-border)'; 
            });
            formNode.querySelectorAll('input[type="text"], input[type="email"], input[type="url"], input[type="password"], textarea, select').forEach(inp => { 
                inp.className = 'form-input'; 
                inp.style.cssText = 'width:100%; margin-top:5px; margin-bottom:5px; padding:12px; border-radius:10px; background:var(--input-bg); color:var(--text-strong); border:1px solid var(--item-border); outline:none;'; 
            });
            formNode.querySelectorAll('input[type="reset"]').forEach(btn => btn.remove());
            formNode.querySelectorAll('.form-buttons').forEach(fs => { 
                fs.style.border = 'none'; 
                fs.style.padding = '0'; 
            });
            formNode.querySelectorAll('label').forEach(lbl => {
                let titleSpan = lbl.querySelector('span:first-child');
                let radios = lbl.querySelectorAll('input[type="radio"]');
                if (titleSpan && radios.length > 1) {
                    let wrapper = document.createElement('div');
                    wrapper.className = 'radio-group';
                    let nodesToMove = [];
                    lbl.childNodes.forEach(node => {
                        if (node !== titleSpan && !(node.classList && node.classList.contains('description')) && node.tagName !== 'BR') {
                            nodesToMove.push(node);
                        }
                    });
                    nodesToMove.forEach(n => wrapper.appendChild(n));
                    lbl.appendChild(wrapper);
                }
            });
            formNode.querySelectorAll('input[type="submit"], button[type="submit"], input[type="button"]').forEach(btn => {
                let bName = btn.name || '';
                let bVal = btn.value || btn.textContent || '';
                btn.dataset.orig = bVal;
                if (bName === 'avatargallery') { 
                    let parentLabel = btn.closest('label'); 
                    if (parentLabel) {
                        parentLabel.remove(); 
                    } else {
                        btn.remove(); 
                    }
                    return; 
                }
                btn.className = 'btn-action'; 
                btn.style.cssText = 'width:100%; padding:14px; margin-top:10px; font-size:15px; border:none; border-radius:12px; cursor:pointer; font-weight:bold;';
                if (bName.includes('delete') || bName.includes('unwatch') || bName.includes('remove') || bVal.includes('حذف') || bVal.includes('إلغاء')) { 
                    btn.style.background = "var(--danger-bg)"; 
                    btn.style.color = "var(--danger)"; 
                    btn.style.border = "1px solid rgba(239, 68, 68, 0.3)"; 
                } else if (bName === 'submit' || bName === 'post' || bVal.includes('سجّل') || bVal.includes('سجل') || bVal.includes('حفظ') || bVal.includes('موافق')) { 
                    btn.value = "حفظ التعديلات"; 
                }
            });
            formNode.querySelectorAll('.description').forEach(d => { 
                d.style.display = 'block'; 
                d.style.color = 'var(--text-muted)'; 
                d.style.fontSize = '12px'; 
                d.style.marginBottom = '10px'; 
            });
            let sigBox = formNode.querySelector('#smiley-box.sig');
            if(sigBox) {
                sigBox.remove();
            }
            let sigTextarea = formNode.querySelector('textarea[name="signature"], textarea[name="message"]');
            if (sigTextarea) {
                let uniqueId = 'sig_editor_' + Date.now(); 
                sigTextarea.id = uniqueId; 
                sigTextarea.style.minHeight = '150px';
                setTimeout(() => { 
                    if(window.initSCEditor) {
                        window.initSCEditor('#' + uniqueId, false); 
                    }
                }, 300);
            }
            formNode.onsubmit = async (e) => {
                e.preventDefault();
                if (sigTextarea) { 
                    let scInst = $('#' + sigTextarea.id).sceditor('instance'); 
                    if (scInst) {
                        scInst.updateOriginal(); 
                    }
                }
                let submitBtn = e.submitter || formNode.querySelector('input[type="submit"], button[type="submit"]');
                let origVal = submitBtn ? (submitBtn.dataset.orig || submitBtn.value) : 'سجّل';
                let btnName = submitBtn ? (submitBtn.name || 'submit') : 'submit';
                if (submitBtn) { 
                    submitBtn.value = 'جاري التنفيذ...'; 
                    submitBtn.disabled = true; 
                }
                let fd = new FormData(formNode); 
                fd.set(btnName, origVal); 
                let actionUrl = formNode.getAttribute('action') || url; 
                try {
                    await handleSilentRequest(actionUrl, fd); 
                    showToast('تم حفظ البيانات بنجاح!');
                    Object.keys(AppCache).forEach(k => { 
                        if (k.includes('profile')) {
                            delete AppCache[k]; 
                        }
                    });
                    setTimeout(async () => { 
                        await initUserSession(); 
                        loadSettingsPage(url); 
                    }, 1000);
                } catch(err) { 
                    showToast('فشل الحفظ، يرجى التأكد من البيانات', true); 
                } finally { 
                    if (submitBtn) { 
                        submitBtn.value = origVal; 
                        submitBtn.disabled = false; 
                    } 
                }
            };
            document.getElementById('settingsContentArea').innerHTML = ''; 
            document.getElementById('settingsContentArea').appendChild(formNode);
        } else {
            let altContent = doc.querySelector('.cp-content, #cp-main, .forumline, .block-content, .cp');
            if (altContent) {
                 let searchInAlt = altContent.querySelector('#search-main, form[action*="search_where"]'); 
                 if (searchInAlt) {
                     searchInAlt.remove();
                 }
                 altContent.querySelectorAll('label, tr').forEach(el => { 
                     let htmlContent = el.innerHTML || ''; 
                     if (htmlContent.includes('تغيير كلمة السر') || htmlContent.includes('change_password') || htmlContent.includes('تصدير البيانات') || htmlContent.includes('rgpd.php')) {
                         el.style.display = 'none'; 
                     }
                 });
                 document.getElementById('settingsContentArea').innerHTML = '<div class="settings-card">' + altContent.innerHTML + '</div>';
            } else {
                 document.getElementById('settingsContentArea').innerHTML = '<div class="empty-state"><i class="material-symbols-outlined" style="font-size:40px;">error</i><br>تعذر تحميل الإعدادات لهذا القسم.</div>';
            }
        }
    } catch(e) { 
        document.getElementById('settingsContentArea').innerHTML = '<div class="empty-state"><i class="material-symbols-outlined" style="font-size:40px;">wifi_off</i><br>حدث خطأ في الاتصال بالسيرفر.</div>'; 
    }
}

function routeUrl(url, skipPush = false) {
    if (!url || url === '/' || url === '/forum' || url.indexOf('/h') === 0 || url.indexOf('/c') === 0) {
        loadPremiumCategories(skipPush);
    } else if (url.indexOf('/profile') !== -1) {
        loadSettingsPage(url, skipPush);
    } else if (url.indexOf('/t') !== -1 || url.indexOf('mode=reply') !== -1) {
        openTopic(url, skipPush);
    } else if (url.indexOf('/f') !== -1) { 
        let fid = url.split('/f')[1].split('-')[0].split('?')[0]; 
        loadForumData(parseInt(fid), '', url, skipPush); 
    } else if (url.indexOf('/discover') !== -1) {
        loadDiscoverActivity(skipPush);
    } else {
        loadPremiumCategories(skipPush);
    }
}

window.addEventListener('popstate', (e) => {
    const target = new URLSearchParams(window.location.search).get('target');
    const path = window.location.pathname;
    routeUrl(target || path, true);
});

async function buildSidebar() {
    const sidebar = document.getElementById('mainSidebar'); 
    if (!sidebar) {
        return;
    }
    sidebar.innerHTML = `
        <div class="shq-sidebar">
            <div class="shq-block">
                <div class="shq-block-container">
                    <h3 class="shq-block-header"><i class="material-symbols-outlined">analytics</i> إحصائيات المنتدى</h3>
                    <div class="shq-block-body" id="wStats">
                        <div class="loader" style="width:20px;height:20px;border-width:2px;margin:10px auto;display:block;"></div>
                    </div>
                </div>
            </div>
            <div class="shq-block">
                <div class="shq-block-container">
                    <h3 class="shq-block-header"><i class="material-symbols-outlined">manage_accounts</i> طاقم الإدارة المتصلين</h3>
                    <div class="shq-block-body shq-p-0" id="wStaff">
                        <div class="loader" style="width:20px;height:20px;border-width:2px;margin:15px auto;display:block;"></div>
                    </div>
                </div>
            </div>
            <div class="shq-block">
                <div class="shq-block-container">
                    <h3 class="shq-block-header"><i class="material-symbols-outlined">group</i> الأعضاء المتصلون</h3>
                    <div class="shq-block-body" id="wOnline">
                        <div class="loader" style="width:20px;height:20px;border-width:2px;margin:10px auto;display:block;"></div>
                    </div>
                </div>
            </div>
            <div class="shq-block">
                <div class="shq-block-container">
                    <h3 class="shq-block-header"><i class="material-symbols-outlined">person_add</i> آخر الأعضاء</h3>
                    <div class="shq-block-body shq-p-0" id="wNewMems">
                        <div class="loader" style="width:20px;height:20px;border-width:2px;margin:15px auto;display:block;"></div>
                    </div>
                </div>
            </div>
            <div class="shq-block">
                <div class="shq-block-container">
                    <h3 class="shq-block-header"><i class="material-symbols-outlined">style</i> المجموعات</h3>
                    <div class="shq-block-body" id="wGroups">
                        <div class="loader" style="width:20px;height:20px;border-width:2px;margin:10px auto;display:block;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    try {
        let html = await fetchWithCache('/forum?_t=' + Math.floor(Date.now() / 60000));
        let doc = new DOMParser().parseFromString(html, 'text/html');
        if (!doc.querySelector('#forum-statistics, #block-online, div.forabg, table.forumline, .statistics, .stats')) {
            html = await fetchWithCache('/?_t=' + Math.floor(Date.now() / 60000));
            doc = new DOMParser().parseFromString(html, 'text/html');
        }
        const rgb2hex = (rgb) => { 
            if (!rgb) return ''; 
            if (rgb.indexOf('#') === 0) return rgb.toLowerCase(); 
            let match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/); 
            if (!match) return rgb.toLowerCase(); 
            function hex(x) { 
                return ("0" + parseInt(x).toString(16)).slice(-2); 
            } 
            return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]); 
        };
        let forumTotalMembers = "0";
        let totalOnline = "0";
        let guestsCount = "0";
        let onlineMembersCount = "0";
        let statsContainer = doc.querySelector('#forum-statistics');
        if (statsContainer) {
            let strongs = statsContainer.querySelectorAll('strong');
            if (strongs.length >= 2) {
                forumTotalMembers = strongs[1].textContent.trim();
            } else {
                let match = statsContainer.textContent.match(/يتوفر على\s*(\d+)/);
                if (match) forumTotalMembers = match[1];
            }
        }
        let blockOnline = doc.querySelector('#block-online');
        let dynamicGroups = {};
        let onlineLinks = [];
        if (blockOnline) {
            let htmlStr = blockOnline.innerHTML;
            let txtContent = blockOnline.textContent;
            let totalMatch = txtContent.match(/ككل هناك\s*(\d+)/) || txtContent.match(/هناك\s*(\d+)/) || txtContent.match(/المتواجدون الآن[:\s]*(\d+)/);
            if (totalMatch) {
                totalOnline = totalMatch[1];
            }
            let memMatch = txtContent.match(/(\d+)\s*أعضاء/) || txtContent.match(/(\d+)\s*عُ?ضو/);
            if (memMatch) {
                onlineMembersCount = memMatch[1];
            }
            let guestMatch = txtContent.match(/(\d+)\s*زائر/) || txtContent.match(/(\d+)\s*زوار/);
            if (guestMatch) {
                guestsCount = guestMatch[1];
            }
            if (onlineMembersCount === "0" && totalOnline !== "0") { 
                let calc = parseInt(totalOnline) - parseInt(guestsCount || "0"); 
                onlineMembersCount = calc > 0 ? calc.toString() : "0"; 
            }
            let legendSection = htmlStr.split('المفتاح');
            if (legendSection.length > 1) { 
                let tempLegend = document.createElement('div');
                tempLegend.innerHTML = legendSection[1];
                tempLegend.querySelectorAll('a').forEach(a => {
                    let gColor = rgb2hex(a.style.color || '').toLowerCase();
                    let pureGName = getCleanUsername(a, false);
                    if (gColor && pureGName) {
                        dynamicGroups[gColor] = pureGName;
                    }
                });
            }
            let activeSection = htmlStr.split('المفتاح')[0];
            let tempActive = document.createElement('div');
            tempActive.innerHTML = activeSection;
            tempActive.querySelectorAll('a[href^="/u"]').forEach(link => {
                onlineLinks.push(link);
            });
            let groupsHTML = '';
            if (legendSection.length > 1) {
                let tempL = document.createElement('div');
                tempL.innerHTML = legendSection[1];
                tempL.querySelectorAll('a').forEach(a => {
                    let htmlGName = getCleanUsername(a, true);
                    let gColor = rgb2hex(a.style.color || '').toLowerCase() || 'var(--text-strong)';
                    groupsHTML += `<span class="group-chip" style="color:${gColor}; border-color:${gColor}40; cursor:default;">${htmlGName}</span>`; 
                });
            }
            document.getElementById('wGroups').innerHTML = groupsHTML ? `<div class="groups-grid">${groupsHTML}</div>` : '<div class="empty-widget">لا يوجد مجموعات</div>';
        } else {
            document.getElementById('wGroups').innerHTML = '<div class="empty-widget">لا يوجد مجموعات</div>';
        }
        let seenLinks = new Set();
        let staffArr = [];
        let displayedMembers = [];
        onlineLinks.forEach(a => {
            let href = a.getAttribute('href'); 
            if (seenLinks.has(href)) {
                return;
            }
            seenLinks.add(href);
            let span = a.querySelector('.usr_grp_clr') || a;
            let color = rgb2hex(span.style.color || a.style.color || '').toLowerCase();
            let pureName = getCleanUsername(a, false);
            let htmlName = getCleanUsername(a, true);
            if (!pureName || pureName === 'زائر') {
                return;
            }
            let groupName = dynamicGroups[color] || ''; 
            let isNormalMember = groupName === '' || groupName.includes('عضو |') || groupName.includes('عضو نشيط') || groupName.includes('عضو مقيد');
            if (!isNormalMember && groupName !== '') {
                staffArr.push({ name: htmlName, pureName: pureName, href: href, color: color, role: groupName });
            } else {
                displayedMembers.push(`<span class="online-member-chip" style="color:${color || 'var(--text-strong)'}; border-color:${color ? color+'40' : 'var(--item-border)'}; cursor:default;" title="${pureName}"><i class="material-symbols-outlined" style="font-size:14px;">account_circle</i> <span class="chip-name" style="display:inline-flex; align-items:center;">${htmlName}</span></span>`);
            }
        });
        document.getElementById('wStats').innerHTML = `
            <dl class="shq-pairs"><dt>إجمالي الأعضاء</dt><dd>${forumTotalMembers}</dd></dl>
            <dl class="shq-pairs"><dt>المتواجدون الآن</dt><dd>${totalOnline}</dd></dl>
            <dl class="shq-pairs"><dt>الأعضاء المتصلين</dt><dd>${onlineMembersCount}</dd></dl>
            <dl class="shq-pairs"><dt>الزوار</dt><dd>${guestsCount}</dd></dl>
        `;
        if (staffArr.length > 0) {
            let staffHtmlArr = staffArr.map(s => { 
                let displayRole = s.role;
                if(displayRole.includes('الإدارة التنفيذية') || displayRole.includes('Executive')) {
                    displayRole = 'الإدارة التنفيذية | Executive <i class="material-symbols-outlined" style="font-size:14px; vertical-align:middle;">verified</i>';
                }
                return `
                    <li class="shq-list-item">
                        <div class="shq-content-row">
                            <div class="shq-content-figure">
                                <img src="https://2img.net/i/fa/modernbb/pp-blank-thumb.png" style="border: 2px solid ${s.color};">
                            </div>
                            <div class="shq-content-main" style="gap: 0;">
                                <span class="shq-content-title" style="color:${s.color}; line-height: 1; display:flex; align-items:center; cursor:default;">${s.name}</span>
                                <div class="shq-content-minor" style="line-height: 1; margin-top: 4px;">${displayRole}</div>
                            </div>
                        </div>
                    </li>
                `; 
            });
            document.getElementById('wStaff').innerHTML = `<ul class="shq-list">${staffHtmlArr.join('')}</ul>`;
        } else {
            document.getElementById('wStaff').innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:13px; font-weight:700;">لا يوجد إداريين متصلين</div>';
        }
        if (displayedMembers.length > 0) {
            document.getElementById('wOnline').innerHTML = `<div class="online-members-grid">${displayedMembers.slice(0, 20).join('')}</div>`;
        } else {
            document.getElementById('wOnline').innerHTML = '<div style="text-align:center; color:var(--text-muted); font-size:13px; font-weight:700;">لا يوجد أعضاء متصلين</div>';
        }
        try {
            const memHtml = await fetchWithCache('/memberlist?mode=joined&order=DESC');
            const memDoc = new DOMParser().parseFromString(memHtml, 'text/html'); 
            let newMemsHTML = ''; 
            const colors = ['#4CAF50', '#8BC34A', '#FF9800', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688'];
            let validMembers = [];
            let members = Array.from(memDoc.querySelectorAll('.member-block, tr.row1, tr.row2, tr.member, table tbody tr'));
            for (let m of members) {
                let a = m.querySelector('a[href^="/u"]'); 
                if (!a) {
                    continue;
                }
                let pureName = getCleanUsername(a, false);
                let htmlName = getCleanUsername(a, true);
                if (validMembers.find(v => v === pureName) || validMembers.length >= 5) {
                    continue;
                }
                let joinDate = 'مؤخراً';
                m.querySelectorAll('.member-details div').forEach(div => {
                    if(div.textContent.includes('تاريخ التسجيل')) {
                        let clone = div.cloneNode(true);
                        clone.querySelectorAll('i, svg, img, b, strong').forEach(e => e.remove());
                        joinDate = clone.textContent.replace('تاريخ التسجيل', '').replace(':', '').trim();
                    }
                });
                if (joinDate === 'مؤخراً') {
                    let dateNode = m.querySelector('.member-joined, .joined, td:nth-child(4), td:nth-child(5)');
                    if (dateNode) {
                        let rawText = dateNode.textContent;
                        let dateMatch = rawText.match(/\d{1,4}[-/]\d{1,2}[-/]\d{1,4}/);
                        if (dateMatch) {
                            joinDate = dateMatch[0];
                        }
                    } else {
                        let match = m.textContent.match(/(?:تاريخ التسجيل|انضم)[:\s]*([\d/.-]+)/);
                        if (match) {
                            joinDate = match[1].trim();
                        }
                    }
                }
                validMembers.push(pureName);
                let avatarImg = m.querySelector('img.avatar, .avatar img, img');
                let avatar = avatarImg ? (avatarImg.getAttribute('src') || avatarImg.getAttribute('data-src')) : '';
                let isDefault = !avatar || avatar.includes('pp-blank-thumb') || avatar.includes('default');
                let avatarHtml = isDefault ? `<div class="shq-avatar-text" style="background-color: ${colors[(pureName.charCodeAt(0) || 0) % colors.length]}15; color: ${colors[(pureName.charCodeAt(0) || 0) % colors.length]};">${pureName.charAt(0).toUpperCase()}</div>` : `<img src="${avatar}">`;
                newMemsHTML += `
                    <li class="shq-list-item">
                        <div class="shq-content-row">
                            <div class="shq-content-figure">${avatarHtml}</div>
                            <div class="shq-content-main" style="gap: 0;">
                                <span class="shq-content-title" style="line-height: 1; display:flex; align-items:center; cursor:default;">${htmlName}</span>
                                <div class="shq-content-minor" style="line-height: 1; margin-top: 4px;">
                                    <i class="material-symbols-outlined" style="font-size:12px; vertical-align:middle; color:var(--primary);">calendar_month</i> التسجيل: ${joinDate}
                                </div>
                            </div>
                        </div>
                    </li>
                `;
            }
            document.getElementById('wNewMems').innerHTML = newMemsHTML ? `<ul class="shq-list">${newMemsHTML}</ul>` : '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:13px; font-weight:700;">لا يوجد بيانات</div>';
        } catch(e) { 
            document.getElementById('wNewMems').innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:13px; font-weight:700;">تعذر جلب البيانات</div>'; 
        }
    } catch(e) {
        document.getElementById('wStats').innerHTML = '<div class="empty-widget">خطأ بالاتصال</div>';
        document.getElementById('wStaff').innerHTML = '<div class="empty-widget">خطأ بالاتصال</div>';
        document.getElementById('wOnline').innerHTML = '<div class="empty-widget">خطأ بالاتصال</div>';
        document.getElementById('wGroups').innerHTML = '<div class="empty-widget">خطأ بالاتصال</div>';
    }
}

async function startApp() {
    await initUserSession(); 
    await loadAnnouncements(); 
    const target = new URLSearchParams(window.location.search).get('target');
    const path = window.location.pathname; 
    routeUrl(target || path, true); 
    buildSidebar(); 
    buildFooterStats();
}

window.addEventListener('scroll', function() { 
    const sc = document.getElementById('scrollActions'); 
    if (sc) { 
        if (window.scrollY > 300) {
            sc.classList.add('visible'); 
        } else {
            sc.classList.remove('visible'); 
        }
    } 
});

async function buildFooterStats() {
    try {
        const rssRes = await fetchWithCache('/feed/?_t=' + Date.now());
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rssRes, "text/xml");
        const items = xmlDoc.querySelectorAll("item");
        let latestHTML = '';
        let count = 0;
        items.forEach(item => {
            if (count >= 5) {
                return; 
            }
            const titleNode = item.querySelector("title");
            const linkNode = item.querySelector("link");
            if (titleNode && linkNode) {
                const title = titleNode.textContent.trim(); 
                let link = linkNode.textContent.trim(); 
                link = link.split('#')[0]; 
                latestHTML += `
                    <li class="shq-list-item">
                        <div class="shq-content-row">
                            <div class="shq-content-figure" style="color:var(--primary); display:flex; align-items:center; justify-content:center; background:var(--item-bg); border-radius:8px;">
                                <i class="material-symbols-outlined">forum</i>
                            </div>
                            <div class="shq-content-main">
                                <a href="${link}" data-route="topic" class="shq-content-title">${title}</a>
                            </div>
                        </div>
                    </li>
                `; 
                count++;
            }
        });
        document.getElementById('footerLatestThreadsContent').innerHTML = latestHTML ? `<ul class="shq-list">${latestHTML}</ul>` : '<div class="empty-widget">لا توجد مواضيع</div>';
    } catch(e) { 
        document.getElementById('footerLatestThreadsContent').innerHTML = '<div class="empty-widget">تعذر جلب المواضيع</div>'; 
    }
    try {
        const memHtml = await fetchWithCache('/memberlist?mode=posts&order=DESC&_t=' + Date.now());
        const memDoc = new DOMParser().parseFromString(memHtml, 'text/html'); 
        let topPostersHTML = '';
        let validMembers = [];
        Array.from(memDoc.querySelectorAll('.member-block, tr.row1, tr.row2, tr.member, table tbody tr')).forEach(m => {
            let a = m.querySelector('a[href^="/u"]'); 
            if (!a) {
                return; 
            }
            let pureName = getCleanUsername(a, false);
            let htmlName = getCleanUsername(a, true);
            if (validMembers.find(v => v.pureName === pureName) || validMembers.length >= 5) {
                return; 
            }
            let posts = '0';
            let foundPosts = false;
            m.querySelectorAll('.member-details div').forEach(div => {
                if(div.textContent.includes('المساهمات')) {
                    let nums = div.textContent.match(/\d+/g);
                    if (nums) { 
                        posts = nums.join(''); 
                        foundPosts = true; 
                    }
                }
            });
            if (!foundPosts) {
                let postsNode = m.querySelector('.member-posts, .posts, td:nth-child(3), td:nth-child(4)');
                if (postsNode) { 
                    let nums = postsNode.textContent.match(/\d+/g); 
                    if (nums) {
                        posts = nums.join(''); 
                    }
                } else { 
                    let match = m.textContent.match(/(?:مساهمات|مشاركات)[:\s]*(\d+)/) || m.textContent.match(/(\d+)[\s:]*(?:مساهمات|مشاركات)/); 
                    if (match) {
                        posts = match[1]; 
                    }
                }
            }
            let avatarImg = m.querySelector('img.avatar, .avatar img, img');
            let avatarSrc = avatarImg ? (avatarImg.getAttribute('src') || avatarImg.getAttribute('data-src')) : '';
            validMembers.push({ pureName: pureName, htmlName: htmlName, avatar: avatarSrc, posts: posts });
        });
        const colors = ['#4CAF50', '#8BC34A', '#FF9800', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688'];
        validMembers.forEach(mem => { 
            let color = 'var(--text-strong)';
            let isDefault = !mem.avatar || mem.avatar.includes('pp-blank-thumb') || mem.avatar.includes('default'); 
            const initial = mem.pureName.charAt(0).toUpperCase();
            const charCode = mem.pureName.charCodeAt(0) || 0;
            const finalColor = color !== 'var(--text-strong)' ? color : colors[charCode % colors.length];
            let avatarHtml = isDefault ? `<div class="shq-avatar-text" style="background-color: ${finalColor}15; color: ${finalColor}; border: 1px solid ${finalColor}40;">${initial}</div>` : `<img src="${mem.avatar}">`;
            topPostersHTML += `
                <li class="shq-list-item">
                    <div class="shq-content-row">
                        <div class="shq-content-figure">${avatarHtml}</div>
                        <div class="shq-content-main" style="gap:0;">
                            <span class="shq-content-title" style="color:${color}; line-height:1; display:flex; align-items:center; cursor:default;">${mem.htmlName}</span>
                            <div class="shq-content-minor" style="line-height:1; margin-top:4px;">
                                <i class="material-symbols-outlined" style="font-size:12px; vertical-align:middle; color:var(--primary);">chat</i> المساهمات: ${mem.posts}
                            </div>
                        </div>
                    </div>
                </li>
            `;
        });
        document.getElementById('footerTopPostersContent').innerHTML = topPostersHTML ? `<ul class="shq-list">${topPostersHTML}</ul>` : '<div class="empty-widget">لا يوجد بيانات</div>';
    } catch(e) { 
        document.getElementById('footerTopPostersContent').innerHTML = '<div class="empty-widget">تعذر جلب البيانات</div>'; 
    }
    try {
        const memHtml = await fetchWithCache('/memberlist?mode=joined&order=DESC&_t=' + Date.now());
        const memDoc = new DOMParser().parseFromString(memHtml, 'text/html'); 
        let newMemsHTML = '';
        let validMembers = [];
        Array.from(memDoc.querySelectorAll('.member-block, tr.row1, tr.row2, tr.member, table tbody tr')).forEach(m => {
            let a = m.querySelector('a[href^="/u"]'); 
            if (!a) {
                return; 
            }
            let pureName = getCleanUsername(a, false);
            let htmlName = getCleanUsername(a, true);
            if (validMembers.find(v => v.pureName === pureName) || validMembers.length >= 5) {
                return; 
            }
            let joinDate = 'مؤخراً';
            m.querySelectorAll('.member-details div').forEach(div => {
                if (div.textContent.includes('تاريخ التسجيل')) {
                    let clone = div.cloneNode(true);
                    clone.querySelectorAll('i, svg, img, b, strong').forEach(e => e.remove());
                    joinDate = clone.textContent.replace('تاريخ التسجيل', '').replace(':', '').trim();
                }
            });
            if (joinDate === 'مؤخراً') {
                let dateNode = m.querySelector('.member-joined, .joined, td:nth-child(4), td:nth-child(5)');
                if (dateNode) {
                    let rawText = dateNode.textContent;
                    let dateMatch = rawText.match(/\d{1,4}[-/]\d{1,2}[-/]\d{1,4}/);
                    if (dateMatch) {
                        joinDate = dateMatch[0];
                    }
                } else {
                    let match = m.textContent.match(/(?:تاريخ التسجيل|انضم)[:\s]*([\d/.-]+)/);
                    if (match) {
                        joinDate = match[1].trim();
                    }
                }
            }
            let avatarImg = m.querySelector('img.avatar, .avatar img, img');
            let avatarSrc = avatarImg ? (avatarImg.getAttribute('src') || avatarImg.getAttribute('data-src')) : '';
            validMembers.push({ pureName: pureName, htmlName: htmlName, avatar: avatarSrc, date: joinDate });
        });
        const colors = ['#4CAF50', '#8BC34A', '#FF9800', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688'];
        validMembers.forEach(mem => { 
            let color = 'var(--text-strong)';
            let isDefault = !mem.avatar || mem.avatar.includes('pp-blank-thumb') || mem.avatar.includes('default'); 
            const initial = mem.pureName.charAt(0).toUpperCase();
            const charCode = mem.pureName.charCodeAt(0) || 0;
            const finalColor = color !== 'var(--text-strong)' ? color : colors[charCode % colors.length];
            let avatarHtml = isDefault ? `<div class="shq-avatar-text" style="background-color: ${finalColor}15; color: ${finalColor}; border: 1px solid ${finalColor}40;">${initial}</div>` : `<img src="${mem.avatar}">`;
            newMemsHTML += `
                <li class="shq-list-item">
                    <div class="shq-content-row">
                        <div class="shq-content-figure">${avatarHtml}</div>
                        <div class="shq-content-main" style="gap:0;">
                            <span class="shq-content-title" style="color:${color}; line-height:1; display:flex; align-items:center; cursor:default;">${mem.htmlName}</span>
                            <div class="shq-content-minor" style="line-height:1; margin-top:4px;">
                                <i class="material-symbols-outlined" style="font-size:12px; vertical-align:middle; color:var(--primary);">calendar_month</i> التسجيل: ${mem.date}
                            </div>
                        </div>
                    </div>
                </li>
            `;
        });
        document.getElementById('footerNewMemsContent').innerHTML = newMemsHTML ? `<ul class="shq-list">${newMemsHTML}</ul>` : '<div class="empty-widget">لا يوجد بيانات</div>';
    } catch(e) { 
        document.getElementById('footerNewMemsContent').innerHTML = '<div class="empty-widget">تعذر جلب البيانات</div>'; 
    }
}

$(document).ready(function() { 
    startApp(); 
});
