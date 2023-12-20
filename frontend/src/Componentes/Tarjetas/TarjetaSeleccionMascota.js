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
`;

const Colorbtn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #44a08d;
`;

export const TarjetaSeleccionMascota = ({ nombre}) => {
  return (
    <>
      <Container>
        <FormContainer>
          <Form>

            <h3 className="tarjeta-contenido">Nombre: {nombre}</h3>
            <hr></hr>
            <p className="tarjeta-contenido">Edad: 3</p>
            <p className="tarjeta-contenido">Especie: perro</p>
            <p className="tarjeta-descripcion">Raza: pequines </p>
            <p className="tarjeta-contenido">comportamiento: juegueton </p>
            <p className="tarjeta-contenido">contacto veterinario: 22223333 </p>
            <p className="tarjeta-contenido"> Comentarios_Extra: comentario</p>

            <Colorbtn>
              <button className="btn btn"> Selecion mascota </button>
            </Colorbtn>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};
