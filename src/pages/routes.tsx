import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { CarrinhoCompras } from "./CarrinhoCompras";
import { DetalhesProduto } from "./DetalhesProduto";
import { FinalizarCompra } from "./FinalizarCompra";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos/:id" element={<DetalhesProduto />} />
        <Route path="/carrinho" element={<CarrinhoCompras />} />
        <Route path="/finalizar" element={<FinalizarCompra />} />
      </Routes>
    </BrowserRouter>
  );
}
