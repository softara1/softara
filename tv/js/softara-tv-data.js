/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v2.1.2 — بيانات المكتبة (مستخرجة حرفيًا من النسخة المستقلة v2.1)
   ★ لإضافة أفلام/مسلسلات/قنوات: عدّل هذا الملف فقط ثم ارفع نسخة جديدة (وسم جديد) — انظر tv/README.md
   المخطط: type = hls|mp4|youtube|dailymotion|okru · kind = channel|movie|series|program|wrestling|docs|kids
   ════════════════════════════════════════════════════════════════ */
window.STV_DATA = {
  version: 3,
  updated: '2026-11-02',
  news: [
    'مرحبًا بكم في سوفتارا TV 2.1 — مكتبة تلفزيونية متكاملة: قنوات مباشرة، أفلام، مسلسلات، برامج، مصارعة، وثائقيات وأطفال',
    'خمسة مزوّدين بتنفيذ فعلي: HLS (M3U8 بجودات متعددة) · MP4 (جودات + ترجمة VTT) · YouTube (ترجمة وقوائم) · DailyMotion · OK.ru',
    'جديد الترجمة: زر CC في شريط التحكم — إيقاف/تشغيل محفوظ التفضيل؛ قائمة اللغات الفعلية متاحة لـ HLS وMP4، ويعتمد يوتيوب على تفضيلك المحفوظ عند التحميل (حدود رسمية موثقة)',
    'المصادر: قنوات رسمية ناشئة + أفلام ملكية عامة (archive.org) + قنوات رسمية (ناسا، الجزيرة الوثائقية، WWE، بلندر، TRT Çocuk)',
    'تغيير الفيديو أو القناة ينظّف المشغل السابق جذريًا: لا ترجمة معلقة ولا صوت خفي ولا مؤقتات قديمة',
    'لإضافة محتوى: عدّل قسم البيانات في أعلى الصفحة فقط — دون لمس أي كود آخر'
  ],
  items: [
    /* ── البث المباشر: 7 قنوات رسمية فُحصت حيّة (ماستر + child + segment) ── */
    {id:'ch-aj', kind:'channel', name:'الجزيرة', cat:'أخبار', country:'قطر', type:'hls', src:'https://live-hls-web-aja.getaj.net/AJA/index.m3u8', hd:true, featured:true, levels:6, desc:'القناة الإخبارية الرئيسية — تصل إلى 6 جودات حسب التوافر (حتى 1080p)'},
    {id:'ch-alarabiya', kind:'channel', name:'العربية', cat:'أخبار', country:'السعودية', type:'hls', src:'https://av.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8', hd:true, levels:4, desc:'قناة العربية الإخبارية — تصل إلى 4 جودات حسب التوافر'},
    {id:'ch-sna', kind:'channel', name:'سكاي نيوز عربية', cat:'أخبار', country:'الإمارات', type:'hls', src:'https://stream.skynewsarabia.com/hls/sna.m3u8', hd:true, levels:5, desc:'القناة الإخبارية الإماراتية — تصل إلى 5 جودات حسب التوافر'},
    {id:'ch-dw', kind:'channel', name:'DW عربية', cat:'أخبار', country:'ألمانيا', type:'hls', src:'https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8', hd:true, levels:5, desc:'DW بالعربية — تصل إلى 5 جودات حسب التوافر'},
    {id:'ch-dw-en', kind:'channel', name:'DW English', cat:'أخبار', country:'ألمانيا', type:'hls', src:'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8', hd:true, levels:5, desc:'DW بالإنجليزية — مع ترجمة إنجليزية مدمجة عند توافرها في البث — بديل مفحوص عن فرانس24'},
    {id:'ch-trt', kind:'channel', name:'TRT عربي', cat:'عامة', country:'تركيا', type:'hls', src:'https://tv-trtarabi.medya.trt.com.tr/master.m3u8', hd:true, levels:5, desc:'برامج متنوعة وثقافية — حتى 1440p'},
    {id:'ch-rbtv', kind:'channel', name:'Red Bull TV', cat:'رياضة', country:'النمسا', type:'hls', src:'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8', hd:true, levels:6, desc:'رياضات وأحداث عالمية — تصل إلى 6 جودات مع ترجمة CC عند توافرها'},

    /* ── الأفلام: HLS (جودات/ترجمات) + MP4 (جودات/ملكية عامة) + YouTube + DailyMotion ── */
    {id:'mv-bbb-hls', kind:'movie', name:'الأرنب الكبير — عرض جودات HLS', cat:'أنيميشن', year:2008, type:'hls', src:'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', demo:true, levels:5, durText:'10:35', poster:'https://archive.org/services/img/BigBuckBunny_124', desc:'فيلم بلندر المفتوح عبر HLS بخمس جودات حتى 1080p حسب التوافر — جرّب زر الجودة والتبديل اليدوي'},
    {id:'mv-bipbop', kind:'movie', name:'عرض الترجمات المدمجة في HLS', cat:'تجريبي', year:2015, type:'hls', src:'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8', demo:true, levels:5, durText:'10:00', desc:'بث Apple التجريبي: 4 لغات ترجمة مدمجة (en/fr/es/ja) — افتح قائمة الترجمة CC'},
    {id:'mv-tos-hls', kind:'movie', name:'دموع من فولاذ — HLS', cat:'خيال علمي', year:2012, type:'hls', src:'https://test-streams.mux.dev/tos_ismc/main.m3u8', demo:true, levels:1, durText:'12:14', poster:'https://archive.org/services/img/Tears-of-Steel', desc:'فيلم بلندر بترجمة إنجليزية مدمجة (WebVTT داخل المانيفست)'},
    {id:'mv-bbb-mp4', kind:'movie', name:'الأرنب الكبير — MP4 متعدد الجودات', cat:'أنيميشن', year:2008, type:'mp4', variants:[{label:'1080p (1920×1080)',src:'https://archive.org/download/BigBuckBunnyFULLHD60FPS/Big%20Buck%20Bunny%20-%20FULL%20HD%2060FPS.mp4'},{label:'360p (640×360)',src:'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'}], subs:[{label:'العربية (تجريبية)',lang:'ar'}], demo:true, durText:'9:56', poster:'https://archive.org/services/img/BigBuckBunny_124', desc:'نفس الفيلم بجودتين MP4 حقيقيتين (فُحصتا بـ ffprobe) + ترجمة عربية خارجية VTT — اختبر تبديل الجودة من زر الجودة'},
    {id:'mv-tos-mp4', kind:'movie', name:'دموع من فولاذ — MP4', cat:'خيال علمي', year:2012, type:'mp4', src:'https://archive.org/download/Tears-of-Steel/tears_of_steel_1080p.mp4', demo:true, durText:'12:14', poster:'https://archive.org/services/img/Tears-of-Steel', srcNote:'نسخ archive.org الوحيدة المتاحة لهذا الفيلم متطابقتا الأبعاد تقريبًا (864×360) فلم تُقدَّم كجودتين — صدقًا مع المستخدم', desc:'فيلم بلندر المفتوح (رخصة CC BY 3.0) — ملف MP4 واحد'},
    {id:'mv-sintel-mp4', kind:'movie', name:'سينتِل — MP4 متعدد الجودات', cat:'أنيميشن', year:2010, type:'mp4', variants:[{label:'2048×872 (أصلية)',src:'https://archive.org/download/Sintel/sintel-2048-stereo.mp4'},{label:'240p (564×240)',src:'https://archive.org/download/Sintel/sintel-2048-stereo_512kb.mp4'}], demo:true, durText:'14:48', poster:'https://archive.org/services/img/Sintel', desc:'فيلم بلندر بجودتين حقيقيتين مختلفتين جذريًا (فُحصتا بـ ffprobe): 2048×872 مقابل 564×240 — الفرق يظهر فورًا عند التبديل'},
    {id:'mv-charade', kind:'movie', name:'شاراد — Charade (1963)', cat:'غموض', year:1963, type:'mp4', src:'https://archive.org/download/charade-1963-cary-grant-audrey-hepburn-comedy-mystery-romance-thriller-full-movie/Charade_READY.mp4', durText:'1:53:05', poster:'https://archive.org/services/img/charade-1963-cary-grant-audrey-hepburn-comedy-mystery-romance-thriller-full-movie', srcNote:'فيلم كامل (~ساعتان) — ملكية عامة (Public Domain Mark) عبر archive.org', desc:'كوميديا غموض ورومانسية مع كاري غرانت وأودري هيبورن — يُدعم البحث والاستكمال (Range)'},
    {id:'mv-nold', kind:'movie', name:'ليلة الموتى الأحياء (1968)', cat:'رعب', year:1968, type:'mp4', src:'https://archive.org/download/night-of-the-living-dead-1968-hd/Night%20Of%20The%20Living%20Dead%20%281968%29%20%5BHD%5D.mp4', durText:'1:35:38', poster:'https://archive.org/services/img/night-of-the-living-dead-1968-hd', srcNote:'فيلم كامل HD — ملكية عامة عبر archive.org', desc:'الكلاسيكية المؤسِّسة لرعب الزومبي بجودة HD'},
    {id:'mv-plan9', kind:'movie', name:'الخطة 9 من الفضاء الخارجي (1959)', cat:'خيال علمي', year:1959, type:'mp4', src:'https://archive.org/download/plan-9-from-outer-space_202009/Plan%209%20from%20Outer%20Space.mp4', durText:'1:19:07', poster:'https://archive.org/services/img/plan-9-from-outer-space_202009', srcNote:'فيلم كامل — ملكية عامة (Public Domain Mark)', desc:'أشهر أفلام إد وود — رمز ثقافي في تاريخ السينما'},
    {id:'mv-charade-yt', kind:'movie', name:'شاراد (1963) — نسخة يوتيوب', cat:'غموض', year:1963, type:'youtube', src:'SLQc9kSkRmo', durText:'1:53:23', poster:'https://i.ytimg.com/vi/SLQc9kSkRmo/mqdefault.jpg', srcNote:'قناة Shout! Studios الرسمية — فيلم ملكية عامة', desc:'اختبار يوتيوب لفيلم طويل 90+ دقيقة مع ترجمة CC عبر زر الترجمة'},
    {id:'mv-nold-yt', kind:'movie', name:'ليلة الموتى الأحياء (1968) — يوتيوب', cat:'رعب', year:1968, type:'youtube', src:'VpyzMaij3Yw', durText:'1:35:31', poster:'https://i.ytimg.com/vi/VpyzMaij3Yw/mqdefault.jpg', srcNote:'فيلم ملكية عامة منشور على يوتيوب', desc:'النسخة الأصلية الكاملة'},
    {id:'mv-hgf-yt', kind:'movie', name:'صديقته الجمعة (1940) — يوتيوب', cat:'كوميديا', year:1940, type:'youtube', src:'E21hRISkLBA', durText:'1:31:31', poster:'https://i.ytimg.com/vi/E21hRISkLBA/mqdefault.jpg', srcNote:'قناة Shout! Studios الرسمية — ملكية عامة', desc:'كاري غرانت وروزاليند راسل — كوميديا الكواليس الصحفية'},
    {id:'mv-nold-dm', kind:'movie', name:'ليلة الموتى الأحياء (1968) — DailyMotion', cat:'رعب', year:1968, type:'dailymotion', src:'x7v2k6l', durText:'1:35:51', poster:'https://s1.dmcdn.net/v/SLisj1g421D2mnteR/x480', srcNote:'DailyMotion — فيلم ملكية عامة، تضمين مفعّل رسميًا', desc:'اختبار تضمين DailyMotion لفيلم طويل'},
    {id:'mv-general-dm', kind:'movie', name:'الجنرال (1926) — DailyMotion', cat:'كوميديا صامتة', year:1926, type:'dailymotion', src:'x2eo6sp', durText:'1:18:52', poster:'https://s2.dmcdn.net/v/8hKvf1g43EDDYe3FJ/x480', srcNote:'DailyMotion — ملكية عامة، تضمين مفعّل رسميًا', desc:'تحفة باستر كيتون الصامتة الكاملة'},
    {id:'mv-hgf-dm', kind:'movie', name:'صديقته الجمعة (1940) — DailyMotion', cat:'كوميديا', year:1940, type:'dailymotion', src:'xbrbwie', durText:'1:31:52', poster:'https://s1.dmcdn.net/v/gOO1M1guGsc1v2dD_/x480', srcNote:'DailyMotion — ملكية عامة، تضمين مفعّل رسميًا', desc:'نسخة كاملة قابلة للتضمين'},

    /* ── البرامج: بث رسمي + برنامج OK.ru (انظر المجموعات) ── */
    {id:'pr-nasalive', kind:'program', name:'ناسا لايف — البث الرسمي', cat:'برامج وثائقية', type:'youtube', src:'21X5lGlDOfg', durText:'بث حي', srcNote:'القناة الرسمية لناسا على يوتيوب', desc:'بث ناسا الرسمي المباشر على يوتيوب'},

    /* ── الوثائقيات: ناسا + الجزيرة الوثائقية + DailyMotion + OK.ru ── */
    {id:'dc-cosmic', kind:'docs', name:'الفجر الكوني — Cosmic Dawn', cat:'وثائقي', year:2023, type:'youtube', src:'uSMGENDH_QI', durText:'1:36:46', poster:'https://i.ytimg.com/vi/uSMGENDH_QI/mqdefault.jpg', srcNote:'NASA+ الأصلي — القناة الرسمية لناسا', desc:'وثائقي كامل 90+ دقيقة عن تلسكوب جيمس ويب'},
    {id:'dc-color', kind:'docs', name:'لون الفضاء', cat:'وثائقي', type:'youtube', src:'S6vYHdH0AeE', durText:'50:08', poster:'https://i.ytimg.com/vi/S6vYHdH0AeE/mqdefault.jpg', srcNote:'القناة الرسمية لناسا', desc:'رحلة رواد الفضاء السود — وثائقي ناسا'},
    {id:'dc-apollo', kind:'docs', name:'رحلات أبولو', cat:'وثائقي', type:'youtube', src:'GNJpoP642wc', durText:'57:45', poster:'https://i.ytimg.com/vi/GNJpoP642wc/mqdefault.jpg', srcNote:'القناة الرسمية لناسا', desc:'قصة برنامج أبولو الكاملة'},
    {id:'dc-pluto', kind:'docs', name:'عام بلوتو — New Horizons', cat:'وثائقي', type:'youtube', src:'EJxwWpaGoJs', durText:'58:34', poster:'https://i.ytimg.com/vi/EJxwWpaGoJs/mqdefault.jpg', srcNote:'القناة الرسمية لناسا', desc:'وثائقي مهمة نيوهورايزنز'},
    {id:'dc-che', kind:'docs', name:'تشي غيفارا.. الصورة الأكثر شعبية في التاريخ', cat:'وثائقي', type:'youtube', src:'VCL2KhhFZjk', durText:'52:58', poster:'https://i.ytimg.com/vi/VCL2KhhFZjk/mqdefault.jpg', srcNote:'قناة الجزيرة الوثائقية الرسمية', desc:'كيف أصبحت صورة تشي رمزًا عالميًا؟'},
    {id:'dc-tiktok', kind:'docs', name:'تيك توك.. ولادة العملاق الصيني', cat:'وثائقي', type:'youtube', src:'3DuMaOvjKOc', durText:'45:26', poster:'https://i.ytimg.com/vi/3DuMaOvjKOc/mqdefault.jpg', srcNote:'قناة الجزيرة الوثائقية الرسمية', desc:'قصة صعود تيك توك'},
    {id:'dc-patagonia', kind:'docs', name:'باتاغونيا.. الحياة عند حافة العالم', cat:'وثائقي', type:'youtube', src:'HZDhfJavoJo', durText:'39:45', poster:'https://i.ytimg.com/vi/HZDhfJavoJo/mqdefault.jpg', srcNote:'قناة الجزيرة الوثائقية الرسمية', desc:'الساحل الصحراوي — طبيعة نادرة'},
    {id:'dc-dm-hiro', kind:'docs', name:'قنبلة هيروشيما — وثائقي بالعربية', cat:'وثائقي', type:'dailymotion', src:'x2y5wlz', durText:'44:14', poster:'https://s2.dmcdn.net/v/AeDvN1gvLIQrLLKV7/x480', demo:true, srcNote:'DailyMotion — تضمين مفعّل من الناشر (محتوى تجريبي يُستبدل عند توقيع التراخيص)', desc:'اختبار تضمين وثائقي طويل على DailyMotion'},
    {id:'dc-dm-mayadeen', kind:'docs', name:'وثائقي الميادين', cat:'وثائقي', type:'dailymotion', src:'x4duxas', durText:'51:10', poster:'https://s2.dmcdn.net/v/FpS4K1e8x17SofSVS/x480', demo:true, srcNote:'DailyMotion — تضمين مفعّل من الناشر (محتوى تجريبي)', desc:'برنامج وثائقي عربي كامل'},
    {id:'dc-ok-science', kind:'docs', name:'المستشعرات الكمومية — غيغاناوكا', cat:'وثائقي', type:'okru', src:'16321332513493', durText:'3:00', poster:'https://iv.okcdn.ru/i?r=BDFSTM1h2o92P_v-s8DgGlgYdFBN4yOPoVg2814aHjCc_clMWNCAyvhEjLZV2on9wsM&fn=external_8', demo:true, srcNote:'OK.ru — عينة قصيرة لإثبات التضمين (قناة علمية رسمية)', desc:'اختبار تضمين OK.ru — انظر قسم البرامج لاختبار الحلقات الطويلة'},

    /* ── الأطفال: أفلام بلندر الرسمية + مجموعتا حلقات (ناسا للأطفال + كيلوغلان TRT) ── */
    {id:'kd-bbb', kind:'kids', name:'أرنوب الكبير — Big Buck Bunny', cat:'أطفال', year:2008, type:'youtube', src:'aqz-KE-bpKQ', durText:'10:35', poster:'https://i.ytimg.com/vi/aqz-KE-bpKQ/mqdefault.jpg', srcNote:'القناة الرسمية لبلندر — رخصة CC BY', desc:'فيلم الأنيميشن الأشهر مفتوح المصدر — بجودة عالية حتى 4K حسب المصدر'},
    {id:'kd-sintel', kind:'kids', name:'سينتِل — Sintel', cat:'أطفال', year:2010, type:'youtube', src:'eRsGyueVLvQ', durText:'14:48', poster:'https://i.ytimg.com/vi/eRsGyueVLvQ/mqdefault.jpg', srcNote:'القناة الرسمية لبلندر — رخصة CC BY', desc:'فيلم فانتازيا قصير كامل'},
    {id:'kd-tos', kind:'kids', name:'دموع من فولاذ — Tears of Steel', cat:'أطفال', year:2012, type:'youtube', src:'R6MlUcmOul8', durText:'12:15', poster:'https://i.ytimg.com/vi/R6MlUcmOul8/mqdefault.jpg', srcNote:'القناة الرسمية لبلندر — رخصة CC BY', desc:'فيلم مؤثرات بصرية كامل'}
  ],

  /* ── المجموعات: مسلسلات وقوائم حلقات حقيقية (تُفكّ آليًا إلى عناصر حلقات) ──
     كل معرّفات الحلقات أدناه مأخوذة من القوائم الأصلية على المنصات نفسها وفُحصت فرديًا */
  groups: {
    'sr-flash': {
      kind:'series', name:'فلاش غوردون (1936)', cat:'خيال علمي', year:1936, type:'youtube',
      playlist:'PLB_icse0jSBAeEVXsUezCsC1IdTd7raa_',
      poster:'https://i.ytimg.com/vi/aFhjpXdfhZI/mqdefault.jpg',
      srcNote:'القائمة الأصلية على يوتيوب (13 فصلًا كاملًا) — مسلسل ملكية عامة، فُحصت الحلقات الـ13 فرديًا',
      desc:'مسلسل الفضاء الكلاسيكي المتسلسل بـ 13 فصلًا (Space Soldiers) — الحلقات هي الحلقات الحقيقية من قائمة يوتيوب الأصلية، مع مصغرات رسمية من i.ytimg.com.',
      seasons:[{name:'الفصول 1-13',eps:[
        {src:'aFhjpXdfhZI',title:'كوكب الخطر',durText:'20:59'},
        {src:'2-WBCukZtq0',title:'نفق الرعب',durText:'20:27'},
        {src:'NHm6-0qufSE',title:'أسر رجال القرش',durText:'21:21'},
        {src:'EINKM_PKKa0',title:'معركة وحش البحر',durText:'18:26'},
        {src:'ys-YwkJXXKs',title:'شعاع التدمير',durText:'18:13'},
        {src:'M_dAwuvhuJ4',title:'التعذيب الملتهب',durText:'18:15'},
        {src:'X6AP-ZZ3_K8',title:'الهلاك المدمر',durText:'18:27'},
        {src:'DqqpmPzx71M',title:'بطولة الموت',durText:'17:13'},
        {src:'gf7OeUiJe_Q',title:'محاربة التنين الناري',durText:'19:34'},
        {src:'GrGezW9A2nc',title:'الخطر الخفي',durText:'19:07'},
        {src:'08Jd26VuVEc',title:'في مخالب التيغرون',durText:'18:26'},
        {src:'R_N7gP9Qu1E',title:'محاصرون في البرج',durText:'18:10'},
        {src:'wM1Z8Mk_9cM',title:'الإقلاع نحو الأرض',durText:'20:27'}
      ]}]
    },
    'sr-lucy': {
      kind:'series', name:'عرض لوسي — The Lucy Show', cat:'كوميديا', year:1962, type:'youtube',
      playlist:'PLmHgXUJMN1TXCZbl3w_RYofN_XMCRDtdy',
      poster:'https://i.ytimg.com/vi/m2JAuLljltI/mqdefault.jpg',
      srcNote:'قائمة PizzaFlix على يوتيوب (30 حلقة كاملة) — حلقات ملكية عامة، عُيّنت 10 حلقات وفُحصت',
      desc:'كوميديا لوسيل بول الكلاسيكية — 10 حلقات كاملة (من أصل 30 في القائمة الأصلية) بمصغرات رسمية.',
      seasons:[{name:'الحلقات الكاملة',eps:[
        {src:'m2JAuLljltI',title:'لوسي العجوز | S6E7',durText:'22:29'},
        {src:'AF52-oO--p0',title:'لوسي تلتقي جون وين | S5E10',durText:'25:14'},
        {src:'8petwReCGsQ',title:'لوسي وفيف في حمام | S1E18',durText:'25:44'},
        {src:'CcZyB7-XZXQ',title:'لوسي محاصرة | S6E2',durText:'25:00'},
        {src:'KmHLa56h0qA',title:'رباعية الحلاقة | S1E19',durText:'25:45'},
        {src:'_36_dTq_vJQ',title:'لوسي وملكة الفاصولياء | S5E3',durText:'25:28'},
        {src:'4xvpqXInreY',title:'لوسي تؤجّر غرفة | S5E6',durText:'22:19'},
        {src:'LKeq0K23uzQ',title:'لوسي والخاتم | S5E5',durText:'25:09'},
        {src:'PmlrsEmMBBQ',title:'لوسي تطير إلى لندن | S5E6',durText:'25:20'},
        {src:'u8A4CTStIN8',title:'لوسي تلتقي جورج بيرنز | S5E1',durText:'25:26'}
      ]}]
    },
    'sr-superman': {
      kind:'series', name:'سوبرمان فليشر (1941)', cat:'أنيميشن', year:1941, type:'mp4',
      poster:'https://archive.org/services/img/fleischer-superman',
      srcNote:'ملكية عامة (Public Domain Mark) — 17 حلقة MP4 بحجم 1080p من archive.org، فُحصت 10 حلقات بـ Range 206',
      desc:'سلسلة الرسوم المتحركة الأسطورية من استوديوهات فليشر — ملفات MP4 مستقلة لكل حلقة تُشغّل مباشرة من archive.org.',
      seasons:[{name:'الحلقات 1-10',eps:[
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%20%281941%3B%20HD%29.mp4",title:'Superman',durText:'10:28'},
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%EF%BC%9A%20The%20Mechanical%20Monsters%20%281941%3B%20HD%29.mp4",title:'The Mechanical Monsters',durText:'10:16'},
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%EF%BC%9A%20Billion%20Dollar%20Limited%20%281942%3B%20HD%29.mp4",title:'Billion Dollar Limited',durText:'8:37'},
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%EF%BC%9A%20The%20Arctic%20Giant%20%281942%3B%20HD%29.mp4",title:'The Arctic Giant',durText:'8:36'},
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%EF%BC%9A%20The%20Bulleteers%20%281942%3B%20HD%29.mp4",title:'The Bulleteers',durText:'8:05'},
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%EF%BC%9A%20The%20Magnetic%20Telescope%20%281942%3B%20HD%29.mp4",title:'The Magnetic Telescope',durText:'7:41'},
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%EF%BC%9A%20The%20Electric%20Earthquake%20%281942%3B%20HD%29.mp4",title:'The Electric Earthquake',durText:'8:45'},
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%EF%BC%9A%20Volcano%20%281942%3B%20HD%29.mp4",title:'Volcano',durText:'7:57'},
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%EF%BC%9A%20Terror%20on%20the%20Midway%20%281942%3B%20HD%29.mp4",title:'Terror on the Midway',durText:'8:22'},
        {src:"https://archive.org/download/fleischer-superman/Max%20Fleischer's%20Superman%EF%BC%9A%20Japoteurs%20%281942%3B%20HD%29.mp4",title:'Japoteurs',durText:'9:07'}
      ]}]
    },
    'sr-kel': {
      kind:'kids', name:'كيلوغلان — TRT Çocuk', cat:'أطفال', year:2019, type:'dailymotion',
      playlist:'xe1w36',
      poster:'https://s1.dmcdn.net/v/beLn61gjhSF5dfWzU/x480',
      srcNote:'قائمة TRT Çocuk الرسمية على DailyMotion (33 حلقة قابلة للتضمين) — دمجنا 12 حلقة مفحوصة',
      desc:'مسلسل الأطفال التركي الشهير من قناة TRT Çocuk الرسمية عبر تضمين DailyMotion الرسمي — حلقات حقيقية بصور رسمية.',
      seasons:[{name:'الحلقات المفحوصة',eps:[
        {src:'xafvmti',title:'بين الأخوة',durText:'13:59',thumb:'https://s1.dmcdn.net/v/beLn61gjhSF5dfWzU/x480'},
        {src:'xafw5re',title:'كاميرا الوزير',durText:'13:32',thumb:'https://s2.dmcdn.net/v/beRmg1gjhSE4c2fYr/x480'},
        {src:'xafw6pu',title:'عطلة الشاطئ',durText:'3:38',thumb:'https://s2.dmcdn.net/v/beS421gjhSEswnvHG/x480'},
        {src:'xafw6yy',title:'علماء وفنانون',durText:'11:21',thumb:'https://s2.dmcdn.net/v/beS9A1gjhSEoZ5kPJ/x480'},
        {src:'xafw8be',title:'اثنان طويلان',durText:'11:48',thumb:'https://s1.dmcdn.net/v/beSaQ1gjhSDKasXHP/x480'},
        {src:'xagann2',title:'المجلس',durText:'14:20',thumb:'https://s1.dmcdn.net/v/bh0uk1gjhSDA5fdYY/x480'},
        {src:'xagapma',title:'احترس مما تتمنى',durText:'10:33',thumb:'https://s1.dmcdn.net/v/bh1Wo1gjhSC4-kFB-/x480'},
        {src:'xagbfzu',title:'الفواق',durText:'8:57',thumb:'https://s2.dmcdn.net/v/bh9sw1gjhSCITtgUr/x480'},
        {src:'xagbo8a',title:'البازل',durText:'13:14',thumb:'https://s2.dmcdn.net/v/bhCTg1gjhSCGKpWad/x480'},
        {src:'xaotymu',title:'صديق العنكبوت',durText:'13:38',thumb:'https://s2.dmcdn.net/v/cXjIM1gjhR-UT5kBu/x480'},
        {src:'xaoxr6i',title:'الفضائيون',durText:'13:01',thumb:'https://s2.dmcdn.net/v/cYOVQ1gjhR-g6k1Zh/x480'},
        {src:'xb0v9ya',title:'الغواصة',durText:'14:18',thumb:'https://s1.dmcdn.net/v/dkr0Y1gjhRUluSYWn/x480'}
      ]}]
    },
    'sr-okshow': {
      kind:'program', name:'أوكنَيوتييه لودي — برنامج OK.ru الرسمي', cat:'برامج ترفيهية', year:2023, type:'okru',
      poster:'https://iv.okcdn.ru/i?r=BDFSTM1h2o92P_v-s8DgGlgY7ocpkrWi3VR4Ma6zgGIoxB50c1qINx1VTCOhieM3uj0&fn=external_8',
      srcNote:'برنامج من إنتاج منصة OK.ru نفسها (حلقات 48-60 دقيقة) — أطول محتوى يمكن التحقق من إتاحته الرسمية للتضمين على المنصة',
      desc:'برنامج ترفيهي روسي من إنتاج OK.ru الأصلي — اختبار حقيقي لحلقات طويلة عبر تضمين OK.ru، مع ملاحظة صادقة: أفلام OK.ru الطويلة المتاحة لا يمكن التحقق من ترخيصها فلم تُدرج.',
      seasons:[{name:'الحلقات',eps:[
        {src:'5230068632094',title:'الحلقة 1: موساغالييف ضد دوروخوف',durText:'59:54'},
        {src:'7475662490142',title:'الحلقة 3: فولكوفا وتشيهوف ضد غافريلينا وميغيل',durText:'48:47'},
        {src:'7496860633630',title:'الحلقة 4: جورافليف وإفانتشينكو ضد فيدونكيف وكروس',durText:'50:21'}
      ]}]
    },
    'wr-wwe': {
      kind:'wrestling', name:'WWE — نزالات كاملة رسمية', cat:'رياضة قتالية', type:'youtube',
      playlist:'PLqIVmFaHA8Bo10epRPNq3N4FyeJ6IORVe',
      poster:'https://i.ytimg.com/vi/cb-1xvZB7AA/mqdefault.jpg',
      srcNote:'القائمة الرسمية لقناة WWE على يوتيوب (100 نزال) — فُحصت 8 نزالات فرديًا والتضمين مفعّل رسميًا',
      desc:'نزالات كاملة من القناة الرسمية لـ WWE — بعناوينها العربية الرسمية ومصغراتها الأصلية.',
      seasons:[{name:'نزالات كاملة',eps:[
        {src:'cb-1xvZB7AA',title:'كودي رودز وراندي أورتن ضد غونتر ولودفيغ كايزر — سماكداون',durText:'14:35'},
        {src:'VCTuK9bO1h4',title:'رومان رينز ضد روسيف — قفص الجحيم 2016',durText:'31:07'},
        {src:'TSpIAJrYHUI',title:'ري ميستيريو ضد لوغان بول — كراون جول 2023',durText:'25:48'},
        {src:'dtOgWxJR_b8',title:'شجار رولينز وريد في موقف السيارات — راو',durText:'7:19'},
        {src:'FIrP3QBvLTA',title:'Stephanie Vaquer vs. Tiffany Stratton — Crown Jewel 2025',durText:'21:12'},
        {src:'tkkB6vmb7xc',title:'رومان رينز ضد شينسكي ناكامورا — تكريم القوات 2021',durText:'9:54'},
        {src:'ROkVj9lb2Rc',title:'سيث رولينز ضد درو ماكنتاير — كراون جول',durText:'27:34'},
        {src:'nowVUKEe8T0',title:'رولينز ضد ستايلز — بطل ضد بيل 2019',durText:'12:44'}
      ]}]
    },
    'pl-nasakids': {
      kind:'kids', name:'المجموعة الشمسية للأطفال — ناسا', cat:'أطفال', type:'youtube',
      playlist:'PLiuUQ9asub3TDPzGOi_L2hYJGnYwWUAVU',
      poster:'https://i.ytimg.com/vi/Y2ijS8jY4F4/mqdefault.jpg',
      srcNote:'القائمة الرسمية لقناة NASA Video للأطفال (28 عنصرًا) — فُحصت 6 حلقات',
      desc:'سلسلة تعليمية ممتعة عن الفضاء من ناسا للأطفال — حلقات قصيرة بالعربية والإنجليزية.',
      seasons:[{name:'الحلقات',eps:[
        {src:'upCu4h0fsTo',title:'تقديم السلسلة',durText:'0:33'},
        {src:'Y2ijS8jY4F4',title:'ما هو النظام الشمسي؟',durText:'5:59'},
        {src:'hMMqbfQvU6w',title:'الشمس — نجم حقيقي',durText:'5:26'},
        {src:'CWuWoiHmXUs',title:'مدرسة الفضاء الموسيقية',durText:'5:42'},
        {src:'lQF3SfHK3j4',title:'ممّ تتكون الكويكبات؟ (عربي)',durText:'3:05'},
        {src:'o87QLo3gzmA',title:'الكويكبات مقابل المذنبات',durText:'4:58'}
      ]}]
    }
  }
};
