document.addEventListener("DOMContentLoaded", () => {
    // Obtener elementos del DOM
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const strengthMessage = document.getElementById("strengthMessage");
    const confirmMessage = document.getElementById("confirmMessage");
    const title = document.getElementById("title");
    const infoBox = document.getElementById("infoBox");
    
    // Validar la fortaleza de la contraseña en tiempo real
    password.addEventListener("input", () => {
        const value = password.value;
        let strength = "Débil";
        let color = "red";
        
        // Evaluar fortaleza según longitud y caracteres especiales
        if (value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) {
            strength = "Fuerte";
            color = "green";
        } else if (value.length >= 6) {
            strength = "Media";
            color = "orange";
        }
        
        // Mostrar el mensaje de fortaleza
        strengthMessage.textContent = `Fortaleza: ${strength}`;
        strengthMessage.style.color = color;
    });
    
    // Verificar si las contraseñas coinciden en tiempo real
    confirmPassword.addEventListener("input", () => {
        if (confirmPassword.value === password.value) {
            confirmMessage.textContent = "Las contraseñas coinciden";
            confirmMessage.style.color = "green";
        } else {
            confirmMessage.textContent = "Las contraseñas no coinciden";
            confirmMessage.style.color = "red";
        }
    });
    
    // Cambiar el color del título al pasar el mouse sobre él
    title.addEventListener("mouseover", () => {
        title.style.color = "blue";
    });
    
    // Restaurar el color del título al retirar el mouse
    title.addEventListener("mouseleave", () => {
        title.style.color = "black";
    });
    
    // Mostrar información adicional al enfocar el campo de contraseña
    password.addEventListener("focus", () => {
        infoBox.style.display = "block";
        infoBox.textContent = "Consejo: Usa una combinación de letras, números y símbolos para mayor seguridad.";
    });
    
    // Ocultar la información adicional al salir del campo de contraseña
    password.addEventListener("blur", () => {
        infoBox.style.display = "none";
    });
    
    // Mostrar un mensaje recordatorio después de 5 segundos
    setTimeout(() => {
        alert("Recuerda usar una contraseña segura.");
    }, 5000);
});
