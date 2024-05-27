let url = "https://paginas-web-cr.com/Api/apis/";
let autenticar = "AutenticarUsuario.php";
let recuperar = "SendPassword.php";

let nombrePagina = document.title;
let loginPagina = "Login";
let recovery = "Recuperar Password";
let spinnerText = 'Cargando';
let spinner = `
    <button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ${spinnerText}
    </button>`;

if (nombrePagina == loginPagina) {
    const showHiddenPass = (loginpass, loginEye) => {
        const input = document.getElementById(loginpass);
        const iconEye = document.getElementById(loginEye);

        iconEye.addEventListener('click', () => {
            // Cambiamos la contraseña a tipo texto
            if (input.type === 'password') {
                input.type = 'text';
                // Cambio de icono
                iconEye.classList.add('ri-eye-fill')
                iconEye.classList.remove('ri-eye-off-fill')
            } else {
                input.type = 'password';
                // Cambio de icono
                iconEye.classList.add('ri-eye-off-fill')
                iconEye.classList.remove('ri-eye-fill')
            }
        });
    }

    document.getElementById('formularioLogin').addEventListener("submit", function (evento) {
        evento.preventDefault(); // Evita la recarga de la pagina

        let datos = new FormData(document.getElementById('formularioLogin'));

        let datosEnviar = {
            email: datos.get('loginemail'),
            password: datos.get('loginpass')
        };

        fetch(url + autenticar, {
            method: 'POST',
            body: JSON.stringify(datosEnviar)
        })
        .then(repuesta => repuesta.json())
        .then((datosrespuestas) => {
            if (datosrespuestas.code === 200) {
                // Guarda el token de sesión en Storage
                sessionStorage.setItem('token', datosrespuestas.data);
            }
            insertarDatosLogin(datosrespuestas);
        })
    });

    function insertarDatosLogin(datosrespuestas) {
        // Carga el spinner cuando se llama a la función
        cargarSpinner();

        // Espera 1 segundo antes de realizar otras operaciones
        setTimeout(() => {
            if (datosrespuestas.code == 200) {
                // Cambia el texto del spinner a "Bienvenido"
                spinnerText = 'Bienvenido';
                // Renderiza el spinner con el nuevo texto
                cargarSpinner();
                // Espera 2 segundos antes de redirigir
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // Muestra el mensaje de advertencia cuando el inicio de sesión falla
                document.getElementById('mensajes').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <strong>Correo/Contraseña incorrectos</strong>
                </div>`;
                // Oculta el spinner después de mostrar el mensaje de advertencia
                ocultarSpinner();
                // Limpia los campos de email y contraseña
                document.getElementById('loginpass').value = '';
                document.getElementById('loginemail').value = '';
            }
        }, 1000);
    }

    function cargarSpinner() {
        // Actualiza el HTML del spinner con el valor actual de spinnerText
        document.getElementById("seccionSpinner").innerHTML = `
        <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ${spinnerText}
        </button>`;
    }

    function ocultarSpinner() {
        // Oculta el spinner
        document.getElementById("seccionSpinner").innerHTML = '';
    }

    function cambiarTextoSpinner(texto) {
        spinnerText = texto;
        cargarSpinner(); // Vuelve a renderizar el spinner con el nuevo texto
    }

    // Asegúrate de llamar a showHiddenPass si existe el elemento logineye
    const logineye = document.getElementById('logineye');
    if (logineye) {
        showHiddenPass('loginpass', 'logineye');
    }
}
if (nombrePagina == recovery) {
    $(document).ready(function() {
        $('#formularioLogin').on('submit', function(event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
            
            const email = $('#email').val(); // Obtener el valor del campo de correo electrónico

            const requestData = {
                email: email
            };
            
            $.ajax({
                url: 'https://paginas-web-cr.com/Api/apis/SendPassword.php', // URL de la API
                type: 'POST',
                contentType: 'application/json', // Tipo de contenido que se envía
                data: JSON.stringify(requestData), // Datos a enviar, convertidos a JSON
                success: function(response, textStatus, xhr) {
                    if (xhr.status === 200) { // Si la respuesta es exitosa
                        Swal.fire({
                           
                            position: 'center',
                            icon: 'success',
                            title: '¡Contraseña enviada!',
                            showConfirmButton: false,
                            timer: 3000
                        }
                    );
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Usuario no encontrado',
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                },
                error: function(xhr, status, error) {
                    // Manejar errores de AJAX con SweetAlert
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error al enviar la solicitud',
                        text: 'Por favor, inténtelo de nuevo más tarde.',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            });
        });
    });
    

}
