import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Botao, ItemBotoes } from "../components/Botao";
import { formatadorMonetario } from "../utils/formatadores";
import { Imagem, ItemImagem } from "../components/Imagem";
import { useNavigate } from "react-router-dom";
import { ModalAviso, ModalMensagem, ModalQuantidade } from "../components/Modal";
import { CarrinhoProdutoTypes, CompraContext } from "../context/compra";
import Swal from 'sweetalert2';
import { ListaVazia } from "../components/ListaVazia";
import { ListaItem } from "../components/ListaItem";
import { valoresIniciaisUmProduto } from "../utils/constantes";

export function CarrinhoCompras() {
  const navigation = useNavigate();

  const { state, valorTotal, limparLista, removerProduto, adicionarQuantidade, removerQuantidade } = useContext(CompraContext);

  const [lista, setLista] = useState<CarrinhoProdutoTypes[]>([]);

  useEffect(() => {
    setLista(state);
  }, [state]);

  return (
    <>
      <AppBar titulo="Carrinho" />
      <MainStyled>
        <ListaItem
          label="Total:"
          data={formatadorMonetario(valorTotal)}
          fontSize="20px"
        />
        <ContainerBotoes>
          <BotaoStyled
            type="button"
            onClick={() => navigation("/")}
            color="#008000"
            font_color="#ffffff"
            color_hover="#00cc00"
            font_color_hover="#000000"
            color_active="#003300"
            font_color_active="#ffffff"
          >Continuar comprando</BotaoStyled>
          <BotaoStyled
            type="button"
            onClick={() => {
              if (state.length === 0) {
                ModalMensagem({
                  titulo: "Aviso",
                  mensagem: "Adicione um produto para poder continuar!",
                });
              } else {
                navigation("/finalizar");
              }
            }}
            color="#800080"
            font_color="#ffffff"
            color_hover="#ff33ff"
            font_color_hover="#000000"
            color_active="#4d004d"
            font_color_active="#ffffff"
          >Finalizar</BotaoStyled>
          <BotaoStyled
            type="button"
            onClick={() => {
              if (state.length === 0) {
                ModalMensagem({
                  titulo: "Aviso",
                  mensagem: "Adicione um produto para poder continuar!",
                });
              } else {
                ModalAviso({
                  titulo: "Aviso",
                  mensagem: "Deseja cancelar a compra?",
                }).then(({ isConfirmed }) => {
                  if (isConfirmed) {
                    limparLista();
                    navigation("/");
                  }
                });
              }
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
            {
              (lista.length === 0)
                ? <ListaVazia>
                  <p>Lista vazia</p>
                </ListaVazia>
                : lista.map((item, index) => {
                  return (
                    <CarrinhoListaItem key={index}>
                      <ItemImagem>
                        <Imagem
                          src={item.imagem[0]}
                          alt={item.nome}
                        />
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
                        <ListaItem
                          label="Quantidade:"
                          data={item.quantidade}
                          fontSize="18px"
                        />
                        <ListaItem
                          label="Preco X Quantidade:"
                          data={formatadorMonetario(item.precoQuantidade)}
                          fontSize="18px"
                        />
                      </ItemDadosContainer>
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
                                adicionarQuantidade(item.id, novaQuantidade);
                              }
                            });
                          }}
                          type="button"
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

                                let novaQuantidade = parseInt(value);
                                let buscaItem = state.find((itemBusca) => itemBusca.id === item.id);
                                let validaBuscaItem = (typeof buscaItem === "undefined") ? valoresIniciaisUmProduto : buscaItem;
                                if (novaQuantidade > validaBuscaItem.quantidade) {
                                  Swal.showValidationMessage("Valor invalido");
                                }
                              },
                            }).then(({ isConfirmed, value }) => {
                              if (isConfirmed) {
                                let novaQuantidade = parseInt(typeof value === "undefined" ? "" : value);
                                removerQuantidade(item.id, novaQuantidade);
                                if (item.quantidade === 0) {
                                  removerProduto(item.id);
                                }
                              }
                            });
                          }}
                          type="button"
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
                                removerProduto(item.id);
                              }
                            });
                          }}
                          type="button"
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

const ItemDadosContainer = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const MainStyled = styled(Main)`
  display: flex;
  flex-direction: column;
  gap: 15px;
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