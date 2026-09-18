const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('ajay-theme');

function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  themeToggle.querySelector('.toggle-knob').style.transform = theme === 'dark' ? 'translateX(26px)' : 'translateX(0)';
}

setTheme(savedTheme || 'light');
themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('ajay-theme', next);
  setTheme(next);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
function closeMenu() {
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}
menuButton.addEventListener('click', () => {
  const opening = !mobileMenu.classList.contains('is-open');
  if (!opening) { closeMenu(); return; }
  menuButton.classList.add('is-open');
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Close menu');
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
