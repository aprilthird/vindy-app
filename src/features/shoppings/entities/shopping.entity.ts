import { Address } from "../../addresses/entities";
import { Service } from "../../services/entities";
import { Profile } from "../../users/entities";

export interface ShoppingApi {
	id: string;
	date: Date;
	time: string;
	message: string;
	type: TYPE_SHOPPING;
	shoppingStatus: SHOPPING_STATUS;
	address: Address;
	shoppingPayment: any;
	profile: Profile | any;
	service: Omit<Service, "vinder">;
}

export interface Shopping {
	id: string;
	date: Date;
	time: string;
	message: string;
	type: TYPE_SHOPPING;
	shoppingStatus: SHOPPING_STATUS;
	address: Partial<Address>;
	shoppingPayment: any;
	profile: Partial<Profile>;
	service: Partial<Service>;
}

export enum TYPE_SHOPPING {
	is_home = "is_home",
	at_place = "at_place",
}

export enum SHOPPING_STATUS {
	IN_PROCCESS = "in_proccess",
	CANCELED = "canceled",
	FINISHED = "finished",
	REVIEW = "review",
	ACCEPTED = "accepted",
	RESCHEDULE = "reschedule",
}
