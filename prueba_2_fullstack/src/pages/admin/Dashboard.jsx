import { productos } from "../../data/productos";

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
const tarjetas = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 16,
    margin: "0 0 24px",
    padding: 0,
    listStyle: "none"
};
const tarjeta = { padding: 12, border: "1px solid #cbbda9", background: "#ffffff" };
const numero = { display: "block", color: "#355e3b", fontSize: 22 };
const boton = {
    display: "inline-block",
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    textDecoration: "none"
};
const tabla = { width: "100%", borderCollapse: "collapse", fontSize: 14 };
const tituloTabla = { paddingBottom: 8, fontWeight: "bold", textAlign: "left" };
const celda = { padding: "7px 8px", border: "1px solid #cbbda9", textAlign: "left" };
const encabezadoTabla = { ...celda, background: "#ead8c5", color: "#8b5e3c" };
const alerta = { ...celda, color: "#a94442", fontWeight: "bold" };

function Dashboard({ irA }) {
    const criticos = productos.filter(p => p.stock <= p.stockCritico);

    return (
        <>
            <header style={encabezado}>
                <h1 style={titulo}>¡Hola, Administrador!</h1>
                <p>Sesión iniciada como <strong>admin@duoc.cl</strong> · Perfil: <strong>Administrador</strong></p>
            </header>

            <main>
                <section>
                    <h2>Resumen de hoy</h2>
                    <ul style={tarjetas}>
                        <li style={tarjeta}><strong style={numero}>{productos.length}</strong> Productos publicados</li>
                        <li style={tarjeta}><strong style={numero}>{criticos.length}</strong> Productos en stock crítico</li>
                        <li style={tarjeta}><strong style={numero}>48</strong> Usuarios registrados</li>
                        <li style={tarjeta}><strong style={numero}>7</strong> Órdenes del día</li>
                    </ul>
                </section>

                <section>
                    <h2>Mantenedores</h2>
                    <ul style={tarjetas}>
                        <li style={tarjeta}>
                            <h3>Productos</h3>
                            <p>Crear, editar, ver y eliminar los productos del catálogo.</p>
                            <p><a href="#" onClick={() => irA("admin-productos")} style={boton}>Abrir mantenedor</a></p>
                        </li>
                        <li style={tarjeta}>
                            <h3>Usuarios</h3>
                            <p>Administrar cuentas y perfiles (Administrador, Vendedor, Cliente).</p>
                            <p><a href="#" onClick={() => irA("admin-usuarios")} style={boton}>Abrir mantenedor</a></p>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>Alertas de stock crítico</h2>
                    <p>
                        Se listan los productos cuyo stock actual es igual o inferior al stock
                        crítico configurado.
                    </p>

                    <table style={tabla}>
                        <caption style={tituloTabla}>Productos que requieren reposición</caption>
                        <thead>
                            <tr>
                                <th style={encabezadoTabla}>Código</th>
                                <th style={encabezadoTabla}>Producto</th>
                                <th style={encabezadoTabla}>Stock</th>
                                <th style={encabezadoTabla}>Stock crítico</th>
                                <th style={encabezadoTabla}>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criticos.map(producto => (
                                <tr key={producto.codigo}>
                                    <th style={celda}>{producto.codigo}</th>
                                    <td style={celda}>{producto.nombre}</td>
                                    <td style={alerta}>{producto.stock}</td>
                                    <td style={celda}>{producto.stockCritico}</td>
                                    <td style={celda}>
                                        <a href="#" onClick={() => irA("admin-producto-editar", producto.codigo)} style={{ color: "#355e3b" }}>Editar</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
}

export default Dashboard;
