export default class Produto{
    constructor() {
        this.id = "";
        this.sku = "";
        this.nome = "";
        this.descricao = "";
        this.unidade = "";
        this.peso = 0;
        this.estoque = 0;
        this.status = "ATIVO";
        this.imagens = [];
    }
}