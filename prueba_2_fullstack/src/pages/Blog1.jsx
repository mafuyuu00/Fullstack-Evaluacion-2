import { Breadcrumb, Image } from "react-bootstrap";

function Blog1({ irA }) {
    return (
        <main>
            <Breadcrumb>
                <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("inicio")}>Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("blogs")}>Blogs</Breadcrumb.Item>
                <Breadcrumb.Item active>Caso curioso #1</Breadcrumb.Item>
            </Breadcrumb>

            <article>
                <h1>Caso curioso #1: la manzana que flota</h1>
                <p className="text-muted"><small>Publicado el 12 de agosto de 2026 · Categoría: Datos curiosos · 4 minutos de lectura</small></p>

                <Image src="/img/productos/manzana-fuji.jpg" alt="Manzanas frescas" rounded height="320" className="w-100 object-fit-cover mb-4" />

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
                    ¿Quieres probarlo en casa? Nuestras <a href="#" onClick={() => irA("detalle", "FR-001")} className="link-success">manzanas Fuji</a> llegan
                    directo desde San Clemente, cosechadas la semana anterior al despacho.
                </p>

                <p>
                    <a href="#" onClick={() => irA("blogs")} className="link-success">Volver a los blogs</a> · <a href="#" onClick={() => irA("blog2")} className="link-success">Leer el caso curioso #2</a>
                </p>
            </article>
        </main>
    );
}

export default Blog1;
