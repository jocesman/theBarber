import { useState } from "react";
import "../css/AuthForm.css";

const AuthForm = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isRegister ? "Registrarse" : "Ingresar"}</button>
            </form>
            <p onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </p>
        </div>
    );
};

export default AuthForm;
