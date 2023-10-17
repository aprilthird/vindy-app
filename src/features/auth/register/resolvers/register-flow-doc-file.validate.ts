import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		mercantilFile: yup
			.object({
				data: yup
					.string()
					.required("Necesitas subir el registro mercantil de tu empresa"),
				name: yup
					.string()
					.required("Necesitas subir el registro mercantil de tu empresa"),
				path: yup
					.string()
					.required("Necesitas subir el registro mercantil de tu empresa"),
			})
			.required("Necesitas subir el registro mercantil de tu empresa"),
	})
	.required();

export const RegisterFlowDocFilesResolver = yupResolver(schema);
