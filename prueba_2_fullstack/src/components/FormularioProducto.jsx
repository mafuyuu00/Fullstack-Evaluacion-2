import { useState } from "react";

const caja = { maxWidth: 720, boxSizing: "border-box", margin: "24px auto 24px 0", paddingBottom: 20, border: "1px solid #cbbda9", background: "#ffffff" };
const tituloCaja = { margin: 0, padding: "11px 16px", background: "#355e3b", color: "#ffffff", fontSize: 16 };
const fila = { display: "flex", gap: 12, flexWrap: "wrap" };
const campo = { marginBottom: 14 };
const campoFila = { marginBottom: 14, flex: "1 1 200px" };
const label = { display: "block", marginBottom: 4, fontSize: 12, textTransform: "uppercase" };
const input = { width: "100%", boxSizing: "border-box", padding: 7, border: "1px solid #cbbda9", background: "#fffaf2", font: "inherit" };
const ayuda = { display: "block", color: "#665b50", fontSize: 12 };
const error = { margin: "4px 0 0", color: "#a94442", fontSize: 12 };
const exito = { color: "#355e3b", fontWeight: "bold" };
const boton = {
    display: "inline-block",
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    font: "inherit",
    cursor: "pointer",
    textDecoration: "none"
};
const botonPrincipal = { ...boton, border: "1px solid #355e3b", background: "#355e3b", color: "#ffffff" };
const imagen = {
    display: "block",
    width: 200,
    height: 150,
    boxSizing: "border-box",
    marginBottom: 14,
    objectFit: "cover",
    border: "1px solid #cbbda9",
    background: "#ead8c5"
};

// se usa para nuevo producto y para editar, en nuevo llega un producto vacio
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

    // precio 0 si se puede, el producto queda GRATIS
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

    // es solo un aviso, no impide guardar
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
        <section style={caja}>
            <h2 style={tituloCaja}>{esNuevo ? "Datos del producto" : "Datos del producto " + producto.codigo}</h2>

            <form onSubmit={enviar} style={{ padding: 16 }}>
                <div style={fila}>
                    <div style={campoFila}>
                        <label htmlFor="codigo" style={label}>Código producto</label>
                        <input type="text" id="codigo" placeholder="FR-006" value={codigo} onChange={e => setCodigo(e.target.value)} style={input} />
                        <small style={ayuda}>Mínimo 3 caracteres. Debe ser único.</small>
                        {(enviado || codigo) && errorCodigo && <p style={error}>{errorCodigo}</p>}
                    </div>
                    <div style={campoFila}>
                        <label htmlFor="categoria" style={label}>Categoría</label>
                        <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)} style={input}>
                            <option value="">-- Seleccione la categoría --</option>
                            <option value="frutas">Frutas</option>
                            <option value="verduras">Verduras</option>
                            <option value="organicos">Orgánicos</option>
                            <option value="despensa">Despensa</option>
                        </select>
                        {enviado && errorCategoria && <p style={error}>{errorCategoria}</p>}
                    </div>
                </div>

                <div style={campo}>
                    <label htmlFor="nombre" style={label}>Nombre</label>
                    <input type="text" id="nombre" maxLength={100} value={nombre} onChange={e => setNombre(e.target.value)} style={input} />
                    {enviado && errorNombre && <p style={error}>{errorNombre}</p>}
                </div>

                <div style={campo}>
                    <label htmlFor="descripcion" style={label}>Descripción (opcional)</label>
                    <textarea id="descripcion" rows={5} maxLength={500} value={descripcion} onChange={e => setDescripcion(e.target.value)} style={input} />
                    <small style={ayuda}>Máximo 500 caracteres. Quedan {500 - descripcion.length}.</small>
                </div>

                <div style={fila}>
                    <div style={campoFila}>
                        <label htmlFor="precio" style={label}>Precio</label>
                        <input type="number" id="precio" min="0" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} style={input} />
                        <small style={ayuda}>Mínimo 0. Un precio 0 se considera producto GRATIS. Admite decimales.</small>
                        {(enviado || precio) && errorPrecio && <p style={error}>{errorPrecio}</p>}
                    </div>
                    <div style={campoFila}>
                        <label htmlFor="stock" style={label}>Stock</label>
                        <input type="number" id="stock" min="0" step="1" value={stock} onChange={e => setStock(e.target.value)} style={input} />
                        <small style={ayuda}>Cantidad en inventario. Sólo números enteros.</small>
                        {(enviado || stock) && errorStock && <p style={error}>{errorStock}</p>}
                    </div>
                    <div style={campoFila}>
                        <label htmlFor="stock-critico" style={label}>Stock crítico (opcional)</label>
                        <input type="number" id="stock-critico" min="0" step="1" value={stockCritico} onChange={e => setStockCritico(e.target.value)} style={input} />
                        <small style={ayuda}>Se muestra una alerta cuando el stock sea igual o inferior a este valor.</small>
                        {errorCritico && <p style={error}>{errorCritico}</p>}
                    </div>
                </div>

                {stockBajo && (
                    <p style={{ color: "#a94442", fontWeight: "bold" }}>
                        Atención: el stock actual ({stock}) es igual o inferior al stock crítico configurado ({stockCritico}).
                    </p>
                )}

                <div style={campo}>
                    <label htmlFor="imagen" style={label}>{esNuevo ? "Imagen (opcional)" : "Reemplazar imagen (opcional)"}</label>
                    <input type="file" id="imagen" accept="image/png, image/jpeg, image/webp" style={input} />
                    <small style={ayuda}>
                        {esNuevo ? "Formatos JPG, PNG o WEBP. Tamaño recomendado 800x600 px." : "Deja el campo vacío para conservar la imagen actual."}
                    </small>
                </div>

                {!esNuevo && <img src={producto.imagen} alt={producto.alt} style={imagen} />}

                <div style={campo}>
                    <label htmlFor="publicado" style={{ ...label, display: "inline" }}>
                        <input type="checkbox" id="publicado" checked={publicado} onChange={e => setPublicado(e.target.checked)} />
                        Publicar en la tienda
                    </label>
                </div>

                {mensaje && <p style={exito}>{mensaje}</p>}

                <p style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <button type="submit" style={botonPrincipal}>{esNuevo ? "Guardar producto" : "Guardar cambios"}</button>
                    <a href="#" onClick={() => irA("admin-productos")} style={boton}>Cancelar</a>
                    {!esNuevo && <button type="button" style={boton}>Eliminar producto</button>}
                </p>
            </form>
        </section>
    );
}

export default FormularioProducto;
