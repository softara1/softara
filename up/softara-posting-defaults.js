/* ============================================================
   سوفتارا — فتح لوح "خيارات الموضوع" افتراضياً في صفحة الإرسال
   الخطأ #13: لوحا options و voting مغلقا افتراضياً، والمستخدم قد لا يرى خيارات
              تعطيل BBCode/الإشعار بالردود لأنها شائعة.
   الحل: نفتح panel-options تلقائياً بعد تحميل صفحة /post فقط (وليس reply).
   يُحمَّل من: softara1.github.io/softara/up/softara-posting-defaults.js
   ============================================================ */
(function () {
    'use strict';

    function initPostingDefaults() {
        /* نتأكد أننا في صفحة الإرسال (إنشاء/تعديل موضوع) */
        if (!/\/post\b/.test(window.location.pathname)) { return; }
        var toolbar = document.getElementById('postingOptionsToolbar');
        if (!toolbar) { return; }

        /* إذا كان هناك هاش في URL (مثل #panel-attachments) نترك السلوك الافتراضي يعمل */
        if (window.location.hash && window.location.hash.indexOf('#panel-') === 0) { return; }

        /* نبحث عن زر "خيارات الموضوع" ونفتحه إن لم يكن مفعّلاً */
        var optionsBtn = toolbar.querySelector('[data-target="panel-attachments"]');
        /* نُفضّل فتح لوح المرفقات إن كان متاحاً (يحتوي على حقول)، وإلا نفتح خيارات الموضوع */
        function openPanel(targetId) {
            var target = document.getElementById(targetId);
            if (!target) { return false; }
            var fields = target.querySelectorAll('input, textarea, select');
            if (fields.length === 0) { return false; } /* اللوح فارغ — لا نفتحه */
            var btn = toolbar.querySelector('[data-target="' + targetId + '"]');
            if (btn && !btn.classList.contains('is-active')) {
                btn.click();
            }
            return true;
        }

        /* الأولوية: المرفقات ← السيو ← خيارات الموضوع */
        if (openPanel('panel-attachments')) { return; }
        if (openPanel('panel-seo')) { return; }
        openPanel('panel-options'); /* هذا اللوح دائماً يحوي 4 checkboxes */
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            /* ننتظر قليلاً ليتسنّى لسكربت posting_body الأصلي إنشاء الألواح */
            setTimeout(initPostingDefaults, 100);
        });
    } else {
        setTimeout(initPostingDefaults, 100);
    }
})();
