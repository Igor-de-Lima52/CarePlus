// abrir modal

const modalOpcoes = document.getElementById('modalOpcoes');
const modalMarcarConsulta = document.getElementById('modalMarcarConsulta');
const spanNome = document.getElementById('nomePaciente');

function abrirModalOpcoes(nome) {
    if (spanNome) {
        spanNome.innerText = nome;
    }
    if (modalOpcoes) {
        modalOpcoes.style.display = 'flex';
    }
}

function fecharModal() {
    if (modalOpcoes) {
        modalOpcoes.style.display = 'none';
    }
}

function confirmarAcao(acao) {
    if (acao === 'remarcar') {
        alert('Certo! Vamos procurar um novo horário para você.');
    } else if (acao === 'cancelar') {
        alert('Sua consulta foi cancelada.');
    }
    fecharModal();
}

window.addEventListener('click', (event) => {
    if (event.target === modalOpcoes) {
        fecharModal();
    }
});

//abrir modal marcar consulta

function abrirModalMarcarConsulta(nome) {
    if (spanNome) {
        spanNome.innerText = nome;
    }
    if (modalMarcarConsulta) {
        modal.style.display = 'flex';
    }
}

function fecharModal() {
    if (modalMarcarConsulta) {
        modal.style.display = 'none';
    }
}