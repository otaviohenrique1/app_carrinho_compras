import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CarrinhoCompras } from "./pages/CarrinhoCompras";
import { DetalhesProduto } from "./pages/DetalhesProduto";
import { FinalizarCompra } from "./pages/FinalizarCompra";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos" element={<DetalhesProduto />} />
        <Route path="/carrinho" element={<CarrinhoCompras />} />
        <Route path="/finalizar" element={<FinalizarCompra />} />
      </Routes>
    </BrowserRouter>
  );
}
