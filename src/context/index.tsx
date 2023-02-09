import { ReactNode } from "react";
import { CompraContextProvider } from "./compra";

export interface GlobalContextProps {
  children: ReactNode;
}

export function GlobalContext(props: GlobalContextProps) {
  return (
    <CompraContextProvider>{props.children}</CompraContextProvider>
  );
}