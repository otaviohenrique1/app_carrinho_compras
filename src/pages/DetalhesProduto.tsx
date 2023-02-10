import { useNavigate, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { useContext, useEffect, useState } from "react";
import { ListaProdutosTypes, listaProdutos } from "../utils/listas";
import { Main } from "../components/Main";
import { formatadorMonetario } from "../utils/formatadores";
import styled from "styled-components";
import { Galeria } from "../components/Galeria";
import { ListaItem } from "../components/ListaItem";
import { Botao } from "../components/Botao";
import { CompraContext } from "../context/compra";

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
  const navigation = useNavigate();
  const { adicionarProduto } = useContext(CompraContext);

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: "10px",
            }}
          >
              <Botao
                style={{ maxWidth: "290px" }}
                onClick={() => {
                  let produto = {
                    ...data,
                    quantidade: 1,
                    precoQuantidade: data.preco * 1,
                  };
                  adicionarProduto(produto, data.id);
                  navigation("/carrinho");
                }}
                color="#008000"
                font_color="#ffffff"
                color_hover="#00cc00"
                font_color_hover="#000000"
                color_active="#003300"
                font_color_active="#ffffff"
              >Carrinho</Botao>
              <Botao
                style={{ maxWidth: "290px" }}
                onClick={() => navigation("/")}
                color="#800080"
                font_color="#ffffff"
                color_hover="#ff33ff"
                font_color_hover="#000000"
                color_active="#4d004d"
                font_color_active="#ffffff"
              >Inicio</Botao>
          </div>
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
