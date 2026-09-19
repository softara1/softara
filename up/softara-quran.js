/* ============================================================
   مشغل القرآن الكريم - سوفتارا (v7 — استمرار التشغيل عبر الصفحات)
   ============================================================
   التغيير في v7:
     - audio ثابت في overall_header (خارج #quranModal)
     - حفظ حالة التشغيل (src, currentTime, paused, reciter, surah)
       في localStorage كل ثانية
     - عند تحميل أي صفحة: استعادة الحالة واستئناف التشغيل تلقائياً
       (إن كان المستخدم يستمع قبل تغيير الصفحة)
     - عند الضغط خارج #quranModal: لا نوقف الصوت، فقط نُخفي النافذة
   ============================================================ */
(function () {
var RECITERS = [["مشاري راشد العفاسي","https://server8.mp3quran.net/afs/"],["ماهر المعيقلي","https://server12.mp3quran.net/maher/"],["عبدالباسط عبدالصمد","https://server7.mp3quran.net/basit/"],["محمود خليل الحصري","https://server13.mp3quran.net/husr/"],["عبدالرحمن السديس","https://server11.mp3quran.net/sds/"],["ياسر الدوسري","https://server11.mp3quran.net/yasser/"],["أحمد بن علي العجمي","https://server10.mp3quran.net/ajm/"],["ناصر القطامي","https://server6.mp3quran.net/qtm/"],["أبو بكر الشاطري","https://server11.mp3quran.net/shatri/"],["إبراهيم الأخضر","https://server6.mp3quran.net/akdr/"]];
var SURAHS = ["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدّخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الإنفطار","المطففين","الإنشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"];

var filled = false;
var STATE_KEY = 'quran_state_v7';

function pad3(n) { n = String(n); while (n.length < 3) { n = '0' + n; } return n; }

function buildSrc(r, s) {
    if (r < 0 || r >= RECITERS.length) { r = 0; }
    if (s < 1 || s > 114) { s = 1; }
    return RECITERS[r][1] + pad3(s) + '.mp3';
}

/* حفظ حالة التشغيل في localStorage */
function saveState() {
    var audio = document.getElementById('quranAudio');
    if (!audio) { return; }
    var rSel = document.getElementById('quranReciter');
    var sSel = document.getElementById('quranSurah');
    var r = rSel ? parseInt(rSel.value, 10) : 0;
    var s = sSel ? parseInt(sSel.value, 10) : 1;
    try {
        var state = {
            src: audio.src,
            currentTime: audio.currentTime || 0,
            paused: audio.paused,
            reciter: isNaN(r) ? 0 : r,
            surah: isNaN(s) ? 1 : s,
            ts: Date.now()
        };
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) { }
}

/* استعادة حالة التشغيل من localStorage */
function loadState() {
    try {
        var raw = localStorage.getItem(STATE_KEY);
        if (!raw) { return null; }
        return JSON.parse(raw);
    } catch (e) { return null; }
}

/* مسح الحالة */
function clearState() {
    try { localStorage.removeItem(STATE_KEY); } catch (e) { }
}

function fillLists() {
    if (filled) { return; }
    var rSel = document.getElementById('quranReciter');
    var sSel = document.getElementById('quranSurah');
    if (!rSel || !sSel) { return; }
    var i, opt;
    for (i = 0; i < RECITERS.length; i++) {
        opt = document.createElement('option');
        opt.value = i;
        opt.textContent = RECITERS[i][0];
        rSel.appendChild(opt);
    }
    for (i = 0; i < SURAHS.length; i++) {
        opt = document.createElement('option');
        opt.value = i + 1;
        opt.textContent = (i + 1) + '. سورة ' + SURAHS[i];
        sSel.appendChild(opt);
    }
    /* نستعيد آخر اختيار من الحالة المحفوظة */
    var state = loadState();
    var lr = 0, ls = 1;
    if (state && typeof state.reciter === 'number') { lr = state.reciter; }
    if (state && typeof state.surah === 'number') { ls = state.surah; }
    if (lr >= 0 && lr < RECITERS.length) { rSel.value = lr; }
    if (ls >= 1 && ls <= 114) { sSel.value = ls; }
    filled = true;
}

function updateNowPlaying() {
    var rSel = document.getElementById('quranReciter');
    var sSel = document.getElementById('quranSurah');
    var now = document.getElementById('quranNowPlaying');
    if (!rSel || !sSel || !now) { return; }
    var r = parseInt(rSel.value, 10) || 0;
    var s = parseInt(sSel.value, 10) || 1;
    now.textContent = 'سورة ' + SURAHS[s - 1] + ' — ' + RECITERS[r][0];
}

function loadCurrent(autoplay) {
    var rSel = document.getElementById('quranReciter');
    var sSel = document.getElementById('quranSurah');
    var audio = document.getElementById('quranAudio');
    if (!rSel || !sSel || !audio) { return; }
    var r = parseInt(rSel.value, 10) || 0;
    var s = parseInt(sSel.value, 10) || 1;
    var newSrc = buildSrc(r, s);
    if (audio.src !== newSrc) {
        audio.src = newSrc;
        audio.load();
    }
    updateNowPlaying();
    /* نُظهر الـ audio الثابت في أسفل الصفحة */
    audio.style.display = 'block';
    if (autoplay) {
        audio.play().catch(function () { });
    }
}

window.quranSelectionChanged = function () { loadCurrent(true); };

window.quranStep = function (dir) {
    var sSel = document.getElementById('quranSurah');
    if (!sSel) { return; }
    var s = parseInt(sSel.value, 10) || 1;
    s += dir;
    if (s < 1) { s = 114; }
    if (s > 114) { s = 1; }
    sSel.value = s;
    loadCurrent(true);
};

window.openQuranPlayer = function () {
    fillLists();
    var m = document.getElementById('quranModal');
    if (m) { m.classList.add('active'); }
    var audio = document.getElementById('quranAudio');
    if (audio) {
        /* إن لم يكن هناك src، نحمّل السورة الحالية */
        if (!audio.getAttribute('src')) {
            loadCurrent(false);
        }
        /* نُظهر الـ audio الثابت أيضاً */
        audio.style.display = 'block';
    }
    updateNowPlaying();
};

window.closeQuranPlayer = function () {
    var m = document.getElementById('quranModal');
    if (m) { m.classList.remove('active'); }
    /* لا نوقف الصوت — يستمر بالعمل في الخلفية */
    /* نُبقي الـ audio ظاهراً في أسفل الصفحة ليتمكن المستخدم من إيقافه يدوياً */
    var audio = document.getElementById('quranAudio');
    if (audio && !audio.paused) {
        audio.style.display = 'block';
    }
};

/* نوقف الصوت تماماً وُنخفي المشغل (للزر "إيقاف") */
window.stopQuranPlayer = function () {
    var audio = document.getElementById('quranAudio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.style.display = 'none';
    }
    clearState();
};

document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('quranAudio');
    if (audio) {
        audio.addEventListener('ended', function () { window.quranStep(1); });
        /* حفظ الحالة كل ثانية أثناء التشغيل */
        setInterval(function () {
            if (audio && !audio.paused) { saveState(); }
        }, 1000);
        /* حفظ الحالة عند الإيقاف المؤقت أيضاً */
        audio.addEventListener('pause', saveState);
        audio.addEventListener('play', saveState);
        audio.addEventListener('timeupdate', function () {
            /* حفظ كل 5 ثوانٍ بدل كل ثانية لتقليل العبء */
            if (Math.floor(audio.currentTime) % 5 === 0) { saveState(); }
        });
    }
    var m = document.getElementById('quranModal');
    if (m) {
        m.addEventListener('click', function (e) {
            if (e.target === this) { window.closeQuranPlayer(); }
        });
    }

    /* استعادة الحالة عند تحميل الصفحة — نستأنف التشغيل إن كان يعمل */
    var state = loadState();
    if (state && state.src && !state.paused) {
        /* كان المستخدم يستمع — نستأنف التشغيل تلقائياً */
        var rSel = document.getElementById('quranReciter');
        var sSel = document.getElementById('quranSurah');
        var now = document.getElementById('quranNowPlaying');
        if (audio) {
            audio.src = state.src;
            audio.currentTime = state.currentTime || 0;
            audio.style.display = 'block';
            /* نحاول الاستئناف — قد يفشل بسبب سياسة autoplay */
            audio.play().catch(function () {
                /* لو فشل autoplay، نعرض زر "استئناف التشغيل" */
                if (now) { now.innerHTML = 'سورة ' + (SURAHS[(state.surah || 1) - 1]) + ' — ' + RECITERS[state.reciter || 0][0] + ' — <button onclick="document.getElementById(\'quranAudio\').play()" style="background:var(--primary-color,#8b5cf6);color:#fff;border:none;padding:6px 16px;border-radius:6px;cursor:pointer;font-family:inherit;">استئناف التشغيل</button>'; }
            });
        }
    } else if (state && state.src && state.paused) {
        /* كان متوقف مؤقتاً — نُعيد الحالة فقط دون تشغيل */
        if (audio) {
            audio.src = state.src;
            audio.currentTime = state.currentTime || 0;
            audio.style.display = 'block';
        }
    }
});
})();
