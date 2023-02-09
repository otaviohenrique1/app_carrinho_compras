import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Botao, ItemBotoes } from "../components/Botao";
import { formatadorMonetario } from "../utils/formatadores";
import { Imagem, ItemImagem } from "../components/Imagem";
import { useNavigate } from "react-router-dom";
import { ModalAviso, ModalQuantidade } from "../components/Modal";
import { CarrinhoProdutoTypes, CompraContext, valoresIniciaisUmProduto } from "../context/compra";
import Swal from 'sweetalert2';

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
            {
              (lista.length === 0)
                ? <ListaVazia>
                  <p>Lista vazia</p>
                </ListaVazia>
                : lista.map((item, index) => {
                  return (
                    <CarrinhoListaItem key={index}>
                      <ItemImagem>
                        <ImagemStyled
                          src={item.imagem[0]}
                          alt={item.nome}
                        />
                      </ItemImagem>
                      <ItemDadosContainer>
                        <ItemDados>
                          <span>Nome:</span>
                          <span>{item.nome}</span>
                        </ItemDados>
                        <ItemDados>
                          <span>Preço unidade:</span>
                          <span>{formatadorMonetario(item.preco)}</span>
                        </ItemDados>
                        <ItemDados>
                          <span>Quantidade:</span>
                          <span>{item.quantidade}</span>
                        </ItemDados>
                        <ItemDados>
                          <span>Preco X Quantidade:</span>
                          <span>{formatadorMonetario(item.precoQuantidade)}</span>
                        </ItemDados>
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

const ListaVazia = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: coral;
  padding: 10px;
  border-radius: 10px;
  height: 100px;
  
  p {
    font-size: 30px;
  }
`;

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

const ItemDadosContainer = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const ItemDados = styled.p`
  font-size: 18px;

  span:first-child {
    font-weight: bold;
    margin-right: 5px;
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