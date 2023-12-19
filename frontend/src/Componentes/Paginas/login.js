import React, { useState } from 'react';
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

export const Login = () => {

  return (
    <Container>
      <NavMenu>
      </NavMenu>
      <LogoContainer>
        <Logo src="images/Logo_Inicio.png" alt="Logo" />
      </LogoContainer>
      <FormContainer>
        <FormColumn>
          <Form>
            <FormGroup>
              <label>Usuario:</label>
              <input type="text" />
            </FormGroup>
            <FormGroup>
              <label>Contraseña:</label>
              <input type="password" />
            </FormGroup>
            <SubmitButton>Iniciar Sesión</SubmitButton>
          </Form>
        </FormColumn>
        <FormColumn>
          <Form>
            <FormGroup>
              <label>Nombre:</label>
              <input type="text" />
            </FormGroup>
            <FormGroup>
              <label>Apellido:</label>
              <input type="text" />
            </FormGroup>
            <FormGroup>
              <label>Número de Teléfono:</label>
              <input type="text" />
            </FormGroup>
            <FormGroup>
              <label>Correo Electrónico:</label>
              <input type="email" />
            </FormGroup>
            <FormGroup>
              <label>Contraseña:</label>
              <input type="password" />
            </FormGroup>
            <FormGroup>
              <label>Fecha de Nacimiento:</label>
              <input type="date" />
            </FormGroup>
            <FormGroup>
              <label>Rol:</label>
              <select>
                <option value="cliente">Cliente</option>
                <option value="trabajador">Trabajador</option>
              </select>
            </FormGroup>
            <SubmitButton>Registrarse</SubmitButton>
          </Form>
        </FormColumn>
      </FormContainer>
    </Container>
  );
};
