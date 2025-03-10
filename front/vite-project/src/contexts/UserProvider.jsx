import axios from 'axios';
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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
      Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción cancelará tu turno y no se podrá revertir.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, cancelar",
          cancelButtonText: "No, mantener",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6"
      }).then(async (result) => {
          if (result.isConfirmed) {
              await axios.put(`http://localhost:8080/turns/${id}`)
                  .then(res => {
                      setUsuario(prevUsuario => {
                          // Crear una copia del array de citas
                          const updatedAppointments = prevUsuario.appointments.map(turno =>
                              turno.appointment === id
                                  ? { ...turno, appointmentStatus: "cancelled" }  // Modificar el turno específico
                                  : turno
                          );
  
                          return { ...prevUsuario, appointments: updatedAppointments };
                      });
  
                      // Mostrar confirmación de cancelación
                      Swal.fire({
                          title: "Turno cancelado",
                          text: "Tu turno ha sido cancelado exitosamente.",
                          icon: "success",
                          confirmButtonText: "OK"
                      });
                  })
                  .catch(err => {
                      console.log(err);
                      Swal.fire({
                          title: "Error",
                          text: "Hubo un problema al cancelar el turno.",
                          icon: "error",
                          confirmButtonText: "Cerrar"
                      });
                  });
          }
      });
  };

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