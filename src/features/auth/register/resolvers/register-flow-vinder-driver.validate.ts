import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		licenseDriver: yup
			.object({
				data: yup
					.string()
					.required("Necesitas subir una imagen de tu licencia"),
				name: yup
					.string()
					.required("Necesitas subir una imagen de tu licencia"),
				path: yup
					.string()
					.required("Necesitas subir una imagen de tu licencia"),
			})
			.required(),
		typeTransport: yup
			.string()
			.required("debes seleccionar un tipo de transporte"),
		plate: yup.string().required("debes ingresar la placa del transporte"),
		transportColor: yup
			.string()
			.required("debes ingresar el color del transporte"),
	})
	.required();

export const RegisterFlowVinderDriverFormResolver = yupResolver(schema);
