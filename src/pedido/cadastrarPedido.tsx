import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPedido } from "../interfaces/IPedido";
import { ICliente } from "../interfaces/ICliente";
import axios from "axios";
import { Acesso } from "../services/acessoapi";
import { useParams } from 'react-router';


interface InputPedido {
    label: string,
    value: string | number,
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
    const [clienteId, setClientId] = useState(1);
    const { id } = useParams();

    const [pedido,setPedido] = useState({});


    const config = Acesso();

    const [clientes, setClientes] = useState([])

    
    useEffect(() => {
        fetch('http://localhost:8080/cliente',config)
            .then(r => r.json())
            .then(rc => setClientes(rc));
    }, [])

    useEffect(() => {
        fetch('http://localhost:8080/pedidos/' + id,config)
            .then(r => r.json())
            .then((p : IPedido) => {
                setPedido(p);
                setClientId(Number(p.cliente.id))
                setDescricao(p.descricao)
                setValor(p.valor)
            });
    }, [])


    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event?.target?.value);
        const value = event?.target?.value;
        setClientId(Number(value));
    }

    const submit = () => {
        const cliente = { id: clienteId } as ICliente
        const payload: IPedido = {
            id: pedido ? Number(id) : undefined,
            descricao: descricao,
            valor: valor,
            cliente: cliente
        }
       
        const result = axios.post("http://localhost:8080" + '/pedidos', payload, config);
        result.then((res) => {
            console.log(res.data);
            navigate("/pedidos")
        })
        .catch((cat) => console.log(cat))

    }
    return (
        <div id="wapper">
            <div className="panel-auth">
                <h2> Pedido <span>Cadastro</span></h2>
                <br />
                {id}
                <form className="input-container">
                    <Input label="Descricao" value={descricao} updateValue={setDescricao} />
                    <Input label="Valor" value={valor} updateValue={setValor} />
                    <select value={clienteId} onChange={handleChange}>
                        {
                            clientes.map((obj: ICliente, index) => {
                                return (
                                    <option key={index} value={obj.id}> {obj.nome}</option>
                                );
                            })
                        }
                    </select>
                </form>
                <button onClick={submit} className="btn-secondary">
                    salvar
                </button>
            </div>
        </div>
    )
}


