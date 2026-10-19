import { useState } from "react";

const logo = {
    display: "block",
    width: 220,
    height: 140,
    margin: "24px auto 8px",
    boxSizing: "border-box",
    objectFit: "contain",
    border: "1px solid #cbbda9",
    background: "#ead8c5"
};
const caja = { maxWidth: 560, boxSizing: "border-box", margin: "24px auto", paddingBottom: 20, border: "1px solid #cbbda9", background: "#ffffff" };
const tituloCaja = { margin: 0, padding: "11px 16px", background: "#355e3b", color: "#ffffff", fontSize: 16 };
const campo = { marginBottom: 14 };
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

        // el admin entra al panel, para el resto todavia falta el backend
        if (correo.trim().toLowerCase() === "admin@duoc.cl") {
            irA("admin");
        } else {
            setMensaje("Datos válidos. La autenticación requiere un backend.");
        }
    }

    return (
        <main>
            <div style={{ textAlign: "center" }}>
                <img src="/img/branding/logo-grande.svg" alt="Logo de Huerto Verde" style={logo} />
                <p><strong>Huerto Verde</strong></p>
            </div>

            <section style={caja}>
                <h1 style={tituloCaja}>Inicio de sesión</h1>

                <form onSubmit={enviar} style={{ padding: 16 }}>
                    <div style={campo}>
                        <label htmlFor="correo" style={label}>Correo</label>
                        <input type="email" id="correo" maxLength={100} value={correo} onChange={e => setCorreo(e.target.value)} style={input} />
                        <small style={ayuda}>Sólo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</small>
                        {correo && errorCorreo && <p style={error}>{errorCorreo}</p>}
                    </div>

                    <div style={campo}>
                        <label htmlFor="contrasena" style={label}>Contraseña</label>
                        <input type="password" id="contrasena" maxLength={10} value={contrasena} onChange={e => setContrasena(e.target.value)} style={input} />
                        <small style={ayuda}>Entre 4 y 10 caracteres</small>
                        {contrasena && errorContrasena && <p style={error}>{errorContrasena}</p>}
                    </div>

                    <div style={campo}>
                        <label htmlFor="recordar" style={{ ...label, display: "inline" }}>
                            <input type="checkbox" id="recordar" checked={recordar} onChange={e => setRecordar(e.target.checked)} />
                            Recordar mi correo en este equipo
                        </label>
                    </div>

                    <p style={{ textAlign: "center" }}>
                        <button
                            type="submit"
                            disabled={!valido}
                            style={valido ? botonPrincipal : { ...botonPrincipal, opacity: 0.5, cursor: "not-allowed" }}
                        >
                            Iniciar sesión
                        </button>
                    </p>

                    {mensaje && <p style={exito}>{mensaje}</p>}

                    <p style={{ textAlign: "center" }}>
                        ¿No tienes cuenta? <a href="#" onClick={() => irA("registro")} style={{ color: "#355e3b" }}>Regístrate</a>
                    </p>
                </form>
            </section>
        </main>
    );
}

export default Login;
