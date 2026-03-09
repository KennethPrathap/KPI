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
  const role = localStorage.getItem('kpi_role') || sessionStorage.getItem('kpi_role') || 'admin';

  // Employee navbar - minimal, no admin links
  if (role === 'employee') {
    const empName = localStorage.getItem('kpi_emp_name') || sessionStorage.getItem('kpi_emp_name') || 'Employee';
    return `
      <nav class="navbar kpi-navbar navbar-dark" style="overflow-x:auto;">
        <div class="px-3 d-flex align-items-center gap-1" style="min-height:52px;width:100%;flex-wrap:nowrap;">
          <div class="d-flex align-items-center gap-1" style="flex-wrap:nowrap;flex:1;">
            <span style="color:#a78bfa;font-weight:700;font-size:0.85rem;padding:5px 12px;">👤 ${empName}</span>
            <a href="emp_portal.html" class="nav-btn nav-btn-ghost ${activePage === 'emp_portal' ? 'active-page' : ''}">🏠 My Portal</a>
          </div>
          <div class="d-flex align-items-center gap-1" style="flex-shrink:0;margin-left:8px;">
            <button class="dark-toggle" id="darkBtn" onclick="toggleDark()">🌙 Dark</button>
            <a href="login.html" class="nav-btn nav-btn-danger" onclick="localStorage.removeItem('kpi_emp_id');localStorage.removeItem('kpi_emp_name');localStorage.removeItem('kpi_role');">🚪 Logout</a>
          </div>
        </div>
      </nav>`;
  }

  // Admin navbar - full links
  const pages = [
    { href: 'dashboard.html',      label: '🏠 Dashboard',  key: 'dashboard'      },
    { href: 'add_employee.html',   label: '👤 Employee',   key: 'add_employee'   },
    { href: 'add_kpi.html',        label: '📝 Add KPI',    key: 'add_kpi'        },
    { href: 'view_kpi.html',       label: '📋 View KPI',   key: 'view_kpi'       },
    { href: 'analytics.html',      label: '📊 Analytics',  key: 'analytics'      },
    { href: 'attendance.html',     label: '📅 Attendance', key: 'attendance'     },
    { href: 'monthly_report.html', label: '🗓 Report',     key: 'monthly_report' },
  ];

  const navLinks = pages.map(p => `<a href="${p.href}" class="nav-btn nav-btn-ghost ${activePage === p.key ? 'active-page' : ''}">${p.label}</a>`).join('');

  return `
    <nav class="navbar kpi-navbar navbar-dark" style="overflow-x:auto;">
      <div class="px-3 d-flex align-items-center gap-1" style="min-height:52px;width:100%;flex-wrap:nowrap;">
        <div class="d-flex align-items-center gap-1" style="flex-wrap:nowrap;overflow-x:auto;flex:1;scrollbar-width:none;">
          ${navLinks}
        </div>
        <div class="d-flex align-items-center gap-1" style="flex-shrink:0;margin-left:8px;">
          <button class="dark-toggle" id="darkBtn" onclick="toggleDark()">🌙 Dark</button>
          <a href="login.html" class="nav-btn nav-btn-danger">🚪 Logout</a>
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