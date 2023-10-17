import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		firstName: yup
			.string()
			.trim("No puedes tener espacios vacios")
			.required("El nombre es obligatorio"),
		email: yup
			.string()
			.email("Este es un correo no valido")
			.required("correo es obligatorio"),
		dni: yup
			.string()
			.trim("No puedes tener espacios vacios")
			.required("Esta campo es obligatorio"),
		lastName: yup
			.string()
			.trim("No puedes tener espacios vacios")
			.required("El apellido es obligatorio"),
		state: yup.string().required("El estado es obligatorio"),
		phone: yup
			.string()
			.matches(
				/^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/,
				"El telefono no debe tener caracteres especiales. ej: 4147892356"
			)
			.required("el telefono es obliogatorio"),
		address: yup.string().required("debes especificar una direccion"),
	})
	.required();

export const RegisterFlowBusinessInfoFormResolver = yupResolver(schema);
