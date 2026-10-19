import FormularioProducto from "../../components/FormularioProducto";
import { productos } from "../../data/productos";

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

function ProductoEditar({ codigo, irA }) {
    const producto = productos.find(p => p.codigo === codigo);

    return (
        <>
            <header style={encabezado}>
                <h1 style={titulo}>Editar producto</h1>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a href="#" onClick={() => irA("admin-producto-ver", codigo)} style={boton}>Ver ficha</a>
                    <a href="#" onClick={() => irA("admin-productos")} style={boton}>Volver al listado</a>
                </div>
            </header>

            <main>
                <FormularioProducto producto={producto} esNuevo={false} irA={irA} />
            </main>
        </>
    );
}

export default ProductoEditar;
