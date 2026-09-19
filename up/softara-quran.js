/* ============================================================
   مشغل القرآن الكريم - سوفتارا (v8 — استمرار التشغيل في الخلفية)
   ============================================================
   v8: الاستمرار في الخلفية عبر الصفحات بدون إظهار مشغل أسفل الصفحة.
   الحيلة: نحفظ حالة التشغيل (src, currentTime, paused, reciter, surah)
   في localStorage، وعند تحميل أي صفحة جديدة، نُنشئ <audio> مخفياً
   ونستأنف التشغيل من نفس اللحظة دون إظهار أي عنصر مرئي.

   مزايا إضافية في v8:
   - القارئ السوداني "الزين محمد أحمد"
   - زر راديو مباشر
   - توقيع "تصميم وبرمجة عوض السوداني" أسفل النافذة
   ============================================================ */
(function () {
var RECITERS = [
    ["مشاري راشد العفاسي", "https://server8.mp3quran.net/afs/"],
    ["ماهر المعيقلي", "https://server12.mp3quran.net/maher/"],
    ["عبدالباسط عبدالصمد", "https://server7.mp3quran.net/basit/"],
    ["محمود خليل الحصري", "https://server13.mp3quran.net/husr/"],
    ["عبدالرحمن السديس", "https://server11.mp3quran.net/sds/"],
    ["ياسر الدوسري", "https://server11.mp3quran.net/yasser/"],
    ["أحمد بن علي العجمي", "https://server10.mp3quran.net/ajm/"],
    ["ناصر القطامي", "https://server6.mp3quran.net/qtm/"],
    ["أبو بكر الشاطري", "https://server11.mp3quran.net/shatri/"],
    ["إبراهيم الأخضر", "https://server6.mp3quran.net/akdr/"],
    ["الزين محمد أحمد", "https://server13.mp3quran.net/zain/"]
];
var SURAHS = ["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدّخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الإنفطار","المطففين","الإنشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"];
var filled = false;
var STATE_KEY = 'quran_state_v8';
var RADIO_URL = 'https://server13.mp3quran.net/zain/093.mp3'; /* راديو القرآن الكريم - تلاوة متواصلة */

function pad3(n) { n = String(n); while (n.length < 3) { n = '0' + n; } return n; }

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

function loadCurrent(autoplay) {
    var rSel = document.getElementById('quranReciter');
    var sSel = document.getElementById('quranSurah');
    var audio = document.getElementById('quranAudio');
    var now = document.getElementById('quranNowPlaying');
    if (!rSel || !sSel || !audio) { return; }
    var r = parseInt(rSel.value, 10) || 0;
    var s = parseInt(sSel.value, 10) || 1;
    audio.src = RECITERS[r][1] + pad3(s) + '.mp3';
    if (now) { now.textContent = 'سورة ' + SURAHS[s - 1] + ' — ' + RECITERS[r][0]; }
    try {
        localStorage.setItem('quran_reciter', r);
        localStorage.setItem('quran_surah', s);
    } catch (e) { }
    if (autoplay) { audio.play().catch(function () { }); }
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
    if (audio && !audio.getAttribute('src')) {
        /* لو لم يكن هناك src، نستعيد من الحالة المحفوظة */
        var state = loadState();
        if (state && state.src && !state.paused) {
            audio.src = state.src;
            audio.currentTime = state.currentTime || 0;
            updateNowPlaying(state.reciter, state.surah);
        } else {
            loadCurrent(false);
        }
    } else if (audio && audio.getAttribute('src')) {
        /* لو الصوت يعمل، نُحدّث الآن بلينغ */
        var rSel = document.getElementById('quranReciter');
        var sSel = document.getElementById('quranSurah');
        if (rSel && sSel) {
            var r = parseInt(rSel.value, 10) || 0;
            var s = parseInt(sSel.value, 10) || 1;
            updateNowPlaying(r, s);
        }
    }
};

function updateNowPlaying(r, s) {
    var now = document.getElementById('quranNowPlaying');
    if (!now) { return; }
    if (r == null || r < 0 || r >= RECITERS.length) { r = 0; }
    if (s == null || s < 1 || s > 114) { s = 1; }
    now.textContent = 'سورة ' + SURAHS[s - 1] + ' — ' + RECITERS[r][0];
}

window.closeQuranPlayer = function () {
    var m = document.getElementById('quranModal');
    if (m) { m.classList.remove('active'); }
    /* لا نوقف الصوت — يستمر بالعمل في الخلفية */
};

/* ===== حفظ/استعادة الحالة في localStorage ===== */
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
            isRadio: audio.getAttribute('data-radio') === '1',
            ts: Date.now()
        };
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) { }
}

function loadState() {
    try {
        var raw = localStorage.getItem(STATE_KEY);
        if (!raw) { return null; }
        return JSON.parse(raw);
    } catch (e) { return null; }
}

function clearState() {
    try { localStorage.removeItem(STATE_KEY); } catch (e) { }
}

/* ===== راديو مباشر ===== */
window.playQuranRadio = function () {
    var audio = document.getElementById('quranAudio');
    var now = document.getElementById('quranNowPlaying');
    if (!audio) { return; }
    audio.src = RADIO_URL;
    audio.setAttribute('data-radio', '1');
    audio.play().catch(function () { });
    if (now) { now.textContent = 'راديو القرآن الكريم المباشر — تلاوة متواصلة'; }
    /* نُحدّث الزر ليُظهر حالة التشغيل */
    var radioBtn = document.getElementById('quranRadioBtn');
    if (radioBtn) {
        radioBtn.innerHTML = '<i class="fas fa-stop"></i> <span>إيقاف الراديو</span>';
        radioBtn.classList.add('radio-playing');
    }
};

window.stopQuranRadio = function () {
    var audio = document.getElementById('quranAudio');
    if (!audio) { return; }
    audio.pause();
    audio.removeAttribute('data-radio');
    var radioBtn = document.getElementById('quranRadioBtn');
    if (radioBtn) {
        radioBtn.innerHTML = '<i class="fas fa-broadcast-tower"></i> <span>راديو مباشر</span>';
        radioBtn.classList.remove('radio-playing');
    }
};

window.toggleQuranRadio = function () {
    var radioBtn = document.getElementById('quranRadioBtn');
    /* نعتمد على حالة الزر نفسه — إذا كان مفعّلاً نُوقفه، وإلا نُشغّله */
    if (radioBtn && radioBtn.classList.contains('radio-playing')) {
        window.stopQuranRadio();
    } else {
        window.playQuranRadio();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('quranAudio');
    if (audio) {
        audio.addEventListener('ended', function () { window.quranStep(1); });
        /* حفظ الحالة كل 5 ثوانٍ أثناء التشغيل */
        setInterval(function () {
            if (audio && !audio.paused) { saveState(); }
        }, 5000);
        audio.addEventListener('pause', saveState);
        audio.addEventListener('play', saveState);
        audio.addEventListener('timeupdate', function () {
            if (Math.floor(audio.currentTime) % 5 === 0) { saveState(); }
        });
    }
    var m = document.getElementById('quranModal');
    if (m) {
        m.addEventListener('click', function (e) {
            if (e.target === this) { window.closeQuranPlayer(); }
        });
    }

    /* ===== استعادة الحالة عند تحميل أي صفحة =====
       لو كان المستخدم يستمع قبل تغيير الصفحة، نُنشئ audio مخفياً
       ونستأنف التشغيل من نفس اللحظة دون إظهار أي عنصر مرئي. */
    var state = loadState();
    if (state && state.src && !state.paused) {
        var audioEl = document.getElementById('quranAudio');
        if (audioEl) {
            audioEl.src = state.src;
            audioEl.currentTime = state.currentTime || 0;
            if (state.isRadio) {
                audioEl.setAttribute('data-radio', '1');
            }
            /* نحاول استئناف التشغيل تلقائياً */
            audioEl.play().catch(function () {
                /* لو منع المتصفح autoplay، نعرض زر "استئناف" في quranNowPlaying */
                var now = document.getElementById('quranNowPlaying');
                if (now && state.isRadio) {
                    now.innerHTML = 'راديو القرآن الكريم المباشر — <button onclick="document.getElementById(\'quranAudio\').play()" style="background:var(--primary-color,#8b5cf6);color:#fff;border:none;padding:6px 16px;border-radius:6px;cursor:pointer;font-family:inherit;">استئناف</button>';
                } else if (now) {
                    var surahName = state.surah ? SURAHS[state.surah - 1] : '';
                    var reciterName = state.reciter != null ? RECITERS[state.reciter][0] : '';
                    now.innerHTML = 'سورة ' + surahName + ' — ' + reciterName + ' — <button onclick="document.getElementById(\'quranAudio\').play()" style="background:var(--primary-color,#8b5cf6);color:#fff;border:none;padding:6px 16px;border-radius:6px;cursor:pointer;font-family:inherit;">استئناف</button>';
                }
            });
        }
    }
});
})();
