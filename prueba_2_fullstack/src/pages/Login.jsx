import { useState } from "react";
import { Row, Col, Card, Form, Button, Alert, Image } from "react-bootstrap";

function correoValido(correo) {
    const partes = correo.trim().toLowerCase().split("@");
    return partes.length === 2 && partes[0] !== "" && ["duoc.cl", "profesor.duoc.cl", "gmail.com"].includes(partes[1]);
}

function Login({ irA }) {
    const [correo, setCorreo] = useState(localStorage.getItem("correo-recordado") || "");
    const [contrasena, setContrasena] = useState("");
    const [recordar, setRecordar] = useState(localStorage.getItem("correo-recordado") !== null);
    const [mensaje, setMensaje] = useState("");

    let errorCorreo = "";
    if (correo.trim() === "") errorCorreo = "El correo es obligatorio.";
    else if (!correoValido(correo)) errorCorreo = "Sólo se permiten estos dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com.";

    let errorContrasena = "";
    if (contrasena === "") errorContrasena = "La contraseña es obligatoria.";
    else if (contrasena.length < 4 || contrasena.length > 10) errorContrasena = "La contraseña debe tener entre 4 y 10 caracteres.";

    const valido = errorCorreo === "" && errorContrasena === "";

    function enviar(e) {
        e.preventDefault();

        if (recordar) {
            localStorage.setItem("correo-recordado", correo.trim());
        } else {
            localStorage.removeItem("correo-recordado");
        }

        if (correo.trim().toLowerCase() === "admin@duoc.cl") {
            irA("admin");
        } else {
            setMensaje("Datos válidos. La autenticación requiere un backend.");
        }
    }

    return (
        <main>
            <div className="text-center mb-4">
                <Image src="/img/branding/logo-grande.svg" alt="Logo de Huerto Verde" width="220" height="140" />
                <p className="fw-bold mt-2">Huerto Verde</p>
            </div>

            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header as="h1" className="fs-5 bg-success text-white">Inicio de sesión</Card.Header>
                        <Card.Body>
                            <Form noValidate onSubmit={enviar}>
                                <Form.Group className="mb-3" controlId="correo">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="email" maxLength={100} value={correo} onChange={e => setCorreo(e.target.value)} isInvalid={correo !== "" && errorCorreo !== ""} />
                                    <Form.Text>Sólo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</Form.Text>
                                    <Form.Control.Feedback type="invalid">{errorCorreo}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="contrasena">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" maxLength={10} value={contrasena} onChange={e => setContrasena(e.target.value)} isInvalid={contrasena !== "" && errorContrasena !== ""} />
                                    <Form.Text>Entre 4 y 10 caracteres</Form.Text>
                                    <Form.Control.Feedback type="invalid">{errorContrasena}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Check
                                    type="checkbox"
                                    id="recordar"
                                    label="Recordar mi correo en este equipo"
                                    checked={recordar}
                                    onChange={e => setRecordar(e.target.checked)}
                                    className="mb-3"
                                />

                                <div className="d-grid">
                                    <Button type="submit" variant="success" disabled={!valido}>Iniciar sesión</Button>
                                </div>

                                {mensaje && <Alert variant="success" className="mt-3 mb-0">{mensaje}</Alert>}

                                <p className="text-center mt-3 mb-0">
                                    ¿No tienes cuenta? <a href="#" onClick={() => irA("registro")} className="link-success">Regístrate</a>
                                </p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </main>
    );
}

export default Login;
