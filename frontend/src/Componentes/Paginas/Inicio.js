import React, { useState, useEffect } from 'react';
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

export const Inicio = ({ user, setUser }) => {
  const [editUser, setEditUser] = useState(user);
  const [NuevaContraseña, setNuevaContraseña] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevEditUser) => ({ ...prevEditUser, [name]: value }));
  };

  const handleInputChangeNuevaContraseña = (e) => {
    const { value } = e.target;
    setNuevaContraseña(value);
  }

  const Editar = () => {
    var NContraseña = NuevaContraseña
    if (NuevaContraseña === '') {
      NContraseña = editUser.Contraseña
    }
    fetch(`http://localhost:3000/usuarios/editar/${user.ID_Usuario}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: editUser.Nombre,
        apellido: editUser.Apellido,
        telefono: editUser.Telefono,
        email: editUser.Email,
        contraseña: editUser.Contraseña,
        nuevaContraseña: NContraseña,
        fechaNacimiento: editUser.Fecha_Nacimiento,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUser({
            'ID_Usuario': editUser.ID_Usuario,
            'Nombre': editUser.Nombre,
            'Apellido': editUser.Apellido,
            'Telefono': editUser.Telefono,
            'Email': editUser.Email,
            'Contraseña': "",
            'Fecha_Nacimiento': editUser.Fecha_Nacimiento,
            'Rol': editUser.Rol
          });
          localStorage.setItem('Huellita_Feliz_session', JSON.stringify({
            'ID_Usuario': editUser.ID_Usuario,
            'Nombre': editUser.Nombre,
            'Apellido': editUser.Apellido,
            'Telefono': editUser.Telefono,
            'Email': editUser.Email,
            'Contraseña': "",
            'Fecha_Nacimiento': editUser.Fecha_Nacimiento,
            'Rol': editUser.Rol
          }));
          setNuevaContraseña('');
        }
        alert(data.message);
      })
      .catch((error) => {
        alert('Error:', error);
      });
  };

  useEffect(() => {
    setEditUser(user);
  }, [user]);

  return (
    <Container>
      <FormContainer>
        <Form>
          <FormGroup>
            <label>Nombre:</label>
            <input type="text" name="Nombre" value={editUser.Nombre} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Apellido:</label>
            <input type="text" name="Apellido" value={editUser.Apellido} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Número de Teléfono:</label>
            <input type="text" name="Telefono" value={editUser.Telefono} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Correo Electrónico:</label>
            <input type="email" name="Email" value={editUser.Email} disabled/>
          </FormGroup>
          <FormGroup>
            <label>Contraseña:</label>
            <input type="password" name="Contraseña" value={editUser.Contraseña} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Nueva Contraseña:</label>
            <input type="password" name="NuevaContraseña" value={NuevaContraseña} onChange={handleInputChangeNuevaContraseña} />
          </FormGroup>
          <FormGroup>
            <label>Fecha de Nacimiento:</label>
            <input type="date" name="Fecha_Nacimiento" value={editUser.Fecha_Nacimiento ? editUser.Fecha_Nacimiento.slice(0, 10) : ''} onChange={handleInputChange} />
          </FormGroup>
          <SubmitButton type="button" onClick={Editar}>Editar información</SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
};