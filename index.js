import LoginService from "./services/LoginService.js"
import Credenciais from "./model/Credenciais.js"
export function login() {
    let usuario = document.getElementById("username").value;
    let senha = document.getElementById("password").value;
    let msgErro = document.getElementById("msgErro")

    try {
        const loginService = new LoginService()
        loginService.logar(new Credenciais(usuario, senha)).then(token => {
                sessionStorage.setItem("token", token.accessToken)
                window.location.href = "./views/cadprodutos.html";
            }
        )
            .catch(error => {
                msgErro.innerHTML = error.message
            })

    } catch (e) {
        console.log(e)
    }
}

document.getElementById("btLogin").addEventListener('click', login)