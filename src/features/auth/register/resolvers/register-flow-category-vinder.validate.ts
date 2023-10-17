import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		jobReference: yup.string().required("debes indicar tu oficio"),
		category: yup
			.string()
			.required("debes seleccionar una categoria para tu negocio"),
		subCategory: yup
			.string()
			.required("debes seleccionar una subcategtoria par atu negocio"),
	})
	.required();

export const RegisterFlowCategoryVinderFormResolver = yupResolver(schema);
