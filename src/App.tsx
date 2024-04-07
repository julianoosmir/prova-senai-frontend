import './App.css'
import { Login } from './login/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListaPedidos } from './pedido/listaPedido';
import { CadastarPedido } from './pedido/cadastrarPedido';
import { ListaCliente } from './cliente/listaCliente';
import { CadastarCliente } from './cliente/cadastroCliente';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/pedidos"element={<ListaPedidos />} ></Route>
        <Route path="/cadastrarpedidos" element={<CadastarPedido />} />
        <Route path="/alterarpedido/:id" element={<CadastarPedido />} />
        <Route path="/clientes"element={<ListaCliente />} ></Route>
        <Route path="/cadastrarclientes" element={<CadastarCliente />} />
        <Route path="/alterarclientes/:id" element={<CadastarCliente />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
