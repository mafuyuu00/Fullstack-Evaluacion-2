import { Button } from "react-bootstrap";
import FormularioUsuario from "../../components/FormularioUsuario";
import { usuarios } from "../../data/usuarios";

function UsuarioEditar({ run, irA }) {
    const usuario = usuarios.find(u => u.run === run);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom border-success pb-2 mb-4">
                <h1 className="h3 m-0 text-success">Editar usuario</h1>
                <div className="d-flex flex-wrap gap-2">
                    <Button href="#" variant="outline-success" onClick={() => irA("admin-usuario-ver", run)}>Ver ficha</Button>
                    <Button href="#" variant="outline-success" onClick={() => irA("admin-usuarios")}>Volver al listado</Button>
                </div>
            </div>

            <main>
                <FormularioUsuario usuario={usuario} esNuevo={false} irA={irA} />
            </main>
        </>
    );
}

export default UsuarioEditar;
