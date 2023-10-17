import { DaysAvailable } from "./days-available.entity";

export interface VinderAvailability {
	from: string;
	to: string;
	isAlwaysOpen: boolean;
	daysAvailable: Partial<DaysAvailable>[];
}

export type AvailabilitySlug = Pick<
	VinderAvailability,
	"from" | "to" | "isAlwaysOpen"
> & {
	days: Pick<DaysAvailable, "day">[];
};
