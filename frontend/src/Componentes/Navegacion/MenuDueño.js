import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
  margin-bottom: 40px;
`;

const NavMenu = styled.div`
  background-color: #44a08d;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 80px;
`;

const LogoContainer = styled.div`
  position: absolute;
  height: 150px;
  top: 75px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Logo = styled.img`
  height: 100%; /* ajusta el tamaño según tu necesidad */
`;

const NavLinks = styled.div`
  display: flex;
  gap: 5px;
  max-width: 42%;

  @media (max-width: 768px) {
    display: ${(props) => (props.collapsed ? 'none' : 'flex')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #44a08d;
    padding: 10px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => (props.selected ? '#ffe5b0' : 'white')};
  padding: 5px;
  font-size: 18px; /* Ajusta el tamaño de fuente según tus preferencias */
`;

const HamburgerButton = styled.button`
  display: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 18px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MenuDueño = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedLink, setSelectedLink] = useState('');

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    setCollapsed(true);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Container>
      <NavMenu>
        <HamburgerButton onClick={toggleMenu}>&#9776;</HamburgerButton>
        <NavLink to="/dueño" onClick={() => handleLinkClick('')}>
          <img src="/images/Nombre.png" alt="Botón de imagen izquierda" height="50px" />
        </NavLink>
        <NavLinks collapsed={collapsed}>
          <StyledNavLink to="/dueño/agregar" selected={selectedLink === 'agregar'} onClick={() => handleLinkClick('agregar')}> Agregar Mascota </StyledNavLink>
          <StyledNavLink to="/dueño/hospedar" selected={selectedLink === 'hospedar'} onClick={() => handleLinkClick('hospedar')} > Hospedar </StyledNavLink>
          <StyledNavLink to="/dueño/reseñar" selected={selectedLink === 'resenar'} onClick={() => handleLinkClick('resenar')} > Reseñar </StyledNavLink>
          <StyledNavLink to="/dueño/recoger" selected={selectedLink === 'recoger'} onClick={() => handleLinkClick('recoger')} > Rececoger </StyledNavLink> 
          <StyledNavLink to="/dueño/tienda" selected={selectedLink === 'tienda'} onClick={() => handleLinkClick('tienda')} > Tienda </StyledNavLink>
          <StyledNavLink to="/" selected={selectedLink === 'cerrar-sesion'} onClick={() => handleLinkClick('cerrar-sesion')} > Cerrar Sesión </StyledNavLink>
        </NavLinks>
      </NavMenu>
      <LogoContainer>
        <Logo src="/images/Logo.png" alt="Logo" />
      </LogoContainer>
    </Container>
  );
};


/*

import React from 'react'
import { NavLink } from 'react-router-dom'

//export const Minavbar = ({ user, setUser }) => {
export const Minavbar = () => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <NavLink className='navbar-brand' to='/'> Hotel Mascotas</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">

              <li className="nav-item">
                <NavLink to='/perfil' className="nav-link">Perfil Mascota</NavLink>
              </li>
                            
              <li className="nav-item">
                <NavLink to='/seleccionar' className="nav-link">Seleccionar Mascota</NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink to='/atender' className="nav-link">Atender Mascota</NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink to='/hospedar' className="nav-link">Hospedar Mascota</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to='/usuarios' className="nav-link">Usuarios</NavLink>
              </li>
              
            </ul>
            <ul className="navbar-nav">
              { Opción para cerrar sesión }
              <li className="nav-item">
                <NavLink className="nav-link" href="#">Cerrar Sesión</NavLink>
              </li>
            </ul>
          </div>


        </div>
      </nav>
    </>
  )
}

*/