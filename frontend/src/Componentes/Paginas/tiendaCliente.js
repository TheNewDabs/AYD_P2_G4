import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5f5e8;
  padding: 20px;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 80%;
`;

const ProductTitle = styled.p`
  margin-bottom: 0;  /* Elimina el margen inferior */
`;

export const TiendaCliente = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/productos/all")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data.productos);
            })
            .catch((error) => console.error("Error:", error));

    });

    return (
        <Container>
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
                            <EditableText>{producto.Precio}</EditableText>
                            <ProductTitle>Cantidad:</ProductTitle>
                            <EditableText>{producto.Cantidad}</EditableText>
                        </ProductInfo>
                    </ProductItem>
                ))}
            </ProductList>
        </Container>
    );
};
