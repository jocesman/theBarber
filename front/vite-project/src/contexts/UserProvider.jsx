import axios from 'axios';
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    
    // Cargar usuario desde localStorage si existe
    const [usuario, setUsuario] = useState(() => {
        const storedUser = localStorage.getItem("usuario");
        return storedUser ? JSON.parse(storedUser) : {}; // Asegurar que sea un objeto
    });

    const navigate = useNavigate();

    // Guardar usuario en localStorage cuando cambia
    useEffect(() => {
        if (usuario && Object.keys(usuario).length > 0) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
        } else {
            localStorage.removeItem("usuario");
        }
    }, [usuario]);

    const organizarAppointments = (turnos) => {
        const activos = turnos
            .filter(turno => turno.appointmentStatus === 'active')
            .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    
        const cancelados = turnos
            .filter(turno => turno.appointmentStatus === 'cancelled')
            .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    
        return [...activos, ...cancelados];
    };

    // Obtener usuario por teléfono
    const getUser = async (phone) => {
        try {
            const res = await axios.get(`http://localhost:8080/users/${phone}`);
            const usuarioConTurnosOrganizados = {
                ...res.data,
                appointments: organizarAppointments(res.data.appointments)
            };
            setUsuario(usuarioConTurnosOrganizados);
        } catch (err) {
            console.error(err);
        }
        
    };

    // Crear cita
    const createAppointment = async (phone, fecha, hora) => {
        try {
            const appointment = {
                appointmentUserPhone: phone,
                appointmentDate: `${fecha}T12:00:00`,
                // appointmentDate: new Date(fecha),
                appointmentTime: new Date(`${fecha} ${hora}`),
                appointmentStatus: 'active'
            };

            const res = await axios.post(`http://localhost:8080/turns/${phone}`, appointment);

            // Actualizar estado de usuario correctamente
            setUsuario(prevUsuario => ({
                ...prevUsuario,
                appointments: [...(prevUsuario.appointments || []), res.data] // Evita errores si appointments es undefined
            }));

            // Mostrar alerta de confirmación
            Swal.fire({
                title: "Turno agendado",
                text: `Tu turno ha sido agendado para el ${fecha} a las ${hora} y se ha creado.`,
                icon: "success",
                confirmButtonText: "OK"
            });

        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al agendar el turno.",
                icon: "error",
                confirmButtonText: "Cerrar"
            });
        }
    };

    // Modificar estado de una cita
    const modifyAppointment = async (id) => {
        const turno = usuario.appointments.find(t => t.appointment === id);
        if (!turno) {
            Swal.fire({
                title: "Error",
                text: "No se encontró el turno.",
                icon: "error",
                confirmButtonText: "Cerrar"
            });
            return;
        }
        const futureDate = new Date(turno.appointmentTime); // Fecha futura
const now = new Date(); // Fecha actual

const diffInMilliseconds = futureDate - now; // Diferencia en milisegundos
const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Convertir a horas

console.log(`Faltan ${diffInHours.toFixed(2)} horas hasta la fecha futura.`);

    // Verificar si ya pasó la hora límite para cancelar la cita
    if (diffInHours <= 24) {
        Swal.fire({
            title: "Cancelación no permitida",
            text: "Solo puedes cancelar un turno hasta el día anterior a la cita.",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }

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
                try {
                    await axios.put(`http://localhost:8080/turns/${id}`);

                    // Actualizar estado de usuario correctamente
                    setUsuario(prevUsuario => ({
                        ...prevUsuario,
                        appointments: prevUsuario.appointments.map(turno =>
                            turno.appointment === id
                                ? { ...turno, appointmentStatus: "cancelled" }
                                : turno
                        )
                    }));

                    // Mostrar confirmación de cancelación
                    Swal.fire({
                        title: "Turno cancelado",
                        text: "Tu turno ha sido cancelado exitosamente.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });

                } catch (err) {
                    console.error(err);
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al cancelar el turno.",
                        icon: "error",
                        confirmButtonText: "Cerrar"
                    });
                }
            }
        });
    };

    // Cerrar sesión
    const logout = () => {
        setUsuario({});
        localStorage.removeItem("usuario");
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ 
            usuario, 
            setUsuario, 
            getUser,
            createAppointment,
            modifyAppointment,
            logout 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;







// import axios from 'axios';
// import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// export const UserContext = createContext(null);

// const UserProvider = ({ children }) => {
    
//     const [usuario, setUsuario] = useState([]);
//     const navigate = useNavigate();
    
//     const getUser = async (phone) => {
//         await axios.get(`http://localhost:8080/users/${phone}`)
//         .then(res => setUsuario(res.data))
//         .catch(err => console.log(err));
//     }

//     const createAppointment = async (phone,fecha,hora) => {
//         const appointment = {
//             appointmentUserPhone: phone,
//             appointmentDate: new Date(fecha),
//             appointmentTime: new Date(fecha + ' ' + hora),
//             appointmentStatus: 'active'
//         };
//         await axios.post(`http://localhost:8080/turns/${phone}`, appointment)
//         .then(res => usuario.appointments.push(res.data))
//         .catch(err => console.log(err));
//     }

//     const modifyAppointment = async (id) => {
//       Swal.fire({
//           title: "¿Estás seguro?",
//           text: "Esta acción cancelará tu turno y no se podrá revertir.",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonText: "Sí, cancelar",
//           cancelButtonText: "No, mantener",
//           confirmButtonColor: "#d33",
//           cancelButtonColor: "#3085d6"
//       }).then(async (result) => {
//           if (result.isConfirmed) {
//               await axios.put(`http://localhost:8080/turns/${id}`)
//                   .then(res => {
//                       setUsuario(prevUsuario => {
//                           // Crear una copia del array de citas
//                           const updatedAppointments = prevUsuario.appointments.map(turno =>
//                               turno.appointment === id
//                                   ? { ...turno, appointmentStatus: "cancelled" }  // Modificar el turno específico
//                                   : turno
//                           );
  
//                           return { ...prevUsuario, appointments: updatedAppointments };
//                       });
  
//                       // Mostrar confirmación de cancelación
//                       Swal.fire({
//                           title: "Turno cancelado",
//                           text: "Tu turno ha sido cancelado exitosamente.",
//                           icon: "success",
//                           confirmButtonText: "OK"
//                       });
//                   })
//                   .catch(err => {
//                       console.log(err);
//                       Swal.fire({
//                           title: "Error",
//                           text: "Hubo un problema al cancelar el turno.",
//                           icon: "error",
//                           confirmButtonText: "Cerrar"
//                       });
//                   });
//           }
//       });
//   };

//     const logout = () => {
//         setUsuario([]);
//         navigate('/login');
//       }
        

//   return (
//     <UserContext.Provider value={{ 
//         usuario, 
//         setUsuario, 
//         getUser,
//         createAppointment,
//         modifyAppointment,
//         logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;