import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		typeBusiness: yup.array().required("debes seleccionar el tipo de vinder"),
		state: yup.string().required("debes seleccionar un estado"),
		phone: yup.string().required("el telefono es obligatorio"),
	})
	.required();

export const RegisterFlowVinderTypeBusinessFormResolver = yupResolver(schema);
