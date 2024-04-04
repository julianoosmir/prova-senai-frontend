import { useEffect, useState } from "react";
import { IPedido } from "../interfaces/IPedido";
import { useNavigate } from "react-router-dom";

export function ListaPedidos() {

    const [pedidos,setPedidos] = useState([])

    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch('http://localhost:8080/pedido')
        .then(r => r.json())
        .then(rc => setPedidos(rc));
      },[])


    const novoPedido = () => {
       navigate("/cadastrarpedidos")
    }

    return (
        <div>
            <div className="bs-example btn-text-right">
               <button className="btn btn-success" onClick={novoPedido}> novo pedido</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">nome</th>
                        <th scope="col">username</th>
                        <th scope="col">perfil</th>
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
                            <td><button className="btn btn-success"> selecionar</button></td>
                        </tr>
                        )
                    })
                
                }
                </tbody >
            </table >
        </div >
    )
}