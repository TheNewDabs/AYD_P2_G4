import { Routes, Route, Navigate } from "react-router-dom";

import { MenuDueño } from "./Componentes/Navegacion/MenuDueño";
import { MenuCuidador } from "./Componentes/Navegacion/MenuCuidador";
import { Login } from "./Componentes/Paginas/login";
import { Inicio } from "./Componentes/Paginas/Inicio";
import { Template } from "./Componentes/Paginas/Template";
import { AtenderMascota} from './Componentes/Paginas/AtenderMascota'
import { SeleccionarMascota } from "./Componentes/Paginas/SeleccionarMascota";

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
              <Route path="agregar" element={<Template/>}/>
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
              <Route path="seleccionar" element={<SeleccionarMascota/>}/>
              <Route path="atender" element={<AtenderMascota/>}/>
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

/*
<Route path="/perfil"       element={ <CrearPerfilMascota/> }/>
<Route path="/seleccionar"  element={ <SeleccionMascota/> }/>
<Route path="/atender"      element={ <AtenderMascota/> }/>
<Route path="/hospedar"     element={ <HospedarMascota/> }/>
<Route path="/usuarios"     element={ <Usuarios/> }/>
*/

/*
<Routes>
                    <Route path="" element={<EditUser/>} />
                    <Route path="alquilar" element={<Alquilar />} />
                    <Route path="comprar" element={<Comprar />} />
                    <Route path="comentar" element={<Comentar />} />
                    <Route path="devolver" element={<Devolver />} />
                    <Route path="historial" element={<Historial />} />
                    <Route path="carrito" element={<CarritoPage />} />
                    <Route path="*" element={<Navigate to="/user" />} />
                  </Routes>




<Route path="inicio" element={<Inicio/>}/>
        <Route path="perfil" element={<CrearPerfilMascota/>}/>
        <Route path="atender" element={<SeleccionMascota/>}/>
        <Route path="historial" element={<Usuarios/>}/>
        



<Routes>
        <Route path=""/>
        <Route path="perfil " element="crear perfil"/>
        <Route path="seleccionar " element={<SeleccionMascota/>}/>
        <Route path="atender " element="atender"/>
        <Route path="hospedar " element="hospedar"/>        
        <Route path="*" element={<Navigate to="/user" />} />
      </Routes>

<Route path="comprar" element={<Comprar />} />
<Route path="comentar" element={<Comentar />} />
<Route path="devolver" element={<Devolver />} />
<Route path="historial" element={<Historial />} />
<Route path="carrito" element={<CarritoPage />} />
*/
