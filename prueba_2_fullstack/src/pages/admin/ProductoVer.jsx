import { productos, formatoPesos } from "../../data/productos";

const encabezado = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: "2px solid #6b8e4e"
};
const titulo = { margin: 0, color: "#355e3b", fontSize: 24 };
const boton = {
    display: "inline-block",
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    textDecoration: "none"
};
const botonPrincipal = { ...boton, border: "1px solid #355e3b", background: "#355e3b", color: "#ffffff" };
const migas = { display: "flex", gap: 6, margin: "0 0 16px", padding: 0, listStyle: "none", fontSize: 12 };
const enlace = { color: "#355e3b" };
const ficha = { display: "grid", gridTemplateColumns: "180px 1fr", gap: "6px 16px", margin: 0 };
const dt = { fontSize: 13, fontWeight: "bold" };
const dd = { margin: 0 };
const imagen = {
    display: "block",
    width: 400,
    maxWidth: "100%",
    height: 300,
    boxSizing: "border-box",
    objectFit: "cover",
    border: "1px solid #cbbda9",
    background: "#ead8c5"
};

function ProductoVer({ codigo, irA }) {
    const producto = productos.find(p => p.codigo === codigo);
    const stockBajo = producto.stock <= producto.stockCritico;

    return (
        <>
            <header style={encabezado}>
                <h1 style={titulo}>{producto.nombre}</h1>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a href="#" onClick={() => irA("admin-producto-editar", codigo)} style={botonPrincipal}>Editar</a>
                    <a href="#" onClick={() => irA("admin-productos")} style={boton}>Volver al listado</a>
                </div>
            </header>

            <main>
                <ul style={migas}>
                    <li><a href="#" onClick={() => irA("admin")} style={enlace}>Dashboard</a></li>
                    <li>&gt;</li>
                    <li><a href="#" onClick={() => irA("admin-productos")} style={enlace}>Productos</a></li>
                    <li>&gt;</li>
                    <li>{producto.codigo}</li>
                </ul>

                <section>
                    <h2>Ficha del producto</h2>
                    <dl style={ficha}>
                        <dt style={dt}>Código producto</dt>
                        <dd style={dd}>{producto.codigo}</dd>
                        <dt style={dt}>Nombre</dt>
                        <dd style={dd}>{producto.nombre}</dd>
                        <dt style={dt}>Categoría</dt>
                        <dd style={dd}>{producto.categoriaNombre}</dd>
                        <dt style={dt}>Precio</dt>
                        <dd style={dd}>{formatoPesos(producto.precio)}</dd>
                        <dt style={dt}>Stock</dt>
                        <dd style={stockBajo ? { ...dd, color: "#a94442", fontWeight: "bold" } : dd}>
                            {producto.stock} unidades{stockBajo && " (bajo el stock crítico)"}
                        </dd>
                        <dt style={dt}>Stock crítico</dt>
                        <dd style={dd}>{producto.stockCritico} unidades</dd>
                        <dt style={dt}>Estado</dt>
                        <dd style={dd}>Publicado en la tienda</dd>
                        <dt style={dt}>Descripción</dt>
                        <dd style={dd}>{producto.descripcion}</dd>
                        <dt style={dt}>Imagen</dt>
                        <dd style={dd}><img src={producto.imagen} alt={producto.alt} style={imagen} /></dd>
                        <dt style={dt}>Última modificación</dt>
                        <dd style={dd}>2 de septiembre de 2026, 10:35 por admin@duoc.cl</dd>
                    </dl>
                </section>

                <section>
                    <h2>Vista pública</h2>
                    <p>
                        Así ve el cliente este producto: <a href="#" onClick={() => irA("detalle", producto.codigo)} style={enlace}>abrir el detalle en la tienda</a>.
                    </p>
                </section>
            </main>
        </>
    );
}

export default ProductoVer;
