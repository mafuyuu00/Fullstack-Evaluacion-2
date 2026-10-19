import { useState } from "react";
import { comunasPorRegion } from "../data/regiones";

const caja = { maxWidth: 560, boxSizing: "border-box", margin: "24px auto", paddingBottom: 20, border: "1px solid #cbbda9", background: "#ffffff" };
const tituloCaja = { margin: 0, padding: "11px 16px", background: "#355e3b", color: "#ffffff", fontSize: 16 };
const fila = { display: "flex", gap: 12, flexWrap: "wrap" };
const campo = { marginBottom: 14 };
const campoFila = { marginBottom: 14, flex: "1 1 200px" };
const label = { display: "block", marginBottom: 4, fontSize: 12, textTransform: "uppercase" };
const input = { width: "100%", boxSizing: "border-box", padding: 7, border: "1px solid #cbbda9", background: "#fffaf2", font: "inherit" };
const ayuda = { display: "block", color: "#665b50", fontSize: 12 };
const error = { margin: "4px 0 0", color: "#a94442", fontSize: 12 };
const exito = { color: "#355e3b", fontWeight: "bold" };
const botonPrincipal = {
    padding: "8px 16px",
    border: "1px solid #355e3b",
    background: "#355e3b",
    color: "#ffffff",
    font: "inherit",
    cursor: "pointer"
};

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

    // fecha y telefono son opcionales, solo se revisan si escriben algo
    const errorFecha = fechaNacimiento && calcularEdad(fechaNacimiento) < 18 ? "Debes ser mayor de 18 años." : "";
    const errorTelefono = telefono && !/^\+569[0-9]{8}$/.test(telefono) ? "Ingrese un teléfono válido, por ejemplo +56912345678." : "";

    let errorDireccion = "";
    if (direccion.trim() === "") errorDireccion = "La dirección es obligatoria.";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9\s.,#-]+$/.test(direccion.trim())) errorDireccion = "La dirección contiene caracteres no válidos.";

    // el boton se activa solo cuando todo esta bien
    const valido = errorRun === "" && errorNombre === "" && errorApellidos === "" && errorCorreo === ""
        && errorContrasena === "" && errorConfirmar === "" && errorFecha === "" && errorTelefono === ""
        && region !== "" && comuna !== "" && errorDireccion === "";

    function enviar(e) {
        e.preventDefault();
        setMensaje("Datos válidos. El registro todavía no se guarda en un servidor.");
    }

    return (
        <main>
            <section style={caja}>
                <h1 style={tituloCaja}>Registro de usuario</h1>

                <form onSubmit={enviar} style={{ padding: 16 }}>
                    <div style={campo}>
                        <label htmlFor="run" style={label}>Run</label>
                        <input type="text" id="run" maxLength={9} placeholder="19011029K" value={run} onChange={e => setRun(e.target.value)} style={input} />
                        <small style={ayuda}>Sin puntos ni guion. Ejemplo: 19011029K</small>
                        {run && errorRun && <p style={error}>{errorRun}</p>}
                    </div>

                    <div style={fila}>
                        <div style={campoFila}>
                            <label htmlFor="nombre" style={label}>Nombre</label>
                            <input type="text" id="nombre" maxLength={50} value={nombre} onChange={e => setNombre(e.target.value)} style={input} />
                            {nombre && errorNombre && <p style={error}>{errorNombre}</p>}
                        </div>
                        <div style={campoFila}>
                            <label htmlFor="apellidos" style={label}>Apellidos</label>
                            <input type="text" id="apellidos" maxLength={100} value={apellidos} onChange={e => setApellidos(e.target.value)} style={input} />
                            {apellidos && errorApellidos && <p style={error}>{errorApellidos}</p>}
                        </div>
                    </div>

                    <div style={campo}>
                        <label htmlFor="correo" style={label}>Correo</label>
                        <input type="email" id="correo" maxLength={100} value={correo} onChange={e => setCorreo(e.target.value)} style={input} />
                        <small style={ayuda}>Sólo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</small>
                        {correo && errorCorreo && <p style={error}>{errorCorreo}</p>}
                    </div>

                    <div style={fila}>
                        <div style={campoFila}>
                            <label htmlFor="contrasena" style={label}>Contraseña</label>
                            <input type="password" id="contrasena" maxLength={10} value={contrasena} onChange={e => setContrasena(e.target.value)} style={input} />
                            <small style={ayuda}>Entre 4 y 10 caracteres</small>
                            {contrasena && errorContrasena && <p style={error}>{errorContrasena}</p>}
                        </div>
                        <div style={campoFila}>
                            <label htmlFor="confirmar" style={label}>Confirmar contraseña</label>
                            <input type="password" id="confirmar" maxLength={10} value={confirmar} onChange={e => setConfirmar(e.target.value)} style={input} />
                            {confirmar && errorConfirmar && <p style={error}>{errorConfirmar}</p>}
                        </div>
                    </div>

                    <div style={campo}>
                        <label htmlFor="fecha-nacimiento" style={label}>Fecha de nacimiento (opcional)</label>
                        <input type="date" id="fecha-nacimiento" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} style={input} />
                        {errorFecha && <p style={error}>{errorFecha}</p>}
                    </div>

                    <div style={campo}>
                        <label htmlFor="telefono" style={label}>Teléfono (opcional)</label>
                        <input
                            type="tel"
                            id="telefono"
                            maxLength={15}
                            placeholder="+56912345678"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value.replace(/[^0-9+]/g, ""))}
                            style={input}
                        />
                        {errorTelefono && <p style={error}>{errorTelefono}</p>}
                    </div>

                    <div style={fila}>
                        <div style={campoFila}>
                            <label htmlFor="region" style={label}>Región</label>
                            <select
                                id="region"
                                value={region}
                                onChange={e => {
                                    setRegion(e.target.value);
                                    setComuna("");
                                }}
                                style={input}
                            >
                                <option value="">-- Seleccione la región --</option>
                                {Object.keys(comunasPorRegion).map(nombreRegion => (
                                    <option key={nombreRegion} value={nombreRegion}>{nombreRegion}</option>
                                ))}
                            </select>
                        </div>
                        <div style={campoFila}>
                            <label htmlFor="comuna" style={label}>Comuna</label>
                            <select id="comuna" value={comuna} onChange={e => setComuna(e.target.value)} style={input}>
                                <option value="">-- Seleccione la comuna --</option>
                                {region && comunasPorRegion[region].map(nombreComuna => (
                                    <option key={nombreComuna} value={nombreComuna}>{nombreComuna}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={campo}>
                        <label htmlFor="direccion" style={label}>Dirección</label>
                        <input type="text" id="direccion" maxLength={300} value={direccion} onChange={e => setDireccion(e.target.value)} style={input} />
                        {direccion && errorDireccion && <p style={error}>{errorDireccion}</p>}
                    </div>

                    <p style={{ textAlign: "center" }}>
                        <button
                            type="submit"
                            disabled={!valido}
                            style={valido ? botonPrincipal : { ...botonPrincipal, opacity: 0.5, cursor: "not-allowed" }}
                        >
                            Registrar
                        </button>
                    </p>

                    {mensaje && <p style={exito}>{mensaje}</p>}

                    <p style={{ textAlign: "center" }}>
                        ¿Ya tienes cuenta? <a href="#" onClick={() => irA("login")} style={{ color: "#355e3b" }}>Inicia sesión</a>
                    </p>
                </form>
            </section>
        </main>
    );
}

export default Registro;
