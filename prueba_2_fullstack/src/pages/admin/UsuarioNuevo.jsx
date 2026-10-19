import { Button } from "react-bootstrap";
import FormularioUsuario from "../../components/FormularioUsuario";

const usuarioVacio = {
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    fechaNacimiento: "",
    tipo: "cliente",
    region: "",
    comuna: "",
    direccion: ""
};

function UsuarioNuevo({ irA }) {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom border-success pb-2 mb-4">
                <h1 className="h3 m-0 text-success">Nuevo usuario</h1>
                <Button href="#" variant="outline-success" onClick={() => irA("admin-usuarios")}>Volver al listado</Button>
            </div>

            <main>
                <FormularioUsuario usuario={usuarioVacio} esNuevo={true} irA={irA} />
            </main>
        </>
    );
}

export default UsuarioNuevo;
