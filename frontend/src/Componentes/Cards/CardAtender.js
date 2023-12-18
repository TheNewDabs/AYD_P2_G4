import React from 'react'
import './stylesCard.css'

export const CardAtender = ({imagen, titulo, descripcion, precio}) => {
  
  // va en classname card style="width: 18rem;"
  // className="card-img-top"
  return (
    <>
    <hr></hr>
    
    <div className="card">
      <img src={imagen} alt="imagen" className="tarjeta-imagen" />
      
      <div className="card-body">
        
        <h5 className="card-title"    >{titulo} </h5>
        
          <h4 className="card-title" >Nombre mascota: </h4>
          <p className="card-text" >{descripcion}</p>
        
      </div>
  
     
      <ul className="list-group list-group-flush">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
      </ul>
  
      <div className="card-body">
        <a href="#" className="card-link">
          Precio Q.  {precio}
        </a>
        <a href="#" className="card-link">
          Another link
        </a>
      </div>



    </div>
    
  </>
  )
}
