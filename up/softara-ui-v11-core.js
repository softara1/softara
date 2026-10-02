/* softara-ui-v9 — بوابة واجهة سوفتارا (الإصدار 9)
   الجديد في v9 بناءً على ملاحظات المالك:
   1) إصلاح محازاة عناوين الفئات الطويلة على الموبايل (يمين دائماً — قاعدة دائمة)
   2) نظام شكر مستقل حقيقي بجوار زر الإعجاب: سجل دائم على المنتدى (f5/t533) + لوحة أسماء منزلقة بقلب أحمر ينبض
   3) إخفاء قائمة «أعجبهم هذا الموضوع» داخل زر أنيق بعدد المعجبين — أسماء تنزلق بالتمرير (كمبيوتر) أو باللمس (جوال)
   4) إرجاع اقتباس/تعديل/حذف لمكانها الأصلي بأقصى اليسار ثم رقم المشاركة
   5) فوتر الإعلانات على الجوال: عمودان موحدان بلا كسر نصوص + تنظيم البنرات
   المهام الموروثة: أدوات الإشراف | أسطورة المجموعات | تبويبات الملف الشخصي | جوائز الجوال | تلجرام | كتلة مواقع صديقة */
(function () {
  if (window.__saV6Loaded) return;
  window.__saV6Loaded = true;

  /* ================= CSS ================= */
  var CSS = [
    '/* === softara-ui-v9 === */',
    /* 1) أسطورة المجموعات */
    '.sa-legend{display:flex;flex-wrap:wrap;gap:7px;align-items:center}',
    '.sa-gl{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12.5px;font-weight:700;text-decoration:none!important;line-height:1.6;transition:transform .18s ease,box-shadow .18s ease;border:1px solid transparent}',
    '.sa-gl:hover{transform:translateY(-2px);box-shadow:0 4px 10px rgba(2,6,23,.10)}',
    '.sa-gl .sa-gl-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;box-shadow:0 0 0 2px rgba(255,255,255,.55)}',
    '.sa-gl .sa-gl-n{font-size:10.5px;font-weight:800;padding:0 7px;border-radius:99px;background:rgba(2,6,23,.08);color:inherit;opacity:.85}',
    'body.dark-theme .sa-gl .sa-gl-dot{box-shadow:0 0 0 2px rgba(255,255,255,.25)}',
    'body.dark-theme .sa-gl .sa-gl-n{background:rgba(255,255,255,.10)}',
    '@media(max-width:480px){.sa-gl{font-size:11.5px;padding:3px 10px}.sa-gl .sa-gl-n{font-size:10px;padding:0 6px}.sa-legend{gap:6px}}',
    /* 2) أدوات الإشراف */
    '.sa-modwrap{position:relative;display:inline-block;margin:0;z-index:80}',
    '.sa-modbtn{display:inline-flex;align-items:center;gap:7px;padding:6px 14px;border-radius:999px;background:linear-gradient(145deg,#8b5cf6,#6d28d9);color:#fff!important;border:none;font-weight:700;font-size:12.5px;cursor:pointer;font-family:inherit;box-shadow:0 3px 12px rgba(109,40,217,.35);transition:.2s}',
    '.sa-modbtn:hover{filter:brightness(1.09);transform:translateY(-1px)}',
    '.sa-modbtn .sa-arr{font-size:11px;transition:transform .25s ease}',
    '.sa-modbtn[aria-expanded="true"] .sa-arr{transform:rotate(180deg)}',
    '.sa-modmenu{position:absolute;top:calc(100% + 8px);right:0;width:min(320px,calc(100vw - 24px));background:#fff;border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 16px 44px rgba(2,6,23,.20);padding:8px;opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .2s ease,transform .2s ease,visibility .2s;max-height:calc(100vh - 120px);overflow-y:auto;z-index:9999}',
    '.sa-modmenu.open{opacity:1;visibility:visible;transform:none}',
    '.sa-modhead{font-size:10.5px;font-weight:800;color:#94a3b8;padding:8px 10px 4px;letter-spacing:.4px}',
    '.sa-mi{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:9px;color:#1e293b!important;font-size:13px;font-weight:600;text-decoration:none!important;cursor:pointer;border:none;background:none;width:100%;text-align:right;font-family:inherit;transition:background .15s ease,color .15s ease}',
    '.sa-mi i{width:26px;height:26px;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;background:#f1f5f9;color:#475569;flex-shrink:0;transition:.15s}',
    '.sa-mi:hover{background:#f5f3ff;color:#5b21b6!important}',
    '.sa-mi:hover i{background:#ede9fe;color:#6d28d9}',
    '.sa-mi.sa-danger i{background:#fef2f2;color:#dc2626}',
    '.sa-mi.sa-danger:hover{background:#fef2f2;color:#b91c1c!important}',
    '.sa-mi.sa-danger:hover i{background:#fee2e2;color:#b91c1c}',
    '.sa-msep{height:1px;background:#f1f5f9;margin:6px 8px}',
    'body.dark-theme .sa-modmenu{background:#1e293b;border-color:#334155;box-shadow:0 16px 44px rgba(0,0,0,.5)}',
    'body.dark-theme .sa-mi{color:#e2e8f0}',
    'body.dark-theme .sa-mi i{background:#0f172a;color:#cbd5e1}',
    'body.dark-theme .sa-mi:hover{background:#312e81;color:#c4b5fd!important}',
    'body.dark-theme .sa-mi:hover i{background:#3730a3;color:#ddd6fe}',
    'body.dark-theme .sa-msep{background:#334155}',
    '.sa-modtoast{position:fixed;bottom:18px;right:50%;transform:translateX(50%) translateY(8px);background:#1e293b;color:#fff;padding:10px 20px;border-radius:12px;z-index:99999;font-size:13px;font-weight:700;box-shadow:0 8px 30px rgba(2,6,23,.35);opacity:0;pointer-events:none;transition:opacity .3s ease,transform .3s ease;max-width:calc(100vw - 30px);text-align:center}',
    '.sa-modtoast.show{opacity:1;transform:translateX(50%) translateY(0)}',
    /* 3) قاتل الفراغات في صفحة الموضوع */
    'body div.flx-header-area.flx-header-stacked{margin-bottom:0!important;padding-bottom:0!important}',
    'body article.flx-main-topic{margin-top:0!important}',
    'body article.flx-main-topic:last-of-type,body article.flx-reply-topic:last-of-type{margin-bottom:0!important}',
    'body #quick_reply,body .custom-qr-wrapper{margin-top:0!important;margin-bottom:0!important;padding-top:0!important}',
    'body #flx-mod-container{margin:3px 0!important;padding:0!important;background:none!important;border:none!important}',
    'body #flx-mod-container .mod-toggle-btn,body #flx-mod-container .mod-panel{display:none!important}',
    'body .sa-topmod{margin:4px 0 2px!important;display:flex;justify-content:flex-start;padding:0 2px}',
    'body .sa-botmod{margin:2px 0!important;display:flex;justify-content:flex-start;padding:0 2px}',
    /* 4) محازاة يمين دائمة — عناوين الفئات (إصلاح انحراف العناوين الطويلة بالجوال) */
    '.cat-title{direction:rtl!important;flex-direction:row!important;text-align:right!important}',
    '.cat-title h2{direction:rtl!important;text-align:right!important}',
    /* 5) مواقع صديقة — أعلن معنا */
    '.sa-friends-card{direction:rtl!important;text-align:right!important;background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:16px;padding:14px;margin:10px 0 18px;box-shadow:0 2px 10px rgba(2,6,23,.04)}',
    '.sa-friends-head{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:11px;justify-content:flex-start}',
    '.sa-friends-title{display:inline-flex;align-items:center;gap:8px;font-weight:800;font-size:15px;color:var(--text-color,#1f2937)}',
    '.sa-friends-title i{color:#8b5cf6}',
    '.sa-friends-slogan{font-size:12.5px;font-weight:700;color:#7c3aed;background:rgba(139,92,246,.09);border:1px solid rgba(139,92,246,.22);padding:3px 12px;border-radius:999px}',
    '.sa-friends-grid{display:flex;flex-wrap:wrap;gap:7px;align-items:center;justify-content:flex-start}',
    '.sa-friend{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12.5px;font-weight:700;line-height:1.7;text-decoration:none!important;border:1px solid transparent;transition:transform .18s ease,box-shadow .18s ease,filter .18s ease;white-space:nowrap}',
    '.sa-friend i{font-size:10px;opacity:.85}',
    '.sa-friend.sa-colored{color:#fff!important;box-shadow:0 1px 4px rgba(2,6,23,.10)}',
    '.sa-friend.sa-colored:hover{transform:translateY(-2px);box-shadow:0 4px 10px rgba(2,6,23,.16);filter:brightness(1.07)}',
    '.sa-friend.sa-slot{border-style:dashed;color:#64748b!important;background:transparent}',
    '.sa-friend.sa-slot:hover{filter:none;transform:translateY(-2px);box-shadow:0 4px 10px rgba(2,6,23,.10)}',
    '.sa-friend.sa-cta{color:#fff!important;background:linear-gradient(145deg,#8b5cf6,#6d28d9)!important;border-color:transparent}',
    '.sa-banners-title{display:flex;align-items:center;gap:8px;margin:13px 0 8px;font-weight:800;font-size:13.5px;color:var(--text-color,#1f2937)}',
    '.sa-banners-title .sa-bt-line{flex:1;height:1px;background:var(--border-color,#e5e7eb)}',
    '.sa-banners-title i{color:#8b5cf6;font-size:12px}',
    '.sa-banner-zone{display:flex;flex-wrap:wrap;gap:9px;align-items:flex-end;justify-content:flex-start}',
    '.sa-banner{position:relative;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:2px;border:2px dashed var(--border-color,#cbd5e1);border-radius:12px;background:repeating-linear-gradient(45deg,rgba(139,92,246,.045),rgba(139,92,246,.045) 11px,transparent 11px,transparent 22px);color:#64748b;text-align:center;transition:border-color .18s ease,transform .18s ease,box-shadow .18s ease;box-sizing:border-box;max-width:100%;overflow:hidden}',
    '.sa-banner:hover{border-color:#8b5cf6;transform:translateY(-2px);box-shadow:0 4px 12px rgba(2,6,23,.09)}',
    '.sa-banner b{font-size:clamp(10px,2.6vw,13.5px);color:#7c3aed}',
    '.sa-banner span{font-size:clamp(9px,2.2vw,11.5px);opacity:.85}',
    '.sa-b728{width:728px;max-width:100%;aspect-ratio:728/90}',
    '.sa-b468{width:468px;max-width:100%;aspect-ratio:468/60}',
    '.sa-b300{width:300px;max-width:100%;aspect-ratio:300/100}',
    '.sa-b234{width:234px;max-width:100%;aspect-ratio:234/60}',
    '.sa-b125{width:125px;max-width:100%;aspect-ratio:125/125}',
    'body.dark-theme .sa-friends-card{background:var(--card-bg,#1e293b);border-color:#334155}',
    'body.dark-theme .sa-friend.sa-slot{color:#94a3b8!important}',
    'body.dark-theme .sa-banner{border-color:#475569;color:#94a3b8;background:repeating-linear-gradient(45deg,rgba(139,92,246,.10),rgba(139,92,246,.10) 11px,transparent 11px,transparent 22px)}',
    'body.dark-theme .sa-banner b{color:#c4b5fd}',
    'body.dark-theme .sa-banners-title .sa-bt-line{background:#334155}',
    'body.dark-theme .sa-friends-slogan{background:rgba(139,92,246,.15);color:#c4b5fd}',
    '@media(max-width:480px){.sa-friends-card{padding:11px;border-radius:13px}.sa-friends-slogan{font-size:11.5px}}',
    /* 5-ب) الجوال: عمودان موحدان للإعلانات النصية + بنرات منظمة — بلا كسر نصوص */
    '@media(max-width:600px){.sa-friends-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;align-items:stretch!important}.sa-friend{width:100%!important;max-width:100%!important;white-space:normal!important;word-break:keep-all;overflow-wrap:break-word;min-height:42px;box-sizing:border-box;text-align:right!important;justify-content:flex-start!important;line-height:1.55;padding:5px 11px}}',
    '@media(max-width:600px){.sa-banner-zone{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;align-items:stretch!important}.sa-banner{width:100%!important;max-width:100%!important;aspect-ratio:auto!important;min-height:60px;max-height:64px;padding:5px 6px;box-sizing:border-box;gap:1px}}',
    /* 6) زر الشكر المستقل + زر المعجبين + لوحات الأسماء المنزلقة */
    '@keyframes sa-beat{0%,100%{transform:scale(1)}25%{transform:scale(1.32)}40%{transform:scale(1.06)}55%{transform:scale(1.24)}70%{transform:scale(1)}}',
    '.fa_like_div{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:8px!important}',
    '.fa_like_div ul.profile-icons{display:none!important}',
    '.flx-like-list-box{display:none!important}',
    '.sa-thx,.sa-lk{position:relative;display:inline-flex;align-items:center}',
    '.sa-thx-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:999px;border:1.5px solid #fb7185;background:linear-gradient(145deg,#fff1f4,#ffe3ea);color:#be123c!important;font-size:12.5px;font-weight:800;line-height:1.6;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(225,29,72,.14);transition:transform .18s ease,box-shadow .18s ease,background .2s ease,border-color .2s ease;vertical-align:middle}',
    '.sa-thx-btn i{font-size:12px}',
    '.sa-thx-btn:hover{transform:translateY(-2px);box-shadow:0 5px 14px rgba(225,29,72,.25);filter:brightness(1.03)}',
    '.sa-thx-btn.sa-on{background:linear-gradient(145deg,#e11d48,#be123c);border-color:transparent;color:#fff!important;box-shadow:0 3px 10px rgba(190,18,60,.35)}',
    '.sa-thx-btn.sa-on .sa-thx-heart{animation:sa-beat 1.6s ease-in-out infinite;display:inline-block}',
    '.sa-thx-btn .sa-thx-n,.sa-lk-btn .sa-lk-n{font-size:10.5px;font-weight:800;padding:1px 7px;border-radius:99px;background:rgba(2,6,23,.10);color:inherit;opacity:.92;line-height:1.5}',
    '.sa-thx-btn.sa-on .sa-thx-n{background:rgba(255,255,255,.28)}',
    '.sa-lk-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 13px;border-radius:999px;border:1.5px solid rgba(139,92,246,.30);background:rgba(139,92,246,.08);color:#6d28d9!important;font-size:12.5px;font-weight:800;line-height:1.6;cursor:pointer;font-family:inherit;transition:transform .18s ease,box-shadow .18s ease,background .2s ease;vertical-align:middle}',
    '.sa-lk-btn i{font-size:14px}',
    '.sa-lk-btn:hover{transform:translateY(-2px);background:rgba(139,92,246,.14);box-shadow:0 4px 12px rgba(109,40,217,.18)}',
    '.sa-pop{position:absolute;top:calc(100% + 10px);right:0;width:max-content;max-width:min(330px,calc(100vw - 44px));background:#fff;border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 16px 40px rgba(2,6,23,.20);padding:11px 12px;opacity:0;visibility:hidden;transform:translateY(-8px) scale(.96);transform-origin:top right;transition:opacity .22s ease,transform .25s cubic-bezier(.2,.9,.3,1.2),visibility .22s;z-index:600;text-align:right}',
    '.sa-pop.open{opacity:1;visibility:visible;transform:translateY(0) scale(1)}',
    '.sa-pop-head{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:800;color:#475569;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid #f1f5f9}',
    '.sa-pop-head .fa-heart{color:#e11d48}',
    '.sa-pop-head .sa-heart-beat{animation:sa-beat 1.5s ease-in-out infinite;display:inline-block;color:#e11d48!important}',
    '.sa-pop-head i:not(.fa-heart){color:#8b5cf6;font-size:15px}',
    '.sa-pop-list{display:flex;flex-wrap:wrap;gap:6px;max-height:150px;overflow-y:auto}',
    '.sa-pop-name{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;background:#f8fafc;border:1px solid #e2e8f0;color:#334155!important;font-size:11.5px;font-weight:700;text-decoration:none!important;transition:background .15s ease,transform .15s ease}',
    '.sa-pop-name:hover{background:#f5f3ff;transform:translateY(-1px)}',
    '.sa-pop-name i{font-size:9px;color:#8b5cf6}',
    '.sa-thx .sa-pop-name i{color:#e11d48}',
    '.sa-pop-empty{font-size:11.5px;color:#94a3b8;font-weight:600}',
    'body.dark-theme .sa-thx-btn{background:linear-gradient(145deg,#3f1d24,#2f1418);border-color:#9f1239;color:#fda4af!important}',
    'body.dark-theme .sa-thx-btn.sa-on{background:linear-gradient(145deg,#e11d48,#be123c);color:#fff!important}',
    'body.dark-theme .sa-lk-btn{background:rgba(139,92,246,.14);border-color:rgba(167,139,250,.4);color:#c4b5fd!important}',
    'body.dark-theme .sa-pop{background:#1e293b;border-color:#334155;box-shadow:0 16px 40px rgba(0,0,0,.55)}',
    'body.dark-theme .sa-pop-head{color:#cbd5e1;border-color:#334155}',
    'body.dark-theme .sa-pop-name{background:#0f172a;border-color:#334155;color:#e2e8f0!important}',
    '@media(max-width:480px){.sa-thx-btn{font-size:12px;padding:5px 12px}.sa-lk-btn{font-size:12px;padding:5px 11px}.sa-thx-btn .sa-thx-n,.sa-lk-btn .sa-lk-n{font-size:10px;padding:1px 6px}.sa-pop{right:-20px}}',
    /* 7) تبويبات الملف الشخصي */
    'ul.pro-native-tabs li.activetab > a{color:var(--primary-color,#8b5cf6)!important;border-bottom-color:var(--primary-color,#8b5cf6)!important}',
    'ul.pro-native-tabs li.activetab > a span{color:var(--primary-color,#8b5cf6)}',
    '@media(max-width:768px){ul.pro-native-tabs{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:0 6px}ul.pro-native-tabs::-webkit-scrollbar{display:none}ul.pro-native-tabs li{flex:0 0 auto}ul.pro-native-tabs li a{padding:10px 13px;font-size:.88rem;white-space:nowrap}}',
    /* 8) الأوسمة الممنوحة — كل الشاشات */
    '#profile_awards_full .owned{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:10px}',
    '#profile_awards_full .award_row{display:flex!important;align-items:center;gap:13px;padding:11px 13px;border:1px solid rgba(139,92,246,.16);border-radius:14px;background:var(--card-bg,#fff);box-shadow:0 2px 8px rgba(2,6,23,.05);min-width:0;width:100%!important;max-width:100%!important;box-sizing:border-box;float:none!important}',
    '#profile_awards_full .award_img{float:none!important;width:auto!important;padding:0!important;text-align:center;flex-shrink:0}',
    '#profile_awards_full .award_img .award{width:46px;height:46px}',
    '#profile_awards_full .award_img .award::before{font-size:20px}',
    '#profile_awards_full .award_desc{padding:0!important;word-break:break-word;min-width:0;flex:1 1 auto;width:auto!important;font-size:13px;line-height:1.6}',
    '#profile_awards_full .award_desc b{display:block;margin-bottom:2px}',
    '#profile_awards_full .award_desc p{margin:0!important}',
    'body.dark-theme #profile_awards_full .award_row{border-color:#334155;background:var(--card-bg,#1e293b)}',
    '@media(max-width:480px){#profile_awards_full .owned{grid-template-columns:1fr}#profile_awards_full .award_row{padding:10px 11px}}',
    /* 9) تلجرام */
    '.flx-share-tg:hover{color:#229ED9!important;border-color:#229ED9!important;background:rgba(34,158,217,.08)!important}'
  ].join('\n');

  function injectCss() {
    if (document.getElementById('sa-v6-css')) return;
    var st = document.createElement('style');
    st.id = 'sa-v6-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ================= أدوات مساعدة ================= */
  function toast(msg, ms) {
    var t = document.querySelector('.sa-modtoast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'sa-modtoast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t.__timer);
    t.__timer = setTimeout(function () { t.classList.remove('show'); }, ms || 2600);
  }

  function hex2rgba(h, a) {
    h = String(h || '').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (isNaN(n)) return 'rgba(139,92,246,' + a + ')';
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  function normName(s) {
    return String(s || '')
      .replace(/[\u064B-\u0652\u0640]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function hideEmptyPaginations() {
    ['a7la-PAGINATION', 'a7la-PAGINATION-B'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && !el.children.length && !el.textContent.trim()) {
        el.style.setProperty('display', 'none', 'important');
      }
    });
    var pags = document.querySelectorAll('.flx-header-actions');
    if (pags.length > 1) {
      var bot = pags[pags.length - 1];
      bot.style.setProperty('padding-bottom', '0', 'important');
      bot.style.setProperty('padding-top', '4px', 'important');
    }
    var qr = document.getElementById('quick_reply');
    if (qr) {
      qr.style.setProperty('margin-top', '0', 'important');
      qr.style.setProperty('padding-top', '0', 'important');
    }
    var qrw = document.querySelector('.custom-qr-wrapper');
    if (qrw) {
      qrw.style.setProperty('margin-top', '0', 'important');
      qrw.style.setProperty('padding-top', '0', 'important');
    }
  }

  /* ================= 1) أسطورة المجموعات ================= */
  var GROUP_ORDER = [
    'قيادة سوفتارا', 'نواب القيادة', 'المراقبة الكبرى', 'طاقم المراقبة', 'طاقم الإشراف',
    'المشرفون', 'نخبة سوفتارا',
    'نادي الأساطير', 'نادي البرنسات', 'نادي المتميزين', 'نادي الفعالين', 'نادي المشاركين',
    'أعضاء سوفتارا', 'محظورون'
  ];

  function enhanceLegend() {
    var box = document.querySelector('.groups-legend');
    if (!box || box.getAttribute('data-sa_v7') === '1') return;
    var links = [].slice.call(box.querySelectorAll('a'));
    if (!links.length) return;
    box.setAttribute('data-sa_v7', '1');

    var items = links.map(function (a) {
      var m = (a.getAttribute('style') || '').match(/#[0-9a-fA-F]{3,6}/);
      var cnt = (a.getAttribute('title') || '').match(/:\s*(\d+)\s*$/);
      return {
        name: normName(a.textContent),
        color: m ? m[0] : '#8b5cf6',
        cnt: cnt ? cnt[1] : null,
        href: a.getAttribute('href'),
        title: (a.getAttribute('title') || '').replace(/"/g, '&quot;')
      };
    });

    items.sort(function (x, y) {
      var ix = GROUP_ORDER.indexOf(x.name), iy = GROUP_ORDER.indexOf(y.name);
      if (ix === -1) ix = 99; if (iy === -1) iy = 99;
      return ix - iy;
    });

    var html = '';
    items.forEach(function (it) {
      html += '<a class="sa-gl" href="' + it.href + '" title="' + it.title + '"'
        + ' style="color:' + it.color + ';background:' + hex2rgba(it.color, .10) + ';border-color:' + hex2rgba(it.color, .28) + '">'
        + '<span class="sa-gl-dot" style="background:' + it.color + '"></span>' + it.name
        + (it.cnt !== null ? ' <span class="sa-gl-n">' + it.cnt + '</span>' : '')
        + '</a>';
    });
    box.innerHTML = '<div class="sa-legend">' + html + '</div>';
  }

  /* ================= 2) أدوات الإشراف — نسختان ================= */
  function buildMenuHtml(adminItems, canType, typeItems) {
    var html = '';
    if (canType) {
      html += '<div class="sa-modhead">نوع الموضوع</div>';
      typeItems.forEach(function (it) {
        html += '<button type="button" class="sa-mi" data-ttype="' + it.v + '" data-tlabel="' + it.label + '">'
          + '<i class="fa ' + it.icon + '"></i><span>' + it.label + '</span></button>';
      });
      html += '<div class="sa-msep"></div>';
    }
    html += '<div class="sa-modhead">إدارة الموضوع</div>';
    adminItems.forEach(function (it) {
      html += '<a class="sa-mi' + (it.danger ? ' sa-danger' : '') + '" href="' + it.href + '">'
        + '<i class="fa ' + it.icon + '"></i><span>' + it.title + '</span></a>';
    });
    return html;
  }

  function makeModWrap(menuInner) {
    var wrap = document.createElement('div');
    wrap.className = 'sa-modwrap';
    wrap.innerHTML = '<button type="button" class="sa-modbtn" aria-expanded="false">'
      + '<i class="fa fa-shield-halved"></i><span>أدوات الإشراف</span><i class="fa fa-chevron-down sa-arr"></i></button>'
      + '<div class="sa-modmenu" role="menu">' + menuInner + '</div>';

    var btn = wrap.querySelector('.sa-modbtn');
    var menu = wrap.querySelector('.sa-modmenu');

    function closeMenu() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      [].slice.call(document.querySelectorAll('.sa-modmenu.open')).forEach(function (m) {
        if (m !== menu) { m.classList.remove('open'); var b = m.parentNode.querySelector('.sa-modbtn'); if (b) b.setAttribute('aria-expanded', 'false'); }
      });
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

    [].slice.call(menu.querySelectorAll('[data-ttype]')).forEach(function (el) {
      el.addEventListener('click', function () {
        closeMenu();
        applyTopicType(el.getAttribute('data-ttype'), el.getAttribute('data-tlabel'));
      });
    });
    return wrap;
  }

  function initModTools() {
    var cont = document.getElementById('flx-mod-container');
    if (!cont || cont.getAttribute('data-sa_v7') === '1') return;
    cont.setAttribute('data-sa_v7', '1');

    var adminItems = [];
    [].slice.call(cont.querySelectorAll('a[href]')).forEach(function (a) {
      var img = a.querySelector('img[alt], img[title]');
      var t = img ? (img.getAttribute('alt') || img.getAttribute('title') || '') : (a.getAttribute('title') || '');
      if (!t) t = a.textContent || '';
      t = t.replace(/\s+/g, ' ').trim();
      if (!t) return;
      if (adminItems.some(function (x) { return x.title === t; })) return;
      var icon = 'fa-pen-to-square', danger = false;
      if (/حذف/.test(t)) { icon = 'fa-trash'; danger = true; }
      else if (/سلة/.test(t)) { icon = 'fa-trash-can'; danger = true; }
      else if (/نقل/.test(t)) icon = 'fa-folder-open';
      else if (/اقفل|إغلاق/.test(t)) icon = 'fa-lock';
      else if (/افتح|فتح/.test(t)) icon = 'fa-lock-open';
      else if (/تقسيم|فصل/.test(t)) icon = 'fa-scissors';
      else if (/إدماج|ادماج|دمج/.test(t)) icon = 'fa-code-merge';
      adminItems.push({ href: a.getAttribute('href'), title: t, icon: icon, danger: danger });
    });

    var editA = document.querySelector('a[href*="mode=editpost"]');
    var canType = !!editA;

    var typeItems = [
      { v: '0', label: 'عادي — إلغاء التثبيت/الإعلان', icon: 'fa-circle-check' },
      { v: '1', label: 'تثبيت الموضوع في الأعلى', icon: 'fa-thumbtack' },
      { v: '2', label: 'إعلان داخل هذا القسم', icon: 'fa-bullhorn' },
      { v: '3', label: 'إعلان عام — كل الأقسام', icon: 'fa-globe' }
    ];

    var menuInner = buildMenuHtml(adminItems, canType, typeItems);

    /* النسخة السفلية بعد آخر مشاركة وقبل صف المشاركة/الأزرار */
    cont.className = 'sa-botmod-host';
    cont.innerHTML = '';
    var bottomWrap = makeModWrap(menuInner);
    bottomWrap.classList.add('sa-botmod');
    cont.appendChild(bottomWrap);

    var pagB = document.getElementById('a7la-PAGINATION-B');
    var bottomActions = null, el = pagB ? pagB.nextElementSibling : null;
    while (el && !bottomActions) {
      if (el.classList && el.classList.contains('flx-header-actions')) bottomActions = el;
      el = el.nextElementSibling;
    }
    if (bottomActions && bottomActions.parentNode) {
      bottomActions.parentNode.insertBefore(cont, bottomActions);
    }

    /* النسخة العلوية قبل المشاركة الأولى مباشرة */
    var art1 = document.querySelector('article.flx-main-topic');
    if (art1 && art1.parentNode) {
      var topWrap = makeModWrap(menuInner);
      topWrap.classList.add('sa-topmod');
      art1.parentNode.insertBefore(topWrap, art1);
    }
  }

  function applyTopicType(v, label) {
    var editA = document.querySelector('a[href*="mode=editpost"]');
    if (!editA) { toast('تعذر إيجاد رابط التعديل — سجّل دخولك كمشرف'); return; }
    if (!window.confirm('سيتم تحويل نوع الموضوع إلى:\n«' + label + '»\n\nهل تريد المتابعة؟')) return;
    toast('جارٍ تطبيق التغيير…');

    fetch(editA.getAttribute('href'), { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var form = null, forms = [].slice.call(doc.querySelectorAll('form'));
        for (var i = 0; i < forms.length; i++) {
          if (forms[i].querySelector('[name="message"]')) { form = forms[i]; break; }
        }
        if (!form) { toast('تعذر قراءة نموذج التعديل'); return; }

        var params = new URLSearchParams();
        [].slice.call(form.elements).forEach(function (el) {
          if (!el.name || el.disabled) return;
          var ty = (el.type || '').toLowerCase();
          if (ty === 'submit' || ty === 'button' || ty === 'reset' || ty === 'image' || ty === 'file') return;
          if (ty === 'checkbox' || ty === 'radio') {
            if (el.checked) params.append(el.name, el.value || 'on');
          } else {
            params.append(el.name, el.value);
          }
        });
        params.delete('topictype');
        params.append('topictype', v);
        params.set('post', '1');

        var action = form.getAttribute('action') || editA.getAttribute('href');
        action = action.replace('&amp;', '&');
        if (action.charAt(0) === '/') action = location.origin + action;

        return fetch(action, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          body: params.toString()
        });
      })
      .then(function (resp) {
        if (!resp) return;
        if (!resp.ok) { toast('فشل التطبيق (HTTP ' + resp.status + ') — جرّب من صفحة التعديل'); return; }
        toast('تم التطبيق بنجاح — جارٍ التحديث…');
        setTimeout(function () { location.reload(); }, 700);
      })
      .catch(function () { toast('خطأ في الاتصال — حاول مجدداً'); });
  }

  /* ================= 3) مواقع صديقة — أعلن معنا ================= */
  var FRIENDS = [
    { name: 'سودان نت', url: 'https://almoatn.yoo7.com/' },
    { name: 'منتديات مسرووور', url: 'https://msrooor.yoo7.com/' },
    { name: 'مجتمع نت', url: 'https://snet.yoo7.com/' },
    { name: 'معهد التطوير', url: 'https://deve-arab.yoo7.com/' },
    { name: 'منتدي انكور', url: 'https://forum.iinkor.com/' },
    { name: 'منتدي ويب تنونس', url: 'https://webtn.ahlamontada.com/' },
    { name: 'منتديات واحة الإسلام', url: 'https://wahetaleslam.yoo7.com/' },
    { name: 'منتديات بنات اليوم', url: 'https://bnat2day.mam9.com/' },
    { name: 'منتدي بيوت الطيبين', url: 'https://bayut.forumperso.com/' },
    { name: 'منتدي خبراء المحمول', url: 'https://expert.7olm.org/' }
  ];
  var AD_EXCHANGE_URL = '/f3-التبادل-الإعلاني';
  var SLOTS = 9;
  var PALETTE = [
    ['#7c3aed', '#5b21b6'], ['#2563eb', '#1d4ed8'], ['#0891b2', '#0e7490'], ['#059669', '#047857'],
    ['#16a34a', '#15803d'], ['#65a30d', '#4d7c0f'], ['#ca8a04', '#a16207'], ['#d97706', '#b45309'],
    ['#ea580c', '#c2410c'], ['#dc2626', '#b91c1c'], ['#e11d48', '#be123c'], ['#db2777', '#a21caf'],
    ['#c026d3', '#86198f'], ['#9333ea', '#7e22ce'], ['#4f46e5', '#4338ca'], ['#0284c7', '#0369a1'],
    ['#14b8a6', '#0f766e'], ['#84cc16', '#5b8c0f'], ['#64748b', '#475569'], ['#78716c', '#57534e']
  ];
  function pillColor(idx) {
    var c = PALETTE[idx % PALETTE.length];
    return 'background:linear-gradient(145deg,' + c[0] + ',' + c[1] + ')';
  }

  var BANNERS = [
    { cls: 'sa-b728', size: '728×90', note: 'بانر رئيسي عريض' },
    { cls: 'sa-b468', size: '468×60', note: 'بانر متوسط' },
    { cls: 'sa-b300', size: '300×100', note: 'بانر أفقي مصغر' },
    { cls: 'sa-b234', size: '234×60', note: 'نصف بانر' },
    { cls: 'sa-b125', size: '125×125', note: 'بانر مربع' }
  ];

  function buildFriendsBlock() {
    if (document.getElementById('sa-friends')) return;
    var stats = document.getElementById('a7laFOOTERWIDGETS');
    if (!stats || !stats.parentNode) return;

    var block = document.createElement('div');
    block.id = 'sa-friends';

    var html = '<div class="sa-friends-card">'
      + '<div class="sa-friends-head">'
      + '<span class="sa-friends-title"><i class="fas fa-handshake"></i> مواقع صديقة</span>'
      + '<span class="sa-friends-slogan">أعلن معنا — إعلانك يحقق أهدافك</span>'
      + '<a class="sa-friend sa-cta" href="' + AD_EXCHANGE_URL + '" style="margin-inline-start:auto"><i class="fas fa-bullhorn"></i> اطلب إعلانك الآن</a>'
      + '</div>'
      + '<div class="sa-friends-grid">';
    FRIENDS.forEach(function (f, i) {
      html += '<a class="sa-friend sa-colored" style="' + pillColor(i) + '" href="' + f.url + '" target="_blank" rel="noopener" title="' + f.name + '"><i class="fas fa-star"></i> ' + f.name + '</a>';
    });
    for (var i = 0; i < SLOTS; i++) {
      html += '<a class="sa-friend sa-slot" style="' + pillColor(FRIENDS.length + i) + ';opacity:.55" href="' + AD_EXCHANGE_URL + '" title="احجز خانتك الإعلانية الآن"><i class="fas fa-plus"></i> خانة إعلانية — أعلن معنا</a>';
    }
    html += '</div>';
    html += '<div class="sa-banners-title"><i class="fas fa-rectangle-ad"></i> مساحات بنرية متاحة — اختر مقاسك واحجز مكانك<span class="sa-bt-line"></span></div>';
    html += '<div class="sa-banner-zone">';
    BANNERS.forEach(function (b) {
      html += '<a class="sa-banner ' + b.cls + '" href="' + AD_EXCHANGE_URL + '" title="احجز بنر ' + b.size + '"><b>بنر إعلاني <bdi dir="ltr">' + b.size + '</bdi></b><span>' + b.note + ' — هذا المكان بانتظار إعلانك</span></a>';
    });
    html += '</div></div>';

    block.innerHTML = html;
    stats.parentNode.insertBefore(block, stats.nextSibling);
  }

  /* إخفاء صف مخزن النظام (f5) من الرئيسية — تقني ولا يعني الأعضاء */
  function hideStorageBoard() {
    [].slice.call(document.querySelectorAll('.board-row')).forEach(function (r) {
      if (r.querySelector('a[href^="/f5-"]')) r.style.setProperty('display', 'none', 'important');
    });
  }

  /* ================= 4) نظام الشكر المستقل + زر المعجبين (v9) =================
     الشكر: سجل دائم على المنتدى (موضوع المخزن t533 في f5) — مستقل تماماً عن الإعجاب
     المعجبون: قراءة الأسماء من بيانات المنصة الأصلية وإخفاؤها داخل زر بعدد منزلق */
  var STOR_T = 533;
  var CACHE_KEY = 'sa-thx-cache-v2';
  var QUEUE_KEY = 'sa-thx-queue-v2';
  var SESS_KEY = 'sa-thx-recs-v2';
  var recsByPost = {};   /* pid -> [{fu,fn,tu,tn,ts}] */
  var socialBuilt = {};

  function cacheGet() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) { return null; }
  }
  function cacheSet(recs) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), recs: recs })); } catch (e) {}
  }
  function indexRecs(recs) {
    recsByPost = {};
    recs.forEach(function (r) {
      var pid = r[0];
      if (!recsByPost[pid]) recsByPost[pid] = [];
      var dup = recsByPost[pid].some(function (x) { return x.fu === r[1]; });
      if (!dup) recsByPost[pid].push({ fu: r[1], fn: r[2], tu: r[3], tn: r[4], ts: r[5] });
    });
  }
  function bootFromCache() {
    try {
      var s = sessionStorage.getItem(SESS_KEY);
      if (s) { indexRecs(JSON.parse(s)); return true; }
    } catch (e) {}
    var c = cacheGet();
    if (c && c.recs) { indexRecs(c.recs); return true; }
    return false;
  }
  function saveSession() {
    var all = [];
    Object.keys(recsByPost).forEach(function (pid) {
      recsByPost[pid].forEach(function (x) { all.push([pid, x.fu, x.fn, x.tu, x.tn, x.ts]); });
    });
    try { sessionStorage.setItem(SESS_KEY, JSON.stringify(all)); } catch (e) {}
  }

  function parseRecords(html) {
    var out = [];
    var re = /\[sa-thanks\]([^\[\]]+)\[\/sa-thanks\]/g, m;
    while ((m = re.exec(html))) {
      var kv = {}, parts = m[1].split('|');
      parts.forEach(function (p) {
        var i = p.indexOf('=');
        if (i > 0) kv[p.slice(0, i).trim()] = p.slice(i + 1).trim();
      });
      var pid = (kv.p || '').replace(/^p/i, '');
      if (!pid) continue;
      var fu = kv.fu || kv.from_u || '';
      if (!fu) continue; /* سجل قديم/تالف بلا معرف مُشكر */
      out.push([pid, fu, kv.fn || kv.from || '', kv.tu || kv.to_u || '', kv.tn || kv.to || '', kv.ts || '']);
    }
    return out;
  }

  function fetchPage(url) {
    return fetch(url, { credentials: 'same-origin' }).then(function (r) { return r.ok ? r.text() : ''; });
  }

  function loadRecords(force) {
    var c = cacheGet();
    var fresh = c && (Date.now() - c.t < 3 * 60 * 1000);
    if (fresh && !force) { refreshSocialCounts(); return; }
    fetchPage('/t' + STOR_T + '-topic').then(function (html) {
      if (!html) { refreshSocialCounts(); return; }
      var recs = parseRecords(html);
      /* الصفحات الأخرى إن وجدت — نجلب آخر 8 صفحات كحد أقصى */
      var pages = [];
      var re = new RegExp('href="(/t' + STOR_T + 'p\\d+[^"]*)"', 'g'), pm;
      while ((pm = re.exec(html))) pages.push(pm[1]);
      pages = pages.map(function (u) { return u.replace('&amp;', '&'); });
      pages = pages.filter(function (u, i) { return pages.indexOf(u) === i; }).slice(-8);
      var chain = Promise.resolve(recs);
      pages.forEach(function (u) {
        chain = chain.then(function (acc) {
          return fetchPage(u).then(function (h) { return acc.concat(parseRecords(h)); });
        });
      });
      return chain.then(function (all) {
        /* دمج مع الكاش القديم بلا تكرار */
        var seen = {}, merged = [];
        all.concat((c && c.recs) || []).forEach(function (r) {
          var k = r[0] + '::' + r[1];
          if (!seen[k]) { seen[k] = 1; merged.push(r); }
        });
        cacheSet(merged);
        indexRecs(merged);
        saveSession();
        refreshSocialCounts();
        processQueue();
      });
    }).catch(function () { refreshSocialCounts(); });
  }

  var nameCache = {};
  function fetchMyName(uid) {
    if (nameCache[uid]) return Promise.resolve(nameCache[uid]);
    try {
      var c = localStorage.getItem('sa-name-u' + uid);
      if (c) { nameCache[uid] = c; return Promise.resolve(c); }
    } catch (e) {}
    return fetch('/u' + uid, { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (h) {
        var d = new DOMParser().parseFromString(h, 'text/html');
        var t = d.querySelector('title') ? d.querySelector('title').textContent : '';
        var n = normName(t.split('-').pop());
        if (n && n.length < 40) {
          nameCache[uid] = n;
          try { localStorage.setItem('sa-name-u' + uid, n); } catch (e) {}
        }
        return n;
      })
      .catch(function () { return ''; });
  }

  function currentUser() {
    var uid = null;
    var nav = document.querySelector('.navbar a[href^="/u"]') || document.getElementById('customProfileLink');
    if (nav) uid = (nav.getAttribute('href').match(/^\/u(\d+)/) || [])[1];
    return { uid: uid || null, name: uid ? (nameCache[uid] || '') : '' };
  }

  function isMember() { return !!document.querySelector('a[href*="logout"]'); }

  function parseLikers(art) {
    var out = [], seen = {};
    [].slice.call(art.querySelectorAll('.flx-liker-chip')).forEach(function (c) {
      var n = normName(c.getAttribute('data-title') || c.textContent);
      if (n && !seen[n]) { seen[n] = 1; out.push({ name: n, href: c.getAttribute('href') }); }
    });
    if (out.length) return out;
    var raw = art.querySelector('.fa_like_list');
    if (raw) {
      var txt = normName(raw.textContent)
        .replace(/يعجبهم هذا الرد|يعجبهم هذا الموضوع|أعجبهم هذا الرد|أعجبهم هذا الموضوع|أعجب بهذا|معجب بهذا/g, '').trim();
      if (txt) {
        txt.split(/\s+و\s+/).forEach(function (n) {
          n = n.trim();
          if (n && !seen[n]) { seen[n] = 1; out.push({ name: n, href: null }); }
        });
      }
    }
    return out;
  }

  function nativeLikeCount(art) {
    var nb = art.querySelector('.rep-button .rep-nb');
    return nb ? (parseInt(nb.textContent, 10) || 0) : 0;
  }

  function namesHtml(list, withHref) {
    if (!list.length) return '<div class="sa-pop-empty">لا أحد بعد — كن الأول</div>';
    return list.map(function (x) {
      var inner = '<i class="fas fa-heart"></i>' + esc(x.name);
      return x.href && withHref
        ? '<a class="sa-pop-name" href="' + x.href + '">' + inner + '</a>'
        : '<span class="sa-pop-name">' + inner + '</span>';
    }).join('');
  }

  function buildPop(btnWrap, headIcon, headText, listHtml, beat) {
    var pop = btnWrap.querySelector('.sa-pop');
    if (!pop) {
      pop = document.createElement('div');
      pop.className = 'sa-pop';
      btnWrap.appendChild(pop);
    }
    pop.innerHTML = '<div class="sa-pop-head">'
      + '<i class="fas fa-heart ' + (beat ? 'sa-heart-beat' : '') + '"></i> ' + headText
      + '</div><div class="sa-pop-list">' + listHtml + '</div>';
    return pop;
  }

  /* إدارة فتح/غلق لوحة واحدة فقط */
  function bindPopToggle(wrap, btn) {
    function close() { wrap.querySelector('.sa-pop').classList.remove('open'); }
    function toggle(e) {
      e.stopPropagation();
      var pop = wrap.querySelector('.sa-pop');
      var willOpen = !pop.classList.contains('open');
      [].slice.call(document.querySelectorAll('.sa-pop.open')).forEach(function (p) { p.classList.remove('open'); });
      if (willOpen) pop.classList.add('open');
    }
    btn.addEventListener('click', toggle);
    if (window.matchMedia && matchMedia('(hover:hover)').matches) {
      var timer = null;
      wrap.addEventListener('mouseenter', function () {
        clearTimeout(timer);
        [].slice.call(document.querySelectorAll('.sa-pop.open')).forEach(function (p) { if (!wrap.contains(p)) p.classList.remove('open'); });
        wrap.querySelector('.sa-pop').classList.add('open');
      });
      wrap.addEventListener('mouseleave', function () {
        timer = setTimeout(close, 260);
      });
    }
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  function refreshSocialCounts() {
    [].slice.call(document.querySelectorAll('article[id^="p"]')).forEach(function (art) {
      var pid = art.id.slice(1);
      var state = socialBuilt[pid];
      if (!state) return;
      /* الشكر */
      var recs = recsByPost[pid] || [];
      if (state.thx) {
        var me = currentUser();
        var mine = me.uid && recs.some(function (x) { return x.fu === 'u' + me.uid; });
        state.thxBtn.className = 'sa-thx-btn' + (mine ? ' sa-on' : '');
        state.thxLabel.textContent = mine ? 'شُكر الكاتب' : 'شكر الكاتب';
        var tn = recs.length;
        state.thxN.style.display = tn > 0 ? '' : 'none';
        state.thxN.textContent = tn;
        buildPop(state.thx, 'fa-heart', 'شكرو الكاتب', namesHtml(recs.map(function (r) { return { name: r.fn || r.fu, href: r.fu ? '/' + r.fu : null }; }), true), true);
      }
      /* المعجبون */
      if (state.lk) {
        var names = parseLikers(art);
        var n = Math.max(nativeLikeCount(art), names.length);
        state.lk.style.display = n > 0 ? '' : 'none';
        state.lkN.style.display = n > 0 ? '' : 'none';
        state.lkN.textContent = n;
        buildPop(state.lk, 'fa-thumbs-up', 'أعجبهم هذا الموضوع', namesHtml(names, true), false);
      }
    });
  }

  function initSocial() {
    if (!document.querySelector('article[id^="p"]')) return;
    var me = currentUser(), member = isMember();

    /* هوية العضو تُبنى ديناميكياً في الـnavbar — انتظرها قبل التمييز (مشاركتي/مشاركة غيري) */
    if (member && !me.uid) {
      if (!initSocial.__waiting) {
        initSocial.__waiting = true;
        var tries = 0;
        var iv = setInterval(function () {
          tries++;
          if (currentUser().uid || tries > 13) {
            clearInterval(iv);
            initSocial.__waiting = false;
            initSocial();
          }
        }, 300);
      }
      return;
    }

    [].slice.call(document.querySelectorAll('article[id^="p"]')).forEach(function (art) {
      var pid = art.id.slice(1);
      var likeDiv = art.querySelector('.fa_like_div');
      if (!likeDiv) return;
      var vote = likeDiv.querySelector('.vote');
      if (!vote) return;

      var state = socialBuilt[pid];
      if (!state) { state = socialBuilt[pid] = {}; }

      /* — زر الشكر: للأعضاء فقط وليس لمشاركة العضو نفسه (مع إصلاح ذاتي) — */
      var authorA = art.querySelector('.flx-avatar-box a[href^="/u"]');
      var authorUid = authorA ? (authorA.getAttribute('href').match(/^\/u(\d+)/) || [])[1] : null;
      var ownPost = me.uid && authorUid && me.uid === authorUid;

      if (state.thx && ownPost) {
        state.thx.parentNode.removeChild(state.thx);
        state.thx = null;
      }

      if (member && !ownPost && !state.thx) {
        var thxWrap = document.createElement('div');
        thxWrap.className = 'sa-thx';
        thxWrap.innerHTML = '<button type="button" class="sa-thx-btn" title="شكر الكاتب على هذه المشاركة">'
          + '<i class="fas fa-heart sa-thx-heart"></i><span class="sa-thx-label">شكر الكاتب</span><b class="sa-thx-n" style="display:none">0</b></button>';
        likeDiv.insertBefore(thxWrap, vote.nextSibling);
        state.thx = thxWrap;
        state.thxBtn = thxWrap.querySelector('.sa-thx-btn');
        state.thxLabel = thxWrap.querySelector('.sa-thx-label');
        state.thxN = thxWrap.querySelector('.sa-thx-n');
        bindPopToggle(thxWrap, state.thxBtn);

        state.thxBtn.addEventListener('click', function () {
          if (state.thxBtn.classList.contains('sa-on') || state.busy) return;
          state.busy = true;
          doThank(pid, art, state);
        });
      }

      /* — زر المعجبين (عام حتى للزوار) — */
      if (!state.lk) {
        var lkWrap = document.createElement('div');
        lkWrap.className = 'sa-lk';
        lkWrap.innerHTML = '<button type="button" class="sa-lk-btn" title="من أعجبتهم هذه المشاركة">'
          + '<i class="fas fa-thumbs-up"></i><span>أعجبهم هذا الموضوع</span><b class="sa-lk-n" style="display:none">0</b></button>';
        var anchor = state.thx ? state.thx : vote;
        likeDiv.insertBefore(lkWrap, anchor.nextSibling);
        state.lk = lkWrap;
        state.lkN = lkWrap.querySelector('.sa-lk-n');
        bindPopToggle(lkWrap, lkWrap.querySelector('.sa-lk-btn'));
      }
    });

    refreshSocialCounts();
  }

  function doThank(pid, art, state) {
    var me = currentUser();
    var authorA = art.querySelector('.flx-avatar-box a[href^="/u"]');
    var authorUid = authorA ? (authorA.getAttribute('href').match(/^\/u(\d+)/) || [])[1] : null;
    var toUid = authorUid ? 'u' + authorUid : '';
    var toName = '';
    var un = art.querySelector('.flx-username a');
    if (un) toName = normName(un.textContent);

    if (!me.uid) { toast('سجّل دخولك أولاً لتشكر الكاتب'); state.busy = false; return; }
    if (toUid === 'u' + me.uid) { toast('لا يمكنك شكر مشاركتك'); state.busy = false; return; }

    var nameReady = me.name ? Promise.resolve(me.name) : fetchMyName(me.uid);
    nameReady.then(function (nm) {
      var ts = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
      var rec = [pid, 'u' + me.uid, nm || ('u' + me.uid), toUid, toName, ts];

      /* تحديث فوري متفائل */
      if (!recsByPost[pid]) recsByPost[pid] = [];
      var dup = recsByPost[pid].some(function (x) { return x.fu === rec[1]; });
      if (!dup) recsByPost[pid].push({ fu: rec[1], fn: rec[2], tu: rec[3], tn: rec[4], ts: rec[5] });
      saveSession();
      refreshSocialCounts();
      toast('تم تسجيل شكرك ♥');

      postThanksRecord(rec, function (ok) {
        state.busy = false;
        if (!ok) {
          queueRecord(rec);
          toast('سيتسجل شكرك تلقائياً بعد لحظات…');
          setTimeout(function () { loadRecords(true); }, 4000);
        } else {
          setTimeout(function () { loadRecords(true); }, 2500);
        }
      });
    });
  }

  function postThanksRecord(rec, done) {
    var line = '[sa-thanks]p=' + rec[0] + '|fu=' + rec[1] + '|fn=' + rec[2] + '|tu=' + rec[3] + '|tn=' + rec[4] + '|ts=' + rec[5] + '[/sa-thanks]';
    fetch('/post?t=' + STOR_T + '&mode=reply', { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var form = null, forms = [].slice.call(doc.querySelectorAll('form'));
        for (var i = 0; i < forms.length; i++) {
          if (forms[i].querySelector('[name="message"]')) { form = forms[i]; break; }
        }
        if (!form) { done(false); return; }
        var params = new URLSearchParams();
        [].slice.call(form.elements).forEach(function (el) {
          if (!el.name || el.disabled) return;
          var ty = (el.type || '').toLowerCase();
          if (ty === 'submit' || ty === 'button' || ty === 'reset' || ty === 'image' || ty === 'file') return;
          if (ty === 'checkbox' || ty === 'radio') { if (el.checked) params.append(el.name, el.value || 'on'); }
          else params.append(el.name, el.value);
        });
        params.set('mode', 'reply');
        params.set('t', String(STOR_T));
        params.set('subject', 'شكر');
        params.set('message', line);
        params.set('post', '1');
        var action = form.getAttribute('action') || '/post';
        action = action.replace('&amp;', '&');
        if (action.charAt(0) === '/') action = location.origin + action;
        return fetch(action, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          body: params.toString()
        }).then(function (resp) {
          return resp.text().then(function (t) {
            var flood = /يجب أن تنتظر|بين كل مساهمة/.test(t.slice(0, 6000));
            done(resp.ok && !flood);
          });
        });
      })
      .catch(function () { done(false); });
  }

  function queueRecord(rec) {
    try {
      var q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
      var k = rec[0] + '::' + rec[1];
      if (!q.some(function (x) { return x[0] + '::' + x[1] === k; })) q.push(rec);
      localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
    } catch (e) {}
  }

  function processQueue() {
    var q = [];
    try { q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch (e) {}
    if (!q.length) return;
    (function next(remaining) {
      if (!remaining.length) { try { localStorage.removeItem(QUEUE_KEY); } catch (e) {} return; }
      postThanksRecord(remaining[0], function (ok) {
        if (ok) {
          setTimeout(function () { next(remaining.slice(1)); }, 12000);
        } else {
          try { localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining)); } catch (e) {}
        }
      });
    })(q);
  }

  /* ================= 5) الملف الشخصي: تبويبات AJAX ================= */
  function initProfileTabs() {
    var tabsUl = document.querySelector('ul.pro-native-tabs');
    if (!tabsUl || document.body.getAttribute('data-sa-v6-prof') === '1') return;
    document.body.setAttribute('data-sa-v6-prof', '1');

    var base = (location.pathname.match(/^\/u\d+/) || [])[0];
    if (!base) {
      var h0 = tabsUl.querySelector('a[href^="/u"]');
      base = h0 ? (h0.getAttribute('href').match(/^\/u\d+/) || [])[0] : null;
    }
    if (!base) return;

    var loading = false;

    function isTabUrl(href) {
      if (!href) return false;
      if (href.charAt(0) === '#') return false;
      try {
        var a = new URL(href, location.origin);
        if (a.origin !== location.origin) return false;
        return a.pathname.indexOf(base) === 0;
      } catch (e) { return false; }
    }

    function runScripts(container) {
      [].slice.call(container.querySelectorAll('script')).forEach(function (old) {
        var s = document.createElement('script');
        if (old.src) s.src = old.src;
        s.textContent = old.textContent;
        try { old.parentNode.replaceChild(s, old); } catch (e) {}
      });
    }

    function load(url, push) {
      if (loading) return;
      loading = true;
      var body = document.querySelector('.pro-tabs-body');
      var oldTabs = document.querySelector('ul.pro-native-tabs');
      if (body) body.style.opacity = '0.55';

      fetch(url, { credentials: 'same-origin' })
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var newBody = doc.querySelector('.pro-tabs-body');
          var newTabs = doc.querySelector('ul.pro-native-tabs');
          if (!newBody || !body) { location.href = url; return; }

          body.innerHTML = '';
          [].slice.call(newBody.childNodes).forEach(function (n) {
            body.appendChild(document.importNode(n, true));
          });
          runScripts(body);

          if (newTabs && oldTabs) {
            var newLis = [].slice.call(newTabs.querySelectorAll('li'));
            var activeIdx = -1;
            newLis.forEach(function (li, i) {
              if ((li.className || '').indexOf('activetab') > -1) activeIdx = i;
            });
            [].slice.call(oldTabs.querySelectorAll('li')).forEach(function (li, i) {
              if (i === activeIdx) li.classList.add('activetab');
              else li.classList.remove('activetab');
            });
          }

          var t = doc.querySelector('title');
          if (t) document.title = t.textContent;

          if (push) { try { history.pushState({ saTab: url }, '', url); } catch (e) {} }

          var tabs2 = document.querySelector('ul.pro-native-tabs');
          if (tabs2) {
            var y = tabs2.getBoundingClientRect().top + window.pageYOffset - 84;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
          }
          body.style.opacity = '';
          loading = false;
        })
        .catch(function () { location.href = url; });
    }

    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      if (a.target === '_blank' || e.ctrlKey || e.metaKey) return;
      if (!isTabUrl(href)) return;
      if (!document.querySelector('ul.pro-native-tabs')) return;
      var target = new URL(href, location.origin).pathname.match(/^\/u\d+/);
      if (!target || target[0] !== base) return;
      e.preventDefault();
      load(href, true);
    });

    window.addEventListener('popstate', function () {
      if (document.querySelector('ul.pro-native-tabs') &&
          location.pathname.indexOf(base) === 0) {
        load(location.pathname, false);
      }
    });
  }

  /* ================= 6) تلجرام ================= */
  function wrapShareTopic() {
    var orig = (typeof window.shareTopic === 'function') ? window.shareTopic : null;
    if (window.__saV6ShareWrapped) return;
    window.__saV6ShareWrapped = true;
    window.shareTopic = function (platform) {
      if (platform === 'tg') {
        var url = encodeURIComponent(window.location.href.split('#')[0]);
        var title = encodeURIComponent(document.title);
        window.open('https://t.me/share/url?url=' + url + '&text=' + title, '_blank', 'width=620,height=440');
        return;
      }
      if (orig) return orig.apply(this, arguments);
    };
  }

  function injectTelegram() {
    wrapShareTopic();
    var boxes = document.querySelectorAll('.flx-share-btns');
    [].slice.call(boxes).forEach(function (box) {
      if (box.querySelector('.flx-share-tg')) return;
      var wa = box.querySelector('.flx-share-wa');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'flx-share-btn flx-share-tg';
      b.setAttribute('title', 'مشاركة على تلجرام');
      b.setAttribute('aria-label', 'مشاركة على تلجرام');
      b.innerHTML = '<i class="fab fa-telegram"></i>';
      b.addEventListener('click', function () { window.shareTopic('tg'); });
      if (wa && wa.parentNode === box) {
        box.insertBefore(b, wa.nextSibling);
      } else {
        box.insertBefore(b, box.firstChild);
      }
    });
  }

  var tgObserver = null;
  function watchTelegram() {
    if (tgObserver || !window.MutationObserver) return;
    tgObserver = new MutationObserver(function () { injectTelegram(); });
    tgObserver.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { if (tgObserver) { tgObserver.disconnect(); tgObserver = null; } }, 20000);
  }

  /* ================= التشغيل ================= */
  function rescan() {
    hideEmptyPaginations();
    enhanceLegend();
    initModTools();
    injectTelegram();
    buildFriendsBlock();
    hideStorageBoard();
    initSocial();
  }

  function boot() {
    injectCss();
    hideEmptyPaginations();
    enhanceLegend();
    initModTools();
    initProfileTabs();
    injectTelegram();
    buildFriendsBlock();
    hideStorageBoard();
    bootFromCache();
    initSocial();
    var me0 = currentUser();
    if (me0.uid) fetchMyName(me0.uid).then(function () { refreshSocialCounts(); });
    setTimeout(loadRecords, 1600);
    setTimeout(processQueue, 9000);
    setTimeout(rescan, 1200);
    setTimeout(rescan, 3000);
    watchTelegram();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

/* softara-ui-v10 — بوابة واجهة سوفتارا (الإصدار 10)
   مهام المالك في هذه الدفعة:
   1) سلة المهملات: مواضيعها لا تظهر في ودجات الرئيسية إطلاقاً + المخزن t533 عاد إلى f5
   2) أفاتار النافذة المنبثقة: يظهر دائماً الصورة الحديثة (كسر الكاش القديم)
   3) الإشعارات والنافذة الشخصية: RTL يمين على الحاسوب والجوال
   4) الأغلفة: أول صورة في الموضوع (حتى الخارجية) تصبح غلاف السلايدر + كاش يخفف الطلبات
   5) صفحات الملف الشخصي: توحيد التخطيط + قائمة قابلة للطي على الجوال + إصلاح محرر التوقيع
   6) حائط التعليقات: صندوق تعليق + زرا إعجاب وشكر لكل تعليق (سجل دائم في المخزن)
   7) مكتبة الصور: تصميم أنيق RTL كامل
   8) مفاجأة: شريط تقدم القراءة في المواضيع
   القواعد الدائمة: RTL يمين دائماً | الجوال أولاً | حركات transform/opacity فقط */
(function () {
  if (window.__saV10Loaded) return;
  window.__saV10Loaded = true;

  /* v11-b: نُقل السلايدر والأغلفة إلى قالب index_body */

  /* ═══ 1) الهوية ═══ */
  var ME = {
    id: (typeof _userdata !== 'undefined' && _userdata.user_id) ? String(_userdata.user_id) : '',
    name: (typeof _userdata !== 'undefined' && _userdata.username) || '',
    logged: (typeof _userdata !== 'undefined' && _userdata.session_logged_in == 1),
    avatar: ''
  };
  try {
    if (typeof _userdata !== 'undefined' && _userdata.avatar_link) ME.avatar = _userdata.avatar_link;
    else if (typeof _userdata !== 'undefined' && _userdata.avatar) {
      var mAv = String(_userdata.avatar).match(/src=["']([^"']+)["']/);
      if (mAv) ME.avatar = mAv[1];
    }
  } catch (eAv) {}

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function qs(s, r) { return (r || document).querySelector(s); }
  function qsa(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* ═══ 2) CSS ═══ */
  var CSS = [
    /* === الإشعارات والنافذة الشخصية: يمين دائماً === */
    '#notificationsBox,#userDropdown,.dropdown-panel{direction:rtl!important;text-align:right!important}',
    '.dropdown-panel *{direction:rtl;text-align:right}',
    '.dropdown-panel .notif-header{text-align:right!important;padding:10px 14px!important;font-weight:800!important}',
    '#notificationsBox .notif-list li{text-align:right!important}',
    '#userDropdown .dropdown-menu-list li a{flex-direction:row!important;justify-content:space-between}',
    '#userDropdown .dropdown-footer a{flex-direction:row!important;justify-content:center;gap:8px}',
    '@media(max-width:600px){#notificationsBox,#userDropdown{left:8px!important;right:8px!important;width:auto!important;max-width:calc(100vw - 16px)!important}}',

    /* === فك الإخفاء العام عن .inner (كان يقتل محرر التوقيع) === */
    '.panel>.inner,.block>.inner,#postingbox>.inner,.block-posting .inner,.block-content>.inner{display:block!important}',

    /* === تنبيهات موحدة === */
    '.sa-alert{padding:12px 16px;border-radius:10px;font-weight:700;margin:0 0 14px;direction:rtl;text-align:right;display:flex;gap:8px;align-items:center;font-size:.95rem}',
    '.sa-alert-error{background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5}',
    'body.dark-theme .sa-alert-error{background:rgba(239,68,68,.14);color:#fca5a5;border-color:rgba(239,68,68,.35)}',

    /* === لوحة تحكم الملف الشخصي: أنيقة ومدمجة === */
    '.cp-modern-container{direction:rtl!important;text-align:right!important;align-items:flex-start!important}',
    '.cp-side-title{color:var(--primary-color,#8b5cf6)!important;margin:0 0 12px!important;border-bottom:2px solid var(--bg-color,#f4f6f9)!important;padding:0 0 10px!important;font-size:1rem!important;display:flex;align-items:center;gap:8px}',
    '.cp-sidebar-modern{flex:0 0 232px!important;position:sticky;top:75px;padding:12px!important;border-radius:14px!important}',
    '.cp-sidebar-modern ul li a{padding:9px 12px!important;font-size:.88rem!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:6px!important;border-radius:9px!important}',
    '.cp-sidebar-modern ul li a::after{content:"\\f104";font-family:"Font Awesome 6 Free";font-weight:900;opacity:.4;font-size:.72rem}',
    '.cp-sidebar-modern ul li a:hover::after{opacity:1}',
    '.cp-inner-modern{flex:1!important;min-width:0!important}',
    '.cp-inner-modern table,.cp-block-content table{direction:rtl!important}',
    '.cp-inner-modern td,.cp-inner-modern th,.cp-block-content td,.cp-block-content th{text-align:right!important;vertical-align:middle!important}',
    '.cp-inner-modern label,.cp-block-content label{direction:rtl;text-align:right}',
    '.sa-scroll-x{overflow-x:auto;-webkit-overflow-scrolling:touch;max-width:100%}',
    '.sa-scroll-x table{min-width:560px}',

    /* === زر طي لوحة التحكم (جوال) === */
    '.sa-side-toggle{display:none}',
    '@media(max-width:768px){',
    '.sa-side-toggle{display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 14px;margin:0 0 12px;background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:11px;font-weight:800;color:var(--text-color,#1f2937);cursor:pointer;font-family:inherit;font-size:.95rem;box-shadow:0 1px 3px rgba(2,6,23,.06);transition:box-shadow .2s ease}',
    '.sa-side-toggle:active{box-shadow:0 2px 8px rgba(139,92,246,.2)}',
    '.sa-side-toggle .sa-tg-ic{display:inline-flex;align-items:center;gap:8px}',
    '.sa-side-toggle i.fa-chevron-down{transition:transform .25s ease;opacity:.6;font-size:.8rem}',
    '.sa-side-toggle.open i.fa-chevron-down{transform:rotate(180deg)}',
    '.sa-side-collapse{overflow:hidden;max-height:0;opacity:0;transition:max-height .32s ease,opacity .25s ease;margin:0}',
    '.sa-side-collapse.open{max-height:1100px;opacity:1}','/* استثناء القائمة الجانبية لصفحات التحكم من إخفاء الثيم لروابطها بالجوال — روابطها تعرض دائماً داخلها */','.cp-sidebar-modern .tabs.mobile-hidden{display:block!important}','.cp-sidebar-modern .tabs.mobile-hidden li a{display:flex!important}',
    '.cp-sidebar-modern{position:static!important;flex-basis:100%!important}',
    '}',

    /* === الحائط: صندوق التعليق + أزرار التفاعل === */
    '.sa-wall-box{display:flex;gap:11px;background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:14px;padding:13px;margin:0 0 18px;box-shadow:0 1px 4px rgba(2,6,23,.05)}',
    '.sa-wall-box img.sa-wall-av{width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid rgba(139,92,246,.25)}',
    '.sa-wall-main{flex:1;min-width:0}',
    '.sa-wall-main textarea{width:100%;min-height:76px;border:1px solid var(--border-color,#e5e7eb);border-radius:11px;padding:10px 13px;font-family:inherit;font-size:.95rem;resize:vertical;background:var(--bg-color,#f8fafc);color:var(--text-color,#1f2937);box-sizing:border-box}',
    '.sa-wall-main textarea:focus{outline:none;border-color:#a78bfa;box-shadow:0 0 0 3px rgba(139,92,246,.12)}',
    '.sa-wall-foot{display:flex;justify-content:space-between;align-items:center;margin-top:9px;gap:8px;flex-wrap:wrap}',
    '.sa-wall-hint{font-size:.78rem;color:var(--text-muted,#6b7280)}',
    '.sa-wall-send{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border:none;border-radius:999px;padding:9px 22px;font-weight:800;cursor:pointer;display:inline-flex;gap:7px;align-items:center;transition:transform .2s ease,box-shadow .2s ease;font-family:inherit;font-size:.9rem}',
    '.sa-wall-send:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(139,92,246,.35)}',
    '.sa-wall-send[disabled]{opacity:.55;cursor:wait;transform:none!important}',
    'body.dark-theme .sa-wall-box textarea{background:rgba(255,255,255,.05)}',

    '.sa-wall-actions{display:flex;gap:8px;align-items:center;margin-top:12px;flex-wrap:wrap;position:relative}',
    '.sa-wbtn{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border-color,#e5e7eb);background:var(--bg-color,#f8fafc);color:var(--text-color,#1f2937);border-radius:999px;padding:5px 14px;font-size:.82rem;font-weight:700;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease;font-family:inherit;text-decoration:none!important}',
    '.sa-wbtn:hover{transform:translateY(-1px);border-color:#c4b5fd;box-shadow:0 3px 8px rgba(139,92,246,.15)}',
    '.sa-wbtn.sa-on{background:linear-gradient(135deg,#f472b6,#db2777);border-color:transparent;color:#fff}',
    '.sa-wbtn.sa-wth.sa-on{background:linear-gradient(135deg,#fbbf24,#d97706)}',
    '.sa-wbtn[disabled]{opacity:.65;cursor:default;transform:none!important}',
    '.sa-wbtn .sa-wc{font-weight:800}',
    '.sa-heart{display:inline-block}',
    '.sa-heart.sa-beat{animation:saWBeat 1.1s ease-in-out infinite;color:#e11d48}',
    '.sa-wbtn.sa-on .sa-heart{color:#fff}',
    '@keyframes saWBeat{0%,100%{transform:scale(1)}25%{transform:scale(1.28)}40%{transform:scale(1.02)}}',

    /* لوحة أسماء المعجبين/المشكرين للحائط */
    '.sa-wpop{position:absolute;background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:12px;box-shadow:0 10px 26px rgba(2,6,23,.16);padding:9px;z-index:9990;min-width:175px;max-width:250px;direction:rtl;text-align:right;opacity:0;transform:translateY(6px);pointer-events:none;transition:opacity .22s ease,transform .22s ease}',
    '.sa-wpop.open{opacity:1;transform:translateY(0);pointer-events:auto}',
    '.sa-wpop .sa-wpop-t{font-size:.75rem;font-weight:800;color:var(--text-muted,#6b7280);padding:2px 6px 7px;border-bottom:1px dashed var(--border-color,#e5e7eb);margin-bottom:6px;display:flex;gap:6px;align-items:center}',
    '.sa-wchip{display:flex;align-items:center;gap:8px;padding:5px 6px;border-radius:8px;font-size:.83rem;font-weight:700;color:var(--text-color,#1f2937);text-decoration:none!important}',
    '.sa-wchip:hover{background:rgba(139,92,246,.09)}',
    '.sa-wchip img{width:22px;height:22px;border-radius:50%;object-fit:cover}',
    '.sa-wpop .sa-wempty{font-size:.78rem;color:var(--text-muted);padding:4px 6px}',

    /* إخفاء زر «تعليق جديد» الشبح (صورة فارغة) */
    '.pro-actions .new-message-link a img[src*="empty.gif"]{display:none!important}',

    /* === v11-c: صندوق حائط ماسنجر ثابت من القالب + فقاعة تعليقي === */
    '#sa-wall-fullwrap{margin:-8px 0 18px;text-align:left}',
    '#sa-wall-full{font-size:.78rem;color:var(--text-muted,#6b7280);text-decoration:none!important;border-bottom:1px dashed var(--border-color,#e5e7eb);transition:color .15s ease}',
    '#sa-wall-full:hover{color:var(--primary-color,#8b5cf6)}',
    '.sa-wall-mine{display:flex;justify-content:flex-start;background:transparent;border:none;box-shadow:none;padding:0;margin:0 0 14px}',
    '.sa-wall-mine .sa-bubble{max-width:85%;background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border-radius:14px 14px 4px 14px;padding:10px 15px;box-shadow:0 3px 10px rgba(109,40,217,.28)}',
    '.sa-wall-mine .sa-bubble-head{display:flex;gap:8px;align-items:center;font-size:.78rem;opacity:.92;margin-bottom:4px}',
    '.sa-wall-mine .sa-bubble p{margin:0;line-height:1.65;word-break:break-word}',
    '@media(max-width:600px){.sa-wall-box{padding:11px;gap:9px}.sa-wall-box img.sa-wall-av{width:38px;height:38px}.sa-wall-send{min-height:48px;flex:1;justify-content:center}.sa-wall-main textarea{min-height:66px;font-size:1rem}}',
    '@media(max-width:360px){.sa-wall-mine .sa-bubble{max-width:85%}}',

    /* === مكتبة الصور: تصميم جديد === */
    'body.sa-gallery-css .page-header h1{display:flex;align-items:center;gap:10px;color:var(--primary-color,#8b5cf6);font-size:1.4rem;margin:0 0 16px;padding:14px 18px;background:var(--card-bg,#fff);border:1px solid var(--border-color,#e5e7eb);border-radius:14px;direction:rtl;text-align:right;box-shadow:0 1px 4px rgba(2,6,23,.05)}',
    'body.sa-gallery-css .page-header h1::before{content:"\\f03e";font-family:"Font Awesome 6 Free";font-weight:900;font-size:1.1rem;opacity:.85}',
    'body.sa-gallery-css .grid-3{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(225px,1fr));gap:15px;direction:rtl}',
    'body.sa-gallery-css .block-gallery{background:var(--card-bg,#fff)!important;border:1px solid var(--border-color,#e5e7eb)!important;border-radius:14px!important;padding:12px!important;direction:rtl!important;text-align:right!important;transition:transform .22s ease,box-shadow .22s ease;display:flex;flex-direction:column;gap:10px}',
    'body.sa-gallery-css .block-gallery:hover{transform:translateY(-4px);box-shadow:0 12px 26px rgba(2,6,23,.11)}',
    'body.sa-gallery-css .block-gallery-title{order:1}',
    'body.sa-gallery-css .block-gallery-title a{font-weight:800;font-size:1rem;color:var(--text-color,#1f2937);text-decoration:none!important}',
    'body.sa-gallery-css .block-gallery-thumbnail{order:2;display:block!important;height:145px!important;border-radius:10px!important;overflow:hidden!important;background:var(--bg-color,#f4f6f9);margin:0!important}',
    'body.sa-gallery-css .block-gallery-thumbnail img{width:100%!important;height:100%!important;object-fit:cover!important;border:none!important;padding:0!important;transition:transform .35s ease;display:block}',
    'body.sa-gallery-css .block-gallery:hover .block-gallery-thumbnail img{transform:scale(1.06)}',
    'body.sa-gallery-css .block-footer{order:3}',
    'body.sa-gallery-css .block-gallery-info{font-size:.79rem;color:var(--text-muted,#6b7280)!important;direction:rtl!important;text-align:right!important}',
    'body.sa-gallery-css .block-gallery-description{direction:rtl;text-align:right;font-size:.85rem}',
    'body.sa-gallery-css .action-bar-gallery{display:flex;flex-wrap:wrap;gap:9px;list-style:none!important;padding:0!important;margin:18px 0!important;direction:rtl!important;justify-content:flex-start}',
    'body.sa-gallery-css .action-bar-gallery li{background:var(--card-bg,#fff)!important;border:1px solid var(--border-color,#e5e7eb)!important;border-radius:999px!important;padding:9px 17px!important;font-weight:700;font-size:.9rem;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;display:inline-flex;align-items:center;gap:8px}',
    'body.sa-gallery-css .action-bar-gallery li:hover{transform:translateY(-2px);border-color:#c4b5fd;box-shadow:0 4px 12px rgba(139,92,246,.15)}',
    'body.sa-gallery-css .action-bar-gallery li img{display:none!important}',
    'body.sa-gallery-css .action-bar-gallery li a{color:var(--text-color,#1f2937);text-decoration:none!important}',
    'body.sa-gallery-css .action-bar-gallery li .material-symbols-outlined{font-size:19px;color:var(--primary-color,#8b5cf6)}',
    '@media(max-width:600px){body.sa-gallery-css .grid-3{grid-template-columns:repeat(2,1fr)!important;gap:10px}body.sa-gallery-css .block-gallery-thumbnail{height:98px!important}body.sa-gallery-css .block-gallery-title a{font-size:.9rem}body.sa-gallery-css .action-bar-gallery li{padding:8px 13px!important;font-size:.8rem}}',

    /* === مفاجأة: شريط تقدم القراءة === */
    '#sa-progress{position:fixed;top:0;right:0;left:0;height:3px;z-index:200000;pointer-events:none;background:transparent}',
    '#sa-progress .sa-progress-fill{height:100%;width:100%;background:linear-gradient(270deg,#8b5cf6,#06b6d4,#ec4899);transform:scaleX(0);transform-origin:right center;box-shadow:0 0 8px rgba(139,92,246,.5)}'
  ].join('\n');
  var v10style = document.createElement('style');
  v10style.id = 'sa-v10-css';
  v10style.textContent = CSS;
  (document.head || document.body).appendChild(v10style);

  /* ═══ 3) أفاتار النافذة المنبثقة: دائماً حديث ═══ */
  function fixAvatarCache() {
    /* احذف كاش أفاتاري القديم (sfrc2 كان يُحفظ 7 أيام) */
    try {
      if (ME.id) {
        localStorage.removeItem('sfrc2_avatar_' + ME.id);
        localStorage.removeItem('sfrc2_cover_' + ME.id);
        localStorage.removeItem('sfrc2_ts_' + ME.id);
        /* مفاتيح الجيل الأقدم إن وجدت */
        localStorage.removeItem('sfrc_avatar_' + ME.id);
        localStorage.removeItem('sfrc_ts_' + ME.id);
      }
    } catch (ePurge) {}
    /* اضبط صور الهيدر فوراً من بيانات الجلسة الرسمية */
    if (!ME.avatar) return;
    onReady(function () {
      var attempts = 0;
      (function setAv() {
        var big = document.getElementById('customUserAvatarLarge');
        var small = document.getElementById('customUserAvatar');
        if (big) { big.src = ME.avatar; big.removeAttribute('srcset'); }
        if (small) { small.src = ME.avatar; small.removeAttribute('srcset'); }
        if ((!big && !small) && ++attempts < 25) setTimeout(setAv, 220);
      })();
    });
  }
  fixAvatarCache();

  /* ═══ 4) إضافة رابط حائط التعليقات في نافذة العضو ═══ */
  function addWallLink() {
    if (!ME.id) return;
    var list = qs('#userDropdown .dropdown-menu-list');
    if (!list || qs('#userDropdown .dropdown-menu-list a[href="/u' + ME.id + 'wall"]')) return;
    var li = document.createElement('li');
    li.innerHTML = '<a href="/u' + ME.id + 'wall"><span>حائط التعليقات</span> <i class="fas fa-pen-nib"></i></a>';
    /* ضعه قبل «مواضيعي ومشاركاتي» */
    var ref = null;
    qsa('a', list).forEach(function (a) { if ((a.getAttribute('href') || '').indexOf('egosearch') > -1) ref = a.parentElement; });
    list.insertBefore(li, ref || list.lastElementChild);
  }

  /* ═══ 5) مواضيع ممنوعة من ودجات الرئيسية (السلة f2 + المخزن f5/t533) ═══ */
  var HIDDEN_KEY = 'sa-hidden-topics-v1';
  function hiddenTopics() {
    try {
      var c = JSON.parse(sessionStorage.getItem(HIDDEN_KEY) || 'null');
      if (c && c.ids && Date.now() - c.t < 30 * 60 * 1000) return Promise.resolve(c.ids);
    } catch (eC) {}
    function grab(url) {
      return fetch(url, { credentials: 'same-origin' }).then(function (r) { return r.ok ? r.text() : ''; }).catch(function () { return ''; });
    }
    return Promise.all([grab('/f5-montada'), grab('/f2-')]).then(function (hs) {
      var ids = { '533': 1 };
      hs.forEach(function (h) {
        /* فقط قائمة مواضيع القسم — وليس ودجات الفوتر التي تذكر كل المنتدى */
        var cut = h.indexOf('a7laFOOTERWIDGETS');
        var main = cut > 0 ? h.slice(0, cut) : h;
        var cut2 = main.search(/cyb-stats|id="tab-last-posts"/);
        if (cut2 > 0) main = main.slice(0, cut2);
        var re = /\/t(\d+)-/g, m;
        while ((m = re.exec(main))) ids[m[1]] = 1;
      });
      try { sessionStorage.setItem(HIDDEN_KEY, JSON.stringify({ t: Date.now(), ids: ids })); } catch (eS) {}
      return ids;
    });
  }
  function filterWidgets() {
    if (location.pathname !== '/') return;
    hiddenTopics().then(function (hidden) {
      var removed = 0;
      qsa('.flx-side-item').forEach(function (it) {
        var a = qs('.flx-post-title', it);
        var m = a && a.href.match(/\/t(\d+)-/);
        if (m && hidden[m[1]]) { it.remove(); removed++; }
      });
      /* ودجات الإحصائيات السفلية (cyb) وقوائم أخرى */
      qsa('.cyb-list li, #a7laFOOTERWIDGETS li').forEach(function (li) {
        var a = qs('a[href*="/t"]', li);
        var m = a && a.href.match(/\/t(\d+)-/);
        if (m && hidden[m[1]]) { li.remove(); removed++; }
      });
      /* الودج الخام: أي رابط موضوع داخل منطقة ودجات الرئيسية */
      qsa('#a7laFOOTERWIDGETS a[href*="/t"]').forEach(function (a) {
        var m = a.href.match(/\/t(\d+)-/);
        if (m && hidden[m[1]]) {
          var li = a.closest('li, tr, .cyb-item, div');
          if (li) { li.remove(); removed++; } else { a.remove(); removed++; }
        }
      });
      if (removed) console.log('[SA-v10] أُخفي ' + removed + ' عنصر ودج من مواضيع السلة/المخزن');
    });
  }

  /* v11-b: نُقل السلايدر والأغلفة إلى قالب index_body */

  /* ═══ 7) صفحات الملف الشخصي: توحيد التخطيط + طي الجوال ═══ */
  function restructureProfile() {
    var p = location.pathname + location.search;
    var isProfile = /\/profile|\/u\d+(wall|stats|friends|followers|groups|awards|contact)?/.test(location.pathname);
    if (!isProfile) return;

    /* أ) صفحات القائمة الأصلية (مرفقات/إشعارات/وسوم/متابعة): لفّها بتخطيط cp-modern الموحد */
    var side = qs('.cp-sidebar');
    if (side && !qs('.cp-modern-container')) {
      /* المحتوى = أقرب عنصر سابق يحوي نموذجاً أو جدولاً أو نصاً كافياً */
      var content = null, hop = side.previousElementSibling;
      for (var i = 0; i < 3 && hop; i++) {
        if (qs('form, table', hop) || (hop.innerText || '').trim().length > 60) { content = hop; break; }
        hop = hop.previousElementSibling;
      }
      var wrap = document.createElement('div');
      wrap.className = 'cp-modern-container';
      var aside = document.createElement('aside');
      aside.className = 'cp-sidebar-modern';
      aside.innerHTML = '<h3 class="cp-side-title"><i class="fas fa-cogs"></i> لوحة التحكم</h3>';
      var inner = document.createElement('div');
      inner.className = 'cp-inner-modern';
      if (content && content.parentElement) {
        content.parentElement.insertBefore(wrap, content);
      } else {
        side.parentElement.insertBefore(wrap, side);
      }
      wrap.appendChild(aside);
      wrap.appendChild(inner);
      if (content) inner.appendChild(content);
      side.className = 'cp-side-native';
      aside.appendChild(side);
    }

    /* ب) زر طي لوحة التحكم — جوال فقط (يُفعَّل عبر CSS) */
    var sb = qs('.cp-sidebar-modern');
    if (sb && !sb.dataset.saToggle) {
      sb.dataset.saToggle = '1';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sa-side-toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<span class="sa-tg-ic"><i class="fas fa-cogs"></i> لوحة التحكم</span><i class="fas fa-chevron-down"></i>';
      btn.addEventListener('click', function () {
        var open = sb.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      sb.parentNode.insertBefore(btn, sb); sb.classList.add('sa-side-collapse', 'open'); btn.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
    }

    /* ج) لفّ الجداول العريضة بغلاف قابل للتمرير أفقيًا على الجوال */
    qsa('.cp-inner-modern table, .cp-block-content table').forEach(function (tb) {
      if (tb.closest('.sa-scroll-x')) return;
      var w = document.createElement('div');
      w.className = 'sa-scroll-x';
      tb.parentNode.insertBefore(w, tb);
      w.appendChild(tb);
    });

    /* د) محرر التوقيع: نبضة تحجيم بعد فك الإخفاء */
    if (/page_profil=signature/.test(p)) {
      setTimeout(function () {
        var sc = qs('.sceditor-container');
        if (sc) {
          sc.style.width = '100%';
          window.dispatchEvent(new Event('resize'));
        }
      }, 400);
    }
  }

  /* ═══ 8) حائط التعليقات: صندوق ماسنجر ثابت من القالب + إعجاب/شكر (v11-c) ═══ */
  var STOR_T = 533;
  var WREC_KEY = 'sa-wall-recs-v1';
  var WQUEUE_KEY = 'sa-wall-queue-v1';
  var wallRecs = []; /* {kind, w, c, fu, fn, ts} */

  function parseWallRecs(html) {
    var out = [];
    var re = /\[sa-w(like|thanks)\]([^\[\]]+)\[\/sa-w\1\]/g, m;
    while ((m = re.exec(html))) {
      var kv = {}, parts = m[2].split('|');
      parts.forEach(function (pp) {
        var j = pp.indexOf('=');
        if (j > 0) kv[pp.slice(0, j).trim()] = pp.slice(j + 1).trim();
      });
      if (!kv.c || !kv.fu) continue;
      out.push({ kind: m[1], w: kv.w || '', c: kv.c, fu: kv.fu, fn: kv.fn || '', ts: kv.ts || '' });
    }
    return out;
  }
  function loadWallRecs() {
    try {
      var s = JSON.parse(sessionStorage.getItem(WREC_KEY) || 'null');
      if (s && Date.now() - s.t < 3 * 60 * 1000) { wallRecs = s.recs; return Promise.resolve(wallRecs); }
    } catch (e) {}
    return fetch('/t' + STOR_T + '-topic', { credentials: 'same-origin' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
      var recs = html ? parseWallRecs(html) : [];
      if (html) {
        var pages = [], re = new RegExp('href="(/t' + STOR_T + 'p\\d+[^"]*)"', 'g'), pm;
        while ((pm = re.exec(html))) pages.push(pm[1].replace('&amp;', '&'));
        pages = pages.filter(function (u, i) { return pages.indexOf(u) === i; }).slice(-6);
        return Promise.all(pages.map(function (u) {
          return fetch(u, { credentials: 'same-origin' }).then(function (r2) { return r2.ok ? r2.text() : ''; }).catch(function () { return ''; });
        })).then(function (more) {
          more.forEach(function (h) { if (h) recs = recs.concat(parseWallRecs(h)); });
          wallRecs = recs;
          try { sessionStorage.setItem(WREC_KEY, JSON.stringify({ t: Date.now(), recs: recs })); } catch (eS) {}
          return recs;
        });
      }
      wallRecs = recs;
      return recs;
    }).catch(function () { return []; });
  }
  function wallCount(cid, kind) {
    var seen = {}, n = 0;
    wallRecs.forEach(function (r) { if (r.c === cid && r.kind === kind && !seen[r.fu]) { seen[r.fu] = 1; n++; } });
    return n;
  }
  function wallNames(cid, kind) {
    var seen = {}, out = [];
    wallRecs.forEach(function (r) { if (r.c === cid && r.kind === kind && !seen[r.fu]) { seen[r.fu] = 1; out.push(r); } });
    return out;
  }
  function iDid(cid, kind) {
    return wallRecs.some(function (r) { return r.c === cid && r.kind === kind && r.fu === 'u' + ME.id; });
  }
  function nowStamp() {
    var d = new Date(), p2 = function (x) { return (x < 10 ? '0' : '') + x; };
    return '' + d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()) + p2(d.getHours()) + p2(d.getMinutes());
  }
  function postWallRecord(line, done) {
    fetch('/post?t=' + STOR_T + '&mode=reply', { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var form = null, forms = [].slice.call(doc.querySelectorAll('form'));
        for (var i = 0; i < forms.length; i++) {
          if (forms[i].querySelector('[name="message"]')) { form = forms[i]; break; }
        }
        if (!form) { done(false); return; }
        var params = new URLSearchParams();
        [].slice.call(form.elements).forEach(function (el) {
          if (!el.name || el.disabled) return;
          var ty = (el.type || '').toLowerCase();
          if (ty === 'submit' || ty === 'button' || ty === 'reset' || ty === 'image' || ty === 'file') return;
          if (ty === 'checkbox' || ty === 'radio') { if (el.checked) params.append(el.name, el.value || 'on'); }
          else params.append(el.name, el.value);
        });
        params.set('mode', 'reply');
        params.set('t', String(STOR_T));
        params.set('subject', 'تفاعل حائط');
        params.set('message', line);
        params.set('post', '1');
        var action = form.getAttribute('action') || '/post';
        action = action.replace('&amp;', '&');
        if (action.charAt(0) === '/') action = location.origin + action;
        return fetch(action, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          body: params.toString()
        }).then(function (resp) {
          return resp.text().then(function (t) {
            var flood = /يجب أن تنتظر|بين كل مساهمة/.test(t.slice(0, 6000));
            done(resp.ok && !flood, flood);
          });
        });
      })
      .catch(function () { done(false); });
  }
  function queueWallRecord(line) {
    try {
      var q = JSON.parse(localStorage.getItem(WQUEUE_KEY) || '[]');
      if (q.indexOf(line) === -1) q.push(line);
      localStorage.setItem(WQUEUE_KEY, JSON.stringify(q));
    } catch (e) {}
  }
  function processWallQueue() {
    var q = [];
    try { q = JSON.parse(localStorage.getItem(WQUEUE_KEY) || '[]'); } catch (e) {}
    if (!q.length) return;
    (function next(rem) {
      if (!rem.length) { try { localStorage.removeItem(WQUEUE_KEY); } catch (e) {} return; }
      postWallRecord(rem[0], function (ok) {
        if (ok) setTimeout(function () { next(rem.slice(1)); }, 12000);
        else if (rem[0] === q[0]) { /* أبقِ المتبقي للمرة القادمة */ }
      });
    })(q);
  }
  function toast10(msg) {
    var t = document.getElementById('sa-toast10');
    if (!t) {
      t = document.createElement('div');
      t.id = 'sa-toast10';
      t.style.cssText = 'position:fixed;bottom:78px;right:50%;transform:translateX(50%) translateY(14px);background:#1e293b;color:#fff;padding:10px 20px;border-radius:999px;font-weight:700;font-size:.88rem;z-index:200001;opacity:0;transition:opacity .25s ease,transform .25s ease;box-shadow:0 8px 22px rgba(2,6,23,.3);max-width:88vw;text-align:center;direction:rtl';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(function () {
      t.style.opacity = '1';
      t.style.transform = 'translateX(50%) translateY(0)';
    });
    clearTimeout(t._h);
    t._h = setTimeout(function () {
      t.style.opacity = '0';
      t.style.transform = 'translateX(50%) translateY(14px)';
    }, 2600);
  }

  /* أدوات النموذج المشتركة: استخراج حقول نموذج من صفحة وإرساله */
  function grabForm(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var forms = [].slice.call(doc.querySelectorAll('form'));
    for (var i = 0; i < forms.length; i++) {
      if (forms[i].querySelector('[name="message"]')) {
        var form = forms[i], params = new URLSearchParams();
        [].slice.call(form.elements).forEach(function (el) {
          if (!el.name || el.disabled) return;
          var ty = (el.type || '').toLowerCase();
          if (ty === 'submit' || ty === 'button' || ty === 'reset' || ty === 'image' || ty === 'file') return;
          if (ty === 'checkbox' || ty === 'radio') { if (el.checked) params.append(el.name, el.value || 'on'); }
          else params.append(el.name, el.value);
        });
        return { params: params, action: (form.getAttribute('action') || '').replace('&amp;', '&') };
      }
    }
    return null;
  }
  function submitForm(action, params) {
    if (action.charAt(0) === '/') action = location.origin + action;
    return fetch(action, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: params.toString()
    });
  }

  /* إرسال تعليق الحائط عبر نموذج تعليقات الملف الشخصي الرسمي (والمحرر الكامل /postp احتياطاً — كلاهما يُرسل إلى نفس الوجهة) */
  function postProfileComment(wallUid, txt, done) {
    var sources = ['/privmsg?mode=post_profile&u=' + wallUid, '/postp/' + wallUid];
    (function next(i) {
      if (i >= sources.length) { done(false, 'noform'); return; }
      fetch(sources[i], { credentials: 'same-origin' })
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var g = grabForm(html);
          if (!g) { next(i + 1); return; }
          g.params.set('subject', 'تعليق على الحائط');
          g.params.set('message', txt);
          g.params.set('post', '1');
          return submitForm(g.action || sources[i], g.params).then(function (resp) {
            return resp.text().then(function (t) {
              var flood = /يجب أن تنتظر|بين كل مساهمة/.test(t.slice(0, 6000));
              done(resp.ok && !flood, flood ? 'flood' : '');
            });
          });
        })
        .catch(function () { next(i + 1); });
    })(0);
  }

  /* فقاعة تعليقي فوراً — يمين مثل الدردشة */
  function addLocalBubble(body, txt) {
    var list = qs('.pro-tabs-body', body) || body;
    var b = document.createElement('div');
    b.className = 'friend-block-big sa-wall-mine';
    b.innerHTML =
      '<div class="sa-bubble"><div class="sa-bubble-head"><b>' + esc(ME.name || 'أنا') + '</b><span>الآن ♥</span></div>' +
      '<p>' + esc(txt).replace(/\n/g, '<br/>') + '</p></div>';
    var box = qs('#sa-wall-box', list);
    if (box && box.parentNode === list) list.insertBefore(b, box.nextSibling);
    else list.insertBefore(b, list.firstChild);
  }

  /* تحديث القائمة كاملة من السيرفر بلا إعادة تحميل — يضمن الترتيب الرسمي والأفاتارات — مع الحفاظ على الصندوق */
  function refreshWallList(body, wallUid) {
    fetch('/u' + wallUid + 'wall', { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (html) {
        if (!html) return;
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var fresh = doc.querySelector('.pro-tabs-body');
        var live = qs('.pro-tabs-body', body) || body;
        if (!fresh || !live) return;
        var box = qs('#sa-wall-box', live), fullwrap = qs('#sa-wall-fullwrap', live);
        live.innerHTML = fresh.innerHTML;
        /* انسخ القالب القادمة من السيرفر تحوي الصندوق نفسه — أزِلها وأبقِ العقدة المربوطة الأصلية */
        qsa('#sa-wall-box, #sa-wall-fullwrap', live).forEach(function (n) { n.remove(); });
        var sub = qs('.sub-head', live);
        if (box) {
          if (sub && sub.parentNode === live) sub.parentNode.insertBefore(box, sub.nextSibling);
          else live.insertBefore(box, live.firstChild);
        }
        if (fullwrap) {
          if (box && box.parentNode === live) box.parentNode.insertBefore(fullwrap, box.nextSibling);
          else live.insertBefore(fullwrap, live.firstChild);
        }
        buildWallActions(live, wallUid);
      })
      .catch(function () {});
  }

  /* ربط الصندوق الثابت القادم من القالب (id=sa-wall-box) — مرة واحدة لكل عقدة */
  function wireWallBox(box, wallUid, body) {
    if (box.getAttribute('data-sa-ready')) return;
    box.setAttribute('data-sa-ready', '1');
    var ta = qs('#sa-wall-msg', box), cnt = qs('#sa-wall-cnt', box), send = qs('#sa-wall-send', box);
    var av = qs('.sa-wall-av', box);
    if (av) av.src = ME.avatar || 'https://2img.net/i/fa/empty.gif';
    if (!ME.logged) return; /* الزوار: الصندوق يبقى مخفياً — ME.id للزائر = -1 وليس فارغاً */
    box.style.display = 'flex';
    var fw = qs('#sa-wall-fullwrap', body) || qs('#sa-wall-fullwrap');
    if (fw) {
      fw.style.display = 'block';
      var fl = qs('#sa-wall-full', fw);
      if (fl) fl.href = '/postp/' + wallUid;
    }
    if (!ta || !send) return;
    ta.addEventListener('input', function () { if (cnt) cnt.textContent = String(ta.value.length); });
    ta.addEventListener('keydown', function (evSaEnter) { /* ماسنجر: Enter يرسل، Shift+Enter سطر جديد */
      if (evSaEnter.key === 'Enter' && !evSaEnter.shiftKey) {
        evSaEnter.preventDefault();
        if (!send.disabled) { send.click(); }
      }
    });
    send.addEventListener('click', function () {
      var txt = ta.value.trim();
      if (!txt) { toast10('اكتب شيئاً أولاً ♥'); return; }
      if (send.disabled) return;
      send.disabled = true;
      send.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جارٍ النشر…';
      postProfileComment(wallUid, txt, function (ok, err) {
        send.disabled = false;
        send.innerHTML = '<i class="fas fa-paper-plane"></i> تعليق';
        if (ok) {
          ta.value = '';
          if (cnt) cnt.textContent = '0';
          toast10('نُشر تعليقك على الحائط ♥');
          addLocalBubble(body, txt);
          setTimeout(function () { refreshWallList(body, wallUid); }, 1100);
        } else {
          toast10(err === 'noform' ? 'تعذّر فتح نموذج التعليق — حاول مجدداً'
            : (err === 'flood' ? 'النظام مشغول — انتظر لحظة وحاول مجدداً'
              : 'تعذّر النشر — تحقق من الاتصال وحاول مجدداً'));
        }
      });
    });
  }

  /* الصندوق الثابت من القالب — وإن غاب بُني سكربتياً بنفس المعرفات (حارس: إن وُجد id=sa-wall-box فلا يُبنى شيء) */
  function ensureWallBox(body, wallUid) {
    var boxes = qsa('.sa-wall-box');
    var box = qs('#sa-wall-box') || boxes[0] || null;
    if (boxes.length > 1) {
      var keep = boxes.filter(function (x) { return x.getAttribute('data-sa-ready'); })[0] || boxes[0];
      boxes.forEach(function (x) { if (x !== keep) x.remove(); });
      box = keep;
    }
    if (!box) {
      box = document.createElement('div');
      box.id = 'sa-wall-box';
      box.className = 'sa-wall-box';
      box.style.display = 'none';
      box.innerHTML =
        '<img class="sa-wall-av" alt="أنا" loading="lazy"/>' +
        '<div class="sa-wall-main">' +
        '<textarea id="sa-wall-msg" maxlength="420" placeholder="اكتب تعليقاً على الحائط..."></textarea>' +
        '<div class="sa-wall-foot">' +
        '<span class="sa-wall-hint"><span id="sa-wall-cnt">0</span>/420 حرف</span>' +
        '<button type="button" class="sa-wall-send" id="sa-wall-send"><i class="fas fa-paper-plane"></i> تعليق</button>' +
        '</div></div>';
      var list = qs('.pro-tabs-body', body) || body;
      var sub = qs('.sub-head', list);
      if (sub && sub.parentNode === list) sub.parentNode.insertBefore(box, sub.nextSibling);
      else list.insertBefore(box, list.firstChild);
      var fw = document.createElement('div');
      fw.id = 'sa-wall-fullwrap';
      fw.style.display = 'none';
      fw.innerHTML = '<a id="sa-wall-full" rel="nofollow" href="#">المحرر الكامل</a>';
      list.insertBefore(fw, box.nextSibling);
    }
    if (box.id !== 'sa-wall-box') box.id = 'sa-wall-box';
    var fws = qsa('#sa-wall-fullwrap');
    fws.slice(1).forEach(function (x) { x.remove(); });
    wireWallBox(box, wallUid, body);
  }

  /* إغلاق لوحات الأسماء بمستمع موثّق واحد (بدل تراكم مستمعات لكل بطاقة) */
  var wallDocBound = false;
  function bindWallDocClose() {
    if (wallDocBound) return;
    wallDocBound = true;
    document.addEventListener('click', function (e) {
      qsa('.sa-wpop.open').forEach(function (pop) {
        var b = pop._btn;
        if (!pop.contains(e.target) && (!b || (e.target !== b && !b.contains(e.target)))) pop.classList.remove('open');
      });
    });
  }

  function buildWallActions(body, wallUid) {
    if (!ME.logged) return; /* الزوار بلا أزرار — ME.id للزائر = -1 وليس فارغاً */
    bindWallDocClose();
    var blocks = qsa('.friend-block-big', body);
    loadWallRecs().then(function () {
      blocks.forEach(function (blk) {
        if (blk.querySelector('.sa-wall-actions')) return;
        var delA = qs('a[href*="wall?d="]', blk), hidA = qs('a[href*="wall?s="]', blk);
        var idSrc = delA || hidA;
        var mc = idSrc ? (idSrc.getAttribute('href').match(/[?&][sd]=(\d+)/) || []) : [];
        var cid = mc[1] || '';
        if (!cid) return;
        var authA = qs('.friend-header a[href^="/u"]', blk);
        var auM = authA ? (authA.getAttribute('href').match(/\/u(\d+)/) || []) : [];
        var au = auM[1] || '', an = authA ? authA.textContent.trim() : 'عضو';
        var mine = au && au === ME.id;
        var bar = document.createElement('div');
        bar.className = 'sa-wall-actions';
        var liked = iDid(cid, 'like'), thanked = iDid(cid, 'thanks');
        bar.innerHTML =
          '<button type="button" class="sa-wbtn sa-wlk' + (liked ? ' sa-on' : '') + '" data-c="' + cid + '" data-au="' + esc(au) + '" data-an="' + esc(an) + '"' + (mine ? ' disabled title="تعليقك أنت"' : '') + '>' +
          '<span class="sa-heart' + (liked ? ' sa-beat' : '') + '">' + (liked ? '♥' : '♡') + '</span> إعجاب <span class="sa-wc">' + (wallCount(cid, 'like') || '') + '</span></button>' +
          '<button type="button" class="sa-wbtn sa-wth' + (thanked ? ' sa-on' : '') + '" data-c="' + cid + '" data-au="' + esc(au) + '" data-an="' + esc(an) + '"' + (mine ? ' disabled title="تعليقك أنت"' : '') + '>' +
          '<i class="fas fa-hands-praying"></i> شكر الكاتب <span class="sa-wc">' + (wallCount(cid, 'thanks') || '') + '</span></button>';
        blk.appendChild(bar);

        /* لوحة الأسماء: تمرير بالحاسوب / لمس بالجوال */
        ['like', 'thanks'].forEach(function (kind) {
          var b = qs(kind === 'like' ? '.sa-wlk' : '.sa-wth', bar);
          var pop = null, hideT = null;
          function openPop() {
            if (!pop) {
              pop = document.createElement('div');
              pop.className = 'sa-wpop';
              pop._btn = b;
              renderPop();
              bar.appendChild(pop);
            }
            renderPop();
            var br = b.getBoundingClientRect(), pr = bar.getBoundingClientRect();
            var left = Math.max(0, Math.min(br.left - pr.left, pr.width - 255));
            pop.style.left = left + 'px';
            pop.style.top = (b.offsetTop + b.offsetHeight + 6) + 'px';
            pop.classList.add('open');
          }
          function renderPop() {
            var names = wallNames(cid, kind);
            var ttl = kind === 'like' ? 'أعجبهم هذا التعليق' : 'شكرو كاتب التعليق';
            var html = '<div class="sa-wpop-t">' + (kind === 'like' ? '♥' : '<i class="fas fa-hands-praying"></i>') + ' ' + ttl + ' (' + names.length + ')</div>';
            if (!names.length) html += '<div class="sa-wempty">لا أحد بعد — كن الأول ♥</div>';
            names.forEach(function (r) {
              html += '<a class="sa-wchip" href="/u' + String(r.fu).replace(/^u/, '') + '"><span>' + esc(r.fn || r.fu) + '</span></a>';
            });
            pop.innerHTML = html;
          }
          function closeSoon() { hideT = setTimeout(function () { if (pop) pop.classList.remove('open'); }, 260); }
          function openSoon() { clearTimeout(hideT); openPop(); }
          if (window.matchMedia('(hover:hover)').matches) {
            b.addEventListener('mouseenter', openSoon);
            b.addEventListener('mouseleave', closeSoon);
            if (pop) {
              pop.addEventListener('mouseenter', function () { clearTimeout(hideT); });
              pop.addEventListener('mouseleave', closeSoon);
            }
          }
          b.addEventListener('click', function (e) {
            e.preventDefault();
            if (pop && pop.classList.contains('open')) { pop.classList.remove('open'); return; }
            openPop();
          });
        });

        /* النقر: تسجيل الإعجاب/الشكر في المخزن */
        qs('.sa-wlk', bar).addEventListener('click', function () { doAction(this, 'like', wallUid); });
        qs('.sa-wth', bar).addEventListener('click', function () { doAction(this, 'thanks', wallUid); });
      });
    });

    function doAction(btn, kind, wUid) {
      if (btn.disabled) return;
      if (!ME.id) { toast10('سجّل دخولك أولاً'); return; }
      var cid = btn.getAttribute('data-c');
      if (iDid(cid, kind)) { toast10(kind === 'like' ? 'سبق أن أعجبك هذا التعليق ♥' : 'سبق أن شكرت الكاتب ♥'); return; }
      var ts = nowStamp();
      var line = '[sa-w' + kind + ']w=' + wUid + '|c=' + cid + '|fu=u' + ME.id + '|fn=' + ME.name + '|ts=' + ts + '[/sa-w' + kind + ']';
      btn.disabled = true;
      postWallRecord(line, function (ok, flood) {
        if (ok) {
          wallRecs.push({ kind: kind, w: wUid, c: cid, fu: 'u' + ME.id, fn: ME.name, ts: ts });
          try { sessionStorage.setItem(WREC_KEY, JSON.stringify({ t: Date.now(), recs: wallRecs })); } catch (e) {}
          btn.classList.add('sa-on');
          var h = qs('.sa-heart', btn);
          if (h) { h.textContent = '♥'; h.classList.add('sa-beat'); }
          var c = qs('.sa-wc', btn);
          if (c) c.textContent = wallCount(cid, kind);
          toast10(kind === 'like' ? 'سُجّل إعجابك بالتعليق ♥' : 'تم شكر الكاتب ♥');
          setTimeout(function () { btn.disabled = false; }, 500);
        } else {
          btn.disabled = false;
          if (flood) {
            queueWallRecord(line);
            toast10('النظام مشغول — سيسجل تفاعلك تلقائياً بعد لحظات…');
            setTimeout(function () {
              try { sessionStorage.removeItem(WREC_KEY); } catch (e) {}
              loadWallRecs();
            }, 4000);
          } else {
            toast10('تعذّر التسجيل — حاول مجدداً');
          }
        }
      });
    }
  }

  function initWall() {
    if (!/\/u\d+wall/.test(location.pathname)) return;
    var body = qs('.pro-tabs-body');
    if (!body) return;
    var mU = location.pathname.match(/\/u(\d+)wall/);
    var wallUid = mU ? mU[1] : '';
    if (!wallUid) return;
    ensureWallBox(body, wallUid);
    buildWallActions(body, wallUid);
  }

  /* مراقب: بعد أي استبدال لمنطقة التبويبات (تنقل AJAX بين تبويبات الملف الشخصي أو تحديثنا الجزئي) أعد تهيئة الحائط — هذا ما كان يُفقد الصندوق سابقاً */
  var wallObs = null;
  function watchWallBody() {
    if (wallObs || !('MutationObserver' in window)) return;
    var deb = null;
    wallObs = new MutationObserver(function () {
      if (!/\/u\d+wall/.test(location.pathname)) return;
      clearTimeout(deb);
      deb = setTimeout(function () {
        var body = qs('.pro-tabs-body');
        if (!body || !qs('.sub-head', body)) return; /* تجاهل فجوة الاستبدال أثناء التنقل */
        var mU = location.pathname.match(/\/u(\d+)wall/);
        var wallUid = mU ? mU[1] : '';
        if (!wallUid) return;
        ensureWallBox(body, wallUid);
        buildWallActions(body, wallUid);
      }, 220);
    });
    wallObs.observe(document.body, { childList: true, subtree: true });
  }
  /* ═══ 9) مكتبة الصور + شريط تقدم القراءة (مفاجأة) ═══ */
  function initGalleryCss() {
    if (location.pathname.indexOf('/gallery') === 0) document.body.classList.add('sa-gallery-css');
  }
  function initProgressBar() {
    if (!/\/t\d+/.test(location.pathname)) return;
    var bar = document.createElement('div');
    bar.id = 'sa-progress';
    bar.innerHTML = '<div class="sa-progress-fill"></div>';
    document.body.appendChild(bar);
    var fill = qs('.sa-progress-fill', bar), ticking = false;
    function upd() {
      ticking = false;
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      fill.style.transform = 'scaleX(' + p + ')';
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(upd); }
    }, { passive: true });
    upd();
  }

  /* ═══ 10) الإقلاع ═══ */
  onReady(function () {
    addWallLink();
    filterWidgets();
    restructureProfile();
    initWall();
    watchWallBody();
    initGalleryCss();
    initProgressBar();
    processWallQueue();
    /* حارس متأخر: القوائم تُبنى ديناميكياً أحياناً */
    setTimeout(function () { addWallLink(); restructureProfile(); }, 1400);
    setTimeout(function () { addWallLink(); }, 3000);
  });
})();