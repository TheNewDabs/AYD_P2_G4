
import { useState } from "react"
//import '../styles/card.css'

/*
export const CardSeleccionar = ({ id, titulo, autor, anopublica, editorial,
    sinopsis, estado, precio}) => {
*/


export const CardSeleccionar = () => {

    /*
    const [added, setAdded] = useState(false)
    const [fecha, setFecha] = useState("")

    const clickAlquilar = () => {
        handleAgregar()
        setAdded(true)
    }

    const clickQuitar = () => {
        
        setAdded(false)
    }

    const handleAgregar = () => {
        const local = localStorage.MyLibrary_session;
    const userID = JSON.parse(local).UserID;

        const data = {
            UserID: userID,
            libroID: id,
            fechaDevolucionRenta: fecha
        }
        // agregar el id del usuario que este logueado 
        fetch("http://localhost:3000/libros/alquilar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    
    const handleFechaChange = (e) => {
        setFecha(e.target.value)
    }*/

    return (
        <h2>card seleccionar mascota</h2>
        
    )
}


/*
        <div className="tarjeta">
            <div className="tarjeta-contenido">
                <h3 className="tarjeta-titulo">Titulo: {titulo}</h3>
                <p className="tarjeta-contenido">Autor: {autor}</p>
                <p className="tarjeta-contenido">Año Publicacion: {anopublica}</p>
                <p className="tarjeta-contenido">Editorial: {editorial}</p>
                <p className="tarjeta-descripcion">Sinopsis: {sinopsis}</p>
                <p className="tarjeta-contenido">Estado: {estado}</p>
                <p className="tarjeta-precio">Precio Q. {precio}</p>
                <div className="mb-3">
                    <label for="fechadevolver">Fecha de devolución</label>
                    <input id="fechadevolver" type="date" className="form-control" value={fecha} onChange={handleFechaChange} />
                </div>

                {added ? <button
                    type="button"
                    className="btn btn-danger"
                    onClick={clickQuitar}
                >Quitar
                </button>

                    : <button
                        type="button"
                        className="btn btn-primary"
                        onClick={clickAlquilar}
                    >Alquilar libro
                    </button>
                }
            </div>
        </div>
    */