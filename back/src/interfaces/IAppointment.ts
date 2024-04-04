enum AppointmentStatus {
    Active = "active",
    Cancelled = "cancelled"
  }
  
interface IAppoimtment {
    id: number,
    date: Date,
    time: Date,
    userId: number,
    status: AppointmentStatus
}

export default IAppoimtment;

/*

Appointment:

id: ID numérico que identifica al turno.

date: fecha para la cual fue reservado el turno.

time: hora para la cual fue reservado el turno.

userId: ID del usuario que agendó el turno, referencia al usuario

status: status actual del turno, que puede ser “active” o “cancelled”.*/

