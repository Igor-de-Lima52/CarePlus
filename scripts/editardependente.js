document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const depId = params.get('id');
  if (!depId) {
    window.location.href = 'perfil.html';
    return;
  }

  const account = getLoggedAccount();
  if (!account) {
    window.location.href = 'index.html';
    return;
  }

  const dep = (account.dependentes || []).find(d => d.id === depId);
  if (!dep) {
    alert('Dependente não encontrado.');
    window.location.href = 'perfil.html';
    return;
  }

  document.getElementById('nome').value = dep.nome || '';
  document.getElementById('cpf').value = dep.cpf || '';
  const rawPeso = dep.peso || '';
  document.getElementById('peso').value = rawPeso.toLowerCase().includes('kg') ? rawPeso : rawPeso + ' kg';

  const rawIdade = (dep.idade || '').replace(/\D/g, '');
  if (rawIdade) {
    const num = parseInt(rawIdade, 10);
    document.getElementById('idade').value = rawIdade + (num === 1 ? ' ano' : ' anos');
  }

  const sexoSelect = document.getElementById('sexo');
  if (dep.sexo) {
    for (let opt of sexoSelect.options) {
      if (opt.value === dep.sexo) {
        opt.selected = true;
        break;
      }
    }
  }

  const pesoInput = document.getElementById('peso');
  pesoInput.addEventListener('input', function () {
    const digits = this.value.replace(/\D/g, '');
    if (digits) {
      this.value = digits + ' kg';
      this.setSelectionRange(digits.length, digits.length);
    } else {
      this.value = '';
    }
  });

  const idadeInput = document.getElementById('idade');
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

  document.getElementById('form-editar-dep').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const peso = document.getElementById('peso').value.trim();
    const sexo = document.getElementById('sexo').value;
    const idade = document.getElementById('idade').value.trim();

    if (!nome) { alert('Preencha o nome do dependente.'); return; }
    if (!peso) { alert('Preencha o peso do dependente.'); return; }
    if (!sexo) { alert('Selecione o sexo do dependente.'); return; }
    if (!idade) { alert('Preencha a idade do dependente.'); return; }

    const account = getLoggedAccount();
    if (!account) return;

    const dependentes = account.dependentes || [];
    const idx = dependentes.findIndex(d => d.id === depId);
    if (idx === -1) {
      alert('Dependente não encontrado.');
      return;
    }

    dependentes[idx] = { ...dependentes[idx], nome, cpf, peso, sexo, idade };
    updateAccount(account);
    alert('Dependente editado com sucesso!');
    window.location.href = 'perfil.html';
  });

  document.querySelector('.btn-cancelar').addEventListener('click', function () {
    window.location.href = 'perfil.html';
  });
});
