import FormularioUsuario from "../../components/FormularioUsuario";
import { usuarios } from "../../data/usuarios";

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

function UsuarioEditar({ run, irA }) {
    const usuario = usuarios.find(u => u.run === run);

    return (
        <>
            <header style={encabezado}>
                <h1 style={titulo}>Editar usuario</h1>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a href="#" onClick={() => irA("admin-usuario-ver", run)} style={boton}>Ver ficha</a>
                    <a href="#" onClick={() => irA("admin-usuarios")} style={boton}>Volver al listado</a>
                </div>
            </header>

            <main>
                <FormularioUsuario usuario={usuario} esNuevo={false} irA={irA} />
            </main>
        </>
    );
}

export default UsuarioEditar;
