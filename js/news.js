(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNews);
    } else {
        initNews();
    }

    function initNews() {
        // ==================== لوحة التحكم ====================
        var SETTINGS = {
            title: 'أخبارنا',
            speed: 30,
            maxNews: 10,
            linkColor: '#1565C0',
            linkHoverColor: '#0D47A1',
            refreshTime: 60,
            icon: '📰',
            separateImg: 'https://github.com/softara1/softara/releases/download/1/favicon.ico',
            feedMode: 'topics',
            newsLocation: '.newsLocation',
            maxTitleLength: 60,
            urgencyKeywords: ['عاجل', 'هام', 'مهم', 'عاجل جدا'],
            hiddenSections: [],
            swipeResumeDelay: 3000,
            showCategory: true,
            categoryColor: '#888888'
        };

        // ========== تحميل خط Cairo ==========
        if (!document.querySelector('link[href*="Cairo"]')) {
            var cLink = document.createElement('link');
            cLink.rel = 'stylesheet';
            cLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap';
            document.head.appendChild(cLink);
        }

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

        var marqueeWrap = document.getElementById('kh-marquee-wrap');
        var marqueeInner = document.getElementById('kh-marquee-inner');
        var isDragging = false, startX = 0, startTranslateX = 0, currentTranslateX = 0, movedDistance = 0;
        var swipeTimer = null;
        var marqueeBounds = { min: 0, max: 0 };

        function updateBounds() {
            if (!marqueeWrap || !marqueeInner) return;
            var wrapWidth = marqueeWrap.clientWidth;
            var innerWidth = marqueeInner.scrollWidth;
            // الشريط يتحرك من 0 إلى - (innerWidth - wrapWidth) ليكون المحتوى مرئياً
            marqueeBounds.min = 0;
            marqueeBounds.max = -(innerWidth - wrapWidth);
            if (marqueeBounds.max > 0) marqueeBounds.max = 0; // إذا كان المحتوى أصغر من الحاوية
        }

        function pauseMarquee() {
            if (!marqueeInner) return;
            marqueeInner.style.animationPlayState = 'paused';
            updateBounds();
            // حساب القيمة الحالية للترجمة من الـ computed style
            var style = window.getComputedStyle(marqueeInner);
            var matrix = style.transform;
            if (matrix && matrix !== 'none') {
                var vals = matrix.match(/-?[\d.]+/g);
                if (vals && vals.length >= 5) {
                    currentTranslateX = parseFloat(vals[4]);
                } else {
                    currentTranslateX = 0;
                }
            } else {
                currentTranslateX = 0;
            }
            // تثبيت الوضع الحالي
            marqueeInner.style.transition = 'none';
            marqueeInner.style.transform = 'translateX(' + currentTranslateX + 'px)';
        }

        function resumeMarqueeAfterDelay() {
            if (swipeTimer) clearTimeout(swipeTimer);
            swipeTimer = setTimeout(function() {
                if (!marqueeInner) return;
                // نعيد الأنيميشن الأصلي
                marqueeInner.style.transition = '';
                marqueeInner.style.transform = '';
                marqueeInner.style.animation = '';
                marqueeInner.style.animationPlayState = 'running';
            }, SETTINGS.swipeResumeDelay);
        }

        // أحداث السحب
        if (marqueeWrap) {
            marqueeWrap.addEventListener('touchstart', function(e) {
                if (!marqueeInner) return;
                isDragging = true;
                movedDistance = 0;
                startX = e.touches[0].clientX;
                pauseMarquee();
                startTranslateX = currentTranslateX;
                if (swipeTimer) clearTimeout(swipeTimer);
            }, { passive: true });

            marqueeWrap.addEventListener('touchmove', function(e) {
                if (!isDragging || !marqueeInner) return;
                var deltaX = e.touches[0].clientX - startX;
                movedDistance = Math.abs(deltaX);
                var newX = startTranslateX + deltaX;
                // تقييد السحب بالحدود
                if (newX > marqueeBounds.min) newX = marqueeBounds.min;
                if (newX < marqueeBounds.max) newX = marqueeBounds.max;
                marqueeInner.style.transform = 'translateX(' + newX + 'px)';
                currentTranslateX = newX;
            }, { passive: true });

            marqueeWrap.addEventListener('touchend', function() {
                isDragging = false;
                resumeMarqueeAfterDelay();
            });

            marqueeWrap.addEventListener('click', function(e) {
                if (movedDistance > 10) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        }

        // ========== جلب الأخبار ==========
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
                                var newsArray = [];
                                var totalItems = Math.min(SETTINGS.maxNews, items.length);
                                for (var i = 0; i < items.length; i++) {
                                    if (newsArray.length >= SETTINGS.maxNews * 2) break;
                                    var item = items[i];
                                    var link = item.getElementsByTagName('link')[0]?.textContent || '#';
                                    var title = item.getElementsByTagName('title')[0]?.textContent || '';
                                    var catNode = item.getElementsByTagName('category')[0];
                                    var category = catNode ? catNode.textContent : '';

                                    if (SETTINGS.hiddenSections.length > 0) {
                                        var hidden = false;
                                        for (var h = 0; h < SETTINGS.hiddenSections.length; h++) {
                                            if (category.indexOf(SETTINGS.hiddenSections[h]) !== -1) {
                                                hidden = true;
                                                break;
                                            }
                                        }
                                        if (hidden) continue;
                                    }

                                    var isUrgent = false;
                                    for (var u = 0; u < SETTINGS.urgencyKeywords.length; u++) {
                                        if (title.indexOf(SETTINGS.urgencyKeywords[u]) !== -1) {
                                            isUrgent = true;
                                            break;
                                        }
                                    }

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

                                newsArray.sort(function(a, b) {
                                    if (a.isUrgent && !b.isUrgent) return -1;
                                    if (!a.isUrgent && b.isUrgent) return 1;
                                    return 0;
                                });

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

        fetchAndUpdateNews();
        setInterval(fetchAndUpdateNews, SETTINGS.refreshTime * 1000);

        // ==================== التنسيقات ====================
        var style = document.createElement('style');
        style.textContent =
            '.kh-lastNewsContainer,.kh-lastNewsContainer *{font-family:\'Cairo\',sans-serif!important}' +
            '.kh-lastNewsContainer{display:flex;align-items:stretch;width:100%;background:#fff;border-radius:12px;' +
                'box-shadow:0 4px 12px rgba(0,0,0,0.08);overflow:hidden;margin:20px 0;direction:rtl;box-sizing:border-box}' +
            '.kh-lastNewsTitle{display:flex;align-items:center;gap:8px;padding:12px 20px;background:#1e73be;' +
                'color:#fff;font-weight:700;font-size:18px;white-space:nowrap;flex-shrink:0;z-index:2}' +
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
                '.kh-lastNewsTitle{font-size:15px;padding:10px 14px}' +
                '.kh-lastNews{font-size:14px}' +
                '.kh-separateImg{margin:0 10px;width:16px;height:16px}' +
                '.kh-urgent-badge{font-size:10px;padding:1px 5px}' +
                '.kh-category-tag{font-size:11px}' +
            '}';
        document.head.appendChild(style);
    }
})();
