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
  align-items: center;
`;

const MascotaCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  width: 350px;
  background-color: #ffe4b5;

  label {
    margin-bottom: 5px;
  }
`;

const HospedarButton = styled.button`
  background-color: #44a08d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const ReadOnlyInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const ConfirmButton = styled.button`
  background-color: #44a08d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
  margin-right: 5px;
`;

const CancelButton = styled.button`
  background-color: #ff6961;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
`;

const Title = styled.h1`
  text-align: center;
`;

export const DueñoHospedar = ({ user }) => {
  const [mascotas, setMascotas] = useState([]);
  const [mascotasHospedadas, setMascotasHospedadas] = useState([]);
  const [cambios, setCambios] = useState(false);
  const [hospedarId, setHospedarId] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Realiza un fetch para obtener la lista de mascotas disponibles
    fetch('http://localhost:3000/usuarios/mascotasNoHospedadas/' + user.ID_Usuario)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMascotas(data.mascotas);
        }
      })
      .catch((error) => console.error('Error fetching mascotas:', error));
  }, [cambios, user.ID_Usuario]);

  useEffect(() => {
    // Realiza un fetch para obtener la lista de mascotas hospedadas

    fetch('http://localhost:3000/usuarios/mascotasHospedadas/' + user.ID_Usuario)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.mascotas)
          setMascotasHospedadas(data.mascotas);
        }
      })
      .catch((error) => console.error('Error fetching mascotas:', error));
  }, [cambios, user.ID_Usuario]);

  const handleHospedarClick = (idMascota) => {
    setHospedarId(idMascota);
  };

  const handleConfirmClick = () => {
    // Lógica para confirmar hospedaje con fechas startDate y endDate
    fetch(`http://localhost:3000/hospedajes/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idMascota: hospedarId,
        fechaInicio: startDate,
        fechaFin: endDate,
      })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.mensaje);
        setHospedarId(null);
        setStartDate('');
        setEndDate('');
        setCambios(!cambios);
      })
      .catch((error) => {
        alert('Error:', error);
      });
  };

  const handleCancelClick = () => {
    // Cancelar el proceso y volver al estado anterior
    setHospedarId(null);
    setStartDate('');
    setEndDate('');
  };

  return (
    <Container>
      <Title>Mascotas para hospedar</Title>
      <CardContainer>
        {mascotas.map((mascota) => (
          <MascotaCard key={mascota.ID_Mascota}>
            {hospedarId === mascota.ID_Mascota ? (
              <>
                <label>{mascota.Nombre}</label>
                <DateInput type="date" placeholder="Fecha de inicio" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <DateInput type="date" placeholder="Fecha de finalización" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <ConfirmButton onClick={handleConfirmClick}>Confirmar</ConfirmButton>
                <CancelButton onClick={handleCancelClick}>Cancelar</CancelButton>
              </>
            ) : (
              <>
                <label>{mascota.Nombre}</label>
                <ReadOnlyInput type="text" value={`Edad: ${mascota.Edad} años`} readOnly />
                <ReadOnlyInput type="text" value={`Especie: ${mascota.Especie}`} readOnly />
                <ReadOnlyInput type="text" value={`Raza: ${mascota.Raza}`} readOnly />
                <HospedarButton onClick={() => handleHospedarClick(mascota.ID_Mascota)}>
                  Hospedar
                </HospedarButton>
              </>
            )}
          </MascotaCard>
        ))}
      </CardContainer>
      <Title>Mascotas hospedadas</Title>
      <CardContainer>
        {mascotasHospedadas.map((mascota) => (
          <MascotaCard key={mascota.ID_Mascota}>
            <label>{mascota.Nombre}</label>
            <ReadOnlyInput type="text" value={`Edad: ${mascota.Edad} años`} readOnly />
            <ReadOnlyInput type="text" value={`Especie: ${mascota.Especie}`} readOnly />
            <ReadOnlyInput type="text" value={`Raza: ${mascota.Raza}`} readOnly />
            <ReadOnlyInput type="text" value={`Estado: ${mascota.Estado}`} readOnly />
            <label>Devolución</label>
            <ReadOnlyInput type="date" value={mascota.Fecha_Fin ? mascota.Fecha_Fin.slice(0, 10) : ''} readOnly />
          </MascotaCard>
        ))}
      </CardContainer>
    </Container>
  );
};
