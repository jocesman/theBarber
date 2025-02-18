import CajaAppointments from '../components/CajaAppointments';
import Turnos from '../helpers/Turnos';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {

  // const [turnos, setTurnos] = useState(Turnos || []);
  const [turno, setTurno] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8080/turns')
    .then(res => res.json())
    .then(res => setTurno(res.data))
    .catch(err => console.log(err));
  }, []);

  console.log('>>>>>>>>>>>>>>>>>>', turno);

  return (
    <>
      <h2>Listado de tus turnos</h2>
      <div>
      {
        turno.map((turno, index) => (
          <CajaAppointments key={turno.appointment||index} turno={turno} /> 
      ))
      
      }
      </div>
    </>
  )
}

export default Appointments;