import { formatoPesos } from "../data/productos";

const tarjeta = { padding: 10, border: "1px solid #cbbda9", background: "#ffffff" };

const imagen = {
    display: "block",
    width: "100%",
    height: 140,
    boxSizing: "border-box",
    objectFit: "cover",
    border: "1px solid #cbbda9",
    background: "#ead8c5"
};

const boton = {
    width: "100%",
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    font: "inherit",
    cursor: "pointer"
};

// si le pasan agregarAlCarrito es la tarjeta del catalogo (con boton y titulo grande)
function TarjetaProducto({ producto, irA, agregarAlCarrito }) {
    return (
        <li style={tarjeta}>
            <a href="#" onClick={() => irA("detalle", producto.codigo)} style={{ color: "#355e3b" }}>
                <img src={producto.imagen} alt={producto.alt} style={imagen} />
                {agregarAlCarrito
                    ? <h2>{producto.nombre}</h2>
                    : <h3 style={{ margin: "8px 0 4px", fontSize: 14, color: "#355e3b" }}>{producto.nombre}</h3>}
            </a>

            <p>{producto.unidad} · Categoría: {producto.categoriaNombre}</p>
            <p style={{ fontWeight: "bold", color: "#8b5e3c" }}>
                {producto.precio === 0 ? "$0 (GRATIS)" : formatoPesos(producto.precio)}
            </p>

            {agregarAlCarrito && (
                <button type="button" onClick={() => agregarAlCarrito(producto.codigo, 1)} style={boton}>Añadir</button>
            )}
        </li>
    );
}

export default TarjetaProducto;
