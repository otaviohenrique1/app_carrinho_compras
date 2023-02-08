import styled from "styled-components";
import { AppBar } from "../components/AppBar";
import { listaProdutos } from "../utils/listaProdutos";
import { formatadorMonetario } from "../utils/formatadores";
import { Botao } from "../components/Botao";
import { Link } from "react-router-dom";
import { Main } from "../components/Main";
import { Imagem, ItemImagem } from "../components/Imagem";

export function HomePage() {
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
                <ItemDados>
                  <p>{item.nome}</p>
                  <p>{formatadorMonetario(item.preco)}</p>
                </ItemDados>
                <ItemBotoes>
                  <Botao
                    color="#008000"
                    font_color="#ffffff"
                    color_hover="#00cc00"
                    font_color_hover="#000000"
                    color_active="#003300"
                    font_color_active="#ffffff"
                  >Carrinho</Botao>
                  <Link to={`/produtos/${item.id}`}>
                    <Botao
                      color="#800080"
                      font_color="#ffffff"
                      color_hover="#ff33ff"
                      font_color_hover="#000000"
                      color_active="#4d004d"
                      font_color_active="#ffffff"
                    >Detalhes</Botao>
                  </Link>
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

  div {
    display: flex;
    flex-direction: column;
  }
`;

const ItemDados = styled.div`
  padding: 15px 10px;
  justify-content: center;

  p {
    font-size: 20px;
  }

  p:first-child {
    margin-bottom: 15px;
  }
`;

const ItemBotoes = styled.div`
  justify-content: center;
  margin-right: 10px;
  gap: 5px
`;
