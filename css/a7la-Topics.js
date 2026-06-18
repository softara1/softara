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

function shareTopic(platform) {
    var url = encodeURIComponent(window.location.href.split('#')[0]);
    var title = encodeURIComponent(document.title);
    var shareLink = '';
    
    if (platform === 'wa') { shareLink = 'https://api.whatsapp.com/send?text=' + title + ' - ' + url; } 
    else if (platform === 'fb') { shareLink = 'https://www.facebook.com/sharer/sharer.php?u=' + url; } 
    else if (platform === 'tw') { shareLink = 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url; }
    else if (platform === 'cp') {
        var dummy = document.createElement('input'), text = window.location.href.split('#')[0];
        document.body.appendChild(dummy); dummy.value = text; dummy.select();
        document.execCommand('copy'); document.body.removeChild(dummy);
        alert('تم نسخ رابط الموضوع بنجاح!'); return;
    }
    
    if(shareLink !== '') { window.open(shareLink, '_blank', 'width=600,height=400'); }
}

document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.getElementById('flx-dynamic-slider');
    if (!sliderContainer) return;

    const sideItems = document.querySelectorAll('.flx-side-item');
    if (sideItems.length === 0) return;

    let currentActiveSlide = 0;
    let slideIntervalTimer;

    const fallbackImage = 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

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

$(document).ready(function() {
    var savedLayout = localStorage.getItem('forum_layout');
    if (savedLayout === 'grid') {
        setForumLayout('grid');
        $('.layout-modes button[data-layout="grid"]').addClass('active-btn').siblings().removeClass('active-btn');
    }

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.flx-contact-wrapper').length) {
            $('.flx-contact-toggle.active').removeClass('active');
            $('.flx-contact-list:visible').slideUp(200);
        }
    });

    $('.content img:not(.smilies):not([src*="illiweb"]):not([src*="hits"])').each(function() {
        var $img = $(this);
        var parentA = $img.closest('a');
        if (parentA.length > 0) {
            parentA.attr('data-fancybox', 'gallery'); 
            parentA.attr('href', $img.attr('src')); 
            parentA.css('cursor', 'zoom-in');
            parentA.on('click', function(e) { e.preventDefault(); });
        } else {
            $img.wrap('<a href="' + $img.attr('src') + '" data-fancybox="gallery" style="cursor: zoom-in;"></a>');
        }
    });

    Fancybox.bind('[data-fancybox="gallery"]', {
        Toolbar: { display: { left: ["infobar"], middle: [], right: ["zoomIn", "zoomOut", "close"] } }
    });

    $('.flx-contact-toggle').on('click', function(e) {
        e.preventDefault();
        var $btn = $(this);
        var $list = $btn.siblings('.flx-contact-list');

        $btn.toggleClass('active');
        
        if($list.text().trim() === "" && $list.find('img').length === 0) {
            $list.html('<span style="font-size:12px;color:gray;padding:0 5px;">لا توجد بيانات</span>');
        }

        $list.slideToggle(250);
    });
    
    $('.flx-main-topic').first().find('.show-only-first-post').show();

    $('.flx-main-topic, .flx-reply-topic').each(function() {
        var $card = $(this);
        var $userLink = $card.find('.flx-get-uid a');
        if ($userLink.length > 0) {
            var profileUrl = $userLink.attr('href');
            var match = profileUrl.match(/\/u(\d+)/);
            if (match && match[1]) { $card.find('.flx-put-uid').text(match[1]); } 
            else { $card.find('.flx-put-uid').text('غير محدد'); }
        } else { $card.find('.flx-put-uid').text('زائر'); }
    });

    var avatarCache = {}; 

    $('.raw-likes-data').each(function() {
        var $box = $(this);
        var likers = $box.find('.hidden-raw-likes a'); 
        
        if (likers.length > 0) {
            $box.css('display', 'block'); 
            var likersHTML = '';
            
            likers.each(function() {
                var username = $(this).text().trim();
                var profileUrl = $(this).attr('href');
                var tempId = 'like-chip-' + Math.floor(Math.random() * 1000000); 
                
                if(username !== "" && profileUrl !== "#") {
                    var defaultAvatar = 'https://i.servimg.com/u/f60/19/93/33/22/user10.png'; 
                    likersHTML += '<a href="'+profileUrl+'" class="flx-liker-chip" id="'+tempId+'"><img src="'+defaultAvatar+'" alt="'+username+'"> <span>'+username+'</span></a>';
                    
                    if(avatarCache[profileUrl]) {
                        setTimeout(function(){ $('#' + tempId + ' img').attr('src', avatarCache[profileUrl]); }, 0);
                    } else {
                        $.get(profileUrl, function(data) {
                            var avatarSrc = $(data).find('.user-avatar img, .avatar img, .forumline .row1 img.avatar, .module .avatar img, dl.left-box.details img, #profile-advanced-add img, .user-profile-avatar img, .page-content .row1 img').first().attr('src');
                            if(avatarSrc) { 
                                avatarCache[profileUrl] = avatarSrc; 
                                $('#' + tempId + ' img').attr('src', avatarSrc); 
                            }
                        });
                    }
                }
            });
            $box.find('.flx-likers-container').html(likersHTML); 
        }
    });

    $('.fa_like_div .rep-button').each(function() {
        var vanillaEl = this;
        var clone = vanillaEl.cloneNode(true);
        vanillaEl.parentNode.replaceChild(clone, vanillaEl);
    });

    $(document).on('click', '.fa_like_div .rep-button', function(e) {
        e.preventDefault();
        
        if(typeof _userdata === "undefined" || _userdata.session_logged_in != 1) {
            alert("يجب تسجيل الدخول للإعجاب بالمواضيع.");
            return;
        }

        var $btn = $(this);
        if($btn.hasClass('flx-processing')) return; 
        
        var $article = $btn.closest('article');
        var postId = $article.attr('id').replace('p', '');
        var $likesBox = $('#likes_p' + postId);
        var $likersContainer = $likesBox.find('.flx-likers-container');
        
        var urlLike = $btn.attr('data-href');
        var urlRmLike = $btn.attr('data-href-rm');
        
        var currentUserIdUrl = '/u' + _userdata.user_id;
        var myName = _userdata.username;
        var myAvatar = 'https://i.servimg.com/u/f60/19/93/33/22/user10.png';
        
        if (_userdata.avatar && _userdata.avatar !== "") {
            if (_userdata.avatar.indexOf('<img') !== -1) {
                var match = _userdata.avatar.match(/src=["'](.*?)["']/);
                if (match && match[1]) myAvatar = match[1];
            } else {
                myAvatar = _userdata.avatar;
            }
        }

        var $existingChip = $likersContainer.find('a[href^="'+currentUserIdUrl+'"]');
        var isLiked = $existingChip.length > 0;
        
        var targetUrl = isLiked ? urlRmLike : urlLike;
        if(!targetUrl || targetUrl === '') return;

        $btn.addClass('flx-processing').css('opacity', '0.6');

        $.get(targetUrl, function() {
            $btn.removeClass('flx-processing').css('opacity', '1');
            
            var currentCount = parseInt($btn.find('.like-count').text().replace(/[^0-9]/g, '')) || 0;

            if(isLiked) {
                $existingChip.fadeOut(200, function() { 
                    $(this).remove(); 
                    if($likersContainer.children('.flx-liker-chip').length === 0) {
                        $likesBox.slideUp(250);
                    }
                });
                
                $btn.find('.like-icon').text('thumb_up_off_alt');
                $btn.find('.like-text').text('إعجاب');
                var newCount = Math.max(0, currentCount - 1);
                $btn.find('.like-count').text(newCount > 0 ? newCount : '');
                
            } else {
                var chipHtml = '<a href="'+currentUserIdUrl+'" class="flx-liker-chip" style="display:none;"><img src="'+myAvatar+'" alt="'+myName+'"> <span>'+myName+'</span></a>';
                
                if($likesBox.is(':hidden')) {
                    $likersContainer.empty(); 
                    $likesBox.slideDown(250);
                }
                
                $likersContainer.prepend(chipHtml);
                $likersContainer.find('a:first').fadeIn(300);
                
                $btn.find('.like-icon').text('thumb_up');
                $btn.find('.like-text').text('إلغاء الإعجاب');
                $btn.find('.like-count').text(currentCount + 1);
            }
        }).fail(function() {
            $btn.removeClass('flx-processing').css('opacity', '1');
        });
    });

    var titleText = $('#topic-main-title').text().replace(/<[^>]+>/g, ' ').trim();
    var contentText = $('#first-post-content').text().replace(/<[^>]+>/g, ' ').trim();

    var stopWords = ['في','من','على','إلى','عن','مع','هذا','هذه','أن','إن','ولا','وما','كيف','كان','كانت','التي','الذي','هو','هي','تم','كل','وقد','أو','كما','بين','عند','بعد','قبل','حتى','إذا','فقط','غير','ذلك','هل','ولم','أنه','بها','به','عليه','إليه','أنا','نحن','لكن','ليس','ولكن','إلا','أكثر','بعض','أيضا','حيث','ومن','فإن','أجل','ذات','دون','أما'];
    var wordCounts = {};

    function extractWords(text, weight) {
        var words = text.split(/\s+/);
        words.forEach(function(word) {
            word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()""''؟،]/g,"").trim();
            if(word.length > 3 && stopWords.indexOf(word) === -1 && isNaN(word)) {
                wordCounts[word] = (wordCounts[word] || 0) + weight;
            }
        });
    }

    extractWords(titleText, 3);
    extractWords(contentText, 1);

    var sortedWords = Object.keys(wordCounts).sort(function(a, b) { return wordCounts[b] - wordCounts[a]; });
    var topTags = sortedWords.slice(0, 6); 
    
    if(topTags.length > 0) {
        $('#dynamic-meta-box').css('display', 'flex');
        $('#flx-auto-tags').css('display', 'flex');
        topTags.forEach(function(tag) { 
            var searchUrl = '/search?search_keywords=' + encodeURIComponent(tag);
            $('#flx-auto-tags .tags-container').append('<a href="' + searchUrl + '" title="البحث عن: ' + tag + '">#' + tag + '</a>'); 
        });
    }

    var seenUsers = {};
    var participantsCount = 0;
    
    $('#flx-participants .avatars-container').empty();

    $('.flx-main-topic, .flx-reply-topic').each(function() {
        var $card = $(this);
        var $userLinkObj = $card.find('.flx-get-uid a');
        var userLink = $userLinkObj.length > 0 ? $userLinkObj.attr('href') : null;
        var userName = $card.find('.flx-get-uid').text().trim();
        var userAvatarSrc = $card.find('.flx-avatar-box img').attr('src');
        var uniqueKey = userLink ? userLink : 'guest_' + userName;

        if (userName && userName !== "" && !seenUsers[uniqueKey] && userAvatarSrc) {
            seenUsers[uniqueKey] = true;
            participantsCount++;
            
            var avatarHTML = '';
            if (userLink) {
                avatarHTML = '<a href="'+userLink+'" title="'+userName+'"><img src="'+userAvatarSrc+'" alt="'+userName+'"></a>';
            } else {
                avatarHTML = '<span title="'+userName+'"><img src="'+userAvatarSrc+'" alt="'+userName+'"></span>';
            }
            $('#flx-participants .avatars-container').append(avatarHTML);
        }
    });

    if(participantsCount > 0) {
        $('#dynamic-meta-box').css('display', 'flex');
        $('#flx-participants').css('display', 'flex');
    }

    if(typeof _userdata !== "undefined" && _userdata.session_logged_in == 1) {
        $('#current-user-name').text(_userdata.username);
        if(_userdata.avatar) {
            var avatarMatch = _userdata.avatar.match(/src="([^"]+)"/);
            if(avatarMatch && avatarMatch[1]) { $('#current-user-avatar').attr('src', avatarMatch[1]); }
        }
    }

    $('#flx-mod-form a').each(function() {
        var $link = $(this);
        var href = $link.attr('href').toLowerCase();
        var title = $link.attr('title') || $link.find('img').attr('title') || $link.find('img').attr('alt') || '';
        var icon = 'settings'; 

        if(href.indexOf('delete') !== -1) { icon = 'delete'; title = 'حذف'; }
        else if(href.indexOf('move') !== -1) { icon = 'drive_file_move'; title = 'نقل'; }
        else if(href.indexOf('lock') !== -1) { icon = 'lock'; title = 'إغلاق'; }
        else if(href.indexOf('unlock') !== -1) { icon = 'lock_open'; title = 'فتح'; }
        else if(href.indexOf('split') !== -1) { icon = 'call_split'; title = 'فصل'; }
        else if(href.indexOf('merge') !== -1) { icon = 'merge_type'; title = 'دمج'; }
        else if(href.indexOf('trash') !== -1) { icon = 'restore_from_trash'; title = 'سلة المهملات'; }
        else if(href.indexOf('sticky') !== -1) { icon = 'push_pin'; title = 'تثبيت'; }
        
        $link.empty();
        $link.addClass('mod-css-btn');
        $link.html('<i class="material-icons">'+icon+'</i> ' + title);
    });
});
