/**
 * lang.js — Shared bilingual (ID/EN) language switcher
 * Used by: index.html + all project-*.html pages
 *
 * Rule: setiap elemen dengan data-id / data-en HARUS punya
 * textContent default (Bahasa Indonesia) di HTML.
 * lang.js hanya mengganti teks — tidak pernah mengosongkan.
 */

function setLang(lang) {
  // 1. Swap textContent — hanya jika atribut ada dan tidak kosong
  document.querySelectorAll('[data-id], [data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null && text.trim() !== '') {
      el.textContent = text;
    }
  });

  // 2. Swap placeholders (input / textarea)
  document.querySelectorAll('[data-placeholder-id], [data-placeholder-en]').forEach(el => {
    const ph = el.getAttribute('data-placeholder-' + lang);
    if (ph !== null && ph.trim() !== '') el.placeholder = ph;
  });

  // 3. Update tombol aktif
  const btnID = document.getElementById('btnID');
  const btnEN = document.getElementById('btnEN');
  if (btnID) btnID.classList.toggle('active', lang === 'id');
  if (btnEN) btnEN.classList.toggle('active', lang === 'en');

  // 4. Update <html lang="...">
  document.documentElement.lang = lang === 'en' ? 'en' : 'id';

  // 5. Simpan preferensi
  localStorage.setItem('lang', lang);
}

// Jalankan SETELAH DOM siap — ini yang memperbaiki "teks kosong saat load"
document.addEventListener('DOMContentLoaded', function () {
  const saved = localStorage.getItem('lang') || 'id';
  // Selalu panggil setLang — termasuk 'id' — agar elemen yang
  // textContent-nya kosong di HTML tetap terisi dari data-id
  setLang(saved);
});
