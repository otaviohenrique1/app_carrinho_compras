import { CarrinhoProdutoTypes } from "../context/compra";

export function CalculaTotal(listaCompra: CarrinhoProdutoTypes[]) {
  let resultado = listaCompra.reduce((valorAnterior, valorAtual) => {
    return valorAnterior + valorAtual.preco;
  }, 0);
  return resultado;
}