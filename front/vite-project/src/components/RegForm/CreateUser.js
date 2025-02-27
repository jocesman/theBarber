import Swal from 'sweetalert2';
import verificarUser from './VerificarUsuario';
import axios from 'axios';

const createUser = async (values) =>{
    const createUserBody = {
    userPhone: values.phone, 
    userName: values.name,
    userLastName: values.lastname,
    userId: values.id,
    userBirthDate: values.birthDate,
    userEmail:  values.email,
    userAddress: values.address,
    userCity: values.city,
    userDateCreated: new Date(),
    userStatus: "Active",
    userTypeUser: "user",
    userPassword: values.password
  }

  if (await verificarUser(values.phone, values.email)) {
      Swal.fire({
        title: "¡Alerta!",
        text: `El número de teléfono ${values.phone} o el correo electrónico (email) ${values.email} que está intentando registrar para el usuario ${values.name} ${values.lastname} -> Ya Existe!`,
        icon: "error",
        confirmButtonText: "Intentar de nuevo"
      })
  } else {
      await axios.post('http://localhost:8080/users', createUserBody)
        .then(
          Swal.fire({
            icon: 'success',
            title: 'Usuario Creado',
            text: `El usuario ${values.name} ${values.lastname} con número de teléfono ${values.phone} y correo electrónico (email) ${values.email} ha sido creado exitosamente`,
            confirmButtonText: 'Aceptar',
          }))
        .catch(err => 
          Swal.fire({
            title: "¡Alerta!",
            text: `El usuario no pudo ser creado ${err.message}`,
            icon: "error",
            confirmButtonText: "Intentar de nuevo",
          })
        );
}}

export default createUser;
