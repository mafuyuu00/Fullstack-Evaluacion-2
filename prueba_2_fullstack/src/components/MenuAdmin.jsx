import { Nav, Button } from "react-bootstrap";

function MenuAdmin({ pagina, irA }) {
    return (
        <nav>
            <a href="#" onClick={() => irA("admin")} className="d-flex align-items-center gap-2 mb-4 fw-bold link-success text-decoration-none">
                <img src="/img/branding/logo.svg" alt="" width="30" height="30" />
                Huerto Verde
            </a>

            <div className="d-grid gap-2">
                <Button variant={pagina === "admin" ? "success" : "outline-success"} className="text-start" onClick={() => irA("admin")}>
                    Dashboard
                </Button>
                <Button variant={pagina.startsWith("admin-producto") ? "success" : "outline-success"} className="text-start" onClick={() => irA("admin-productos")}>
                    Productos
                </Button>
                <Button variant={pagina.startsWith("admin-usuario") ? "success" : "outline-success"} className="text-start" onClick={() => irA("admin-usuarios")}>
                    Usuarios
                </Button>
            </div>

            <hr />

            <Nav className="flex-column">
                <Nav.Link href="#" onClick={() => irA("inicio")} className="link-success px-0">Ir a la tienda</Nav.Link>
                <Nav.Link href="#" onClick={() => irA("login")} className="link-success px-0">Cerrar sesión</Nav.Link>
            </Nav>
        </nav>
    );
}

export default MenuAdmin;
