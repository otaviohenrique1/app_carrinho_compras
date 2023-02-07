import styled from "styled-components";
import { AppBar } from "../components/AppBar";
import { listaProdutos } from "../utils/listaProdutos";
import { formatadorMonetario } from "../utils/formatadores";

export function HomePage() {
  return (
    <>
      <AppBar titulo="HomePage" />
      <Main>
        <ul>
          {listaProdutos.map((item, index) => {
            return (
              <Item key={index}>
                <ItemImagem src={item.imagem[0]} alt={item.nome} />
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
                  >+ Carrinho</Botao>
                  <Botao
                    color="#800080"
                    font_color="#ffffff"
                    color_hover="#ff33ff"
                    font_color_hover="#000000"
                    color_active="#4d004d"
                    font_color_active="#ffffff"
                  >Ver Detalhes</Botao>
                </ItemBotoes>
              </Item>
            );
          })}
        </ul>
      </Main>
    </>
  );
}

const Main = styled.main`
  padding: 15px 25px;
`;

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

const ItemImagem = styled.img`
  width: 100%;
  max-width: 20rem;
`;

const ItemDados = styled.div`
  padding: 0 10px;
  /* display: flex;
  flex-direction: column; */

  p {
    font-size: 20px;
  }
`;

const ItemBotoes = styled.div`
  /* display: flex;
  flex-direction: column; */
  justify-content: center;
  margin-right: 10px;

  button:first-child {
    margin-bottom: 10px;
  }
`;

interface BotaoStyleProps {
  color: string;
  font_color: string;
  color_hover: string;
  font_color_hover: string;
  color_active: string;
  font_color_active: string;
}

const Botao = styled.button<BotaoStyleProps>`
  padding: 10px;
  border: 1px solid ${(props) => props.color};
  border-radius: 8px;
  background-color: ${(props) => props.color};
  color: ${(props) => props.font_color};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.color_hover};
    border-color: ${(props) => props.color_hover};
    color: ${(props) => props.font_color_hover};
  }

  &:active {
    background-color: ${(props) => props.color_active};
    border-color: ${(props) => props.color_active};
    color: ${(props) => props.font_color_active};
  }
`;

