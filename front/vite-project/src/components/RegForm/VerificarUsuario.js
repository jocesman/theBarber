import axios from 'axios';
import Swal from 'sweetalert2';

const verificarUser = async (phone, email) =>{
    try {
      const usuarios = await axios.get(`http://localhost:8080/users`);
      const existePhone = usuarios.data.find(usuario => usuario.userPhone === phone);
      const existeEmail = usuarios.data.find(usuario => usuario.userEmail === email);
      if (existePhone || existeEmail)  return true;
      else  return false;
    } catch (error) {
          Swal.fire({
            title: "¡Alerta!",
            text: "Error al verificar el usuario",
            icon: "error",
            confirmButtonText: "Intentar de nuevo"
          })
          return false;
    }
  }

  export default verificarUser;