import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		review: yup.string().required("Ups.. Este campo no puede estar vacio"),
	})
	.required();

export const CustomPopUpResolver = yupResolver(schema);
