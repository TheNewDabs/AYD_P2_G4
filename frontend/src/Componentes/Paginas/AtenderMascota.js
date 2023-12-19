import React from "react";
import styled from "styled-components";
import { TarjetaAtenderMascota } from "../Tarjetas/TarjetaAtenderMascota";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
`;

const FormContainer = styled.div`
  justify-content: space-around;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 10px;
`;

const Form = styled.form`
  background-color: #fff;
  top-margin: 20px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const AtenderMascota = () => {
  return (
    <Container>
      <TarjetaAtenderMascota />
    </Container>
  );
};
