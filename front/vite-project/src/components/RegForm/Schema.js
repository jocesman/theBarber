import * as yup from 'yup';

const Schema = yup.object().shape({
    name: yup.string().min(1, "El nombre debe tener al menos 1 caracter").required('Nombres es Obligatorio'),
    lastname: yup.string().min(1, "El apellido debe tener al menos 1 caracter").required('Apellidos es Obligatorio'),
    phone: yup.string()
        .matches(/^[0-9]+$/, "Solo se permiten números")
        .min(7, "Debe tener al menos 7 dígitos")
        .max(15, "No puede tener más de 15 dígitos")
        .required("Número de Teléfono es obligatorio"),
    email: yup.string().email('Email inválido').required('Email es obligatorio'),
    id: yup.string().min(1, "El identificador debe tener al menos 1 caracter").required('Identificación es Obligatorio'),
    address: yup.string().min(1, "La dirección debe tener al menos 1 caracter").required('Dirección es Obligatoria'),
    city: yup.string().min(1, "La ciudad debe tener al menos 1 caracter").required('Ciudad es Obligatoria'),
    birthDate: yup.date().required('Fecha de Nacimiento es Obligatorrio'),
    password: yup.string()
            .min(8, "El password debe tener al menos 8 caracteres")
            .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
            .matches(/[a-z]/, "Debe contener al menos una minúscula")
            .matches(/\d/, "Debe contener al menos un número")
            .matches(/[@$!%*?&]/, "Debe contener al menos un carácter especial (@$!%*?&)")
            .required("Password es obligatorio"),
    confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], "Las contraseñas deben coincidir")
            .required("Confirmación de Password es obligatoria")           
});

export default Schema;