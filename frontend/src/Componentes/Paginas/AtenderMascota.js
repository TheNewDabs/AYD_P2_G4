import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TarjetaAtenderMascota } from "../Tarjetas/TarjetaAtenderMascota";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center; // Centrar los elementos en la línea
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 20px;
  height: 100%;
`;

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 20px;
`;

export const AtenderMascota = ({ user }) => {
  const [asignados, setAsignados] = useState([]);
  const [cambios, setCambios] = useState(false);

  const hospedadosAsignadas = () => {
    fetch('http://localhost:3000/cuidadores/mascotasAsignadas/' + user.ID_Usuario)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAsignados(data.mascotas);
        }
      })
      .catch((error) => console.error('Error: ', error));
  };

  useEffect(() => {
    hospedadosAsignadas()
  }, [cambios, user.ID_Usuario]);

  return (
    <Container>
      <Title>Mascotas seleccionadas</Title>
      <TopContainer>
        {asignados && asignados.length === 0 ? (
          <p>No tienes mascotas asignadas</p>
        ) : (
          <>
            {asignados ? asignados.map((pet) => (
              <TarjetaAtenderMascota pet={pet}/>
            )) : null}
          </>
        )}
      </TopContainer>
    </Container>
  );
};