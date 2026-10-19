import { Card, Row, Col, Button } from "react-bootstrap";

function Blogs({ irA }) {
    return (
        <main>
            <h1 className="text-center">Noticias importantes</h1>
            <p className="text-center text-muted mb-4">Datos curiosos y novedades del mundo de las frutas y verduras.</p>

            <Card as="article" className="mb-4 shadow-sm">
                <Row className="g-0">
                    <Col md={7}>
                        <Card.Body>
                            <Card.Title as="h2">Caso curioso #1: la manzana que flota</Card.Title>
                            <Card.Text>
                                Una manzana es un 25 % aire, y por eso flota en el agua. Ese mismo aire
                                explica por qué se magulla tan rápido cuando la transportamos sin
                                cuidado. Te contamos cómo elegimos las cajas para que lleguen intactas.
                            </Card.Text>
                            <Button variant="success" onClick={() => irA("blog1")}>Ver caso</Button>
                            <Card.Text className="mt-3"><small className="text-muted">12 de agosto de 2026 · Datos curiosos</small></Card.Text>
                        </Card.Body>
                    </Col>
                    <Col md={5}>
                        <Card.Img src="/img/productos/manzana-fuji.jpg" alt="Manzanas frescas" height="320" className="object-fit-cover" />
                    </Col>
                </Row>
            </Card>

            <Card as="article" className="mb-4 shadow-sm">
                <Row className="g-0">
                    <Col md={7}>
                        <Card.Body>
                            <Card.Title as="h2">Caso curioso #2: el plátano es una hierba</Card.Title>
                            <Card.Text>
                                Botánicamente el plátano no crece en un árbol: la planta es la hierba
                                más alta del mundo y puede superar los 7 metros. Revisamos qué implica
                                eso para la cosecha y por qué el plátano llega verde a Chile.
                            </Card.Text>
                            <Button variant="success" onClick={() => irA("blog2")}>Ver caso</Button>
                            <Card.Text className="mt-3"><small className="text-muted">28 de agosto de 2026 · Datos curiosos</small></Card.Text>
                        </Card.Body>
                    </Col>
                    <Col md={5}>
                        <Card.Img src="/img/productos/platano.jpg" alt="Plátanos frescos" height="320" className="object-fit-cover" />
                    </Col>
                </Row>
            </Card>
        </main>
    );
}

export default Blogs;
