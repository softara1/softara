$(document).ready(function() {
    if (!$("link[href*='Material+Symbols+Outlined']").length) {
        $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />');
    }

    var luffyV5Css = [
        '<style id="Luffy-v5-css">',
        '    .Luffy-hub-container {',
        '        margin: 32px 0 24px;',
        '        width: 100%;',
        '        clear: both;',
        '        box-sizing: border-box;',
        '        direction: rtl;',
        '        font-family: inherit;',
        '    }',
        '    .Luffy-hub-card {',
        '        background: #ffffff;',
        '        border: 1px solid #e2e8f0;',
        '        border-radius: 18px;',
        '        padding: 16px 20px;',
        '        display: -webkit-box;',
        '        display: -ms-flexbox;',
        '        display: flex;',
        '        -webkit-box-orient: vertical;',
        '        -webkit-box-direction: normal;',
        '        -ms-flex-direction: column;',
        '        flex-direction: column;',
        '        gap: 14px;',
        '        width: 100%;',
        '        box-sizing: border-box;',
        '        -webkit-box-shadow: 0 4px 6px -1px rgba(0,0,0,.05), 0 2px 4px -1px rgba(0,0,0,.03);',
        '        box-shadow: 0 4px 6px -1px rgba(0,0,0,.05), 0 2px 4px -1px rgba(0,0,0,.03);',
        '        -webkit-transition: all .3s ease;',
        '        transition: all .3s ease;',
        '    }',
        '    .Luffy-hub-card:hover {',
        '        border-color: #cbd5e1;',
        '        -webkit-box-shadow: 0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -2px rgba(0,0,0,.04);',
        '        box-shadow: 0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -2px rgba(0,0,0,.04);',
        '    }',
        '    .Luffy-hub-title {',
        '        display: -webkit-box;',
        '        display: -ms-flexbox;',
        '        display: flex;',
        '        -webkit-box-align: center;',
        '        -ms-flex-align: center;',
        '        align-items: center;',
        '        gap: 8px;',
        '        font-size: 13.5px;',
        '        font-weight: 800;',
        '        color: #1e293b;',
        '        width: 100%;',
        '        -webkit-user-select: none;',
        '        -moz-user-select: none;',
        '        -ms-user-select: none;',
        '        user-select: none;',
        '        word-spacing: 2px;',
        '    }',
        '    .Luffy-hub-title i {',
        '        color: #2563eb;',
        '        font-size: 22px;',
        '    }',
        '    .Luffy-hub-actions {',
        '        display: -webkit-box;',
        '        display: -ms-flexbox;',
        '        display: flex;',
        '        -webkit-box-align: center;',
        '        -ms-flex-align: center;',
        '        align-items: center;',
        '        gap: 8px;',
        '        -ms-flex-wrap: nowrap;',
        '        flex-wrap: nowrap;',
        '        overflow-x: auto;',
        '        width: 100%;',
        '        padding: 2px 1px 6px;',
        '        scrollbar-width: none;',
        '        -ms-overflow-style: none;',
        '        -webkit-overflow-scrolling: touch;',
        '    }',
        '    .Luffy-hub-actions::-webkit-scrollbar {',
        '        display: none;',
        '    }',
        '    .Luffy-chip {',
        '        display: -webkit-inline-box;',
        '        display: -ms-inline-flexbox;',
        '        display: inline-flex;',
        '        -webkit-box-align: center;',
        '        -ms-flex-align: center;',
        '        align-items: center;',
        '        gap: 6px;',
        '        padding: 8px 14px;',
        '        background: #f8fafc;',
        '        border: 1px solid #cbd5e1;',
        '        border-radius: 10px;',
        '        font-size: 12px;',
        '        font-weight: 700;',
        '        color: #334155;',
        '        text-decoration: none !important;',
        '        cursor: pointer;',
        '        -webkit-transition: all .2s cubic-bezier(.16,1,.3,1);',
        '        transition: all .2s cubic-bezier(.16,1,.3,1);',
        '        white-space: nowrap;',
        '        -webkit-box-flex: 0;',
        '        -ms-flex: 0 0 auto;',
        '        flex: 0 0 auto;',
        '        box-sizing: border-box;',
        '        font-family: inherit;',
        '    }',
        '    .Luffy-chip i {',
        '        font-size: 16px;',
        '    }',
        '    .Luffy-chip:hover {',
        '        -webkit-transform: translateY(-2.5px);',
        '        transform: translateY(-2.5px);',
        '    }',
        '    .Luffy-c-wa:hover {',
        '        border-color: #22c55e;',
        '        background: #f0fdf4;',
        '        color: #16a34a;',
        '        -webkit-box-shadow: 0 4px 12px rgba(22,163,74,.15);',
        '        box-shadow: 0 4px 12px rgba(22,163,74,.15);',
        '    }',
        '    .Luffy-c-tg:hover {',
        '        border-color: #0ea5e9;',
        '        background: #f0f9ff;',
        '        color: #0284c7;',
        '        -webkit-box-shadow: 0 4px 12px rgba(2,132,199,.15);',
        '        box-shadow: 0 4px 12px rgba(2,132,199,.15);',
        '    }',
        '    .Luffy-c-fb:hover {',
        '        border-color: #3b82f6;',
        '        background: #eff6ff;',
        '        color: #1d4ed8;',
        '        -webkit-box-shadow: 0 4px 12px rgba(29,78,216,.15);',
        '        box-shadow: 0 4px 12px rgba(29,78,216,.15);',
        '    }',
        '    .Luffy-c-x:hover {',
        '        border-color: #0f172a;',
        '        background: #0f172a;',
        '        color: #fff !important;',
        '        -webkit-box-shadow: 0 4px 12px rgba(15,23,42,.22);',
        '        box-shadow: 0 4px 12px rgba(15,23,42,.22);',
        '    }',
        '    .Luffy-c-rd:hover {',
        '        border-color: #f97316;',
        '        background: #fff7ed;',
        '        color: #ea580c;',
        '        -webkit-box-shadow: 0 4px 12px rgba(234,88,12,.15);',
        '        box-shadow: 0 4px 12px rgba(234,88,12,.15);',
        '    }',
        '    .Luffy-c-th:hover {',
        '        border-color: #000;',
        '        background: #000;',
        '        color: #fff !important;',
        '        -webkit-box-shadow: 0 4px 12px rgba(0,0,0,.22);',
        '        box-shadow: 0 4px 12px rgba(0,0,0,.22);',
        '    }',
        '    .Luffy-c-in:hover {',
        '        border-color: #3b82f6;',
        '        background: #eff6ff;',
        '        color: #2563eb;',
        '        -webkit-box-shadow: 0 4px 12px rgba(37,99,235,.15);',
        '        box-shadow: 0 4px 12px rgba(37,99,235,.15);',
        '    }',
        '    .Luffy-hub-sep {',
        '        width: 1.5px;',
        '        height: 22px;',
        '        background: #cbd5e1;',
        '        margin: 0 3px;',
        '        -webkit-box-flex: 0;',
        '        -ms-flex: 0 0 auto;',
        '        flex: 0 0 auto;',
        '    }',
        '    .Luffy-c-copy {',
        '        background: #2563eb;',
        '        border-color: #2563eb;',
        '        color: #fff !important;',
        '    }',
        '    .Luffy-c-copy:hover {',
        '        background: #1d4ed8;',
        '        border-color: #1d4ed8;',
        '        -webkit-box-shadow: 0 4px 12px rgba(37,99,235,.3);',
        '        box-shadow: 0 4px 12px rgba(37,99,235,.3);',
        '    }',
        '    .Luffy-c-copy.Luffy-done {',
        '        background: #10b981 !important;',
        '        border-color: #10b981 !important;',
        '    }',
        '    .Luffy-c-native {',
        '        background: -webkit-linear-gradient(45deg,#4f46e5,#9333ea);',
        '        background: linear-gradient(45deg,#4f46e5,#9333ea);',
        '        border: none;',
        '        color: #fff !important;',
        '    }',
        '    @media(min-width:769px) {',
        '        .Luffy-c-native {',
        '            display: none !important;',
        '        }',
        '    }',
        '    body.darkmode .Luffy-hub-card {',
        '        background: #1e293b;',
        '        border-color: #334155;',
        '    }',
        '    body.darkmode .Luffy-hub-title {',
        '        color: #e2e8f0;',
        '    }',
        '    body.darkmode .Luffy-chip {',
        '        background: #0f172a;',
        '        border-color: #334155;',
        '        color: #cbd5e1;',
        '    }',
        '    body.darkmode .Luffy-c-x:hover, body.darkmode .Luffy-c-th:hover {',
        '        background: #fff;',
        '        color: #000 !important;',
        '    }',
        '    body.darkmode .Luffy-hub-sep {',
        '        background: #3f3f46;',
        '    }',
        '</style>'
    ].join('\n');

    $('head').append(luffyV5Css);

    var $firstPost = $('.post').first();
    if (!$firstPost.length) return;

    var $targetArea = $firstPost.find('.content, .post-content, .entry-content, .postbody').first();
    if (!$targetArea.length) $targetArea = $firstPost;

    var rawTitle = $('h1').first().text().trim() || document.title;
    var cleanUrl = window.location.href.split('#')[0];
    var u = encodeURIComponent(cleanUrl);
    var t = encodeURIComponent(rawTitle);

    var waUrl = 'https://api.whatsapp.com/send?text=' + t + '%20-%20' + u;
    var tgUrl = 'https://t.me/share/url?url=' + u + '&text=' + t;
    var fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + u;
    var xUrl  = 'https://twitter.com/intent/tweet?text=' + t + '&url=' + u;
    var rdUrl = 'https://www.reddit.com/submit?url=' + u + '&title=' + t;
    var thUrl = 'https://threads.net/intent/post?text=' + t + '%20' + u;
    var inUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + u;

    var isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var nativeHtml = '';
    
    if (navigator.share && isPhone) {
        nativeHtml = [
            '<button type="button" class="Luffy-chip Luffy-c-native" id="Luffy-os-share">',
            '    <i class="material-symbols-outlined">share</i><span>مشاركة عبر التطبيقات</span>',
            '</button>'
        ].join('\n');
    }

    var hubHtml = [
        '<div class="Luffy-hub-container">',
        '    <div class="Luffy-hub-card">',
        '        <div class="Luffy-hub-title">',
        '            <i class="material-symbols-outlined">share_reviews</i>',
        '            <span>مشاركة الموضوع :</span>',
        '        </div>',
        '        <div class="Luffy-hub-actions">',
        '            <a href="' + waUrl + '" target="_blank" class="Luffy-chip Luffy-c-wa" rel="nofollow">',
        '                <i class="material-symbols-outlined">chat</i><span>واتساب</span>',
        '            </a>',
        '            <a href="' + tgUrl + '" target="_blank" class="Luffy-chip Luffy-c-tg" rel="nofollow">',
        '                <i class="material-symbols-outlined">send</i><span>تلغرام</span>',
        '            </a>',
        '            <a href="' + fbUrl + '" target="_blank" class="Luffy-chip Luffy-c-fb" rel="nofollow">',
        '                <i class="material-symbols-outlined">thumb_up</i><span>فيسبوك</span>',
        '            </a>',
        '            <a href="' + xUrl + '" target="_blank" class="Luffy-chip Luffy-c-x" rel="nofollow">',
        '                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg><span>تويتر</span>',
        '            </a>',
        '            <a href="' + rdUrl + '" target="_blank" class="Luffy-chip Luffy-c-rd" rel="nofollow">',
        '                <span style="font-family:monospace;font-weight:900;font-size:12px">r/</span><span>ريديت</span>',
        '            </a>',
        '            <a href="' + thUrl + '" target="_blank" class="Luffy-chip Luffy-c-th" rel="nofollow">',
        '                <span style="font-family:serif;font-weight:900;font-size:14px;line-height:1">@</span><span>ثريدز</span>',
        '            </a>',
        '            <a href="' + inUrl + '" target="_blank" class="Luffy-chip Luffy-c-in" rel="nofollow">',
        '                <span style="font-weight:900;font-size:12px">in</span><span>لينكدإن</span>',
        '            </a>',
        '            <span class="Luffy-hub-sep"></span>',
        '            ' + nativeHtml,
        '            <button type="button" class="Luffy-chip Luffy-c-copy" id="Luffy-hub-copy">',
        '                <i class="material-symbols-outlined">content_copy</i><span class="Luffy-copy-txt">نسخ الموضوع والرابط</span>',
        '            </button>',
        '        </div>',
        '    </div>',
        '</div>'
    ].join('\n');

    $targetArea.after(hubHtml);

    $(document).on('click', '#Luffy-hub-copy', function() {
        var $btn = $(this);
        var viralPayload = "???? موضوع: " + rawTitle + "\r\n???? الرابط: " + cleanUrl;

        var $temp = $('<textarea>');
        $('body').append($temp);
        $temp.val(viralPayload).select();

        try {
            document.execCommand('copy');
            $btn.addClass('Luffy-done');
            $btn.find('.Luffy-copy-txt').text('تم نسخ الموضوع!');
            $btn.find('i').text('done_all');

            setTimeout(function() {
                $btn.removeClass('Luffy-done');
                $btn.find('.Luffy-copy-txt').text('نسخ الموضوع والرابط');
                $btn.find('i').text('content_copy');
            }, 2500);
        } catch(err) {}

        $temp.remove();
    });

    $(document).on('click', '#Luffy-os-share', function() {
        if (navigator.share) {
            navigator.share({
                title: rawTitle,
                text: "???? موضوع: " + rawTitle,
                url: cleanUrl
            }).catch(function(){});
        }
    });
});