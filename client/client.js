const axios = require('axios');

/*axios.get("http://127.0.0.1:2000/msgHome")
  .then(function (response) {
    document.getElementById("message").value = response.data;
  })
  .catch(function (error) {
    alert("Algo deu errado! :*(");
  });*/

function maiuscula(aux){
  var tmp = document.getElementById(aux).value;
  tmp = tmp.toUpperCase();
  document.getElementById(aux).value = tmp;
}

document.addEventListener('keypress', (k) =>{
  if (k.key == "Enter"){
    newMsg();
  }
});

function newMsg() {
  var message = document.createElement("li");
  const messageValue = document.getElementById("message").value;
  const content = document.createTextNode(messageValue);
  message.appendChild(content);

  if (messageValue === 'V') {
    axios.get('http://127.0.0.1:2000/cardapio')
      .then(function (response) {
        const cardapio = document.createElement('li');
        cardapio.className = 'botLI';
        cardapio.innerHTML = response.data;
        document.getElementById("chatUL").appendChild(cardapio);
      })
      .catch(function (error) {
        alert("Algo deu errado! :*(");
      });
  } else if (messageValue === 'P') {
    axios.get('http://127.0.0.1:2000/pedidos')
      .then(function (response) {
        const pedidos = response.data;
        document.getElementById("chatUL").appendChild(pedidos);
      })
      .catch(function (error) {
        alert("Algo deu errado! :*(");
      });
  }else if (messageValue[0] === 'A'){
    const indice = messageValue.slice(1,messageValue.length);
    axios.get('http://127.0.0.1:2000/cardapio/add/'+indice)
      .then(function (response) {
        const msg = response.data;
        document.getElementById("chatUL").appendChild(msg);
      })
      .catch(function (error) {
        alert("Algo deu errado! :*(");
      });
  } else if (messageValue[0] === 'E') {
    const indice = messageValue.slice(1,messageValue.length);
    axios.get('http://127.0.0.1:2000/pedidos/delete/'+indice)
      .then(function (response) {
        const msg = response.data;
        document.getElementById("chatUL").appendChild(msg);
      })
      .catch(function (error) {
        alert("Algo deu errado! :*(");
      });
  } else if (messageValue[0] === 'B') {
    const indice = messageValue.slice(1,messageValue.length);
    axios.get('http://127.0.0.1:2000/cardapio/busca/'+indice)
      .then(function (response) {
        const msg = response.data;
        document.getElementById("chatUL").appendChild(msg);
      })
      .catch(function (error) {
        alert("Algo deu errado! :*(");
      });
  } else if (messageValue === 'F'){
    axios.get('http://127.0.0.1:2000/pedidos')
      .then(function (response) {
        const pedidos = response.data;
        document.getElementById("chatUL").appendChild('Seus pedidos foram: <br>' + pedidos + '<br>Obrigado pela compra! :)');
      })
      .catch(function (error) {
        alert("Algo deu errado! :*(");
      });
  }else if (messageValue === 'C'){
    document.getElementById("chatUL").appendChild('Cancelando compra! :*(');
  } else{
    alert("Opção inválida!");
  }
  document.getElementById("message").value = "";
}