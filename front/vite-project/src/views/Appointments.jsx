import CajaAppointments from '../components/CajaAppointments.jsx';
import '../css/Appointments.css';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserProvider';
import Swal from 'sweetalert2';

const Appointments = () => {
  const { usuario, createAppointment } = useContext(UserContext);
  const userTurnos = usuario.appointments;

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarBotonCrear, setMostrarBotonCrear] = useState(true);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState ('');

  const toggleFormulario = () => {
    setMostrarBotonCrear(!mostrarBotonCrear);
    setMostrarFormulario(!mostrarFormulario);
    setFecha('');
    setHora('');
  }
  
  const manejarCancelar = () => {
    setMostrarFormulario(false);
    setMostrarBotonCrear(true);
    setFecha('');
    setHora('');
  };

  const obtenerFechaMinima = () => {
    const hoy = new Date().toISOString().split('T')[0];
    return hoy;
  };

  const obtenerFechaMaxima = () => {
    const hoy = new Date();
    hoy.setMonth(hoy.getMonth() + 1);
    return hoy.toISOString().split('T')[0];
  };

  const horasDisponibles = [];
  for (let i = 8; i <= 18; i++) {
    horasDisponibles.push(`${i.toString().padStart(2, "0")}:00`);
  }

  const manejarCambioHora = (e) => {
    setHora(e.target.value);
  };

  const agendarTurno = async () => {
    const phone = usuario.userPhone;
    await createAppointment (phone, fecha, hora);
    Swal.fire({
      title: "Turno Agendado",
      text: `Tu turno ha sido agendado para el ${fecha} a las ${hora}`,
      icon: "success",
      confirmButtonText: "OK"
    });
    toggleFormulario();
  };

  return (
    <div className='containerAppointments'>
      <div className='h2button'>
        <h2>Listado de tus turnos</h2>
        {mostrarBotonCrear && <button className='crear' onClick={toggleFormulario}>Crear nuevo turno</button>}
      </div>
      
      {mostrarFormulario && (
        <div className='crearTurno'>
          <div>
            <h3>Agenda de Nuevo Turno</h3>
          </div>
          <div>

          <h4>Fecha:</h4>
          <input 
            type='date' 
            value={fecha} 
            className='inputFecha'
            onChange={(e) => setFecha(e.target.value)} 
            min={obtenerFechaMinima()} 
            max={obtenerFechaMaxima()} 
          />
          </div>
          <div className="form-group">
          </div>
            <h4>Hora</h4>
            <select
              value={hora}
              onChange={manejarCambioHora}
              className="inputHora"
            >
              <option value="">Selecciona una hora</option>
              {horasDisponibles.map((h, index) => (
                <option key={index} value={h}>{h}</option>
              ))}
            </select>
            <div className='botonesCrearTurno'>
              <button 
              className='btnCT Agendar' 
              onClick={agendarTurno}
              disabled={!fecha || !hora} // Verifica que ambos valores estén llenos
              >Agendar</button>
              <button className='btnCT CancelarCT' onClick={manejarCancelar}>Cancelar</button>
            </div>
          </div>
      )}
      
      <div className='turnos-flex'>
        {userTurnos.map((turno) => (
          <CajaAppointments key={turno.appointment} turno={turno} />
        ))}
      </div>
    </div>
  );
}

export default Appointments;


// import CajaAppointments from '../components/CajaAppointments.jsx';
// import '../css/Appointments.css';
// import { useContext } from 'react';
// import { UserContext } from '../contexts/UserProvider';

// const Appointments = () => {

//   const { usuario } = useContext(UserContext);
//   const userTurnos = usuario.appointments;

//   return (
//     <div className='containerAppointments'>
//       <div className='h2button'>
//         <h2>Listado de tus turnos</h2>
//         <button className='crear'>Crear nuevo turno</button>
//       </div>
//       <div className='crearTurno'>

//         </div>
//       <div className='turnos-grid'>
//         {
//         userTurnos.map((turno) => (
//            <CajaAppointments key={turno.appointment} turno={turno} />
//            ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Appointments;




// import CajaAppointments from '../components/CajaAppointments';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const Appointments = () => {

//   // const [turnos, setTurnos] = useState(Turnos || []);
//   const [turno, setTurno] = useState([]);


//   useEffect(() => {
//     axios.get('http://localhost:8080/turns')
//     // .then(res => res.json())
//     .then(res => setTurno(res.data))
//     // .catch(err => console.log(err));
//   }, []);

//   return (
//     <>
//       <h2>Listado de tus turnos</h2>
//       <div>
//       {
//         turno.map((turno) => (
//           <CajaAppointments key={turno.appointment} turno={turno} />
//       ))
      
//       }
//       </div>
//     </>
//   )
// }

// export default Appointments;