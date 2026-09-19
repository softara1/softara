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


    /* تمت إزالة بطاقة التمرير القديمة (#userHoverCard) في 2026-09-19 لأنها تتعارض
       مع البطاقة الجديدة الموحدة (#custom-hover-card في صفحة a7la-profile-cards)
       فكانت البطاقتان تظهران معاً فوق روابط الأعضاء في صناديق الإحصائيات. */








    /* تمت إزالة بطاقة التمرير القديمة (#userHoverCard) نهائياً في 2026-09-19 (v6)
       لأنها كانت تتعارض مع البطاقة الموحدة (#custom-hover-card) وتُظهر بطاقتين
       فوق روابط الأعضاء في صناديق الإحصائيات. البطاقة الموحدة تُدار من 99720.js. */
});
