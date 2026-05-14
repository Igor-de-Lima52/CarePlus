const SIDEBAR_ITEMS = [
  { label: 'Perfil', icon: '👤', route: 'editardependente.html' },
  { label: 'Home', icon: '🏠', route: 'home.html' },
  { label: 'Agendamentos', icon: '📅', route: 'agendamentos.html' },
  { label: 'Prêmios', icon: '🏪', route: 'loja.html' },
  { label: 'Ranking', icon: '🏆', route: 'ranking.html' },
];

function getCurrentRoute() {
  const path = window.location.pathname;
  return path.substring(path.lastIndexOf('/') + 1) || 'home.html';
}

function renderSidebar() {
  const container = document.getElementById('sidebar-container');
  if (!container) return;

  const account = getLoggedAccount();
  if (!account) {
    window.location.href = 'index.html';
    return;
  }

  const currentRoute = getCurrentRoute();

  const menuHtml = SIDEBAR_ITEMS.map(item => {
    const isActive = item.route === currentRoute;
    return `<div class="menu-item${isActive ? ' ativo' : ''}" data-route="${item.route}">
        <span class="menu-icone">${item.icon}</span>
        <span>${item.label}</span>
      </div>`;
  }).join('');

  container.innerHTML = `
    <aside class="sidebar">
      <div class="logo">
        <img src="assets/Logo CarePlus Azul.svg" alt="CarePlus" />
      </div>
      <div class="perfil-box">
        <div class="perfil-avatar">👤</div>
        <div class="perfil-info">
          <strong id="user-name">Carregando...</strong>
          <span id="user-tier">Carregando...</span>
        </div>
      </div>
      <div class="pontos-box">
        <span class="pontos-label">⭐ Seus pontos</span>
        <span class="pontos-valor" id="user-points">0 pts</span>
      </div>
      <div class="separador"></div>
      <nav>${menuHtml}</nav>
      <p class="sidebar-rodape">&ldquo;Agende, acompanhe e cuide:<br>simples assim.&rdquo;</p>
    </aside>
  `;

  const nameEl = document.getElementById('user-name');
  const tierEl = document.getElementById('user-tier');
  const pointsEl = document.getElementById('user-points');
  if (nameEl) nameEl.textContent = account.name;
  if (pointsEl) pointsEl.textContent = account.pontos.toLocaleString('pt-BR') + ' pts';
  if (tierEl) tierEl.textContent = getTier(account.pontos);

  const topbarName = document.getElementById('topbar-name');
  const topbarPlan = document.getElementById('topbar-plan');
  const topbarPoints = document.getElementById('topbar-points');
  if (topbarName) topbarName.textContent = account.name;
  if (topbarPlan) topbarPlan.textContent = getTier(account.pontos);
  if (topbarPoints) topbarPoints.textContent = '⭐ ' + account.pontos.toLocaleString('pt-BR') + ' pts';

  container.querySelectorAll('.menu-item').forEach(el => {
    el.addEventListener('click', () => {
      const route = el.dataset.route;
      if (route && route !== currentRoute) {
        window.location.href = route;
      }
    });
  });
}

function refreshPontos() {
  const account = getLoggedAccount();
  if (!account) return;
  const pts = account.pontos.toLocaleString('pt-BR');
  const pointsEl = document.getElementById('user-points');
  const topbarPoints = document.getElementById('topbar-points');
  if (pointsEl) pointsEl.textContent = pts + ' pts';
  if (topbarPoints) topbarPoints.textContent = '⭐ ' + pts + ' pts';
}

document.addEventListener('DOMContentLoaded', renderSidebar);
