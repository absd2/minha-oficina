const SERVER_URL = 'http://localhost:8080/consulta/';

const cpfElement = document.getElementById('cpfInput');
const nomeElement = document.getElementById('nomeInput')
const clienteNotFoundElement = document.getElementById('cpf-not-found-alert');

var idCliente, idVeiculo;

const placaElement = document.getElementById('placaInput');
const veiculoElement = document.getElementById('veiculoInput');
const placaNotFoundElement = document.getElementById('placa-not-found-alert');

const submitButtonElement = document.getElementById('submitBtn');


cpfElement.addEventListener('focusout', e => {

    request = {
        tipo: 'nomePorCPF',
        cpf: cpfElement.value
    };

    fetch(SERVER_URL, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(responseData => {
        if(responseData.status === 200) {
            nomeElement.value = responseData.nome;
            cpfElement.classList.add('valid-input');
            cpfElement.classList.remove('invalid-input');
            clienteNotFoundElement.style.visibility = 'hidden';

            idCliente = responseData.idCliente;
        }else{
            nomeElement.value = '';
            cpfElement.classList.add('invalid-input');
            cpfElement.classList.remove('valid-input');
            clienteNotFoundElement.style.visibility = 'visible';
        }
    });
});

placaElement.addEventListener('focusout', e => {
    request = {
        tipo: 'veiculoPorPlaca',
        placa: placaElement.value
    };

    fetch(SERVER_URL, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(responseData => {
        if(responseData.status === 200) {
            let fullCarDescription = responseData.fabricante + ' ' + responseData.modelo + ' ' + responseData.anoFabricacao + '/' + responseData.anoModelo + ' ' + responseData.motor;
            veiculoElement.value = fullCarDescription;
            placaElement.classList.add('valid-input');
            placaElement.classList.remove('invalid-input');
            placaNotFoundElement.style.visibility = 'hidden';
            submitButtonElement.disabled = false;
            
            idVeiculo = responseData.idVeiculo;
        }else{
            veiculoElement.value = '';
            placaElement.classList.remove('valid-input');
            placaElement.classList.add('invalid-input');
            placaNotFoundElement.style.visibility = 'visible';
            submitButtonElement.disabled = true;
        }
    });
});