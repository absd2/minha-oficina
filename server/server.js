const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const PORT = 8080;

// Express setup.
app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT + '...');
});

// Database connection.
var db = mysql.createConnection({
    user: 'root',
    password: 'Gilmour#1973',
    database: 'minha-oficina'
});
db.connect(err => {
    if (err) {
        console.log('Couldn\'t connect to database.');
        return;
    } else {
        console.log('Connected to database using ID ' + db.threadId);
    }
});

// Server routes management.
app.post('/consulta', (req, res) => {
    console.log('[/consulta] POST request received...');
    req = req.body;

    // Checks what to get with what data.
    switch (req.tipo) {
        // Gets client name by having CPF.
        case 'nomePorCPF':
            // Mounts query.
            var query = 'SELECT nome FROM clientes WHERE cpf = \'' + req.cpf + '\'';
            db.query(query, (err, results, fields) => {
                
                if (err !== null) { // if got an error.
                    console.log('Couldn\'t search for client name by CPF.');
                
                
                }else if (results.length > 0) { //query ok and found something.
                    response = {
                        status: 200,
                        nome: results[0].nome
                    }
                    res.send(JSON.stringify(response));

                
                
                }else { // query ok but have found nothing.
                    response = {
                        status: 404,
                        nome: ''
                    }
                    res.send(JSON.stringify(response));
                }
            });
        break;


        // Gets vehicle data by having car plate.
        case 'veiculoPorPlaca':
            // Mounts query.
            var query = 'SELECT * FROM veiculos WHERE placa = \'' + req.placa + '\'';
            db.query(query, (err, results, fields) => {
                
                if (err !== null) { // if got an error.
                    console.log('Couldn\'t search for vehicle name by car plate.');
                
                
                } else if (results.length > 0) { // query ok and found something.
                    response = {
                        status: 200,
                        fabricante: results[0].fabricante,
                        modelo: results[0].modelo,
                        anoFabricacao: results[0].anoFabricacao,
                        anoModelo: results[0].anoModelo,
                        motor: results[0].motor
                    }
                    res.send(JSON.stringify(response));
                
                
                } else { // query ok but have found nothing.
                    response = {
                        status: 404
                    }
                    res.send(JSON.stringify(response));
                }
            });
        break;


        // Gets service order by having CPF.
        case 'osPorCPF':
            // Mounts query.
            var query = 'SELECT * FROM ordensServico WHERE (SELECT idCliente FROM clientes WHERE cpf = \'' + req.valor + '\')';
            db.query(query, (err, results, fields) => {
                
                if (err !== null) { // if got an error.
                    console.log('Couldn\'t search for service order by CPF.');
                
                
                } else if (results.length > 0) { // query ok and found something.
                    let response = [];
                    for (let i in results) {
                        response.push([results[i].idOS, results[i].descricao, 'R$' + results[i].valor]);
                    }
                    res.send(JSON.stringify(response));
                
                
                } else { // query ok but have found nothing.
                    response = {
                        status: 404
                    }
                    res.send(JSON.stringify(response));
                }
            });
        break;



        case 'osPorID':
            // Mounts query.
            var query = 'SELECT * FROM ordensServico WHERE idOS = \'' + req.valor + '\'';
            db.query(query, (err, results, fields) => {
                
                if (err !== null) { // if got an error.
                    console.log('Couldn\'t search for service order by ID.');
                
                
                } else if (results.length > 0) { // query ok and found something.
                    let response = [[results[0].idOS, results[0].descricao, 'R$'+ results[0].valor]];
                    res.send(JSON.stringify(response));
                
                
                } else { // query ok but have found nothing.
                    response = {
                        status: 404
                    }
                    res.send(JSON.stringify(response));
                }
            });
        break;
    }

});


app.post('/cadastro', (req, res) => {
    console.log('[/cadastro] POST request received...');
    req = req.body;

    // Mounting costumer query.
    var query = 'INSERT INTO clientes(idCliente, nome, cpf, rg, nascimento, sexo, email, cep, numero, complemento, celular, telefone) VALUES(default, ';
    var count = 0;
    for (let i in req) {
        if (count < 11) {
            query += '\'' + req[i] + '\', ';
        }
        count++;
    }
    query = query.slice(0, query.length - 2);
    query += ')';

    // Inserting costumer data.
    db.query(query, (err, results, fields) => {
        if (err !== null) {
            console.log('Coudln\'t insert costumer into database.');
        } else {
            console.log('Costumer inserted into database sucessfully.');

            // Mounting vehicle query.
            query = 'INSERT INTO veiculos(idVeiculo, fabricante, modelo, anoFabricacao, anoModelo, motor, placa, quilometragem, idCliente) VALUES(default, ';
            count = 0;
            for (let i in req) {
                if (count >= 11) {
                    query += '\'' + req[i] + '\', ';
                }
                count++;
            }
            query += results.insertId + ')';

            // Inserting vehicle query.
            db.query(query, (err, results, fields) => {
                if (err !== null) {
                    console.log('Coudln\'t insert vehicle into database.');
                } else {
                    console.log('Vehicle inserted in database sucessfully.');
                    console.log('Insertion completed.');

                    response = {
                        status: '200'
                    }

                    res.status(200);
                    res.send(JSON.stringify(response));
                }
            });
        }
    });
});