import {
	DaysAvailable,
	Vinder,
	VinderProfileAPI,
} from "../../../features/vinders/entities";
import { Address } from "../../../features/addresses/entities";
import { Session, SessionPayload } from "../context/auth.reducer";

export const setVinderSessionAdapter = (data: Session): Session => {
	const { user } = data;

	return {
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
		user: {
			id: user?.id,
			email: user?.email,
			username: user?.username,
			profile: {},
			vinderProfile: {
				id: user?.vinderProfile?.id,
				name: user?.vinderProfile?.name,
				logo: user?.vinderProfile?.logo,
				description: user?.vinderProfile?.description,
				isBusiness: user?.vinderProfile?.isBusiness,
				state: user?.vinderProfile?.addresses[0]?.state,
				jobReference: user?.vinderProfile?.jobReference,
				addresses: user?.vinderProfile?.addresses?.map((address: Address) => ({
					id: address.id,
					name: address.name,
					address: address.address,
					addressReference: address.addressReference,
					state: address.state,
					type: address.type,
				})),
				availability: {
					from: user?.vinderProfile?.availability.from,
					to: user?.vinderProfile?.availability.to,
					isAlwaysOpen: user?.vinderProfile?.availability.isAlwaysOpen,
					daysAvailable: user?.vinderProfile?.availability.daysAvailable.map(
						(day: Partial<DaysAvailable>) => ({
							day: day.day,
						})
					),
				},
			},
			vinders: user?.vinders.map(
				(vinder: Partial<Vinder> & Partial<VinderProfileAPI>) => ({
					id: vinder.id,
					name: vinder.name,
					logo: vinder.logo,
				})
			),
			memberProfile: {
				id: user?.memberProfile?.id,
				firstName: user?.memberProfile?.firstName,
				lastName: user?.memberProfile?.lastName,
				email: user?.memberProfile?.email,
				image: user?.memberProfile?.image,
			},
		} as SessionPayload,
	};
};

export const setMemberSessionAdapter = (data: Session): Session => {
	const { user } = data;

	return {
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
		user: {
			id: user?.id,
			email: user?.email,
			username: user?.username,
			profile: {
				firstName: user?.profile?.firstName,
				lastName: user?.profile?.lastName,
				phone: user?.profile?.phone,
				stripeCustomerId: user?.profile?.stripeCustomerId,
			},
			vinderProfile: null,
			vinders: user?.vinders.map(
				(vinder: Partial<Vinder> & Partial<VinderProfileAPI>) => ({
					id: vinder.id,
					name: vinder.name,
					logo: vinder.logo,
				})
			),
			memberProfile: null,
		} as SessionPayload,
	};
};
