function formatarPeso(peso) {
  const p = String(peso).trim();
  if (!p) return '';
  return p.toLowerCase().includes('kg') ? p : p + ' kg';
}

function formatarIdade(idade) {
  const rawIdade = String(idade).replace(/\D/g, '');
  if (!rawIdade) return '';
  const num = parseInt(rawIdade, 10);
  return rawIdade + (num === 1 ? ' ano' : ' anos');
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

  // Load user profile details
  const formMeusDados = document.getElementById('form-meus-dados');
  if (formMeusDados) {
    document.getElementById('perfil-nome').value = account.name || '';
    document.getElementById('perfil-email').value = account.email || '';
    document.getElementById('perfil-cpf').value = account.cpf || '';
    document.getElementById('perfil-peso').value = formatarPeso(account.peso || '');
    document.getElementById('perfil-sexo').value = account.sexo || '';
    document.getElementById('perfil-idade').value = formatarIdade(account.idade || '');

    // Dynamic formatting on typing matching adicionardependente
    const pesoInput = document.getElementById('perfil-peso');
    pesoInput.addEventListener('input', function () {
      const digits = this.value.replace(/\D/g, '');
      if (digits) {
        this.value = digits + ' kg';
        this.setSelectionRange(digits.length, digits.length);
      } else {
        this.value = '';
      }
    });

    const idadeInput = document.getElementById('perfil-idade');
    idadeInput.addEventListener('input', function () {
      let value = this.value.replace(/\D/g, '');
      if (value !== '') {
        const num = parseInt(value, 10);
        if (num > 150) value = '150';
        const suffix = num === 1 ? ' ano' : ' anos';
        this.value = value + suffix;
        this.setSelectionRange(value.length, value.length);
      } else {
        this.value = '';
      }
    });

    formMeusDados.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const nome = document.getElementById('perfil-nome').value.trim();
      const peso = document.getElementById('perfil-peso').value.trim();
      const sexo = document.getElementById('perfil-sexo').value;
      const idade = document.getElementById('perfil-idade').value.trim();

      if (!nome || !peso || !sexo || !idade) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      account.name = nome;
      account.peso = peso;
      account.sexo = sexo;
      account.idade = idade;

      updateAccount(account);
      alert('Dados salvos com sucesso!');
      
      // Update topbar and sidebar info dynamically
      const nameEl = document.getElementById('user-name');
      const topbarName = document.getElementById('topbar-name');
      if (nameEl) nameEl.textContent = account.name;
      if (topbarName) topbarName.textContent = account.name;
    });
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
          <button class="btn-editar-dep" onclick="window.location.href='editardependente.html?id=${dep.id}'" title="Editar dependente">✎</button>
          <button class="btn-deletar-dep" onclick="deletarDependente('${dep.id}')" title="Deletar dependente">✕</button>
        </div>
      </td>
    </tr>
  `).join('');
});
