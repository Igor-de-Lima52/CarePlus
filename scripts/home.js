function openModal() {
    document.getElementById('routeModal').classList.add('open');
}

function closeModal() {
    document.getElementById('routeModal').classList.remove('open');
}

document.getElementById('routeModal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

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

document.addEventListener('DOMContentLoaded', () => {
    carregarConsultas();
});

function carregarConsultas() {
    const account = getLoggedAccount();

    if (!account) return;

    const tbody = document.getElementById('tabela-consultas');

    tbody.innerHTML = '';

    if (!account.consultas || account.consultas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    Nenhuma consulta encontrada.
                </td>
            </tr>
        `;
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let storageUpdated = false;

    account.consultas.forEach(consulta => {
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
                    alert(`🎉 Parabéns! Sua consulta de ${consulta.paciente} com o ${consulta.medico || 'médico'} foi concluída sem remarcações! Você ganhou +100 pontos! ⭐`);
                } else if (originalStatus === 'Remarcado') {
                    pontosGanhos = 50;
                    alert(`🎉 Sua consulta remarcada de ${consulta.paciente} com o ${consulta.medico || 'médico'} foi concluída! Você ganhou +50 pontos! ⭐`);
                }

                if (pontosGanhos > 0) {
                    account.pontos = (account.pontos || 0) + pontosGanhos;
                    consulta.concluido_pontuado = true;
                }
            }
        }
    });

    if (storageUpdated) {
        updateAccount(account);
        refreshPontos();
    }

    account.consultas.forEach(consulta => {
        let tipoPaciente = 'Titular';
        let pacienteInfo = null;

        if (consulta.paciente === account.name) {
            pacienteInfo = {
                peso: account.peso,
                idade: account.idade,
                sexo: account.sexo
            };
        } else {
            pacienteInfo = account.dependentes?.find(
                dep => dep.nome === consulta.paciente
            );

            if (pacienteInfo) {
                tipoPaciente = 'Dependente';
            }
        }

        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>
                <div class="patient-name">
                    ${consulta.paciente}
                </div>
                <div class="patient-meta">
                    ${tipoPaciente}
                </div>
            </td>

            <td>
                ${pacienteInfo?.peso || '-'}
            </td>

            <td>
                ${pacienteInfo?.idade || '-'}
            </td>

            <td>
                ${pacienteInfo?.sexo || '-'}
            </td>

            <td>
                ${consulta.especialidade}
            </td>

            <td>
                ${consulta.data}
            </td>

            <td>
                ${consulta.status === 'Concluido' ? `
                    <span class="badge badge-concluido" style="background: rgba(39, 174, 96, 0.1); color: #27ae60; font-weight: 700; border-radius: 20px; padding: 4px 10px; font-size: 1.1rem; display: inline-block;">
                        Concluído
                    </span>
                ` : consulta.status === 'Remarcado' ? `
                    <span class="badge badge-remarcado" style="background: rgba(26, 111, 196, 0.1); color: #1a6fc4; font-weight: 700; border-radius: 20px; padding: 4px 10px; font-size: 1.1rem; display: inline-block;">
                        Remarcado
                    </span>
                ` : `
                    <span class="badge badge-agendado">
                        ${consulta.status}
                    </span>
                `}
            </td>
        `;

        tbody.appendChild(linha);
    });
}        