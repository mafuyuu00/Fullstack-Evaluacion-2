import { Row, Col, Card, Nav, Table } from "react-bootstrap";

function Nosotros() {
    return (
        <Row className="g-4">
            <Col as="aside" md={3}>
                <Card body>
                    <h2 className="fs-6 text-success">En esta página</h2>
                    <Nav className="flex-column">
                        <Nav.Link href="#quienes-somos" className="link-success px-0">Quiénes somos</Nav.Link>
                        <Nav.Link href="#mision" className="link-success px-0">Misión y visión</Nav.Link>
                        <Nav.Link href="#valores" className="link-success px-0">Nuestros valores</Nav.Link>
                        <Nav.Link href="#tecnologias" className="link-success px-0">Tecnologías del proyecto</Nav.Link>
                    </Nav>
                </Card>
            </Col>

            <Col as="main" md={9}>
                <h1 className="mb-4">Nosotros</h1>

                <section id="quienes-somos" className="mb-4">
                    <h2>Quiénes somos</h2>
                    <p>
                        Huerto Verde nació en 2026 como un proyecto de tres estudiantes de
                        Duoc UC que querían acortar la distancia entre los pequeños
                        productores del Valle Central y las mesas de la Región Metropolitana.
                        Hoy trabajamos con 18 huertos familiares y despachamos alrededor de
                        400 pedidos semanales.
                    </p>
                    <p>
                        Compramos directo al productor, sin intermediarios, y armamos cada
                        pedido el mismo día del despacho. Eso nos permite mantener precios
                        justos en las dos puntas de la cadena.
                    </p>
                </section>

                <section id="mision" className="mb-4">
                    <h2>Misión y visión</h2>
                    <Row className="g-3">
                        <Col md={6}>
                            <Card body className="h-100 border-success">
                                <h3 className="fs-5 text-success">Misión</h3>
                                <p className="mb-0">
                                    Acercar productos frescos de origen conocido a los hogares urbanos,
                                    con trazabilidad clara y precios que reconozcan el trabajo del
                                    productor.
                                </p>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card body className="h-100 border-success">
                                <h3 className="fs-5 text-success">Visión</h3>
                                <p className="mb-0">
                                    Ser la tienda online de referencia en Chile para la compra de frutas
                                    y verduras de temporada al año 2030.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </section>

                <section id="valores" className="mb-4">
                    <h2>Nuestros valores</h2>
                    <ul>
                        <li><strong>Frescura:</strong> lo que se cosecha hoy se despacha mañana.</li>
                        <li><strong>Transparencia:</strong> cada producto indica el huerto de origen.</li>
                        <li><strong>Comercio justo:</strong> precio acordado con el productor, no impuesto.</li>
                        <li><strong>Cero desperdicio:</strong> lo que no se vende se dona a comedores del barrio.</li>
                    </ul>
                </section>

                <section id="tecnologias">
                    <h2>Tecnologías del proyecto</h2>
                    <Table striped bordered hover responsive className="caption-top">
                        <caption>Herramientas usadas en el proyecto</caption>
                        <thead className="table-success">
                            <tr>
                                <th>Área</th>
                                <th>Herramienta</th>
                                <th>Uso en el proyecto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Estructura</td>
                                <td>React + Vite</td>
                                <td>Componentes JSX para las vistas de la tienda y del administrador.</td>
                            </tr>
                            <tr>
                                <td>Estilos</td>
                                <td>Bootstrap + React-Bootstrap</td>
                                <td>Componentes de React-Bootstrap y clases de Bootstrap, sin hojas CSS propias.</td>
                            </tr>
                            <tr>
                                <td>Interacción</td>
                                <td>JavaScript (ES6)</td>
                                <td>Validación de formularios, listado de productos y carrito.</td>
                            </tr>
                            <tr>
                                <td>Persistencia</td>
                                <td>localStorage</td>
                                <td>Guarda el contenido del carrito de compras entre sesiones.</td>
                            </tr>
                            <tr>
                                <td>Control de versiones</td>
                                <td>Git + GitHub</td>
                                <td>Repositorio público con commits por integrante.</td>
                            </tr>
                        </tbody>
                    </Table>
                </section>
            </Col>
        </Row>
    );
}

export default Nosotros;
