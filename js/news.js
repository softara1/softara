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
    if (!document.querySelector('link[href*="font-awesome"]') && !document.querySelector('link[href*="fontawesome"]')) {
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

    // ========== دالة جلب الأخبار وتحديث الشريط ==========
    function fetchAndUpdateNews() {
        var feedUrl = '/feed/';  // يجلب كل مواضيع المنتدى العامة
        if (feedMode === 'posts') {
            feedUrl += '?mode=posts';  // لآخر المشاركات
        }
        // إضافة متغير عشوائي لمنع الكاش
        feedUrl += (feedUrl.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();

        $.ajax({
            url: feedUrl,
            dataType: 'xml',
            timeout: 8000,
            success: function(xml) {
                var items = $(xml).find('item');
                var marqueeContainer = $('.kh-lastNewsItems');
                if (!marqueeContainer.length) return;

                marqueeContainer.empty(); // تفريغ المحتوى السابق

                if (items.length > 0) {
                    var limit = Math.min(numberOfNews, items.length);
                    for (var i = 0; i < limit; i++) {
                        var item = items[i],
                            link = $(item).find('link').text(),
                            title = $(item).find('title').text();

                        var block = document.createElement('SPAN');
                        block.className = 'kh-lastNewsBlock';
                        block.innerHTML =
                            '<a href="' + link + '" class="kh-lastNews">' + title + '</a>' +
                            '<img src="' + separateImg + '" class="kh-separateImg" alt="" />';
                        marqueeContainer.append(block);
                    }
                } else {
                    // محتوى افتراضي إذا كانت الخلاصة فارغة
                    var fallback = document.createElement('SPAN');
                    fallback.className = 'kh-lastNewsBlock';
                    fallback.innerHTML = '<a href="#" class="kh-lastNews">لا توجد أخبار حالياً</a>' +
                                          '<img src="' + separateImg + '" class="kh-separateImg" alt="" />';
                    marqueeContainer.append(fallback);
                }
            },
            error: function() {
                // في حال فشل جلب الخلاصة، نعرض نصاً احتياطياً
                var marqueeContainer = $('.kh-lastNewsItems');
                if (marqueeContainer.length && !marqueeContainer.children().length) {
                    marqueeContainer.html('<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">تعذر تحميل الأخبار</a></span>');
                }
            }
        });
    }

    // ========== تحميل الأخبار عند فتح الصفحة ==========
    fetchAndUpdateNews();

    // ========== تحديث تلقائي كل دقيقة ==========
    setInterval(fetchAndUpdateNews, refreshInterval);

    // ========== إيقاف الشريط باللمس على الهاتف ==========
    $(document).on('touchstart', '#kh-marquee-wrap', function() {
        var marquee = $(this).find('.kh-lastNewsItems');
        marquee.css('animation-play-state', 'paused');
        clearTimeout($(this).data('resumeTimer'));
        var that = this;
        var timer = setTimeout(function() {
            $(that).find('.kh-lastNewsItems').css('animation-play-state', 'running');
        }, 3000);
        $(this).data('resumeTimer', timer);
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
