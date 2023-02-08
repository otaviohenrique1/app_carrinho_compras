import { FormikHelpers } from "formik/dist/types";
import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Formik, Form } from "formik";
import { Radio } from "../components/Radio";
import { Botao } from "../components/Botao";
import styled from "styled-components";
import { formatadorMonetario } from "../utils/formatadores";

interface FormTypes {
  metodo_pagamento: string;
}

const initialValues: FormTypes = {
  metodo_pagamento: '',
};

export function FinalizarCompra() {
  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    // 
  }

  const total = 100;

  return (
    <>
      <AppBar titulo="Finalizar Compra" />
      <Main>
        <div style={{ marginBottom: "25px", marginTop: "25px", }}>
          <SubTitulo>
            <span style={{ marginRight: "10px" }}>Total:</span>
            <span style={{ fontWeight: "normal" }}>{formatadorMonetario(total)}</span>
          </SubTitulo>
        </div>
        <FormContainer>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <FormStylded>
                  <SubTitulo>Metodos de pagamento</SubTitulo>
                  <p style={{
                    border: "1px solid black",
                    padding: "5px",
                    textAlign: "center",
                  }}>
                    <span style={{ 
                      fontWeight: "bold",
                      marginRight: "10px"
                    }}>Metodo escolhido:</span>
                    <span>{(values.metodo_pagamento) ? values.metodo_pagamento : "----"}</span>
                  </p>
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
                  <Botao
                    type="submit"
                    color="#800080"
                    font_color="#ffffff"
                    color_hover="#ff33ff"
                    font_color_hover="#000000"
                    color_active="#4d004d"
                    font_color_active="#ffffff"
                  >Finalizar</Botao>
                </FormStylded>
              );
            }}
          </Formik>
        </FormContainer>
      </Main>
    </>
  );
}

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

const SubTitulo = styled.h2`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;
