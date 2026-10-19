import { productos, formatoPesos } from "../data/productos";

const linea = {
    display: "flex",
    gap: 16,
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #cbbda9"
};
const miniatura = {
    display: "block",
    width: "100%",
    height: 56,
    boxSizing: "border-box",
    objectFit: "cover",
    border: "1px solid #cbbda9",
    background: "#ead8c5"
};
const resumen = {
    flex: "0 0 280px",
    boxSizing: "border-box",
    padding: 16,
    border: "1px solid #cbbda9",
    background: "#e8f0df"
};
const enlace = { color: "#355e3b" };
const boton = {
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    font: "inherit",
    cursor: "pointer"
};
const botonPagar = {
    display: "block",
    padding: "8px 16px",
    border: "1px solid #355e3b",
    background: "#355e3b",
    color: "#ffffff",
    textAlign: "center",
    textDecoration: "none"
};
const label = { display: "block", marginBottom: 4, fontSize: 12, textTransform: "uppercase" };
const input = { width: "100%", boxSizing: "border-box", padding: 7, border: "1px solid #cbbda9", background: "#fffaf2", font: "inherit" };

function Carrito({ carrito, irA, cambiarCantidad, eliminarDelCarrito }) {
    let subtotal = 0;
    for (const item of carrito) {
        const producto = productos.find(p => p.codigo === item.codigo);
        subtotal += producto.precio * item.cantidad;
    }
    const despacho = subtotal > 0 ? 2990 : 0;

    return (
        <main>
            <h1>Mi carrito de compras</h1>

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <section style={{ flex: "1 1 520px" }}>
                    {carrito.map(item => {
                        const producto = productos.find(p => p.codigo === item.codigo);

                        return (
                            <article key={item.codigo} style={linea}>
                                <div style={{ flex: "0 0 110px" }}>
                                    <img src={producto.imagen} alt={producto.alt} style={miniatura} />
                                </div>

                                <div style={{ flex: "1 1 auto" }}>
                                    <h3>
                                        <a href="#" onClick={() => irA("detalle", producto.codigo)} style={enlace}>{producto.nombre}</a>
                                    </h3>
                                    <p>{producto.unidad} · {producto.categoriaNombre} · Código {producto.codigo}</p>
                                </div>

                                <p>{formatoPesos(producto.precio)}</p>

                                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                    <button type="button" onClick={() => cambiarCantidad(item.codigo, item.cantidad - 1)} style={boton}>−</button>
                                    <input
                                        type="number"
                                        value={item.cantidad}
                                        min="1"
                                        max={producto.stock}
                                        onChange={e => {
                                            const nuevaCantidad = Number(e.target.value);
                                            if (nuevaCantidad >= 1) cambiarCantidad(item.codigo, nuevaCantidad);
                                        }}
                                        style={{ width: 48, boxSizing: "border-box", padding: 4, border: "1px solid #cbbda9", textAlign: "center" }}
                                    />
                                    <button type="button" onClick={() => cambiarCantidad(item.codigo, item.cantidad + 1)} style={boton}>+</button>
                                </div>

                                <button type="button" onClick={() => eliminarDelCarrito(item.codigo)} style={boton}>Eliminar</button>
                            </article>
                        );
                    })}

                    <p><a href="#" onClick={() => irA("productos")} style={enlace}>Seguir comprando</a></p>
                </section>

                <aside style={resumen}>
                    <h2>Resumen</h2>
                    <dl>
                        <dt>Subtotal</dt>
                        <dd>{formatoPesos(subtotal)}</dd>
                        <dt>Despacho</dt>
                        <dd>{formatoPesos(despacho)}</dd>
                        <dt>Descuento</dt>
                        <dd>$0</dd>
                        <dt><strong>TOTAL</strong></dt>
                        <dd><strong>{formatoPesos(subtotal + despacho)}</strong></dd>
                    </dl>

                    <form onSubmit={e => e.preventDefault()}>
                        <div style={{ marginBottom: 14 }}>
                            <label htmlFor="cupon" style={label}>Ingrese el cupón de descuento</label>
                            <input type="text" id="cupon" maxLength={20} style={input} />
                        </div>
                        <button type="submit" style={boton}>Aplicar</button>
                    </form>

                    <p><a href="#" style={botonPagar}>Pagar</a></p>
                    <p>
                        <small>
                            El carrito se guarda en <code>localStorage</code>, por lo que se
                            conserva si cierras la pestaña.
                        </small>
                    </p>
                </aside>
            </div>
        </main>
    );
}

export default Carrito;
