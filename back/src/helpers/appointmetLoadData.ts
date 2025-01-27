import { Appointments } from "../entities/Appointments";
import { Users } from "../entities/Users";

export const appointment1 = new Appointments();
appointment1.appointmentUserPhone ="123456789"
appointment1.appointmentDate = new Date(2025, 0, 28);
appointment1.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment1.appointmentStatus = "active";
appointment1.user = new Users();    
appointment1.user.userPhone = appointment1.appointmentUserPhone;
    
export const appointment2 = new Appointments();
appointment2.appointmentUserPhone ="987654321"
appointment2.appointmentDate = new Date(2025, 0, 28);
appointment2.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment2.appointmentStatus = "cancelled";
appointment2.user = new Users();    
appointment2.user.userPhone = appointment2.appointmentUserPhone;

export const appointment3 = new Appointments();
appointment3.appointmentUserPhone ="1122334455"
appointment3.appointmentDate = new Date(2025, 0, 28);
appointment3.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment3.appointmentStatus = "active";
appointment3.user = new Users();    
appointment3.user.userPhone = appointment3.appointmentUserPhone;

export const appointment4 = new Appointments();
appointment4.appointmentUserPhone ="9988776655"
appointment4.appointmentDate = new Date(2025, 0, 28);
appointment4.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment4.appointmentStatus = "cancelled";
appointment4.user = new Users();    
appointment4.user.userPhone = appointment4.appointmentUserPhone

export const appointment5 = new Appointments();
appointment5.appointmentUserPhone ="2233445566"
appointment5.appointmentDate = new Date(2025, 0, 28);
appointment5.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment5.appointmentStatus = "active";
appointment5.user = new Users();    
appointment5.user.userPhone = appointment5.appointmentUserPhone;

export const appointment6 = new Appointments();
appointment6.appointmentUserPhone ="5566778899"
appointment6.appointmentDate = new Date(2025, 0, 28);
appointment6.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment6.appointmentStatus = "cancelled";
appointment6.user = new Users();    
appointment6.user.userPhone = appointment6.appointmentUserPhone;

export const appointment7 = new Appointments();
appointment7.appointmentUserPhone ="123456789"
appointment7.appointmentDate = new Date(2025, 0, 28);
appointment7.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment7.appointmentStatus = "active";
appointment7.user = new Users();    
appointment7.user.userPhone = appointment7.appointmentUserPhone;

export const appointment8 = new Appointments();
appointment8.appointmentUserPhone ="123456789"
appointment8.appointmentDate = new Date(2025, 0, 28);
appointment8.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment8.appointmentStatus = "cancelled";
appointment8.user = new Users();    
appointment8.user.userPhone = appointment8.appointmentUserPhone;

export const appointment9 = new Appointments();
appointment9.appointmentUserPhone ="5566778899"
appointment9.appointmentDate = new Date(2025, 0, 28);
appointment9.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment9.appointmentStatus = "active";
appointment9.user = new Users();    
appointment9.user.userPhone = appointment9.appointmentUserPhone;

export const appointment10 = new Appointments();
appointment10.appointmentUserPhone ="5566778899"
appointment10.appointmentDate = new Date(2025, 0, 28);
appointment10.appointmentTime= new Date(2025, 0, 28, 11, 30);
appointment10.appointmentStatus = "cancelled";
appointment10.user = new Users();    
appointment10.user.userPhone = appointment10.appointmentUserPhone;
