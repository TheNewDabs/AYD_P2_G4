import { useEffect, useState } from "react";
import { CardSeleccionar } from "../Cards/CardSeleccionar";

export const SeleccionMascota = () => {
  /*
  const [librosA, setLibrosA] = useState([])

  const fetchLibrosA= async() => {
        const response = await fetch(`http://localhost:3000/libros`)
        const data = await response.json()
        console.log(data)
        setLibrosA(data)
  }
  
  useEffect(() => {
    fetchLibrosA()
  },[])
  <CardSeleccionar></CardSeleccionar>
*/

  return (
    <>
      <div>
        <h1>Seleccionar mascota </h1>
      </div>
    </>
  );
};


  /*key = {miLibro.LibroID}
              id = {miLibro.LibroID}
              titulo = {miLibro.Titulo}
              autor = {miLibro.Autor}
              anopublica = {miLibro.AnoPublicacion}
              editorial = {miLibro.Editorial}
              sinopsis = {miLibro.Sinopsis}
              estado = {miLibro.Estado}
        precio = {miLibro.PrecioRenta} */

