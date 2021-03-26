const express = require('express');

const app = express();

const porta = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Itens do cardapio
var cardapio = [
    "PIZZA FAMILIA",
    "PIZZA MÉDIA",
    "PIZZA PEQUENA",
    "BROTINHO",
    "CACHORRO QUENTE",
    "LASANHA",
    "HAMBURGUER",
    "COMBO MINI-COXINHA",
    "REFRIGERANTE 1L",
    "REFRIGERANTE 2L",
    "REFRIGERANTE 4L",
    "SUCOS 500ML"
];
// Indices do cardapio
var indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var pedidos = []; // Lista pra guarda os pedidos

/**
 * Funcoes para manipulação do CARDAPIO e dos PEDIDOS===========================================================================
 *
===========================================================CARDAPIO===========================================================*/
app.get("/cardapio", (req, res) => {
    var imprime = "\n";
    for (var i = 0; i<cardapio.length; i++){
        imprime += indices[i] + "." + cardapio[i] + "\n";
    }
    res.send(imprime);
});
/*app.post("/admin/senha/addCardapio", (req, res) => {
    const newLanche = req.body;
    indices.push(indices.length+1);
    cardapio.push(newLanche.toUpperCase());
    res.send("Lanche adicionado! :)");
});*/
app.get("/cardapio/busca/:ind", (req, res) => {
    const indice = req.params.ind - 1;
    if (indice > cardapio.length){
        res.send("\nItem não existe! :(\n");
    }else{
        res.send("\n" + cardapio[indice] + "\n");
    }
});
/*app.get("/admin/senha/delete/:ind", (req, res) =>{
    const indice = req.params.ind;
    var tmp = indice-1;
    if (tmp >= cardapio.length) {
        res.send("Item não existe! :(")
    }else {
        cardapio.splice(tmp,tmp);
        indices.pop();
        res.send("Item apagado! :)");
    }
});*/
//===========================================================PEDIDOS===========================================================
app.get("/cardapio/add/:ind", (req, res) => {
    const indice = req.params.ind - 1;
    if (indice > cardapio.length){
        res.send("\nItem não existe! :(\n");
    }else{
        pedidos.push(cardapio[indice]);
        res.send("\nItem adicionado! :)\n");
    }
});
app.get("/cardapio/pedidos", (req, res) => {
    if (pedidos.length == 0){
        res.send("\nNão há nenhum Pedido! :(\n");
    }else{
        var i;
        var msg = "";
        for (i = 0; i < pedidos.length; i++){
            msg += (i+1) + "." + pedidos[i] + "\n";
        }
        res.send("\nSeus pedidos são:\n" + msg);
    }
});
app.get("/cardapio/pedidos/delete/:ind", (req, res) =>{
    const indice = req.params.ind - 1;
    if (pedidos.length == 0){
        res.send("\nNão há pedidos! :(\n");
    }else{
        if (indice >= pedidos.length) {
            res.send("\nPedido não existe! :(\n");
        }else {
            pedidos.splice(indice,1);
            res.send("\nPedido deletado! :)\n");
        }
    }
});
//=========================================================================================================================
app.listen(porta, () => {
    console.log("Servidor Inicializado! :)");
});