import { Category } from "../../categories/entities";
import { Business, BusinessRepresentative, VinderProfileAPI } from "./";

export interface Vinder {
	id: string;
	name: string;
	isBusiness: boolean;
	categories: Category[];
	businessRep: BusinessRepresentative;
	vinderProfile: VinderProfileAPI;
	business: Business;
}
