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

function loginSession(email) {
    setCookie('careplus_session', email, 1);
}

function getSession() {
    return getCookie('careplus_session');
}

function clearSession() {
    setCookie('careplus_session', '', -1);
}

function getLoggedAccount() {
    const email = getSession();
    if (!email) return null;
    const accounts = getAccounts();
    const account = accounts.find(a => a.email === email) || null;
    if (account && account.pontos === undefined) {
        account.pontos = 3240;
        setCookie('careplus_accounts', accounts, 30);
    }
    return account;
}

function isValidCPF(cpf) {
    const digits = cpf.replace(/\D/g, '');
    if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
    let reminder = (sum * 10) % 11;
    if (reminder === 10) reminder = 0;
    if (reminder !== parseInt(digits[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
    reminder = (sum * 10) % 11;
    if (reminder === 10) reminder = 0;
    return reminder === parseInt(digits[10]);
}

function sair() {
    clearSession();
    window.location.href = 'index.html';
}

function getTier(pontos) {
    if (pontos >= 5000) return 'Membro Gold';
    if (pontos >= 1000) return 'Membro Prata';
    return 'Membro Bronze';
}
