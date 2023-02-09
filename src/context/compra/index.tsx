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
  valorTotal: number;
  limparLista: () => void;
}

export const ValoresIniciais: PropsCompraContext = {
  state: [],
  setState: () => { },
  valorTotal: 0,
  limparLista: () => {},
};

export const CompraContext = createContext<PropsCompraContext>(ValoresIniciais);

export interface CompraContextProviderProps {
  children: ReactNode;
}

export const CompraContextProvider: FC<CompraContextProviderProps> = (props: CompraContextProviderProps) => {
  const [state, setState] = useState(ValoresIniciais.state);

  return (
    <CompraContext.Provider
      value={{
        state,
        setState,
        valorTotal: state.reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual.precoQuantidade, 0),
        limparLista: () => setState([]),
      }}
    >
      {props.children}
    </CompraContext.Provider>
  );
};
