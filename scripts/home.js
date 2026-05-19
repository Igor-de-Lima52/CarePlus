function openModal() {
    document.getElementById('routeModal').classList.add('open');
}

function closeModal() {
    document.getElementById('routeModal').classList.remove('open');
}

document.getElementById('routeModal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

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
                <span class="badge badge-agendado">
                    ${consulta.status}
                </span>
            </td>
        `;

        tbody.appendChild(linha);
    });
}        