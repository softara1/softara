(function() {
    // ==================== لوحة التحكم (عدّل القيم هنا فقط) ====================
    var SETTINGS = {
        title: 'جديدنا',                    // عنوان الصندوق
        speed: 40,                           // سرعة الحركة (ثواني، أقل = أسرع)
        maxNews: 5,                         // أقصى عدد للأخبار المعروضة
        linkColor: '#1565C0',                // لون روابط الأخبار
        linkHoverColor: '#0D47A1',           // لون الروابط عند التمرير
        refreshTime: 60,                     // التحديث التلقائي (بالثواني)
        icon: '📰',                          // الأيقونة (إيموجي أو نص أو SVG)
        separateImg: 'https://github.com/softara1/softara/releases/download/1/favicon.ico',
        feedMode: 'topics',                  // 'topics' للمواضيع، 'posts' للمشاركات
        newsLocation: '.newsLocation',
        maxTitleLength: 60,                  // أقصى طول لعنوان الخبر قبل الاختصار
        urgencyKeywords: ['عاجل', 'هام', 'مهم', 'عاجل جدا'],  // كلمات الخبر العاجل
        hiddenSections: [],                  // أسماء أقسام مخفية لتجاهلها (مثلاً: ['قسم الإدارة'])
        swipeResumeDelay: 3000,              // مدة انتظار استئناف الحركة بعد السحب (مللي ثانية)
        showCategory: true,                  // إظهار اسم القسم بجانب الخبر؟
        categoryColor: '#888888'             // لون نص القسم
    };

    // ==================== انتظار تحميل الصفحة ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNews);
    } else {
        initNews();
    }

    function initNews() {
        // ========== تحميل خط Cairo ==========
        if (!document.querySelector('link[href*="Cairo"]')) {
            var cLink = document.createElement('link');
            cLink.rel = 'stylesheet';
            cLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap';
            document.head.appendChild(cLink);
        }

        // ========== منع التكرار وإنشاء الهيكل ==========
        var target = document.querySelector(SETTINGS.newsLocation);
        if (!target || target.querySelector('.kh-lastNewsContainer')) return;

        var container = document.createElement('div');
        container.className = 'kh-lastNewsContainer';
        container.innerHTML =
            '<div class="kh-lastNewsTitle">' +
                '<span class="kh-title-icon">' + SETTINGS.icon + '</span>' +
                '<span>' + SETTINGS.title + '</span>' +
            '</div>' +
            '<div class="kh-lastNewsItems-wrap" id="kh-marquee-wrap">' +
                '<div class="kh-lastNewsItems kh-news-marquee" id="kh-marquee-inner">' +
                    '<span class="kh-loading-spinner"></span>' +
                    '<span class="kh-loading-text">جاري تحميل الأخبار...</span>' +
                '</div>' +
            '</div>';
        target.appendChild(container);

        // ========== عناصر DOM المهمة ==========
        var marqueeWrap = document.getElementById('kh-marquee-wrap');
        var marqueeInner = document.getElementById('kh-marquee-inner');

        // ========== دالة جلب الأخبار ==========
        function fetchAndUpdateNews() {
            var feedUrl = '/feed/';
            if (SETTINGS.feedMode === 'posts') feedUrl += '?mode=posts';
            feedUrl += (feedUrl.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();

            var xhr = new XMLHttpRequest();
            xhr.open('GET', feedUrl, true);
            xhr.timeout = 8000;
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (!marqueeInner) return;
                    if (xhr.status === 200) {
                        try {
                            var xml = new DOMParser().parseFromString(xhr.responseText, 'text/xml');
                            var items = xml.getElementsByTagName('item');
                            marqueeInner.innerHTML = '';

                            if (items.length > 0) {
                                // بناء مصفوفة الأخبار لترتيبها حسب الأولوية
                                var newsArray = [];
                                var totalItems = Math.min(SETTINGS.maxNews, items.length);
                                for (var i = 0; i < items.length; i++) {
                                    if (newsArray.length >= SETTINGS.maxNews * 2) break; // حد أمان
                                    var item = items[i];
                                    var link = item.getElementsByTagName('link')[0]?.textContent || '#';
                                    var title = item.getElementsByTagName('title')[0]?.textContent || '';
                                    var catNode = item.getElementsByTagName('category')[0];
                                    var category = catNode ? catNode.textContent : '';

                                    // تجاهل الأقسام المخفية
                                    if (SETTINGS.hiddenSections.length > 0) {
                                        var isHidden = false;
                                        for (var h = 0; h < SETTINGS.hiddenSections.length; h++) {
                                            if (category.indexOf(SETTINGS.hiddenSections[h]) !== -1) {
                                                isHidden = true;
                                                break;
                                            }
                                        }
                                        if (isHidden) continue;
                                    }

                                    // التحقق من وجود كلمة عاجلة
                                    var isUrgent = false;
                                    for (var u = 0; u < SETTINGS.urgencyKeywords.length; u++) {
                                        if (title.indexOf(SETTINGS.urgencyKeywords[u]) !== -1) {
                                            isUrgent = true;
                                            break;
                                        }
                                    }

                                    // اختصار العنوان الطويل
                                    var displayTitle = title;
                                    if (title.length > SETTINGS.maxTitleLength) {
                                        displayTitle = title.substring(0, SETTINGS.maxTitleLength) + '...';
                                    }

                                    newsArray.push({
                                        link: link,
                                        title: displayTitle,
                                        fullTitle: title,
                                        category: category,
                                        isUrgent: isUrgent
                                    });

                                    if (newsArray.length >= SETTINGS.maxNews * 2) break;
                                }

                                // ترتيب: العاجل أولاً
                                newsArray.sort(function(a, b) {
                                    if (a.isUrgent && !b.isUrgent) return -1;
                                    if (!a.isUrgent && b.isUrgent) return 1;
                                    return 0;
                                });

                                // عرض الأخبار حسب العدد المطلوب
                                var limit = Math.min(SETTINGS.maxNews, newsArray.length);
                                for (var j = 0; j < limit; j++) {
                                    var news = newsArray[j];
                                    var block = document.createElement('span');
                                    block.className = 'kh-lastNewsBlock';

                                    var urgencyBadge = '';
                                    if (news.isUrgent) {
                                        urgencyBadge = '<span class="kh-urgent-badge">عاجل</span>';
                                    }

                                    var categorySpan = '';
                                    if (SETTINGS.showCategory && news.category) {
                                        categorySpan = '<span class="kh-category-tag">(' + news.category + ')</span>';
                                    }

                                    block.innerHTML =
                                        urgencyBadge +
                                        '<a href="' + news.link + '" class="kh-lastNews" title="' + news.fullTitle.replace(/"/g, '&quot;') + '">' +
                                            news.title +
                                        '</a>' +
                                        categorySpan +
                                        '<img src="' + SETTINGS.separateImg + '" class="kh-separateImg" alt="">';
                                    marqueeInner.appendChild(block);
                                }
                            } else {
                                marqueeInner.innerHTML =
                                    '<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">لا توجد أخبار حالياً</a>' +
                                    '<img src="' + SETTINGS.separateImg + '" class="kh-separateImg" alt=""></span>';
                            }
                        } catch (e) {
                            if (!marqueeInner.children.length) {
                                marqueeInner.innerHTML =
                                    '<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">تعذر تحليل الخلاصة</a></span>';
                            }
                        }
                    } else {
                        if (!marqueeInner.children.length || marqueeInner.querySelector('.kh-loading-spinner')) {
                            marqueeInner.innerHTML =
                                '<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">تعذر تحميل الأخبار</a></span>';
                        }
                    }
                }
            };
            xhr.ontimeout = function() {
                if (marqueeInner && (!marqueeInner.children.length || marqueeInner.querySelector('.kh-loading-spinner'))) {
                    marqueeInner.innerHTML =
                        '<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">انتهت مهلة الاتصال</a></span>';
                }
            };
            xhr.send();
        }

        // ========== تحميل أولي وتحديث دوري ==========
        fetchAndUpdateNews();
        setInterval(fetchAndUpdateNews, SETTINGS.refreshTime * 1000);

        // ==================== السحب بالإصبع على الهاتف ====================
        var isDragging = false;
        var startX = 0;
        var startTranslateX = 0;
        var currentTranslateX = 0;
        var swipeTimer = null;
        var movedDistance = 0;

        function getCurrentTranslateX() {
            if (!marqueeInner) return 0;
            var style = window.getComputedStyle(marqueeInner);
            var matrix = style.transform || style.webkitTransform;
            if (matrix === 'none') return 0;
            var values = matrix.match(/-?[\d.]+/g);
            return values && values.length >= 5 ? parseFloat(values[4]) : 0;
        }

        function pauseMarquee() {
            if (marqueeInner) {
                marqueeInner.style.animationPlayState = 'paused';
                currentTranslateX = getCurrentTranslateX();
                marqueeInner.style.transform = 'translateX(' + currentTranslateX + 'px)';
                marqueeInner.style.animation = 'none';
            }
        }

        function resumeMarqueeAfterDelay() {
            if (swipeTimer) clearTimeout(swipeTimer);
            swipeTimer = setTimeout(function() {
                if (marqueeInner) {
                    // إعادة تشغيل الأنيميشن من الموضع الحالي
                    marqueeInner.style.transform = '';
                    marqueeInner.style.animation = '';
                    marqueeInner.style.animationPlayState = 'running';
                }
            }, SETTINGS.swipeResumeDelay);
        }

        if (marqueeWrap) {
            marqueeWrap.addEventListener('touchstart', function(e) {
                if (!marqueeInner) return;
                isDragging = true;
                movedDistance = 0;
                startX = e.touches[0].clientX;
                pauseMarquee();
                startTranslateX = getCurrentTranslateX();
                if (swipeTimer) clearTimeout(swipeTimer);
            }, { passive: true });

            marqueeWrap.addEventListener('touchmove', function(e) {
                if (!isDragging || !marqueeInner) return;
                var deltaX = e.touches[0].clientX - startX;
                movedDistance = Math.abs(deltaX);
                var newX = startTranslateX + deltaX;
                // حد أقصى للسحب (لا يزيد عن 0 ولا يقل عن عرض المحتوى تقريباً)
                if (newX > 0) newX = 0;
                marqueeInner.style.transform = 'translateX(' + newX + 'px)';
                currentTranslateX = newX;
            }, { passive: true });

            marqueeWrap.addEventListener('touchend', function() {
                isDragging = false;
                resumeMarqueeAfterDelay();
            });

            // منع فتح الرابط إذا كان المستخدم يسحب (وليس ينقر)
            marqueeWrap.addEventListener('click', function(e) {
                if (movedDistance > 10) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        }

        // ==================== التنسيقات الداخلية (CSS كاملة) ====================
        var style = document.createElement('style');
        style.textContent =
            '.kh-lastNewsContainer,.kh-lastNewsContainer *{font-family:\'Cairo\',sans-serif!important}' +
            '.kh-lastNewsContainer{display:flex;align-items:stretch;width:100%;background:#fff;border-radius:12px;' +
                'box-shadow:0 4px 12px rgba(0,0,0,0.08);overflow:hidden;margin:20px 0;direction:rtl;box-sizing:border-box}' +
            '.kh-lastNewsTitle{display:flex;align-items:center;gap:8px;padding:12px 20px;background:#1e73be;' +
                'color:#fff;font-weight:700;font-size:18px;white-space:nowrap;flex-shrink:0;z-index:2;' +
                'border-radius:0 12px 12px 0}' +
            '.kh-title-icon{font-size:20px;line-height:1;display:inline-flex;align-items:center}' +
            '.kh-lastNewsItems-wrap{flex:1;overflow:hidden;background:#f0f6fb;display:flex;align-items:center;padding:12px 0;' +
                'cursor:grab;user-select:none;-webkit-user-select:none}' +
            '.kh-lastNewsItems-wrap:active{cursor:grabbing}' +
            '.kh-lastNewsItems{display:inline-block;padding-right:100%;white-space:nowrap;' +
                'animation:kh-marquee ' + SETTINGS.speed + 's linear infinite;will-change:transform}' +
            '.kh-lastNewsBlock{display:inline}' +
            '.kh-lastNews{display:inline-block;vertical-align:middle;color:' + SETTINGS.linkColor + '!important;' +
                'text-decoration:none!important;font-size:16px;font-weight:600;transition:all 0.3s ease;' +
                'padding:2px 6px;border-radius:4px;position:relative}' +
            '.kh-lastNews::after{content:\'\';position:absolute;bottom:0;left:0;width:0;height:2px;' +
                'background:' + SETTINGS.linkHoverColor + ';transition:width 0.3s ease;border-radius:2px}' +
            '.kh-lastNews:hover{color:' + SETTINGS.linkHoverColor + '!important;transform:translateY(-1px);' +
                'background:rgba(21,101,192,0.06)}' +
            '.kh-lastNews:hover::after{width:100%}' +
            '.kh-urgent-badge{display:inline-block;vertical-align:middle;background:#dc3545;color:#fff!important;' +
                'font-size:11px;font-weight:700;padding:2px 7px;border-radius:10px;margin-left:6px;' +
                'animation:kh-pulse 1.5s ease-in-out infinite}' +
            '@keyframes kh-pulse{0%,100%{opacity:1}50%{opacity:0.6}}' +
            '.kh-category-tag{display:inline-block;vertical-align:middle;color:' + SETTINGS.categoryColor + ';' +
                'font-size:12px;font-weight:500;margin:0 4px;opacity:0.8}' +
            '.kh-separateImg{display:inline-block;vertical-align:middle;margin:0 15px;width:18px;height:18px}' +
            '.kh-lastNewsBlock:last-child .kh-separateImg{display:none}' +
            '.kh-lastNewsItems-wrap:hover .kh-lastNewsItems{animation-play-state:paused}' +
            '.kh-loading-spinner{display:inline-block;width:20px;height:20px;border:3px solid #e0e0e0;' +
                'border-top-color:' + SETTINGS.linkColor + ';border-radius:50%;vertical-align:middle;' +
                'animation:kh-spin 0.8s linear infinite;margin-left:8px}' +
            '.kh-loading-text{display:inline-block;vertical-align:middle;color:#777;font-size:14px;margin-left:6px}' +
            '@keyframes kh-spin{to{transform:rotate(360deg)}}' +
            '@keyframes kh-marquee{0%{transform:translate(0,0)}100%{transform:translate(100%,0)}}' +
            '@media (max-width:600px){' +
                '.kh-lastNewsTitle{font-size:15px;padding:10px 14px;border-radius:0 10px 10px 0}' +
                '.kh-lastNews{font-size:14px}' +
                '.kh-separateImg{margin:0 10px;width:16px;height:16px}' +
                '.kh-urgent-badge{font-size:10px;padding:1px 5px}' +
                '.kh-category-tag{font-size:11px}' +
            '}';
        document.head.appendChild(style);
    }
})();
