var servImgAccount = window.servImgAccount || 'jetzem@mohemil.com';
var servImgId = window.servImgId || '05444dce4054fc447035d18e5c92547c';
var servImgF = window.servImgF || '13386037';
var servImgTB = window.servImgTB || '1606987585';
var servImgSL = window.servImgSL || '1';
var servImgMode = window.servImgMode || 'fae';
var iframeSrc = '/smilies?mode=smilies_frame&t=1785717690';
var SCE_TopicID = '';
var illiwebDomain = 'https://illipro.net/';
var servimgDomain = 'servimg.com';
var INTRANET = 0;
var quick_reply = '';

function extractServimgTokens(html) {
    let accMatch = html.match(/servImgAccount\s*=\s*['"]([^'"]+)['"]/);
    let idMatch = html.match(/servImgId\s*=\s*['"]([^'"]+)['"]/);
    let tbMatch = html.match(/servImgTB\s*=\s*['"]([^'"]+)['"]/);
    let fMatch = html.match(/servImgF\s*=\s*['"]([^'"]+)['"]/);
    let slMatch = html.match(/servImgSL\s*=\s*['"]([^'"]+)['"]/);
    let modeMatch = html.match(/servImgMode\s*=\s*['"]([^'"]+)['"]/);

    if (accMatch && accMatch[1]) window.servImgAccount = accMatch[1];
    if (idMatch && idMatch[1]) window.servImgId = idMatch[1];
    if (tbMatch && tbMatch[1]) window.servImgTB = tbMatch[1];
    if (fMatch && fMatch[1]) window.servImgF = fMatch[1];
    if (slMatch && slMatch[1]) window.servImgSL = slMatch[1];
    if (modeMatch && modeMatch[1]) window.servImgMode = modeMatch[1];

    if (window.servImgAccount && window.servImgId) {
        window.iframeSrc = 'https://servimg.com/multiupload.php?mode=' + (window.servImgMode || 'fae') + 
                           '&account=' + encodeURIComponent(window.servImgAccount) + 
                           '&id=' + window.servImgId + 
                           '&f=' + (window.servImgF || '13386037') + 
                           '&tb=' + window.servImgTB + 
                           '&sl=' + (window.servImgSL || '1');
    }
}

function getUserRankProgress(userPosts) {
    const posts = parseInt(userPosts) || 0;
    
    const ranks = [
        { name: "مستكشف رقمي", icon: "explore", threshold: 0 },
        { name: "هاوي تقني", icon: "radar", threshold: 50 },
        { name: "مساهم فعّال", icon: "moving", threshold: 200 },
        { name: "محترف شامل", icon: "task_alt", threshold: 500 },
        { name: "خبير استثنائي", icon: "verified", threshold: 1000 },
        { name: "سفير التقنية", icon: "military_tech", threshold: 3000 },
        { name: "أسطورة Softara", icon: "diamond", threshold: 5000 }
    ];

    let currentRank = ranks[0];
    let nextRank = null;

    for (let i = 0; i < ranks.length; i++) {
        if (posts >= ranks[i].threshold) {
            currentRank = ranks[i];
            nextRank = ranks[i + 1] || null; 
        } else {
            break;
        }
    }

    let progressPercent = 100;
    let tooltipText = "لقد وصلت إلى أعلى رتبة! أسطورة Softara";
    let nextRankText = "الحد الأقصى";

    if (nextRank) {
        let postsNeededForNext = nextRank.threshold - currentRank.threshold;
        let postsDoneInCurrent = posts - currentRank.threshold;
        progressPercent = (postsDoneInCurrent / postsNeededForNext) * 100;
        
        let postsLeft = nextRank.threshold - posts;
        tooltipText = `باقي ${postsLeft} مساهمة للوصول إلى رتبة (${nextRank.name})`;
        nextRankText = `<i class="material-symbols-outlined" style="font-size:12px; vertical-align:middle;">${nextRank.icon}</i> ${nextRank.name}`;
    }

    return `
        <div class="user-progress-wrap" title="${tooltipText}">
            <div class="up-header">
                <span>الهدف: ${nextRankText}</span>
                <span class="up-percent">${Math.floor(progressPercent)}%</span>
            </div>
            <div class="up-bar-bg">
                <div class="up-bar-fill" style="width: ${progressPercent}%;"></div>
            </div>
        </div>
    `;
}

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
    } catch (e) {}
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
    var simpleToolbar = 'bold,italic,underline,strike,mention,faspoiler,emoticon|servimg,image|size,font|left,center,right,justify|source';

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
        } catch(e) {}
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
let previewSourceModal = '';
let activeReplyFormHTML = '';
window.currentUserIsGuest = true;

function switchView(viewId) {
    const views = ['categoriesView', 'listView', 'topicView', 'discoverView', 'settingsView'];
    const currentActive = document.querySelector('.active-view');
    const nextActive = document.getElementById(viewId);
    if (currentActive && currentActive.id === viewId) return;
    if (viewId === 'settingsView') {
        document.body.classList.add('settings-active');
    } else {
        document.body.classList.remove('settings-active');
    }
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const navLinks = document.querySelectorAll('.nav-links a');
    if (viewId === 'categoriesView' && navLinks[0]) navLinks[0].classList.add('active');
    if (viewId === 'discoverView' && navLinks[1]) navLinks[1].classList.add('active');
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
            if (el) el.classList.remove('active-view'); 
        });
        if (nextActive) {
            nextActive.classList.add('active-view');
            nextActive.style.animation = 'proFadeSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        }
    }
}

function escapeHtml(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
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
    if (!node) return returnHtml ? 'زائر' : 'زائر';
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
    const allowedForGuests = ['authModal', 'goodbyeModal', 'postModal', 'previewModal', 'adminModal', 'replyModal'];
    if (!allowedForGuests.includes(id) && window.currentUserIsGuest) { 
        showToast('يرجى تسجيل الدخول أولاً للإجراء المطلوب!', true); 
        return; 
    }
    document.getElementById(id).classList.add('active');
    if (id === 'previewModal') {
        document.getElementById(id).style.zIndex = "3000"; 
    }
}

function closeModal(id) { 
    document.getElementById(id).classList.remove('active'); 
    if (id === 'previewModal') {
        document.getElementById(id).style.zIndex = "";
    }
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
        e.target.classList.remove('active');
        if (e.target.id === 'previewModal') e.target.style.zIndex = "";
    }
});

async function updateServimgTokens() {
    try {
        let res = await fetch('/privmsg?mode=post');
        let html = await res.text();
        extractServimgTokens(html);
    } catch(e) {}
}

const AppCache = {};
const CACHE_LIMIT = 20;

async function fetchWithCache(url) {
    if (AppCache[url]) return AppCache[url];
    try {
        const res = await fetch(url);
        const html = await res.text();
        if (Object.keys(AppCache).length >= CACHE_LIMIT) {
            delete AppCache[Object.keys(AppCache)[0]];
        }
        AppCache[url] = html; 
        return html;
    } catch (error) { 
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
    if (current !== '') nums.push(current);
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
            if (uParts.length < 2) uParts = html.split("_userdata['username'] = '");
            if (uParts.length >= 2) username = uParts[1].split('"')[0].split("'")[0];
            
            let aParts = html.split('_userdata["avatar_link"] = "'); 
            if (aParts.length >= 2) avatar = aParts[1].split('"')[0];
            
            let oParts = html.split('_userdata["page_logout"] = "'); 
            if (oParts.length >= 2) logoutUrl = oParts[1].split('"')[0];
            
            let poParts = html.split('_userdata["user_posts"] = '); 
            if (poParts.length >= 2) posts = parseInt(poParts[1]);
            
            let ptParts = html.split('_userdata["user_points"] = '); 
            if (ptParts.length >= 2) points = parseInt(ptParts[1]);
        }
    } catch(e) {}
    
    window.currentUserIsGuest = !isLogged;
    const guestNameGroup = document.getElementById('guestNameGroup');
    const qrGuestName = document.getElementById('qrGuestName');
    if (guestNameGroup) guestNameGroup.style.display = isLogged ? 'none' : 'block';
    if (qrGuestName) qrGuestName.style.display = isLogged ? 'none' : 'block';
    
    if (isLogged) {
        panel.innerHTML = `
            <div class="user-panel-pill" style="padding: 5px 15px 5px 5px; height: auto;">
                <div class="user-info-link" style="cursor: default;">
                    <img src="${escapeHtml(avatar)}" class="user-avatar-img" title="صورة الحساب" style="cursor: default;">
                    <div style="display:flex; flex-direction:column; line-height: 1.2;">
                        <span style="font-weight:800; font-size:14px; color:var(--text-strong);">${escapeHtml(username)}</span>
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
    if (!str) return ''; 
    let enc = encodeURIComponent(str);
    enc = enc.split("'").join("%27").split("(").join("%28").split(")").join("%29"); 
    return enc;
}

function scrollToReply() {
    const qrBox = document.getElementById('quickReplyBox');
    if (qrBox && qrBox.style.display !== 'none') {
        openReplyModal();
    } else {
        showToast('عذراً، هذا الموضوع مغلق أو لا تملك صلاحية الرد.', true);
    }
}

async function loadAnnouncements() {
    const container = document.getElementById('announcementsSection'); 
    if (!container) return;
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
    if (!skipPush) window.history.pushState({}, '', BASE_APP_PATH);
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
            if (!catTitleNode) return;
            const catTitle = catTitleNode.textContent.trim(); 
            let forumsHTML = '';
            cat.querySelectorAll('.forum-section, li.row, tr.forumrow, tr.row1, tr.row2, .board, dl.icon').forEach((forumEl, fIdx) => {
                const aTag = forumEl.querySelector('a.forumtitle, .forum-description h3 a, h2 a, a.forumlink, h3 a'); 
                if (!aTag) return;
                const name = aTag.textContent.trim();
                const url = aTag.getAttribute('href') || '';
                let id = 0; 
                if (url.indexOf('/f') !== -1) id = parseInt(url.split('/f')[1].split('-')[0]);
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
                if (avatarImg) lpAvatar = avatarImg.getAttribute('src') || avatarImg.getAttribute('data-src') || lpAvatar;
                
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
                    if (lpTitle.length > 30) lpTitle = lpTitle.substring(0, 30) + '...';
                    
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
    }
}

function extractPagination(doc, containerIds, callback) {
    const containers = containerIds.map(id => document.getElementById(id)).filter(c => c);
    containers.forEach(c => {
        c.innerHTML = '';
    });
    const pagNodes = doc.querySelectorAll('.pagination'); 
    if (pagNodes.length === 0) return;
    const elements = pagNodes[0].querySelectorAll('a, strong, b');
    const addedPages = new Set();
    const buttonsToAppend = [];
    elements.forEach(el => {
        if (el.closest('.mobile-hidden-imp')) return;
        let text = el.textContent.trim().split(String.fromCharCode(10)).join(' ').split(String.fromCharCode(13)).join(' ').split(' ').join('');
        const isActive = (el.tagName === 'STRONG' || el.tagName === 'B') && !el.getAttribute('href');
        let isPrev = text.includes('السابق') || text === '<' || el.className.includes('prev');
        let isNext = text.includes('التالي') || text === '>' || el.className.includes('next');
        let btnContent = el.textContent.trim();
        if (isPrev) btnContent = '<i class="material-symbols-outlined">chevron_right</i>';
        if (isNext) btnContent = '<i class="material-symbols-outlined">chevron_left</i>';
        if (!btnContent && !isPrev && !isNext) return;
        const identifier = isPrev ? 'prev' : (isNext ? 'next' : text);
        if (!identifier || addedPages.has(identifier)) return;
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
    if (!skipPush) window.history.pushState({}, '', BASE_APP_PATH + '?target=' + cleanUrl);
    
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
            if (actionBtnBottom) actionBtnBottom.style.display = 'none';
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
            if (actionBtnBottom) actionBtnBottom.style.display = 'none'; 
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
            if (!authorNode) authorNode = t.querySelector('.topic-author, .post-author-name, .name strong, .posts-description p');
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
                    if (colNode.style && colNode.style.color) authorColor = colNode.style.color; 
                }
            }
            const repliesNode = t.querySelector('.posts-statistics-replies, td.posts, .block-topics-views'); 
            let replies = 0;
            if (repliesNode) { 
                let rNums = extractNumbers(repliesNode.textContent); 
                if (rNums.length > 0) replies = parseInt(rNums[0]); 
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
    } catch(e) {}
}

async function loadLatestTopics(skipPush = false) {
    const targetUrl = '/search?search_id=newposts';
    if (!skipPush) window.history.pushState({}, '', BASE_APP_PATH + '?target=' + targetUrl);
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
            if (!authorNode) authorNode = t.querySelector('.topic-author, .post-author-name, .name strong, .posts-description p, .author');
            if (authorNode) { 
                author = getCleanUsername(authorNode, true); 
                let colNode = authorNode.querySelector('[style*="color"], font[color]') || authorNode; 
                if (colNode.style && colNode.style.color) authorColor = colNode.style.color; 
            }
            if (!author || author.includes('عضو') || author.includes('زائر')) { 
                let fbNode = t.querySelector('.forum-lastpost-author, .last-post-author, .block-topics-lastpost-author'); 
                if (fbNode) author = getCleanUsername(fbNode, true); 
            }
            const repliesNode = t.querySelector('.posts-statistics-replies, td.posts, .block-topics-views, dd.posts, .block-topics-posts'); 
            let replies = 0;
            if (repliesNode) { 
                let rNums = extractNumbers(repliesNode.textContent); 
                if (rNums.length > 0) replies = parseInt(rNums[0]); 
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
    } catch(e) {}
}

async function loadDiscoverActivity(skipPush = false) {
    if (!skipPush) window.history.pushState({}, '', BASE_APP_PATH + '?target=/discover');
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
    } catch(e) {}
}

async function openTopic(url, skipPush = false){
    let cleanUrl = url.split('_t=')[0]; 
    if (cleanUrl.endsWith('?') || cleanUrl.endsWith('&')) {
        cleanUrl = cleanUrl.substring(0, cleanUrl.length - 1);
    }
    if (!skipPush) window.history.pushState({}, '', BASE_APP_PATH + '?target=' + cleanUrl);
    
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
        extractServimgTokens(html); 
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

            // تجهيز مرفقات الرد السريع
            const qrAttachBox = document.getElementById('qrAttachBox');
            const qrAttachBtn = document.getElementById('qrAttachToggleBtn');
            const qrPanel = document.getElementById('qrPanelAttach');
            if (qrAttachBox) qrAttachBox.style.display = 'none';
            if (qrAttachBtn) qrAttachBtn.style.display = 'none';
            if (qrPanel) { qrPanel.innerHTML = ''; qrPanel.dataset.available = ''; }

            let replyDocForAttach = null;
            if (activeReplyFormHTML) {
                const tmp = document.createElement('div');
                tmp.innerHTML = activeReplyFormHTML;
                if (tmp.querySelector('input[name="fileupload"]')) {
                    replyDocForAttach = tmp;
                }
            }
            if (!replyDocForAttach) {
                let tid = 0; 
                if (cleanUrl.indexOf('/t') !== -1) tid = parseInt(cleanUrl.split('/t')[1].split('-')[0]);
                if (tid) {
                    fetchWithCache('/post?t=' + tid + '&mode=reply').then(replyHtml => {
                        if (!replyHtml) return;
                        const rDoc = new DOMParser().parseFromString(replyHtml, 'text/html');
                        populateAttachPanel('qrPanelAttach', rDoc);
                        if (qrPanel && qrPanel.dataset.available === '1') {
                            if (qrAttachBtn) qrAttachBtn.style.display = 'inline-flex';
                        }
                    }).catch(() => {});
                }
            } else {
                populateAttachPanel('qrPanelAttach', replyDocForAttach);
                if (qrPanel && qrPanel.dataset.available === '1') {
                    if (qrAttachBtn) qrAttachBtn.style.display = 'inline-flex';
                }
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
            if (cleanLines.length > 0) permsHTML = cleanLines.join(''); 
            else permsHTML = '<p style="color: var(--text-muted);">لا توجد صلاحيات لعرضها.</p>';
        }
        document.getElementById('tvPermissions').innerHTML = permsHTML;
        const adminTools = doc.querySelector('.topic-admin');
        const tvAdmin = document.getElementById('tvAdminTools');
        const tvAdminBottom = document.getElementById('tvAdminToolsBottom');
        tvAdmin.innerHTML = ''; 
        if (tvAdminBottom) tvAdminBottom.innerHTML = '';
        if (adminTools) {
            let adminButtonsHTML = '';
            adminTools.querySelectorAll('a').forEach(a => {
                const href = a.getAttribute('href'); 
                if (!href || href.includes('split') || href.includes('merge') || href.includes('trash')) return;
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
            if (tvAdminBottom) tvAdminBottom.innerHTML = adminButtonsHTML;
        }
        const container = document.getElementById('tvPostsContainer'); 
        container.innerHTML = '';
        let rawPosts = Array.from(doc.querySelectorAll('div.post-wrap')); 
        if (rawPosts.length === 0) rawPosts = Array.from(doc.querySelectorAll('div.post'));
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
                if (colNode.style && colNode.style.color) authorColor = colNode.style.color; 
                else if (colNode.getAttribute('color')) authorColor = colNode.getAttribute('color');
            }
            let rankNode = post.querySelector('.post-author-title, .tz-rank');
            let rankHTML = rankNode ? rankNode.innerHTML : 'عضو';
            let sigHTML = '';
            let sigNode = post.querySelector('.post-signature, .signature_div, .sig-content, div[id^="sig"], div[class*="signature"]');
            if (sigNode) sigHTML = sigNode.innerHTML;
            
            let contentClone = post.querySelector('.post-content, .content, .entry-content')?.cloneNode(true);
            if (contentClone) { 
                let innerSig = contentClone.querySelector('.post-signature, .signature_div, div[id^="sig"], div[class*="signature"]'); 
                if (innerSig) innerSig.remove(); 
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
                        if (label.includes('المساهمات') || label.includes('مشاركات')) messages = dd.textContent.trim(); 
                        else if (label.includes('نقاط')) points = dd.textContent.trim(); 
                    } 
                }); 
            } else { 
                const txt = post.querySelector('.post-author, .postprofile')?.textContent || ''; 
                if (txt.indexOf('المساهمات') !== -1 || txt.indexOf('مشاركات') !== -1) { 
                    let parts = txt.indexOf('المساهمات') !== -1 ? txt.split('المساهمات') : txt.split('مشاركات'); 
                    let nums = extractNumbers(parts[1]); 
                    if (nums.length > 0) messages = nums[0]; 
                } 
                if (txt.indexOf('نقاط') !== -1 || txt.indexOf('النقاط') !== -1) { 
                    let parts = txt.indexOf('نقاط') !== -1 ? txt.split('نقاط') : txt.split('النقاط'); 
                    let nums = extractNumbers(parts[1]); 
                    if (nums.length > 0) points = nums[0]; 
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
                        ${getUserRankProgress(messages)}
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
    } catch(e) {}
}
const avatarHtml = isDefault ? `<div class="shq-avatar-text" style="background-color: ${finalColor}15; color: ${finalColor};">${initial}</div>` : `<img src="${mem.avatar}">`;
            topPostersHTML += `
                <li class="shq-list-item">
                    <div class="shq-content-row">
                        <div class="shq-content-figure">${avatarHtml}</div>
                        <div class="shq-content-main" style="gap:0;">
                            <span class="shq-content-title" style="color:${finalColor}; line-height:1; display:flex; align-items:center; cursor:default;">${mem.htmlName}</span>
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
}
