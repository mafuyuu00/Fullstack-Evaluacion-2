import { Row, Col, Card, ListGroup, Image, Button, Form, InputGroup } from "react-bootstrap";
import { productos, formatoPesos } from "../data/productos";

function Carrito({ carrito, irA, cambiarCantidad, eliminarDelCarrito }) {
    let subtotal = 0;
    for (const item of carrito) {
        const producto = productos.find(p => p.codigo === item.codigo);
        subtotal += producto.precio * item.cantidad;
    }
    const despacho = subtotal > 0 ? 2990 : 0;

    return (
        <main>
            <h1 className="mb-4">Mi carrito de compras</h1>

            <Row className="g-4">
                <Col as="section" lg={8}>
                    <ListGroup className="mb-3">
                        {carrito.map(item => {
                            const producto = productos.find(p => p.codigo === item.codigo);

                            return (
                                <ListGroup.Item key={item.codigo} as="article" className="py-3">
                                    <Row className="align-items-center g-3">
                                        <Col xs={3} md={2}>
                                            <Image src={producto.imagen} alt={producto.alt} rounded height="56" className="w-100 object-fit-cover" />
                                        </Col>

                                        <Col xs={9} md={4}>
                                            <h3 className="fs-6 mb-1">
                                                <a href="#" onClick={() => irA("detalle", producto.codigo)} className="link-success">{producto.nombre}</a>
                                            </h3>
                                            <small className="text-muted">{producto.unidad} · {producto.categoriaNombre} · Código {producto.codigo}</small>
                                        </Col>

                                        <Col xs={4} md={2} className="fw-bold">{formatoPesos(producto.precio)}</Col>

                                        <Col xs={5} md={2}>
                                            <InputGroup size="sm">
                                                <Button variant="outline-secondary" onClick={() => cambiarCantidad(item.codigo, item.cantidad - 1)}>−</Button>
                                                <Form.Control
                                                    type="number"
                                                    value={item.cantidad}
                                                    min="1"
                                                    max={producto.stock}
                                                    className="text-center"
                                                    onChange={e => {
                                                        const nuevaCantidad = Number(e.target.value);
                                                        if (nuevaCantidad >= 1) cambiarCantidad(item.codigo, nuevaCantidad);
                                                    }}
                                                />
                                                <Button variant="outline-secondary" onClick={() => cambiarCantidad(item.codigo, item.cantidad + 1)}>+</Button>
                                            </InputGroup>
                                        </Col>

                                        <Col xs={3} md={2} className="text-end">
                                            <Button variant="outline-danger" size="sm" onClick={() => eliminarDelCarrito(item.codigo)}>Eliminar</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>

                    <a href="#" onClick={() => irA("productos")} className="link-success">Seguir comprando</a>
                </Col>

                <Col as="aside" lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h2" className="fs-5 mb-3">Resumen</Card.Title>
                            <Row as="dl">
                                <Col as="dt" xs={6}>Subtotal</Col>
                                <Col as="dd" xs={6} className="text-end">{formatoPesos(subtotal)}</Col>
                                <Col as="dt" xs={6}>Despacho</Col>
                                <Col as="dd" xs={6} className="text-end">{formatoPesos(despacho)}</Col>
                                <Col as="dt" xs={6}>Descuento</Col>
                                <Col as="dd" xs={6} className="text-end">$0</Col>
                                <Col as="dt" xs={6} className="border-top pt-2">TOTAL</Col>
                                <Col as="dd" xs={6} className="border-top pt-2 text-end fw-bold">{formatoPesos(subtotal + despacho)}</Col>
                            </Row>

                            <Form onSubmit={e => e.preventDefault()} className="mb-3">
                                <Form.Label htmlFor="cupon" className="small">Ingrese el cupón de descuento</Form.Label>
                                <InputGroup>
                                    <Form.Control type="text" id="cupon" maxLength={20} />
                                    <Button type="submit" variant="outline-success">Aplicar</Button>
                                </InputGroup>
                            </Form>

                            <Button href="#" variant="success" className="w-100">Pagar</Button>

                            <p className="mt-3 mb-0 small text-muted">
                                El carrito se guarda en <code>localStorage</code>, por lo que se
                                conserva si cierras la pestaña.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </main>
    );
}

export default Carrito;
