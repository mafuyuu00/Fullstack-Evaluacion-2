import { Button } from "react-bootstrap";
import FormularioProducto from "../../components/FormularioProducto";

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
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom border-success pb-2 mb-4">
                <h1 className="h3 m-0 text-success">Nuevo producto</h1>
                <Button href="#" variant="outline-success" onClick={() => irA("admin-productos")}>Volver al listado</Button>
            </div>

            <main>
                <FormularioProducto producto={productoVacio} esNuevo={true} irA={irA} />
            </main>
        </>
    );
}

export default ProductoNuevo;
