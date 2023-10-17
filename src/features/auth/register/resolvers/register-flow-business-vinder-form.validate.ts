import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		email: yup
			.string()
			.email("Este es un correo no valido")
			.required("correo es obligatorio"),
		password: yup
			.string()
			.trim("No es puedes tener especios")
			.required("Esta campo es obligatorio"),
		name: yup
			.string()
			.trim("No es puedes tener especias")
			.required("El nombre del vinder o negocio es obligatorio"),

		description: yup
			.string()
			.trim("No es puedes tener especias")
			.required("la descripcion es obligatoria"),
		username: yup
			.string()
			.matches(
				/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
				"no es un usuario valido"
			)
			.required("El apellido es obligatorio"),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password"), null], "Oops, la clave no son iguales"),
	})
	.required();

export const RegisterFlowBusinessVinderFormResolver = yupResolver(schema);
