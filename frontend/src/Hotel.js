import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
//import { Minavbar } from "./Componentes/Navegacion/Minavbar";
import { MenuDueño } from "./Componentes/Navegacion/MenuDueño";
import { MenuCuidador } from "./Componentes/Navegacion/MenuCuidador";
import { Login } from "./Componentes/Paginas/login";
import { Inicio } from "./Componentes/Paginas/Inicio";
import { Template } from "./Componentes/Paginas/Template";
import { SeleccionarMascota } from "./Componentes/Paginas/SeleccionarMascota";
import { DueñoAgregar } from "./Componentes/Paginas/dueñoAgregar";
import { DueñoHospedar } from "./Componentes/Paginas/dueñoMascotas";
import { ReseñasUsuarios } from "./Componentes/Paginas/reseñasUsuarios";
import { ReseñasCuidador } from "./Componentes/Paginas/reseñasCuidador";
import { TiendaCuidador } from "./Componentes/Paginas/tiendaCuidador";
import { TiendaCliente } from "./Componentes/Paginas/tiendaCliente";

export const Hotel = () => {

  const [user, setUser] = useState({ 'ID_Usuario': -1, 'Nombre': '', 'Apellido': '', 'Telefono': '', 'Email': '', 'Contraseña': '', 'Fecha_Nacimiento': '', 'Rol': '' })
  const push = useNavigate();
  const { pathname } = useLocation();

  const Inicial = () => {
    const path = decodeURIComponent(pathname)
    if (user && user.ID_Usuario && user.ID_Usuario !== -1) {
      if (user.Rol === 'Cliente') {
        if (!path.startsWith("/dueño")) {
          push('/dueño/');
        }
      } else {
        if (!path.startsWith("/cuidador")) {
          push('/cuidador/');
        }
      }
    } else {
      if (localStorage.getItem("Huellita_Feliz_session")) {
        const TempUser = JSON.parse(localStorage.getItem("Huellita_Feliz_session"));
        if (TempUser && TempUser.ID_Usuario && TempUser.ID_Usuario !== -1) {
          setUser(TempUser);
          if (TempUser.Rol === 'Cliente') {
            if (!path.startsWith("/dueño")) {
              push('/dueño/');
            }
          } else {
            if (!path.startsWith("/cuidador")) {
              push('/cuidador/');
            }
          }
        }
      } else {
        localStorage.setItem('Huellita_Feliz_session', JSON.stringify({ 'ID_Usuario': -1, 'Nombre': '', 'Apellido': '', 'Telefono': '', 'Email': '', 'Contraseña': '', 'Fecha_Nacimiento': '', 'Rol': '' }));
      }
    }
  }

  useEffect(() => {
    Inicial();
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser}/>}/>
        <Route path="/template" element={<Login/>}/>
        <Route path="/dueño/*" element={
          <>
            <MenuDueño user={user} setUser={setUser}/>
            <Routes>
              <Route path="" element={<Inicio user={user} setUser={setUser}/>}/>
              <Route path="agregar" element={<DueñoAgregar user={user}/>}/>
              <Route path="mascotas" element={<DueñoHospedar user={user}/>}/>
              <Route path="reseñar" element={<ReseñasUsuarios user={user}/>}/>
              <Route path="tienda" element={<TiendaCliente/>}/>
              <Route path="*" element={<Navigate to="/dueño"/>}/>
            </Routes>
          </>
        } />
        <Route path="/cuidador/*" element={
          <>
            <MenuCuidador user={user} setUser={setUser}/>
            <Routes>
              <Route path="" element={<Inicio user={user} setUser={setUser}/>}/>
              <Route path="mascotas" element={<SeleccionarMascota user={user}/>}/>
              <Route path="reseñas" element={<ReseñasCuidador/>}/>
              <Route path="tienda" element={<TiendaCuidador user={user}/>}/>
              <Route path="*" element={<Navigate to="/cuidador"/>}/>
            </Routes>
          </>
        } />
        <Route path="/*" element={<Navigate to="/"/>}/>
      </Routes>
    </>
  );
};