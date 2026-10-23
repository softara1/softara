document.addEventListener("DOMContentLoaded", function() {
    // 1. تحديد مكان إضافة الشريط (بعد رأس الموضوع مباشرة)
    var target = document.querySelector(".msr-topic-header");
    if (!target) {
        target = document.querySelector(".topic-header");
        if (!target) return;
    }

    // 2. النصوص المطلوبة
    var text1 = "| ولله الحمد تم تنصيب الستايل الجديد لمنتدانا بشكل جميل وأنيق ولا ننسى أن منتديات مسرووور السند لمنتدانا وكلنا شكر لمنتديات مسرووور على الوقفة والمساعدة لنا ونتمنى لهم مزيدًا من الارتقاء والازدهار في مسيرتهم الجميلة لأحلى منتدى |";
    var text2 = "لقد تم الانتهاء من وضع برامج التواصل الاجتماعي للمنتدى لمتابعتنا بشكل دوري لجديدنا من مواضيع وأخبار ورياضة وغيرها من نقاشات وصور وفيديوهات | حساب YouTube: @FatimaAlharthi-b8d | حساب Instagram: V.NOW | حساب FaceBook: فطوم-الحارثي/100003199416442/ | حساب X: x.com/banat2day_mam9 | حساب Threads: @v.now | حساب Reddit: bnat2day | حساب Pinterest: fatimaofficialoman";

    // 3. دالة إنشاء شريط متحرك
    function createScrollBar(text) {
        var container = document.createElement("div");
        container.style.cssText =
            "background: #2563EB; padding: 10px 0; border-radius: 10px; " +
            "margin: 8px 0; overflow: hidden; border: 2px solid #1D4ED8; " +
            "box-shadow: 0 2px 10px rgba(37,99,235,0.3); position: relative; direction: ltr;";

        var track = document.createElement("div");
        track.className = "scroll-pause";
        track.style.cssText =
            "display: flex; width: max-content; " +
            "animation: scrollLeftToRight var(--speed) linear infinite; " +
            "will-change: transform; direction: rtl;";

        // ❖ الفاصلة الجديدة المتحركة دوران دائم
        var content = text + ' <span class="rotate">❖</span> ';

        var span = document.createElement("span");
        span.style.cssText =
            "color: #fff; font-weight: bold; font-size: 16px; " +
            "font-family: 'Simplified Arabic', sans-serif; padding: 0 15px; " +
            "display: inline-block; white-space: nowrap;";
        
        span.innerHTML = content.repeat(10);

        var span2 = span.cloneNode(true);
        
        track.appendChild(span);
        track.appendChild(span2);
        container.appendChild(track);
        
        return container;
    }

    // 4. إنشاء الشريطين
    var bar1 = createScrollBar(text1);
    var bar2 = createScrollBar(text2);

    // سرعة الشريط الأول
    bar1.style.setProperty("--speed", "180s");

    // سرعة الشريط الثاني
    bar2.style.setProperty("--speed", "280s");

    // 5. إضافة الـ Keyframes + إيقاف الحركة + دوران ❖
    if (!document.getElementById("scrollKeyframes")) {
        var style = document.createElement("style");
        style.id = "scrollKeyframes";
        style.textContent =
            "@keyframes scrollLeftToRight { " +
            "0% { transform: translateX(-50%); } " +
            "100% { transform: translateX(0); } " +
            "}" +

            /* إيقاف الحركة عند مرور الماوس */
            ".scroll-pause:hover { animation-play-state: paused !important; }" +

            /* دوران ❖ */
            ".rotate { display:inline-block; animation: spin 2s linear infinite; }" +
            "@keyframes spin { " +
            "from { transform: rotate(0deg); }" +
            "to   { transform: rotate(360deg); }" +
            "}";
        document.head.appendChild(style);
    }

    // 6. إدراج الشريطين بعد الـ header
    target.insertAdjacentElement("afterend", bar1);
    bar1.insertAdjacentElement("afterend", bar2);
});
