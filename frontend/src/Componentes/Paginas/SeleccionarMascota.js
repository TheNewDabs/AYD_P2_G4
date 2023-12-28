import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TarjetaSeleccionMascota } from "../Tarjetas/TarjetaSeleccionMascota";
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
  border-bottom: 1px solid #ccc;
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

export const SeleccionarMascota = ({ user }) => {
  const [listado, setListado] = useState([]);
  const [asignados, setAsignados] = useState([]);
  const [cambios, setCambios] = useState(false);

  const hospedadosNoAsignadas = () => {
    fetch('http://localhost:3000/mascotas/hospedadas')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setListado(data.mascotas);
        }
      })
      .catch((error) => console.error('Error: ', error));
  };

  const hospedadosAsignadas = () => {
    fetch('http://localhost:3000/cuidadores/mascotasAsignadas/' + user.ID_Usuario)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAsignados(data.mascotas);
          if (data.mascotas.length >= 2) {
            setListado([]);
          } else {
            hospedadosNoAsignadas();
          }
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
      {asignados && asignados.length !== 2 ? (
        <>
          <Title>Mascotas sin seleccionar</Title>
          <CardListContainer>
            {listado ? listado.map((pet) => (
              <TarjetaSeleccionMascota key={pet.ID_Mascota} pet={pet} cambios={cambios} setCambios={setCambios} ID_Usuario={user.ID_Usuario} />
            )) : null}
          </CardListContainer>
        </>
      ) : null}
    </Container>
  );
};
