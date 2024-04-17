import userRepository from "../repositories/userRepository";


export const revisarSiExisteUsuario = async (email: string) => {
    const user = await userRepository;
    const userExiste = await user.findOne({where: {email : email}});
    if (userExiste) return true;
}
    