import '../../css/RegForm.css';
import RodilloBarberia from '../../Images/RodilloBarberia.png';
import { useFormik } from 'formik';
import Schema from './Schema';
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

const RegForm = () => {

  const {handleSubmit, handleChange, errors, handleReset, values, handleCancel} = useFormik({   
    initialValues: {
        name:'',
        lastname:'',
        phone:'',
        email: '',
        id:'',
        address:'',
        city:'',
        birthDate: '',
        password: '',
        confirmPassword: ''
    },
    onSubmit: createUser,
    validationSchema: Schema
});

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset} className="reg-form">
        <div className="form-header">
            <img src={RodilloBarberia} alt="Imagen The Barber"/>
          <h2>Registro Nuevo Usuario</h2>
        </div>
        <div className="form-body">
          <div className="form-group">
            <label htmlFor="name">Nombres del Usuario</label>
            <input 
              type="text" 
              id="name"
              placeholder="Nombres del Usuario"
              value={values.name}
              onChange={handleChange}
              name="name" 
            />
          </div>
          {errors.name && <p className='errorMessage'>{errors.name}</p>}
        
          <div className="form-group">
            <label htmlFor="lastName">Apellidos del Usuario</label>
            <input 
              type="text" 
              id="lastName"
              placeholder="Apellidos del Usuario" 
              value={values.lastname}
              onChange={handleChange}
              name="lastname" 
            />
          </div>
          {errors.lastname && <p className='errorMessage'>{errors.lastname}</p>}
        
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input 
              type="tel" 
              id="phone"
              placeholder="Teléfono" 
              value={values.phone}
              onChange={handleChange}
              name="phone" 
            />
          </div>
          {errors.phone && <p className='errorMessage'>{errors.phone}</p>}
        
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="Email" 
              value={values.email}
              onChange={handleChange}
              name="email" 
            />
          </div>
          {errors.email && <p className='errorMessage'>{errors.email}</p>}
        
          <div className="form-group">
            <label htmlFor="birthDate">Fecha de Nacimiento</label>
            <input 
              type="date" 
              id="birthDate"
              name="birthDate"
              onChange={handleChange} 
            />
          </div>
          {errors.birthDate && <p className='errorMessage'>{errors.birthDate}</p>}
          
          <div className="form-group">
            <label htmlFor="id">Identificación</label>
            <input 
              type="text" 
              id="id"
              placeholder="Número de Identificación" 
              value={values.id}
              onChange={handleChange}
              name="id" 
            />
          </div>
          {errors.id && <p className='errorMessage'>{errors.id}</p>}
        
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input 
              type="text" 
              id="address"
              placeholder="Dirección"
              value={values.address}
              onChange={handleChange}
              name="address" 
            />
          </div>
          {errors.address && <p className='errorMessage'>{errors.address}</p>}

          <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <input 
              type="text" 
              id="city"
              placeholder="Ciudad" 
              value={values.city}
              onChange={handleChange}
              name="city" 
            />
          </div>
          {errors.city && <p className='errorMessage'>{errors.city}</p>}

          <hr className="form-divider" />
          <h6>Creación de Password</h6>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password"
              placeholder="Contraseña" 
              value={values.password}
              onChange={handleChange}
              name="password" 
            />
          </div>
          {errors.password && <p className='errorMessage'>{errors.password}</p>}

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input 
              type="password" 
              id="confirmPassword"
              placeholder="Confirmar Contraseña" 
              value={values.confirmPassword}
              onChange={handleChange}
              name="confirmPassword" 
            />
          </div>
        </div>
        {errors.confirmPassword && <p className='errorMessage'>{errors.confirmPassword}</p>}

        <div className="form-footer">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Hacer Registro
          </button>
          <button type="reset" className="btn btn-secondary" onClick={handleReset}>
            Limpiar Formulario
          </button>
          <button type="s" className="btn btn-cancel" onClick={handleCancel}>
            Cancelar Registro
          </button>
        </div>

      </form>
    </div>
  );
};

export default RegForm;