import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
`;

const ReseñaList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
`;

const ReseñaItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ReseñaUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const DeleteButton = styled.button`
  background-color: #ff6961;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const ReseñasCuidador = ({ user }) => {
  const [reseñas, setReseñas] = useState([]);
  const [cambios, setCambios] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/resenas/all")
      .then((res) => res.json())
      .then((data) => {
        setReseñas(data.reseñas);
      })
      .catch((error) => console.error("Error:", error));

  }, [cambios]);

  const handleEliminarReseña = (id) => {
    fetch("http://localhost:3000/resenas/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idReseña: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCambios(!cambios);
        }
        alert(data.mensaje);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Container>
      <ReseñaList>
        <h2>Reseñas</h2>
        {reseñas.map((res) => (
          <ReseñaItem key={res.ID_Reseña}>
            <ReseñaUserInfo>
              <p>Calificación: {res.Calificación}</p>
              <p>{res.Nombre + " " + res.Apellido}</p>
              <p>{new Date(res.Fecha).toLocaleDateString()}</p>
            </ReseñaUserInfo>
            <p>{res.Comentario}</p>
            <DeleteButton type="button" onClick={() => handleEliminarReseña(res.ID_Reseña)}>
              Eliminar Reseña
            </DeleteButton>
          </ReseñaItem>
        ))}
      </ReseñaList>
    </Container>
  );
};
