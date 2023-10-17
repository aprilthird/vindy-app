import { handleAxiosError } from "../../http-client";
import { CloudinaryResponse } from "../cloudinary";
import { serviceService } from "./service.services";

export type CreateTagDTO = {
	name: string;
};

export type CreateServiceDTO = {
	name: string;
	description: string;
	isHome: boolean;
	atPlace: boolean;
	price: number;
	delivery: number;
	isActive: boolean;
	image: CloudinaryResponse;
	tags: Array<string>;
};

export type CreateShoppingDTO = {
	serviceId: string;
	modality: "isHome" | "atPlace";
	date: Date | string;
	time: string;
	address?: string;
	message?: string;
};

export const useService = () => {
	const createTag = async (data: CreateTagDTO) => {
		return new Promise(async (resolve, reject) => {
			await serviceService
				.createTag(data)
				.then(({ data, status }) => {
					if (status === 201) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	const createService = async (data: CreateServiceDTO) => {
		return new Promise(async (resolve, reject) => {
			await serviceService
				.createService(data)
				.then(({ data, status }) => {
					if (status === 201) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	const createShopping = async (data: CreateShoppingDTO) => {
		return new Promise(async (resolve, reject) => {
			await serviceService
				.createShopping(data)
				.then(({ data, status }) => {
					if (status === 201) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	return {
		createTag,
		createService,
		createShopping,
	};
};
