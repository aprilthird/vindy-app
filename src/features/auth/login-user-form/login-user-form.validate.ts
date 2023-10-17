import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		email: yup.string().required("El usuario o correo es obligatorio"),
		password: yup.string().required("Esta campo es obligatorio"),
	})
	.required();

export const loginUserFormResolver = yupResolver(schema);
