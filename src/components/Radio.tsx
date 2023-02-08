import { Field } from "formik";
import { ReactNode } from "react";
import styled from "styled-components";

export interface RadioProps {
  id: string;
  name: string;
  label: ReactNode;
  value: string | number | readonly string[];
}

export function Radio(props: RadioProps) {
  const { id, name, label, value } = props;

  return (
    <RadioContainer>
      <Field
        type="radio"
        id={id}
        name={name}
        value={value}
      />
      <span>{label}</span>
    </RadioContainer>
  );
}

const RadioContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 15px 10px;
  background-color: #d3d3d3;

  input[type="radio"] {
    margin-top: 0;
  }
`;

/*
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
  border: 1px solid black;
  border-radius: 8px;
  padding: 15px 10px;

  input[type="radio"] {
    margin-top: 0;
  }
`;
*/
