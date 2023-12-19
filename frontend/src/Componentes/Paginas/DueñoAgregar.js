import React from 'react';
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

export const DueñoAgregar = () => {
  return (
    <Container>
      <FormContainer>
        <Form>
          <FormGroup>
            <label>Nombre de mascota:</label>
            <input type="text" />
          </FormGroup>
          <FormGroup>
            <label>Edad:</label>
            <input type="number" />
          </FormGroup>
          <FormGroup>
            <label>Especie:</label>
            <select>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label>Raza:</label>
            <input type="text" />
          </FormGroup>
          <FormGroup>
            <label>Comportamiento:</label>
            <textarea rows="4" />
          </FormGroup>
          <FormGroup>
            <label>Contacto del veterinario:</label>
            <input type="text" />
          </FormGroup>
          <FormGroup>
            <label>Comentarios extra:</label>
            <textarea rows="4" />
          </FormGroup>
          <SubmitButton>Registrar Mascota</SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
};
