import { Breadcrumb, Image } from "react-bootstrap";

function Blog2({ irA }) {
    return (
        <main>
            <Breadcrumb>
                <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("inicio")}>Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("blogs")}>Blogs</Breadcrumb.Item>
                <Breadcrumb.Item active>Caso curioso #2</Breadcrumb.Item>
            </Breadcrumb>

            <article>
                <h1>Caso curioso #2: el plátano es una hierba, no un árbol</h1>
                <p className="text-muted"><small>Publicado el 28 de agosto de 2026 · Categoría: Datos curiosos · 5 minutos de lectura</small></p>

                <Image src="/img/productos/platano.jpg" alt="Plátanos frescos" rounded height="320" className="w-100 object-fit-cover mb-4" />

                <p>
                    El plátano no crece en un árbol. Lo que parece un tronco es en realidad
                    un pseudotallo formado por las bases de las hojas enrolladas unas sobre
                    otras, sin una gota de madera. Técnicamente, la planta del plátano es la
                    hierba más alta del mundo: puede pasar los 7 metros de altura.
                </p>

                <h2>Una sola cosecha por planta</h2>
                <p>
                    Cada pseudotallo produce un único racimo en su vida. Cuando la fruta se
                    corta, ese tallo se elimina y un brote lateral, llamado hijuelo, toma su
                    lugar para la temporada siguiente. Es un ciclo de entre 9 y 12 meses.
                </p>

                <h2>Por qué el plátano llega verde a Chile</h2>
                <p>
                    El plátano es una fruta climatérica: sigue madurando después de cortada.
                    Se cosecha verde, viaja en contenedores refrigerados a unos 13 °C y sólo
                    al llegar al país entra a cámaras de maduración donde se aplica etileno
                    de forma controlada. Ese es el paso que le da el color amarillo parejo
                    que vemos en góndola.
                </p>
                <p>
                    Si el plátano madurara en el barco llegaría hecho puré. Por eso ninguna
                    tienda, incluida la nuestra, puede ofrecer plátano recién cosechado y
                    maduro al mismo tiempo.
                </p>

                <h2>Cómo guardarlo en casa</h2>
                <ul>
                    <li>Nunca en el refrigerador si todavía está verde: se detiene el proceso y la cáscara se pone negra.</li>
                    <li>Separado de manzanas y paltas, porque el etileno que liberan lo acelera.</li>
                    <li>Colgado, si es posible, para evitar los puntos de presión en la parte apoyada.</li>
                    <li>Si ya está muy maduro, al congelador sin cáscara: sirve para batidos y queques.</li>
                </ul>

                <p>
                    Nuestros <a href="#" onClick={() => irA("detalle", "FR-002")} className="link-success">plátanos de Ecuador</a> llegan
                    con dos o tres días de maduración, listos para consumir durante la semana.
                </p>

                <p>
                    <a href="#" onClick={() => irA("blogs")} className="link-success">Volver a los blogs</a> · <a href="#" onClick={() => irA("blog1")} className="link-success">Leer el caso curioso #1</a>
                </p>
            </article>
        </main>
    );
}

export default Blog2;
