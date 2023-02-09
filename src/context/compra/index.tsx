import { Dispatch, FC, SetStateAction, createContext, ReactNode, useState } from "react";
import { ListaProdutosTypes } from "../../utils/listaProdutos"

export type CarrinhoProdutoTypes = ListaProdutosTypes & {
  quantidade: number;
  precoQuantidade: number;
}

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

export type CompraType = CarrinhoProdutoTypes[];

export type PropsCompraContext = {
  state: CompraType;
  setState: Dispatch<SetStateAction<CompraType>>;
  adicionarProduto: (produto: CarrinhoProdutoTypes, id: number) => void;
  atualizarQuantidadeProduto: (produto: CarrinhoProdutoTypes, id: number) => void;
  valorTotal: number;
  limparLista: () => void;
  removerProduto: (id: number) => void;
  adicionarQuantidade: (id: number, novaQuantidade: number) => void;
  removerQuantidade: (id: number, novaQuantidade: number) => void;
}

export const ValoresIniciais: PropsCompraContext = {
  state: [],
  setState: () => { },
  adicionarProduto: () => { },
  atualizarQuantidadeProduto: () => { },
  valorTotal: 0,
  limparLista: () => { },
  removerProduto: () => { },
  adicionarQuantidade: () => { },
  removerQuantidade: () => { },
};

export const CompraContext = createContext<PropsCompraContext>(ValoresIniciais);

export interface CompraContextProviderProps {
  children: ReactNode;
}

export const CompraContextProvider: FC<CompraContextProviderProps> = (props: CompraContextProviderProps) => {
  const [state, setState] = useState(ValoresIniciais.state);

  function adicionarProduto(produto: CarrinhoProdutoTypes, id: number) {
    let buscaItem = state.find((itemBusca) => itemBusca.id === id);

    if (!buscaItem) {
      setState([...state, {
        id: produto.id,
        nome: produto.nome,
        imagem: produto.imagem,
        categoria: produto.categoria,
        descricao: produto.descricao,
        preco: produto.preco,
        quantidade: 1,
        precoQuantidade: produto.preco * 1,
      }]);
    } else {
      atualizarQuantidadeProduto(produto, id);
    }
  }

  function atualizarQuantidadeProduto(produto: CarrinhoProdutoTypes, id: number) {
    let itemAtualizado = state.map((itemBusca) => {
      if (itemBusca.id === id) {
        itemBusca.quantidade = itemBusca.quantidade + 1;
        itemBusca.precoQuantidade = itemBusca.preco * itemBusca.quantidade;
      }
      return itemBusca;
    });
    setState(itemAtualizado);
  }

  function calculaValorTotal() {
    return state.reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual.precoQuantidade, 0);
  }

  function limparLista() {
    setState([]);
  }

  function removerProduto(id: number) {
    setState(state.filter((itemBusca) => itemBusca.id !== id));
  }

  function adicionarQuantidade(id: number, novaQuantidade: number) {
    let itemAtualizado = state.map((itemBusca) => {
      if (itemBusca.id === id) {
        itemBusca.quantidade = itemBusca.quantidade + novaQuantidade;
        itemBusca.precoQuantidade = itemBusca.preco * itemBusca.quantidade;
      }
      return itemBusca;
    });
    setState(itemAtualizado);
  }

  function removerQuantidade(id: number, novaQuantidade: number) {
    let itemAtualizado = state.map((itemBusca) => {
      if (itemBusca.id === id) {
        itemBusca.quantidade = itemBusca.quantidade - novaQuantidade;
        itemBusca.precoQuantidade = itemBusca.preco * itemBusca.quantidade;
      }
      return itemBusca;
    });
    setState(itemAtualizado);
  }

  return (
    <CompraContext.Provider
      value={{
        state,
        setState,
        adicionarProduto,
        atualizarQuantidadeProduto,
        valorTotal: calculaValorTotal(),
        limparLista,
        removerProduto,
        adicionarQuantidade,
        removerQuantidade,
      }}
    >
      {props.children}
    </CompraContext.Provider>
  );
};
