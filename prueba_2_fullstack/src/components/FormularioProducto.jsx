import { useState } from "react";
import { Row, Col, Card, Form, Button, Alert, Image } from "react-bootstrap";

function FormularioProducto({ producto, esNuevo, irA }) {
    const [codigo, setCodigo] = useState(producto.codigo);
    const [categoria, setCategoria] = useState(producto.categoria);
    const [nombre, setNombre] = useState(producto.nombre);
    const [descripcion, setDescripcion] = useState(producto.descripcion);
    const [precio, setPrecio] = useState(String(producto.precio));
    const [stock, setStock] = useState(String(producto.stock));
    const [stockCritico, setStockCritico] = useState(String(producto.stockCritico));
    const [publicado, setPublicado] = useState(true);
    const [enviado, setEnviado] = useState(false);
    const [mensaje, setMensaje] = useState("");

    let errorCodigo = "";
    if (codigo.trim() === "") errorCodigo = "El código del producto es obligatorio.";
    else if (codigo.trim().length < 3) errorCodigo = "El código debe tener al menos 3 caracteres.";

    const errorCategoria = categoria === "" ? "Debe seleccionar una categoría." : "";
    const errorNombre = nombre.trim() === "" ? "El nombre del producto es obligatorio." : "";

    let errorPrecio = "";
    if (precio === "") errorPrecio = "El precio es obligatorio.";
    else if (Number(precio) < 0) errorPrecio = "El precio no puede ser negativo.";

    let errorStock = "";
    if (stock === "") errorStock = "El stock es obligatorio.";
    else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) errorStock = "El stock debe ser un número entero mayor o igual a 0.";

    let errorCritico = "";
    if (stockCritico !== "" && (!Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0)) {
        errorCritico = "El stock crítico debe ser un número entero igual o mayor a 0.";
    }

    const stockBajo = stock !== "" && stockCritico !== "" && Number(stock) <= Number(stockCritico);

    function enviar(e) {
        e.preventDefault();
        setEnviado(true);

        if (errorCodigo || errorCategoria || errorNombre || errorPrecio || errorStock || errorCritico) {
            setMensaje("");
            return;
        }

        setMensaje("Datos válidos. Guardar el producto requiere un backend.");
    }

    return (
        <Card className="my-4 shadow-sm">
            <Card.Header as="h2" className="h6 bg-success text-white">
                {esNuevo ? "Datos del producto" : "Datos del producto " + producto.codigo}
            </Card.Header>

            <Card.Body>
                <Form noValidate onSubmit={enviar}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="codigo">
                                <Form.Label>Código producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="FR-006"
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                    isInvalid={(enviado || codigo !== "") && errorCodigo !== ""}
                                />
                                <Form.Text>Mínimo 3 caracteres. Debe ser único.</Form.Text>
                                <Form.Control.Feedback type="invalid">{errorCodigo}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="categoria">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Select
                                    value={categoria}
                                    onChange={e => setCategoria(e.target.value)}
                                    isInvalid={enviado && errorCategoria !== ""}
                                >
                                    <option value="">-- Seleccione la categoría --</option>
                                    <option value="frutas">Frutas</option>
                                    <option value="verduras">Verduras</option>
                                    <option value="organicos">Orgánicos</option>
                                    <option value="despensa">Despensa</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errorCategoria}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={100}
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            isInvalid={enviado && errorNombre !== ""}
                        />
                        <Form.Control.Feedback type="invalid">{errorNombre}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descripcion">
                        <Form.Label>Descripción (opcional)</Form.Label>
                        <Form.Control as="textarea" rows={5} maxLength={500} value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                        <Form.Text>Máximo 500 caracteres. Quedan {500 - descripcion.length}.</Form.Text>
                    </Form.Group>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="precio">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={precio}
                                    onChange={e => setPrecio(e.target.value)}
                                    isInvalid={(enviado || precio !== "") && errorPrecio !== ""}
                                />
                                <Form.Text>Mínimo 0. Un precio 0 se considera producto GRATIS. Admite decimales.</Form.Text>
                                <Form.Control.Feedback type="invalid">{errorPrecio}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="stock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                    isInvalid={(enviado || stock !== "") && errorStock !== ""}
                                />
                                <Form.Text>Cantidad en inventario. Sólo números enteros.</Form.Text>
                                <Form.Control.Feedback type="invalid">{errorStock}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="stock-critico">
                                <Form.Label>Stock crítico (opcional)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={stockCritico}
                                    onChange={e => setStockCritico(e.target.value)}
                                    isInvalid={errorCritico !== ""}
                                />
                                <Form.Text>Se muestra una alerta cuando el stock sea igual o inferior a este valor.</Form.Text>
                                <Form.Control.Feedback type="invalid">{errorCritico}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    {stockBajo && (
                        <Alert variant="warning">
                            Atención: el stock actual ({stock}) es igual o inferior al stock crítico configurado ({stockCritico}).
                        </Alert>
                    )}

                    <Form.Group className="mb-3" controlId="imagen">
                        <Form.Label>{esNuevo ? "Imagen (opcional)" : "Reemplazar imagen (opcional)"}</Form.Label>
                        <Form.Control type="file" accept="image/png, image/jpeg, image/webp" />
                        <Form.Text>
                            {esNuevo ? "Formatos JPG, PNG o WEBP. Tamaño recomendado 800x600 px." : "Deja el campo vacío para conservar la imagen actual."}
                        </Form.Text>
                    </Form.Group>

                    {!esNuevo && <Image src={producto.imagen} alt={producto.alt} width="200" height="150" rounded thumbnail className="mb-3" />}

                    <Form.Check
                        type="checkbox"
                        id="publicado"
                        label="Publicar en la tienda"
                        className="mb-3"
                        checked={publicado}
                        onChange={e => setPublicado(e.target.checked)}
                    />

                    {mensaje && <Alert variant="success">{mensaje}</Alert>}

                    <div className="d-flex flex-wrap gap-2">
                        <Button type="submit" variant="success">{esNuevo ? "Guardar producto" : "Guardar cambios"}</Button>
                        <Button href="#" variant="outline-success" onClick={() => irA("admin-productos")}>Cancelar</Button>
                        {!esNuevo && <Button variant="outline-danger">Eliminar producto</Button>}
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default FormularioProducto;
