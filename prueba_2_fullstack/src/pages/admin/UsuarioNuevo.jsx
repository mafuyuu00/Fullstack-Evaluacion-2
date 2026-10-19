import FormularioUsuario from "../../components/FormularioUsuario";

const encabezado = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: "2px solid #6b8e4e"
};
const titulo = { margin: 0, color: "#355e3b", fontSize: 24 };
const boton = {
    display: "inline-block",
    padding: "8px 16px",
    border: "1px solid #8b5e3c",
    background: "#ffffff",
    color: "#8b5e3c",
    textDecoration: "none"
};

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
            <header style={encabezado}>
                <h1 style={titulo}>Nuevo usuario</h1>
                <a href="#" onClick={() => irA("admin-usuarios")} style={boton}>Volver al listado</a>
            </header>

            <main>
                <FormularioUsuario usuario={usuarioVacio} esNuevo={true} irA={irA} />
            </main>
        </>
    );
}

export default UsuarioNuevo;
