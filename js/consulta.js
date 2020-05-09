const selectElement = document.querySelector('#tipoConsultaInput');
const inputElement = document.querySelector('#valorConsultaInput');
const tableElement = document.querySelector('#table');
const formElement = document.querySelector('#form');

selectElement.addEventListener('change', e => {
    switch (selectElement.value) {
        case 'cpf':
            inputElement.setAttribute('placeholder', 'somente números');
            break;
        case 'os':
            inputElement.setAttribute('placeholder', '');
            break;
        case 'placa':
            inputElement.setAttribute('placeholder', 'sem hífen');
            break;
        case 'nome':
            inputElement.setAttribute('placeholder', '');
            break;
    }
});

formElement.addEventListener('submit', e => {
    e.preventDefault();

    console.log(tableElement.style.display);
    console.log('Triggered.');

    var tipoConsulta = selectElement.value;
    var valorConsulta = inputElement.value;

    
    addRow(tableElement, values);
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