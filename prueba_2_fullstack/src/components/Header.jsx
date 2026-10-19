const header = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    padding: "12px 24px",
    background: "#355e3b",
    color: "#ffffff"
};

const lista = { display: "flex", gap: 12, flexWrap: "wrap", margin: 0, padding: 0, listStyle: "none" };
const enlaceBlanco = { color: "#ffffff" };
const enlace = { color: "#355e3b" };

function Header({ pagina, irA, cantidad }) {
    return (
        <>
            <header style={header}>
                <a href="#" onClick={() => irA("inicio")} style={{ display: "flex", alignItems: "center", gap: 8, color: "#ffffff", fontWeight: "bold", textDecoration: "none" }}>
                    <img src="/img/branding/logo.svg" alt="" width="30" height="30" />
                    <span>Huerto Verde</span>
                </a>

                <nav>
                    <ul style={lista}>
                        <li><a href="#" onClick={() => irA("inicio")} style={enlaceBlanco}>Home</a></li>
                        <li><a href="#" onClick={() => irA("productos")} style={enlaceBlanco}>Productos</a></li>
                        <li><a href="#" onClick={() => irA("nosotros")} style={enlaceBlanco}>Nosotros</a></li>
                        <li><a href="#" onClick={() => irA("blogs")} style={enlaceBlanco}>Blogs</a></li>
                        <li><a href="#" onClick={() => irA("contacto")} style={enlaceBlanco}>Contacto</a></li>
                    </ul>
                </nav>

                <a href="#" onClick={() => irA("carrito")} style={{ display: "flex", alignItems: "center", gap: 6, color: "#ffffff" }}>
                    <img src="/img/iconos/icono-carrito.svg" alt="" width="25" height="23" />
                    Carrito ({cantidad})
                </a>
            </header>

            {(pagina === "inicio" || pagina === "productos") && (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "7px 24px", background: "#ead8c5" }}>
                    <a href="#" onClick={() => irA("login")} style={enlace}>Iniciar sesión</a>
                    <span>|</span>
                    <a href="#" onClick={() => irA("registro")} style={enlace}>Registrar usuario</a>
                </div>
            )}
        </>
    );
}

export default Header;
