import { VinderProfile } from "../entities";

export const setVinderProfileAdapter = (data: any): VinderProfile => {
	// console.log("data ===>", data);
	return {
		id: data?.id,
		name: data?.name,
		description: data?.description,
		state: data?.state,
		jobReference: data?.jobReference,
		image: data?.image,
		availability: {
			days: data?.availability?.days,
			isAlwaysOpen: data?.availability?.isAlwaysOpen,
			from: data?.availability?.from,
			to: data?.availability?.to,
		},
		tags: data?.tags,
		rating: data?.rating,
		reviews: data?.reviews,
	};
};
