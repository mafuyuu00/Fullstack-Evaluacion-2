import { productos, formatoPesos } from "../../data/productos";

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
const alerta = { ...celda, color: "#a94442", fontWeight: "bold" };
const enlace = { color: "#355e3b" };
const pagina = { display: "block", padding: "4px 9px", border: "1px solid #cbbda9", color: "#355e3b", fontSize: 13, textDecoration: "none" };
const paginaActual = { ...pagina, background: "#ead8c5", fontWeight: "bold" };

function AdminProductos({ irA }) {
    return (
        <>
            <header style={encabezado}>
                <h1 style={titulo}>Productos</h1>
                <a href="#" onClick={() => irA("admin-producto-nuevo")} style={botonPrincipal}>Nuevo producto</a>
            </header>

            <main>
                <form onSubmit={e => e.preventDefault()} style={filtros}>
                    <div>
                        <label htmlFor="buscar" style={label}>Buscar</label>
                        <input type="search" id="buscar" placeholder="Código o nombre" maxLength={100} style={input} />
                    </div>
                    <div>
                        <label htmlFor="categoria" style={label}>Categoría</label>
                        <select id="categoria" style={input}>
                            <option value="">Todas</option>
                            <option value="frutas">Frutas</option>
                            <option value="verduras">Verduras</option>
                            <option value="organicos">Orgánicos</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="estado" style={label}>Estado</label>
                        <select id="estado" style={input}>
                            <option value="">Todos</option>
                            <option value="publicado">Publicado</option>
                            <option value="borrador">Borrador</option>
                            <option value="critico">Stock crítico</option>
                        </select>
                    </div>
                    <button type="submit" style={boton}>Filtrar</button>
                </form>

                <table style={tabla}>
                    <caption style={tituloTabla}>Listado de productos ({productos.length} registros)</caption>
                    <thead>
                        <tr>
                            <th style={encabezadoTabla}>Código</th>
                            <th style={encabezadoTabla}>Nombre</th>
                            <th style={encabezadoTabla}>Categoría</th>
                            <th style={encabezadoTabla}>Precio</th>
                            <th style={encabezadoTabla}>Stock</th>
                            <th style={encabezadoTabla}>Stock crítico</th>
                            <th style={encabezadoTabla}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.codigo}>
                                <th style={celda}>{producto.codigo}</th>
                                <td style={celda}>{producto.nombre}</td>
                                <td style={celda}>{producto.categoriaNombre}</td>
                                <td style={celda}>{formatoPesos(producto.precio)}</td>
                                <td style={producto.stock <= producto.stockCritico ? alerta : celda}>{producto.stock}</td>
                                <td style={celda}>{producto.stockCritico}</td>
                                <td style={celda}>
                                    <a href="#" onClick={() => irA("admin-producto-ver", producto.codigo)} style={enlace}>Ver</a>
                                    {" · "}
                                    <a href="#" onClick={() => irA("admin-producto-editar", producto.codigo)} style={enlace}>Editar</a>
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
                    <li><a href="#" style={pagina}>&raquo;</a></li>
                </ul>
            </main>
        </>
    );
}

export default AdminProductos;
