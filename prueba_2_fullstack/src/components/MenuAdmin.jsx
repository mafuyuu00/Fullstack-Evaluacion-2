const menu = {
    display: "flex",
    flex: "0 0 200px",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "16px 0",
    borderRight: "1px solid #cbbda9",
    background: "#e8f0df"
};

const lista = { margin: 0, padding: 0, listStyle: "none" };
const enlace = { display: "block", padding: "8px 16px", color: "#355e3b", fontSize: 13, textDecoration: "none" };
const activo = { ...enlace, background: "#ead8c5", fontWeight: "bold" };

function MenuAdmin({ pagina, irA }) {
    return (
        <nav style={menu}>
            <a href="#" onClick={() => irA("admin")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px 16px", color: "#355e3b", fontWeight: "bold", textDecoration: "none" }}>
                <img src="/img/branding/logo.svg" alt="" width="30" height="30" />
                <span>Huerto Verde</span>
            </a>

            <ul style={lista}>
                <li>
                    <a href="#" onClick={() => irA("admin")} style={pagina === "admin" ? activo : enlace}>Dashboard</a>
                </li>
                <li>
                    <a href="#" onClick={() => irA("admin-productos")} style={pagina.startsWith("admin-producto") ? activo : enlace}>Productos</a>
                </li>
                <li>
                    <a href="#" onClick={() => irA("admin-usuarios")} style={pagina.startsWith("admin-usuario") ? activo : enlace}>Usuarios</a>
                </li>
            </ul>

            <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid #cbbda9" }}>
                <ul style={lista}>
                    <li><a href="#" onClick={() => irA("inicio")} style={enlace}>Ir a la tienda</a></li>
                    <li><a href="#" onClick={() => irA("login")} style={enlace}>Cerrar sesión</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default MenuAdmin;
