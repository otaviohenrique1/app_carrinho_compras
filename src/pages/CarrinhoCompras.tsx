import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Botao } from "../components/Botao";
import { formatadorMonetario } from "../utils/formatadores";
import { Imagem, ItemImagem } from "../components/Imagem";
import { useNavigate } from "react-router-dom";
import { ModalAviso, ModalQuantidade } from "../components/Modal";
import { ItemBotoes } from "../components/ItemBotoes";
import { CarrinhoProdutoTypes, CompraContext, valoresIniciaisUmProduto } from "../context/compra";
import Swal from 'sweetalert2';

export function CarrinhoCompras() {
  const navigation = useNavigate();

  const { state, setState, valorTotal, limparLista } = useContext(CompraContext);

  const [lista, setLista] = useState<CarrinhoProdutoTypes[]>([]);

  useEffect(() => {
    setLista(state);
  }, [state]);

  return (
    <>
      <AppBar titulo="Carrinho" />
      <MainStyled>
        <PrecoTotal>
          <span>Total:</span>
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
                  limparLista();
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
                          preConfirm: (value: number) => {
                            if (!value) {
                              Swal.showValidationMessage("Campo vazio");
                            }
                          },
                        }).then(({ isConfirmed, value }) => {
                          if (isConfirmed) {
                            let novaQuantidade = parseInt(typeof value === "undefined" ? "" : value);

                            let itemAtualizado = state.map((itemBusca) => {
                              if (itemBusca.id === item.id) {
                                itemBusca.quantidade = itemBusca.quantidade + novaQuantidade;
                                itemBusca.precoQuantidade = itemBusca.preco * itemBusca.quantidade;
                              }
                              return itemBusca;
                            });
                            setState(itemAtualizado);
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
                          preConfirm: (value) => {                            
                            if (!value) {
                              Swal.showValidationMessage("Campo vazio");
                            }
                            
                            let novaQuantidade = parseInt(typeof value === "undefined" ? "" : value);
                            let buscaItem = state.find((itemBusca) => itemBusca.id === item.id);
                            let validaBuscaItem = (typeof buscaItem === "undefined") ? valoresIniciaisUmProduto : buscaItem;
                            
                            if (novaQuantidade > validaBuscaItem.quantidade) {
                              Swal.showValidationMessage("Valor invalido");
                            }
                          },
                        }).then(({ isConfirmed, value }) => {
                          
                          if (isConfirmed) {
                            let novaQuantidade = parseInt(typeof value === "undefined" ? "" : value);

                            let itemAtualizado = state.map((itemBusca) => {
                              if (itemBusca.id === item.id) {
                                itemBusca.quantidade = itemBusca.quantidade - novaQuantidade;
                                itemBusca.precoQuantidade = itemBusca.preco * itemBusca.quantidade;
                              }
                              return itemBusca;
                            });
                            setState(itemAtualizado);
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
                            let listaAtualizada = state.filter((itemBusca) => itemBusca.id !== item.id);
                            setState(listaAtualizada);
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