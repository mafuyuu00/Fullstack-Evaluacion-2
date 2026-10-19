import { Row, Col, Button, Image } from "react-bootstrap";
import TarjetaProducto from "../components/TarjetaProducto";
import { productos } from "../data/productos";

function Inicio({ irA }) {
    const destacados = productos.filter(producto => producto.destacado);

    return (
        <main>
            <section className="p-4 mb-5 bg-success-subtle border rounded">
                <Row className="align-items-center g-4">
                    <Col md={6}>
                        <h1 className="text-success">TIENDA ONLINE</h1>
                        <p className="lead">
                            En Huerto Verde llevamos frutas y verduras frescas desde el campo
                            hasta tu casa. Selección diaria, precios directos del productor y
                            despacho en 24 horas dentro de la Región Metropolitana.
                        </p>
                        <Button variant="success" size="lg" onClick={() => irA("productos")}>Ver productos</Button>
                    </Col>

                    <Col md={6}>
                        <Image src="/img/productos/mix-organico.jpg" alt="Cajones con frutas y verduras frescas" rounded height="320" className="w-100 object-fit-cover" />
                    </Col>
                </Row>
            </section>

            <section>
                <h2 className="mb-3">Productos destacados</h2>
                <Row xs={1} sm={2} lg={4} className="g-4">
                    {destacados.map(producto => (
                        <Col key={producto.codigo}>
                            <TarjetaProducto producto={producto} irA={irA} />
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-4">
                    <Button variant="outline-success" onClick={() => irA("productos")}>Ver el catálogo completo</Button>
                </div>
            </section>
        </main>
    );
}

export default Inicio;
