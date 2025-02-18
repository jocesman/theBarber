import { useState } from 'react';
import '../css/Contacto.css';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado con éxito');
        setFormData({ nombre: '', email: '', mensaje: '' });
    };

    return (
        <div className="contacto-container">
            <h2>Contacto</h2>
            <form onSubmit={handleSubmit} className="contacto-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
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
