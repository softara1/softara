$(document).ready(function() {
    var $posts = $('.post-wrap');
    if ($posts.length <= 1) return;

    var v4RadarCss = `
        <style id="Luffy-v4-radar-css">
            .Luffy-radar-box {
                margin: 16px 0 22px;
                background: #f0fdf4;
                border: 1px solid #86efac;
                border-radius: 14px;
                padding: 12px 18px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 14px;
                direction: rtl;
                width: 100%;
                box-sizing: border-box;
                box-shadow: 0 4px 15px rgba(34,197,94,.08);
                cursor: pointer;
                transition: 0.2s;
                font-family: system-ui, -apple-system, sans-serif;
            }
            .Luffy-radar-box:hover {
                background: #dcfce7;
                border-color: #22c55e;
            }
            .Luffy-r-right {
                display: flex;
                align-items: center;
                gap: 12px;
                overflow: hidden;
            }
            .Luffy-r-ico {
                width: 38px;
                height: 38px;
                border-radius: 10px;
                background: #16a34a;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 0 0 auto;
            }
            .Luffy-r-ico svg {
                width: 20px;
                height: 20px;
                fill: currentColor;
            }
            .Luffy-r-txt {
                display: flex;
                flex-direction: column;
                gap: 3px;
                overflow: hidden;
            }
            .Luffy-r-title {
                font-size: 13.5px;
                font-weight: 800;
                color: #166534;
                word-spacing: 1px;
            }
            .Luffy-r-desc {
                font-size: 11.5px;
                color: #15803d;
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                word-spacing: 1px;
            }
            .Luffy-r-jump {
                padding: 7px 14px;
                background: #16a34a;
                color: #fff;
                border-radius: 8px;
                font-size: 11.5px;
                font-weight: 800;
                flex: 0 0 auto;
                word-spacing: 1px;
            }
            .Luffy-action-bar {
                margin-top: 15px;
                padding-top: 12px;
                border-top: 1px dashed #cbd5e1;
                direction: rtl;
                display: flex;
                justify-content: flex-end;
            }
            .L-solve-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 14px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 800;
                cursor: pointer;
                border: none;
                transition: 0.2s;
                font-family: inherit;
                word-spacing: 2px;
            }
            .L-btn-mark {
                background: #f1f5f9;
                color: #475569;
                border: 1px solid #e2e8f0;
            }
            .L-btn-mark:hover {
                background: #16a34a;
                color: #fff;
                border-color: #16a34a;
            }
            .L-btn-unmark {
                background: #fee2e2;
                color: #991b1b;
            }
            .L-btn-unmark:hover {
                background: #ef4444;
                color: #fff;
            }
            .Luffy-post-solved {
                border: 2px solid #22c55e !important;
                border-radius: 14px !important;
                background: rgba(240, 253, 244, 0.4) !important;
            }
            @keyframes LuffyPulse {
                0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
                70% { box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); }
                100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
            }
            .Luffy-do-pulse {
                animation: LuffyPulse 1s infinite;
            }
            .L-confirm-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                z-index: 99999999;
                align-items: center;
                justify-content: center;
                padding: 16px;
                box-sizing: border-box;
            }
            .L-confirm-card {
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 18px;
                padding: 24px;
                max-width: 440px;
                width: 100%;
                text-align: center;
                direction: rtl;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);
                animation: LuffySbPop 0.2s ease-out;
            }
            .L-confirm-title {
                font-size: 16px;
                font-weight: 900;
                color: #f8fafc;
                margin-bottom: 8px;
                word-spacing: 2px;
            }
            .L-confirm-desc {
                font-size: 12.5px;
                color: #94a3b8;
                line-height: 1.6;
                margin-bottom: 20px;
                word-spacing: 2px;
            }
            .L-confirm-btns {
                display: flex;
                gap: 10px;
                justify-content: center;
            }
            .L-c-yes {
                background: #22c55e;
                color: #0f172a;
                padding: 10px 18px;
                border-radius: 10px;
                font-weight: 800;
                font-size: 12px;
                border: none;
                cursor: pointer;
                flex: 1;
                word-spacing: 2px;
            }
            .L-c-yes:hover {
                background: #4ade80;
            }
            .L-c-no {
                background: #334155;
                color: #e2e8f0;
                padding: 10px 18px;
                border-radius: 10px;
                font-weight: 800;
                font-size: 12px;
                border: none;
                cursor: pointer;
                flex: 1;
            }
            .L-c-no:hover {
                background: #475569;
            }
            body.darkmode .Luffy-radar-box {
                background: #052e16;
                border-color: #166534;
            }
            body.darkmode .Luffy-r-title { color: #86efac; }
            body.darkmode .Luffy-r-desc { color: #bbf7d0; }
            body.darkmode .L-btn-mark {
                background: #1e293b;
                color: #94a3b8;
                border-color: #334155;
            }
            body.darkmode .Luffy-post-solved {
                background: rgba(5, 46, 22, 0.3) !important;
            }
            @media (max-width: 520px) {
                .Luffy-radar-box {
                    flex-direction: column;
                    align-items: stretch;
                    padding: 12px;
                    gap: 10px;
                }
                .Luffy-r-jump {
                    text-align: center;
                }
                .L-confirm-btns {
                    flex-direction: column;
                }
            }
        </style>
    `;

    $('head').append(v4RadarCss);

    var shieldSvg = `<svg viewBox="0 0 24 24" width="48" height="48" style="margin: 0 auto 12px; display: block; color: #38bdf8;" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`;

    var confirmModalHtml = `
        <div class="L-confirm-modal" id="Luffy-confirm-box">
            <div class="L-confirm-card">
                ${shieldSvg}
                <div class="L-confirm-title">تأكيد&nbsp;اعتماد&nbsp;الإجابة&nbsp;النهائية</div>
                <div class="L-confirm-desc">هل&nbsp;أنت&nbsp;متأكد&nbsp;من&nbsp;اعتماد&nbsp;هذا&nbsp;الرد&nbsp;كأفضل&nbsp;حل؟ <br><b style="color:#f87171">تنبيه:&nbsp;</b>بعد&nbsp;النقر&nbsp;على&nbsp;(تأكيد)&nbsp;سيتم&nbsp;قفل&nbsp;القرار&nbsp;ولن&nbsp;تستطيع&nbsp;تغييره&nbsp;مستقبلاً.</div>
                <div class="L-confirm-btns">
                    <button type="button" class="L-c-yes" id="L-btn-proceed">✔&nbsp;نعم،&nbsp;تأكيد&nbsp;الحل&nbsp;النهائي</button>
                    <button type="button" class="L-c-no" id="L-btn-cancel">تراجع</button>
                </div>
            </div>
        </div>
    `;

    $('body').append(confirmModalHtml);

    var $postOne = $posts.first();
    var opAuthorName = $postOne.find('aside .post-author-name').text().trim();
    var editOpUrl = $postOne.find('a[href*="mode=editpost"]').attr('href');
    
    var isStaffReader = false;
    var $headerAdminLinks = $('a[href*="/admin/index.forum"], a[href*="modcp"], .mod-login');
    
    if ($headerAdminLinks.length > 0 || (typeof _userdata !== 'undefined' && (_userdata.user_level == 1 || _userdata.user_level == 2))) {
        isStaffReader = true;
    }

    var canManage = (editOpUrl !== undefined); 

    var $pOneContent = $postOne.find('.post-content, .content').first();
    var rawOpText = $pOneContent.text();

    var solvedMatch = rawOpText.match(/\[SOLVED=(\d+)\]/i);
    var targetSolvedId = solvedMatch ? solvedMatch[1] : null;

    if (targetSolvedId) {
        $pOneContent.html($pOneContent.html().replace(/\[SOLVED=\d+\]/gi, ''));
    }

    var checkSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
    var trophySvg = `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;

    $posts.slice(1).each(function() {
        var $rep = $(this);
        var rId = $rep.attr('id') ? $rep.attr('id').replace('post-', '') : '';
        if (!rId) rId = $rep.find('.post-header').attr('id');

        var authorName = $rep.find('aside .post-author-name').text().trim();
        var isOpReply = (opAuthorName !== '' && opAuthorName === authorName);

        if (targetSolvedId && rId === targetSolvedId) {
            $rep.addClass('Luffy-post-solved');

            var snip = $rep.find('.post-content, .content').text().trim();
            if (snip.length > 60) snip = snip.substring(0, 60) + '...';

            var banner = `
                <div class="Luffy-radar-box" id="Luffy-jump-trigger" data-t="${rId}">
                    <div class="Luffy-r-right">
                        <div class="Luffy-r-ico">${trophySvg}</div>
                        <div class="Luffy-r-txt">
                            <span class="Luffy-r-title">تم&nbsp;التوصل&nbsp;لأفضل&nbsp;إجابة&nbsp;في&nbsp;هذا&nbsp;الموضوع</span>
                            <span class="Luffy-r-desc">الحل&nbsp;المعتمد&nbsp;بواسطة&nbsp;(${authorName}):&nbsp;« ${snip} »</span>
                        </div>
                    </div>
                    <div class="Luffy-r-jump">الانتقال&nbsp;للحل&nbsp;&#9668;</div>
                </div>
            `;

            var $nav = $('.quick-nav-topics').first();
            $nav.length ? $nav.after(banner) : $postOne.before(banner);

            if (isStaffReader) {
                $rep.find('.post-content, .content').last().after(`
                    <div class="Luffy-action-bar">
                        <button type="button" class="L-solve-btn L-btn-unmark action-unsolve" data-id="${rId}">&#10005; إلغاء&nbsp;اعتماد&nbsp;هذا&nbsp;الحل&nbsp;(صلاحية&nbsp;إدارية)</button>
                    </div>
                `);
            }
        } else if (canManage && !targetSolvedId && !isOpReply) {
            $rep.find('.post-content, .content').last().after(`
                <div class="Luffy-action-bar">
                    <button type="button" class="L-solve-btn L-btn-mark action-pre-solve" data-id="${rId}">${checkSvg} <span>اعتماد&nbsp;كأفضل&nbsp;إجابة</span></button>
                </div>
            `);
        }
    });

    var pendingTargetId = null;
    var $confirmBox = $('#Luffy-confirm-box');

    $(document).on('click', '.action-pre-solve', function() {
        pendingTargetId = $(this).data('id');
        $confirmBox.css('display', 'flex');
    });

    $('#L-btn-cancel').on('click', function() {
        pendingTargetId = null;
        $confirmBox.hide();
    });

    $('#L-btn-proceed').on('click', function() {
        if (!pendingTargetId) return;
        var tId = pendingTargetId;
        
        $confirmBox.hide();
        $('.action-pre-solve').html('جاري&nbsp;قفل&nbsp;القرار...').prop('disabled', true);

        $.get(editOpUrl, function(htmlData) {
            var $form = $(htmlData).find('form[name="post"]');
            var formData = $form.serializeArray();
            var mIdx = formData.findIndex(i => i.name === 'message');

            if (mIdx !== -1) {
                formData[mIdx].value = formData[mIdx].value + '\n[SOLVED=' + tId + ']';
            }

            formData.push({name: 'post', value: '1'});
            $.post('/post', formData, function() { location.reload(); });
        });
    });

    $(document).on('click', '.action-unsolve', function() {
        if (!confirm('بصفتك إداري: هل أنت متأكد من فك القفل عن هذا الموضوع وإعادته مفتوحاً؟')) return;
        var $btn = $(this);
        $btn.html('جاري&nbsp;فك&nbsp;القفل...').prop('disabled', true);

        $.get(editOpUrl, function(htmlData) {
            var $form = $(htmlData).find('form[name="post"]');
            var formData = $form.serializeArray();
            var mIdx = formData.findIndex(i => i.name === 'message');

            if (mIdx !== -1) {
                formData[mIdx].value = formData[mIdx].value.replace(/\[SOLVED=\d+\]/ig, '').trim();
            }

            formData.push({name: 'post', value: '1'});
            $.post('/post', formData, function() { location.reload(); });
        });
    });

    $(document).on('click', '#Luffy-jump-trigger', function() {
        var tid = $(this).data('t');
        var $tg = $('#post-' + tid).length ? $('#post-' + tid) : $('#' + tid).closest('.post-wrap');
        if ($tg.length) {
            $('html, body').animate({ scrollTop: $tg.offset().top - 75 }, 400);
            $tg.addClass('Luffy-do-pulse');
            setTimeout(function(){ $tg.removeClass('Luffy-do-pulse'); }, 3000);
        }
    });
});