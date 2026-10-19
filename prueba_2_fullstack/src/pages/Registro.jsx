import { useState } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { comunasPorRegion } from "../data/regiones";

const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(\s+[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/;

function correoValido(correo) {
    const partes = correo.trim().toLowerCase().split("@");
    return partes.length === 2 && partes[0] !== "" && ["duoc.cl", "profesor.duoc.cl", "gmail.com"].includes(partes[1]);
}

function calcularEdad(fecha) {
    const nacimiento = new Date(fecha + "T00:00:00");
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

function Registro({ irA }) {
    const [run, setRun] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [direccion, setDireccion] = useState("");
    const [mensaje, setMensaje] = useState("");

    let errorRun = "";
    if (!/^[0-9]+[0-9Kk]?$/.test(run)) errorRun = "El RUN debe ingresarse sin puntos ni guion.";
    else if (run.length < 7 || run.length > 9) errorRun = "El RUN debe tener entre 7 y 9 caracteres.";

    const errorNombre = soloLetras.test(nombre.trim()) ? "" : "El nombre solo debe contener letras y espacios.";
    const errorApellidos = soloLetras.test(apellidos.trim()) ? "" : "Los apellidos solo deben contener letras y espacios.";
    const errorCorreo = correoValido(correo) ? "" : "Sólo se permiten estos dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com.";
    const errorContrasena = contrasena.length >= 4 && contrasena.length <= 10 ? "" : "La contraseña debe tener entre 4 y 10 caracteres.";
    const errorConfirmar = confirmar === contrasena ? "" : "Las contraseñas no coinciden.";

    const errorFecha = fechaNacimiento && calcularEdad(fechaNacimiento) < 18 ? "Debes ser mayor de 18 años." : "";
    const errorTelefono = telefono && !/^\+569[0-9]{8}$/.test(telefono) ? "Ingrese un teléfono válido, por ejemplo +56912345678." : "";

    let errorDireccion = "";
    if (direccion.trim() === "") errorDireccion = "La dirección es obligatoria.";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9\s.,#-]+$/.test(direccion.trim())) errorDireccion = "La dirección contiene caracteres no válidos.";

    const valido = errorRun === "" && errorNombre === "" && errorApellidos === "" && errorCorreo === ""
        && errorContrasena === "" && errorConfirmar === "" && errorFecha === "" && errorTelefono === ""
        && region !== "" && comuna !== "" && errorDireccion === "";

    function enviar(e) {
        e.preventDefault();
        setMensaje("Datos válidos. El registro todavía no se guarda en un servidor.");
    }

    return (
        <main>
            <Row className="justify-content-center">
                <Col md={10} lg={7}>
                    <Card className="shadow-sm">
                        <Card.Header as="h1" className="fs-5 bg-success text-white">Registro de usuario</Card.Header>
                        <Card.Body>
                            <Form noValidate onSubmit={enviar}>
                                <Form.Group className="mb-3" controlId="run">
                                    <Form.Label>Run</Form.Label>
                                    <Form.Control type="text" maxLength={9} placeholder="19011029K" value={run} onChange={e => setRun(e.target.value)} isInvalid={run !== "" && errorRun !== ""} />
                                    <Form.Text>Sin puntos ni guion. Ejemplo: 19011029K</Form.Text>
                                    <Form.Control.Feedback type="invalid">{errorRun}</Form.Control.Feedback>
                                </Form.Group>

                                <Row>
                                    <Form.Group as={Col} md={6} className="mb-3" controlId="nombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" maxLength={50} value={nombre} onChange={e => setNombre(e.target.value)} isInvalid={nombre !== "" && errorNombre !== ""} />
                                        <Form.Control.Feedback type="invalid">{errorNombre}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md={6} className="mb-3" controlId="apellidos">
                                        <Form.Label>Apellidos</Form.Label>
                                        <Form.Control type="text" maxLength={100} value={apellidos} onChange={e => setApellidos(e.target.value)} isInvalid={apellidos !== "" && errorApellidos !== ""} />
                                        <Form.Control.Feedback type="invalid">{errorApellidos}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="correo">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="email" maxLength={100} value={correo} onChange={e => setCorreo(e.target.value)} isInvalid={correo !== "" && errorCorreo !== ""} />
                                    <Form.Text>Sólo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</Form.Text>
                                    <Form.Control.Feedback type="invalid">{errorCorreo}</Form.Control.Feedback>
                                </Form.Group>

                                <Row>
                                    <Form.Group as={Col} md={6} className="mb-3" controlId="contrasena">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" maxLength={10} value={contrasena} onChange={e => setContrasena(e.target.value)} isInvalid={contrasena !== "" && errorContrasena !== ""} />
                                        <Form.Text>Entre 4 y 10 caracteres</Form.Text>
                                        <Form.Control.Feedback type="invalid">{errorContrasena}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md={6} className="mb-3" controlId="confirmar">
                                        <Form.Label>Confirmar contraseña</Form.Label>
                                        <Form.Control type="password" maxLength={10} value={confirmar} onChange={e => setConfirmar(e.target.value)} isInvalid={confirmar !== "" && errorConfirmar !== ""} />
                                        <Form.Control.Feedback type="invalid">{errorConfirmar}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} md={6} className="mb-3" controlId="fecha-nacimiento">
                                        <Form.Label>Fecha de nacimiento (opcional)</Form.Label>
                                        <Form.Control type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} isInvalid={errorFecha !== ""} />
                                        <Form.Control.Feedback type="invalid">{errorFecha}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md={6} className="mb-3" controlId="telefono">
                                        <Form.Label>Teléfono (opcional)</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            maxLength={15}
                                            placeholder="+56912345678"
                                            value={telefono}
                                            onChange={e => setTelefono(e.target.value.replace(/[^0-9+]/g, ""))}
                                            isInvalid={errorTelefono !== ""}
                                        />
                                        <Form.Control.Feedback type="invalid">{errorTelefono}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} md={6} className="mb-3" controlId="region">
                                        <Form.Label>Región</Form.Label>
                                        <Form.Select
                                            value={region}
                                            onChange={e => {
                                                setRegion(e.target.value);
                                                setComuna("");
                                            }}
                                        >
                                            <option value="">-- Seleccione la región --</option>
                                            {Object.keys(comunasPorRegion).map(nombreRegion => (
                                                <option key={nombreRegion} value={nombreRegion}>{nombreRegion}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md={6} className="mb-3" controlId="comuna">
                                        <Form.Label>Comuna</Form.Label>
                                        <Form.Select value={comuna} onChange={e => setComuna(e.target.value)}>
                                            <option value="">-- Seleccione la comuna --</option>
                                            {region && comunasPorRegion[region].map(nombreComuna => (
                                                <option key={nombreComuna} value={nombreComuna}>{nombreComuna}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="direccion">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control type="text" maxLength={300} value={direccion} onChange={e => setDireccion(e.target.value)} isInvalid={direccion !== "" && errorDireccion !== ""} />
                                    <Form.Control.Feedback type="invalid">{errorDireccion}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button type="submit" variant="success" disabled={!valido}>Registrar</Button>
                                </div>

                                {mensaje && <Alert variant="success" className="mt-3 mb-0">{mensaje}</Alert>}

                                <p className="text-center mt-3 mb-0">
                                    ¿Ya tienes cuenta? <a href="#" onClick={() => irA("login")} className="link-success">Inicia sesión</a>
                                </p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </main>
    );
}

export default Registro;
