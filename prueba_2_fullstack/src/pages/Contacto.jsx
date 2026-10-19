import { useState } from "react";
import { Row, Col, Card, Form, Button, Alert, Image } from "react-bootstrap";

function correoValido(correo) {
    const partes = correo.trim().toLowerCase().split("@");
    return partes.length === 2 && partes[0] !== "" && ["duoc.cl", "profesor.duoc.cl", "gmail.com"].includes(partes[1]);
}

function Contacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [motivo, setMotivo] = useState("consulta");
    const [comentario, setComentario] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const errorNombre = nombre.trim() === "" ? "El nombre es obligatorio." : "";
    const errorCorreo = correo && !correoValido(correo) ? "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com." : "";
    const errorComentario = comentario.trim() === "" ? "El comentario es obligatorio." : "";

    function enviar(e) {
        e.preventDefault();
        setEnviado(true);

        if (errorNombre || errorCorreo || errorComentario) {
            setMensaje("");
            return;
        }

        setMensaje("Mensaje validado correctamente. Este formulario todavía no envía datos a un servidor.");
    }

    return (
        <main>
            <div className="text-center mb-4">
                <Image src="/img/branding/logo-grande.svg" alt="Logo de Huerto Verde" width="220" height="140" />
                <p className="fw-bold mt-2">Huerto Verde</p>
            </div>

            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Header as="h1" className="fs-5 bg-success text-white">Formulario de contacto</Card.Header>
                        <Card.Body>
                            <Form noValidate onSubmit={enviar}>
                                <Form.Group className="mb-3" controlId="nombre">
                                    <Form.Label>Nombre completo</Form.Label>
                                    <Form.Control type="text" maxLength={100} value={nombre} onChange={e => setNombre(e.target.value)} isInvalid={enviado && errorNombre !== ""} />
                                    <Form.Control.Feedback type="invalid">{errorNombre}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="correo">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="email" maxLength={100} value={correo} onChange={e => setCorreo(e.target.value)} isInvalid={errorCorreo !== ""} />
                                    <Form.Text>Opcional. Sólo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</Form.Text>
                                    <Form.Control.Feedback type="invalid">{errorCorreo}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="motivo">
                                    <Form.Label>Motivo</Form.Label>
                                    <Form.Select value={motivo} onChange={e => setMotivo(e.target.value)}>
                                        <option value="consulta">Consulta general</option>
                                        <option value="pedido">Estado de un pedido</option>
                                        <option value="reclamo">Reclamo</option>
                                        <option value="sugerencia">Sugerencia</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="comentario">
                                    <Form.Label>Comentario</Form.Label>
                                    <Form.Control as="textarea" rows={6} maxLength={500} value={comentario} onChange={e => setComentario(e.target.value)} isInvalid={enviado && errorComentario !== ""} />
                                    <Form.Text>Máximo 500 caracteres. Quedan {500 - comentario.length}.</Form.Text>
                                    <Form.Control.Feedback type="invalid">{errorComentario}</Form.Control.Feedback>
                                </Form.Group>

                                {mensaje && <Alert variant="success">{mensaje}</Alert>}

                                <div className="text-center">
                                    <Button type="submit" variant="success">Enviar mensaje</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    <section>
                        <h2 className="fs-4">Otros canales</h2>
                        <address>
                            Av. Siempre Fresca 1234, Santiago de Chile<br />
                            Teléfono: <a href="tel:+56223456789" className="link-success">+56 2 2345 6789</a><br />
                            Correo: <a href="mailto:contacto@huertoverde.cl" className="link-success">contacto@huertoverde.cl</a>
                        </address>
                        <p>Atención de lunes a sábado, de 9:00 a 19:00 horas.</p>
                    </section>
                </Col>
            </Row>
        </main>
    );
}

export default Contacto;
