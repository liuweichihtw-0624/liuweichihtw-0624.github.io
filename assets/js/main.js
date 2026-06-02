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

// ── Floating Sidebar & Share ──────────────────────────────

(function initPostFeatures() {
  const sidebar = document.getElementById('post-float-sidebar');
  if (!sidebar) return;

  // Show sidebar after scrolling 300px
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) sidebar.classList.add('is-visible');
    else sidebar.classList.remove('is-visible');
  }, { passive: true });

  const pageUrl   = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  function openShare(url) {
    window.open(url, '_blank', 'width=600,height=480,noopener,noreferrer');
  }

  var shareX = document.getElementById('share-x');
  if (shareX) shareX.addEventListener('click', function() {
    openShare('https://x.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle);
  });

  var shareLinkedin = document.getElementById('share-linkedin');
  if (shareLinkedin) shareLinkedin.addEventListener('click', function() {
    openShare('https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl);
  });

  var shareFacebook = document.getElementById('share-facebook');
  if (shareFacebook) shareFacebook.addEventListener('click', function() {
    openShare('https://www.facebook.com/sharer/sharer.php?u=' + pageUrl);
  });

  var shareEmail = document.getElementById('share-email');
  if (shareEmail) shareEmail.addEventListener('click', function() {
    window.location.href = 'mailto:?subject=' + pageTitle + '&body=' + pageUrl;
  });

  var shareCopy = document.getElementById('share-copy');
  if (shareCopy) shareCopy.addEventListener('click', function() {
    navigator.clipboard.writeText(window.location.href).then(function() {
      shareCopy.classList.add('copied');
      var orig = shareCopy.getAttribute('title');
      shareCopy.setAttribute('title', '已複製！Copied!');
      setTimeout(function() {
        shareCopy.classList.remove('copied');
        shareCopy.setAttribute('title', orig);
      }, 2000);
    });
  });

  // Sync Cusdis theme when user toggles dark/light mode
  var cusdisEl = document.getElementById('cusdis_thread');
  if (cusdisEl && toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      setTimeout(function() {
        var theme = html.getAttribute('data-theme') || 'light';
        cusdisEl.setAttribute('data-theme', theme);
        if (window.CUSDIS) window.CUSDIS.renderTo(cusdisEl);
      }, 50);
    });
  }
})();
