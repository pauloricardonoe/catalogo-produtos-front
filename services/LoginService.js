import RestService from "./RestService.js";

export default class LoginService extends RestService {

    logar(credenciais) {
        return this._post("/login", {
            email: credenciais.email,
            senha: credenciais.password
        }, false)
    }

}