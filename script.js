document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    const salvarRegistros = () => {
        localStorage.setItem('registros', JSON.stringify(registros));
    };

    const renderTabela = () => {
        tabela.innerHTML = '';
        registros.forEach((registro, index) => {
            const row = tabela.insertRow();
            row.insertCell(0).innerText = registro.modelo;
            row.insertCell(1).innerText = registro.trabalho;
            row.insertCell(2).innerText = registro.valor.toFixed(2);
            const actionsCell = row.insertCell(3);
            actionsCell.classList.add('actions');
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Excluir';
            deleteButton.onclick = () => {
                registros.splice(index, 1);
                salvarRegistros();
                renderTabela();
            };
            actionsCell.appendChild(deleteButton);
        });
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        const modelo = document.getElementById('modelo').value;
        const trabalho = document.getElementById('trabalho').value;
        const valor = parseFloat(document.getElementById('valor').value);

        registros.push({ modelo, trabalho, valor });
        salvarRegistros();
        renderTabela();

        form.reset();
    };

    renderTabela();
});
