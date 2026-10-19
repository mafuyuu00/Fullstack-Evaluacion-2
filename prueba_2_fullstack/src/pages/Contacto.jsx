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
const enlace = { color: "#355e3b" };
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

function Contacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [motivo, setMotivo] = useState("consulta");
    const [comentario, setComentario] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const errorNombre = nombre.trim() === "" ? "El nombre es obligatorio." : "";
    // el correo es opcional, solo se revisa si escriben algo
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
            <div style={{ textAlign: "center" }}>
                <img src="/img/branding/logo-grande.svg" alt="Logo de Huerto Verde" style={logo} />
                <p><strong>Huerto Verde</strong></p>
            </div>

            <section style={caja}>
                <h1 style={tituloCaja}>Formulario de contacto</h1>

                <form onSubmit={enviar} style={{ padding: 16 }}>
                    <div style={campo}>
                        <label htmlFor="nombre" style={label}>Nombre completo</label>
                        <input type="text" id="nombre" maxLength={100} value={nombre} onChange={e => setNombre(e.target.value)} style={input} />
                        {enviado && errorNombre && <p style={error}>{errorNombre}</p>}
                    </div>

                    <div style={campo}>
                        <label htmlFor="correo" style={label}>Correo</label>
                        <input type="email" id="correo" maxLength={100} value={correo} onChange={e => setCorreo(e.target.value)} style={input} />
                        <small style={ayuda}>Opcional. Sólo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</small>
                        {errorCorreo && <p style={error}>{errorCorreo}</p>}
                    </div>

                    <div style={campo}>
                        <label htmlFor="motivo" style={label}>Motivo</label>
                        <select id="motivo" value={motivo} onChange={e => setMotivo(e.target.value)} style={input}>
                            <option value="consulta">Consulta general</option>
                            <option value="pedido">Estado de un pedido</option>
                            <option value="reclamo">Reclamo</option>
                            <option value="sugerencia">Sugerencia</option>
                        </select>
                    </div>

                    <div style={campo}>
                        <label htmlFor="comentario" style={label}>Comentario</label>
                        <textarea id="comentario" rows={6} maxLength={500} value={comentario} onChange={e => setComentario(e.target.value)} style={input} />
                        <small style={ayuda}>Máximo 500 caracteres. Quedan {500 - comentario.length}.</small>
                        {enviado && errorComentario && <p style={error}>{errorComentario}</p>}
                    </div>

                    {mensaje && <p style={exito}>{mensaje}</p>}

                    <p style={{ textAlign: "center" }}>
                        <button type="submit" style={botonPrincipal}>Enviar mensaje</button>
                    </p>
                </form>
            </section>

            <section>
                <h2>Otros canales</h2>
                <address>
                    Av. Siempre Fresca 1234, Santiago de Chile<br />
                    Teléfono: <a href="tel:+56223456789" style={enlace}>+56 2 2345 6789</a><br />
                    Correo: <a href="mailto:contacto@huertoverde.cl" style={enlace}>contacto@huertoverde.cl</a>
                </address>
                <p>Atención de lunes a sábado, de 9:00 a 19:00 horas.</p>
            </section>
        </main>
    );
}

export default Contacto;
