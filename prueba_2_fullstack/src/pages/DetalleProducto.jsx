import { useState } from "react";
import { Row, Col, Breadcrumb, Image, Form, Button, Badge } from "react-bootstrap";
import TarjetaProducto from "../components/TarjetaProducto";
import { productos, formatoPesos } from "../data/productos";

function DetalleProducto({ codigo, irA, agregarAlCarrito }) {
    const [cantidad, setCantidad] = useState(1);

    const producto = productos.find(p => p.codigo === codigo);
    const relacionados = productos.filter(p => p.categoria === producto.categoria && p.codigo !== codigo).slice(0, 5);

    const opciones = [];
    for (let i = 1; i <= Math.min(producto.stock, 5); i++) {
        opciones.push(i);
    }

    function enviar(e) {
        e.preventDefault();
        agregarAlCarrito(producto.codigo, cantidad);
    }

    return (
        <main>
            <Breadcrumb>
                <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("inicio")}>Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("productos", producto.categoria)}>{producto.categoriaNombre}</Breadcrumb.Item>
                <Breadcrumb.Item active>{producto.nombre}</Breadcrumb.Item>
            </Breadcrumb>

            <Row as="article" className="g-4 mb-5">
                <Col md={6}>
                    <Image src={producto.imagen} alt={producto.alt} rounded height="320" className="w-100 object-fit-cover border" />
                    <div className="d-flex gap-2 mt-2">
                        <Image src={producto.imagen} alt="Vista 1" thumbnail width="70" />
                        <Image src={producto.imagen} alt="Vista 2" thumbnail width="70" />
                        <Image src={producto.imagen} alt="Vista 3" thumbnail width="70" />
                    </div>
                </Col>

                <Col md={6}>
                    <h1>{producto.nombre}</h1>
                    <p className="fs-5 fw-bold text-success">{formatoPesos(producto.precio)} por {producto.unidad.toLowerCase()}</p>

                    <Row as="dl">
                        <Col as="dt" sm={4}>Código</Col>
                        <Col as="dd" sm={8}>{producto.codigo}</Col>
                        <Col as="dt" sm={4}>Categoría</Col>
                        <Col as="dd" sm={8}>{producto.categoriaNombre}</Col>
                        <Col as="dt" sm={4}>Disponibilidad</Col>
                        <Col as="dd" sm={8}><Badge bg="success">En stock ({producto.stock} unidades)</Badge></Col>
                    </Row>

                    <h2 className="fs-5">Descripción</h2>
                    <p>{producto.descripcion}</p>

                    <Form onSubmit={enviar}>
                        <Form.Group className="mb-3" controlId="cantidad">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Select value={cantidad} onChange={e => setCantidad(Number(e.target.value))}>
                                {opciones.map(numero => (
                                    <option key={numero} value={numero}>{numero}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="success" className="w-100">Añadir al carrito</Button>
                    </Form>

                    <p className="mt-3"><a href="#" onClick={() => irA("carrito")} className="link-success">Ir al carrito de compras</a></p>
                </Col>
            </Row>

            <section>
                <h2 className="mb-3">Productos relacionados</h2>
                <Row xs={1} sm={2} lg={4} className="g-4">
                    {relacionados.map(item => (
                        <Col key={item.codigo}>
                            <TarjetaProducto producto={item} irA={irA} />
                        </Col>
                    ))}
                </Row>
            </section>
        </main>
    );
}

export default DetalleProducto;
