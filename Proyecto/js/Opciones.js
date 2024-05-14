if (!sessionStorage.getItem("token")) {
    location.href = "login.html"
}
let navbar =   
` <div class="logo">
<!---->            <img src="img/Logo.jpg" alt="Logo de la marca">
        </div>
        <nav>
           <ul class="nav-links">
                <li><a href="Index.html">Inicio</a></li>

                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        >Profesores</a
                    >
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="profesores.html">Lista</a>
                        <a class="dropdown-item" href="profesoresCrear.html">Crear</a>
                    </div>

                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                            href="#"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                            >Estudiantes</a
                        >
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="Estudiantes.html">Lista</a>
                            <a class="dropdown-item" href="EstudiantesCrear.html">Crear</a>
                        </div>

                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                href="#"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                                >Grupo</a
                            >
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="grupo.html">Lista</a>
                                <a class="dropdown-item" href="grupoCrear.html">Crear</a>
                            </div>

                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >Curso</a
                                >
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="curso.html">Lista</a>
                                    <a class="dropdown-item" href="cursoCrear.html">Crear</a>
                                </div>
           </ul>            
        </nav>
        <a class="btn" href="login.html" onclick="cerrarSesion()"><button class="btn_button">Cerrar Sesión</button></a>

<!---->        <a onclick="openNav()" class="menu" href="#"><button class="menu_button">Menu</button></a>

<!---->        <div id="mobile-menu" class="overlay">
<!---->            <a onclick="closeNav()" href="" class="close">&times;</a>
<!---->            <div class="overlay-content">
<!---->                <a href="Index.html">Inicio</a>
                        <ul>
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >Profesores</a
                                >
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="profesores.html">Lista</a>
                                    <a class="dropdown-item" href="profesoresCrear">Crear</a>
                                </div>
                                <li class="nav-item dropdown">
                                    <a
                                        class="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        href="#"
                                        role="button"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        >Estudiantes</a
                                    >
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="Estudiantes.html">Lista</a>
                                        <a class="dropdown-item" href="estudiantesCrear.html">Crear</a>
                                    </div>
                                    <li class="nav-item dropdown">
                                        <a
                                            class="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            href="#"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                                 >Grupo</a
                                        >
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="grupo.html">Lista</a>
                                            <a class="dropdown-item" href="grupoCrear.html">Crear</a>
                                        </div>
                                        <li class="nav-item dropdown">
                                            <a
                                                class="nav-link dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                                href="#"
                                                role="button"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                >Curso</a
                                            >
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="Curso.html">Lista</a>
                                                <a class="dropdown-item" href="cursoCrear.html">Crear</a>
                                            </div>
                        </ul>

<!---->                <a class="btn" href="login.html" onclick="cerrarSesion()"><button class="btn_button">Cerrar Sesión</button></a>
<!---->            </div>
<!---->        </div>`;

document.getElementById("navbar").innerHTML = navbar;



let piedepagina = `<h2>Pie de pagina</h2>`;

document.getElementById("piedepagina").innerHTML = piedepagina;


/*funciones */
function openNav() {
    document.getElementById("mobile-menu").style.width = "100%";
}

function closeNav() {
    document.getElementById("mobile-menu").style.width = "0%";
}

function cerrarSesion(){
    console.log('borr')
    console.log(sessionStorage.getItem("token"))
    sessionStorage.removeItem("token");

}
