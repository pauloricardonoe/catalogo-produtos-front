import ProdutoService from "../services/ProdutoService.js";
import UsuarioService from "../services/UsuarioService.js"
import Produto from "../model/Produto.js";

export default class Cadprodutos {
    constructor() {
        document.getElementById("btSalvar").addEventListener('click', () => this.salvarProduto())
        document.getElementById("btSair").addEventListener('click', () => this.logout())

        this.produtoService = new ProdutoService()
        this.modalCadastro = new bootstrap.Modal('#modalCadastro')
        this.emEdicao = false
        this.registroEmEdicao = new Produto()
    }

    carregarDados() {
        this.buscarDadosUsuario()
        this.buscarProdutos()
    }

    buscarDadosUsuario() {
        const usuarioService = new UsuarioService();
        usuarioService.getUsuario().then(response => {
            let usuarioLogado = document.getElementById("usuarioLogado");
            usuarioLogado.innerHTML = `Usuário Logado: ${response.nome}`
        })
    }

    buscarProdutos() {
        new ProdutoService().getAll().then(dados => {
            let listaProdutos = dados.map(produto => Object.assign(new Produto(), produto))
            this.atualizarTabela(listaProdutos)
        })
    }

    atualizarTabela(listaProdutos) {
        this.limparTabela()
        listaProdutos.forEach(produto => this.adicionarElementoTabela(produto))
    }

    salvarProduto() {
        let produto
        if (this.emEdicao) {
            produto = this.registroEmEdicao
        } else {
            produto = new Produto()
        }

        produto.sku = document.getElementById("sku").value;
        produto.nome = document.getElementById("nome").value;
        produto.descricao = document.getElementById("descricao").value;
        produto.unidade = document.getElementById("unidade").value;
        produto.peso = parseFloat(document.getElementById("peso").value);
        produto.estoque = parseFloat(document.getElementById("estoque").value);

        if (this.emEdicao) {
            produto.imagens[0].url = document.getElementById("imagem").value

            this.produtoService.put(produto, produto.id).then(() => {
                this.buscarProdutos()
                this.limparCampos()
                this.emEdicao = false
            }).catch(error => {
                this.showMessageErro(error.message, "msgErroCadastro")
            })
        } else {
            produto.imagens.push({
                url: document.getElementById("imagem").value
            })

            this.produtoService.post(produto).then(() => {
                this.buscarProdutos()
                this.limparCampos()
            }).catch(error => {
                this.showMessageErro(error.message, "msgErroCadastro")
            })
        }
    }

    excluirProduto(produtoId) {
        this.produtoService.delete(produtoId).then(response => {
            this.buscarProdutos()
        }).catch(error => {
            this.showMessageErro(error.message, "msgErroListagem")
        })
    }

    editarProduto(produto) {
        this.registroEmEdicao = produto
        this.emEdicao = true
        this.modalCadastro.show()

        document.getElementById("sku").value = produto.sku;
        document.getElementById("nome").value = produto.nome;
        document.getElementById("descricao").value = produto.descricao;
        document.getElementById("unidade").value = produto.unidade;
        document.getElementById("estoque").value = produto.estoque;
        document.getElementById("peso").value = produto.peso;
        document.getElementById("imagem").value = produto.imagens[0] != null ? produto.imagens[0].url : '';
        document.getElementById("imgProduto").src = produto.imagens[0] != null ? produto.imagens[0].url :
            "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
    }

    limparCampos() {
        this.modalCadastro.hide()

        document.getElementById("sku").value = "";
        document.getElementById("nome").value = "";
        document.getElementById("descricao").value = "";
        document.getElementById("unidade").value = "";
        document.getElementById("peso").value = "";
        document.getElementById("estoque").value = "";
        document.getElementById("imagem").value = "";

        document.getElementById("msgErroCadastro").innerHTML = ""
        document.getElementById("imgProduto").src = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
    }

    adicionarElementoTabela(produto) {
        let elementoTabela = document.getElementById("tabelaProdutos");
        var tbody = elementoTabela.querySelector("tbody");
        let novaLinha = tbody.insertRow();

        let celSku = novaLinha.insertCell();
        let celNome = novaLinha.insertCell();
        let celImagem = novaLinha.insertCell();
        let celEditar = novaLinha.insertCell();
        let celDeletar = novaLinha.insertCell();

        let imagem = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
        if (produto.imagens.length > 0) {
            imagem = produto.imagens[0].url
        }

        celSku.innerHTML = produto.sku;
        celNome.innerHTML = produto.nome;
        celImagem.innerHTML = `<img alt="${produto.nome}" width="150px" height="100px" src="${imagem}"/>`

        let btEditar = document.createElement("button")
        btEditar.innerHTML = "Editar"
        btEditar.className = "btn btn-primary"
        btEditar.addEventListener("click", () => this.editarProduto(produto))
        celEditar.appendChild(btEditar)

        let btExlcuir = document.createElement("button")
        btExlcuir.innerHTML = "Excluir"
        btExlcuir.className = "btn btn-danger"
        btExlcuir.addEventListener("click", () => this.excluirProduto(produto.id))
        celDeletar.appendChild(btExlcuir)
    }

    limparTabela() {
        let elementoTabela = document.getElementById("tabelaProdutos");

        while (elementoTabela.rows.length !== 1) {
            elementoTabela.deleteRow(1)
        }
    }

    showMessageErro(mensagem, idElement) {
        let elemento = document.getElementById(idElement)
        elemento.innerHTML = mensagem
    }

    logout(){
        sessionStorage.removeItem("token")
        window.location.href = "../index.html";
    }
}

const cadprodutos = new Cadprodutos();
cadprodutos.carregarDados();

document.getElementById("imagem").addEventListener("change", (event) => {
    document.getElementById("imgProduto").src = document.getElementById("imagem").value;
})