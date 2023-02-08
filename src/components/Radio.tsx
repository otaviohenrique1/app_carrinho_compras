import { Field } from "formik";
import { ReactNode } from "react";
import styled from "styled-components";

export interface RadioProps {
  id: string;
  name: string;
  htmlFor: string;
  label: ReactNode;
  value: string | number | readonly string[];
}

export function Radio(props: RadioProps) {
  const { id, name, htmlFor, label, value } = props;

  return (
    <RadioContainer>
      <label htmlFor={htmlFor}>{label}</label>
      <Field type="radio" name={name} id={id} value={value} />
    </RadioContainer>
  );
}

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  input[type="radio"] {
    margin-top: 0;
  }
`;
