import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { listaProdutos } from "../utils/listaProdutos";
import { formatadorMonetario } from "../utils/formatadores";
import { Botao } from "../components/Botao";
import { Main } from "../components/Main";
import { Imagem, ItemImagem } from "../components/Imagem";
import { ItemBotoes } from "../components/ItemBotoes";
import { CompraContext } from "../context/compra";

export function HomePage() {
  const { state, setState } = useContext(CompraContext);
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
                <ItemDados>
                  <p>{item.nome}</p>
                  <p>{formatadorMonetario(item.preco)}</p>
                </ItemDados>
                <ItemBotoes>
                  <Botao
                  onClick={() => {
                    let buscaItem = state.find((itemBusca) => itemBusca.id === item.id);

                    if (!buscaItem) {
                      setState([...state, {
                        id: item.id,
                        nome: item.nome,
                        imagem: item.imagem,
                        categoria: item.categoria,
                        descricao: item.descricao,
                        preco: item.preco,
                        quantidade: 1,
                        precoQuantidade: item.preco * 1,
                      }]);
                    } else {
                      let itemAtualizado = state.map((itemBusca) => {

                        if (itemBusca.id === item.id) {
                          itemBusca.quantidade = itemBusca.quantidade + 1;
                          itemBusca.precoQuantidade = itemBusca.preco * itemBusca.quantidade;
                        }
                        return itemBusca;
                      });
                      setState(itemAtualizado);
                    }
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

const ItemDados = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;

  p {
    font-size: 20px;
  }
`;
