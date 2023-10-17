import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		email: yup.string().required("El usuario o correo es obligatorios"),
		password: yup.string().required("Esta campo es obligatorio"),
	})
	.required();

export const loginVinderFormResolver = yupResolver(schema);
