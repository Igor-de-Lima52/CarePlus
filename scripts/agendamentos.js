

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

function parseDateString(dateStr) {
    if (!dateStr) return new Date();
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // 0-indexed month
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
    return new Date();
}

let pacientes = [];

document.addEventListener('DOMContentLoaded', function () {
    const account = getLoggedAccount();

    if (account) {
        pacientes.push({
            id: account.email,
            nome: account.name
        });

        if (account.dependentes && account.dependentes.length > 0) {
            const dependentesFormatados = account.dependentes.map(dep => ({
            id: dep.id,
            nome: dep.nome
            }));

            pacientes.push(...dependentesFormatados);
        }
    }

    carregarConsultas();
});

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

function selecionarEspecialidade(espec) {
    selecao.especialidade = espec.id;
    document.getElementById('especialidade-input').value = espec.nome;
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
}

configurarBuscaDropdown('especialidade-input', 'especialidade-lista', especialidades, (espec) => {
    selecionarEspecialidade(espec);
});

configurarBuscaDropdown('paciente-input', 'paciente-lista', pacientes);

function resetarCampos(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}



function abrirModalMarcarConsulta(isRemarcar = false) {
    if (!isRemarcar) {
        linhaAtual = null; // Clear if it's a new booking!
    }
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
        const paciente = document.getElementById('nomePaciente').textContent;
        if (confirm(`Tem certeza que deseja cancelar a consulta de ${paciente}?`)) {
            // Remove from storage
            const account = getLoggedAccount();
            if (account && account.consultas) {
                const especialidade = linhaAtual.querySelector('td[data-label="Especialidade"]').textContent.trim();
                const medico = linhaAtual.querySelector('td[data-label="Médico"]').textContent.trim();
                const data = linhaAtual.querySelector('td[data-label="Data"]').textContent.trim();
                
                account.consultas = account.consultas.filter(c => 
                    !(c.paciente === paciente && c.especialidade === especialidade && c.medico === medico && c.data === data)
                );
                updateAccount(account);
            }
            
            linhaAtual.remove();
            fecharModalOpcoes();
        }
    } else if (acao === 'remarcar') {
        const pacienteNome = linhaAtual.querySelector('td[data-label="Paciente"]').textContent.trim();
        const especialidadeNome = linhaAtual.querySelector('td[data-label="Especialidade"]').textContent.trim();
        
        const tempLinha = linhaAtual;
        fecharModalOpcoes();
        linhaAtual = tempLinha; // Restore reference cleared by fecharModalOpcoes
        
        abrirModalMarcarConsulta(true); // Call with true to keep linhaAtual!
        
        // Fill paciente
        document.getElementById('paciente-input').value = pacienteNome;
        
        // Find specialty and configure next sub-dropdowns
        const especObj = especialidades.find(e => e.nome.toLowerCase() === especialidadeNome.toLowerCase());
        if (especObj) {
            selecionarEspecialidade(especObj);
        }
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

    const account = getLoggedAccount();
    if (!account.consultas) {
        account.consultas = [];
    }

    if (linhaAtual) {
        // RESCHEDULING (EDITING EXISTING RECORD)
        const idParaEditar = Number(linhaAtual.dataset.id);
        const index = account.consultas.findIndex(c => c.id === idParaEditar);
        
        if (index !== -1) {
            account.consultas[index].paciente = paciente;
            account.consultas[index].especialidade = especialidade;
            account.consultas[index].medico = medico;
            account.consultas[index].data = data;
            account.consultas[index].status = 'Remarcado'; // Set status to Remarcado
        } else {
            // Fallback match by values
            const pacienteOriginal = linhaAtual.querySelector('td[data-label="Paciente"]').textContent.trim();
            const especOriginal = linhaAtual.querySelector('td[data-label="Especialidade"]').textContent.trim();
            const medicoOriginal = linhaAtual.querySelector('td[data-label="Médico"]').textContent.trim();
            const dataOriginalVal = linhaAtual.querySelector('td[data-label="Data"]').textContent.trim();
            
            const fallbackIndex = account.consultas.findIndex(c => 
                c.paciente === pacienteOriginal &&
                c.especialidade === especOriginal &&
                c.medico === medicoOriginal &&
                c.data === dataOriginalVal
            );
            
            if (fallbackIndex !== -1) {
                account.consultas[fallbackIndex].paciente = paciente;
                account.consultas[fallbackIndex].especialidade = especialidade;
                account.consultas[fallbackIndex].medico = medico;
                account.consultas[fallbackIndex].data = data;
                account.consultas[fallbackIndex].status = 'Remarcado';
            }
        }

        updateAccount(account);
        alert(`✅ Consulta remarcada com sucesso! O status foi alterado para 'Remarcado' e você ganhará 50 pontos ao concluí-la! ⭐`);
    } else {
        // NEW APPOINTMENT (CREATING NEW RECORD - 0 points initially!)
        const novaConsulta = {
            id: Date.now(),
            paciente,
            especialidade,
            medico,
            data,
            status: 'Marcado'
        };

        account.consultas.push(novaConsulta);
        updateAccount(account);

        alert(`✅ Consulta agendada com sucesso! Você pontuará 100 pontos ao concluí-la sem remarcações! ⭐`);
    }

    // Reload list and close modal
    carregarConsultas();
    fecharModalMarcarConsulta();
    resetarCampos(['paciente-input', 'especialidade-input', 'clinica-input', 'data-input', 'medico-input']);
    linhaAtual = null; // Clear state
}

function carregarConsultas() {
    const account = getLoggedAccount();
    if (!account || !account.consultas) return;

    const tbody = document.querySelector(".tabela-linha");
    tbody.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let storageUpdated = false;

    account.consultas.forEach(consulta => {
        // Parse date to check past status
        const consultaDate = parseDateString(consulta.data);
        consultaDate.setHours(0, 0, 0, 0);

        if (consultaDate < today && (consulta.status === 'Marcado' || consulta.status === 'Remarcado')) {
            const originalStatus = consulta.status;
            consulta.status = 'Concluido';
            storageUpdated = true;

            // Award points based on whether it was rescheduled or not
            if (consulta.concluido_pontuado !== true) {
                let pontosGanhos = 0;
                if (originalStatus === 'Marcado') {
                    pontosGanhos = 100;
                    alert(`🎉 Parabéns! Sua consulta de ${consulta.paciente} com o ${consulta.medico} foi concluída sem remarcações! Você ganhou +100 pontos! ⭐`);
                } else if (originalStatus === 'Remarcado') {
                    pontosGanhos = 50;
                    alert(`🎉 Sua consulta remarcada de ${consulta.paciente} com o ${consulta.medico} foi concluída! Você ganhou +50 pontos! ⭐`);
                }

                if (pontosGanhos > 0) {
                    account.pontos = (account.pontos || 0) + pontosGanhos;
                    consulta.concluido_pontuado = true;
                }
            }
        }

        const novaLinha = document.createElement("tr");
        novaLinha.dataset.id = consulta.id; // Store ID on row!

        novaLinha.innerHTML = `
            <td data-label="Paciente">
                ${consulta.paciente}
            </td>

            <td data-label="Especialidade">
                ${consulta.especialidade}
            </td>

            <td data-label="Médico">
                ${consulta.medico}
            </td>

            <td data-label="Data">
                ${consulta.data}
            </td>

            <td data-label="Status">
                ${consulta.status === 'Concluido' ? `
                    <span class="status-concluido" style="background: rgba(39, 174, 96, 0.1); color: #27ae60; padding: 6px 12px; border-radius: 20px; font-weight: 700; font-size: 1.2rem; display: inline-block;">
                        Concluído
                    </span>
                ` : consulta.status === 'Remarcado' ? `
                    <span class="status-remarcado" style="background: rgba(26, 111, 196, 0.1); color: #1a6fc4; padding: 6px 12px; border-radius: 20px; font-weight: 700; font-size: 1.2rem; display: inline-block;">
                        Remarcado
                    </span>
                ` : `
                    <span class="status-marcado">
                        ${consulta.status}
                    </span>
                `}
            </td>

            <td data-label="Ações">
                ${consulta.status === 'Concluido' ? `
                    <span style="color: #27ae60; font-weight: 700; font-size: 1.2rem; padding: 5px; display: inline-block;">✓ Concluída</span>
                ` : `
                    <button 
                        class="btn cancelar" 
                        onclick="abrirModalOpcoes('${consulta.paciente}', this)"
                    >
                        <span class="cat-icone">✕</span>
                    </button>
                `}
            </td>
        `;

        tbody.appendChild(novaLinha);
    });

    if (storageUpdated) {
        updateAccount(account);
        refreshPontos();
    }
}