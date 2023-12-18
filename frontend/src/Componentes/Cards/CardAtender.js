import React from "react";
import "./stylesCard.css";

export const CardAtender = ({ imagen, titulo, descripcion, precio }) => {
  
  return (
    <>
      <hr></hr>
      <div className="card ">
        <img
          src={imagen}
          alt="imagen.png"
          className="card-img-top tarjeta-imagen"
        />

        <div className="card-body">
          <h4 className="card-title">Nombre mascota:{titulo} </h4>
          <p className="card-text">Doggy le gusta saltar y atrapar la pelota</p>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">{descripcion}</li>
          <li className="list-group-item">{descripcion}</li>
          <li className="list-group-item">A third item</li>
        </ul>

        <div className="card-body">
          
          <div class="d-inline-flex gap-1">
            <button type="button" className="btn btn-outline-dark">
              {precio}
            </button>
            <button type="button" className="btn btn-outline-dark">
              siesta
            </button>
            <button type="button" className="btn btn-outline-dark">
              paseo
            </button>
            <button type="button" className="btn btn-outline-dark">
              nadar
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
