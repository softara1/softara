
/* ============================================================
   Softara Image Center — Application Script
   Developer: Awad Al-Sudani (almoatn.blogspot.com) — © Softara 2025
   بنية معيارية: i18n → تخزين وترحيل → خدمات رفع → واجهات → محرر
============================================================ */
"use strict";

/* ---------- 0) أيقونات SVG مدمجة (بديل الرموز التعبيرية غير المدعومة) ---------- */
const IC={
  upload:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>',
  folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
  x:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  gear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
  copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  link:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  checkSq:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>',
  pen:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  images:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
  plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  cal:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
  clock:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  retry:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
  share:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>',
  ext:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  sliders:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>',
  cloud:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/></svg>',
  link2:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  imgPlus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
  shield:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
  warn:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  grip:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>',
  up:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>',
  down:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  back:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  transfer:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m17 3 4 4-4 4"/><path d="M21 7H9"/><path d="m7 21-4-4 4-4"/><path d="M3 17h12"/></svg>',
  undo:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>',
  redo:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>',
  flipH:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"/><path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><path d="M12 20V4"/></svg>',
  flipV:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v3"/><path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M4 12h16"/></svg>',
  sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>',
  download:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  reset:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
  crop:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>'
};

/* ---------- 0ب) الهوية القابلة للتخصيص (White-Label Branding) ----------
   القيم أدناه null = استخدام الاسم الافتراضي المترجم لكل لغة (هوية سوفتارا الحالية).
   لتغيير الهوية مستقبلًا دون تعديل هذا الملف: عرّف في صفحة المنتدى (الصفحة المشغِّلة):
   window.SoftaraBranding={appName:"…",tagline:"…",welcomeTitle:"…",homeUrl:"…",
   brandLinkTitle:"…",devName:"…",devUrl:"…",footerText:"…",logoSvg:"<svg …>",defaultTheme:"teal"} */
const BRAND=(function(d){
  const c=(typeof window!=="undefined"&&window.SoftaraBranding)||{};
  Object.keys(d).forEach(k=>{if(c[k]!==undefined&&c[k]!==null&&c[k]!=="")d[k]=c[k]});
  return d;
})({appName:null,tagline:null,welcomeTitle:null,homeUrl:null,brandLinkTitle:null,devName:null,devUrl:null,footerText:null,logoSvg:null,defaultTheme:null});

/* ---------- 1) الترجمة — عشر لغات مدمجة بالكامل (v2.1) ---------- */
const I18N = {
  ar: {
    appName:"مركز سوفتارا لرفع الصور",
    close:"إغلاق",saveFail:"تعذر الحفظ في متصفحك — تحقق من مساحة التخزين ثم أعد المحاولة",
    tagline:"ارفع · حرّر · نظّم · شارك",
    tabUpload:"الرفع",
    tabAlbums:"صوري",
    tabEditor:"المحرر",
    tabHistory:"السجل",
    themeBtn:"الثيمات",
    langBtn:"اللغة",
    dev:"المطور",
    themeHint:"يُحفظ اختيارك تلقائيًا لهذا المتصفح",
    welcomeTitle:"مرحباً بك في مركز سوفتارا",
    welcomeBody:"مرحباً بك… أهلاً بك حبيبنا الكريم في مركز سوفتارا لمشاركة وتخزين الصور. تذكر أن الله يراك عند رفع صورك، فلا تكن بها مخالفة لأمر الله.",
    welcomeNoticeTitle:"شرطنا الوحيد",
    welcomeNotice:"أهلاً بك زائرنا الكريم، شرطنا الوحيد عدم تحميل الصور التي تخالف تعاليم ديننا الحنيف.",
    themeBlueviolet:"أزرق بنفسجي",
    themeTeal:"فيروزي",
    themeLight:"فاتح",
    themeDark:"داكن",
    themeBlue:"أزرق",
    themePurple:"بنفسجي",
    themeGreen:"أخضر",
    themeNeutral:"هادئ",
    darkMode:"الوضع الداكن",
    lightMode:"الوضع الفاتح",
    resetTheme:"استعادة الثيم الافتراضي",
    langMenu:"اختيار اللغة",
    langHint:"تُحفظ لغتك تلقائيًا لهذا المتصفح",
    forumLinkTitle:"زيارة منتدى سوفتارا (يفتح في تبويب جديد)",
    chooseService:"اختر خدمة الرفع",
    uploadFromDevice:"من جهازك",
    uploadFromUrls:"من الروابط",
    dropTitle:"اسحب وأفلت الصور هنا",
    dropSub:"أو انقر للاختيار من جهازك — يمكنك أيضًا اللصق بـ Ctrl+V",
    browse:"تصفح الملفات",
    queueTitle:"قائمة الانتظار",
    selected:"محدد",
    filesWord:"ملف",
    totalSize:"الحجم الإجمالي",
    limitWarn:"تنبيه: الحجم الإجمالي يتجاوز حد خدمة {service} ({limit}) — سيُرفض التجاوز عند الرفع",
    clearQueue:"تفريغ القائمة",
    startUpload:"رفع الصور",
    uploading:"جارٍ الرفع…",
    fetchingUploading:"جارٍ جلب الصورة ورفعها إلى الخدمة…",
    uploadDone:"اكتمل الرفع بنجاح",
    someFailed:"فشل رفع بعض الصور",
    retry:"إعادة محاولة الفاشل",
    cancelUpload:"إلغاء الرفع",
    remove:"إزالة",
    moveUp:"تحريك لأعلى",
    moveDown:"تحريك لأسفل",
    pending:"قيد الانتظار",
    stUp:"جارٍ الرفع",
    stDone:"اكتمل",
    stErr:"فشل",
    stCancel:"ملغى",
    totalProgress:"التقدم الإجمالي",
    saveTo:"حفظ في ألبوم",
    generalAlbum:"ألبوم عام",
    newAlbumPh:"ألبوم جديد…",
    newAlbumName:"اسم الألبوم الجديد",
    yourLinks:"روابط الصور المرفوعة",
    copyAll:"نسخ كل الروابط",
    recentLinks:"روابط آخر عملية رفع",
    linkFormats:"صيغة الروابط",
    moreOptions:"خيارات إضافية",
    uploadActions:"إجراءات الرفع",
    pasteAdded:"أُضيفت {n} صورة من الحافظة",
    savedSpace:"وفّرت {pct}% من الحجم",
    originalSize:"الأصلي",
    urlsTitle:"رفع الصور من الروابط",
    urlsHint:"ضع رابط صورة واحد في كل سطر — يمكنك إضافة عشرات الروابط دفعة واحدة",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"إضافة الروابط ومعاينتها",
    urlsValidating:"جارٍ التحقق من الروابط…",
    urlInvalid:"رابط غير صالح (يجب أن يبدأ بـ http أو https)",
    urlUnreachable:"تعذر تحميل الصورة — قد يكون الرابط معطوبًا أو يمنع الوصول أو ليس صورة",
    urlOk:"صورة صالحة",
    urlNotImage:"الرابط ليس صورة",
    urlsClear:"تفريغ الروابط",
    urlQueueTitle:"طابور روابط الصور",
    urlUploadBtn:"رفع الصور المقبولة",
    urlNoValid:"لا توجد روابط صور صالحة للرفع",
    urlAdded:"أُضيف {n} رابط للمعاينة",
    urlsDuplicate:"رابط مكرر — تم تجاهله",
    errNoService:"يرجى اختيار خدمة الرفع",
    errNotImage:"ملف غير مدعوم (ليس صورة)",
    errLarge:"حجم الملف يتجاوز الحد المسموح للخدمة",
    errType:"نوع الصورة غير مدعوم من هذه الخدمة",
    errEmpty:"قائمة الرفع فارغة",
    errDup:"عملية رفع جارية بالفعل",
    errNet:"خطأ في الشبكة — تحقق من اتصالك",
    errSrv:"فشل الرفع من الخادم",
    copied:"تم النسخ",
    copyFail:"تعذر النسخ — انسخ يدويًا",
    direct:"الرابط المباشر",
    html:"كود HTML",
    bbcode:"كود المنتديات BBCode",
    markdown:"كود Markdown",
    albumsTitle:"ألبومات الصور الخاصة بي",
    albumsEmpty:"لا توجد ألبومات بعد — ارفع صورتك الأولى",
    imagesWord:"صورة",
    createAlbum:"إنشاء ألبوم",
    rename:"إعادة تسمية",
    delAlbum:"حذف الألبوم",
    selAll:"تحديد الكل",
    deselAll:"إلغاء التحديد",
    dlSel:"حفظ المحدد",
    dlAll:"حفظ الجميع",
    delSel:"حذف المحدد",
    confirmDelSel:"سيُحذف الاختيار من واجهة الألبوم فقط ولن تُحذف الصور من خدمة الاستضافة الخارجية. متابعة؟",
    transfer:"نقل إلى ألبوم",
    transferTitle:"نقل الصور المحددة",
    transferTo:"إلى الألبوم",
    transferGo:"نقل",
    sortByDate:"الأحدث أولًا",
    sortByName:"حسب الاسم",
    images:"صور",
    backAlbums:"العودة إلى الألبومات",
    backHome:"الرئيسية",
    noImages:"لا توجد صور في هذا الألبوم",
    confirmTitle:"تأكيد الحذف",
    confirmDelAlbum:"سيتم حذف الألبوم وصوره من واجهة المركز فقط. هل أنت متأكد؟",
    confirmDelImages:"سيتم حذف الصور المحددة من واجهة المركز فقط (لن تُحذف من خدمة الاستضافة). متابعة؟",
    confirm:"تأكيد",
    cancel:"إلغاء",
    del:"حذف",
    hostedOn:"مستضافة على",
    uploadedOn:"رُفعت في",
    service:"الخدمة",
    dimensions:"الأبعاد",
    size:"الحجم",
    prev:"السابقة",
    next:"التالية",
    open:"فتح الرابط المباشر",
    share:"مشاركة",
    download:"تنزيل",
    editIn:"تحرير في المحرر",
    shareVia:"مشاركة عبر",
    whatsapp:"واتساب",
    telegram:"تيليجرام",
    x:"إكس",
    nativeShare:"مشاركة النظام",
    edTitle:"محرر الصور",
    edOpen:"اختر صورة للتحرير",
    edHint:"اسحب صورة هنا أو انقر للاختيار — لا يتم التعديل على الملف الأصلي أبدًا",
    fromAlbum:"فتح صورة من الألبومات",
    crop:"قص",
    cropApply:"تطبيق القص",
    cropCancel:"إلغاء القص",
    rotL:"تدوير يسارًا",
    rotR:"تدوير يمينًا",
    flipH:"قلب أفقي",
    flipV:"قلب عمودي",
    resize:"تغيير الحجم",
    resizeW:"العرض (بكسل)",
    brightness:"السطوع",
    contrast:"التباين",
    saturation:"التشبع",
    temperature:"الحرارة اللونية",
    exposure:"التعرض",
    grayscale:"تدرج الرمادي",
    opacity:"الشفافية",
    sharpness:"الحدة",
    blur:"تنعيم",
    filters:"الفلاتر",
    undo:"تراجع",
    redo:"إعادة",
    reset:"إعادة تعيين",
    dlEdited:"تنزيل النسخة المعدلة",
    upEdited:"رفع النسخة المعدلة",
    origSafe:"الملف الأصلي محفوظ دون أي تعديل",
    exifNote:"تُقرأ صور الهاتف بالاتجاه الصحيح تلقائيًا (EXIF)",
    fmt:"الصيغة",
    keep:"كما هي",
    historyTitle:"سجل عمليات الرفع",
    historyEmpty:"لا توجد عمليات رفع مسجلة بعد",
    historyClear:"تفريغ السجل",
    historyNote:"السجل محفوظ في متصفحك فقط ولا يُرسل لأي جهة",
    clearHistoryWarn:"سيُفرغ سجل الرفع بالكامل (الصور المرفوعة نفسها لن تتأثر). متابعة؟",
    settings:"إعدادات الرفع",
    stripExif:"إزالة بيانات EXIF (الخصوصية)",
    stripExifHint:"تُحذف بيانات الكاميرا والموقع — يعيد الرفع ترميز الصورة",
    compress:"ضغط قبل الرفع",
    quality:"الجودة",
    rememberService:"تذكر آخر خدمة استخدمتها",
    exportData:"تصدير نسخة احتياطية",
    importData:"استيراد نسخة احتياطية",
    exportDone:"تم تنزيل النسخة الاحتياطية",
    importDone:"تم استيراد البيانات ودمجها دون فقدان أي رابط",
    importFail:"ملف غير صالح — تعذر الاستيراد",
    importConfirm:"سيتم دمج الألبومات والروابط الموجودة في الملف مع بياناتك الحالية، دون حذف أي شيء. متابعة؟",
    fRights:"جميع الحقوق محفوظة © 2025 | المطور عوض السوداني",
    fLove:"تم التطوير بكل حب بواسطة عوض السوداني",
    fNoSteal:"ممنوع نقل أو نسب الكود للغير دون ذكر المطور عوض السوداني وموقعه almoatn.blogspot.com",
    svcServimgN:"رفع مباشر داخل الصفحة عبر خدمة أحلى منتدى (حتى 2MB)",
    svcImgurN:"سريع ومجاني (حتى 20MB)",
    svcImgbbN:"مجاني مع صور مصغرة (حتى 32MB)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"تعذر فتح الصورة — قد تكون تالفة أو بصيغة غير مدعومة",
    cropApplied:"تم تطبيق القص",
    exportFail:"تعذر تجهيز الصورة للتنزيل",
    dlDone:"تم تنزيل النسخة المعدلة — الملف الأصلي محفوظ كما هو",
    zipMaking:"جارٍ تجهيز الملف المضغوط…",
    zipDone:"تم تنزيل {n} صورة في ملف مضغوط",
    zipFail:"تعذر إنشاء الملف المضغوط",
    editingLoad:"جارٍ تحميل الصورة إلى المحرر…",
    editorOpened:"تم فتح الصورة في المحرر",
    editFetchFail:"تعذر جلب الصورة للتحرير (قيود الشبكة)",
    sortByAria:"ترتيب الصور",
    delFromUI:"حُذفت الصورة من واجهة الألبوم",
    transferDone:"تم نقل الصور بنجاح",
    albumCreated:"تم إنشاء ألبوم «{name}»",
    noSelectionYet:"— لم تحدد أي صورة بعد —",
    selLinks:"روابط الصور المحددة",
    allLinks:"روابط جميع صور الألبوم",
    copy:"نسخ",
    chooseTargetAlbum:"اختر الألبوم الهدف",
    selectedImagesCount:"عدد الصور المحددة: {n}",
    another:"صورة أخرى",
    fine:"الضبط الدقيق",
    uploadSvc:"خدمة رفع النسخة المعدلة",
    dlFmt:"صيغة التنزيل",
    enterName:"أدخل اسم الألبوم",
    exists:"الاسم موجود مسبقًا",
    pasteN:n=>"أُضيفت "+n+" صورة من الحافظة"
  },
  en: {
    appName:"Softara Image Center",
    close:"Close",saveFail:"Could not save in your browser — check storage space and try again",
    tagline:"Upload · Edit · Organize · Share",
    tabUpload:"Upload",
    tabAlbums:"My Photos",
    tabEditor:"Editor",
    tabHistory:"History",
    themeBtn:"Themes",
    langBtn:"Language",
    dev:"Developer",
    themeHint:"Your choice is saved automatically for this browser",
    welcomeTitle:"Welcome to Softara Image Center",
    welcomeBody:"Welcome… dear friend, welcome to the Softara Image Center for sharing and storing images. Remember that God sees you when you upload your images, so do not use them in disobedience to God.",
    welcomeNoticeTitle:"Our only condition",
    welcomeNotice:"Welcome, dear visitor. Our only condition is that you do not upload images that contradict the teachings of our true religion.",
    themeBlueviolet:"Blue Violet",
    themeTeal:"Teal",
    themeLight:"Light",
    themeDark:"Dark",
    themeBlue:"Blue",
    themePurple:"Purple",
    themeGreen:"Green",
    themeNeutral:"Neutral",
    darkMode:"Dark mode",
    lightMode:"Light mode",
    resetTheme:"Restore default theme",
    langMenu:"Choose language",
    langHint:"Your language is saved automatically for this browser",
    forumLinkTitle:"Visit Softara Forum (opens in a new tab)",
    chooseService:"Choose upload service",
    uploadFromDevice:"From device",
    uploadFromUrls:"From URLs",
    dropTitle:"Drag & drop images here",
    dropSub:"or click to browse — you can also paste with Ctrl+V",
    browse:"Browse files",
    queueTitle:"Upload queue",
    selected:"selected",
    filesWord:"files",
    totalSize:"Total size",
    limitWarn:"Warning: total size exceeds the {service} limit ({limit}) — oversized files will be rejected",
    clearQueue:"Clear queue",
    startUpload:"Upload images",
    uploading:"Uploading…",
    fetchingUploading:"Fetching the image and uploading to the service…",
    uploadDone:"Upload completed successfully",
    someFailed:"Some images failed to upload",
    retry:"Retry failed",
    cancelUpload:"Cancel upload",
    remove:"Remove",
    moveUp:"Move up",
    moveDown:"Move down",
    pending:"Pending",
    stUp:"Uploading",
    stDone:"Done",
    stErr:"Failed",
    stCancel:"Canceled",
    totalProgress:"Total progress",
    saveTo:"Save to album",
    generalAlbum:"General Album",
    newAlbumPh:"New album…",
    newAlbumName:"New album name",
    yourLinks:"Uploaded image links",
    copyAll:"Copy all links",
    recentLinks:"Last upload links",
    linkFormats:"Link format",
    moreOptions:"More options",
    uploadActions:"Upload actions",
    pasteAdded:"{n} image(s) added from clipboard",
    savedSpace:"You saved {pct}% of the size",
    originalSize:"Original",
    urlsTitle:"Upload images from URLs",
    urlsHint:"Put one image URL per line — you can add dozens of links at once",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"Add links & preview",
    urlsValidating:"Validating links…",
    urlInvalid:"Invalid link (must start with http or https)",
    urlUnreachable:"Could not load the image — the link may be broken, blocked, or not an image",
    urlOk:"Valid image",
    urlNotImage:"The link is not an image",
    urlsClear:"Clear links",
    urlQueueTitle:"Image URL queue",
    urlUploadBtn:"Upload accepted images",
    urlNoValid:"No valid image links to upload",
    urlAdded:"{n} link(s) added for preview",
    urlsDuplicate:"Duplicate link — ignored",
    errNoService:"Please choose an upload service",
    errNotImage:"Unsupported file (not an image)",
    errLarge:"File size exceeds the service limit",
    errType:"Image type not supported by this service",
    errEmpty:"Upload queue is empty",
    errDup:"An upload is already in progress",
    errNet:"Network error — check your connection",
    errSrv:"Server upload failed",
    copied:"Copied",
    copyFail:"Copy failed — copy manually",
    direct:"Direct link",
    html:"HTML code",
    bbcode:"BBCode",
    markdown:"Markdown",
    albumsTitle:"My photo albums",
    albumsEmpty:"No albums yet — upload your first image",
    imagesWord:"images",
    createAlbum:"Create album",
    rename:"Rename",
    delAlbum:"Delete album",
    selAll:"Select all",
    deselAll:"Deselect all",
    dlSel:"Download selected",
    dlAll:"Download all",
    delSel:"Delete selected",
    confirmDelSel:"This only removes the selection from the center's interface; hosted images are NOT deleted from the hosting service. Continue?",
    transfer:"Transfer to album",
    transferTitle:"Transfer selected images",
    transferTo:"To album",
    transferGo:"Transfer",
    sortByDate:"Newest first",
    sortByName:"By name",
    images:"images",
    backAlbums:"Back to albums",
    backHome:"Home",
    noImages:"No images in this album",
    confirmTitle:"Confirm deletion",
    confirmDelAlbum:"The album and its images will be removed from the center's interface only. Are you sure?",
    confirmDelImages:"Selected images will be removed from the center's interface only (not from the hosting service). Continue?",
    confirm:"Confirm",
    cancel:"Cancel",
    del:"Delete",
    hostedOn:"Hosted on",
    uploadedOn:"Uploaded on",
    service:"Service",
    dimensions:"Dimensions",
    size:"Size",
    prev:"Previous",
    next:"Next",
    open:"Open direct link",
    share:"Share",
    download:"Download",
    editIn:"Edit in editor",
    shareVia:"Share via",
    whatsapp:"WhatsApp",
    telegram:"Telegram",
    x:"X",
    nativeShare:"System share",
    edTitle:"Image Editor",
    edOpen:"Choose an image to edit",
    edHint:"Drag an image here or click to browse — the original file is never modified",
    fromAlbum:"Open image from albums",
    crop:"Crop",
    cropApply:"Apply crop",
    cropCancel:"Cancel crop",
    rotL:"Rotate left",
    rotR:"Rotate right",
    flipH:"Flip horizontal",
    flipV:"Flip vertical",
    resize:"Resize",
    resizeW:"Width (px)",
    brightness:"Brightness",
    contrast:"Contrast",
    saturation:"Saturation",
    temperature:"Temperature",
    exposure:"Exposure",
    grayscale:"Grayscale",
    opacity:"Opacity",
    sharpness:"Sharpness",
    blur:"Blur",
    filters:"Filters",
    undo:"Undo",
    redo:"Redo",
    reset:"Reset",
    dlEdited:"Download edited copy",
    upEdited:"Upload edited copy",
    origSafe:"The original file is kept untouched",
    exifNote:"Phone photos are auto-oriented correctly (EXIF)",
    fmt:"Format",
    keep:"Keep original",
    historyTitle:"Upload history",
    historyEmpty:"No uploads recorded yet",
    historyClear:"Clear history",
    historyNote:"History is stored in your browser only and is never sent anywhere",
    clearHistoryWarn:"The entire upload history will be cleared (the uploaded images themselves are not affected). Continue?",
    settings:"Upload settings",
    stripExif:"Strip EXIF data (privacy)",
    stripExifHint:"Removes camera/location metadata — image is re-encoded",
    compress:"Compress before upload",
    quality:"Quality",
    rememberService:"Remember my last used service",
    exportData:"Export backup",
    importData:"Import backup",
    exportDone:"Backup file downloaded",
    importDone:"Data imported and merged — no link was lost",
    importFail:"Invalid file — import failed",
    importConfirm:"The albums and links in the file will be merged with your current data without deleting anything. Continue?",
    fRights:"All rights reserved © 2025 | Developer: Awad Al-Sudani",
    fLove:"Crafted with love by Awad Al-Sudani",
    fNoSteal:"Do not copy or re-attribute this code without crediting Awad Al-Sudani (almoatn.blogspot.com)",
    svcServimgN:"In-page upload via Forumotion service (up to 2MB)",
    svcImgurN:"Fast & free (up to 20MB)",
    svcImgbbN:"Free with thumbnails (up to 32MB)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"Could not open the image — it may be corrupted or in an unsupported format",
    cropApplied:"Crop applied",
    exportFail:"Could not prepare the image for download",
    dlDone:"Edited copy downloaded — the original file is untouched",
    zipMaking:"Preparing ZIP…",
    zipDone:"{n} images downloaded as ZIP",
    zipFail:"Could not create the ZIP file",
    editingLoad:"Loading image into editor…",
    editorOpened:"Image opened in the editor",
    editFetchFail:"Could not fetch the image for editing (network restrictions)",
    sortByAria:"Sort images",
    delFromUI:"Image removed from the album interface",
    transferDone:"Images transferred successfully",
    albumCreated:"Album \"{name}\" created",
    noSelectionYet:"— no images selected yet —",
    selLinks:"Selected image links",
    allLinks:"All album image links",
    copy:"Copy",
    chooseTargetAlbum:"Choose the target album",
    selectedImagesCount:"Selected images: {n}",
    another:"Another image",
    fine:"Fine tuning",
    uploadSvc:"Upload service",
    dlFmt:"Download format",
    enterName:"Enter album name",
    exists:"Name already exists",
    pasteN:n=>""+n+" image(s) added from clipboard"
  },
  fr: {
    appName:"Centre d'images Softara",
    close:"Fermer",saveFail:"Impossible d'enregistrer dans votre navigateur — vérifiez l'espace de stockage puis réessayez",
    tagline:"Télécharger · Modifier · Organiser · Partager",
    tabUpload:"Téléversement",
    tabAlbums:"Mes photos",
    tabEditor:"Éditeur",
    tabHistory:"Historique",
    themeBtn:"Thèmes",
    langBtn:"Langue",
    dev:"Développeur",
    themeHint:"Votre choix est enregistré automatiquement pour ce navigateur",
    welcomeTitle:"Bienvenue au Centre d'images Softara",
    welcomeBody:"Bienvenue… cher ami, bienvenue au Centre d'images Softara pour partager et stocker vos images. Souvenez-vous que Dieu vous voit lorsque vous téléversez vos images, ne les utilisez donc pas en désobéissance à Dieu.",
    welcomeNoticeTitle:"Notre seule condition",
    welcomeNotice:"Bienvenue, cher visiteur. Notre seule condition : ne pas téléverser d'images contraires aux enseignements de notre noble religion.",
    themeBlueviolet:"Bleu violet",
    themeTeal:"Sarcelle",
    themeLight:"Clair",
    themeDark:"Sombre",
    themeBlue:"Bleu",
    themePurple:"Violet",
    themeGreen:"Vert",
    themeNeutral:"Neutre",
    darkMode:"Mode sombre",
    lightMode:"Mode clair",
    resetTheme:"Restaurer le thème par défaut",
    langMenu:"Choisir la langue",
    langHint:"Votre langue est enregistrée automatiquement pour ce navigateur",
    forumLinkTitle:"Visiter le forum Softara (ouvre dans un nouvel onglet)",
    chooseService:"Choisir le service d'hébergement",
    uploadFromDevice:"Depuis l'appareil",
    uploadFromUrls:"Depuis des liens",
    dropTitle:"Glissez-déposez les images ici",
    dropSub:"ou cliquez pour parcourir — vous pouvez aussi coller avec Ctrl+V",
    browse:"Parcourir les fichiers",
    queueTitle:"File d'attente",
    selected:"sélectionné(s)",
    filesWord:"fichier(s)",
    totalSize:"Taille totale",
    limitWarn:"Attention : la taille totale dépasse la limite de {service} ({limit}) — les fichiers trop volumineux seront refusés",
    clearQueue:"Vider la file",
    startUpload:"Téléverser les images",
    uploading:"Téléversement en cours…",
    fetchingUploading:"Récupération de l'image et téléversement vers le service…",
    uploadDone:"Téléversement terminé avec succès",
    someFailed:"Échec du téléversement de certaines images",
    retry:"Réessayer les échecs",
    cancelUpload:"Annuler le téléversement",
    remove:"Retirer",
    moveUp:"Monter",
    moveDown:"Descendre",
    pending:"En attente",
    stUp:"En cours",
    stDone:"Terminé",
    stErr:"Échoué",
    stCancel:"Annulé",
    totalProgress:"Progression globale",
    saveTo:"Enregistrer dans un album",
    generalAlbum:"Album général",
    newAlbumPh:"Nouvel album…",
    newAlbumName:"Nom du nouvel album",
    yourLinks:"Liens des images téléversées",
    copyAll:"Copier tous les liens",
    recentLinks:"Liens du dernier téléversement",
    linkFormats:"Format des liens",
    moreOptions:"Plus d'options",
    uploadActions:"Actions de téléversement",
    pasteAdded:"{n} image(s) ajoutée(s) depuis le presse-papiers",
    savedSpace:"Vous avez économisé {pct}% de la taille",
    originalSize:"Original",
    urlsTitle:"Téléverser des images depuis des liens",
    urlsHint:"Mettez un lien d'image par ligne — vous pouvez ajouter des dizaines de liens à la fois",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"Ajouter les liens et prévisualiser",
    urlsValidating:"Vérification des liens…",
    urlInvalid:"Lien invalide (doit commencer par http ou https)",
    urlUnreachable:"Impossible de charger l'image — le lien est peut-être rompu, bloqué ou n'est pas une image",
    urlOk:"Image valide",
    urlNotImage:"Le lien n'est pas une image",
    urlsClear:"Vider les liens",
    urlQueueTitle:"File des liens d'images",
    urlUploadBtn:"Téléverser les images acceptées",
    urlNoValid:"Aucun lien d'image valide à téléverser",
    urlAdded:"{n} lien(s) ajouté(s) pour prévisualisation",
    urlsDuplicate:"Lien en double — ignoré",
    errNoService:"Veuillez choisir un service d'hébergement",
    errNotImage:"Fichier non pris en charge (pas une image)",
    errLarge:"La taille du fichier dépasse la limite du service",
    errType:"Type d'image non pris en charge par ce service",
    errEmpty:"La file d'attente est vide",
    errDup:"Un téléversement est déjà en cours",
    errNet:"Erreur réseau — vérifiez votre connexion",
    errSrv:"Échec du téléversement depuis le serveur",
    copied:"Copié",
    copyFail:"Copie impossible — copiez manuellement",
    direct:"Lien direct",
    html:"Code HTML",
    bbcode:"BBCode",
    markdown:"Markdown",
    albumsTitle:"Mes albums photos",
    albumsEmpty:"Aucun album — téléversez votre première image",
    imagesWord:"images",
    createAlbum:"Créer un album",
    rename:"Renommer",
    delAlbum:"Supprimer l'album",
    selAll:"Tout sélectionner",
    deselAll:"Tout désélectionner",
    dlSel:"Télécharger la sélection",
    dlAll:"Tout télécharger",
    delSel:"Supprimer la sélection",
    confirmDelSel:"La sélection sera retirée de l'interface du centre uniquement ; les images hébergées ne sont PAS supprimées du service. Continuer ?",
    transfer:"Déplacer vers un album",
    transferTitle:"Déplacer les images sélectionnées",
    transferTo:"Vers l'album",
    transferGo:"Déplacer",
    sortByDate:"Plus récentes d'abord",
    sortByName:"Par nom",
    images:"images",
    backAlbums:"Retour aux albums",
    backHome:"Accueil",
    noImages:"Aucune image dans cet album",
    confirmTitle:"Confirmer la suppression",
    confirmDelAlbum:"L'album et ses images seront retirés de l'interface du centre uniquement. Êtes-vous sûr ?",
    confirmDelImages:"Les images sélectionnées seront retirées de l'interface du centre uniquement (pas du service d'hébergement). Continuer ?",
    confirm:"Confirmer",
    cancel:"Annuler",
    del:"Supprimer",
    hostedOn:"Hébergée sur",
    uploadedOn:"Téléversée le",
    service:"Service",
    dimensions:"Dimensions",
    size:"Taille",
    prev:"Précédente",
    next:"Suivante",
    open:"Ouvrir le lien direct",
    share:"Partager",
    download:"Télécharger",
    editIn:"Modifier dans l'éditeur",
    shareVia:"Partager via",
    whatsapp:"WhatsApp",
    telegram:"Telegram",
    x:"X",
    nativeShare:"Partage système",
    edTitle:"Éditeur d'images",
    edOpen:"Choisissez une image à modifier",
    edHint:"Glissez une image ici ou cliquez — le fichier original n'est jamais modifié",
    fromAlbum:"Ouvrir une image depuis les albums",
    crop:"Rogner",
    cropApply:"Appliquer le recadrage",
    cropCancel:"Annuler le recadrage",
    rotL:"Pivoter à gauche",
    rotR:"Pivoter à droite",
    flipH:"Miroir horizontal",
    flipV:"Miroir vertical",
    resize:"Redimensionner",
    resizeW:"Largeur (px)",
    brightness:"Luminosité",
    contrast:"Contraste",
    saturation:"Saturation",
    temperature:"Température",
    exposure:"Exposition",
    grayscale:"Niveaux de gris",
    opacity:"Opacité",
    sharpness:"Netteté",
    blur:"Flou",
    filters:"Filtres",
    undo:"Annuler",
    redo:"Rétablir",
    reset:"Réinitialiser",
    dlEdited:"Télécharger la copie modifiée",
    upEdited:"Téléverser la copie modifiée",
    origSafe:"Le fichier original reste intact",
    exifNote:"Les photos de téléphone sont automatiquement orientées (EXIF)",
    fmt:"Format",
    keep:"Conserver l'original",
    historyTitle:"Historique des téléversements",
    historyEmpty:"Aucun téléversement enregistré",
    historyClear:"Vider l'historique",
    historyNote:"L'historique est stocké uniquement dans votre navigateur",
    clearHistoryWarn:"Tout l'historique des téléversements sera vidé (les images elles-mêmes ne sont pas affectées). Continuer ?",
    settings:"Paramètres de téléversement",
    stripExif:"Supprimer les données EXIF (confidentialité)",
    stripExifHint:"Supprime les métadonnées appareil/localisation — l'image est ré-encodée",
    compress:"Compresser avant le téléversement",
    quality:"Qualité",
    rememberService:"Mémoriser mon dernier service utilisé",
    exportData:"Exporter une sauvegarde",
    importData:"Importer une sauvegarde",
    exportDone:"Fichier de sauvegarde téléchargé",
    importDone:"Données importées et fusionnées — aucun lien perdu",
    importFail:"Fichier invalide — import impossible",
    importConfirm:"Les albums et liens du fichier seront fusionnés avec vos données actuelles, sans rien supprimer. Continuer ?",
    fRights:"Tous droits réservés © 2025 | Développeur : Awad Al-Sudani",
    fLove:"Réalisé avec amour par Awad Al-Sudani",
    fNoSteal:"Ne copiez pas ou ne réattribuez pas ce code sans créditer Awad Al-Sudani (almoatn.blogspot.com)",
    svcServimgN:"Téléversement intégré via le service Forumotion (jusqu'à 2 Mo)",
    svcImgurN:"Rapide et gratuit (jusqu'à 20 Mo)",
    svcImgbbN:"Gratuit avec miniatures (jusqu'à 32 Mo)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"Impossible d'ouvrir l'image — elle est peut-être corrompue ou dans un format non pris en charge",
    cropApplied:"Recadrage appliqué",
    exportFail:"Impossible de préparer l'image au téléchargement",
    dlDone:"Copie modifiée téléchargée — le fichier original est intact",
    zipMaking:"Préparation du ZIP…",
    zipDone:"{n} images téléchargées en ZIP",
    zipFail:"Impossible de créer le fichier ZIP",
    editingLoad:"Chargement de l'image dans l'éditeur…",
    editorOpened:"Image ouverte dans l'éditeur",
    editFetchFail:"Impossible de récupérer l'image pour modification (restrictions réseau)",
    sortByAria:"Trier les images",
    delFromUI:"Image retirée de l'interface de l'album",
    transferDone:"Images déplacées avec succès",
    albumCreated:"Album « {name} » créé",
    noSelectionYet:"— aucune image sélectionnée —",
    selLinks:"Liens des images sélectionnées",
    allLinks:"Liens de toutes les images de l'album",
    copy:"Copier",
    chooseTargetAlbum:"Choisir l'album de destination",
    selectedImagesCount:"Images sélectionnées : {n}",
    another:"Autre image",
    fine:"Réglages fins",
    uploadSvc:"Service de téléversement",
    dlFmt:"Format de téléchargement",
    enterName:"Entrez le nom de l'album",
    exists:"Ce nom existe déjà",
    pasteN:n=>""+n+" image(s) ajoutée(s) depuis le presse-papiers"
  },
  es: {
    appName:"Centro de Imágenes Softara",
    close:"Cerrar",saveFail:"No se pudo guardar en tu navegador — comprueba el espacio de almacenamiento e inténtalo de nuevo",
    tagline:"Subir · Editar · Organizar · Compartir",
    tabUpload:"Subir",
    tabAlbums:"Mis fotos",
    tabEditor:"Editor",
    tabHistory:"Historial",
    themeBtn:"Temas",
    langBtn:"Idioma",
    dev:"Desarrollador",
    themeHint:"Tu elección se guarda automáticamente en este navegador",
    welcomeTitle:"Bienvenido al Centro de Imágenes Softara",
    welcomeBody:"Bienvenido… querido amigo, bienvenido al Centro de Imágenes Softara para compartir y almacenar imágenes. Recuerda que Dios te ve cuando subes tus imágenes, así que no las uses en desobediencia a Dios.",
    welcomeNoticeTitle:"Nuestra única condición",
    welcomeNotice:"Bienvenido, estimado visitante. Nuestra única condición: no subir imágenes que contradigan las enseñanzas de nuestra verdadera religión.",
    themeBlueviolet:"Azul violeta",
    themeTeal:"Verde azulado",
    themeLight:"Claro",
    themeDark:"Oscuro",
    themeBlue:"Azul",
    themePurple:"Morado",
    themeGreen:"Verde",
    themeNeutral:"Neutro",
    darkMode:"Modo oscuro",
    lightMode:"Modo claro",
    resetTheme:"Restaurar el tema predeterminado",
    langMenu:"Elegir idioma",
    langHint:"Tu idioma se guarda automáticamente en este navegador",
    forumLinkTitle:"Visitar el foro Softara (se abre en una pestaña nueva)",
    chooseService:"Elige el servicio de subida",
    uploadFromDevice:"Desde el dispositivo",
    uploadFromUrls:"Desde enlaces",
    dropTitle:"Arrastra y suelta las imágenes aquí",
    dropSub:"o haz clic para explorar — también puedes pegar con Ctrl+V",
    browse:"Explorar archivos",
    queueTitle:"Cola de subida",
    selected:"seleccionado(s)",
    filesWord:"archivo(s)",
    totalSize:"Tamaño total",
    limitWarn:"Aviso: el tamaño total supera el límite de {service} ({limit}) — los archivos grandes serán rechazados",
    clearQueue:"Vaciar cola",
    startUpload:"Subir imágenes",
    uploading:"Subiendo…",
    fetchingUploading:"Obteniendo la imagen y subiéndola al servicio…",
    uploadDone:"Subida completada con éxito",
    someFailed:"Algunas imágenes no se pudieron subir",
    retry:"Reintentar fallidas",
    cancelUpload:"Cancelar subida",
    remove:"Quitar",
    moveUp:"Mover arriba",
    moveDown:"Mover abajo",
    pending:"En espera",
    stUp:"Subiendo",
    stDone:"Completado",
    stErr:"Fallido",
    stCancel:"Cancelado",
    totalProgress:"Progreso total",
    saveTo:"Guardar en álbum",
    generalAlbum:"Álbum general",
    newAlbumPh:"Álbum nuevo…",
    newAlbumName:"Nombre del álbum nuevo",
    yourLinks:"Enlaces de las imágenes subidas",
    copyAll:"Copiar todos los enlaces",
    recentLinks:"Enlaces de la última subida",
    linkFormats:"Formato de enlaces",
    moreOptions:"Más opciones",
    uploadActions:"Acciones de subida",
    pasteAdded:"{n} imagen(es) añadida(s) desde el portapapeles",
    savedSpace:"Ahorraste {pct}% del tamaño",
    originalSize:"Original",
    urlsTitle:"Subir imágenes desde enlaces",
    urlsHint:"Pon un enlace de imagen por línea — puedes añadir decenas de enlaces a la vez",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"Añadir enlaces y previsualizar",
    urlsValidating:"Validando enlaces…",
    urlInvalid:"Enlace no válido (debe empezar por http o https)",
    urlUnreachable:"No se pudo cargar la imagen — el enlace puede estar roto, bloqueado o no ser una imagen",
    urlOk:"Imagen válida",
    urlNotImage:"El enlace no es una imagen",
    urlsClear:"Vaciar enlaces",
    urlQueueTitle:"Cola de enlaces de imágenes",
    urlUploadBtn:"Subir imágenes aceptadas",
    urlNoValid:"No hay enlaces de imagen válidos para subir",
    urlAdded:"{n} enlace(s) añadido(s) para previsualizar",
    urlsDuplicate:"Enlace duplicado — ignorado",
    errNoService:"Por favor, elige un servicio de subida",
    errNotImage:"Archivo no compatible (no es una imagen)",
    errLarge:"El tamaño del archivo supera el límite del servicio",
    errType:"Tipo de imagen no compatible con este servicio",
    errEmpty:"La cola de subida está vacía",
    errDup:"Ya hay una subida en curso",
    errNet:"Error de red — comprueba tu conexión",
    errSrv:"Error al subir desde el servidor",
    copied:"Copiado",
    copyFail:"No se pudo copiar — copia manualmente",
    direct:"Enlace directo",
    html:"Código HTML",
    bbcode:"BBCode",
    markdown:"Markdown",
    albumsTitle:"Mis álbumes de fotos",
    albumsEmpty:"Aún no hay álbumes — sube tu primera imagen",
    imagesWord:"imágenes",
    createAlbum:"Crear álbum",
    rename:"Renombrar",
    delAlbum:"Eliminar álbum",
    selAll:"Seleccionar todo",
    deselAll:"Deseleccionar todo",
    dlSel:"Descargar selección",
    dlAll:"Descargar todo",
    delSel:"Eliminar selección",
    confirmDelSel:"Solo se quitará la selección de la interfaz del centro; las imágenes alojadas NO se eliminan del servicio. ¿Continuar?",
    transfer:"Mover a un álbum",
    transferTitle:"Mover las imágenes seleccionadas",
    transferTo:"Al álbum",
    transferGo:"Mover",
    sortByDate:"Más recientes primero",
    sortByName:"Por nombre",
    images:"imágenes",
    backAlbums:"Volver a los álbumes",
    backHome:"Inicio",
    noImages:"No hay imágenes en este álbum",
    confirmTitle:"Confirmar eliminación",
    confirmDelAlbum:"El álbum y sus imágenes se eliminarán solo de la interfaz del centro. ¿Estás seguro?",
    confirmDelImages:"Las imágenes seleccionadas se quitarán solo de la interfaz del centro (no del servicio de alojamiento). ¿Continuar?",
    confirm:"Confirmar",
    cancel:"Cancelar",
    del:"Eliminar",
    hostedOn:"Alojada en",
    uploadedOn:"Subida el",
    service:"Servicio",
    dimensions:"Dimensiones",
    size:"Tamaño",
    prev:"Anterior",
    next:"Siguiente",
    open:"Abrir enlace directo",
    share:"Compartir",
    download:"Descargar",
    editIn:"Editar en el editor",
    shareVia:"Compartir vía",
    whatsapp:"WhatsApp",
    telegram:"Telegram",
    x:"X",
    nativeShare:"Compartir del sistema",
    edTitle:"Editor de imágenes",
    edOpen:"Elige una imagen para editar",
    edHint:"Arrastra una imagen aquí o haz clic — el archivo original nunca se modifica",
    fromAlbum:"Abrir imagen de los álbumes",
    crop:"Recortar",
    cropApply:"Aplicar recorte",
    cropCancel:"Cancelar recorte",
    rotL:"Girar a la izquierda",
    rotR:"Girar a la derecha",
    flipH:"Voltear horizontal",
    flipV:"Voltear vertical",
    resize:"Cambiar tamaño",
    resizeW:"Ancho (px)",
    brightness:"Brillo",
    contrast:"Contraste",
    saturation:"Saturación",
    temperature:"Temperatura",
    exposure:"Exposición",
    grayscale:"Escala de grises",
    opacity:"Opacidad",
    sharpness:"Nitidez",
    blur:"Desenfoque",
    filters:"Filtros",
    undo:"Deshacer",
    redo:"Rehacer",
    reset:"Restablecer",
    dlEdited:"Descargar copia editada",
    upEdited:"Subir copia editada",
    origSafe:"El archivo original se mantiene intacto",
    exifNote:"Las fotos del teléfono se orientan automáticamente (EXIF)",
    fmt:"Formato",
    keep:"Mantener original",
    historyTitle:"Historial de subidas",
    historyEmpty:"Aún no hay subidas registradas",
    historyClear:"Vaciar historial",
    historyNote:"El historial se guarda solo en tu navegador y nunca se envía a ningún sitio",
    clearHistoryWarn:"Se vaciará todo el historial de subidas (las imágenes subidas no se ven afectadas). ¿Continuar?",
    settings:"Ajustes de subida",
    stripExif:"Eliminar datos EXIF (privacidad)",
    stripExifHint:"Elimina metadatos de cámara/ubicación — la imagen se recodifica",
    compress:"Comprimir antes de subir",
    quality:"Calidad",
    rememberService:"Recordar mi último servicio usado",
    exportData:"Exportar copia de seguridad",
    importData:"Importar copia de seguridad",
    exportDone:"Archivo de copia descargado",
    importDone:"Datos importados y fusionados — no se perdió ningún enlace",
    importFail:"Archivo no válido — importación fallida",
    importConfirm:"Los álbumes y enlaces del archivo se fusionarán con tus datos actuales, sin borrar nada. ¿Continuar?",
    fRights:"Todos los derechos reservados © 2025 | Desarrollador: Awad Al-Sudani",
    fLove:"Hecho con cariño por Awad Al-Sudani",
    fNoSteal:"No copies ni atribuyas este código sin acreditar a Awad Al-Sudani (almoatn.blogspot.com)",
    svcServimgN:"Subida integrada vía el servicio de Forumotion (hasta 2 MB)",
    svcImgurN:"Rápido y gratis (hasta 20 MB)",
    svcImgbbN:"Gratis con miniaturas (hasta 32 MB)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"No se pudo abrir la imagen — puede estar dañada o en un formato no compatible",
    cropApplied:"Recorte aplicado",
    exportFail:"No se pudo preparar la imagen para descargar",
    dlDone:"Copia editada descargada — el archivo original está intacto",
    zipMaking:"Preparando ZIP…",
    zipDone:"{n} imágenes descargadas en ZIP",
    zipFail:"No se pudo crear el archivo ZIP",
    editingLoad:"Cargando imagen en el editor…",
    editorOpened:"Imagen abierta en el editor",
    editFetchFail:"No se pudo obtener la imagen para editar (restricciones de red)",
    sortByAria:"Ordenar imágenes",
    delFromUI:"Imagen quitada de la interfaz del álbum",
    transferDone:"Imágenes movidas con éxito",
    albumCreated:"Álbum «{name}» creado",
    noSelectionYet:"— aún no hay imágenes seleccionadas —",
    selLinks:"Enlaces de las imágenes seleccionadas",
    allLinks:"Enlaces de todas las imágenes del álbum",
    copy:"Copiar",
    chooseTargetAlbum:"Elige el álbum de destino",
    selectedImagesCount:"Imágenes seleccionadas: {n}",
    another:"Otra imagen",
    fine:"Ajuste fino",
    uploadSvc:"Servicio de subida",
    dlFmt:"Formato de descarga",
    enterName:"Introduce el nombre del álbum",
    exists:"El nombre ya existe",
    pasteN:n=>""+n+" imagen(es) añadida(s) desde el portapapeles"
  },
  de: {
    appName:"Softara Bildzentrum",
    close:"Schließen",saveFail:"Speichern im Browser fehlgeschlagen — Speicherplatz prüfen und erneut versuchen",
    tagline:"Hochladen · Bearbeiten · Ordnen · Teilen",
    tabUpload:"Upload",
    tabAlbums:"Meine Fotos",
    tabEditor:"Editor",
    tabHistory:"Verlauf",
    themeBtn:"Designs",
    langBtn:"Sprache",
    dev:"Entwickler",
    themeHint:"Ihre Auswahl wird für diesen Browser automatisch gespeichert",
    welcomeTitle:"Willkommen im Softara Bildzentrum",
    welcomeBody:"Willkommen… lieber Freund, willkommen im Softara Bildzentrum zum Teilen und Speichern von Bildern. Denken Sie daran, dass Gott Sie sieht, wenn Sie Ihre Bilder hochladen — nutzen Sie sie daher nicht im Ungehorsam gegen Gott.",
    welcomeNoticeTitle:"Unsere einzige Bedingung",
    welcomeNotice:"Willkommen, lieber Besucher. Unsere einzige Bedingung: Laden Sie keine Bilder hoch, die den Lehren unserer edlen Religion widersprechen.",
    themeBlueviolet:"Blauviolett",
    themeTeal:"Türkis",
    themeLight:"Hell",
    themeDark:"Dunkel",
    themeBlue:"Blau",
    themePurple:"Violett",
    themeGreen:"Grün",
    themeNeutral:"Neutral",
    darkMode:"Dunkelmodus",
    lightMode:"Hellmodus",
    resetTheme:"Standarddesign wiederherstellen",
    langMenu:"Sprache wählen",
    langHint:"Ihre Sprache wird für diesen Browser automatisch gespeichert",
    forumLinkTitle:"Softara-Forum besuchen (öffnet in neuem Tab)",
    chooseService:"Upload-Dienst wählen",
    uploadFromDevice:"Vom Gerät",
    uploadFromUrls:"Von Links",
    dropTitle:"Bilder hierher ziehen und ablegen",
    dropSub:"oder klicken zum Auswählen — Sie können auch mit Strg+V einfügen",
    browse:"Dateien durchsuchen",
    queueTitle:"Upload-Warteschlange",
    selected:"ausgewählt",
    filesWord:"Datei(en)",
    totalSize:"Gesamtgröße",
    limitWarn:"Achtung: Die Gesamtgröße überschreitet das Limit von {service} ({limit}) — zu große Dateien werden abgelehnt",
    clearQueue:"Warteschlange leeren",
    startUpload:"Bilder hochladen",
    uploading:"Wird hochgeladen…",
    fetchingUploading:"Bild wird abgerufen und zum Dienst hochgeladen…",
    uploadDone:"Upload erfolgreich abgeschlossen",
    someFailed:"Einige Bilder konnten nicht hochgeladen werden",
    retry:"Fehlgeschlagene wiederholen",
    cancelUpload:"Upload abbrechen",
    remove:"Entfernen",
    moveUp:"Nach oben",
    moveDown:"Nach unten",
    pending:"Wartend",
    stUp:"Wird hochgeladen",
    stDone:"Fertig",
    stErr:"Fehlgeschlagen",
    stCancel:"Abgebrochen",
    totalProgress:"Gesamtfortschritt",
    saveTo:"In Album speichern",
    generalAlbum:"Allgemeines Album",
    newAlbumPh:"Neues Album…",
    newAlbumName:"Name des neuen Albums",
    yourLinks:"Links der hochgeladenen Bilder",
    copyAll:"Alle Links kopieren",
    recentLinks:"Links des letzten Uploads",
    linkFormats:"Linkformat",
    moreOptions:"Weitere Optionen",
    uploadActions:"Upload-Aktionen",
    pasteAdded:"{n} Bild(er) aus der Zwischenablage hinzugefügt",
    savedSpace:"Sie haben {pct}% der Größe gespart",
    originalSize:"Original",
    urlsTitle:"Bilder von Links hochladen",
    urlsHint:"Ein Bildlink pro Zeile — Sie können Dutzende Links auf einmal hinzufügen",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"Links hinzufügen & Vorschau",
    urlsValidating:"Links werden geprüft…",
    urlInvalid:"Ungültiger Link (muss mit http oder https beginnen)",
    urlUnreachable:"Bild konnte nicht geladen werden — der Link ist vielleicht defekt, blockiert oder kein Bild",
    urlOk:"Gültiges Bild",
    urlNotImage:"Der Link ist kein Bild",
    urlsClear:"Links leeren",
    urlQueueTitle:"Bildlink-Warteschlange",
    urlUploadBtn:"Akzeptierte Bilder hochladen",
    urlNoValid:"Keine gültigen Bildlinks zum Hochladen",
    urlAdded:"{n} Link(s) für die Vorschau hinzugefügt",
    urlsDuplicate:"Doppelter Link — ignoriert",
    errNoService:"Bitte wählen Sie einen Upload-Dienst",
    errNotImage:"Nicht unterstützte Datei (kein Bild)",
    errLarge:"Dateigröße überschreitet das Dienstlimit",
    errType:"Bildtyp wird von diesem Dienst nicht unterstützt",
    errEmpty:"Die Warteschlange ist leer",
    errDup:"Ein Upload läuft bereits",
    errNet:"Netzwerkfehler — prüfen Sie Ihre Verbindung",
    errSrv:"Server-Upload fehlgeschlagen",
    copied:"Kopiert",
    copyFail:"Kopieren fehlgeschlagen — manuell kopieren",
    direct:"Direktlink",
    html:"HTML-Code",
    bbcode:"BBCode",
    markdown:"Markdown",
    albumsTitle:"Meine Fotoalben",
    albumsEmpty:"Noch keine Alben — laden Sie Ihr erstes Bild hoch",
    imagesWord:"Bilder",
    createAlbum:"Album erstellen",
    rename:"Umbenennen",
    delAlbum:"Album löschen",
    selAll:"Alle auswählen",
    deselAll:"Auswahl aufheben",
    dlSel:"Auswahl herunterladen",
    dlAll:"Alle herunterladen",
    delSel:"Auswahl löschen",
    confirmDelSel:"Die Auswahl wird nur aus der Oberfläche des Zentrums entfernt; gehostete Bilder werden NICHT vom Dienst gelöscht. Fortfahren?",
    transfer:"In Album verschieben",
    transferTitle:"Ausgewählte Bilder verschieben",
    transferTo:"In Album",
    transferGo:"Verschieben",
    sortByDate:"Neueste zuerst",
    sortByName:"Nach Name",
    images:"Bilder",
    backAlbums:"Zurück zu den Alben",
    backHome:"Startseite",
    noImages:"Keine Bilder in diesem Album",
    confirmTitle:"Löschen bestätigen",
    confirmDelAlbum:"Album und Bilder werden nur aus der Oberfläche des Zentrums entfernt. Sind Sie sicher?",
    confirmDelImages:"Ausgewählte Bilder werden nur aus der Oberfläche des Zentrums entfernt (nicht vom Hosting-Dienst). Fortfahren?",
    confirm:"Bestätigen",
    cancel:"Abbrechen",
    del:"Löschen",
    hostedOn:"Gehostet auf",
    uploadedOn:"Hochgeladen am",
    service:"Dienst",
    dimensions:"Abmessungen",
    size:"Größe",
    prev:"Zurück",
    next:"Weiter",
    open:"Direktlink öffnen",
    share:"Teilen",
    download:"Herunterladen",
    editIn:"Im Editor bearbeiten",
    shareVia:"Teilen über",
    whatsapp:"WhatsApp",
    telegram:"Telegram",
    x:"X",
    nativeShare:"Systemfreigabe",
    edTitle:"Bildeditor",
    edOpen:"Wählen Sie ein Bild zum Bearbeiten",
    edHint:"Bild hierher ziehen oder klicken — die Originaldatei wird nie verändert",
    fromAlbum:"Bild aus Alben öffnen",
    crop:"Zuschneiden",
    cropApply:"Zuschnitt anwenden",
    cropCancel:"Zuschnitt abbrechen",
    rotL:"Nach links drehen",
    rotR:"Nach rechts drehen",
    flipH:"Horizontal spiegeln",
    flipV:"Vertikal spiegeln",
    resize:"Größe ändern",
    resizeW:"Breite (px)",
    brightness:"Helligkeit",
    contrast:"Kontrast",
    saturation:"Sättigung",
    temperature:"Farbtemperatur",
    exposure:"Belichtung",
    grayscale:"Graustufen",
    opacity:"Deckkraft",
    sharpness:"Schärfe",
    blur:"Weichzeichnen",
    filters:"Filter",
    undo:"Rückgängig",
    redo:"Wiederholen",
    reset:"Zurücksetzen",
    dlEdited:"Bearbeitete Kopie herunterladen",
    upEdited:"Bearbeitete Kopie hochladen",
    origSafe:"Die Originaldatei bleibt unberührt",
    exifNote:"Handyfotos werden automatisch richtig ausgerichtet (EXIF)",
    fmt:"Format",
    keep:"Original behalten",
    historyTitle:"Upload-Verlauf",
    historyEmpty:"Noch keine Uploads aufgezeichnet",
    historyClear:"Verlauf leeren",
    historyNote:"Der Verlauf wird nur in Ihrem Browser gespeichert und nirgends gesendet",
    clearHistoryWarn:"Der gesamte Upload-Verlauf wird geleert (die hochgeladenen Bilder selbst sind nicht betroffen). Fortfahren?",
    settings:"Upload-Einstellungen",
    stripExif:"EXIF-Daten entfernen (Datenschutz)",
    stripExifHint:"Entfernt Kamera-/Standort-Metadaten — das Bild wird neu kodiert",
    compress:"Vor dem Upload komprimieren",
    quality:"Qualität",
    rememberService:"Zuletzt verwendeten Dienst merken",
    exportData:"Backup exportieren",
    importData:"Backup importieren",
    exportDone:"Backup-Datei heruntergeladen",
    importDone:"Daten importiert und zusammengeführt — kein Link verloren",
    importFail:"Ungültige Datei — Import fehlgeschlagen",
    importConfirm:"Die Alben und Links der Datei werden mit Ihren aktuellen Daten zusammengeführt, ohne etwas zu löschen. Fortfahren?",
    fRights:"Alle Rechte vorbehalten © 2025 | Entwickler: Awad Al-Sudani",
    fLove:"Mit Liebe entwickelt von Awad Al-Sudani",
    fNoSteal:"Dieser Code darf nicht kopiert oder umattribuiert werden, ohne Awad Al-Sudani (almoatn.blogspot.com) zu nennen",
    svcServimgN:"Direkter Upload über den Forumotion-Dienst (bis 2 MB)",
    svcImgurN:"Schnell & kostenlos (bis 20 MB)",
    svcImgbbN:"Kostenlos mit Vorschaubildern (bis 32 MB)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"Bild konnte nicht geöffnet werden — möglicherweise beschädigt oder in einem nicht unterstützten Format",
    cropApplied:"Zuschnitt angewendet",
    exportFail:"Bild konnte nicht für den Download vorbereitet werden",
    dlDone:"Bearbeitete Kopie heruntergeladen — die Originaldatei bleibt unberührt",
    zipMaking:"ZIP wird vorbereitet…",
    zipDone:"{n} Bilder als ZIP heruntergeladen",
    zipFail:"ZIP-Datei konnte nicht erstellt werden",
    editingLoad:"Bild wird in den Editor geladen…",
    editorOpened:"Bild im Editor geöffnet",
    editFetchFail:"Bild konnte nicht zum Bearbeiten abgerufen werden (Netzwerkeinschränkungen)",
    sortByAria:"Bilder sortieren",
    delFromUI:"Bild aus der Album-Oberfläche entfernt",
    transferDone:"Bilder erfolgreich verschoben",
    albumCreated:"Album „{name}“ erstellt",
    noSelectionYet:"— noch keine Bilder ausgewählt —",
    selLinks:"Links der ausgewählten Bilder",
    allLinks:"Links aller Albumbilder",
    copy:"Kopieren",
    chooseTargetAlbum:"Zielalbum wählen",
    selectedImagesCount:"Ausgewählte Bilder: {n}",
    another:"Anderes Bild",
    fine:"Feineinstellung",
    uploadSvc:"Upload-Dienst",
    dlFmt:"Download-Format",
    enterName:"Albumnamen eingeben",
    exists:"Name existiert bereits",
    pasteN:n=>""+n+" Bild(er) aus der Zwischenablage hinzugefügt"
  },
  tr: {
    appName:"Softara Görüntü Merkezi",
    close:"Kapat",saveFail:"Tarayıcınıza kaydedilemedi — depolama alanını kontrol edin ve yeniden deneyin",
    tagline:"Yükle · Düzenle · Düzenle · Paylaş",
    tabUpload:"Yükleme",
    tabAlbums:"Fotoğraflarım",
    tabEditor:"Editör",
    tabHistory:"Geçmiş",
    themeBtn:"Temalar",
    langBtn:"Dil",
    dev:"Geliştirici",
    themeHint:"Seçiminiz bu tarayıcı için otomatik kaydedilir",
    welcomeTitle:"Softara Görüntü Merkezi'ne Hoş Geldiniz",
    welcomeBody:"Hoş geldiniz… sevgili dostumuz, görüntü paylaşmak ve saklamak için Softara Görüntü Merkezi'ne hoş geldiniz. Görüntülerinizi yüklerken Allah'ın sizi gördüğünü unutmayın; onları Allah'ın emrine karşı gelmek için kullanmayın.",
    welcomeNoticeTitle:"Tek koşulumuz",
    welcomeNotice:"Hoş geldin, değerli ziyaretçi. Tek koşulumuz, yüce dinimizin öğretilerine aykırı görüntüler yüklememenizdir.",
    themeBlueviolet:"Mavi-mor",
    themeTeal:"Turkuaz",
    themeLight:"Açık",
    themeDark:"Koyu",
    themeBlue:"Mavi",
    themePurple:"Mor",
    themeGreen:"Yeşil",
    themeNeutral:"Nötr",
    darkMode:"Koyu mod",
    lightMode:"Açık mod",
    resetTheme:"Varsayılan temayı geri yükle",
    langMenu:"Dil seçin",
    langHint:"Diliniz bu tarayıcı için otomatik kaydedilir",
    forumLinkTitle:"Softara Forum'u ziyaret et (yeni sekmede açılır)",
    chooseService:"Yükleme hizmetini seçin",
    uploadFromDevice:"Cihazdan",
    uploadFromUrls:"Bağlantılardan",
    dropTitle:"Görüntüleri buraya sürükleyip bırakın",
    dropSub:"veya seçmek için tıklayın — Ctrl+V ile de yapıştırabilirsiniz",
    browse:"Dosyalara göz at",
    queueTitle:"Yükleme kuyruğu",
    selected:"seçili",
    filesWord:"dosya",
    totalSize:"Toplam boyut",
    limitWarn:"Uyarı: toplam boyut {service} sınırını ({limit}) aşıyor — çok büyük dosyalar reddedilecek",
    clearQueue:"Kuyruğu temizle",
    startUpload:"Görüntüleri yükle",
    uploading:"Yükleniyor…",
    fetchingUploading:"Görüntü alınıp hizmete yükleniyor…",
    uploadDone:"Yükleme başarıyla tamamlandı",
    someFailed:"Bazı görüntüler yüklenemedi",
    retry:"Başarısızları yeniden dene",
    cancelUpload:"Yüklemeyi iptal et",
    remove:"Kaldır",
    moveUp:"Yukarı taşı",
    moveDown:"Aşağı taşı",
    pending:"Beklemede",
    stUp:"Yükleniyor",
    stDone:"Tamamlandı",
    stErr:"Başarısız",
    stCancel:"İptal edildi",
    totalProgress:"Genel ilerleme",
    saveTo:"Albume kaydet",
    generalAlbum:"Genel Albüm",
    newAlbumPh:"Yeni albüm…",
    newAlbumName:"Yeni albüm adı",
    yourLinks:"Yüklenen görüntü bağlantıları",
    copyAll:"Tüm bağlantıları kopyala",
    recentLinks:"Son yükleme bağlantıları",
    linkFormats:"Bağlantı biçimi",
    moreOptions:"Diğer seçenekler",
    uploadActions:"Yükleme işlemleri",
    pasteAdded:"Panodan {n} görüntü eklendi",
    savedSpace:"Boyutun %{pct} kadarını tasarruf ettiniz",
    originalSize:"Orijinal",
    urlsTitle:"Bağlantılardan görüntü yükleme",
    urlsHint:"Her satıra bir görüntü bağlantısı yazın — tek seferde onlarca bağlantı ekleyebilirsiniz",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"Bağlantıları ekle ve önizle",
    urlsValidating:"Bağlantılar doğrulanıyor…",
    urlInvalid:"Geçersiz bağlantı (http veya https ile başlamalı)",
    urlUnreachable:"Görüntü yüklenemedi — bağlantı bozuk, engelli veya bir görüntü olmayabilir",
    urlOk:"Geçerli görüntü",
    urlNotImage:"Bağlantı bir görüntü değil",
    urlsClear:"Bağlantıları temizle",
    urlQueueTitle:"Görüntü bağlantısı kuyruğu",
    urlUploadBtn:"Kabul edilen görüntüleri yükle",
    urlNoValid:"Yüklenecek geçerli görüntü bağlantısı yok",
    urlAdded:"Önizleme için {n} bağlantı eklendi",
    urlsDuplicate:"Yinelenen bağlantı — yok sayıldı",
    errNoService:"Lütfen bir yükleme hizmeti seçin",
    errNotImage:"Desteklenmeyen dosya (görüntü değil)",
    errLarge:"Dosya boyutu hizmet sınırını aşıyor",
    errType:"Görüntü türü bu hizmet tarafından desteklenmiyor",
    errEmpty:"Yükleme kuyruğu boş",
    errDup:"Bir yükleme zaten devam ediyor",
    errNet:"Ağ hatası — bağlantınızı kontrol edin",
    errSrv:"Sunucu yüklemesi başarısız oldu",
    copied:"Kopyalandı",
    copyFail:"Kopyalanamadı — elle kopyalayın",
    direct:"Doğrudan bağlantı",
    html:"HTML kodu",
    bbcode:"BBCode",
    markdown:"Markdown",
    albumsTitle:"Fotoğraf albümlerim",
    albumsEmpty:"Henüz albüm yok — ilk görüntünüzü yükleyin",
    imagesWord:"görüntü",
    createAlbum:"Albüm oluştur",
    rename:"Yeniden adlandır",
    delAlbum:"Albümü sil",
    selAll:"Tümünü seç",
    deselAll:"Seçimi kaldır",
    dlSel:"Seçilenleri indir",
    dlAll:"Tümünü indir",
    delSel:"Seçilenleri sil",
    confirmDelSel:"Seçim yalnızca merkezin arayüzünden kaldırılacak; barındırılan görüntüler hizmetten SİLİNMEZ. Devam edilsin mi?",
    transfer:"Albüme taşı",
    transferTitle:"Seçili görüntüleri taşı",
    transferTo:"Albüme",
    transferGo:"Taşı",
    sortByDate:"Önce en yeni",
    sortByName:"İsme göre",
    images:"görüntü",
    backAlbums:"Albümlere dön",
    backHome:"Ana sayfa",
    noImages:"Bu albümde görüntü yok",
    confirmTitle:"Silmeyi onayla",
    confirmDelAlbum:"Albüm ve görüntüleri yalnızca merkezin arayüzünden kaldırılacak. Emin misiniz?",
    confirmDelImages:"Seçili görüntüler yalnızca merkezin arayüzünden kaldırılacak (barındırma hizmetinden değil). Devam edilsin mi?",
    confirm:"Onayla",
    cancel:"İptal",
    del:"Sil",
    hostedOn:"Barındıran",
    uploadedOn:"Yüklendi",
    service:"Hizmet",
    dimensions:"Boyutlar",
    size:"Boyut",
    prev:"Önceki",
    next:"Sonraki",
    open:"Doğrudan bağlantıyı aç",
    share:"Paylaş",
    download:"İndir",
    editIn:"Editörde düzenle",
    shareVia:"Şununla paylaş",
    whatsapp:"WhatsApp",
    telegram:"Telegram",
    x:"X",
    nativeShare:"Sistem paylaşımı",
    edTitle:"Görüntü Editörü",
    edOpen:"Düzenlenecek bir görüntü seçin",
    edHint:"Bir görüntüyü buraya sürükleyin veya tıklayın — orijinal dosya asla değiştirilmez",
    fromAlbum:"Albümlerden görüntü aç",
    crop:"Kırp",
    cropApply:"Kırpmayı uygula",
    cropCancel:"Kırpmayı iptal et",
    rotL:"Sola döndür",
    rotR:"Sağa döndür",
    flipH:"Yatay çevir",
    flipV:"Dikey çevir",
    resize:"Yeniden boyutlandır",
    resizeW:"Genişlik (px)",
    brightness:"Parlaklık",
    contrast:"Kontrast",
    saturation:"Doygunluk",
    temperature:"Sıcaklık",
    exposure:"Pozlama",
    grayscale:"Gri tonlama",
    opacity:"Saydamlık",
    sharpness:"Keskinlik",
    blur:"Bulanıklaştırma",
    filters:"Filtreler",
    undo:"Geri al",
    redo:"Yinele",
    reset:"Sıfırla",
    dlEdited:"Düzenlenmiş kopyayı indir",
    upEdited:"Düzenlenmiş kopyayı yükle",
    origSafe:"Orijinal dosya olduğu gibi korunur",
    exifNote:"Telefon fotoğrafları otomatik doğru yönlendirilir (EXIF)",
    fmt:"Biçim",
    keep:"Orijinali koru",
    historyTitle:"Yükleme geçmişi",
    historyEmpty:"Henüz yükleme kaydı yok",
    historyClear:"Geçmişi temizle",
    historyNote:"Geçmiş yalnızca tarayıcınızda saklanır ve hiçbir yere gönderilmez",
    clearHistoryWarn:"Yükleme geçmişinin tamamı temizlenecek (yüklenen görüntülerin kendileri etkilenmez). Devam edilsin mi?",
    settings:"Yükleme ayarları",
    stripExif:"EXIF verilerini kaldır (gizlilik)",
    stripExifHint:"Kamera/konum meta verilerini kaldırır — görüntü yeniden kodlanır",
    compress:"Yüklemeden önce sıkıştır",
    quality:"Kalite",
    rememberService:"Son kullandığım hizmeti hatırla",
    exportData:"Yedek dışa aktar",
    importData:"Yedek içe aktar",
    exportDone:"Yedek dosyası indirildi",
    importDone:"Veriler içe aktarıldı ve birleştirildi — hiçbir bağlantı kaybolmadı",
    importFail:"Geçersiz dosya — içe aktarma başarısız",
    importConfirm:"Dosyadaki albümler ve bağlantılar, hiçbir şey silinmeden mevcut verilerinizle birleştirilecek. Devam edilsin mi?",
    fRights:"Tüm hakları saklıdır © 2025 | Geliştirici: Awad Al-Sudani",
    fLove:"Awad Al-Sudani tarafından sevgiyle geliştirildi",
    fNoSteal:"Awad Al-Sudani (almoatn.blogspot.com) kaynak gösterilmeden bu kod kopyalanamaz veya başkasına mal edilemez",
    svcServimgN:"Forumotion hizmeti üzerinden sayfa içi yükleme (2 MB'a kadar)",
    svcImgurN:"Hızlı ve ücretsiz (20 MB'a kadar)",
    svcImgbbN:"Küçük resimlerle ücretsiz (32 MB'a kadar)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"Görüntü açılamadı — bozuk veya desteklenmeyen bir biçimde olabilir",
    cropApplied:"Kırpma uygulandı",
    exportFail:"Görüntü indirmek için hazırlanamadı",
    dlDone:"Düzenlenmiş kopya indirildi — orijinal dosya korunuyor",
    zipMaking:"ZIP hazırlanıyor…",
    zipDone:"{n} görüntü ZIP olarak indirildi",
    zipFail:"ZIP dosyası oluşturulamadı",
    editingLoad:"Görüntü editöre yükleniyor…",
    editorOpened:"Görüntü editörde açıldı",
    editFetchFail:"Düzenlemek için görüntü alınamadı (ağ kısıtlamaları)",
    sortByAria:"Görüntüleri sırala",
    delFromUI:"Görüntü albüm arayüzünden kaldırıldı",
    transferDone:"Görüntüler başarıyla taşındı",
    albumCreated:"«{name}» albümü oluşturuldu",
    noSelectionYet:"— henüz görüntü seçilmedi —",
    selLinks:"Seçili görüntü bağlantıları",
    allLinks:"Tüm albüm görüntülerinin bağlantıları",
    copy:"Kopyala",
    chooseTargetAlbum:"Hedef albümü seçin",
    selectedImagesCount:"Seçili görüntü sayısı: {n}",
    another:"Başka görüntü",
    fine:"İnce ayar",
    uploadSvc:"Yükleme hizmeti",
    dlFmt:"İndirme biçimi",
    enterName:"Albüm adını girin",
    exists:"Bu ad zaten var",
    pasteN:n=>"Panodan "+n+" görüntü eklendi"
  },
  pt: {
    appName:"Centro de Imagens Softara",
    close:"Fechar",saveFail:"Não foi possível salvar no seu navegador — verifique o espaço de armazenamento e tente novamente",
    tagline:"Enviar · Editar · Organizar · Partilhar",
    tabUpload:"Enviar",
    tabAlbums:"Minhas fotos",
    tabEditor:"Editor",
    tabHistory:"Histórico",
    themeBtn:"Temas",
    langBtn:"Idioma",
    dev:"Desenvolvedor",
    themeHint:"A sua escolha é guardada automaticamente neste navegador",
    welcomeTitle:"Bem-vindo ao Centro de Imagens Softara",
    welcomeBody:"Bem-vindo… caro amigo, bem-vindo ao Centro de Imagens Softara para partilhar e guardar imagens. Lembre-se de que Deus o vê quando envia as suas imagens; não as use em desobediência a Deus.",
    welcomeNoticeTitle:"A nossa única condição",
    welcomeNotice:"Bem-vindo, caro visitante. A nossa única condição: não enviar imagens que contrariem os ensinamentos da nossa nobre religião.",
    themeBlueviolet:"Azul-violeta",
    themeTeal:"Azul-petróleo",
    themeLight:"Claro",
    themeDark:"Escuro",
    themeBlue:"Azul",
    themePurple:"Violeta",
    themeGreen:"Verde",
    themeNeutral:"Neutro",
    darkMode:"Modo escuro",
    lightMode:"Modo claro",
    resetTheme:"Restaurar o tema predefinido",
    langMenu:"Escolher idioma",
    langHint:"O seu idioma é guardado automaticamente neste navegador",
    forumLinkTitle:"Visitar o fórum Softara (abre num novo separador)",
    chooseService:"Escolha o serviço de envio",
    uploadFromDevice:"Do dispositivo",
    uploadFromUrls:"De links",
    dropTitle:"Arraste e largue as imagens aqui",
    dropSub:"ou clique para procurar — também pode colar com Ctrl+V",
    browse:"Procurar ficheiros",
    queueTitle:"Fila de envio",
    selected:"selecionado(s)",
    filesWord:"ficheiro(s)",
    totalSize:"Tamanho total",
    limitWarn:"Aviso: o tamanho total excede o limite de {service} ({limit}) — ficheiros grandes serão rejeitados",
    clearQueue:"Limpar fila",
    startUpload:"Enviar imagens",
    uploading:"A enviar…",
    fetchingUploading:"A obter a imagem e a enviar para o serviço…",
    uploadDone:"Envio concluído com sucesso",
    someFailed:"Algumas imagens falharam no envio",
    retry:"Repetir falhadas",
    cancelUpload:"Cancelar envio",
    remove:"Remover",
    moveUp:"Mover para cima",
    moveDown:"Mover para baixo",
    pending:"Pendente",
    stUp:"A enviar",
    stDone:"Concluído",
    stErr:"Falhado",
    stCancel:"Cancelado",
    totalProgress:"Progresso total",
    saveTo:"Guardar em álbum",
    generalAlbum:"Álbum geral",
    newAlbumPh:"Novo álbum…",
    newAlbumName:"Nome do novo álbum",
    yourLinks:"Links das imagens enviadas",
    copyAll:"Copiar todos os links",
    recentLinks:"Links do último envio",
    linkFormats:"Formato dos links",
    moreOptions:"Mais opções",
    uploadActions:"Ações de envio",
    pasteAdded:"{n} imagem(ns) adicionada(s) da área de transferência",
    savedSpace:"Poupo {pct}% do tamanho",
    originalSize:"Original",
    urlsTitle:"Enviar imagens a partir de links",
    urlsHint:"Coloque um link de imagem por linha — pode adicionar dezenas de links de uma vez",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"Adicionar links e pré-visualizar",
    urlsValidating:"A validar links…",
    urlInvalid:"Link inválido (deve começar por http ou https)",
    urlUnreachable:"Não foi possível carregar a imagem — o link pode estar quebrado, bloqueado ou não ser uma imagem",
    urlOk:"Imagem válida",
    urlNotImage:"O link não é uma imagem",
    urlsClear:"Limpar links",
    urlQueueTitle:"Fila de links de imagens",
    urlUploadBtn:"Enviar imagens aceites",
    urlNoValid:"Não há links de imagem válidos para enviar",
    urlAdded:"{n} link(s) adicionado(s) para pré-visualização",
    urlsDuplicate:"Link duplicado — ignorado",
    errNoService:"Escolha um serviço de envio",
    errNotImage:"Ficheiro não suportado (não é uma imagem)",
    errLarge:"O tamanho do ficheiro excede o limite do serviço",
    errType:"Tipo de imagem não suportado por este serviço",
    errEmpty:"A fila de envio está vazia",
    errDup:"Já existe um envio em curso",
    errNet:"Erro de rede — verifique a sua ligação",
    errSrv:"Falha no envio do servidor",
    copied:"Copiado",
    copyFail:"Não foi possível copiar — copie manualmente",
    direct:"Link direto",
    html:"Código HTML",
    bbcode:"BBCode",
    markdown:"Markdown",
    albumsTitle:"Os meus álbuns de fotos",
    albumsEmpty:"Ainda sem álbuns — envie a sua primeira imagem",
    imagesWord:"imagens",
    createAlbum:"Criar álbum",
    rename:"Renomear",
    delAlbum:"Eliminar álbum",
    selAll:"Selecionar tudo",
    deselAll:"Desmarcar tudo",
    dlSel:"Descarregar seleção",
    dlAll:"Descarregar tudo",
    delSel:"Eliminar seleção",
    confirmDelSel:"A seleção será removida apenas da interface do centro; as imagens alojadas NÃO são eliminadas do serviço. Continuar?",
    transfer:"Mover para álbum",
    transferTitle:"Mover imagens selecionadas",
    transferTo:"Para o álbum",
    transferGo:"Mover",
    sortByDate:"Mais recentes primeiro",
    sortByName:"Por nome",
    images:"imagens",
    backAlbums:"Voltar aos álbuns",
    backHome:"Início",
    noImages:"Sem imagens neste álbum",
    confirmTitle:"Confirmar eliminação",
    confirmDelAlbum:"O álbum e as suas imagens serão removidos apenas da interface do centro. Tem a certeza?",
    confirmDelImages:"As imagens selecionadas serão removidas apenas da interface do centro (não do serviço de alojamento). Continuar?",
    confirm:"Confirmar",
    cancel:"Cancelar",
    del:"Eliminar",
    hostedOn:"Alojada em",
    uploadedOn:"Enviada em",
    service:"Serviço",
    dimensions:"Dimensões",
    size:"Tamanho",
    prev:"Anterior",
    next:"Seguinte",
    open:"Abrir link direto",
    share:"Partilhar",
    download:"Descarregar",
    editIn:"Editar no editor",
    shareVia:"Partilhar via",
    whatsapp:"WhatsApp",
    telegram:"Telegram",
    x:"X",
    nativeShare:"Partilha do sistema",
    edTitle:"Editor de Imagens",
    edOpen:"Escolha uma imagem para editar",
    edHint:"Arraste uma imagem para aqui ou clique — o ficheiro original nunca é modificado",
    fromAlbum:"Abrir imagem dos álbuns",
    crop:"Recortar",
    cropApply:"Aplicar recorte",
    cropCancel:"Cancelar recorte",
    rotL:"Rodar à esquerda",
    rotR:"Rodar à direita",
    flipH:"Inverter horizontal",
    flipV:"Inverter vertical",
    resize:"Redimensionar",
    resizeW:"Largura (px)",
    brightness:"Brilho",
    contrast:"Contraste",
    saturation:"Saturação",
    temperature:"Temperatura",
    exposure:"Exposição",
    grayscale:"Tons de cinzento",
    opacity:"Opacidade",
    sharpness:"Nitidez",
    blur:"Desfoque",
    filters:"Filtros",
    undo:"Desfazer",
    redo:"Refazer",
    reset:"Repor",
    dlEdited:"Descarregar cópia editada",
    upEdited:"Enviar cópia editada",
    origSafe:"O ficheiro original mantém-se intacto",
    exifNote:"Fotos de telemóvel são orientadas automaticamente (EXIF)",
    fmt:"Formato",
    keep:"Manter original",
    historyTitle:"Histórico de envios",
    historyEmpty:"Ainda sem envios registados",
    historyClear:"Limpar histórico",
    historyNote:"O histórico é guardado apenas no seu navegador e nunca é enviado a ninguém",
    clearHistoryWarn:"Todo o histórico de envios será limpo (as imagens enviadas não são afetadas). Continuar?",
    settings:"Definições de envio",
    stripExif:"Remover dados EXIF (privacidade)",
    stripExifHint:"Remove metadados de câmara/localização — a imagem é recodificada",
    compress:"Comprimir antes de enviar",
    quality:"Qualidade",
    rememberService:"Memorizar o último serviço utilizado",
    exportData:"Exportar cópia de segurança",
    importData:"Importar cópia de segurança",
    exportDone:"Ficheiro de cópia de segurança descarregado",
    importDone:"Dados importados e combinados — nenhum link perdido",
    importFail:"Ficheiro inválido — importação falhou",
    importConfirm:"Os álbuns e links do ficheiro serão combinados com os seus dados atuais, sem apagar nada. Continuar?",
    fRights:"Todos os direitos reservados © 2025 | Desenvolvedor: Awad Al-Sudani",
    fLove:"Feito com carinho por Awad Al-Sudani",
    fNoSteal:"Não copie ou reatribua este código sem creditar Awad Al-Sudani (almoatn.blogspot.com)",
    svcServimgN:"Envio integrado via serviço Forumotion (até 2 MB)",
    svcImgurN:"Rápido e gratuito (até 20 MB)",
    svcImgbbN:"Gratuito com miniaturas (até 32 MB)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"Não foi possível abrir a imagem — pode estar corrompida ou num formato não suportado",
    cropApplied:"Recorte aplicado",
    exportFail:"Não foi possível preparar a imagem para descarregar",
    dlDone:"Cópia editada descarregada — o ficheiro original está intacto",
    zipMaking:"A preparar o ZIP…",
    zipDone:"{n} imagens descarregadas em ZIP",
    zipFail:"Não foi possível criar o ficheiro ZIP",
    editingLoad:"A carregar imagem no editor…",
    editorOpened:"Imagem aberta no editor",
    editFetchFail:"Não foi possível obter a imagem para editar (restrições de rede)",
    sortByAria:"Ordenar imagens",
    delFromUI:"Imagem removida da interface do álbum",
    transferDone:"Imagens movidas com sucesso",
    albumCreated:"Álbum «{name}» criado",
    noSelectionYet:"— ainda não há imagens selecionadas —",
    selLinks:"Links das imagens selecionadas",
    allLinks:"Links de todas as imagens do álbum",
    copy:"Copiar",
    chooseTargetAlbum:"Escolha o álbum de destino",
    selectedImagesCount:"Imagens selecionadas: {n}",
    another:"Outra imagem",
    fine:"Ajuste fino",
    uploadSvc:"Serviço de envio",
    dlFmt:"Formato de download",
    enterName:"Introduza o nome do álbum",
    exists:"O nome já existe",
    pasteN:n=>""+n+" imagem(ns) adicionada(s) da área de transferência"
  },
  it: {
    appName:"Centro Immagini Softara",
    close:"Chiudi",saveFail:"Impossibile salvare nel browser — verifica lo spazio di archiviazione e riprova",
    tagline:"Carica · Modifica · Organizza · Condividi",
    tabUpload:"Carica",
    tabAlbums:"Le mie foto",
    tabEditor:"Editor",
    tabHistory:"Cronologia",
    themeBtn:"Temi",
    langBtn:"Lingua",
    dev:"Sviluppatore",
    themeHint:"La tua scelta viene salvata automaticamente per questo browser",
    welcomeTitle:"Benvenuto nel Centro Immagini Softara",
    welcomeBody:"Benvenuto… caro amico, benvenuto nel Centro Immagini Softara per condividere e archiviare immagini. Ricorda che Dio ti vede quando carichi le tue immagini: non usarle in disobbedienza a Dio.",
    welcomeNoticeTitle:"La nostra unica condizione",
    welcomeNotice:"Benvenuto, caro visitatore. La nostra unica condizione: non caricare immagini contrarie agli insegnamenti della nostra nobile religione.",
    themeBlueviolet:"Blu-viola",
    themeTeal:"Verde acqua",
    themeLight:"Chiaro",
    themeDark:"Scuro",
    themeBlue:"Blu",
    themePurple:"Viola",
    themeGreen:"Verde",
    themeNeutral:"Neutro",
    darkMode:"Modalità scura",
    lightMode:"Modalità chiara",
    resetTheme:"Ripristina il tema predefinito",
    langMenu:"Scegli lingua",
    langHint:"La tua lingua viene salvata automaticamente per questo browser",
    forumLinkTitle:"Visita il forum Softara (si apre in una nuova scheda)",
    chooseService:"Scegli il servizio di caricamento",
    uploadFromDevice:"Dal dispositivo",
    uploadFromUrls:"Da link",
    dropTitle:"Trascina e rilascia le immagini qui",
    dropSub:"oppure clicca per sfogliare — puoi anche incollare con Ctrl+V",
    browse:"Sfoglia file",
    queueTitle:"Coda di caricamento",
    selected:"selezionati",
    filesWord:"file",
    totalSize:"Dimensione totale",
    limitWarn:"Attenzione: la dimensione totale supera il limite di {service} ({limit}) — i file troppo grandi verranno rifiutati",
    clearQueue:"Svuota coda",
    startUpload:"Carica immagini",
    uploading:"Caricamento…",
    fetchingUploading:"Recupero dell'immagine e caricamento sul servizio…",
    uploadDone:"Caricamento completato con successo",
    someFailed:"Alcune immagini non sono state caricate",
    retry:"Riprova i falliti",
    cancelUpload:"Annulla caricamento",
    remove:"Rimuovi",
    moveUp:"Sposta su",
    moveDown:"Sposta giù",
    pending:"In attesa",
    stUp:"In caricamento",
    stDone:"Completato",
    stErr:"Fallito",
    stCancel:"Annullato",
    totalProgress:"Progresso totale",
    saveTo:"Salva in album",
    generalAlbum:"Album generale",
    newAlbumPh:"Nuovo album…",
    newAlbumName:"Nome del nuovo album",
    yourLinks:"Link delle immagini caricate",
    copyAll:"Copia tutti i link",
    recentLinks:"Link dell'ultimo caricamento",
    linkFormats:"Formato link",
    moreOptions:"Altre opzioni",
    uploadActions:"Azioni di caricamento",
    pasteAdded:"{n} immagini aggiunte dagli appunti",
    savedSpace:"Hai risparmiato il {pct}% della dimensione",
    originalSize:"Originale",
    urlsTitle:"Carica immagini da link",
    urlsHint:"Metti un link immagine per riga — puoi aggiungere decine di link in una volta",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"Aggiungi link e anteprima",
    urlsValidating:"Verifica dei link…",
    urlInvalid:"Link non valido (deve iniziare con http o https)",
    urlUnreachable:"Impossibile caricare l'immagine — il link potrebbe essere rotto, bloccato o non essere un'immagine",
    urlOk:"Immagine valida",
    urlNotImage:"Il link non è un'immagine",
    urlsClear:"Svuota link",
    urlQueueTitle:"Coda link immagini",
    urlUploadBtn:"Carica immagini accettate",
    urlNoValid:"Nessun link immagine valido da caricare",
    urlAdded:"{n} link aggiunti per l'anteprima",
    urlsDuplicate:"Link duplicato — ignorato",
    errNoService:"Scegli un servizio di caricamento",
    errNotImage:"File non supportato (non è un'immagine)",
    errLarge:"La dimensione del file supera il limite del servizio",
    errType:"Tipo di immagine non supportato da questo servizio",
    errEmpty:"La coda di caricamento è vuota",
    errDup:"Un caricamento è già in corso",
    errNet:"Errore di rete — controlla la connessione",
    errSrv:"Caricamento dal server non riuscito",
    copied:"Copiato",
    copyFail:"Copia non riuscita — copia manualmente",
    direct:"Link diretto",
    html:"Codice HTML",
    bbcode:"BBCode",
    markdown:"Markdown",
    albumsTitle:"I miei album fotografici",
    albumsEmpty:"Ancora nessun album — carica la tua prima immagine",
    imagesWord:"immagini",
    createAlbum:"Crea album",
    rename:"Rinomina",
    delAlbum:"Elimina album",
    selAll:"Seleziona tutto",
    deselAll:"Deseleziona tutto",
    dlSel:"Scarica selezionate",
    dlAll:"Scarica tutte",
    delSel:"Elimina selezionate",
    confirmDelSel:"La selezione verrà rimossa solo dall'interfaccia del centro; le immagini ospitate NON vengono eliminate dal servizio. Continuare?",
    transfer:"Sposta in album",
    transferTitle:"Sposta le immagini selezionate",
    transferTo:"Nell'album",
    transferGo:"Sposta",
    sortByDate:"Prima le più recenti",
    sortByName:"Per nome",
    images:"immagini",
    backAlbums:"Torna agli album",
    backHome:"Home",
    noImages:"Nessuna immagine in questo album",
    confirmTitle:"Conferma eliminazione",
    confirmDelAlbum:"L'album e le sue immagini verranno rimossi solo dall'interfaccia del centro. Sei sicuro?",
    confirmDelImages:"Le immagini selezionate verranno rimosse solo dall'interfaccia del centro (non dal servizio di hosting). Continuare?",
    confirm:"Conferma",
    cancel:"Annulla",
    del:"Elimina",
    hostedOn:"Ospitata su",
    uploadedOn:"Caricata il",
    service:"Servizio",
    dimensions:"Dimensioni",
    size:"Dimensione",
    prev:"Precedente",
    next:"Successiva",
    open:"Apri link diretto",
    share:"Condividi",
    download:"Scarica",
    editIn:"Modifica nell'editor",
    shareVia:"Condividi tramite",
    whatsapp:"WhatsApp",
    telegram:"Telegram",
    x:"X",
    nativeShare:"Condivisione di sistema",
    edTitle:"Editor immagini",
    edOpen:"Scegli un'immagine da modificare",
    edHint:"Trascina un'immagine qui o clicca — il file originale non viene mai modificato",
    fromAlbum:"Apri immagine dagli album",
    crop:"Ritaglia",
    cropApply:"Applica ritaglio",
    cropCancel:"Annulla ritaglio",
    rotL:"Ruota a sinistra",
    rotR:"Ruota a destra",
    flipH:"Capovolgi orizzontale",
    flipV:"Capovolgi verticale",
    resize:"Ridimensiona",
    resizeW:"Larghezza (px)",
    brightness:"Luminosità",
    contrast:"Contrasto",
    saturation:"Saturazione",
    temperature:"Temperatura",
    exposure:"Esposizione",
    grayscale:"Scala di grigi",
    opacity:"Opacità",
    sharpness:"Nitidezza",
    blur:"Sfocatura",
    filters:"Filtri",
    undo:"Annulla",
    redo:"Ripeti",
    reset:"Reimposta",
    dlEdited:"Scarica copia modificata",
    upEdited:"Carica copia modificata",
    origSafe:"Il file originale rimane intatto",
    exifNote:"Le foto del telefono vengono orientate automaticamente (EXIF)",
    fmt:"Formato",
    keep:"Mantieni originale",
    historyTitle:"Cronologia dei caricamenti",
    historyEmpty:"Nessun caricamento registrato",
    historyClear:"Svuota cronologia",
    historyNote:"La cronologia è salvata solo nel tuo browser e non viene mai inviata",
    clearHistoryWarn:"Tutta la cronologia dei caricamenti verrà svuotata (le immagini caricate non sono interessate). Continuare?",
    settings:"Impostazioni caricamento",
    stripExif:"Rimuovi dati EXIF (privacy)",
    stripExifHint:"Rimuove i metadati fotocamera/posizione — l'immagine viene ricodificata",
    compress:"Comprimi prima del caricamento",
    quality:"Qualità",
    rememberService:"Ricorda l'ultimo servizio utilizzato",
    exportData:"Esporta backup",
    importData:"Importa backup",
    exportDone:"File di backup scaricato",
    importDone:"Dati importati e uniti — nessun link perso",
    importFail:"File non valido — importazione non riuscita",
    importConfirm:"Gli album e i link del file verranno uniti ai tuoi dati attuali, senza eliminare nulla. Continuare?",
    fRights:"Tutti i diritti riservati © 2025 | Sviluppatore: Awad Al-Sudani",
    fLove:"Realizzato con amore da Awad Al-Sudani",
    fNoSteal:"Non copiare o attribuire questo codice senza citare Awad Al-Sudani (almoatn.blogspot.com)",
    svcServimgN:"Caricamento in pagina tramite il servizio Forumotion (fino a 2 MB)",
    svcImgurN:"Veloce e gratuito (fino a 20 MB)",
    svcImgbbN:"Gratuito con miniature (fino a 32 MB)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"Impossibile aprire l'immagine — potrebbe essere danneggiata o in un formato non supportato",
    cropApplied:"Ritaglio applicato",
    exportFail:"Impossibile preparare l'immagine per il download",
    dlDone:"Copia modificata scaricata — il file originale è intatto",
    zipMaking:"Preparazione ZIP…",
    zipDone:"{n} immagini scaricate in ZIP",
    zipFail:"Impossibile creare il file ZIP",
    editingLoad:"Caricamento immagine nell'editor…",
    editorOpened:"Immagine aperta nell'editor",
    editFetchFail:"Impossibile recuperare l'immagine per la modifica (restrizioni di rete)",
    sortByAria:"Ordina immagini",
    delFromUI:"Immagine rimossa dall'interfaccia dell'album",
    transferDone:"Immagini spostate con successo",
    albumCreated:"Album «{name}» creato",
    noSelectionYet:"— nessuna immagine selezionata —",
    selLinks:"Link delle immagini selezionate",
    allLinks:"Link di tutte le immagini dell'album",
    copy:"Copia",
    chooseTargetAlbum:"Scegli l'album di destinazione",
    selectedImagesCount:"Immagini selezionate: {n}",
    another:"Altra immagine",
    fine:"Regolazioni fini",
    uploadSvc:"Servizio di caricamento",
    dlFmt:"Formato di download",
    enterName:"Inserisci il nome dell'album",
    exists:"Nome già esistente",
    pasteN:n=>""+n+" immagini aggiunte dagli appunti"
  },
  ru: {
    appName:"Центр изображений Softara",
    close:"Закрыть",saveFail:"Не удалось сохранить в браузере — проверьте место хранения и повторите попытку",
    tagline:"Загрузка · Редактор · Альбомы · Обмен",
    tabUpload:"Загрузка",
    tabAlbums:"Мои фото",
    tabEditor:"Редактор",
    tabHistory:"История",
    themeBtn:"Темы",
    langBtn:"Язык",
    dev:"Разработчик",
    themeHint:"Ваш выбор автоматически сохраняется для этого браузера",
    welcomeTitle:"Добро пожаловать в Центр изображений Softara",
    welcomeBody:"Добро пожаловать… дорогой друг, добро пожаловать в Центр изображений Softara для обмена и хранения изображений. Помните: Бог видит вас, когда вы загружаете свои изображения, — не используйте их во ослушание Бога.",
    welcomeNoticeTitle:"Наше единственное условие",
    welcomeNotice:"Добро пожаловать, уважаемый гость. Наше единственное условие — не загружать изображения, противоречащие учению нашей благородной религии.",
    themeBlueviolet:"Сине-фиолетовая",
    themeTeal:"Бирюзовая",
    themeLight:"Светлая",
    themeDark:"Тёмная",
    themeBlue:"Синяя",
    themePurple:"Фиолетовая",
    themeGreen:"Зелёная",
    themeNeutral:"Нейтральная",
    darkMode:"Тёмный режим",
    lightMode:"Светлый режим",
    resetTheme:"Восстановить тему по умолчанию",
    langMenu:"Выбор языка",
    langHint:"Ваш язык автоматически сохраняется для этого браузера",
    forumLinkTitle:"Посетить форум Softara (откроется в новой вкладке)",
    chooseService:"Выберите сервис загрузки",
    uploadFromDevice:"С устройства",
    uploadFromUrls:"По ссылкам",
    dropTitle:"Перетащите изображения сюда",
    dropSub:"или нажмите для выбора — можно также вставить через Ctrl+V",
    browse:"Выбрать файлы",
    queueTitle:"Очередь загрузки",
    selected:"выбрано",
    filesWord:"файл(ов)",
    totalSize:"Общий размер",
    limitWarn:"Внимание: общий размер превышает лимит {service} ({limit}) — слишком большие файлы будут отклонены",
    clearQueue:"Очистить очередь",
    startUpload:"Загрузить изображения",
    uploading:"Загрузка…",
    fetchingUploading:"Получение изображения и загрузка в сервис…",
    uploadDone:"Загрузка успешно завершена",
    someFailed:"Некоторые изображения не удалось загрузить",
    retry:"Повторить неудачные",
    cancelUpload:"Отменить загрузку",
    remove:"Убрать",
    moveUp:"Переместить вверх",
    moveDown:"Переместить вниз",
    pending:"В ожидании",
    stUp:"Загружается",
    stDone:"Готово",
    stErr:"Ошибка",
    stCancel:"Отменено",
    totalProgress:"Общий прогресс",
    saveTo:"Сохранить в альбом",
    generalAlbum:"Общий альбом",
    newAlbumPh:"Новый альбом…",
    newAlbumName:"Название нового альбома",
    yourLinks:"Ссылки на загруженные изображения",
    copyAll:"Копировать все ссылки",
    recentLinks:"Ссылки последней загрузки",
    linkFormats:"Формат ссылок",
    moreOptions:"Ещё варианты",
    uploadActions:"Действия загрузки",
    pasteAdded:"Добавлено изображений из буфера: {n}",
    savedSpace:"Вы сэкономили {pct}% размера",
    originalSize:"Оригинал",
    urlsTitle:"Загрузка изображений по ссылкам",
    urlsHint:"Одна ссылка на изображение в строке — можно добавить десятки ссылок за раз",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"Добавить ссылки и предпросмотр",
    urlsValidating:"Проверка ссылок…",
    urlInvalid:"Недействительная ссылка (должна начинаться с http или https)",
    urlUnreachable:"Не удалось загрузить изображение — ссылка может быть сломана, заблокирована или не является изображением",
    urlOk:"Действительное изображение",
    urlNotImage:"Ссылка не является изображением",
    urlsClear:"Очистить ссылки",
    urlQueueTitle:"Очередь ссылок на изображения",
    urlUploadBtn:"Загрузить принятые изображения",
    urlNoValid:"Нет действительных ссылок для загрузки",
    urlAdded:"Ссылок добавлено для предпросмотра: {n}",
    urlsDuplicate:"Повторная ссылка — пропущена",
    errNoService:"Пожалуйста, выберите сервис загрузки",
    errNotImage:"Неподдерживаемый файл (не изображение)",
    errLarge:"Размер файла превышает лимит сервиса",
    errType:"Тип изображения не поддерживается этим сервисом",
    errEmpty:"Очередь загрузки пуста",
    errDup:"Загрузка уже выполняется",
    errNet:"Ошибка сети — проверьте подключение",
    errSrv:"Сбой загрузки на сервере",
    copied:"Скопировано",
    copyFail:"Не удалось скопировать — скопируйте вручную",
    direct:"Прямая ссылка",
    html:"HTML-код",
    bbcode:"BBCode",
    markdown:"Markdown",
    albumsTitle:"Мои фотоальбомы",
    albumsEmpty:"Альбомов пока нет — загрузите первое изображение",
    imagesWord:"изображений",
    createAlbum:"Создать альбом",
    rename:"Переименовать",
    delAlbum:"Удалить альбом",
    selAll:"Выбрать все",
    deselAll:"Снять выделение",
    dlSel:"Скачать выбранные",
    dlAll:"Скачать все",
    delSel:"Удалить выбранные",
    confirmDelSel:"Выбор будет удалён только из интерфейса центра; изображения на хостинге НЕ удаляются. Продолжить?",
    transfer:"Переместить в альбом",
    transferTitle:"Перемещение выбранных изображений",
    transferTo:"В альбом",
    transferGo:"Переместить",
    sortByDate:"Сначала новые",
    sortByName:"По имени",
    images:"изображений",
    backAlbums:"Назад к альбомам",
    backHome:"Главная",
    noImages:"В этом альбоме нет изображений",
    confirmTitle:"Подтверждение удаления",
    confirmDelAlbum:"Альбом и его изображения будут удалены только из интерфейса центра. Вы уверены?",
    confirmDelImages:"Выбранные изображения будут удалены только из интерфейса центра (не с хостинга). Продолжить?",
    confirm:"Подтвердить",
    cancel:"Отмена",
    del:"Удалить",
    hostedOn:"Размещено на",
    uploadedOn:"Загружено",
    service:"Сервис",
    dimensions:"Размеры",
    size:"Размер",
    prev:"Назад",
    next:"Вперёд",
    open:"Открыть прямую ссылку",
    share:"Поделиться",
    download:"Скачать",
    editIn:"Редактировать",
    shareVia:"Поделиться через",
    whatsapp:"WhatsApp",
    telegram:"Telegram",
    x:"X",
    nativeShare:"Системный обмен",
    edTitle:"Редактор изображений",
    edOpen:"Выберите изображение для редактирования",
    edHint:"Перетащите изображение сюда или нажмите — исходный файл никогда не изменяется",
    fromAlbum:"Открыть изображение из альбомов",
    crop:"Обрезка",
    cropApply:"Применить обрезку",
    cropCancel:"Отменить обрезку",
    rotL:"Повернуть влево",
    rotR:"Повернуть вправо",
    flipH:"Отразить по горизонтали",
    flipV:"Отразить по вертикали",
    resize:"Изменить размер",
    resizeW:"Ширина (px)",
    brightness:"Яркость",
    contrast:"Контраст",
    saturation:"Насыщенность",
    temperature:"Температура",
    exposure:"Экспозиция",
    grayscale:"Оттенки серого",
    opacity:"Прозрачность",
    sharpness:"Резкость",
    blur:"Размытие",
    filters:"Фильтры",
    undo:"Отменить",
    redo:"Повторить",
    reset:"Сбросить",
    dlEdited:"Скачать изменённую копию",
    upEdited:"Загрузить изменённую копию",
    origSafe:"Исходный файл остаётся нетронутым",
    exifNote:"Фото с телефона автоматически ориентируются (EXIF)",
    fmt:"Формат",
    keep:"Как есть",
    historyTitle:"История загрузок",
    historyEmpty:"Загрузки пока не записаны",
    historyClear:"Очистить историю",
    historyNote:"История хранится только в вашем браузере и никуда не отправляется",
    clearHistoryWarn:"Вся история загрузок будет очищена (сами загруженные изображения не пострадают). Продолжить?",
    settings:"Настройки загрузки",
    stripExif:"Удалить данные EXIF (приватность)",
    stripExifHint:"Удаляет метаданные камеры/местоположения — изображение перекодируется",
    compress:"Сжимать перед загрузкой",
    quality:"Качество",
    rememberService:"Запомнить последний сервис",
    exportData:"Экспортировать резервную копию",
    importData:"Импортировать резервную копию",
    exportDone:"Файл резервной копии скачан",
    importDone:"Данные импортированы и объединены — ни одна ссылка не потеряна",
    importFail:"Недействительный файл — импорт не удался",
    importConfirm:"Альбомы и ссылки из файла будут объединены с вашими текущими данными без удаления чего-либо. Продолжить?",
    fRights:"Все права защищены © 2025 | Разработчик: Awad Al-Sudani",
    fLove:"Создано с любовью Awad Al-Sudani",
    fNoSteal:"Не копируйте и не присваивайте этот код без указания авторства Awad Al-Sudani (almoatn.blogspot.com)",
    svcServimgN:"Загрузка на странице через сервис Forumotion (до 2 МБ)",
    svcImgurN:"Быстро и бесплатно (до 20 МБ)",
    svcImgbbN:"Бесплатно с миниатюрами (до 32 МБ)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"Не удалось открыть изображение — возможно, оно повреждено или в неподдерживаемом формате",
    cropApplied:"Обрезка применена",
    exportFail:"Не удалось подготовить изображение для скачивания",
    dlDone:"Изменённая копия скачана — исходный файл не тронут",
    zipMaking:"Подготовка ZIP…",
    zipDone:"{n} изображений скачано в ZIP",
    zipFail:"Не удалось создать ZIP-файл",
    editingLoad:"Изображение загружается в редактор…",
    editorOpened:"Изображение открыто в редакторе",
    editFetchFail:"Не удалось получить изображение для редактирования (сетевые ограничения)",
    sortByAria:"Сортировать изображения",
    delFromUI:"Изображение удалено из интерфейса альбома",
    transferDone:"Изображения успешно перемещены",
    albumCreated:"Альбом «{name}» создан",
    noSelectionYet:"— изображения ещё не выбраны —",
    selLinks:"Ссылки выбранных изображений",
    allLinks:"Ссылки всех изображений альбома",
    copy:"Копировать",
    chooseTargetAlbum:"Выберите целевой альбом",
    selectedImagesCount:"Выбрано изображений: {n}",
    another:"Другое изображение",
    fine:"Тонкая настройка",
    uploadSvc:"Сервис загрузки",
    dlFmt:"Формат скачивания",
    enterName:"Введите название альбома",
    exists:"Такое название уже есть",
    pasteN:n=>"Добавлено изображений из буфера: "+n+""
  },
  hi: {
    appName:"सॉफ्टारा इमेज सेंटर",
    close:"बंद करें",saveFail:"ब्राउज़र में सहेजा नहीं जा सका — स्टोरेज स्थान जाँचें और फिर से प्रयास करें",
    tagline:"अपलोड · संपादन · व्यवस्था · साझा",
    tabUpload:"अपलोड",
    tabAlbums:"मेरी तस्वीरें",
    tabEditor:"संपादक",
    tabHistory:"इतिहास",
    themeBtn:"थीम",
    langBtn:"भाषा",
    dev:"डेवलपर",
    themeHint:"आपकी पसंद इस ब्राउज़र के लिए स्वतः सहेजी जाती है",
    welcomeTitle:"सॉफ्टारा इमेज सेंटर में आपका स्वागत है",
    welcomeBody:"स्वागत है… प्रिय मित्र, तस्वीरें साझा करने और संग्रहीत करने के सॉफ्टारा इमेज सेंटर में आपका स्वागत है। याद रखें कि आप जब तस्वीरें अपलोड करते हैं तो ईश्वर आपको देख रहा है — ईश्वर की आज्ञा के विरुद्ध उनका उपयोग न करें।",
    welcomeNoticeTitle:"हमारी एकमात्र शर्त",
    welcomeNotice:"आपका स्वागत है, प्रिय आगंतुक। हमारी एकमात्र शर्त है कि ऐसी तस्वीरें अपलोड न करें जो हमारे सच्चे धर्म की शिक्षाओं के विरुद्ध हों।",
    themeBlueviolet:"नीला-बैंगनी",
    themeTeal:"फ़िरोज़ा",
    themeLight:"हल्का",
    themeDark:"गहरा",
    themeBlue:"नीला",
    themePurple:"बैंगनी",
    themeGreen:"हरा",
    themeNeutral:"तटस्थ",
    darkMode:"डार्क मोड",
    lightMode:"लाइट मोड",
    resetTheme:"डिफ़ॉल्ट थीम पुनर्स्थापित करें",
    langMenu:"भाषा चुनें",
    langHint:"आपकी भाषा इस ब्राउज़र के लिए स्वतः सहेजी जाती है",
    forumLinkTitle:"सॉफ्टारा फोरम देखें (नए टैब में खुलेगा)",
    chooseService:"अपलोड सेवा चुनें",
    uploadFromDevice:"डिवाइस से",
    uploadFromUrls:"लिंक से",
    dropTitle:"छवियाँ यहाँ खींचें और छोड़ें",
    dropSub:"या चुनने के लिए क्लिक करें — Ctrl+V से पेस्ट भी कर सकते हैं",
    browse:"फ़ाइलें चुनें",
    queueTitle:"अपलोड क़तार",
    selected:"चयनित",
    filesWord:"फ़ाइल(ें)",
    totalSize:"कुल आकार",
    limitWarn:"चेतावनी: कुल आकार {service} की सीमा ({limit}) से अधिक है — बड़ी फ़ाइलें अस्वीकृत होंगी",
    clearQueue:"क़तार खाली करें",
    startUpload:"छवियाँ अपलोड करें",
    uploading:"अपलोड हो रहा है…",
    fetchingUploading:"छवि प्राप्त कर सेवा पर अपलोड की जा रही है…",
    uploadDone:"अपलोड सफलतापूर्वक पूर्ण",
    someFailed:"कुछ छवियाँ अपलोड नहीं हो सकीं",
    retry:"असफल को पुनः प्रयास करें",
    cancelUpload:"अपलोड रद्द करें",
    remove:"हटाएँ",
    moveUp:"ऊपर ले जाएँ",
    moveDown:"नीचे ले जाएँ",
    pending:"प्रतीक्षारत",
    stUp:"अपलोड हो रहा है",
    stDone:"पूर्ण",
    stErr:"असफल",
    stCancel:"रद्द",
    totalProgress:"कुल प्रगति",
    saveTo:"एल्बम में सहेजें",
    generalAlbum:"सामान्य एल्बम",
    newAlbumPh:"नया एल्बम…",
    newAlbumName:"नए एल्बम का नाम",
    yourLinks:"अपलोड की गई छवियों के लिंक",
    copyAll:"सभी लिंक कॉपी करें",
    recentLinks:"अंतिम अपलोड के लिंक",
    linkFormats:"लिंक प्रारूप",
    moreOptions:"अधिक विकल्प",
    uploadActions:"अपलोड क्रियाएँ",
    pasteAdded:"क्लिपबोर्ड से {n} छवि(याँ) जोड़ी गईं",
    savedSpace:"आपने {pct}% आकार बचाया",
    originalSize:"मूल",
    urlsTitle:"लिंक से छवियाँ अपलोड करें",
    urlsHint:"प्रति पंक्ति एक छवि लिंक लिखें — आप एक बार में दर्जनों लिंक जोड़ सकते हैं",
    urlsPlaceholder:"https://example.com/image1.jpg\nhttps://example.com/image2.png\nhttps://example.com/image3.webp",
    addUrls:"लिंक जोड़ें और पूर्वावलोकन करें",
    urlsValidating:"लिंक जाँचे जा रहे हैं…",
    urlInvalid:"अमान्य लिंक (http या https से शुरू होना चाहिए)",
    urlUnreachable:"छवि लोड नहीं हो सकी — लिंक टूटा, अवरुद्ध या छवि नहीं हो सकता",
    urlOk:"मान्य छवि",
    urlNotImage:"लिंक एक छवि नहीं है",
    urlsClear:"लिंक खाली करें",
    urlQueueTitle:"छवि लिंक क़तार",
    urlUploadBtn:"स्वीकृत छवियाँ अपलोड करें",
    urlNoValid:"अपलोड के लिए कोई मान्य छवि लिंक नहीं",
    urlAdded:"पूर्वावलोकन के लिए {n} लिंक जोड़े गए",
    urlsDuplicate:"डुप्लिकेट लिंक — छोड़ा गया",
    errNoService:"कृपया एक अपलोड सेवा चुनें",
    errNotImage:"असमर्थित फ़ाइल (छवि नहीं)",
    errLarge:"फ़ाइल का आकार सेवा की सीमा से अधिक है",
    errType:"यह छवि प्रकार इस सेवा द्वारा समर्थित नहीं है",
    errEmpty:"अपलोड क़तार खाली है",
    errDup:"एक अपलोड पहले से चल रहा है",
    errNet:"नेटवर्क त्रुटि — अपना कनेक्शन जाँचें",
    errSrv:"सर्वर अपलोड असफल",
    copied:"कॉपी हो गया",
    copyFail:"कॉपी नहीं हो सका — मैन्युअल रूप से कॉपी करें",
    direct:"सीधा लिंक",
    html:"HTML कोड",
    bbcode:"BBCode",
    markdown:"Markdown",
    albumsTitle:"मेरे फोटो एल्बम",
    albumsEmpty:"अभी कोई एल्बम नहीं — अपनी पहली छवि अपलोड करें",
    imagesWord:"छवियाँ",
    createAlbum:"एल्बम बनाएँ",
    rename:"नाम बदलें",
    delAlbum:"एल्बम हटाएँ",
    selAll:"सभी चुनें",
    deselAll:"चयन हटाएँ",
    dlSel:"चयनित डाउनलोड करें",
    dlAll:"सभी डाउनलोड करें",
    delSel:"चयनित हटाएँ",
    confirmDelSel:"चयन केवल केंद्र के इंटरफ़ेस से हटाया जाएगा; होस्ट की गई छवियाँ सेवा से नहीं हटतीं। जारी रखें?",
    transfer:"एल्बम में ले जाएँ",
    transferTitle:"चयनित छवियाँ ले जाएँ",
    transferTo:"एल्बम में",
    transferGo:"ले जाएँ",
    sortByDate:"नई पहले",
    sortByName:"नाम से",
    images:"छवियाँ",
    backAlbums:"एल्बम पर वापस",
    backHome:"होम",
    noImages:"इस एल्बम में कोई छवि नहीं",
    confirmTitle:"हटाने की पुष्टि",
    confirmDelAlbum:"एल्बम और उसकी छवियाँ केवल केंद्र के इंटरफ़ेस से हटाई जाएँगी। क्या आप निश्चित हैं?",
    confirmDelImages:"चयनित छवियाँ केवल केंद्र के इंटरफ़ेस से हटाई जाएँगी (होस्टिंग सेवा से नहीं)। जारी रखें?",
    confirm:"पुष्टि करें",
    cancel:"रद्द करें",
    del:"हटाएँ",
    hostedOn:"होस्ट: ",
    uploadedOn:"अपलोड तिथि",
    service:"सेवा",
    dimensions:"आयाम",
    size:"आकार",
    prev:"पिछली",
    next:"अगली",
    open:"सीधा लिंक खोलें",
    share:"साझा करें",
    download:"डाउनलोड",
    editIn:"संपादक में संपादित करें",
    shareVia:"साझा करें",
    whatsapp:"WhatsApp",
    telegram:"Telegram",
    x:"X",
    nativeShare:"सिस्टम साझा",
    edTitle:"छवि संपादक",
    edOpen:"संपादन के लिए छवि चुनें",
    edHint:"छवि यहाँ खींचें या क्लिक करें — मूल फ़ाइल कभी नहीं बदलती",
    fromAlbum:"एल्बम से छवि खोलें",
    crop:"क्रॉप",
    cropApply:"क्रॉप लागू करें",
    cropCancel:"क्रॉप रद्द करें",
    rotL:"बाएँ घुमाएँ",
    rotR:"दाएँ घुमाएँ",
    flipH:"क्षैतिज पलटें",
    flipV:"लंबवत पलटें",
    resize:"आकार बदलें",
    resizeW:"चौड़ाई (px)",
    brightness:"चमक",
    contrast:"कंट्रास्ट",
    saturation:"संतृप्ति",
    temperature:"तापमान",
    exposure:"एक्सपोज़र",
    grayscale:"ग्रेस्केल",
    opacity:"अपारदर्शिता",
    sharpness:"तीक्ष्णता",
    blur:"धुंधलापन",
    filters:"फ़िल्टर",
    undo:"पूर्ववत करें",
    redo:"पुनः करें",
    reset:"रीसेट",
    dlEdited:"संपादित प्रति डाउनलोड करें",
    upEdited:"संपादित प्रति अपलोड करें",
    origSafe:"मूल फ़ाइल अछूती रहती है",
    exifNote:"फ़ोन की तस्वीरें स्वतः सही दिशा में दिखती हैं (EXIF)",
    fmt:"प्रारूप",
    keep:"मूल रखें",
    historyTitle:"अपलोड इतिहास",
    historyEmpty:"अभी कोई अपलोड दर्ज नहीं",
    historyClear:"इतिहास खाली करें",
    historyNote:"इतिहास केवल आपके ब्राउज़र में सहेजा जाता है और कहीं नहीं भेजा जाता",
    clearHistoryWarn:"पूरा अपलोड इतिहास खाली कर दिया जाएगा (अपलोड की गई छवियाँ प्रभावित नहीं होंगी)। जारी रखें?",
    settings:"अपलोड सेटिंग्स",
    stripExif:"EXIF डेटा हटाएँ (गोपनीयता)",
    stripExifHint:"कैमरा/स्थान मेटाडेटा हटाता है — छवि पुनः एनकोड होती है",
    compress:"अपलोड से पहले संपीड़ित करें",
    quality:"गुणवत्ता",
    rememberService:"अंतिम उपयोग की सेवा याद रखें",
    exportData:"बैकअप निर्यात करें",
    importData:"बैकअप आयात करें",
    exportDone:"बैकअप फ़ाइल डाउनलोड हो गई",
    importDone:"डेटा आयात और मिलाया गया — कोई लिंक नहीं खोया",
    importFail:"अमान्य फ़ाइल — आयात असफल",
    importConfirm:"फ़ाइल के एल्बम और लिंक आपके वर्तमान डेटा के साथ बिना कुछ हटाए मिलाए जाएँगे। जारी रखें?",
    fRights:"सर्वाधिकार सुरक्षित © 2025 | डेवलपर: Awad Al-Sudani",
    fLove:"Awad Al-Sudani द्वारा प्रेम से निर्मित",
    fNoSteal:"Awad Al-Sudani (almoatn.blogspot.com) को श्रेय दिए बिना यह कोड कॉपी या पुनः-आवंटित न करें",
    svcServimgN:"Forumotion सेवा द्वारा पेज-में अपलोड (2 MB तक)",
    svcImgurN:"तेज़ और निःशुल्क (20 MB तक)",
    svcImgbbN:"थंबनेल सहित निःशुल्क (32 MB तक)",
    serviceImgur:"Imgur",
    serviceImgbb:"ImgBB",
    serviceServimg:"Servimg",
    editorLoadFail:"छवि नहीं खोली जा सकी — यह दूषित या असमर्थित प्रारूप में हो सकती है",
    cropApplied:"क्रॉप लागू हो गया",
    exportFail:"छवि डाउनलोड के लिए तैयार नहीं हो सकी",
    dlDone:"संपादित प्रति डाउनलोड हो गई — मूल फ़ाइल अछूती है",
    zipMaking:"ZIP तैयार हो रहा है…",
    zipDone:"{n} छवियाँ ZIP में डाउनलोड हुईं",
    zipFail:"ZIP फ़ाइल नहीं बन सकी",
    editingLoad:"छवि संपादक में लोड हो रही है…",
    editorOpened:"छवि संपादक में खुल गई",
    editFetchFail:"संपादन के लिए छवि प्राप्त नहीं हो सकी (नेटवर्क प्रतिबंध)",
    sortByAria:"छवियाँ क्रमबद्ध करें",
    delFromUI:"छवि एल्बम इंटरफ़ेस से हटा दी गई",
    transferDone:"छवियाँ सफलतापूर्वक स्थानांतरित हुईं",
    albumCreated:"एल्बम «{name}» बनाया गया",
    noSelectionYet:"— अभी कोई छवि चयनित नहीं —",
    selLinks:"चयनित छवियों के लिंक",
    allLinks:"एल्बम की सभी छवियों के लिंक",
    copy:"कॉपी करें",
    chooseTargetAlbum:"लक्ष्य एल्बम चुनें",
    selectedImagesCount:"चयनित छवियाँ: {n}",
    another:"दूसरी छवि",
    fine:"बारीक समायोजन",
    uploadSvc:"अपलोड सेवा",
    dlFmt:"डाउनलोड प्रारूप",
    enterName:"एल्बम का नाम दर्ज करें",
    exists:"नाम पहले से मौजूद है",
    pasteN:n=>"क्लिपबोर्ड से "+n+" छवि(याँ) जोड़ी गईं"
  }
};

/* ---------- 2) الثيمات — 6 عائلات لونية × وضع فاتح/داكن (v2.1) ---------- */
const THEMES = [
  {id:"blueviolet", sw:"#7c3aed", bg:"#f7f5ff"},
  {id:"teal",       sw:"#0f766e", bg:"#f8fafc"},
  {id:"blue",       sw:"#1d4ed8", bg:"#f2f7ff"},
  {id:"purple",     sw:"#7c3aed", bg:"#faf7ff"},
  {id:"green",      sw:"#16a34a", bg:"#f2fbf4"},
  {id:"neutral",    sw:"#57534e", bg:"#f6f5f2"}
];
const DEFAULT_THEME="blueviolet", DEFAULT_MODE="light";
/** ترحيل معرفات الثيمات القديمة (light/dark) إلى عائلة + وضع */
function normalizeTheme(raw){
  if(raw==="dark")return{theme:"teal",mode:"dark"};
  if(raw==="light")return{theme:"teal",mode:"light"};
  if(raw&&THEMES.some(t=>t.id===raw))return{theme:raw,mode:"light"};
  return{theme:DEFAULT_THEME,mode:DEFAULT_MODE};
}

/* ---------- 3) بيانات اعتماد Servimg (مغلفة — راجع دليل التوثيق) ---------- */
/* التغليف يمنع النسخ النصي المباشر فقط وليس حماية كاملة؛
   الحل الأكمل هو وسيط خادمي — انظر قسم الأمان في الدليل. */
/* بيانات اعتماد Servimg تُقرأ من صفحة المنتدى نفسها (window.SoftaraIC.creds)
   حتى لا تُوضع أي بيانات سرية في الملفات العامة على CDN — راجع الدليل */
const _sc = Object.assign({e:"",p:""}, ((typeof window!=="undefined"&&window.SoftaraIC)||{}).creds||{});
function servCreds(){ return { email: _sc.e, password: atob(_sc.p) }; }

/* ---------- 4) حدود الخدمات ---------- */
const LIMITS = {
  imgur:   { types:["image/jpeg","image/png","image/gif","image/webp","image/bmp","image/tiff"], max:20*1024*1024, label:"Imgur" },
  imgbb:   { types:["image/jpeg","image/png","image/gif","image/webp","image/bmp","image/tiff"], max:32*1024*1024, label:"ImgBB" },
  servimg: { types:["image/jpeg","image/png","image/gif","image/bmp","image/tiff","image/webp"], max:2*1024*1024, label:"Servimg" }
};

/* ---------- 5) المخزن + الترحيل ---------- */
const STORE_KEY="softara_ic_v2", MIG_FLAG="softara_ic_migrated",
      LEG_H11="sudanet_albums", LEG_H15="softara_albums_v1";
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,9);
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

function emptyStore(){return{version:2,albums:[{id:"general",title:"ألبوم عام",images:[],createdAt:new Date().toISOString()}],history:[],settings:{theme:"blueviolet",mode:"light",lang:"ar",service:"imgbb",stripExif:false,compress:false,quality:.85,fmt:"keep",rememberService:true}}}

function migrateH11(){
  try{const raw=localStorage.getItem(LEG_H11);if(!raw)return[];
    const p=JSON.parse(raw);if(!Array.isArray(p))return[];
    return p.map(a=>({id:String(a.id||uid()),title:a.title||"ألبوم",createdAt:a.createdAt||new Date().toISOString(),
      images:(a.images||[]).map(i=>({id:String(i.id||uid()),url:i.url,name:i.fileName||"صورة",
        service:/i\.ibb\.co|imgbb/.test(i.url)?"imgbb":"imgur",uploadedAt:i.uploadedAt||new Date().toISOString()}))}));
  }catch(e){return[]}
}
function migrateH15(){
  try{const raw=localStorage.getItem(LEG_H15);if(!raw)return[];
    const p=JSON.parse(raw);if(!p||!Array.isArray(p.albums))return[];
    const map=new Map();
    p.albums.forEach(n=>map.set(n,{id:"h15-"+Array.from(n).map(c=>c.codePointAt(0).toString(36)).join("").slice(0,24),title:n,images:[],createdAt:new Date().toISOString()}));
    (p.images||[]).forEach(img=>{
      const al=map.get(img.album)||map.values().next().value;if(!al)return;
      al.images.push({id:String(img.id||uid()),url:img.direct,name:img.name||"صورة",service:"servimg",uploadedAt:new Date().toISOString()});
    });
    return Array.from(map.values());
  }catch(e){return[]}
}

function loadStore(){
  let store=emptyStore();
  try{const raw=localStorage.getItem(STORE_KEY);
    if(raw){const p=JSON.parse(raw);
      store={version:2,albums:Array.isArray(p.albums)?p.albums:store.albums,
        history:Array.isArray(p.history)?p.history.slice(0,200):[],
        settings:Object.assign(emptyStore().settings,p.settings||{})};
        const nt=normalizeTheme(p.settings&&p.settings.theme);
        store.settings.theme=nt.theme;
        store.settings.mode=(p.settings&&p.settings.mode==="dark")?"dark":nt.mode;}
  }catch(e){}
  try{
    if(!localStorage.getItem(MIG_FLAG)){
      const legacy=[...migrateH11(),...migrateH15()];
      if(legacy.length){
        const titles=new Set(store.albums.map(a=>a.title));
        legacy.forEach(al=>{
          if(titles.has(al.title)){
            const tgt=store.albums.find(a=>a.title===al.title);const urls=new Set(tgt.images.map(i=>i.url));
            al.images.forEach(im=>{if(!urls.has(im.url))tgt.images.push(im)});
          }else store.albums.push(al);
        });
      }
      localStorage.setItem(MIG_FLAG,new Date().toISOString());
      saveStore(store);
    }
  }catch(e){}
  return store;
}
function saveStore(s){try{localStorage.setItem(STORE_KEY,JSON.stringify(s));return true}catch(e){return false}}

let store=loadStore();
/* لغة أول زيارة: تُكتشف من المتصفح ثم تُحفظ (احتياطي: العربية) */
if(!localStorage.getItem(STORE_KEY)){
  try{
    const cands=[...(navigator.languages||[]),navigator.language].filter(Boolean).map(x=>String(x).toLowerCase());
    const supported=["ar","en","fr","es","de","tr","pt","it","ru","hi"];
    let detected="ar";
    for(const c of cands){
      const ex=supported.find(l=>c===l);if(ex){detected=ex;break}
      const px=supported.find(l=>c.startsWith(l+"-")||c.startsWith(l+"_"));if(px){detected=px;break}
    }
    store.settings.lang=detected;
    const th=normalizeTheme(localStorage.getItem("softara_theme"));
    store.settings.theme=th.theme;store.settings.mode=th.mode;
  }catch(e){}
}
/* persist: يعرض سبب الفشل ويوقف تسلسل العملية (لا نجاح وهمي) */
function persist(){if(!saveStore(store)){toast(T().saveFail,"err");throw new Error("SoftaraIC: persist failed")}}
/* tryPersist: للعمليات التي تحتاج إرجاع الحالة عند الفشل */
function tryPersist(){const ok=saveStore(store);if(!ok)toast(T().saveFail,"err");return ok}

/* ---------- 6) أدوات ---------- */
const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>Array.from(el.querySelectorAll(s));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function fmtBytes(b){if(b==null||isNaN(b))return"—";const ar=(typeof store!=="undefined"&&store.settings&&store.settings.lang==="ar");const u=ar?["بايت","ك.ب","م.ب","ج.ب"]:["B","KB","MB","GB"];let i=0,n=b;while(n>=1024&&i<3){n/=1024;i++}return n.toFixed(n>=10||i===0?0:1)+" "+u[i]}
function fmtDate(iso){try{return new Date(iso).toLocaleDateString((typeof store!=="undefined"&&store.settings&&store.settings.lang==="ar")?"ar":"en",{year:"numeric",month:"short",day:"numeric"})}catch(e){return String(iso||"").slice(0,10)}}
function toast(msg,type){const el=document.createElement("div");el.className="toast "+(type||"");el.textContent=msg;$("#toasts").appendChild(el);setTimeout(()=>{el.style.opacity="0";el.style.transition="opacity .3s";setTimeout(()=>el.remove(),300)},2600)}
async function copyText(t){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(t);return true}}catch(e){}
  try{const ta=document.createElement("textarea");ta.value=t;ta.style.cssText="position:fixed;opacity:0";document.body.appendChild(ta);ta.focus();ta.select();const ok=document.execCommand("copy");ta.remove();return ok}catch(e){return false}}
function buildLink(url,fmt,name){name=name||"image";switch(fmt){case"html":return`<img src="${url}" alt="${name}" />`;case"bbcode":return`[img]${url}[/img]`;case"markdown":return`![${name}](${url})`;default:return url}}
function downloadBlob(blob,name){const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}
async function downloadUrl(url,name){try{const r=await fetch(url,{mode:"cors"});if(!r.ok)throw 0;downloadBlob(await r.blob(),name)}catch(e){window.open(url,"_blank","noopener")}}
function dimsOf(blob){return new Promise(res=>{const u=URL.createObjectURL(blob),im=new Image();im.onload=()=>res({w:im.naturalWidth,h:im.naturalHeight});im.onerror=()=>res({w:0,h:0});im.src=u})}
async function reEncode(file,q,fmt){
  try{
    const bmp=await createImageBitmap(file,{imageOrientation:"from-image"});
    const c=document.createElement("canvas");c.width=bmp.width;c.height=bmp.height;
    const ctx=c.getContext("2d");ctx.drawImage(bmp,0,0);bmp.close&&bmp.close();
    let t=fmt==="keep"?(file.type==="image/png"?"image/png":"image/jpeg"):fmt;
    if(t==="image/gif"||t==="image/bmp"||t==="image/tiff")t="image/png";
    const blob=await new Promise(r=>c.toBlob(r,t,t==="image/png"?undefined:q));
    return blob||file;
  }catch(e){return file}
}
async function nativeShare(url,title){
  if(navigator.share){try{await navigator.share({title,url});return}catch(e){if(e&&e.name==="AbortError")return}}
  window.open("https://wa.me/?text="+encodeURIComponent(title+" "+url),"_blank","noopener");
}
function socialShare(kind,url,title){
  const u=encodeURIComponent(url),t=encodeURIComponent(title||url);
  const urls={whatsapp:`https://wa.me/?text=${encodeURIComponent((title||"")+" "+url)}`,telegram:`https://t.me/share/url?url=${u}&text=${t}`,x:`https://twitter.com/intent/tweet?url=${u}&text=${t}`};
  window.open(urls[kind],"_blank","noopener");
}
function lazyScript(src){return new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`))return res();const s=document.createElement("script");s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)})}

/* ---------- 7) رفع الخدمات (مباشر من المتصفح) ---------- */
function xhrPost(url,formData,onProgress,headers){
  return new Promise(res=>{
    const xhr=new XMLHttpRequest();xhr.open("POST",url,true);
    if(headers)Object.entries(headers).forEach(([k,v])=>xhr.setRequestHeader(k,v));
    xhr.upload.onprogress=e=>{if(e.lengthComputable&&onProgress)onProgress(Math.round(e.loaded/e.total*100))};
    let done=false;const fin=r=>{if(!done){done=true;res(r)}};
    xhr.onload=()=>fin({ok:xhr.status>=200&&xhr.status<300,status:xhr.status,text:xhr.responseText});
    xhr.onerror=()=>fin({ok:false,error:"network"});
    xhr.onabort=()=>fin({ok:false,error:"aborted"});
    xhr.ontimeout=()=>fin({ok:false,error:"timeout"});
    xhr.send(formData);
    return xhr;
  });
}
async function uploadTo(service,file,name,onProgress,abortReg){
  const limits=LIMITS[service];
  if(file.size>limits.max) return {ok:false,msg:T().errLarge+" ("+limits.label+" — "+fmtBytes(limits.max)+")"};
  let payload=file;
  if(store.settings.stripExif||store.settings.compress){payload=await reEncode(file,store.settings.quality,store.settings.fmt)}
  const fd=new FormData();
  if(service==="imgur"){
    fd.append("image",payload,name||"image");
    const p=xhrPost("https://api.imgur.com/3/image",fd,onProgress,{"Authorization":"Client-ID "+atob(IMGUR_ID)});abortReg&&abortReg(p.abort);
    const r=await p;
    if(!r.ok)return{ok:false,msg:T().errSrv};
    try{const d=JSON.parse(r.text);
      if(d.success&&d.data&&d.data.link)return{ok:true,url:d.data.link,w:d.data.width,h:d.data.height};
      return{ok:false,msg:T().errSrv};
    }catch(e){return{ok:false,msg:T().errSrv}}
  }
  if(service==="imgbb"){
    fd.append("image",payload,name||"image");
    const p=xhrPost("https://api.imgbb.com/1/upload?key="+atob(IMGBB_KEY),fd,onProgress);abortReg&&abortReg(p.abort);
    const r=await p;
    if(!r.ok)return{ok:false,msg:T().errSrv};
    try{const d=JSON.parse(r.text);
      if(d.success&&d.data&&d.data.url)return{ok:true,url:d.data.url,thumb:d.data.thumb&&d.data.thumb.url,w:d.data.width,h:d.data.height};
      return{ok:false,msg:T().errSrv};
    }catch(e){return{ok:false,msg:T().errSrv}}
  }
  /* servimg — نفس آلية أحلى منتدى الرسمية، والنتيجة تُعرض داخل الصفحة */
  const cr=servCreds();
  fd.append("pic_file",payload,name||"image.png");
  fd.append("cat_id","0");fd.append("email",cr.email);fd.append("password",cr.password);
  fd.append("opener","logo");fd.append("fa_url","softara.yoo7.com");fd.append("resize_width","0");
  const p=xhrPost("https://servimg.com/fa_upload.php",fd,onProgress);abortReg&&abortReg(p.abort);
  const r=await p;
  if(!r.ok)return{ok:false,msg:T().errSrv};
  if(/Wrong login/i.test(r.text))return{ok:false,msg:"بيانات حساب Servimg غير صحيحة"};
  const doc=new DOMParser().parseFromString(r.text,"text/html");
  const linkEl=doc.querySelector('#link,input[name="direct_link"]')||(()=>{const m=r.text.match(/value="(https?:\/\/i\d+\.servimg\.com\/[^"]+)"/);return m?{value:m[1]}:null})();
  if(!linkEl||!linkEl.value)return{ok:false,msg:T().errSrv};
  const picEl=doc.querySelector('img#new_pic');
  const thumb=picEl?picEl.getAttribute("src"):linkEl.value.replace(/\/([^/]+)$/,"/th/$1");
  return{ok:true,url:linkEl.value,thumb};
}
/* مفتاح ImgBB — يُقرأ من تغليف مماثل (راجع الدليل لتغييره) */
const IMGBB_KEY=((typeof window!=="undefined"&&window.SoftaraIC&&window.SoftaraIC.creds)||{}).imgbb||"";
const IMGUR_ID=((typeof window!=="undefined"&&window.SoftaraIC&&window.SoftaraIC.creds)||{}).imgur||"";

/* ---------- 7ب) رفع من الروابط الخارجية (v2.1) ----------
 * يُمرَّر الرابط إلى خدمة الاستضافة وتجلبه خوادمها هي (Imgur/ImgBB/Servimg
 * تدعم ذلك رسميًا) — لا يوجد وسيط مفتوح من جهتنا ولا وصول لأي عنوان داخلي.
 */
function validUrlFormat(u){try{const x=new URL(u.trim());return x.protocol==="http:"||x.protocol==="https:"}catch(e){return false}}
function nameFromUrl(u){try{const x=new URL(u);const last=decodeURIComponent(x.pathname.split("/").filter(Boolean).pop()||"");return last.split("?")[0].slice(0,60).trim()||x.hostname}catch(e){return"image"}}
function probeUrl(url){return new Promise(res=>{let done=false;const im=new Image();
  const to=setTimeout(()=>{if(!done){done=true;res({ok:false,reason:"unreachable"})}},15000);
  im.onload=()=>{if(done)return;done=true;clearTimeout(to);res(im.naturalWidth>0?{ok:true,w:im.naturalWidth,h:im.naturalHeight}:{ok:false,reason:"invalid"})};
  im.onerror=()=>{if(done)return;done=true;clearTimeout(to);res({ok:false,reason:"unreachable"})};
  im.referrerPolicy="no-referrer";im.src=url})}
async function uploadUrlTo(service,url,abortReg){
  const fd=new FormData();
  if(service==="imgur"){
    fd.append("image",url);
    const p=xhrPost("https://api.imgur.com/3/image",fd,null,{"Authorization":"Client-ID "+atob(IMGUR_ID)});abortReg&&abortReg(p.abort);
    const r=await p;
    if(!r.ok)return{ok:false,msg:T().errSrv};
    try{const d=JSON.parse(r.text);
      if(d.success&&d.data&&d.data.link)return{ok:true,url:d.data.link,w:d.data.width,h:d.data.height};
      return{ok:false,msg:T().errSrv}}catch(e){return{ok:false,msg:T().errSrv}}
  }
  if(service==="imgbb"){
    fd.append("image",url);
    const p=xhrPost("https://api.imgbb.com/1/upload?key="+atob(IMGBB_KEY),fd,null);abortReg&&abortReg(p.abort);
    const r=await p;
    if(!r.ok)return{ok:false,msg:T().errSrv};
    try{const d=JSON.parse(r.text);
      if(d.success&&d.data&&d.data.url)return{ok:true,url:d.data.url,thumb:d.data.thumb&&d.data.thumb.url,w:d.data.width,h:d.data.height};
      return{ok:false,msg:T().errSrv}}catch(e){return{ok:false,msg:T().errSrv}}
  }
  const cr=servCreds();
  fd.append("pic_url",url);fd.append("cat_id","0");fd.append("email",cr.email);fd.append("password",cr.password);
  fd.append("opener","logo");fd.append("fa_url","softara.yoo7.com");fd.append("resize_width","0");
  const p=xhrPost("https://servimg.com/fa_upload.php",fd,null);abortReg&&abortReg(p.abort);
  const r=await p;
  if(!r.ok)return{ok:false,msg:T().errSrv};
  if(/Wrong login/i.test(r.text))return{ok:false,msg:"بيانات حساب Servimg غير صحيحة"};
  const doc=new DOMParser().parseFromString(r.text,"text/html");
  const linkEl=doc.querySelector('#link,input[name="direct_link"]')||(()=>{const m=r.text.match(/value="(https?:\/\/i\d+\.servimg\.com\/[^"]+)"/);return m?{value:m[1]}:null})();
  if(!linkEl||!linkEl.value)return{ok:false,msg:T().errSrv};
  const picEl=doc.querySelector('img#new_pic');
  const thumb=picEl?picEl.getAttribute("src"):linkEl.value.replace(/\/([^/]+)$/,"/th/$1");
  return{ok:true,url:linkEl.value,thumb};
}
async function addUrls(){
  const ta=$("#urlTa");if(!ta)return;
  const lines=ta.value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  if(!lines.length){toast(T().errEmpty,"err");return}
  const existing=new Set(urlQueue.map(u=>u.url));
  const fresh=[];let dup=0,inv=0;
  for(const l of lines){
    if(!validUrlFormat(l)){inv++;continue}
    if(existing.has(l)){dup++;continue}
    existing.add(l);fresh.push(l);
  }
  if(inv)toast(T().urlInvalid,"err");
  if(!fresh.length){renderUpload();return}
  fresh.forEach(u=>urlQueue.push({uid:uid(),url:u,name:nameFromUrl(u),status:"valid"}));
  ta.value="";
  checkingUrls=true;renderUpload();
  await Promise.all(urlQueue.filter(it=>it.status==="valid"&&fresh.indexOf(it.url)>=0).map(it=>probeUrl(it.url).then(r=>{
    if(r.ok){it.w=r.w;it.h=r.h}
    else{it.status="invalid";it.error=(r.reason==="invalid")?T().urlNotImage:T().urlUnreachable}
  })));
  checkingUrls=false;renderUpload();
  toast((T().urlAdded||"").replace("{n}",String(fresh.length))+(dup?" · "+T().urlsDuplicate:""));
}
async function startUrlUpload(){
  if(uploading){toast(T().errDup,"err");return}
  const valid=urlQueue.filter(q=>q.status==="valid");
  if(!valid.length){toast(T().urlNoValid,"err");return}
  const startTarget={album:selectedAlbumId||"",newName:(function(){const el=$("#newAlbumU");return el?el.value.trim():""})()};
  uploading=true;results=[];renderUpload();
  const svc=store.settings.service;
  const uploaded=[];let failed=0,doneCount=0;
  for(const it of valid){
    if(it.status!=="valid")continue;
    if(!urlQueue.some(q=>q.uid===it.uid&&q.status==="valid"))continue;
    it.status="up";renderUpload();
    const r=await uploadUrlTo(svc,it.url,ab=>activeUploads.add(ab));
    activeUploads.forEach(x=>{try{x()}catch(e){}});activeUploads.clear();
    if(r.ok){
      it.status="done";
      const img={id:uid(),url:r.url,thumb:r.thumb||r.url,name:it.name,service:svc,sourceUrl:it.url,w:r.w,h:r.h,uploadedAt:new Date().toISOString()};
      uploaded.push(img);results.push(img);
    }else{
      it.status="err";it.error=r.msg||T().errNet;failed++;
    }
    doneCount++;
    const tb=$("#urlTotalBar");if(tb)tb.style.width=Math.round(doneCount/valid.length*100)+"%";
    renderUpload();
  }
  if(uploaded.length){
    let target=startTarget.album||"general";
    const newName=startTarget.newName;
    let newAl=null;
    if(newName){
      const ex=store.albums.find(a=>a.title===newName);
      if(ex)target=ex.id;else{newAl={id:uid(),title:newName,images:[],createdAt:new Date().toISOString()};store.albums.push(newAl);target=newAl.id;toast(itpl(T().albumCreated,{name:newName}),"ok")}
    }
    const al=store.albums.find(a=>a.id===target)||store.albums[0];
    const urls=new Set(al.images.map(i=>i.url));
    uploaded.forEach(im=>{if(!urls.has(im.url))al.images.push(im)});
    uploaded.forEach(im=>store.history.unshift(Object.assign({albumTitle:al.title},im)));
    store.history=store.history.slice(0,200);
    if(tryPersist())toast(`${T().uploadDone} (${uploaded.length})`,"ok");
    else{
      uploaded.forEach(im=>{al.images=al.images.filter(i=>i.url!==im.url)});
      if(newAl)store.albums=store.albums.filter(a=>a!==newAl);
      uploaded.forEach(im=>{const ix=store.history.indexOf(im);if(ix>=0)store.history.splice(ix,1)});
    }
  }
  if(failed)toast(`${T().someFailed} (${failed})`,"err");
  uploading=false;renderUpload();refreshUI();
}

/* ---------- 8) الحالة العامة ---------- */
let T_=I18N[store.settings.lang]||I18N.ar;
function T(){return T_}
/** استبدال القوالب {key} في النص */
function itpl(tpl,vars){return String(tpl).replace(/\{(\w+)\}/g,(m,k)=>vars&&vars[k]!==undefined?vars[k]:m)}
function setLang(l){
  if(!I18N[l])return;
  store.settings.lang=l;T_=I18N[l];persist();
  document.documentElement.lang=l;
  document.documentElement.dir=(l==="ar")?"rtl":"ltr";
  renderAll();
}
function setTheme(id){store.settings.theme=id;persist();applyThemeToDom();renderThemes()}
function setMode(m){store.settings.mode=(m==="dark")?"dark":"light";persist();applyThemeToDom();renderThemes();updateModeBtn()}
function applyThemeToDom(){
  document.documentElement.setAttribute("data-theme",store.settings.theme||DEFAULT_THEME);
  document.documentElement.setAttribute("data-mode",store.settings.mode||"light");
  try{localStorage.setItem("softara_theme_v2",JSON.stringify({theme:store.settings.theme,mode:store.settings.mode}))}catch(e){}
}
function toggleMode(){setMode(store.settings.mode==="dark"?"light":"dark")}
function updateModeBtn(){
  const b=$("#modeBtn");if(!b)return;
  const dark=store.settings.mode==="dark";
  b.setAttribute("aria-pressed",dark?"true":"false");
  b.title=dark?T().lightMode:T().darkMode;
  b.setAttribute("aria-label",dark?T().lightMode:T().darkMode);
  $("#modeIcon").innerHTML=dark
    ?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>'
    :'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
}

let activeTab="upload";
let openAlbumId=null;
let queue=[];         // طابور الرفع
let srcTab="device";  // مصدر الرفع: device | urls (v2.1)
let urlQueue=[];      // طابور الروابط (v2.1)
let checkingUrls=false;
let uploading=false;
let results=[];       // نتائج آخر رفع
let linkFmt="direct";
let albumLinkFmt="direct";
let albumSel=new Set(), albumGridSel=new Set();
let albumSort="date";
let editor=null;      // حالة المحرر

/* ---------- 9) بناء الهيكل الثابت ---------- */
const TABS=[
  {id:"upload",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>'},
  {id:"albums",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>'},
  {id:"editor",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>'},
  {id:"history",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>'}
];
function renderTabs(){
  const nav=$("#tabs");nav.innerHTML="";
  TABS.forEach(t=>{
    let badge="";
    if(t.id==="albums"){const n=store.albums.reduce((a,x)=>a+x.images.length,0);if(n)badge=`<span class="bdg">${n}</span>`}
    if(t.id==="history"&&store.history.length)badge=`<span class="bdg">${store.history.length}</span>`;
    const b=document.createElement("button");b.type="button";b.className="tab"+(activeTab===t.id?" on":"");
    b.setAttribute("aria-current",activeTab===t.id?"page":"false");
    b.innerHTML=t.icon+`<span>${T()["tab"+t.id[0].toUpperCase()+t.id.slice(1)]||t.id}</span>`+badge;
    b.onclick=()=>{activeTab=t.id;renderTabs();renderViews()};
    nav.appendChild(b);
  });
}
function renderThemes(){
  const g=$("#themeGrid");g.innerHTML="";
  THEMES.forEach(th=>{
    const lbl=T()["theme"+th.id[0].toUpperCase()+th.id.slice(1)]||th.id;
    const b=document.createElement("button");b.type="button";b.className="titem"+(store.settings.theme===th.id?" on":"");
    b.setAttribute("role","menuitemradio");b.setAttribute("aria-checked",store.settings.theme===th.id);
    b.setAttribute("title",lbl);
    b.innerHTML=`<span class="sw" style="background:${th.bg}"><i style="background:${th.sw}"></i></span><span>${lbl}</span>`;
    b.onclick=()=>setTheme(th.id);
    g.appendChild(b);
  });
  const pop=$("#themePop");
  if(pop&&!$("#modeRow")){
    const row=document.createElement("div");row.className="tmode";row.id="modeRow";
    row.innerHTML=`
      <button type="button" id="modeLight" class="${store.settings.mode!=="dark"?"on":""}" aria-pressed="${store.settings.mode!=="dark"}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        <span>${T().lightMode}</span></button>
      <button type="button" id="modeDark" class="${store.settings.mode==="dark"?"on":""}" aria-pressed="${store.settings.mode==="dark"}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        <span>${T().darkMode}</span></button>`;
    pop.appendChild(row);
    $("#modeLight").onclick=()=>setMode("light");
    $("#modeDark").onclick=()=>setMode("dark");
    const rs=document.createElement("button");rs.type="button";rs.className="treset";rs.id="themeReset";
    rs.innerHTML=`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg><span>${T().resetTheme}</span>`;
    rs.onclick=()=>{setTheme(DEFAULT_THEME);setMode(DEFAULT_MODE)};
    pop.appendChild(rs);
  } else if($("#modeRow")){
    $("#modeLight").classList.toggle("on",store.settings.mode!=="dark");
    $("#modeDark").classList.toggle("on",store.settings.mode==="dark");
  }
}
/* قائمة اللغات — عشر لغات */
const LANGS=[["ar","العربية"],["en","English"],["fr","Français"],["es","Español"],["de","Deutsch"],["tr","Türkçe"],["pt","Português"],["it","Italiano"],["ru","Русский"],["hi","हिन्दी"]];
function renderLangs(){
  const pop=$("#langPop");if(!pop)return;
  pop.innerHTML=LANGS.map(([code,native])=>`
    <button type="button" role="menuitem" class="langitem ${store.settings.lang===code?"on":""}" data-lang="${code}" dir="${code==="ar"?"rtl":"ltr"}">
      <span>${native}</span>
      ${store.settings.lang===code?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>':""}
    </button>`).join("");
  $$("[data-lang]",pop).forEach(b=>b.onclick=()=>{setLang(b.dataset.lang);$("#langPop").classList.remove("open")});
}
function renderStaticLangBtn(){const el=$("#tLangBtn");if(el)el.textContent=T().langBtn}
function renderStatic(){
  /* الهوية: BRAND (من الصفحة المشغِّلة) أولًا، ثم الترجمة الافتراضية لكل لغة */
  const appN=BRAND.appName||T().appName;
  $("#tAppName").textContent=appN;
  try{document.title=appN}catch(e){}
  $("#tTagline").textContent=BRAND.tagline||T().tagline;
  $("#tThemeBtn").textContent=T().themeBtn;$("#tLangBtn").textContent=T().langBtn;$("#tDev").textContent=T().dev;
  $("#tThemeHint").textContent=T().themeHint;
  if(BRAND.logoSvg){const mk=$("#brandBox .mark");if(mk)mk.innerHTML=BRAND.logoSvg}
  const bb=$("#brandBox");if(bb){bb.title=BRAND.brandLinkTitle||T().forumLinkTitle;if(BRAND.homeUrl)bb.setAttribute("href",BRAND.homeUrl)}
  const wn=$("#welcomeTitle");if(wn)wn.textContent=BRAND.welcomeTitle||T().welcomeTitle;
  const wb=$("#welcomeBody");if(wb)wb.textContent=T().welcomeBody;
  const nt=$("#noticeText");if(nt)nt.innerHTML="<b>"+T().welcomeNoticeTitle+": </b>"+T().welcomeNotice;
  $("#fRights").innerHTML=BRAND.footerText?esc(BRAND.footerText):(T().fRights+'<a href="'+esc(BRAND.devUrl||"https://almoatn.blogspot.com/")+'" target="_blank" rel="noopener">'+esc(BRAND.devName||"almoatn.blogspot.com")+"</a>");
  $("#fLove").textContent=T().fLove;$("#fNoSteal").textContent=T().fNoSteal;
  renderThemes();renderLangs();renderTabs();updateModeBtn();
}
function renderViews(){
  $$(".view").forEach(v=>v.classList.add("hidden"));
  const v=$("#view-"+activeTab);v.classList.remove("hidden");v.classList.remove("fade");void v.offsetWidth;v.classList.add("fade");
  if(activeTab==="upload")renderUpload();
  if(activeTab==="albums")renderAlbums();
  if(activeTab==="editor")renderEditor();
  if(activeTab==="history")renderHistory();
}
function renderAll(){renderStatic();renderViews()}
/* تحديث فوري موحّد لكل أجزاء الواجهة المرتبطة بعملية ما (بدون إعادة تحميل الصفحة) */
function refreshUI(){renderTabs();if(activeTab==="albums")renderAlbums();if(activeTab==="history")renderHistory()}
/* مزامنة قوائم اختيار الألبوم في تدفقي الرفع دون إعادة بناء الواجهة */
function syncAlbumSelects(){["albumSel","albumSelU"].forEach(id=>{const el=document.getElementById(id);if(!el)return;el.innerHTML=store.albums.map(a=>'<option value="'+esc(a.id)+'"'+(a.id===selectedAlbumId?" selected":"")+'>'+esc(a.title)+" ("+a.images.length+")</option>").join("")})}

/* ---------- 10) واجهة الرفع ---------- */
function renderUpload(){
  const v=$("#view-upload");
  const S=store.settings;
  const albumOpts=store.albums.map(a=>`<option value="${esc(a.id)}">${esc(a.title)} (${a.images.length})</option>`).join("");
  v.innerHTML=`
  <div class="card">
    <h2><span class="ic">${IC.upload}</span>${T().chooseService}</h2>
    <div class="svcgrid" role="radiogroup" aria-label="${esc(T().chooseService)}">
      ${["imgur","imgbb","servimg"].map(s=>`
        <button type="button" role="radio" aria-checked="${S.service===s}" class="svc ${S.service===s?"on":""}" data-svc="${s}">
          <b>${s==="imgur"?"Imgur":s==="imgbb"?"ImgBB":"Servimg"}<span class="dot"></span></b>
          <small>${T()["svc"+s[0].toUpperCase()+s.slice(1)+"N"]}</small>
        </button>`).join("")}
    </div>
  </div>
  <!-- تنبيه الشرط الوحيد (v2.1) -->
  <div class="rnotice">${IC.shield}<p><b>${T().welcomeNoticeTitle}: </b>${T().welcomeNotice}</p></div>
  <!-- تبويبات المصدر (v2.1) -->
  <div class="srcbar" role="tablist" aria-label="${esc(T().uploadTitle)}">
    <button type="button" role="tab" class="${srcTab==="device"?"on":""}" id="srcDevice" aria-selected="${srcTab==="device"}">${IC.imgPlus} ${T().uploadFromDevice}</button>
    <button type="button" role="tab" class="${srcTab==="urls"?"on":""}" id="srcUrls" aria-selected="${srcTab==="urls"}">${IC.link2} ${T().uploadFromUrls}</button>
  </div>
  ${srcTab==="device"?`
  <div class="drop" id="drop" role="button" tabindex="0" aria-label="${esc(T().dropTitle)}">
    <div class="big"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>
    <b>${T().dropTitle}</b><p>${T().dropSub}</p>
    <button type="button" class="btn sec sm" id="browseBtn" style="margin-top:10px">${IC.folder} ${T().browse}</button>
    <input type="file" id="fileInput" class="hidden" multiple accept="image/jpeg,image/png,image/gif,image/webp,image/bmp,image/tiff">
  </div>
  ${queue.length?`
  <div class="card">
    <h2 style="justify-content:space-between"><span>${T().queueTitle} (${queue.length})</span></h2>
    <div style="display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center;background:var(--muted);border-radius:11px;padding:7px 11px;font-size:.68rem;font-weight:800;color:var(--muted-fg);margin-bottom:10px">
      <span>${queue.length} ${T().filesWord||"·"} · ${T().totalSize}: ${fmtBytes(queue.reduce((n,q)=>n+(q.size||0),0))}</span>
      ${queue.reduce((n,q)=>n+(q.size||0),0)>LIMITS[store.settings.service].max?`<span style="display:inline-flex;align-items:center;gap:5px;color:var(--warn)">${IC.warn} ${itpl(T().limitWarn,{service:LIMITS[store.settings.service].label,limit:fmtBytes(LIMITS[store.settings.service].max)})}</span>`:""}
    </div>
    <div id="queueList">${queue.map(qi=>`
      <div class="qitem" data-uid="${qi.uid}">
        <img src="${qi.preview}" alt="">
        <div class="qinfo"><b title="${esc(qi.name)}">${esc(qi.name)}</b>
          <small>${fmtBytes(qi.size)}${qi.w?` · ${qi.w}×${qi.h}`:""}</small>
          ${qi.status==="up"||qi.status==="done"?`<div class="bar"><i style="width:${qi.progress}%"></i></div>`:""}
          ${qi.status==="err"&&qi.error?`<small style="color:var(--danger);font-weight:800">${esc(qi.error)}</small>`:""}
        </div>
        <span class="st ${qi.status==="pending"?"pending":qi.status==="up"?"up":qi.status==="done"?"done":qi.status==="err"?"err":""}">
          ${qi.status==="pending"?T().pending:qi.status==="up"?T().stUp:qi.status==="done"?T().stDone:qi.status==="err"?T().stErr:T().stCancel}
        </span>
        <button type="button" class="xbtn" data-remove="${qi.uid}" title="${T().remove}" ${qi.status==="up"?"disabled":""}>${IC.x}</button>
      </div>`).join("")}</div>
  </div>
  <div class="card">
    ${uploading?`
      <div style="margin-bottom:12px"><b style="font-size:.75rem">${T().uploading}</b>
      <div class="bar" style="height:9px"><i id="totalBar" style="width:0%"></i></div></div>`:""}
    <div style="display:grid;gap:11px;grid-template-columns:1fr 1fr" class="asg">
      <div><label class="fl" for="albumSel">${T().saveTo}</label>
        <select id="albumSel" class="tx">${albumOpts}</select></div>
      <div><label class="fl" for="newAlbum">${T().newAlbumPh}</label>
        <div style="display:flex;gap:7px;align-items:stretch">
          <input id="newAlbum" class="tx" placeholder="${esc(T().newAlbumName)}" maxlength="60">
          <button type="button" class="btn pri sm" id="mkAlbum" title="${T().createAlbum}" style="flex:none;white-space:nowrap">${IC.plus} <span>${T().createAlbum}</span></button>
        </div></div>
    </div>
    <style>@media(max-width:640px){.asg{grid-template-columns:1fr!important}}</style>
    <div class="btnrow" style="margin-top:13px">
      <button type="button" class="btn pri" id="goUpload" ${uploading||!queue.some(q=>q.status==="pending")?"disabled":""}>
        ${uploading?IC.clock+" "+T().uploading:IC.upload+" "+T().startUpload}</button>
      ${uploading?`<button type="button" class="btn dng" id="cancelUp">${IC.x} ${T().cancelUpload}</button>`:""}
      <button type="button" class="btn ghost" id="tgSettings">${IC.gear} ${T().settings}</button>
      ${queue.some(q=>q.status==="err")&&!uploading?`<button type="button" class="btn ghost" id="retryBtn">${IC.retry} ${T().retry} (${queue.filter(q=>q.status==="err").length})</button>`:""}
      <button type="button" class="btn dng sm" id="clearQ" ${uploading?"disabled":""}>${IC.trash} ${T().clearQueue}</button>
    </div>
    <div id="settingsBox" class="${showSettings?"":"hidden"}" style="margin-top:13px;border:1px solid var(--border);border-radius:13px;padding:13px;background:var(--bg)">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:11px">
        <div><b style="font-size:.75rem">${T().stripExif}</b><br><small class="mut" style="font-size:.64rem">${T().stripExifHint}</small></div>
        <label class="switch"><input type="checkbox" id="swExif" ${S.stripExif?"checked":""}><i></i></label>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <b style="font-size:.75rem">${T().compress}</b>
        <label class="switch"><input type="checkbox" id="swComp" ${S.compress?"checked":""}><i></i></label>
      </div>
      ${S.compress?`
      <div style="margin-top:11px"><label class="fl">${T().quality}: <b id="qv">${Math.round(S.quality*100)}%</b></label>
      <input type="range" id="rq" min="50" max="95" step="5" value="${Math.round(S.quality*100)}">
      <label class="fl" style="margin-top:9px">${T().fmt}</label>
      <select id="cfmt" class="tx" style="min-height:40px"><option value="keep">${T().keep}</option><option value="image/jpeg">JPEG</option><option value="image/webp">WebP</option></select></div>`:""}
    </div>
  </div>`:""}
  `:""}
  ${srcTab==="urls"?urlSection():""}
  ${results.length?`
  <div class="card">
    <h2 style="justify-content:space-between;flex-wrap:wrap;gap:8px">
      <span>${T().recentLinks} (${results.length})</span>
      <span style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <span class="fmtabs">${fmtTabs("rl")}</span>
        <button type="button" class="btn pri sm" id="copyAllR">${IC.copy} ${T().copyAll}</button>
      </span>
    </h2>
    <textarea class="tx" readonly dir="ltr" id="resultsTa" style="font-family:monospace;font-size:.7rem">${esc(results.map(r=>buildLink(r.url,linkFmt,r.name)).join("\n"))}</textarea>
    <div style="margin-top:11px">
    ${results.map(r=>`
      <div class="qitem">
        <img src="${esc(r.thumb||r.url)}" alt="" loading="lazy">
        <div class="qinfo"><b>${esc(r.name)}</b> <span class="svcmini">${IC.cloud} ${r.service==="imgur"?T().serviceImgur:r.service==="imgbb"?T().serviceImgbb:T().serviceServimg}</span>
          <a href="${esc(r.url)}" target="_blank" rel="noopener" dir="ltr" style="color:var(--brand);font-size:.66rem;word-break:break-all">${esc(r.url)}</a></div>
        <div class="btnrow" style="gap:5px">
          <button type="button" class="btn sec sm" data-copy="${esc(r.url)}">${IC.copy} ${T().direct}</button>
          <button type="button" class="btn ghost sm" data-share="${esc(r.url)}" data-name="${esc(r.name)}" title="${T().share}">${IC.share}</button>
          <button type="button" class="btn ghost sm" data-open="${esc(r.url)}" title="${T().open}">${IC.ext}</button>
        </div>
      </div>`).join("")}
    </div>
  </div>`:""}
  `;
  /* الأحداث */
  $$(".svc",v).forEach(b=>b.onclick=()=>{if(uploading)return;store.settings.service=b.dataset.svc;persist();renderUpload()});
  const drop=$("#drop"),fi=$("#fileInput");
  if(drop){
    drop.onclick=e=>{if(e.target.id!=="browseBtn")fi.click()};
    $("#browseBtn").onclick=e=>{e.stopPropagation();fi.click()};
    drop.onkeydown=e=>{if(e.key==="Enter"||e.key===" ")fi.click()};
    ["dragover","dragenter"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add("over")}));
    ["dragleave","drop"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove("over")}));
    drop.addEventListener("drop",e=>{if(e.dataTransfer.files.length)addFiles(e.dataTransfer.files)});
    fi.onchange=()=>{if(fi.files.length)addFiles(fi.files);fi.value=""};
  }
  $$("[data-remove]",v).forEach(b=>b.onclick=()=>{const it=queue.find(q=>q.uid===b.dataset.remove);if(it)URL.revokeObjectURL(it.preview);queue=queue.filter(q=>q.uid!==b.dataset.remove);renderUpload()});
  const clearQ=$("#clearQ");if(clearQ)clearQ.onclick=()=>{queue.forEach(q=>URL.revokeObjectURL(q.preview));queue=[];renderUpload()};
  const go=$("#goUpload");if(go)go.onclick=startUpload;
  const cu=$("#cancelUp");if(cu)cu.onclick=cancelUpload;
  const rt=$("#retryBtn");if(rt)rt.onclick=()=>{queue.forEach(q=>{if(q.status==="err"){q.status="pending";q.progress=0;q.error=null}});renderUpload();startUpload()};
  const tg=$("#tgSettings");if(tg)tg.onclick=()=>{showSettings=!showSettings;renderUpload()};
  const se=$("#swExif");if(se)se.onchange=()=>{store.settings.stripExif=se.checked;persist()};
  const sc=$("#swComp");if(sc)sc.onchange=()=>{store.settings.compress=sc.checked;persist();renderUpload()};
  const rq=$("#rq");if(rq)rq.oninput=()=>{$("#qv").textContent=rq.value+"%";store.settings.quality=rq.value/100;persist()};
  const cf=$("#cfmt");if(cf)cf.onchange=()=>{store.settings.fmt=cf.value;persist()};
  const as=$("#albumSel");if(as)as.onchange=()=>{selectedAlbumId=as.value};
  const mk=$("#mkAlbum");if(mk)mk.onclick=()=>createAlbumFromInput("newAlbum");
  $$('[data-copy]',v).forEach(b=>b.onclick=async()=>{(await copyText(b.dataset.copy))?toast(T().copied,"ok"):toast(T().copyFail,"err")});
  $$('[data-share]',v).forEach(b=>b.onclick=()=>nativeShare(b.dataset.share,b.dataset.name));
  $$('[data-open]',v).forEach(b=>b.onclick=()=>window.open(b.dataset.open,"_blank","noopener"));
  $$('[data-fmt]',v).forEach(b=>b.onclick=()=>{linkFmt=b.dataset.fmt;renderUpload()});
  const ca=$("#copyAllR");if(ca)ca.onclick=async()=>{(await copyText(results.map(r=>buildLink(r.url,linkFmt,r.name)).join("\n")))?toast(T().copied,"ok"):toast(T().copyFail,"err")};
  /* أحداث تبويبات المصدر + قسم الروابط (v2.1) */
  const sd=$("#srcDevice"),su=$("#srcUrls");
  if(sd)sd.onclick=()=>{if(!uploading){srcTab="device";renderUpload()}};
  if(su)su.onclick=()=>{if(!uploading){srcTab="urls";renderUpload()}};
  const ab=$("#addUrlsBtn");if(ab)ab.onclick=addUrls;
  const clu=$("#clearUrls");if(clu)clu.onclick=()=>{urlQueue=[];renderUpload()};
  $$("[data-uremove]",v).forEach(b=>b.onclick=()=>{urlQueue=urlQueue.filter(q=>q.uid!==b.dataset.uremove);renderUpload()});
  $$("[data-uretry]",v).forEach(b=>b.onclick=()=>{const it=urlQueue.find(q=>q.uid===b.dataset.uretry);if(it){it.status="valid";it.error=null;renderUpload()}});
  const asu=$("#albumSelU");if(asu)asu.onchange=()=>{selectedAlbumId=asu.value};
  const mku=$("#mkAlbumU");if(mku)mku.onclick=()=>createAlbumFromInput("newAlbumU");
  const gu=$("#urlGo");if(gu)gu.onclick=startUrlUpload;
  const cu2=$("#cancelUpU");if(cu2)cu2.onclick=cancelUpload;
}
/* قسم رفع الروابط (v2.1) */
function urlSection(){
  const albumOpts=store.albums.map(a=>`<option value="${esc(a.id)}" ${a.id===(selectedAlbumId||"general")?"selected":""}>${esc(a.title)} (${a.images.length})</option>`).join("");
  const done=urlQueue.filter(q=>q.status==="done").length;
  const errN=urlQueue.filter(q=>q.status==="err"||q.status==="invalid").length;
  return `
  <div class="card">
    <h2>${IC.link2} ${T().urlsTitle}</h2>
    <p class="mut" style="font-size:.7rem;line-height:1.85;margin:4px 0 9px">${T().urlsHint}</p>
    <textarea id="urlTa" class="tx urlta" rows="5" placeholder="${esc(T().urlsPlaceholder)}" aria-label="${esc(T().urlsTitle)}"></textarea>
    <div class="btnrow" style="margin-top:10px">
      <button type="button" class="btn pri" id="addUrlsBtn" ${uploading||checkingUrls?"disabled":""}>${checkingUrls?IC.clock+" "+T().urlsValidating:IC.link2+" "+T().addUrls}</button>
      ${urlQueue.length?`<button type="button" class="btn dng sm" id="clearUrls" ${uploading?"disabled":""}>${IC.trash} ${T().urlsClear}</button>`:""}
    </div>
  </div>
  ${urlQueue.length?`
  <div class="card">
    <h2 style="justify-content:space-between"><span>${T().urlQueueTitle} (${urlQueue.length} — ${T().urlOk}: ${urlQueue.filter(q=>q.status==="valid").length}${done?` · ${T().stDone}: ${done}`:""})</span>
    ${errN&&!uploading?`<span style="display:inline-flex;align-items:center;gap:5px;color:var(--danger);font-size:.68rem;font-weight:800">${IC.warn} ${T().someFailed} (${errN})</span>`:""}</h2>
    <div id="urlList">${urlQueue.map(ui=>`
      <div class="qitem" data-uurl="${ui.uid}">
        ${ui.status==="invalid"||ui.status==="err"
          ?`<span style="width:52px;height:52px;flex:none;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);background:var(--muted);border-radius:11px;color:var(--muted-fg)">${IC.x}</span>`
          :`<img src="${esc(ui.status==="done"&&ui.result?ui.result.thumb:ui.url)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.visibility='hidden'">`}
        <div class="qinfo"><b dir="ltr" title="${esc(ui.url)}">${esc(ui.name)}</b>
          <a href="${esc(ui.url)}" target="_blank" rel="noopener" dir="ltr" style="color:var(--muted-fg);font-size:.62rem;word-break:break-all;text-decoration:none">${esc(ui.url)}</a>
          ${ui.status==="up"?`<small style="display:flex;align-items:center;gap:5px;color:var(--brand);font-weight:800">${IC.clock} ${T().fetchingUploading}</small>`:""}
          ${(ui.status==="invalid"||ui.status==="err")&&ui.error?`<small style="color:var(--danger);font-weight:800">${esc(ui.error)}</small>`:""}
        </div>
        <span class="st ${ui.status==="valid"?"done":ui.status==="up"?"up":ui.status==="done"?"done":ui.status==="err"?"err":"pending"}">
          ${ui.status==="valid"?T().urlOk:ui.status==="up"?T().stUp:ui.status==="done"?T().stDone:ui.status==="err"?T().stErr:T().urlInvalid}
        </span>
        ${ui.status==="err"?`<button type="button" class="xbtn" data-uretry="${ui.uid}" title="${T().retry}" ${uploading?"disabled":""}>${IC.retry}</button>`:""}
        <button type="button" class="xbtn" data-uremove="${ui.uid}" title="${T().remove}" ${ui.status==="up"?"disabled":""}>${IC.x}</button>
      </div>`).join("")}</div>
    ${uploading?`
      <div style="margin:12px 0 4px"><b style="font-size:.72rem;display:flex;align-items:center;gap:6px">${IC.clock} ${T().fetchingUploading}</b>
      <div class="bar" style="height:9px;margin-top:6px"><i id="urlTotalBar" style="width:0%"></i></div></div>`:""}
  </div>
  <div class="card">
    <div style="display:grid;gap:11px;grid-template-columns:1fr 1fr" class="asg">
      <div><label class="fl" for="albumSelU">${T().saveTo}</label>
        <select id="albumSelU" class="tx">${albumOpts}</select></div>
      <div><label class="fl" for="newAlbumU">${T().newAlbumPh}</label>
        <div style="display:flex;gap:7px;align-items:stretch">
          <input id="newAlbumU" class="tx" placeholder="${esc(T().newAlbumName)}" maxlength="60">
          <button type="button" class="btn pri sm" id="mkAlbumU" title="${T().createAlbum}" style="flex:none;white-space:nowrap">${IC.plus} <span>${T().createAlbum}</span></button>
        </div></div>
    </div>
    <div class="btnrow" style="margin-top:13px">
      <button type="button" class="btn pri" id="urlGo" ${uploading||!urlQueue.some(q=>q.status==="valid")?"disabled":""}>
        ${uploading?IC.clock+" "+T().uploading:IC.upload+" "+T().urlUploadBtn}</button>
      ${uploading?`<button type="button" class="btn dng" id="cancelUpU">${IC.x} ${T().cancelUpload}</button>`:""}
    </div>
  </div>`:""}`;
}
let showSettings=false,selectedAlbumId="general";
function fmtTabs(ns){return ["direct","bbcode","html","markdown"].map(f=>`<button type="button" class="fmtab ${ (ns==="rl"?linkFmt:albumLinkFmt)===f?"on":""}" data-fmt="${f}" data-ns="${ns}">${T()[f==="direct"?"direct":f]}</button>`).join("")}

/* إنشاء ألبوم جديد من الصفحة الرئيسية (قبل الرفع) — مع منع التكرار وتحديد فوري */
function createAlbumFromInput(inpId){
  const inp=document.getElementById(inpId);if(!inp)return;
  const name=(inp.value||"").trim();
  if(!name){toast(T().enterName,"err");inp.focus();return}
  const ex=store.albums.find(a=>a.title===name);
  if(ex){selectedAlbumId=ex.id;syncAlbumSelects();inp.value="";toast(T().exists,"err");return}
  const al={id:uid(),title:name,images:[],createdAt:new Date().toISOString()};
  store.albums.push(al);
  if(!tryPersist()){store.albums=store.albums.filter(a=>a!==al);toast(T().saveFail,"err");return}
  selectedAlbumId=al.id;syncAlbumSelects();inp.value="";
  toast(itpl(T().albumCreated,{name:name}),"ok");renderTabs();
}
async function addFiles(files){
  const svc=store.settings.service,L=LIMITS[svc];
  const added=[];
  for(const f of Array.from(files)){
    if(!f.type.startsWith("image/")){toast(`«${f.name}» — ${T().errNotImage}`,"err");continue}
    if(!L.types.includes(f.type)){toast(`«${f.name}» — ${T().errType}`,"err");continue}
    if(f.size>L.max){toast(`«${f.name}» — ${T().errLarge} (${fmtBytes(L.max)})`,"err");continue}
    const it={uid:uid(),file:f,name:f.name||"صورة",size:f.size,type:f.type,preview:URL.createObjectURL(f),status:"pending",progress:0};
    added.push(it);
    dimsOf(f).then(d=>{it.w=d.w;it.h=d.h;const el=$(`[data-uid="${it.uid}"] small`);if(el)el.textContent=fmtBytes(it.size)+` · ${d.w}×${d.h}`});
  }
  if(added.length){queue.push(...added);renderUpload()}
}
let activeUploads=new Set();
async function startUpload(){
  if(uploading){toast(T().errDup,"err");return}
  const pending=queue.filter(q=>q.status==="pending");
  if(!pending.length){toast(T().errEmpty,"err");return}
  /* تثبيت هدف الألبوم لحظة بدء الرفع — قبل إعادة بناء الواجهة (الحقول تُفرغ عند إعادة البناء) */
  const startTarget={album:selectedAlbumId||"",newName:(function(){const el=$("#newAlbum");return el?el.value.trim():""})()};
  uploading=true;results=[];renderUpload();
  const svc=store.settings.service;
  const uploaded=[];
  let failed=0,doneCount=0;
  for(const it of pending){
    if(it.status!=="pending")continue;
    it.status="up";it.progress=0;renderUpload();
    const r=await uploadTo(svc,it.file,it.name,
      p=>{it.progress=p;const b=$(`[data-uid="${it.uid}"] .bar i`);if(b)b.style.width=p+"%"},
      ab=>activeUploads.add(ab));
    activeUploads.forEach(x=>{try{x()}catch(e){}});activeUploads.clear();
    if(r.ok){
      it.status="done";it.progress=100;
      const img={id:uid(),url:r.url,thumb:r.thumb||r.url,name:it.name,service:svc,size:it.size,w:r.w,h:r.h,uploadedAt:new Date().toISOString()};
      uploaded.push(img);results.push(img);
    }else{
      it.status="err";it.error=r.msg||T().errNet;if(r.error==="aborted")it.status="canceled";
      failed++;
    }
    doneCount++;
    const tb=$("#totalBar");if(tb)tb.style.width=Math.round(doneCount/pending.length*100)+"%";
    renderUpload();
  }
  if(uploaded.length){
    let target=startTarget.album||"general";
    const newName=startTarget.newName;
    let newAl=null;
    if(newName){
      const ex=store.albums.find(a=>a.title===newName);
      if(ex)target=ex.id;else{newAl={id:uid(),title:newName,images:[],createdAt:new Date().toISOString()};store.albums.push(newAl);target=newAl.id;toast(itpl(T().albumCreated,{name:newName}),"ok")}
    }
    const al=store.albums.find(a=>a.id===target)||store.albums[0];
    const urls=new Set(al.images.map(i=>i.url));
    uploaded.forEach(im=>{if(!urls.has(im.url))al.images.push(im)});
    uploaded.forEach(im=>store.history.unshift(Object.assign({albumTitle:al.title},im)));
    store.history=store.history.slice(0,200);
    if(tryPersist())toast(`${T().uploadDone} (${uploaded.length})`,"ok");
    else{ /* فشل الحفظ: إعادة الواجهة والذاكرة إلى الحالة الصحيحة — لا نجاح وهمي */
      uploaded.forEach(im=>{al.images=al.images.filter(i=>i.url!==im.url)});
      if(newAl)store.albums=store.albums.filter(a=>a!==newAl);
      uploaded.forEach(im=>{const ix=store.history.indexOf(im);if(ix>=0)store.history.splice(ix,1)});
    }
  }
  if(failed)toast(`${T().someFailed} (${failed})`,"err");
  uploading=false;renderUpload();refreshUI();
}
function cancelUpload(){activeUploads.forEach(x=>{try{x()}catch(e){}});activeUploads.clear();queue.forEach(q=>{if(q.status==="up")q.status="canceled"});uploading=false;renderUpload();toast(T().stCancel)}

/* ---------- 11) الألبومات ---------- */
function renderAlbums(){
  const v=$("#view-albums");
  if(openAlbumId){
    const al=store.albums.find(a=>a.id===openAlbumId);
    if(!al){openAlbumId=null;renderAlbums();return}
    let imgs=[...al.images];
    if(albumSort==="name")imgs.sort((a,b)=>a.name.localeCompare(b.name,"ar"));
    else imgs.sort((a,b)=>new Date(b.uploadedAt)-new Date(a.uploadedAt));
    const selImgs=imgs.filter(i=>albumSel.has(i.id));
    v.innerHTML=`
    <div class="card" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px">
      <div style="display:flex;align-items:center;gap:9px;min-width:0">
        <button type="button" class="btn ghost sm" id="backAl">${IC.back}</button>
        <div style="min-width:0"><h2 style="margin:0">${esc(al.title)} <small class="mut" style="font-weight:600;font-size:.66rem">${imgs.length} ${T().imagesWord} · ${fmtDate(al.createdAt)}</small></h2></div>
        <button type="button" class="icobtn" id="renAl" title="${T().rename}">${IC.pen}</button>
      </div>
      <div class="btnrow">
        <select id="sortSel" class="tx" style="min-height:40px;width:auto;font-size:.7rem">
          <option value="date" ${albumSort==="date"?"selected":""}>الأحدث أولًا</option>
          <option value="name" ${albumSort==="name"?"selected":""}>حسب الاسم</option>
        </select>
        ${albumSel.size?`
          <span class="st up">${albumSel.size} ${T().selected}</span>
          <button type="button" class="btn ghost sm" id="desel">${IC.x} ${T().deselAll}</button>
          <button type="button" class="btn sec sm" id="trBtn">${IC.transfer} ${T().transfer}</button>
          <button type="button" class="btn sec sm" id="dlSelBtn">${IC.download} ${T().dlSel}</button>
          <button type="button" class="btn dng sm" id="delSelBtn">${IC.trash} ${T().delSel}</button>`
        :imgs.length?`
          <button type="button" class="btn ghost sm" id="selAllBtn">${IC.checkSq} ${T().selAll}</button>
          <button type="button" class="btn sec sm" id="dlAllBtn">${IC.download} ${T().dlAll}</button>`:""}
      </div>
    </div>
    ${imgs.length?`
    <div class="card">
      <h2 style="justify-content:space-between;flex-wrap:wrap;gap:8px">
        <span>${IC.link} ${T().allLinks} (${imgs.length})</span>
        <span style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <span class="fmtabs">${fmtTabs("al")}</span>
          <button type="button" class="btn pri sm" id="copyAllAl">${IC.copy} ${T().copy}</button>
        </span>
      </h2>
      <div class="lnkgrid">
        <div class="lnkbox"><h3>${IC.checkSq} ${T().selLinks} (${selImgs.length})<span class="sp"></span>
          <button type="button" class="btn pri sm" id="copySel" ${selImgs.length?"":"disabled"}>${IC.copy} ${T().copy}</button></h3>
          <textarea class="tx" readonly dir="ltr" style="font-family:monospace;font-size:.66rem;height:76px">${esc(selImgs.length?selImgs.map(i=>buildLink(i.url,albumLinkFmt,i.name)).join("\n"):"— لم تحدد أي صورة —")}</textarea></div>
        <div class="lnkbox"><h3>${IC.link} ${T().allLinks}<span class="sp"></span>
          <button type="button" class="btn pri sm" id="copyAll2">${IC.copy} ${T().copy}</button></h3>
          <textarea class="tx" readonly dir="ltr" style="font-family:monospace;font-size:.66rem;height:76px">${esc(imgs.map(i=>buildLink(i.url,albumLinkFmt,i.name)).join("\n"))}</textarea></div>
      </div>
    </div>
    <div class="imgrid">
      ${imgs.map((im,ix)=>`
      <figure class="imcard ${albumSel.has(im.id)?"sel":""}">
        <img src="${esc(im.thumb||im.url)}" alt="${esc(im.name)}" loading="lazy" data-prev="${ix}">
        <label class="imchk"><input type="checkbox" ${albumSel.has(im.id)?"checked":""} data-chk="${im.id}" aria-label="تحديد ${esc(im.name)}"></label>
        <figcaption class="imbody">
          <b class="allow-copy" title="${esc(im.name)}">${esc(im.name)}</b>
          <div class="imrow">
            <button type="button" class="btn sec sm" data-copy1="${esc(im.url)}" data-n="${esc(im.name)}">${IC.copy} ${T().copy}</button>
            <button type="button" class="btn ghost sm" data-menu="${im.id}" data-ix="${ix}" title="خيارات">‹</button>
          </div>
          <p class="immeta"><span class="sv">${im.service}</span> · ${fmtDate(im.uploadedAt)}</p>
        </figcaption>
      </figure>`).join("")}
    </div>`
    :`<p class="card" style="text-align:center;font-weight:800;color:var(--muted-fg)">${T().noImages}</p>`}
    `;
    $("#backAl").onclick=()=>{openAlbumId=null;albumSel=new Set();renderAlbums()};
    $("#renAl").onclick=()=>openPrompt(T().rename,al.title,(nv)=>{if(nv.trim()){al.title=nv.trim();persist();renderAlbums();renderTabs()}});
    $("#sortSel").onchange=e=>{albumSort=e.target.value;renderAlbums()};
    const sa=$("#selAllBtn");if(sa)sa.onclick=()=>{albumSel=new Set(imgs.map(i=>i.id));renderAlbums()};
    const da=$("#desel");if(da)da.onclick=()=>{albumSel=new Set();renderAlbums()};
    const da2=$("#dlAllBtn");if(da2)da2.onclick=()=>downloadZip(imgs,al.title);
    const ds=$("#dlSelBtn");if(ds)ds.onclick=()=>downloadZip(selImgs,al.title+"-محدد");
    const del=$("#delSelBtn");if(del)del.onclick=()=>openConfirm(T().confirmTitle,T().confirmDelSel,()=>{
      const s=new Set(albumSel);al.images=al.images.filter(i=>!s.has(i.id));albumSel=new Set();persist();renderAlbums();renderTabs();toast(T().delFromUI)});
    const tr=$("#trBtn");if(tr)tr.onclick=()=>{
      const others=store.albums.filter(a=>a.id!==al.id);
      if(!others.length){toast("لا يوجد ألبوم آخر","err");return}
      openSelect(T().transfer,others,(targetId)=>{
        const to=store.albums.find(a=>a.id===targetId);if(!to)return;
        const s=new Set(albumSel);
        const moved=al.images.filter(i=>s.has(i.id));
        al.images=al.images.filter(i=>!s.has(i.id));
        const urls=new Set(to.images.map(i=>i.url));
        moved.forEach(m=>{if(!urls.has(m.url))to.images.push(m)});
        albumSel=new Set();persist();renderAlbums();renderTabs();toast(T().transferDone,"ok");
      });
    };
    $$("[data-chk]",v).forEach(c=>c.onchange=()=>{if(c.checked)albumSel.add(c.dataset.chk);else albumSel.delete(c.dataset.chk);renderAlbums()});
    $$("[data-prev]",v).forEach(im=>im.onclick=()=>openLightbox(imgs,parseInt(im.dataset.prev,10)));
    $$("[data-copy1]",v).forEach(b=>b.onclick=async()=>{(await copyText(b.dataset.copy1))?toast(T().copied,"ok"):toast(T().copyFail,"err")});
    $$("[data-menu]",v).forEach(b=>b.onclick=()=>{
      const im=imgs[parseInt(b.dataset.ix,10)];
      openModal(`<h3 class="allow-copy" style="margin-bottom:12px">${esc(im.name)}</h3>
        <img class="mimg" src="${esc(im.thumb||im.url)}" alt="" style="margin-bottom:12px">
        <div class="btnrow" style="justify-content:center">
          <button class="btn sec sm" id="mBb">BBCode</button>
          <button class="btn sec sm" id="mHtml">HTML</button>
          <button class="btn sec sm" id="mMd">MD</button>
          <button class="btn sec sm" id="mShare">${IC.share} ${T().share}</button>
          <button class="btn sec sm" id="mDl">${IC.download} ${T().download}</button>
          <button class="btn sec sm" id="mEdit">${IC.pen} ${T().editIn}</button>
          <button class="btn ghost sm" id="mOpen">${IC.ext} ${T().open}</button>
          <button class="btn dng sm" id="mDel">${IC.trash} ${T().del}</button>
        </div>`);
      $("#mBb").onclick=async()=>{(await copyText(buildLink(im.url,"bbcode",im.name)))?toast(T().copied,"ok"):toast(T().copyFail,"err")};
      $("#mHtml").onclick=async()=>{(await copyText(buildLink(im.url,"html",im.name)))?toast(T().copied,"ok"):toast(T().copyFail,"err")};
      $("#mMd").onclick=async()=>{(await copyText(buildLink(im.url,"markdown",im.name)))?toast(T().copied,"ok"):toast(T().copyFail,"err")};
      $("#mShare").onclick=()=>nativeShare(im.url,im.name);
      $("#mDl").onclick=()=>downloadUrl(im.url,im.name);
      $("#mOpen").onclick=()=>window.open(im.url,"_blank","noopener");
      $("#mDel").onclick=()=>{al.images=al.images.filter(i=>i.id!==im.id);albumSel.delete(im.id);persist();closeModal();renderAlbums();renderTabs();toast(T().delFromUI)};
      $("#mEdit").onclick=async()=>{
        closeModal();toast(T().editingLoad);
        try{const r=await fetch(im.url,{mode:"cors"});const b=await r.blob();openEditorWith(b,im.name)}
        catch(e){toast(T().errNet,"err")}
      };
    });
    const cs=$("#copySel");if(cs)cs.onclick=async()=>{(await copyText(selImgs.map(i=>buildLink(i.url,albumLinkFmt,i.name)).join("\n")))?toast(T().copied+" ("+selImgs.length+")","ok"):toast(T().copyFail,"err")};
    const ca=$("#copyAllAl")||$("#copyAll2");if(ca)ca.onclick=async()=>{(await copyText(imgs.map(i=>buildLink(i.url,albumLinkFmt,i.name)).join("\n")))?toast(T().copied,"ok"):toast(T().copyFail,"err")};
    $$('[data-fmt][data-ns="al"]',v).forEach(b=>b.onclick=()=>{albumLinkFmt=b.dataset.fmt;renderAlbums()});
  } else {
    albumGridSel=albumGridSel||new Set();
    const selCount=albumGridSel.size;
    v.innerHTML=`
    <div class="card" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px">
      <h2 style="margin:0">${IC.images} ${T().albumsTitle}</h2>
      <div class="btnrow">
        ${selCount?`<span class="st up">${selCount} ${T().selected}</span>
          <button type="button" class="btn ghost sm" id="gDesel">${IC.x} ${T().deselAll}</button>
          <button type="button" class="btn dng sm" id="gDel">${IC.trash} ${T().delSel}</button>`
        :store.albums.length?`<button type="button" class="btn ghost sm" id="gSelAll">${IC.checkSq} ${T().selAll}</button>`:""}
      </div>
    </div>
    <form class="card" id="newAlForm" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <span style="color:var(--brand)">${IC.plus}</span>
      <input id="newAlInput" class="tx" style="flex:1;min-width:160px" placeholder="${esc(T().newAlbumName)}" maxlength="60">
      <button type="submit" class="btn pri">${T().createAlbum}</button>
    </form>
    ${store.albums.length?`<div class="algrid">
      ${store.albums.map(al=>{const cover=al.images[al.images.length-1];return`
      <div class="alcard ${albumGridSel.has(al.id)?"sel":""}" data-al="${al.id}">
        <div class="alcover" data-open="${al.id}">
          ${cover?`<img src="${esc(cover.thumb||cover.url)}" alt="${esc(al.title)}" loading="lazy">`:`<span class="mut">${IC.images}</span>`}
          <span class="cnt">${al.images.length} ${T().imagesWord}</span>
        </div>
        <div class="albody">
          <h3 class="allow-copy" data-open="${al.id}" title="${esc(al.title)}">${esc(al.title)}</h3>
          <p class="almeta">${IC.cal} ${fmtDate(al.createdAt)}</p>
          <div class="alacts">
            <label><input type="checkbox" ${albumGridSel.has(al.id)?"checked":""} data-gsel="${al.id}"> تحديد</label>
            <span class="sp"></span>
            <button type="button" class="icobtn" data-ren="${al.id}" title="${T().rename}">${IC.pen}</button>
            <button type="button" class="icobtn dng" data-del="${al.id}" title="${T().delAlbum}">${IC.trash}</button>
          </div>
        </div>
      </div>`}).join("")}</div>`
    :`<p class="card" style="text-align:center;font-weight:800;color:var(--muted-fg)">${T().albumsEmpty}</p>`}`;
    $("#newAlForm").onsubmit=e=>{e.preventDefault();
      const n=$("#newAlInput").value.trim();if(!n){toast(T().enterName,"err");return}
      if(store.albums.some(a=>a.title===n)){toast(T().exists,"err");return}
      store.albums.push({id:uid(),title:n,images:[],createdAt:new Date().toISOString()});
      persist();renderAlbums();toast(itpl(T().albumCreated,{name:n}),"ok")};
    const sa=$("#gSelAll");if(sa)sa.onclick=()=>{albumGridSel=new Set(store.albums.map(a=>a.id));renderAlbums()};
    const de=$("#gDesel");if(de)de.onclick=()=>{albumGridSel=new Set();renderAlbums()};
    const dl=$("#gDel");if(dl)dl.onclick=()=>openConfirm(T().confirmTitle,T().confirmDelAlbum,()=>{
      store.albums=store.albums.filter(a=>!albumGridSel.has(a.id));albumGridSel=new Set();persist();renderAlbums();renderTabs()});
    $$("[data-open]",v).forEach(el=>el.onclick=()=>{openAlbumId=el.dataset.open;albumSel=new Set();renderAlbums()});
    $$("[data-gsel]",v).forEach(c=>c.onchange=()=>{if(c.checked)albumGridSel.add(c.dataset.gsel);else albumGridSel.delete(c.dataset.gsel);renderAlbums()});
    $$("[data-ren]",v).forEach(b=>b.onclick=()=>{const al=store.albums.find(a=>a.id===b.dataset.ren);
      openPrompt(T().rename,al.title,nv=>{if(nv.trim()){al.title=nv.trim();persist();renderAlbums();renderTabs()}})});
    $$("[data-del]",v).forEach(b=>b.onclick=()=>openConfirm(T().confirmTitle,T().confirmDelAlbum,()=>{
      store.albums=store.albums.filter(a=>a.id!==b.dataset.del);persist();renderAlbums();renderTabs()}));
  }
}
async function downloadZip(list,name){
  if(!list.length)return;
  toast(T().zipMaking);
  try{
    await lazyScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
    const zip=new JSZip();let ok=0;
    for(const im of list){
      try{const r=await fetch(im.url,{mode:"cors"});if(r.ok){zip.file(im.name.replace(/[\\/:*?"<>|]/g,"_"),await r.blob());ok++}}catch(e){}
    }
    const blob=await zip.generateAsync({type:"blob"});
    downloadBlob(blob,(name||"softara")+".zip");
    toast(T().zipDone+" ("+ok+")","ok");
  }catch(e){toast(T().zipFail,"err")}
}

/* ---------- 12) المعاينة والنوافذ ---------- */
function openModal(html){
  const bx=$("#modalBox");
  /* زر الإغلاق: أيقونة SVG حقيقية + ربط مباشر (السبب الجذري سابقًا: سلسلة مقتبسة بعلامة مفردة لا تُنفّذ ${IC.x}) */
  bx.innerHTML='<button type="button" class="mclose" id="mcloseBtn" aria-label="'+esc(T().close)+'">'+IC.x+"</button>"+html;
  bx.className="mbox";$("#modal").classList.add("open");
  const c=$("#mcloseBtn");if(c)c.onclick=closeModal;
}
function openModalWide(html){openModal(html);$("#modalBox").className="mbox wide"}
function closeModal(){$("#modal").classList.remove("open")}
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
function openConfirm(title,msg,onYes){openModal(`<h3>${esc(title)}</h3><p class="mut" style="font-size:.8rem;margin-bottom:14px">${esc(msg)}</p>
  <div class="btnrow" style="justify-content:flex-end"><button class="btn ghost" id="cNo">${T().cancel}</button><button class="btn dng" id="cYes">${T().confirm}</button></div>`);
  $("#cNo").onclick=closeModal;$("#cYes").onclick=()=>{closeModal();onYes()}}
function openPrompt(title,value,onOk){openModal(`<h3>${esc(title)}</h3>
  <input class="tx" id="pIn" value="${esc(value||"")}" maxlength="60" style="margin:10px 0 14px">
  <div class="btnrow" style="justify-content:flex-end"><button class="btn ghost" id="pNo">${T().cancel}</button><button class="btn pri" id="pOk">${T().confirm}</button></div>`);
  $("#pIn").focus();$("#pNo").onclick=closeModal;
  $("#pOk").onclick=()=>{const v=$("#pIn").value;closeModal();onOk(v)};
  $("#pIn").onkeydown=e=>{if(e.key==="Enter"){const v=$("#pIn").value;closeModal();onOk(v)}}}
function openSelect(title,options,onOk){openModal(`<h3>${esc(title)}</h3>
  <select class="tx" id="sSel" style="margin:10px 0 14px">${options.map(o=>`<option value="${esc(o.id)}">${esc(o.title)} (${o.images.length})</option>`).join("")}</select>
  <div class="btnrow" style="justify-content:flex-end"><button class="btn ghost" id="sNo">${T().cancel}</button><button class="btn pri" id="sOk">${T().confirm}</button></div>`);
  $("#sNo").onclick=closeModal;$("#sOk").onclick=()=>{const v=$("#sSel").value;closeModal();onOk(v)}}
function openLightbox(imgs,index){
  let ix=index;
  const draw=()=>{
    const im=imgs[ix];
    openModalWide(`
      <img class="mimg" src="${esc(im.url)}" alt="${esc(im.name)}" style="margin-bottom:12px">
      <div style="text-align:center;margin-bottom:12px">
        <b class="allow-copy">${esc(im.name)}</b>
        <p class="mut" style="font-size:.68rem" dir="ltr">${im.w?im.w+"×"+im.h+" · ":""}${fmtBytes(im.size)}</p>
        <p style="font-size:.66rem;margin-top:4px"><span class="st up">${im.service}</span> · ${T().uploadedOn} ${fmtDate(im.uploadedAt)}</p>
      </div>
      <div class="btnrow" style="justify-content:center;flex-wrap:wrap">
        ${imgs.length>1?`<button class="btn ghost" id="lbPrev">›</button>`:""}
        <button class="btn pri sm" id="lbCopy">${IC.copy} ${T().direct}</button>
        <button class="btn sec sm" id="lbBb">BBCode</button>
        <button class="btn sec sm" id="lbShare">${IC.share} ${T().share}</button>
        <button class="btn sec sm" id="lbDl">${IC.download} ${T().download}</button>
        <button class="btn ghost sm" id="lbOpen">${IC.ext} ${T().open}</button>
        ${imgs.length>1?`<button class="btn ghost" id="lbNext">‹</button>`:""}
      </div>`);
    $("#lbCopy").onclick=async()=>{(await copyText(im.url))?toast(T().copied,"ok"):toast(T().copyFail,"err")};
    $("#lbBb").onclick=async()=>{(await copyText(buildLink(im.url,"bbcode",im.name)))?toast(T().copied,"ok"):toast(T().copyFail,"err")};
    $("#lbShare").onclick=()=>nativeShare(im.url,im.name);
    $("#lbDl").onclick=()=>downloadUrl(im.url,im.name);
    $("#lbOpen").onclick=()=>window.open(im.url,"_blank","noopener");
    const p=$("#lbPrev");if(p)p.onclick=()=>{ix=(ix+1)%imgs.length;draw()};
    const n=$("#lbNext");if(n)n.onclick=()=>{ix=(ix-1+imgs.length)%imgs.length;draw()};
  };
  draw();
}

/* ---------- 13) السجل ---------- */
function renderHistory(){
  const v=$("#view-history");
  v.innerHTML=`
  <div class="card" style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;align-items:center">
    <div><h2 style="margin:0">${IC.clock} ${T().historyTitle} <span class="bdg" style="background:var(--brand-soft);color:var(--brand);border-radius:99px;padding:2px 9px;font-size:.68rem;font-weight:900">${store.history.length}</span></h2>
    <p class="mut" style="font-size:.64rem;font-weight:600;margin-top:4px">${T().historyNote}</p></div>
    ${store.history.length?`<button type="button" class="btn dng sm" id="clrH">${IC.trash} ${T().historyClear}</button>`:""}
  </div>
  ${store.history.length?`<div style="max-height:65vh;overflow-y:auto">${store.history.map(h=>`
    <div class="hitem">
      <img src="${esc(h.thumb||h.url)}" alt="" loading="lazy">
      <div style="flex:1;min-width:140px"><b style="font-size:.72rem;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(h.name)}</b>
      <small class="mut" style="font-size:.64rem"><span class="st pending" style="padding:1px 7px">${h.service}</span> ${h.albumTitle?"· "+esc(h.albumTitle):""} · ${fmtDate(h.uploadedAt)}</small></div>
      <div class="btnrow" style="gap:5px">
        <button class="btn sec sm" data-hcopy="${esc(h.url)}">${IC.copy}</button>
        <button class="btn ghost sm" data-hshare="${esc(h.url)}" data-hn="${esc(h.name)}">${IC.share}</button>
        <button class="btn ghost sm" data-hopen="${esc(h.url)}">${IC.ext}</button>
      </div>
    </div>`).join("")}</div>`
  :`<p class="card" style="text-align:center;font-weight:800;color:var(--muted-fg)">${T().historyEmpty}</p>`}`;
  const c=$("#clrH");if(c)c.onclick=()=>openConfirm(T().confirmTitle,T().historyNote,()=>{store.history=[];persist();renderHistory();renderTabs()});
  $$("[data-hcopy]",v).forEach(b=>b.onclick=async()=>{(await copyText(b.dataset.hcopy))?toast(T().copied,"ok"):toast(T().copyFail,"err")});
  $$("[data-hshare]",v).forEach(b=>b.onclick=()=>nativeShare(b.dataset.hshare,b.dataset.hn));
  $$("[data-hopen]",v).forEach(b=>b.onclick=()=>window.open(b.dataset.hopen,"_blank","noopener"));
}

/* ---------- 14) المحرر ---------- */
const ED_PRESETS={
  original:{},vintage:{saturation:-25,contrast:-8,temperature:32,exposure:-6,sepia:18},
  bw:{grayscale:100,contrast:14},sepia:{sepia:80,grayscale:15},warm:{temperature:45},cool:{temperature:-45},
  bright:{exposure:28,saturation:10},dramatic:{contrast:32,exposure:-10,saturation:-14,sharpness:30}
};
const ED_PRESET_AR=[["original","الأصلية"],["vintage","كلاسيكية"],["bw","أبيض وأسود"],["sepia","سيبيا"],["warm","دافئة"],["cool","باردة"],["bright","مشرقة"],["dramatic","درامية"]];
const NEUTRAL={brightness:0,contrast:0,saturation:0,temperature:0,exposure:0,grayscale:0,sepia:0,opacity:100,sharpness:0,blur:0};
const ED_MAX_PREVIEW=1400,ED_MAX_EXPORT=4200;

function openEditorWith(blob,name){editor=null;activeTab="editor";renderTabs();renderViews();edLoad(blob,name)}
function edNeutralDoc(){return{rotation:0,flipH:false,flipV:false,crop:null,resizeWidth:null,adj:Object.assign({},NEUTRAL),preset:"original"}}

async function edLoad(blob,name){
  try{
    let bmp=null;
    try{bmp=await createImageBitmap(blob,{imageOrientation:"from-image"})}
    catch(e){bmp=await new Promise((res,rej)=>{const im=new Image();const u=URL.createObjectURL(blob);im.onload=()=>{URL.revokeObjectURL(u);res(im)};im.onerror=rej;im.src=u})}
    editor={src:bmp,name:name||"صورة",size:blob.size,type:blob.type||"image/png",doc:edNeutralDoc(),hist:[edNeutralDoc()],hi:0,cropMode:false,cropRect:null,fmt:"keep",svc:store.settings.service};
    renderEditor();
  }catch(e){toast("تعذر فتح الصورة","err")}
}
function edPush(){const h=editor.hist.slice(0,editor.hi+1);h.push(JSON.parse(JSON.stringify(editor.doc)));if(h.length>30)h.shift();editor.hist=h;editor.hi=h.length-1}
function edRenderCanvas(cv,doc,maxDim){
  const bmp=editor.src;if(!bmp)return null;
  const natW=bmp.naturalWidth||bmp.width,natH=bmp.naturalHeight||bmp.height;
  const crop=doc.crop||{x:0,y:0,w:natW,h:natH};
  const sx=clamp(crop.x,0,natW),sy=clamp(crop.y,0,natH);
  const sw=clamp(crop.w,1,natW-sx),sh=clamp(crop.h,1,natH-sy);
  let outW=sw,outH=sh;
  if(doc.resizeWidth&&doc.resizeWidth>0&&doc.resizeWidth!==sw){outW=doc.resizeWidth;outH=Math.round(sh/sw*doc.resizeWidth)}
  const sd=Math.min(1,maxDim/Math.max(outW,outH));
  outW=Math.max(1,Math.round(outW*sd));outH=Math.max(1,Math.round(outH*sd));
  const rot=doc.rotation%180===90;
  cv.width=rot?outH:outW;cv.height=rot?outW:outH;
  const ctx=cv.getContext("2d");ctx.clearRect(0,0,cv.width,cv.height);
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";
  const a=doc.adj;
  const parts=["brightness("+clamp(100+a.brightness*.55+a.exposure*.6,0,300)+"%)","contrast("+clamp(100+a.contrast*.7,0,300)+"%)","saturate("+clamp(100+a.saturation,0,400)+"%)"];
  if(a.grayscale>0)parts.push("grayscale("+a.grayscale+"%)");
  if(a.sepia>0)parts.push("sepia("+a.sepia+"%)");
  if(a.blur>0)parts.push("blur("+(a.blur*sd).toFixed(2)+"px)");
  ctx.filter=parts.join(" ");ctx.globalAlpha=clamp(a.opacity/100,0,1);
  ctx.save();ctx.translate(cv.width/2,cv.height/2);ctx.rotate(doc.rotation*Math.PI/180);ctx.scale(doc.flipH?-1:1,doc.flipV?-1:1);
  try{ctx.drawImage(bmp,sx,sy,sw,sh,-outW/2,-outH/2,outW,outH)}catch(e){}
  ctx.restore();ctx.filter="none";ctx.globalAlpha=1;
  if(a.temperature!==0){
    const t=a.temperature/100;ctx.save();ctx.globalCompositeOperation="soft-light";
    ctx.fillStyle=t>0?`rgba(255,138,0,${Math.abs(t)*.9})`:`rgba(0,110,255,${Math.abs(t)*.9})`;
    ctx.fillRect(0,0,cv.width,cv.height);ctx.restore();
  }
  if(a.sharpness>0){
    try{
      const imgData=ctx.getImageData(0,0,cv.width,cv.height),data=imgData.data;
      const w=cv.width,h=cv.height,wt=a.sharpness/100*1.6;
      const K=[0,-wt/4,0,-wt/4,1+wt,-wt/4,0,-wt/4,0];
      const out=ctx.createImageData(w,h),o=out.data;
      for(let y=0;y<h;y++)for(let x=0;x<w;x++){
        const d=(y*w+x)*4;let r=0,g=0,b=0;
        for(let cy=0;cy<3;cy++)for(let cx=0;cx<3;cx++){
          const sy2=y+cy-1,sx2=x+cx-1;
          if(sy2>=0&&sy2<h&&sx2>=0&&sx2<w){const s=(sy2*w+sx2)*4,k=K[cy*3+cx];r+=data[s]*k;g+=data[s+1]*k;b+=data[s+2]*k}
        }
        o[d]=clamp(r,0,255);o[d+1]=clamp(g,0,255);o[d+2]=clamp(b,0,255);o[d+3]=data[d+3];
      }
      ctx.putImageData(out,0,0);
    }catch(e){}
  }
  return{w:cv.width,h:cv.height};
}
function renderEditor(){
  const v=$("#view-editor");
  if(!editor){
    v.innerHTML=`
    <div class="drop" id="edDrop" role="button" tabindex="0" style="padding:48px 16px">
      <div class="big"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></div>
      <b style="font-size:1.05rem">${T().edOpen}</b><p>${T().edHint}</p>
      <p style="color:var(--ok);font-size:.68rem;font-weight:800;margin-top:8px">${IC.check} ${T().origSafe}</p>
      <input type="file" id="edFile" class="hidden" accept="image/*">
    </div>`;
    const d=$("#edDrop"),f=$("#edFile");
    d.onclick=()=>f.click();d.onkeydown=e=>{if(e.key==="Enter")f.click()};
    d.ondragover=e=>{e.preventDefault();d.classList.add("over")};d.ondragleave=()=>d.classList.remove("over");
    d.ondrop=e=>{e.preventDefault();d.classList.remove("over");const file=Array.from(e.dataTransfer.files).find(x=>x.type.startsWith("image/"));if(file)edLoad(file,file.name)};
    f.onchange=()=>{if(f.files[0])edLoad(f.files[0],f.files[0].name);f.value=""};
    return;
  }
  const d=editor.doc;
  const adjRows=[["brightness",T().brightness,-100,100],["contrast",T().contrast,-100,100],["saturation",T().saturation,-100,100],["temperature",T().temperature,-100,100],["exposure",T().exposure,-100,100],["grayscale",T().grayscale,0,100],["opacity",T().opacity,20,100],["sharpness",T().sharpness,0,100],["blur",T().blur,0,10]];
  v.innerHTML=`
  <div class="edgrid">
    <div>
      <div class="card" style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;align-items:center;padding:11px 14px">
        <h2 style="margin:0">${IC.pen} ${T().edTitle} <small class="mut" dir="ltr" style="font-size:.64rem;font-weight:600">${esc(editor.name)} · ${fmtBytes(editor.size)}</small></h2>
        <div class="btnrow" style="gap:5px">
          <button class="btn ghost sm" id="edUndo" ${editor.hi<=0?"disabled":""} title="${T().undo}">${IC.undo} ${T().undo}</button>
          <button class="btn ghost sm" id="edRedo" ${editor.hi>=editor.hist.length-1?"disabled":""} title="${T().redo}">${IC.redo} ${T().redo}</button>
          <button class="btn ghost sm" id="edReset">${IC.reset} ${T().reset}</button>
          <button class="btn ghost sm" id="edAnother">${IC.images} ${T().another}</button>
        </div>
      </div>
      <div class="card">
        <div class="edstage" id="edStage"><canvas id="edCanvas"></canvas></div>
        <div class="btnrow" style="justify-content:center;margin-top:12px">
          ${editor.cropMode?`
            <button class="btn pri" id="edCropApply">${IC.check} ${T().cropApply}</button>
            <button class="btn ghost" id="edCropCancel">${IC.x} ${T().cropCancel}</button>`
          :`
            <button class="btn sec sm" id="edCrop">${IC.crop} ${T().crop}</button>
            <button class="btn sec sm" id="edRotL" title="${T().rotL}" aria-label="${T().rotL}">${IC.undo}</button>
            <button class="btn sec sm" id="edRotR" title="${T().rotR}" aria-label="${T().rotR}">${IC.redo}</button>
            <button class="btn sec sm ${d.flipH?"":"dn"}" id="edFlipH" style="${d.flipH?"background:var(--brand-soft);color:var(--brand)":""}">${IC.flipH}</button>
            <button class="btn sec sm" id="edFlipV" style="${d.flipV?"background:var(--brand-soft);color:var(--brand)":""}">${IC.flipV}</button>
            <span style="display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);border-radius:11px;padding:4px 9px;background:var(--bg)">
              <label class="fl" style="margin:0;white-space:nowrap">${T().resizeW}</label>
              <input type="number" id="edResize" class="tx" style="width:86px;min-height:36px;text-align:center" dir="ltr" min="16" value="${d.resizeWidth||(editor.src.naturalWidth||editor.src.width)}">
            </span>`}
        </div>
      </div>
      <div class="card">
        <div style="display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">
          <div><label class="fl">${T().dlFmt}</label>
            <select id="edFmt" class="tx" style="min-height:42px"><option value="keep">${T().keep}</option><option value="image/jpeg">JPEG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></div>
          <div><label class="fl">${T().uploadSvc}</label>
            <select id="edSvc" class="tx" style="min-height:42px"><option value="imgur">Imgur</option><option value="imgbb">ImgBB</option><option value="servimg">Servimg</option></select></div>
          <div style="display:flex;align-items:flex-end;gap:8px">
            <button class="btn pri" id="edDl" style="flex:1">${IC.download} ${T().dlEdited}</button>
            <button class="btn ghost" id="edUp" style="flex:1">${IC.upload} ${T().upEdited}</button>
          </div>
        </div>
        <p style="text-align:center;font-size:.62rem;color:var(--muted-fg);font-weight:700;margin-top:9px">${T().origSafe} · ${T().exifNote}</p>
      </div>
    </div>
    <aside>
      <div class="card"><h2>${IC.sparkles} ${T().filters}</h2>
        <div class="ftgrid">${ED_PRESET_AR.map(([id,ar])=>`<button type="button" class="ftbtn ${d.preset===id?"on":""}" data-preset="${id}">${ar}</button>`).join("")}</div></div>
      <div class="card"><h2>${IC.sliders} ${T().fine}</h2>
        ${adjRows.map(([k,lbl,mn,mx])=>`<div class="adjrow"><div class="lbl"><span>${lbl}</span><b>${d.adj[k]}</b></div>
          <input type="range" data-adj="${k}" min="${mn}" max="${mx}" step="${k==="blur"?0.5:1}" value="${d.adj[k]}"></div>`).join("")}
      </div>
    </aside>
  </div>`;
  const cv=$("#edCanvas");
  edRenderCanvas(cv,d,ED_MAX_PREVIEW);
  $("#edUndo").onclick=()=>{if(editor.hi>0){editor.hi--;editor.doc=JSON.parse(JSON.stringify(editor.hist[editor.hi]));renderEditor()}};
  $("#edRedo").onclick=()=>{if(editor.hi<editor.hist.length-1){editor.hi++;editor.doc=JSON.parse(JSON.stringify(editor.hist[editor.hi]));renderEditor()}};
  $("#edReset").onclick=()=>{editor.doc=edNeutralDoc();edPush();editor.cropMode=false;editor.cropRect=null;renderEditor()};
  $("#edAnother").onclick=()=>{editor=null;renderEditor()};
  $("#edFmt").value=editor.fmt;$("#edFmt").onchange=e=>editor.fmt=e.target.value;
  $("#edSvc").value=editor.svc;$("#edSvc").onchange=e=>editor.svc=e.target.value;
  if(!editor.cropMode){
    $("#edCrop").onclick=()=>{editor.cropMode=true;editor.cropRect={x:.1,y:.1,w:.8,h:.8};renderEditor()};
    $("#edRotL").onclick=()=>{editor.doc.rotation=((editor.doc.rotation+270)%360);edPush();renderEditor()};
    $("#edRotR").onclick=()=>{editor.doc.rotation=((editor.doc.rotation+90)%360);edPush();renderEditor()};
    $("#edFlipH").onclick=()=>{editor.doc.flipH=!editor.doc.flipH;edPush();renderEditor()};
    $("#edFlipV").onclick=()=>{editor.doc.flipV=!editor.doc.flipV;edPush();renderEditor()};
    const rz=$("#edResize");
    rz.onchange=()=>{const v2=parseInt(rz.value,10);if(!isNaN(v2)&&v2>0){
      const natW=editor.src.naturalWidth||editor.src.width;const cw=(editor.doc.crop||{w:natW}).w;
      editor.doc.resizeWidth=clamp(Math.round(v2),16,cw*4)===Math.round(cw)?null:clamp(Math.round(v2),16,cw*4);edPush();renderEditor()}};
  } else {
    $("#edCropApply").onclick=edApplyCrop;
    $("#edCropCancel").onclick=()=>{editor.cropMode=false;editor.cropRect=null;renderEditor()};
    bindCropGestures();
  }
  $$("[data-preset]",v).forEach(b=>b.onclick=()=>{editor.doc.adj=Object.assign({},NEUTRAL,ED_PRESETS[b.dataset.preset],{opacity:100});editor.doc.preset=b.dataset.preset;edPush();renderEditor()});
  $$("[data-adj]",v).forEach(r=>r.oninput=()=>{editor.doc.adj[r.dataset.adj]=parseFloat(r.value);editor.doc.preset="custom";
    edRenderCanvas(cv,editor.doc,ED_MAX_PREVIEW);r.parentElement.querySelector("b").textContent=r.value});
  $$("[data-adj]",v).forEach(r=>r.onchange=()=>edPush());
  $("#edDl").onclick=edDownload;
  $("#edUp").onclick=edUpload;
}
function edApplyCrop(){
  if(!editor.cropRect)return;
  const natW=editor.src.naturalWidth||editor.src.width,natH=editor.src.naturalHeight||editor.src.height;
  const r=editor.cropRect,{rotation,flipH,flipV}=editor.doc;
  const corners=[[r.x,r.y],[r.x+r.w,r.y],[r.x,r.y+r.h],[r.x+r.w,r.y+r.h]];
  const mapped=corners.map(([u,vv])=>{
    let x,y;
    switch(rotation){case 90:x=vv;y=1-u;break;case 180:x=1-u;y=1-vv;break;case 270:x=1-vv;y=u;break;default:x=u;y=vv}
    if(flipH)x=1-x;if(flipV)y=1-y;
    return[x,y];
  });
  const xs=mapped.map(c=>c[0]),ys=mapped.map(c=>c[1]);
  const base={x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};
  const prev=editor.doc.crop||{x:0,y:0,w:natW,h:natH};
  editor.doc.crop={x:Math.round(prev.x+base.x*prev.w),y:Math.round(prev.y+base.y*prev.h),
    w:Math.max(16,Math.round(base.w*prev.w)),h:Math.max(16,Math.round(base.h*prev.h))};
  editor.cropMode=false;editor.cropRect=null;edPush();renderEditor();toast(T().cropApplied,"ok");
}
function bindCropGestures(){
  const stage=$("#edStage"),box=$(".cropbox");
  if(!box)return;
  let drag=null;
  const pd=(e,mode,corner)=>{e.preventDefault();e.stopPropagation();
    drag={mode,corner,sx:e.clientX,sy:e.clientY,rect:Object.assign({},editor.cropRect)};
    (e.target).setPointerCapture&&e.target.setPointerCapture(e.pointerId)};
  const pm=e=>{
    if(!drag)return;
    const b=stage.getBoundingClientRect();
    const dx=(e.clientX-drag.sx)/b.width,dy=(e.clientY-drag.sy)/b.height;
    const r=Object.assign({},drag.rect),mn=.08;
    if(drag.mode==="move"){r.x=clamp(r.x+dx,0,1-r.w);r.y=clamp(r.y+dy,0,1-r.h)}
    else{const c=drag.corner||"se";
      if(c.includes("w")){const nx=clamp(r.x+dx,0,r.x+r.w-mn);r.w+=r.x-nx;r.x=nx}
      if(c.includes("e"))r.w=clamp(r.w+dx,mn,1-r.x);
      if(c.includes("n")){const ny=clamp(r.y+dy,0,r.y+r.h-mn);r.h+=r.y-ny;r.y=ny}
      if(c.includes("s"))r.h=clamp(r.h+dy,mn,1-r.y)}
    editor.cropRect=r;
    box.style.left=(r.x*100)+"%";box.style.top=(r.y*100)+"%";
    box.style.width=(r.w*100)+"%";box.style.height=(r.h*100)+"%";
  };
  const pu=()=>{drag=null};
  box.addEventListener("pointerdown",e=>pd(e,"move"));
  box.addEventListener("pointermove",pm);box.addEventListener("pointerup",pu);
  $$(".ch",box).forEach(h=>{
    const corner=h.classList.contains("nw")?"nw":h.classList.contains("ne")?"ne":h.classList.contains("sw")?"sw":"se";
    h.addEventListener("pointerdown",e=>pd(e,"resize",corner));
    h.addEventListener("pointermove",pm);h.addEventListener("pointerup",pu);
  });
}
async function edExport(){
  const cv=document.createElement("canvas");
  edRenderCanvas(cv,editor.doc,ED_MAX_EXPORT);
  let t=editor.fmt==="keep"?editor.type:editor.fmt;
  if(t==="image/gif"||t==="image/bmp"||t==="image/tiff")t="image/png";
  const blob=await new Promise(r=>cv.toBlob(r,t,t.includes("jpeg")||t.includes("webp")?.92:undefined));
  cv.width=0;cv.height=0;
  return blob;
}
async function edDownload(){
  const blob=await edExport();
  if(!blob){toast(T().errSrv,"err");return}
  const base=editor.name.replace(/\.[^.]+$/,"");
  const ext=blob.type.includes("jpeg")?"jpg":blob.type.includes("webp")?"webp":"png";
  downloadBlob(blob,base+"-معدلة."+ext);
  toast(T().dlDone,"ok");
}
async function edUpload(){
  const blob=await edExport();
  if(!blob)return;
  const L=LIMITS[editor.svc];
  if(blob.size>L.max){toast(`${T().errLarge} (${L.label} — ${fmtBytes(L.max)})`,"err");return}
  const base=editor.name.replace(/\.[^.]+$/,"");
  const ext=blob.type.includes("jpeg")?"jpg":blob.type.includes("webp")?"webp":"png";
  const name=base+"-معدلة."+ext;
  toast(T().uploading);
  const r=await uploadTo(editor.svc,blob,name,null,null);
  if(r.ok){
    const img={id:uid(),url:r.url,thumb:r.thumb||r.url,name,service:editor.svc,size:blob.size,uploadedAt:new Date().toISOString()};
    const al=store.albums.find(a=>a.id==="general")||store.albums[0];
    if(!al.images.some(i=>i.url===img.url)){ /* منع التكرار عند عدة عمليات متتابعة */
      al.images.push(img);store.history.unshift(Object.assign({albumTitle:al.title},img));
      if(tryPersist())refreshUI();
    }
    toast(T().uploadDone+" — "+L.label,"ok");
  }else toast(r.msg||T().errSrv,"err");
}

/* ---------- 15) اللصق + ثيمات + لغة ---------- */
window.addEventListener("paste",e=>{
  const files=Array.from(e.clipboardData?e.clipboardData.files:[]).filter(f=>f.type.startsWith("image/"));
  if(!files.length)return;
  e.preventDefault();
  if(activeTab==="upload"){addFiles(files);toast(T().pasteN(files.length),"ok")}
  else if(activeTab==="editor"){edLoad(files[0],files[0].name)}
});
$("#themeBtn").onclick=()=>{const p=$("#themePop");p.classList.toggle("open");$("#themeBtn").setAttribute("aria-expanded",p.classList.contains("open"))};
document.addEventListener("click",e=>{if(!e.target.closest(".tmenu"))$("#themePop").classList.remove("open")});
$("#langBtn").onclick=()=>{const p=$("#langPop");p.classList.toggle("open");$("#langBtn").setAttribute("aria-expanded",p.classList.contains("open"))};
document.addEventListener("click",e=>{if(!e.target.closest(".tmenu")||e.target.closest("#langPop")){if(!e.target.closest(".tmenu"))$("#langPop").classList.remove("open")}});
$("#modeBtn").onclick=toggleMode;
/* الثيم الافتراضي القابل للتخصيص (للزائر الجديد فقط — لا يمس اختيار الزائر المحفوظ) */
if(BRAND.defaultTheme&&!localStorage.getItem("softara_theme_v2")&&!localStorage.getItem("softara_theme"))store.settings.theme=BRAND.defaultTheme;
const __th=normalizeTheme(store.settings.theme);
store.settings.theme=__th.theme;
if(store.settings.mode!=="dark")store.settings.mode=__th.mode;
applyThemeToDom();

/* ---------- 15ب) حماية ردعية (Deterrence — ليست حماية مطلقة) ----------
   تُصعّب الوصول العادي (زر يمين/تحديد أكواد/اختصارات المصدر) دون تعطيل وظائف المستخدم:
   الحقول والروابط وأسماء الصور (.allow-copy) وأزرار النسخ الأصلية تعمل كالمعتاد.
   ملاحظة ملزمة: كود المتصفح قابل للاستخراج دائمًا — لا تُوضع أسرار هنا أصلًا. */
(function(){
  const allow=e=>{const t=e.target;return !!(t&&t.closest&&t.closest("input,textarea,[contenteditable],.allow-copy,a[href]"))};
  document.addEventListener("contextmenu",e=>{if(!allow(e))e.preventDefault()});
  document.addEventListener("copy",e=>{if(!allow(e))e.preventDefault()});
  document.addEventListener("cut",e=>{if(!allow(e))e.preventDefault()});
  document.addEventListener("keydown",e=>{
    const k=(e.key||"").toLowerCase();
    if((e.ctrlKey||e.metaKey)&&(k==="u"||k==="s")){e.preventDefault();return}
    if(k==="f12"||((e.ctrlKey||e.metaKey)&&e.shiftKey&&(k==="i"||k==="j"||k==="c"||k==="k"))){e.preventDefault();return}
  });
})();

/* ---------- 16) الإقلاع ---------- */
renderAll();
