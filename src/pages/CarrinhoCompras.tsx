import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Botao } from "../components/Botao";
import { formatadorMonetario } from "../utils/formatadores";
// import { listaProdutos } from "../utils/listaProdutos";
import { Imagem, ItemImagem } from "../components/Imagem";
import { useNavigate } from "react-router-dom";
import { ModalAviso, ModalQuantidade } from "../components/Modal";
import { ItemBotoes } from "../components/ItemBotoes";
import { CarrinhoProdutoTypes, CompraContext } from "../context/compra";

export function CarrinhoCompras() {
  const navigation = useNavigate();

  const { state, /* setState, */ valorTotal } = useContext(CompraContext);

  // const [numeroQuantidade, setNumeroQuantidade] = useState(10);
  const [lista, setLista] = useState<CarrinhoProdutoTypes[]>([]);

  // const listaCarrinhoCompras = [
  //   listaProdutos[0],
  //   listaProdutos[1],
  //   listaProdutos[2],
  //   listaProdutos[3],
  //   listaProdutos[4],
  //   listaProdutos[5],
  // ];

  useEffect(() => {
    setLista(state);
  }, [state]);


  return (
    <>
      <AppBar titulo="Carrinho" />
      <MainStyled>
        <PrecoTotal>
          <span>Total:</span>
          {/* <span>{formatadorMonetario(listaCarrinhoCompras.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.preco;
          }, 0))}</span> */}
          <span>{formatadorMonetario(valorTotal)}</span>
        </PrecoTotal>
        <ContainerBotoes>
          <BotaoStyled
            onClick={() => navigation("/")}
            color="#008000"
            font_color="#ffffff"
            color_hover="#00cc00"
            font_color_hover="#000000"
            color_active="#003300"
            font_color_active="#ffffff"
          >Continuar comprando</BotaoStyled>
          <BotaoStyled
            onClick={() => navigation("/finalizar")}
            color="#800080"
            font_color="#ffffff"
            color_hover="#ff33ff"
            font_color_hover="#000000"
            color_active="#4d004d"
            font_color_active="#ffffff"
          >Finalizar</BotaoStyled>
          <BotaoStyled
            onClick={() => {
              ModalAviso({
                titulo: "Aviso",
                mensagem: "Deseja cancelar a compra?",
              }).then(({ isConfirmed }) => {
                if (isConfirmed) {
                  /* Logica que limpa o carrinho de compras */
                  navigation("/");
                }
              })
            }}
            color="#ff0000"
            font_color="#ffffff"
            color_hover="#ff8080"
            font_color_hover="#000000"
            color_active="#800000"
            font_color_active="#ffffff"
          >Cancelar</BotaoStyled>
        </ContainerBotoes>
        <div>
          <CarrinhoLista>
            {lista.map((item, index) => {
              return (
                <CarrinhoListaItem key={index}>
                  <ItemImagem>
                    <ImagemStyled
                      src={item.imagem[0]}
                      alt={item.nome}
                    />
                  </ItemImagem>
                  <ItemDados>
                    <p>{item.nome}</p>
                    <p>{formatadorMonetario(item.preco)}</p>
                    <p>{formatadorMonetario(item.precoQuantidade)}</p>
                    <p>
                      <span style={{
                        fontWeight: "bold",
                        marginRight: "5px",
                      }}>Quantidade:</span>
                      <span>{item.quantidade}</span>
                    </p>
                  </ItemDados>
                  <ItemBotoes>
                    <Botao
                      onClick={() => {
                        ModalQuantidade({
                          titulo: "Quantidade",
                          mensagem: "Quanto o valor que você quer adicionar?",
                        }).then(({ isConfirmed, value }) => {
                          if (isConfirmed) {
                            let valor = parseInt(value);
                            console.log(valor);

                            // let validaValor = (isNaN(valor)) ? 1 : valor;
                            // setNumeroQuantidade(validaValor);
                            /* Logica de alterar o valor da quantidade do produto no carrinho de compras */
                          }
                        });
                      }}
                      color="#800080"
                      font_color="#ffffff"
                      color_hover="#ff33ff"
                      font_color_hover="#000000"
                      color_active="#4d004d"
                      font_color_active="#ffffff"
                    >Adicionar</Botao>
                    <Botao
                      onClick={() => {
                        ModalQuantidade({
                          titulo: "Quantidade",
                          mensagem: "Quanto o valor que você quer remover?",
                        }).then(({ isConfirmed, value }) => {
                          if (isConfirmed) {
                            let valor = parseInt(value);
                            console.log(valor);

                            // let validaValor = (isNaN(valor)) ? 1 : valor;
                            // setNumeroQuantidade(validaValor);
                            /* Logica de alterar o valor da quantidade do produto no carrinho de compras */
                          }
                        });
                      }}
                      color="#ffa500"
                      font_color="#ffffff"
                      color_hover="#ffd280"
                      font_color_hover="#000000"
                      color_active="#805300"
                      font_color_active="#ffffff"
                    >Remover</Botao>
                    <Botao
                      onClick={() => {
                        ModalAviso({
                          titulo: "Aviso",
                          mensagem: "Deseja remover o produto?",
                        }).then(({ isConfirmed }) => {
                          if (isConfirmed) {
                            /* Logica que remove o produto do carrinho de compras */
                          }
                        });
                      }}
                      color="#ff0000"
                      font_color="#ffffff"
                      color_hover="#ff8080"
                      font_color_hover="#000000"
                      color_active="#800000"
                      font_color_active="#ffffff"
                    >Excluir</Botao>
                  </ItemBotoes>
                </CarrinhoListaItem>
              );
            })}
          </CarrinhoLista>
        </div>
      </MainStyled>
    </>
  );
}

const ImagemStyled = styled(Imagem)`
  width: 150px;
`;

const CarrinhoLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CarrinhoListaItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 10px;
  background-color: coral;
  padding: 10px;
  border-radius: 10px;
`;

const ItemDados = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  p {
    font-size: 20px;
  }
`;

const MainStyled = styled(Main)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PrecoTotal = styled.p`
  font-size: 20px;

  span:first-child {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const BotaoStyled = styled(Botao)`
  width: 100%;
  max-width: 200px;
`;