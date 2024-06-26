$(document).ready(function () {
    if (!sessionStorage.getItem("token")) {
        location.href = "login.html";
    }

    // Propiedades
    let tablaGrupos = $("#tablaGrupos");
    let mensajes = $("#mensajes");

    let url = "https://paginas-web-cr.com/Api/apis/";
    let listar = "ListaGrupo.php";
    let insertar = "InsertarGrupo.php";
    let actualizar = "ActualizarGrupo.php";
    let Eliminar = "BorrarGrupo.php";

    let formulario = $("#formulario");
    let formularioEditar = $("#formularioEditar");

    let nombrePagina = document.title;

    let listarPaginaGrup = "Listar Grupos";
    let crearPagina = "Crear Grupos";

    let spinner = `
        <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
        </button>`;

    if (nombrePagina == crearPagina) {
        formulario.on("submit", function (evento) {
            evento.preventDefault(); // evita la recarga de la pagina

            let datos = formulario.serializeArray();
            let datosEnviar = {
                nombre: datos.find(d => d.name === 'nombre').value,
            };
            console.log(datosEnviar);

            $.ajax({
                url: url + insertar,
                method: 'POST',
                data: JSON.stringify(datosEnviar),
                contentType: 'application/json',
                success: function (datosrepuestas) {
                    insertarDatos(datosrepuestas);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    }

    if (nombrePagina == listarPaginaGrup) {
        formularioEditar.on("submit", function (evento) {
            evento.preventDefault(); // evita la recarga de la pagina

            let datos = formularioEditar.serializeArray();
            let datosEnviar = {
                id: datos.find(d => d.name === 'id').value,
                nombre: datos.find(d => d.name === 'nombre').value,
            };
            console.log(datosEnviar);

            $.ajax({
                url: url + actualizar,
                method: 'POST',
                data: JSON.stringify(datosEnviar),
                contentType: 'application/json',
                success: function (datosrepuestas) {
                    editarDatos(datosrepuestas);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    }

    // Métodos
    function cargar() {
        tablaGrupos.html("");
        cargarspinner();
        $.ajax({
            url: url + listar,
            method: 'GET',
            success: function (datosrepuestas) {
                pintardatos(datosrepuestas);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function pintardatos(objetodatos) {
        if (objetodatos.code == 200) {
            for (const item of objetodatos.data) {
                tablaGrupos.append(`
                    <tr class="table-primary">
                        <td scope="row">${item.id}</td>
                        <td>${item.nombre}</td>
                        <td>
                            <a name="" id="editar" class="btn btn-primary" onclick="editar('${encodeURIComponent(JSON.stringify(item))}')" role="button">Editar</a>
                            <a name="" id="eliminar" class="btn btn-danger" onclick="eliminar('${item.id}')" role="button">Eliminar</a>
                        </td>
                    </tr>
                `);
            }
        }

        $("#seccionspinner").html("");
    }

    function cargarspinner() {
        $("#seccionspinner").html(spinner);
    }

    function insertarDatos(datosrepuestas) {
        if (datosrepuestas.code == 200) {
            mensajes.html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Ingreso exitoso</strong>
            </div>`);
        } else {
            mensajes.html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Algo fallo</strong>
            </div>`);
        }
    }

    function editar(datos) {
        let objeto = JSON.parse(decodeURIComponent(datos));

        const modalEdicion = new bootstrap.Modal($("#modalEdicion"));
        modalEdicion.show();

        $("#id").val(objeto.id);
        $("#nombre").val(objeto.nombre);
        $("#idEditar").html(objeto.id);
    }

    function editarDatos(datosrepuestas) {
        if (datosrepuestas.code == 200) {
            mensajes.html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Modificacion exitosa</strong>
            </div>`);
            setTimeout(cargar, 2000);
        } else {
            mensajes.html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>Algo fallo</strong>
            </div>`);
        }
    }

    function eliminar(id) {
        const modalEliminar = new bootstrap.Modal($("#modalEliminar"));
        modalEliminar.show();
        $("#idEliminar").html(id);
        $("#idEliminarModal").val(id);
    }

    window.modalConfirmacionEliminar = function () {
        let id = {
            id: $("#idEliminarModal").val()
        };

        $.ajax({
            url: url + Eliminar,
            method: 'POST',
            data: JSON.stringify(id),
            contentType: 'application/json',
            success: function (data) {
                if (data.code == 200) {
                    alert("El registro ha sido eliminado correctamente.");
                    cargar();
                } else {
                    alert("Hubo un error al eliminar el registro.");
                }
            },
            error: function (err) {
                console.error('Error al eliminar el registro:', err);
                alert("Hubo un error al eliminar el registro.");
            }
        });
    }

    if (nombrePagina == listarPaginaGrup) {
        cargar();
    }

    // Hacer que las funciones estén disponibles globalmente
    window.editar = editar;
    window.eliminar = eliminar;
});
