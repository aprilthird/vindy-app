import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		typeBusiness: yup.array().required("debes seleccionar el tipo de vinder"),
		state: yup.string().required("debes seleccionar un estado"),
	})
	.required();

export const RegisterFlowBusinessTypeBusinessFormResolver = yupResolver(schema);
