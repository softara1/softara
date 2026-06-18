function setForumLayout(layout, btn) {
    if (layout === 'grid') {
        $('body').addClass('grid-layout');
        localStorage.setItem('forum_layout', 'grid');
        fetchThumbnails();
    } else {
        $('body').removeClass('grid-layout');
        localStorage.setItem('forum_layout', 'list');
    }
    if (btn) {
        $('.layout-modes .theme-btn').removeClass('active-btn');
        $(btn).addClass('active-btn');
    }
}

function fetchThumbnails() {
    if (!$('body').hasClass('grid-layout')) return;

    $('.board-row').each(function () {
        var $row = $(this);
        var $link = $row.find('.lp-title a.topic-title').length ? $row.find('.lp-title a.topic-title') : $row.find('.lp-title a').last();
        var topicLink = $link.attr('href');
        var $thumbnail = $row.find('.topic-thumbnail');

        if (topicLink && !$thumbnail.attr('data-loaded')) {
            $thumbnail.attr('data-loaded', 'loading');

            $.ajax({
                url: topicLink,
                type: 'GET',
                success: function (response) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(response, "text/html");

                    var $img = $(doc).find('.post-content img, .content img, .postbody .content img, .entry-content img')
                        .not('img[src*="smilies"]')
                        .not('img[src*="avatar"]')
                        .not('img[src*="icon"]')
                        .first();

                    if ($img.length > 0 && $img.attr('src')) {
                        var imgSrc = $img.attr('src');
                        $thumbnail.css('background-image', 'url(' + imgSrc + ')');
                        $thumbnail.find('i').fadeOut();
                        $thumbnail.attr('data-loaded', 'true');
                    } else {
                        $thumbnail.attr('data-loaded', 'no-image');
                    }
                },
                error: function () {
                    $thumbnail.attr('data-loaded', 'error');
                }
            });
        }
    });
}

$(document).ready(function () {
    var savedLayout = localStorage.getItem('forum_layout');
    if (savedLayout === 'grid') {
        setForumLayout('grid');
        $('.layout-modes button[data-layout="grid"]').addClass('active-btn').siblings().removeClass('active-btn');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.getElementById('flx-dynamic-slider');
    if (!sliderContainer) return;

    const sideItems = document.querySelectorAll('.flx-side-item');
    if (sideItems.length === 0) return;

    let currentActiveSlide = 0;
    let slideIntervalTimer;

    const fallbackImage = 'https://i88.servimg.com/u/f88/18/93/95/45/organi10.jpg';

    async function extractImageFromMetaTags(url, itemElement, index) {
        try {
            let cleanUrl = url.split('#')[0];
            let response = await fetch(cleanUrl);
            let htmlText = await response.text();

            let parser = new DOMParser();
            let doc = parser.parseFromString(htmlText, 'text/html');

            let ogImageTag = doc.querySelector('meta[property="og:image"]');
            let finalImageUrl = fallbackImage;

            if (ogImageTag && ogImageTag.content) {
                let fetchedImg = ogImageTag.content;

                if (!fetchedImg.includes('illiweb.com') && !fetchedImg.includes('hitskin.com') && !fetchedImg.includes('logo')) {
                    finalImageUrl = fetchedImg;
                }
            }

            let imgDiv = itemElement.querySelector('.flx-side-img');
            if (imgDiv) {
                imgDiv.style.backgroundImage = `url('${finalImageUrl}')`;
                imgDiv.classList.remove('flx-loading-img');
            }
            itemElement.setAttribute('data-img', finalImageUrl);

            if (index === currentActiveSlide) {
                document.getElementById('flx-heroBg').style.backgroundImage = `url('${finalImageUrl}')`;
            }

        } catch (error) {
            console.error(error);
            let imgDiv = itemElement.querySelector('.flx-side-img');
            if (imgDiv) {
                imgDiv.style.backgroundImage = `url('${fallbackImage}')`;
                imgDiv.classList.remove('flx-loading-img');
            }
        }
    }

    sideItems.forEach((item, index) => {
        item.setAttribute('data-img', fallbackImage);

        let linkEl = item.querySelector('.flx-post-title');
        if (linkEl && linkEl.href) {
            extractImageFromMetaTags(linkEl.href, item, index);
        }

        item.addEventListener('click', () => { changeSlide(index); });
    });

    function renderHero(index) {
        const item = sideItems[index];
        if (!item) return;

        try {
            const titleEl = item.querySelector('.flx-post-title');
            const timeEl = item.querySelector('.flx-time-val');
            const authorEl = item.querySelector('.flx-author-val');
            const img = item.getAttribute('data-img');

            const title = titleEl ? titleEl.innerText : 'بدون عنوان';
            const link = titleEl ? titleEl.href : '#';
            const timeText = timeEl ? timeEl.innerText.replace('access_time', '').trim() : '';
            const authorText = authorEl ? authorEl.innerText.replace('person', '').trim() : 'عضو';

            document.getElementById('flx-heroBg').style.backgroundImage = `url('${img}')`;
            document.getElementById('flx-heroTitle').innerText = title;
            document.getElementById('flx-heroTitle').href = link;
            document.getElementById('flx-heroAuthor').innerHTML = `<i class="fas fa-user"></i> ${authorText}`;
            document.getElementById('flx-heroTime').innerHTML = `<i class="fas fa-clock"></i> ${timeText}`;

            sideItems.forEach(el => el.classList.remove('flx-active-slide'));
            item.classList.add('flx-active-slide');
        } catch (e) { console.error(e); }
    }

    function changeSlide(index) { currentActiveSlide = index; renderHero(index); resetSlideTimer(); }
    function autoNextSlide() { currentActiveSlide = (currentActiveSlide + 1) % sideItems.length; renderHero(currentActiveSlide); }
    function startSlideTimer() { slideIntervalTimer = setInterval(autoNextSlide, 4500); }
    function resetSlideTimer() { clearInterval(slideIntervalTimer); startSlideTimer(); }

    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideIntervalTimer));
    sliderContainer.addEventListener('mouseleave', startSlideTimer);

    renderHero(0);
    startSlideTimer();
});