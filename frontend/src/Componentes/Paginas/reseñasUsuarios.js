import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
`;

const ReseñaContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ReseñaForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ReseñaInput = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ReseñaEstrellas = styled.div`
  margin-bottom: 10px;
`;

const Estrella = styled.span`
  margin-right: 5px;
  cursor: pointer;
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

export const ReseñasUsuarios = ({ user }) => {
  const [reseñas, setReseñas] = useState([]);
  const [nuevaReseña, setNuevaReseña] = useState({
    comentario: '',
    calificacion: 0,
  });
  const [cambios, setCambios] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/resenas/all")
      .then((res) => res.json())
      .then((data) => {
        setReseñas(data.reseñas);
      })
      .catch((error) => console.error("Error:", error));
    
  }, [cambios]);

  const handleEstrellaClick = (calificacion) => {
    setNuevaReseña({ ...nuevaReseña, calificacion });
  };

  const handleComentarioChange = (e) => {
    setNuevaReseña({ ...nuevaReseña, comentario: e.target.value });
  };

  const handleGuardarReseña = () => {
    fetch("http://localhost:3000/resenas/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario: user.ID_Usuario,
        comentario: nuevaReseña.comentario,
        calificacion: nuevaReseña.calificacion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success){
            setCambios(!cambios);
            setNuevaReseña({ comentario: '', calificacion: 0 });
        }
        alert(data.mensaje);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEliminarReseña = (id) => {
    fetch("http://localhost:3000/resenas/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idReseña: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success){
            setCambios(!cambios);
        }
        alert(data.mensaje);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Container>
      <ReseñaContainer>
        <ReseñaForm onSubmit={handleGuardarReseña}>
          <ReseñaInput
            placeholder="Escribe tu comentario..."
            value={nuevaReseña.comentario}
            onChange={handleComentarioChange}
          />
          <ReseñaEstrellas>
            {[1, 2, 3, 4, 5].map((estrella) => (
              <Estrella key={estrella} onClick={() => handleEstrellaClick(estrella)}>
                {estrella <= nuevaReseña.calificacion ? '★' : '☆'}
              </Estrella>
            ))}
          </ReseñaEstrellas>
          <button type="button" onClick={handleGuardarReseña}>Guardar Reseña</button>
        </ReseñaForm>
      </ReseñaContainer>
      <ReseñaList>
        <h2>Reseñas</h2>
        {reseñas.map((res) => (
          <ReseñaItem key={res.ID_Reseña}>
            <ReseñaUserInfo>
              <p>Calificación: {res.Calificación}</p>
              <p>{res.ID_Usuario === user.ID_Usuario ? 'Tú' : `${res.Nombre + " " + res.Apellido}`}</p>
              <p>{new Date(res.Fecha).toLocaleDateString()}</p>
            </ReseñaUserInfo>
            <p>{res.Comentario}</p>
            {res.ID_Usuario === user.ID_Usuario && (
              <DeleteButton type="button" onClick={() => handleEliminarReseña(res.ID_Reseña)}>
                Eliminar Reseña
              </DeleteButton>
            )}
          </ReseñaItem>
        ))}
      </ReseñaList>
    </Container>
  );
};
