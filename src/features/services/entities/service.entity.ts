import {
	DaysAvailable,
	TypeBusiness,
	VinderProfileAPI,
} from "../../../features/vinders/entities";
import {
	AvailabilitySlug,
	VinderAvailability,
} from "../../../features/vinders/entities/vinder-availability.entity";

interface ServiceImage {
	id: string;
	image: string;
	cloudId: string;
}

interface vinderService {
	id: string;
	name: string;
	state: string;
	availability: {
		days: Pick<DaysAvailable, "day">[];
		isAlwaysOpen: boolean;
	};
}

export interface Service {
	id: string;
	name: string;
	image: string;
	description: string;
	isActive: boolean;
	isHome: boolean;
	atPlace: boolean;
	price: number | string;
	delivery: number | string;
	vinder: vinderService;
}

export type ServiceSlug = Omit<Service, "vinder" | "isActive"> & {
	availability: AvailabilitySlug;
};
