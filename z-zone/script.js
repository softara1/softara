/* ============================================================
   المكتبة الرقمية - الجافاسكريبت الرئيسي
   الإصدار 2.0 | متوافق مع Ahlamontada / AwesomeBB
   ============================================================ */

const DL_FORUM_ID = 30; // <-- غيّر هذا الرقم حسب رقم القسم الذي تريد سحب البيانات منه
window.allTopicsData = [];
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

// ========== الترجمة ==========
let currentLang = 'ar';
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'ar',
        includedLanguages: 'ar,en',
        autoDisplay: false
    }, 'google_translate_element');
}
function toggleLanguage() {
    let select = document.querySelector('.goog-te-combo');
    if (!select) return;
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    select.value = currentLang;
    select.dispatchEvent(new Event('change'));
    document.getElementById('dlLangBtn').innerText = currentLang === 'ar' ? 'EN' : 'AR';
    if (currentLang === 'en') {
        document.body.style.direction = 'ltr';
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
    } else {
        document.body.style.direction = 'rtl';
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
    }
}

// ========== المظهر ==========
function toggleThemePage() {
    const root = document.documentElement;
    let theme = localStorage.getItem('zzone_theme') || 'dark';
    let newTheme = theme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('zzone_theme', newTheme);
    document.getElementById('dlThemeBtn').innerHTML = newTheme === 'light'
        ? '<i class="material-symbols-outlined">dark_mode</i>'
        : '<i class="material-symbols-outlined">light_mode</i>';
}
(function initTheme() {
    const theme = localStorage.getItem('zzone_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('dlThemeBtn');
        if (btn) btn.innerHTML = theme === 'light'
            ? '<i class="material-symbols-outlined">dark_mode</i>'
            : '<i class="material-symbols-outlined">light_mode</i>';
    });
})();

// ========== شريط التمرير ==========
window.addEventListener('scroll', () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    let pBar = document.getElementById("progressBar");
    if (document.body.style.direction === 'ltr') {
        pBar.style.left = '0';
        pBar.style.right = 'auto';
        pBar.style.width = scrolled + "%";
    } else {
        pBar.style.right = '0';
        pBar.style.left = 'auto';
        pBar.style.width = scrolled + "%";
    }
    const scrollBtns = document.getElementById('scrollButtons');
    if (window.scrollY > 200) scrollBtns.classList.add('show');
    else scrollBtns.classList.remove('show');
});

// ========== عرض القائمة / الشبكة ==========
function setViewMode(mode) {
    currentViewMode = mode;
    if (mode === 'list') {
        document.getElementById('listBtn').classList.add('active');
        document.getElementById('gridBtn').classList.remove('active');
        document.querySelectorAll('.items-grid').forEach(el => el.classList.add('list-view'));
    } else {
        document.getElementById('gridBtn').classList.add('active');
        document.getElementById('listBtn').classList.remove('active');
        document.querySelectorAll('.items-grid').forEach(el => el.classList.remove('list-view'));
    }
}

// ========== الفلاتر ==========
function filterDl(type, btnElement) {
    document.querySelectorAll('.f-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    sectionPages = { software: 1, app: 1, pcgame: 1, psgame: 1, ebook: 1 };
    executeSearchAndFilter();
}

// ========== المفضلة ==========
function toggleFav(btn, url) {
    let favs = JSON.parse(localStorage.getItem('zzone_favs') || '[]');
    if (favs.includes(url)) {
        favs = favs.filter(u => u !== url);
        btn.classList.remove('active');
    } else {
        favs.push(url);
        btn.classList.add('active');
    }
    localStorage.setItem('zzone_favs', JSON.stringify(favs));
    let activeTab = document.querySelector('.f-btn.active');
    if (activeTab && activeTab.getAttribute('onclick').includes('fav')) {
        executeSearchAndFilter();
    }
}

// ========== مشاركة ونسخ ==========
function shareLink(url, btn) {
    let fullUrl = url.startsWith('http') ? url : window.location.origin + url;
    const copyToClipboard = str => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(str);
        }
        return new Promise((resolve, reject) => {
            const el = document.createElement('textarea');
            el.value = str;
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            try { document.execCommand('copy'); resolve(); } catch (err) { reject(err); }
            document.body.removeChild(el);
        });
    };
    copyToClipboard(fullUrl).then(() => {
        if (btn) {
            let originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="material-symbols-outlined" style="font-size:16px;">check</i> تم النسخ';
            setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
        }
        showToast('تم نسخ الرابط بنجاح!');
    });
}

function copyDlKey(btn, text) {
    const copyToClipboard = str => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(str);
        }
        return new Promise((resolve, reject) => {
            const el = document.createElement('textarea');
            el.value = str;
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            try { document.execCommand('copy'); resolve(); } catch (err) { reject(err); }
            document.body.removeChild(el);
        });
    };
    copyToClipboard(text).then(() => {
        let originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="material-symbols-outlined" style="font-size:14px;">check</i> تم';
        setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
        showToast('تم نسخ المفتاح بنجاح!');
    });
}

// ========== البحث ==========
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('dlSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            clearTimeout(searchTimeout);
            let clrBtn = document.getElementById('dlSearchClear');
            clrBtn.style.display = e.target.value.trim() !== '' ? 'block' : 'none';
            sectionPages = { software: 1, app: 1, pcgame: 1, psgame: 1, ebook: 1 };
            searchTimeout = setTimeout(executeSearchAndFilter, 300);
        });
    }
});

function clearSearch() {
    document.getElementById('dlSearchInput').value = '';
    document.getElementById('dlSearchClear').style.display = 'none';
    sectionPages = { software: 1, app: 1, pcgame: 1, psgame: 1, ebook: 1 };
    executeSearchAndFilter();
}

function highlightText(text, query) {
    if (!query || !text) return text;
    let regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<span class='highlight-text'>$1</span>");
}

function executeSearchAndFilter() {
    let query = document.getElementById('dlSearchInput').value.toLowerCase().trim();
    let activeTabBtn = document.querySelector('.f-btn.active');
    let activeType = 'all';
    let isFavTab = false;
    if (activeTabBtn) {
        let onclickAttr = activeTabBtn.getAttribute('onclick');
        let match = onclickAttr.match(/'(.*?)'/);
        if (match) activeType = match[1];
        if (onclickAttr.includes('fav')) isFavTab = true;
    }
    let favs = JSON.parse(localStorage.getItem('zzone_favs') || '[]');
    let sortVal = document.getElementById('sortSelect').value;
    let filteredData = window.allTopicsData.filter(item => {
        let titleStr = item.rawTitle.toLowerCase();
        let descStr = (item.parsedData.desc || '').toLowerCase();
        let isFavMatch = isFavTab ? favs.includes(item.topicUrl) : true;
        let typeMatch = (activeType === 'all' || activeType === item.parsedData.type || isFavTab);
        let searchMatch = (query === '' || titleStr.includes(query) || descStr.includes(query));
        return typeMatch && isFavMatch && searchMatch;
    });

    if (sortVal === 'az') {
        filteredData.sort((a, b) => a.rawTitle.localeCompare(b.rawTitle));
    } else if (sortVal === 'old') {
        filteredData.sort((a, b) => a.topicId - b.topicId);
    } else {
        filteredData.sort((a, b) => b.topicId - a.topicId);
    }

    let hasVisible = false;
    const sections = ['software', 'app', 'pcgame', 'psgame', 'ebook'];
    sections.forEach(type => {
        let section = document.getElementById(`sec-${type}`);
        let grid = document.getElementById(`grid-${type}`);
        let paginationContainer = document.getElementById(`pagination-${type}`);
        let typeData = filteredData.filter(item => item.parsedData.type === type);
        if (typeData.length > 0) {
            hasVisible = true;
            section.style.display = 'block';
            section.querySelector('.badge').textContent = typeData.length;
            let totalPages = Math.ceil(typeData.length / ITEMS_PER_PAGE);
            if (sectionPages[type] > totalPages) sectionPages[type] = totalPages;
            if (sectionPages[type] < 1) sectionPages[type] = 1;
            let startIdx = (sectionPages[type] - 1) * ITEMS_PER_PAGE;
            let endIdx = startIdx + ITEMS_PER_PAGE;
            let pageData = typeData.slice(startIdx, endIdx);
            grid.innerHTML = '';
            let fragment = document.createDocumentFragment();
            pageData.forEach((data, index) => {
                let isFav = favs.includes(data.topicUrl);
                let delay = index * 0.02;
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = createCardHTML(data.rawTitle, data.parsedData, data.topicUrl, data.editBtn, data.delBtn, data.topicId, isFav, delay, query);
                fragment.appendChild(tempDiv.firstElementChild);
            });
            grid.appendChild(fragment);
            if (totalPages > 1) {
                paginationContainer.style.display = 'flex';
                renderSectionPagination(paginationContainer, type, totalPages, sectionPages[type]);
            } else {
                paginationContainer.style.display = 'none';
                paginationContainer.innerHTML = '';
            }
        } else {
            section.style.display = 'none';
            grid.innerHTML = '';
            if (paginationContainer) paginationContainer.style.display = 'none';
        }
    });
    document.getElementById('emptyGlobalState').style.display = hasVisible ? 'none' : 'block';
}

function renderSectionPagination(container, type, totalPages, current) {
    let html = '';
    html += `<button class="page-btn ${current === 1 ? 'disabled' : ''}" ${current === 1 ? '' : `onclick="changePage('${type}', ${current - 1})"`}><i class="material-symbols-outlined">chevron_right</i></button>`;
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= current - 1 && i <= current + 1)) {
            html += `<button class="page-btn ${i === current ? 'active' : ''}" onclick="changePage('${type}', ${i})">${i}</button>`;
        } else if (i === current - 2 || i === current + 2) {
            html += `<span class="page-dots">...</span>`;
        }
    }
    html += `<button class="page-btn ${current === totalPages ? 'disabled' : ''}" ${current === totalPages ? '' : `onclick="changePage('${type}', ${current + 1})"`}><i class="material-symbols-outlined">chevron_left</i></button>`;
    container.innerHTML = html;
}

function changePage(type, newPage) {
    sectionPages[type] = newPage;
    executeSearchAndFilter();
    document.getElementById(`sec-${type}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========== النوافذ المنبثقة ==========
function openModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('active');
}
function closeModal(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.remove('active');
}
// إغلاق النافذة عند النقر خارجها
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.id);
    }
});

// ========== Toast ==========
function showToast(text, isError = false) {
    const t = document.getElementById('toast');
    if (!t) return;
    const icon = t.querySelector('i');
    if (icon) {
        icon.innerText = isError ? 'error' : 'check_circle';
        icon.style.color = isError ? '#fff' : 'var(--primary)';
    }
    document.getElementById('toastMsg').innerText = text;
    t.style.background = isError ? 'var(--danger)' : 'linear-gradient(135deg, var(--msr-blue), var(--msr-cyan))';
    t.style.color = isError ? '#fff' : '#fff';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}

// ========== تأكيد الحذف ==========
function confirmDelete(delUrl) {
    itemToDeleteUrl = delUrl;
    openModal('confirmDeleteModal');
}
function closeConfirmModal() {
    closeModal('confirmDeleteModal');
    setTimeout(() => { itemToDeleteUrl = ''; }, 300);
}
async function executeDelete(url) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const form = doc.querySelector('form[action*="mode=delete"], form[action="/post"]');
        if (form) {
            const fd = new FormData(form);
            let confirmBtn = form.querySelector('input[name="confirm"]');
            if (confirmBtn) fd.append('confirm', confirmBtn.value || '1');
            else fd.append('confirm', '1');
            await fetch(form.action, { method: 'POST', body: fd });
            return true;
        }
        return true;
    } catch (e) {
        return false;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async function () {
            if (itemToDeleteUrl) {
                let btn = this;
                let originalText = btn.innerHTML;
                btn.innerHTML = '<i class="material-symbols-outlined" style="animation: spin 1s infinite;">hourglass_empty</i> جاري الحذف...';
                btn.disabled = true;
                await executeDelete(itemToDeleteUrl);
                showToast('تم الحذف بنجاح!');
                closeConfirmModal();
                sessionStorage.removeItem('zzone_cache');
                btn.innerHTML = originalText;
                btn.disabled = false;
                setTimeout(() => loadDlItems(`/f${DL_FORUM_ID}-montada`), 500);
            }
        });
    }
});

// ========== ترميز الروابط ==========
function encodeUrl(url) {
    return url.replace(/https:\/\//gi, 'hxxtps://').replace(/http:\/\//gi, 'hxxtp://');
}
function decodeUrl(url) {
    return url.replace(/hxxtps:\/\//gi, 'https://').replace(/hxxtp:\/\//gi, 'http://');
}

// ========== شريط التحميل ==========
function setLoader(percent) {
    const lBar = document.getElementById('loadingBar');
    if (lBar) {
        lBar.style.width = percent + '%';
        if (percent >= 100) setTimeout(() => { lBar.style.width = '0%'; }, 500);
    }
}

// ========== رفع الصور (Servimg) ==========
async function openServimgUpload() {
    const btn = document.querySelector('button[onclick="openServimgUpload()"]');
    if (!btn) return;
    const originalIcon = btn.innerHTML;
    btn.innerHTML = '<i class="material-symbols-outlined" style="animation: spin 1s infinite;">hourglass_empty</i>';
    btn.disabled = true;
    try {
        const res = await fetch(`/post?f=${DL_FORUM_ID}&mode=newtopic`);
        const html = await res.text();
        const idMatch = html.match(/servImgId\s*=\s*['"]([^'"]+)['"]/);
        const accMatch = html.match(/servImgAccount\s*=\s*['"]([^'"]+)['"]/);
        const fMatch = html.match(/servImgF\s*=\s*['"]([^'"]+)['"]/);
        const tbMatch = html.match(/servImgTB\s*=\s*['"]([^'"]+)['"]/);
        if (idMatch && accMatch && fMatch && tbMatch && !idMatch[1].includes('1234567890')) {
            const servimgUrl = `https://servimg.com/multiupload.php?mode=fae&account=${accMatch[1]}&id=${idMatch[1]}&f=${fMatch[1]}&tb=${tbMatch[1]}`;
            document.getElementById('servimgContainer').innerHTML = `<iframe src="${servimgUrl}" style="width:100%; height:100%; border:none;" scrolling="yes"></iframe>`;
            openModal('servimgModal');
        } else {
            throw new Error("No Permission");
        }
    } catch (e) {
        showToast('يجب تسجيل الدخول!', true);
    } finally {
        btn.innerHTML = originalIcon;
        btn.disabled = false;
    }
}
window.addEventListener("message", function (event) {
    if (event.origin.includes("servimg.com") && event.data && event.data.data) {
        const bbcode = event.data.data;
        const imgMatch = bbcode.match(/\[img\](.*?)\[\/img\]/i);
        if (imgMatch && imgMatch[1]) {
            document.getElementById('dlImg').value = imgMatch[1];
            closeModal('servimgModal');
            showToast('تم التقاط الصورة بنجاح!');
        }
    }
}, false);

// ========== بدء التطبيق ==========
async function initDlApp() {
    document.body.classList.add('is-admin');
    let cached = sessionStorage.getItem('zzone_cache');
    if (cached) {
        let cacheData = JSON.parse(cached);
        if (Date.now() - cacheData.time < 3600000) {
            window.allTopicsData = cacheData.items;
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
    document.getElementById('emptyGlobalState').style.display = 'none';
    window.allTopicsData = [];
    ['software', 'app', 'pcgame', 'psgame', 'ebook'].forEach(g => {
        document.getElementById(`grid-${g}`).innerHTML = '';
        document.getElementById(`sec-${g}`).style.display = 'none';
        let pg = document.getElementById(`pagination-${g}`);
        if (pg) pg.innerHTML = '';
    });

    try {
        setLoader(20);
        const res = await fetch(`${url}?_t=${Date.now()}`);
        const html = await res.text();
        if (html.includes('يُرجى الانتظار') || html.includes('cloudflare') || html.includes('anti-spam')) {
            setTimeout(() => loadDlItems(url), 2500);
            return;
        }
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const canPost = doc.querySelector('a[href*="mode=newtopic"]');
        if (canPost && !canPost.innerHTML.includes('مغلق')) {
            document.body.classList.add('is-admin');
        } else {
            document.body.classList.remove('is-admin');
        }

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
                let topics = Array.from(pDoc.querySelectorAll('div.post-wrap, .posts-section, .block-topics-content, li.row, tr.topicrow, div.topic'));
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
            } catch (e) { }
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
        sessionStorage.setItem('zzone_cache', JSON.stringify({ time: Date.now(), items: validData, isAdmin: document.body.classList.contains('is-admin') }));
        window.allTopicsData = validData;
        document.getElementById('loaderArea').style.display = 'none';
        executeSearchAndFilter();
        setLoader(100);
    } catch (e) {
        setLoader(100);
        document.getElementById('loaderArea').style.display = 'none';
        document.getElementById('emptyGlobalState').style.display = 'block';
    }
}

// ========== استخراج البيانات ==========
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
        img: decodeUrl(data['DL_IMG']) || 'https://placehold.co/600x400/1e293b/2563EB?text=No+Image',
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

// ========== بناء بطاقة HTML ==========
function createCardHTML(title, data, topicUrl, editUrl, delUrl, topicId, isFav, delay, query) {
    const catInfo = catMap[data.type] || catMap['software'];
    let safeTitle = title.replace(/"/g, '&quot;');
    let encodedTitle = encodeURIComponent(title).replace(/'/g, "%27");
    let pureDescText = document.createElement('div');
    pureDescText.innerHTML = data.desc;
    let strippedDesc = (pureDescText.textContent || pureDescText.innerText || "").replace(/"/g, '&quot;');
    let highlightedTitle = highlightText(safeTitle, query);
    let highlightedDesc = highlightText(strippedDesc, query);

    let keyHtml = '';
    if (data.key && data.key !== '') {
        keyHtml = `
        <div class="key-box">
            <span class="key-txt" title="${data.key}">${data.key}</span>
            <button class="copy-btn" onclick="event.stopPropagation(); copyDlKey(this, '${data.key}')"><i class="material-symbols-outlined" style="font-size:14px;">content_copy</i></button>
        </div>`;
    }

    let metaHtml = '';
    if (data.size) metaHtml += `<span class="meta-tag"><i class="material-symbols-outlined" style="font-size:12px;">save</i> ${data.size}</span>`;
    if (data.os) metaHtml += `<span class="meta-tag"><i class="material-symbols-outlined" style="font-size:12px;">computer</i> ${data.os}</span>`;
    metaHtml += `<span class="meta-tag"><i class="material-symbols-outlined" style="font-size:12px;">new_releases</i> أحدث إصدار</span>`;
    let metaDiv = metaHtml ? `<div class="card-meta">${metaHtml}</div>` : '';

    let linkHtml = '';
    if (data.link.length > 0) {
        if (data.linkType === 'parts') {
            let partsHtml = data.link.map((l, idx) => {
                let pName = l.name || `جزء ${idx + 1}`;
                return `<a href="${l.url}" target="_blank" onclick="event.stopPropagation()" class="part-btn"><i class="material-symbols-outlined" style="font-size:14px;">folder_zip</i> ${pName}</a>`;
            }).join('');
            linkHtml += `<div class="parts-grid">${partsHtml}</div>`;
        } else {
            let latest = data.link[0];
            let btnName = latest.name || 'أحدث إصدار';
            let dateB = latest.date ? `<span style="font-size:10px; background:rgba(0,0,0,0.2); padding:2px 6px; border-radius:4px; font-weight:600; margin-right:4px;">${latest.date}</span>` : '';
            linkHtml += `<a href="${latest.url}" target="_blank" onclick="event.stopPropagation()" class="btn-main"><i class="material-symbols-outlined" style="font-size:16px;">cloud_download</i> ${btnName} ${dateB}</a>`;
            if (data.link.length > 1) {
                let oldLinksHtml = data.link.slice(1).map(l => {
                    let n = l.name || 'إصدار سابق';
                    return `
                    <a href="${l.url}" target="_blank" onclick="event.stopPropagation()" class="ver-item">
                        <span><i class="material-symbols-outlined" style="font-size:12px; vertical-align:middle;">history</i> ${n}</span>
                        <span class="ver-date">${l.date || ''}</span>
                    </a>`;
                }).join('');
                linkHtml += `
                <details class="versions-acc" onclick="event.stopPropagation()">
                    <summary><i class="material-symbols-outlined" style="font-size:16px;">history</i> إصدارات أقدم (${data.link.length - 1})</summary>
                    <div class="ver-list">${oldLinksHtml}</div>
                </details>`;
            }
        }
    }

    let adminHtml = '';
    if (editUrl || delUrl) {
        adminHtml = `
        <div class="admin-box" onclick="event.stopPropagation()">
            <button class="adm-btn" onclick="editDlItem('${editUrl}')"><i class="material-symbols-outlined" style="font-size:14px;">edit</i> تعديل</button>
            <button class="adm-btn del" onclick="event.stopPropagation(); confirmDelete('${delUrl}');"><i class="material-symbols-outlined" style="font-size:14px;">delete</i> حذف</button>
        </div>`;
    }

    let escapedData = encodeURIComponent(JSON.stringify(data)).replace(/'/g, "%27");
    let encodedUrl = encodeURIComponent(topicUrl);

    return `
    <div class="card" style="animation-delay: ${delay}s;" data-type="${data.type}" data-title="${safeTitle}" data-desc="${strippedDesc}" data-url="${topicUrl}" data-id="${topicId}">
        <div class="card-img" onclick="openQuickView('${encodedTitle}', '${escapedData}', '${encodedUrl}')">
            <img src="${data.img}" alt="${safeTitle}" loading="lazy" onerror="this.src='https://placehold.co/600x400/1e293b/2563EB?text=Error'">
            <div class="card-tag"><i class="material-symbols-outlined">${catInfo.icon}</i> ${catInfo.name}</div>
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFav(this, '${topicUrl}')"><i class="material-symbols-outlined" style="font-size:18px;">favorite</i></button>
        </div>
        <div class="card-body">
            <div class="card-title" onclick="openQuickView('${encodedTitle}', '${escapedData}', '${encodedUrl}')" title="${safeTitle}">${highlightedTitle}</div>
            ${metaDiv}
            <div class="card-desc">${highlightedDesc}</div>
            <div class="card-actions-wrapper">
                ${keyHtml}
                ${linkHtml}
                <div class="btn-group">
                    <button onclick="event.stopPropagation(); openQuickView('${encodedTitle}', '${escapedData}', '${encodedUrl}')" class="btn-sec"><i class="material-symbols-outlined" style="font-size:16px;">visibility</i> تفاصيل</button>
                    <button onclick="event.stopPropagation(); shareLink('${topicUrl}', this)" class="btn-sec" style="color:var(--primary) !important;"><i class="material-symbols-outlined" style="font-size:16px;">share</i> مشاركة</button>
                </div>
                ${adminHtml}
            </div>
        </div>
    </div>`;
}

// ========== العرض السريع ==========
function openQuickView(encodedTitle, encodedData, encodedUrl) {
    let title = decodeURIComponent(encodedTitle);
    let data = JSON.parse(decodeURIComponent(encodedData));
    let topicUrl = decodeURIComponent(encodedUrl);
    document.getElementById('qvTitle').innerText = title;
    document.getElementById('qvImg').src = data.img;
    document.getElementById('qvTag').innerHTML = `<i class="material-symbols-outlined" style="font-size:14px; vertical-align:middle;">${catMap[data.type].icon}</i> ${catMap[data.type].name}`;

    let metaHtml = '';
    if (data.size || data.os) {
        metaHtml += `<div class="meta-grid">`;
        if (data.size) {
            metaHtml += `
            <div class="meta-box">
                <div class="meta-icon"><i class="material-symbols-outlined">save</i></div>
                <div class="meta-info">
                    <span style="font-size:11px; color:var(--text-sec);">حجم الملف</span>
                    <span style="font-size:14px; font-weight:bold; color:var(--text-main);">${data.size}</span>
                </div>
            </div>`;
        }
        if (data.os) {
            metaHtml += `
            <div class="meta-box">
                <div class="meta-icon"><i class="material-symbols-outlined">computer</i></div>
                <div class="meta-info">
                    <span style="font-size:11px; color:var(--text-sec);">متطلبات التشغيل</span>
                    <span style="font-size:14px; font-weight:bold; color:var(--text-main);">${data.os}</span>
                </div>
            </div>`;
        }
        metaHtml += `</div>`;
    }
    document.getElementById('qvMeta').innerHTML = metaHtml;

    let descContainer = document.getElementById('qvDescText');
    descContainer.innerHTML = data.desc;
    descContainer.classList.remove('expanded');
    let readMoreBtn = document.getElementById('qvReadMoreBtn');
    setTimeout(() => {
        if (descContainer.scrollHeight > descContainer.clientHeight) {
            readMoreBtn.style.display = 'inline-flex';
            readMoreBtn.innerHTML = 'قراءة المزيد <i class="material-symbols-outlined" style="font-size:16px;">expand_more</i>';
        } else {
            readMoreBtn.style.display = 'none';
        }
    }, 10);

    let keyHtml = '';
    if (data.key && data.key !== '') {
        keyHtml = `
        <div class="desc-frame" style="margin-top:20px; padding: 25px 20px 20px;">
            <div class="desc-label" style="background:var(--surface); color:var(--text-main); border:1px solid var(--border);"><i class="material-symbols-outlined" style="font-size:16px;">vpn_key</i> مفتاح التفعيل</div>
            <div class="key-box" style="margin:0; background:var(--bg); border:1px solid var(--border);">
                <span class="key-txt" style="font-size:15px; color:var(--primary);">${data.key}</span>
                <button class="copy-btn" style="padding:8px 12px; background:var(--primary); color:#fff; border:none;" onclick="copyDlKey(this, '${data.key}')"><i class="material-symbols-outlined">content_copy</i> نسخ</button>
            </div>
        </div>`;
    }
    document.getElementById('qvKeyArea').innerHTML = keyHtml;

    let linkHtml = '<div class="desc-frame" style="margin-top:30px; padding: 25px 20px 20px;">';
    linkHtml += `<div class="desc-label"><i class="material-symbols-outlined" style="font-size:16px;">download</i> روابط التحميل</div>`;
    if (data.link.length > 0) {
        if (data.linkType === 'parts') {
            let partsHtml = data.link.map((l, idx) => {
                let pName = l.name || `جزء ${idx + 1}`;
                return `<a href="${l.url}" target="_blank" class="part-btn" style="padding:14px 15px; font-size:14px; background:var(--surface-hover); border:1px solid var(--border); color:var(--text-main) !important;"><i class="material-symbols-outlined" style="font-size:20px; color:var(--primary);">folder_zip</i> ${pName}</a>`;
            }).join('');
            linkHtml += `<div class="qv-parts-grid">${partsHtml}</div>`;
        } else {
            let latest = data.link[0];
            let btnName = latest.name || 'أحدث إصدار';
            let dateB = latest.date ? `<span style="font-size:12px; color:rgba(0,0,0,0.6); font-weight:bold; margin-right:8px; background:rgba(255,255,255,0.2); padding:2px 8px; border-radius:6px;">${latest.date}</span>` : '';
            linkHtml += `<a href="${latest.url}" target="_blank" class="btn-main" style="padding:16px; font-size:18px; border-radius:12px; box-shadow: 0 5px 20px rgba(37,99,235,0.3);"><i class="material-symbols-outlined" style="font-size:24px;">cloud_download</i> تحميل ${btnName} ${dateB}</a>`;
            if (data.link.length > 1) {
                let oldLinksHtml = data.link.slice(1).map(l => {
                    let n = l.name || 'إصدار سابق';
                    return `
                    <a href="${l.url}" target="_blank" class="ver-item" style="padding:12px; margin-bottom:6px; background:var(--bg); border:1px solid var(--border);">
                        <span style="font-size:13px; font-weight:700;"><i class="material-symbols-outlined" style="font-size:18px; vertical-align:middle; color:var(--text-sec);">history</i> ${n}</span>
                        <span class="ver-date" style="font-size:12px; background:var(--surface); padding:2px 8px; border-radius:4px;">${l.date || ''}</span>
                    </a>`;
                }).join('');
                linkHtml += `
                <div style="margin-top:20px;">
                    <label style="color:var(--text-sec); font-size:13px; margin-bottom:10px; display:block; font-weight:bold;">إصدارات سابقة وروابط أخرى:</label>
                    <div class="qv-ver-list">${oldLinksHtml}</div>
                </div>`;
            }
        }
    } else {
        linkHtml += `<div style="text-align:center; padding:20px; color:var(--text-sec);">لا توجد روابط تحميل متاحة.</div>`;
    }
    linkHtml += '</div>';
    document.getElementById('qvLinksArea').innerHTML = linkHtml;
    openModal('quickViewModal');
}

function toggleReadMore() {
    let el = document.getElementById('qvDescText');
    let btn = document.getElementById('qvReadMoreBtn');
    if (el.classList.contains('expanded')) {
        el.classList.remove('expanded');
        btn.innerHTML = 'قراءة المزيد <i class="material-symbols-outlined" style="font-size:16px;">expand_more</i>';
    } else {
        el.classList.add('expanded');
        btn.innerHTML = 'عرض أقل <i class="material-symbols-outlined" style="font-size:16px;">expand_less</i>';
    }
}

function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('dlDescEditor').focus();
}

// ========== وضع المدير ==========
function setAdminMode(mode) {
    document.getElementById('dlEditUrl').value = '';
    document.getElementById('dlTitle').value = '';
    document.getElementById('dlImg').value = '';
    document.getElementById('dlLink').value = '';
    document.getElementById('dlKey').value = '';
    document.getElementById('dlDescEditor').innerHTML = '';
    document.getElementById('dlSize').value = '';
    document.getElementById('dlOS').value = '';
    document.getElementById('dlSaveBtn').innerHTML = '<i class="material-symbols-outlined" style="font-size:20px;">publish</i> حفظ ونشر';
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
    let filtered = window.allTopicsData.filter(item => {
        let matchCat = cat === 'all' || item.parsedData.type === cat;
        let matchQ = q === '' || item.rawTitle.toLowerCase().includes(q);
        return matchCat && matchQ;
    });
    if (filtered.length === 0) {
        list.innerHTML = '<div style="color:var(--text-sec); font-size:12px; text-align:center; padding:10px;">لا توجد نتائج مطابقة</div>';
        return;
    }
    filtered.forEach(item => {
        let div = document.createElement('div');
        div.className = 'quick-item';
        div.innerHTML = `<span style="font-size:13px; font-weight:bold; color:var(--text-main);">${item.rawTitle}</span> <i class="material-symbols-outlined" style="font-size:18px; color:var(--primary);">edit</i>`;
        div.onclick = () => {
            editDlItem(item.editBtn);
            document.getElementById('updateList').querySelectorAll('.quick-item').forEach(el => el.classList.remove('active'));
            div.classList.add('active');
            document.getElementById('tabUpdate').className = 'btn-main';
            document.getElementById('tabAdd').className = 'btn-main btn-sec';
        };
        list.appendChild(div);
    });
}

function formatDlContent(type, linkType, linkStr, img, size, os, key, desc) {
    return `DL_TYPE:${type}\nDL_LINK_TYPE:${linkType}\nDL_LINK:${linkStr}\nDL_IMG:${img}\nDL_SIZE:${size}\nDL_OS:${os}\nDL_KEY:${key}\nDL_DESC:${desc}`;
}

// ========== حفظ الموضوع (مصححة) ==========
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

    if (!title) { showToast('يرجى كتابة عنوان الموضوع!', true); return; }

    btn.innerHTML = '<i class="material-symbols-outlined" style="animation: spin 1s infinite;">hourglass_empty</i> جاري الحفظ...';
    btn.disabled = true;

    try {
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

        const safeImg = encodeUrl(img);
        const content = formatDlContent(type, linkType, linksFormatted, safeImg, size, os, key, desc);
        const targetUrl = editUrl ? editUrl : `/post?f=${DL_FORUM_ID}&mode=newtopic`;

        const fRes = await fetch(targetUrl);
        if (!fRes.ok) throw new Error('فشل في جلب نموذج النشر (رمز: ' + fRes.status + ')');
        const fHtml = await fRes.text();
        const doc = new DOMParser().parseFromString(fHtml, 'text/html');

        let form = doc.querySelector('form[name="post"]'); // استخدمنا let هنا
        if (!form) {
            const altForm = doc.querySelector('form[action*="post"]');
            if (altForm) {
                form = altForm;
            } else {
                throw new Error('لم نتمكن من العثور على نموذج النشر. تأكد من صلاحياتك.');
            }
        }

        const fd = new FormData(form);
        fd.set('subject', title);
        fd.set('message', content);
        fd.set('post', '1');

        const csrfToken = form.querySelector('input[name="csrf_token"]')?.value ||
                          form.querySelector('input[name="form_token"]')?.value ||
                          form.querySelector('input[name="token"]')?.value || '';
        if (csrfToken) fd.set('csrf_token', csrfToken);

        const postRes = await fetch('/post', { method: 'POST', body: fd });
        const responseHtml = await postRes.text();

        const successIndicators = ['بنجاح', 'تم إرسال', 'تم إنشاء', 'تم حفظ', 'تم النشر', 'تم التعديل', 'Success'];
        const isSuccess = successIndicators.some(ind => responseHtml.includes(ind));

        if (isSuccess) {
            showToast('تم الحفظ بنجاح!');
            closeModal('dlAdminModal');
            document.getElementById('dlSearchInput').value = '';
            document.getElementById('dlSearchClear').style.display = 'none';
            document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.f-btn').classList.add('active');
            sessionStorage.removeItem('zzone_cache');
            setTimeout(() => loadDlItems(`/f${DL_FORUM_ID}-montada`), 1500);
        } else {
            const errDoc = new DOMParser().parseFromString(responseHtml, 'text/html');
            const errorEl = errDoc.querySelector('.errorwrap, .error, p.error, .block-content-error, .error-box, .msg');
            const errMsg = errorEl ? errorEl.textContent.trim() : 'حدث خطأ غير معروف أثناء النشر.';
            throw new Error(errMsg);
        }
    } catch (e) {
        showToast(e.message || 'فشل النشر!', true);
        console.error('Save Error:', e);
    } finally {
        btn.innerHTML = '<i class="material-symbols-outlined" style="font-size:20px;">publish</i> حفظ ونشر';
        btn.disabled = false;
    }
}

// ========== تعديل الموضوع ==========
async function editDlItem(url) {
    document.getElementById('dlEditUrl').value = url;
    openModal('dlAdminModal');
    document.getElementById('dlModalTitle').innerHTML = '<i class="material-symbols-outlined" style="color:var(--primary); vertical-align:middle; font-size:24px;">edit</i> تعديل الموضوع';
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
        document.getElementById('dlImg').value = parsed.img === 'https://placehold.co/600x400/1e293b/2563EB?text=No+Image' ? '' : parsed.img;
        document.getElementById('dlSize').value = parsed.size;
        document.getElementById('dlOS').value = parsed.os;
        let linkLines = [];
        if (Array.isArray(parsed.link)) {
            linkLines = parsed.link.map(l => {
                let namePart = l.name ? ` {${l.name}}` : '';
                let datePart = l.date ? ` [${l.date}]` : '';
                return `${l.url}${namePart}${datePart}`;
            });
        }
        document.getElementById('dlLink').value = linkLines.join('\n');
        document.getElementById('dlKey').value = parsed.key;
        document.getElementById('dlDescEditor').innerHTML = parsed.desc;
    } catch (e) {
        showToast('فشل في تحميل بيانات التعديل', true);
    }
}

// ========== بدء التشغيل ==========
document.addEventListener('DOMContentLoaded', initDlApp);
