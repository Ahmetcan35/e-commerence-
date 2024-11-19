import * as yup from "yup";

export const registerSchema = yup.object().shape({
    username: yup.string().required("Kullanıcı adı boş olamaz."),
    password: yup.string().required("Şifre boş olamaz.")

});