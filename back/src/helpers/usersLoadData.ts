import { Users } from "../entities/Users";
import { AccessControl } from "../entities/AccessControl";
import { encriptar } from "../middlewares/encriptacion";

export const user1 = new Users()
user1.userPhone= "123456789";
user1.userName= "Juan";
user1.userLastName= "Perez";
user1.userBirthDate = new Date(1990, 5, 15);
user1.userId = "123456789";
user1.userEmail = "juanperez@gmail.com";
user1.userAddress = "C/ Juan Perez 123";
user1.userCity = "Ciudad de México";
user1.userDateCreated = new Date();
user1.userStatus = "active";
user1.userTypeUser = "user";

export const accessControl1 = new AccessControl();
accessControl1.accessUserPhone= "123456789";
accessControl1.accessUserPassword= encriptar("123456");
accessControl1.accessLastVisit= new Date();

user1.accessControl = accessControl1;

export const user2 = new Users();
user2.userPhone = "987654321";
user2.userName = "Maria";
user2.userLastName = "Gonzalez";
user2.userBirthDate = new Date(1985, 11, 25);
user2.userId = "987654321";
user2.userEmail = "mariagonzalez@gmail.com";
user2.userAddress = "Av. Siempre Viva 742";
user2.userCity = "Bogotá";
user2.userDateCreated = new Date();
user2.userStatus = "active";
user2.userTypeUser = "admin";

export const accessControl2 = new AccessControl();
accessControl2.accessUserPhone = "987654321";
accessControl2.accessUserPassword = encriptar("contraseña123");
accessControl2.accessLastVisit = new Date();

user2.accessControl = accessControl2;

export const user3 = new Users();
user3.userPhone = "1122334455";
user3.userName = "Carlos";
user3.userLastName = "Ramírez";
user3.userBirthDate = new Date(1992, 3, 10);
user3.userId = "1122334455";
user3.userEmail = "carlosramirez@gmail.com";
user3.userAddress = "Calle Falsa 456";
user3.userCity = "Santiago";
user3.userDateCreated = new Date();
user3.userStatus = "inactive";
user3.userTypeUser = "user";

export const accessControl3 = new AccessControl();
accessControl3.accessUserPhone = "1122334455";
accessControl3.accessUserPassword = encriptar("passw0rd");
accessControl3.accessLastVisit = new Date();

user3.accessControl = accessControl3;

export const user4 = new Users();
user4.userPhone = "9988776655";
user4.userName = "Lucia";
user4.userLastName = "Martínez";
user4.userBirthDate = new Date(1998, 7, 5);
user4.userId = "9988776655";
user4.userEmail = "luciamartinez@gmail.com";
user4.userAddress = "Plaza Mayor 789";
user4.userCity = "Lima";
user4.userDateCreated = new Date();
user4.userStatus = "active";
user4.userTypeUser = "user";

export const accessControl4 = new AccessControl();
accessControl4.accessUserPhone = "9988776655";
accessControl4.accessUserPassword = encriptar("securePass!");
accessControl4.accessLastVisit = new Date();

user4.accessControl = accessControl4;

export const user5 = new Users();
user5.userPhone = "2233445566";
user5.userName = "Pedro";
user5.userLastName = "Lopez";
user5.userBirthDate = new Date(1980, 1, 20);
user5.userId = "2233445566";
user5.userEmail = "pedrolopez@gmail.com";
user5.userAddress = "Av. Las Flores 321";
user5.userCity = "Buenos Aires";
user5.userDateCreated = new Date();
user5.userStatus = "active";
user5.userTypeUser = "user";

export const accessControl5 = new AccessControl();
accessControl5.accessUserPhone = "2233445566";
accessControl5.accessUserPassword = encriptar("abcd1234");
accessControl5.accessLastVisit = new Date();

user5.accessControl = accessControl5;

export const user6 = new Users();
user6.userPhone = "5566778899";
user6.userName = "Ana";
user6.userLastName = "Fernández";
user6.userBirthDate = new Date(1995, 6, 30);
user6.userId = "5566778899";
user6.userEmail = "anafernandez@gmail.com";
user6.userAddress = "Calle Sol 123";
user6.userCity = "Quito";
user6.userDateCreated = new Date();
user6.userStatus = "active";
user6.userTypeUser = "user";

export const accessControl6 = new AccessControl();
accessControl6.accessUserPhone = "5566778899";
accessControl6.accessUserPassword = encriptar("myp4ssword");
accessControl6.accessLastVisit = new Date();

user6.accessControl = accessControl6;
