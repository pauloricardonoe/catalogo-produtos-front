import {URL} from "../config.js";

export default class RestService{
    constructor() {
        this.url = URL
        this.token = sessionStorage.getItem("token")
    }

    _get(path, authenticate = true) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if(authenticate){
            requestOptions.headers.Authorization = `Bearer ${this.token}`
        }

        return this._request(path, requestOptions)
    }

    _post(path, body, authenticate = true) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        };

        if(authenticate){
            requestOptions.headers.Authorization = `Bearer ${this.token}`
        }

        return this._request(path, requestOptions)
    }

    _put(path, id, body, authenticate = true) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        };

        if(authenticate){
            requestOptions.headers.Authorization = `Bearer ${this.token}`
        }

        return this._request(path + "/" + id, requestOptions)
    }

    _delete(path, id, authenticate = true) {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if(authenticate){
            requestOptions.headers.Authorization = `Bearer ${this.token}`
        }

        return this._request(path + "/" + id, requestOptions)
    }

    _request(path, options){
        return fetch(this.url + path, options)
            .then(response => {
                // Verificando se a solicitação foi bem-sucedida (status 200)
                if (!response.ok) {
                    return response.json().then(error => {
                            throw Error(error.message)
                        }
                    )
                }
                if(response.status !== 204) {
                    // Convertendo a resposta para JSON
                    return response.json();
                }
            })
    }
}