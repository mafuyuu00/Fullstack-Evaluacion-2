import { useState } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { comunasPorRegion } from "../data/regiones";

function correoValido(correo) {
    const partes = correo.trim().toLowerCase().split("@");
    return partes.length === 2 && partes[0] !== "" && ["duoc.cl", "profesor.duoc.cl", "gmail.com"].includes(partes[1]);
}

function digitoVerificador(cuerpo) {
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);
    if (resto === 11) return "0";
    if (resto === 10) return "K";
    return String(resto);
}

function FormularioUsuario({ usuario, esNuevo, irA }) {
    const [run, setRun] = useState(usuario.run);
    const [nombre, setNombre] = useState(usuario.nombre);
    const [apellidos, setApellidos] = useState(usuario.apellidos);
    const [correo, setCorreo] = useState(usuario.correo);
    const [fechaNacimiento, setFechaNacimiento] = useState(usuario.fechaNacimiento);
    const [tipo, setTipo] = useState(usuario.tipo);
    const [region, setRegion] = useState(usuario.region);
    const [comuna, setComuna] = useState(usuario.comuna);
    const [direccion, setDireccion] = useState(usuario.direccion);
    const [contrasena, setContrasena] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [mensaje, setMensaje] = useState("");

    let errorRun = "";
    if (esNuevo) {
        const valor = run.trim().toUpperCase();
        if (valor === "") errorRun = "El RUN es obligatorio.";
        else if (!/^[0-9]+[0-9K]$/.test(valor)) errorRun = "El RUN debe ingresarse sin puntos ni guion. Ejemplo: 19011029K";
        else if (valor.length < 7 || valor.length > 9) errorRun = "El RUN debe tener entre 7 y 9 caracteres.";
        else if (valor.slice(-1) !== digitoVerificador(valor.slice(0, -1))) {
            errorRun = "El RUN no es válido, el dígito verificador debería ser " + digitoVerificador(valor.slice(0, -1)) + ".";
        }
    }

    const errorNombre = nombre.trim() === "" ? "El nombre es obligatorio." : "";
    const errorApellidos = apellidos.trim() === "" ? "Los apellidos son obligatorios." : "";

    let errorCorreo = "";
    if (correo.trim() === "") errorCorreo = "El correo es obligatorio.";
    else if (!correoValido(correo)) errorCorreo = "El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com";

    const errorTipo = tipo === "" ? "Debe seleccionar el tipo de usuario." : "";
    const errorRegion = region === "" ? "Debe seleccionar una región." : "";
    const errorComuna = comuna === "" ? "Debe seleccionar una comuna." : "";
    const errorDireccion = direccion.trim() === "" ? "La dirección es obligatoria." : "";

    let errorContrasena = "";
    if (contrasena === "" && esNuevo) errorContrasena = "La contraseña es obligatoria.";
    else if (contrasena !== "" && (contrasena.length < 4 || contrasena.length > 10)) errorContrasena = "La contraseña debe tener entre 4 y 10 caracteres.";

    const errorConfirmar = confirmar !== contrasena ? "Las contraseñas no coinciden." : "";

    function enviar(e) {
        e.preventDefault();
        setEnviado(true);

        if (errorRun || errorNombre || errorApellidos || errorCorreo || errorTipo || errorRegion
            || errorComuna || errorDireccion || errorContrasena || errorConfirmar) {
            setMensaje("");
            return;
        }

        setMensaje("Datos válidos. Guardar el usuario requiere un backend.");
    }

    const camposContrasena = (
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3" controlId="contrasena">
                    <Form.Label>{esNuevo ? "Contraseña" : "Nueva contraseña"}</Form.Label>
                    <Form.Control
                        type="password"
                        maxLength={10}
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                        isInvalid={(enviado || contrasena !== "") && errorContrasena !== ""}
                    />
                    <Form.Text>{esNuevo ? "Entre 4 y 10 caracteres." : "Entre 4 y 10 caracteres. Deja el campo vacío para no cambiarla."}</Form.Text>
                    <Form.Control.Feedback type="invalid">{errorContrasena}</Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3" controlId="confirmar">
                    <Form.Label>{esNuevo ? "Confirmar contraseña" : "Confirmar nueva contraseña"}</Form.Label>
                    <Form.Control
                        type="password"
                        maxLength={10}
                        value={confirmar}
                        onChange={e => setConfirmar(e.target.value)}
                        isInvalid={(enviado || confirmar !== "") && errorConfirmar !== ""}
                    />
                    <Form.Control.Feedback type="invalid">{errorConfirmar}</Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
    );

    return (
        <Card className="my-4 shadow-sm">
            <Card.Header as="h2" className="h6 bg-success text-white">
                {esNuevo ? "Datos del usuario" : "Datos de " + usuario.nombre + " " + usuario.apellidos}
            </Card.Header>

            <Card.Body>
                <Form noValidate onSubmit={enviar}>
                    <Form.Group className="mb-3" controlId="run">
                        <Form.Label>Run</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={9}
                            placeholder="19011029K"
                            readOnly={!esNuevo}
                            value={run}
                            onChange={e => setRun(e.target.value)}
                            isInvalid={(enviado || run !== "") && errorRun !== ""}
                        />
                        <Form.Text>
                            {esNuevo ? "Sin puntos ni guion. Ejemplo: 19011029K" : "El Run no se puede modificar, es la clave del registro."}
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">{errorRun}</Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength={50}
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    isInvalid={enviado && errorNombre !== ""}
                                />
                                {esNuevo && <Form.Text>Máximo 50 caracteres.</Form.Text>}
                                <Form.Control.Feedback type="invalid">{errorNombre}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="apellidos">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength={100}
                                    value={apellidos}
                                    onChange={e => setApellidos(e.target.value)}
                                    isInvalid={enviado && errorApellidos !== ""}
                                />
                                {esNuevo && <Form.Text>Máximo 100 caracteres.</Form.Text>}
                                <Form.Control.Feedback type="invalid">{errorApellidos}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="correo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="email"
                            maxLength={100}
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                            isInvalid={(enviado || correo !== "") && errorCorreo !== ""}
                        />
                        <Form.Text>Sólo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</Form.Text>
                        <Form.Control.Feedback type="invalid">{errorCorreo}</Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="fecha-nacimiento">
                                <Form.Label>Fecha de nacimiento (opcional)</Form.Label>
                                <Form.Control type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="tipo">
                                <Form.Label>Tipo de usuario</Form.Label>
                                <Form.Select value={tipo} onChange={e => setTipo(e.target.value)} isInvalid={enviado && errorTipo !== ""}>
                                    <option value="">-- Seleccione el perfil --</option>
                                    <option value="administrador">Administrador</option>
                                    <option value="vendedor">Vendedor</option>
                                    <option value="cliente">Cliente</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errorTipo}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="region">
                                <Form.Label>Región</Form.Label>
                                <Form.Select
                                    value={region}
                                    onChange={e => {
                                        setRegion(e.target.value);
                                        setComuna("");
                                    }}
                                    isInvalid={enviado && errorRegion !== ""}
                                >
                                    <option value="">-- Seleccione la región --</option>
                                    {Object.keys(comunasPorRegion).map(nombreRegion => (
                                        <option key={nombreRegion} value={nombreRegion}>{nombreRegion}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errorRegion}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="comuna">
                                <Form.Label>Comuna</Form.Label>
                                <Form.Select value={comuna} onChange={e => setComuna(e.target.value)} isInvalid={enviado && errorComuna !== ""}>
                                    <option value="">-- Seleccione la comuna --</option>
                                    {region && comunasPorRegion[region].map(nombreComuna => (
                                        <option key={nombreComuna} value={nombreComuna}>{nombreComuna}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errorComuna}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="direccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={300}
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                            isInvalid={enviado && errorDireccion !== ""}
                        />
                        {esNuevo && <Form.Text>Calle, número y departamento. Máximo 300 caracteres.</Form.Text>}
                        <Form.Control.Feedback type="invalid">{errorDireccion}</Form.Control.Feedback>
                    </Form.Group>

                    {esNuevo ? camposContrasena : (
                        <fieldset className="border rounded p-3 mb-3">
                            <legend className="fs-6">Cambiar contraseña (opcional)</legend>
                            {camposContrasena}
                        </fieldset>
                    )}

                    {mensaje && <Alert variant="success">{mensaje}</Alert>}

                    <div className="d-flex flex-wrap gap-2">
                        <Button type="submit" variant="success">{esNuevo ? "Registrar" : "Guardar cambios"}</Button>
                        <Button href="#" variant="outline-success" onClick={() => irA("admin-usuarios")}>Cancelar</Button>
                        {!esNuevo && <Button variant="outline-danger">Eliminar usuario</Button>}
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default FormularioUsuario;
