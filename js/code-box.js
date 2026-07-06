/**
 * Download Box Enhancer + Code Box Copy (إصدار تشخيصي)
 */
console.log('✅ ملف JS تم تحميله');

(function() {
  'use strict';

  const iconMap = {
    pdf: 'fa-file-pdf', doc: 'fa-file-word', docx: 'fa-file-word',
    xls: 'fa-file-excel', xlsx: 'fa-file-excel', ppt: 'fa-file-powerpoint', pptx: 'fa-file-powerpoint',
    jpg: 'fa-file-image', jpeg: 'fa-file-image', png: 'fa-file-image', gif: 'fa-file-image', svg: 'fa-file-image',
    zip: 'fa-file-archive', rar: 'fa-file-archive', '7z': 'fa-file-archive',
    mp3: 'fa-file-audio', wav: 'fa-file-audio', flac: 'fa-file-audio',
    mp4: 'fa-file-video', mkv: 'fa-file-video', avi: 'fa-file-video', mov: 'fa-file-video',
    txt: 'fa-file-alt', csv: 'fa-file-csv',
    html: 'fa-file-code', css: 'fa-file-code', js: 'fa-file-code', json: 'fa-file-code',
    m3u: 'fa-file-video', default: 'fa-file'
  };

  function formatSize(bytes) {
    if (!bytes) return '';
    if (typeof bytes === 'string' && bytes.match(/[KMGT]?B/i)) return bytes;
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return bytes;
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0, size = num;
    while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
    return size.toFixed(2).replace(/\.00$/, '') + ' ' + units[i];
  }

  function getLocalCount(href) {
    try {
      const key = 'dlCount_' + btoa(href).replace(/=/g, '');
      return parseInt(localStorage.getItem(key) || '0', 10);
    } catch (e) { return 0; }
  }
  function incrementLocalCount(href) {
    try {
      const key = 'dlCount_' + btoa(href).replace(/=/g, '');
      const count = getLocalCount(href) + 1;
      localStorage.setItem(key, count);
      return count;
    } catch (e) { return 0; }
  }

  function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = event.clientX - rect.left - radius + 'px';
    circle.style.top = event.clientY - rect.top - radius + 'px';
    circle.classList.add('ripple');
    element.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  }

  function enhanceBox(box) {
    console.log('🔧 enhanceBox بدأ لـ', box);

    try {
      const href = box.getAttribute('data-href') || '';
      const ext = box.getAttribute('data-ext') || (box.querySelector('.fT')?.getAttribute('data-text')) || '';
      const filename = box.getAttribute('data-filename') || box.querySelector('.fN span:first-child')?.textContent || '';
      const rawSize = box.getAttribute('data-size') || box.querySelector('.fS')?.textContent || '';
      const password = box.getAttribute('data-password') || '';
      const mirrorsData = box.getAttribute('data-mirrors') || '';
      const enableQR = box.getAttribute('data-qr') === 'true';

      console.log('📦 البيانات:', { href, ext, filename, rawSize });

      // أيقونة
      const iconSpan = box.querySelector('.fT');
      if (iconSpan) {
        const extension = ext || (filename.split('.').pop()?.toLowerCase()) || 'default';
        const iconClass = iconMap[extension] || iconMap.default;
        iconSpan.innerHTML = '<i class="fas ' + iconClass + '"></i>';
      }

      // اسم وحجم
      const nameSpan = box.querySelector('.fN span:first-child');
      if (nameSpan && filename) nameSpan.textContent = filename;
      const sizeSpan = box.querySelector('.fS');
      if (sizeSpan) sizeSpan.textContent = formatSize(rawSize);

      // مجموعة الأزرار
      let btnGroup = box.querySelector('.btnGroup');
      if (!btnGroup) {
        btnGroup = document.createElement('div');
        btnGroup.className = 'btnGroup';
        box.appendChild(btnGroup);
      } else {
        btnGroup.innerHTML = '';
      }

      // زر التحميل
      const dlBtn = document.createElement('button');
      dlBtn.className = 'dl-btn';
      dlBtn.setAttribute('aria-label', 'تحميل');
      dlBtn.innerHTML = '<i class="fas fa-download"></i> تحميل';
      if (href) dlBtn.setAttribute('data-href', href);

      const countSpan = document.createElement('span');
      countSpan.className = 'dl-count';
      const initialCount = getLocalCount(href);
      countSpan.textContent = initialCount > 0 ? ' (' + initialCount + ')' : '';
      dlBtn.appendChild(countSpan);

      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      dlBtn.appendChild(progressBar);

      // زر نسخ
      const copyBtn = document.createElement('button');
      copyBtn.className = 'icon-btn';
      copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
      const tooltip = document.createElement('span');
      tooltip.className = 'copy-tooltip';
      tooltip.textContent = 'تم النسخ';
      copyBtn.appendChild(tooltip);

      // QR (اختياري)
      let qrBtn = null;
      if (enableQR && href && typeof QRCode !== 'undefined') {
        qrBtn = document.createElement('button');
        qrBtn.className = 'icon-btn';
        qrBtn.innerHTML = '<i class="fas fa-qrcode"></i>';
      }

      // كلمة المرور
      let passwordRevealEl = null;
      if (password) {
        passwordRevealEl = document.createElement('div');
        passwordRevealEl.className = 'password-reveal';
        passwordRevealEl.innerHTML = '<i class="fas fa-lock"></i> <span class="pw-hidden">••••••••</span> <i class="fas fa-eye toggle-pw" style="cursor:pointer; margin-right:4px;"></i>';
      }

      // مرايا
      let mirrorsContainer = null;
      if (mirrorsData) {
        try {
          const mirrors = JSON.parse(mirrorsData);
          if (mirrors.length) {
            mirrorsContainer = document.createElement('div');
            mirrorsContainer.className = 'mirror-btns';
            mirrors.forEach(m => {
              const a = document.createElement('a');
              a.className = 'mirror-link';
              a.href = m.url;
              a.textContent = m.label;
              a.target = '_blank';
              a.rel = 'noopener';
              mirrorsContainer.appendChild(a);
            });
          }
        } catch (e) {}
      }

      // تجميع
      if (qrBtn) btnGroup.appendChild(qrBtn);
      btnGroup.appendChild(copyBtn);
      btnGroup.appendChild(dlBtn);
      if (passwordRevealEl) box.appendChild(passwordRevealEl);
      if (mirrorsContainer) box.appendChild(mirrorsContainer);

      console.log('✅ تم إضافة الأزرار بنجاح');

      // الأحداث
      box.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(e) { createRipple(e, this); });
      });

      dlBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (dlBtn.disabled) return;
        const targetHref = dlBtn.getAttribute('data-href');
        if (!targetHref) return;
        dlBtn.disabled = true;
        let width = 0;
        progressBar.style.width = '0%';
        const interval = setInterval(function () {
          width += 5;
          progressBar.style.width = width + '%';
          if (width >= 100) {
            clearInterval(interval);
            const a = document.createElement('a');
            a.href = targetHref;
            a.download = '';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => { dlBtn.disabled = false; progressBar.style.width = '0%'; }, 1500);
          }
        }, 60);
        const newCount = incrementLocalCount(targetHref);
        countSpan.textContent = ' (' + newCount + ')';
      });

      copyBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const copyHref = href || dlBtn.getAttribute('data-href');
        if (!copyHref) return;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(copyHref).then(() => {
            tooltip.classList.add('show');
            setTimeout(() => tooltip.classList.remove('show'), 1500);
          }).catch(() => fallbackCopy(copyHref));
        } else {
          fallbackCopy(copyHref);
        }
        function fallbackCopy(text) {
          const temp = document.createElement('textarea');
          temp.value = text;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
          tooltip.classList.add('show');
          setTimeout(() => tooltip.classList.remove('show'), 1500);
        }
      });

      if (qrBtn) {
        qrBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          let modal = document.getElementById('qrModal');
          if (!modal) {
            modal = document.createElement('div');
            modal.id = 'qrModal';
            modal.className = 'qr-modal';
            modal.innerHTML = '<div class="qr-modal-content"><h3>امسح الرمز للتحميل</h3><div id="qrContainer"></div><button class="close-btn">إغلاق</button></div>';
            document.body.appendChild(modal);
            modal.querySelector('.close-btn').addEventListener('click', () => modal.classList.remove('show'));
            modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });
          }
          modal.classList.add('show');
          document.getElementById('qrContainer').innerHTML = '';
          new QRCode(document.getElementById('qrContainer'), {
            text: href,
            size: 180,
            dark: '#000',
            light: '#fff',
            correctLevel: QRCode.CorrectLevel.H
          });
        });
      }

      if (passwordRevealEl) {
        const toggle = passwordRevealEl.querySelector('.toggle-pw');
        const pwSpan = passwordRevealEl.querySelector('.pw-hidden');
        if (toggle && pwSpan) {
          toggle.addEventListener('click', () => {
            if (pwSpan.textContent === password) {
              pwSpan.textContent = '••••••••';
              toggle.classList.replace('fa-eye-slash', 'fa-eye');
            } else {
              pwSpan.textContent = password;
              toggle.classList.replace('fa-eye', 'fa-eye-slash');
            }
          });
        }
      }

    } catch (error) {
      console.error('❌ خطأ داخل enhanceBox:', error);
    }
  }

  // عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', function () {
    console.log('📄 DOM جاهز، عدد صناديق .dlBox:', document.querySelectorAll('.dlBox').length);
    document.querySelectorAll('.dlBox').forEach(function(box, index) {
      console.log('🔍 معالجة الصندوق رقم', index);
      enhanceBox(box);
    });
  });

})();

// دالة نسخ الأكواد
function copyCodeBox(button) {
  console.log('📋 copyCodeBox استدعيت');
  const container = button.closest('.code-box-container');
  const textarea = container.querySelector('.code-box-textarea');
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  try {
    document.execCommand('copy');
    const originalHTML = button.innerHTML;
    button.innerHTML = '✅ تم النسخ';
    button.classList.add('copied');
    setTimeout(function() {
      button.innerHTML = originalHTML;
      button.classList.remove('copied');
    }, 2000);
  } catch (err) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textarea.value).then(function() {
        button.innerHTML = '✅ تم النسخ';
        button.classList.add('copied');
        setTimeout(function() {
          button.innerHTML = '📋 نسخ';
          button.classList.remove('copied');
        }, 2000);
      }).catch(function() {
        alert('تعذر النسخ، حاول يدوياً.');
      });
    } else {
      alert('النسخ غير مدعوم. الرجاء تحديد النص ونسخه يدوياً.');
    }
  }
}
