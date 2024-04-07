import { useEffect, useState } from "react";
import { IPedido } from "../interfaces/IPedido";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './pedido.css'
import { Acesso } from "../services/acessoapi";

export function ListaPedidos() {

    const [pedidos,setPedidos] = useState([])

    const navigate = useNavigate();

    const config  = Acesso();

    useEffect(()=>{
        axios('http://localhost:8080/pedidos',config)
        .then(r => r.data)
        .then(rc => setPedidos(rc));
      },[])


    const novoPedido = () => {
       navigate("/cadastrarpedidos")
    }
    const redirecionarCliente = () => {
        navigate("/clientes")
     }
    const alterarPedido = (id : number | undefined) => {
        navigate("/alterarpedido/" + id)
        return 0;
     }
 
    return (
        <div>
            <div className="bs-example btn-text-right">
               <button className="btn btn-success" onClick={novoPedido}> novo pedido</button>
               <button className="btn btn-success" onClick={redirecionarCliente}> clientes</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">descricao</th>
                        <th scope="col">valor</th>
                        <th scope="col">nome</th>
                    </tr>
                </thead>
                <tbody>
                {
                  
                    pedidos.map((obj: IPedido, index) => {
                        return (<tr key={index}>
                            <td>{obj.id}</td>
                            <td>{obj.descricao}</td>
                            <td>{obj.valor}</td>
                            <td>{obj.cliente.nome}</td>
                            <td><button className="btn btn-success" onClick={() => alterarPedido(obj.id)}> alterar</button></td>
                        </tr>
                        )
                    })
                
                }
                </tbody >
            </table >
        </div >
    )
}