import styled from "styled-components";

export interface ListaItemProps {
  label: string;
  data: string | number;
  fontSize: string;
}

export function ListaItem(props: ListaItemProps) {
  const { label, data, fontSize } = props;

  return (
    <ListaItemStyled fontSize={fontSize}>
      <span>{label}</span>
      <span>{data}</span>
    </ListaItemStyled>
  );
}

interface ListaItemStyledProps {
  fontSize: string;
}

const ListaItemStyled = styled.p<ListaItemStyledProps>`
  font-size: ${(props) => props.fontSize};
  
  span:first-child {
    font-weight: bold;
    margin-right: 5px;
  }

  span:last-child {
    text-align: justify;
  }
`;
