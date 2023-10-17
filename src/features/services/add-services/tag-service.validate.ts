import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		tag: yup.array().min(1).required("El nombre es obligatorio"),
	})
	.required();

export const TagServiceResolver = yupResolver(schema);
