import { useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { useEffect, useState } from "react";
import { ListaProdutosTypes, listaProdutos } from "../utils/listaProdutos";
import { Main } from "../components/Main";
import { formatadorMonetario } from "../utils/formatadores";
import styled from "styled-components";
import { Galeria } from "../components/Galeria";

const dadosIniciais: ListaProdutosTypes = {
  id: 0,
  nome: "",
  preco: 0,
  categoria: "",
  descricao: "",
  imagem: []
};

export function DetalhesProduto() {
  const { id } = useParams();
  const [data, setData] = useState<ListaProdutosTypes>(dadosIniciais);

  useEffect(() => {
    const id_validado = (typeof id === "undefined") ? 0 : parseInt(id);
    let resultado = listaProdutos.find((item) => item.id === id_validado);
    let resultado_validado = (typeof resultado === "undefined") ? dadosIniciais : resultado;
    setData(resultado_validado);
  }, [id]);

  return (
    <>
      <AppBar titulo="DetalhesProduto" />
      <Main>
        <DetalhesLista>
          <li>
            <span>ID:</span>
            <span>{data.id}</span>
          </li>
          <li>
            <span>Nome:</span>
            <span>{data.nome}</span>
          </li>
          <li>
            <span>Preço:</span>
            <span>{formatadorMonetario(data.preco)}</span>
          </li>
          <li>
            <span>Categoria:</span>
            <span>{data.categoria}</span>
          </li>
          <li>
            <span>Descrição:</span>
            <span>{data.descricao}</span>
          </li>
          <li>
            <div>
              {/* <Galeria2 lista_imagens_url={data.imagem}/> */}
              <Galeria lista_imagens_url={data.imagem}/>
              {/* <Galeria>
                {data.imagem.map((item, index) => {
                  return (
                    <Imagem src={item} alt={`Imagem-${index}`} />
                  );
                })}
              </Galeria> */}
            </div>
          </li>
        </DetalhesLista>
      </Main>
    </>
  );
}

const DetalhesLista = styled.ul`
  /* li:nth-child(n+1):nth-child(-n+5) {
    margin-bottom: 10px;
  } */

  span:first-child {
    font-weight: bold;
    margin-right: 5px;
  }

  span:last-child {
    text-align: justify;
  }

  li {
    margin-bottom: 10px;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

// const Galeria = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   gap: 5px;
// `;