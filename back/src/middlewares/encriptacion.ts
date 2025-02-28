export const encriptar = (password:string, desplazamiento = 3) => {
    let encriptado = "";
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i);
        
        // Manejo de letras mayúsculas
        if (charCode >= 65 && charCode <= 90) {
            const nuevaPosicion = (charCode - 65 + desplazamiento) % 26 + 65;
            encriptado += String.fromCharCode(nuevaPosicion);
        }
        // Manejo de letras minúsculas
        else if (charCode >= 97 && charCode <= 122) {
            const nuevaPosicion = (charCode - 97 + desplazamiento) % 26 + 97;
            encriptado += String.fromCharCode(nuevaPosicion);
        }
        // Manejo de números y otros caracteres
        else {
            encriptado += password[i];
        }
    }
    return encriptado;
}

export const desencriptar = (password:string, desplazamiento = 3) => {
    let desencriptado = "";
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i);
        
        // Manejo de letras mayúsculas
        if (charCode >= 65 && charCode <= 90) {
            const nuevaPosicion = (charCode - 65 - desplazamiento + 26) % 26 + 65;
            desencriptado += String.fromCharCode(nuevaPosicion);
        }
        // Manejo de letras minúsculas
        else if (charCode >= 97 && charCode <= 122) {
            const nuevaPosicion = (charCode - 97 - desplazamiento + 26) % 26 + 97;
            desencriptado += String.fromCharCode(nuevaPosicion);
        }
        // Manejo de números y otros caracteres
        else {
            desencriptado += password[i];
        }
    }
    return desencriptado;
}