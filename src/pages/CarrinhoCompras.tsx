import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Botao } from "../components/Botao";
import styled from "styled-components";
import { formatadorMonetario } from "../utils/formatadores";

export function CarrinhoCompras() {
  return (
    <>
      <AppBar titulo="CarrinhoCompras" />
      <Main>
        <div>
          <PrecoTotal>
            <span>Total:</span>
            <span>{formatadorMonetario(10)}</span>
          </PrecoTotal>
          <ContainerBotoes>
            <BotaoStyled
              color="#008000"
              font_color="#ffffff"
              color_hover="#00cc00"
              font_color_hover="#000000"
              color_active="#003300"
              font_color_active="#ffffff"
            >Continuar comprando</BotaoStyled>
            <BotaoStyled
              color="#800080"
              font_color="#ffffff"
              color_hover="#ff33ff"
              font_color_hover="#000000"
              color_active="#4d004d"
              font_color_active="#ffffff"
            >Finalizar</BotaoStyled>
            <BotaoStyled
              color="#ff0000"
              font_color="#ffffff"
              color_hover="#ff8080"
              font_color_hover="#000000"
              color_active="#800000"
              font_color_active="#ffffff"
            >Cancelar</BotaoStyled>
          </ContainerBotoes>
        </div>
      </Main>
    </>
  );
}

const PrecoTotal = styled.p`
  font-size: 20px;
  margin-bottom: 15px;

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