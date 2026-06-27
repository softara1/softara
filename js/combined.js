/* ========== الكود الأول: ألوان المشاركة ========== */
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

/* ========== الكود الثاني: إخفاء وإظهار القائمة الجانبية ========== */
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

/* ========== الكود الثالث: آخر مواضيعي ========== */
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

/* ========== الكود الرابع: غلاف الموضوع العلوي ========== */
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

/* ========== الكود الخامس: نسخ الأكواد ========== */
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
