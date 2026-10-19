import FormularioProducto from "../../components/FormularioProducto";

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

const productoVacio = {
    codigo: "",
    categoria: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    stockCritico: ""
};

function ProductoNuevo({ irA }) {
    return (
        <>
            <header style={encabezado}>
                <h1 style={titulo}>Nuevo producto</h1>
                <a href="#" onClick={() => irA("admin-productos")} style={boton}>Volver al listado</a>
            </header>

            <main>
                <FormularioProducto producto={productoVacio} esNuevo={true} irA={irA} />
            </main>
        </>
    );
}

export default ProductoNuevo;
