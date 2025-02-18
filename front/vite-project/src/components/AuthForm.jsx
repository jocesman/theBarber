import { useState } from "react";
import "../css/AuthForm.css";
import { validate } from "../helpers/Validate";


const AuthForm = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ 
        email: "", 
        password: "" 
    });

    const [errors, setErrors] = useState({
        email: "Email is required",
        password: "Password is required"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        setErrors(validate(formData));

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`${isRegister ? "Registro" : "Inicio de sesión"} exitoso`);
        onLogin(); // Función para redirigir tras el login
    };

    return (
        <div className="auth-container">
            <h2>{isRegister ? "Registro" : "Iniciar Sesión"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p style={{color:"red"}} className="error">{errors.email}</p>}
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <p style={{color:"red"}} className="error">{errors.password}</p>}
                <button type="submit">{isRegister ? "Registrarse" : "Ingresar"}</button>
            </form>
            <p onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </p>
        </div>
    );
};

export default AuthForm;
