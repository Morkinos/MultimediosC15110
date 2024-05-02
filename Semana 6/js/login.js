console.log("Archivo JS cargado correctamente");
const input = document.getElementById(loginpass);
const  iconEye = document.getElementById(loginEye);
 

const showHiddenPass =(loginpass, loginEye) => {
    const input = document.getElementById(loginpass);
    const  iconEye = document.getElementById(loginEye);
 
    iconEye.addEventListener('click',() => {
        console.log('Se hizo clic en el icono de ojo'); 
        //cambiamos la contrase;a a tipo texto
        if(input.type ==='password'){
            //cambiamos 
            input.type = 'text';
            console.log(input.type)

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

showHiddenPass('loginpass','logineye')
console.log(iconEye)
console.log(input)