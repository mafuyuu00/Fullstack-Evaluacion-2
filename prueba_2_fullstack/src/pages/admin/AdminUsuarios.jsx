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
    font: "inherit",
    cursor: "pointer",
    textDecoration: "none"
};
const botonPrincipal = { ...boton, border: "1px solid #355e3b", background: "#355e3b", color: "#ffffff" };
const filtros = { display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 16 };
const label = { display: "block", marginBottom: 4, fontSize: 12, textTransform: "uppercase" };
const input = { width: "100%", boxSizing: "border-box", padding: 7, border: "1px solid #cbbda9", background: "#fffaf2", font: "inherit" };
const tabla = { width: "100%", borderCollapse: "collapse", fontSize: 14 };
const tituloTabla = { paddingBottom: 8, fontWeight: "bold", textAlign: "left" };
const celda = { padding: "7px 8px", border: "1px solid #cbbda9", textAlign: "left" };
const encabezadoTabla = { ...celda, background: "#ead8c5", color: "#8b5e3c" };
const enlace = { color: "#355e3b" };
const pagina = { display: "block", padding: "4px 9px", border: "1px solid #cbbda9", color: "#355e3b", fontSize: 13, textDecoration: "none" };
const paginaActual = { ...pagina, background: "#ead8c5", fontWeight: "bold" };

function AdminUsuarios({ irA }) {
    return (
        <>
            <header style={encabezado}>
                <h1 style={titulo}>Usuarios</h1>
                <a href="#" onClick={() => irA("admin-usuario-nuevo")} style={botonPrincipal}>Nuevo usuario</a>
            </header>

            <main>
                <form onSubmit={e => e.preventDefault()} style={filtros}>
                    <div>
                        <label htmlFor="buscar" style={label}>Buscar</label>
                        <input type="search" id="buscar" placeholder="Run, nombre o correo" maxLength={100} style={input} />
                    </div>
                    <div>
                        <label htmlFor="perfil" style={label}>Tipo de usuario</label>
                        <select id="perfil" style={input}>
                            <option value="">Todos</option>
                            <option value="administrador">Administrador</option>
                            <option value="vendedor">Vendedor</option>
                            <option value="cliente">Cliente</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="region" style={label}>Región</label>
                        <select id="region" style={input}>
                            <option value="">Todas</option>
                            <option value="13">Región Metropolitana de Santiago</option>
                            <option value="09">Región de La Araucanía</option>
                            <option value="16">Región de Ñuble</option>
                            <option value="07">Región del Maule</option>
                            <option value="05">Región de Valparaíso</option>
                        </select>
                    </div>
                    <button type="submit" style={boton}>Filtrar</button>
                </form>

                <table style={tabla}>
                    <caption style={tituloTabla}>Listado de usuarios ({usuarios.length} de 48 registros)</caption>
                    <thead>
                        <tr>
                            <th style={encabezadoTabla}>Run</th>
                            <th style={encabezadoTabla}>Nombre</th>
                            <th style={encabezadoTabla}>Apellidos</th>
                            <th style={encabezadoTabla}>Correo</th>
                            <th style={encabezadoTabla}>Tipo de usuario</th>
                            <th style={encabezadoTabla}>Región</th>
                            <th style={encabezadoTabla}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.run}>
                                <th style={celda}>{usuario.run}</th>
                                <td style={celda}>{usuario.nombre}</td>
                                <td style={celda}>{usuario.apellidos}</td>
                                <td style={celda}>{usuario.correo}</td>
                                <td style={celda}>{tiposUsuario[usuario.tipo]}</td>
                                <td style={celda}>{usuario.region}</td>
                                <td style={celda}>
                                    <a href="#" onClick={() => irA("admin-usuario-ver", usuario.run)} style={enlace}>Ver</a>
                                    {" · "}
                                    <a href="#" onClick={() => irA("admin-usuario-editar", usuario.run)} style={enlace}>Editar</a>
                                    {" · "}
                                    <button type="button" style={boton}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ul style={{ display: "flex", gap: 4, flexWrap: "wrap", margin: "16px 0 0", padding: 0, listStyle: "none" }}>
                    <li><a href="#" style={pagina}>&laquo;</a></li>
                    <li><span style={paginaActual}>1</span></li>
                    <li><a href="#" style={pagina}>2</a></li>
                    <li><a href="#" style={pagina}>3</a></li>
                    <li><a href="#" style={pagina}>4</a></li>
                    <li><a href="#" style={pagina}>5</a></li>
                    <li><a href="#" style={pagina}>&raquo;</a></li>
                </ul>
            </main>
        </>
    );
}

export default AdminUsuarios;
