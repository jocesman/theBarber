import '../../css/RecuperarPass.css';
import TheBarber from "../../Images/TheBarber.png"
import { useFormik } from 'formik';
import axios from 'axios';
import Schema from './Schema'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RecuperarPass = () => {

  const navigate = useNavigate();

  const validarUsuario = async (values) => {
    const { phone } = values;
    try {
      const res = await axios.get(`http://localhost:8080/users/${phone}`);
      if (res.data) {
        
        const { userEmail, accessControl }= res.data;
        console.log(res.data);
        Swal.fire({
          title: "¡Datos Recuperados!",
          text: "Su correo electrónico es: " + userEmail + " y su contraseña es: " + accessControl,
          icon: "success",
          confirmButtonText: "Aceptar"
        });

      }
    } catch (err) {
      alert('Error al recuperar contraseña');
    }
  }

  const {handleSubmit, handleChange, errors, values} = useFormik({
    initialValues: {
        phone: '',
    },
    onSubmit: validarUsuario,
    validationSchema: Schema
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
          
          {/* Formulario de Recuperación de Contraseña */}
          <div className="containerRecuperarPass">
            <h3>Recuperar contraseña</h3>
            <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Ingrese su número de teléfono" 
                  value={values.phone}
                  onChange={handleChange}
                  name="phone"
                />
                {errors.phone && <p className='errorMessage'>{errors.phone}</p>}
                <button className='button' type="submit" >Recuperar</button>
                <button className='button' type="button" onClick = {() => navigate('/')}>Cancelar</button>
                </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPass;


