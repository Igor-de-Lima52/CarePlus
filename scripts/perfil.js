function formatarPeso(peso) {
  const p = String(peso).trim();
  return p.toLowerCase().includes('kg') ? p : p + ' kg';
}

function deletarDependente(id) {
  if (!confirm('Tem certeza que deseja deletar este dependente?')) return;
  const account = getLoggedAccount();
  if (!account) return;
  account.dependentes = (account.dependentes || []).filter(d => d.id !== id);
  updateAccount(account);
  location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
  const account = getLoggedAccount();
  if (!account) {
    window.location.href = 'index.html';
    return;
  }

  const tbody = document.querySelector('.tabela-dependentes tbody');
  if (!tbody) return;

  const dependentes = account.dependentes || [];

  if (dependentes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:#999;">Nenhum dependente cadastrado.</td></tr>';
    return;
  }

  tbody.innerHTML = dependentes.map(dep => `
    <tr>
      <td>${dep.nome}</td>
      <td>${formatarPeso(dep.peso)}</td>
      <td>${dep.sexo}</td>
      <td>${dep.cpf}</td>
      <td>${dep.idade}</td>
      <td>
        <div class="col-acoes">
          <button class="btn-editar-dep" onclick="window.location.href='editardependente.html?id=${dep.id}'" title="Editar dependente">✏️</button>
          <button class="btn-deletar-dep" onclick="deletarDependente('${dep.id}')" title="Deletar dependente">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
});
