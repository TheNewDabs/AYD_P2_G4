import { Routes, Route, Navigate } from "react-router-dom";
//import { Minavbar } from "./Componentes/Navegacion/Minavbar";
import { MenuDueño } from "./Componentes/Navegacion/MenuDueño";
import { MenuCuidador } from "./Componentes/Navegacion/MenuCuidador";
import { Login } from "./Componentes/Paginas/login";
import { Inicio } from "./Componentes/Paginas/Inicio";
import { Template } from "./Componentes/Paginas/Template";
import { DueñoAgregar } from "./Componentes/Paginas/DueñoAgregar";

export const Hotel = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/template" element={<Login/>}/>
        <Route path="/dueño/*" element={
          <>
            <MenuDueño/>
            <Routes>
              <Route path="" element={<Inicio/>}/>
              <Route path="agregar" element={<DueñoAgregar/>}/>
              <Route path="hospedar" element={<Template/>}/>
              <Route path="reseñar" element={<Template/>}/>
              <Route path="recoger" element={<Template/>}/>
              <Route path="tienda" element={<Template/>}/>
              <Route path="*" element={<Navigate to="/dueño"/>}/>
            </Routes>
          </>
        } />
        <Route path="/cuidador/*" element={
          <>
            <MenuCuidador/>
            <Routes>
              <Route path="" element={<Inicio/>}/>
              <Route path="seleccionar" element={<Template/>}/>
              <Route path="atender" element={<Template/>}/>
              <Route path="devolver" element={<Template/>}/>
              <Route path="reseñas" element={<Template/>}/>
              <Route path="tienda" element={<Template/>}/>
              <Route path="*" element={<Navigate to="/cuidador"/>}/>
            </Routes>
          </>
        } />
        <Route path="/*" element={<Navigate to="/"/>}/>
      </Routes>
    </>
  );
};