import { usuarios, tiposUsuario } from "../../data/usuarios";

const encabezado = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: "2px solid #6b8e4e"
};
const titulo = { margin: 0, color: "#355e3b", fontSize: 24 };
const boton = {
    display: "inline-block",
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    textDecoration: "none"
};
const botonPrincipal = { ...boton, border: "1px solid #355e3b", background: "#355e3b", color: "#ffffff" };
const migas = { display: "flex", gap: 6, margin: "0 0 16px", padding: 0, listStyle: "none", fontSize: 12 };
const enlace = { color: "#355e3b" };
const avatar = {
    display: "block",
    width: 120,
    height: 120,
    boxSizing: "border-box",
    marginBottom: 16,
    border: "1px solid #cbbda9",
    background: "#ead8c5"
};
const ficha = { display: "grid", gridTemplateColumns: "180px 1fr", gap: "6px 16px", margin: 0 };
const dt = { fontSize: 13, fontWeight: "bold" };
const dd = { margin: 0 };
const tabla = { width: "100%", borderCollapse: "collapse", fontSize: 14 };
const tituloTabla = { paddingBottom: 8, fontWeight: "bold", textAlign: "left" };
const celda = { padding: "7px 8px", border: "1px solid #cbbda9", textAlign: "left" };
const encabezadoTabla = { ...celda, background: "#ead8c5", color: "#8b5e3c" };

const descripcionTipo = {
    administrador: "acceso total al sistema",
    vendedor: "sólo puede ver productos y órdenes",
    cliente: "compras en la tienda"
};

// cada fila es: modulo, ver, crear, editar, eliminar
const permisos = {
    administrador: [
        ["Productos", "Sí", "Sí", "Sí", "Sí"],
        ["Usuarios", "Sí", "Sí", "Sí", "Sí"],
        ["Órdenes", "Sí", "Sí", "Sí", "Sí"],
        ["Tienda pública", "Sí", "—", "—", "—"]
    ],
    vendedor: [
        ["Productos", "Sí", "—", "—", "—"],
        ["Usuarios", "—", "—", "—", "—"],
        ["Órdenes", "Sí", "—", "—", "—"],
        ["Tienda pública", "Sí", "—", "—", "—"]
    ],
    cliente: [
        ["Productos", "—", "—", "—", "—"],
        ["Usuarios", "—", "—", "—", "—"],
        ["Órdenes", "—", "—", "—", "—"],
        ["Tienda pública", "Sí", "—", "—", "—"]
    ]
};

function UsuarioVer({ run, irA }) {
    const usuario = usuarios.find(u => u.run === run);
    const fechaNacimiento = new Date(usuario.fechaNacimiento).toLocaleDateString("es-CL", { dateStyle: "long", timeZone: "UTC" });

    return (
        <>
            <header style={encabezado}>
                <h1 style={titulo}>{usuario.nombre} {usuario.apellidos}</h1>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a href="#" onClick={() => irA("admin-usuario-editar", run)} style={botonPrincipal}>Editar</a>
                    <a href="#" onClick={() => irA("admin-usuarios")} style={boton}>Volver al listado</a>
                </div>
            </header>

            <main>
                <ul style={migas}>
                    <li><a href="#" onClick={() => irA("admin")} style={enlace}>Dashboard</a></li>
                    <li>&gt;</li>
                    <li><a href="#" onClick={() => irA("admin-usuarios")} style={enlace}>Usuarios</a></li>
                    <li>&gt;</li>
                    <li>{usuario.run}</li>
                </ul>

                <section>
                    <h2>Ficha del usuario</h2>
                    <img src="/img/branding/logo.svg" alt="Avatar del usuario" style={avatar} />
                    <dl style={ficha}>
                        <dt style={dt}>Run</dt>
                        <dd style={dd}>{usuario.run}</dd>
                        <dt style={dt}>Nombre</dt>
                        <dd style={dd}>{usuario.nombre}</dd>
                        <dt style={dt}>Apellidos</dt>
                        <dd style={dd}>{usuario.apellidos}</dd>
                        <dt style={dt}>Correo</dt>
                        <dd style={dd}><a href={"mailto:" + usuario.correo} style={enlace}>{usuario.correo}</a></dd>
                        <dt style={dt}>Fecha de nacimiento</dt>
                        <dd style={dd}>{fechaNacimiento}</dd>
                        <dt style={dt}>Tipo de usuario</dt>
                        <dd style={dd}>{tiposUsuario[usuario.tipo]} ({descripcionTipo[usuario.tipo]})</dd>
                        <dt style={dt}>Región</dt>
                        <dd style={dd}>{usuario.region}</dd>
                        <dt style={dt}>Comuna</dt>
                        <dd style={dd}>{usuario.comuna}</dd>
                        <dt style={dt}>Dirección</dt>
                        <dd style={dd}>{usuario.direccion}</dd>
                        <dt style={dt}>Fecha de registro</dt>
                        <dd style={dd}>{usuario.fechaRegistro}</dd>
                        <dt style={dt}>Último acceso</dt>
                        <dd style={dd}>{usuario.ultimoAcceso}</dd>
                    </dl>
                </section>

                <section>
                    <h2>Permisos del perfil</h2>
                    <table style={tabla}>
                        <caption style={tituloTabla}>Accesos asociados al perfil {tiposUsuario[usuario.tipo]}</caption>
                        <thead>
                            <tr>
                                <th style={encabezadoTabla}>Módulo</th>
                                <th style={encabezadoTabla}>Ver</th>
                                <th style={encabezadoTabla}>Crear</th>
                                <th style={encabezadoTabla}>Editar</th>
                                <th style={encabezadoTabla}>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permisos[usuario.tipo].map(fila => (
                                <tr key={fila[0]}>
                                    <th style={celda}>{fila[0]}</th>
                                    <td style={celda}>{fila[1]}</td>
                                    <td style={celda}>{fila[2]}</td>
                                    <td style={celda}>{fila[3]}</td>
                                    <td style={celda}>{fila[4]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
}

export default UsuarioVer;
