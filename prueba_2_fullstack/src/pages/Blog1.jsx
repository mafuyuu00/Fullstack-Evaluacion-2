const migas = { display: "flex", gap: 6, margin: "0 0 16px", padding: 0, listStyle: "none", fontSize: 12 };
const enlace = { color: "#355e3b" };
const imagen = {
    display: "block",
    width: "100%",
    height: 320,
    boxSizing: "border-box",
    objectFit: "cover",
    border: "1px solid #cbbda9",
    background: "#ead8c5"
};

function Blog1({ irA }) {
    return (
        <main>
            <ul style={migas}>
                <li><a href="#" onClick={() => irA("inicio")} style={enlace}>Home</a></li>
                <li>&gt;</li>
                <li><a href="#" onClick={() => irA("blogs")} style={enlace}>Blogs</a></li>
                <li>&gt;</li>
                <li>Caso curioso #1</li>
            </ul>

            <article>
                <h1>Caso curioso #1: la manzana que flota</h1>
                <p><small>Publicado el 12 de agosto de 2026 · Categoría: Datos curiosos · 4 minutos de lectura</small></p>

                <img src="/img/productos/manzana-fuji.jpg" alt="Manzanas frescas" style={imagen} />

                <p>
                    Si alguna vez pusiste una manzana en un balde con agua, habrás notado que
                    no se hunde. La razón es simple y bastante sorprendente: cerca de una
                    cuarta parte del volumen de una manzana es aire atrapado entre sus
                    células. Esa proporción de aire hace que su densidad sea menor que la del
                    agua, y por eso flota.
                </p>

                <h2>Por qué nos importa en la bodega</h2>
                <p>
                    El mismo aire que hace flotar a la manzana la vuelve frágil. Cuando la
                    fruta recibe un golpe, las paredes celulares se rompen y el aire cede
                    espacio: ahí aparece la magulladura café que todos hemos visto. Un golpe
                    de apenas 20 centímetros de caída sobre una superficie dura ya deja
                    marca, aunque la piel no se rompa.
                </p>
                <p>
                    Por eso en Huerto Verde no apilamos más de tres cajas por columna y
                    usamos separadores de cartón entre capas. Suena a detalle menor, pero
                    redujo nuestra merma de fruta de un 9 % a un 3 % en seis meses.
                </p>

                <h2>El truco del lavado por flotación</h2>
                <p>
                    La flotación también se usa a favor. En las plantas de proceso, las
                    manzanas se descargan en canales de agua en lugar de correas
                    transportadoras: la fruta viaja flotando y llega a la línea de selección
                    sin un solo golpe. Es más lento que una correa, pero mucho más suave.
                </p>

                <h2>Cómo elegir una buena manzana</h2>
                <ol>
                    <li>Presiona suavemente con el pulgar: debe ceder muy poco.</li>
                    <li>Revisa el tallo, si está seco y quebradizo la fruta ya lleva semanas guardada.</li>
                    <li>Huele el extremo inferior: una manzana fresca huele dulce, no a fermento.</li>
                    <li>Prefiere las de tamaño mediano, suelen tener mejor relación azúcar-acidez.</li>
                </ol>

                <p>
                    ¿Quieres probarlo en casa? Nuestras <a href="#" onClick={() => irA("detalle", "FR-001")} style={enlace}>manzanas Fuji</a> llegan
                    directo desde San Clemente, cosechadas la semana anterior al despacho.
                </p>

                <p>
                    <a href="#" onClick={() => irA("blogs")} style={enlace}>Volver a los blogs</a> · <a href="#" onClick={() => irA("blog2")} style={enlace}>Leer el caso curioso #2</a>
                </p>
            </article>
        </main>
    );
}

export default Blog1;
