# سوفتارا TV v2.2.0 — مشروع بصفحتين مستقلتين

منصة سوفتارا التلفزيونية لمنتدى سوفتارا (Forumotion — AwesomeBB)، من split إعادة الهيكلة v2.2.0:
صفحة مستقلة للبث المباشر + صفحة مستقلة للأفلام والمسلسلات والمكتبة المرئية،
مع نواة ومشغّل مشتركين — وخمسة مزوّدين فعليين: HLS · MP4 · YouTube · DailyMotion · OK.ru.

## بنية المشروع

```
tv/
├── shared/                      ← المشترك بين الصفحتين (يُحمَّل في كلتيهما)
│   ├── css/softara-shared.css   الأساسيات + الترويسة + قشرة المشغل + التذييل + المقدمة + CC
│   ├── js/softara-icons.js      حقن مكتبة الأيقونات SVG (بدل الإيموجي)
│   ├── js/softara-shared.js     النواة: أدوات + تخزين + إشعارات + محمّلات hls.js/YouTube كسولة + تفضيل الترجمة
│   └── js/softara-player.js     محرك المشغل الموحد: المزوّدون الخمسة + التفكيك الجذري + الجودات + الترجمة + ملء الشاشة
├── live/                        ← صفحة Softara Live TV (بث مباشر فقط)
│   ├── css/softara-live.css     قوائم القنوات (لوحة الهاتف + لوح الحاسب)
│   ├── data/softara-live-data.js قنوات البث — **أضف القنوات هنا**
│   ├── js/softara-live-app.js   منطق الصفحة: تصنيفات مشتقة + بحث + تنقّل + تشغيل تلقائي مكتوم
│   ├── forum/softara-live-tv-forum.html  نسخة المنتدى الخفيفة (يُلصق محتواها في أحلى منتدى)
│   └── live.html                نسخة معاينة مستقلة بمسارات نسبية (للفحص المحلي فقط)
├── media/                       ← صفحة Softara Movies & Media (أفلام/مسلسلات/أرشيف)
│   ├── css/softara-media.css    الأقسام + الشبكة + ورقة التفاصيل + متابعة المشاهدة
│   ├── data/softara-media-data.js محتوى المكتبة — **أضف الأفلام والمسلسلات هنا**
│   ├── js/softara-media-app.js  منطق الصفحة: أقسام + بحث + مواسم/حلقات + متابعة + مفضلة
│   ├── forum/softara-media-forum.html    نسخة المنتدى الخفيفة
│   └── media.html               نسخة معاينة مستقلة بمسارات نسبية
├── backup/v2.1.2/               نسخة احتياطية كاملة للنسخة السابقة (zip + SHA-256 + لقطات صفحات المنتدى)
├── report/                      ملفات التقرير الفني للإصدار 2.1 (مرجع)
└── README.md
```

**لا توجد ملفات بيانات غير مستخدمة:** كل ملف بيانات (`softara-live-data.js` و`softara-media-data.js`) يُحمَّل فعليًا في صفحته.
(ملف `data/softara-tv-data.json` القديم لم يكن مستخدمًا في أي صفحة — أُزيل من هذا الإصدار وتبقى نسخته في وسم v2.1.2.)

## التركيب في منتدى أحلى منتدى
1. لوحة الإدارة ← عرض (Display) ← إدارة صفحات HTML (Pages management).
2. أنشئ صفحة جديدة والصق محتوى `live/forum/softara-live-tv-forum.html` **بوضع المصدر (Source)** — لا تتبدل للمحرر المرئي إطلاقًا.
3. اختر: «لا» لاستخدام ترويسة وتذييل المنتدى + الترميز UTF-8 → احفظ.
4. كرر الخطوات بمحتوى `media/forum/softara-media-forum.html` في صفحة ثانية.
5. (اختياري بعد معرفة العنوانين `/hXX-…`) حدّث حقل `links.companion` في ملفي البيانات ليعمل رابط «الأفلام والمسلسلات / البث المباشر» في تذييل كل صفحة.

> حجم صفحة Live ≈ 15.8 ألف حرف وصفحة Media ≈ 16.6 ألف حرف — ضمن حد أحلى منتدى بهامش مريح
> (الحد الذي فشل سابقًا كان بسبب صفحة مجمّعة بحجم 160 ألف حرف).

## تحديث المحتوى أو الكود
1. عدّل الملف المطلوب فقط:
   - قناة جديدة → `live/data/softara-live-data.js` (أي `cat` جديد يظهر تلقائيًا كزر تصفية)
   - فيلم/مسلسل/حلقة → `media/data/softara-media-data.js` (`items` للمفرد و`groups` لقوائم الحلقات)
   - إصلاح منطق/تصميم → الملف المعني في `shared/` أو `live/` أو `media/`
2. ارفع التغيير إلى `main` ثم أنشئ **وسم إصدار جديد** (مثال: `v2.2.1`).
3. في صفحتي المنتدى: استبدل `@v2.2.0` بالوسم الجديد في الروابط (10 روابط لكل صفحة).

> لماذا وسوم إصدارات؟ jsDelivr يخزّن الملفات مؤقتًا؛ الوسم يضمن حصول الزوار على النسخة الجديدة فورًا وبثبات.

## الروابط الجاهزة (الوسم v2.2.0)

### مشترك
- الأنماط: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/shared/css/softara-shared.css`
- الأيقونات: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/shared/js/softara-icons.js`
- النواة: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/shared/js/softara-shared.js`
- المشغل: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/shared/js/softara-player.js`

### صفحة Live TV
- الأنماط: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/live/css/softara-live.css`
- البيانات: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/live/data/softara-live-data.js`
- المنطق: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/live/js/softara-live-app.js`

### صفحة Movies & Media
- الأنماط: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/media/css/softara-media.css`
- البيانات: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/media/data/softara-media-data.js`
- المنطق: `https://cdn.jsdelivr.net/gh/softara1/softara@v2.2.0/tv/media/js/softara-media-app.js`

**ترتيب السكربتات إلزامي في صفحتي المنتدى:** icons → shared → player → data → app (كلاسيكية، بلا وحدات — متوافقة مع أحلى منتدى).

## توافق الترقية مع v2.1.2 (صفحة h19-library القديمة)
- صفحة v2.1.2 المجمّعة تبقى تعمل كما هي (روابطها مثبتة على وسم `v2.1.2` ولا تتأثر بأي تعديل هنا).
- المفضلة وسجل «متابعة المشاهدة» وتفضيل الترجمة والسمة (ليلي/نهاري) تستخدم **نفس مفاتيح التخزين المحلي** —
  تفضيلات المستخدم من النسخة السابقة تعمل في الصفحتين الجديدتين دون فقدان أي شيء.
- القنوات السبع والمحتوى (29 عنصرًا + 7 مجموعات بـ 62 حلقة) نُقلت حرفيًا بتطابق كامل (تحقق آلي: `items identical: true`).

## الاختبار المحلي
افتح `live/live.html` و`media/media.html` عبر خادم محلي (مثال: `python3 -m http.server`) — لا تفتحهما بـ file://
حتى تعمل واجهة يوتيوب (تحتاج origin). نسخ المنتدى في `live/forum/` و`media/forum/` تستخدم روابط jsDelivr الجاهزة.
