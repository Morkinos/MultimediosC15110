
let url =  "https://paginas-web-cr.com/Api/apis/";
let autenticar = "AutenticarUsuario.php";

let nombrePagina = document.title;
let loginPagina = "Login";

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

const showHiddenPass =(loginpass, loginEye) => {
    const input = document.getElementById(loginpass);
    const  iconEye = document.getElementById(loginEye);
 
    iconEye.addEventListener('click',() => {
  
        //cambiamos la contrase;a a tipo texto
        if(input.type ==='password'){
            //cambiamos 
            input.type = 'text';
            //cambio de icooono
            iconEye.classList.add('ri-eye-fill')
            iconEye.classList.remove('ri-eye-off-fill')
        }else{
            input.type = 'password';
            //cambio de icooono
            iconEye.classList.add('ri-eye-off-fill')
            iconEye.classList.remove('ri-eye-fill')  
        }
    });
}


if (nombrePagina == loginPagina){
    formularioLogin.addEventListener("submit",
        function(evento){

            evento.preventDefault();//evita la recarga de la pagina
          
            let datos = new FormData(formularioLogin);
           
            let datosEnviar =
            {
                email: datos.get('loginemail'),
                password: datos.get('loginpass')
            };

            fetch ( url + autenticar,
                {
                    method: 'POST',
                    body: JSON.stringify(datosEnviar)   
                }
            ) 
            .then( repuesta=> repuesta.json() )
            .then ( (datosrepuestas) => {
                console.log(datosrepuestas.data)
                
                // if (datosrespuestas.code === 200) {
                //     // Guarda el token de sesión en localStorage
                //     sessionStorage.setItem('token', datosrespuestas.data);
                //     //insertarDatosLogin(datosrespuestas);
                // } 
            })


            
            
        })

    }

function insertarDatosLogin(datosrepuestas){
    if ( datosrepuestas.code == 200){
        mensajes.innerHTML = `<div
        class="alert alert-success alert-dismissible fade show"
        role="alert">
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
        <strong>Ingreso exitoso</strong>
    </div>`;
    window.location.href = 'index.html';
    }
    else{
        console.log('Entre2')
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
        <strong>Correo/Contraseña incorrectos</strong>
    </div>`;


    }
}

function cargarspinner(){
    document.getElementById("seccionspinner").innerHTML = spinner;
}


showHiddenPass('loginpass','logineye')
