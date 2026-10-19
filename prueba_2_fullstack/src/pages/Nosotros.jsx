const sidebar = {
    flex: "0 0 220px",
    boxSizing: "border-box",
    padding: 12,
    border: "1px solid #cbbda9",
    background: "#e8f0df"
};

const enlace = { color: "#355e3b" };
const tabla = { width: "100%", borderCollapse: "collapse", fontSize: 14 };
const titulo = { paddingBottom: 8, fontWeight: "bold", textAlign: "left" };
const celda = { padding: "7px 8px", border: "1px solid #cbbda9", textAlign: "left" };
const encabezado = { ...celda, background: "#ead8c5", color: "#8b5e3c" };

function Nosotros() {
    return (
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <aside style={sidebar}>
                <h2 style={{ fontSize: 14, color: "#355e3b" }}>En esta página</h2>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    <li><a href="#quienes-somos" style={enlace}>Quiénes somos</a></li>
                    <li><a href="#mision" style={enlace}>Misión y visión</a></li>
                    <li><a href="#valores" style={enlace}>Nuestros valores</a></li>
                    <li><a href="#tecnologias" style={enlace}>Tecnologías del proyecto</a></li>
                </ul>
            </aside>

            <main style={{ flex: "1 1 520px" }}>
                <h1>Nosotros</h1>

                <section id="quienes-somos">
                    <h2>Quiénes somos</h2>
                    <p>
                        Huerto Verde nació en 2026 como un proyecto de tres estudiantes de
                        Duoc UC que querían acortar la distancia entre los pequeños
                        productores del Valle Central y las mesas de la Región Metropolitana.
                        Hoy trabajamos con 18 huertos familiares y despachamos alrededor de
                        400 pedidos semanales.
                    </p>
                    <p>
                        Compramos directo al productor, sin intermediarios, y armamos cada
                        pedido el mismo día del despacho. Eso nos permite mantener precios
                        justos en las dos puntas de la cadena.
                    </p>
                </section>

                <section id="mision">
                    <h2>Misión y visión</h2>
                    <h3>Misión</h3>
                    <p>
                        Acercar productos frescos de origen conocido a los hogares urbanos,
                        con trazabilidad clara y precios que reconozcan el trabajo del
                        productor.
                    </p>
                    <h3>Visión</h3>
                    <p>
                        Ser la tienda online de referencia en Chile para la compra de frutas
                        y verduras de temporada al año 2030.
                    </p>
                </section>

                <section id="valores">
                    <h2>Nuestros valores</h2>
                    <ul>
                        <li><strong>Frescura:</strong> lo que se cosecha hoy se despacha mañana.</li>
                        <li><strong>Transparencia:</strong> cada producto indica el huerto de origen.</li>
                        <li><strong>Comercio justo:</strong> precio acordado con el productor, no impuesto.</li>
                        <li><strong>Cero desperdicio:</strong> lo que no se vende se dona a comedores del barrio.</li>
                    </ul>
                </section>

                <section id="tecnologias">
                    <h2>Tecnologías del proyecto</h2>
                    <table style={tabla}>
                        <caption style={titulo}>Herramientas usadas en el proyecto</caption>
                        <thead>
                            <tr>
                                <th style={encabezado}>Área</th>
                                <th style={encabezado}>Herramienta</th>
                                <th style={encabezado}>Uso en el proyecto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={celda}>Estructura</td>
                                <td style={celda}>React + Vite</td>
                                <td style={celda}>Componentes JSX para las vistas de la tienda y del administrador.</td>
                            </tr>
                            <tr>
                                <td style={celda}>Estilos</td>
                                <td style={celda}>Estilos en línea</td>
                                <td style={celda}>Objetos de estilo dentro de cada componente, sin hojas CSS.</td>
                            </tr>
                            <tr>
                                <td style={celda}>Interacción</td>
                                <td style={celda}>JavaScript (ES6)</td>
                                <td style={celda}>Validación de formularios, listado de productos y carrito.</td>
                            </tr>
                            <tr>
                                <td style={celda}>Persistencia</td>
                                <td style={celda}>localStorage</td>
                                <td style={celda}>Guarda el contenido del carrito de compras entre sesiones.</td>
                            </tr>
                            <tr>
                                <td style={celda}>Control de versiones</td>
                                <td style={celda}>Git + GitHub</td>
                                <td style={celda}>Repositorio público con commits por integrante.</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default Nosotros;
