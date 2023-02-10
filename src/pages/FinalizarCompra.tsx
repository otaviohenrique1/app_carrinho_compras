import { FormikHelpers } from "formik/dist/types";
import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Formik, Form } from "formik";
import { Radio } from "../components/Radio";
import { Botao } from "../components/Botao";
import styled from "styled-components";
import { formatadorMonetario } from "../utils/formatadores";
import { ModalAviso, ModalFinalizarCompra, ModalMensagem } from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CompraContext } from "../context/compra";
import { ListaItem } from "../components/ListaItem";
import { listaMetodosPagamento } from "../utils/listas";
import { valoresIniciaisUmMetodoPagamento } from "../utils/constantes";

interface FormTypes {
  metodo_pagamento: string;
}

const initialValues: FormTypes = {
  metodo_pagamento: '',
};

export function FinalizarCompra() {
  const { valorTotal, limparLista, state } = useContext(CompraContext);

  const navigation = useNavigate();

  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    if (values.metodo_pagamento === "") {
      ModalMensagem({
        titulo: "Aviso",
        mensagem: "Adicione um metodo de pagamento para poder continuar!",
      });
    } else if (state.length === 0) {
      ModalMensagem({
        titulo: "Aviso",
        mensagem: "Adicione um produto para poder continuar!",
      });
    } else {
      let metodoPagamentoEscolhido = buscaNaListaMetodoPagamento(values.metodo_pagamento)

      ModalFinalizarCompra({
        metodoPagamento: metodoPagamentoEscolhido.label,
        valorTotalCompra: formatadorMonetario(valorTotal)
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          limparLista();
          navigation("/");
        }
      });
    }
  }

  function buscaNaListaMetodoPagamento(metodo_pagamento: string) {
    let metodoPagamento = listaMetodosPagamento.find((item) => item.value === metodo_pagamento);
    let validaPagamento = (typeof metodoPagamento === "undefined") ? valoresIniciaisUmMetodoPagamento : metodoPagamento;
    return validaPagamento;
  }

  return (
    <>
      <AppBar titulo="Finalizar Compra" />
      <Main>
        <FormContainer>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              let metodoEscolhido = buscaNaListaMetodoPagamento(values.metodo_pagamento);
              const metodoEscolhidovalidado = (values.metodo_pagamento) ? metodoEscolhido.label : "----";

              return (
                <FormStylded>
                  <ValorTotalContainer>
                    <ListaItem
                      label="Total:"
                      data={formatadorMonetario(valorTotal)}
                      fontSize="25px"
                    />
                  </ValorTotalContainer>
                  <SubTitulo>Métodos de pagamento</SubTitulo>
                  <MetodoEscolhido>
                    <ListaItem
                      label="Metodo escolhido:"
                      data={metodoEscolhidovalidado}
                      fontSize=""
                    />
                  </MetodoEscolhido>
                  <RadioGroup
                    role="group"
                    aria-labelledby="radio-group-pagamento"
                  >
                    {listaMetodosPagamento.map((item, index) => {
                      return (
                        <Radio
                          key={index}
                          name="metodo_pagamento"
                          id={item.value}
                          value={item.value}
                          label={item.label}
                        />
                      );
                    })}
                  </RadioGroup>
                  <ContainerBotao>
                    <Botao
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
                      type="submit"
                      color="#800080"
                      font_color="#ffffff"
                      color_hover="#ff33ff"
                      font_color_hover="#000000"
                      color_active="#4d004d"
                      font_color_active="#ffffff"
                    >Finalizar</Botao>
                    <Botao
                      onClick={() => {
                        ModalAviso({
                          titulo: "Aviso",
                          mensagem: "Deseja cancelar a compra?",
                        }).then(({ isConfirmed }) => {
                          if (isConfirmed) {
                            limparLista();
                            navigation("/");
                          }
                        });
                      }}
                      type="button"
                      disabled={(state.length === 0) ? true : false}
                      color="#ff0000"
                      font_color="#ffffff"
                      color_hover="#ff8080"
                      font_color_hover="#000000"
                      color_active="#800000"
                      font_color_active="#ffffff"
                    >Cancelar</Botao>
                  </ContainerBotao>
                </FormStylded>
              );
            }}
          </Formik>
        </FormContainer>
      </Main>
    </>
  );
}

const ContainerBotao = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const MetodoEscolhido = styled.div`
  border: 1px solid black;
  padding: 5px;
  display: flex;
  justify-content: center;
`;

const SubTitulo = styled.h2`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const ValorTotalContainer = styled.div`
  margin-top: 25px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FormStylded = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 600px;
`;

const RadioGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;
