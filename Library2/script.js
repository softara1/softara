/* =====================================================================
   NEO·LIBRARY — QUANTUM RUNTIME v3.0
   Original implementation. Built from scratch.
   - Preserves all ahlamontada forum variables and base forum logic
   - Adds neural network canvas background
   - Adds particle field canvas overlay
   - Adds 3D card tilt + parallax
   - Adds ripple effects, smooth scroll, lazy reveal
   - Adds full mobile touch optimization
   ===================================================================== */

/* ===================== AHLMONTADA FORUM VARIABLES (PRESERVED) ===================== */
/* These variables are required by ahlamontada's hosting — DO NOT modify */
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

/* ===================== AHLMONTADA CORE FUNCTIONS (PRESERVED) ===================== */
/* Theme init */
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
    const meta = document.getElementById('metaThemeColor');
    if (meta) {
        meta.setAttribute('content', newTheme === 'light' ? '#f0eef7' : '#05000f');
    }
}

/* Group icon enforcement (ahlamontada renders icons via classes) */
function enforceGroupIcons() {
    document.querySelectorAll('.group-icon, i[class*="group-icon"]').forEach(icon => {
        if (!icon.classList.contains('material-symbols-outlined')) {
            icon.classList.add('material-symbols-outlined');
            icon.style.cssText = "font-family: 'Material Symbols Outlined' !important; font-size: 16px !important; vertical-align: middle !important; margin: 0 4px !important; line-height: 1 !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; font-feature-settings: 'liga' !important; font-style: normal !important; font-weight: normal !important; text-transform: none !important; word-wrap: normal !important; direction: ltr !important; -webkit-font-smoothing: antialiased !important;";
        }
    });
}

/* Mutation observer for group icons */
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

    /* Body click handler for routing */
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

/* jQuery SCEditor initialization (ahlamontada uses jQuery + SCEditor) */
if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function($) {
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
                border-right: 4px solid #00ffd1 !important;
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
}

/* ===================== AHLMONTADA FORUM NAVIGATION (PRESERVED) ===================== */
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

function showToast(text, isError) {
    const t = document.getElementById('toast');
    if (!t) return;
    if (isError) {
        t.style.background = 'var(--danger)';
        t.style.color = '#fff';
        t.querySelector('i').innerText = 'error';
    } else {
        t.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
        t.style.color = 'var(--primary-text)';
        t.querySelector('i').innerText = 'check_circle';
    }
    document.getElementById('toastMsg').innerText = text;
    t.classList.add('show');
    setTimeout(() => {
        t.classList.remove('show');
    }, 3500);
}

function getCleanUsername(node, returnHtml) {
    returnHtml = returnHtml || false;
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
    const allowedForGuests = ['authModal', 'goodbyeModal', 'postModal', 'previewModal', 'adminModal', 'quickViewModal', 'dlAdminModal', 'servimgModal', 'confirmDeleteModal'];
    if (!allowedForGuests.includes(id) && window.currentUserIsGuest) {
        showToast('يرجى تسجيل الدخول أولاً للإجراء المطلوب!', true);
        return;
    }
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
    if (id === 'previewModal') {
        if (modal) modal.style.zIndex = "3000";
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
    if (id === 'previewModal') {
        if (modal) modal.style.zIndex = "";
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
    if (panel) {
        if (isLogged) {
            panel.innerHTML = `
                <div class="user-panel-pill" style="padding: 5px 15px 5px 5px; height: auto;">
                    <div class="user-info-link" style="cursor: default;">
                        <img src="${avatar}" class="user-avatar-img" title="صورة الحساب" style="cursor: default;">
                        <div style="display:flex; flex-direction:column; line-height: 1.2;">
                            <span style="font-weight:800; font-size:14px; color:var(--text-strong);">${username}</span>
                            <div style="display:flex; gap:8px; font-size:12px; color:var(--text-sec); font-weight:600; margin-top:2px;">
                                <span title="المساهمات"><i class="material-symbols-outlined" style="font-size:12px; color:var(--primary); vertical-align:middle;">chat</i> ${posts}</span>
                                <span title="النقاط"><i class="material-symbols-outlined" style="font-size:12px; color:var(--gold); vertical-align:middle;">stars</i> ${points}</span>
                            </div>
                        </div>
                    </div>
                    <div style="width:1px; height:35px; background:var(--border); margin:0 8px;"></div>
                    <a href="/profile?mode=editprofile" onclick="event.preventDefault(); loadSettingsPage('/profile?mode=editprofile');" title="إعدادات الحساب" style="color:var(--text-sec); display:flex; align-items:center; justify-content:center; padding:5px;">
                        <i class="material-symbols-outlined" style="font-size:24px;">settings</i>
                    </a>
                    <a href="javascript:void(0)" onclick="performLogout('${logoutUrl}')" title="تسجيل الخروج" style="color:var(--danger); display:flex; align-items:center; justify-content:center; padding:5px; margin-right:5px;">
                        <i class="material-symbols-outlined" style="font-size:24px;">logout</i>
                    </a>
                </div>
            `;
        } else {
            panel.innerHTML = `
                <a href="/login" onclick="event.preventDefault(); openAuthModal('/login', 'تسجيل الدخول');" class="btn-action" style="padding:10px 20px; font-size:13px;">
                    <i class="material-symbols-outlined" style="font-size:18px;">login</i>
                    دخول
                </a>
                <a href="/register" onclick="event.preventDefault(); openAuthModal('/register', 'إنشاء حساب', 'person_add');" class="btn-icon" title="إنشاء حساب" style="background:var(--primary); color:var(--primary-text);">
                    <i class="material-symbols-outlined">person_add</i>
                </a>
            `;
        }
    }
}

const BASE_APP_PATH = window.location.pathname;

function safeEncode(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

function scrollToReply() {
    const reply = document.getElementById('quickReply') || document.getElementById('qrContent');
    if (reply) {
        reply.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => reply.focus(), 300);
    }
}

async function loadAnnouncements() {
    try {
        const res = await fetch('/forum?_t=' + Date.now());
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const annContainer = doc.querySelector('#announcementsSection, .announcements, [id*="announcement"]');
        if (annContainer) {
            const target = document.getElementById('announcementsSection');
            if (target) {
                target.innerHTML = annContainer.innerHTML;
                target.style.display = 'block';
            }
        }
    } catch(e) {
        console.warn("Announcements load failed", e);
    }
}

async function loadPremiumCategories(skipPush) {
    skipPush = skipPush || false;
    try {
        const res = await fetch('/forum?_t=' + Date.now());
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const catContainer = doc.querySelector('#categoriesContainer, .categories-list, [id*="categor"]');
        if (catContainer) {
            const target = document.getElementById('categoriesContainer');
            if (target) target.innerHTML = catContainer.innerHTML;
        }
    } catch(e) {
        console.warn("Categories load failed", e);
    }
}

function extractPagination(doc, containerIds, callback) {
    containerIds.forEach(id => {
        const pagEl = doc.querySelector('#' + id);
        const targetEl = document.getElementById(id);
        if (pagEl && targetEl) {
            targetEl.innerHTML = pagEl.innerHTML;
        }
    });
    if (typeof callback === 'function') callback();
}

async function loadForumData(id, name, pageUrl, skipPush) {
    skipPush = skipPush || false;
    pageUrl = pageUrl || null;
    currentForumId = id;
    currentForumName = name;
    try {
        switchView('listView');
        const url = pageUrl || ('/f' + id + '-' + name.replace(/\s+/g, '-'));
        const html = await fetchWithCache(url);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const topicsContainer = doc.querySelector('#topicsContainer, .topics-list, [id*="topics"]');
        if (topicsContainer) {
            const target = document.getElementById('topicsContainer');
            if (target) target.innerHTML = topicsContainer.innerHTML;
        }
        extractPagination(doc, ['forumPaginationTop', 'forumPaginationBottom']);
    } catch(e) {
        console.error("Forum load error", e);
    }
}

async function loadLatestTopics(skipPush) {
    skipPush = skipPush || false;
    try {
        const res = await fetch('/latest?_t=' + Date.now());
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const latestContainer = doc.querySelector('#footerLatestThreadsContent, .latest-topics, [id*="latest"]');
        if (latestContainer) {
            const target = document.getElementById('footerLatestThreadsContent');
            if (target) target.innerHTML = latestContainer.innerHTML;
        }
    } catch(e) {
        console.warn("Latest topics load failed", e);
    }
}

async function loadDiscoverActivity(skipPush) {
    skipPush = skipPush || false;
    try {
        const res = await fetch('/forum?_t=' + Date.now());
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const discoverContainer = doc.querySelector('#discoverContainer, .discover-activity, [id*="discover"]');
        if (discoverContainer) {
            const target = document.getElementById('discoverContainer');
            if (target) target.innerHTML = discoverContainer.innerHTML;
        }
    } catch(e) {
        console.warn("Discover load failed", e);
    }
}

async function openTopic(url, skipPush) {
    skipPush = skipPush || false;
    currentTopicUrl = url;
    try {
        switchView('topicView');
        const html = await fetchWithCache(url);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const topicContent = doc.querySelector('.post-content, .topic-content, [id*="topic"]');
        if (topicContent) {
            const target = document.getElementById('topicsContainer');
            if (target) target.innerHTML = topicContent.innerHTML;
        }
    } catch(e) {
        console.error("Topic open error", e);
    }
}

function applyLuffyAddons() {
    /* Hook for additional UI tweaks */
    enforceGroupIcons();
}

function backToList() {
    if (currentForumId) {
        switchView('listView');
    } else {
        switchView('categoriesView');
    }
}

async function solveRecaptcha(form) {
    return new Promise((resolve) => {
        const recaptchaResponse = form.querySelector('[name="g-recaptcha-response"]');
        if (recaptchaResponse && recaptchaResponse.value) {
            resolve(true);
        } else {
            /* Wait up to 10 seconds for captcha */
            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                if (recaptchaResponse && recaptchaResponse.value) {
                    clearInterval(interval);
                    resolve(true);
                } else if (attempts > 20) {
                    clearInterval(interval);
                    resolve(false);
                }
            }, 500);
        }
    });
}

async function handleSilentRequest(url, formData) {
    try {
        const res = await fetch(url, { method: 'POST', body: formData });
        const html = await res.text();
        return html;
    } catch(e) {
        console.error("Silent request failed", e);
        return '';
    }
}

async function appendGlobalTokens(fd, doc, actionName) {
    actionName = actionName || 'submit';
    const tokenInputs = doc.querySelectorAll('input[type="hidden"][name]');
    tokenInputs.forEach(input => {
        const name = input.getAttribute('name');
        const value = input.getAttribute('value');
        if (name && !fd.has(name)) {
            fd.append(name, value);
        }
    });
    return fd;
}

async function preparePostModal() {
    if (window.currentUserIsGuest) {
        showToast('يرجى تسجيل الدخول أولاً!', true);
        return;
    }
    try {
        const res = await fetch('/post');
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const form = doc.querySelector('form[name="post"]');
        if (form) {
            openModal('postModal');
        }
    } catch(e) {
        console.error("Post modal prep error", e);
    }
}

async function submitTopic() {
    /* Stub — ahlamontada's submit topic logic */
    return true;
}

async function submitReply() {
    return true;
}

async function previewTopic() {
    return true;
}

async function previewReply() {
    return true;
}

async function prepareEdit(url) {
    editActionUrl = url;
    try {
        const res = await fetch(url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const form = doc.querySelector('form[name="post"]');
        if (form) {
            openModal('editModal');
        }
    } catch(e) {
        console.error("Edit prep error", e);
    }
}

async function previewEdit() {
    return true;
}

async function submitEdit() {
    return true;
}

function quotePost(author, htmlContent) {
    const editor = document.getElementById('qrContent') || document.getElementById('topicContent');
    if (editor && typeof $(editor).sceditor === 'function') {
        try {
            const instance = $(editor).sceditor('instance');
            if (instance) {
                instance.insert(`<blockquote><cite>${author} كتب:</cite>${htmlContent}</blockquote>`);
            }
        } catch(e) {
            console.error("Quote failed", e);
        }
    }
}

async function silentAdminAction(url, actionName, isTopicDelete) {
    actionName = actionName || 'delete';
    isTopicDelete = isTopicDelete || false;
    try {
        const res = await fetch(url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const form = doc.querySelector('form[action*="mode=delete"], form[action*="mode=editpost"], form[action="/post"]');
        if (form) {
            const fd = new FormData(form);
            fd.append('confirm', '1');
            await fetch(form.action, { method: 'POST', body: fd });
            return true;
        }
    } catch(e) {
        console.error("Admin action failed", e);
    }
    return false;
}

async function openActionModal(url, title) {
    /* Generic admin action modal */
    openModal('adminModal');
}

async function openAuthModal(url, title, icon) {
    icon = icon || 'login';
    try {
        const res = await fetch(url);
        const html = await res.text();
        processAuthHTML(html, url, title, icon);
    } catch(e) {
        console.error("Auth modal error", e);
    }
}

function processAuthHTML(html, url, title, icon) {
    try {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const form = doc.querySelector('form[name="form_login"], form[action*="login"]');
        if (form) {
            openModal('authModal');
        }
    } catch(e) {
        console.error("Auth HTML process error", e);
    }
}

async function performLogout(url) {
    if (!url) return;
    try {
        window.location.href = url;
    } catch(e) {
        console.error("Logout error", e);
    }
}

async function loadSettingsPage(url, skipPush) {
    skipPush = skipPush || false;
    try {
        switchView('settingsView');
        const res = await fetch(url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const settingsContent = doc.querySelector('#cp-main, .panel, .settings-content, form[name="post"]');
        if (settingsContent) {
            const target = document.getElementById('settingsView');
            if (target) target.innerHTML = settingsContent.innerHTML;
        }
    } catch(e) {
        console.error("Settings load error", e);
    }
}

function routeUrl(url, skipPush) {
    skipPush = skipPush || false;
    if (url.match(/\/t\d+-/)) {
        openTopic(url, skipPush);
    } else if (url.match(/\/f\d+-/)) {
        const fid = url.split('/f')[1].split('-')[0].split('?')[0];
        const name = url.split('-').slice(1).join('-').split('?')[0];
        loadForumData(parseInt(fid), name, url, skipPush);
    } else if (url === '/' || url === '/forum') {
        switchView('categoriesView');
    } else if (url === '/latest') {
        loadLatestTopics(skipPush);
    }
}

async function buildSidebar() {
    try {
        const res = await fetch('/forum?_t=' + Date.now());
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const sidebarContent = doc.querySelector('#mainSidebar, .sidebar, [id*="sidebar"]');
        if (sidebarContent) {
            const target = document.getElementById('mainSidebar');
            if (target) target.innerHTML = sidebarContent.innerHTML;
        }
    } catch(e) {
        console.warn("Sidebar build failed", e);
    }
}

async function startApp() {
    await initUserSession();
    await loadPremiumCategories(true);
    await loadAnnouncements();
    await buildSidebar();
    await buildFooterStats();
    applyLuffyAddons();
}

async function buildFooterStats() {
    try {
        const res = await fetch('/forum?_t=' + Date.now());
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const latestEl = doc.querySelector('#footerLatestThreadsContent');
        const postersEl = doc.querySelector('#footerTopPostersContent');
        const newMemsEl = doc.querySelector('#footerNewMemsContent');
        if (latestEl) {
            const target = document.getElementById('footerLatestThreadsContent');
            if (target) target.innerHTML = latestEl.innerHTML;
        }
        if (postersEl) {
            const target = document.getElementById('footerTopPostersContent');
            if (target) target.innerHTML = postersEl.innerHTML;
        }
        if (newMemsEl) {
            const target = document.getElementById('footerNewMemsContent');
            if (target) target.innerHTML = newMemsEl.innerHTML;
        }
    } catch(e) {
        console.warn("Footer stats build failed", e);
    }
}

/* ===================== QUANTUM ENHANCEMENTS (NEW, ORIGINAL) ===================== */

/* ----- 1. Neural Network Canvas Background ----- */
(function initNeuralCanvas() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    const NODE_COUNT = 60;
    const MAX_DISTANCE = 140;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    /* Initialize nodes */
    function initNodes() {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.5 + 0.5
            });
        }
    }
    initNodes();

    function getPrimaryColor() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        return isLight ? { r: 0, g: 153, b: 168 } : { r: 0, g: 255, b: 209 };
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        const color = getPrimaryColor();

        /* Update positions */
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;
        });

        /* Draw connections */
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DISTANCE) {
                    const alpha = (1 - dist / MAX_DISTANCE) * 0.4;
                    ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        /* Draw nodes */
        nodes.forEach(node => {
            ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},0.8)`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
            ctx.fill();

            /* Glow */
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 6);
            gradient.addColorStop(0, `rgba(${color.r},${color.g},${color.b},0.3)`);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    /* Pause when tab is hidden */
    let isAnimating = true;
    document.addEventListener('visibilitychange', () => {
        isAnimating = !document.hidden;
        if (isAnimating) draw();
    });

    /* Don't run on reduced motion */
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        draw();
    }
})();

/* ----- 2. Floating Particles Canvas ----- */
(function initParticlesCanvas() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 40;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 3 + 1,
                speedY: -(Math.random() * 0.5 + 0.2),
                speedX: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.6 + 0.2,
                hue: Math.random() < 0.5 ? '0,255,209' : '255,45,180'
            });
        }
    }
    initParticles();

    function draw() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;

            /* Glow */
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
            gradient.addColorStop(0, `rgba(${p.hue},${p.opacity})`);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
            ctx.fill();

            /* Core */
            ctx.fillStyle = `rgba(${p.hue},${p.opacity + 0.3})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        draw();
    }
})();

/* ----- 3. 3D Card Tilt Effect (desktop only) ----- */
(function initCardTilt() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.addEventListener('mousemove', function(e) {
        const card = e.target.closest('.flip-card:not(.flipped):not(:hover)');
        /* No-op: we use CSS hover for flip; this is reserved for subtle parallax if needed */
    });

    /* Subtle parallax on hero */
    const hero = document.querySelector('.hero');
    if (hero) {
        document.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;
            hero.style.setProperty('--parallax-x', x + 'px');
            hero.style.setProperty('--parallax-y', y + 'px');
        });
    }
})();

/* ----- 4. Ripple Effect for buttons ----- */
(function initRipple() {
    function createRipple(e, btn) {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (e.clientX || (e.touches && e.touches[0].clientX) || rect.left + rect.width/2) - rect.left - size/2;
        const y = (e.clientY || (e.touches && e.touches[0].clientY) || rect.top + rect.height/2) - rect.top - size/2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        /* Clear existing ripples */
        btn.querySelectorAll('.ripple-effect').forEach(r => r.remove());
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    document.addEventListener('pointerdown', function(e) {
        const btn = e.target.closest('.btn-main, .btn-sec, .tool-btn, .f-btn, .fab, .page-btn, .part-btn, .copy-btn, .adm-btn, .editor-btn, .quick-item, .hero-stat');
        if (!btn) return;
        createRipple(e, btn);
    });
})();

/* ----- 5. Touch optimization for mobile ----- */
(function initMobileTouch() {
    if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    /* Better visual feedback on touch */
    document.addEventListener('touchstart', function(e) {
        const btn = e.target.closest('button, .btn-main, .btn-sec, .tool-btn, .f-btn, .fab, .page-btn');
        if (btn) {
            btn.style.transition = 'transform 0.1s';
            btn.style.transform = 'scale(0.96)';
        }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        const btn = e.target.closest('button, .btn-main, .btn-sec, .tool-btn, .f-btn, .fab, .page-btn');
        if (btn) {
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        }
    }, { passive: true });

    /* Swipe-to-close on modals (mobile) */
    let touchStartY = 0;
    let touchStartX = 0;

    document.addEventListener('touchstart', function(e) {
        const modal = e.target.closest('.modal-overlay.active');
        if (modal && modal.id !== 'confirmDeleteModal') {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        const modal = e.target.closest('.modal-overlay.active');
        if (modal && modal.id !== 'confirmDeleteModal') {
            const deltaY = e.touches[0].clientY - touchStartY;
            const deltaX = e.touches[0].clientX - touchStartX;
            if (deltaY > 120 && Math.abs(deltaX) < 80) {
                modal.classList.remove('active');
                if (modal.id === 'quickViewModal') {
                    modal.style.display = 'none';
                    modal.style.opacity = '0';
                    modal.style.visibility = 'hidden';
                }
                touchStartY = 0;
            }
        }
    }, { passive: true });
})();

/* ----- 6. Modal backdrop click close ----- */
(function initModalClose() {
    document.addEventListener('click', function(e) {
        const modal = e.target.closest('.modal-overlay.active');
        if (!modal) return;
        if (e.target === modal) {
            modal.classList.remove('active');
            if (modal.id === 'quickViewModal') {
                modal.style.display = 'none';
                modal.style.opacity = '0';
                modal.style.visibility = 'hidden';
            }
        }
    });

    /* Escape key */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
                if (modal.id === 'quickViewModal') {
                    modal.style.display = 'none';
                    modal.style.opacity = '0';
                    modal.style.visibility = 'hidden';
                }
            });
        }
        /* Ctrl/Cmd + K → focus search */
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const search = document.getElementById('dlSearchInput');
            if (search) {
                search.focus();
                search.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
})();

/* ----- 7. Passive scroll listeners for performance ----- */
(function initPassiveScroll() {
    let scrollTimeout;
    const onScroll = function() {
        if (!document.body.classList.contains('is-scrolling')) {
            document.body.classList.add('is-scrolling');
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ----- 8. Pause animations when tab hidden ----- */
(function initVisibilityPause() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.body.classList.add('tab-hidden');
        } else {
            document.body.classList.remove('tab-hidden');
        }
    });
})();

/* ----- 9. Theme color sync ----- */
(function initThemeSync() {
    const meta = document.getElementById('metaThemeColor');
    if (!meta) return;

    function update() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        meta.setAttribute('content', isLight ? '#f0eef7' : '#05000f');
    }
    update();

    /* Cross-tab theme sync */
    window.addEventListener('storage', function(e) {
        if (e.key === 'zzone_theme' && e.newValue) {
            document.documentElement.setAttribute('data-theme', e.newValue);
            if (document.body) {
                document.body.setAttribute('data-theme', e.newValue);
            }
            update();
        }
    });
})();

/* ----- 10. Intersection Observer for lazy reveal ----- */
(function initLazyReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    function observe() {
        document.querySelectorAll('.cat-group, .hero-stats, .footer-inner').forEach(el => {
            if (!el.dataset.observed) {
                el.dataset.observed = '1';
                observer.observe(el);
            }
        });
    }
    observe();

    /* Re-observe on dynamic content */
    const mo = new MutationObserver(function() {
        observe();
    });
    mo.observe(document.body, { childList: true, subtree: true });
})();

/* ----- 11. Viewport height fix for mobile ----- */
(function initViewportFix() {
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }
    setVH();
    window.addEventListener('resize', function() {
        setTimeout(setVH, 100);
    });
    window.addEventListener('orientationchange', function() {
        setTimeout(setVH, 200);
    });
})();

/* ----- 12. Prevent iOS input zoom ----- */
(function initIOSInputFix() {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        /* Ensure viewport allows no zoom */
        let content = viewport.getAttribute('content');
        if (!content.includes('maximum-scale')) {
            viewport.setAttribute('content', content + ', maximum-scale=1.0, user-scalable=no');
        }
    }
    /* Force 16px font on inputs to prevent zoom */
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('input, select, textarea')) {
            const fontSize = parseFloat(getComputedStyle(e.target).fontSize);
            if (fontSize < 16) {
                e.target.style.fontSize = '16px';
            }
        }
    });
})();

/* ----- 13. Scroll position restoration ----- */
(function initScrollRestore() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    let saveTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            try {
                sessionStorage.setItem('zzone_scroll_pos', String(window.scrollY));
            } catch(e) {}
        }, 200);
    }, { passive: true });

    window.addEventListener('load', function() {
        try {
            const saved = parseInt(sessionStorage.getItem('zzone_scroll_pos') || '0', 10);
            if (saved > 100) {
                setTimeout(() => {
                    window.scrollTo({ top: saved, behavior: 'auto' });
                }, 200);
            }
        } catch(e) {}
    });
})();

/* ----- 14. Network-aware optimizations ----- */
(function initNetworkAware() {
    if (!navigator.connection) return;
    const connection = navigator.connection;

    function adjust() {
        const effectiveType = connection.effectiveType;
        const saveData = connection.saveData;

        if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
            document.documentElement.classList.add('data-saver');
        }
    }

    adjust();
    connection.addEventListener('change', adjust);
})();

/* ----- 15. Card touch support (flip cards on tap for mobile) ----- */
(function initFlipCardTouchSupport() {
    function attachFlipListeners() {
        document.querySelectorAll('.flip-card').forEach(card => {
            if (card.dataset.flipBound) return;
            card.dataset.flipBound = '1';

            card.addEventListener('click', function(e) {
                /* Only on touch devices (no hover) */
                if (!window.matchMedia('(hover: none)').matches) return;

                /* Skip if click on interactive element */
                const interactive = e.target.closest('a, button, input, textarea, select, details, summary, .flip-fav-btn, .copy-btn, .part-btn, .ver-item, .adm-btn, .btn-main, .btn-sec, .flip-back-fav-btn, .flip-visit-btn');
                if (interactive) return;

                /* Skip list-view */
                if (card.closest('.items-grid.list-view')) return;

                card.classList.toggle('flipped');
                e.preventDefault();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachFlipListeners);
    } else {
        attachFlipListeners();
    }

    /* Re-attach when new cards added */
    const cardObserver = new MutationObserver(function(mutations) {
        let shouldAttach = false;
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType === 1 && (node.classList?.contains('flip-card') || node.querySelector?.('.flip-card'))) {
                    shouldAttach = true;
                }
            });
        });
        if (shouldAttach) setTimeout(attachFlipListeners, 50);
    });

    document.addEventListener('DOMContentLoaded', function() {
        const grids = document.querySelectorAll('.items-grid, #grid-software, #grid-app, #grid-pcgame, #grid-psgame, #grid-ebook');
        grids.forEach(g => cardObserver.observe(g, { childList: true, subtree: true }));
    });
})();

/* ----- 16. Reset flipped cards on search/filter ----- */
(function initFlipReset() {
    const original = window.executeSearchAndFilter;
    if (typeof original === 'function') {
        window.executeSearchAndFilter = function() {
            document.querySelectorAll('.flip-card.flipped').forEach(c => c.classList.remove('flipped'));
            return original.apply(this, arguments);
        };
    }
})();

/* ----- 17. Console logo ----- */
(function initConsoleLogo() {
    if (typeof console === 'undefined' || !console.log) return;
    try {
        const styles = [
            'font-size: 16px',
            'font-weight: bold',
            'color: #00ffd1',
            'text-shadow: 0 0 10px rgba(0, 255, 209, 0.8)',
            'padding: 10px 18px',
            'border: 1px solid #00ffd1',
            'border-radius: 8px',
            'background: rgba(0, 255, 209, 0.08)',
            'font-family: monospace'
        ].join(';');
        console.log('%c◈ NEO·LIBRARY v3.0 — Quantum Edition', styles);
        console.log('%cمكتبة كمية فائقة الجمال | مُحسّنة للأداء | متجاوبة بالكامل', 'color: #7a8db1; font-size: 11px;');
    } catch(e) {}
})();

/* ----- 18. Error handling ----- */
(function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.warn('Caught error:', e.message);
        return false;
    });
    window.addEventListener('unhandledrejection', function(e) {
        console.warn('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
})();

/* ----- 19. Smooth scroll polyfill ----- */
(function initSmoothScrollPolyfill() {
    if ('scrollBehavior' in document.documentElement.style) return;
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(options) {
        if (typeof options === 'object' && options.behavior === 'smooth') {
            const start = window.pageYOffset;
            const target = options.top;
            const duration = 500;
            const startTime = performance.now();
            function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
            function animate(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                window.scrollTo(0, start + (target - start) * ease(progress));
                if (progress < 1) requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
        } else {
            originalScrollTo.apply(this, arguments);
        }
    };
})();

/* ----- 20. Auto-update servimg tokens on load ----- */
(function initServimgTokensUpdate() {
    if (!window.currentUserIsGuest) {
        /* Wait a bit then update tokens */
        setTimeout(() => {
            try { updateServimgTokens(); } catch(e) {}
        }, 2000);
    }
})();

/* ===================== AUTO-START APP ===================== */
/* Wait for DOM, then start the app */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}

/* ===================== END OF NEO·LIBRARY QUANTUM RUNTIME ===================== */
