import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPedido } from "../interfaces/IPedido";
import { ICliente } from "../interfaces/ICliente";

interface InputPedido {
    label: string,
    value: string | number,
    updateValue(value: unknown): void
}

interface SelectPedido {
    label: string,
    value: string | number,
    clientes: ICliente[]
    updateValue(value: unknown): void
}

const Input = ({ label, value, updateValue }: InputPedido) => {
    return (
        <>
            <label>{label}</label>
            <input className="form-control" value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}



export function CadastarPedido() {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [clienteId,setClientId] = useState(0);

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/cliente')
            .then(r => r.json())
            .then(rc => setClientes(rc));
    }, [])

   

    const navigate = useNavigate();

    const submit = () => {
        const cliente = { id: clienteId } as ICliente
        const payload: IPedido = {
            descricao: descricao,
            valor: valor,
            cliente: cliente
        }
        

        fetch('http://localhost:8080/pedido', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                navigate("/pedidos")
            });

        
    }
    return (
        <div id="wapper">
            <div className="panel-auth">
                <h2> Pedido <span>Cadastro</span></h2>
                <br />
                <form className="input-container">
                    <Input label="Descricao" value={descricao} updateValue={setDescricao} />
                    <Input label="Valor" value={valor} updateValue={setValor} />
                    
                </form>
                <button onClick={submit} className="btn-secondary">
                    salvar
                </button>
            </div>
        </div>
    )
}