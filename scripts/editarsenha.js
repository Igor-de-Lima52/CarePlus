document.addEventListener('DOMContentLoaded', function () {
  const account = getLoggedAccount();
  if (!account) {
    window.location.href = 'index.html';
    return;
  }
  
  console.log(account); // Debug: Verificar os dados da conta
  const form = document.getElementById('form-editar-senha');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const senhaAntiga = document.getElementById('senhaAntiga').value;
    const novaSenha = document.getElementById('novaSenha').value;


    // Verifica se a senha antiga está correta
    if (account.password !== senhaAntiga) {
      alert('Senha antiga incorreta.');
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(novaSenha)) {
      alert('A senha deve ter no mínimo 6 caracteres, com letras maiúsculas, minúsculas e números.');
      return;
    }

    // Atualiza a senha
    account.password = novaSenha;

    // Salva novamente no cookie
    updateAccount(account);

    alert('Senha alterada com sucesso!');

    // Limpa os campos
    window.location.href = 'perfil.html';
  });

  document.querySelector('.btn-cancelar').addEventListener('click', function () {
    window.location.href = 'perfil.html';
  });

});