import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Botao } from "../components/Botao";
import styled from "styled-components";
import { formatadorMonetario } from "../utils/formatadores";
import { listaProdutos } from "../utils/listaProdutos";
import { Imagem, ItemImagem } from "../components/Imagem";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function CarrinhoCompras() {
  const SwalModal = withReactContent(Swal);
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
            onClick={() => {
              navigation("/");
            }}
            color="#008000"
            font_color="#ffffff"
            color_hover="#00cc00"
            font_color_hover="#000000"
            color_active="#003300"
            font_color_active="#ffffff"
          >Continuar comprando</BotaoStyled>
          <BotaoStyled
            onClick={() => {
              navigation("/finalizar");
            }}
            color="#800080"
            font_color="#ffffff"
            color_hover="#ff33ff"
            font_color_hover="#000000"
            color_active="#4d004d"
            font_color_active="#ffffff"
          >Finalizar</BotaoStyled>
          <BotaoStyled
            onClick={() => {
              SwalModal.fire({
                icon: "warning",
                title: <p>Aviso</p>,
                html: <div>
                  <p>Deseja cancelar a compra?</p>
                  <p>A lista de produtos sera esvaziada.</p>
                </div>,
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                confirmButtonColor: "blue",
                cancelButtonColor: "red"
              }).then(({ isConfirmed }) => {
                if (isConfirmed) {
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
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {listaCarrinhoCompras.map((item, index) => {
              return (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    backgroundColor: "coral",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 10
                  }}
                >
                  <ItemImagem>
                    <Imagem
                      style={{ width: 150 }}
                      src={item.imagem[0]}
                      alt={item.nome}
                    />
                  </ItemImagem>
                  <ItemDados>
                    <p>{item.nome}</p>
                    <p>{formatadorMonetario(item.preco)}</p>
                  </ItemDados>
                </li>
              );
            })}
          </ul>
        </div>
      </MainStyled>
    </>
  );
}

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