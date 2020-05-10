const SERVER_URL_CADASTRO_OS = 'http://localhost:8080/cadastro/os';

const form = document.getElementById('form');
const descricaoServicoElement = document.getElementById('descricaoServicoInput');
const submitBtnElement = document.getElementById('submitBtn');
const valorElement = document.getElementById('valorInput');
const dataInicioElement = document.getElementById('dataInicioInput');
const dataEntregaElement = document.getElementById('dataEntregaInput');


descricaoServicoElement.addEventListener('focus', e => {
    // Handles disable status for the form submit button.
    if(nomeElement.value === '' && veiculoElement.value === '') {
        submitBtnElement.disabled = true;
    }else{
        submitBtnElement.disabled = false;
    }
});

form.addEventListener('submit', e => {
    // Handles data submit process.
    e.preventDefault();

    let dataInicio = dataInicioElement.value.slice(dataInicioElement.value.length-4,dataInicioElement.value.length) + '-' + dataInicioElement.value.slice(3,5) + '-' +  dataInicioElement.value.slice(0,2);
    let dataEntrega = dataEntregaElement.value.slice(dataEntregaElement.value.length-4,dataEntregaElement.value.length) + '-' + dataEntregaElement.value.slice(3,5) + '-' +  dataEntregaElement.value.slice(0,2);

    request = {
        idCliente: idCliente,
        idVeiculo: idVeiculo,
        valor: valorElement.value,
        descricao: descricaoServicoElement.value,
        dataInicio: dataInicio,
        dataEntrega: dataEntrega
    };

    fetch(SERVER_URL_CADASTRO_OS, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(responseData => {
        console.log(responseData.status);
    });
});