import { useState } from 'react';
import '../css/Contacto.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            alert('Mensaje enviado a', formData.email);
            await axios.patch(`http://localhost:8080/contacto/${formData.email}`);
            Swal.fire({
                title: "¡Datos Enviados!",
                text: `Sus datos los recibimos exitosamente, y le hemos enviado una confirmación al correo electrónico: ${formData.email}`,
                icon: "success",
                confirmButtonText: "Aceptar"
            });
            setFormData({ nombre: '', email: '', mensaje: '' });
        } catch (err) {
            Swal.fire({
                title: "¡Alerta!",
                text: `Su datos no pudieron ser enviados: ${err.message}`,
                icon: "error",
                confirmButtonText: "Intentar de nuevo"
            });
        }
    };

    return (
        <div className="contacto-container">
            <h2>Contacto</h2>
            <form onSubmit={handleSubmit} className="contacto-form">
                <div className="form-group">
                    <label >Nombre:</label>
                    <input
                        className='nombre'
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mensaje:</label>
                    <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="contacto-btn">Enviar</button>
            </form>
        </div>
    );
};

export default Contacto;
