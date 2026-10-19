import { Card, Button } from "react-bootstrap";
import { formatoPesos } from "../data/productos";

function TarjetaProducto({ producto, irA, agregarAlCarrito }) {
    return (
        <Card className="h-100 shadow-sm">
            <a href="#" onClick={() => irA("detalle", producto.codigo)}>
                <Card.Img variant="top" src={producto.imagen} alt={producto.alt} height="160" className="object-fit-cover" />
            </a>

            <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6">
                    <a href="#" onClick={() => irA("detalle", producto.codigo)} className="link-success text-decoration-none">
                        {producto.nombre}
                    </a>
                </Card.Title>
                <Card.Text className="small text-muted mb-1">
                    {producto.unidad} · Categoría: {producto.categoriaNombre}
                </Card.Text>
                <Card.Text className="fw-bold text-success">
                    {producto.precio === 0 ? "$0 (GRATIS)" : formatoPesos(producto.precio)}
                </Card.Text>

                {agregarAlCarrito && (
                    <Button variant="success" className="mt-auto" onClick={() => agregarAlCarrito(producto.codigo, 1)}>
                        Añadir
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}

export default TarjetaProducto;
