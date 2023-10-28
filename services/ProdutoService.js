import RestService from "./RestService.js";

export default class ProdutoService extends RestService{

    constructor() {
        super();
        this.path = "/produtos"
    }

    getAll(){
        return this._get(this.path)
    }

    post(produto){
        return this._post(this.path, produto)
    }

    put(produto, id){
        return this._put(this.path, id, produto)
    }

    delete(produtoId){
        return this._delete(this.path, produtoId)
    }
}