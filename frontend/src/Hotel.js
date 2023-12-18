import { Routes, Route, Navigate } from "react-router-dom";
import { Minavbar } from "./Componentes/Navegacion/Minavbar";

import { CrearPerfilMascota } from "./Componentes/Paginas/CrearPerfilMascota";
import { SeleccionMascota }   from "./Componentes/Paginas/SeleccionMascota";
import { AtenderMascota }     from "./Componentes/Paginas/AtenderMascota";
import { HospedarMascota }    from "./Componentes/Paginas/HospedarMascota";
import { Inicio }             from "./Componentes/Paginas/Inicio";
import { Usuarios }           from "./Componentes/Paginas/Usuarios";

export const Hotel = () => {
  return (
    <>
      <Minavbar />
      <div className="container">
        <Routes>
          <Route path="/"             element={ <Inicio/> }/>
          <Route path="/perfil"       element={ <CrearPerfilMascota/> }/>
          <Route path="/seleccionar"  element={ <SeleccionMascota/> }/>
          <Route path="/atender"      element={ <AtenderMascota/> }/>
          <Route path="/hospedar"     element={ <HospedarMascota/> }/>
          <Route path="/usuarios"     element={ <Usuarios/> }/>
          <Route path="/*"            element={ <Navigate to="/" /> }/>
        </Routes>        
      </div>
    </>
  );
};

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
