import styled from "styled-components";

export interface BotaoStyleProps {
  color: string;
  font_color: string;
  color_hover: string;
  font_color_hover: string;
  color_active: string;
  font_color_active: string;
}

export const Botao = styled.button<BotaoStyleProps>`
  padding: 10px;
  border: 1px solid ${(props) => props.color};
  border-radius: 5px;
  background-color: ${(props) => props.color};
  color: ${(props) => props.font_color};
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.color_hover};
    border-color: ${(props) => props.color_hover};
    color: ${(props) => props.font_color_hover};
  }

  &:active {
    background-color: ${(props) => props.color_active};
    border-color: ${(props) => props.color_active};
    color: ${(props) => props.font_color_active};
  }
`;