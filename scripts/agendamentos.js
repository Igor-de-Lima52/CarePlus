

const especialidades = [
  { id: 1, nome: "Cardiologia" },
  { id: 2, nome: "Dermatologia" },
  { id: 3, nome: "Ortopedia" },
  { id: 4, nome: "Pediatria" },
  { id: 5, nome: "Neurologia" },
  { id: 6, nome: "Ginecologia" },
  { id: 7, nome: "Oftalmologia" },
  { id: 8, nome: "Psiquiatria" }
];

const clinicas = [
  { id: 101, nome: "Clínica Vida - Unidade Centro" },
  { id: 102, nome: "Hospital Saúde - Unidade Sul" },
  { id: 103, nome: "Centro Médico Norte" },
  { id: 104, nome: "Clínica Bem Estar" },
  { id: 105, nome: "Hospital Esperança" }
];

const medicos = [
  { id: 1, nome: "Dr. João Silva", especialidadeId: 1 },
  { id: 2, nome: "Dra. Maria Oliveira", especialidadeId: 2 },
  { id: 3, nome: "Dr. Carlos Souza", especialidadeId: 3 },
  { id: 4, nome: "Dra. Fernanda Lima", especialidadeId: 2 },
  { id: 5, nome: "Dr. Ricardo Mendes", especialidadeId: 4 },
  { id: 6, nome: "Dra. Juliana Costa", especialidadeId: 5 },
  { id: 7, nome: "Dr. Eduardo Martins", especialidadeId: 6 },
  { id: 8, nome: "Dra. Camila Rocha", especialidadeId: 7 },
  { id: 9, nome: "Dr. Felipe Santos", especialidadeId: 8 },
  { id: 10, nome: "Dra. Vanessa Almeida", especialidadeId: 1 },
  { id: 11, nome: "Dr. Rafael Gomes", especialidadeId: 3 },
  { id: 12, nome: "Dra. Paula Ferreira", especialidadeId: 6 },
  { id: 13, nome: "Dr. Bruno Castro", especialidadeId: 5 },
  { id: 14, nome: "Dra. Larissa Nunes", especialidadeId: 4 },
  { id: 15, nome: "Dr. Marcelo Lima", especialidadeId: 7 }
];

const diasDisponiveis = [
  { id: 501, data: "15/05/2026", medicoId: 1, clinicaId: 101 },
  { id: 502, data: "15/05/2026", medicoId: 2, clinicaId: 102 },
  { id: 503, data: "15/05/2026", medicoId: 3, clinicaId: 103 },
  { id: 504, data: "16/05/2026", medicoId: 4, clinicaId: 101 },
  { id: 505, data: "16/05/2026", medicoId: 5, clinicaId: 104 },
  { id: 506, data: "16/05/2026", medicoId: 6, clinicaId: 105 },
  { id: 507, data: "17/05/2026", medicoId: 7, clinicaId: 101 },
  { id: 508, data: "17/05/2026", medicoId: 8, clinicaId: 102 },
  { id: 509, data: "17/05/2026", medicoId: 9, clinicaId: 103 },
  { id: 510, data: "18/05/2026", medicoId: 10, clinicaId: 104 },
  { id: 511, data: "18/05/2026", medicoId: 11, clinicaId: 105 },
  { id: 512, data: "18/05/2026", medicoId: 12, clinicaId: 101 },
  { id: 513, data: "19/05/2026", medicoId: 13, clinicaId: 102 },
  { id: 514, data: "19/05/2026", medicoId: 14, clinicaId: 103 },
  { id: 515, data: "19/05/2026", medicoId: 15, clinicaId: 104 },
  { id: 516, data: "20/05/2026", medicoId: 1, clinicaId: 105 },
  { id: 517, data: "20/05/2026", medicoId: 2, clinicaId: 101 },
  { id: 518, data: "20/05/2026", medicoId: 3, clinicaId: 102 },
  { id: 519, data: "21/05/2026", medicoId: 4, clinicaId: 103 },
  { id: 520, data: "21/05/2026", medicoId: 5, clinicaId: 104 },
  { id: 521, data: "21/05/2026", medicoId: 6, clinicaId: 105 },
  { id: 522, data: "22/05/2026", medicoId: 7, clinicaId: 101 },
  { id: 523, data: "22/05/2026", medicoId: 8, clinicaId: 102 },
  { id: 524, data: "22/05/2026", medicoId: 9, clinicaId: 103 },
  { id: 525, data: "23/05/2026", medicoId: 10, clinicaId: 104 },
  { id: 526, data: "23/05/2026", medicoId: 11, clinicaId: 105 },
  { id: 527, data: "23/05/2026", medicoId: 12, clinicaId: 101 },
  { id: 528, data: "24/05/2026", medicoId: 13, clinicaId: 102 },
  { id: 529, data: "24/05/2026", medicoId: 14, clinicaId: 103 },
  { id: 530, data: "24/05/2026", medicoId: 15, clinicaId: 104 }
];

const pacientes = [
  { id: 1, nome: "Ana Beatriz" },
  { id: 2, nome: "Lucas Ferreira" },
  { id: 3, nome: "Mariana Alves" },
  { id: 4, nome: "Pedro Henrique" },
  { id: 5, nome: "Juliana Martins" },
  { id: 6, nome: "Carlos Eduardo" },
  { id: 7, nome: "Fernanda Souza" },
  { id: 8, nome: "Ricardo Lima" },
  { id: 9, nome: "Patrícia Gomes" },
  { id: 10, nome: "Gabriel Costa" },
  { id: 11, nome: "Amanda Rocha" },
  { id: 12, nome: "Thiago Almeida" },
  { id: 13, nome: "Vanessa Santos" },
  { id: 14, nome: "Bruno Oliveira" },
  { id: 15, nome: "Larissa Mendes" }
];

function configurarBuscaDropdown(idInput, idLista, dadosParaFiltrar, acaoAposClique) {
    const campo = document.getElementById(idInput);
    const lista = document.getElementById(idLista);

    const renderizar = (termo = "") => {
        lista.innerHTML = "";
        const filtrados = dadosParaFiltrar.filter(item => 
            (item.nome || item.data).toLowerCase().includes(termo.toLowerCase())
        );

        if (filtrados.length > 0) {
            filtrados.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.nome || item.data;
                li.addEventListener("click", () => {
                    campo.value = item.nome || item.data;
                    lista.classList.add("oculta");
                    if (acaoAposClique) acaoAposClique(item);
                });
                lista.appendChild(li);
            });
            lista.classList.remove("oculta");
        } else {
            lista.classList.add("oculta");
        }
    };

    campo.addEventListener("focus", () => renderizar(campo.value));
    campo.addEventListener("input", () => renderizar(campo.value));

    document.addEventListener("click", (e) => {
        if (!campo.contains(e.target) && !lista.contains(e.target)) {
            lista.classList.add("oculta");
        }
    });
}


let selecao = { especialidade: null, clinica: null, data: null };

configurarBuscaDropdown('especialidade-input', 'especialidade-lista', especialidades, (espec) => {
    selecao.especialidade = espec.id;
    resetarCampos(['clinica-input', 'data-input', 'medico-input']);

    const medicosEspec = medicos.filter(m => m.especialidadeId === espec.id).map(m => m.id);
    const idsClinicas = [...new Set(diasDisponiveis
        .filter(d => medicosEspec.includes(d.medicoId))
        .map(d => d.clinicaId))];
    
    const clinicasFiltradas = clinicas.filter(c => idsClinicas.includes(c.id));
    
    configurarBuscaDropdown('clinica-input', 'clinica-lista', clinicasFiltradas, (clinica) => {
        selecao.clinica = clinica.id;
        resetarCampos(['data-input', 'medico-input']);

        const datasFiltradas = diasDisponiveis
            .filter(d => d.clinicaId === clinica.id && medicosEspec.includes(d.medicoId))
            .map(d => ({ data: d.data }));

        configurarBuscaDropdown('data-input', 'data-lista', datasFiltradas, (dataObj) => {
            selecao.data = dataObj.data;
            resetarCampos(['medico-input']);

            const idsMedicosFinal = diasDisponiveis
                .filter(d => d.data === selecao.data && d.clinicaId === selecao.clinica && medicosEspec.includes(d.medicoId))
                .map(d => d.medicoId);

            const listaMedicosFinal = medicos.filter(m => idsMedicosFinal.includes(m.id));
            configurarBuscaDropdown('medico-input', 'medico-lista', listaMedicosFinal);
        });
    });
});

configurarBuscaDropdown('paciente-input', 'paciente-lista', pacientes);

function resetarCampos(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}



function abrirModalMarcarConsulta() {
    document.getElementById('modalMarcarConsulta').style.display = 'flex';
}

function fecharModalMarcarConsulta() {
    document.getElementById('modalMarcarConsulta').style.display = 'none';
}

let linhaAtual = null;

function abrirModalOpcoes(nome, btn) {
    linhaAtual = btn.closest('tr');
    document.getElementById('nomePaciente').textContent = nome;
    document.getElementById('modalOpcoes').style.display = 'flex';
}

function fecharModalOpcoes() {
    document.getElementById('modalOpcoes').style.display = 'none';
    linhaAtual = null;
}

function confirmarAcao(acao) {
    if (acao === 'cancelar') {
        if (confirm(`Tem certeza que deseja cancelar a consulta de ${document.getElementById('nomePaciente').textContent}?`)) {
            linhaAtual.remove();
            fecharModalOpcoes();
        }
    } else if (acao === 'remarcar') {
        fecharModalOpcoes();
        abrirModalMarcarConsulta();
    }
}

function salvarAgendamento() {
    const paciente = document.getElementById('paciente-input').value;
    const especialidade = document.getElementById('especialidade-input').value;
    const medico = document.getElementById('medico-input').value;
    const data = document.getElementById('data-input').value;

    if (!paciente || !especialidade || !medico || !data) {
        alert("⚠️ Preencha todos os campos antes de confirmar.");
        return;
    }

    const tbody = document.querySelector(".tabela-linha");
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td data-label="Paciente">${paciente}</td>
        <td data-label="Especialidade">${especialidade}</td>
        <td data-label="Médico">${medico}</td>
        <td data-label="Data">${data}</td>
        <td data-label="Status"><span class="status-marcado">Marcado</span></td>
        <td data-label="Ações">
            <button class="btn cancelar" onclick="abrirModalOpcoes('${paciente}', this)">
                <span class="cat-icone">✕</span>
            </button>
        </td>
    `;

    tbody.appendChild(novaLinha);
    
    fecharModalMarcarConsulta();
    resetarCampos(['paciente-input', 'especialidade-input', 'clinica-input', 'data-input', 'medico-input']);
}