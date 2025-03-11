import { AppDataSource } from "../config/data-source";
import { Users } from "../entities/Users";
import UserRepository from "../repositories/UserRepositry";
import nodemailer from "nodemailer";


const envioConfirmacion = async (email: string): Promise<void> => {
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
            subject: "Saludos, ¡tu cuenta ha sido creada!",
            html: `<p>¡Bienvenido a The Barber estimado cliente! 💈</p><br>

            <p>En The Barber, cada corte es una obra de arte y cada cliente es un lienzo en blanco listo para ser transformado.</p>
            
            No somos solo una barbería; somos un espacio donde la tradición y la modernidad se fusionan para crear estilos que reflejan tu personalidad. Desde cortes clásicos hasta tendencias vanguardistas, aquí encontrarás un equipo de barberos apasionados, listos para ofrecerte la mejor versión de ti mismo.</p><br/>

            <p>Tu tiempo es valioso y estamos aquí para que lo aproveches al máximo.</p>
            <p>Agenda tus turnos desde nuestra aplicación web de forma rápida y cómoda, y disfruta de nuestros servicios de <strong>Lunes a Sábados de 8:00 a 18:00</strong>.</p><br>

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

export const createtUserService = async (userData: Users): Promise<Users> => { 
    const user:Users = await UserRepository.create(userData);
    await UserRepository.save(user);
    await envioConfirmacion(user.userEmail);
    return user;
};


export const getUserService = async(): Promise<Users[]> => {
    const users: Users[] = await AppDataSource.getRepository(Users).find({
        relations: ["accessControl", "appointments"]
    })
    return users;
 };

 export const getUserByPhoneService = async(phone: string): Promise<Users | null> => {
    const user: Users | null = await AppDataSource.getRepository(Users).findOne({ 
        where: { userPhone: phone }, 
        relations: {
            accessControl: true,
            appointments: true
        }
    });
    if (!user) return null;
    else return user;
 };
    
export const deleteUserService = async(phone: string) => {
    return await AppDataSource.getRepository(Users).delete({ userPhone: phone });
};

export const modifyUserService = async(phone: string, userData: Users): Promise<Users | null> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        let user = await queryRunner.manager.findOne(Users, { where: { userPhone: phone } });
        if (!user) {
            throw new Error("No se encontró ningún usuario con ese número de teléfono");
        } else {
            userData.userPhone = phone;
            await queryRunner.manager.update(Users, {userPhone: phone},userData);
            user = await queryRunner.manager.findOne(Users, { where: { userPhone: phone } });
            await queryRunner.commitTransaction();
            return user;
        }    
    } catch (error) {
        await queryRunner.rollbackTransaction();
        return null;
    } finally {
        await queryRunner.release();
    }
};
