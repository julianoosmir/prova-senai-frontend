import './App.css'
import { Login } from './login/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListaPedidos } from './pedido/listaPedido';
import { CadastarPedido } from './pedido/cadastrarPedido';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/pedidos"element={<ListaPedidos />} ></Route>
        <Route path="/cadastrarpedidos" element={<CadastarPedido />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
