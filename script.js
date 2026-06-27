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

// ===== Contact form: posts to Google Forms backend, styled UI kept =====
const GFORM = 'https://docs.google.com/forms/d/e/1FAIpQLSf9zbXF_59w3FWeOWZ4ucbhsNJRVTPVIo05qN2D4EYoSkWVgA/formResponse';
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const original = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = '…';

  try {
    // Google Forms doesn't send CORS headers; no-cors still records the response.
    await fetch(GFORM, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form))
    });
    note.hidden = false;
    form.reset();
    note.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = original;
  }
});
