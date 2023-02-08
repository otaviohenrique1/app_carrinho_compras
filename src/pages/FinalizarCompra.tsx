import { FormikHelpers } from "formik/dist/types";
import { AppBar } from "../components/AppBar";
import { Main } from "../components/Main";
import { Formik, Form } from "formik";
import { Radio } from "../components/Radio";
import { Botao } from "../components/Botao";

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

  return (
    <>
      <AppBar titulo="FinalizarCompra" />
      <Main>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px"
                  }}
                >
                  <h1>Metodos de pagamento</h1>
                  <div
                    role="group"
                    aria-labelledby="radio-group-pagamento"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px"
                    }}
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
                      value="credito_loja"
                      label={"Credito na loja"}
                    />
                    <Radio
                      name="metodo_pagamento"
                      id="transferencia"
                      value="transferencia"
                      label={"Transferencia bancaria"}
                    />
                  </div>
                  <Botao
                    type="submit"
                    color="#800080"
                    font_color="#ffffff"
                    color_hover="#ff33ff"
                    font_color_hover="#000000"
                    color_active="#4d004d"
                    font_color_active="#ffffff"
                  >Finalizar</Botao>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Main>
    </>
  );
}
