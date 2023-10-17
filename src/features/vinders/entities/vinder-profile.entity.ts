import { DaysAvailable, TypeBusiness, VinderDriver } from "./";
import { VinderAvailability } from "./vinder-availability.entity";

export interface VinderProfileAPI {
	id: string;
	name: string;
	isBusiness: boolean;
	description?: string;
	phone?: string;
	jobReference?: string;
	dni?: string;
	dniPicture?: string;
	facePicture?: string;
	country: string;
	state: string;
	addresses: any[];
	vindyPicture?: string;
	logo?: string;
	catalog?: string;
	locationReference?: string;
	typeBusiness: TypeBusiness;
	vinderDriver: VinderDriver[];
	availability: VinderAvailability;
}

export interface VinderProfile {
	id: string;
	name: string;
	description: string;
	state: string;
	jobReference: string;
	image: string;
	availability: {
		days: Pick<DaysAvailable, "day">[];
		isAlwaysOpen: boolean;
		from: Date | string;
		to: Date | string;
	};
	tags: Record<string, string>[];
	rating: number;
	reviews: number;
}
