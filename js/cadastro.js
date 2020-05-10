const form = document.getElementById('form');
const SERVER_URL = 'http://localhost:8080/cadastro/cliente';

form.addEventListener("submit", e => {
    e.preventDefault();

    // Retrieves personal data from HTML.
    var nome = document.getElementById('nomeInput').value.toUpperCase();
    var cpf = document.getElementById('cpfInput').value;
    var rg = document.getElementById('rgInput').value;
    var nascimento = document.getElementById('dataNascimentoInput').value;
    var sexo = document.getElementById('sexoInput').value;
    var email = document.getElementById('emailInput').value.toUpperCase();
    var cep = document.getElementById('cepInput').value;
    var numero = document.getElementById('numeroInput').value;
    var complemento = document.getElementById('complementoInput').value.toUpperCase();
    var celular = document.getElementById('celularInput').value;
    var telefone = document.getElementById('telefoneInput').value;

    // Retrieves car data from HTML.
    var fabricante = document.getElementById('fabricanteInput').value.toUpperCase();
    var modelo = document.getElementById('modeloInput').value.toUpperCase();
    var anoFabricacao = document.getElementById('anoFabricacaoInput').value;
    var anoModelo = document.getElementById('anoModeloInput').value;
    var motor = document.getElementById('motorInput').value.toUpperCase();
    var placa = document.getElementById('placaInput').value.toUpperCase();
    var quilometragem = document.getElementById('quilometragemInput').value;

    var usuarioParaCadastrar = {
        nome, cpf, rg, nascimento, sexo, email, cep, numero, complemento, celular, telefone,
        fabricante, modelo, anoFabricacao, anoModelo, motor, placa, quilometragem
    }

    fetch(SERVER_URL, {
        method: 'POST',
        body: JSON.stringify(usuarioParaCadastrar),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(responseData => {
        if(responseData.status == '200') {
            console.log('Cadastro realizado com sucesso');
        }else{
            console.log('Cadastro não realizado');
        }
    });
});