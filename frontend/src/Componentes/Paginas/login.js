import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #d5f5e8;
`;

const NavMenu = styled.div`
  background-color: #44a08d;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 115px;
  height: 115px;
  padding: 10px;
`;

const LogoContainer = styled.div`
  position: absolute;
  height: 200px;
  top: 100px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Logo = styled.img`
  height: 100%; /* ajusta el tamaño según tu necesidad */
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const FormColumn = styled.div`
  width: 40%;
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

export const Login = ({ user, setUser }) => {

  const [newUser, setNewUser] = useState({ 'Nombre': '', 'Apellido': '', 'Telefono': '', 'Email': '', 'Contraseña': '', 'Fecha_Nacimiento': '', 'Rol': 'Cliente' });
  const push = useNavigate();

  const handleChangeUser = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const handleChangeNewUser = (e) => {
    setNewUser((prevNewUser) => ({ ...prevNewUser, [e.target.name]: e.target.value }));
  };

  const Login = () => {
    fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correoElectronico: user.Email,
        contrasenia: user.Contraseña
      })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.mensaje);
        if (data.success) {
          setUser(data.usuario);
          localStorage.setItem('Huellita_Feliz_session', JSON.stringify(data.usuario));
          if (data.usuario.Rol === 'Cliente') {
            push('/dueño');
          } else {
            push('/cuidador');
          }
        }
      })
      .catch((error) => {
        alert('Error:', error);
      });
  }

  const Register = () => {
    fetch('http://localhost:3000/usuarios/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: newUser.Nombre,
        apellido: newUser.Apellido,
        telefono: newUser.Telefono,
        email: newUser.Email,
        contrasenia: newUser.Contraseña,
        fechaNacimiento: newUser.Fecha_Nacimiento,
        rol: newUser.Rol
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Usuario creado correctamente, revise su correo electrónico para activar su cuenta");
          setNewUser({ 'Nombre': '', 'Apellido': '', 'Telefono': '', 'Email': '', 'Contraseña': '', 'Fecha_Nacimiento': '', 'Rol': 'Cliente' });
        } else {
          alert(data.mensaje);
        }
      })
      .catch((error) => {
        alert('Error:', error);
      });
  }

  return (
    <Container>
      <NavMenu></NavMenu>
      <LogoContainer>
        <Logo src="images/Logo_Inicio.png" alt="Logo" />
      </LogoContainer>
      <FormContainer>
        <FormColumn>
          <Form>
            <FormGroup>
              <label>Usuario:</label>
              <input type="text" name="Email" onChange={handleChangeUser} value={user.Email} />
            </FormGroup>
            <FormGroup>
              <label>Contraseña:</label>
              <input type="password" name="Contraseña" onChange={handleChangeUser} value={user.Contraseña} />
            </FormGroup>
            <SubmitButton type="button" onClick={Login}>Iniciar Sesión</SubmitButton>
          </Form>
        </FormColumn>
        <FormColumn>
          <Form>
            <FormGroup>
              <label>Nombre:</label>
              <input type="text" name="Nombre" onChange={handleChangeNewUser} value={newUser.Nombre} />
            </FormGroup>
            <FormGroup>
              <label>Apellido:</label>
              <input type="text" name="Apellido" onChange={handleChangeNewUser} value={newUser.Apellido} />
            </FormGroup>
            <FormGroup>
              <label>Número de Teléfono:</label>
              <input type="text" name="Telefono" onChange={handleChangeNewUser} value={newUser.Telefono} />
            </FormGroup>
            <FormGroup>
              <label>Correo Electrónico:</label>
              <input type="email" name="Email" onChange={handleChangeNewUser} value={newUser.Email} />
            </FormGroup>
            <FormGroup>
              <label>Contraseña:</label>
              <input type="password" name="Contraseña" onChange={handleChangeNewUser} value={newUser.Contraseña} />
            </FormGroup>
            <FormGroup>
              <label>Fecha de Nacimiento:</label>
              <input type="date" name="Fecha_Nacimiento" onChange={handleChangeNewUser} value={newUser.Fecha_Nacimiento} />
            </FormGroup>
            <FormGroup>
              <label>Rol:</label>
              <select name="Rol" onChange={handleChangeNewUser} value={newUser.Rol}>
                <option value="cliente">Cliente</option>
                <option value="Cuidador">Trabajador</option>
              </select>
            </FormGroup>
            <SubmitButton type="button" onClick={Register}>Registrarse</SubmitButton>
          </Form>
        </FormColumn>
      </FormContainer>
    </Container>
  );
};
