import { useState } from "react";
import TarjetaProducto from "../components/TarjetaProducto";
import { productos } from "../data/productos";

const sidebar = {
    flex: "0 0 220px",
    boxSizing: "border-box",
    padding: 12,
    border: "1px solid #cbbda9",
    background: "#e8f0df"
};

const tituloSidebar = { fontSize: 14, color: "#355e3b" };
const lista = { margin: 0, padding: 0, listStyle: "none" };
const enlace = { color: "#355e3b" };
const label = { display: "block", marginBottom: 4, fontSize: 12, textTransform: "uppercase" };
const input = { width: "100%", boxSizing: "border-box", padding: 7, border: "1px solid #cbbda9", background: "#fffaf2", font: "inherit" };

const grilla = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 16,
    margin: 0,
    padding: 0,
    listStyle: "none"
};

function Productos({ categoria, irA, agregarAlCarrito }) {
    const [orden, setOrden] = useState("relevancia");
    const listaProductos = categoria ? productos.filter(p => p.categoria === categoria) : [...productos];

    if (orden === "precio-asc") listaProductos.sort((a, b) => a.precio - b.precio);
    if (orden === "precio-desc") listaProductos.sort((a, b) => b.precio - a.precio);
    if (orden === "nombre") listaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

    return (
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <aside style={sidebar}>
                <h2 style={tituloSidebar}>Categorías</h2>
                <ul style={lista}>
                    <li><a href="#" onClick={() => irA("productos")} style={enlace}>Todas</a></li>
                    <li><a href="#" onClick={() => irA("productos", "frutas")} style={enlace}>Frutas</a></li>
                    <li><a href="#" onClick={() => irA("productos", "verduras")} style={enlace}>Verduras</a></li>
                    <li><a href="#" onClick={() => irA("productos", "organicos")} style={enlace}>Orgánicos</a></li>
                </ul>

                <h2 style={tituloSidebar}>Ordenar por</h2>
                <div style={{ marginBottom: 14 }}>
                    <label htmlFor="orden" style={label}>Criterio</label>
                    <select id="orden" value={orden} onChange={e => setOrden(e.target.value)} style={input}>
                        <option value="relevancia">Relevancia</option>
                        <option value="precio-asc">Menor precio</option>
                        <option value="precio-desc">Mayor precio</option>
                        <option value="nombre">Nombre (A-Z)</option>
                    </select>
                </div>
            </aside>

            <main style={{ flex: "1 1 520px" }}>
                <h1>Productos</h1>
                <p>Catálogo completo de la tienda. Haz clic en un producto para ver su detalle.</p>
                <ul style={grilla}>
                    {listaProductos.map(producto => (
                        <TarjetaProducto key={producto.codigo} producto={producto} irA={irA} agregarAlCarrito={agregarAlCarrito} />
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default Productos;
