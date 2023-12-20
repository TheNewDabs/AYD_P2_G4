// ClienteHospedar.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
`;

const MascotaCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  width: 200px;
`;

const HospedarButton = styled.button`
  background-color: #44a08d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

export const DueñoHospedar = ({user}) => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    // Realiza un fetch para obtener la lista de mascotas disponibles
    fetch('http://localhost:3000/mascotas/disponibles')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMascotas(data.mascotas);
        }
      })
      .catch((error) => console.error('Error fetching mascotas:', error));
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleHospedarClick = (idMascota) => {
    // Lógica para hospedar la mascota con el ID idMascota
    console.log(`Hospedar mascota con ID ${idMascota}`);
  };

  return (
    <Container>
      <CardContainer>
        {mascotas.map((mascota) => (
          <MascotaCard key={mascota.id}>
            <h3>{mascota.Nombre}</h3>
            <p>Edad: {mascota.Edad} años</p>
            <p>Especie: {mascota.Especie}</p>
            <p>Raza: {mascota.Raza}</p>
            <HospedarButton onClick={() => handleHospedarClick(mascota.id)}>
              Hospedar
            </HospedarButton>
          </MascotaCard>
        ))}
      </CardContainer>
    </Container>
  );
};
