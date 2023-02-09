import { Dispatch, FC, SetStateAction, createContext, ReactNode, useState } from "react";
import { ListaProdutosTypes } from "../../utils/listaProdutos"

export type CarrinhoProdutoTypes = ListaProdutosTypes & { 
  quantidade: number;
  precoQuantidade: number;
}

export type CompraType =  {
  carrinho_compras: CarrinhoProdutoTypes[];
  preco_total: number;
}

export type PropsCompraContext = { 
  state: CompraType;
  setState: Dispatch<SetStateAction<CompraType>>;
}

export const ValoresIniciais: PropsCompraContext = {
  state: {
    carrinho_compras: [],
    preco_total: 0
  },
  setState: () => {},
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
      }}
    >
      {props.children}
    </CompraContext.Provider>
  );
};
