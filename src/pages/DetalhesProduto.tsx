import { useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { useEffect, useState } from "react";
import { ListaProdutosTypes, listaProdutos } from "../utils/listaProdutos";
import { Main } from "../components/Main";
import { formatadorMonetario } from "../utils/formatadores";
import styled from "styled-components";
import { Galeria } from "../components/Galeria";
import { ListaItem } from "../components/ListaItem";

const dadosIniciais: ListaProdutosTypes = {
  id: 0,
  nome: "",
  preco: 0,
  categoria: "",
  descricao: "",
  imagem: [],
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
        <DetalhesLista>
          <ListaItem
            label="ID:"
            data={data.id}
            fontSize="20px"
          />
          <ListaItem
            label="Nome:"
            data={data.nome}
            fontSize="20px"
          />
          <ListaItem
            label="Preço:"
            data={formatadorMonetario(data.preco)}
            fontSize="20px"
          />
          <ListaItem
            label="Categoria:"
            data={data.categoria}
            fontSize="20px"
          />
          <ListaItem
            label="Descrição:"
            data={data.descricao}
            fontSize="20px"
          />
          <Galeria lista_imagens_url={data.imagem} />
        </DetalhesLista>
      </Main>
    </>
  );
}

const DetalhesLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
