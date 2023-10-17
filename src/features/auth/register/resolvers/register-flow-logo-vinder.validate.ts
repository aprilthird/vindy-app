import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		logo: yup
			.object({
				data: yup
					.string()
					.required("El logo es obligatorio, despues se puede modificar"),
				name: yup
					.string()
					.required("El logo es obligatorio, despues se puede modificar"),
				path: yup
					.string()
					.required("El logo es obligatorio, despues se puede modificar"),
			})
			.required(),
	})
	.required();

export const RegisterFlowLogoVinderResolver = yupResolver(schema);
