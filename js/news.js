$(function getNews() {
    // ========== الإعدادات (قابلة للتعديل بالكامل) ==========
    var lastNewsTitle = 'أخبارنا',
        numberOfNews = '10',           // عدد الأخبار الظاهرة
        speedOfNews = '30',           // سرعة الحركة (أقل = أسرع)
        newsLinkColor = '#1565C0',    // لون روابط الأخبار
        feedMode = 'topics',          // 'topics' للمواضيع الجديدة، 'posts' لأحدث المشاركات
        refreshInterval = 60000,      // تحديث كل 60 ثانية (بالمللي ثانية)
        separateImg = 'https://github.com/softara1/softara/releases/download/1/favicon.ico',
        newsLocation = '.newsLocation';

    // ========== تحميل الخطوط ==========
    if (!document.querySelector('link[href*="Cairo"]')) {
        var cairoLink = document.createElement('link');
        cairoLink.rel = 'stylesheet';
        cairoLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap';
        document.head.appendChild(cairoLink);
    }
    if (
        !document.querySelector('link[href*="font-awesome"]') &&
        !document.querySelector('link[href*="fontawesome"]') &&
        !document.querySelector('link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]')
    ) {
        var faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // ========== منع التكرار ==========
    var target = document.querySelector(newsLocation);
    if (!target || target.querySelector('.kh-lastNewsContainer')) {
        return;
    }

    // ========== إنشاء الهيكل ==========
    var lastNewsContainer = document.createElement("DIV");
    lastNewsContainer.className = "kh-lastNewsContainer";
    lastNewsContainer.innerHTML =
        '<div class="kh-lastNewsTitle">' +
            '<i class="fas fa-newspaper"></i> <span>' + lastNewsTitle + '</span>' +
        '</div>' +
        '<div class="kh-lastNewsItems-wrap" id="kh-marquee-wrap">' +
            '<div class="kh-lastNewsItems kh-news-marquee"></div>' +
        '</div>';

    target.appendChild(lastNewsContainer);

    // ========== دالة جلب الأخبار وتحديث الشريط (بدون jQuery) ==========
    function fetchAndUpdateNews() {
        var feedUrl = '/feed/';  // يجلب كل مواضيع المنتدى العامة
        if (feedMode === 'posts') {
            feedUrl += '?mode=posts';  // لآخر المشاركات
        }
        // إضافة متغير عشوائي لمنع الكاش
        feedUrl += (feedUrl.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();

        var xhr = new XMLHttpRequest();
        xhr.open('GET', feedUrl, true);
        xhr.timeout = 8000;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var marqueeContainer = document.querySelector('.kh-lastNewsItems');
                if (!marqueeContainer) return;

                if (xhr.status === 200) {
                    try {
                        var parser = new DOMParser();
                        var xml = parser.parseFromString(xhr.responseText, 'text/xml');
                        var items = xml.getElementsByTagName('item');

                        marqueeContainer.innerHTML = '';

                        if (items.length > 0) {
                            var limit = Math.min(parseInt(numberOfNews, 10), items.length);
                            for (var i = 0; i < limit; i++) {
                                var item = items[i];
                                var linkNode = item.getElementsByTagName('link')[0];
                                var titleNode = item.getElementsByTagName('title')[0];
                                var link = linkNode ? linkNode.textContent : '#';
                                var title = titleNode ? titleNode.textContent : '';

                                var block = document.createElement('SPAN');
                                block.className = 'kh-lastNewsBlock';
                                block.innerHTML =
                                    '<a href="' + link + '" class="kh-lastNews">' + title + '</a>' +
                                    '<img src="' + separateImg + '" class="kh-separateImg" alt="" />';
                                marqueeContainer.appendChild(block);
                            }
                        } else {
                            var fallback = document.createElement('SPAN');
                            fallback.className = 'kh-lastNewsBlock';
                            fallback.innerHTML =
                                '<a href="#" class="kh-lastNews">لا توجد أخبار حالياً</a>' +
                                '<img src="' + separateImg + '" class="kh-separateImg" alt="" />';
                            marqueeContainer.appendChild(fallback);
                        }
                    } catch (e) {
                        if (!marqueeContainer.children.length) {
                            marqueeContainer.innerHTML =
                                '<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">تعذر تحليل الخلاصة</a></span>';
                        }
                    }
                } else {
                    if (!marqueeContainer.children.length) {
                        marqueeContainer.innerHTML =
                            '<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">تعذر تحميل الأخبار</a></span>';
                    }
                }
            }
        };

        xhr.ontimeout = function() {
            var marqueeContainer = document.querySelector('.kh-lastNewsItems');
            if (marqueeContainer && !marqueeContainer.children.length) {
                marqueeContainer.innerHTML =
                    '<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">انتهت مهلة الاتصال بالخلاصة</a></span>';
            }
        };

        xhr.send();
    }

    // ========== تحميل الأخبار عند فتح الصفحة ==========
    fetchAndUpdateNews();

    // ========== تحديث تلقائي كل دقيقة ==========
    setInterval(fetchAndUpdateNews, refreshInterval);

    // ========== إيقاف الشريط باللمس على الهاتف (بدون jQuery) ==========
    document.addEventListener('touchstart', function(e) {
        var wrap = e.target.closest('#kh-marquee-wrap');
        if (!wrap) return;

        var marquee = wrap.querySelector('.kh-lastNewsItems');
        if (!marquee) return;

        marquee.style.animationPlayState = 'paused';

        if (wrap._resumeTimer) {
            clearTimeout(wrap._resumeTimer);
        }

        wrap._resumeTimer = setTimeout(function() {
            var m = wrap.querySelector('.kh-lastNewsItems');
            if (m) {
                m.style.animationPlayState = 'running';
            }
        }, 3000);
    });

    // ========== التنسيقات الداخلية (CSS) ==========
    var newsStyle = document.createElement('STYLE');
    newsStyle.innerHTML = `
        .kh-lastNewsContainer,
        .kh-lastNewsContainer * {
            font-family: 'Cairo', sans-serif !important;
        }

        .kh-lastNewsContainer {
            display: flex;
            align-items: stretch;
            width: 100%;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            overflow: hidden;
            margin: 20px 0;
            direction: rtl;
            box-sizing: border-box;
        }

        .kh-lastNewsTitle {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 20px;
            background: #1e73be;
            color: #fff;
            font-weight: 700;
            font-size: 18px;
            white-space: nowrap;
            flex-shrink: 0;
            z-index: 2;
        }
        .kh-lastNewsTitle i {
            font-size: 20px;
        }

        .kh-lastNewsItems-wrap {
            flex: 1;
            overflow: hidden;
            background: #f0f6fb;
            display: flex;
            align-items: center;
            padding: 12px 0;
        }

        .kh-lastNewsItems {
            display: inline-block;
            padding-right: 100%;
            white-space: nowrap;
            will-change: transform;
            animation: kh-marquee ${speedOfNews}s linear infinite;
        }

        .kh-lastNews {
            display: inline-block;
            vertical-align: middle;
            color: ${newsLinkColor} !important;
            text-decoration: none !important;
            font-size: 16px;
            font-weight: 600;
            transition: color 0.2s;
        }
        .kh-lastNews:hover {
            color: #0D47A1 !important;
            text-decoration: underline !important;
        }

        .kh-separateImg {
            display: inline-block;
            vertical-align: middle;
            margin: 0 15px;
            width: 18px;
            height: 18px;
        }

        .kh-lastNewsBlock:last-child .kh-separateImg {
            display: none;
        }

        .kh-lastNewsItems-wrap:hover .kh-lastNewsItems {
            animation-play-state: paused;
        }

        @keyframes kh-marquee {
            0% { transform: translate(0, 0); }
            100% { transform: translate(100%, 0); }
        }

        @media (max-width: 600px) {
            .kh-lastNewsTitle {
                font-size: 15px;
                padding: 10px 14px;
            }
            .kh-lastNews {
                font-size: 14px;
            }
            .kh-separateImg {
                margin: 0 10px;
                width: 16px;
                height: 16px;
            }
        }
    `;
    document.head.appendChild(newsStyle);
});
