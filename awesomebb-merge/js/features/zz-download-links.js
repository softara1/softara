$(document).ready(function() {
    if (!$("link[href*='Material+Symbols+Outlined']").length) {
        $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />');
    }

    var luffyDlV2Css = `
        <style id="Luffy-dl-v2-style">
            .Luffy-dl-card {
                margin: 20px 0;
                padding: 16px 20px;
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
                direction: rtl;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
                transition: all 0.3s ease;
                width: 100%;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
            }
            .Luffy-dl-card::before {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 4px;
                background: #3b82f6;
                border-radius: 0 16px 16px 0;
                transition: all 0.3s ease;
            }
            .Luffy-dl-card:hover {
                border-color: #cbd5e1;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
                transform: translateY(-2px);
            }
            .Luffy-dl-card:hover::before {
                background: #2563eb;
            }
            .Luffy-dl-right {
                display: flex;
                align-items: center;
                gap: 16px;
                overflow: hidden;
            }
            .Luffy-dl-icon-wrap {
                width: 52px;
                height: 52px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .Luffy-dl-icon-wrap i {
                font-size: 26px;
            }
            .Luffy-theme-sys { background: #eff6ff; color: #2563eb; }
            .Luffy-theme-arc { background: #fff7ed; color: #ea580c; }
            .Luffy-theme-vid { background: #f5f3ff; color: #8b5cf6; }
            .Luffy-theme-aud { background: #f0fdf4; color: #16a34a; }
            .Luffy-theme-doc { background: #fef2f2; color: #dc2626; }
            .Luffy-dl-meta {
                display: flex;
                flex-direction: column;
                gap: 5px;
                overflow: hidden;
            }
            .Luffy-dl-title {
                font-size: 15px;
                font-weight: 700;
                color: #0f172a;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 400px;
            }
            .Luffy-dl-sub {
                font-size: 12.5px;
                color: #64748b;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .Luffy-dl-sub i {
                font-size: 15px;
                color: #10b981;
            }
            .Luffy-dl-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 10px 24px;
                background: #2563eb;
                color: #fff !important;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 700;
                text-decoration: none !important;
                white-space: nowrap;
                flex-shrink: 0;
                transition: all 0.2s ease;
                word-spacing: 2px;
            }
            .Luffy-dl-btn:hover {
                background: #1d4ed8;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
            }
            .Luffy-dl-btn.Luffy-active {
                background: #10b981 !important;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25) !important;
            }
            body.darkmode .Luffy-dl-card {
                background: #1e293b;
                border-color: #334155;
            }
            body.darkmode .Luffy-dl-title { color: #f8fafc; }
            body.darkmode .Luffy-dl-sub { color: #94a3b8; }
            @media (max-width: 600px) {
                .Luffy-dl-card {
                    flex-direction: column;
                    align-items: stretch;
                    padding: 16px;
                    gap: 16px;
                }
                .Luffy-dl-card::before {
                    width: 100%;
                    height: 4px;
                    right: 0;
                    top: 0;
                    border-radius: 16px 16px 0 0;
                }
                .Luffy-dl-title {
                    max-width: 100%;
                }
                .Luffy-dl-btn {
                    width: 100%;
                    padding: 12px;
                }
            }
        </style>
    `;

    $('head').append(luffyDlV2Css);

    function getCleanTitle(url) {
        try {
            var c = decodeURIComponent(url.split('?')[0].split('#')[0]);
            var b = c.substring(c.lastIndexOf('/') + 1);
            if (!b || b.length < 3) return "ملف تحميل مباشر";
            return b.replace(/[_]/g, ' ');
        } catch(e) {
            return "ملف تحميل مباشر";
        }
    }

    function getFileIdentity(url) {
        var cleanUrl = url.split('?')[0].toLowerCase();

        if (/\.(exe|bin|iso|img|msi|msu|pkg|apk)$/i.test(cleanUrl)) {
            return { cls: 'Luffy-theme-sys', icon: 'memory', lbl: 'حزمة نظام وسوفت وير' };
        }
        if (/\.(zip|rar|7z|tar|gz|bz2|arj|lzh|ace|gzip|sea|sit|sitx|z|r0\d|r1\d)$/i.test(cleanUrl)) {
            return { cls: 'Luffy-theme-arc', icon: 'folder_zip', lbl: 'ملف أرشيف مضغوط' };
        }
        if (/\.(mp4|mkv|avi|3gp|mov|wmv|flv|m4v|mpg|mpeg|rmvb|ogv|qt|rm|asf|plj)$/i.test(cleanUrl)) {
            return { cls: 'Luffy-theme-vid', icon: 'video_library', lbl: 'ملف فيديو وميديا' };
        }
        if (/\.(mp3|wav|aac|ogg|wma|m4a|flac|mpa|ra|aif)$/i.test(cleanUrl)) {
            return { cls: 'Luffy-theme-aud', icon: 'audio_file', lbl: 'ملف صوتي' };
        }
        if (/\.(pdf|ppt|pps|tif|tiff)$/i.test(cleanUrl)) {
            return { cls: 'Luffy-theme-doc', icon: 'description', lbl: 'مستند وقراءة' };
        }

        return { cls: 'Luffy-theme-sys', icon: 'cloud_download', lbl: 'تنزيل سحابي مباشر' };
    }

    $('.content, .post-content, .entry-content, .postbody').each(function() {
        var $postArea = $(this);

        $postArea.find('a').each(function() {
            var $link = $(this);
            var href = $link.attr('href');
            
            if (!href || href.indexOf('javascript:') === 0 || href.indexOf('#') === 0) return;
            if ($link.hasClass('Luffy-chip') || $link.hasClass('Luffy-dl-btn') || $link.hasClass('Luffy-sat-btn')) return;

            var lowerHref = href.toLowerCase();
            var cleanPath = lowerHref.split('?')[0];

            var isCloud = /(mediafire\.com|mega\.nz|drive\.google|dropbox\.com|github\.com\/.*\/releases)/i.test(lowerHref);
            var megaRegex = /\.(3gp|7z|aac|ace|aif|apk|arj|asf|avi|bin|bz2|exe|gz|gzip|img|iso|lzh|m4a|m4v|mkv|mov|mp3|mp4|mpa|mpe|mpeg|mpg|msi|msu|ogg|ogv|pdf|plj|pps|ppt|qt|r0\d|r1\d|ra|rar|rm|rmvb|sea|sit|sitx|tar|tif|tiff|wav|wma|wmv|z|zip|pkg)$/i;
            
            var isMatchedExt = megaRegex.test(cleanPath);

            if (isCloud || isMatchedExt) {
                var fileTxt = $link.text().trim();
                
                if (fileTxt.indexOf('http') === 0 || fileTxt.length > 45 || fileTxt === '') {
                    fileTxt = getCleanTitle(href);
                }

                var identity = getFileIdentity(href);

                var dlHtml = `
                    <div class="Luffy-dl-card">
                        <div class="Luffy-dl-right">
                            <div class="Luffy-dl-icon-wrap ${identity.cls}">
                                <i class="material-symbols-outlined">${identity.icon}</i>
                            </div>
                            <div class="Luffy-dl-meta">
                                <span class="Luffy-dl-title" title="${fileTxt}">${fileTxt}</span>
                                <span class="Luffy-dl-sub"><i class="material-symbols-outlined">verified_user</i> ${identity.lbl} &nbsp;•&nbsp; فُحص برمجياً وجاهز للتحميل</span>
                            </div>
                        </div>
                        <a href="${href}" target="_blank" class="Luffy-dl-btn" rel="nofollow noopener">
                            <i class="material-symbols-outlined" style="font-size:20px">download</i>
                            <span class="Luffy-dl-txt">تحميل&nbsp;الملف</span>
                        </a>
                    </div>
                `;

                $link.replaceWith(dlHtml);
            }
        });
    });

    $(document).on('click', '.Luffy-dl-btn', function() {
        var $btn = $(this);
        
        $btn.addClass('Luffy-active');
        $btn.find('.Luffy-dl-txt').html('جاري&nbsp;التوجيه...');
        $btn.find('i').text('hourglass_empty');

        setTimeout(function() {
            $btn.removeClass('Luffy-active');
            $btn.find('.Luffy-dl-txt').html('تحميل&nbsp;الملف');
            $btn.find('i').text('download');
        }, 3000);
    });
});