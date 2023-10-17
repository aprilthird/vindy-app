import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		name: yup
			.string()
			.trim("No puedes tener espacios vacios")
			.required("El nombre es obligatorio"),
		description: yup.string().required("la descripcion del obligatorio"),
		modality: yup.array().min(1, "debes seleccionar alguna opcion"),
		price: yup
			.number()
			.typeError("el precio debe ser mayor a 0")
			.min(0.01, "el precio debe ser mayor a 0")
			.required("el precio es obligatorio"),
		delivery: yup.string().when("modality", (modality) => {
			return modality?.find((el: string) => el === "isHome")
				? yup
						.number()
						.typeError("el precio debe ser mayor a 0")
						.min(0.01, "el precio debe ser mayor a 0")
						.required("el precio es obligatorio")
				: yup.string();
		}),
	})
	.required();

export const AddServiceFormResolver = yupResolver(schema);
