import { Row, Col, Button, Breadcrumb, Image } from "react-bootstrap";
import { productos, formatoPesos } from "../../data/productos";

function ProductoVer({ codigo, irA }) {
    const producto = productos.find(p => p.codigo === codigo);
    const stockBajo = producto.stock <= producto.stockCritico;

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom border-success pb-2 mb-4">
                <h1 className="h3 m-0 text-success">{producto.nombre}</h1>
                <div className="d-flex flex-wrap gap-2">
                    <Button href="#" variant="success" onClick={() => irA("admin-producto-editar", codigo)}>Editar</Button>
                    <Button href="#" variant="outline-success" onClick={() => irA("admin-productos")}>Volver al listado</Button>
                </div>
            </div>

            <main>
                <Breadcrumb>
                    <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("admin")}>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("admin-productos")}>Productos</Breadcrumb.Item>
                    <Breadcrumb.Item active>{producto.codigo}</Breadcrumb.Item>
                </Breadcrumb>

                <section className="mb-4">
                    <h2 className="h5">Ficha del producto</h2>
                    <Row as="dl">
                        <Col as="dt" sm={4} lg={3}>Código producto</Col>
                        <Col as="dd" sm={8} lg={9}>{producto.codigo}</Col>
                        <Col as="dt" sm={4} lg={3}>Nombre</Col>
                        <Col as="dd" sm={8} lg={9}>{producto.nombre}</Col>
                        <Col as="dt" sm={4} lg={3}>Categoría</Col>
                        <Col as="dd" sm={8} lg={9}>{producto.categoriaNombre}</Col>
                        <Col as="dt" sm={4} lg={3}>Precio</Col>
                        <Col as="dd" sm={8} lg={9}>{formatoPesos(producto.precio)}</Col>
                        <Col as="dt" sm={4} lg={3}>Stock</Col>
                        <Col as="dd" sm={8} lg={9} className={stockBajo ? "text-danger fw-bold" : ""}>
                            {producto.stock} unidades{stockBajo && " (bajo el stock crítico)"}
                        </Col>
                        <Col as="dt" sm={4} lg={3}>Stock crítico</Col>
                        <Col as="dd" sm={8} lg={9}>{producto.stockCritico} unidades</Col>
                        <Col as="dt" sm={4} lg={3}>Estado</Col>
                        <Col as="dd" sm={8} lg={9}>Publicado en la tienda</Col>
                        <Col as="dt" sm={4} lg={3}>Descripción</Col>
                        <Col as="dd" sm={8} lg={9}>{producto.descripcion}</Col>
                        <Col as="dt" sm={4} lg={3}>Imagen</Col>
                        <Col as="dd" sm={8} lg={9}>
                            <Image src={producto.imagen} alt={producto.alt} width="400" height="300" rounded thumbnail />
                        </Col>
                        <Col as="dt" sm={4} lg={3}>Última modificación</Col>
                        <Col as="dd" sm={8} lg={9}>2 de septiembre de 2026, 10:35 por admin@duoc.cl</Col>
                    </Row>
                </section>

                <section>
                    <h2 className="h5">Vista pública</h2>
                    <p>
                        Así ve el cliente este producto: <a href="#" onClick={() => irA("detalle", producto.codigo)} className="link-success">abrir el detalle en la tienda</a>.
                    </p>
                </section>
            </main>
        </>
    );
}

export default ProductoVer;
