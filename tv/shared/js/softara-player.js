/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v2.2.0 — محرك المشغل الموحّد (Softara Unified Player)
   مزوّدون خمسة بتنفيذ فعلي: HLS (hls.js بجودات وترجمات مدمجة) ·
   MP4 (جودات + ترجمة VTT) · YouTube (IFrame API رسمية) ·
   DailyMotion (تضمين رسمي) · OK.ru (تضمين رسمي)
   ★ تفكيك جذري لكل مشغل سابق عند أي تغيير (لا ترجمة معلقة ولا صوت خفي)
   ★ مشترك بين الصفحتين — لا يحتوي أي منطق قوائم أو شبكة عرض
   الاستخدام:
     var player=STV.createPlayer({
       titleBase:'سوفتارا Live TV — البث المباشر',
       onPlay:function(it){…},        // بعد التفكيك وقبل التحميل: حدّث واجهة صفحتك
       onEnded:function(it){…},       // انتهى الفيديو (بعد تنظيف سجل الموضع)
       onFavsChange:function(){…},    // تغيّرت المفضلة
       onPickOther:function(){…},     // زر «اختيار آخر» في صندوق الخطأ
       onEscape:function(){…}         // مفتاح Escape (اختياري)
     });
     player.play(item,{muted:true}); player.step(1); player.playlist([...]);
   ════════════════════════════════════════════════════════════════ */
window.STV=(function(S){
'use strict';
var d=S.d,w=S.w,$=S.$,icon=S.icon,esc=S.esc,fmtT=S.fmtT,store=S.store,toast=S.toast,IS_IOS=S.IS_IOS;
var CONFIG=S.CONFIG,PROVIDERS=S.PROVIDERS,DEMO_AR_VTT=S.DEMO_AR_VTT;

function createPlayer(cfg){
  cfg=cfg||{};
  /* ─────────── الحالة ─────────── */
  var state={ current:null, playlist:[], muted:false };
  var shell=$('#stvShell'), video=$('#stvVideo'), ytBox=$('#stvYtBox'), embedBox=$('#stvEmbedBox');
  var hls=null, ytPlayer=null, currentHlsLevels=null, retryCount=0, retryTimer=null, uiTimer=null, progTimer=0;
  var nativeMode=false, embedMode=false, isLive=false;
  var ytSyncTimer=0, ytErrTimer=0, blobUrls=[], curProvider=null, curVariant=-1, qualSrc=null, mountSeq=0;
  var seeking=false;
  var prog=store.get(CONFIG.storage.prog,{});

  if(!shell||!video){ return null; }

  function showLoader(v){var l=$('#stvLoader');if(l)l.classList.toggle('show',!!v)}
  function showErr(title,msg,url){
    var et=$('#stvErrTitle');if(et)et.textContent=title;
    var em=$('#stvErrMsg');if(em)em.textContent=msg||'';
    var la=$('#stvErrLink');
    if(la){ if(url){la.href=url;la.style.display=''}else{la.style.display='none'} }
    $('#stvErr').classList.add('show');showLoader(false);
  }
  function hideErr(){var e=$('#stvErr');if(e)e.classList.remove('show')}
  function showIdle(v){var el=$('#stvIdle');if(!el)return;el.classList.toggle('show',!!v);el.setAttribute('aria-hidden',v?'false':'true')}
  function setUi(v){shell.classList.toggle('stv-ui',!!v);scheduleUiHide()}
  function scheduleUiHide(){
    clearTimeout(uiTimer);
    uiTimer=setTimeout(function(){
      if(!video.paused&&shell.classList.contains('stv-ui'))shell.classList.remove('stv-ui');
    },3500);
  }
  function showCenter(v){var c=$('#stvCenterPlay');if(c)c.classList.toggle('show',!!v)}
  function showUnmute(v){var u=$('#stvUnmute');if(u)u.classList.toggle('show',!!v)}

  /* ── إيقاف كل شيء: تفكيك جذري لكل مشغل سابق ──
     هذا هو العلاج من جذوره لمشكلة «الترجمة المعلقة عند تغيير القناة»:
     إيقاف → تفريغ وحدات الترجمة → تدمير المشغل → إزالة عناصر DOM والمسارات والمؤقتات →
     لا تنقل أي حالة للفيديو الجديد إلا تفضيل المستخدم المخزَّن عمدًا (ccPref). */
  function teardownAll(){
    clearTimeout(retryTimer);clearTimeout(ytErrTimer);retryCount=0;stopYtSync();
    /* 1) YouTube: إيقاف → تفريغ وحدات الترجمة → تدمير → محو أي iframe متبقٍ */
    if(ytPlayer){
      try{ytPlayer.stopVideo()}catch(_){}
      try{
        var ms=(typeof ytPlayer.getOptions==='function')?(ytPlayer.getOptions()||[]):[];
        ms.forEach(function(m){try{ytPlayer.unloadModule(m)}catch(_){}});
      }catch(_){}
      try{ytPlayer.destroy()}catch(_){}
      ytPlayer=null;
    }
    try{ytBox.querySelectorAll('iframe').forEach(function(n){n.parentNode.removeChild(n)})}catch(_){}
    try{ytBox.innerHTML='<div id="stvYtMount"></div>'}catch(_){}
    /* 2) hls.js: إيقاف التحميل → فصل الوسائط → تدمير المثيل */
    if(hls){try{hls.stopLoad()}catch(_){}try{hls.detachMedia()}catch(_){}try{hls.destroy()}catch(_){}hls=null}
    /* 3) عنصر الفيديو: إيقاف → تعطيل مسارات الترجمة → إزالة track → تحرير Blob URLs */
    try{video.pause()}catch(_){}
    try{ if(video.textTracks){for(var i=video.textTracks.length-1;i>=0;i--){try{video.textTracks[i].mode='disabled'}catch(_){}}} }catch(_){}
    try{video.querySelectorAll('track').forEach(function(t){t.parentNode.removeChild(t)})}catch(_){}
    blobUrls.forEach(function(u){try{URL.revokeObjectURL(u)}catch(_){}});blobUrls=[];
    video.removeAttribute('src');try{video.load()}catch(_){}
    video.controls=false;shell.classList.remove('stv-native');
    /* 4) التضمينات (DailyMotion/OK.ru): إزالة iframe توقف التشغيل والصوت فورًا */
    try{embedBox.querySelectorAll('iframe').forEach(function(n){n.parentNode.removeChild(n)})}catch(_){}
    embedBox.innerHTML='';
    shell.classList.remove('stv-embed');embedMode=false;nativeMode=false;isLive=false;
    curProvider=null;curVariant=-1;qualSrc=null;
    var sr=$('#stvSeekRow');if(sr)sr.style.display='none';
    var qb=$('#stvQualBtn');if(qb){qb.style.display='none';closeQual()}
    var cb=$('#stvCcBtn');if(cb){cb.style.display='none';closeCc()}
    var lc=$('#stvLiveChip');if(lc)lc.style.display='none';
    var hd=$('#stvHd');if(hd)hd.style.display='none';
    var pv=$('#stvProv');if(pv)pv.style.display='none';
    var vw=$('#stvVolWrap');if(vw)vw.style.display='';
    var pb=$('#stvPlayBtn');if(pb)pb.style.display='';
    hideErr();showCenter(false);showUnmute(false);
  }

  /* ── عناصر التحكم المتاحة/غير المتاحة حسب المزوّد (بصدق: DM/OK بلا API تحكم) ── */
  var hintTold=false;
  function setEmbedControls(apiOn){
    var vw=$('#stvVolWrap');if(vw)vw.style.display=apiOn?'':'none';
    var pb=$('#stvPlayBtn');if(pb)pb.style.display=apiOn?'':'none';
    if(!apiOn&&!hintTold){hintTold=true;setTimeout(function(){toast('التحكم بالتشغيل والصوت من واجهة مشغل المنصة نفسها — قيد رسمي في التضمين')},900)}
  }

  /* ── تشغيل عنصر: تفكيك ثم بناء حالة نظيفة مستقلة لكل فيديو جديد ── */
  function play(it,opts){
    opts=opts||{};
    if(!it)return;
    if(it.soon){ setNow(it); showErr('قريبًا','هذا القسم سيُزوَّد بمحتوى مرخّص رسميًا قريبًا. البنية التقنية جاهزة بالكامل — أضف المصادر من قسم البيانات.'); return }
    teardownAll();
    mountSeq++; /* مراجعة T7: جيل جديد — يُبطل أي تحميل كسول قديم معلّق فلا يُنشأ مشغل يتيم أبدًا */
    state.current=it;setNow(it);showIdle(false);showLoader(true);syncFavUI();
    if(cfg.onPlay)cfg.onPlay(it);
    try{d.title=it.name+(it.ep?' — '+it.ep:'')+' — '+cfg.titleBase}catch(_){}
    var muted=opts.muted!==undefined?opts.muted:state.muted;
    state.muted=muted;
    var mount={hls:mountHls,mp4:mountMp4,youtube:mountYouTube,dailymotion:mountDailymotion,okru:mountOkru}[it.type];
    if(mount)mount(it,muted);
    else showErr('مصدر غير معروف','نوع المصدر غير مدعوم في هذه النسخة.');
  }

  /* ── المزوّد 1: HLS / M3U8 عبر hls.js (جودات + ترجمات مدمجة) أو HLS الأصلي (iOS) ── */
  function mountHls(it,muted){
    curProvider='hls';
    var seq=mountSeq; /* مراجعة T7: حماية من سباق إعادة الاختيار أثناء نافذة التحميل الكسول */
    S.ensureHls().then(function(Hls){
      if(seq!==mountSeq||state.current!==it)return;
      if(Hls.isSupported()){
        hls=new Hls({capLevelToPlayerSize:true,enableWorker:true,maxBufferLength:30,backBufferLength:30});
        hls.on(Hls.Events.MANIFEST_PARSED,function(){
          if(seq!==mountSeq||state.current!==it)return;
          qualSrc={kind:'hls'};buildQualityMenu();var qb=$('#stvQualBtn');if(qb)qb.style.display='';
          tryPlay(muted);
        });
        hls.on(Hls.Events.LEVEL_SWITCHED,function(){updateQualLabel()});
        hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED,function(){
          if(seq!==mountSeq||state.current!==it)return;
          var cb=$('#stvCcBtn');if(cb)cb.style.display=(hls.subtitleTracks&&hls.subtitleTracks.length)?'':'none';
          ccApplyHls();buildCcMenu();
        });
        hls.on(Hls.Events.SUBTITLE_TRACK_SWITCH,function(){buildCcMenu()});
        hls.on(Hls.Events.ERROR,onHlsError);
        hls.loadSource(it.src);hls.attachMedia(video);
      }else if(video.canPlayType('application/vnd.apple.mpegurl')){
        nativeMode=true;shell.classList.add('stv-native');
        video.controls=true;video.src=it.src;
        video.addEventListener('loadedmetadata',function(){isLive=!isFinite(video.duration);if(video.textTracks.length){var cb=$('#stvCcBtn');if(cb)cb.style.display='';buildCcMenu()}}, {once:true});
        tryPlay(muted);
      }else{
        showErr('متصفح غير مدعوم','هذا المتصفح لا يدعم تشغيل HLS. جرّب Chrome أو Safari حديثًا.');
      }
    }).catch(function(){showErr('تعذّر تحميل محرك البث','تحقّق من الاتصال بالإنترنت ثم أعد المحاولة.')});
  }

  /* ── المزوّد 2: MP4 مباشر (جودات متعددة + ترجمة VTT خارجية عبر Blob) ── */
  function mountMp4(it,muted){
    curProvider='mp4';
    var variants=it.variants&&it.variants.length>1?it.variants:null;
    qualSrc={kind:'mp4',variants:variants};
    var vsrc=(variants?variants[0]:it).src||it.src;
    curVariant=0;
    video.src=vsrc;
    if(variants){var qb=$('#stvQualBtn');if(qb)qb.style.display='';buildQualityMenu()}
    if(it.subs&&it.subs.length){
      it.subs.forEach(function(s){
        try{
          var tr=d.createElement('track');tr.kind='subtitles';tr.label=s.label;tr.srclang=s.lang||'ar';
          var u=null;try{u=URL.createObjectURL(new Blob([DEMO_AR_VTT],{type:'text/vtt;charset=utf-8'}));blobUrls.push(u)}catch(_){}
          if(u)tr.src=u;
          video.appendChild(tr);
        }catch(_){}
      });
      var cb=$('#stvCcBtn');if(cb)cb.style.display='';
    }
    buildCcMenu();
    tryPlay(muted);
  }

  /* ── المزوّد 3: YouTube عبر IFrame API الرسمية (ترجمة + مزامنة تحكم كاملة) ── */
  function mountYouTube(it,muted){
    curProvider='youtube';
    shell.classList.add('stv-embed');embedMode=true;
    var seq=mountSeq; /* مراجعة T7 */
    ytErrTimer=setTimeout(function(){
      if(seq===mountSeq&&state.current===it&&curProvider==='youtube')showErr('تعذّر تحميل مشغل يوتيوب','الاتصال بطيء أو محجوب من شبكتك. أعد المحاولة أو افتح الفيديو على يوتيوب مباشرة.');
    },16000);
    var ccPref=S.ccPref();
    S.ensureYT().then(function(YT){
      if(seq!==mountSeq||state.current!==it){clearTimeout(ytErrTimer);return}
      /* تفضيل الترجمة يُطبَّق عبر المعاملين الرسميين الموثّقين cc_load_policy وcc_lang_pref عند الإنشاء.
         ملاحظة مثبتة بالتجربة المعزولة: مشغل يوتيوب الحديث لم يعد يكشف وحدة captions عبر getOptions()
         فلا يمكن معرفة لغات الفيديو برمجيًا — لذا يُعرض زر CC دائمًا ليوتيوب ويطبّق التفضيل عند الإنشاء. */
      var pv={autoplay:1,mute:muted?1:0,playsinline:1,rel:0,enablejsapi:1,origin:w.location.origin,cc_load_policy:ccPref.on?1:0};
      if(ccPref.on&&ccPref.lang)pv.cc_lang_pref=ccPref.lang;
      ytPlayer=new YT.Player('stvYtMount',{
        videoId:it.src,host:'https://www.youtube.com',playerVars:pv,
        events:{
          onReady:function(e){
            if(seq!==mountSeq||state.current!==it)return;
            if($('#stvErr').classList.contains('show')){clearTimeout(ytErrTimer);return} /* مراجعة T7: لا صوت خلف شاشة الخطأ */
            clearTimeout(ytErrTimer);showLoader(false);setEmbedControls(true);
            e.target.playVideo();
            if(muted)showUnmute(true);
            setUi(true);
            /* مجسّ توافر الترجمات: يوقظ وحدة captions رسميًا ليُطلق onApiChange حتى لو كان التفضيل «إيقاف» */
            try{e.target.loadModule('captions')}catch(_){}
            ccApplyYt();buildCcMenu();
            startYtSync();
          },
          onApiChange:function(){ if(seq!==mountSeq||state.current!==it)return; ccApplyYt();buildCcMenu(); },
          onStateChange:function(e){
            if(seq!==mountSeq||state.current!==it)return;
            if(e.data===YT.PlayerState.PLAYING){showLoader(false);setUi(true);setPlayIcon(true)}
            if(e.data===YT.PlayerState.PAUSED)setPlayIcon(false);
            if(e.data===YT.PlayerState.ENDED)onEnded();
          },
          onError:function(ev){
            if(seq!==mountSeq||state.current!==it)return;
            clearTimeout(ytErrTimer);
            var msg={2:'معرّف الفيديو غير صالح.',5:'خطأ في مشغل HTML5 لهذا الفيديو.',100:'الفيديو غير موجود أو حُذف.',101:'ناشر الفيديو منع تضمينه خارج يوتيوب.',150:'ناشر الفيديو منع تضمينه خارج يوتيوب.',153:'يوتيوب يطلب تحققًا إضافيًا من هذا المصدر (قد يحدث في بعض الشبكات).'}[ev.data];
            showErr('تعذّر تشغيل فيديو يوتيوب',msg||'حدث خطأ غير معروف في مشغل يوتيوب.','https://www.youtube.com/watch?v='+it.src);
          }
        }
      });
    }).catch(function(){
      if(seq===mountSeq&&state.current===it)showErr('تعذّر تحميل مشغل يوتيوب','تعذّر تحميل واجهة يوتيوب من شبكتك. أعد المحاولة أو افتح الفيديو على يوتيوب مباشرة.');
    });
  }

  /* ── المزوّد 4: DailyMotion عبر التضمين الرسمي ── */
  function mountDailymotion(it,muted){
    curProvider='dailymotion';
    embedMode=true;shell.classList.add('stv-embed');
    setEmbedControls(false);
    var allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
    embedBox.innerHTML='<iframe src="https://www.dailymotion.com/embed/video/'+encodeURIComponent(it.src)+'?autoplay=1&mute='+(muted?1:0)+'&queue-enable=0&sharing-enable=0&ui-logo=0" allow="'+allow+'" allowfullscreen loading="lazy"></iframe>';
    showLoader(false);
  }

  /* ── المزوّد 5: OK.ru عبر التضمين الرسمي ── */
  function mountOkru(it,muted){
    curProvider='okru';
    embedMode=true;shell.classList.add('stv-embed');
    setEmbedControls(false);
    var allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
    embedBox.innerHTML='<iframe src="https://ok.ru/videoembed/'+encodeURIComponent(it.src)+'?autoplay=1" allow="'+allow+'" allowfullscreen loading="lazy"></iframe>';
    showLoader(false);
  }

  function tryPlay(muted){
    video.muted=!!muted;video.volume=$('#stvVol').value/100;
    var p=video.play();
    if(p&&p.then)p.then(function(){
      showLoader(false);
      if(muted&&!IS_IOS)showUnmute(true);
      setUi(true);
    }).catch(function(err){
      showLoader(false);
      /* حجب التشغيل التلقائي: نطلب نقرة المستخدم */
      showCenter(true);
      if(muted)showUnmute(true);
    });
  }

  /* ── الترجمة (CC): تطبيق موحّد على كل مزوّد ── */
  function ccApplyYt(){
    if(!ytPlayer)return;
    try{
      /* إظهار دائم ليوتيوب: الـ API الحديث لا يكشف توافر الترجمات (مثبت تجريبيًا) فلا نستطيع الإخفاء المشروط بصدق */
      var cb=$('#stvCcBtn');if(cb)cb.style.display='';
      var ccPref=S.ccPref();
      if(ccPref.on){
        try{ytPlayer.loadModule('captions')}catch(_){}
        if(cb)cb.classList.add('on');
      }else{
        try{ytPlayer.unloadModule('captions')}catch(_){}
        if(cb)cb.classList.remove('on');
      }
    }catch(_){}
  }
  function ccYtTracks(){
    var list=[];
    try{
      if(!ytPlayer||typeof ytPlayer.getOption!=='function')return list;
      var tl=ytPlayer.getOption('captions','tracklist',{includeAsr:true})||[];
      tl.forEach(function(t){
        var nm=t.languageName;
        if(nm&&typeof nm==='object')nm=nm.displayName||(nm.run&&nm.run[0]&&nm.run[0].text)||t.languageCode;
        list.push({code:t.languageCode,label:String(nm||t.languageCode),asr:t.kind==='asr'});
      });
    }catch(_){}
    return list;
  }
  function ccApplyHls(){
    if(!hls)return;
    var ccPref=S.ccPref();
    try{
      var cb=$('#stvCcBtn');
      if(ccPref.on&&hls.subtitleTracks&&hls.subtitleTracks.length){
        var idx=-1;
        if(ccPref.lang){for(var i=0;i<hls.subtitleTracks.length;i++){if(hls.subtitleTracks[i].lang===ccPref.lang){idx=i;break}}}
        hls.subtitleTrack=idx>=0?idx:0;
        if(cb)cb.classList.add('on');
      }else{
        hls.subtitleTrack=-1;
        if(cb)cb.classList.remove('on');
      }
    }catch(_){}
  }
  function buildCcMenu(){
    var menu=$('#stvCcMenu');if(!menu)return;
    menu.innerHTML='';
    var ccPref=S.ccPref();
    var mk=function(label,active,onpick,sub){
      var b=d.createElement('button');b.setAttribute('role','menuitem');
      if(active)b.className='on';
      b.innerHTML='<span>'+esc(label)+(sub?' <small>'+esc(sub)+'</small>':'')+'</span>'+icon('check');
      b.addEventListener('click',function(){onpick();buildCcMenu()});
      menu.appendChild(b);
    };
    var tracks=[];
    if(curProvider==='youtube'&&ytPlayer)tracks=ccYtTracks();
    else if(curProvider==='hls'&&hls&&hls.subtitleTracks)tracks=hls.subtitleTracks.map(function(t,i){return {hlsIdx:i,code:t.lang||'',label:t.name||t.lang||('مسار '+(i+1))}});
    else if(curProvider==='mp4'||nativeMode){
      try{for(var i=0;i<video.textTracks.length;i++){var tt=video.textTracks[i];tracks.push({track:tt,code:tt.language||'',label:tt.label||tt.language||('مسار '+(i+1))})}}catch(_){}
    }
    if(curProvider==='youtube'&&!tracks.length){
      /* يوتيوب الحديث لا يكشف قائمة اللغات عبر الـ API (مثبت تجريبيًا) — قائمة صادقة بخيارين + إفصاح */
      mk('إيقاف الترجمة',!ccPref.on,function(){
        S.setCcPref({on:false,lang:''});ccApplyYt();
        toast('أُوقفت الترجمة — ستبقى موقفة لكل الفيديوهات الجديدة');
      });
      mk('تشغيل الترجمة'+(ccPref.lang?' ('+ccPref.lang+')':''),ccPref.on,function(){
        S.setCcPref({on:true,lang:ccPref.lang||''});ccApplyYt();
        toast('تشغيل الترجمة حسب لغات الفيديو المتاحة في مشغل يوتيوب');
      });
      var note=d.createElement('div');note.className='stv-cc-note';
      note.textContent='ملاحظة: مشغل يوتيوب الحديث لا يتيح للصفحات الخارجية قراءة قائمة لغات الترجمة — اللغة المحفوظة تُطبَّق تلقائيًا عند فتح أي فيديو إن وُجدت ضمن لغاته.';
      menu.appendChild(note);
      return;
    }
    if(!tracks.length){
      menu.innerHTML='<div class="stv-cc-note">لا توجد ترجمات متاحة لهذا الفيديو حاليًا — توفّرها ترجمات المصدر نفسه (أصلية أو تلقائية).</div>';
      return;
    }
    mk('إيقاف الترجمة',!ccPref.on,function(){
      S.setCcPref({on:false,lang:''});
      if(curProvider==='youtube')ccApplyYt();
      else if(curProvider==='hls'){try{hls.subtitleTrack=-1}catch(_){}}
      else{try{for(var j=0;j<video.textTracks.length;j++)video.textTracks[j].mode='disabled'}catch(_){}}
      var cb=$('#stvCcBtn');if(cb)cb.classList.remove('on');
      toast('أُوقفت الترجمة — ستبقى موقفة لكل الفيديوهات الجديدة');
    });
    tracks.forEach(function(t){
      var active=ccPref.on&&(ccPref.lang===(t.code||''));
      mk(t.label+(t.asr?' (تلقائية)':''),active,function(){
        S.setCcPref({on:true,lang:t.code||''});
        if(curProvider==='youtube')ccApplyYt();
        else if(curProvider==='hls'){try{hls.subtitleTrack=t.hlsIdx}catch(_){}}
        else{try{for(var j=0;j<video.textTracks.length;j++)video.textTracks[j].mode=(video.textTracks[j]===t.track)?'showing':'disabled'}catch(_){}}
        var cb=$('#stvCcBtn');if(cb)cb.classList.add('on');
        toast('الترجمة: '+t.label);
      });
    });
    if(curProvider==='youtube'){
      var note=d.createElement('div');note.className='stv-cc-note';
      note.textContent='اللغات يوفّرها الفيديو نفسه عبر مشغل يوتيوب الرسمي (ترجمات أصلية أو تلقائية ASR) — بعض الفيديوهات لا تتوفر لها ترجمات.';
      menu.appendChild(note);
    }
  }
  function closeCc(){var m=$('#stvCcMenu'),b=$('#stvCcBtn');if(m)m.classList.remove('open');if(b)b.setAttribute('aria-expanded','false')}

  /* ── مزامنة شريط التحكم مع مشغل يوتيوب (getCurrentTime/getDuration رسمية) ── */
  function startYtSync(){
    stopYtSync();
    ytSyncTimer=setInterval(function(){
      if(!ytPlayer||curProvider!=='youtube')return;
      var t=0,dur=0,st=-1;
      try{t=ytPlayer.getCurrentTime()||0;dur=ytPlayer.getDuration()||0;st=ytPlayer.getPlayerState()}catch(_){return}
      if(dur>0&&isFinite(dur)){
        var sr=$('#stvSeekRow');if(sr)sr.style.display='';
        var sk=$('#stvSeek');if(sk&&!seeking)sk.value=Math.round(t/dur*1000);
        var cu=$('#stvCur');if(cu)cu.textContent=fmtT(t);
        var du=$('#stvDur');if(du)du.textContent=fmtT(dur);
        if(st===1)saveProgress(t,dur); /* مراجعة T7: حفظ فقط أثناء التشغيل الفعلي لا أثناء الإيقاف */
      }
    },600);
  }
  function stopYtSync(){ if(ytSyncTimer){clearInterval(ytSyncTimer);ytSyncTimer=0} }

  /* ── حفظ موضع المشاهدة (لكل المزوّدين الذين يتيحون الموضع) ── */
  function saveProgress(t,dur){
    var now=Date.now();
    if(now-progTimer<3000||!state.current||state.current.kind==='channel')return;
    if(t>25&&dur>0&&t<dur*.95){
      progTimer=now;
      prog[state.current.id]={t:t,d:dur,at:now,name:state.current.name,ep:state.current.ep||''};
      store.set(CONFIG.storage.prog,prog);
    }
  }
  function onEnded(){
    if(state.current){delete prog[state.current.id];store.set(CONFIG.storage.prog,prog)}
    if(cfg.onEnded)cfg.onEnded(state.current);
  }

  function onHlsError(ev,data){
    if(!data||!data.fatal)return;
    if(data.type===w.Hls.ErrorTypes.NETWORK_ERROR){
      if(retryCount<3){
        retryCount++;
        showLoader(true);var sp=$('#stvLoader span');if(sp)sp.textContent='انقطع الاتصال… إعادة المحاولة ('+retryCount+'/3)';
        clearTimeout(retryTimer);
        retryTimer=setTimeout(function(){ if(hls){try{hls.startLoad()}catch(_){}} },1200*retryCount);
      }else{
        showErr('تعذّر الوصول إلى البث','قد يكون المصدر متوقفًا مؤقتًا أو غير متاح من شبكتك. جرّب قناة أخرى أو أعد المحاولة لاحقًا.');
      }
    }else if(data.type===w.Hls.ErrorTypes.MEDIA_ERROR){
      if(retryCount<2){retryCount++;try{hls.recoverMediaError()}catch(_){showErr('خطأ في الوسائط','تعذّر استعادة التشغيل — أعد المحاولة أو اختر قناة أخرى.')}}
      else showErr('خطأ في الوسائط','تعذّر استعادة التشغيل — أعد المحاولة أو اختر قناة أخرى.');
    }else{
      showErr('تعذّر التشغيل','حدث خطأ غير متوقع في هذا المصدر. اختر محتوى آخر أو أعد المحاولة.');
    }
  }

  /* ── الجودة: قائمة موحّدة لمستويات HLS أو ملفات MP4 المتعددة ── */
  function buildQualityMenu(){
    var menu=$('#stvQualMenu');if(!menu)return;
    menu.innerHTML='';
    if(!qualSrc)return;
    var mk=function(label,active,onpick){
      var b=d.createElement('button');b.setAttribute('role','menuitem');
      if(active)b.className='on';
      b.innerHTML='<span>'+esc(label)+'</span>'+icon('check');
      b.addEventListener('click',function(){onpick();buildQualityMenu();closeQual()});
      menu.appendChild(b);
    };
    if(qualSrc.kind==='hls'&&hls){
      mk('تلقائي (تكيّفي)',hls.autoLevelEnabled,function(){try{hls.currentLevel=-1}catch(_){}updateQualLabel();toast('الجودة: تلقائي')});
      var seen={};
      var lvls=(hls.levels||[]).map(function(l,i){return {i:i,h:l.height||0}}).filter(function(l){return l.h>0}).sort(function(a,b){return b.h-a.h});
      lvls.forEach(function(l){
        if(seen[l.h])return;seen[l.h]=1;
        mk(l.h+'p',!hls.autoLevelEnabled&&hls.currentLevel===l.i,function(){try{hls.currentLevel=l.i}catch(_){}updateQualLabel();toast('الجودة: '+l.h+'p')});
      });
    }else if(qualSrc.kind==='mp4'&&qualSrc.variants){
      qualSrc.variants.forEach(function(v,i){
        mk(v.label,i===curVariant,function(){
          curVariant=i;
          var t=video.currentTime,wasPaused=video.paused;
          var expected=v.src;
          video.src=expected;
          try{video.load()}catch(_){}
          video.addEventListener('loadedmetadata',function(){
            if(video.src!==expected)return; /* مراجعة T7: أطفئ المستمع إذا تغيّر المصدر قبل اكتمال التحميل فلا قفز موضع */
            try{video.currentTime=t}catch(_){}
            if(!wasPaused)video.play().catch(function(){showCenter(true)});
          },{once:true});
          updateQualLabel();toast('الجودة: '+v.label);
        });
      });
    }
    updateQualLabel();
  }
  function updateQualLabel(){
    var btn=$('#stvQualBtn');if(!btn||!qualSrc)return;
    if(qualSrc.kind==='hls'&&hls){
      btn.textContent=hls.autoLevelEnabled?'جودة: تلقائي':(hls.levels&&hls.levels[hls.currentLevel]&&hls.levels[hls.currentLevel].height?('جودة: '+hls.levels[hls.currentLevel].height+'p'):'جودة');
    }else if(qualSrc.kind==='mp4'&&qualSrc.variants&&qualSrc.variants[curVariant]){
      btn.textContent='جودة: '+qualSrc.variants[curVariant].label;
    }
  }
  function closeQual(){var m=$('#stvQualMenu'),b=$('#stvQualBtn');if(m)m.classList.remove('open');if(b)b.setAttribute('aria-expanded','false')}

  /* ── ملء الشاشة (متوافق مع كل المتصفحات + بديل iPhone) ── */
  function fsElement(){return d.fullscreenElement||d.webkitFullscreenElement||d.webkitCurrentFullScreenElement||null}
  function toggleFullscreen(){
    var fsEl=fsElement();
    if(fsEl){
      (d.exitFullscreen||d.webkitExitFullscreen||function(){}).call(d);
      return;
    }
    var req=shell.requestFullscreen||shell.webkitRequestFullscreen||shell.webkitRequestFullScreen;
    if(req){
      try{
        var p=req.call(shell,{navigationUI:'hide'});
        if(p&&p.catch)p.catch(function(){
          /* رفض المتصفح → جرّب ملء الشاشة الأصلي للفيديو (iPhone) */
          if(video.webkitEnterFullscreen){try{video.webkitEnterFullscreen()}catch(_){toast('ملء الشاشة غير متاح حاليًا',true)}}
          else if(embedMode)toast('على iPhone استخدم زر ملء الشاشة داخل مشغل المنصة نفسه',true);
          else toast('رفض المتصفح طلب ملء الشاشة',true);
        });
        return;
      }catch(_){/* يتابع للبديل أدناه */}
    }
    if(video.webkitEnterFullscreen){ try{video.webkitEnterFullscreen()}catch(_){toast('ملء الشاشة غير مدعوم هنا',true)} return }
    if(video.webkitSupportsFullscreen){ try{video.webkitEnterFullscreen()}catch(_){toast('ملء الشاشة غير مدعوم هنا',true)} return }
    if(embedMode)toast('استخدم زر ملء الشاشة داخل مشغل المنصة نفسه',true);
    else toast('ملء الشاشة غير مدعوم في هذا المتصفح',true);
  }
  ['fullscreenchange','webkitfullscreenchange'].forEach(function(ev){
    d.addEventListener(ev,function(){
      var on=!!fsElement();
      var ic=$('#stvFsIc'),fb=$('#stvFsBtn');
      if(ic)ic.setAttribute('href',on?'#i-min':'#i-max');
      if(fb)fb.setAttribute('aria-label',on?'الخروج من ملء الشاشة':'ملء الشاشة');
      if(on)setUi(true);
    });
  });

  /* ── شريط التحكم: ربط الأحداث ── */
  function setPlayIcon(playing){var ic=$('#stvPlayIc');if(ic)ic.setAttribute('href',playing?'#i-pause':'#i-play')}
  video.addEventListener('play',function(){setPlayIcon(true);setUi(true);showCenter(false)});
  video.addEventListener('pause',function(){setPlayIcon(false);setUi(true);clearTimeout(uiTimer)});
  video.addEventListener('waiting',function(){showLoader(true)});
  video.addEventListener('playing',function(){showLoader(false);showCenter(false);retryCount=0;var sp=$('#stvLoader span');if(sp)sp.textContent='جارٍ تحميل البث…'});
  video.addEventListener('volumechange',function(){
    var ic=$('#stvVolIc');if(ic)ic.setAttribute('href',video.muted||video.volume===0?'#i-mute':'#i-vol');
    var vl=$('#stvVol');
    if(!IS_IOS&&vl)vl.value=video.muted?0:Math.round(video.volume*100);
  });
  video.addEventListener('error',function(){
    if(hls||embedMode||!video.getAttribute('src'))return;
    showErr('تعذّر تشغيل هذا المصدر','قد يكون الرابط متوقفًا أو الصيغة غير مدعومة في متصفحك. جرّب مصدرًا آخر.');
  });
  video.addEventListener('timeupdate',function(){
    if(!isFinite(video.duration)||!video.duration)return;
    var sk=$('#stvSeek');if(sk&&!seeking)sk.value=Math.round(video.currentTime/video.duration*1000);
    var cu=$('#stvCur');if(cu)cu.textContent=fmtT(video.currentTime);
    var du=$('#stvDur');if(du)du.textContent=fmtT(video.duration);
    /* حفظ موضع المشاهدة (الأفلام والمسلسلات فقط — ليس البث المباشر) */
    saveProgress(video.currentTime,video.duration);
  });
  video.addEventListener('ended',onEnded);
  /* عند جاهزية MP4: طبّق تفضيل الترجمة على المسارات الخارجية (لا نُفرض الترجمة إن أوقفها المستخدم) */
  video.addEventListener('loadedmetadata',function(){
    try{
      var n=video.textTracks?video.textTracks.length:0;
      if(n&&curProvider!=='hls'){var ccPref=S.ccPref();for(var i=0;i<n;i++){video.textTracks[i].mode=(ccPref.on&&i===0)?'showing':'disabled'}}
    }catch(_){}
  });
  /* استكمال تلقائي عند فتح مصدر له سجل */
  video.addEventListener('loadedmetadata',function(){
    var isChannel=!!(state.current&&state.current.kind==='channel');
    isLive=isChannel||!isFinite(video.duration);
    var sr=$('#stvSeekRow');if(sr)sr.style.display=isFinite(video.duration)&&!isLive?'':'none';
    if(!isChannel&&state.current&&prog[state.current.id]){
      var p=prog[state.current.id];
      if(p.t>25&&p.t<video.duration*.95){try{video.currentTime=p.t;toast('تم استكمال المشاهدة من '+fmtT(p.t))}catch(_){}}
    }
  });
  /* لمس الفيديو = إظهار/إخفاء عناصر التحكم (بدون حجب) */
  var lastTap=0;
  shell.addEventListener('click',function(e){
    if(e.target.closest('.stv-ctrls,.stv-topbar,.stv-err,.stv-qualmenu,.stv-center-play,.stv-unmute,.stv-ytbox,.stv-embedbox'))return;
    if(embedMode)return;
    var now=Date.now();
    if(now-lastTap<300){ toggleFullscreen(); lastTap=0; return } /* نقرة مزدوجة = ملء الشاشة */
    lastTap=now;
    shell.classList.contains('stv-ui')?shell.classList.remove('stv-ui'):setUi(true);
  });
  function togglePlay(){
    if(curProvider==='youtube'&&ytPlayer){
      try{ (ytPlayer.getPlayerState()===1)?ytPlayer.pauseVideo():ytPlayer.playVideo() }catch(_){}
      return;
    }
    if(embedMode)return; /* DailyMotion/OK.ru: التحكم من واجهة مشغلهما الداخلية */
    video.paused?video.play().catch(function(){showCenter(true)}):video.pause();
  }
  var pb=$('#stvPlayBtn');if(pb)pb.addEventListener('click',togglePlay);
  var cp=$('#stvCenterPlay button');if(cp)cp.addEventListener('click',function(){
    showCenter(false);
    if(embedMode){ if(curProvider==='youtube'&&ytPlayer){try{ytPlayer.playVideo()}catch(_){}} return }
    video.play().catch(function(){});
  });
  var mb=$('#stvMuteBtn');if(mb)mb.addEventListener('click',function(){
    if(curProvider==='youtube'&&ytPlayer){
      var m=false;try{m=ytPlayer.isMuted()}catch(_){}
      try{ m?ytPlayer.unMute():ytPlayer.mute() }catch(_){}
      if(m){var v=$('#stvVol').value/100;try{ytPlayer.setVolume(Math.round(v*100))}catch(_){}}
      showUnmute(false);
      setTimeout(function(){var m2=false;try{m2=ytPlayer.isMuted()}catch(_){}var ic=$('#stvVolIc');if(ic)ic.setAttribute('href',m2?'#i-mute':'#i-vol')},150);
      return;
    }
    video.muted=!video.muted; if(!video.muted&&video.volume===0)video.volume=.6;
    showUnmute(false);
  });
  var vol=$('#stvVol');if(vol)vol.addEventListener('input',function(){
    if(curProvider==='youtube'&&ytPlayer){
      try{ytPlayer.setVolume(Number(this.value)); if(this.value>0)ytPlayer.unMute()}catch(_){}
      return;
    }
    video.muted=this.value==0; video.volume=this.value/100;
  });
  var um=$('#stvUnmute');if(um)um.addEventListener('click',function(){
    if(curProvider==='youtube'&&ytPlayer){try{ytPlayer.unMute();ytPlayer.setVolume(60)}catch(_){} var v=$('#stvVol');if(v)v.value=60;}
    else{ video.muted=false; if(video.volume===0){video.volume=.6;var v2=$('#stvVol');if(v2)v2.value=60} }
    showUnmute(false);
  });
  var fs=$('#stvFsBtn');if(fs)fs.addEventListener('click',toggleFullscreen);
  var fb=$('#stvFavBtn');if(fb)fb.addEventListener('click',function(){ if(state.current&&!state.current.soon){S.toggleFav(state.current.id);syncFavUI();if(cfg.onFavsChange)cfg.onFavsChange()} });
  var qb=$('#stvQualBtn');if(qb)qb.addEventListener('click',function(e){e.stopPropagation();var m=$('#stvQualMenu');var on=m.classList.toggle('open');this.setAttribute('aria-expanded',on)});
  var cb=$('#stvCcBtn');if(cb)cb.addEventListener('click',function(e){e.stopPropagation();var m=$('#stvCcMenu');var on=m.classList.toggle('open');this.setAttribute('aria-expanded',on)});
  d.addEventListener('click',function(e){ if(!e.target.closest('#stvQualMenu,#stvQualBtn'))closeQual() });
  d.addEventListener('click',function(e){ if(!e.target.closest('#stvCcMenu,#stvCcBtn'))closeCc() });
  /* أزرار صندوق الخطأ */
  var er=$('#stvErrRetry');if(er)er.addEventListener('click',function(){ hideErr(); if(state.current)play(state.current) });
  var eo=$('#stvErrOther');if(eo)eo.addEventListener('click',function(){ hideErr(); showIdle(true); state.current=null; syncFavUI(); try{d.title=cfg.titleBase}catch(_){} if(cfg.onPickOther)cfg.onPickOther() });
  /* شريط التقدم */
  var sk=$('#stvSeek');
  if(sk){
    sk.addEventListener('input',function(){
      seeking=true;
      var dur=video.duration;
      if(curProvider==='youtube'&&ytPlayer){try{dur=ytPlayer.getDuration()||0}catch(_){}}
      var cu=$('#stvCur');if(cu)cu.textContent=fmtT(this.value/1000*(dur||0));
    });
    sk.addEventListener('change',function(){
      seeking=false;
      var frac=this.value/1000;
      if(curProvider==='youtube'&&ytPlayer){try{ytPlayer.seekTo(frac*(ytPlayer.getDuration()||0),true)}catch(_){}}
      else try{video.currentTime=frac*video.duration}catch(_){}
    });
  }
  /* PiP */
  function pipAvailable(){return !IS_IOS&&d.pictureInPictureEnabled&&('pictureInPictureEnabled' in d)}
  if(pipAvailable()){ var p1=$('#stvPipBtn'),p2=$('#stvPipBtn2');if(p1)p1.style.display='';if(p2)p2.style.display=''; }
  function togglePip(){
    if(d.pictureInPictureElement){d.exitPictureInPicture()}
    else if(pipAvailable()&&video.src){video.requestPictureInPicture().catch(function(){toast('تعذّر فتح الصورة داخل صورة',true)})}
    else if(!video.src){toast('الصورة داخل صورة متاحة مع مشغّل الصفحة (HLS/MP4) فقط — التضمينات الخارجية يديرها مشغّل المنصة')} }
  var pp1=$('#stvPipBtn');if(pp1)pp1.addEventListener('click',togglePip);
  var pp2=$('#stvPipBtn2');if(pp2)pp2.addEventListener('click',togglePip);

  /* ── واجهة المشغل العلوية: الاسم والشارات ── */
  function setNow(it){
    var n=$('#stvName');if(n)n.textContent=it.name+(it.ep?' — '+it.ep:'');
    var nn=$('#stvNowName');if(nn)nn.textContent=it.name+(it.ep?' — '+it.ep:'');
    var lc=$('#stvLiveChip');if(lc)lc.style.display=(it.kind==='channel'&&!it.soon)?'':'none';
    var hd=$('#stvHd');if(hd)hd.style.display=it.hd?'':'none';
    var pv=$('#stvProv');
    if(pv){var p=PROVIDERS[it.type];if(p){pv.textContent=p.label;pv.style.display=''}else{pv.style.display='none'}}
  }
  function syncFavUI(){
    var c=state.current;
    var bf=$('#stvFavBtn');
    if(bf){bf.classList.toggle('is-fav',!!(c&&S.isFav(c.id)));bf.setAttribute('aria-label',c&&S.isFav(c.id)?'إزالة من المفضلة':'إضافة إلى المفضلة')}
  }

  /* التنقل داخل قائمة التشغيل التي يحددها تطبيق الصفحة */
  function step(n){
    if(!state.current)return;
    var ids=state.playlist.map(function(i){return i.id});var idx=ids.indexOf(state.current.id);
    if(idx<0)return;
    var next=state.playlist[(idx+n+state.playlist.length)%state.playlist.length];
    play(next);
  }
  var prev=$('#stvPrevBtn');if(prev)prev.addEventListener('click',function(){step(-1)});
  var nxt=$('#stvNextBtn');if(nxt)nxt.addEventListener('click',function(){step(1)});

  /* ── الاختصارات ── */
  d.addEventListener('keydown',function(e){
    var tag=(e.target.tagName||'').toLowerCase();
    if(tag==='input'||tag==='textarea')return;
    /* Space/Enter تُفعّل العنصر المركّز نفسه (زر/تبويب/قائمة) — لا نختطفها لمشغل الفيديو (مراجعة T7) */
    if(e.key===' '&&e.target.closest('button,a,[role="tab"],[role="menuitem"]'))return;
    if(e.key==='/' ){var sw=$('#stvSearchWrap'),si=$('#stvSearch');if(sw&&si){e.preventDefault();sw.classList.add('open');si.focus()}return}
    if(e.key==='Escape'){if(cfg.onEscape)cfg.onEscape();return}
    if(embedMode&&curProvider!=='youtube')return;
    switch(e.key){
      case ' ':case 'k':e.preventDefault();togglePlay();break;
      case 'f':toggleFullscreen();break;
      case 'm':var mb2=$('#stvMuteBtn');if(mb2)mb2.click();break;
      case 'n':step(1);break;
      case 'p':step(-1);break;
      case 'ArrowUp':case 'ArrowDown':{
        e.preventDefault();
        var vl=$('#stvVol');if(!vl)break;
        var dir=e.key==='ArrowUp'?10:-10;
        var v=Math.max(0,Math.min(100,Number(vl.value)+dir));
        vl.value=v;vl.dispatchEvent(new Event('input'));
        break;
      }
    }
  });
  /* حفظ الموضع عند مغادرة الصفحة */
  d.addEventListener('visibilitychange',function(){
    if(d.visibilityState==='hidden'&&state.current&&state.current.kind!=='channel'&&isFinite(video.duration)&&video.currentTime>25&&video.currentTime<video.duration*.95){
      prog[state.current.id]={t:video.currentTime,d:video.duration,at:Date.now(),name:state.current.name,ep:state.current.ep||''};
      store.set(CONFIG.storage.prog,prog);
    }
  });

  /* الواجهة العامة للمشغل */
  return {
    play:play,
    step:step,
    setPlaylist:function(list){state.playlist=list||[]},
    current:function(){return state.current},
    muted:function(v){if(v===undefined)return state.muted;state.muted=!!v},
    showIdle:showIdle,
    isEmbed:function(){return embedMode},
    isNative:function(){return nativeMode},
    provider:function(){return curProvider},
    prog:function(){return prog},
    progOf:function(id){return prog[id]||null},
    resetTitle:function(){try{d.title=cfg.titleBase}catch(_){}}
  };
}

S.createPlayer=createPlayer;
return S;
})(window.STV);
