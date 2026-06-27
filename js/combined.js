/* ============================================
   ملف الأكواد المجمعة - منتدى Softara
   آخر تحديث: 2026-06-27
   ============================================ */

/* ========== الكود الأول: ألوان المشاركة (صفحات المواضيع فقط) ========== */
if (window.location.href.indexOf('/t') !== -1) {
window.addEventListener("load", function() {
    if (window.location.href.indexOf('/t') === -1) return;

    const backgrounds = [
        { bg: "linear-gradient(135deg,#ffd6e7,#fff0f6)", dot: "#ff9fc5" },
        { bg: "linear-gradient(135deg,#d6e4ff,#eef4ff)", dot: "#7fa9ff" },
        { bg: "linear-gradient(135deg,#d8fff1,#effff8)", dot: "#63d6ae" },
        { bg: "linear-gradient(135deg,#fff4d6,#fffaf0)", dot: "#e0b44d" },
        { bg: "linear-gradient(135deg,#f1d6ff,#faf0ff)", dot: "#be7ae6" },
        { bg: "linear-gradient(135deg,#ffe0d6,#fff5f0)", dot: "#f28b82" },
        { bg: "linear-gradient(135deg,#d6f5ff,#ebfaff)", dot: "#5ba4cf" },
        { bg: "linear-gradient(135deg,#e0ffd6,#f0fff0)", dot: "#6ab84c" }
    ];

    document.querySelectorAll(".post-meta-top").forEach(function(metaTop) {
        if (metaTop.nextElementSibling && metaTop.nextElementSibling.classList.contains("theme-color-bar")) return;

        var bar = document.createElement("div");
        bar.className = "theme-color-bar";
        bar.style.cssText = 
            "display: inline-flex; align-items: center; gap: 6px;" +
            "background: rgba(255,255,255,0.7);" +
            "backdrop-filter: blur(4px);" +
            "border-radius: 30px;" +
            "margin: 0 0 20px 0; padding: 0;" +
            "line-height: 1;" +
            "box-shadow: 0 1px 4px rgba(0,0,0,0.08);";

        backgrounds.forEach(function(item) {
            var btn = document.createElement("span");
            btn.style.cssText = 
                "width: 18px; height: 18px; border-radius: 50%;" +
                "cursor: pointer; border: 2px solid #fff;" +
                "box-shadow: 0 1px 3px rgba(0,0,0,0.15);" +
                "background: " + item.bg + ";" +
                "transition: transform 0.2s;" +
                "display: inline-block; margin: 0; padding: 0;";
            btn.addEventListener("mouseenter", function() { this.style.transform = "scale(1.3)"; });
            btn.addEventListener("mouseleave", function() { this.style.transform = "scale(1)"; });
            btn.addEventListener("click", function() {
                document.querySelectorAll("main.post-content-area").forEach(function(postArea) {
                    postArea.style.background = item.bg;
                    postArea.style.border = "2px dashed " + item.dot;
                    postArea.style.backgroundClip = "padding-box";
                    postArea.style.boxSizing = "border-box";
                });
            });
            bar.appendChild(btn);
        });

        var resetBtn = document.createElement("span");
        resetBtn.innerHTML = '<i class="fas fa-undo-alt"></i>';
        resetBtn.title = "إعادة تعيين الألوان";
        resetBtn.style.cssText = 
            "width: 18px; height: 18px; border-radius: 50%;" +
            "cursor: pointer; border: 1px solid #ccc;" +
            "display: inline-flex; align-items: center; justify-content: center;" +
            "background: #f5f5f5; transition: 0.2s; font-size: 12px; color: #555;" +
            "margin: 0; padding: 0;";
        resetBtn.addEventListener("mouseenter", function() { this.style.background = "#e0e0e0"; });
        resetBtn.addEventListener("mouseleave", function() { this.style.background = "#f5f5f5"; });
        resetBtn.addEventListener("click", function() {
            document.querySelectorAll("main.post-content-area").forEach(function(postArea) {
                postArea.style.background = "";
                postArea.style.border = "";
                postArea.style.backgroundClip = "";
                postArea.style.boxSizing = "";
            });
        });
        bar.appendChild(resetBtn);

        metaTop.insertAdjacentElement("afterend", bar);
    });
});
}

/* ========== الكود الثاني: إخفاء وإظهار القائمة الجانبية (صفحات المواضيع فقط) ========== */
if (window.location.href.indexOf('/t') !== -1) {
document.addEventListener("DOMContentLoaded", function() {
    const style = document.createElement("style");
    style.textContent = `
        .hide-profile { display: none !important; }
        .toggle-profile-btn {
            cursor: pointer;
            background: transparent;
            color: #475569;
            border: 1px solid #e2e8f0;
            padding: 0 6px;
            border-radius: 12px;
            font-size: 11px;
            font-family: 'Droid Arabic Kufi', sans-serif;
            display: inline-flex;
            align-items: center;
            gap: 2px;
            transition: all 0.2s;
            line-height: 1.8;
            height: 22px;
            white-space: nowrap;
        }
        .toggle-profile-btn:hover {
            border-color: #2563EB;
            color: #2563EB;
            background: rgba(37,99,235,0.05);
        }
        .toggle-profile-btn .material-icons {
            font-size: 14px;
            vertical-align: middle;
        }
        .toggle-profile-btn .btn-text {
            font-size: 10px;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll(".topic-container").forEach(function(container) {
        let profile = container.querySelector("aside.post-aside");
        if (!profile) {
            profile = container.querySelector("aside.post-sidebar");
        }
        const metaTop = container.querySelector(".post-meta-top");
        if (profile && metaTop && !container.querySelector(".toggle-profile-btn")) {
            const btn = document.createElement("button");
            btn.className = "toggle-profile-btn";
            btn.type = "button";
            btn.innerHTML = `
                <span class="material-icons">visibility_off</span>
                <span class="btn-text">إخفاء</span>
            `;

            btn.addEventListener("click", function() {
                const isHidden = profile.classList.toggle("hide-profile");
                btn.innerHTML = isHidden
                    ? `<span class="material-icons">visibility</span><span class="btn-text">إظهار</span>`
                    : `<span class="material-icons">visibility_off</span><span class="btn-text">إخفاء</span>`;
            });

            const spanElement = metaTop.querySelector('span');
            const aElement = metaTop.querySelector('a');
            if (spanElement && aElement) {
                metaTop.insertBefore(btn, aElement);
                btn.style.margin = "0 8px";
            } else {
                metaTop.appendChild(btn);
            }
        }
    });
});
}

/* ========== الكود الثالث: آخر مواضيعي (صفحات المواضيع فقط) ========== */
if (window.location.href.indexOf('/t') !== -1) {
document.addEventListener("DOMContentLoaded", function() {
    if (!document.querySelector('link[href*="Cairo"]')) {
        var fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap';
        document.head.appendChild(fontLink);
    }

    document.querySelectorAll("aside.post-sidebar").forEach(function(aside) {
        let userLink = aside.querySelector('a[href*="/u"]');
        if (!userLink) return;

        let match = userLink.getAttribute('href').match(/\/u(\d+)/);
        if (!match) return;

        let userID = "u" + match[1];

        let box = document.createElement("div");
        box.className = "last-topics-box";
        box.style.marginTop = "10px";
        box.style.border = "1px solid #b30000";
        box.style.borderRadius = "8px";
        box.style.overflow = "hidden";
        box.style.fontSize = "12px";
        box.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";

        let header = document.createElement("div");
        header.style.cursor = "pointer";
        header.style.fontWeight = "bold";
        header.style.color = "#fff";
        header.style.padding = "8px";
        header.style.display = "flex";
        header.style.alignItems = "center";
        header.style.gap = "6px";
        header.style.background = "#2563EB";

        const headerBaseHTML = `<i class="fa-solid fa-folder-open"></i> &nbsp; آخر مواضيعي &nbsp; <span style="font-weight:normal;">(%s)</span>`;
        header.innerHTML = headerBaseHTML.replace('%s', 'اضغط للعرض');
        box.appendChild(header);

        let content = document.createElement("div");
        content.style.display = "none";
        content.style.padding = "8px";
        content.style.background = "#fff";
        content.style.color = "#333";
        content.dataset.fetched = "false";
        box.appendChild(content);

        let contactBtns = aside.querySelector('.contact-btns');
        if (contactBtns) {
            contactBtns.insertAdjacentElement('afterend', box);
        } else {
            aside.appendChild(box);
        }

        header.addEventListener("click", function() {
            if (content.style.display === "none" && content.dataset.fetched === "false") {
                header.innerHTML = headerBaseHTML.replace('%s', 'اضغط للإخفاء');
                content.style.display = "block";
                content.textContent = "⏳ جاري التحميل...";

                fetch("/st/" + userID)
                    .then(res => {
                        if (!res.ok) throw new Error("فشل التحميل");
                        return res.text();
                    })
                    .then(html => {
                        let doc = new DOMParser().parseFromString(html, "text/html");
                        let topics = doc.querySelectorAll("a.topictitle");
                        content.dataset.fetched = "true";

                        if (topics.length > 0) {
                            content.textContent = "";
                            let list = document.createElement("ol");
                            list.style.direction = "rtl";
                            list.style.textAlign = "right";
                            list.style.paddingRight = "18px";
                            list.style.paddingLeft = "0";
                            list.style.margin = "4px 0";
                            list.style.fontFamily = "'Cairo', sans-serif";
                            list.style.fontSize = "14px";
                            list.style.lineHeight = "1.8";
                            list.style.color = "#333";

                            topics.forEach((a, i) => {
                                if (i < 5) {
                                    let li = document.createElement("li");
                                    let link = document.createElement("a");
                                    link.href = a.getAttribute('href');
                                    link.textContent = a.textContent.trim();
                                    link.style.color = "#000";
                                    link.style.textDecoration = "none";
                                    link.style.fontWeight = "500";
                                    link.target = "_blank";
                                    link.onmouseover = () => link.style.textDecoration = "underline";
                                    link.onmouseout = () => link.style.textDecoration = "none";
                                    li.appendChild(link);
                                    list.appendChild(li);
                                }
                            });
                            content.appendChild(list);
                        } else {
                            content.textContent = "⚠️ لا توجد مواضيع.";
                        }
                    })
                    .catch(() => {
                        content.dataset.fetched = "true";
                        content.textContent = "⚠️ تعذر تحميل المواضيع.";
                    });
            } else if (content.style.display === "block") {
                content.style.display = "none";
                header.innerHTML = headerBaseHTML.replace('%s', 'اضغط للعرض');
            } else if (content.style.display === "none" && content.dataset.fetched === "true") {
                content.style.display = "block";
                header.innerHTML = headerBaseHTML.replace('%s', 'اضغط للإخفاء');
            }
        });
    });
});
}

/* ========== الكود الرابع: غلاف الموضوع العلوي (صفحات المواضيع فقط) ========== */
if (window.location.href.indexOf('/t') !== -1) {
$(function() {
    (function() {
        var $firstPost = $('.topic-container:first .post-body-text');
        if (!$firstPost.length) return;

        var $coverImg = null;
        $firstPost.find('img').each(function() {
            var src = $(this).attr('src') || '';
            var w = parseInt($(this).attr('width')) || 0;
            var h = parseInt($(this).attr('height')) || 0;
            if (w > 0 && w < 50) return;
            if (h > 0 && h < 50) return;
            if ($(this).closest('.attachbox, .attachments, .signature-box, blockquote, .codebox, pre').length) return;
            if (!src || src.length < 10) return;
            $coverImg = $(this);
            return false;
        });

        if ($coverImg && $coverImg.length) {
            var imgSrc = $coverImg.attr('src');
            var $banner = $('.topic-cover-banner').first();
            $banner.find('.topic-cover-bg').css('background-image', 'url(' + imgSrc + ')');
            var topicTitle = $('.msr-topic-title h1 a').text();
            $banner.find('.topic-cover-content').html(
                '<span class="topic-cover-label">غلاف الموضوع</span>' +
                '<h2>' + topicTitle + '</h2>'
            );
            $banner.css('display', 'block');
            $coverImg.hide();
            var $parentLink = $coverImg.parent('a');
            if ($parentLink.length) {
                $parentLink.hide();
            }
        }
    })();
});
}

/* ========== الكود الخامس: نسخ الأكواد (صفحات المواضيع فقط) ========== */
if (window.location.href.indexOf('/t') !== -1) {
$.getScript('https://cdn.jsdelivr.net/clipboard.js/1.5.16/clipboard.min.js', function() {
  window.fae_copyCode = { copy: 'نسخ الكود', copied: 'تم النسخ!' };
  $(function() {
    var $boxes = $('.codebox dt, .codebox p').not('.spoiler > dt, .hidecode > dt');
    if (!$boxes[0]) return;
    $('head').append(`<style>.codebox{max-width:920px!important;width:100%!important;margin:20px auto!important;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.07);background:#fff}.fae_code-header{display:flex;align-items:center;justify-content:space-between;padding:11px 18px;background:#f8fafc;border-bottom:1px solid #e2e8f0;direction:rtl}.fae_code-title{font-weight:600;color:#334155;font-size:14.8px}.fae_copy-btn{padding:7px 18px;background:#2563eb;color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all .25s ease}.fae_copy-btn:hover{background:#1d4ed8;transform:translateY(-1px)}.fae_copy-btn:active{background:#1e40af;transform:scale(.97)}.fae_copy-btn.fae_copied{background:#16a34a}.codebox .cont_code,.codebox code{margin:0!important;padding:18px 20px!important;font-size:14.3px;line-height:1.58;max-height:580px;overflow-y:auto;background:#f8fafc;color:#1e2937;border-radius:0 0 8px 8px;white-space:pre-wrap;tab-size:4;direction:ltr!important;text-align:left!important}.codebox.code-rtl .cont_code,.codebox.code-rtl code{direction:rtl!important;text-align:right!important}</style>`);
    $boxes.each(function() {
      var $el = $(this);
      $el.before(`<div class="fae_code-header"><span class="fae_code-title">الكود:</span><button class="fae_copy-btn"><span class="fae_copy-text">${window.fae_copyCode.copy}</span></button></div>`);
      if ($el.text().trim() === 'الكود:' || $el.text().trim() === 'Code:') $el.hide();
      var $code = $el.closest('.codebox').find('.cont_code, code').first();
      if ($code.length) {
        var txt = $code.text(), arabic = (txt.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g)||[]).length;
        if (txt.length > 50 && arabic/txt.length > 0.35) $el.closest('.codebox').addClass('code-rtl');
      }
    });
    new Clipboard('.fae_copy-btn', { target: btn => $(btn).closest('.codebox').find('.cont_code, code')[0] })
      .on('success', e => {
        var $btn = $(e.trigger), $text = $btn.find('.fae_copy-text');
        $text.text(window.fae_copyCode.copied);
        $btn.addClass('fae_copied');
        setTimeout(() => { $text.text(window.fae_copyCode.copy); $btn.removeClass('fae_copied'); }, 1600);
        var codeEl = $btn.closest('.codebox').find('.cont_code, code')[0];
        if (codeEl) { var r = document.createRange(); r.selectNodeContents(codeEl); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }
      });
  });
});
}

/* ============================================
   الأكواد التالية تعمل في جميع الصفحات
   ============================================ */

/* ========== الكود السادس: عرض صور غلاف المواضيع (جميع الصفحات) ========== */
document.addEventListener('DOMContentLoaded', function() {
    var topicRows = document.querySelectorAll('.modern-topic-row');

    topicRows.forEach(function(row) {
        var imgElement = row.querySelector('.avatarcp img');
        var coverLink = row.querySelector('.cover-link');
        if (!imgElement || !coverLink) return;
        
        var topicUrl = coverLink.href;

        function processFetchedHTML(htmlText) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(htmlText, 'text/html');
            
            var contentContainer = doc.querySelector('.post-body-text');
            var foundImgSrc = null;

            if (contentContainer) {
                var images = contentContainer.querySelectorAll('img');

                for (var i = 0; i < images.length; i++) {
                    var currentImg = images[i];
                    var src = currentImg.getAttribute('src');
                    var w = parseInt(currentImg.getAttribute('width')) || 0;
                    var h = parseInt(currentImg.getAttribute('height')) || 0;

                    if (w > 0 && w < 50) continue;
                    if (h > 0 && h < 50) continue;
                    if (currentImg.closest('.signature, blockquote, .codebox, .attachbox, .fa_like_table')) continue;

                    if (src && src.length > 10) {
                        foundImgSrc = src;
                        break;
                    }
                }
            }
            
            if (foundImgSrc) {
                imgElement.src = foundImgSrc;
                imgElement.style.display = 'block'; 
            } else {
                imgElement.style.display = 'none';
                var coverBox = imgElement.closest('.col-cover');
                if(coverBox) coverBox.classList.add('empty-cover');
            }
        }

        fetch(topicUrl)
            .then(function(response) {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(processFetchedHTML)
            .catch(function(error) {
                console.log('Error fetching topic image:', error);
                imgElement.style.display = 'none';
                var coverBox = imgElement.closest('.col-cover');
                if(coverBox) coverBox.classList.add('empty-cover');
            });
    });
});

/* ========== الكود السابع: عرض الأنشطة في الهيدر (جميع الصفحات) ========== */
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fa);
    }

    const defaultSettings = {
        sound: true,
        numbering: true
    };

    let settings = JSON.parse(localStorage.getItem('activitySettings')) || defaultSettings;

    const soundCheckbox = document.getElementById('setting-sound');
    const numberingCheckbox = document.getElementById('setting-numbering');
    const settingsPanel = document.getElementById('settings-panel');
    
    if(soundCheckbox) soundCheckbox.checked = settings.sound;
    if(numberingCheckbox) numberingCheckbox.checked = settings.numbering;

    function saveSettings() {
        settings.sound = soundCheckbox.checked;
        settings.numbering = numberingCheckbox.checked;
        localStorage.setItem('activitySettings', JSON.stringify(settings));
    }

    if(soundCheckbox) soundCheckbox.addEventListener('change', saveSettings);
    if(numberingCheckbox) numberingCheckbox.addEventListener('change', saveSettings);

    const settingsToggle = document.getElementById('settings-toggle');
    if(settingsToggle) {
        settingsToggle.addEventListener('click', () => {
            settingsPanel.classList.toggle('visible');
        });
    }

    const config = {
        'activity-type-0': { icon: 'fa-user-plus', color: '#4dabf7' },
        'activity-type-1': { icon: 'fa-file-alt', color: '#339af0' },
        'activity-type-2': { icon: 'fa-comments', color: '#51cf66' },
        'activity-type-3': { icon: 'fa-trophy', color: '#fcc419' },
        'activity-type-4': { icon: 'fa-image', color: '#ae3ec9' },
        'activity-type-6': { icon: 'fa-bullhorn', color: '#ff922b' },
        'activity-type-7': { icon: 'fa-calendar-alt', color: '#ff6b6b' },
        'activity-type-8': { icon: 'fa-user-edit', color: '#868e96' },
        'activity-type-9': { icon: 'fa-poll', color: '#20c997' },
        'default': { icon: 'fa-bell', color: '#adb5bd' }
    };

    let lastActivitiesIds = JSON.parse(localStorage.getItem('lastActivitiesIds') || "[]");
    let isFetching = false;

    async function loadActivities() {
        if (isFetching) return;
        isFetching = true;

        try {
            const response = await fetch('/discover?t=' + Date.now());
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            const newActivitiesData = [];
            const currentIds = new Set();
            let dailyCounter = 1;
            
            const groups = doc.querySelectorAll('.activity-date-group');

            groups.forEach((group) => {
                let headerDate = '';

                const internalDate = group.querySelector('.block-header span,h2.cattitle, .table-title, h2.date-header, .maintitle');
                if (internalDate) {
                    headerDate = internalDate.textContent.trim();
                }

                if (!headerDate) {
                    const dateSelectors = 'h2.cattitle, .table-title, h2.date-header, .maintitle';
                    const allHeaders = Array.from(doc.querySelectorAll(dateSelectors));
                    const precedingHeaders = allHeaders.filter(h =>
                        h.compareDocumentPosition(group) & Node.DOCUMENT_POSITION_FOLLOWING
                    );
                    if (precedingHeaders.length > 0) {
                        headerDate = precedingHeaders[precedingHeaders.length - 1].textContent.trim();
                    }
                }

                headerDate = headerDate || "اليوم";

                const isToday = headerDate.includes('اليوم') || headerDate.includes('Today');

                group.querySelectorAll('.feed-item').forEach((item) => {
                    const img = item.style.getPropertyValue('--activity-image').replace(/url\(["']?/, '').replace(/["']?\)/, '');
                    const typeClass = Object.keys(config).find(cls => item.classList.contains(cls)) || 'default';
                    const { icon, color } = config[typeClass];

                    const textEl = item.querySelector('.text');
                    const links = textEl ? Array.from(textEl.querySelectorAll('a')) : [];
                    
                    const userHtml = links[0]?.innerHTML || '';
                    const userLink = links[0]?.getAttribute('href') || '#';
                    
                    const topicLink = links.length > 1 ? links[links.length - 1] : null;
                    const topic = topicLink ? topicLink.textContent.trim() : '';
                    const link = topicLink ? topicLink.getAttribute('href') : '#';

                    const activityId = btoa(unescape(encodeURIComponent(link + userLink + topic + headerDate))).substring(0, 32);

                    if (currentIds.has(activityId)) return;
                    currentIds.add(activityId);

                    const textClone = textEl.cloneNode(true);
                    textClone.querySelectorAll('a, img, .act-thumb, .award, .act-icon').forEach(n => n.remove());
                    const description = textClone.textContent.replace(/\s+/g, ' ').trim();

                    const isBrandNew = lastActivitiesIds.length > 0 && !lastActivitiesIds.includes(activityId);

                    let todayBadgeHtml = '';
                    if (isToday && settings.numbering) {
                        todayBadgeHtml = `<span class="today-badge">اليوم ${dailyCounter}</span>`;
                        dailyCounter++;
                    }

                    newActivitiesData.push({
                        id: activityId,
                        html: `
                        <div class="custom-item ${isBrandNew ? 'new-activity-blink' : ''}" data-id="${activityId}">
                            <div class="avatar-wrapper-activity">
                                <img src="${img}" class="avatar-activity" loading="lazy"/>
                                <span class="activity-type-badge" style="background-color: ${color}">
                                    <i class="fas ${icon}"></i>
                                </span>
                            </div>
                            <div class="details">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <div class="desc">${description}</div>
                                    ${todayBadgeHtml}
                                </div>
                                ${topic ? `<a href="${link}" class="title">${topic}</a>` : ''}
                                <div class="meta">
                                    ${userHtml ? `<a href="${userLink}" class="user">${userHtml}</a> • ` : ''}
                                    <span class="date">${headerDate}</span>
                                </div>
                            </div>
                        </div>`
                    });
                });
            });

            const target = document.querySelector('.page-discover');
            if (!target) { isFetching = false; return; }
            const currentIdsArray = Array.from(currentIds);

            if (JSON.stringify(currentIdsArray) !== JSON.stringify(lastActivitiesIds)) {
                if (lastActivitiesIds.length > 0 && currentIdsArray.some(id => !lastActivitiesIds.includes(id))) {
                    playBellSound();
                }

                const finalHtml = newActivitiesData.map(d => d.html).join('');
                target.innerHTML = `<div class="custom-feed">${finalHtml}</div>`;

                lastActivitiesIds = currentIdsArray;
                localStorage.setItem('lastActivitiesIds', JSON.stringify(currentIdsArray));
                localStorage.setItem('activitiesHtml', target.innerHTML.replace(/new-activity-blink/g, ''));
            }

        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            isFetching = false;
        }
    }

    function playBellSound() {
        if (settings.sound) {
            new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_783856af9d.mp3').play().catch(() => {});
        }
    }

    const cached = localStorage.getItem('activitiesHtml');
    if (cached && document.querySelector('.page-discover')) {
        document.querySelector('.page-discover').innerHTML = cached;
    }

    loadActivities();
    setInterval(loadActivities, 4000);
});

/* ========== الكود الثامن: تلوين عنوان المنتدى (جميع الصفحات) ========== */
$(function() {
    var colorFirstWord = "#0F172A"; 
    var colorRestWords = "#2563EB";

    var isPainting = false; 

    function getColoredHTML(text, fontSize) {
        if (!text) return '';
        var parts = text.trim().split(" ");
        var sizeStyle = ''; 

        if (parts.length > 1) {
            var first = parts.shift();
            var rest = parts.join(" ");
            return '<span class="colored-part-1" style="color: ' + colorFirstWord + ' !important; ' + sizeStyle + '">' + first + '</span> ' +
                   '<span class="colored-part-2" style="color: ' + colorRestWords + ' !important; ' + sizeStyle + '">' + rest + '</span>';
        } else {
            return '<span class="colored-part-1" style="color: ' + colorFirstWord + ' !important; ' + sizeStyle + '">' + text + '</span>';
        }
    }

    function paintElement($element, isCategory) {
        if (isPainting) return;
        
        if ($element.find('.colored-part-1').length > 0) return;

        var currentSize = ''; 

        var hasMedia = $element.find('img, i, svg, .icon, .fa').length > 0;

        if (hasMedia) {
            var $textNodes = $element.find('*').addBack().contents().filter(function() {
                return this.nodeType === 3 && this.nodeValue.trim().length > 0;
            });

            if ($textNodes.length > 0) {
                var firstTextNode = $textNodes[0];
                var text = firstTextNode.nodeValue;
                var parts = text.trim().split(" ");
                
                if (parts.length > 0) {
                    var first = parts.shift();
                    var rest = parts.join(" ");
                    
                    var styleProps = { 'color': colorFirstWord };

                    var $span1 = $('<span class="colored-part-1"></span>').text(first).css(styleProps);
                    
                    var $span2;
                    if (rest) {
                        var styleProps2 = { 'color': colorRestWords };
                        $span2 = $('<span class="colored-part-2"></span>').text(" " + rest).css(styleProps2);
                    } else {
                        $span2 = $();
                    }
                    
                    var $wrapper = $(firstTextNode);
                    $wrapper.replaceWith($span1);
                    if (rest) $span1.after($span2);
                }
            }

        } else {
            var text = $element.text().trim();
            if (text.length > 0) {
                isPainting = true;
                $element.html(getColoredHTML(text, currentSize));
                isPainting = false;
            }
        }
    }

    function applyPaint() {
        paintElement($('#logo-text'), false);
        paintElement($('#msr-site-name'), false);
        paintElement($('#footer-logo-text'), false);
        
        $('.msr-category-title span').each(function() {
            paintElement($(this), true);
            hijackElement(this);
        });
    }

    function hijackElement(element) {
        if (element.dataset.hijacked === "true") return;
        element.dataset.hijacked = "true";

        var originalInnerHTML = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML');
        Object.defineProperty(element, 'innerHTML', {
            set: function(val) {
                originalInnerHTML.set.call(this, val);
                if (!isPainting) {
                    var self = this;
                    requestAnimationFrame(function() {
                        paintElement($(self), true);
                    });
                }
            },
            get: function() { return originalInnerHTML.get.call(this); }
        });

        var originalInnerText = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText');
        Object.defineProperty(element, 'innerText', {
            set: function(val) {
                originalInnerText.set.call(this, val);
                if (!isPainting) {
                    var self = this;
                    requestAnimationFrame(function() {
                        paintElement($(self), true);
                    });
                }
            },
            get: function() { return originalInnerText.get.call(this); }
        });
        
        var originalTextContent = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
        Object.defineProperty(element, 'textContent', {
            set: function(val) {
                originalTextContent.set.call(this, val);
                if (!isPainting) {
                    var self = this;
                    requestAnimationFrame(function() {
                        paintElement($(self), true);
                    });
                }
            },
            get: function() { return originalTextContent.get.call(this); }
        });
    }

    var parentObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        var $newSpan = $(node).hasClass('msr-category-title') ? $(node).find('span') : $(node);
                        if ($newSpan.length > 0) {
                            $newSpan.each(function() {
                                hijackElement(this);
                                paintElement($(this), true);
                            });
                        }
                    }
                });
            }
        });
    });

    applyPaint();

    var $parents = $('.msr-category-title');
    if ($parents.length > 0) {
        $parents.each(function() {
            parentObserver.observe(this, { childList: true, subtree: true });
        });
    }
});

/* ========== الكود التاسع: زر التمرير للاعلى والاسفل (جميع الصفحات) ========== */
(function () {
    'use strict';

    if (window.__scrollButtons3DInstance) return;

    const ScrollButtons3D = class {
        constructor(config = {}) {
            this.config = {
                position: 'left',
                bottomOffset: 50,
                sideOffset: 20,
                buttonSize: 42,
                colors: {
                    primary: '#2563EB',
                    secondary: '#8B5CF6',
                    gradientStart: '#2563EB',
                    gradientEnd: '#8B5CF6'
                },
                ...config
            };

            this.scrollPercentage = 0;
            if (document.readyState === 'complete') {
                this.init();
            } else {
                window.addEventListener('load', () => this.init());
            }
        }

        init() {
            try {
                this.injectStyles();
                this.createButtons();
                this.attachEvents();
            } catch (e) {
                console.error('ScrollButtons3D: initialization error', e);
            }
        }

        injectStyles() {
            if (document.getElementById('scroll-buttons-3d-styles')) return;

            const styles = `
                @keyframes shineEffectSB3D {
                    0% { left: -100%; }
                    20% { left: 100%; }
                    100% { left: 100%; }
                }
                @keyframes waterRippleSB3D {
                    0% { transform: scale(0); opacity: 0.5; }
                    100% { transform: scale(2); opacity: 0; }
                }
                @keyframes percentagePulseSB3D {
                    0%, 100% { box-shadow: 0 0 8px currentColor; }
                    50% { box-shadow: 0 0 16px currentColor; }
                }

                .scroll-buttons-container-sb3d {
                    position: fixed;
                    bottom: ${this.config.bottomOffset}px;
                    left: ${this.config.sideOffset}px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    z-index: 999990;
                    opacity: 0;
                    transform: translateX(-100px) scale(0.5);
                    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .scroll-buttons-container-sb3d.visible {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }

                .scroll-btn-sb3d {
                    width: ${this.config.buttonSize}px;
                    height: ${this.config.buttonSize}px;
                    border-radius: 50%;
                    background: transparent;
                    border: none;
                    backdrop-filter: none;
                    -webkit-backdrop-filter: none;
                    box-shadow: none;
                    cursor: pointer;
                    position: relative;
                    transition: transform 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .scroll-btn-sb3d:hover {
                    transform: scale(1.15);
                }
                .scroll-btn-sb3d:active {
                    transform: scale(0.9) !important;
                }

                .btn-icon-sb3d {
                    display: none;
                }

                .percentage-container-sb3d {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    z-index: 3;
                }

                .percentage-circle-sb3d {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: rgba(37, 99, 235, 0.35);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                    font-weight: 800;
                    color: white;
                    box-shadow: 0 0 8px rgba(37, 99, 235, 0.4);
                    transition: background 0.4s, transform 0.3s;
                    position: relative;
                    z-index: 4;
                    animation: percentagePulseSB3D 3s infinite;
                    border: 1px solid rgba(255, 255, 255, 0.5);
                }
                .scroll-btn-sb3d:hover .percentage-circle-sb3d {
                    background: rgba(37, 99, 235, 0.55);
                    transform: rotate(360deg) scale(1.05);
                }

                .scroll-btn-sb3d.disabled {
                    opacity: 0.25;
                    pointer-events: none;
                    transform: scale(0.85) !important;
                }

                .water-ripple-sb3d {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    transform: scale(0);
                    animation: waterRippleSB3D 0.8s ease-out;
                    pointer-events: none;
                    width: 30px;
                    height: 30px;
                    margin-left: -15px;
                    margin-top: -15px;
                }

                @media (min-width: 768px) {
                    .scroll-buttons-container-sb3d {
                        bottom: 25px;
                        left: 15px;
                        gap: 6px;
                    }
                    .scroll-btn-sb3d {
                        width: 48px;
                        height: 48px;
                    }
                    .percentage-circle-sb3d {
                        font-size: 14px;
                    }
                }
            `;

            const styleSheet = document.createElement('style');
            styleSheet.id = 'scroll-buttons-3d-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        createButtons() {
            const old = document.querySelector('.scroll-buttons-container-sb3d');
            if (old) old.remove();

            this.container = document.createElement('div');
            this.container.className = 'scroll-buttons-container-sb3d';

            this.upButton = this.createButton('up');
            this.downButton = this.createButton('down');

            this.container.appendChild(this.upButton);
            this.container.appendChild(this.downButton);
            document.body.appendChild(this.container);

            setTimeout(() => {
                if (this.container) this.container.classList.add('visible');
            }, 500);
        }

        createButton(type) {
            const btn = document.createElement('button');
            btn.className = `scroll-btn-sb3d ${type}-btn`;

            const icon = document.createElement('span');
            icon.className = 'btn-icon-sb3d';
            btn.appendChild(icon);

            const percentageCircle = document.createElement('div');
            percentageCircle.className = 'percentage-circle-sb3d';

            const percentageText = document.createElement('span');
            percentageText.className = 'percentage-text-sb3d';
            percentageText.textContent = '0%';

            percentageCircle.appendChild(percentageText);
            btn.appendChild(percentageCircle);

            if (type === 'up') {
                this.percentageTextUp = percentageText;
                this.percentageCircleUp = percentageCircle;
            } else {
                this.percentageTextDown = percentageText;
                this.percentageCircleDown = percentageCircle;
            }

            btn.addEventListener('click', (e) => this.handleScrollClick(e, btn, type));
            return btn;
        }

        handleScrollClick(event, btn, type) {
            this.createWaterRipple(event, btn);
            if (type === 'up') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
            }
        }

        createWaterRipple(event, btn) {
            const ripple = document.createElement('span');
            ripple.className = 'water-ripple-sb3d';
            const rect = btn.getBoundingClientRect();
            const size = Math.max(btn.offsetWidth, btn.offsetHeight);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
            btn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        }

        updatePercentageColor(percentage) {
            let r, g, b;
            if (percentage < 33) {
                r = 14; g = 165; b = 233;
            } else if (percentage < 66) {
                r = 37; g = 99; b = 235;
            } else {
                r = 139; g = 92; b = 246;
            }

            const bgColor = `rgba(${r}, ${g}, ${b}, 0.35)`;
            const hoverBgColor = `rgba(${r}, ${g}, ${b}, 0.55)`;

            if (this.percentageCircleUp) {
                this.percentageCircleUp.style.background = bgColor;
                this.percentageCircleUp.style.boxShadow = `0 0 8px rgba(${r}, ${g}, ${b}, 0.4)`;
            }
            if (this.percentageCircleDown) {
                this.percentageCircleDown.style.background = bgColor;
                this.percentageCircleDown.style.boxShadow = `0 0 8px rgba(${r}, ${g}, ${b}, 0.4)`;
            }
        }

        attachEvents() {
            this.handleScroll = this.handleScroll.bind(this);
            window.addEventListener('scroll', this.handleScroll, { passive: true });
            window.addEventListener('resize', this.handleScroll);
            this.handleScroll();
        }

        handleScroll() {
            if (!this.container) return;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            this.scrollPercentage = Math.round((scrollY / (documentHeight - windowHeight)) * 100) || 0;

            if (this.percentageTextUp) this.percentageTextUp.textContent = `${this.scrollPercentage}%`;
            if (this.percentageTextDown) this.percentageTextDown.textContent = `${this.scrollPercentage}%`;

            this.updatePercentageColor(this.scrollPercentage);

            if (scrollY < 100) {
                this.upButton.classList.add('disabled');
            } else {
                this.upButton.classList.remove('disabled');
            }

            if (scrollY + windowHeight >= documentHeight - 100) {
                this.downButton.classList.add('disabled');
            } else {
                this.downButton.classList.remove('disabled');
            }
        }
    };

    window.__scrollButtons3DInstance = new ScrollButtons3D();
})();

/* ========== الكود العاشر: آخر الزوار تحت الشريط العلوي (جميع الصفحات) ========== */
document.addEventListener('DOMContentLoaded', function() {
 
    function hexToRgba(hex, alpha) {
        if (!hex || hex.length < 7) return `rgba(0, 0, 0, ${alpha})`; 
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function getThemeColor(varName) {
        let style = getComputedStyle(document.documentElement);
        let color = style.getPropertyValue(varName);

        if (!color) {
            const styleTags = document.querySelectorAll('style');
            for (let tag of styleTags) {
                const regex = new RegExp(varName + ':\\s*([^;]+)');
                const match = tag.innerHTML.match(regex);
                if (match && match[1]) {
                    color = match[1].trim();
                    break;
                }
            }
        }
        
        if (!color) {
            if (varName === '--msr-red') color = '#2563EB'; 
            else if (varName === '--msr-dark-border') color = '#E2E8F0';
            else if (varName === '--msr-dark-card') color = '#FFFFFF';
            else if (varName === '--msr-text-main') color = '#1E293B';
            else if (varName === '--msr-text-sub') color = '#475569';
            else color = '#1E293B';
        }
        return color;
    }

    const themeRed = getThemeColor('--msr-red');
    const themeBorder = getThemeColor('--msr-dark-border');
    const themeBg = getThemeColor('--msr-dark-card');
    const themeText = getThemeColor('--msr-text-main');
    const themeTextSub = getThemeColor('--msr-text-sub');

    if (!document.getElementById('msr-slider-hero-styles')) {
        const style = document.createElement('style');
        style.id = 'msr-slider-hero-styles';
        
        style.innerHTML = `
            .msr-hero-members-slider {
                font-family: 'Tajawal', sans-serif;
                width: 100% !important; max-width: 100% !important;
                margin: 0 !important; padding: 0 !important;
                background: transparent !important; border: none !important;
                border-radius: 0 !important; box-shadow: none !important;
                overflow: visible; position: absolute !important; 
                left: 0; right: 0; top: 80px; 
                z-index: 50 !important; direction: rtl;
            }
            
            .slider-header { display: none; }

            .msr-slider-container-hero {
                position: relative; display: flex; align-items: center;
                height: 105px; padding: 0 50px; box-sizing: border-box;
                overflow: hidden; width: 100%;
            }

            .msr-track-hero {
                display: flex; gap: 16px; overflow-x: auto;
                scroll-behavior: smooth; scrollbar-width: none;
                width: 100%; height: 100%; align-items: center;
                padding: 8px 0; direction: rtl;
            }
            .msr-track-hero::-webkit-scrollbar { display: none; }
           
            .msr-item-hero {
                flex: 0 0 76px; width: 76px; height: 100%;
                display: flex; flex-direction: column; align-items: center;
                justify-content: center; text-decoration: none !important;
                transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                padding: 6px; position: relative; background: transparent !important;
            }
            .msr-item-hero:hover { transform: translateY(-5px); }

            .msr-avatar-hero {
                width: 48px !important; height: 48px !important;
                max-width: 48px !important; max-height: 48px !important;
                min-width: 48px !important; min-height: 48px !important;
                border-radius: 50% !important; overflow: hidden !important;
                border: 2px solid ${themeBorder} !important; 
                margin-bottom: 6px; position: relative; background: ${themeBg};
                transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: block !important; flex-shrink: 0 !important;
            }
            
            .msr-avatar-hero img { 
                width: 100% !important; height: 100% !important;
                object-fit: cover !important; border-radius: 50% !important;
                position: absolute !important; top: 0 !important; left: 0 !important;
            }

            .msr-item-hero:hover .msr-avatar-hero {
                border-color: ${themeRed} !important; transform: scale(1.12);
                box-shadow: 0 0 18px ${hexToRgba(themeRed, 0.4)};
            }
           
            .avatar-active {
                border-color: ${themeRed} !important;
                animation: pulse-glow-theme 2s infinite;
            }
            @keyframes pulse-glow-theme {
                0% { box-shadow: 0 0 0 0 ${hexToRgba(themeRed, 0.4)}; }
                70% { box-shadow: 0 0 0 8px rgba(0, 0, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
            }

            .msr-name-hero {
                font-size: 11px; font-weight: 700; color: ${themeText} !important;
                text-align: center; width: 100%; 
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                margin-bottom: 3px; display: block !important;
                flex-shrink: 0 !important; line-height: 1.3; direction: rtl;
            }

            .msr-item-hero:hover .msr-name-hero { color: ${themeRed} !important; }

            .msr-stat-hero {
                display: inline-flex !important; justify-content: center; align-items: center;
                width: auto !important; max-width: 76px; font-size: 9px; font-weight: 600;
                color: ${themeTextSub} !important; background: rgba(241, 245, 249, 0.8) !important;
                padding: 2px 6px !important; border-radius: 6px !important;
                border: 1px solid ${themeBorder} !important; white-space: nowrap;
                overflow: hidden; text-overflow: ellipsis; direction: rtl;
                transition: all 0.2s; flex-shrink: 0 !important; line-height: 1.3;
            }

            .stat-active {
                color: #ffffff !important; background: ${themeRed} !important;
                border: 1px solid ${themeRed} !important;
                box-shadow: 0 0 8px ${hexToRgba(themeRed, 0.3)};
            }
            
            .msr-container { margin-top: 21px; }

            .nav-btn-hero {
                position: absolute; top: 50%; transform: translateY(-50%);
                width: 28px; height: 28px; border-radius: 50%;
                background: ${themeBg} !important; border: 1px solid ${themeBorder} !important;
                color: ${themeTextSub} !important; cursor: pointer; display: flex;
                align-items: center; justify-content: center; z-index: 5;
                font-size: 11px; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            .nav-btn-hero:hover {
                background: ${themeRed} !important; color: #ffffff !important;
                border-color: ${themeRed}; transform: translateY(-50%) scale(1.12);
                box-shadow: 0 0 16px ${hexToRgba(themeRed, 0.4)};
            }
            .btn-prev { right: 10px; }
            .btn-next { left: 10px; }

            @media (max-width: 768px) {
                .msr-slider-container-hero { padding: 0 15px; height: 95px; }
                .msr-item-hero { width: 64px; flex: 0 0 64px; }
                .msr-avatar-hero {
                    width: 42px !important; height: 42px !important;
                    max-width: 42px !important; max-height: 42px !important;
                    min-width: 42px !important; min-height: 42px !important;
                }
                .msr-name-hero { font-size: 10px; max-width: 64px; }
                .msr-stat-hero { max-width: 64px; font-size: 8px; }
                .nav-btn-hero { display: none; }
            }
        `;
        document.head.appendChild(style);
        
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const faLink = document.createElement('link');
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            faLink.rel = 'stylesheet'; document.head.appendChild(faLink);
        }
        
        if (!document.querySelector('link[href*="Tajawal"]')) {
            const fontLink = document.createElement('link');
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap';
            fontLink.rel = 'stylesheet'; document.head.appendChild(fontLink);
        }
    }

    const targetHeader = document.querySelector('header');
    const targetHero = document.querySelector('.msr-hero');
   
    if (targetHeader && targetHero) {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'msr-hero-members-slider';
        targetHero.prepend(sliderWrapper);

        sliderWrapper.innerHTML = `
            <div class="msr-slider-container-hero">
                <button class="nav-btn-hero btn-prev"><i class="fas fa-chevron-right"></i></button>
                <div class="msr-track-hero" id="hero-members-track">
                    <div style="color:${themeTextSub}; font-size:12px; padding:20px; width:100%; text-align:center;">جاري التحميل...</div>
                </div>
                <button class="nav-btn-hero btn-next"><i class="fas fa-chevron-left"></i></button>
            </div>
        `;

        function updateSliderPosition() {
            const headerHeight = targetHeader.offsetHeight;
            const heroTop = targetHero.getBoundingClientRect().top + window.scrollY;
            sliderWrapper.style.top = `${headerHeight - heroTop}px`;
        }

        updateSliderPosition();
        window.addEventListener('resize', updateSliderPosition);
        window.addEventListener('scroll', updateSliderPosition, { passive: true });

        const track = document.getElementById('hero-members-track');
        const btnPrev = sliderWrapper.querySelector('.btn-prev');
        const btnNext = sliderWrapper.querySelector('.btn-next');

        btnPrev.onclick = () => track.scrollBy({ left: 300, behavior: 'smooth' });
        btnNext.onclick = () => track.scrollBy({ left: -300, behavior: 'smooth' });

        fetch('/memberlist?mode=lastvisit&order=DESC&submit=Ok')
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const members = doc.querySelectorAll('.member-block');
           
            track.innerHTML = '';
           
            members.forEach(block => {
                const nameTag = block.querySelector('.member-header a[href^="/u"]');
                const link = nameTag ? nameTag.getAttribute('href') : '#';
                
                let name = 'عضو';
                
                if (nameTag) {
                    const clone = nameTag.cloneNode(true);
                    clone.querySelectorAll('img, i').forEach(el => el.remove());
                    name = clone.textContent.trim() || 'عضو';
                }

                const avatar = block.querySelector('.avatar-default img')?.src || 'https://2img.net/i/fa/modernbb/pp-blank-thumb-38px.png';
                const details = block.querySelector('.member-details')?.textContent || '';
                const isOnline = details.includes("اليوم");
                const statusText = isOnline ? "نشط اليوم" : "زائر سابق";

                const item = document.createElement('a');
                item.href = link;
                item.className = 'msr-item-hero';
                
                const statClass = isOnline ? 'msr-stat-hero stat-active' : 'msr-stat-hero';

                item.innerHTML = `
                    <div class="msr-avatar-hero ${isOnline ? 'avatar-active' : ''}">
                        <img src="${avatar}" alt="${name}" loading="lazy">
                    </div>
                    <span class="msr-name-hero">${name}</span>
                    <div class="${statClass}">${statusText}</div>
                `;
                track.appendChild(item);
            });
        }).catch(err => {
            track.innerHTML = `<div style="color:${themeTextSub}; font-size:12px; padding:20px; width:100%; text-align:center;">حدث خطأ في الاتصال</div>`;
        });
    }
});

/* ========== الكود الحادي عشر: علبة الدردشة (جميع الصفحات) ========== */
$(function() {
    var isForumMember = (typeof _userdata !== 'undefined' && _userdata.session_logged_in === 1);

    var chatStyle = document.createElement('style');
    chatStyle.innerHTML = `
        #frame_chatbox, #chatbox_top, #chatbox_bottom, .panel.chatbox, div[class*="chatbox"] {
            display: none !important; height: 0 !important; padding: 0 !important;
            margin: 0 !important; overflow: hidden !important;
        }
        img.chatbox-resize { display: none; }

        #floating-chat-btn {
            position: fixed !important; bottom: 100px !important; right: 10px !important;
            left: auto !important; top: auto !important; margin: 0 !important;
            width: 60px; height: 60px; border-radius: 50%;
            background: linear-gradient(135deg, #2563EB 0%, #0EA5E9 50%, #8B5CF6 100%);
            color: #fff; display: flex; align-items: center; justify-content: center;
            font-size: 28px; cursor: pointer; box-shadow: 0 5px 25px rgba(37, 99, 235, 0.45);
            z-index: 999 !important; transition: all 0.3s ease; border: none; outline: none;
        }
        #floating-chat-btn:hover {
            transform: translateX(-5px) scale(1.05) !important;
            box-shadow: 0 8px 30px rgba(37, 99, 235, 0.6);
        }
        #floating-chat-btn .material-symbols-outlined {
            color: #fff !important; pointer-events: none; font-size: 28px;
        }
        #chat-online-count {
            position: absolute; top: -4px; left: -4px; background: #EF4444; color: #fff;
            min-width: 22px; height: 22px; border-radius: 50px; font-size: 12px;
            font-weight: 800; display: flex; align-items: center; justify-content: center;
            border: 2px solid #F8FAFC; padding: 0 5px; pointer-events: none;
            line-height: 1; font-family: sans-serif;
        }
        #chat-online-count.active { background: #EF4444; } 
        #chat-online-count.empty { background: #94A3B8; }  
        
        @keyframes chatPulse {
            0% { transform: scale(1); box-shadow: 0 5px 25px rgba(37, 99, 235, 0.45); }
            50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
            100% { transform: scale(1); box-shadow: 0 5px 25px rgba(37, 99, 235, 0.45); }
        }
        .chat-new-msg-pulse { animation: chatPulse 1s infinite !important; }

        #chat-tooltip {
            position: fixed; bottom: 170px; right: 10px; width: 240px;
            background: #fff; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            padding: 12px 15px; display: none; z-index: 998;
            border: 1px solid #E2E8F0; font-family: sans-serif; direction: rtl;
        }
        #chat-tooltip h4 { margin: 0 0 8px 0; font-size: 14px; color: #2563EB; border-bottom: 1px solid #E2E8F0; padding-bottom: 5px; display: flex; align-items: center; gap: 5px; }
        #chat-tooltip h4.away-title { color: #D97706; border-bottom-color: #FDE68A; margin-top: 12px; }
        #chat-tooltip ul { list-style: none; padding: 0; margin: 0; max-height: 120px; overflow-y: auto; }
        #chat-tooltip li { font-size: 13px; color: #334155; padding: 3px 0; display: flex; align-items: center; gap: 6px; }
        #chat-tooltip li::before { content: '●'; color: #22C55E; font-size: 10px; }
        #chat-tooltip li.away-user { color: #D97706; }
        #chat-tooltip li.away-user::before { color: #F59E0B; }

        #chat-modal-overlay {
            position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(8px); z-index: 10000;
            display: none; justify-content: center; align-items: center;
        }
        #chat-modal-iframe {
            width: 85%; height: 85%; border-radius: 12px !important; border: none !important;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important; background: #fff;
        }

        #chat-last-msg-bar {
            position: fixed; bottom: 0; left: 0; right: 0; height: 40px;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(12px) !important; color: #1E293B;
            display: none; align-items: center !important;
            justify-content: space-between !important; padding: 0 15px;
            font-size: 14px; z-index: 998;
            box-shadow: 0 -2px 15px rgba(0,0,0,0.06) !important;
            border-top: 1px solid #E2E8F0 !important; cursor: pointer;
            transition: background-color 0.5s ease, border-top-color 0.3s ease;
        }
        #chat-last-msg-bar:hover { background: rgba(255, 255, 255, 1) !important; border-top-color: #CBD5E1 !important; }
        #chat-last-msg-bar.flash-msg { background: #FFF9C4 !important; }
        #chat-last-msg-bar.flash-join { background: #DCFCE7 !important; }
        #chat-last-msg-bar.flash-leave { background: #FEE2E2 !important; }
        
        #chat-last-msg-bar .bar-content {
            display: flex !important; 
            align-items: center !important;
            gap: 10px !important;
            overflow: hidden !important; white-space: nowrap !important;
            text-overflow: ellipsis !important; flex: 1; direction: rtl !important; height: 100%;
            margin-top: 0;
        }
        #chat-last-msg-bar .bar-content > * {
            display: inline-flex !important; align-items: center !important; float: none !important;
            margin: 0 !important; padding: 0 !important; height: auto !important;
            line-height: 1 !important; vertical-align: middle !important;
        }
        #chat-last-msg-bar .bar-content span, 
        #chat-last-msg-bar .bar-content a, 
        #chat-last-msg-bar .bar-content .msg { display: inline-flex !important; line-height: 1 !important; }
        #chat-last-msg-bar .bar-content br { display: none !important; }

        div#chat-last-msg-bar .bar-content img {
            max-height: 22px !important; 
            max-width: none !important;
            width: auto !important;
            height: auto !important;
            vertical-align: middle !important; 
            display: inline-block !important;
            object-fit: contain !important; 
            margin: 0 3px !important;
            border: none !important; box-shadow: none !important;
            padding: 0 !important; position: static !important; float: none !important;
            border-radius: 0 !important;
        }

        div#chat-last-msg-bar .cb-avatar img,
        div#chat-last-msg-bar .chatbox-avatar img,
        div#chat-last-msg-bar .user-avatar img,
        div#chat-last-msg-bar span[class*="avatar"] img {
            width: 28px !important; height: 28px !important; max-height: 28px !important; max-width: 28px !important;
            border-radius: 50% !important;
            object-fit: cover !important; border: 2px solid #2563EB !important;
            box-shadow: 0 0 6px rgba(37, 99, 235, 0.2) !important; flex-shrink: 0 !important;
            vertical-align: middle !important;
        }
        div#chat-last-msg-bar .cb-avatar, div#chat-last-msg-bar .chatbox-avatar, div#chat-last-msg-bar .user-avatar, div#chat-last-msg-bar span[class*="avatar"] {
            width: 28px !important;
            height: 28px !important;
            border-radius: 50% !important;
            overflow: hidden !important;
            flex-shrink: 0 !important;
            line-height: 0 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 !important;
            float: none !important;
            vertical-align: middle !important;
        }

        #chat-last-msg-bar .bar-content .date-and-time, 
        #chat-last-msg-bar .bar-content .chatbox-timestamp {
            display: inline-flex !important; font-size: 11px !important; color: #94A3B8 !important;
            font-weight: 500 !important; flex-shrink: 0 !important; opacity: 0.8;
        }
        #chat-last-msg-bar .bar-content span, 
        #chat-last-msg-bar .bar-content a { color: #1E293B !important; font-weight: 600 !important; }
        #chat-last-msg-bar .bar-content .chatbox-username a, 
        #chat-last-msg-bar .bar-content a[href^="/u"] { color: #2563EB !important; font-weight: 800 !important; }
        
        .bar-actions { display: flex; align-items: center; gap: 5px; flex-shrink: 0; margin-right: 10px; }
        #close-chat-bar, #sound-toggle-btn {
            background: none; border: none; color: #94A3B8; font-size: 22px; cursor: pointer;
            padding: 0 !important; line-height: 1 !important; border-radius: 50% !important;
            transition: all 0.3s ease !important; width: 32px; height: 32px;
            display: inline-flex !important; align-items: center !important; justify-content: center !important;
        }
        #close-chat-bar:hover, #sound-toggle-btn:hover { background: rgba(0,0,0,0.05) !important; }
        #close-chat-bar:hover { color: #EF4444 !important; }
        #sound-toggle-btn.muted { color: #EF4444 !important; }
    `;
    document.head.appendChild(chatStyle);

    if (!isForumMember) return;

    var savedCount = localStorage.getItem('chatOnlineCount') || '0';
    var savedLastMsg = localStorage.getItem('chatLastMsgHTML') || '';
    var isMuted = localStorage.getItem('chatSoundMuted') === '1';

    var audioCtx = null;
    function playCustomNotifSound() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        var oscillator = audioCtx.createOscillator();
        var oscillator2 = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator2.type = 'triangle';
        
        gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator2.frequency.setValueAtTime(1200, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
        oscillator2.frequency.setValueAtTime(900, audioCtx.currentTime + 0.1);
        
        oscillator.start(audioCtx.currentTime);
        oscillator2.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.5);
        oscillator2.stop(audioCtx.currentTime + 0.5);
    }

    var chatBtn = document.createElement('button');
    chatBtn.id = 'floating-chat-btn';
    chatBtn.title = 'علبة الدردشة';
    chatBtn.innerHTML = `
        <span class="material-symbols-outlined">forum</span>
        <span id="chat-online-count" class="${savedCount === '0' ? 'empty' : 'active'}">${savedCount}</span>
    `;
    document.body.appendChild(chatBtn);

    var chatTooltip = document.createElement('div');
    chatTooltip.id = 'chat-tooltip';
    chatTooltip.innerHTML = `
     <h4>المتواجدون  الآن</h4>
        <ul id="online-users-list"><li>جاري  التحميل...</li></ul>
        <h4 class="away-title">في  حالة  غياب</h4>
        <ul id="away-users-list"><li>جاري  التحميل...</li></ul>
    `;
    document.body.appendChild(chatTooltip);

    chatBtn.addEventListener('mouseenter', () => chatTooltip.style.display = 'block');
    chatBtn.addEventListener('mouseleave', () => chatTooltip.style.display = 'none');

    if (localStorage.getItem('chatHasNewMsg') === '1') chatBtn.classList.add('chat-new-msg-pulse');

    var modalOverlay = document.createElement('div');
    modalOverlay.id = 'chat-modal-overlay';
    modalOverlay.innerHTML = '<iframe id="chat-modal-iframe" src="about:blank"></iframe>';
    document.body.appendChild(modalOverlay);

    var lastMsgBar = document.createElement('div');
    lastMsgBar.id = 'chat-last-msg-bar';
    lastMsgBar.innerHTML = `
        <div class="bar-content">لا توجد رسائل بعد</div>
        <div class="bar-actions">
            <button id="sound-toggle-btn" class="${isMuted ? 'muted' : ''}" title="${isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}">
                <i class="material-symbols-outlined">${isMuted ? 'volume_off' : 'volume_up'}</i>
            </button>
            <button id="close-chat-bar" title="إخفاء الشريط"><i class="material-symbols-outlined">close</i></button>
        </div>
    `;
    document.body.appendChild(lastMsgBar);

    if (savedLastMsg) lastMsgBar.querySelector('.bar-content').innerHTML = savedLastMsg;
    if (localStorage.getItem('chatBarVisible') === '1') lastMsgBar.style.display = 'flex';

    var isChatLoaded = false; 

    chatBtn.addEventListener('click', function() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    });

    document.getElementById('sound-toggle-btn').addEventListener('click', function(e) {
        e.stopPropagation(); 
        isMuted = !isMuted;
        localStorage.setItem('chatSoundMuted', isMuted ? '1' : '0');
        this.classList.toggle('muted', isMuted);
        this.querySelector('i').textContent = isMuted ? 'volume_off' : 'volume_up';
        this.title = isMuted ? 'تفعيل الصوت' : 'كتم الصوت';
    });

    function fixChatboxTopIssue() {
        var iframe = document.getElementById('chat-modal-iframe');
        if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
            try {
                var iframeDoc = iframe.contentWindow.document;
                if (iframeDoc.head && !iframeDoc.getElementById('fix-chatbox-top')) {
                    var fixStyle = iframeDoc.createElement('style');
                    fixStyle.id = 'fix-chatbox-top';
                    fixStyle.innerHTML = `
                        #chatbox_header, .chatbox-header { z-index: 999 !important; position: relative !important; }
                        .chat-messages { z-index: 1 !important; }
                        .chat-messages .chat-messages-inner { top: auto !important; }
                    `;
                    iframeDoc.head.appendChild(fixStyle);
                }
            } catch(e) {}
        }
    }
    document.getElementById('chat-modal-iframe').onload = fixChatboxTopIssue;

    function scrollChatToBottom() {
        var iframe = document.getElementById('chat-modal-iframe');
        if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
            var chatBox = iframe.contentWindow.document.getElementById('chatbox');
            if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
            try { iframe.contentWindow.scrollTo(0, iframe.contentWindow.document.body.scrollHeight); } catch(e) {}
        }
    }

    chatBtn.addEventListener('click', function(e) {
        if (!isChatLoaded) {
            document.getElementById('chat-modal-iframe').src = '/chatbox/index.forum';
            isChatLoaded = true; 
        }
        modalOverlay.style.display = 'flex'; 
        lastMsgBar.style.display = 'none'; 
        localStorage.setItem('chatBarVisible', '0'); 
        chatBtn.classList.remove('chat-new-msg-pulse'); 
        localStorage.setItem('chatHasNewMsg', '0');
        
        fixChatboxTopIssue();
        setTimeout(scrollChatToBottom, 200);
        setTimeout(scrollChatToBottom, 800);
        setTimeout(scrollChatToBottom, 1500);
    });

    lastMsgBar.addEventListener('click', function(e) {
        if (e.target.id !== 'close-chat-bar' && !e.target.closest('#close-chat-bar') && e.target.id !== 'sound-toggle-btn' && !e.target.closest('#sound-toggle-btn')) {
            chatBtn.click();
        }
    });

    document.getElementById('close-chat-bar').addEventListener('click', function(e) {
        e.stopPropagation(); 
        lastMsgBar.style.display = 'none';
        localStorage.setItem('chatBarVisible', '0'); 
    });

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            if(savedLastMsg || window.chatLastMsg) {
                lastMsgBar.style.display = 'flex';
                localStorage.setItem('chatBarVisible', '1'); 
            }
        }
    });

    setTimeout(function() {
        if (!isChatLoaded) {
            document.getElementById('chat-modal-iframe').src = '/chatbox/index.forum';
            isChatLoaded = true;
        }
    }, 2000);

    function processMsgHTML(htmlString) {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;

        var avatars = tempDiv.querySelectorAll('.cb-avatar img, .chatbox-avatar img, .user-avatar img, span[class*="avatar"] img');
        avatars.forEach(function(img) {
            img.setAttribute('style', 'width: 28px !important; height: 28px !important; max-width: 28px !important; max-height: 28px !important; border-radius: 50% !important; object-fit: cover !important; border: 2px solid #2563EB !important; vertical-align: middle !important; display: inline-block !important;');
        });

        var allImgs = tempDiv.querySelectorAll('img');
        allImgs.forEach(function(img) {
            if (!img.closest('.cb-avatar') && !img.closest('.chatbox-avatar') && !img.closest('.user-avatar') && !img.closest('span[class*="avatar"]')) {
                img.setAttribute('style', 'max-height: 22px !important; max-width: none !important; width: auto !important; height: auto !important; vertical-align: middle !important; display: inline-block !important; object-fit: contain !important; margin: 0 3px !important; border: none !important; box-shadow: none !important; padding: 0 !important;');
            }
        });

        return tempDiv.innerHTML;
    }

    function syncChatData() {
        if (!isChatLoaded) return;
        var iframe = document.getElementById('chat-modal-iframe');
        if (!iframe || !iframe.contentWindow || !iframe.contentWindow.document) return;
        
        fixChatboxTopIssue();
        
        try {
            var isChatConnected = iframe.contentWindow.connected;
            if (isChatConnected === false) {
                lastMsgBar.style.display = 'none';
                localStorage.setItem('chatBarVisible', '0');
                return; 
            }
        } catch(e) {}

        try {
            if (iframe.contentWindow.connected) iframe.contentWindow.ajax_refresh_chatbox('?archives=1', 1);
        } catch(e) {}
        
        var chatDoc = iframe.contentWindow.document;
        
        try {
            var onlineMembers = chatDoc.querySelectorAll('#chatbox_members .online-users li');
            var awayMembers = chatDoc.querySelectorAll('#chatbox_members .away-users li');
            
            var onlineList = document.getElementById('online-users-list');
            var awayList = document.getElementById('away-users-list');
            
            if(onlineList) {
                onlineList.innerHTML = '';
                if(onlineMembers.length > 0) {
                    onlineMembers.forEach(function(li) {
                        var user = li.textContent.trim();
                        if(user !== '') {
                            var liEl = document.createElement('li');
                            liEl.textContent = user;
                            onlineList.appendChild(liEl);
                        }
                    });
                } else {
                    onlineList.innerHTML = '<li>لا يوجد متصلين حالياً</li>';
                }
            }

            if(awayList) {
                awayList.innerHTML = '';
                if(awayMembers.length > 0) {
                    awayMembers.forEach(function(li) {
                        var user = li.textContent.trim();
                        if(user !== '') {
                            var liEl = document.createElement('li');
                            liEl.classList.add('away-user'); 
                            liEl.textContent = user;
                            awayList.appendChild(liEl);
                        }
                    });
                } else {
                    awayList.innerHTML = '<li>لا يوجد أعضاء في حالة غياب</li>';
                }
            }

        } catch(e) {}

        var countEl2 = chatDoc.getElementById('nb-users-connected');
        var badge = document.getElementById('chat-online-count');
        
        if (badge) {
            var currentCount2 = '0'; 
            if (countEl2) {
                var text = countEl2.innerText.trim();
                if (text && text !== '') currentCount2 = text;
            }
            badge.textContent = currentCount2;
            localStorage.setItem('chatOnlineCount', currentCount2);
            badge.className = currentCount2 === '0' ? 'empty' : 'active';
        }

        var messages = chatDoc.querySelectorAll('.chatbox_row_1, .chatbox_row_2');
        if (messages.length > 0) {
            var lastMsgEl = messages[messages.length - 1];
            var currentLastMsg = lastMsgEl.innerHTML; 
            
            if (!window.chatLastMsg) {
                var processedMsg = processMsgHTML(currentLastMsg);
                window.chatLastMsg = currentLastMsg;
                lastMsgBar.querySelector('.bar-content').innerHTML = processedMsg;
                localStorage.setItem('chatLastMsgHTML', processedMsg);
            } else if (currentLastMsg !== window.chatLastMsg) {
                var processedMsg = processMsgHTML(currentLastMsg);
                window.chatLastMsg = currentLastMsg;
                lastMsgBar.querySelector('.bar-content').innerHTML = processedMsg;
                localStorage.setItem('chatLastMsgHTML', processedMsg);
                
                var msgText = lastMsgEl.textContent.trim();
                lastMsgBar.classList.remove('flash-msg', 'flash-join', 'flash-leave');
                
                if (msgText.includes('التحق بالدردشة')) lastMsgBar.classList.add('flash-join');
                else if (msgText.includes('خرج')) lastMsgBar.classList.add('flash-leave');
                else lastMsgBar.classList.add('flash-msg');
                
                setTimeout(function() { lastMsgBar.classList.remove('flash-msg', 'flash-join', 'flash-leave'); }, 4000);

                var myName = '';
                if (typeof _userdata !== 'undefined' && _userdata.username) myName = _userdata.username.trim();
                
                var lastAuthor = '';
                var authorEl = lastMsgEl.querySelector('.chatbox-username a') || lastMsgEl.querySelector('a[href^="/u"]');
                if (authorEl) lastAuthor = authorEl.textContent.trim();
                var isMyMessage = (myName !== '' && lastAuthor !== '' && myName === lastAuthor);
                
                if (modalOverlay.style.display === 'none' && !isMyMessage) {
                    chatBtn.classList.add('chat-new-msg-pulse');
                    localStorage.setItem('chatHasNewMsg', '1');
                    lastMsgBar.style.display = 'flex';
                    localStorage.setItem('chatBarVisible', '1'); 

                    if (!isMuted) {
                        try { playCustomNotifSound(); } catch(e) {}
                    }

                    if (msgText.includes('@' + myName)) {
                        if ('Notification' in window && Notification.permission === 'granted') {
                            new Notification("دردشة المنتدى", { 
                                body: "تم ذكرك في الدردشة!", 
                                icon: "https://i.servimg.com/u/f00/20/00/00/00/chat_i10.png" 
                            });
                        }
                    }

                } 
                else if (modalOverlay.style.display !== 'none' && !isMyMessage) {
                    scrollChatToBottom();
                }
            }
        }
    }

    var chatSyncInterval;
    function startSyncing() { if (!chatSyncInterval) chatSyncInterval = setInterval(syncChatData, 1000); }
    function stopSyncing() { if (chatSyncInterval) { clearInterval(chatSyncInterval); chatSyncInterval = null; } }

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) stopSyncing();
        else { startSyncing(); syncChatData(); }
    });

    if (!document.hidden) { startSyncing(); setTimeout(syncChatData, 3000); }
});

/* ========== الكود الثاني عشر: أزرار محرر الردود (جميع الصفحات) ========== */
$(document).ready(function() {
    $('head').append(`<style>
        .a7la7ekaya-custom-audio-player {
            background-color: #f1f3f4;
            border-radius: 50px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            padding: 8px 12px;
            width: 100%;
            max-width: 400px;
            box-sizing: border-box;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            direction: ltr;
            margin: 10px 0;
            position: relative;
            line-height: normal;
        }
        .a7la7ekaya-controls-row {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            gap: 4px;
        }
        .a7la7ekaya-custom-audio-player .a7la7ekaya-icon-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px;
            outline: none;
            border-radius: 50%;
            transition: background-color .2s;
            box-shadow: none;
            margin: 0;
            color: #202124;
            flex-shrink: 0;
        }
        .a7la7ekaya-custom-audio-player .a7la7ekaya-icon-btn:hover {
            background-color: rgba(0,0,0,0.08);
        }
        .a7la7ekaya-custom-audio-player .a7la7ekaya-time-display {
            font-size: 13px;
            color: #444746;
            margin: 0 8px;
            min-width: 65px;
            text-align: center;
            user-select: none;
            flex-shrink: 0;
        }
        .a7la7ekaya-custom-audio-player input[type="range"].a7la7ekaya-Progress {
            -webkit-appearance: none;
            flex: 1 1 auto;
            min-width: 50px;
            height: 6px;
            background: linear-gradient(to right, #5f6368 0%, #dadce0 0%);
            border-radius: 3px;
            outline: none;
            margin: 0 8px;
            cursor: pointer;
            padding: 0;
            border: none;
        }
        .a7la7ekaya-custom-audio-player input[type="range"].a7la7ekaya-Progress::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background: #5f6368;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .a7la7ekaya-custom-audio-player input[type="range"].a7la7ekaya-Progress::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: #5f6368;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .a7la7ekaya-download-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            gap: 4px;
            margin-top: 6px;
        }
        .a7la7ekaya-download-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px;
            background-color: #2e7d32;
            color: #fff;
            border-radius: 20px;
            font-size: 11px;
            text-decoration: none;
            font-family: inherit;
            white-space: nowrap;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.15s;
            flex-shrink: 0;
        }
        .a7la7ekaya-download-btn:hover {
            background-color: #1b5e20;
            transform: scale(1.05);
        }
        .a7la7ekaya-copy-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px;
            background-color: #1565c0;
            color: #fff;
            border-radius: 20px;
            font-size: 11px;
            font-family: inherit;
            white-space: nowrap;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.15s;
            flex-shrink: 0;
        }
        .a7la7ekaya-copy-btn:hover {
            background-color: #0d47a1;
            transform: scale(1.05);
        }
        .a7la7ekaya-share-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px;
            background-color: #7b1fa2;
            color: #fff;
            border-radius: 20px;
            font-size: 11px;
            font-family: inherit;
            white-space: nowrap;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.15s;
            flex-shrink: 0;
        }
        .a7la7ekaya-share-btn:hover {
            background-color: #4a148c;
            transform: scale(1.05);
        }

        .a7la7ekaya-custom-video-player {
            background: #f1f3f4;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 640px;
            margin: 10px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            overflow: hidden;
            font-family: "Segoe UI", Tahoma, sans-serif;
        }
        .a7la7ekaya-custom-video-player video {
            width: 100%;
            display: block;
            background: #000;
        }
        .a7la7ekaya-video-controls {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 8px 12px;
            gap: 4px;
        }
        .a7la7ekaya-video-controls .a7la7ekaya-icon-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px;
            border-radius: 50%;
            color: #202124;
            transition: background 0.2s;
            flex-shrink: 0;
        }
        .a7la7ekaya-video-controls .a7la7ekaya-icon-btn:hover {
            background: rgba(0,0,0,0.08);
        }
        .a7la7ekaya-video-controls .a7la7ekaya-time-display {
            font-size: 13px;
            color: #444746;
            margin: 0 6px;
            min-width: 65px;
            text-align: center;
            flex-shrink: 0;
        }
        .a7la7ekaya-video-controls input[type="range"].a7la7ekaya-progressBar {
            flex: 1 1 auto;
            min-width: 50px;
            height: 6px;
            -webkit-appearance: none;
            background: linear-gradient(to right, #5f6368 0%, #dadce0 0%);
            border-radius: 3px;
            outline: none;
            cursor: pointer;
            margin: 0 6px;
        }
        .a7la7ekaya-video-controls input[type="range"].a7la7ekaya-progressBar::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background: #5f6368;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .a7la7ekaya-video-controls input[type="range"].a7la7ekaya-progressBar::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: #5f6368;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .a7la7ekaya-video-download-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            gap: 4px;
            padding: 0 12px 8px;
        }
        .a7la7ekaya-video-download-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px;
            background-color: #2e7d32;
            color: #fff;
            border-radius: 20px;
            font-size: 11px;
            text-decoration: none;
            font-family: inherit;
            white-space: nowrap;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.15s;
            flex-shrink: 0;
        }
        .a7la7ekaya-video-download-btn:hover {
            background-color: #1b5e20;
            transform: scale(1.05);
        }
        .a7la7ekaya-video-copy-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px;
            background-color: #1565c0;
            color: #fff;
            border-radius: 20px;
            font-size: 11px;
            font-family: inherit;
            white-space: nowrap;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.15s;
            flex-shrink: 0;
        }
        .a7la7ekaya-video-copy-btn:hover {
            background-color: #0d47a1;
            transform: scale(1.05);
        }
        .a7la7ekaya-video-share-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px;
            background-color: #7b1fa2;
            color: #fff;
            border-radius: 20px;
            font-size: 11px;
            font-family: inherit;
            white-space: nowrap;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.15s;
            flex-shrink: 0;
        }
        .a7la7ekaya-video-share-btn:hover {
            background-color: #4a148c;
            transform: scale(1.05);
        }

        .a7la7ekaya-share-popup {
            display: none;
            position: absolute;
            z-index: 999999;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            padding: 12px;
            width: 260px;
            max-width: 90vw;
            direction: rtl;
            text-align: right;
            font-family: Tahoma, sans-serif;
        }
        .a7la7ekaya-share-popup input[type="text"] {
            width: 100%;
            padding: 6px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 12px;
            direction: ltr;
            margin-bottom: 8px;
            box-sizing: border-box;
        }
        .a7la7ekaya-share-popup button {
            background: #e0e0e0;
            border: 1px solid #ccc;
            padding: 4px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            margin-left: 4px;
        }

        .postbg-custom {
            background-size: cover;
            background-position: center top;
            padding: 20px;
            border-radius: 10px;
            color: #000;
            position: relative;
            z-index: 1;
        }
        .bb-blur { filter: blur(2px); display: inline-block; }
        .bb-flipv { display: inline-block; transform: scaleY(-1); }
        table.gdwl {
            border: 1px solid #aaa;
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 8px;
            overflow: hidden;
        }
        table.gdwl td {
            padding: 10px;
            background: #f9f9f9;
        }

        @media (max-width: 400px) {
            .a7la7ekaya-custom-audio-player {
                padding: 6px 8px;
            }
            .a7la7ekaya-custom-audio-player .a7la7ekaya-time-display {
                font-size: 11px;
                min-width: 55px;
                margin: 0 4px;
            }
            .a7la7ekaya-custom-audio-player .a7la7ekaya-icon-btn {
                padding: 4px;
            }
            .a7la7ekaya-custom-audio-player input[type="range"].a7la7ekaya-Progress {
                margin: 0 4px;
            }
            .a7la7ekaya-download-btn,
            .a7la7ekaya-copy-btn,
            .a7la7ekaya-share-btn {
                padding: 3px 8px;
                font-size: 10px;
            }
            .a7la7ekaya-download-row {
                gap: 3px;
            }

            .a7la7ekaya-video-controls {
                padding: 6px 8px;
                gap: 3px;
            }
            .a7la7ekaya-video-controls .a7la7ekaya-time-display {
                font-size: 11px;
                min-width: 55px;
                margin: 0 4px;
            }
            .a7la7ekaya-video-controls .a7la7ekaya-icon-btn {
                padding: 4px;
            }
            .a7la7ekaya-video-download-btn,
            .a7la7ekaya-video-copy-btn,
            .a7la7ekaya-video-share-btn {
                padding: 3px 8px;
                font-size: 10px;
            }
            .a7la7ekaya-video-download-row {
                gap: 3px;
                padding: 0 8px 6px;
            }
        }
    </style>`);

    var svgPlay = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    var svgPause = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    var svgVol = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    var svgMute = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
    var svgDots = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>';
    var mp3IconBtn = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
    var videoIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>';
    var postbgIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';
    var usernameIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
    var blurIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M15.5 2l1.5 4.5L21.5 8l-4.5 1.5L15.5 14 14 9.5 9.5 8l4.5-1.5z"/></svg>';
    var frameIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"/></svg>';
    var flipvIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M12 4l-6 6h4v8h4v-8h4zM12 20l6-6h-4V6h-4v8H8z"/></svg>';
    var imglinkIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';

    function createButton(className, title, iconSvg) {
        return '<a class="sceditor-button ' + className + '" unselectable="on" title="' + title + '"><div unselectable="on" style="display:flex; align-items:center; justify-content:center; height:100%; background:none!important;">' + iconSvg + '</div></a>';
    }

    var editorInterval = setInterval(function() {
        var $toolbar = $('.sceditor-toolbar');
        if ($toolbar.length > 0) {
            var buttons = [];
            if (!$('.sceditor-button-a7la7ekaya-audio').length) buttons.push({ class: 'sceditor-button-a7la7ekaya-audio', title: 'مقطع صوتي', icon: mp3IconBtn });
            if (!$('.sceditor-button-a7la7ekaya-video').length) buttons.push({ class: 'sceditor-button-a7la7ekaya-video', title: 'فيديو', icon: videoIcon });
            if (!$('.sceditor-button-a7la7ekaya-postbg').length) buttons.push({ class: 'sceditor-button-a7la7ekaya-postbg', title: 'خلفية الرد', icon: postbgIcon });
            if (!$('.sceditor-button-a7la7ekaya-username').length) buttons.push({ class: 'sceditor-button-a7la7ekaya-username', title: 'اسم العضو', icon: usernameIcon });
            if (!$('.sceditor-button-a7la7ekaya-blur').length) buttons.push({ class: 'sceditor-button-a7la7ekaya-blur', title: 'نص مشع', icon: blurIcon });
            if (!$('.sceditor-button-a7la7ekaya-frame').length) buttons.push({ class: 'sceditor-button-a7la7ekaya-frame', title: 'إطار', icon: frameIcon });
            if (!$('.sceditor-button-a7la7ekaya-flipv').length) buttons.push({ class: 'sceditor-button-a7la7ekaya-flipv', title: 'قلب النص', icon: flipvIcon });
            if (!$('.sceditor-button-a7la7ekaya-imglink').length) buttons.push({ class: 'sceditor-button-a7la7ekaya-imglink', title: 'صورة برابط', icon: imglinkIcon });

            if (buttons.length) {
                var $after = $('.sceditor-button-youtube');
                if (!$after.length) $after = $('.sceditor-button-emoticon');
                if ($after.length) {
                    $.each(buttons, function(i, btn) {
                        $after.after(createButton(btn.class, btn.title, btn.icon));
                        $after = $('.' + btn.class);
                    });
                } else {
                    $.each(buttons, function(i, btn) {
                        $toolbar.find('.sceditor-group:last').append(createButton(btn.class, btn.title, btn.icon));
                    });
                }
            }
            clearInterval(editorInterval);
        }
    }, 500);

    $('body').append('<div id="audio-popup" style="display:none;position:absolute;z-index:999999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 15px rgba(0,0,0,0.15);padding:12px;width:220px;max-width:90vw;direction:rtl;text-align:right;font-family:Tahoma;"><div style="margin-bottom:8px;font-weight:bold;">رابط الصوت:</div><input type="text" id="audio-url" value="https://" style="width:100%;padding:5px;border:1px solid #ddd;border-radius:3px;direction:ltr;margin-bottom:10px;"><button type="button" id="audio-insert" style="background:#e0e0e0;color:#333;border:1px solid #ccc;padding:5px 15px;border-radius:3px;cursor:pointer;">إدراج</button></div>');
    $('body').append('<div id="video-popup" style="display:none;position:absolute;z-index:999999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 15px rgba(0,0,0,0.15);padding:12px;width:240px;max-width:90vw;direction:rtl;text-align:right;font-family:Tahoma;"><div style="margin-bottom:8px;font-weight:bold;">رابط الفيديو:</div><input type="text" id="video-url" value="https://" style="width:100%;padding:5px;border:1px solid #ddd;border-radius:3px;direction:ltr;margin-bottom:8px;"><div style="margin-bottom:6px;">العرض: <input type="number" id="video-width" value="640" style="width:70px;padding:3px;border:1px solid #ddd;border-radius:3px;text-align:center;"></div><div style="margin-bottom:10px;">الارتفاع: <input type="number" id="video-height" value="360" style="width:70px;padding:3px;border:1px solid #ddd;border-radius:3px;text-align:center;"></div><button type="button" id="video-insert" style="background:#e0e0e0;color:#333;border:1px solid #ccc;padding:5px 15px;border-radius:3px;cursor:pointer;">إدراج</button></div>');
    $('body').append('<div id="imglink-popup" style="display:none;position:absolute;z-index:999999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 15px rgba(0,0,0,0.15);padding:12px;width:260px;max-width:90vw;direction:rtl;text-align:right;font-family:Tahoma;"><div style="font-weight:bold;margin-bottom:5px;">رابط الصورة:</div><input type="text" id="img-url" value="https://" style="width:100%;padding:5px;border:1px solid #ddd;border-radius:3px;direction:ltr;margin-bottom:8px;"><div style="font-weight:bold;margin-bottom:5px;">رابط التوجيه:</div><input type="text" id="link-url" value="https://" style="width:100%;padding:5px;border:1px solid #ddd;border-radius:3px;direction:ltr;margin-bottom:8px;"><div style="margin-bottom:8px;">العرض (اختياري): <input type="number" id="img-width" placeholder="px" style="width:70px;padding:3px;border:1px solid #ddd;border-radius:3px;text-align:center;"></div><button type="button" id="imglink-insert" style="background:#e0e0e0;color:#333;border:1px solid #ccc;padding:5px 15px;border-radius:3px;cursor:pointer;">إدراج</button></div>');
    var bglist = ["https://i.servimg.com/u/f55/14/83/59/48/daqtda10.gif","https://i.servimg.com/u/f55/14/83/59/48/pftcnq10.png","https://i.servimg.com/u/f55/14/83/59/48/lruwov10.png","https://i.servimg.com/u/f55/14/83/59/48/ehp45h10.png","https://i.servimg.com/u/f39/14/83/59/48/bg1310.jpg","https://i.servimg.com/u/f39/14/83/59/48/rip_jo10.png"];
    $('body').append('<div id="postbg-popup" style="display:none;position:absolute;z-index:999999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 15px rgba(0,0,0,0.15);padding:10px;width:300px;max-width:90vw;direction:rtl;text-align:center;"><div style="font-weight:bold;margin-bottom:5px;">اختر الخلفية:</div><div id="bg-thumbs" style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;"></div></div>');
    $.each(bglist, function(i, url) { $('#bg-thumbs').append('<img src="'+url+'" style="width:60px;height:40px;object-fit:cover;cursor:pointer;border:2px solid #eee;border-radius:3px;" data-bg="'+url+'">'); });

    $('body').append('<div id="a7la7ekaya-share-popup" class="a7la7ekaya-share-popup"><div style="font-weight:bold;margin-bottom:5px;">رابط المشاركة:</div><input type="text" id="share-url-input" readonly><div style="text-align:left;margin-top:8px;"><button type="button" id="share-copy-btn">نسخ</button><button type="button" id="share-close-btn">إغلاق</button></div></div>');

    function togglePopup(btnSel, popupSel) {
        $(document).on('click', btnSel, function(e) {
            e.preventDefault(); e.stopPropagation();
            var $btn = $(this), $popup = $(popupSel);
            var off = $btn.offset();
            $popup.css({ top: off.top + $btn.outerHeight() + 5, left: off.left - $popup.outerWidth()/2 + $btn.outerWidth()/2 }).fadeToggle(100);
        });
    }
    togglePopup('.sceditor-button-a7la7ekaya-audio', '#audio-popup');
    togglePopup('.sceditor-button-a7la7ekaya-video', '#video-popup');
    togglePopup('.sceditor-button-a7la7ekaya-imglink', '#imglink-popup');
    togglePopup('.sceditor-button-a7la7ekaya-postbg', '#postbg-popup');

    $(document).on('mousedown', function(e) {
        if (!$(e.target).closest('#audio-popup,.sceditor-button-a7la7ekaya-audio').length) $('#audio-popup').fadeOut(100);
        if (!$(e.target).closest('#video-popup,.sceditor-button-a7la7ekaya-video').length) $('#video-popup').fadeOut(100);
        if (!$(e.target).closest('#imglink-popup,.sceditor-button-a7la7ekaya-imglink').length) $('#imglink-popup').fadeOut(100);
        if (!$(e.target).closest('#postbg-popup,.sceditor-button-a7la7ekaya-postbg').length) $('#postbg-popup').fadeOut(100);
        if (!$(e.target).closest('#a7la7ekaya-share-popup,.a7la7ekaya-share-btn,.a7la7ekaya-video-share-btn').length) $('#a7la7ekaya-share-popup').fadeOut(100);
    });

    function getSceditor() { return $('#text_editor_textarea').sceditor('instance'); }
    $(document).on('click', '#audio-insert', function(e) {
        e.preventDefault();
        var url = $('#audio-url').val().trim();
        var inst = getSceditor();
        if (inst && url && url !== 'https://' && url.length > 5) inst.insert('[audio]*'+url+'*[/audio]');
        $('#audio-popup').fadeOut(100);
    });
    $(document).on('click', '#video-insert', function(e) {
        e.preventDefault();
        var url = $('#video-url').val().trim();
        var w = $('#video-width').val() || 640, h = $('#video-height').val() || 360;
        var inst = getSceditor();
        if (inst && url && url !== 'https://' && url.length > 5) inst.insert('[video width='+w+' height='+h+']*'+url+'*[/video]');
        $('#video-popup').fadeOut(100);
    });
    $(document).on('click', '#imglink-insert', function(e) {
        e.preventDefault();
        var img = $('#img-url').val().trim(), link = $('#link-url').val().trim(), w = $('#img-width').val();
        var inst = getSceditor();
        if (inst && img && img !== 'https://' && link && link !== 'https://') {
            var dim = w ? '('+w+'px,'+w+'px)' : '';
            inst.insert('[url='+link+'][img'+dim+']'+img+'[/img][/url]');
        }
        $('#imglink-popup').fadeOut(100);
    });
    $(document).on('click', '#bg-thumbs img', function(e) {
        e.preventDefault();
        var bg = $(this).data('bg');
        var inst = getSceditor();
        if (inst) inst.insert('[postbg='+bg+']', '[/postbg]');
        $('#postbg-popup').fadeOut(100);
    });
    $(document).on('click', '.sceditor-button-a7la7ekaya-username', function(e) { e.preventDefault(); var i=getSceditor(); if(i)i.insert('{USERNAME}'); });
    $(document).on('click', '.sceditor-button-a7la7ekaya-blur', function(e) { e.preventDefault(); var i=getSceditor(); if(i)i.insert('[blur]','[/blur]'); });
    $(document).on('click', '.sceditor-button-a7la7ekaya-frame', function(e) { e.preventDefault(); var i=getSceditor(); if(i)i.insert('[table class=gdwl][tr][td]','[/td][/tr][/table]'); });
    $(document).on('click', '.sceditor-button-a7la7ekaya-flipv', function(e) { e.preventDefault(); var i=getSceditor(); if(i)i.insert('[flipv]','[/flipv]'); });

    function parseBBCodes() {
        $('.content,.postbody .content,.post-content,.post-body').each(function() {
            var $el = $(this);
            if ($el.attr('data-parsed') === '1') return;
            var html = $el.html();
            if (!html) return;
            var changed = false;

            html = html.replace(/\[audio\](.*?)\[\/audio\]/gi, function(m, content) {
                changed = true;
                var url = $('<div>').html(content).text().replace(/\*/g,'').trim().match(/(https?:\/\/[^\s"'<]+)/);
                url = url ? url[1] : '';
                if (!url) return m;
                return '<div class="a7la7ekaya-custom-audio-player">'+
                    '<audio class="a7la7ekaya-myAudio" src="'+url+'" preload="metadata"></audio>'+
                    '<div class="a7la7ekaya-controls-row">'+
                        '<button type="button" class="a7la7ekaya-icon-btn a7la7ekaya-PlayPauseBtn">'+svgPlay+'</button>'+
                        '<div class="a7la7ekaya-time-display"><span class="a7la7ekaya-CurrentTime">0:00</span> / <span class="a7la7ekaya-Duration">0:00</span></div>'+
                        '<input type="range" class="a7la7ekaya-Progress" value="0" max="100" step="0.1"/>'+
                        '<button type="button" class="a7la7ekaya-MuteBtn a7la7ekaya-icon-btn">'+svgVol+'</button>'+
                    '</div>'+
                    '<div class="a7la7ekaya-download-row">'+
                        '<a href="'+url+'" download target="_blank" class="a7la7ekaya-download-btn">تحميل المقطع</a>'+
                        '<button type="button" class="a7la7ekaya-copy-btn" data-url="'+url+'">نسخ الرابط</button>'+
                        '<button type="button" class="a7la7ekaya-share-btn" data-url="'+url+'">مشاركة</button>'+
                    '</div>'+
                '</div>';
            });

            html = html.replace(/\[video width=(\d+) height=(\d+)\]\*?(.*?)\*?\[\/video\]/gi, function(m, w, h, url) {
                changed = true;
                url = url.replace(/\*/g,'').trim();
                return '<div class="a7la7ekaya-custom-video-player">'+
                    '<video class="a7la7ekaya-myVideo" src="'+url+'" preload="metadata" width="'+w+'" height="'+h+'"></video>'+
                    '<div class="a7la7ekaya-video-controls">'+
                        '<button type="button" class="a7la7ekaya-icon-btn a7la7ekaya-videoPlayPauseBtn">'+svgPlay+'</button>'+
                        '<div class="a7la7ekaya-time-display"><span class="a7la7ekaya-videoCurrentTime">0:00</span> / <span class="a7la7ekaya-videoDuration">0:00</span></div>'+
                        '<input type="range" class="a7la7ekaya-progressBar a7la7ekaya-videoProgress" value="0" max="100" step="0.1"/>'+
                        '<button type="button" class="a7la7ekaya-icon-btn a7la7ekaya-videoMuteBtn">'+svgVol+'</button>'+
                    '</div>'+
                    '<div class="a7la7ekaya-video-download-row">'+
                        '<a href="'+url+'" download target="_blank" class="a7la7ekaya-video-download-btn">تحميل المقطع</a>'+
                        '<button type="button" class="a7la7ekaya-video-copy-btn" data-url="'+url+'">نسخ الرابط</button>'+
                        '<button type="button" class="a7la7ekaya-video-share-btn" data-url="'+url+'">مشاركة</button>'+
                    '</div>'+
                '</div>';
            });

            html = html.replace(/\[postbg=(.*?)\](.*?)\[\/postbg\]/gs, function(m, bg, txt) { changed = true; return '<div class="postbg-custom" style="background-image:url('+bg+');">'+txt+'</div>'; });
            html = html.replace(/\[blur\](.*?)\[\/blur\]/g, '<span class="bb-blur">$1</span>');
            if (/\[blur\]/.test(html)) changed = true;
            html = html.replace(/\[flipv\](.*?)\[\/flipv\]/g, '<span class="bb-flipv">$1</span>');
            if (/\[flipv\]/.test(html)) changed = true;
            html = html.replace(/\[table class=gdwl\]\[tr\]\[td\](.*?)\[\/td\]\[\/tr\]\[\/table\]/gs, '<table class="gdwl"><tr><td>$1</td></tr></table>');
            if (/\[table class=gdwl\]/.test(html)) changed = true;

            if (changed) $el.html(html);
            $el.attr('data-parsed', '1');
        });
    }

    function formatTime(s) { if(isNaN(s)||!isFinite(s)) return "0:00"; var m=Math.floor(s/60), sec=Math.floor(s%60); return m+':'+(sec<10?'0':'')+sec; }

    function bindControls(selector, type) {
        var isVid = type==='video', prefix = isVid?'video':'';
        $(document).on('loadedmetadata', selector+' .a7la7ekaya-my'+(isVid?'Video':'Audio'), function() {
            $(this).closest(selector).find('.a7la7ekaya-'+prefix+'Duration').text(formatTime(this.duration));
        });
        $(document).on('click', selector+' .a7la7ekaya-'+prefix+'PlayPauseBtn', function(e) {
            e.preventDefault(); e.stopPropagation();
            var $p = $(this).closest(selector), media = $p.find(isVid?'video':'audio')[0];
            if (!media) return;
            if (media.paused) {
                $((isVid?'video':'audio')+'.a7la7ekaya-my'+(isVid?'Video':'Audio')).each(function() { if(this!==media && !this.paused){ this.pause(); $(this).closest(selector).find('.a7la7ekaya-'+prefix+'PlayPauseBtn').html(svgPlay); } });
                media.play(); $(this).html(svgPause);
            } else { media.pause(); $(this).html(svgPlay); }
        });
        $(document).on('timeupdate', selector+' .a7la7ekaya-my'+(isVid?'Video':'Audio'), function() {
            var $p = $(this).closest(selector), cur = this.currentTime, dur = this.duration||1, perc = (cur/dur)*100;
            $p.find('.a7la7ekaya-'+prefix+'CurrentTime').text(formatTime(cur));
            var prog = $p.find('.a7la7ekaya-'+prefix+'Progress');
            prog.val(perc); prog.css('background','linear-gradient(to right, #5f6368 '+perc+'%, #dadce0 '+perc+'%)');
        });
        $(document).on('ended', selector+' .a7la7ekaya-my'+(isVid?'Video':'Audio'), function() {
            var $p = $(this).closest(selector); $p.find('.a7la7ekaya-'+prefix+'PlayPauseBtn').html(svgPlay);
            $p.find('.a7la7ekaya-'+prefix+'Progress').val(0).css('background','linear-gradient(to right, #5f6368 0%, #dadce0 0%)');
        });
        $(document).on('input', selector+' .a7la7ekaya-'+prefix+'Progress', function() {
            var $p = $(this).closest(selector), media = $p.find(isVid?'video':'audio')[0];
            if(media && media.duration) media.currentTime = ($(this).val()/100)*media.duration;
        });
        $(document).on('click', selector+' .a7la7ekaya-'+prefix+'MuteBtn', function(e) {
            e.preventDefault(); e.stopPropagation();
            var $p = $(this).closest(selector), media = $p.find(isVid?'video':'audio')[0];
            if(media){ media.muted=!media.muted; $(this).html(media.muted?svgMute:svgVol); }
        });
    }
    bindControls('.a7la7ekaya-custom-audio-player','audio');
    bindControls('.a7la7ekaya-custom-video-player','video');

    $(document).on('click', '.a7la7ekaya-copy-btn, .a7la7ekaya-video-copy-btn', function(e) {
        e.preventDefault();
        var url = $(this).data('url');
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function() {
                var $btn = $(e.target);
                var origText = $btn.text();
                $btn.text('تم النسخ!');
                setTimeout(function() { $btn.text(origText); }, 1500);
            }).catch(function() {
                alert('فشل النسخ. الرجاء المحاولة يدويًا.');
            });
        } else {
            var textarea = document.createElement('textarea');
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                var $btn = $(e.target);
                var origText = $btn.text();
                $btn.text('تم النسخ!');
                setTimeout(function() { $btn.text(origText); }, 1500);
            } catch (err) {
                alert('فشل النسخ.');
            }
            document.body.removeChild(textarea);
        }
    });

    $(document).on('click', '.a7la7ekaya-share-btn, .a7la7ekaya-video-share-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var url = $(this).data('url');
        var $btn = $(this);
        var $popup = $('#a7la7ekaya-share-popup');
        $('#share-url-input').val(url);
        var off = $btn.offset();
        $popup.css({
            top: off.top + $btn.outerHeight() + 5,
            left: off.left - $popup.outerWidth()/2 + $btn.outerWidth()/2
        }).fadeIn(100);
    });

    $(document).on('click', '#share-copy-btn', function(e) {
        e.preventDefault();
        var url = $('#share-url-input').val();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function() {
                alert('تم نسخ الرابط!');
            }).catch(function() {
                alert('فشل النسخ.');
            });
        } else {
            var textarea = document.createElement('textarea');
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            try { document.execCommand('copy'); alert('تم نسخ الرابط!'); } catch (err) { alert('فشل النسخ.'); }
            document.body.removeChild(textarea);
        }
    });

    $(document).on('click', '#share-close-btn', function(e) {
        e.preventDefault();
        $('#a7la7ekaya-share-popup').fadeOut(100);
    });

    parseBBCodes();
    setInterval(function() {
        $('.content,.postbody .content,.post-content,.post-body').each(function() {
            if ($(this).html() && /\[audio\]|\[video\]|\[postbg\]|\[blur\]|\[flipv\]|\[table class=gdwl\]/i.test($(this).html()))
                $(this).removeAttr('data-parsed');
        });
        parseBBCodes();
    }, 2000);
    $(document).ajaxComplete(function() {
        setTimeout(function() {
            $('.content,.postbody .content,.post-content,.post-body').each(function() {
                if ($(this).html() && /\[audio\]|\[video\]|\[postbg\]|\[blur\]|\[flipv\]|\[table class=gdwl\]/i.test($(this).html()))
                    $(this).removeAttr('data-parsed');
            });
            parseBBCodes();
        }, 300);
    });
    window.reparseCustom = function() { $('.content,.postbody .content,.post-content,.post-body').removeAttr('data-parsed'); parseBBCodes(); };
});
