import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";

function Footer({ irA }) {
    return (
        <footer className="bg-body-tertiary border-top mt-5 py-4 small">
            <Container>
                <Row className="g-4">
                    <Col md={4}>
                        <p className="fw-bold mb-2">Huerto Verde</p>
                        <p>
                            Av. Siempre Fresca 1234, Santiago de Chile<br />
                            +56 2 2345 6789 · contacto@huertoverde.cl
                        </p>
                        <div className="d-flex gap-2">
                            <img src="/img/pagos/pago-visa.svg" alt="VISA" width="72" height="36" className="bg-white border rounded" />
                            <img src="/img/pagos/pago-mastercard.svg" alt="MASTERCARD" width="72" height="36" className="bg-white border rounded" />
                            <img src="/img/pagos/pago-redcompra.svg" alt="REDCOMPRA" width="72" height="36" className="bg-white border rounded" />
                        </div>
                    </Col>

                    <Col md={4}>
                        <h2 className="h6">Categorías</h2>
                        <ul className="list-unstyled">
                            <li><a href="#" onClick={() => irA("productos", "frutas")} className="link-success">Frutas</a></li>
                            <li><a href="#" onClick={() => irA("productos", "verduras")} className="link-success">Verduras</a></li>
                            <li><a href="#" onClick={() => irA("productos", "organicos")} className="link-success">Orgánicos</a></li>
                        </ul>
                    </Col>

                    <Col md={4}>
                        <h2 className="h6">Mantente en contacto</h2>
                        <p>Suscríbete y recibe las ofertas de la semana.</p>
                        <Form onSubmit={e => e.preventDefault()}>
                            <InputGroup size="sm">
                                <Form.Control type="email" placeholder="Ingresa tu correo" maxLength={100} />
                                <Button type="submit" variant="outline-success">Suscribirse</Button>
                            </InputGroup>
                        </Form>
                        <p className="mt-3 mb-0 text-muted">&copy; 2026 Huerto Verde · Entrega 1 DSY1104</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
