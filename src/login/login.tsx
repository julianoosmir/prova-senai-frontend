import { useState } from "react";
import { InputProps } from "../interfaces/InputProps";
import { LoginModel } from "../interfaces/LoginModel";

import './login.css'
import { useNavigate } from "react-router-dom";


const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input className="form-control" value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function Login() {
    const [nome, setnome] = useState("");
    const [senha, setsenha] = useState("");
    const navigate = useNavigate();

    const submit = () => {
        const loginModel: LoginModel = {
            nome, senha
        }
        console.log(loginModel);

        localStorage.setItem("usuario",JSON.stringify(loginModel));

       navigate("/pedidos")
    }
    return (
        <div id="wapper">
            <div className="panel-auth">
            <h2> ACESSO <span>APP</span></h2>
                <br/>
                <form className="input-container">
                    <Input label="nome" value={nome} updateValue={setnome} />
                    <Input label="senha" value={senha} updateValue={setsenha} />
                </form>
                <button onClick={submit} className="btn-secondary">
                    entrar
                </button>
            </div>
        </div>
    )
}