/* ========== إضافة CSS داخل الصفحة ========== */
var style = document.createElement("style");
style.innerHTML = `
.karnak-ticker-final {
    position: relative;
    display: flex;
    background: #ffffff;
    border: 2px solid #2563EB ;
    border-radius: 12px;
    height: 50px;
    margin: 10px auto;
    width: 95%;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.label-3d-premium {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background: #2563EB ;
    color: #fff;
    padding: 0 12px;
    font-size: 15px;
    font-weight: 900;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 20px 0 0 20px;
    z-index: 10;
}

.label-3d-premium::before {
    content: "\\f1ea";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    font-size: 16px;
}

.box-3d {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #f0f6fb;
    padding-right: 120px;
}

.scroll-anim {
    display: inline-flex;
    position: absolute;
    white-space: nowrap;
    line-height: 50px;
    left: 0;
    animation: move-to-right 60s linear infinite;
    transform: translate3d(-50%, 0, 0);
    will-change: transform;
}

.ticker-item {
    display: inline-flex;
    align-items: center;
    padding: 0 30px;
}

.topic-link {
    color: #2563EB  !important;
    text-decoration: none !important;
    font-weight: 800;
    font-size: 20px;
    direction: rtl;
}

.author-tag {
    color: #fff;
    background: #2563EB ;
    padding: 0 12px;
    margin: 0 15px;
    border-radius: 4px;
    font-size: 18px;
    font-weight: bold;
    height: 28px;
    line-height: 28px;
    display: inline-flex;
    align-items: center;
}

.author-tag::before {
    content: "\\f4ff";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    font-size: 18px;
    margin-left: 8px;
    color: #fff;
}

.symbol-sep {
    color: #2563EB ;
    font-size: 18px;
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
}

@keyframes move-to-right {
    0% { transform: translate3d(-50%, 0, 0); }
    100% { transform: translate3d(0, 0, 0); }
}

.box-3d:hover .scroll-anim {
    animation-play-state: paused;
}

@media (max-width: 600px) {
    .karnak-ticker-final { height: 42px; }
    .label-3d-premium {
        padding: 0 8px;
        font-size: 13px;
        border-radius: 20px 0 0 20px;
    }
    .label-3d-premium::before { font-size: 13px; }
    .box-3d { padding-right: 100px; }
    .scroll-anim { line-height: 42px; }
    .topic-link { font-size: 15px; }
    .author-tag {
        font-size: 13px;
        padding: 0 6px;
        margin: 0 8px;
        height: 22px;
        line-height: 22px;
    }
    .author-tag::before {
        font-size: 14px;
        margin-left: 4px;
    }
    .ticker-item { padding: 0 15px; }
}
`;
document.head.appendChild(style);

/* ========== جلب المواضيع ========== */
(function() {
    fetch('/feed')
    .then(r => r.text())
    .then(data => {
        var xml = new DOMParser().parseFromString(data, "text/xml");
        var items = xml.querySelectorAll("item");
        var output = "";

        items.forEach(function(item, i) {
            if (i < 15) {
                var link = item.querySelector("link").textContent;
                var title = item.querySelector("title").textContent;
                var authorNode = item.getElementsByTagName("dc:creator")[0] || item.getElementsByTagName("author")[0];
                var author = authorNode ? authorNode.textContent : "الإدارة";

                output +=
                    '<div class="ticker-item">' +
                        '<a href="' + link + '" class="topic-link">' + title + '</a>' +
                        '<span class="author-tag">' + author + '</span>' +
                        '<span class="symbol-sep">&#xf069;</span>' +
                    '</div>';
            }
        });

        document.getElementById('scroll-content').innerHTML =
            output !== "" ? output + output : "لا توجد مواضيع جديدة";
    })
    .catch(() => {
        document.getElementById('scroll-content').innerHTML = "خطأ في الاتصال";
    });
})();
