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
    }

    const createAppointment = async (phone,fecha,hora) => {
        const appointment = {
            appointmentUserPhone: phone,
            appointmentDate: new Date(fecha),
            appointmentTime: new Date(fecha + ' ' + hora),
            appointmentStatus: 'active'
        };
        await axios.post(`http://localhost:8080/turns/${phone}`, appointment)
        .then(res => usuario.appointments.push(res.data))
        .catch(err => console.log(err));
    }

    const modifyAppointment = async (id) => {
      await axios.put(`http://localhost:8080/turns/${id}`)
      .then(res => res.data)
      console.log('este es el turno modificado', id)
      .catch(err => console.log(err));


        // await axios.patch(`http://localhost:8080/appointments/${appointment.id}`, appointment)
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err));
    }

    const logout = () => {
        setUsuario([]);
        navigate('/login');
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