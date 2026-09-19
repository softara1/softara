/* ============================================================
   سوفتارا — منطق صفحة الإرسال (مُحدَّث للإصدار v3)
   ============================================================
   التغيير في v3 (بناءً على طلب المستخدم):
     - كل الألواح مغلقة افتراضياً، لا نفتح أي لوح تلقائياً.
     - المستخدم يضغط على الزر لفتح اللوح الذي يريد.
   الإصلاحات السابقة المحفوظة:
     - استبدال "إخفاء زر اللوح الفارغ" بـ "رسالة توضيحية".
   ============================================================ */
(function () {
    'use strict';

    function initPostingDefaults() {
        if (!/\/post\b/.test(window.location.pathname)) { return; }
        var toolbar = document.getElementById('postingOptionsToolbar');
        if (!toolbar) { return; }

        /* لا نفتح أي لوح افتراضياً — كلها مغلقة حتى يضغط المستخدم */

        var buttons = toolbar.querySelectorAll('.posting-collapse-btn');
        var k;
        for (k = 0; k < buttons.length; k++) {
            var pid = buttons[k].getAttribute('data-target');
            var pEl = pid ? document.getElementById(pid) : null;
            if (pEl) {
                var fields = pEl.querySelectorAll('input, textarea, select');
                if (fields.length === 0) {
                    /* بدل إخفاء الزر، نُضيف رسالة توضيحية داخل اللوح */
                    var inner = pEl.querySelector('.posting-panel-inner');
                    if (inner && !inner.querySelector('.posting-empty-notice')) {
                        var notice = document.createElement('div');
                        notice.className = 'posting-empty-notice';
                        notice.style.cssText = 'padding:14px;background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.3);border-radius:8px;color:#92400e;font-size:.9rem;text-align:center;line-height:1.7;margin-top:12px;';
                        var msg = 'هذه الميزة غير مفعّلة حالياً.';
                        if (pid === 'panel-attachments') {
                            msg = '<strong>المرفقات معطّلة حالياً.</strong><br>لتفعيل رفع الملفات في المشاركات، فعّل الميزة من لوحة الإدارة:<br>إدارة عامة > الرسائل والإيميلات > المرفقات > تفعيل المرفقات.';
                        } else if (pid === 'panel-seo') {
                            msg = '<strong>تحسين محركات البحث (SEO) معطّل.</strong><br>لتفعيل حقول SEO، فعّلها من لوحة الإدارة:<br>إدارة عامة > استراتيجية SEO > تفعيل تحسين محركات البحث.';
                        } else if (pid === 'panel-voting') {
                            msg = '<strong>التصويت معطّل في هذا القسم.</strong>';
                        }
                        notice.innerHTML = '<i class="fas fa-info-circle" style="margin-left:6px;"></i>' + msg;
                        inner.appendChild(notice);
                    }
                }
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(initPostingDefaults, 100);
        });
    } else {
        setTimeout(initPostingDefaults, 100);
    }
})();
