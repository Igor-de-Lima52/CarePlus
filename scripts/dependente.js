document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-adicionar-dep');
  if (!form) return;

  const cpfInput = document.getElementById('cpf');
  cpfInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    this.value = value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  });

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

  const account = getLoggedAccount();
  if (!account) {
    window.location.href = 'index.html';
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const peso = document.getElementById('peso').value.trim();
    const sexo = document.getElementById('sexo').value;
    const idade = document.getElementById('idade').value.trim();

    if (!nome) { alert('Preencha o nome do dependente.'); return; }
    if (!cpf) { alert('Preencha o CPF do dependente.'); return; }
    if (!peso) { alert('Preencha o peso do dependente.'); return; }
    if (!sexo) { alert('Selecione o sexo do dependente.'); return; }
    if (!idade) { alert('Preencha a idade do dependente.'); return; }

    if (!isValidCPF(cpf)) {
      alert('CPF inválido.');
      return;
    }

    const existing = (account.dependentes || []).find(d => d.cpf === cpf);
    if (existing) {
      alert('Este CPF já está cadastrado como dependente.');
      return;
    }

    addDependente({ nome, cpf, peso, sexo, idade });
    alert('Dependente adicionado com sucesso!');
    window.location.href = 'perfil.html';
  });

  document.querySelector('.btn-cancelar').addEventListener('click', function () {
    window.location.href = 'perfil.html';
  });
});
