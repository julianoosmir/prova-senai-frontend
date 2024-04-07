import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICliente } from "../interfaces/ICliente";
import axios from "axios";
import { Acesso } from "../services/acessoapi";
import { useParams } from 'react-router';
import { IEndereco } from "../interfaces/IEndereco";
import { ViaCepModel } from "../interfaces/ViaCepModel";


interface InputCliente {
    label: string,
    value: string | number,
    updateValue(value: unknown): void
}

const Input = ({ label, value, updateValue}: InputCliente) => {
    return (
        <>
            <label>{label}</label>
            <input className="form-control" value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}



export function CadastarCliente() {

    const [nome, setNome] = useState("");
    const [numero, setNumero] = useState(0);
    const [bairro, setBairro] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [cep, setCep] = useState("");
    const [complemento, setComplemento] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");


    // const [cliente, setCliente] = useState({})
    

    const [clienteId, setClientId] = useState(1);

    const { id } = useParams();

    const config = Acesso();

    useEffect(() => {
        
        fetch('http://localhost:8080/cliente/' + id,config)
            .then(r => r.json())
            .then((c : ICliente) => {
                setClientId(Number(c.id))
                setNome(c.nome)
                setCep(c.endereco.cep)
                setCidade(c.endereco.cidade)
                setEstado(c.endereco.estado)
                setNumero(c.endereco.numero)
                setBairro(c.endereco.bairro)
                setLogradouro(c.endereco.logradouro);
                setComplemento(c.endereco.complemento)
            });
    },[])


    const enderecoViaCep = (cep:string) =>{

        fetch('http://localhost:8080/cep/' + cep,config)
        .then(r => r.json())
        .then((model : ViaCepModel) => {
            setCep(model.cep)
            setCidade(model.localidade)
            setEstado(model.uf)
            setBairro(model.bairro)
            setLogradouro(model.logradouro);
            setComplemento(model.complemento)
        });

        return 0;
    }


    const navigate = useNavigate();

    const submit = () => {

        const endereco : IEndereco = {
            numero: numero,
            bairro: bairro,
            logradouro: logradouro,
            cep: cep,
            complemento: complemento,
            estado: estado,
            cidade: cidade,
            
        }

        const payload: ICliente = {
          
            id : clienteId ? clienteId : undefined,
            nome: nome,
            endereco : endereco 
        }
        
        const result = axios.post("http://localhost:8080" + '/cliente', payload, config);
        result.then(() => {
            navigate("/clientes")
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

                    <Input label="nome" value={nome} updateValue={setNome} />
                    <Input label="cep" value={cep} updateValue={enderecoViaCep} />
                    <Input label="estado" value={estado} updateValue={setEstado} />
                    <Input label="cidade" value={cidade} updateValue={setCidade} />
                    <Input label="bairro" value={bairro} updateValue={setBairro} />
                    <Input label="logradouro" value={logradouro} updateValue={setLogradouro} />
                    <Input label="numero" value={numero} updateValue={setNumero} />
                    <Input label="Complemento" value={complemento} updateValue={setComplemento} />

                </form>
                <button onClick={submit} className="btn-secondary">
                    salvar
                </button>
            </div>
        </div>
    )
}