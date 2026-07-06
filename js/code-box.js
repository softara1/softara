function copyCodeBox(button) {
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
