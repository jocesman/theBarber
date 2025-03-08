import axios from 'axios';
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    
    const [usuario, setUsuario] = useState([]);
    const navigate = useNavigate();
    
    const getUser = async (phone) => {
        await axios.get(`http://localhost:8080/users/${phone}`)
        .then(res => setUsuario(res.data))
        .catch(err => console.log(err));
    
        console.log(usuario);
        console.log(usuario.userName);
    }

    const createAppointment = async (phone) => {
        await axios.post(`http://localhost:8080/appointments`, appointment)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    const modifyAppointment = async (phone) => {
        await axios.patch(`http://localhost:8080/appointments/${appointment.id}`, appointment)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    const logout = () => {
        setUsuario([]);
        navigate('/');
      }
        

  return (
    <UserContext.Provider value={{ 
        usuario, 
        setUsuario, 
        getUser,
        createAppointment,
        modifyAppointment,
        logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;