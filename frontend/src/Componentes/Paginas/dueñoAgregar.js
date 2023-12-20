import React, { useState } from 'react';
import styled from 'styled-components';

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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
  }

  input,
  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #44a08d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const DueñoAgregar = ({ user }) => {
  const [nuevaMascota, setNuevaMascota] = useState({
    Nombre: '',
    Edad: '',
    Especie: 'Perro',
    Raza: '',
    Comportamiento: '',
    Contacto_Veterinario: '',
    Comentarios_Extra: '',
    ID_Usuario: user.ID_Usuario,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaMascota((prevMascota) => ({ ...prevMascota, [name]: value }));
  };

  const AgregarMascota = () => {
    fetch('http://localhost:3000/mascotas/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nuevaMascota.Nombre,
        edad: nuevaMascota.Edad,
        especie: nuevaMascota.Especie,
        raza: nuevaMascota.Raza,
        comportamiento: nuevaMascota.Comportamiento,
        contactoVeterinario: nuevaMascota.Contacto_Veterinario,
        comentariosExtra: nuevaMascota.Comentarios_Extra,
        idUsuario: nuevaMascota.ID_Usuario,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success){
          setNuevaMascota({
            Nombre: '',
            Edad: '',
            Especie: 'Perro',
            Raza: '',
            Comportamiento: '',
            Contacto_Veterinario: '',
            Comentarios_Extra: '',
            ID_Usuario: user.ID_Usuario,
          });
        }
        alert(data.mensaje);
      });
  };

  return (
    <Container>
      <FormContainer>
        <Form>
          <FormGroup>
            <label>Nombre de mascota:</label>
            <input type="text" name="Nombre" value={nuevaMascota.Nombre} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Edad (en años):</label>
            <input type="number" name="Edad" value={nuevaMascota.Edad} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Especie:</label>
            <select name="Especie" value={nuevaMascota.Especie} onChange={handleInputChange}>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label>Raza:</label>
            <input type="text" name="Raza" value={nuevaMascota.Raza} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Comportamiento:</label>
            <textarea rows="4" name="Comportamiento" value={nuevaMascota.Comportamiento} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Contacto del veterinario:</label>
            <input type="text" name="Contacto_Veterinario" value={nuevaMascota.Contacto_Veterinario} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Comentarios extra:</label>
            <textarea rows="4" name="Comentarios_Extra" value={nuevaMascota.Comentarios_Extra} onChange={handleInputChange} />
          </FormGroup>
          <SubmitButton type="button" onClick={AgregarMascota}>Registrar Mascota</SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
};