import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { TarjetaAtenderMascota } from "../Tarjetas/TarjetaAtenderMascota";

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

export const AtenderMascota = () => {

  
  const [lista, setLista] = useState([]);

  useEffect(() => {
    obtenerMascotas();
    console.log("libros alquiler");
    console.log(lista);
  }, []); 
  
  const listado = []

  const obtenerMascotas = () => {
    // obtener el userId del usuario logueado en localStorage
    const local = localStorage.MyLibrary_session;
    const UserID = 2 //JSON.parse(local).UserID;

    fetch("http://localhost:3000/cuidadores/mascotasAsignadas/" + UserID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLista(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>

    <h1>aqui la tarjeta</h1>
    {listado.mascotas.map((pet) => (
        <TarjetaAtenderMascota 
          key={pet.ID_Mascota} 
          nombre={pet.Nombre} />
      ))}


    </Container>
  );
};


/*    
      
      */