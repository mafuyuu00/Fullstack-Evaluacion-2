import { Row, Col, Button, Breadcrumb, Image, Table } from "react-bootstrap";
import { usuarios, tiposUsuario } from "../../data/usuarios";

const descripcionTipo = {
    administrador: "acceso total al sistema",
    vendedor: "sólo puede ver productos y órdenes",
    cliente: "compras en la tienda"
};

const permisos = {
    administrador: [
        ["Productos", "Sí", "Sí", "Sí", "Sí"],
        ["Usuarios", "Sí", "Sí", "Sí", "Sí"],
        ["Órdenes", "Sí", "Sí", "Sí", "Sí"],
        ["Tienda pública", "Sí", "—", "—", "—"]
    ],
    vendedor: [
        ["Productos", "Sí", "—", "—", "—"],
        ["Usuarios", "—", "—", "—", "—"],
        ["Órdenes", "Sí", "—", "—", "—"],
        ["Tienda pública", "Sí", "—", "—", "—"]
    ],
    cliente: [
        ["Productos", "—", "—", "—", "—"],
        ["Usuarios", "—", "—", "—", "—"],
        ["Órdenes", "—", "—", "—", "—"],
        ["Tienda pública", "Sí", "—", "—", "—"]
    ]
};

function UsuarioVer({ run, irA }) {
    const usuario = usuarios.find(u => u.run === run);
    const fechaNacimiento = new Date(usuario.fechaNacimiento).toLocaleDateString("es-CL", { dateStyle: "long", timeZone: "UTC" });

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom border-success pb-2 mb-4">
                <h1 className="h3 m-0 text-success">{usuario.nombre} {usuario.apellidos}</h1>
                <div className="d-flex flex-wrap gap-2">
                    <Button href="#" variant="success" onClick={() => irA("admin-usuario-editar", run)}>Editar</Button>
                    <Button href="#" variant="outline-success" onClick={() => irA("admin-usuarios")}>Volver al listado</Button>
                </div>
            </div>

            <main>
                <Breadcrumb>
                    <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("admin")}>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item href="#" linkProps={{ className: "link-success" }} onClick={() => irA("admin-usuarios")}>Usuarios</Breadcrumb.Item>
                    <Breadcrumb.Item active>{usuario.run}</Breadcrumb.Item>
                </Breadcrumb>

                <section className="mb-4">
                    <h2 className="h5">Ficha del usuario</h2>
                    <Image src="/img/branding/logo.svg" alt="Avatar del usuario" width="120" height="120" rounded thumbnail className="mb-3" />
                    <Row as="dl">
                        <Col as="dt" sm={4} lg={3}>Run</Col>
                        <Col as="dd" sm={8} lg={9}>{usuario.run}</Col>
                        <Col as="dt" sm={4} lg={3}>Nombre</Col>
                        <Col as="dd" sm={8} lg={9}>{usuario.nombre}</Col>
                        <Col as="dt" sm={4} lg={3}>Apellidos</Col>
                        <Col as="dd" sm={8} lg={9}>{usuario.apellidos}</Col>
                        <Col as="dt" sm={4} lg={3}>Correo</Col>
                        <Col as="dd" sm={8} lg={9}><a href={"mailto:" + usuario.correo} className="link-success">{usuario.correo}</a></Col>
                        <Col as="dt" sm={4} lg={3}>Fecha de nacimiento</Col>
                        <Col as="dd" sm={8} lg={9}>{fechaNacimiento}</Col>
                        <Col as="dt" sm={4} lg={3}>Tipo de usuario</Col>
                        <Col as="dd" sm={8} lg={9}>{tiposUsuario[usuario.tipo]} ({descripcionTipo[usuario.tipo]})</Col>
                        <Col as="dt" sm={4} lg={3}>Región</Col>
                        <Col as="dd" sm={8} lg={9}>{usuario.region}</Col>
                        <Col as="dt" sm={4} lg={3}>Comuna</Col>
                        <Col as="dd" sm={8} lg={9}>{usuario.comuna}</Col>
                        <Col as="dt" sm={4} lg={3}>Dirección</Col>
                        <Col as="dd" sm={8} lg={9}>{usuario.direccion}</Col>
                        <Col as="dt" sm={4} lg={3}>Fecha de registro</Col>
                        <Col as="dd" sm={8} lg={9}>{usuario.fechaRegistro}</Col>
                        <Col as="dt" sm={4} lg={3}>Último acceso</Col>
                        <Col as="dd" sm={8} lg={9}>{usuario.ultimoAcceso}</Col>
                    </Row>
                </section>

                <section>
                    <h2 className="h5">Permisos del perfil</h2>
                    <Table striped bordered hover responsive size="sm" className="caption-top">
                        <caption>Accesos asociados al perfil {tiposUsuario[usuario.tipo]}</caption>
                        <thead>
                            <tr>
                                <th>Módulo</th>
                                <th>Ver</th>
                                <th>Crear</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permisos[usuario.tipo].map(fila => (
                                <tr key={fila[0]}>
                                    <th>{fila[0]}</th>
                                    <td>{fila[1]}</td>
                                    <td>{fila[2]}</td>
                                    <td>{fila[3]}</td>
                                    <td>{fila[4]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </section>
            </main>
        </>
    );
}

export default UsuarioVer;
