const articulo = {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    marginBottom: 20,
    padding: 20,
    background: "#e8f0df",
    border: "1px solid #cbbda9"
};

const imagen = {
    flex: "1 1 300px",
    display: "block",
    width: "100%",
    height: 320,
    boxSizing: "border-box",
    objectFit: "cover",
    border: "1px solid #cbbda9",
    background: "#ead8c5"
};

const boton = {
    display: "inline-block",
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    textDecoration: "none"
};

function Blogs({ irA }) {
    return (
        <main>
            <h1 style={{ textAlign: "center" }}>Noticias importantes</h1>
            <p style={{ textAlign: "center" }}>Datos curiosos y novedades del mundo de las frutas y verduras.</p>

            <article style={articulo}>
                <div style={{ flex: "1 1 300px" }}>
                    <h2>Caso curioso #1: la manzana que flota</h2>
                    <p>
                        Una manzana es un 25 % aire, y por eso flota en el agua. Ese mismo aire
                        explica por qué se magulla tan rápido cuando la transportamos sin
                        cuidado. Te contamos cómo elegimos las cajas para que lleguen intactas.
                    </p>
                    <p><a href="#" onClick={() => irA("blog1")} style={boton}>Ver caso</a></p>
                    <p><small>12 de agosto de 2026 · Datos curiosos</small></p>
                </div>
                <img src="/img/productos/manzana-fuji.jpg" alt="Manzanas frescas" style={imagen} />
            </article>

            <article style={articulo}>
                <div style={{ flex: "1 1 300px" }}>
                    <h2>Caso curioso #2: el plátano es una hierba</h2>
                    <p>
                        Botánicamente el plátano no crece en un árbol: la planta es la hierba
                        más alta del mundo y puede superar los 7 metros. Revisamos qué implica
                        eso para la cosecha y por qué el plátano llega verde a Chile.
                    </p>
                    <p><a href="#" onClick={() => irA("blog2")} style={boton}>Ver caso</a></p>
                    <p><small>28 de agosto de 2026 · Datos curiosos</small></p>
                </div>
                <img src="/img/productos/platano.jpg" alt="Plátanos frescos" style={imagen} />
            </article>
        </main>
    );
}

export default Blogs;
