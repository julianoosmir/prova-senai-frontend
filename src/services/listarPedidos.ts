export function ListarPedidos(){
   return fetch('http://localhost:8080/pedidos')
    .then(r => r.json())
    .then(rc => (rc));
}