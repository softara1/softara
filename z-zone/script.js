document.addEventListener("DOMContentLoaded", function() {
    const dmBtn = document.getElementById('darkModeBtn');
    if(dmBtn) {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        dmBtn.innerHTML = isLight ? '<i class="material-symbols-outlined">dark_mode</i>' : '<i class="material-symbols-outlined">light_mode</i>';
    }
});

function safeEncode(str) {
    if (!str) {
        return '';
    }
    let enc = encodeURIComponent(str);
    enc = enc.split("'").join("%27");
    enc = enc.split("(").join("%28");
    enc = enc.split(")").join("%29");
    return enc;
}

const AppCache = {};

async function fetchWithCache(url) {
    if (AppCache[url]) {
        return AppCache[url];
    }
    const res = await fetch(url);
    const html = await res.text();
    AppCache[url] = html;
    return html;
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

(function ($) {
    'use strict';
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
})(jQuery);

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

const iframeCSS = `html, body { background: transparent !important; color: inherit !important; font-family: 'Alexandria', sans-serif !important; font-size: 14px !important; direction: rtl; padding: 12px !important; margin: 0 !important; scrollbar-width: none !important; -ms-overflow-style: none !important; } html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; } blockquote, code { background: rgba(0,0,0,0.05) !important; border: 1px solid rgba(128,128,128,0.2) !important; border-right: 4px solid #00e5ff !important; padding: 16px !important; margin: 10px 0 !important; border-radius: 8px !important; display: block !important; color: inherit !important; } blockquote cite { font-weight: bold !important; display: block !important; margin-bottom: 8px !important; border-bottom: 1px dashed rgba(128,128,128,0.2); padding-bottom: 4px; }`;

$(function() {
    var initSCEditor = function(selector, isSimple) {
        var tBar = isSimple ? simpleToolbar : fullToolbar;
        $(selector).sceditor({
            plugins: plugin,
            style: cssFile,
            locale: locale,
            rtl: isRtl,
            toolbar: tBar,
            emoticonsEnabled: emoticonsEnabled,
            emoticonsCompat: true,
            dropdownZIndex: 999999,
            emoticons: { dropdown: smileys },
            width: "100%",
            height: isSimple ? "200px" : "320px",
            autoUpdate: true
        });
        
        var instance = $(selector).sceditor('instance');
        if(instance) {
            instance.css(iframeCSS);
            instance.bind('ready', function() {
                instance.css(iframeCSS);
            });
        }
    };
    
    initSCEditor('#topicContent', false);
    initSCEditor('#editContent', false);
    initSCEditor('#qrContent', true);
});

let currentForumId = null;
let currentForumName = '';
let isCurrentLocked = false;
let currentTopicUrl = null;
let editActionUrl = '';
let activeReplyFormHTML = '';
window.currentUserIsGuest = true;

function switchView(viewId) {
    const views = ['categoriesView', 'listView', 'topicView', 'discoverView'];
    const currentActive = document.querySelector('.active-view');
    const nextActive = document.getElementById(viewId);
    
    if (currentActive && currentActive.id === viewId) {
        return;
    }
    
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
    });
    
    const navLinks = document.querySelectorAll('.nav-links a');
    if (viewId === 'categoriesView' && navLinks[0]) {
        navLinks[0].classList.add('active');
    }
    if (viewId === 'discoverView' && navLinks[1]) {
        navLinks[1].classList.add('active');
    }

    if (currentActive) {
        currentActive.style.animation = 'proFlipOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => {
            currentActive.classList.remove('active-view');
            currentActive.style.animation = '';
            nextActive.classList.add('active-view');
            nextActive.style.animation = 'proFlipIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            window.scrollTo({top: 0, behavior: 'smooth'});
        }, 400);
    } else {
        views.forEach(v => {
            const el = document.getElementById(v);
            if (el) {
                el.classList.remove('active-view');
            }
        });
        nextActive.classList.add('active-view');
        nextActive.style.animation = 'proFlipIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
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

function getCleanUsername(node) {
    if (!node) {
        return 'زائر';
    }
    
    let clone = node.cloneNode(true);
    clone.querySelectorAll('i, svg, img, script, noscript, style, .status, .online, .offline').forEach(e => {
        e.remove();
    });
    
    let text = clone.textContent;
    let words = ['بواسطة', 'by', 'من طرف', 'في', 'access_time'];
    words.forEach(w => {
        text = text.split(w).join('');
    });
    
    let nl = String.fromCharCode(10);
    let cr = String.fromCharCode(13);
    text = text.split(nl).join(' ').split(cr).join(' ').trim();
    
    while (text.indexOf('  ') !== -1) {
        text = text.split('  ').join(' ');
    }
    
    return text || 'زائر';
}

function openModal(id) {
    if(id !== 'userProfileModal' && id !== 'authModal' && window.currentUserIsGuest) {
        showToast('يرجى تسجيل الدخول أولاً للمشاركة!', true);
        return;
    }
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

async function updateServimgTokens() {
    try {
        let res = await fetch('/privmsg?mode=post');
        let html = await res.text();
        
        let accMatch = html.match(/servImgAccount\s*=\s*['"]([^'"]+)['"]/);
        let idMatch = html.match(/servImgId\s*=\s*['"]([^'"]+)['"]/);
        let fMatch = html.match(/servImgF\s*=\s*['"]([^'"]+)['"]/);
        let tbMatch = html.match(/servImgTB\s*=\s*['"]([^'"]+)['"]/);
        let iframeMatch = html.match(/iframeSrc\s*=\s*['"]([^'"]+)['"]/);
        
        if (accMatch && accMatch[1]) window.servImgAccount = accMatch[1];
        if (idMatch && idMatch[1]) window.servImgId = idMatch[1];
        if (fMatch && fMatch[1]) window.servImgF = fMatch[1];
        if (tbMatch && tbMatch[1]) window.servImgTB = tbMatch[1];
        if (iframeMatch && iframeMatch[1]) window.iframeSrc = iframeMatch[1];
    } catch(e) {}
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
        let res = await fetch('/forum?_t=' + Math.floor(Date.now() / 60000));
        let html = await res.text();
        
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
    } catch(e) {}
    
    window.currentUserIsGuest = !isLogged;
    
    if (isLogged) {
        panel.innerHTML = `
            <div class="user-panel-pill" style="padding: 5px 15px 5px 5px; height: auto;">
                <div class="user-info-link" style="cursor: default;">
                    <img src="${avatar}" class="user-avatar-img">
                    <div style="display:flex; flex-direction:column; line-height: 1.2;">
                        <span style="font-weight:800; font-size:14px; color:var(--text-strong);">${username}</span>
                        <div style="display:flex; gap:8px; font-size:12px; color:var(--text-muted); font-weight:600; margin-top:2px;">
                            <span title="المساهمات">
                                <i class="material-symbols-outlined" style="font-size:12px; color:var(--primary); vertical-align:middle;">chat</i> ${posts}
                            </span>
                            <span title="النقاط">
                                <i class="material-symbols-outlined" style="font-size:12px; color:#fbbf24; vertical-align:middle;">stars</i> ${points}
                            </span>
                        </div>
                    </div>
                </div>
                <div style="width:1px; height:35px; background:var(--border); margin:0 8px;"></div>
                <a href="javascript:void(0)" onclick="performLogout('${logoutUrl}')" title="تسجيل الخروج" style="color:var(--danger); display:flex; align-items:center; justify-content:center; padding:5px;">
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
        window.servImgAccount = 'dummy@dummy.com';
        window.servImgId = '1234567890abcdef1234567890abcdef';
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

async function loadAnnouncements() {
    const container = document.getElementById('announcementsSection');
    if(!container) {
        return;
    }
    
    try {
        const html = await fetchWithCache('/f2-montada?_t=' + Math.floor(Date.now() / 60000));
        const doc = new DOMParser().parseFromString(html, 'text/html');
        let rawTopics = Array.from(doc.querySelectorAll('div.post-wrap, .posts-section, .block-topics-content, li.row, tr.topicrow, div.topic'));
        let topTopics = [];
        let processed = new Set();
        
        rawTopics.forEach(t => {
            const linkNode = t.querySelector('.posts-description h3 a, .topic-title, .topictitle');
            if(linkNode) {
                const href = linkNode.getAttribute('href');
                if(!processed.has(href)) {
                    processed.add(href);
                    let cloneTitle = linkNode.cloneNode(true);
                    cloneTitle.querySelectorAll('img, i, svg').forEach(el => el.remove());
                    let authorNode = t.querySelector('.topic-author a, .posts-description p a[href^="/u"], .post-author-name a, .name strong a');
                    let author = authorNode ? getCleanUsername(authorNode) : 'الإدارة';
                    topTopics.push({
                        link: href,
                        title: cloneTitle.textContent.trim(),
                        author: author
                    });
                }
            }
        });

        if(topTopics.length > 0) {
            let cardsHtml = topTopics.slice(0, 2).map((t, index) => `
                <div class="announce-card ${index === 0 ? 'active' : ''}" onclick="openTopic('${t.link}')" data-index="${index}">
                    <div class="announce-icon"><i class="material-symbols-outlined">push_pin</i></div>
                    <div class="announce-content">
                        <h4>${t.title}</h4>
                        <span><i class="material-symbols-outlined">edit_square</i> ${t.author}</span>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="announcements-header"><i class="material-symbols-outlined">campaign</i> إعلانات إدارية هامة</div>
                <div class="announcements-carousel" id="annCarousel">${cardsHtml}</div>
            `;
            container.style.display = 'block';
            
            const carousel = document.getElementById('annCarousel');
            let annCards = carousel.querySelectorAll('.announce-card');
            
            if (annCards.length > 1) {
                let currentAnnIdx = 0;
                setInterval(() => {
                    annCards[currentAnnIdx].classList.remove('active');
                    currentAnnIdx = (currentAnnIdx + 1) % annCards.length;
                    annCards[currentAnnIdx].classList.add('active');
                }, 5000);
            }
        }
    } catch(e) {}
}

async function loadPremiumCategories(skipPush = false) {
    if (!skipPush) {
        window.history.pushState({}, '', BASE_APP_PATH);
    }
    
    switchView('categoriesView');
    document.getElementById('mainActionBtn').style.display = 'none';
    const container = document.getElementById('categoriesContainer');
    
    if (container.innerHTML === '' || container.innerHTML.includes('جاري')) {
        container.innerHTML = '<div style="height: 50vh;"></div>';
    }
    
    try {
        const html = await fetchWithCache('/forum?_t=' + Math.floor(Date.now() / 60000));
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const categories = doc.querySelectorAll('div.forum, div.forabg, table.forumline');
        let finalHTML = '';
        
        if (categories.length === 0) {
            return;
        }
        
        categories.forEach((cat, index) => {
            const catTitleNode = cat.querySelector('.category-title h2, .category-title span, h2.maintitle, .category-title span h2');
            if (!catTitleNode) {
                return;
            }
            
            const catTitle = catTitleNode.textContent.trim();
            let forumsHTML = '';
            const forums = cat.querySelectorAll('.forum-section, li.row, tr.forumrow');
            
            forums.forEach((forumEl, fIdx) => {
                const aTag = forumEl.querySelector('a.forumtitle, .forum-description h3 a, h2 a');
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
                const subLinks = forumEl.querySelectorAll('.forum-description a.gensmall, .subforums a');
                
                subLinks.forEach(sub => {
                    const sName = sub.textContent.trim();
                    const sHref = sub.getAttribute('href') || '';
                    if (sName) {
                        let sId = 0;
                        if (sHref.indexOf('/f') !== -1) {
                            sId = parseInt(sHref.split('/f')[1].split('-')[0]);
                        }
                        subforumsHTML += `<a href="javascript:void(0)" onclick="event.stopPropagation(); loadForumData(${sId}, decodeURIComponent('${safeEncode(sName)}'), '${sHref}')" class="subforum-link"><i class="material-symbols-outlined" style="font-size:16px;">subdirectory_arrow_left</i> ${sName}</a>`;
                    }
                });
                
                let topics = '0';
                let posts = '0';
                const statsText = forumEl.querySelector('.forum-statistics, .topics, .posts')?.textContent || '';
                const statNums = extractNumbers(statsText);
                
                if (statNums && statNums.length >= 2) {
                    topics = statNums[0];
                    posts = statNums[1];
                }
                
                let lpAvatar = 'https://2img.net/i/fa/modernbb/pp-blank-thumb.png';
                const avatarImg = forumEl.querySelector('.avatar-default img, .lastpost-avatar img');
                if (avatarImg && avatarImg.src) {
                    lpAvatar = avatarImg.src;
                }
                
                let lpTitle = 'لا يوجد مواضيع';
                let lpTopicUrl = 'javascript:void(0)';
                const topicTitleNode = forumEl.querySelector('.topic-title, .lastpost-title, .forum-lastpost-inner a');
                
                if (topicTitleNode) {
                    let fullTitle = topicTitleNode.textContent.trim();
                    if (fullTitle.length > 0) {
                        lpTitle = fullTitle.length > 16 ? fullTitle.substring(0, 16) + '...' : fullTitle;
                    }
                    lpTopicUrl = topicTitleNode.getAttribute('href') || 'javascript:void(0)';
                }
                
                let lpUser = '';
                let lpTime = '';
                const lpEl = forumEl.querySelector('.forum-lastpost, dd.lastpost, .last-post');
                let isCategoryEmpty = false;
                
                if (!topicTitleNode && (!lpEl || lpEl.textContent.trim() === '' || lpEl.textContent.includes('لا يوجد'))) {
                    isCategoryEmpty = true;
                }
                if (lpTitle.includes('لا يوجد')) {
                    isCategoryEmpty = true;
                }
                
                if (!isCategoryEmpty && lpEl) {
                    const authorNode = forumEl.querySelector('.forum-lastpost-author, .lastpost-author');
                    if (authorNode) {
                        lpUser = getCleanUsername(authorNode);
                    } else {
                        const links = lpEl.querySelectorAll('a');
                        let userLinks = Array.from(links).filter(l => l.getAttribute('href') && l.getAttribute('href').includes('/u'));
                        if (userLinks.length > 0) {
                            lpUser = getCleanUsername(userLinks[userLinks.length - 1]);
                        } else {
                            let fallbackStr = lpEl.querySelector('strong, span.name');
                            if (fallbackStr) {
                                lpUser = getCleanUsername(fallbackStr);
                            }
                        }
                    }
                    
                    const timeLink = forumEl.querySelector('.forum-lastpost-time a, .lastpost-time a');
                    if (timeLink) {
                        lpTime = timeLink.textContent.trim();
                    } else {
                        const timeNode = forumEl.querySelector('.forum-lastpost-time, .lastpost-time');
                        if (timeNode) {
                            let tTxt = timeNode.textContent;
                            let tWords = ['access_time', 'person', 'calendar_month'];
                            tWords.forEach(w => {
                                tTxt = tTxt.split(w).join('');
                            });
                            lpTime = tTxt.trim();
                        } else {
                            let lpText = lpEl.textContent;
                            let tWords = ['access_time', 'person', 'calendar_month'];
                            tWords.forEach(w => {
                                lpText = lpText.split(w).join('');
                            });
                            lpTime = lpText.trim();
                        }
                    }
                }
                
                if (nodeIcon === 'forum') {
                    const icons = ['forum', 'chat', 'memory', 'router', 'public', 'bolt', 'terminal', 'code_blocks'];
                    nodeIcon = icons[fIdx % icons.length];
                }
                
                let lastPostBlock = '';
                
                if (isCategoryEmpty) {
                    lastPostBlock = `
                        <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: var(--text-muted); font-weight: 800; font-size: 14px; gap: 8px;">
                            <i class="material-symbols-outlined">info</i> لا توجد مواضيع
                        </div>
                    `;
                } else {
                    lastPostBlock = `
                        <div class="lp-icon" style="width: 48px; height: 48px; border-radius: 50%; overflow: hidden; border: 2px solid var(--primary); display: flex; align-items: center; justify-content: center; background: rgba(0, 229, 255, 0.05); flex-shrink: 0; padding: 0;">
                            <img src="${lpAvatar}" alt="avatar" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div class="lp-info" style="justify-content: center;">
                            <a href="javascript:void(0)" onclick="event.stopPropagation(); openTopic('${lpTopicUrl}')" class="lp-title" style="font-weight: 800; color: var(--text-strong); font-size: 14px; text-decoration: none; transition: 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-strong)'">${lpTitle}</a>
                            <span style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 4px; font-size: 13px; color: var(--text-muted);">
                                <span style="display: flex; align-items: center; gap: 4px;">
                                    <i class="material-symbols-outlined" style="font-size: 15px;">person</i> <b>${lpUser}</b>
                                </span>
                                <span style="color: var(--border);">|</span>
                                <span style="display: flex; align-items: center; gap: 4px;">
                                    <i class="material-symbols-outlined" style="font-size: 15px;">calendar_month</i> ${lpTime}
                                </span>
                            </span>
                        </div>
                    `;
                }
                
                forumsHTML += `
                    <div class="node-row" onclick="loadForumData(${id}, decodeURIComponent('${safeEncode(name)}'), '${url}')">
                        <div class="node-icon">
                            <i class="material-symbols-outlined">${nodeIcon}</i>
                        </div>
                        <div class="node-main">
                            <span class="node-title">${lockBadge}${name}</span>
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
                    </div>
                `;
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
                    </div>
                `;
            }
        });
        
        container.innerHTML = finalHTML;
    } catch (e) {}
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
    
    const pagNode = pagNodes[0];
    const elements = pagNode.querySelectorAll('a, strong, b');
    const addedPages = new Set();
    const buttonsToAppend = [];
    
    elements.forEach(el => {
        if (el.closest('.mobile-hidden-imp')) {
            return;
        }
        
        let text = el.textContent.trim();
        let nl = String.fromCharCode(10);
        let cr = String.fromCharCode(13);
        
        text = text.split(nl).join(' ').split(cr).join(' ').split(' ').join('');
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
    
    container.innerHTML = '';
    document.getElementById('forumPaginationTop').innerHTML = '';
    document.getElementById('forumPaginationBottom').innerHTML = '';
    banner.style.display = 'none';
    
    try {
        const html = await fetchWithCache(`${fetchUrl}${fetchUrl.includes('?') ? '&' : '?'}_t=${Math.floor(Date.now() / 60000)}`);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const newBtn = doc.querySelector('a[href*="mode=newtopic"]');
        
        if (!newBtn) {
            actionBtn.style.display = 'none';
        } else if(newBtn.querySelector('img[src*="locked"]') || newBtn.textContent.includes('مغلق') || doc.querySelector('.forum_locked')){
            isCurrentLocked = true;
            banner.style.display = 'flex';
            actionBtn.className = 'btn-locked';
            actionBtn.innerHTML = '<i class="material-symbols-outlined">lock</i> مغلق';
            actionBtn.style.display = 'inline-flex';
            actionBtn.onclick = null;
        } else {
            isCurrentLocked = false;
            actionBtn.className = 'btn-action';
            actionBtn.innerHTML = '<i class="material-symbols-outlined">add_circle</i> نشر موضوع';
            actionBtn.style.display = 'inline-flex';
            actionBtn.onclick = () => openModal('postModal');
        }
        
        if (id === 'latest') {
            actionBtn.style.display = 'none';
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
            const h3Node = titleNode.closest('h3') || titleNode.parentNode;
            
            if (h3Node) {
                let cloneH3 = h3Node.cloneNode(true);
                cloneH3.querySelectorAll('a, span.radio, input').forEach(el => el.remove());
                let typeText = cloneH3.textContent.trim();
                
                if (typeText.endsWith(':') || typeText.endsWith('：')) {
                    typeText = typeText.substring(0, typeText.length - 1).trim();
                }
                
                if (typeText.indexOf('إعلان عام') !== -1) {
                    typeBadge = `<span style="background: var(--danger); color: #fff; padding: 3px 8px; border-radius: 8px; margin-left: 8px;">إعلان عام</span>`;
                }
                else if (typeText.indexOf('إعلان') !== -1) {
                    typeBadge = `<span style="background: var(--accent); color: #fff; padding: 3px 8px; border-radius: 8px; margin-left: 8px;">إعلان</span>`;
                }
                else if (typeText.indexOf('مثبت') !== -1) {
                    typeBadge = `<span style="background: var(--primary); color: #000; padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px; font-weight: 800;">مثبت</span>`;
                }
                else if (typeText) {
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
                author = getCleanUsername(authorNode);
                let colNode = authorNode.querySelector('[style*="color"], font[color]') || authorNode;
                if (colNode.style && colNode.style.color) {
                    authorColor = colNode.style.color;
                } else if (colNode.getAttribute('color')) {
                    authorColor = colNode.getAttribute('color');
                }
            }
            
            if (!author || author.length < 2 || author === 'عضو' || author === 'زائر') {
                let fallbackNode = t.querySelector('.forum-lastpost-author, .last-post-author, .topic-author, .post-author-name');
                if (fallbackNode) {
                    author = getCleanUsername(fallbackNode);
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
                <div class="topic-item" onclick="openTopic('${link}')">
                    <div class="ti-icon">
                        <i class="material-symbols-outlined">chat_bubble</i>
                    </div>
                    <div class="ti-details">
                        <h3>
                            <a href="javascript:void(0)" onclick="event.stopPropagation(); openTopic('${link}')" class="ti-title-link">
                                ${lockIcon}${typeBadge}${title}
                            </a>
                        </h3>
                        <div class="ti-meta">
                            <span>
                                <i class="material-symbols-outlined" style="color:${authorColor};">person</i> 
                                <b style="color:${authorColor};">${author}</b>
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
    } catch(e) {}
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
    container.innerHTML = '';
    document.getElementById('forumPaginationTop').innerHTML = '';
    document.getElementById('forumPaginationBottom').innerHTML = '';
    
    try {
        const html = await fetchWithCache(targetUrl + '&_t=' + Math.floor(Date.now() / 60000));
        const doc = new DOMParser().parseFromString(html, 'text/html');
        let topics = doc.querySelectorAll('.block-topics, div.post-wrap, .posts-section, .block-topics-content, li.row, tr.topictitle, .topiclist li.row, div.topic-item, .forumbg .row');
        let processedTopics = new Set();
        let uniqueTopics = [];
        
        topics.forEach(t => {
            const linkNode = t.querySelector('.posts-description h3 a, .topic-title, .topictitle, a.topictitle, h2 a.topictitle');
            if (linkNode) {
                const href = linkNode.getAttribute('href');
                if (!processedTopics.has(href)) {
                    processedTopics.add(href);
                    uniqueTopics.push(t);
                }
            }
        });
        
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
            const h3Node = titleNode.closest('h3') || titleNode.parentNode;
            
            if (h3Node) {
                let cloneH3 = h3Node.cloneNode(true);
                cloneH3.querySelectorAll('a, span.radio, input').forEach(el => el.remove());
                let typeText = cloneH3.textContent.trim();
                
                if (typeText.endsWith(':') || typeText.endsWith('：')) {
                    typeText = typeText.substring(0, typeText.length - 1).trim();
                }
                
                if (typeText.indexOf('إعلان عام') !== -1) {
                    typeBadge = `<span style="background: var(--danger); color: #fff; padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px;">إعلان عام</span>`;
                }
                else if (typeText.indexOf('إعلان') !== -1) {
                    typeBadge = `<span style="background: var(--accent); color: #fff; padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px;">إعلان</span>`;
                }
                else if (typeText.indexOf('مثبت') !== -1) {
                    typeBadge = `<span style="background: var(--primary); color: #000; padding: 3px 8px; border-radius: 8px; font-size: 12px; margin-left: 8px; font-weight: 800;">مثبت</span>`;
                }
                else if (typeText) {
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
                author = getCleanUsername(authorNode);
                let colNode = authorNode.querySelector('[style*="color"], font[color]') || authorNode;
                if (colNode.style && colNode.style.color) {
                    authorColor = colNode.style.color;
                }
            }
            
            if (!author || author === 'عضو' || author === 'زائر') {
                let fbNode = t.querySelector('.forum-lastpost-author, .last-post-author, .block-topics-lastpost-author');
                if (fbNode) {
                    author = getCleanUsername(fbNode);
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
                <div class="topic-item" onclick="openTopic('${link}')">
                    <div class="ti-icon">
                        <i class="material-symbols-outlined">forum</i>
                    </div>
                    <div class="ti-details">
                        <h3>
                            <a href="javascript:void(0)" onclick="event.stopPropagation(); openTopic('${link}')" class="ti-title-link">
                                ${typeBadge}${title}
                            </a>
                        </h3>
                        <div class="ti-meta">
                            <span>
                                <i class="material-symbols-outlined" style="color:${authorColor}">person</i> 
                                <b style="color:${authorColor}">${author}</b>
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
    } catch(e) {}
}

async function loadDiscoverActivity(skipPush = false) {
    if (!skipPush) {
        window.history.pushState({}, '', BASE_APP_PATH + '?target=/discover');
    }
    
    switchView('discoverView');
    const container = document.getElementById('discoverContainer');
    container.innerHTML = '';
    
    try {
        const html = await fetchWithCache('/discover?_t=' + Math.floor(Date.now() / 60000));
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const items = doc.querySelectorAll('.feed-item');
        
        if (items.length === 0) {
            if (window.currentUserIsGuest) {
                container.innerHTML = `
                    <div class="empty-state" style="padding:25px;">
                        <i class="material-symbols-outlined" style="font-size: 40px; margin-bottom: 10px; display: block; color: var(--danger);">lock</i>
                        يجب تسجيل الدخول لمعاينة الأنشطة.
                    </div>
                `;
            } else {
                container.innerHTML = `<div class="empty-state" style="padding:25px;">لا توجد أنشطة لعرضها</div>`;
            }
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
                        a.setAttribute('onclick', `openUserProfile('${href}'); return false;`);
                        a.setAttribute('href', `javascript:void(0)`);
                        a.innerHTML = getCleanUsername(a);
                    } else if (href && (href.indexOf('/t') === 0 || href.indexOf('/r') === 0)) {
                        a.setAttribute('onclick', `openTopic('${href}'); return false;`);
                        a.setAttribute('href', `javascript:void(0)`);
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
                        <div style="font-size:14px; font-weight:600">
                            ${textNode ? textNode.innerHTML : ''}
                        </div>
                    </div>
                </div>
            `);
        });
    } catch(e) {}
}

// ---------- دالة المعاينة المضافة ----------
function previewContent(selector, title = 'معاينة') {
    const inst = $(selector).sceditor('instance');
    let html = '';
    if (inst) {
        html = inst.getWysiwygEditorValue();
    } else {
        const text = document.querySelector(selector).value;
        html = text;
    }
    // عرض في مودال
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.id = 'previewModal';
    modal.innerHTML = `
        <div class="modal-box" style="max-width:700px;">
            <div class="m-header">
                <h3><i class="material-symbols-outlined">preview</i> ${title}</h3>
                <button class="btn-icon" onclick="closeModal('previewModal')"><i class="material-symbols-outlined">close</i></button>
            </div>
            <div class="preview-content" style="background: var(--surface); padding: 20px; border-radius: 12px; min-height: 100px; border: 1px solid var(--border);">
                ${html}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
// -----------------------------------------

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
    document.getElementById('tvTitle').textContent = '';
    document.getElementById('tvPostsContainer').innerHTML = '';
    document.getElementById('topicPaginationTop').innerHTML = '';
    document.getElementById('topicPaginationBottom').innerHTML = '';
    
    let scInst = $('#qrContent').sceditor('instance');
    if (scInst) {
        scInst.val('');
    } else {
        document.getElementById('qrContent').value = '';
    }
    
    try {
        const html = await fetchWithCache(`${cleanUrl}${cleanUrl.includes('?') ? '&' : '?'}_t=${Math.floor(Date.now() / 60000)}`);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        
        const fLinks = Array.from(doc.querySelectorAll('a.nav, .breadcrumb a, .pathname-box a, p.nav a'));
        
        for (let i = fLinks.length - 1; i >= 0; i--) {
            let href = fLinks[i].getAttribute('href');
            if (href && href.indexOf('/f') !== -1) {
                let fidStr = href.split('/f')[1].split('-')[0].split('?')[0];
                currentForumId = parseInt(fidStr);
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
        } else if (isTopicLocked || isCurrentLocked) {
            document.getElementById('quickReplyBox').style.display='none';
        } else {
            document.getElementById('quickReplyBox').style.display='block';
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
            let h = permsBlock.innerHTML.toLowerCase();
            h = h.split('<br>').join(String.fromCharCode(10));
            h = h.split('<br/>').join(String.fromCharCode(10));
            h = h.split('<br />').join(String.fromCharCode(10));
            let textLines = h.split(String.fromCharCode(10));
            let cleanLines = [];
            
            textLines.forEach(line => {
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
        tvAdmin.innerHTML = '';
        
        if (adminTools) {
            adminTools.querySelectorAll('a').forEach(a => {
                const href = a.getAttribute('href');
                if (!href || href.includes('split') || href.includes('merge')) {
                    return;
                }
                
                const title = a.getAttribute('title') || 'إجراء';
                let icon = 'settings';
                let isTopicDel = false;
                
                if (href.includes('delete')) {
                    icon = 'delete_forever';
                    isTopicDel = true;
                }
                if (href.includes('lock')) {
                    icon = 'lock';
                }
                if (href.includes('unlock')) {
                    icon = 'lock_open';
                }
                
                const btnClass = isTopicDel ? 'btn-icon danger' : 'btn-icon';
                
                if (href.includes('move')) {
                    tvAdmin.insertAdjacentHTML('beforeend', `<button class="${btnClass}" onclick="openActionModal('${href}', decodeURIComponent('${safeEncode(title)}'))" title="${title}"><i class="material-symbols-outlined">${icon}</i></button>`);
                } else {
                    tvAdmin.insertAdjacentHTML('beforeend', `<button class="${btnClass}" onclick="silentAdminAction('${href}', decodeURIComponent('${safeEncode(title)}'), ${isTopicDel})" title="${title}"><i class="material-symbols-outlined">${icon}</i></button>`);
                }
            });
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
            let author = getCleanUsername(authorNode);
            let authorLink = authorNode?.tagName === 'A' ? authorNode.getAttribute('href') : null;
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
            const dts = post.querySelectorAll('.post-author-details dt');
            
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
            let safeAuthor = author.split(bs).join(bs+bs).split("'").join(bs+"'").split('"').join('&quot;');
            let safeHTML = contentHTML.split(bs).join(bs+bs).split("'").join(bs+"'").split('"').join('&quot;');
            let btnsHTML = '';
            
            if (replyBtn || hasQuickReplyForm) {
                btnsHTML += `<button class="btn-icon" onclick="quotePost(decodeURIComponent('${safeEncode(author)}'), decodeURIComponent('${safeEncode(contentHTML)}'))" title="اقتباس"><i class="material-symbols-outlined">format_quote</i></button>`;
            }
            if (btnEdit) {
                btnsHTML += `<button class="btn-icon" onclick="prepareEdit('${btnEdit}')" title="تعديل"><i class="material-symbols-outlined">edit</i></button>`;
            }
            if (btnDel) {
                btnsHTML += `<button class="btn-icon danger" onclick="silentAdminAction('${btnDel}', 'حذف المساهمة', false)" title="حذف الرد"><i class="material-symbols-outlined">delete</i></button>`;
            }
            
            const authorHtml = authorLink ? `<a href="javascript:void(0)" onclick="openUserProfile('${authorLink}')" style="color:${authorColor};">${author}</a>` : `<b style="color:${authorColor};">${author}</b>`;
            let postOriginalId = post.getAttribute('id') || '';
            
            if (!postOriginalId && btnEdit) {
                if (btnEdit.indexOf('p=') !== -1) {
                    postOriginalId = 'post-' + btnEdit.split('p=')[1].split('&')[0];
                }
            }
            
            // بناء المشاركة مع الأزرار في الأعلى والأسفل
            container.insertAdjacentHTML('beforeend', `
                <div class="post-card" id="${postOriginalId}">
                    <div class="pc-sidebar">
                        <img src="${avatar}" class="pc-avatar" style="border-color:${authorColor};">
                        <div class="pc-author">${authorHtml}</div>
                        <div class="pc-rank" style="color:${authorColor}; border-color:${authorColor};">${rankHTML}</div>
                        <div class="pc-stats">
                            <div><i class="material-symbols-outlined" style="color: var(--primary);">chat</i> مساهمات: <b style="color:var(--text-strong);">${messages}</b></div>
                            <div><i class="material-symbols-outlined" style="color: #fbbf24;">stars</i> نقاط: <b style="color:var(--text-strong);">${points}</b></div>
                        </div>
                    </div>
                    <div class="pc-content">
                        <div class="pc-meta">
                            <div class="pc-date">
                                <i class="material-symbols-outlined">schedule</i> ${date}
                            </div>
                            <div class="p-actions">${btnsHTML}</div>
                        </div>
                        <div class="pc-html">
                            ${contentHTML} 
                            ${attachHTML}
                        </div>
                        ${sigHTML ? `<div class="pc-signature">${sigHTML}</div>` : ''}
                        <!-- الأزرار السفلية -->
                        <div class="p-actions-bottom">${btnsHTML}</div>
                    </div>
                </div>
            `);
        });
        
        setTimeout(applyLuffyAddons, 100);
        extractPagination(doc, ['topicPaginationTop', 'topicPaginationBottom'], (pUrl) => openTopic(pUrl));
    } catch(e) {}
}

function applyLuffyAddons() {
    $('.pc-html').find('.codebox, blockquote').each(function() {
        var $orig = $(this);
        if ($orig.hasClass('Luffy-built')) {
            return;
        }
        
        var isCode = $orig.hasClass('codebox') || $orig[0].tagName.toLowerCase() === 'code' || $orig.find('code').length > 0;
        if (!isCode) {
            return;
        }
        
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
            let clouds = ['mediafire.com', 'mega.nz', 'drive.google', 'dropbox.com', 'github.com'];
            clouds.forEach(c => {
                if (h.toLowerCase().indexOf(c) !== -1) {
                    isCloud = true;
                }
            });
            
            var extRegex = false;
            let extStr = h.split('?')[0].toLowerCase();
            let exts = ['.zip', '.rar', '.7z', '.apk', '.exe', '.bin', '.mp4', '.mp3', '.pdf', '.iso'];
            
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

$(document).on('click', '.Luffy-copy-action', function() {
    var $btn = $(this);
    var txt = $btn.closest('.Luffy-code-wrapper').find('.Luffy-code-area code').text();
    var $t = $('<textarea>');
    
    $('body').append($t);
    $t.val(txt).select();
    
    try {
        document.execCommand('copy');
        $btn.html('<i class="material-symbols-outlined" style="font-size:14px">done</i> تم النسخ');
        setTimeout(() => {
            $btn.html('<i class="material-symbols-outlined" style="font-size:14px">content_copy</i> نسخ الكود');
        }, 2000);
    } catch(e) {}
    
    $t.remove();
});

$(document).on('click', '#Luffy-hub-copy', function() {
    var rawTitle = $('#tvTitle').text().trim() || document.title;
    var cleanUrl = window.location.href.split('#')[0];
    var $temp = $('<textarea>');
    
    $('body').append($temp);
    let nl = String.fromCharCode(10);
    let cr = String.fromCharCode(13);
    $temp.val("📋 موضوع: " + rawTitle + cr + nl + "🔗 الرابط: " + cleanUrl).select();
    
    try {
        document.execCommand('copy');
        showToast('تم نسخ الرابط!');
    } catch(err) {}
    
    $temp.remove();
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
    
    form.querySelectorAll('input[type="hidden"]').forEach(inp => {
        if (inp.name !== 'g-recaptcha-response') {
            spamParams.append(inp.name, inp.value);
        }
    });
    
    if (form.querySelector('button[name="post"]') || form.querySelector('input[name="post"]')) {
        spamParams.append('post', '1');
    }
    
    if (form.querySelector('input[name="confirm"]')) {
        spamParams.append('confirm', '1');
    }
    
    const token = await new Promise(resolve => {
        grecaptcha.ready(() => {
            grecaptcha.execute('6LfeLiAoAAAAALWL8_gKlLo22bn9Jn31i7NXq3mz', {action: 'submit'}).then(resolve);
        });
    });
    
    spamParams.append('g-recaptcha-response', token);
    return spamParams;
}

async function handleSilentRequest(url, formData) {
    let res = await fetch(url, {
        method: 'POST',
        body: formData
    });
    
    let html = await res.text();
    
    if (html.includes('name="post_confirm"') || html.includes('g-recaptcha-response') || html.includes('name="confirm"')) {
        const spamForm = new DOMParser().parseFromString(html, 'text/html').querySelector('form');
        
        if (spamForm) {
            const spamParams = await solveRecaptcha(spamForm);
            let actionAttr = spamForm.getAttribute('action');
            let fetchUrl = actionAttr ? new URL(actionAttr, new URL(url, window.location.origin)).toString() : url;
            
            res = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: spamParams.toString()
            });
            html = await res.text();
        }
    }
    
    if (html.includes('class="errorwrap"') || html.includes('class="error"')) {
        const errEl = new DOMParser().parseFromString(html, 'text/html').querySelector('.errorwrap, .error');
        if (errEl) {
            throw new Error(errEl.textContent.trim());
        }
        throw new Error("مرفوض");
    }
    
    return html;
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
    
    btn.innerText = 'جاري النشر...';
    btn.disabled = true;
    
    try {
        const fRes = await fetch('/post?f=' + currentForumId + '&mode=newtopic');
        const form = new DOMParser().parseFromString(await fRes.text(), 'text/html').querySelector('form[name="post"]');
        const fd = new FormData(form);
        
        fd.set('subject', subject);
        fd.set('message', message);
        fd.set('post', '1');
        
        const tType = document.querySelector('input[name="topictype"]:checked')?.value || '0';
        fd.set('topictype', tType);
        
        await handleSilentRequest('/post', fd);
        showToast('تم النشر بنجاح!');
        
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
        showToast('فشل النشر!', true);
    } finally {
        btn.innerText = 'نشر الموضوع';
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
    
    btn.innerText = 'جاري النشر...';
    btn.disabled = true;
    
    try {
        let fd;
        
        if (activeReplyFormHTML) {
            const temp = document.createElement('div');
            temp.innerHTML = activeReplyFormHTML;
            const form = temp.querySelector('form[name="post"]');
            if (form) {
                fd = new FormData(form);
            }
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
        fd.set('post', '1');
        
        await handleSilentRequest('/post', fd);
        showToast('تم الرد بنجاح!');
        
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
        showToast('فشل الرد!', true);
    } finally {
        btn.innerText = 'نشر الرد';
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
        
        btn.innerText = 'حفظ التعديلات';
        btn.disabled = false;
    } catch(e) {
        closeModal('editModal');
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
        btn.innerText = 'حفظ التعديلات';
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
    
    document.getElementById('quickReplyBox').scrollIntoView({
        behavior: 'smooth'
    });
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

async function openUserProfile(url) {
    if (!url || url === 'null' || url === '#' || url.includes('javascript:')) {
        return;
    }
    
    openModal('userProfileModal');
    const content = document.getElementById('userProfileContent');
    content.innerHTML = '<div class="loader" style="display:block; margin:40px auto;"></div>';
    
    try {
        const doc = new DOMParser().parseFromString(await (await fetch(url)).text(), 'text/html');
        const avatar = doc.querySelector('.mod-login-avatar img, .forum-avatar img, .avatar img, .profile-avatar img, .box-content img')?.src || 'https://2img.net/i/fa/modernbb/pp-blank-thumb.png';
        const name = getCleanUsername(doc.querySelector('.box-head span strong') || doc.querySelector('h1') || doc.querySelector('.page-title'));
        const rank = doc.querySelector('.mod-login-rank')?.innerHTML.replace('الرتبة:', '').trim() || doc.querySelector('.rank')?.innerHTML.replace('الرتبة:', '').trim() || '';
        
        let postsVal = '-';
        let pointsVal = '-';
        
        doc.querySelectorAll('.profile-advanced-stats').forEach(stat => {
            let label = stat.querySelector('dt')?.textContent.replace(':', '').trim();
            const val = stat.querySelector('dd .field_uneditable')?.textContent.trim();
            if (label && val) {
                if (label.indexOf('مساهمات') !== -1) {
                    postsVal = val;
                }
                if (label.indexOf('نقاط') !== -1) {
                    pointsVal = val;
                }
            }
        });
        
        let statsHtml = `
            <div class="profile-stats-grid">
                <div class="profile-stat-card">
                    <div class="profile-stat-icon">
                        <i class="material-symbols-outlined">chat</i>
                    </div>
                    <span class="profile-stat-label">المساهمات</span>
                    <span class="profile-stat-value">${postsVal}</span>
                </div>
                <div class="profile-stat-card">
                    <div class="profile-stat-icon">
                        <i class="material-symbols-outlined">stars</i>
                    </div>
                    <span class="profile-stat-label">النقاط</span>
                    <span class="profile-stat-value">${pointsVal}</span>
                </div>
            </div>
        `;
        
        content.innerHTML = `
            <div class="profile-cover"></div>
            <div class="profile-modal-header">
                <div class="profile-avatar-wrapper">
                    <img src="${avatar}" class="profile-avatar-img">
                </div>
                <h2 class="profile-username">${name}</h2>
                ${rank ? `<div class="profile-rank-badge">${rank}</div>` : ''}
            </div>
            ${statsHtml}
        `;
    } catch (e) {
        content.innerHTML = '<div class="empty-widget">فشل جلب بيانات العضو</div>';
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
    let formSelectors = 'form[name="form_login"], form[action*="/login"], form[action*="/register"], form#frmAgreement, form[name="form_confirm"], form[name="post"], form[name="register"], form#ucp';
    let formNode = doc.querySelector(formSelectors);
    
    if (!formNode) {
        const pForms = Array.from(doc.querySelectorAll('form')).filter(f => f.method && f.method.toLowerCase() === 'post' && !f.action.includes('search'));
        if (pForms.length > 0) {
            formNode = pForms[0];
        }
    }
    
    if (!formNode) {
        closeModal('authModal');
        showToast('تمت العملية، جاري التحديث...');
        setTimeout(() => location.reload(), 1500);
        return;
    }
    
    let mainBox = formNode.closest('.panel, .forumline, .body-content, .cp');
    if (!mainBox || mainBox.id === 'wrap' || mainBox.classList.contains('layout')) {
        mainBox = formNode.parentElement;
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
        } else if (text.includes('اضغط هنا') || text.includes('لقد نسيت') || text.includes('الرجوع') || (href && href.includes('/register'))) {
            a.remove();
        } else if (href && !href.startsWith('javascript:') && !href.startsWith('#')) {
            a.onclick = (e) => {
                e.preventDefault();
                openAuthModal(new URL(href, new URL(url, window.location.origin)).toString(), title, icon);
            };
            a.style.color = 'var(--primary)';
            a.style.fontWeight = 'bold';
            a.style.textDecoration = 'none';
        }
    });
    
    const walkText = document.createTreeWalker(mainBox, NodeFilter.SHOW_TEXT, null, false);
    let n;
    while(n = walkText.nextNode()) {
        if (n.nodeValue.includes('اضغط هنا') || n.nodeValue.includes('للرجوع')) {
            n.nodeValue = '';
        }
    }
    
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
                
                try {
                    if (window.grecaptcha) {
                        let rcAction = fetchUrl.includes('register') ? 'register' : 'submit';
                        const token = await new Promise(resolve => {
                            const timer = setTimeout(() => resolve(null), 2500);
                            if (grecaptcha.ready) {
                                grecaptcha.ready(async () => {
                                    try {
                                        const t = await grecaptcha.execute('6LfeLiAoAAAAALWL8_gKlLo22bn9Jn31i7NXq3mz', {action: rcAction});
                                        clearTimeout(timer);
                                        resolve(t);
                                    } catch (err) {
                                        clearTimeout(timer);
                                        resolve(null);
                                    }
                                });
                            } else {
                                clearTimeout(timer);
                                resolve(null);
                            }
                        });
                        if (token) {
                            fd.set('g-recaptcha-response', token);
                        }
                    }
                } catch(ex) {}
                
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
                        const modalHtml = `
                            <div class="modal-overlay active" id="regSuccessModal" style="z-index: 999999; opacity: 1; visibility: visible;">
                                <div class="modal-box" style="max-width: 500px; text-align: center; padding: 40px 30px; transform: scale(1);">
                                    <i class="material-symbols-outlined" style="font-size: 80px; color: #10b981; margin-bottom: 20px;">task_alt</i>
                                    <h2 style="color: var(--text-strong); font-size: 1.8rem; font-weight: 900; margin-bottom: 15px;">تم التسجيل بنجاح!</h2>
                                    <p style="color: var(--text-muted); font-size: 14px; line-height: 1.8; margin-bottom: 25px;">
                                        المنتدى يتطلب تفعيل الاشتراك من قِبل الإدارة.<br>حسابك الآن قيد المراجعة.
                                    </p>
                                    <button onclick="document.getElementById('regSuccessModal').remove(); location.reload();" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; padding: 16px; border-radius: 12px; font-weight: bold; background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: var(--primary-text); border: none; box-shadow: 0 4px 15px var(--primary-glow); cursor: pointer; transition: 0.3s;">
                                        <i class="material-symbols-outlined" style="font-size: 24px;">home</i> العودة للمنتدى
                                    </button>
                                </div>
                            </div>
                        `;
                        document.body.insertAdjacentHTML('beforeend', modalHtml);
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
        showToast('تم تسجيل الخروج بنجاح!');
        window.currentUserIsGuest = true;
        await initUserSession();
        loadPremiumCategories();
    } catch(e) {
        showToast('فشل تسجيل الخروج', true);
    }
}

function routeUrl(url, skipPush = false) {
    if (!url || url === '/' || url === '/forum' || url.indexOf('/h') === 0 || url.indexOf('/c') === 0) {
        loadPremiumCategories(skipPush);
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

async function getProfileDataForUser(url, fallbackRole) {
    if (!url) {
        return { avatar: 'https://2img.net/i/fa/modernbb/pp-blank-thumb.png', rank: fallbackRole };
    }
    
    try {
        let html = await fetchWithCache(url);
        let doc = new DOMParser().parseFromString(html, 'text/html');
        let avatar = doc.querySelector('.mod-login-avatar img, .forum-avatar img, .avatar img, .profile-avatar img, .box-content img')?.src || 'https://2img.net/i/fa/modernbb/pp-blank-thumb.png';
        let rankHTML = doc.querySelector('.mod-login-rank')?.innerHTML.replace('الرتبة:', '').trim() || doc.querySelector('.rank')?.innerHTML.replace('الرتبة:', '').trim() || fallbackRole;
        
        return { avatar: avatar, rank: rankHTML };
    } catch(e) {
        return { avatar: 'https://2img.net/i/fa/modernbb/pp-blank-thumb.png', rank: fallbackRole };
    }
}

async function buildSidebar() {
    const sidebar = document.getElementById('mainSidebar');
    if(!sidebar) {
        return;
    }
    
    sidebar.innerHTML = `
        <div class="sidebar-widget">
            <div class="widget-header"><i class="material-symbols-outlined">analytics</i> إحصائيات المنصة</div>
            <div class="widget-content" id="wStats">
                <div class="loader" style="width:20px;height:20px;border-width:2px;margin:10px auto;display:block;"></div>
            </div>
        </div>
        <div class="sidebar-widget">
            <div class="widget-header"><i class="material-symbols-outlined">manage_accounts</i> طاقم الإدارة المتصلين حالياً</div>
            <div class="widget-content" id="wStaff" style="padding: 10px 20px;">
                <div class="loader" style="width:20px;height:20px;border-width:2px;margin:10px auto;display:block;"></div>
            </div>
        </div>
        <div class="sidebar-widget">
            <div class="widget-header"><i class="material-symbols-outlined">group</i> الأعضاء المتصلون حالياً</div>
            <div class="widget-content" id="wOnline">
                <div class="loader" style="width:20px;height:20px;border-width:2px;margin:10px auto;display:block;"></div>
            </div>
        </div>
        <div class="sidebar-widget">
            <div class="widget-header"><i class="material-symbols-outlined">person_add</i> الأعضاء الجدد</div>
            <div class="widget-content" id="wNewMems">
                <div class="loader" style="width:20px;height:20px;border-width:2px;margin:10px auto;display:block;"></div>
            </div>
        </div>
        <div class="sidebar-widget">
            <div class="widget-header"><i class="material-symbols-outlined">local_police</i> المجموعات</div>
            <div class="widget-content" id="wLegend">
                <div class="loader" style="width:20px;height:20px;border-width:2px;margin:10px auto;display:block;"></div>
            </div>
        </div>
    `;

    try {
        const html = await fetchWithCache('/forum?_t=' + Math.floor(Date.now() / 60000));
        const doc = new DOMParser().parseFromString(html, 'text/html');

        const rgb2hex = (rgb) => {
            if (!rgb) {
                return '';
            }
            if (rgb.indexOf('#') === 0) {
                return rgb.toLowerCase();
            }
            let match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (!match) {
                return rgb.toLowerCase();
            }
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);
        };

        let forumTotalMembers = "0";
        let totalOnline = "0";
        let guestsCount = "0";
        let onlineMembersCount = "0";

        let statsContainer = doc.querySelector('#forum-statistics') || doc.body;
        let statsText = statsContainer.textContent;
        
        let tMemMatch = statsText.match(/يتوفر على\s*(\d+)\s*عُضو/i) || statsText.match(/الأعضاء:\s*(\d+)/);
        if (tMemMatch) {
            forumTotalMembers = tMemMatch[1];
        }

        let blockOnline = doc.querySelector('#block-online');
        if (blockOnline) {
            let txt = blockOnline.textContent;
            
            let tOnMatch = txt.match(/ككل هناك\s*(\d+)/);
            if (tOnMatch) {
                totalOnline = tOnMatch[1];
            }
            
            let gOnMatch = txt.match(/(\d+)\s*(زائر|زوار|ضيف)/);
            if (gOnMatch) {
                guestsCount = gOnMatch[1];
            }

            let uOnMatch = txt.match(/::\s*(\d+)\s*(أعضاء|عضو|عُضو)/);
            let hOnMatch = txt.match(/(\d+)\s*(عضو مختفي|عُضو مُختفي|عضو مخفي)/);
            
            let vis = uOnMatch ? parseInt(uOnMatch[1]) : 0;
            let hid = hOnMatch ? parseInt(hOnMatch[1]) : 0;
            
            onlineMembersCount = (vis + hid).toString();

            if (onlineMembersCount === "0" && totalOnline !== "0") {
                let calc = parseInt(totalOnline) - parseInt(guestsCount || "0");
                onlineMembersCount = calc > 0 ? calc.toString() : "0";
            }
        }

        let legendHTML = '';
        const dynamicGroups = {};
        
        if (blockOnline) {
            const legendElements = blockOnline.querySelectorAll('em a.usr_grp_clr');
            legendElements.forEach(l => {
                let color = rgb2hex(l.style.color || '').toLowerCase();
                let text = l.textContent.replace(/stars|verified|check_circle|settings|paid|check|wifi|reset_tv|arrow_back_ios_new|thumb_up|groups|account_circle|block/gi, '').replace(/\|/g, '').replace(/\[/g, '').replace(/\]/g, '').trim();
                text = text.replace(/\s+/g, ' ').trim();
                
                if(color && text) {
                    dynamicGroups[color] = text;
                    legendHTML += `<span class="legend-badge" style="background:${color}15; color:${color}; border: 1px solid ${color}40;">${text}</span>`;
                }
            });
        }

        let onlineLinks = [];
        
        if (blockOnline) {
            let htmlPart = blockOnline.innerHTML.split(/الأعضاء الذين تواجدوا في|الأعضاء المتواجدون خلال/)[0];
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlPart;
            
            let allLinks = tempDiv.querySelectorAll('a[href^="/u"]');
            allLinks.forEach(link => {
                if(!link.closest('em') && !link.closest('.tz-past-users')) {
                    onlineLinks.push(link);
                }
            });
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
            let rawText = span.textContent || a.textContent;
            let cleanName = rawText.replace(/stars|verified|check_circle|settings|paid|check|wifi|reset_tv|arrow_back_ios_new|thumb_up|groups|account_circle|block/gi, '').trim();
            
            let groupName = dynamicGroups[color] || '';
            let isNormalMember = groupName === '' || groupName.includes('عضو') || groupName.includes('Member') || groupName.includes('Banned') || groupName.includes('Active');
            
            if (!isNormalMember) {
                staffArr.push({
                    name: cleanName,
                    href: href,
                    color: color,
                    role: groupName
                });
            } else {
                displayedMembers.push(`
                    <a href="javascript:void(0)" onclick="openUserProfile('${href}')" class="online-member-chip" style="color:${color || 'var(--text-strong)'}; border-color:${color ? color+'40' : 'var(--item-border)'};" title="${cleanName}">
                        <i class="material-symbols-outlined" style="font-size:14px;">account_circle</i> 
                        <span class="chip-name">${cleanName}</span>
                    </a>
                `);
            }
        });

        let finalMembersHTML = '';
        if (displayedMembers.length > 0) {
            let limit = 20;
            finalMembersHTML = `<div class="online-members-grid">${displayedMembers.slice(0, limit).join('')}</div>`;
            if (displayedMembers.length > limit) {
                finalMembersHTML += `<a href="/viewonline" class="view-more-btn">معاينة أكثر (${displayedMembers.length - limit}+)</a>`;
            }
        }

        document.getElementById('wOnline').innerHTML = finalMembersHTML ? finalMembersHTML : '<div class="empty-widget" style="padding:15px; font-size:14px; text-align:center; border-radius:12px; border:1px dashed var(--item-border); background:var(--item-bg); color:var(--text-muted);">لا يوجد أعضاء متصلين</div>';
        document.getElementById('wLegend').innerHTML = legendHTML ? `<div class="legend-wrap">${legendHTML}</div>` : '<div class="empty-widget" style="padding:15px; font-size:14px; text-align:center; border-radius:12px; border:1px dashed var(--item-border); background:var(--item-bg); color:var(--text-muted);">لا يوجد مفاتيح للرتب</div>';
        
        if (staffArr.length > 0) {
            let staffPromises = staffArr.map(async (s) => {
                let profileData = await getProfileDataForUser(s.href, s.role);
                return `
                    <div class="staff-item">
                        <div class="staff-avatar-w" style="border: 2px solid ${s.color}; box-shadow: 0 0 10px ${s.color}40;">
                            <img src="${profileData.avatar}">
                        </div>
                        <div class="staff-info-w">
                            <a href="javascript:void(0)" onclick="openUserProfile('${s.href}')" class="staff-name-l" style="color:${s.color}">${s.name}</a>
                            <span class="staff-role-t">${profileData.rank}</span>
                        </div>
                    </div>
                `;
            });
            let resolvedStaff = await Promise.all(staffPromises);
            document.getElementById('wStaff').innerHTML = `<div class="staff-list">${resolvedStaff.join('')}</div>`;
        } else {
            document.getElementById('wStaff').innerHTML = '<div class="empty-widget" style="padding:15px; font-size:14px; text-align:center; border-radius:12px; border:1px dashed var(--item-border); background:var(--item-bg); color:var(--text-muted);">لا يوجد إداريين متصلين</div>';
        }

        document.getElementById('wStats').innerHTML = `
            <div class="stat-row">
                <div><i class="material-symbols-outlined">group</i> إجمالي أعضاء المنتدى</div>
                <b>${forumTotalMembers}</b>
            </div>
            <div class="stat-row">
                <div><i class="material-symbols-outlined">public</i> المتواجدون الآن</div>
                <b>${totalOnline}</b>
            </div>
            <div class="stat-row">
                <div><i class="material-symbols-outlined">person</i> الأعضاء المتصلين</div>
                <b>${onlineMembersCount}</b>
            </div>
            <div class="stat-row">
                <div><i class="material-symbols-outlined">person_outline</i> الزوار</div>
                <b>${guestsCount}</b>
            </div>
        `;
        
        try {
            const memHtml = await fetchWithCache('/memberlist?mode=joined&order=DESC');
            const memDoc = new DOMParser().parseFromString(memHtml, 'text/html');
            const memberNodes = memDoc.querySelectorAll('.member-block');
            let newMemsHTML = '';
            let count = 0;
            const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688'];
            
            memberNodes.forEach(m => {
                if (count >= 10) {
                    return;
                }
                
                let a = m.querySelector('a[href^="/u"]');
                if (!a) {
                    return;
                }
                
                let href = a.getAttribute('href');
                let name = a.textContent.trim();
                let avatar = m.querySelector('img')?.src || '';
                let isDefault = !avatar || avatar.includes('pp-blank-thumb') || avatar.includes('default');
                let avatarHtml = '';
                
                if (isDefault) {
                    let char = name.charAt(0).toUpperCase();
                    let charCode = name.charCodeAt(0) || 0;
                    let color = colors[charCode % colors.length];
                    avatarHtml = `<div class="initial-avatar" style="background-color: ${color};">${char}</div>`;
                } else {
                    avatarHtml = `<img src="${avatar}">`;
                }
                
                newMemsHTML += `
                    <div class="new-mem-av-wrap" title="${name}" onclick="openUserProfile('${href}')">
                        ${avatarHtml}
                    </div>
                `;
                count++;
            });
            
            document.getElementById('wNewMems').innerHTML = newMemsHTML ? `<div class="new-members-grid">${newMemsHTML}</div>` : '<div class="empty-widget" style="padding:15px; font-size:14px; text-align:center; border-radius:12px; border:1px dashed var(--item-border); background:var(--item-bg); color:var(--text-muted);">لا يوجد بيانات</div>';
        } catch(e) {
            document.getElementById('wNewMems').innerHTML = '<div class="empty-widget" style="padding:15px; font-size:14px; text-align:center; border-radius:12px; border:1px dashed var(--item-border); background:var(--item-bg); color:var(--text-muted);">تعذر جلب البيانات</div>';
        }

    } catch(e) {}
}

// ---------- إضافة أزرار المعاينة في النماذج ----------
$(document).ready(function() {
    // زر المعاينة في نافذة إنشاء موضوع
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const previewBtn = document.createElement('button');
        previewBtn.className = 'btn-action';
        previewBtn.style.cssText = 'width:100%; padding:16px; font-size:14px; margin-top: 10px; background: var(--surface-hover); border: 1px solid var(--item-border); color: var(--text-strong);';
        previewBtn.innerHTML = '<i class="material-symbols-outlined">preview</i> معاينة';
        previewBtn.onclick = () => previewContent('#topicContent', 'معاينة الموضوع');
        submitBtn.parentNode.insertBefore(previewBtn, submitBtn.nextSibling);
    }

    // زر المعاينة في صندوق الرد السريع
    const qrSubmitBtn = document.getElementById('qrSubmitBtn');
    if (qrSubmitBtn) {
        const previewBtn = document.createElement('button');
        previewBtn.className = 'btn-action';
        previewBtn.style.cssText = 'width:100%; padding:16px; font-size:14px; margin-top: 10px; background: var(--surface-hover); border: 1px solid var(--item-border); color: var(--text-strong);';
        previewBtn.innerHTML = '<i class="material-symbols-outlined">preview</i> معاينة';
        previewBtn.onclick = () => previewContent('#qrContent', 'معاينة الرد');
        qrSubmitBtn.parentNode.insertBefore(previewBtn, qrSubmitBtn.nextSibling);
    }
});
// ---------------------------------------------

async function startApp() {
    await initUserSession();
    await loadAnnouncements();
    const target = new URLSearchParams(window.location.search).get('target');
    const path = window.location.pathname;
    routeUrl(target || path, true);
    buildSidebar();
}

$(document).ready(function() {
    startApp();
});
