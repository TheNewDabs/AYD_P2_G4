import React from 'react'
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

export const Inicio = () => {
  return (
    <Container>
      <FormContainer>
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
      </FormContainer>
    </Container>
  )
}
