import { Navbar, Nav, Container } from "react-bootstrap";

function Header({ pagina, irA, cantidad }) {
    return (
        <>
            <Navbar bg="success" data-bs-theme="dark" expand="md">
                <Container>
                    <Navbar.Brand href="#" onClick={() => irA("inicio")} className="d-flex align-items-center gap-2 fw-bold">
                        <img src="/img/branding/logo.svg" alt="" width="30" height="30" />
                        Huerto Verde
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="menu-principal" />
                    <Navbar.Collapse id="menu-principal">
                        <Nav className="me-auto">
                            <Nav.Link href="#" onClick={() => irA("inicio")} active={pagina === "inicio"}>Home</Nav.Link>
                            <Nav.Link href="#" onClick={() => irA("productos")} active={pagina === "productos" || pagina === "detalle"}>Productos</Nav.Link>
                            <Nav.Link href="#" onClick={() => irA("nosotros")} active={pagina === "nosotros"}>Nosotros</Nav.Link>
                            <Nav.Link href="#" onClick={() => irA("blogs")} active={pagina.startsWith("blog")}>Blogs</Nav.Link>
                            <Nav.Link href="#" onClick={() => irA("contacto")} active={pagina === "contacto"}>Contacto</Nav.Link>
                        </Nav>

                        <Nav>
                            <Nav.Link href="#" onClick={() => irA("carrito")} active={pagina === "carrito"} className="d-flex align-items-center gap-2">
                                <img src="/img/iconos/icono-carrito.svg" alt="" width="30" height="30" className="bg-white rounded-circle p-1" />
                                Carrito ({cantidad})
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {(pagina === "inicio" || pagina === "productos") && (
                <div className="bg-body-tertiary border-bottom py-2">
                    <Container className="d-flex justify-content-end gap-2 small">
                        <a href="#" onClick={() => irA("login")} className="link-success">Iniciar sesión</a>
                        <span>|</span>
                        <a href="#" onClick={() => irA("registro")} className="link-success">Registrar usuario</a>
                    </Container>
                </div>
            )}
        </>
    );
}

export default Header;
