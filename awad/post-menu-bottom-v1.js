/* ==== قائمة خيارات الرد أسفل كل مشاركة ==== */
/* ينشئ نسخة ثانية من قائمة (الثلاث نقاط) في أسفل كل مشاركة بجانب أزرار الإعجاب،
   وتفتح هذه النسخة لأعلى حتى لا تُقصّ. الإصدار العلوي يبقى كما هو. */
(function(){
  "use strict";
  var MAX_TRIES = 60; /* حتى ~15 ثانية انتظار */
  var tries = 0;

  function isTopicPage(){
    return !!document.getElementById("topic");
  }

  /* ننتظر حتى ينتهي سكربت القالب من توسيم قوائم الأعلى (الأيقونات + العناوين) */
  function labelsReady(){
    var m = document.querySelector("#topic .post-header .post-menu-list");
    if(!m) return false;
    var q = m.querySelector("li.btn-quote a span");
    if(q && (q.textContent || "").replace(/\s+/g, "")) return true;
    /* بعض القوائم قد تفتقر لزر الاقتباس؛ يكفي وجود عنصر موسوم في أي زر */
    return !!m.querySelector("li a span");
  }

  function build(){
    var topic = document.getElementById("topic");
    if(!topic) return;
    var items = topic.querySelectorAll(".post-item");
    var added = 0;
    for(var i = 0; i < items.length; i++){
      var item = items[i];
      var wrap = item.querySelector(".post-wrap");
      if(!wrap) continue;
      var src = wrap.querySelector(".post-header .post-menu");
      var foot = wrap.querySelector(".post-footer");
      if(!src || !foot) continue;
      if(foot.querySelector(".post-menu")) continue; /* أُضيفت سابقاً */
      if(src.offsetParent === null && getComputedStyle(src).display === "none") continue;

      var clone = src.cloneNode(true);
      clone.classList.remove("open");
      clone.classList.add("post-menu--bottom");
      clone.setAttribute("data-bottom-menu", "1");
      clone.removeAttribute("id");

      /* منع تكرار المعرّفات داخل النسخة، وربط زر الاقتباس المتعدد بزر الأعلى */
      var imgs = clone.querySelectorAll("img[id]");
      for(var k = 0; k < imgs.length; k++){
        var img = imgs[k];
        var oid = img.id;
        img.removeAttribute("id");
        if(oid && document.getElementById(oid) && /mq|multi|quote/i.test(oid)){
          img.setAttribute("data-mq-src", oid);
          img.setAttribute("onclick",
            'togglePostMultiQuote(document.getElementById(' + JSON.stringify(oid) + '));' +
            'this.src=document.getElementById(' + JSON.stringify(oid) + ').src;');
        }
      }
      /* أي معرفات متبقية (مثل زر الشكر) تُزال لتجنب التكرار */
      var ids = clone.querySelectorAll("[id]");
      for(var n = 0; n < ids.length; n++) ids[n].removeAttribute("id");

      foot.appendChild(clone);
      added++;
    }
    return added;
  }

  function tick(){
    tries++;
    if(!isTopicPage()) return;
    if(labelsReady()){
      build();
      return;
    }
    if(tries < MAX_TRIES){
      setTimeout(tick, 250);
    } else {
      build(); /* محاولة أخيرة على أي حال */
    }
  }

  if(document.readyState === "complete"){
    setTimeout(tick, 300);
  } else {
    window.addEventListener("load", function(){ setTimeout(tick, 300); });
  }
})();
