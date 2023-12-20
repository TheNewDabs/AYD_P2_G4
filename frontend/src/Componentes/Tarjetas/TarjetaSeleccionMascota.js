import React from "react";
import styled from "styled-components";

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
  width: 350px;
`;

const Colorbtn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #44a08d;
`;

const SelectButton = styled.button`
  color: white;
`

export const TarjetaSeleccionMascota = ({pet}) => {
  return (
    <>
      <Container>
        <FormContainer>
          <Form>
            <h3 className="tarjeta-contenido">Nombre: {pet.Nombre}</h3>
            <hr></hr>
            <p className="tarjeta-contenido">Edad: {pet.Edad}</p>
            <p className="tarjeta-contenido">Especie: {pet.Especie}</p>
            <p className="tarjeta-descripcion">Raza: {pet.Raza}</p>
            <p className="tarjeta-contenido">Comportamiento: {pet.Comportamiento}</p>
            <p className="tarjeta-contenido">Contacto Veterinario: {pet.Contacto_Veterinario}</p>
            <p className="tarjeta-contenido">Comentarios Extra: {pet.Comentarios_Extra}</p>
            <Colorbtn>
              <SelectButton className="btn btn"> Selecion mascota </SelectButton>
            </Colorbtn>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};
