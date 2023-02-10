import { CarrinhoProdutoTypes } from "../context/compra";
import { ListaMetodosPagamentoTypes } from "./listas";

export const valoresIniciaisUmMetodoPagamento:ListaMetodosPagamentoTypes = {
  value: "",
  label: "",
};

export const valoresIniciaisUmProduto: CarrinhoProdutoTypes = {
  id: 0,
  nome: "",
  preco: 0,
  categoria: "",
  descricao: "",
  imagem: [],
  precoQuantidade: 0,
  quantidade: 0,
};