function switchTopicTab(event, targetId) {
    document.querySelectorAll('.cyb-col-right .cyb-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('#topicTabs li').forEach(t => t.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    event.currentTarget.classList.add('active');
}
function switchMemberStats() {
    var sel = document.getElementById("memberSelect").value;
    document.querySelectorAll('.cyb-col-left .cyb-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(sel).classList.add('active');
}

$(document).ready(function() {
    function moveData(sourceId, targetSelector) {
        let sourceEl = document.getElementById(sourceId);
        let targetEl = document.querySelector(targetSelector);
        if(sourceEl && targetEl) {
            targetEl.innerHTML = sourceEl.innerHTML;
            
            let items = targetEl.querySelectorAll('li');
            items.forEach((item, index) => {
                let colorClass = 'num-c' + Math.min(Math.ceil((index + 1) / 2), 5);
                let numSpans = item.querySelectorAll('.topic-num, .rank-num');
                numSpans.forEach(span => { 
                    span.innerText = (index + 1); 
                    span.classList.add(colorClass); 
                });
            });
        }
    }

    moveData('raw_mod_recent_topics', '#tab-last-posts .cyb-list');
    moveData('raw_mod_new_topics', '#tab-new-topics .cyb-list');
    moveData('raw_mod_most_active_topics', '#tab-most-active .cyb-list');
    moveData('raw_mod_most_viewed_topics', '#tab-most-popular .cyb-list');
    moveData('raw_mod_top_posters', '#mem-all .cyb-list');
    moveData('raw_mod_top_week', '#mem-week .cyb-list');
    moveData('raw_mod_top_month', '#mem-month .cyb-list');
    moveData('raw_mod_top_liked', '#mem-rating .cyb-list');
    moveData('raw_mod_top_starters', '#mem-topics .cyb-list');

    let hiddenContainer = document.getElementById('hidden-raw-stats');
    if(hiddenContainer) hiddenContainer.remove();


    setTimeout(function() {
        function buildCharts(tabId) {
            let items = $(tabId + ' .chart-container');
            if(items.length === 0) return;

            let dataArray = [];
            let maxValue = 0;

            items.each(function() {
                let rawText = $(this).find('.raw-title-data').text().replace(/,/g, '');
                let numbers = rawText.match(/\d+/g); 
                let num = numbers ? parseInt(numbers[numbers.length - 1]) : 0;
                
                let typeLabel = $(this).find('.dynamic-chart-area').attr('data-type');
                
                dataArray.push({
                    targetDiv: $(this).find('.dynamic-chart-area'),
                    value: num,
                    label: typeLabel
                });
                if(num > maxValue) maxValue = num;
            });

            dataArray.forEach(function(item) {
                let percentage = maxValue > 0 ? Math.round((item.value / maxValue) * 100) : 0;
                let chartHtml = `
                    <div class="stat-progress-wrapper">
                        <div class="stat-progress-text">
                            <span>${percentage}%</span>
                            <span class="val">${item.value} ${item.label}</span>
                        </div>
                        <div class="stat-progress-track">
                            <div class="stat-progress-fill" style="width: ${percentage}%;"></div>
                        </div>
                    </div>
                `;
                item.targetDiv.html(chartHtml);
            });
        }
        buildCharts('#tab-most-active');
        buildCharts('#tab-most-popular');
    }, 500);


    if ($('#userHoverCard').length === 0) { $('body').append('<div id="userHoverCard" class="user-hover-card"></div>'); }
    let hoverCard = $('#userHoverCard');
    let cache = {}; let hideTimer;

    $('.cyb-stats-wrapper').on('mouseenter', 'a[href*="/u"]', function(e) {
        clearTimeout(hideTimer);
        let profileUrl = $(this).attr('href');
        let userName = $(this).text().trim();
        if(!profileUrl.match(/\/u\d+/)) return;

        let rect = this.getBoundingClientRect();
        let top = rect.top + window.scrollY + 25;
        let left = rect.left + window.scrollX - (260 - rect.width) / 2;
        hoverCard.css({ top: top + 'px', left: left + 'px' }).addClass('show');
        if(cache[profileUrl]) { hoverCard.html(cache[profileUrl]); return; }

        hoverCard.html('<div class="uhc-loading"><i class="fas fa-circle-notch fa-spin fa-2x"></i><br><br>جاري جلب البيانات...</div>');

        $.get(profileUrl, function(data) {
            let htmlData = $(data); let pageText = htmlData.text();
            let avatar = htmlData.find('.forumline img[src*="avatar"], .maintitle img[src*="avatar"], .user-avatar img').attr('src') || 'https://2img.net/i.imgur.com/8zE7fW6.png';
            let rankText = htmlData.find('.gen').eq(1).text().trim() || htmlData.find('.module .text-center span').first().text().trim();
            if(!rankText || rankText.length > 20 || rankText === userName) rankText = "عضو بالمنتدى";
            let genderMatch = pageText.match(/الجنس\s*:\s*(ذكر|أنثى)/);
            let gender = genderMatch ? genderMatch[1] : 'غير محدد';
            let genderIcon = gender === 'ذكر' ? 'fa-mars' : (gender === 'أنثى' ? 'fa-venus' : 'fa-genderless');
            let postsMatch = pageText.match(/المساهمات\s*:\s*(\d+)/) || pageText.match(/مساهمات\s*:\s*(\d+)/);
            let postsCount = postsMatch ? postsMatch[1] : '0';
            let activityMatch = pageText.match(/النقاط\s*:\s*(\d+)/) || pageText.match(/معدل النشاط\s*:\s*([^\n]+)/);
            let activity = activityMatch ? activityMatch[1].trim() : 'متوسط';
            let joinMatch = pageText.match(/تاريخ التسجيل\s*:\s*([\d\/]+)/);
            let joinDate = joinMatch ? joinMatch[1] : '-';
            let pmLink = '/privmsg?mode=post&u=' + profileUrl.replace(/\D/g, '');

            let cardContent = `
                <div class="uhc-header">
                    <img src="${avatar}" class="uhc-avatar">
                    <div class="uhc-user-info">
                        <h4 class="uhc-name">${userName}</h4>
                        <span class="uhc-rank">${rankText}</span>
                    </div>
                </div>
                <div class="uhc-stats">
                    <div class="uhc-stat-row"><span><i class="fas ${genderIcon}"></i> الجنس:</span><strong>${gender}</strong></div>
                    <div class="uhc-stat-row"><span><i class="fas fa-comment-dots"></i> المساهمات:</span><strong>${postsCount}</strong></div>
                    <div class="uhc-stat-row"><span><i class="fas fa-chart-line"></i> النشاط:</span><strong>${activity}</strong></div>
                    <div class="uhc-stat-row"><span><i class="fas fa-calendar-alt"></i> التسجيل:</span><strong dir="ltr">${joinDate}</strong></div>
                </div>
                <a href="${pmLink}" class="uhc-pm-btn"><i class="fas fa-envelope"></i> إرسال رسالة خاصة</a>
            `;
            cache[profileUrl] = cardContent; hoverCard.html(cardContent);
        }).fail(function() { hoverCard.html('<div class="uhc-loading text-danger">تعذر جلب البيانات</div>'); });
    });

    $('.cyb-stats-wrapper').on('mouseleave', 'a[href*="/u"]', function() { hideTimer = setTimeout(function() { hoverCard.removeClass('show'); }, 300); });
    hoverCard.on('mouseenter', function() { clearTimeout(hideTimer); });
    hoverCard.on('mouseleave', function() { hideTimer = setTimeout(function() { hoverCard.removeClass('show'); }, 300); });
});