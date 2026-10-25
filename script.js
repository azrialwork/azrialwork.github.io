// Tahun dinamis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menu navigasi untuk layar kecil
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', () => links.classList.remove('open'));
}
