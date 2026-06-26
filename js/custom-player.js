(function() {
    'use strict';

    // فضاء أسماء خاص لمنع التعارضات
    var a7la7ekayaNS = {
        svg: {},
        icons: {},
        classes: {},
        bgList: []
    };

    // ========== الأيقونات SVG (خاصة) ==========
    a7la7ekayaNS.svg.play = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    a7la7ekayaNS.svg.pause = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    a7la7ekayaNS.svg.vol = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    a7la7ekayaNS.svg.mute = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';

    a7la7ekayaNS.icons.mp3 = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
    a7la7ekayaNS.icons.video = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>';
    a7la7ekayaNS.icons.postbg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';
    a7la7ekayaNS.icons.username = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
    a7la7ekayaNS.icons.blur = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M15.5 2l1.5 4.5L21.5 8l-4.5 1.5L15.5 14 14 9.5 9.5 8l4.5-1.5z"/></svg>';
    a7la7ekayaNS.icons.frame = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4z"/></svg>';
    a7la7ekayaNS.icons.flipv = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M12 4l-6 6h4v8h4v-8h4zM12 20l6-6h-4V6h-4v8H8z"/></svg>';
    a7la7ekayaNS.icons.imglink = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#555"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';

    a7la7ekayaNS.bgList = [
        "https://i.servimg.com/u/f55/14/83/59/48/daqtda10.gif",
        "https://i.servimg.com/u/f55/14/83/59/48/pftcnq10.png",
        "https://i.servimg.com/u/f55/14/83/59/48/lruwov10.png",
        "https://i.servimg.com/u/f55/14/83/59/48/ehp45h10.png",
        "https://i.servimg.com/u/f39/14/83/59/48/bg1310.jpg",
        "https://i.servimg.com/u/f39/14/83/59/48/rip_jo10.png"
    ];

    // ========== دوال مساعدة خاصة ==========
    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
        var m = Math.floor(seconds / 60);
        var s = Math.floor(seconds % 60);
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function getSceditorInstance() {
        var textarea = document.getElementById('text_editor_textarea');
        if (textarea && typeof $ !== 'undefined' && $.sceditor) {
            return $(textarea).sceditor('instance');
        }
        return null;
    }

    function safeInsertText(text, endText) {
        var inst = getSceditorInstance();
        if (inst) {
            if (endText) {
                inst.insert(text, endText);
            } else {
                inst.insert(text);
            }
        }
    }

    // ========== نقطة البداية ==========
    function initAudioVideoSystem() {
        // حقن CSS خاص (مع حماية من التكرار)
        if (!document.getElementById('a7la7ekaya-custom-styles')) {
            var styleEl = document.createElement('style');
            styleEl.id = 'a7la7ekaya-custom-styles';
            styleEl.textContent = `
                /* مشغل الصوت */
                .a7la7ekaya-custom-audio-player {
                    background-color: #f1f3f4;
                    border-radius: 50px;
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    padding: 8px 12px;
                    width: 100%;
                    max-width: 400px;
                    box-sizing: border-box;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                    direction: ltr;
                    margin: 10px 0;
                    position: relative;
                    line-height: normal;
                }
                .a7la7ekaya-controls-row {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    width: 100%;
                    gap: 4px;
                }
                .a7la7ekaya-custom-audio-player .a7la7ekaya-icon-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px;
                    outline: none;
                    border-radius: 50%;
                    transition: background-color .2s;
                    box-shadow: none;
                    margin: 0;
                    color: #202124;
                    flex-shrink: 0;
                }
                .a7la7ekaya-custom-audio-player .a7la7ekaya-icon-btn:hover {
                    background-color: rgba(0,0,0,0.08);
                }
                .a7la7ekaya-custom-audio-player .a7la7ekaya-time-display {
                    font-size: 13px;
                    color: #444746;
                    margin: 0 8px;
                    min-width: 65px;
                    text-align: center;
                    user-select: none;
                    flex-shrink: 0;
                }
                .a7la7ekaya-custom-audio-player input[type="range"].a7la7ekaya-Progress {
                    -webkit-appearance: none;
                    flex: 1 1 auto;
                    min-width: 50px;
                    height: 6px;
                    background: linear-gradient(to right, #5f6368 0%, #dadce0 0%);
                    border-radius: 3px;
                    outline: none;
                    margin: 0 8px;
                    cursor: pointer;
                    padding: 0;
                    border: none;
                }
                .a7la7ekaya-custom-audio-player input[type="range"].a7la7ekaya-Progress::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #5f6368;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid #fff;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                }
                .a7la7ekaya-custom-audio-player input[type="range"].a7la7ekaya-Progress::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: #5f6368;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid #fff;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                }

                .a7la7ekaya-download-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 4px;
                    margin-top: 6px;
                }
                .a7la7ekaya-download-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px 10px;
                    background-color: #2e7d32;
                    color: #fff;
                    border-radius: 20px;
                    font-size: 11px;
                    text-decoration: none;
                    font-family: inherit;
                    white-space: nowrap;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.15s;
                    flex-shrink: 0;
                }
                .a7la7ekaya-download-btn:hover {
                    background-color: #1b5e20;
                    transform: scale(1.05);
                }
                .a7la7ekaya-copy-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px 10px;
                    background-color: #1565c0;
                    color: #fff;
                    border-radius: 20px;
                    font-size: 11px;
                    font-family: inherit;
                    white-space: nowrap;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.15s;
                    flex-shrink: 0;
                }
                .a7la7ekaya-copy-btn:hover {
                    background-color: #0d47a1;
                    transform: scale(1.05);
                }
                .a7la7ekaya-share-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px 10px;
                    background-color: #7b1fa2;
                    color: #fff;
                    border-radius: 20px;
                    font-size: 11px;
                    font-family: inherit;
                    white-space: nowrap;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.15s;
                    flex-shrink: 0;
                }
                .a7la7ekaya-share-btn:hover {
                    background-color: #4a148c;
                    transform: scale(1.05);
                }

                /* مشغل الفيديو */
                .a7la7ekaya-custom-video-player {
                    background: #f1f3f4;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 640px;
                    margin: 10px 0;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    overflow: hidden;
                    font-family: "Segoe UI", Tahoma, sans-serif;
                }
                .a7la7ekaya-custom-video-player video {
                    width: 100%;
                    display: block;
                    background: #000;
                }
                .a7la7ekaya-video-controls {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    padding: 8px 12px;
                    gap: 4px;
                }
                .a7la7ekaya-video-controls .a7la7ekaya-icon-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px;
                    border-radius: 50%;
                    color: #202124;
                    transition: background 0.2s;
                    flex-shrink: 0;
                }
                .a7la7ekaya-video-controls .a7la7ekaya-icon-btn:hover {
                    background: rgba(0,0,0,0.08);
                }
                .a7la7ekaya-video-controls .a7la7ekaya-time-display {
                    font-size: 13px;
                    color: #444746;
                    margin: 0 6px;
                    min-width: 65px;
                    text-align: center;
                    flex-shrink: 0;
                }
                .a7la7ekaya-video-controls input[type="range"].a7la7ekaya-progressBar {
                    flex: 1 1 auto;
                    min-width: 50px;
                    height: 6px;
                    -webkit-appearance: none;
                    background: linear-gradient(to right, #5f6368 0%, #dadce0 0%);
                    border-radius: 3px;
                    outline: none;
                    cursor: pointer;
                    margin: 0 6px;
                }
                .a7la7ekaya-video-controls input[type="range"].a7la7ekaya-progressBar::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #5f6368;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid #fff;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                }
                .a7la7ekaya-video-controls input[type="range"].a7la7ekaya-progressBar::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: #5f6368;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid #fff;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                }
                .a7la7ekaya-video-download-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 4px;
                    padding: 0 12px 8px;
                }
                .a7la7ekaya-video-download-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px 10px;
                    background-color: #2e7d32;
                    color: #fff;
                    border-radius: 20px;
                    font-size: 11px;
                    text-decoration: none;
                    font-family: inherit;
                    white-space: nowrap;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.15s;
                    flex-shrink: 0;
                }
                .a7la7ekaya-video-download-btn:hover {
                    background-color: #1b5e20;
                    transform: scale(1.05);
                }
                .a7la7ekaya-video-copy-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px 10px;
                    background-color: #1565c0;
                    color: #fff;
                    border-radius: 20px;
                    font-size: 11px;
                    font-family: inherit;
                    white-space: nowrap;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.15s;
                    flex-shrink: 0;
                }
                .a7la7ekaya-video-copy-btn:hover {
                    background-color: #0d47a1;
                    transform: scale(1.05);
                }
                .a7la7ekaya-video-share-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px 10px;
                    background-color: #7b1fa2;
                    color: #fff;
                    border-radius: 20px;
                    font-size: 11px;
                    font-family: inherit;
                    white-space: nowrap;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.15s;
                    flex-shrink: 0;
                }
                .a7la7ekaya-video-share-btn:hover {
                    background-color: #4a148c;
                    transform: scale(1.05);
                }

                .a7la7ekaya-share-popup {
                    display: none;
                    position: absolute;
                    z-index: 999999;
                    background: #fff;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    padding: 12px;
                    width: 260px;
                    max-width: 90vw;
                    direction: rtl;
                    text-align: right;
                    font-family: Tahoma, sans-serif;
                }
                .a7la7ekaya-share-popup input[type="text"] {
                    width: 100%;
                    padding: 6px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 12px;
                    direction: ltr;
                    margin-bottom: 8px;
                    box-sizing: border-box;
                }
                .a7la7ekaya-share-popup button {
                    background: #e0e0e0;
                    border: 1px solid #ccc;
                    padding: 4px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    margin-left: 4px;
                }

                .postbg-custom {
                    background-size: cover;
                    background-position: center top;
                    padding: 20px;
                    border-radius: 10px;
                    color: #000;
                    position: relative;
                    z-index: 1;
                }
                .bb-blur { filter: blur(2px); display: inline-block; }
                .bb-flipv { display: inline-block; transform: scaleY(-1); }
                table.gdwl {
                    border: 1px solid #aaa;
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    border-radius: 8px;
                    overflow: hidden;
                }
                table.gdwl td {
                    padding: 10px;
                    background: #f9f9f9;
                }

                @media (max-width: 400px) {
                    .a7la7ekaya-custom-audio-player { padding: 6px 8px; }
                    .a7la7ekaya-custom-audio-player .a7la7ekaya-time-display { font-size: 11px; min-width: 55px; margin: 0 4px; }
                    .a7la7ekaya-custom-audio-player .a7la7ekaya-icon-btn { padding: 4px; }
                    .a7la7ekaya-custom-audio-player input[type="range"].a7la7ekaya-Progress { margin: 0 4px; }
                    .a7la7ekaya-download-btn, .a7la7ekaya-copy-btn, .a7la7ekaya-share-btn { padding: 3px 8px; font-size: 10px; }
                    .a7la7ekaya-download-row { gap: 3px; }
                    .a7la7ekaya-video-controls { padding: 6px 8px; gap: 3px; }
                    .a7la7ekaya-video-controls .a7la7ekaya-time-display { font-size: 11px; min-width: 55px; margin: 0 4px; }
                    .a7la7ekaya-video-controls .a7la7ekaya-icon-btn { padding: 4px; }
                    .a7la7ekaya-video-download-btn, .a7la7ekaya-video-copy-btn, .a7la7ekaya-video-share-btn { padding: 3px 8px; font-size: 10px; }
                    .a7la7ekaya-video-download-row { gap: 3px; padding: 0 8px 6px; }
                }
            `;
            document.head.appendChild(styleEl);
        }

        // ========== إنشاء عناصر واجهة المستخدم مرة واحدة ==========
        function createUIElements() {
            if (document.getElementById('a7la7ekaya-share-popup')) return; // موجودة مسبقاً

            var body = document.body;
            var popupsHTML = `
                <div id="audio-popup" style="display:none;position:absolute;z-index:999999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 15px rgba(0,0,0,0.15);padding:12px;width:220px;max-width:90vw;direction:rtl;text-align:right;font-family:Tahoma;">
                    <div style="margin-bottom:8px;font-weight:bold;">رابط الصوت:</div>
                    <input type="text" id="audio-url" value="https://" style="width:100%;padding:5px;border:1px solid #ddd;border-radius:3px;direction:ltr;margin-bottom:10px;">
                    <button type="button" id="audio-insert" style="background:#e0e0e0;color:#333;border:1px solid #ccc;padding:5px 15px;border-radius:3px;cursor:pointer;">إدراج</button>
                </div>
                <div id="video-popup" style="display:none;position:absolute;z-index:999999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 15px rgba(0,0,0,0.15);padding:12px;width:240px;max-width:90vw;direction:rtl;text-align:right;font-family:Tahoma;">
                    <div style="margin-bottom:8px;font-weight:bold;">رابط الفيديو:</div>
                    <input type="text" id="video-url" value="https://" style="width:100%;padding:5px;border:1px solid #ddd;border-radius:3px;direction:ltr;margin-bottom:8px;">
                    <div style="margin-bottom:6px;">العرض: <input type="number" id="video-width" value="640" style="width:70px;padding:3px;border:1px solid #ddd;border-radius:3px;text-align:center;"></div>
                    <div style="margin-bottom:10px;">الارتفاع: <input type="number" id="video-height" value="360" style="width:70px;padding:3px;border:1px solid #ddd;border-radius:3px;text-align:center;"></div>
                    <button type="button" id="video-insert" style="background:#e0e0e0;color:#333;border:1px solid #ccc;padding:5px 15px;border-radius:3px;cursor:pointer;">إدراج</button>
                </div>
                <div id="imglink-popup" style="display:none;position:absolute;z-index:999999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 15px rgba(0,0,0,0.15);padding:12px;width:260px;max-width:90vw;direction:rtl;text-align:right;font-family:Tahoma;">
                    <div style="font-weight:bold;margin-bottom:5px;">رابط الصورة:</div>
                    <input type="text" id="img-url" value="https://" style="width:100%;padding:5px;border:1px solid #ddd;border-radius:3px;direction:ltr;margin-bottom:8px;">
                    <div style="font-weight:bold;margin-bottom:5px;">رابط التوجيه:</div>
                    <input type="text" id="link-url" value="https://" style="width:100%;padding:5px;border:1px solid #ddd;border-radius:3px;direction:ltr;margin-bottom:8px;">
                    <div style="margin-bottom:8px;">العرض (اختياري): <input type="number" id="img-width" placeholder="px" style="width:70px;padding:3px;border:1px solid #ddd;border-radius:3px;text-align:center;"></div>
                    <button type="button" id="imglink-insert" style="background:#e0e0e0;color:#333;border:1px solid #ccc;padding:5px 15px;border-radius:3px;cursor:pointer;">إدراج</button>
                </div>
                <div id="postbg-popup" style="display:none;position:absolute;z-index:999999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 15px rgba(0,0,0,0.15);padding:10px;width:300px;max-width:90vw;direction:rtl;text-align:center;">
                    <div style="font-weight:bold;margin-bottom:5px;">اختر الخلفية:</div>
                    <div id="bg-thumbs" style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;"></div>
                </div>
                <div id="a7la7ekaya-share-popup" class="a7la7ekaya-share-popup">
                    <div style="font-weight:bold;margin-bottom:5px;">رابط المشاركة:</div>
                    <input type="text" id="share-url-input" readonly>
                    <div style="text-align:left;margin-top:8px;">
                        <button type="button" id="share-copy-btn">نسخ</button>
                        <button type="button" id="share-close-btn">إغلاق</button>
                    </div>
                </div>
            `;
            body.insertAdjacentHTML('beforeend', popupsHTML);

            // إضافة صور الخلفيات
            var thumbsContainer = document.getElementById('bg-thumbs');
            if (thumbsContainer) {
                a7la7ekayaNS.bgList.forEach(function(url) {
                    var img = document.createElement('img');
                    img.src = url;
                    img.style.cssText = 'width:60px;height:40px;object-fit:cover;cursor:pointer;border:2px solid #eee;border-radius:3px;';
                    img.setAttribute('data-bg', url);
                    thumbsContainer.appendChild(img);
                });
            }
        }

        // ========== إضافة أزرار المحرر (مراقبة مستمرة) ==========
        function createButtonHTML(className, title, iconSvg) {
            return '<a class="sceditor-button ' + className + '" unselectable="on" title="' + title + '"><div unselectable="on" style="display:flex; align-items:center; justify-content:center; height:100%; background:none!important;">' + iconSvg + '</div></a>';
        }

        function injectEditorButtons() {
            if (typeof $ === 'undefined') return;
            var $toolbar = $('.sceditor-toolbar');
            if ($toolbar.length === 0) return;

            var buttonDefs = [
                { class: 'sceditor-button-a7la7ekaya-audio', title: 'مقطع صوتي', icon: a7la7ekayaNS.icons.mp3 },
                { class: 'sceditor-button-a7la7ekaya-video', title: 'فيديو', icon: a7la7ekayaNS.icons.video },
                { class: 'sceditor-button-a7la7ekaya-postbg', title: 'خلفية الرد', icon: a7la7ekayaNS.icons.postbg },
                { class: 'sceditor-button-a7la7ekaya-username', title: 'اسم العضو', icon: a7la7ekayaNS.icons.username },
                { class: 'sceditor-button-a7la7ekaya-blur', title: 'نص مشع', icon: a7la7ekayaNS.icons.blur },
                { class: 'sceditor-button-a7la7ekaya-frame', title: 'إطار', icon: a7la7ekayaNS.icons.frame },
                { class: 'sceditor-button-a7la7ekaya-flipv', title: 'قلب النص', icon: a7la7ekayaNS.icons.flipv },
                { class: 'sceditor-button-a7la7ekaya-imglink', title: 'صورة برابط', icon: a7la7ekayaNS.icons.imglink }
            ];

            var missingButtons = buttonDefs.filter(function(btn) {
                return $('.' + btn.class).length === 0;
            });

            if (missingButtons.length === 0) return;

            var $after = $('.sceditor-button-youtube');
            if ($after.length === 0) $after = $('.sceditor-button-emoticon');

            missingButtons.forEach(function(btn) {
                var html = createButtonHTML(btn.class, btn.title, btn.icon);
                if ($after.length > 0) {
                    $after.after(html);
                    $after = $('.' + btn.class);
                } else {
                    $toolbar.find('.sceditor-group:last').append(html);
                }
            });
        }

        // ========== ربط الأحداث ==========
        function bindAllEvents() {
            if (typeof $ === 'undefined') return;

            // تعطيل الأحداث السابقة (فك الارتباط) لتجنب التراكم
            $(document).off('click.a7la7ekayaNS');
            $(document).off('mousedown.a7la7ekayaNS');
            $(document).off('loadedmetadata.a7la7ekayaNS');
            $(document).off('timeupdate.a7la7ekayaNS');
            $(document).off('ended.a7la7ekayaNS');
            $(document).off('input.a7la7ekayaNS');

            // فتح/إغلاق النوافذ المنبثقة
            function togglePopup(btnSelector, popupSelector) {
                $(document).on('click.a7la7ekayaNS', btnSelector, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $btn = $(this);
                    var $popup = $(popupSelector);
                    if ($popup.length) {
                        var off = $btn.offset();
                        $popup.css({
                            top: off.top + $btn.outerHeight() + 5,
                            left: off.left - $popup.outerWidth()/2 + $btn.outerWidth()/2
                        }).fadeToggle(100);
                    }
                });
            }

            togglePopup('.sceditor-button-a7la7ekaya-audio', '#audio-popup');
            togglePopup('.sceditor-button-a7la7ekaya-video', '#video-popup');
            togglePopup('.sceditor-button-a7la7ekaya-imglink', '#imglink-popup');
            togglePopup('.sceditor-button-a7la7ekaya-postbg', '#postbg-popup');

            // إغلاق النوافذ عند النقر خارجها
            $(document).on('mousedown.a7la7ekayaNS', function(e) {
                var target = e.target;
                if (!$(target).closest('#audio-popup,.sceditor-button-a7la7ekaya-audio').length) $('#audio-popup').fadeOut(100);
                if (!$(target).closest('#video-popup,.sceditor-button-a7la7ekaya-video').length) $('#video-popup').fadeOut(100);
                if (!$(target).closest('#imglink-popup,.sceditor-button-a7la7ekaya-imglink').length) $('#imglink-popup').fadeOut(100);
                if (!$(target).closest('#postbg-popup,.sceditor-button-a7la7ekaya-postbg').length) $('#postbg-popup').fadeOut(100);
                if (!$(target).closest('#a7la7ekaya-share-popup,.a7la7ekaya-share-btn,.a7la7ekaya-video-share-btn').length) $('#a7la7ekaya-share-popup').fadeOut(100);
            });

            // أزرار الإدراج
            $('#audio-insert').off('click.a7la7ekayaNS').on('click.a7la7ekayaNS', function(e) {
                e.preventDefault();
                var url = $('#audio-url').val().trim();
                if (url && url !== 'https://' && url.length > 5) {
                    safeInsertText('[audio]*' + url + '*[/audio]');
                }
                $('#audio-popup').fadeOut(100);
            });

            $('#video-insert').off('click.a7la7ekayaNS').on('click.a7la7ekayaNS', function(e) {
                e.preventDefault();
                var url = $('#video-url').val().trim();
                var w = $('#video-width').val() || 640;
                var h = $('#video-height').val() || 360;
                if (url && url !== 'https://' && url.length > 5) {
                    safeInsertText('[video width=' + w + ' height=' + h + ']*' + url + '*[/video]');
                }
                $('#video-popup').fadeOut(100);
            });

            $('#imglink-insert').off('click.a7la7ekayaNS').on('click.a7la7ekayaNS', function(e) {
                e.preventDefault();
                var img = $('#img-url').val().trim();
                var link = $('#link-url').val().trim();
                var w = $('#img-width').val();
                if (img && img !== 'https://' && link && link !== 'https://') {
                    var dim = w ? '(' + w + 'px,' + w + 'px)' : '';
                    safeInsertText('[url=' + link + '][img' + dim + ']' + img + '[/img][/url]');
                }
                $('#imglink-popup').fadeOut(100);
            });

            // خلفيات
            $('#bg-thumbs').off('click.a7la7ekayaNS', 'img').on('click.a7la7ekayaNS', 'img', function(e) {
                e.preventDefault();
                var bg = $(this).data('bg');
                safeInsertText('[postbg=' + bg + ']', '[/postbg]');
                $('#postbg-popup').fadeOut(100);
            });

            // أزرار الإدراج المباشر
            $('.sceditor-button-a7la7ekaya-username').off('click.a7la7ekayaNS').on('click.a7la7ekayaNS', function(e) { e.preventDefault(); safeInsertText('{USERNAME}'); });
            $('.sceditor-button-a7la7ekaya-blur').off('click.a7la7ekayaNS').on('click.a7la7ekayaNS', function(e) { e.preventDefault(); safeInsertText('[blur]', '[/blur]'); });
            $('.sceditor-button-a7la7ekaya-frame').off('click.a7la7ekayaNS').on('click.a7la7ekayaNS', function(e) { e.preventDefault(); safeInsertText('[table class=gdwl][tr][td]', '[/td][/tr][/table]'); });
            $('.sceditor-button-a7la7ekaya-flipv').off('click.a7la7ekayaNS').on('click.a7la7ekayaNS', function(e) { e.preventDefault(); safeInsertText('[flipv]', '[/flipv]'); });

            // أحداث المشغلات (نسخ، مشاركة)
            $(document).off('click.a7la7ekayaNS', '.a7la7ekaya-copy-btn, .a7la7ekaya-video-copy-btn').on('click.a7la7ekayaNS', '.a7la7ekaya-copy-btn, .a7la7ekaya-video-copy-btn', function(e) {
                e.preventDefault();
                var url = $(this).data('url');
                var $btn = $(this);
                var origText = $btn.text();
                var fallbackCopy = function() {
                    var textarea = document.createElement('textarea');
                    textarea.value = url;
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        document.execCommand('copy');
                        $btn.text('تم النسخ!');
                        setTimeout(function() { $btn.text(origText); }, 1500);
                    } catch (err) {
                        alert('فشل النسخ.');
                    }
                    document.body.removeChild(textarea);
                };

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(function() {
                        $btn.text('تم النسخ!');
                        setTimeout(function() { $btn.text(origText); }, 1500);
                    }).catch(fallbackCopy);
                } else {
                    fallbackCopy();
                }
            });

            $(document).off('click.a7la7ekayaNS', '.a7la7ekaya-share-btn, .a7la7ekaya-video-share-btn').on('click.a7la7ekayaNS', '.a7la7ekaya-share-btn, .a7la7ekaya-video-share-btn', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var url = $(this).data('url');
                var $btn = $(this);
                var $popup = $('#a7la7ekaya-share-popup');
                $('#share-url-input').val(url);
                var off = $btn.offset();
                $popup.css({
                    top: off.top + $btn.outerHeight() + 5,
                    left: off.left - $popup.outerWidth()/2 + $btn.outerWidth()/2
                }).fadeIn(100);
            });

            $('#share-copy-btn').off('click.a7la7ekayaNS').on('click.a7la7ekayaNS', function(e) {
                e.preventDefault();
                var url = $('#share-url-input').val();
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(function() {
                        alert('تم نسخ الرابط!');
                    }).catch(function() {
                        alert('فشل النسخ.');
                    });
                } else {
                    var textarea = document.createElement('textarea');
                    textarea.value = url;
                    document.body.appendChild(textarea);
                    textarea.select();
                    try { document.execCommand('copy'); alert('تم نسخ الرابط!'); } catch (err) { alert('فشل النسخ.'); }
                    document.body.removeChild(textarea);
                }
            });

            $('#share-close-btn').off('click.a7la7ekayaNS').on('click.a7la7ekayaNS', function(e) {
                e.preventDefault();
                $('#a7la7ekaya-share-popup').fadeOut(100);
            });
        }

        // ========== تحويل BBCodes إلى HTML ==========
        function parseBBCodes() {
            if (typeof $ === 'undefined') return;
            $('.content,.postbody .content,.post-content,.post-body').each(function() {
                var $el = $(this);
                if ($el.attr('data-a7la7ekaya-parsed') === '1') return;
                var html = $el.html();
                if (!html) return;
                var changed = false;

                // تحويل [audio]
                html = html.replace(/\[audio\](.*?)\[\/audio\]/gi, function(m, content) {
                    changed = true;
                    var urlMatch = $('<div>').html(content).text().replace(/\*/g,'').trim().match(/(https?:\/\/[^\s"'<]+)/);
                    var url = urlMatch ? urlMatch[1] : '';
                    if (!url) return m;
                    return '<div class="a7la7ekaya-custom-audio-player">'+
                        '<audio class="a7la7ekaya-myAudio" src="'+url+'" preload="metadata"></audio>'+
                        '<div class="a7la7ekaya-controls-row">'+
                            '<button type="button" class="a7la7ekaya-icon-btn a7la7ekaya-PlayPauseBtn">'+a7la7ekayaNS.svg.play+'</button>'+
                            '<div class="a7la7ekaya-time-display"><span class="a7la7ekaya-CurrentTime">0:00</span> / <span class="a7la7ekaya-Duration">0:00</span></div>'+
                            '<input type="range" class="a7la7ekaya-Progress" value="0" max="100" step="0.1"/>'+
                            '<button type="button" class="a7la7ekaya-MuteBtn a7la7ekaya-icon-btn">'+a7la7ekayaNS.svg.vol+'</button>'+
                        '</div>'+
                        '<div class="a7la7ekaya-download-row">'+
                            '<a href="'+url+'" download target="_blank" class="a7la7ekaya-download-btn">تحميل المقطع</a>'+
                            '<button type="button" class="a7la7ekaya-copy-btn" data-url="'+url+'">نسخ الرابط</button>'+
                            '<button type="button" class="a7la7ekaya-share-btn" data-url="'+url+'">مشاركة</button>'+
                        '</div>'+
                    '</div>';
                });

                // تحويل [video]
                html = html.replace(/\[video width=(\d+) height=(\d+)\]\*?(.*?)\*?\[\/video\]/gi, function(m, w, h, url) {
                    changed = true;
                    url = url.replace(/\*/g,'').trim();
                    return '<div class="a7la7ekaya-custom-video-player">'+
                        '<video class="a7la7ekaya-myVideo" src="'+url+'" preload="metadata" width="'+w+'" height="'+h+'"></video>'+
                        '<div class="a7la7ekaya-video-controls">'+
                            '<button type="button" class="a7la7ekaya-icon-btn a7la7ekaya-videoPlayPauseBtn">'+a7la7ekayaNS.svg.play+'</button>'+
                            '<div class="a7la7ekaya-time-display"><span class="a7la7ekaya-videoCurrentTime">0:00</span> / <span class="a7la7ekaya-videoDuration">0:00</span></div>'+
                            '<input type="range" class="a7la7ekaya-progressBar a7la7ekaya-videoProgress" value="0" max="100" step="0.1"/>'+
                            '<button type="button" class="a7la7ekaya-icon-btn a7la7ekaya-videoMuteBtn">'+a7la7ekayaNS.svg.vol+'</button>'+
                        '</div>'+
                        '<div class="a7la7ekaya-video-download-row">'+
                            '<a href="'+url+'" download target="_blank" class="a7la7ekaya-video-download-btn">تحميل المقطع</a>'+
                            '<button type="button" class="a7la7ekaya-video-copy-btn" data-url="'+url+'">نسخ الرابط</button>'+
                            '<button type="button" class="a7la7ekaya-video-share-btn" data-url="'+url+'">مشاركة</button>'+
                        '</div>'+
                    '</div>';
                });

                // تحويل باقي الوسوم
                html = html.replace(/\[postbg=(.*?)\](.*?)\[\/postbg\]/gs, function(m, bg, txt) { changed = true; return '<div class="postbg-custom" style="background-image:url('+bg+');">'+txt+'</div>'; });
                html = html.replace(/\[blur\](.*?)\[\/blur\]/g, '<span class="bb-blur">$1</span>');
                if (/\[blur\]/.test(html)) changed = true;
                html = html.replace(/\[flipv\](.*?)\[\/flipv\]/g, '<span class="bb-flipv">$1</span>');
                if (/\[flipv\]/.test(html)) changed = true;
                html = html.replace(/\[table class=gdwl\]\[tr\]\[td\](.*?)\[\/td\]\[\/tr\]\[\/table\]/gs, '<table class="gdwl"><tr><td>$1</td></tr></table>');
                if (/\[table class=gdwl\]/.test(html)) changed = true;

                if (changed) $el.html(html);
                $el.attr('data-a7la7ekaya-parsed', '1');
            });
        }

        // ========== ربط أحداث التحكم بالمشغلات ==========
        function bindMediaControls() {
            if (typeof $ === 'undefined') return;
            function bind(selector, type) {
                var isVid = type === 'video';
                var prefix = isVid ? 'video' : '';

                $(document).off('loadedmetadata.a7la7ekayaNS', selector + ' .a7la7ekaya-my' + (isVid ? 'Video' : 'Audio'))
                    .on('loadedmetadata.a7la7ekayaNS', selector + ' .a7la7ekaya-my' + (isVid ? 'Video' : 'Audio'), function() {
                        $(this).closest(selector).find('.a7la7ekaya-' + prefix + 'Duration').text(formatTime(this.duration));
                    });

                $(document).off('click.a7la7ekayaNS', selector + ' .a7la7ekaya-' + prefix + 'PlayPauseBtn')
                    .on('click.a7la7ekayaNS', selector + ' .a7la7ekaya-' + prefix + 'PlayPauseBtn', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var $p = $(this).closest(selector);
                        var media = $p.find(isVid ? 'video' : 'audio')[0];
                        if (!media) return;
                        if (media.paused) {
                            $( (isVid ? 'video' : 'audio') + '.a7la7ekaya-my' + (isVid ? 'Video' : 'Audio') ).each(function() {
                                if (this !== media && !this.paused) {
                                    this.pause();
                                    $(this).closest(selector).find('.a7la7ekaya-' + prefix + 'PlayPauseBtn').html(a7la7ekayaNS.svg.play);
                                }
                            });
                            media.play();
                            $(this).html(a7la7ekayaNS.svg.pause);
                        } else {
                            media.pause();
                            $(this).html(a7la7ekayaNS.svg.play);
                        }
                    });

                $(document).off('timeupdate.a7la7ekayaNS', selector + ' .a7la7ekaya-my' + (isVid ? 'Video' : 'Audio'))
                    .on('timeupdate.a7la7ekayaNS', selector + ' .a7la7ekaya-my' + (isVid ? 'Video' : 'Audio'), function() {
                        var $p = $(this).closest(selector);
                        var cur = this.currentTime;
                        var dur = this.duration || 1;
                        var perc = (cur / dur) * 100;
                        $p.find('.a7la7ekaya-' + prefix + 'CurrentTime').text(formatTime(cur));
                        var prog = $p.find('.a7la7ekaya-' + prefix + 'Progress');
                        prog.val(perc);
                        prog.css('background', 'linear-gradient(to right, #5f6368 ' + perc + '%, #dadce0 ' + perc + '%)');
                    });

                $(document).off('ended.a7la7ekayaNS', selector + ' .a7la7ekaya-my' + (isVid ? 'Video' : 'Audio'))
                    .on('ended.a7la7ekayaNS', selector + ' .a7la7ekaya-my' + (isVid ? 'Video' : 'Audio'), function() {
                        var $p = $(this).closest(selector);
                        $p.find('.a7la7ekaya-' + prefix + 'PlayPauseBtn').html(a7la7ekayaNS.svg.play);
                        $p.find('.a7la7ekaya-' + prefix + 'Progress').val(0).css('background', 'linear-gradient(to right, #5f6368 0%, #dadce0 0%)');
                    });

                $(document).off('input.a7la7ekayaNS', selector + ' .a7la7ekaya-' + prefix + 'Progress')
                    .on('input.a7la7ekayaNS', selector + ' .a7la7ekaya-' + prefix + 'Progress', function() {
                        var $p = $(this).closest(selector);
                        var media = $p.find(isVid ? 'video' : 'audio')[0];
                        if (media && media.duration) {
                            media.currentTime = ($(this).val() / 100) * media.duration;
                        }
                    });

                $(document).off('click.a7la7ekayaNS', selector + ' .a7la7ekaya-' + prefix + 'MuteBtn')
                    .on('click.a7la7ekayaNS', selector + ' .a7la7ekaya-' + prefix + 'MuteBtn', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var $p = $(this).closest(selector);
                        var media = $p.find(isVid ? 'video' : 'audio')[0];
                        if (media) {
                            media.muted = !media.muted;
                            $(this).html(media.muted ? a7la7ekayaNS.svg.mute : a7la7ekayaNS.svg.vol);
                        }
                    });
            }

            bind('.a7la7ekaya-custom-audio-player', 'audio');
            bind('.a7la7ekaya-custom-video-player', 'video');
        }

        // ========== التحديث الدوري التلقائي ==========
        function startAutoUpdate() {
            if (typeof $ === 'undefined') return;
            parseBBCodes();
            bindMediaControls(); // تأكد من ربط الأحداث بعد التحليل الأول

            setInterval(function() {
                $('.content,.postbody .content,.post-content,.post-body').each(function() {
                    var $el = $(this);
                    if ($el.html() && /\[audio\]|\[video\]|\[postbg\]|\[blur\]|\[flipv\]|\[table class=gdwl\]/i.test($el.html())) {
                        $el.removeAttr('data-a7la7ekaya-parsed');
                    }
                });
                parseBBCodes();
                bindMediaControls();
            }, 2000);

            $(document).ajaxComplete(function() {
                setTimeout(function() {
                    $('.content,.postbody .content,.post-content,.post-body').each(function() {
                        var $el = $(this);
                        if ($el.html() && /\[audio\]|\[video\]|\[postbg\]|\[blur\]|\[flipv\]|\[table class=gdwl\]/i.test($el.html())) {
                            $el.removeAttr('data-a7la7ekaya-parsed');
                        }
                    });
                    parseBBCodes();
                    bindMediaControls();
                }, 300);
            });
        }

        // ========== تهيئة كل شيء ==========
        createUIElements();
        injectEditorButtons();
        bindAllEvents();
        startAutoUpdate();

        // إعادة المحاولة لإضافة أزرار المحرر بعد قليل (للتعامل مع المحررات المتأخرة)
        setTimeout(injectEditorButtons, 800);
        setTimeout(injectEditorButtons, 1500);

        // دالة عالمية آمنة
        window.a7la7ekayaReparse = function() {
            if (typeof $ !== 'undefined') {
                $('.content,.postbody .content,.post-content,.post-body').removeAttr('data-a7la7ekaya-parsed');
                parseBBCodes();
                bindMediaControls();
            }
        };
    }

    // ========== بدء التشغيل الآمن عند توفر jQuery ==========
    function waitForjQuery(callback) {
        if (typeof $ !== 'undefined') {
            callback();
        } else {
            var checkInterval = setInterval(function() {
                if (typeof $ !== 'undefined') {
                    clearInterval(checkInterval);
                    callback();
                }
            }, 100);
        }
    }

    waitForjQuery(function() {
        $(document).ready(function() {
            initAudioVideoSystem();
        });
    });

})();
