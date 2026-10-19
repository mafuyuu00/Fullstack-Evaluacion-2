import { useState } from "react";
import TarjetaProducto from "../components/TarjetaProducto";
import { productos, formatoPesos } from "../data/productos";

const migas = { display: "flex", gap: 6, margin: "0 0 16px", padding: 0, listStyle: "none", fontSize: 12 };
const enlace = { color: "#355e3b" };
const marcoImagen = {
    display: "grid",
    placeItems: "center",
    minHeight: 320,
    boxSizing: "border-box",
    padding: 8,
    border: "1px solid #cbbda9",
    background: "#ead8c5"
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
const label = { display: "block", marginBottom: 4, fontSize: 12, textTransform: "uppercase" };
const input = { width: "100%", boxSizing: "border-box", padding: 7, border: "1px solid #cbbda9", background: "#fffaf2", font: "inherit" };
const botonPrincipal = {
    width: "100%",
    padding: "8px 16px",
    border: "1px solid #355e3b",
    background: "#355e3b",
    color: "#ffffff",
    font: "inherit",
    cursor: "pointer"
};
const grilla = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 16,
    margin: 0,
    padding: 0,
    listStyle: "none"
};

function DetalleProducto({ codigo, irA, agregarAlCarrito }) {
    const [cantidad, setCantidad] = useState(1);

    const producto = productos.find(p => p.codigo === codigo);
    const relacionados = productos.filter(p => p.categoria === producto.categoria && p.codigo !== codigo).slice(0, 5);

    // se pueden pedir hasta 5 de una vez, o menos si no hay tanto stock
    const opciones = [];
    for (let i = 1; i <= Math.min(producto.stock, 5); i++) {
        opciones.push(i);
    }

    function enviar(e) {
        e.preventDefault();
        agregarAlCarrito(producto.codigo, cantidad);
    }

    return (
        <main>
            <ul style={migas}>
                <li><a href="#" onClick={() => irA("inicio")} style={enlace}>Home</a></li>
                <li>&gt;</li>
                <li><a href="#" onClick={() => irA("productos", producto.categoria)} style={enlace}>{producto.categoriaNombre}</a></li>
                <li>&gt;</li>
                <li>{producto.nombre}</li>
            </ul>

            <article style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 420px" }}>
                    <div style={marcoImagen}>
                        <img src={producto.imagen} alt={producto.alt} style={{ display: "block", width: "100%", height: 320, objectFit: "cover" }} />
                    </div>
                    <ul style={{ display: "flex", gap: 8, margin: "8px 0 0", padding: 0, listStyle: "none" }}>
                        <li style={{ flex: "0 0 70px" }}><img src={producto.imagen} alt="Vista 1" style={miniatura} /></li>
                        <li style={{ flex: "0 0 70px" }}><img src={producto.imagen} alt="Vista 2" style={miniatura} /></li>
                        <li style={{ flex: "0 0 70px" }}><img src={producto.imagen} alt="Vista 3" style={miniatura} /></li>
                    </ul>
                </div>

                <div style={{ flex: "1 1 300px" }}>
                    <h1>{producto.nombre}</h1>
                    <p>{formatoPesos(producto.precio)} por {producto.unidad.toLowerCase()}</p>

                    <dl>
                        <dt>Código</dt>
                        <dd>{producto.codigo}</dd>
                        <dt>Categoría</dt>
                        <dd>{producto.categoriaNombre}</dd>
                        <dt>Disponibilidad</dt>
                        <dd>En stock ({producto.stock} unidades)</dd>
                    </dl>

                    <h2>Descripción</h2>
                    <p>{producto.descripcion}</p>

                    <form onSubmit={enviar}>
                        <div style={{ marginBottom: 14 }}>
                            <label htmlFor="cantidad" style={label}>Cantidad</label>
                            <select id="cantidad" value={cantidad} onChange={e => setCantidad(Number(e.target.value))} style={input}>
                                {opciones.map(numero => (
                                    <option key={numero} value={numero}>{numero}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" style={botonPrincipal}>Añadir al carrito</button>
                    </form>

                    <p><a href="#" onClick={() => irA("carrito")} style={enlace}>Ir al carrito de compras</a></p>
                </div>
            </article>

            <section>
                <h2>Productos relacionados</h2>
                <ul style={grilla}>
                    {relacionados.map(item => (
                        <TarjetaProducto key={item.codigo} producto={item} irA={irA} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default DetalleProducto;
