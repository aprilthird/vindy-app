import { Service, ServiceSlug } from "../entities";

export const setServicesAdapter = (data: any[]): Service[] => {
	return data?.map((service: any) => ({
		id: service?.id,
		name: service?.name,
		description: service?.description,
		image: service?.image,
		price: Number(service?.price),
		delivery: Number(service?.delivery),
		isHome: service?.isHome,
		atPlace: service?.atPlace,
		isActive: service?.isActive,
		vinder: {
			id: service?.vinder?.id,
			name: service?.vinder?.name,
			state: service?.vinder?.state,
			availability: {
				days: service?.vinder?.availability?.days,
				isAlwaysOpen: service?.vinder?.availability?.isAlwaysOpen,
			},
		},
	}));
};

export const setServiceAdapter = (data: any): ServiceSlug => {
	return {
		id: data?.id,
		name: data?.name,
		description: data?.description,
		isHome: data?.isHome,
		atPlace: data?.atPlace,
		price: data?.price,
		delivery: data?.delivery,
		image: data?.image?.image,
		availability: {
			from: data?.availability?.from,
			to: data?.availability?.to,
			isAlwaysOpen: data?.availability?.isAlwaysOpen,
			days: data?.availability?.days,
		},
	};
};
