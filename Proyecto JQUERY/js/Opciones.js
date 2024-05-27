document.addEventListener("DOMContentLoaded", function () {
    if (!sessionStorage.getItem("token")) {
        location.href = "login.html";
    }

    let navbar = `
        <div class="logo">
            <img src="img/Logo.jpg" alt="Logo de la marca">
        </div>
        <nav>
            <ul class="nav-links">
                <li><a href="Index.html">Inicio</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profesores</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="profesores.html">Lista</a>
                        <a class="dropdown-item" href="profesoresCrear.html">Crear</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Estudiantes</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="Estudiantes.html">Lista</a>
                        <a class="dropdown-item" href="EstudiantesCrear.html">Crear</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Grupo</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="grupo.html">Lista</a>
                        <a class="dropdown-item" href="grupoCrear.html">Crear</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Curso</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="curso.html">Lista</a>
                        <a class="dropdown-item" href="cursoCrear.html">Crear</a>
                    </div>
                </li>
            </ul>
        </nav>
        <a class="btn" onclick="cerrarSesion()"><button class="btn_button">Cerrar Sesión</button></a>
        <a onclick="openNav()" class="menu" href="#"><button class="menu_button">Menu</button></a>
        <div id="mobile-menu" class="overlay">
            <a onclick="closeNav()" href="#" class="close">&times;</a>
            <div class="overlay-content">
                <a href="Index.html">Inicio</a>
                <ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profesores</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="profesores.html">Lista</a>
                            <a class="dropdown-item" href="profesoresCrear.html">Crear</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Estudiantes</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="Estudiantes.html">Lista</a>
                            <a class="dropdown-item" href="EstudiantesCrear.html">Crear</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Grupo</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="grupo.html">Lista</a>
                            <a class="dropdown-item" href="grupoCrear.html">Crear</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Curso</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="Curso.html">Lista</a>
                            <a class="dropdown-item" href="cursoCrear.html">Crear</a>
                        </div>
                    </li>
                </ul>
                <a class="btn" onclick="cerrarSesion()"><button class="btn_button">Cerrar Sesión</button></a>
            </div>
        </div>`;

    document.getElementById("navbar").innerHTML = navbar;

    let piedepagina = `<footer class="footer">
        <ul class="social-icon">
            <li class="icon-elem">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="icon">
                    <ion-icon name="logo-youtube"></ion-icon>
                </a>
            </li>
            <li class="icon-elem">
                <a href="https://www.instagram.com" class="icon">
                    <ion-icon name="logo-instagram"></ion-icon>
                </a>
            </li>
            <li class="icon-elem">
                <a href="" class="icon">
                    <ion-icon name="logo-whatsapp"></ion-icon>
                </a>
            </li>
            <li class="icon-elem">
                <a href="https://www.facebook.com" class="icon">
                    <ion-icon name="logo-facebook"></ion-icon>
                </a>
            </li>
            <li class="icon-elem">
                <a href="https://www.Gmail.com" class="icon">
                    <ion-icon name="mail-outline"></ion-icon>
                </a>
            </li>
        </ul>
        <ul class="menu_Footer">
            <li class="menu-elem_Footer">
                <a href="index.html" class="menu-icon_Footer"> Inicio </a>
            </li>
            <li class="menu-elem_Footer">
                <a href="Estudiantes.html" class="menu-icon_Footer"> Estudiantes </a>
            </li>
            <li class="menu-elem_Footer">
                <a href="grupo.html" class="menu-icon_Footer"> Grupo </a>
            </li>
            <li class="menu-elem_Footer">
                <a href="profesores.html" class="menu-icon_Footer"> Profesores </a>
            </li>
            <li class="menu-elem_Footer">
                <a href="Curso.html" class="menu-icon_Footer"> Curso </a>
            </li>
        </ul>
        <p class="text_Footer">@2024 | Todos los derechos reservados</p>`;

    document.getElementById("piedepagina").innerHTML = piedepagina;

    window.openNav = function() {
        document.getElementById("mobile-menu").style.width = "100%";
    };

    window.closeNav = function() {
        document.getElementById("mobile-menu").style.width = "0%";
    };

    window.cerrarSesion = function() {
        console.log('Attempting to log out');
        console.log('Current token:', sessionStorage.getItem("token"));
        sessionStorage.removeItem("token");
        window.location.href ="login.html"
        console.log('Token after removal:', sessionStorage.getItem("token"));
    };
});
