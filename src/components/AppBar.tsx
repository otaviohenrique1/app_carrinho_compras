import { Link } from "react-router-dom";
import styled from "styled-components";
import { Botao } from "./Botao";

interface AppBarProps {
  titulo: string;
}

export function AppBar(props: AppBarProps) {
  const { titulo } = props;

  return (
    <AppBarNav>
      <AppBarH1>{titulo}</AppBarH1>
      <Link to="/carrinho">
        <Botao
          color="#0000cc"
          font_color="#ffffff"
          color_hover="#add8e6"
          font_color_hover="#000000"
          color_active="#00008b"
          font_color_active="#ffffff"
        >Carrinho</Botao>
      </Link>
    </AppBarNav>
  );
}

const AppBarNav = styled.nav`
  padding: 15px 20px;
  background-color: #5f9ea0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppBarH1 = styled.h1`
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
`;
