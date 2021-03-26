const axios = require('axios');

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bem-vido ao sFood!\n[V] para visualizar o cardapio\n[P] para Listar os Pedidos\n[A+IndiceProduto] para Adicionar um Pedido\nExemplo: A4 (para add o BROTINHO)\n[B+IndiceProduto] para Buscar Produto\n[E+IndicePedido] para Excluir um Pedido\n[F] para finalizar.\n");

rl.addListener("line", line => {
    const comando = line.toUpperCase();
    
    if (comando === 'V') {
        axios.get('https://microprojeto-03.herokuapp.com/cardapio')
          .then(function (response) {
            const cardapio = response.data;
            console.log(cardapio);
          })
          .catch(function (error) {
            console.log("\nAlgo deu errado! :*(\n");
          });
      } else if (comando === 'P') {
        axios.get('https://microprojeto-03.herokuapp.com/cardapio/pedidos')
          .then(function (response) {
            const pedidos = response.data;
            console.log(pedidos);
          })
          .catch(function (error) {
            console.log("\nAlgo deu errado! :*(\n");
          });
      }else if (comando[0] === 'A'){
        const indice = comando.slice(1,comando.length);
        
        axios.get('http://127.0.0.1:2000/cardapio/add/'+indice)
          .then(function (response) {
            const msg = response.data;
            console.log(msg);
          })
          .catch(function (error) {
            console.log("\nAlgo deu errado! :*(\n");
          });
      } else if (comando[0] === 'E') {
        const indice = comando.slice(1,comando.length);
        axios.get('http://127.0.0.1:2000/cardapio/pedidos/delete/'+indice)
          .then(function (response) {
            const msg = response.data;
            console.log(msg);
          })
          .catch(function (error) {
            console.log("\nAlgo deu errado! :*(\n");
          });
      } else if (comando[0] === 'B') {
        const indice = comando.slice(1,comando.length);
        axios.get('http://127.0.0.1:2000/cardapio/busca/'+indice)
          .then(function (response) {
            const msg = response.data;
            console.log(msg);
          })
          .catch(function (error) {
            console.log("\nAlgo deu errado! :*(\n");
          });
      } else if (comando === 'F'){
        axios.get('http://127.0.0.1:2000/cardapio/pedidos')
          .then(function (response) {
            const pedidos = response.data;
            console.log('\nFechando compra!\n' + pedidos + '\nObrigado pela compra! :)');
            rl.close();
          })
          .catch(function (error) {
            console.log("\nAlgo deu errado! :*(\n");
          });
      } else{
        console.log("\nOpção inválida!\n");
      }
});