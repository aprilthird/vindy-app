import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		days: yup
			.array()
			.of(
				yup.object({
					day: yup
						.string()
						.required("Necesitar elegir al menos un dia de disponibilidad"),
				})
			)
			.min(1, "Necesitas elegir al menos un dia de disponibilidad"),
		typeAvailability: yup
			.string()
			.oneOf(["horas", "always"])
			.required("Debes elegir un tipo de disponibilidad"),
		from: yup.string().when("typeAvailability", {
			is: "horas",
			then: yup
				.string()
				.required("Necesitas elegir desde que hora estad disponible"),
			otherwise: yup.string().optional(),
		}),
		to: yup.string().when("typeAvailability", {
			is: "horas",
			then: yup
				.string()
				.notOneOf(
					[yup.ref("from"), null],
					"Necesitas elegir una hora de salida diferente a la de entrada"
				)
				.required("Necesitas elegir desde que hora estas disponible"),
			otherwise: yup.string().optional(),
		}),
	})
	.required();

export const RegisterFlowVinderAvailabilityFormResolver = yupResolver(schema);
