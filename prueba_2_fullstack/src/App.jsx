import { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { productos } from "./data/productos";

//acá importamos componentes ya hechos
import Header from "./components/Header";
import Footer from "./components/Footer";
import MenuAdmin from "./components/MenuAdmin";


//Estas son la direcciones de las páginas de inicio y abajo las de admin
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";

import Dashboard from "./pages/admin/Dashboard";
import AdminProductos from "./pages/admin/AdminProductos";
import ProductoNuevo from "./pages/admin/ProductoNuevo";
import ProductoVer from "./pages/admin/ProductoVer";
import ProductoEditar from "./pages/admin/ProductoEditar";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import UsuarioNuevo from "./pages/admin/UsuarioNuevo";
import UsuarioVer from "./pages/admin/UsuarioVer";
import UsuarioEditar from "./pages/admin/UsuarioEditar";


    //Nosotros decidimos hacerlo así, aunque se puede hacer con rutas directas con react-router y un navigate en el botón
    //Así el app.jsx quedaría más limpio y solo manejaría las rutas, pero como en clases lo hemos hecho así lo mantuvimos
function App() {
    const [pagina, setPagina] = useState("inicio");
    const [seleccionado, setSeleccionado] = useState("");
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem("carrito")) || []);
    const [mensaje, setMensaje] = useState("");

    //Esta función es la que cambia los estados y le entrega un id como parámetro y lo setea, 
    // actualiza el estado página para indicar a que página debe ir
    function irA(nuevaPagina, id = "") {
        setPagina(nuevaPagina);
        setSeleccionado(id);
        setMensaje("");
        window.scrollTo(0, 0);
    }

    //Guarda el nuevo carrito y lo setea por si se recarga la página
    function guardarCarrito(nuevoCarrito) {
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }

    //se agrega un nuevo producto en el carrito y cuenta si excede el stock en el if, si lo excede tira el mensaje de error, si no,
    //ejecuta guardar carrito (el producto en el carrito)
    function agregarAlCarrito(codigo, cantidad) {
        const producto = productos.find(p => p.codigo === codigo);
        const linea = carrito.find(l => l.codigo === codigo);
        const cantidadActual = linea ? linea.cantidad : 0;

        if (cantidadActual + cantidad > producto.stock) {
            setMensaje(No hay más stock disponible de ${producto.nombre}. Máximo: ${producto.stock}.);
            return;
        }

        if (linea) {
            guardarCarrito(carrito.map(l => l.codigo === codigo ? { ...l, cantidad: l.cantidad + cantidad } : l));
        } else {
            guardarCarrito([...carrito, { codigo, cantidad }]);
        }

        setMensaje(${producto.nombre} fue agregado al carrito.);
    }

    //No necesita comentario, elimina el producto con el código que se le entrega.    
    function eliminarDelCarrito(codigo) {
        guardarCarrito(carrito.filter(l => l.codigo !== codigo));
    }

    //Lo mismo, cambia la cantidad del producto con el c´pidog que se le entrega
    function cambiarCantidad(codigo, cantidad) {
        const producto = productos.find(p => p.codigo === codigo);

        if (cantidad <= 0) {
            eliminarDelCarrito(codigo);
            return;
        }

        if (cantidad > producto.stock) {
            setMensaje(No puedes superar el stock disponible de ${producto.stock} unidades.);
            return;
        }

        guardarCarrito(carrito.map(l => l.codigo === codigo ? { ...l, cantidad } : l));
    }

    let cantidadTotal = 0;
    for (const linea of carrito) {
        cantidadTotal += linea.cantidad;
    }

    //de acá hacia abajo simplemente cambia la página dependiendo de si en entra con administrador o usuario.
    //dependiendo del estado de la constante página que se inicializa al principio del código
    if (pagina.startsWith("admin")) {
        return (
            <Container fluid>
                <Row>
                    <Col md={3} lg={2} className="bg-body-tertiary border-end p-3">
                        <MenuAdmin pagina={pagina} irA={irA} />
                    </Col>

                    <Col md={9} lg={10} className="p-4 min-vh-100">
                        {pagina === "admin" && <Dashboard irA={irA} />}
                        {pagina === "admin-productos" && <AdminProductos irA={irA} />}
                        {pagina === "admin-producto-nuevo" && <ProductoNuevo irA={irA} />}
                        {pagina === "admin-producto-ver" && <ProductoVer codigo={seleccionado} irA={irA} />}
                        {pagina === "admin-producto-editar" && <ProductoEditar codigo={seleccionado} irA={irA} />}
                        {pagina === "admin-usuarios" && <AdminUsuarios irA={irA} />}
                        {pagina === "admin-usuario-nuevo" && <UsuarioNuevo irA={irA} />}
                        {pagina === "admin-usuario-ver" && <UsuarioVer run={seleccionado} irA={irA} />}
                        {pagina === "admin-usuario-editar" && <UsuarioEditar run={seleccionado} irA={irA} />}

                        <footer className="mt-5 pt-3 border-top text-muted">
                            <small>Panel de administración · Huerto Verde · Entrega 1 DSY1104</small>
                        </footer>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <>
            <Header pagina={pagina} irA={irA} cantidad={cantidadTotal} />

            <Container className="py-4">
                {mensaje && (
                    <Alert variant="info" dismissible onClose={() => setMensaje("")}>
                        {mensaje}
                    </Alert>
                )}

                {pagina === "inicio" && <Inicio irA={irA} />}
                {pagina === "productos" && <Productos categoria={seleccionado} irA={irA} agregarAlCarrito={agregarAlCarrito} />}
                {pagina === "detalle" && <DetalleProducto key={seleccionado} codigo={seleccionado} irA={irA} agregarAlCarrito={agregarAlCarrito} />}
                {pagina === "nosotros" && <Nosotros />}
                {pagina === "blogs" && <Blogs irA={irA} />}
                {pagina === "blog1" && <Blog1 irA={irA} />}
                {pagina === "blog2" && <Blog2 irA={irA} />}
                {pagina === "contacto" && <Contacto />}
                {pagina === "login" && <Login irA={irA} />}
                {pagina === "registro" && <Registro irA={irA} />}
                {pagina === "carrito" && (
                    <Carrito
                        carrito={carrito}
                        irA={irA}
                        cambiarCantidad={cambiarCantidad}
                        eliminarDelCarrito={eliminarDelCarrito}
                    />
                )}
            </Container>

            <Footer irA={irA} />
        </>
    );
}

export default App;
