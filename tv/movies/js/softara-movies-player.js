/* ════════════════════════════════════════════════════════════════
   سوفتارا Media v3.0.0 — المشغل أحادي المصدر (Single-Source Player)
   ════════════════════════════════════════════════════════════════
   ★ الحل الجذري لمشكلة «مشغل داخل مشغل»: منطقة تشغيل واحدة فقط
     (#stmStage) لا تُركَّب فيها إلا وسائط تشغيل واحدة في كل مرة.
   ★ قبل كل تشغيل: تفكيك كامل لما قبله — إزالة الـiframe/الـvideo من
     الشجرة (توقف الصوت فورًا)، تدمير hls.js، إلغاء blob URLs،
     تصفير المؤقتات. لا طبقات ولا نوافذ متداخلة أبدًا.
   ★ يوتيوب: iframe رسمي فقط (youtube-nocookie) دون IFrame API —
     أخف وأثبت، والقوائم (videoseries?list=) تظهر داخل نفس المنطقة.
   ★ التشغيل المباشر (mp4/hls): عنصر <video controls> واحد.
   ★ المنصات المانعة للتضمين: بطاقة رسالة + زر فتح على المنصة —
     دون تعطيل الصفحة ودون مشغل وهمي.
   ════════════════════════════════════════════════════════════════ */
window.STMPlayer = (function () {
  'use strict';

  /* ── قاعدة المنصات: التسمية + بناء تضمين رسمي + بناء رابط المشاهدة ── */
  var PLATFORMS = {
    'youtube':     { label: 'YouTube',      embeddable: true },
    'yt-playlist': { label: 'YouTube',      embeddable: true },
    'dailymotion': { label: 'DailyMotion',  embeddable: true },
    'dm-playlist': { label: 'DailyMotion',  embeddable: true },
    'vimeo':       { label: 'Vimeo',        embeddable: true },
    'okru':        { label: 'OK.ru',        embeddable: true },
    'vk':          { label: 'VK Video',     embeddable: true },
    'rutube':      { label: 'Rutube',       embeddable: true },
    'streamable':  { label: 'Streamable',   embeddable: true },
    'facebook':    { label: 'Facebook',     embeddable: true },
    'archive':     { label: 'Archive.org',  embeddable: true },
    'hls':         { label: 'HLS · M3U8',   embeddable: true },
    'mp4':         { label: 'MP4',          embeddable: true },
    'external':    { label: 'رابط خارجي',    embeddable: false }
  };

  /* مضيفات تمنع التضمين (X-Frame-Options) أو غير موثوقة — بطاقة خارجية */
  var BLOCKED_HOSTS = ['uqload.', 'dood.', 'dood.watch', 'mixdrop.', 'miixdrop.',
    'voe.', 'filemoon.', 'vidmoly.', 'streamtape.', 'sendvid.com',
    'mp4plus.org', 'larhu.website'];

  var HLS_CDNS = [
    'https://cdn.jsdelivr.net/npm/hls.js@1.5.13/dist/hls.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js'
  ];

  /* ── الحالة ── */
  var els = null, cfg = null;
  var current = null, hls = null, blobUrls = [], seq = 0, errTimer = 0;
  var progTimer = 0, uiTimer = 0, lastContext = null;

  /* ── أدوات ── */
  function $id(x) { return document.getElementById(x); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtT(s) {
    s = Math.max(0, Math.floor(s || 0));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
    function z(n) { return (n < 10 ? '0' : '') + n; }
    return (h ? h + ':' + z(m) : m) + ':' + z(x);
  }
  function revokeBlobs() { blobUrls.forEach(function (u) { try { URL.revokeObjectURL(u) } catch (_) { } }); blobUrls = []; }

  function loadScript(srcs, i) {
    return new Promise(function (res, rej) {
      if (i == null) i = 0;
      if (i >= srcs.length) return rej(new Error('load-failed'));
      var s = document.createElement('script');
      s.src = srcs[i]; s.async = true;
      s.onload = function () { res(); };
      s.onerror = function () { s.remove(); loadScript(srcs, i + 1).then(res, rej); };
      document.head.appendChild(s);
    });
  }

  /* ═════════ التفكيك الكامل (قلب حل المشغل المزدوج) ═════════ */
  function teardown() {
    if (errTimer) { clearTimeout(errTimer); errTimer = 0; }
    if (progTimer) { clearInterval(progTimer); progTimer = 0; }
    if (hls) { try { hls.destroy(); } catch (_) { } hls = null; }
    revokeBlobs();
    /* إزالة كل ما داخل منطقة التشغيل من الشجرة يوقف الفيديو والصوت فورًا */
    if (els && els.stage) els.stage.innerHTML = '';
    if (els) {
      els.err.classList.remove('show');
      els.loader.classList.remove('show');
      els.center.classList.remove('show');
      els.shell.classList.remove('stm-embed');
      els.shell.classList.remove('stm-native');
    }
  }

  function showLoader(on) { if (els) els.loader.classList.toggle('show', !!on); }
  function showErr(title, msg, watchUrl, retry) {
    if (!els) return;
    showLoader(false);
    els.errTitle.textContent = title;
    els.errMsg.textContent = msg || '';
    if (watchUrl) { els.errLink.style.display = ''; els.errLink.href = watchUrl; }
    else els.errLink.style.display = 'none';
    els.errRetry.style.display = retry ? '' : 'none';
    els.err.classList.add('show');
  }

  function buildIframe(src, allow) {
    var f = document.createElement('iframe');
    f.src = src;
    f.setAttribute('allow', allow || 'autoplay; encrypted-media; picture-in-picture; fullscreen');
    f.setAttribute('allowfullscreen', 'true');
    f.setAttribute('frameborder', '0');
    f.setAttribute('title', current && current.name ? esc(current.name) : 'مشغل سوفتارا');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    return f;
  }

  function setEmbedMode(item) {
    els.shell.classList.add('stm-embed');
    els.prov.textContent = PLATFORMS[item.type] ? PLATFORMS[item.type].label : '';
    els.prov.style.display = '';
    /* معالم التتبع غير متاحة داخل تضمين المنصات — التقدم يُدار من مشغل المنصة نفسه */
    els.seekRow.style.display = 'none';
    els.btnRow.style.display = 'none';
  }

  /* ═════════ التركيب ═════════ */
  function mount(item, context) {
    if (!els) return;
    seq++;
    teardown();
    current = item;
    lastContext = context || null;
    if (cfg && cfg.onPlay) cfg.onPlay(item, context);
    applyTopbar(item);
    els.idle.classList.add('hidden');
    els.shell.classList.add('stm-ui');

    var builders = {
      'youtube': mountYouTube, 'yt-playlist': mountYouTube,
      'dailymotion': mountDailymotion, 'dm-playlist': mountDailymotion,
      'vimeo': mountVimeo, 'okru': mountOkru, 'vk': mountVk,
      'rutube': mountRutube, 'streamable': mountStreamable,
      'facebook': mountFacebook, 'archive': mountArchive,
      'hls': mountHls, 'mp4': mountMp4, 'external': mountExternal
    };
    var fn = builders[item.type];
    if (!fn) {
      els.stage.innerHTML = '';
      showErr('مصدر غير مدعوم', 'نوع المصدر «' + esc(item.type) + '» غير معروف للمشغل.');
      return;
    }
    fn(item);
  }

  function applyTopbar(item) {
    els.name.textContent = item.epTitle ? (item.collectionName + ' — ' + item.epTitle) : item.name;
    els.nameChip.title = els.name.textContent;
    var nowName = document.getElementById('stmNowName');
    if (nowName) nowName.textContent = els.name.textContent;
    var fav = cfg && cfg.isFav ? cfg.isFav(favKey(item)) : false;
    els.favBtn.classList.toggle('stm-fav-on', fav);
  }

  function favKey(item) {
    return item.favKey || (item.collectionId ? item.collectionId + ':' + item.src : (item.id || item.src));
  }

  /* ── المزوّدون المضمّنون ── */
  function mountYouTube(item) {
    setEmbedMode(item);
    var p = item.type === 'yt-playlist'
      ? 'https://www.youtube-nocookie.com/embed/videoseries?list=' + encodeURIComponent(item.src)
      : 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(item.src);
    p += (p.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1&rel=0&modestbranding=1&playsinline=1';
    els.stage.appendChild(buildIframe(p));
    showLoader(false);
    els.watchBtn.style.display = '';
    els.watchBtn.href = item.type === 'yt-playlist'
      ? 'https://www.youtube.com/playlist?list=' + encodeURIComponent(item.src)
      : 'https://www.youtube.com/watch?v=' + encodeURIComponent(item.src);
  }

  function mountDailymotion(item) {
    setEmbedMode(item);
    var p = item.type === 'dm-playlist'
      ? 'https://www.dailymotion.com/embed/playlist/' + encodeURIComponent(item.src)
      : 'https://www.dailymotion.com/embed/video/' + encodeURIComponent(item.src);
    p += '?autoplay=1';
    els.stage.appendChild(buildIframe(p));
    showLoader(false);
    els.watchBtn.style.display = '';
    els.watchBtn.href = item.type === 'dm-playlist'
      ? 'https://www.dailymotion.com/playlist/' + encodeURIComponent(item.src)
      : 'https://www.dailymotion.com/video/' + encodeURIComponent(item.src);
  }

  function mountVimeo(item) {
    setEmbedMode(item);
    els.stage.appendChild(buildIframe('https://player.vimeo.com/video/' + encodeURIComponent(item.src) + '?autoplay=1'));
    showLoader(false);
    els.watchBtn.style.display = '';
    els.watchBtn.href = 'https://vimeo.com/' + encodeURIComponent(item.src);
  }

  function mountOkru(item) {
    setEmbedMode(item);
    els.stage.appendChild(buildIframe('https://ok.ru/videoembed/' + encodeURIComponent(item.src) + '?nochat=1&autoplay=1'));
    showLoader(false);
    els.watchBtn.style.display = '';
    els.watchBtn.href = 'https://ok.ru/video/' + encodeURIComponent(item.src);
  }

  function mountVk(item) {
    setEmbedMode(item);
    var parts = String(item.src).split('_');
    var p = 'https://vk.com/video_ext.php?oid=' + encodeURIComponent(parts[0]) +
      '&id=' + encodeURIComponent(parts[1] || '') + '&hd=3&autoplay=1';
    els.stage.appendChild(buildIframe(p));
    showLoader(false);
    els.watchBtn.style.display = '';
    els.watchBtn.href = 'https://vkvideo.ru/video' + encodeURIComponent(item.src);
  }

  function mountRutube(item) {
    setEmbedMode(item);
    els.stage.appendChild(buildIframe('https://rutube.ru/play/embed/' + encodeURIComponent(item.src) + '?autoplay=1'));
    showLoader(false);
    els.watchBtn.style.display = '';
    els.watchBtn.href = 'https://rutube.ru/video/' + encodeURIComponent(item.src) + '/';
  }

  function mountStreamable(item) {
    setEmbedMode(item);
    els.stage.appendChild(buildIframe('https://streamable.com/e/' + encodeURIComponent(item.src) + '?autoplay=1'));
    showLoader(false);
    els.watchBtn.style.display = '';
    els.watchBtn.href = 'https://streamable.com/' + encodeURIComponent(item.src);
  }

  function mountFacebook(item) {
    setEmbedMode(item);
    var href = item.src.indexOf('http') === 0 ? item.src : ('https://www.facebook.com/' + item.src);
    var p = 'https://www.facebook.com/plugins/video.php?height=314&href=' + encodeURIComponent(href) +
      '&show_text=false&autoplay=1&t=0';
    els.stage.appendChild(buildIframe(p));
    showLoader(false);
    els.watchBtn.style.display = '';
    els.watchBtn.href = href;
  }

  function mountArchive(item) {
    setEmbedMode(item);
    var src = String(item.src);
    var q = src.indexOf('?');
    var id = q > -1 ? src.slice(0, q) : src;
    var p = 'https://archive.org/embed/' + encodeURIComponent(id) + (q > -1 ? '&' + src.slice(q + 1) : '');
    els.stage.appendChild(buildIframe(p, 'autoplay; fullscreen; encrypted-media'));
    showLoader(false);
    els.watchBtn.style.display = '';
    els.watchBtn.href = 'https://archive.org/details/' + encodeURIComponent(id);
  }

  /* ── التشغيل المباشر: MP4 (+جودات) و HLS ── */
  function buildVideo(item) {
    els.shell.classList.add('stm-native');
    var v = document.createElement('video');
    v.controls = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.preload = 'metadata';
    v.poster = item.poster || '';
    els.stage.appendChild(v);
    els.seekRow.style.display = '';
    els.btnRow.style.display = '';
    bindNative(v, item);
    return v;
  }

  function mountMp4(item) {
    var v = buildVideo(item);
    var src = item.src;
    if (item.variants && item.variants.length) {
      /* اختيار الجودة الافتراضية الأولى وتوفير قائمة التبديل */
      src = item.variants[0].src;
      buildVariantMenu(v, item);
    }
    v.src = src;
    attachSubs(v, item);
    showLoader(true);
    v.play().catch(function () { showLoader(false); els.center.classList.add('show'); });
    els.watchBtn.style.display = 'none';
  }

  function mountHls(item) {
    var v = buildVideo(item);
    showLoader(true);
    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = item.src;
      v.play().catch(function () { showLoader(false); els.center.classList.add('show'); });
      return;
    }
    loadScript(HLS_CDNS).then(function () {
      if (!window.Hls || !window.Hls.isSupported()) { showErr('تعذّر تشغيل HLS', 'المتصفح لا يدعم تشغيل M3U8.', item.src); return; }
      hls = new window.Hls({ maxBufferLength: 30 });
      hls.loadSource(item.src);
      hls.attachMedia(v);
      hls.on(window.Hls.Events.MANIFEST_PARSED, function () {
        showLoader(false);
        v.play().catch(function () { els.center.classList.add('show'); });
      });
      hls.on(window.Hls.Events.ERROR, function (_, data) {
        if (data && data.fatal) {
          if (data.type === window.Hls.Errors.NETWORK_ERROR && hls) { try { hls.startLoad(); } catch (_) { } }
          else showErr('تعذّر تشغيل البث', 'المصدر غير متاح حاليًا أو محجوب من شبكتك.', item.src, true);
        }
      });
    }).catch(function () {
      showErr('تعذّر تحميل محرك HLS', 'تعذر الوصول إلى مكتبة hls.js من الشبكة.', item.src, true);
    });
    els.watchBtn.style.display = '';
    els.watchBtn.href = item.src;
  }

  function buildVariantMenu(v, item) {
    /* قائمة الجودات: تُبنى داخل شريط التحكم العلوي */
    els.qualBtn.style.display = '';
    els.qualBtn.onclick = function (e) {
      e.stopPropagation();
      var open = els.qualMenu.classList.toggle('show');
      els.qualBtn.setAttribute('aria-expanded', open);
    };
    els.qualMenu.innerHTML = '';
    (item.variants || []).forEach(function (vr) {
      var b = document.createElement('button');
      b.textContent = vr.label;
      b.onclick = function (e) {
        e.stopPropagation();
        var t = v.currentTime, playing = !v.paused;
        v.src = vr.src;
        attachSubs(v, item);
        v.currentTime = t;
        if (playing) v.play().catch(function () { });
        els.qualMenu.classList.remove('show');
        if (cfg && cfg.toast) cfg.toast('تم التبديل إلى: ' + vr.label);
      };
      els.qualMenu.appendChild(b);
    });
  }

  function attachSubs(v, item) {
    if (!item.subs || !item.subs.length) return;
    item.subs.forEach(function (s) {
      if (!s.src) return;
      var tr = document.createElement('track');
      tr.kind = 'subtitles'; tr.label = s.label; tr.srclang = s.lang || 'ar';
      tr.src = s.src;
      v.appendChild(tr);
    });
  }

  function bindNative(v, item) {
    var key = favKey(item);
    v.addEventListener('loadedmetadata', function () {
      showLoader(false);
      els.dur.textContent = fmtT(v.duration);
      /* استكمال المشاهدة */
      if (cfg && cfg.getProgress) {
        var p = cfg.getProgress(key);
        if (p && p.t > 10 && v.duration && p.t < v.duration - 15) {
          try { v.currentTime = p.t; if (cfg.toast) cfg.toast('أكملنا المشاهدة من حيث توقفت'); } catch (_) { }
        }
      }
    });
    v.addEventListener('waiting', function () { showLoader(true); });
    v.addEventListener('playing', function () {
      showLoader(false); els.center.classList.remove('show');
      setPlayIcon(true);
    });
    v.addEventListener('pause', function () { setPlayIcon(false); });
    v.addEventListener('play', function () { setPlayIcon(true); });
    v.addEventListener('error', function () {
      showErr('تعذّر تشغيل الفيديو', 'الملف غير متاح حاليًا أو الصيغة غير مدعومة في متصفحك.', v.currentSrc || item.src, true);
    });
    v.addEventListener('ended', function () {
      if (cfg && cfg.saveProgress) cfg.saveProgress(key, { t: 0, d: v.duration || 0, at: Date.now(), done: true });
      if (cfg && cfg.onEnded) cfg.onEnded(item, lastContext);
    });
    /* حفظ التقدم */
    progTimer = setInterval(function () {
      if (!v.duration || v.paused) return;
      if (cfg && cfg.saveProgress) cfg.saveProgress(key, { t: v.currentTime, d: v.duration, at: Date.now() });
    }, 5000);
    /* شريط التقدم */
    els.seek.addEventListener('input', function () {
      if (v.duration) v.currentTime = (this.value / 1000) * v.duration;
    });
    els.playBtn.onclick = function () { v.paused ? v.play().catch(function () { }) : v.pause(); };
    els.muteBtn.onclick = function () { v.muted = !v.muted; els.volIc.setAttribute('href', v.muted ? '#i-mute' : '#i-vol'); };
    els.vol.addEventListener('input', function () { v.volume = this.value / 100; v.muted = this.value == 0; els.volIc.setAttribute('href', v.muted ? '#i-mute' : '#i-vol'); });
    els.pipBtn.style.display = ('pictureInPictureEnabled' in document) ? '' : 'none';
    els.pipBtn.onclick = function () {
      if (document.pictureInPictureElement) document.exitPictureInPicture().catch(function () { });
      else v.requestPictureInPicture().catch(function () { });
    };
    els.fsBtn.onclick = function () {
      if (document.fullscreenElement) document.exitFullscreen().catch(function () { });
      else (els.shell.requestFullscreen ? els.shell.requestFullscreen() : v.webkitEnterFullscreen && v.webkitEnterFullscreen());
    };
  }

  function setPlayIcon(playing) {
    els.playIc.setAttribute('href', playing ? '#i-pause' : '#i-play');
  }

  /* ── المنصات المانعة للتضمين: بطاقة خارجية بنظيفة ── */
  function mountExternal(item) {
    els.stage.innerHTML =
      '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      'gap:12px;text-align:center;padding:22px;background:radial-gradient(70% 70% at 50% 30%,#101c15,#050907 80%)">' +
      '<svg class="ic" style="width:40px;height:40px;color:#fbbf24"><use href="#i-ext"/></svg>' +
      '<h3 style="margin:0;color:#fff;font-size:17px;font-weight:900">هذا المصدر يُشاهد على منصته</h3>' +
      '<p style="margin:0;color:#b8d4c7;font-size:12.5px;font-weight:700;max-width:420px;line-height:1.9">' +
      'منصة <b style="color:#34d399">' + esc(item.provLabel || 'المصدر') + '</b> تمنع التضمين داخل المواقع الأخرى ' +
      '(قيود رسمية من المنصة نفسها) — اضغط الزر لفتح الفيديو في نافذة جديدة.</p>' +
      (item.src && item.src.indexOf('http') === 0
        ? '<a class="stm-btn stm-btn-primary" target="_blank" rel="noopener nofollow noreferrer" href="' + esc(item.src) + '">فتح الفيديو على المنصة <svg class="ic"><use href="#i-ext"/></svg></a>'
        : '<p style="color:#94a3b8;font-size:12px;font-weight:800;margin:0">لا يتوفر رابط مباشر لهذا العنصر</p>') +
      '</div>';
    els.prov.textContent = item.provLabel || 'رابط خارجي';
    els.prov.style.display = '';
    els.seekRow.style.display = 'none';
    els.btnRow.style.display = 'none';
    els.watchBtn.style.display = 'none';
    showLoader(false);
  }

  /* ═════════ تحليل روابط المصادر (للإضافة اليدوية من لوحة الإدارة) ═════════
     يحوّل أي رابط ملصوق إلى {type, src} — الدليل: docs/guide-installation.html */
  function parseSource(url) {
    var u = String(url || '').trim();
    if (!u) return null;
    var m;
    /* قوائم يوتيوب */
    if ((m = u.match(/[?&]list=([a-zA-Z0-9_-]+)/)) || (m = u.match(/^((?:PL|UU|FL|RD|OL)[a-zA-Z0-9_-]{10,})$/))) {
      return { type: 'yt-playlist', src: m[1] };
    }
    /* يوتيوب */
    if ((m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/))) {
      return { type: 'youtube', src: m[1] };
    }
    if (/^[a-zA-Z0-9_-]{11}$/.test(u)) return { type: 'youtube', src: u };
    /* ديلي موشن */
    if ((m = u.match(/dailymotion\.com\/playlist\/([a-zA-Z0-9]+)/))) return { type: 'dm-playlist', src: m[1] };
    if ((m = u.match(/(?:dailymotion\.com\/(?:video\/|embed\/video\/)|dai\.ly\/|geo\.dailymotion\.com\/player\.html\?video=)([a-zA-Z0-9]+)/))) {
      return { type: 'dailymotion', src: m[1] };
    }
    if (/^[a-zA-Z0-9]+$/.test(u) && arguments[1] === 'dailymotion') return { type: 'dailymotion', src: u };
    /* فيميو */
    if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return { type: 'vimeo', src: m[1] };
    /* أوكي */
    if ((m = u.match(/ok\.ru\/(?:video|live)\/(\d+)/))) return { type: 'okru', src: m[1] };
    if (/^\d{6,}$/.test(u)) return { type: 'okru', src: u };
    /* فيكي */
    if ((m = u.match(/(?:vkvideo\.ru|vk\.com)\/video(-?\d+)_(\d+)/))) return { type: 'vk', src: m[1] + '_' + m[2] };
    /* روتيوب */
    if ((m = u.match(/rutube\.ru\/video\/([a-f0-9]+)/))) return { type: 'rutube', src: m[1] };
    /* ستريمابل */
    if ((m = u.match(/streamable\.com\/(?:e\/)?([a-z0-9]+)/i))) return { type: 'streamable', src: m[1] };
    /* فيسبوك (رابط كامل) */
    if (/facebook\.com\/.+\/videos\//.test(u) || /fb\.watch\//.test(u)) return { type: 'facebook', src: u };
    /* أرشيف الإنترنت */
    if ((m = u.match(/archive\.org\/(?:details|embed|download)\/([^\/\s?]+)(\?.*)?/))) {
      return { type: 'archive', src: m[1] + (m[2] || '') };
    }
    /* HLS / MP4 */
    if (/\.m3u8(\?|$)/i.test(u)) return { type: 'hls', src: u };
    if (/\.(mp4|webm|ogv|mov)(\?|$)/i.test(u)) return { type: 'mp4', src: u };
    /* مضيفات مانعة/غير موثوقة → بطاقة خارجية */
    var lower = u.toLowerCase();
    for (var i = 0; i < BLOCKED_HOSTS.length; i++) {
      if (lower.indexOf(BLOCKED_HOSTS[i]) > -1) return { type: 'external', src: u, provLabel: PLATFORMS.external.label };
    }
    /* رابط http غير معروف → خارجي (بأمان: بدون تضمين أعمى) */
    if (/^https?:\/\//i.test(u)) return { type: 'external', src: u, provLabel: 'رابط خارجي' };
    return null;
  }

  /* ═════════ التهيئة ═════════ */
  function init(options) {
    cfg = options || {};
    els = {
      shell: $id('stmShell'), stage: $id('stmStage'),
      idle: $id('stmIdle'), loader: $id('stmLoader'), err: $id('stmErr'),
      errTitle: $id('stmErrTitle'), errMsg: $id('stmErrMsg'),
      errLink: $id('stmErrLink'), errRetry: $id('stmErrRetry'),
      center: $id('stmCenter'),
      name: $id('stmName'), nameChip: $id('stmNameChip'), prov: $id('stmProv'),
      favBtn: $id('stmFavBtn'), watchBtn: $id('stmWatchBtn'),
      seekRow: $id('stmSeekRow'), btnRow: $id('stmBtnRow'),
      seek: $id('stmSeek'), cur: $id('stmCur'), dur: $id('stmDur'),
      playBtn: $id('stmPlayBtn'), playIc: $id('stmPlayIc'),
      muteBtn: $id('stmMuteBtn'), volIc: $id('stmVolIc'), vol: $id('stmVol'),
      pipBtn: $id('stmPipBtn'), fsBtn: $id('stmFsBtn'),
      qualBtn: $id('stmQualBtn'), qualMenu: $id('stmQualMenu')
    };
    if (!els.shell || !els.stage) return;

    /* المفضلة من الشريط العلوي */
    els.favBtn.addEventListener('click', function () {
      if (!current || !cfg.toggleFav) return;
      var k = favKey(current);
      cfg.toggleFav(k);
      this.classList.toggle('stm-fav-on', cfg.isFav(k));
    });
    /* إعادة المحاولة */
    els.errRetry.addEventListener('click', function () {
      if (current) { var c = current, ctx = lastContext; mount(c, ctx); }
    });
    /* زر التشغيل المركزي (بعد حجب autoplay) */
    els.center.addEventListener('click', function () {
      var v = els.stage.querySelector('video');
      if (v) { v.play().catch(function () { }); this.classList.remove('show'); }
    });
    /* إظهار واجهة المشغل عند الحركة */
    var shell = els.shell;
    shell.addEventListener('pointermove', function () {
      shell.classList.add('stm-ui');
      clearTimeout(uiTimer);
      uiTimer = setTimeout(function () { shell.classList.remove('stm-ui'); }, 2800);
    });
    shell.addEventListener('touchstart', function () {
      shell.classList.add('stm-ui');
      clearTimeout(uiTimer);
      uiTimer = setTimeout(function () { shell.classList.remove('stm-ui'); }, 2800);
    }, { passive: true });
    shell.addEventListener('mouseleave', function () { shell.classList.remove('stm-ui'); });
    /* إخفاء قائمة الجودات عند النقر خارجها */
    document.addEventListener('click', function (e) {
      if (els.qualMenu.classList.contains('show') && !e.target.closest('#stmQualMenu,#stmQualBtn')) {
        els.qualMenu.classList.remove('show');
      }
    });
    /* مؤقت العرض للشريط */
    setInterval(function () {
      var v = els.stage.querySelector('video');
      if (v && v.duration && !v.seeking) {
        els.cur.textContent = fmtT(v.currentTime);
        if (!seekDrag) els.seek.value = Math.round((v.currentTime / v.duration) * 1000);
      }
    }, 500);
    var seekDrag = false;
    els.seek.addEventListener('pointerdown', function () { seekDrag = true; });
    els.seek.addEventListener('pointerup', function () { seekDrag = false; });
  }

  function current_() { return current; }
  function context_() { return lastContext; }

  return {
    init: init, mount: mount, teardown: teardown,
    parseSource: parseSource, PLATFORMS: PLATFORMS,
    current: current_, context: context_, favKey: favKey
  };
})();
