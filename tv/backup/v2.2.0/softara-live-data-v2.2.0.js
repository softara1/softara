/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v2.2.0 — بيانات صفحة البث المباشر (Softara Live TV)
   ★ هذه الصفحة للقنوات المباشرة فقط — الأفلام والمسلسلات في softara-media-data.js
   ★ لإضافة قناة: انسخ سطرًا في items وعدّل الحقول ثم ارفع نسخة جديدة (وسم جديد)
   المخطط: type = hls|mp4|youtube|dailymotion|okru · kind = channel
   التصنيفات (cat) تُشتق تلقائيًا من البيانات — أي تصنيف جديد يظهر فورًا
   كزر تصفية (مثل: رياضة، أخبار، عامة، ترفيهية، أطفال…)
   ════════════════════════════════════════════════════════════════ */
window.STV_LIVE_DATA={
  version:'2.2.0',
  updated:'2026-11-04',
  page:{
    title:'سوفتارا Live TV — قنوات البث المباشر',
    idleTitle:'سوفتارا <i>Live</i>',
    idleText:'قنوات تلفزيونية مباشرة تعمل الآن — اختر قناة من القائمة وابدأ المشاهدة فورًا',
    introWord:'سوفتارا <b>Live TV</b>',
    introSub:'قنوات البث المباشر · رياضة · أخبار · عامة',
    introKey:'stv_intro_done_live'
  },
  links:{
    forum:'https://softara.yoo7.com/',
    companion:'', /* رابط صفحة الأفلام والمكتبة في المنتدى — يُملأ بعد إنشاء الصفحة */
    report:''     /* رابط التقرير الفني — يُملأ بعد إنشائه */
  },
  news:[
    'مرحبًا بكم في سوفتارا Live TV — صفحة قنوات البث المباشر المتخصصة من سوفتارا',
    'المصادر: قنوات رسمية مباشرة (الجزيرة، العربية، سكاي نيوز عربية، DW، TRT، Red Bull TV)',
    'جودات تكيّفية تلقائية مع إمكانية الاختيار اليدوي حيثما تدعمها القناة (حتى 6 مستويات)',
    'تغيير القناة ينظّف المشغل السابق جذريًا: لا صوت خفي ولا بث قديم ولا مؤقتات معلقة',
    'لإضافة قناة: عدّل ملف البيانات softara-live-data.js على GitHub فقط — دون لمس أي كود آخر'
  ],
  items:[
    /* ── البث المباشر: 7 قنوات رسمية فُحصت حيّة (ماستر + child + segment) — منقولة حرفيًا من v2.1.2 ── */
    {id:'ch-aj', kind:'channel', name:'الجزيرة', cat:'أخبار', country:'قطر', type:'hls', src:'https://live-hls-web-aja.getaj.net/AJA/index.m3u8', hd:true, featured:true, levels:6, desc:'القناة الإخبارية الرئيسية — تصل إلى 6 جودات حسب التوافر (حتى 1080p)'},
    {id:'ch-alarabiya', kind:'channel', name:'العربية', cat:'أخبار', country:'السعودية', type:'hls', src:'https://av.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8', hd:true, levels:4, desc:'قناة العربية الإخبارية — تصل إلى 4 جودات حسب التوافر'},
    {id:'ch-sna', kind:'channel', name:'سكاي نيوز عربية', cat:'أخبار', country:'الإمارات', type:'hls', src:'https://stream.skynewsarabia.com/hls/sna.m3u8', hd:true, levels:5, desc:'القناة الإخبارية الإماراتية — تصل إلى 5 جودات حسب التوافر'},
    {id:'ch-dw', kind:'channel', name:'DW عربية', cat:'أخبار', country:'ألمانيا', type:'hls', src:'https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8', hd:true, levels:5, desc:'DW بالعربية — تصل إلى 5 جودات حسب التوافر'},
    {id:'ch-dw-en', kind:'channel', name:'DW English', cat:'أخبار', country:'ألمانيا', type:'hls', src:'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8', hd:true, levels:5, desc:'DW بالإنجليزية — مع ترجمة إنجليزية مدمجة عند توافرها في البث — بديل مفحوص عن فرانس24'},
    {id:'ch-trt', kind:'channel', name:'TRT عربي', cat:'عامة', country:'تركيا', type:'hls', src:'https://tv-trtarabi.medya.trt.com.tr/master.m3u8', hd:true, levels:5, desc:'برامج متنوعة وثقافية — حتى 1440p'},
    {id:'ch-rbtv', kind:'channel', name:'Red Bull TV', cat:'رياضة', country:'النمسا', type:'hls', src:'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8', hd:true, levels:6, desc:'رياضات وأحداث عالمية — تصل إلى 6 جودات مع ترجمة CC عند توافرها'}
  ]
};
