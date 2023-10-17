import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		dniPicture: yup
			.object({
				data: yup.string().required("Necesitas subir una imagen de tu dni"),
				name: yup.string().required("Necesitas subir una imagen de tu dni"),
				path: yup.string().required("Necesitas subir una imagen de tu dni"),
			})
			.required("Necesitas subir una imagen de tu dni"),
		facePicture: yup
			.object({
				data: yup.string().required("Necesitas subir una imagen de tu rostro"),
				name: yup.string().required("Necesitas subir una imagen de tu rostro"),
				path: yup.string().required("Necesitas subir una imagen de tu rostro"),
			})
			.required("Necesitas subir una imagen de tu rostro"),
	})
	.required();

export const RegisterFlowBusinessFilesResolver = yupResolver(schema);
