import { useState } from "react";
import { comunasPorRegion } from "../data/regiones";

const caja = { maxWidth: 720, boxSizing: "border-box", margin: "24px auto 24px 0", paddingBottom: 20, border: "1px solid #cbbda9", background: "#ffffff" };
const tituloCaja = { margin: 0, padding: "11px 16px", background: "#355e3b", color: "#ffffff", fontSize: 16 };
const fila = { display: "flex", gap: 12, flexWrap: "wrap" };
const campo = { marginBottom: 14 };
const campoFila = { marginBottom: 14, flex: "1 1 200px" };
const label = { display: "block", marginBottom: 4, fontSize: 12, textTransform: "uppercase" };
const input = { width: "100%", boxSizing: "border-box", padding: 7, border: "1px solid #cbbda9", background: "#fffaf2", font: "inherit" };
const ayuda = { display: "block", color: "#665b50", fontSize: 12 };
const error = { margin: "4px 0 0", color: "#a94442", fontSize: 12 };
const exito = { color: "#355e3b", fontWeight: "bold" };
const boton = {
    display: "inline-block",
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    font: "inherit",
    cursor: "pointer",
    textDecoration: "none"
};
const botonPrincipal = { ...boton, border: "1px solid #355e3b", background: "#355e3b", color: "#ffffff" };

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
        <div style={fila}>
            <div style={campoFila}>
                <label htmlFor="contrasena" style={label}>{esNuevo ? "Contraseña" : "Nueva contraseña"}</label>
                <input type="password" id="contrasena" maxLength={10} value={contrasena} onChange={e => setContrasena(e.target.value)} style={input} />
                <small style={ayuda}>{esNuevo ? "Entre 4 y 10 caracteres." : "Entre 4 y 10 caracteres. Deja el campo vacío para no cambiarla."}</small>
                {(enviado || contrasena) && errorContrasena && <p style={error}>{errorContrasena}</p>}
            </div>
            <div style={campoFila}>
                <label htmlFor="confirmar" style={label}>{esNuevo ? "Confirmar contraseña" : "Confirmar nueva contraseña"}</label>
                <input type="password" id="confirmar" maxLength={10} value={confirmar} onChange={e => setConfirmar(e.target.value)} style={input} />
                {(enviado || confirmar) && errorConfirmar && <p style={error}>{errorConfirmar}</p>}
            </div>
        </div>
    );

    return (
        <section style={caja}>
            <h2 style={tituloCaja}>{esNuevo ? "Datos del usuario" : "Datos de " + usuario.nombre + " " + usuario.apellidos}</h2>

            <form onSubmit={enviar} style={{ padding: 16 }}>
                <div style={campo}>
                    <label htmlFor="run" style={label}>Run</label>
                    <input
                        type="text"
                        id="run"
                        maxLength={9}
                        placeholder="19011029K"
                        readOnly={!esNuevo}
                        value={run}
                        onChange={e => setRun(e.target.value)}
                        style={input}
                    />
                    <small style={ayuda}>
                        {esNuevo ? "Sin puntos ni guion. Ejemplo: 19011029K" : "El Run no se puede modificar, es la clave del registro."}
                    </small>
                    {(enviado || run) && errorRun && <p style={error}>{errorRun}</p>}
                </div>

                <div style={fila}>
                    <div style={campoFila}>
                        <label htmlFor="nombre" style={label}>Nombre</label>
                        <input type="text" id="nombre" maxLength={50} value={nombre} onChange={e => setNombre(e.target.value)} style={input} />
                        {esNuevo && <small style={ayuda}>Máximo 50 caracteres.</small>}
                        {enviado && errorNombre && <p style={error}>{errorNombre}</p>}
                    </div>
                    <div style={campoFila}>
                        <label htmlFor="apellidos" style={label}>Apellidos</label>
                        <input type="text" id="apellidos" maxLength={100} value={apellidos} onChange={e => setApellidos(e.target.value)} style={input} />
                        {esNuevo && <small style={ayuda}>Máximo 100 caracteres.</small>}
                        {enviado && errorApellidos && <p style={error}>{errorApellidos}</p>}
                    </div>
                </div>

                <div style={campo}>
                    <label htmlFor="correo" style={label}>Correo</label>
                    <input type="email" id="correo" maxLength={100} value={correo} onChange={e => setCorreo(e.target.value)} style={input} />
                    <small style={ayuda}>Sólo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</small>
                    {(enviado || correo) && errorCorreo && <p style={error}>{errorCorreo}</p>}
                </div>

                <div style={fila}>
                    <div style={campoFila}>
                        <label htmlFor="fecha-nacimiento" style={label}>Fecha de nacimiento (opcional)</label>
                        <input type="date" id="fecha-nacimiento" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} style={input} />
                    </div>
                    <div style={campoFila}>
                        <label htmlFor="tipo" style={label}>Tipo de usuario</label>
                        <select id="tipo" value={tipo} onChange={e => setTipo(e.target.value)} style={input}>
                            <option value="">-- Seleccione el perfil --</option>
                            <option value="administrador">Administrador</option>
                            <option value="vendedor">Vendedor</option>
                            <option value="cliente">Cliente</option>
                        </select>
                        {enviado && errorTipo && <p style={error}>{errorTipo}</p>}
                    </div>
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
                        {enviado && errorRegion && <p style={error}>{errorRegion}</p>}
                    </div>
                    <div style={campoFila}>
                        <label htmlFor="comuna" style={label}>Comuna</label>
                        <select id="comuna" value={comuna} onChange={e => setComuna(e.target.value)} style={input}>
                            <option value="">-- Seleccione la comuna --</option>
                            {region && comunasPorRegion[region].map(nombreComuna => (
                                <option key={nombreComuna} value={nombreComuna}>{nombreComuna}</option>
                            ))}
                        </select>
                        {enviado && errorComuna && <p style={error}>{errorComuna}</p>}
                    </div>
                </div>

                <div style={campo}>
                    <label htmlFor="direccion" style={label}>Dirección</label>
                    <input type="text" id="direccion" maxLength={300} value={direccion} onChange={e => setDireccion(e.target.value)} style={input} />
                    {esNuevo && <small style={ayuda}>Calle, número y departamento. Máximo 300 caracteres.</small>}
                    {enviado && errorDireccion && <p style={error}>{errorDireccion}</p>}
                </div>

                {esNuevo ? camposContrasena : (
                    <fieldset>
                        <legend>Cambiar contraseña (opcional)</legend>
                        {camposContrasena}
                    </fieldset>
                )}

                {mensaje && <p style={exito}>{mensaje}</p>}

                <p style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <button type="submit" style={botonPrincipal}>{esNuevo ? "Registrar" : "Guardar cambios"}</button>
                    <a href="#" onClick={() => irA("admin-usuarios")} style={boton}>Cancelar</a>
                    {!esNuevo && <button type="button" style={boton}>Eliminar usuario</button>}
                </p>
            </form>
        </section>
    );
}

export default FormularioUsuario;
