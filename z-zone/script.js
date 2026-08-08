// ============================================================
// المكتبة الرقمية - الجافا سكريبت
// ============================================================

// ===== المتغيرات العامة =====
const DL_FORUM_ID = 14; // غيّر هذا إلى رقم القسم في منتداك
let allTopicsData = [];
let currentViewMode = 'grid';
let searchTimeout;
let itemToDeleteUrl = '';
const ITEMS_PER_PAGE = 8;
let sectionPages = { software: 1, app: 1, pcgame: 1, psgame: 1, ebook: 1 };

const catMap = {
    'software': { name: 'برنامج', icon: 'laptop_windows' },
    'app': { name: 'تطبيق', icon: 'smartphone' },
    'pcgame': { name: 'لعبة PC', icon: 'sports_esports' },
    'psgame': { name: 'لعبة PS', icon: 'gamepad' },
    'ebook': { name: 'كتاب', icon: 'menu_book' }
};

// ===== الترجمة =====
let currentLang = 'ar';
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'ar', includedLanguages: 'ar,en', autoDisplay: false}, 'google_translate_element');
}
function toggleLanguage() {
    let select = document.querySelector('.goog-te-combo');
    if (!select) return;
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    select.value = currentLang;
    select.dispatchEvent(new Event('change'));
    document.getElementById('dlLangBtn').innerText = currentLang === 'ar' ? 'EN' : 'AR';
    document.body.style.direction = currentLang === 'en' ? 'ltr' : 'rtl';
}

// ===== الثيم =====
function toggleTheme() {
    const root = document.documentElement;
    let theme = localStorage.getItem('msr_theme') || 'dark';
    let newTheme = theme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('msr_theme', newTheme);
    document.getElementById('dlThemeBtn').innerHTML = newTheme === 'light' ? '<i class="material-symbols-outlined">dark_mode</i>' : '<i class="material-symbols-outlined">light_mode</i>';
}

// تهيئة الثيم
(function initTheme() {
    const theme = localStorage.getItem('msr_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('dlThemeBtn');
        if (btn) btn.innerHTML = theme === 'light' ? '<i class="material-symbols-outlined">dark_mode</i>' : '<i class="material-symbols-outlined">light_mode</i>';
    });
})();

// ===== شريط التقدم =====
window.addEventListener('scroll', function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    let pBar = document.getElementById("progressBar");
    pBar.style.width = scrolled + "%";
    const scrollBtns = document.getElementById('scrollButtons');
    if (window.scrollY > 200) scrollBtns.classList.add('show');
    else scrollBtns.classList.remove('show');
});

// ===== الوضعيات =====
function setViewMode(mode) {
    currentViewMode = mode;
    document.getElementById('gridBtn').classList.toggle('active', mode === 'grid');
    document.getElementById('listBtn').classList.toggle('active', mode === 'list');
    document.querySelectorAll('.items-grid').forEach(el => el.classList.toggle('list-view', mode === 'list'));
}

// ===== التصفية =====
document.querySelectorAll('.f-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        sectionPages = { software: 1, app: 1, pcgame: 1, psgame: 1, ebook: 1 };
        executeSearchAndFilter();
    });
});

function getActiveFilter() {
    const active = document.querySelector('.f-btn.active');
    return active ? active.dataset.filter : 'all';
}

// ===== البحث =====
document.getElementById('dlSearchInput').addEventListener('input', function() {
    clearTimeout(searchTimeout);
    document.getElementById('dlSearchClear').style.display = this.value.trim() ? 'block' : 'none';
    sectionPages = { software: 1, app: 1, pcgame: 1, psgame: 1, ebook: 1 };
    searchTimeout = setTimeout(executeSearchAndFilter, 300);
});

function clearSearch() {
    document.getElementById('dlSearchInput').value = '';
    document.getElementById('dlSearchClear').style.display = 'none';
    sectionPages = { software: 1, app: 1, pcgame: 1, psgame: 1, ebook: 1 };
    executeSearchAndFilter();
}

// ===== المفضلة =====
function toggleFav(btn, url) {
    let favs = JSON.parse(localStorage.getItem('msr_favs') || '[]');
    if (favs.includes(url)) {
        favs = favs.filter(u => u !== url);
        btn.classList.remove('active');
    } else {
        favs.push(url);
        btn.classList.add('active');
    }
    localStorage.setItem('msr_favs', JSON.stringify(favs));
    if (getActiveFilter() === 'fav') executeSearchAndFilter();
}

// ===== المشاركة =====
function shareLink(url, btn) {
    let fullUrl = url.startsWith('http') ? url : window.location.origin + url;
    navigator.clipboard.writeText(fullUrl).then(() => {
        if (btn) {
            let orig = btn.innerHTML;
            btn.innerHTML = '<i class="material-symbols-outlined">check</i> تم';
            setTimeout(() => btn.innerHTML = orig, 2000);
        }
        showToast('تم نسخ الرابط!');
    });
}

// ===== نسخ المفتاح =====
function copyDlKey(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        let orig = btn.innerHTML;
        btn.innerHTML = '<i class="material-symbols-outlined">check</i> تم';
        setTimeout(() => btn.innerHTML = orig, 2000);
        showToast('تم نسخ المفتاح!');
    });
}

// ===== التنفيذ الرئيسي =====
function executeSearchAndFilter() {
    let query = document.getElementById('dlSearchInput').value.toLowerCase().trim();
    let filter = getActiveFilter();
    let isFavTab = filter === 'fav';
    let favs = JSON.parse(localStorage.getItem('msr_favs') || '[]');
    let sortVal = document.getElementById('sortSelect').value;

    let filteredData = allTopicsData.filter(item => {
        let titleStr = item.rawTitle.toLowerCase();
        let descStr = (item.parsedData.desc || '').toLowerCase();
        let typeMatch = filter === 'all' || filter === item.parsedData.type || isFavTab;
        let favMatch = isFavTab ? favs.includes(item.topicUrl) : true;
        let searchMatch = query === '' || titleStr.includes(query) || descStr.includes(query);
        return typeMatch && favMatch && searchMatch;
    });

    // الترتيب
    if (sortVal === 'az') filteredData.sort((a, b) => a.rawTitle.localeCompare(b.rawTitle));
    else if (sortVal === 'old') filteredData.sort((a, b) => a.topicId - b.topicId);
    else filteredData.sort((a, b) => b.topicId - a.topicId);

    let hasVisible = false;
    const sections = ['software', 'app', 'pcgame', 'psgame', 'ebook'];

    sections.forEach(type => {
        let section = document.getElementById(`sec-${type}`);
        let grid = document.getElementById(`grid-${type}`);
        let pagination = document.getElementById(`pagination-${type}`);
        let typeData = filteredData.filter(item => item.parsedData.type === type);

        if (typeData.length > 0) {
            hasVisible = true;
            section.style.display = 'block';
            section.querySelector('.badge').textContent = typeData.length;

            let totalPages = Math.ceil(typeData.length / ITEMS_PER_PAGE);
            if (sectionPages[type] > totalPages) sectionPages[type] = totalPages;
            if (sectionPages[type] < 1) sectionPages[type] = 1;

            let start = (sectionPages[type] - 1) * ITEMS_PER_PAGE;
            let end = start + ITEMS_PER_PAGE;
            let pageData = typeData.slice(start, end);

            grid.innerHTML = '';
            let fragment = document.createDocumentFragment();
            pageData.forEach((data, index) => {
                let isFav = favs.includes(data.topicUrl);
                let delay = index * 0.02;
                let temp = document.createElement('div');
                temp.innerHTML = createCardHTML(data.rawTitle, data.parsedData, data.topicUrl, data.editBtn, data.delBtn, data.topicId, isFav, delay, query);
                fragment.appendChild(temp.firstElementChild);
            });
            grid.appendChild(fragment);

            if (totalPages > 1) {
                pagination.style.display = 'flex';
                renderPagination(pagination, type, totalPages, sectionPages[type]);
            } else {
                pagination.style.display = 'none';
                pagination.innerHTML = '';
            }
        } else {
            section.style.display = 'none';
            grid.innerHTML = '';
            pagination.style.display = 'none';
        }
    });

    document.getElementById('emptyGlobalState').style.display = hasVisible ? 'none' : 'block';
}

function renderPagination(container, type, total, current) {
    let html = '';
    html += `<button class="page-btn ${current === 1 ? 'disabled' : ''}" onclick="${current === 1 ? '' : `changePage('${type}', ${current - 1})`}"><i class="material-symbols-outlined">chevron_right</i></button>`;
    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
            html += `<button class="page-btn ${i === current ? 'active' : ''}" onclick="changePage('${type}', ${i})">${i}</button>`;
        } else if (i === current - 2 || i === current + 2) {
            html += `<span class="page-dots">...</span>`;
        }
    }
    html += `<button class="page-btn ${current === total ? 'disabled' : ''}" onclick="${current === total ? '' : `changePage('${type}', ${current + 1})`}"><i class="material-symbols-outlined">chevron_left</i></button>`;
    container.innerHTML = html;
}

function changePage(type, page) {
    sectionPages[type] = page;
    executeSearchAndFilter();
    document.getElementById(`sec-${type}`).scrollIntoView({ behavior: 'smooth' });
}

// ===== إنشاء البطاقة =====
function createCardHTML(title, data, topicUrl, editUrl, delUrl, topicId, isFav, delay, query) {
    const cat = catMap[data.type] || catMap['software'];
    let safeTitle = title.replace(/"/g, '&quot;');
    let encodedTitle = encodeURIComponent(title);
    let strippedDesc = (new DOMParser().parseFromString(data.desc, 'text/html').body.textContent || '').replace(/"/g, '&quot;');

    let highlightedTitle = highlightText(safeTitle, query);
    let highlightedDesc = highlightText(strippedDesc, query);

    let keyHtml = data.key ? `
        <div class="key-box">
            <span class="key-txt">${data.key}</span>
            <button class="copy-btn" onclick="event.stopPropagation(); copyDlKey(this, '${data.key}')"><i class="material-symbols-outlined">content_copy</i></button>
        </div>` : '';

    let metaHtml = '';
    if (data.size) metaHtml += `<span class="meta-tag"><i class="material-symbols-outlined">save</i> ${data.size}</span>`;
    if (data.os) metaHtml += `<span class="meta-tag"><i class="material-symbols-outlined">computer</i> ${data.os}</span>`;
    metaHtml += `<span class="meta-tag"><i class="material-symbols-outlined">new_releases</i> أحدث إصدار</span>`;

    let linkHtml = '';
    if (data.link.length > 0) {
        if (data.linkType === 'parts') {
            let parts = data.link.map((l, i) => `<a href="${l.url}" target="_blank" class="part-btn">${l.name || `جزء ${i+1}`}</a>`).join('');
            linkHtml = `<div class="parts-grid">${parts}</div>`;
        } else {
            let latest = data.link[0];
            let dateB = latest.date ? `<span style="font-size:11px;background:rgba(0,0,0,0.2);padding:2px 8px;border-radius:4px;">${latest.date}</span>` : '';
            linkHtml = `<a href="${latest.url}" target="_blank" class="btn-main">${latest.name || 'أحدث إصدار'} ${dateB}</a>`;
            if (data.link.length > 1) {
                let oldLinks = data.link.slice(1).map(l => `
                    <a href="${l.url}" target="_blank" class="ver-item">
                        <span>${l.name || 'إصدار سابق'}</span>
                        <span class="ver-date">${l.date || ''}</span>
                    </a>
                `).join('');
                linkHtml += `
                    <details class="versions-acc">
                        <summary>إصدارات أقدم (${data.link.length - 1})</summary>
                        <div class="ver-list">${oldLinks}</div>
                    </details>`;
            }
        }
    }

    let adminHtml = (editUrl || delUrl) ? `
        <div class="admin-box">
            <button class="adm-btn" onclick="editDlItem('${editUrl}')"><i class="material-symbols-outlined">edit</i> تعديل</button>
            <button class="adm-btn del" onclick="confirmDelete('${delUrl}')"><i class="material-symbols-outlined">delete</i> حذف</button>
        </div>` : '';

    let escapedData = encodeURIComponent(JSON.stringify(data));
    let encodedUrl = encodeURIComponent(topicUrl);

    return `
        <div class="card" style="animation-delay:${delay}s">
            <div class="card-img" onclick="openQuickView('${encodedTitle}','${escapedData}','${encodedUrl}')">
                <img src="${data.img}" alt="${safeTitle}" loading="lazy" onerror="this.src='https://placehold.co/600x400/2563EB/FFFFFF?text=Error'">
                <div class="card-tag"><i class="material-symbols-outlined">${cat.icon}</i> ${cat.name}</div>
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFav(this, '${topicUrl}')"><i class="material-symbols-outlined">favorite</i></button>
            </div>
            <div class="card-body">
                <div class="card-title" onclick="openQuickView('${encodedTitle}','${escapedData}','${encodedUrl}')">${highlightedTitle}</div>
                <div class="card-meta">${metaHtml}</div>
                <div class="card-desc">${highlightedDesc}</div>
                <div class="card-actions-wrapper">
                    ${keyHtml}
                    ${linkHtml}
                    <div class="btn-group">
                        <button class="btn-sec" onclick="openQuickView('${encodedTitle}','${escapedData}','${encodedUrl}')"><i class="material-symbols-outlined">visibility</i> تفاصيل</button>
                        <button class="btn-sec" onclick="shareLink('${topicUrl}', this)"><i class="material-symbols-outlined">share</i> مشاركة</button>
                    </div>
                    ${adminHtml}
                </div>
            </div>
        </div>`;
}

function highlightText(text, query) {
    if (!query || !text) return text;
    let regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight-text">$1</span>');
}

// ===== العرض السريع =====
function openQuickView(encodedTitle, encodedData, encodedUrl) {
    let title = decodeURIComponent(encodedTitle);
    let data = JSON.parse(decodeURIComponent(encodedData));
    let topicUrl = decodeURIComponent(encodedUrl);

    document.getElementById('qvTitle').textContent = title;
    document.getElementById('qvImg').src = data.img;
    document.getElementById('qvTag').innerHTML = `<i class="material-symbols-outlined">${catMap[data.type].icon}</i> ${catMap[data.type].name}`;

    // الميتا
    let metaHtml = '';
    if (data.size || data.os) {
        metaHtml = '<div class="meta-grid">';
        if (data.size) metaHtml += `
            <div class="meta-box">
                <div class="meta-icon"><i class="material-symbols-outlined">save</i></div>
                <div><span style="font-size:11px;color:var(--text-sec)">الحجم</span><br><strong>${data.size}</strong></div>
            </div>`;
        if (data.os) metaHtml += `
            <div class="meta-box">
                <div class="meta-icon"><i class="material-symbols-outlined">computer</i></div>
                <div><span style="font-size:11px;color:var(--text-sec)">المتطلبات</span><br><strong>${data.os}</strong></div>
            </div>`;
        metaHtml += '</div>';
    }
    document.getElementById('qvMeta').innerHTML = metaHtml;

    // الوصف
    let desc = document.getElementById('qvDescText');
    desc.textContent = data.desc;
    desc.classList.remove('expanded');
    let readBtn = document.getElementById('qvReadMoreBtn');
    setTimeout(() => {
        readBtn.style.display = desc.scrollHeight > 200 ? 'inline-flex' : 'none';
    }, 50);

    // المفتاح
    let keyHtml = data.key ? `
        <div class="desc-frame" style="margin-top:20px;">
            <div class="desc-label" style="background:var(--surface);color:var(--text-main);border:1px solid var(--border);"><i class="material-symbols-outlined">vpn_key</i> مفتاح التفعيل</div>
            <div class="key-box" style="margin:0;">
                <span class="key-txt" style="font-size:15px;">${data.key}</span>
                <button class="copy-btn" style="background:var(--msr-blue);color:#fff;border:none;padding:6px 14px;" onclick="copyDlKey(this, '${data.key}')">نسخ</button>
            </div>
        </div>` : '';
    document.getElementById('qvKeyArea').innerHTML = keyHtml;

    // الروابط
    let linkHtml = '<div class="desc-frame" style="margin-top:30px;"><div class="desc-label"><i class="material-symbols-outlined">download</i> روابط التحميل</div>';
    if (data.link.length > 0) {
        if (data.linkType === 'parts') {
            let parts = data.link.map(l => `<a href="${l.url}" target="_blank" class="part-btn" style="padding:12px;">${l.name || 'جزء'}</a>`).join('');
            linkHtml += `<div class="qv-parts-grid">${parts}</div>`;
        } else {
            let latest = data.link[0];
            let dateB = latest.date ? `<span style="font-size:12px;background:rgba(0,0,0,0.1);padding:2px 10px;border-radius:4px;">${latest.date}</span>` : '';
            linkHtml += `<a href="${latest.url}" target="_blank" class="btn-main" style="padding:14px;font-size:16px;">${latest.name || 'أحدث إصدار'} ${dateB}</a>`;
            if (data.link.length > 1) {
                let oldLinks = data.link.slice(1).map(l => `
                    <a href="${l.url}" target="_blank" class="ver-item" style="padding:10px;background:var(--bg);">
                        <span>${l.name || 'إصدار سابق'}</span>
                        <span class="ver-date">${l.date || ''}</span>
                    </a>`).join('');
                linkHtml += `<div style="margin-top:15px;"><label style="font-weight:700;color:var(--text-sec);">إصدارات سابقة:</label><div class="qv-ver-list">${oldLinks}</div></div>`;
            }
        }
    } else {
        linkHtml += '<div style="padding:20px;text-align:center;color:var(--text-sec);">لا توجد روابط</div>';
    }
    linkHtml += '</div>';
    document.getElementById('qvLinksArea').innerHTML = linkHtml;

    openModal('quickViewModal');
}

function toggleReadMore() {
    let el = document.getElementById('qvDescText');
    let btn = document.getElementById('qvReadMoreBtn');
    el.classList.toggle('expanded');
    btn.innerHTML = el.classList.contains('expanded') ? 'عرض أقل <i class="material-symbols-outlined">expand_less</i>' : 'قراءة المزيد <i class="material-symbols-outlined">expand_more</i>';
}

// ===== النوافذ المنبثقة =====
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// إغلاق النافذة عند الضغط خارجها
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});

// ===== الإشعارات =====
function showToast(text, isError = false) {
    const t = document.getElementById('toast');
    t.style.background = isError ? 'var(--msr-pink)' : 'var(--surface)';
    t.style.color = isError ? '#fff' : 'var(--text-main)';
    t.querySelector('i').textContent = isError ? 'error' : 'check_circle';
    document.getElementById('toastMsg').textContent = text;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ===== الحذف =====
function confirmDelete(delUrl) {
    itemToDeleteUrl = delUrl;
    openModal('confirmDeleteModal');
}

function closeConfirmModal() {
    closeModal('confirmDeleteModal');
    setTimeout(() => itemToDeleteUrl = '', 300);
}

document.getElementById('confirmDeleteBtn').addEventListener('click', async function() {
    if (!itemToDeleteUrl) return;
    let btn = this;
    let orig = btn.innerHTML;
    btn.innerHTML = '<i class="material-symbols-outlined" style="animation:spin 1s infinite;">hourglass_empty</i> جاري...';
    btn.disabled = true;

    try {
        const res = await fetch(itemToDeleteUrl);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const form = doc.querySelector('form[action*="mode=delete"], form[action="/post"]');
        if (form) {
            const fd = new FormData(form);
            fd.append('confirm', '1');
            await fetch(form.action, { method: 'POST', body: fd });
        }
        showToast('تم الحذف بنجاح!');
        closeConfirmModal();
        sessionStorage.removeItem('msr_cache');
        setTimeout(() => loadDlItems(`/f${DL_FORUM_ID}-montada`), 500);
    } catch (e) {
        showToast('فشل الحذف!', true);
    } finally {
        btn.innerHTML = orig;
        btn.disabled = false;
    }
});

// ===== تشفير وفك تشفير الروابط =====
function encodeUrl(url) { return url.replace(/https:\/\//gi, 'hxxtps://').replace(/http:\/\//gi, 'hxxtp://'); }
function decodeUrl(url) { return url.replace(/hxxtps:\/\//gi, 'https://').replace(/hxxtp:\/\//gi, 'http://'); }

// ===== تحميل البيانات =====
async function initDlApp() {
    // إجبار ظهور زر الإضافة للمدير (يمكنك تغيير هذا لاحقاً)
    document.body.classList.add('is-admin');

    let cached = sessionStorage.getItem('msr_cache');
    if (cached) {
        let data = JSON.parse(cached);
        if (Date.now() - data.time < 3600000) {
            allTopicsData = data.items;
            document.getElementById('loaderArea').style.display = 'none';
            executeSearchAndFilter();
            return;
        }
    }
    loadDlItems(`/f${DL_FORUM_ID}-montada`);
}

async function loadDlItems(url) {
    setLoader(10);
    document.getElementById('loaderArea').style.display = 'block';
    allTopicsData = [];

    const grids = ['software', 'app', 'pcgame', 'psgame', 'ebook'];
    grids.forEach(g => {
        document.getElementById(`grid-${g}`).innerHTML = '';
        document.getElementById(`sec-${g}`).style.display = 'none';
        document.getElementById(`pagination-${g}`).innerHTML = '';
    });

    try {
        setLoader(20);
        const res = await fetch(`/f${DL_FORUM_ID}-montada?_t=${Date.now()}`);
        const html = await res.text();
        if (html.includes('يُرجى الانتظار') || html.includes('cloudflare')) {
            setTimeout(() => loadDlItems(url), 2500);
            return;
        }

        const doc = new DOMParser().parseFromString(html, 'text/html');
        let pageUrls = new Set();
        pageUrls.add(`/f${DL_FORUM_ID}-montada`);
        doc.querySelectorAll('.pagination a, a.pag-img, .page-numbers a, a[href^="/f' + DL_FORUM_ID + 'p"]').forEach(a => {
            let href = a.getAttribute('href');
            if (href && href.match(new RegExp('^/f' + DL_FORUM_ID + 'p\\d+-'))) {
                pageUrls.add(href.split('?')[0]);
            }
        });

        setLoader(30);
        let allTopicsList = [];
        let indexPromises = Array.from(pageUrls).map(async (pUrl) => {
            try {
                let pRes = await fetch(pUrl);
                let pHtml = await pRes.text();
                let pDoc = new DOMParser().parseFromString(pHtml, 'text/html');
                let topics = pDoc.querySelectorAll('div.post-wrap, .posts-section, .block-topics-content, li.row, tr.topicrow, div.topic');
                topics.forEach(t => {
                    let titleNode = t.querySelector('.posts-description h3 a, .topic-title, .topictitle, h2 a.topictitle');
                    if (titleNode) {
                        let topicUrl = titleNode.getAttribute('href');
                        let rawTitle = titleNode.textContent.trim();
                        let topicIdMatch = topicUrl.match(/t(\d+)-/);
                        let topicId = topicIdMatch ? parseInt(topicIdMatch[1]) : 0;
                        if (!allTopicsList.some(item => item.topicId === topicId)) {
                            allTopicsList.push({ topicUrl, rawTitle, topicId });
                        }
                    }
                });
            } catch (e) {}
        });
        await Promise.all(indexPromises);

        if (allTopicsList.length === 0) {
            setLoader(100);
            document.getElementById('loaderArea').style.display = 'none';
            document.getElementById('emptyGlobalState').style.display = 'block';
            return;
        }

        setLoader(50);
        let validData = [];
        const BATCH_SIZE = 5;
        for (let i = 0; i < allTopicsList.length; i += BATCH_SIZE) {
            const batch = allTopicsList.slice(i, i + BATCH_SIZE);
            const results = await Promise.all(batch.map(async (tInfo) => {
                try {
                    const tRes = await fetch(tInfo.topicUrl);
                    const tHtml = await tRes.text();
                    const tDoc = new DOMParser().parseFromString(tHtml, 'text/html');
                    let contentNode = tDoc.querySelector('.post-content, .content, .entry-content')?.cloneNode(true);
                    if (!contentNode) return null;
                    contentNode.querySelectorAll('.post-signature, .signature_div, div[id^="sig"], div[class*="signature"]').forEach(e => e.remove());
                    let parsedData = parseDlData(contentNode.innerHTML);
                    const editBtn = tDoc.querySelector('a[href*="mode=editpost"]')?.getAttribute('href') || '';
                    const delBtn = tDoc.querySelector('a[href*="mode=delete"]')?.getAttribute('href') || '';
                    return {
                        rawTitle: tInfo.rawTitle,
                        parsedData,
                        topicUrl: tInfo.topicUrl,
                        editBtn,
                        delBtn,
                        topicId: tInfo.topicId
                    };
                } catch (e) { return null; }
            }));
            validData.push(...results.filter(d => d !== null));
            setLoader(50 + Math.floor((i / allTopicsList.length) * 40));
            if (i + BATCH_SIZE < allTopicsList.length) await new Promise(r => setTimeout(r, 200));
        }

        setLoader(95);
        sessionStorage.setItem('msr_cache', JSON.stringify({ time: Date.now(), items: validData }));
        allTopicsData = validData;
        document.getElementById('loaderArea').style.display = 'none';
        executeSearchAndFilter();
        setLoader(100);
    } catch (e) {
        setLoader(100);
        document.getElementById('loaderArea').style.display = 'none';
        document.getElementById('emptyGlobalState').style.display = 'block';
    }
}

function setLoader(percent) {
    const bar = document.getElementById('loadingBar');
    if (bar) {
        bar.style.width = percent + '%';
        if (percent >= 100) setTimeout(() => bar.style.width = '0%', 500);
    }
}

// ===== تحليل البيانات =====
function parseDlData(htmlContent) {
    let temp = document.createElement('div');
    temp.innerHTML = htmlContent.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n');
    let text = temp.innerText || temp.textContent;

    const extract = (str, key, nextKeys) => {
        let start = str.search(new RegExp(key + '\\s*:', 'i'));
        if (start === -1) return '';
        let keyMatch = str.match(new RegExp(key + '\\s*:', 'i'));
        start += keyMatch[0].length;
        let end = str.length;
        for (let nk of nextKeys) {
            let idx = str.search(new RegExp(nk + '\\s*:', 'i'));
            if (idx !== -1 && idx > start && idx < end) end = idx;
        }
        return str.substring(start, end).trim();
    };

    const keysOrder = ['DL_TYPE', 'DL_LINK_TYPE', 'DL_LINK', 'DL_IMG', 'DL_SIZE', 'DL_OS', 'DL_KEY', 'DL_DESC'];
    let data = {};
    keysOrder.forEach((k, i) => {
        let nextKeys = keysOrder.slice(i + 1);
        data[k] = extract(text, k, nextKeys);
    });

    let determinedType = (data['DL_TYPE'] || '').toLowerCase();
    if (!['software', 'app', 'pcgame', 'psgame', 'ebook'].includes(determinedType)) {
        determinedType = 'software';
    }

    let res = {
        type: determinedType,
        linkType: (data['DL_LINK_TYPE'] || 'versions').toLowerCase(),
        link: [],
        img: decodeUrl(data['DL_IMG']) || 'https://placehold.co/600x400/2563EB/FFFFFF?text=No+Image',
        size: data['DL_SIZE'] || '',
        os: data['DL_OS'] || '',
        key: data['DL_KEY'] || '',
        desc: data['DL_DESC'] || 'لا يوجد وصف متاح.'
    };

    if (data['DL_LINK']) {
        res.link = data['DL_LINK'].split('|').map(l => {
            let p = l.trim(), url = p, name = '', date = '';
            let mDate = p.match(/(.*?)\s*\[(.*?)\]$/);
            if (mDate) { p = mDate[1].trim(); date = mDate[2].trim(); }
            let mName = p.match(/(.*?)\s*\{(.*?)\}$/);
            if (mName) { url = mName[1].trim(); name = mName[2].trim(); }
            else { url = p.trim(); }
            url = decodeUrl(url);
            return { url, name, date };
        }).filter(l => l.url);
    }
    return res;
}

// ===== رفع الصور =====
async function openServimgUpload() {
    const btn = document.querySelector('button[onclick="openServimgUpload()"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="material-symbols-outlined" style="animation:spin 1s infinite;">hourglass_empty</i>';
    btn.disabled = true;

    try {
        const res = await fetch(`/post?f=${DL_FORUM_ID}&mode=newtopic`);
        const html = await res.text();
        const idMatch = html.match(/servImgId\s*=\s*['"]([^'"]+)['"]/);
        const accMatch = html.match(/servImgAccount\s*=\s*['"]([^'"]+)['"]/);
        const fMatch = html.match(/servImgF\s*=\s*['"]([^'"]+)['"]/);
        const tbMatch = html.match(/servImgTB\s*=\s*['"]([^'"]+)['"]/);
        if (idMatch && accMatch && fMatch && tbMatch && !idMatch[1].includes('1234567890')) {
            const url = `https://servimg.com/multiupload.php?mode=fae&account=${accMatch[1]}&id=${idMatch[1]}&f=${fMatch[1]}&tb=${tbMatch[1]}`;
            document.getElementById('servimgContainer').innerHTML = `<iframe src="${url}" style="width:100%;height:100%;border:none;"></iframe>`;
            openModal('servimgModal');
        } else {
            throw new Error('لا تصلاحية');
        }
    } catch (e) {
        showToast('يجب تسجيل الدخول!', true);
    } finally {
        btn.innerHTML = orig;
        btn.disabled = false;
    }
}

window.addEventListener('message', function(e) {
    if (e.origin.includes('servimg.com') && e.data && e.data.data) {
        let match = e.data.data.match(/\[img\](.*?)\[\/img\]/i);
        if (match && match[1]) {
            document.getElementById('dlImg').value = match[1];
            closeModal('servimgModal');
            showToast('تم التقاط الصورة!');
        }
    }
});

// ===== أدوات المحرر =====
function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('dlDescEditor').focus();
}

// ===== وضع الإدارة =====
function setAdminMode(mode) {
    document.getElementById('dlEditUrl').value = '';
    document.getElementById('dlTitle').value = '';
    document.getElementById('dlImg').value = '';
    document.getElementById('dlLink').value = '';
    document.getElementById('dlKey').value = '';
    document.getElementById('dlDescEditor').innerHTML = '';
    document.getElementById('dlSize').value = '';
    document.getElementById('dlOS').value = '';

    if (mode === 'new') {
        document.getElementById('tabAdd').className = 'btn-main';
        document.getElementById('tabUpdate').className = 'btn-main btn-sec';
        document.getElementById('updateSection').style.display = 'none';
    } else {
        document.getElementById('tabAdd').className = 'btn-main btn-sec';
        document.getElementById('tabUpdate').className = 'btn-main';
        document.getElementById('updateSection').style.display = 'block';
        filterQuickSearch();
    }
}

function filterQuickSearch() {
    let q = document.getElementById('updateSearch').value.toLowerCase().trim();
    let cat = document.getElementById('updateCatFilter').value;
    let list = document.getElementById('updateList');
    list.innerHTML = '';

    let filtered = allTopicsData.filter(item => {
        let matchCat = cat === 'all' || item.parsedData.type === cat;
        let matchQ = q === '' || item.rawTitle.toLowerCase().includes(q);
        return matchCat && matchQ;
    });

    if (filtered.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:10px;color:var(--text-sec);">لا توجد نتائج</div>';
        return;
    }

    filtered.forEach(item => {
        let div = document.createElement('div');
        div.className = 'quick-item';
        div.innerHTML = `<span>${item.rawTitle}</span> <i class="material-symbols-outlined">edit</i>`;
        div.onclick = () => {
            editDlItem(item.editBtn);
            document.querySelectorAll('.quick-item').forEach(el => el.classList.remove('active'));
            div.classList.add('active');
        };
        list.appendChild(div);
    });
}

// ===== الحفظ =====
function formatDlContent(type, linkType, linkStr, img, size, os, key, desc) {
    return `DL_TYPE:${type}\nDL_LINK_TYPE:${linkType}\nDL_LINK:${linkStr}\nDL_IMG:${img}\nDL_SIZE:${size}\nDL_OS:${os}\nDL_KEY:${key}\nDL_DESC:${desc}`;
}

async function saveDlItem() {
    const title = document.getElementById('dlTitle').value.trim();
    const type = document.getElementById('dlType').value;
    const linkType = document.getElementById('dlLinkType').value;
    const img = document.getElementById('dlImg').value.trim();
    const rawLinks = document.getElementById('dlLink').value.trim().split('\n');
    const size = document.getElementById('dlSize').value.trim();
    const os = document.getElementById('dlOS').value.trim();
    const key = document.getElementById('dlKey').value.trim();
    const desc = document.getElementById('dlDescEditor').innerHTML.trim();
    const editUrl = document.getElementById('dlEditUrl').value;
    const btn = document.getElementById('dlSaveBtn');

    if (!title) { showToast('يرجى كتابة العنوان!', true); return; }

    btn.innerHTML = '<i class="material-symbols-outlined" style="animation:spin 1s infinite;">hourglass_empty</i> جاري...';
    btn.disabled = true;

    const linksFormatted = rawLinks.map(line => {
        line = line.trim();
        if (!line) return null;
        if (!line.match(/\[.*?\]$/) && linkType === 'versions') {
            let d = new Date();
            let dStr = d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
            line = `${line} [${dStr}]`;
        }
        return encodeUrl(line);
    }).filter(Boolean).join('|');

    const content = formatDlContent(type, linkType, linksFormatted, encodeUrl(img), size, os, key, desc);
    const targetUrl = editUrl || `/post?f=${DL_FORUM_ID}&mode=newtopic`;

    try {
        const fRes = await fetch(targetUrl);
        const fHtml = await fRes.text();
        const doc = new DOMParser().parseFromString(fHtml, 'text/html');
        let form = doc.querySelector('form[name="post"]');
        if (!form) {
            // محاولة البحث عن نموذج بديل
            form = doc.querySelector('form[action*="post"]');
            if (!form) throw new Error('لا توجد صلاحية للنشر');
        }

        const fd = new FormData(form);
        fd.set('subject', title);
        fd.set('message', content);
        fd.set('post', '1');

        // توكن CSRF إن وجد
        const token = form.querySelector('input[name="csrf_token"], input[name="form_token"], input[name="token"]');
        if (token) fd.set(token.name, token.value);

        const res = await fetch('/post', { method: 'POST', body: fd });
        const responseHtml = await res.text();

        if (responseHtml.includes('بنجاح') || responseHtml.includes('تم إرسال')) {
            showToast('تم الحفظ بنجاح!');
            closeModal('dlAdminModal');
            document.getElementById('dlSearchInput').value = '';
            document.getElementById('dlSearchClear').style.display = 'none';
            document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.f-btn').classList.add('active');
            sessionStorage.removeItem('msr_cache');
            setTimeout(() => loadDlItems(`/f${DL_FORUM_ID}-montada`), 1000);
        } else {
            let err = new DOMParser().parseFromString(responseHtml, 'text/html').querySelector('.errorwrap, .error, p.error, .msg');
            throw new Error(err ? err.textContent.trim() : 'فشل النشر!');
        }
    } catch (e) {
        showToast(e.message || 'فشل النشر!', true);
    } finally {
        btn.innerHTML = '<i class="material-symbols-outlined">publish</i> حفظ ونشر';
        btn.disabled = false;
    }
}

// ===== التعديل =====
async function editDlItem(url) {
    if (!url) { showToast('رابط التعديل غير صحيح', true); return; }
    document.getElementById('dlEditUrl').value = url;
    openModal('dlAdminModal');
    document.getElementById('dlModalTitle').innerHTML = '<i class="material-symbols-outlined">edit</i> تعديل الموضوع';
    document.getElementById('updateSection').style.display = 'none';
    document.getElementById('tabAdd').className = 'btn-main btn-sec';
    document.getElementById('tabUpdate').className = 'btn-main';

    try {
        const res = await fetch(url);
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        document.getElementById('dlTitle').value = doc.querySelector('input[name="subject"]')?.value || '';
        let rawText = doc.querySelector('textarea[name="message"]')?.value || '';
        let parsed = parseDlData(rawText.replace(/<br>/g, '\n'));
        document.getElementById('dlType').value = parsed.type;
        document.getElementById('dlLinkType').value = parsed.linkType || 'versions';
        document.getElementById('dlImg').value = parsed.img === 'https://placehold.co/600x400/2563EB/FFFFFF?text=No+Image' ? '' : parsed.img;
        document.getElementById('dlSize').value = parsed.size;
        document.getElementById('dlOS').value = parsed.os;
        let linkLines = parsed.link.map(l => {
            let namePart = l.name ? ` {${l.name}}` : '';
            let datePart = l.date ? ` [${l.date}]` : '';
            return `${l.url}${namePart}${datePart}`;
        });
        document.getElementById('dlLink').value = linkLines.join('\n');
        document.getElementById('dlKey').value = parsed.key;
        document.getElementById('dlDescEditor').innerHTML = parsed.desc;
    } catch (e) {
        showToast('فشل تحميل بيانات التعديل', true);
    }
}

// ===== بدء التطبيق =====
document.addEventListener('DOMContentLoaded', initDlApp);
