import { Dispatch, FC, SetStateAction, createContext, ReactNode, useState } from "react";
import { ListaProdutosTypes } from "../../utils/listaProdutos"

export type CarrinhoProdutoTypes = ListaProdutosTypes & { 
  quantidade: number;
  precoQuantidade: number;
}

export type CompraType = CarrinhoProdutoTypes[];

export type PropsCompraContext = { 
  state: CompraType;
  setState: Dispatch<SetStateAction<CompraType>>;
  valorTotal: number;
}

export const ValoresIniciais: PropsCompraContext = {
  state: [],
  setState: () => { },
  valorTotal: 0,
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
        valorTotal: state.reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual.precoQuantidade, 0)
      }}
    >
      {props.children}
    </CompraContext.Provider>
  );
};
