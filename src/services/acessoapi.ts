import { LoginModel } from "../interfaces/LoginModel";

export function Acesso(){
    const local = localStorage.getItem("acesso") as string;
    const acesso = JSON.parse(local) as LoginModel;

    const authorizationBasic = window.btoa(acesso.nome + ':' + acesso.senha);
    const config = {
        "headers": {
            "Authorization": "Basic " + authorizationBasic
        }
    };
    return config;
}