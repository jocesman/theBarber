import { AppDataSource } from "../config/data-source";
import { Appointments } from "../entities/Appointments";
import { Users } from "../entities/Users";
import { appointment1 } from "../helpers/appointmetLoadData";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepositry";
import nodemailer from "nodemailer";

const envioConfirmacion = async (email: string, fecha:Date, hora:Date): Promise<void> => {
    fecha = new Date(fecha);
    hora = new Date(hora);

    const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "theb20139@gmail.com",  
                pass: "audy ywby yzvs hdbu"  
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        // 6. Configurar el contenido del email
        const mailOptions = {
            from: '"Soporte Técnico" <The Barber>',
            to: email,
            subject: "Confirmación de turno agendado",
            html: `<p>¡Enhorabuena! 🎉</p>
            <p style="font-size: 18px; color: blue;">Tu turno ha sido agendado para el ${fecha.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })} a las ${hora.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false // Para obtener formato 24 horas
              })}</p>
                        
            <p>Recuerda que el turno puedes cancelarlo en cualquier momento, solo hasta 24 horas antes, por lo que no te olvides de revisar tu calendario.</p>
            
            <p>¿Tienes alguna pregunta o necesitas ayuda? No dudes en ponerte en contacto con nosotros a través de nuestro formulario de contacto.</p><br>

            <p>¡Nos vemos pronto para que luzcas increíble! ✂️🔥</p>

            <p>Atentamente,</p>
            <p>El equipo de The Barber</p>
            <p>Saludos cordiales,</p>`
        };
    
        // 7. Enviar el email
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email enviado con éxito a:', email);
        } catch (error) {
            console.error('Error al enviar el email:', error);
        }
    };


export const createtAppointmentService = async (phone: string, appointmentData: Appointments): Promise<Appointments | string> => {

    const user = await UserRepository.findOne({ 
        where: { userPhone : phone } });
    if (user) {
        const appointment = await AppointmentRepository.create(appointmentData);
        appointment.user = user;
        await AppointmentRepository.save(appointment);
        await envioConfirmacion(user.userEmail, appointment.appointmentDate, appointment.appointmentTime);
        return appointment;
      };
    return "No se encontró ningún usuario con ese número de teléfono";
};

export const getAppointmentService = async(): Promise<Appointments[]> => {
    const appointment = await AppointmentRepository.find(
        {
            relations: ["user"]
        }
    );
    return appointment;
};

export const getAppointmentbyPhoneService = async(phone: string): Promise<Appointments | null> => {
    const appointment = await AppointmentRepository.findOne(
        { 
            where: { appointmentUserPhone: phone },
            relations: ["user"]
        });
    return appointment;
};

export const deleteAppointmentService = async(phone: string): Promise<any> => {
    return await AppointmentRepository.delete({ appointmentUserPhone: phone });
};

const envioCancelacion = async (email: string, fecha:Date, hora:Date): Promise<void> => {
    fecha = new Date(fecha);
    hora = new Date(hora);

    const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "theb20139@gmail.com",  
                pass: "audy ywby yzvs hdbu"  
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        // 6. Configurar el contenido del email
        const mailOptions = {
            from: '"Soporte Técnico" <The Barber>',
            to: email,
            subject: "Confirmación de turno CANCELADO", 
            html: `<p>¡AVISO DE CANCELADO! 🚨</p>
            <p style="font-size: 18px; color: red; font-style: italic;">Tu turno ha sido CANCELADO, estaba agendado para el ${fecha.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })} a las ${hora.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false // Para obtener formato 24 horas
              })}</p>
                        
            <p>Recuerda que puedes tomar otro turno en cualquier momento, por lo que no te olvides de revisar tu calendario.</p>
            
            <p>¿Tienes alguna pregunta o necesitas ayuda? No dudes en ponerte en contacto con nosotros a través de nuestro formulario de contacto.</p><br>

            <p>¡Nos vemos pronto ✂️🔥</p>

            <p>Atentamente,</p>
            <p>El equipo de The Barber</p>
            <p>Saludos cordiales,</p>`
        };
    
        // 7. Enviar el email
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email enviado con éxito a:', email);
        } catch (error) {
            console.error('Error al enviar el email:', error);
        }
    };



export const modifyAppointmentService = async(id: string): Promise<Appointments | null> => {
    let appointments= await AppointmentRepository.findOneBy({ appointment: parseInt(id)  });
    if (!appointments) return null;
    appointments.appointmentStatus = 'cancelled';
    await AppointmentRepository.merge(appointments);
    appointments = await AppointmentRepository.save(appointments);
    const user:Users | null = await UserRepository.findOne({
        where: { userPhone: appointments.appointmentUserPhone },
    });
    if (!user) return null;
    await envioCancelacion(user?.userEmail, appointments.appointmentDate, appointments.appointmentTime);
    return appointments;
};

