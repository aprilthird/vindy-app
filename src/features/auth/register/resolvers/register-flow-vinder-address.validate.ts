import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
	nameAddress: yup
		.string()
		.required("debes asignarle un nombre a esta direccion"),
	// address: yup.string().required("debes seleccionar una direccion"),
	addressReference: yup.string().optional(),
});

export const RegisterFlowVinderAddressFormResolver = yupResolver(schema);
