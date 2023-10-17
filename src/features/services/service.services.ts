import { HttpMemberClient, HttpVinderClient } from "../../http-client";
import { PATHS } from "../../server";
import {
	CreateServiceDTO,
	CreateShoppingDTO,
	CreateTagDTO,
} from "./use-services";

const createTag = (data: CreateTagDTO) => {
	return HttpVinderClient.post(`${PATHS.TAGS.CREATE}`, data);
};

const createService = (data: CreateServiceDTO) => {
	return HttpVinderClient.post(`${PATHS.SERVICES.CREATE}`, data);
};

const createShopping = (data: CreateShoppingDTO) => {
	return HttpMemberClient.post(`${PATHS.SHOPPING.CREATE}`, data);
};

export const serviceService = {
	createTag,
	createService,
	createShopping,
};
