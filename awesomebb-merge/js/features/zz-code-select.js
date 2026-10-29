$(document).ready(function() {
    if (!$("link[href*='Material+Symbols+Outlined']").length) {
        $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />');
    }

    var luffyCodeStyle = `
        <style id="Luffy-codebox-css">
            .Luffy-code-wrapper {
                margin: 20px 0;
                background: #18181b;
                border-radius: 14px;
                overflow: hidden;
                border: 1px solid #27272a;
                -webkit-box-shadow: 0 12px 35px rgba(0,0,0,.2);
                box-shadow: 0 12px 35px rgba(0,0,0,.2);
                direction: ltr;
                text-align: left;
                font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
                width: 100%;
                box-sizing: border-box;
            }
            .Luffy-code-header {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                padding: 10px 16px;
                background: #27272a;
                border-bottom: 1px solid #3f3f46;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            .Luffy-mac-dots {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                gap: 7px;
            }
            .Luffy-mac-dots span {
                width: 11px;
                height: 11px;
                border-radius: 50%;
                display: inline-block;
            }
            .Luffy-dot-r {
                background: #ff5f56;
            }
            .Luffy-dot-y {
                background: #ffbd2e;
            }
            .Luffy-dot-g {
                background: #27c93f;
            }
            .Luffy-code-title {
                color: #a1a1aa;
                font-size: 11.5px;
                font-weight: 700;
                letter-spacing: 1px;
            }
            .Luffy-copy-action {
                display: -webkit-inline-box;
                display: -ms-inline-flexbox;
                display: inline-flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                gap: 6px;
                background: #3f3f46;
                color: #e2e8f0;
                border: none;
                padding: 6px 14px;
                border-radius: 8px;
                font-size: 12px;
                font-family: inherit;
                font-weight: 600;
                cursor: pointer;
                -webkit-transition: all .2s ease;
                transition: all .2s ease;
                word-spacing: 2px;
            }
            .Luffy-copy-action:hover {
                background: #52525b;
                color: #fff;
            }
            .Luffy-copy-action.Luffy-success {
                background: #16a34a !important;
                color: #fff !important;
            }
            .Luffy-code-area {
                padding: 18px;
                max-height: 450px;
                overflow-y: auto;
                overflow-x: auto;
                color: #f4f4f5;
                font-size: 14px;
                line-height: 1.65;
            }
            .Luffy-code-area code {
                font-family: inherit;
                white-space: pre;
            }
            .Luffy-code-area::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            .Luffy-code-area::-webkit-scrollbar-track {
                background: #18181b;
            }
            .Luffy-code-area::-webkit-scrollbar-thumb {
                background: #3f3f46;
                border-radius: 4px;
            }
            .Luffy-code-area::-webkit-scrollbar-thumb:hover {
                background: #52525b;
            }
            @media (max-width: 480px) {
                .Luffy-code-area {
                    font-size: 13px;
                    padding: 12px;
                }
                .Luffy-code-header {
                    padding: 8px 12px;
                }
                .Luffy-copy-action {
                    padding: 5px 10px;
                    font-size: 11px;
                }
            }
        </style>
    `;

    $('head').append(luffyCodeStyle);

    function processLuffyCodes() {
        $('.codebox').each(function(idx) {
            var $originalBox = $(this);
            if ($originalBox.hasClass('Luffy-built')) return;
            $originalBox.addClass('Luffy-built');

            var $innerCode = $originalBox.find('code').length ? $originalBox.find('code') : $originalBox;
            var cleanHtmlContent = $innerCode.html();

            var terminalTemplate = `
                <div class="Luffy-code-wrapper">
                    <div class="Luffy-code-header">
                        <div class="Luffy-mac-dots">
                            <span class="Luffy-dot-r"></span>
                            <span class="Luffy-dot-y"></span>
                            <span class="Luffy-dot-g"></span>
                        </div>
                        <span class="Luffy-code-title">CODE / BISS KEY</span>
                        <button type="button" class="Luffy-copy-action" data-box="${idx}">
                            <i class="material-symbols-outlined" style="font-size:15px">content_copy</i>
                            <span class="Luffy-txt">نسخ&nbsp;الكود</span>
                        </button>
                    </div>
                    <div class="Luffy-code-area"></div>
                </div>
            `;

            var $newTerminal = $(terminalTemplate);
            $newTerminal.find('.Luffy-code-area').append($('<code></code>').html(cleanHtmlContent));
            $originalBox.replaceWith($newTerminal);
        });
    }

    processLuffyCodes();

    $(document).on('click', '.Luffy-copy-action', function() {
        var $btn = $(this);
        var $terminal = $btn.closest('.Luffy-code-wrapper');
        var pureString = $terminal.find('.Luffy-code-area code').text();

        var $tempInput = $('<textarea>');
        $('body').append($tempInput);
        $tempInput.val(pureString).select();

        try {
            document.execCommand('copy');
            $btn.addClass('Luffy-success');
            $btn.find('.Luffy-txt').html('تم&nbsp;النسخ&nbsp;!');
            $btn.find('i').text('done');

            setTimeout(function() {
                $btn.removeClass('Luffy-success');
                $btn.find('.Luffy-txt').html('نسخ&nbsp;الكود');
                $btn.find('i').text('content_copy');
            }, 2000);
        } catch(e) {}

        $tempInput.remove();
    });
});