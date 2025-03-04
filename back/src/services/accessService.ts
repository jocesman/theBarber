import { AppDataSource } from "../config/data-source";
import { AccessControl } from "../entities/AccessControl";
import { Users } from "../entities/Users";
import { encriptar } from "../middlewares/encriptacion";
import { desencriptar } from "../middlewares/encriptacion";
import nodemailer from "nodemailer";

export const createtAccessService = async (credentials: AccessControl) => {
    const access = await AppDataSource.getRepository(AccessControl).create(credentials);
    await AppDataSource.getRepository(AccessControl).save(access);

    const user = await AppDataSource.getRepository(Users).findOne({ where: { userPhone: access.accessUserPhone } });
    if (!user){
        return null
    } else {
        user.accessControl = access;
        await AppDataSource.getRepository(Users).save(user);
    };
    return access;
};

export const getAccessService = async (credentials: AccessControl) => {
    const access = await AppDataSource.getRepository(AccessControl).findOne({ where: { accessUserPhone: credentials.accessUserPhone} });
    const pass = encriptar(credentials.accessUserPassword);
    
    if (access?.accessUserPassword === pass)  return true;
    else return false;
};

export const recuperarAccessService = async (email: string): Promise<void> => {

    // 1. Buscar al usuario por email
    const userRec = await AppDataSource.getRepository(Users).findOne({ where: { userEmail: email } });

    if (!userRec) {
        console.log('Usuario no encontrado');
        return;
    }

    // 2. Obtener el teléfono del usuario
    const { userName, userPhone } = userRec;
    
    // 3. Buscar el acceso del usuario por teléfono
    const accessRec = await AppDataSource.getRepository(AccessControl).findOne({ where: { accessUserPhone: userPhone } });

    if (!accessRec) {
        console.log('No se encontró acceso para el usuario');
        return;
    }

    // 4. Desencriptar la contraseña
    const decryptedPassword = desencriptar(accessRec.accessUserPassword);

    // 5. Configurar el transporte de nodemailer
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
        subject: "Recuperación de Contraseña",
        html: `<p>Hola, <strong>${userName}</strong>,</p>
        <p>Tu contraseña para acceder a la aplicación es la siguiente: <strong>${decryptedPassword}</strong>.</p>
        <p>Si no solicitaste este correo, por favor envíanos un mensaje para cambiar tu contraseña de inmediato.</p>
        <p>Te recomendamos memorizar tu contraseña y eliminar este correo electrónico para mantenerla segura.</p>`
    };

    // 7. Enviar el email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado con éxito a:', email);
    } catch (error) {
        console.error('Error al enviar el email:', error);
    }
};

export const contactoUserAccessService = async (email: string): Promise<void> => {

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
        subject: "Usted nos ha escrito desde la página de contacto",
        html: `<p>Hola estimado cliente,</p>
        <p>Le informamos de que su solicitud ha sido recibida y en los próximos días nos pondremos en contacto contigo para darle una respuesta.</p>
        <p>Gracias por su tiempo y atención.</p>
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
