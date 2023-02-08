import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styled from "styled-components";

export interface GaleriaProps {
  lista_imagens_url: string[];
}

export function Galeria(props: GaleriaProps) {
  return (
    <GaleriaContainer>
      <CarouselContainer>
        <CarouselStyled infiniteLoop>
          {props.lista_imagens_url.map((item, index) => {
            return (
              <img key={index} src={item} alt={`Imagem_${index}`} />
            );
          })}
        </CarouselStyled>
      </CarouselContainer>
    </GaleriaContainer>
  );
}

const CarouselStyled = styled(Carousel)`
  li.thumb {
    margin-bottom: 0;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const GaleriaContainer = styled.div`
  display: flex;
  justify-content: center;
`;
