import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
  padding: 20px;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormButton = styled.button`
  background-color: #44a08d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 8px;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditableInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Hacer que ocupe todo el ancho disponible */
  box-sizing: border-box; /* Incluir el padding y border en el ancho total */
`;

const EditableText = styled.span`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Hacer que ocupe todo el ancho disponible */
  display: inline-block; /* Para que el ancho se ajuste al contenido */
  box-sizing: border-box; /* Incluir el padding y border en el ancho total */
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ProductImage = styled.div`
  width: 20%;
`;

const ProductInfo = styled.div`
  padding-left: 10px;
  width: 70%;
`;

const ProductButtons = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ProductTitle = styled.p`
  margin-bottom: 0;  /* Elimina el margen inferior */
`;

const EditButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 90%;
  margin-bottom: 5px;
`;

const DeleteButton = styled.button`
  background-color: #ff6961;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 90%;
`;

export const TiendaCuidador = ({ user }) => {
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', descripcion: '', precio: '', cantidad: '', urlImagen: '' });
    const [cambios, setCambios] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(null);
    const [productoEditando, setProductoEditando] = useState({ nombre: '', descripcion: '', precio: '', cantidad: '', urlImagen: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const handleInputChangeEdit = (e) => {
        const { name, value } = e.target;
        setProductoEditando({ ...productoEditando, [name]: value });
    };

    useEffect(() => {
        fetch("http://localhost:3000/productos/all")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data.productos);
            })
            .catch((error) => console.error("Error:", error));

    }, [cambios]);

    const handleAgregarProducto = () => {
        fetch("http://localhost:3000/productos/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: nuevoProducto.nombre,
                descripcion: nuevoProducto.descripcion,
                precio: nuevoProducto.precio,
                cantidad: nuevoProducto.cantidad,
                idCuidador: user.ID_Usuario,
                imagenUrl: nuevoProducto.urlImagen,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCambios(!cambios);
                    setNuevoProducto({
                        nombre: '',
                        descripcion: '',
                        precio: '',
                        cantidad: '',
                        urlImagen: '',
                    });
                }
                alert(data.mensaje);
            })
            .catch((error) => console.error("Error:", error));
    };

    const handleEliminarProducto = (id) => {
        fetch("http://localhost:3000/productos/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idProducto: id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCambios(!cambios);
                }
                alert(data.mensaje);
            })
            .catch((error) => console.error("Error:", error));
    };

    const handleEditarProducto = (index, producto) => {
        setModoEdicion(index);
        console.log(producto)
        setProductoEditando(producto);
    };

    const handleGuardarEdicion = () => {
        console.log(productoEditando)
        fetch("http://localhost:3000/productos/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idProducto: productoEditando.ID_Producto,
                nuevoPrecio: productoEditando.Precio,
                nuevaCantidad: productoEditando.Cantidad,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCambios(!cambios);
                }
                alert(data.mensaje);
            })
        setModoEdicion(null);
    };

    const handleCancelarEdicion = () => {
        setModoEdicion(null);
        setProductoEditando({ nombre: '', descripcion: '', precio: '', cantidad: '', urlImagen: '' });
    }

    return (
        <Container>
            <FormContainer>
                <h2>Agregar Nuevo Producto</h2>
                <Form onSubmit={handleAgregarProducto}>
                    <FormInput type="text" name="nombre" placeholder="Nombre" value={nuevoProducto.nombre} onChange={handleInputChange} />
                    <FormInput type="text" name="descripcion" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={handleInputChange} />
                    <FormInput type="text" name="precio" placeholder="Precio" value={nuevoProducto.precio} onChange={handleInputChange} />
                    <FormInput type="text" name="cantidad" placeholder="Cantidad" value={nuevoProducto.cantidad} onChange={handleInputChange} />
                    <FormInput type="text" name="urlImagen" placeholder="URL de la imagen" value={nuevoProducto.urlImagen} onChange={handleInputChange} />
                    <FormButton type="button" onClick={handleAgregarProducto}>Agregar Producto</FormButton>
                </Form>
            </FormContainer>
            <ProductList>
                <h2>Lista de Productos</h2>
                {productos.map((producto, index) => (
                    <ProductItem key={producto.ID_Producto}>
                        <ProductImage>
                            <img src={producto.Imagen_URL} alt={producto.Nombre} style={{ width: '100%' }} />
                        </ProductImage>
                        <ProductInfo>
                            <ProductTitle>Nombre:</ProductTitle>
                            <EditableText>{producto.Nombre}</EditableText>
                            <ProductTitle>Descripción:</ProductTitle>
                            <EditableText>{producto.Descripcion}</EditableText>
                            <ProductTitle>Precio:</ProductTitle>
                            {modoEdicion === index ? (
                                <EditableInput
                                    type="text"
                                    name="Precio"
                                    value={productoEditando.Precio}
                                    onChange={handleInputChangeEdit}
                                />
                            ) : (
                                <EditableText>{producto.Precio}</EditableText>
                            )}
                            <ProductTitle>Cantidad:</ProductTitle>
                            {modoEdicion === index ? (
                                <EditableInput
                                    type="text"
                                    name="Cantidad"
                                    value={productoEditando.Cantidad}
                                    onChange={handleInputChangeEdit}
                                />
                            ) : (
                                <EditableText>{producto.Cantidad}</EditableText>
                            )}
                        </ProductInfo>
                        <ProductButtons>
                            {modoEdicion === index ? (
                                <EditButton type="button" onClick={handleGuardarEdicion}>Guardar</EditButton>
                            ) : (
                                <EditButton type="button" onClick={() => handleEditarProducto(index, producto)}>Editar</EditButton>
                            )}
                            {modoEdicion === index ? (
                                <DeleteButton type="button" onClick={handleCancelarEdicion}>Cancelar</DeleteButton>
                            ) : (
                                <DeleteButton type="button" onClick={() => handleEliminarProducto(producto.ID_Producto)}>Eliminar</DeleteButton>
                            )}
                        </ProductButtons>
                    </ProductItem>
                ))}
            </ProductList>
        </Container>
    );
};
