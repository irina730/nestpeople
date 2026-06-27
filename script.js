// ===== Mobile nav toggle =====
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// ===== Language switch (EN / 中文) =====
// Each translatable element carries its English text as its initial content and
// a `data-zh` (or `data-zh-ph` for placeholders) attribute with the Chinese text.
// We stash the English on first run so toggling back is lossless.
const langSwitch = document.getElementById('langSwitch');

function applyLang(lang) {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.body.classList.toggle('lang-zh', lang === 'zh');

  document.querySelectorAll('[data-zh]').forEach(el => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    el.innerHTML = lang === 'zh' ? el.dataset.zh : el.dataset.en;
  });

  document.querySelectorAll('[data-zh-ph]').forEach(el => {
    if (el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute('placeholder') || '';
    el.setAttribute('placeholder', lang === 'zh' ? el.dataset.zhPh : el.dataset.enPh);
  });

  langSwitch.querySelectorAll('button').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang)
  );

  try { localStorage.setItem('np-lang', lang); } catch (e) {}
}

langSwitch.querySelectorAll('button').forEach(btn =>
  btn.addEventListener('click', () => applyLang(btn.dataset.lang))
);

// Restore saved preference, else fall back to the browser language.
let saved = null;
try { saved = localStorage.getItem('np-lang'); } catch (e) {}
const initial = saved || (navigator.language && navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en');
applyLang(initial);

// Contact uses an embedded Google Form — no custom submit handling needed.
