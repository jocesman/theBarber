import '../../css/AuthForm.css';
import TheBarber from "../../Images/TheBarber.png"
import Schema from './Schema'
import { useFormik } from 'formik';
import validarUsuario  from './ValidarUsuario';
import { Link, useNavigate } from "react-router-dom";

const AuthForm = () => {

  const navigate = useNavigate();

  const {handleSubmit, handleChange, errors, values} = useFormik({
    initialValues: {
        phone: '',
        password: ''
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      const isValid = await validarUsuario(values);
      if (isValid) {
        navigate('/turnos');
      }
    }
  });

  return (
    <div className="container">
      {/* Modal superpuesto */}
      <div className="modal">
        {/* Logo a la izquierda (o arriba en móviles) */}
        <div className="containerLogo">
          <img src={TheBarber} alt="Logo The Barber" />
        </div>

        {/* Formulario a la derecha (o abajo en móviles) */}
        <div className="authWrapper">
          {/* Formulario de Inicio de Sesión */}
          <div>
            <h3 className='titleIniciarSesion'>Iniciar Sesión</h3>
            <form onSubmit={handleSubmit} className="reg-form">
              <input 
              type="text" 
              placeholder="Ingrese número de teléfono registrado"
              value={values.phone}
              onChange={handleChange}
              name="phone"
              />
              {errors.phone && <p className='errorMessage'>{errors.phone}</p>}
              <input 
              type="password" 
              placeholder="Ingrese su contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              />
              {errors.password && <p className='errorMessage'>{errors.password}</p>}
              <button type="submit" className='button'>Iniciar Sesión</button>
            </form>
            <div className="linksQueHacer">
              <label><Link to="/RecuperarContrasena" className='link'>Recuperar contraseña</Link></label>
              <label><Link to="/CrearCuenta" className='link'>Crear cuenta nueva</Link></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

