/* ============================================================
   Michael Wei-Chih Liu — Main JavaScript
   ============================================================ */

// ── Dark / Light Mode ─────────────────────────────────────

const THEME_KEY = 'mwcl-theme';
const html      = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function initTheme() {
  const saved       = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme       = saved || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', theme);
  updateIcon(theme);
}

function toggleTheme() {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateIcon(next);
}

function updateIcon(theme) {
  if (!toggleBtn) return;
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
initTheme();

// ── Mobile Navigation ─────────────────────────────────────

const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Active Nav Link ───────────────────────────────────────

(function setActiveNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    const isHome = href === '' || href === '/';
    if (isHome && path === '') link.classList.add('active');
    else if (!isHome && path.startsWith(href)) link.classList.add('active');
  });
})();
