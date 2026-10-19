import { Button } from "react-bootstrap";
import FormularioProducto from "../../components/FormularioProducto";
import { productos } from "../../data/productos";

function ProductoEditar({ codigo, irA }) {
    const producto = productos.find(p => p.codigo === codigo);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom border-success pb-2 mb-4">
                <h1 className="h3 m-0 text-success">Editar producto</h1>
                <div className="d-flex flex-wrap gap-2">
                    <Button href="#" variant="outline-success" onClick={() => irA("admin-producto-ver", codigo)}>Ver ficha</Button>
                    <Button href="#" variant="outline-success" onClick={() => irA("admin-productos")}>Volver al listado</Button>
                </div>
            </div>

            <main>
                <FormularioProducto producto={producto} esNuevo={false} irA={irA} />
            </main>
        </>
    );
}

export default ProductoEditar;
