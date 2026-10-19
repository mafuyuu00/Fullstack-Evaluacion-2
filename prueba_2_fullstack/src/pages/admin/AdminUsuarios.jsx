import { Row, Col, Form, Button, Table, Pagination } from "react-bootstrap";
import { usuarios, tiposUsuario } from "../../data/usuarios";

function AdminUsuarios({ irA }) {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom border-success pb-2 mb-4">
                <h1 className="h3 m-0 text-success">Usuarios</h1>
                <Button href="#" variant="success" onClick={() => irA("admin-usuario-nuevo")}>Nuevo usuario</Button>
            </div>

            <main>
                <Form onSubmit={e => e.preventDefault()} className="mb-3">
                    <Row className="g-2 align-items-end">
                        <Col md={4}>
                            <Form.Group controlId="buscar">
                                <Form.Label>Buscar</Form.Label>
                                <Form.Control type="search" placeholder="Run, nombre o correo" maxLength={100} />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="perfil">
                                <Form.Label>Tipo de usuario</Form.Label>
                                <Form.Select>
                                    <option value="">Todos</option>
                                    <option value="administrador">Administrador</option>
                                    <option value="vendedor">Vendedor</option>
                                    <option value="cliente">Cliente</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="region">
                                <Form.Label>Región</Form.Label>
                                <Form.Select>
                                    <option value="">Todas</option>
                                    <option value="13">Región Metropolitana de Santiago</option>
                                    <option value="09">Región de La Araucanía</option>
                                    <option value="16">Región de Ñuble</option>
                                    <option value="07">Región del Maule</option>
                                    <option value="05">Región de Valparaíso</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" variant="outline-success">Filtrar</Button>
                        </Col>
                    </Row>
                </Form>

                <Table striped bordered hover responsive size="sm" className="caption-top">
                    <caption>Listado de usuarios ({usuarios.length} de 48 registros)</caption>
                    <thead>
                        <tr>
                            <th>Run</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Tipo de usuario</th>
                            <th>Región</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.run}>
                                <th>{usuario.run}</th>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellidos}</td>
                                <td>{usuario.correo}</td>
                                <td>{tiposUsuario[usuario.tipo]}</td>
                                <td>{usuario.region}</td>
                                <td>
                                    <a href="#" onClick={() => irA("admin-usuario-ver", usuario.run)} className="link-success">Ver</a>
                                    {" · "}
                                    <a href="#" onClick={() => irA("admin-usuario-editar", usuario.run)} className="link-success">Editar</a>
                                    {" · "}
                                    <Button variant="outline-danger" size="sm">Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Pagination size="sm" className="mt-3">
                    <Pagination.Prev>&laquo;</Pagination.Prev>
                    <Pagination.Item active>1</Pagination.Item>
                    <Pagination.Item>2</Pagination.Item>
                    <Pagination.Item>3</Pagination.Item>
                    <Pagination.Item>4</Pagination.Item>
                    <Pagination.Item>5</Pagination.Item>
                    <Pagination.Next>&raquo;</Pagination.Next>
                </Pagination>
            </main>
        </>
    );
}

export default AdminUsuarios;
