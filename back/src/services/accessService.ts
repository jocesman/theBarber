import { AppDataSource } from "../config/data-source";
import AccessDto from "../dto/AccessDto";
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
//audy ywby yzvs hdbu


export const recuperarAccessService = async (email: string): Promise<void> => {
    console.log('Estoy en el servicio, email:', email);

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
            user: "theb20139@gmail.com",  // 📌 Reemplaza con tu email
            pass: "audy ywby yzvs hdbu"  // 📌 Usa un "App Password" generado en Gmail
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
               <p>Tu contraseña para poder accesar a la aplicaci{on es la siguiente <strong>${decryptedPassword}</strong>. 
               <p>Si no solicitaste esto, por favor envíanos un correo para cambia tu contraseña inmediatamente.</p>
               <p>Te recomendamos borrar inmediatamente este correo luego de que memorices la contraseña</p>`
    };

    // 7. Enviar el email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado con éxito a:', email);
    } catch (error) {
        console.error('Error al enviar el email:', error);
    }
};
