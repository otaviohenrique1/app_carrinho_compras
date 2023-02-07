import { Link } from "react-router-dom";
import styled from "styled-components";

interface AppBarProps {
  titulo: string;
}

export function AppBar(props: AppBarProps) {
  const { titulo } = props;

  return (
    <AppBarNav>
      <AppBarH1>{titulo}</AppBarH1>
      <AppBarLink to="/carrinho">Carrinho</AppBarLink>
    </AppBarNav>
  );
}

const AppBarNav = styled.nav`
  padding: 15px 20px;
  background-color: cadetblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppBarH1 = styled.h1`
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
`;

const AppBarLink = styled(Link)`
  padding: 10px;
  border: 1px solid blue;
  border-radius: 8px;
  text-decoration: none;
  background-color: #0000cc;
  color: #ffffff;

  &:hover {
    background-color: lightblue;
    border-color: lightblue;
    color: #000000;
  }

  &:active {
    background-color: darkblue;
    border-color: darkblue;
    color: #ffffff;
  }
`;
