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
                  <button>+ Carrinho</button>
                  <button>Ver Detalhes</button>
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
  background-color: coral;
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
`;
