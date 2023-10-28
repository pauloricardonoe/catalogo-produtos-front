import RestService from "./RestService.js";

export default class UsuarioService extends RestService{

    getUsuario(){
        const payloadjwt = this.getPayloadValue(this.token)
        return this._get(`/usuarios/${payloadjwt.jti}`)
    }

    getPayloadValue(token) {
        const base64Url = token.split('.')[1]; // A segunda parte do token contém o payload
        const base64 = base64Url.replace('-', '+').replace('_', '/'); // Correções de caracteres base64 URL-safe
        const payload = JSON.parse(atob(base64)); // Decodifica a parte do payload

        return payload; // Retorna o objeto JSON decodificado
    }
}