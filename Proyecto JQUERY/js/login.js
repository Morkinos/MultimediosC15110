$(document).ready(function() {
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

    if (nombrePagina === loginPagina) {
        const showHiddenPass = (loginpass, loginEye) => {
            const input = $(`#${loginpass}`);
            const iconEye = $(`#${loginEye}`);

            iconEye.on('click', function() {
                if (input.attr('type') === 'password') {
                    input.attr('type', 'text');
                    iconEye.addClass('ri-eye-fill').removeClass('ri-eye-off-fill');
                } else {
                    input.attr('type', 'password');
                    iconEye.addClass('ri-eye-off-fill').removeClass('ri-eye-fill');
                }
            });
        };

        $('#formularioLogin').on('submit', function(evento) {
            evento.preventDefault();

            let datos = $(this).serializeArray();
            let datosEnviar = {
                email: datos.find(item => item.name === 'loginemail').value,
                password: datos.find(item => item.name === 'loginpass').value
            };

            $.ajax({
                url: url + autenticar,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(datosEnviar),
                success: function(datosrespuestas) {
                    if (datosrespuestas.code === 200) {
                        sessionStorage.setItem('token', datosrespuestas.data);
                    }
                    insertarDatosLogin(datosrespuestas);
                }
            });
        });

        function insertarDatosLogin(datosrespuestas) {
            cargarSpinner();

            setTimeout(function() {
                if (datosrespuestas.code === 200) {
                    spinnerText = 'Bienvenido';
                    cargarSpinner();
                    setTimeout(function() {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    $('#mensajes').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        <strong>Correo/Contraseña incorrectos</strong>
                    </div>`);
                    ocultarSpinner();
                    $('#loginpass').val('');
                    $('#loginemail').val('');
                }
            }, 1000);
        }

        function cargarSpinner() {
            $("#seccionSpinner").html(spinner);
        }

        function ocultarSpinner() {
            $("#seccionSpinner").html('');
        }

        const logineye = $('#logineye');
        if (logineye.length) {
            showHiddenPass('loginpass', 'logineye');
        }
    }

    if (nombrePagina === recovery) {
        $('#formularioLogin').on('submit', function(event) {
            event.preventDefault();

            const email = $('#email').val();
            const requestData = { email: email };
            
            $.ajax({
                url: url + recuperar,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestData),
                success: function(response, textStatus, xhr) {
                    if (xhr.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '¡Contraseña enviada!',
                            showConfirmButton: false,
                            timer: 3000
                        });
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
    }
});
