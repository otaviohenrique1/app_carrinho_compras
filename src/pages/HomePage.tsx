import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { listaProdutos } from "../utils/listaProdutos";
import { formatadorMonetario } from "../utils/formatadores";
import { Botao, ItemBotoes } from "../components/Botao";
import { Main } from "../components/Main";
import { Imagem, ItemImagem } from "../components/Imagem";
import { CompraContext } from "../context/compra";
import { ListaItem } from "../components/ListaItem";

export function HomePage() {
  const { state, adicionarProduto } = useContext(CompraContext);
  const navigation = useNavigate();

  useEffect(() => {
    console.log(state);
  }, [state])

  return (
    <>
      <AppBar titulo="HomePage" />
      <Main>
        <ul>
          {listaProdutos.map((item, index) => {
            return (
              <Item key={index}>
                <ItemImagem>
                  <Imagem src={item.imagem[0]} alt={item.nome} />
                </ItemImagem>
                <ItemDadosContainer>
                  <ListaItem
                    label="Nome:"
                    data={item.nome}
                    fontSize="18px"
                  />
                  <ListaItem
                    label="Preço unidade:"
                    data={formatadorMonetario(item.preco)}
                    fontSize="18px"
                  />
                </ItemDadosContainer>
                <ItemBotoes>
                  <Botao
                    onClick={() => {
                      let data = {
                        ...item,
                        quantidade: 1,
                        precoQuantidade: item.preco * 1,
                      };
                      adicionarProduto(data, item.id);
                    }}
                    color="#008000"
                    font_color="#ffffff"
                    color_hover="#00cc00"
                    font_color_hover="#000000"
                    color_active="#003300"
                    font_color_active="#ffffff"
                  >Carrinho</Botao>
                  <Botao
                    onClick={() => navigation(`/produtos/${item.id}`)}
                    color="#800080"
                    font_color="#ffffff"
                    color_hover="#ff33ff"
                    font_color_hover="#000000"
                    color_active="#4d004d"
                    font_color_active="#ffffff"
                  >Detalhes</Botao>
                </ItemBotoes>
              </Item>
            );
          })}
        </ul>
      </Main>
    </>
  );
}

const Item = styled.li`
  padding: 5px;
  margin-bottom: 10px;
  background-color: #b3ffec;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`;

const ItemDadosContainer = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;
