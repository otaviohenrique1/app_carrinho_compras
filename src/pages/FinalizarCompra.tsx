import { FormikHelpers } from "formik/dist/types";
import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Formik, Form } from "formik";
import { Radio } from "../components/Radio";
import { Botao } from "../components/Botao";
import styled from "styled-components";
import { formatadorMonetario } from "../utils/formatadores";
import { ModalAviso, ModalFinalizarCompra } from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CompraContext } from "../context/compra";

interface FormTypes {
  metodo_pagamento: string;
}

const initialValues: FormTypes = {
  metodo_pagamento: '',
};

export function FinalizarCompra() {
  const { valorTotal, limparLista } = useContext(CompraContext);

  const navigation = useNavigate();

  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    ModalFinalizarCompra({
      metodoPagamento: values.metodo_pagamento,
      valorTotalCompra: formatadorMonetario(valorTotal)
    })
    .then(({ isConfirmed }) => {
      if (isConfirmed) {
        limparLista();
        navigation("/");
      }
    })
  }

  return (
    <>
      <AppBar titulo="Finalizar Compra" />
      <Main>
        <ValorTotalContainer>
          <SubTituloStyled>
            <span>Total:</span>
            <span>{formatadorMonetario(valorTotal)}</span>
          </SubTituloStyled>
        </ValorTotalContainer>
        <FormContainer>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              const metodoEscolhido = (values.metodo_pagamento) ? values.metodo_pagamento : "----";

              return (
                <FormStylded>
                  <SubTitulo>Metodos de pagamento</SubTitulo>
                  <MetodoEscolhido>
                    <span>Metodo escolhido:</span>
                    <span>{metodoEscolhido}</span>
                  </MetodoEscolhido>
                  <RadioGroup
                    role="group"
                    aria-labelledby="radio-group-pagamento"
                  >
                    <Radio
                      name="metodo_pagamento"
                      id="cartao"
                      value="cartao"
                      label={"Cartão"}
                    />
                    <Radio
                      name="metodo_pagamento"
                      id="boleto"
                      value="boleto"
                      label={"Boleto"}
                    />
                    <Radio
                      name="metodo_pagamento"
                      id="pix"
                      value="pix"
                      label={"Pix"}
                    />
                    <Radio
                      name="metodo_pagamento"
                      id="paypal"
                      value="paypal"
                      label={"Paypal"}
                    />
                    <Radio
                      name="metodo_pagamento"
                      id="credito_loja"
                      value="credito"
                      label={"Credito na loja"}
                    />
                    <Radio
                      name="metodo_pagamento"
                      id="transferencia"
                      value="transferencia"
                      label={"Transferencia bancaria"}
                    />
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

const MetodoEscolhido = styled.p`
  border: 1px solid black;
  padding: 5px;
  text-align: center;

  span:first-child {
    font-weight: bold;
    margin-right: 10px;
  }
`;

const SubTitulo = styled.h2`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const SubTituloStyled = styled(SubTitulo)`
  span:first-child {
    margin-right: 10px;
  }

  span:last-child {
    font-weight: normal;
  }
`;

const ValorTotalContainer = styled.div`
  margin-bottom: 25px;
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
