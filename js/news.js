(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNews);
    } else {
        initNews();
    }

    function initNews() {
        var lastNewsTitle = 'أخبارنا',
            numberOfNews = 10,
            speedOfNews = 30,
            newsLinkColor = '#1565C0',
            feedMode = 'topics',
            refreshInterval = 60000,
            separateImg = 'https://github.com/softara1/softara/releases/download/1/favicon.ico',
            newsLocation = '.newsLocation';

        // تحميل خط Cairo فقط (بدون Font Awesome)
        if (!document.querySelector('link[href*="Cairo"]')) {
            var cairoLink = document.createElement('link');
            cairoLink.rel = 'stylesheet';
            cairoLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap';
            document.head.appendChild(cairoLink);
        }

        var target = document.querySelector(newsLocation);
        if (!target || target.querySelector('.kh-lastNewsContainer')) return;

        var container = document.createElement('div');
        container.className = 'kh-lastNewsContainer';
        container.innerHTML = 
            '<div class="kh-lastNewsTitle">' +
                '<svg aria-hidden="true" style="width:20px;height:20px;vertical-align:middle;fill:white" viewBox="0 0 24 24"><path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 7h3v3H8V7zm0 4h3v3H8v-3zm0 4h3v3H8v-3zm5 0h3v3h-3v-3zm0-4h3v3h-3v-3zm0-4h3v3h-3V7z"/></svg> <span>' + lastNewsTitle + '</span>' +
            '</div>' +
            '<div class="kh-lastNewsItems-wrap" id="kh-marquee-wrap">' +
                '<div class="kh-lastNewsItems kh-news-marquee"></div>' +
            '</div>';
        target.appendChild(container);

        function fetchAndUpdateNews() {
            var feedUrl = '/feed/';
            if (feedMode === 'posts') feedUrl += '?mode=posts';
            feedUrl += (feedUrl.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();
            var xhr = new XMLHttpRequest();
            xhr.open('GET', feedUrl, true);
            xhr.timeout = 8000;
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    var marquee = document.querySelector('.kh-lastNewsItems');
                    if (!marquee) return;
                    if (xhr.status === 200) {
                        try {
                            var xml = new DOMParser().parseFromString(xhr.responseText, 'text/xml');
                            var items = xml.getElementsByTagName('item');
                            marquee.innerHTML = '';
                            if (items.length > 0) {
                                var limit = Math.min(numberOfNews, items.length);
                                for (var i = 0; i < limit; i++) {
                                    var item = items[i];
                                    var link = item.getElementsByTagName('link')[0]?.textContent || '#';
                                    var title = item.getElementsByTagName('title')[0]?.textContent || '';
                                    var block = document.createElement('span');
                                    block.className = 'kh-lastNewsBlock';
                                    block.innerHTML = '<a href="' + link + '" class="kh-lastNews">' + title + '</a>' +
                                        '<img src="' + separateImg + '" class="kh-separateImg" alt="">';
                                    marquee.appendChild(block);
                                }
                            } else {
                                var fb = document.createElement('span');
                                fb.className = 'kh-lastNewsBlock';
                                fb.innerHTML = '<a href="#" class="kh-lastNews">لا توجد أخبار حالياً</a><img src="' + separateImg + '" class="kh-separateImg" alt="">';
                                marquee.appendChild(fb);
                            }
                        } catch (e) {
                            if (!marquee.children.length) marquee.innerHTML = '<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">تعذر تحليل الخلاصة</a></span>';
                        }
                    } else {
                        if (!marquee.children.length) marquee.innerHTML = '<span class="kh-lastNewsBlock"><a href="#" class="kh-lastNews">تعذر تحميل الأخبار</a></span>';
                    }
                }
            };
            xhr.send();
        }

        fetchAndUpdateNews();
        setInterval(fetchAndUpdateNews, refreshInterval);

        document.addEventListener('touchstart', function(e) {
            var wrap = e.target.closest('#kh-marquee-wrap');
            if (!wrap) return;
            var marquee = wrap.querySelector('.kh-lastNewsItems');
            if (!marquee) return;
            marquee.style.animationPlayState = 'paused';
            if (wrap._timer) clearTimeout(wrap._timer);
            wrap._timer = setTimeout(function() {
                marquee.style.animationPlayState = 'running';
            }, 3000);
        });

        var style = document.createElement('style');
        style.textContent = `
            .kh-lastNewsContainer, .kh-lastNewsContainer * { font-family: 'Cairo', sans-serif !important; }
            .kh-lastNewsContainer { display:flex; align-items:stretch; width:100%; background:#fff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden; margin:20px 0; direction:rtl; box-sizing:border-box; }
            .kh-lastNewsTitle { display:flex; align-items:center; gap:8px; padding:12px 20px; background:#1e73be; color:#fff; font-weight:700; font-size:18px; white-space:nowrap; flex-shrink:0; z-index:2; }
            .kh-lastNewsTitle i { font-size:20px; }
            .kh-lastNewsItems-wrap { flex:1; overflow:hidden; background:#f0f6fb; display:flex; align-items:center; padding:12px 0; }
            .kh-lastNewsItems { display:inline-block; padding-right:100%; white-space:nowrap; animation:kh-marquee ${speedOfNews}s linear infinite; }
            .kh-lastNews { display:inline-block; vertical-align:middle; color:${newsLinkColor} !important; text-decoration:none !important; font-size:16px; font-weight:600; transition:color 0.2s; }
            .kh-lastNews:hover { color:#0D47A1 !important; text-decoration:underline !important; }
            .kh-separateImg { display:inline-block; vertical-align:middle; margin:0 15px; width:18px; height:18px; }
            .kh-lastNewsBlock:last-child .kh-separateImg { display:none; }
            .kh-lastNewsItems-wrap:hover .kh-lastNewsItems { animation-play-state:paused; }
            @keyframes kh-marquee { 0% { transform:translate(0,0); } 100% { transform:translate(100%,0); } }
            @media (max-width:600px) {
                .kh-lastNewsTitle { font-size:15px; padding:10px 14px; }
                .kh-lastNews { font-size:14px; }
                .kh-separateImg { margin:0 10px; width:16px; height:16px; }
            }
        `;
        document.head.appendChild(style);
    }
})();
