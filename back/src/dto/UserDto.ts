import { AccessControl } from "../entities/AccessControl";

interface UserDto {
    userPhone: string; 
    userName: string;
    userLastName: string;
    userBirthDate: Date;
    userId: string; 
    userEmail: string; 
    userAddress: string; 
    userCity: string; 
    userDateCreated: Date; 
    userStatus: 'active' | 'inactive'; 
    userTypeUser: 'admin' | 'user';
};

export default UserDto;