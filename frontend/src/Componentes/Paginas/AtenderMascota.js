import React, { useEffect, useState } from "react";
import { CardAtender } from "../Cards/CardAtender";



export const AtenderMascota = () => {
  const [mascotas, setMascotas] = useState([]);

  const fetchMascota = async () => {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    console.log(data);
    setMascotas(data);
  };

  useEffect(() => {
    fetchMascota();
  }, []);

  return (
    <>
      <div className="container mt-5 ">
        <h1>Atender mascotas</h1>
        
        {mascotas.map((animal) => (
            <CardAtender
              key={animal.id}
              imagen ={animal.image}
              titulo={animal.category}
              descripcion={animal.description}
              precio={animal.price}
            ></CardAtender>
          ))}
      </div>
    </>
  );
};
