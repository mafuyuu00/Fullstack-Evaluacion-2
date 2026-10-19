const footer = {
    display: "flex",
    gap: 24,
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 32,
    padding: "20px 24px",
    borderTop: "1px solid #cbbda9",
    background: "#ead8c5",
    fontSize: 13
};

const lista = { display: "flex", gap: 12, flexWrap: "wrap", margin: 0, padding: 0, listStyle: "none" };
const enlace = { color: "#355e3b" };
const logoPago = { display: "block", width: 72, height: 36, background: "#ffffff", objectFit: "contain" };
const boton = {
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    font: "inherit",
    cursor: "pointer"
};

function Footer({ irA }) {
    return (
        <footer style={footer}>
            <div>
                <p><strong>Huerto Verde</strong></p>
                <p>
                    Av. Siempre Fresca 1234, Santiago de Chile<br />
                    +56 2 2345 6789 · contacto@huertoverde.cl
                </p>
                <ul style={{ display: "flex", gap: 8, margin: "8px 0 0", padding: 0, listStyle: "none" }}>
                    <li><img src="/img/pagos/pago-visa.svg" alt="VISA" style={logoPago} /></li>
                    <li><img src="/img/pagos/pago-mastercard.svg" alt="MASTERCARD" style={logoPago} /></li>
                    <li><img src="/img/pagos/pago-redcompra.svg" alt="REDCOMPRA" style={logoPago} /></li>
                </ul>
            </div>

            <nav>
                <h2>Categorías</h2>
                <ul style={lista}>
                    <li><a href="#" onClick={() => irA("productos", "frutas")} style={enlace}>Frutas</a></li>
                    <li><a href="#" onClick={() => irA("productos", "verduras")} style={enlace}>Verduras</a></li>
                    <li><a href="#" onClick={() => irA("productos", "organicos")} style={enlace}>Orgánicos</a></li>
                </ul>
            </nav>

            <div>
                <h2>Mantente en contacto</h2>
                <p>Suscríbete y recibe las ofertas de la semana.</p>
                <form onSubmit={e => e.preventDefault()} style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <input type="email" placeholder="Ingresa tu correo" maxLength={100} style={{ padding: 7, border: "1px solid #cbbda9" }} />
                    <button type="submit" style={boton}>Suscribirse</button>
                </form>
                <p><small>&copy; 2026 Huerto Verde · Entrega 1 DSY1104</small></p>
            </div>
        </footer>
    );
}

export default Footer;
