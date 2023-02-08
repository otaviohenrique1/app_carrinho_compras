import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Botao } from "../components/Botao";
import styled from "styled-components";
import { formatadorMonetario } from "../utils/formatadores";
import { listaProdutos } from "../utils/listaProdutos";
import { Imagem, ItemImagem } from "../components/Imagem";
import { useNavigate } from "react-router-dom";
import { ModalAviso } from "../components/Modal";

export function CarrinhoCompras() {
  const navigation = useNavigate();

  const listaCarrinhoCompras = [
    listaProdutos[0],
    listaProdutos[1],
    listaProdutos[2],
    listaProdutos[3],
    listaProdutos[4],
    listaProdutos[5],
  ];

  return (
    <>
      <AppBar titulo="Carrinho" />
      <MainStyled>
        <PrecoTotal>
          <span>Total:</span>
          <span>{formatadorMonetario(listaCarrinhoCompras.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.preco;
          }, 0))}</span>
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
            {listaCarrinhoCompras.map((item, index) => {
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
                  </ItemDados>
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
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: coral;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
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