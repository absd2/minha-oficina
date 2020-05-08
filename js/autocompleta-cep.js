// Completa os dados automaticamente a partir do CEP.
const cepElement = document.getElementById('cepInput');
const logradouroElement = document.getElementById('logradouroInput');
const bairroElement = document.getElementById('bairroInput');
const cidadeElement = document.getElementById('cidadeInput');
const estadoElement = document.getElementById('estadoInput');

cepElement.addEventListener("focusout", evt => {
    var urlConsulta = 'http://viacep.com.br/ws/' + cepElement.value + '/json/';

    fetch(urlConsulta, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(responseData => {
        logradouroElement.value = responseData.logradouro;
        bairroElement.value = responseData.bairro;
        cidadeElement.value = responseData.localidade;
        estadoElement.value = responseData.uf;
    }).catch(err => {
        logradouroElement.value = '';
        bairroElement.value = '';
        cidadeElement.value = '';
        estadoElement.value = '';
    });
});