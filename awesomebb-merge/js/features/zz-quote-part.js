$(document).ready(function() {
    var $posts = $('.post-wrap, .postrow, .post');
    if ($posts.length === 0) return;

    var css = '<style id="L-pill-final">#L-quote-pill{display:none;position:absolute;z-index:99999999;background:#0f172a;color:#f8fafc;border:1.5px solid #38bdf8;border-radius:50px;padding:8px 18px;font-size:12px;font-weight:bold;cursor:pointer;box-shadow:0 10px 25px rgba(0,0,0,.85),0 0 15px rgba(56,189,248,.3);transition:transform .15s ease;font-family:system-ui,-apple-system,sans-serif;direction:rtl;white-space:nowrap;user-select:none}#L-quote-pill:hover{background:#1e293b;transform:scale(1.05);border-color:#7dd3fc}#L-quote-pill span{color:#38bdf8;margin-left:6px;font-size:14px}#j9192e04,.j9192e04,#ke60f499,.ke60f499,#n1b304fa0,.n1b304fa0,#j5fd50dca,.j5fd50dca,#j3aec736e,.j3aec736e,#e939ffc86,.e939ffc86{display:none!important}</style>';
        
    $('head').append(css);
    $('body').append('<div id="L-quote-pill"><span>&#10077;</span> اقتباس السطر المحدد في الرد</div>');
    
    var $pill = $('#L-quote-pill');
    var selectedText = '';
    var targetAuthor = '';

    $(document).on('mouseup', function(e) {
        if ($(e.target).closest('#L-quote-pill').length > 0) return;

        var sel = window.getSelection();
        selectedText = sel ? sel.toString().trim() : '';

        if (!selectedText || selectedText.length < 3) {
            $pill.hide();
            return;
        }

        var anchor = sel.anchorNode;
        var $postContent = $(anchor).closest('.post-content, .content, .entry-content, .postbody');
        if ($postContent.length === 0) {
            $pill.hide();
            return;
        }

        var authorText = '';
        var $wrapAwesomeBB = $postContent.closest('.post-wrap');
        
        if ($wrapAwesomeBB.length > 0) {
            authorText = $wrapAwesomeBB.find('.post-author-name').first().text().trim();
        } else {
            var $wrapPhpBB2 = $postContent.closest('.postrow');
            if ($wrapPhpBB2.length > 0) {
                authorText = $wrapPhpBB2.find('.name').first().text().trim();
            } else {
                var $wrapOthers = $postContent.closest('.post');
                if ($wrapOthers.length > 0) {
                    authorText = $wrapOthers.find('.postprofile dt strong, .postprofile dt a, .post-author ul li strong, .author, .name').first().text().trim();
                }
            }
        }
        
        targetAuthor = authorText || 'عضو';

        var rect = sel.getRangeAt(0).getBoundingClientRect();
        var topPos = rect.top + $(window).scrollTop() - 42;
        var leftPos = rect.left + $(window).scrollLeft() + (rect.width / 2) - ($pill.outerWidth() / 2);

        if (topPos < $(window).scrollTop() + 10) {
            topPos = rect.bottom + $(window).scrollTop() + 12;
        }

        $pill.css({ top: topPos + 'px', left: leftPos + 'px', display: 'inline-block' });
    });

    $(document).on('mousedown', function(e) {
        if ($(e.target).closest('#L-quote-pill').length === 0) {
            setTimeout(function() {
                var s = window.getSelection();
                if (!s || !s.toString().trim()) {
                    $pill.hide();
                }
            }, 100);
        }
    });

    $pill.on('click', function(e) {
        e.stopPropagation();
        if (!selectedText) return;

        var $textarea = $('#text_editor_textarea, textarea[name="message"]').first();
        var $formBox = $('#quick_reply, .quick-reply, form[name="post"]').last();

        if ($textarea.length === 0 && $formBox.length === 0) {
            alert('عذراً: صندوق الرد السريع غير موجود أو مغلق في هذه الصفحة!');
            return;
        }

        var bbcode = '[quote="' + targetAuthor + '"]' + selectedText + '[/quote]\n';

        if ($textarea.length > 0 && typeof $textarea.sceditor === 'function') {
            var scInstance = $textarea.sceditor('instance');
            if (scInstance) {
                scInstance.insert(bbcode);
            } else {
                var cur = $textarea.val();
                $textarea.val(cur + (cur.length > 0 ? '\n' : '') + bbcode);
            }
        } else if ($textarea.length > 0) {
            var curVal = $textarea.val();
            $textarea.val(curVal + (curVal.length > 0 ? '\n' : '') + bbcode);
        }

        var scrollTarget = 0;
        var $anchor = $('#Luffy-Quote-Target-Anchor');

        if ($anchor.length > 0) {
            scrollTarget = $anchor.offset().top - 100;
        } else if ($formBox.length > 0 && $formBox.is(':visible')) {
            scrollTarget = $formBox.offset().top - 100;
        } else if ($textarea.length > 0) {
            scrollTarget = $textarea.offset().top - 100;
        }

        if (scrollTarget > 0) {
            $('html, body').animate({ scrollTop: scrollTarget }, 400, function() {
                if ($textarea.length > 0) $textarea.focus();
            });
        }

        if (window.getSelection) {
            if (window.getSelection().empty) window.getSelection().empty();
            else if (window.getSelection().removeAllRanges) window.getSelection().removeAllRanges();
        }

        $pill.hide();
    });
});