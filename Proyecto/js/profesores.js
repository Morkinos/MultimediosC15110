//Propiedades
let tablaprofes = document.querySelector("#tablaprofes");
let mensajes = document.querySelector("#mensajes");

let url = "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaProfesores.php";
let insertar = "InsertarProfesores.php";
let actualizar = "ActualizarProfesores.php";
let Eliminar = "BorrarProfesores.php"

let formulario = document.getElementById("formulario");
let formularioEditar = document.getElementById("formularioEditar");

let nombrePagina = document.title;

let listarPaginaProf = "Listar Profesores";
let crearPagina = "Crear Profes";

let spinner = `
            <button
            class="btn btn-primary"
            type="button"
            disabled
            >
            <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
            ></span>
            Loading...
            </button>`;




if (!sessionStorage.getItem("token")) {
    location.href = "login.html"
}


if (nombrePagina == crearPagina) {

    formulario.addEventListener("submit",
        function (evento) {
            evento.preventDefault();//evita la recarga de la pagina

            let datos = new FormData(formulario);

            let datosEnviar =
            {
                cedula: datos.get('cedula'),
                correoelectronico: datos.get('correoelectronico'),
                telefono: datos.get('telefono'),
                telefonocelular: datos.get('telefonocelular'),
                fechanacimiento: datos.get('fechanacimiento'),
                sexo: datos.get('sexo'),
                direccion: datos.get('direccion'),
                nombre: datos.get('nombre'),
                apellidopaterno: datos.get('apellidopaterno'),
                apellidomaterno: datos.get('apellidomaterno'),
                idCarreras: datos.get('idCarreras'),
                usuario: datos.get('usuario'),
                nacionalidad: datos.get('nacionalidad'),


            };

            fetch(url + insertar,
                {
                    method: 'POST',
                    body: JSON.stringify(datosEnviar)
                }
            )
                .then(repuesta => repuesta.json())
                .then((datosrepuestas) => {
                    insertarDatos(datosrepuestas)

                })
                .catch(console.log)

        })
}


if (nombrePagina == listarPaginaProf) {

    formularioEditar.addEventListener("submit",
        function (evento) {
            evento.preventDefault();//evita la recarga de la pagina

            let datos = new FormData(formularioEditar);

            let datosEnviar =
            {
                id: datos.get('id'),
                cedula: datos.get('cedula'),
                correoelectronico: datos.get('correoelectronico'),
                telefono: datos.get('telefono'),
                telefonocelular: datos.get('telefonocelular'),
                fechanacimiento: datos.get('fechanacimiento'),
                sexo: datos.get('sexo'),
                direccion: datos.get('direccion'),
                nombre: datos.get('nombre'),
                apellidopaterno: datos.get('apellidopaterno'),
                apellidomaterno: datos.get('apellidomaterno'),
                idCarreras: datos.get('idCarreras'),
                usuario: datos.get('usuario'),
                nacionalidad: datos.get('nacionalidad')
            };

            console.log(datosEnviar)

            console.log(url + actualizar,
                {
                    method: 'POST',
                    body: JSON.stringify(datosEnviar)
                }
            );
            fetch(url + actualizar,
                {
                    method: 'POST',
                    body: JSON.stringify(datosEnviar)
                }
            )
                .then(repuesta => repuesta.json())
                .then((datosrepuestas) => {
                    editarDatos(datosrepuestas)

                })
                .catch(console.log)

        })
}



//Metodos
function cargar() {
    tablaprofes.innerHTML = "";
    cargarspinner();
    fetch(url + listar) //https://paginas-web-cr.com/Api/apis/ListaProfesores.php
        .then(repuesta => repuesta.json())
        .then((datosrepuestas) => {
            pintardatos(datosrepuestas)
        })
        .catch(console.log)
}

function pintardatos(objetodatos) {
    //    console.log(objetodatos);
    if (objetodatos.code == 200) {
        for (const item of objetodatos.data) {
            //console.log(item.id);
            tablaprofes.innerHTML += `
            <tr
            class="table-primary"
            >
                <td scope="row">${item.id}</td>
                <td>${item.cedula}</td>
                <td>${item.correoelectronico}</td>
                <td>${item.telefono}</td>
                <td>${item.telefonocelular}</td>
                <td>${item.fechanacimiento}</td>
                <td>${item.sexo}</td>
                <td>${item.direccion}</td>
                <td>${item.nombre}</td>
                <td>${item.apellidopaterno}</td>
                <td>${item.apellidomaterno}</td>
                <td>${item.idCarreras}</td>
                <td>${item.usuario}</td>
                <td>${item.nacionalidad}</td>
                <td>

                <a
                    name=""
                    id=""
                    class="btn btn-primary"
                    onclick=editar('${encodeURIComponent(JSON.stringify(item))}')
                    role="button"
                    >Editar</a
                >
                <a
                    name=""
                    id=""
                    class="btn btn-danger"
                    onclick=eliminar('${item.id}')
                    role="button"
                    >Eliminar</a
                >
                </td>
            </tr>`;

        }
    }



    document.getElementById("seccionspinner").innerHTML = "";
}

function cargarspinner() {
    document.getElementById("seccionspinner").innerHTML = spinner;
}

function insertarDatos(datosrepuestas) {
    if (datosrepuestas.code == 200) {
        mensajes.innerHTML = `<div
        class="alert alert-success alert-dismissible fade show"
        role="alert"
    >
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
        <strong>Ingreso exitoso</strong>
    </div>`;
    }
    else {
        mensajes.innerHTML = `<div
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
    >
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
        <strong>Algo fallo</strong>
    </div>`;
    }
}

function editar(datos) {
    let objeto = JSON.parse(decodeURIComponent(datos));

    const modalEdicion = new bootstrap.Modal(document.getElementById("modalEdicion"));
    modalEdicion.show();

    document.getElementById("id").value = objeto.id;
    document.getElementById("nombre").value = objeto.nombre;
    document.getElementById("cedula").value = objeto.cedula;
    document.getElementById("correoelectronico").value = objeto.correoelectronico;
    document.getElementById("telefono").value = objeto.telefono;
    document.getElementById("telefonocelular").value = objeto.telefonocelular;
    document.getElementById("fechanacimiento").value = objeto.fechanacimiento;
    document.getElementById("sexo").value = objeto.sexo;
    document.getElementById("direccion").value = objeto.direccion;
    document.getElementById("apellidopaterno").value = objeto.apellidopaterno;
    document.getElementById("apellidomaterno").value = objeto.apellidomaterno;
    document.getElementById("idCarreras").value = objeto.idCarreras;
    document.getElementById("usuario").value = objeto.usuario;
    document.getElementById("nacionalidad").value = objeto.nacionalidad;
    document.getElementById("idEditar").innerHTML = objeto.id;
}


function editarDatos(datosrepuestas) {
    if (datosrepuestas.code == 200) {
        mensajes.innerHTML = `<div
        class="alert alert-success alert-dismissible fade show"
        role="alert"
    >
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
        <strong>Modificacion exitosa</strong>
    </div>`;
        setTimeout(cargar, 2000);
    }
    else {
        mensajes.innerHTML = `<div
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
    >
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
        <strong>Algo fallo</strong>
    </div>`;
    }
}

function eliminar(id) {
    const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
    modalEliminar.show();
    document.getElementById("idEliminar").innerHTML = id;
    document.getElementById("idEliminarModal").value = id;

}

function modalConfirmacionEliminar() {

    let id = {
        id: document.getElementById("idEliminarModal").value
    }
    fetch(url + Eliminar, {
        method: 'POST',
        body: JSON.stringify(id)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.code)
            if (data.code == 200) {

                // Eliminación exitosa
                alert("El registro ha sido eliminado correctamente.");
                cargar(); // Actualizar la lista después de eliminar
            } else {
                // Manejar el error
                alert("Hubo un error al eliminar el registro T_T.");
            }
        })
        .catch(error => {
            console.error('Error al eliminar el registro:', error);
            alert("Hubo un error al eliminar el registro.");
        });
}

if (nombrePagina == listarPaginaProf) {
    cargar();
}