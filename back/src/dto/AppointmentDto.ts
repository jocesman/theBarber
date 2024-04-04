import { AppointmentStatus } from "../interfaces/IAppointment"

interface AppoimtmentDto {
    date: Date,
    time: Date,
    userId: number,
    status: AppointmentStatus
}

export default AppoimtmentDto;
