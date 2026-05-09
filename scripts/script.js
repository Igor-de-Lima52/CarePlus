function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? JSON.parse(decodeURIComponent(match[2])) : null;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value)) + ';expires=' + date.toUTCString() + ';path=/';
}

function getAccounts() {
    return getCookie('careplus_accounts') || [];
}

function saveAccount(account) {
    const accounts = getAccounts();
    accounts.push(account);
    setCookie('careplus_accounts', accounts, 30);
}

function findAccount(identifier) {
    const accounts = getAccounts();
    const cleanId = identifier.replace(/\D/g, '');
    return accounts.find(a => a.cpf.replace(/\D/g, '') === cleanId || a.email === identifier);
}

function isValidCPF(cpf) {
    const digits = cpf.replace(/\D/g, '');
    if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
    let remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(digits[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    return remainder === parseInt(digits[10]);
}

const signupForm = document.getElementById('signupForm');
if (signupForm) signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    if (!name || !cpf || !email || !password || !passwordConfirm) {
        alert('Preencha todos os campos.');
        return;
    }

    if (!isValidCPF(cpf)) {
        alert('CPF inválido.');
        return;
    }

    const accounts = getAccounts();
    const cleanCpf = cpf.replace(/\D/g, '');
    if (accounts.some(a => a.cpf.replace(/\D/g, '') === cleanCpf)) {
        alert('Este CPF já está cadastrado.');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Email inválido.');
        return;
    }

    if (accounts.some(a => a.email === email)) {
        alert('Este email já está cadastrado.');
        return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
        alert('A senha deve ter no mínimo 6 caracteres, com letras maiúsculas, minúsculas e números.');
        return;
    }

    if (password !== passwordConfirm) {
        alert('As senhas não conferem.');
        return;
    }

    saveAccount({ name, cpf: cleanCpf, email, password });
    alert('Conta criada com sucesso!');
    window.location.href = './index.html';
});

const loginForm = document.getElementById('loginForm');
if (loginForm) loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const cpfEmail = document.getElementById('cpf-email').value.trim();
    const password = document.getElementById('password').value;

    if (!cpfEmail || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const account = findAccount(cpfEmail);
    if (!account || account.password !== password) {
        alert('CPF/Email ou senha incorretos.');
        return;
    }

    alert('Login realizado com sucesso!');
});

const forgotPwd = document.querySelector('.forgot-password');
if (forgotPwd) forgotPwd.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Funcionalidade de recuperação de senha em desenvolvimento.');
});
