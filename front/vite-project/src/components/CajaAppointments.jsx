import "../css/CajaAppointments.css";

const CajaAppointments = ({ turno }) => {
    const {
        id,
        appointment,
        appointmentUserPhone,
        appointmentDate,
        appointmentTime,
        appointmentStatus
    } = turno;

    return (
        <div className="appointment-card">
            <h5>Turno: {appointment}</h5>
            <h5>ID: {id}</h5>
            <h6>Teléfono: {appointmentUserPhone}</h6>
            <h6>Fecha: {appointmentDate}</h6>
            <h6>Hora: {appointmentTime}</h6>
            <h6>Estado: {appointmentStatus}</h6>
            <button className="cancel-button">Cancelar</button>
        </div>
    );
}

export default CajaAppointments;
