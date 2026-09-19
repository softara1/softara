/* ============================================================
   سوفتارا — كاتم تحذيرات PushManager
   الخطأ: "Failed to subscribe the user: Subscription failed - no active Service Worker"
   السبب: المنتدى يحاول تفعيل إشعارات Web Push بدون Service Worker مسجَّل.
   الحل: نسكّت الأخطاء في الـ Console بفحص وجود Service Worker قبل أي محاولة اشتراك.
   يُحمَّل من: softara1.github.io/softara/up/softara-push-silencer.js
   ============================================================ */
(function () {
    'use strict';

    /* 1) اعتراض navigator.serviceWorker.register لتفادي التسجيلات الفاشلة */
    if ('serviceWorker' in navigator) {
        var originalRegister = navigator.serviceWorker.register.bind(navigator.serviceWorker);
        navigator.serviceWorker.register = function (scriptURL, options) {
            return originalRegister(scriptURL, options).catch(function (err) {
                if (window.console && console.warn) {
                    console.warn('[softara] تم منع محاولة تسجيل Service Worker فاشلة:', scriptURL, err.message);
                }
                /* نُرجع Promise فارغ بدل رمي الخطأ لإسكات الـ Console */
                return Promise.resolve({ scope: '/', unregister: function () { return Promise.resolve(); } });
            });
        };
    }

    /* 2) اعتراض PushManager.subscribe لمنع الأخطاء الصاخبة */
    if ('PushManager' in window && PushManager.prototype) {
        var originalSubscribe = PushManager.prototype.subscribe;
        PushManager.prototype.subscribe = function (options) {
            /* إذا لم يكن هناك Service Worker مسجَّل، نُرجع Promise فارغ بدل رمي خطأ */
            if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
                if (window.console && console.info) {
                    console.info('[softara] تم تخطي PushManager.subscribe لأنه لا يوجد Service Worker نشط.');
                }
                return Promise.resolve({
                    endpoint: '',
                    unsubscribe: function () { return Promise.resolve(true); },
                    getKey: function () { return null; }
                });
            }
            return originalSubscribe.call(this, options).catch(function (err) {
                if (window.console && console.warn) {
                    console.warn('[softara] فشل اشتراك Push لكن تم إسكات الخطأ:', err.message);
                }
                return Promise.resolve({
                    endpoint: '',
                    unsubscribe: function () { return Promise.resolve(true); },
                    getKey: function () { return null; }
                });
            });
        };
    }

    /* 3) التقاط أخطاء window.onerror غير المعالَجة الناتجة عن Push */
    window.addEventListener('unhandledrejection', function (event) {
        if (event && event.reason && typeof event.reason.message === 'string') {
            var msg = event.reason.message;
            if (msg.indexOf('subscribe') !== -1 || msg.indexOf('PushManager') !== -1 || msg.indexOf('Service Worker') !== -1 || msg.indexOf('Subscription') !== -1) {
                if (window.console && console.info) {
                    console.info('[softara] تم التقاط وتهميش promise مرفوض متعلق بـ Push:', msg);
                }
                event.preventDefault();
            }
        }
    });

    if (window.console && console.info) {
        console.info('[softara] ✅ تم تحميل كاتم تحذيرات PushManager بنجاح');
    }
})();
