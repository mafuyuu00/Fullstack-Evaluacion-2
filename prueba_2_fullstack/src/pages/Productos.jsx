import { useState } from "react";
import { Row, Col, Card, ListGroup, Form } from "react-bootstrap";
import TarjetaProducto from "../components/TarjetaProducto";
import { productos } from "../data/productos";

//traemos 3 props incluidos la funcion irA que es del app.jsx y agregar carrito, categoría viene del arreglo que tenemos en js
//para homologar una fuente de datos, pero al fin y al cabo sin persistencia.
function Productos({ categoria, irA, agregarAlCarrito }) {
    //se inicializa con estado relevancia el orden de los productos.
    const [orden, setOrden] = useState("relevancia");

    //filtra los productos por la categoría que se entrega como parámetro, que se obtiene del onclick, productos verduras,
    //al final son los productos de ese mismo tipo
    const listaProductos = categoria ? productos.filter(p => p.categoria === categoria) : [...productos];

    //después con las opciones que están abajo, dependiendo del value se ordenarán los productos según esto.
    if (orden === "precio-asc") listaProductos.sort((a, b) => a.precio - b.precio);
    if (orden === "precio-desc") listaProductos.sort((a, b) => b.precio - a.precio);
    if (orden === "nombre") listaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

    return (
        <Row className="g-4">
            <Col as="aside" md={3}>
                <Card className="mb-3">
                    <Card.Header as="h2" className="fs-6 text-success">Categorías</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item action onClick={() => irA("productos")}>Todas</ListGroup.Item>
                        <ListGroup.Item action onClick={() => irA("productos", "frutas")}>Frutas</ListGroup.Item>
                        <ListGroup.Item action onClick={() => irA("productos", "verduras")}>Verduras</ListGroup.Item>
                        <ListGroup.Item action onClick={() => irA("productos", "organicos")}>Orgánicos</ListGroup.Item>
                    </ListGroup>
                </Card>

                <Card body>
                    <h2 className="fs-6 text-success">Ordenar por</h2>
                    <Form.Group controlId="orden">
                        <Form.Label className="small">Criterio</Form.Label>
                        <Form.Select value={orden} onChange={e => setOrden(e.target.value)}>
                            <option value="relevancia">Relevancia</option>
                            <option value="precio-asc">Menor precio</option>
                            <option value="precio-desc">Mayor precio</option>
                            <option value="nombre">Nombre (A-Z)</option>
                        </Form.Select>
                    </Form.Group>
                </Card>
            </Col>

            <Col as="main" md={9}>
                <h1>Productos</h1>
                <p className="text-muted">Catálogo completo de la tienda. Haz clic en un producto para ver su detalle.</p>
                <Row xs={1} sm={2} lg={3} className="g-4">
                    {listaProductos.map(producto => (
                        <Col key={producto.codigo}>
                            <TarjetaProducto producto={producto} irA={irA} agregarAlCarrito={agregarAlCarrito} />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
}

export default Productos;
