const SERVER_URL = 'http://localhost:8080/consulta/';

const selectElement = document.querySelector('#tipoConsultaInput');
const inputElement = document.querySelector('#valorConsultaInput');
const tableElement = document.querySelector('#table');
const formElement = document.querySelector('#form');

selectElement.addEventListener('change', e => {
    switch (selectElement.value) {
        case 'osPorCPF':
            inputElement.setAttribute('placeholder', 'CPF (SOMENTE NÚMEROS)');
            break;
        case 'osPorID':
            inputElement.setAttribute('placeholder', 'NÚMERO DA OS (SOMENTE NÚMEROS)');
            break;
    }
});

formElement.addEventListener('submit', e => {
    e.preventDefault();

    // Clears whole table.
    for(let i=tableElement.rows.length-1; i > 0; i--) {
        tableElement.deleteRow(i);
    }

    var request = {
        tipo: selectElement.value,
        valor: inputElement.value
    }

    fetch(SERVER_URL, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(responseData => {
        addRow(tableElement, responseData);
    });
});


function addRow(tableElement, values) {
    let nRows = values.length;
    for(let n=0; n<nRows; n++) {
        let row = tableElement.insertRow(-1);

        for(let i=0; i<3; i++) {
            row.insertCell(i).innerHTML = values[n][i];
        }
    }
}