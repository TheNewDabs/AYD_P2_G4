import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
  width: 45%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 10px;
`;

const Form = styled.form`
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Colorbtn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #44a08d;
  color: white;
  border-radius: 4px;
`;

const GuardarButton = styled.button`
  background-color: #44a08d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
`;

export const TarjetaAtenderMascota = ({ pet }) => {
  const [selectedOption, setSelectedOption] = useState(pet.Estado);

  const handleGuardarClick = () => {
    fetch("http://localhost:3000/hospedajes/updateEstado", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nuevoEstado: selectedOption,
        idHospedaje: pet.ID_Hospedaje
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
      })
      .catch((error) => console.error("Error:", error));
  };

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
            <Select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="Pendiente" disabled>Pendiente</option>
              <option value="Comiendo">Comiendo</option>
              <option value="Paseando">Paseando</option>
              <option value="Bañado">Bañado</option>
              <option value="Tomando la siesta">Tomando la siesta</option>
              <option value="Jugando">Jugando</option>
              <option value="Listo para entregar">Listo para entregar</option>
            </Select>
            <Colorbtn>
              <GuardarButton type="button" onClick={handleGuardarClick}>Guardar</GuardarButton>
            </Colorbtn>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};
