import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TarjetaSeleccionMascota } from "../Tarjetas/TarjetaSeleccionMascota";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
`;

export const SeleccionarMascota = () => {
  const [listado, setListado] = useState([]);

  const fetchMascotas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/mascotas/hospedadas`);
      const data = await response.json();
      setListado(data.mascotas);
      console.log(data.mascotas);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  return (
    <Container>
      {listado ? listado.map((pet) => (
        <TarjetaSeleccionMascota key={pet.ID_Mascota} pet={pet} />
      )) : null}
    </Container>
  );
};
