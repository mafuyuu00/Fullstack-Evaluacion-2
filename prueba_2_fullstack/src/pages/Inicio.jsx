import TarjetaProducto from "../components/TarjetaProducto";
import { productos } from "../data/productos";

const hero = {
    display: "flex",
    gap: 24,
    alignItems: "center",
    flexWrap: "wrap",
    padding: 24,
    background: "#e8f0df",
    border: "1px solid #cbbda9"
};

const imagenHero = {
    flex: "1 1 320px",
    display: "block",
    width: "100%",
    height: 320,
    boxSizing: "border-box",
    objectFit: "cover",
    border: "1px solid #cbbda9",
    background: "#ead8c5"
};

const grilla = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 16,
    margin: 0,
    padding: 0,
    listStyle: "none"
};

const boton = {
    display: "inline-block",
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    textDecoration: "none"
};

function Inicio({ irA }) {
    const destacados = productos.filter(producto => producto.destacado);

    return (
        <main>
            <section style={hero}>
                <div style={{ flex: "1 1 320px" }}>
                    <h1 style={{ marginTop: 0, color: "#355e3b" }}>TIENDA ONLINE</h1>
                    <p>
                        En Huerto Verde llevamos frutas y verduras frescas desde el campo
                        hasta tu casa. Selección diaria, precios directos del productor y
                        despacho en 24 horas dentro de la Región Metropolitana.
                    </p>
                    <p><a href="#" onClick={() => irA("productos")} style={boton}>Ver productos</a></p>
                </div>

                <img src="/img/productos/mix-organico.jpg" alt="Cajones con frutas y verduras frescas" style={imagenHero} />
            </section>

            <section>
                <h2>Productos destacados</h2>
                <ul style={grilla}>
                    {destacados.map(producto => (
                        <TarjetaProducto key={producto.codigo} producto={producto} irA={irA} />
                    ))}
                </ul>
                <p style={{ textAlign: "center" }}>
                    <a href="#" onClick={() => irA("productos")} style={boton}>Ver el catálogo completo</a>
                </p>
            </section>
        </main>
    );
}

export default Inicio;
