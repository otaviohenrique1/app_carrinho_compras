import { useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { useEffect, useState } from "react";
import { ListaProdutosTypes, listaProdutos } from "../utils/listaProdutos";
import { Main } from "../components/Main";
import { formatadorMonetario } from "../utils/formatadores";
import { Imagem } from "../components/Imagem";
import styled from "styled-components";

const dadosIniciais: ListaProdutosTypes = {
  id: 0,
  nome: "",
  preco: 0,
  categoria: "",
  descricao: "",
  imagem: []
};

export function DetalhesProduto() {
  const { id } = useParams();
  const [data, setData] = useState<ListaProdutosTypes>(dadosIniciais);

  useEffect(() => {
    const id_validado = (typeof id === "undefined") ? 0 : parseInt(id);
    let resultado = listaProdutos.find((item) => item.id === id_validado);
    let resultado_validado = (typeof resultado === "undefined") ? dadosIniciais : resultado;
    setData(resultado_validado);
  }, [id]);

  return (
    <>
      <AppBar titulo="DetalhesProduto" />
      <Main>
        <ul>
          <li><b>ID:</b> {data.id}</li>
          <li><b>Nome:</b> {data.nome}</li>
          <li><b>Preço:</b> {formatadorMonetario(data.preco)}</li>
          <li><b>Categoria:</b> {data.categoria}</li>
          <li><b>Descrição:</b> {data.descricao}</li>
          <li>
            <Galeria>
              {data.imagem.map((item, index) => {
                return (
                  <Imagem src={item} alt={`Imagem-${index}`} />
                );
              })}
            </Galeria>
          </li>
        </ul>
      </Main>
    </>
  );
}

const Galeria = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;