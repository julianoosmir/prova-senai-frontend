import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './cliente.css'
import { Acesso } from "../services/acessoapi";
import { ICliente } from "../interfaces/ICliente";

export function ListaCliente() {

    const config = Acesso();

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/cliente',config)
            .then(r => r.json())
            .then(rc => setClientes(rc));
    }, [])
    const navigate = useNavigate();

    const novoCliente = () => {
       navigate("/cadastrarclientes")
    }
    const alterarCliente = (id : number | undefined) => {
        navigate("/alterarclientes/" + id)
        return 0;
     }
 
    return (
        <div>
            <div className="bs-example btn-text-right">
               <button className="btn btn-success" onClick={novoCliente}> novo cliente</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">nome</th>
                        <th scope="col">estado</th>
                        <th scope="col">cidade</th>
                        <th scope="col">bairro</th>
                        <th scope="col">logradouro</th>
                        <th scope="col">cep</th>
                    </tr>
                </thead>
                <tbody>
                {
                  
                  clientes.map((obj: ICliente, index) => {
                        return (<tr key={index}>
                            <td>{obj.id}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.endereco.estado}</td>
                            <td>{obj.endereco.cidade}</td>                          
                            <td>{obj.endereco.bairro}</td>
                            <td>{obj.endereco.logradouro}</td>
                            <td>{obj.endereco.cep}</td>
                            <td><button className="btn btn-success" onClick={() => alterarCliente(obj.id)}> alterar</button></td>
                        </tr>
                        )
                    })
                
                }
                </tbody >
            </table >
        </div >
    )
}