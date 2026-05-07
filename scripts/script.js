document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cpfEmail = document.getElementById('cpf-email').value;
    const password = document.getElementById('password').value;
    
    if (cpfEmail && password) {
        alert('Login realizado com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Funcionalidade de recuperação de senha em desenvolvimento.');
});

document.querySelector('.signup-link').addEventListener('click', function() {
    alert('Funcionalidade de cadastro em desenvolvimento.');
});
