import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		firstName: yup
			.string()
			.trim("No es puedes tener especias")
			.required("El nombre es obligatorio"),
		email: yup
			.string()
			.email("Este es un correo no valido")
			.required("correo es obligatorio"),
		password: yup
			.string()
			.trim("No es puedes tener especias")
			.required("Esta campo es obligatorio"),
		lastName: yup
			.string()
			.trim("No es puedes tener especias")
			.required("El apellido es obligatorio"),
		username: yup
			.string()
			.matches(/^(?!.*\.)(?!.*\.$)[^\W][\w.]{0,29}$/, "no es un usuario valido")
			.required("El apellido es obligatorio"),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password"), null], "Oops, la clave no son iguales"),
		state: yup.string().required("El estado es obligatorio"),
		phone: yup
			.string()
			.matches(
				/^[+]*[]{0,1}[0-9]{1,4}[]{0,1}[\s\./0-9]*$/,
				"El telefono no debe tener caracteres especiales. ej: +584147892356"
			)
			.required("el telefono es obliogatorio"),
	})
	.required();

export const RegisterFlowUserFormResolver = yupResolver(schema);
