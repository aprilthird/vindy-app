import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = (type: string) => {
	let validation: any = {
		date: yup
			.date()
			.min(new Date(), "La fecha debe ser mayor al dia de hoy")
			.required("Debes seleccionar una fecha"),
		time: yup.string().required("debes seleccionar una hora"),
		message: yup.string().optional(),
	};

	if (type === "isHome") {
		validation.address = yup
			.string()
			.required("debes seleccionar una direccion");
	}

	return yup.object(validation).required();
};

export const ServiceRequestFormResolver = (type: string) =>
	yupResolver(schema(type));
