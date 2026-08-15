/**
 * ============================================================
 * AWAD TECH | عوض تك - Main JavaScript
 * ============================================================
 * 
 * Flash-prevention theme script (runs BEFORE page paint):
 * Must be placed in <head> as inline script, or use the init()
 * injection below. For immediate flash prevention, add this
 * to your Blogger template <head>:
 *
 * <script>
 * (function(){var t=localStorage.getItem('awad-theme');if(!t){var m=window.matchMedia('(prefers-color-scheme: dark)');t=m.matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);})();
 * </script>
 * 
 * ============================================================
 */

/* Global namespace */
var AwadTech = window.AwadTech || {};

/* ============================================================
 * 1. AwadTech.theme - Dark/Light Mode
 * ============================================================ */
AwadTech.theme = (function () {
  'use strict';

  var STORAGE_KEY = 'awad-theme';
  var currentTheme = 'dark';

  /**
   * Inject the flash-prevention script into <head> if not already present.
   * This ensures the theme is applied before first paint on subsequent loads.
   */
  function injectFlashPrevention() {
    var id = 'awad-theme-preload';
    if (document.getElementById(id)) return;
    var script = document.createElement('script');
    script.id = id;
    script.textContent =
      "(function(){var t=localStorage.getItem('awad-theme');if(!t){var m=window.matchMedia('(prefers-color-scheme: dark)');t=m.matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);})();";
    document.head.appendChild(script);
  }

  /**
   * Detect the preferred theme from localStorage or system preference.
   */
  function detectTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  /**
   * Apply theme attribute to <html> element.
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
  }

  /**
   * Toggle between dark and light themes.
   */
  function toggle() {
    var next = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  /**
   * Initialize the theme module.
   */
  function init() {
    // Inject flash-prevention script for future page loads
    injectFlashPrevention();
    // Apply detected theme
    var theme = detectTheme();
    applyTheme(theme);

    // Bind all theme toggle controls after the DOM is ready.
    var toggleButtons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < toggleButtons.length; i++) {
      toggleButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        toggle();
      });
    }
  }

  return {
    init: init,
    toggle: toggle,
    getCurrent: function () { return currentTheme; }
  };
})();

/* ============================================================
 * 2. AwadTech.lang - RTL/LTR Language Toggle
 * ============================================================ */
AwadTech.lang = (function () {
  'use strict';

  var STORAGE_KEY = 'awad-lang';
  var currentLang = 'ar';

  /**
   * Detect the saved language or default to Arabic.
   */
  function detectLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
    return 'ar';
  }

  /**
   * Apply language attributes to <html>.
   */
  function applyLang(lang) {
    var html = document.documentElement;
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('lang', lang);
    currentLang = lang;

    // Update language toggle button text
    var toggleBtns = document.querySelectorAll('.lang-toggle');
    for (var i = 0; i < toggleBtns.length; i++) {
      toggleBtns[i].textContent = lang === 'ar' ? 'EN' : 'AR';
    }
  }

  /**
   * Toggle between Arabic and English.
   */
  function toggle() {
    var next = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem(STORAGE_KEY, next);
    // Reload page to apply full language switch
    window.location.reload();
  }

  /**
   * Initialize the language module.
   */
  function init() {
    var lang = detectLang();
    applyLang(lang);
  }

  return {
    init: init,
    toggle: toggle,
    getCurrent: function () { return currentLang; }
  };
})();

/* ============================================================
 * 3. AwadTech.header - Smart Sticky Header
 * ============================================================ */
AwadTech.header = (function () {
  'use strict';

  var header = null;
  var lastScrollY = 0;
  var ticking = false;
  var SCROLL_THRESHOLD = 100;
  var rafId = null;

  /**
   * Handle scroll events using requestAnimationFrame for performance.
   */
  function onScroll() {
    if (!ticking) {
      rafId = requestAnimationFrame(function () {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  }

  /**
   * Determine scroll direction and apply appropriate classes.
   */
  function updateHeader() {
    if (!header) return;
    var scrollY = window.scrollY;

    if (scrollY > SCROLL_THRESHOLD) {
      if (scrollY > lastScrollY) {
        // Scrolling DOWN - hide header
        header.classList.add('header-hidden');
        header.classList.remove('header-visible');
      } else {
        // Scrolling UP - show header
        header.classList.add('header-visible');
        header.classList.remove('header-hidden');
      }
    } else {
      // Above threshold - reset
      header.classList.remove('header-hidden', 'header-visible');
    }

    lastScrollY = scrollY;
  }

  /**
   * Toggle mobile menu open/close.
   */
  function toggleMobileMenu() {
    var menu = document.querySelector('.mobile-menu');
    var overlay = document.querySelector('.mobile-menu-overlay');
    var toggle = document.querySelector('.nav-toggle');

    if (!menu) return;

    var isActive = menu.classList.contains('active');

    if (isActive) {
      closeMobileMenu();
    } else {
      menu.classList.add('active');
      if (overlay) overlay.classList.add('active');
      if (toggle) toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Close the mobile menu.
   */
  function closeMobileMenu() {
    var menu = document.querySelector('.mobile-menu');
    var overlay = document.querySelector('.mobile-menu-overlay');
    var toggle = document.querySelector('.nav-toggle');

    if (menu) menu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (toggle) toggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Initialize the header module.
   */
  function init() {
    header = document.getElementById('awad-header');
    if (!header) return;

    // Scroll listener with passive flag for performance
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu toggle button
    var navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu on overlay click
    var overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
      overlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu from its dedicated close button.
    var closeButton = document.querySelector('.mobile-menu-close');
    if (closeButton) {
      closeButton.addEventListener('click', function (e) {
        e.preventDefault();
        closeMobileMenu();
      });
    }

    // Close mobile menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var menu = document.querySelector('.mobile-menu');
        if (menu && menu.classList.contains('active')) {
          closeMobileMenu();
        }
      }
    });

    // Close mobile menu when clicking a nav link
    var navLinks = document.querySelectorAll('.mobile-menu a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        closeMobileMenu();
      });
    }
  }

  return {
    init: init,
    closeMobileMenu: closeMobileMenu
  };
})();

/* ============================================================
 * 4. AwadTech.marquee - News Ticker
 * ============================================================ */
AwadTech.marquee = (function () {
  'use strict';

  var FEED_URL = 'https://almoatn.blogspot.com/feeds/posts/default?alt=json&max-results=15';
  var marqueeTrack = null;
  var isPaused = false;
  var touchStartX = 0;
  var touchCurrentX = 0;
  var isTouching = false;

  /**
   * Fetch latest posts from Blogger feed.
   */
  function fetchPosts() {
    return fetch(FEED_URL)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var entries = data.feed && data.feed.entry ? data.feed.entry : [];
        var items = [];
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          var title = '';
          var link = '';
          if (entry.title && entry.title.$t) title = entry.title.$t;
          if (entry.link) {
            for (var j = 0; j < entry.link.length; j++) {
              if (entry.link[j].rel === 'alternate') {
                link = entry.link[j].href;
                break;
              }
            }
          }
          items.push({ title: title, link: link });
        }
        return items;
      });
  }

  /**
   * Create marquee item DOM element.
   */
  function createItem(item) {
    var span = document.createElement('a');
    span.className = 'marquee-item';
    span.href = item.link || '#';
    span.textContent = item.title;
    span.setAttribute('title', item.title);
    return span;
  }

  /**
   * Populate the marquee track with items.
   */
  function populateMarquee(items) {
    if (!marqueeTrack) return;
    marqueeTrack.innerHTML = '';

    if (items.length === 0) {
      // Placeholder text if no items
      var placeholder = document.createElement('span');
      placeholder.className = 'marquee-item';
      placeholder.textContent = 'أهلاً بكم في عوض تك | Welcome to AWAD TECH';
      marqueeTrack.appendChild(placeholder);
      return;
    }

    // Create first set of items
    for (var i = 0; i < items.length; i++) {
      marqueeTrack.appendChild(createItem(items[i]));
    }

    // Duplicate items for seamless infinite loop
    for (var j = 0; j < items.length; j++) {
      marqueeTrack.appendChild(createItem(items[j]));
    }

    // Set animation direction based on current language
    updateDirection();
  }

  /**
   * Update marquee direction based on current language.
   */
  function updateDirection() {
    if (!marqueeTrack) return;
    var lang = AwadTech.lang ? AwadTech.lang.getCurrent() : 'ar';
    // RTL = scroll from left to right (normal), LTR = reversed
    if (lang === 'ar') {
      marqueeTrack.style.animationDirection = 'normal';
    } else {
      marqueeTrack.style.animationDirection = 'reverse';
    }
  }

  /**
   * Set up touch interaction for manual dragging.
   */
  function setupTouch() {
    if (!marqueeTrack) return;

    marqueeTrack.addEventListener('touchstart', function (e) {
      isTouching = true;
      touchStartX = e.touches[0].clientX;
      touchCurrentX = touchStartX;
      isPaused = true;
      marqueeTrack.style.animationPlayState = 'paused';
    }, { passive: true });

    marqueeTrack.addEventListener('touchmove', function (e) {
      if (!isTouching) return;
      touchCurrentX = e.touches[0].clientX;
      // Allow natural scroll but keep animation paused
    }, { passive: true });

    marqueeTrack.addEventListener('touchend', function () {
      isTouching = false;
      isPaused = false;
      marqueeTrack.style.animationPlayState = 'running';
    }, { passive: true });

    // Mouse hover pause/resume
    marqueeTrack.addEventListener('mouseenter', function () {
      if (!isTouching) {
        isPaused = true;
        marqueeTrack.style.animationPlayState = 'paused';
      }
    });

    marqueeTrack.addEventListener('mouseleave', function () {
      if (!isTouching) {
        isPaused = false;
        marqueeTrack.style.animationPlayState = 'running';
      }
    });
  }

  /**
   * Initialize the marquee module.
   */
  function init() {
    marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack) return;

    setupTouch();

    // Fetch and populate
    fetchPosts()
      .then(populateMarquee)
      .catch(function () {
        // On error, show placeholder
        populateMarquee([]);
      });
  }

  return {
    init: init
  };
})();

/* ============================================================
 * 5. AwadTech.slider - Hero Slider
 * ============================================================ */
AwadTech.slider = (function () {
  'use strict';

  var slides = [];
  var currentIndex = 0;
  var totalSlides = 0;
  var autoplayInterval = null;
  var AUTOPLAY_DELAY = 5000;
  var wrapper = null;
  var dotsContainer = null;
  var sliderEl = null;
  var touchStartX = 0;
  var touchEndX = 0;
  var SWIPE_THRESHOLD = 50;

  /**
   * Navigate to a specific slide by index.
   */
  function goTo(index) {
    if (totalSlides === 0) return;

    // Wrap around
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;

    // Update wrapper transform
    if (wrapper) {
      var direction = AwadTech.lang && AwadTech.lang.getCurrent() === 'ar' ? 1 : -1;
      wrapper.style.transform = 'translateX(' + (direction * currentIndex * 100) + '%)';
    }

    // Update dots
    updateDots();

    // Update slide active states
    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.toggle('active', i === currentIndex);
    }
  }

  /**
   * Go to next slide.
   */
  function next() {
    goTo(currentIndex + 1);
  }

  /**
   * Go to previous slide.
   */
  function prev() {
    goTo(currentIndex - 1);
  }

  /**
   * Update the active dot indicator.
   */
  function updateDots() {
    if (!dotsContainer) return;
    var dots = dotsContainer.querySelectorAll('.slider-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentIndex);
    }
  }

  /**
   * Start autoplay.
   */
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(next, AUTOPLAY_DELAY);
  }

  /**
   * Stop autoplay.
   */
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  /**
   * Set up event listeners for slider controls.
   */
  function setupControls() {
    if (!sliderEl) return;

    // Prev button
    var prevBtn = sliderEl.querySelector('.slider-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prev();
        stopAutoplay();
        startAutoplay();
      });
    }

    // Next button
    var nextBtn = sliderEl.querySelector('.slider-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        next();
        stopAutoplay();
        startAutoplay();
      });
    }

    // Dot navigation
    if (dotsContainer) {
      dotsContainer.addEventListener('click', function (e) {
        var dot = e.target.closest('.slider-dot');
        if (dot) {
          var index = parseInt(dot.getAttribute('data-index'), 10);
          if (!isNaN(index)) {
            goTo(index);
            stopAutoplay();
            startAutoplay();
          }
        }
      });
    }

    // Pause on hover, resume on leave
    sliderEl.addEventListener('mouseenter', stopAutoplay);
    sliderEl.addEventListener('mouseleave', startAutoplay);

    // Keyboard navigation (left/right arrows)
    document.addEventListener('keydown', function (e) {
      if (!sliderEl || sliderEl.offsetParent === null) return;
      var isRTL = AwadTech.lang && AwadTech.lang.getCurrent() === 'ar';
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        isRTL ? next() : prev();
        stopAutoplay();
        startAutoplay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        isRTL ? prev() : next();
        stopAutoplay();
        startAutoplay();
      }
    });

    // Touch/swipe support
    sliderEl.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderEl.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  /**
   * Handle swipe gesture.
   */
  function handleSwipe() {
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        // Swiped left
        next();
      } else {
        // Swiped right
        prev();
      }
      stopAutoplay();
      startAutoplay();
    }
  }

  /**
   * Initialize the slider module.
   */
  function init() {
    sliderEl = document.querySelector('.hero-slider');
    if (!sliderEl) return;

    slides = sliderEl.querySelectorAll('.slide');
    totalSlides = slides.length;

    if (totalSlides === 0) {
      // No slides - hide the slider
      sliderEl.style.display = 'none';
      return;
    }

    wrapper = sliderEl.querySelector('.slider-wrapper');
    dotsContainer = sliderEl.querySelector('.slider-dots');

    // Set initial state
    goTo(0);

    setupControls();
    startAutoplay();
  }

  return {
    init: init,
    goTo: goTo,
    next: next,
    prev: prev
  };
})();

/* ============================================================
 * 6. AwadTech.tilt - 3D Card Tilt Effect (Desktop Only)
 * ============================================================ */
AwadTech.tilt = (function () {
  'use strict';

  var cards = [];
  var MAX_ROTATION = 8;
  var isTouchDevice = false;
  var rafPending = false;

  /**
   * Check if the device supports touch.
   */
  function checkTouch() {
    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  /**
   * Handle mouse move on a card.
   */
  function onMouseMove(e) {
    if (rafPending) return;
    rafPending = true;

    requestAnimationFrame(function () {
      var card = e.currentTarget;
      var rect = card.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var mouseX = e.clientX - centerX;
      var mouseY = e.clientY - centerY;

      // Calculate rotation (inverted Y for natural feel)
      var rotateY = (mouseX / (rect.width / 2)) * MAX_ROTATION;
      var rotateX = -(mouseY / (rect.height / 2)) * MAX_ROTATION;

      // Clamp rotation
      rotateX = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, rotateX));
      rotateY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, rotateY));

      card.style.transform =
        'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
      rafPending = false;
    });
  }

  /**
   * Handle mouse leave - reset card transform.
   */
  function onMouseLeave(e) {
    var card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  }

  /**
   * Initialize the tilt module.
   */
  function init() {
    checkTouch();
    if (isTouchDevice) return;

    cards = document.querySelectorAll('.card-tilt');
    if (cards.length === 0) return;

    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('mousemove', onMouseMove);
      cards[i].addEventListener('mouseleave', onMouseLeave);
      // Set initial transform for smooth transition
      cards[i].style.transition = 'transform 0.3s ease';
      cards[i].style.willChange = 'transform';
    }
  }

  return {
    init: init
  };
})();

/* ============================================================
 * 7. AwadTech.progressBar - Reading Progress Bar
 * ============================================================ */
AwadTech.progressBar = (function () {
  'use strict';

  var progressFill = null;
  var progressContainer = null;
  var isPostPage = false;
  var SHOW_THRESHOLD = 200;
  var ticking = false;

  /**
   * Update progress bar width based on scroll position.
   */
  function updateProgress() {
    if (!progressFill || !isPostPage) return;

    var scrollY = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progress = Math.min(100, Math.max(0, progress));

    progressFill.style.width = progress + '%';

    // Show/hide based on scroll position
    if (progressContainer) {
      if (scrollY > SHOW_THRESHOLD) {
        progressContainer.classList.add('visible');
      } else {
        progressContainer.classList.remove('visible');
      }
    }
  }

  /**
   * Scroll handler with requestAnimationFrame.
   */
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  /**
   * Initialize the progress bar module.
   */
  function init() {
    // Only show on single post pages
    isPostPage = !!document.querySelector('.post-fullwidth');
    if (!isPostPage) return;

    progressContainer = document.getElementById('reading-progress');
    if (!progressContainer) return;

    progressFill = progressContainer.querySelector('.progress-fill');
    if (!progressFill) return;

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  return {
    init: init
  };
})();

/* ============================================================
 * 8. AwadTech.commandPalette - Search (Ctrl+K)
 * ============================================================ */
AwadTech.commandPalette = (function () {
  'use strict';

  var BLOG_FEED = 'https://almoatn.blogspot.com/feeds/posts/default';
  var palette = null;
  var input = null;
  var resultsContainer = null;
  var emptyMsg = null;
  var highlightedIndex = -1;
  var debounceTimer = null;
  var DEBOUNCE_DELAY = 300;
  var isOpen = false;

  /**
   * Open the command palette.
   */
  function open() {
    if (!palette) return;
    palette.classList.add('active');
    isOpen = true;
    highlightedIndex = -1;

    if (input) {
      input.value = '';
      input.focus();
    }

    if (resultsContainer) resultsContainer.innerHTML = '';
    hideEmpty();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close the command palette.
   */
  function close() {
    if (!palette) return;
    palette.classList.remove('active');
    isOpen = false;
    highlightedIndex = -1;

    if (input) {
      input.value = '';
      input.blur();
    }

    if (resultsContainer) resultsContainer.innerHTML = '';

    document.body.style.overflow = '';
  }

  /**
   * Show the empty results message.
   */
  function showEmpty() {
    if (emptyMsg) emptyMsg.style.display = 'block';
  }

  /**
   * Hide the empty results message.
   */
  function hideEmpty() {
    if (emptyMsg) emptyMsg.style.display = 'none';
  }

  /**
   * Search Blogger feed for matching posts.
   */
  function search(query) {
    if (!query || query.trim().length === 0) {
      if (resultsContainer) resultsContainer.innerHTML = '';
      hideEmpty();
      return;
    }

    var url = BLOG_FEED + '?alt=json&q=' + encodeURIComponent(query) + '&max-results=8';

    fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        renderResults(data.feed ? data.feed.entry : []);
      })
      .catch(function () {
        if (resultsContainer) resultsContainer.innerHTML = '';
        showEmpty();
      });
  }

  /**
   * Render search results in the palette.
   */
  function renderResults(entries) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';
    highlightedIndex = -1;

    if (!entries || entries.length === 0) {
      showEmpty();
      return;
    }

    hideEmpty();

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var title = entry.title && entry.title.$t ? entry.title.$t : '';
      var link = '';
      var date = '';
      var snippet = '';

      // Get link
      if (entry.link) {
        for (var j = 0; j < entry.link.length; j++) {
          if (entry.link[j].rel === 'alternate') {
            link = entry.link[j].href;
            break;
          }
        }
      }

      // Get date
      if (entry.published && entry.published.$t) {
        date = new Date(entry.published.$t).toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }

      // Get snippet from content
      if (entry.content && entry.content.$t) {
        snippet = entry.content.$t.replace(/<[^>]*>/g, '').substring(0, 120) + '...';
      } else if (entry.summary && entry.summary.$t) {
        snippet = entry.summary.$t.replace(/<[^>]*>/g, '').substring(0, 120) + '...';
      }

      // Create result item
      var item = document.createElement('a');
      item.className = 'command-result-item';
      item.href = link || '#';
      item.setAttribute('data-index', i);

      item.innerHTML =
        '<div class="command-result-title">' + escapeHtml(title) + '</div>' +
        '<div class="command-result-snippet">' + escapeHtml(snippet) + '</div>' +
        '<div class="command-result-date">' + escapeHtml(date) + '</div>';

      // Click to navigate
      item.addEventListener('click', function (e) {
        // Allow default anchor behavior
        close();
      });

      resultsContainer.appendChild(item);
    }
  }

  /**
   * Escape HTML entities to prevent XSS.
   */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /**
   * Highlight a result item by index.
   */
  function highlightItem(index) {
    if (!resultsContainer) return;
    var items = resultsContainer.querySelectorAll('.command-result-item');

    // Remove previous highlight
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('highlighted');
    }

    if (index >= 0 && index < items.length) {
      items[index].classList.add('highlighted');
      items[index].scrollIntoView({ block: 'nearest' });
      highlightedIndex = index;
    }
  }

  /**
   * Select the currently highlighted result.
   */
  function selectHighlighted() {
    if (!resultsContainer) return;
    var items = resultsContainer.querySelectorAll('.command-result-item');
    if (highlightedIndex >= 0 && highlightedIndex < items.length) {
      items[highlightedIndex].click();
    }
  }

  /**
   * Set up keyboard navigation.
   */
  function setupKeyboard() {
    // Ctrl+K or Cmd+K to open
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }

      if (!isOpen) return;

      // Escape to close
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      // Arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightItem(highlightedIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightItem(highlightedIndex - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        selectHighlighted();
      }
    });
  }

  /**
   * Set up input debounced search.
   */
  function setupInput() {
    if (!input) return;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        search(input.value);
      }, DEBOUNCE_DELAY);
    });
  }

  /**
   * Set up click-outside-to-close and search trigger buttons.
   */
  function setupClickOutside() {
    document.addEventListener('click', function (e) {
      if (isOpen && palette && !palette.contains(e.target)) {
        // Check if the click was on a search trigger
        if (e.target.closest('.search-trigger')) return;
        close();
      }
    });

    // Search trigger buttons
    var triggers = document.querySelectorAll('.search-trigger');
    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (isOpen) {
          close();
        } else {
          open();
        }
      });
    }
  }

  /**
   * Initialize the command palette module.
   */
  function init() {
    palette = document.getElementById('command-palette');
    if (!palette) return;

    input = palette.querySelector('.command-input');
    resultsContainer = palette.querySelector('.command-results');
    emptyMsg = palette.querySelector('.command-empty');

    setupKeyboard();
    setupInput();
    setupClickOutside();
  }

  return {
    init: init,
    open: open,
    close: close
  };
})();

/* ============================================================
 * 9. AwadTech.favorites - Save/Bookmark System
 * ============================================================ */
AwadTech.favorites = (function () {
  'use strict';

  var STORAGE_KEY = 'awad-favorites';
  var favorites = [];
  var panel = null;

  /**
   * Load favorites from localStorage.
   */
  function loadFavorites() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      favorites = data ? JSON.parse(data) : [];
    } catch (e) {
      favorites = [];
    }
  }

  /**
   * Save favorites to localStorage.
   */
  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      // Storage full or unavailable
    }
  }

  /**
   * Check if a post is saved.
   */
  function isSaved(postId) {
    for (var i = 0; i < favorites.length; i++) {
      if (favorites[i].id === postId) return true;
    }
    return false;
  }

  /**
   * Get all favorites.
   */
  function getAll() {
    return favorites.slice();
  }

  /**
   * Save a post to favorites.
   */
  function save(data) {
    if (!data || !data.id) return;
    if (isSaved(data.id)) return;

    favorites.push({
      id: data.id,
      title: data.title || '',
      url: data.url || '',
      thumb: data.thumb || ''
    });

    saveFavorites();
    updateButtonStates();
    populatePanel();
  }

  /**
   * Remove a post from favorites.
   */
  function remove(postId) {
    favorites = favorites.filter(function (item) {
      return item.id !== postId;
    });
    saveFavorites();
    updateButtonStates();
    populatePanel();
  }

  /**
   * Toggle save/unsave for a post.
   */
  function toggle(postId, data) {
    if (isSaved(postId)) {
      remove(postId);
    } else {
      save(data);
    }
  }

  /**
   * Update all save button visual states.
   */
  function updateButtonStates() {
    var buttons = document.querySelectorAll('.card-save');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var postId = btn.getAttribute('data-post-id');
      if (postId && isSaved(postId)) {
        btn.classList.add('saved');
      } else {
        btn.classList.remove('saved');
      }
    }
  }

  /**
   * Populate the favorites panel with saved items.
   */
  function populatePanel() {
    if (!panel) return;

    var list = panel.querySelector('.fav-list');
    if (!list) return;

    list.innerHTML = '';

    if (favorites.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'favorites-empty';
      empty.textContent = 'لا توجد عناصر محفوظة | No saved items';
      list.appendChild(empty);
      return;
    }

    for (var i = 0; i < favorites.length; i++) {
      var item = favorites[i];
      var el = document.createElement('div');
      el.className = 'fav-item';

      var thumb = item.thumb
        ? '<img src="' + escapeHtml(item.thumb) + '" alt="" class="fav-item-thumb" loading="lazy">'
        : '<div class="fav-item-thumb fav-item-no-thumb"></div>';

      el.innerHTML =
        thumb +
        '<div class="fav-item-info">' +
          '<a href="' + escapeHtml(item.url) + '" class="fav-item-title">' + escapeHtml(item.title) + '</a>' +
        '</div>' +
        '<button class="fav-item-remove" data-post-id="' + escapeHtml(item.id) + '" aria-label="Remove">&times;</button>';

      list.appendChild(el);
    }

    // Attach remove handlers
    var removeBtns = panel.querySelectorAll('.fav-item-remove');
    for (var j = 0; j < removeBtns.length; j++) {
      removeBtns[j].addEventListener('click', function (e) {
        var id = this.getAttribute('data-post-id');
        remove(id);
      });
    }
  }

  /**
   * Escape HTML entities.
   */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str || ''));
    return div.innerHTML;
  }

  /**
   * Show the favorites panel.
   */
  function showPanel() {
    if (panel) {
      panel.classList.add('active');
      document.body.style.overflow = 'hidden';
      populatePanel();
    }
  }

  /**
   * Hide the favorites panel.
   */
  function hidePanel() {
    if (panel) {
      panel.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /**
   * Initialize the favorites module.
   */
  function init() {
    panel = document.getElementById('favorites-panel');
    loadFavorites();
    updateButtonStates();

    // Set up save button click handlers
    var saveButtons = document.querySelectorAll('.card-save');
    for (var i = 0; i < saveButtons.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var postId = btn.getAttribute('data-post-id');
          var title = btn.getAttribute('data-post-title') || '';
          var url = btn.getAttribute('data-post-url') || '';
          var thumb = btn.getAttribute('data-post-thumb') || '';

          toggle(postId, { id: postId, title: title, url: url, thumb: thumb });
        });
      })(saveButtons[i]);
    }

    // Favorites panel toggle buttons
    var favTriggers = document.querySelectorAll('.fav-trigger');
    for (var j = 0; j < favTriggers.length; j++) {
      favTriggers[j].addEventListener('click', function (e) {
        e.preventDefault();
        if (panel && panel.classList.contains('active')) {
          hidePanel();
        } else {
          showPanel();
        }
      });
    }

    // Close the panel when clicking its backdrop, even when no separate
    // overlay element is present in the Blogger template.
    if (panel) {
      panel.addEventListener('click', function (e) {
        if (e.target === panel) hidePanel();
      });

      var overlay = panel.querySelector('.fav-overlay');
      if (overlay) {
        overlay.addEventListener('click', hidePanel);
      }

      // Close panel button
      var closeBtn = panel.querySelector('.fav-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', hidePanel);
      }
    }
  }

  return {
    init: init,
    toggle: toggle,
    save: save,
    remove: remove,
    isSaved: isSaved,
    getAll: getAll,
    showPanel: showPanel,
    hidePanel: hidePanel
  };
})();

/* ============================================================
 * 10. AwadTech.downloadBox - Download Box Features
 * ============================================================ */
AwadTech.downloadBox = (function () {
  'use strict';

  var QR_API = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

  /**
   * Get the post ID from the page URL or data attribute.
   */
  function getPostId() {
    var box = document.getElementById('download-box');
    if (box) {
      var id = box.getAttribute('data-post-id');
      if (id) return id;
    }
    // Fallback: extract from URL
    var url = window.location.href;
    var match = url.match(/\/\d{4}\/\d{2}\/([^.]+)\.html/);
    return match ? match[1] : window.location.pathname;
  }

  /**
   * Set up QR code image.
   */
  function setupQR() {
    var qrContainer = document.querySelector('.dl-qr');
    if (!qrContainer) return;

    var img = document.createElement('img');
    img.src = QR_API + encodeURIComponent(window.location.href);
    img.alt = 'QR Code';
    img.loading = 'lazy';
    img.className = 'qr-code-img';

    qrContainer.innerHTML = '';
    qrContainer.appendChild(img);
  }

  /**
   * Set up star rating interaction in download box.
   */
  function setupRating() {
    var ratingContainer = document.querySelector('#download-box .star-rating');
    if (!ratingContainer) return;

    var postId = getPostId();
    var storageKey = 'awad-rating-' + postId;
    var stars = ratingContainer.querySelectorAll('.star-btn');

    // Load saved rating
    var savedRating = parseInt(localStorage.getItem(storageKey), 10);
    if (!isNaN(savedRating)) {
      updateStarVisual(stars, savedRating);
    }

    // Click to rate
    for (var i = 0; i < stars.length; i++) {
      (function (star, index) {
        star.addEventListener('click', function () {
          var value = parseInt(star.getAttribute('data-value'), 10);
          if (isNaN(value)) value = index + 1;
          localStorage.setItem(storageKey, value);
          updateStarVisual(stars, value);
        });

        // Hover preview
        star.addEventListener('mouseenter', function () {
          var value = parseInt(star.getAttribute('data-value'), 10);
          if (isNaN(value)) value = index + 1;
          updateStarVisual(stars, value);
        });
      })(stars[i], i);
    }

    // Revert to saved rating on mouse leave
    ratingContainer.addEventListener('mouseleave', function () {
      var saved = parseInt(localStorage.getItem(storageKey), 10);
      if (!isNaN(saved)) {
        updateStarVisual(stars, saved);
      } else {
        updateStarVisual(stars, 0);
      }
    });
  }

  /**
   * Update star visual states.
   */
  function updateStarVisual(stars, value) {
    for (var i = 0; i < stars.length; i++) {
      var starValue = parseInt(stars[i].getAttribute('data-value'), 10);
      if (starValue <= value) {
        stars[i].classList.add('filled');
      } else {
        stars[i].classList.remove('filled');
      }
    }
  }

  /**
   * Initialize the download box module.
   */
  function init() {
    var box = document.getElementById('download-box');
    if (!box) return;

    setupQR();
    setupRating();
  }

  return {
    init: init
  };
})();

/* ============================================================
 * 11. AwadTech.rating - Standalone Star Rating
 * ============================================================ */
AwadTech.rating = (function () {
  'use strict';

  /**
   * Update star visual states for a container.
   */
  function updateStars(container, value) {
    var stars = container.querySelectorAll('.star-btn');
    for (var i = 0; i < stars.length; i++) {
      var starValue = parseInt(stars[i].getAttribute('data-value'), 10);
      if (starValue <= value) {
        stars[i].classList.add('filled');
      } else {
        stars[i].classList.remove('filled');
      }
    }
  }

  /**
   * Initialize a single star rating container.
   */
  function initContainer(container) {
    var postId = container.getAttribute('data-post-id') || 'default';
    var storageKey = 'awad-rating-' + postId;
    var stars = container.querySelectorAll('.star-btn');

    // Load saved rating
    var savedRating = parseInt(localStorage.getItem(storageKey), 10);
    if (!isNaN(savedRating)) {
      updateStars(container, savedRating);
    }

    // Click handler for each star
    for (var i = 0; i < stars.length; i++) {
      (function (star) {
        star.addEventListener('click', function () {
          var value = parseInt(star.getAttribute('data-value'), 10);
          if (!isNaN(value)) {
            localStorage.setItem(storageKey, value);
            updateStars(container, value);
          }
        });

        // Hover preview
        star.addEventListener('mouseenter', function () {
          var value = parseInt(star.getAttribute('data-value'), 10);
          if (!isNaN(value)) {
            updateStars(container, value);
          }
        });
      })(stars[i]);
    }

    // Revert to saved on mouse leave
    container.addEventListener('mouseleave', function () {
      var saved = parseInt(localStorage.getItem(storageKey), 10);
      if (!isNaN(saved)) {
        updateStars(container, saved);
      } else {
        updateStars(container, 0);
      }
    });
  }

  /**
   * Initialize the rating module.
   */
  function init() {
    var containers = document.querySelectorAll('.star-rating');
    for (var i = 0; i < containers.length; i++) {
      // Skip containers inside download-box (handled by downloadBox module)
      if (containers[i].closest('#download-box')) continue;
      initContainer(containers[i]);
    }
  }

  return {
    init: init
  };
})();

/* ============================================================
 * 12. AwadTech.socialShare - Social Sharing
 * ============================================================ */
AwadTech.socialShare = (function () {
  'use strict';

  var PLATFORM_URLS = {
    facebook: function (data) {
      return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(data.url);
    },
    twitter: function (data) {
      return 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(data.url) + '&text=' + encodeURIComponent(data.title);
    },
    whatsapp: function (data) {
      return 'https://api.whatsapp.com/send?text=' + encodeURIComponent(data.title + ' ' + data.url);
    },
    telegram: function (data) {
      return 'https://t.me/share/url?url=' + encodeURIComponent(data.url) + '&text=' + encodeURIComponent(data.title);
    },
    linkedin: function (data) {
      return 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(data.url) + '&title=' + encodeURIComponent(data.title);
    }
  };

  /**
   * Get share data from a button's closest article/post context.
   */
  function getShareData(btn) {
    var url = btn.getAttribute('data-share-url') || window.location.href;
    var title = btn.getAttribute('data-share-title') || document.title;
    return { url: url, title: title };
  }

  /**
   * Open a popup window centered on screen.
   */
  function openPopup(url) {
    var width = 600;
    var height = 400;
    var left = (window.innerWidth - width) / 2;
    var top = (window.innerHeight - height) / 2;
    var opts =
      'width=' + width +
      ',height=' + height +
      ',left=' + left +
      ',top=' + top +
      ',menubar=no,toolbar=no,status=no,scrollbars=yes';
    window.open(url, 'share_window', opts);
  }

  /**
   * Share to a specific platform.
   */
  function share(platform, data) {
    if (platform === 'copy-link') {
      // Copy link to clipboard
      var url = data ? data.url : window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          showCopyFeedback();
        });
      } else {
        // Fallback for older browsers
        var textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showCopyFeedback();
        } catch (e) {
          // Silent fail
        }
        document.body.removeChild(textarea);
      }
      return;
    }

    var urlBuilder = PLATFORM_URLS[platform];
    if (urlBuilder && data) {
      openPopup(urlBuilder(data));
    }
  }

  /**
   * Show 'Copied!' feedback on copy-link buttons.
   */
  function showCopyFeedback() {
    var copyBtns = document.querySelectorAll('.share-btn[data-platform="copy-link"]');
    for (var i = 0; i < copyBtns.length; i++) {
      var originalText = copyBtns[i].textContent;
      copyBtns[i].textContent = 'Copied!';
      copyBtns[i].classList.add('copied');
      (function (btn, text) {
        setTimeout(function () {
          btn.textContent = text;
          btn.classList.remove('copied');
        }, 2000);
      })(copyBtns[i], originalText);
    }
  }

  /**
   * Initialize the social share module.
   */
  function init() {
    var buttons = document.querySelectorAll('.share-btn');
    for (var i = 0; i < buttons.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var platform = btn.getAttribute('data-platform');
          var data = getShareData(btn);
          share(platform, data);
        });
      })(buttons[i]);
    }
  }

  return {
    init: init,
    share: share
  };
})();

/* ============================================================
 * 13. AwadTech.lazyLoad - Image Lazy Loading
 * ============================================================ */
AwadTech.lazyLoad = (function () {
  'use strict';

  var observer = null;

  /**
   * Handle intersection - load the image.
   */
  function onIntersect(entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        var img = entry.target;
        var src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.setAttribute('loading', 'lazy');

          // Add fade-in animation on load
          img.classList.add('lazy-loaded');

          img.addEventListener('load', function () {
            this.classList.add('lazy-fade-in');
          }, { once: true });

          img.addEventListener('error', function () {
            this.classList.add('lazy-error');
          }, { once: true });
        }
        // Stop observing this image
        observer.unobserve(img);
      }
    }
  }

  /**
   * Initialize the lazy loading module.
   */
  function init() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately
      var images = document.querySelectorAll('img[data-src]');
      for (var i = 0; i < images.length; i++) {
        var img = images[i];
        var src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
      }
      return;
    }

    observer = new IntersectionObserver(onIntersect, {
      rootMargin: '200px',
      threshold: 0
    });

    var images = document.querySelectorAll('img[data-src]');
    for (var i = 0; i < images.length; i++) {
      observer.observe(images[i]);
    }
  }

  return {
    init: init
  };
})();

/* ============================================================
 * 14. AwadTech.summary - Smart Summary
 * ============================================================ */
AwadTech.summary = (function () {
  'use strict';

  // Future: Connect to AI API for enhanced summaries

  /**
   * Extract key sentences from post body content.
   */
  function extractKeyPoints(container) {
    var points = [];
    var body = document.querySelector('.post-body-content');
    if (!body) return points;

    // Find all h2 and h3 headings
    var headings = body.querySelectorAll('h2, h3');

    for (var i = 0; i < headings.length && points.length < 5; i++) {
      var heading = headings[i];
      // Get the heading text
      var headingText = heading.textContent.trim();
      if (headingText) {
        points.push(headingText);
      }

      // Get first paragraph after heading (up to 2 sentences)
      var sibling = heading.nextElementSibling;
      while (sibling && sibling.tagName !== 'H2' && sibling.tagName !== 'H3' && points.length < 6) {
        if (sibling.tagName === 'P') {
          var text = sibling.textContent.trim();
          if (text) {
            // Extract up to 2 sentences
            var sentences = text.match(/[^.!?]+[.!?]+/g);
            if (sentences && sentences.length > 0) {
              var summary = sentences.slice(0, 2).join(' ').trim();
              if (summary) {
                points.push(summary);
              }
            }
            break; // Only take first paragraph after each heading
          }
        }
        sibling = sibling.nextElementSibling;
      }
    }

    return points;
  }

  /**
   * Build the summary bullet list HTML.
   */
  function buildSummaryHTML(points) {
    if (points.length === 0) return '';

    var html = '<ul class="summary-points">';
    for (var i = 0; i < points.length; i++) {
      html += '<li class="summary-point">' + escapeHtml(points[i]) + '</li>';
    }
    html += '</ul>';
    return html;
  }

  /**
   * Escape HTML entities.
   */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str || ''));
    return div.innerHTML;
  }

  /**
   * Initialize a single smart summary element.
   */
  function initSummary(el) {
    var toggleBtn = el.querySelector('.summary-toggle');
    var content = el.querySelector('.summary-content');
    if (!toggleBtn || !content) return;

    // Check if it's a mobile device for default collapsed state
    var isMobile = window.innerWidth < 768;
    if (isMobile) {
      content.style.display = 'none';
      toggleBtn.classList.add('collapsed');
      toggleBtn.textContent = toggleBtn.getAttribute('data-expand-text') || 'Show Summary';
    } else {
      content.style.display = 'block';
      toggleBtn.classList.remove('collapsed');
      toggleBtn.textContent = toggleBtn.getAttribute('data-collapse-text') || 'Hide Summary';
    }

    // Extract and populate key points
    var points = extractKeyPoints(el);
    if (points.length > 0) {
      var pointsContainer = el.querySelector('.summary-points');
      if (pointsContainer) {
        pointsContainer.innerHTML = buildSummaryHTML(points);
      } else {
        content.innerHTML = buildSummaryHTML(points);
      }
    }

    // Toggle click handler
    toggleBtn.addEventListener('click', function () {
      var isCollapsed = toggleBtn.classList.contains('collapsed');
      if (isCollapsed) {
        content.style.display = 'block';
        toggleBtn.classList.remove('collapsed');
        toggleBtn.textContent = toggleBtn.getAttribute('data-collapse-text') || 'Hide Summary';
      } else {
        content.style.display = 'none';
        toggleBtn.classList.add('collapsed');
        toggleBtn.textContent = toggleBtn.getAttribute('data-expand-text') || 'Show Summary';
      }
    });
  }

  /**
   * Initialize the summary module.
   */
  function init() {
    var summaries = document.querySelectorAll('.smart-summary');
    for (var i = 0; i < summaries.length; i++) {
      initSummary(summaries[i]);
    }
  }

  return {
    init: init
  };
})();

/* ============================================================
 * 15. AwadTech.faq - FAQ Accordion
 * ============================================================ */
AwadTech.faq = (function () {
  'use strict';

  /**
   * Close all FAQ items except the specified one.
   */
  function closeOthers(activeItem) {
    var items = document.querySelectorAll('.faq-item');
    for (var i = 0; i < items.length; i++) {
      if (items[i] !== activeItem && items[i].classList.contains('active')) {
        items[i].classList.remove('active');
        // Reset max-height for smooth transition
        var answer = items[i].querySelector('.faq-answer');
        if (answer) {
          answer.style.maxHeight = '0';
        }
      }
    }
  }

  /**
   * Toggle a FAQ item.
   */
  function toggleItem(item) {
    var isActive = item.classList.contains('active');
    var answer = item.querySelector('.faq-answer');

    if (!answer) return;

    if (isActive) {
      // Close this item
      item.classList.remove('active');
      answer.style.maxHeight = '0';
    } else {
      // Close others first (accordion behavior)
      closeOthers(item);

      // Open this item
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }

  /**
   * Initialize the FAQ module.
   */
  function init() {
    var items = document.querySelectorAll('.faq-item');
    if (items.length === 0) return;

    for (var i = 0; i < items.length; i++) {
      (function (item) {
        var question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function () {
          toggleItem(item);
        });

        // Keyboard accessibility
        question.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleItem(item);
          }
        });

        // Set initial max-height for active items
        if (item.classList.contains('active')) {
          var answer = item.querySelector('.faq-answer');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }
      })(items[i]);
    }
  }

  return {
    init: init
  };
})();

/* ============================================================
 * 16. AwadTech.mobileMenu - Mobile Menu Enhancement
 * ============================================================ */
AwadTech.mobileMenu = (function () {
  'use strict';

  var menu = null;
  var overlay = null;
  var touchStartY = 0;
  var touchStartX = 0;
  var SWIPE_THRESHOLD = 80;
  var firstFocusable = null;
  var lastFocusable = null;

  /**
   * Get all focusable elements within the menu.
   */
  function getFocusableElements() {
    if (!menu) return [];
    var selectors = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    return menu.querySelectorAll(selectors);
  }

  /**
   * Trap focus within the menu when open.
   */
  function handleFocusTrap(e) {
    if (!menu || !menu.classList.contains('active')) return;

    var focusable = getFocusableElements();
    if (focusable.length === 0) return;

    firstFocusable = focusable[0];
    lastFocusable = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }

  /**
   * Lock body scroll when menu is open.
   */
  function lockScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }

  /**
   * Unlock body scroll when menu is closed.
   */
  function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }

  /**
   * Set up swipe gesture to close menu.
   */
  function setupSwipe() {
    if (!menu) return;

    menu.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    menu.addEventListener('touchend', function (e) {
      var deltaX = e.changedTouches[0].screenX - touchStartX;
      var deltaY = e.changedTouches[0].screenY - touchStartY;

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
        var isRTL = AwadTech.lang && AwadTech.lang.getCurrent() === 'ar';
        // RTL: swipe right to close; LTR: swipe left to close
        if ((isRTL && deltaX > 0) || (!isRTL && deltaX < 0)) {
          if (AwadTech.header && AwadTech.header.closeMobileMenu) {
            AwadTech.header.closeMobileMenu();
          }
        }
      }
    }, { passive: true });
  }

  /**
   * Initialize the mobile menu enhancement module.
   */
  function init() {
    menu = document.querySelector('.mobile-menu');
    overlay = document.querySelector('.mobile-menu-overlay');

    if (!menu) return;

    setupSwipe();

    // Focus trap when menu is open
    document.addEventListener('keydown', handleFocusTrap);

    // Observe menu open/close for scroll lock
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].attributeName === 'class') {
          if (menu.classList.contains('active')) {
            lockScroll();
            // Focus first element after opening
            setTimeout(function () {
              var focusable = getFocusableElements();
              if (focusable.length > 0) {
                focusable[0].focus();
              }
            }, 100);
          } else {
            unlockScroll();
          }
        }
      }
    });

    observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
  }

  return {
    init: init
  };
})();

/* ============================================================
 * INITIALIZATION
 * ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Initialize all modules in order
  // Theme and language first as they affect layout
  AwadTech.theme.init();
  AwadTech.lang.init();

  // UI components
  AwadTech.header.init();
  AwadTech.marquee.init();
  AwadTech.slider.init();
  AwadTech.tilt.init();

  // Post-page features
  AwadTech.progressBar.init();

  // Interactive features
  AwadTech.commandPalette.init();
  AwadTech.favorites.init();
  AwadTech.downloadBox.init();
  AwadTech.rating.init();
  AwadTech.socialShare.init();

  // Performance and content
  AwadTech.lazyLoad.init();
  AwadTech.summary.init();
  AwadTech.faq.init();
  AwadTech.mobileMenu.init();
});
