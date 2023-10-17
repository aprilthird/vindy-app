import { Shopping, ShoppingApi } from "../entities/shopping.entity";

export const setShoppingsAdapter = (
	shoppings: any
): Pick<Shopping, "id" | "date" | "service" | "time" | "type">[] => {
	return shoppings?.map((data: Partial<ShoppingApi>) => ({
		id: data?.id,
		date: data?.date,
		time: data?.time,
		type: data?.type,
		service: {
			id: data?.service?.id,
			description: data?.service?.description,
			image: data?.service?.image,
			name: data?.service?.name,
		},
	}));
};

export const setShoppingReviewAdapter = (
	shopping: any
): Omit<Shopping, "shoppingPayment" | "shoppingStatus"> => {
	return {
		id: shopping?.id,
		date: shopping?.date,
		time: shopping?.time,
		message: shopping?.message,
		type: shopping?.typeShopping,
		service: {
			id: shopping?.service?.id,
			description: shopping?.service?.description,
			name: shopping?.service?.name,
			price: shopping?.service?.price,
			delivery: shopping?.service?.price,
		},
		profile: {
			id: shopping?.profile?.id,
			firstName: shopping?.profile?.firstName,
			lastName: shopping?.profile?.lastName,
			phone: shopping?.profile?.phone,
		},
		address: {
			address: shopping?.address?.address,
			state: shopping?.address?.state,
		},
	};
};
