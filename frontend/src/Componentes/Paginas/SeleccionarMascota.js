import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TarjetaSeleccionMascota } from "../Tarjetas/TarjetaSeleccionMascota";

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

export const SeleccionarMascota = () => {
  const [listado, setListado] = useState([]);

  const fetchMascotas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/mascotas/hospedadas`);
      const data = await response.json();
      //console.log(data);
      setListado(data);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  const misMascotas = listado.mascotas;
  console.log(misMascotas);

  const mascotasComponentes =
    listado && listado.mascotas
      ? listado.mascotas.map((pet) => (
          <TarjetaSeleccionMascota key={pet.ID_Mascota} nombre={pet.Nombre} />
        ))
      : null;
  return <Container>{mascotasComponentes}</Container>;
};
