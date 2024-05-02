
let url = "https://paginas-web-cr.com/Api/apis/";
let autenticar = "AutenticarUsuario.php";

let nombrePagina = document.title;
let loginPagina = "Login";
let spinnerText = 'Cargando'
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
            ${spinnerText}
            </button>`;

const showHiddenPass = (loginpass, loginEye) => {
    const input = document.getElementById(loginpass);
    const iconEye = document.getElementById(loginEye);

    iconEye.addEventListener('click', () => {

        //cambiamos la contrase;a a tipo texto
        if (input.type === 'password') {
            //cambiamos 
            input.type = 'text';
            //cambio de icooono
            iconEye.classList.add('ri-eye-fill')
            iconEye.classList.remove('ri-eye-off-fill')
        } else {
            input.type = 'password';
            //cambio de icooono
            iconEye.classList.add('ri-eye-off-fill')
            iconEye.classList.remove('ri-eye-fill')
        }
    });
}


if (nombrePagina == loginPagina) {

    formularioLogin.addEventListener("submit",
        function (evento) {

            evento.preventDefault();//evita la recarga de la pagina

            let datos = new FormData(formularioLogin);

            let datosEnviar =
            {
                email: datos.get('loginemail'),
                password: datos.get('loginpass')
            };

            fetch(url + autenticar,
                {
                    method: 'POST',
                    body: JSON.stringify(datosEnviar)
                }
            )
                .then(repuesta => repuesta.json())
                .then((datosrespuestas) => {
                    console.log(datosrespuestas.code)

                    if (datosrespuestas.code === 200) {
                        console.log(datosrespuestas.data)
                        // Guarda el token de sesión en localStorage
                        sessionStorage.setItem('token', datosrespuestas.data);
                        const sessionStor = sessionStorage.getItem('token')
                        console.log(sessionStor)
                    }
                    insertarDatosLogin(datosrespuestas);
                })
        })
}
//Emmanuel@gmail.com

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
            message.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
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

showHiddenPass('loginpass', 'logineye')
