import { useNavigate } from "react-router-dom";


const logout = () => {
        const navigate = useNavigate();
        console.log('Antes de logout ', usuario);
        setUsuario([]);
        console.log('Despues de logout ', usuario);
        navigate('/');
      }

export default logout;