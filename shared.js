(function () {
  const t = localStorage.getItem('kpi_theme') || 'light';
  document.documentElement.setAttribute('data-theme', t);
})();

function toggleDark() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('kpi_theme', next);
  updateDarkBtn();
}

function updateDarkBtn() {
  const btn = document.getElementById('darkBtn');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.innerHTML = isDark ? '<span>☀️</span> Light' : '<span>🌙</span> Dark';
}

function buildNavbar(activePage) {
  const pages = [
    { href: 'dashboard.html',    label: '🏠 Dashboard',   key: 'dashboard'    },
    { href: 'add_employee.html', label: '👤 Add Employee', key: 'add_employee' },
    { href: 'add_kpi.html',      label: '📝 Add KPI',      key: 'add_kpi'      },
    { href: 'view_kpi.html',     label: '📋 View KPI',     key: 'view_kpi'     },
    { href: 'analytics.html',    label: '📊 Analytics',    key: 'analytics'    },
  ];

  const navLinks = pages.map(p => `
    <a href="${p.href}" class="nav-btn nav-btn-ghost ${activePage === p.key ? 'active-page' : ''}">
      ${p.label}
    </a>`).join('');

  return `
    <nav class="navbar kpi-navbar navbar-dark">
      <div class="container-fluid px-3 py-2 d-flex align-items-center gap-2 flex-wrap">
        <a class="navbar-brand me-3" href="dashboard.html">📊 KPI Monitor</a>
        <div class="d-flex align-items-center gap-2 flex-wrap">
          ${navLinks}
          <button class="dark-toggle ms-2" id="darkBtn" onclick="toggleDark()">🌙 Dark</button>
          <a href="login.html" class="nav-btn nav-btn-danger ms-1">🚪 Logout</a>
        </div>
      </div>
    </nav>`;
}

function buildOverlay() {
  return `
    <div id="loadingOverlay">
      <div class="spinner-ring"></div>
      <div class="loading-text">Loading…</div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', buildOverlay());
  const mount = document.getElementById('navbarMount');
  if (mount) {
    const page = mount.getAttribute('data-page') || '';
    mount.outerHTML = buildNavbar(page);
  }
  updateDarkBtn();
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        const content = document.getElementById('pageContent');
        if (content) content.classList.add('visible');
      }, 500);
    }
  }, 600);
});