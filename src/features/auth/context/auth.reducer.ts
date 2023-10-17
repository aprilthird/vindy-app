import { Vinder, VinderProfileAPI } from "../../vinders/entities";
import { Member, Profile } from "../../users/entities";
import { setMemberSessionAdapter, setVinderSessionAdapter } from "../adapters";
import { Address } from "../../../features/addresses/entities";

export enum ROLES {
	MEMBER = "MEMBER",
	VINDER = "VINDER",
}

export enum SCREEN_VINDER {
	DASHBOARD_SCREEN = "DASHBOARD_SCREEN",
	REGISTER_SCREEN = "REGISTER_SCREEN",
}

export enum VINDER_TYPES {
	BUSINESS = "BUSINESS",
	PERSONAL = "PERSONAL",
}

export enum TYPE_BUSINESS {
	IS_HOME = "isHome",
	AT_PLACE = "atPlace",
}

export const TRANSPORTS = [
	{ value: "CARRO_PEQUEÑO", text: "Carro pequeño" },
	{ value: "CARRO_MEDIANO", text: "Carro mediano" },
	{ value: "CARRO_GRANDE", text: "Carro grande" },
	{ value: "CAMIONETA", text: "Camioneta" },
	{ value: "MINI_VAN", text: "Mini van" },
	{ value: "MOTO", text: "Moto" },
];

export enum AuthActionKind {
	SET_USER_AUTHENTICATED = "SET_USER_AUTHENTICATED",
	SET_USER_LOGOUT = "SET_USER_LOGOUT",
	SET_USER_AUTHTOKEN = "SET_USER_AUTHTOKEN",
	SET_USER_INFO = "SET_USER_INFO",
	SHOW_SPLASH_SCREEN = "SHOW_SPLASH_SCREEN",
	HIDE_SPLASH_SCREEN = "HIDE_SPLASH_SCREEN",
}

export type AuthActionPayload =
	| string
	| number
	| object
	| Session
	| ROLES
	| any;

export type AuthAction = {
	type: AuthActionKind;
	payload?: AuthActionPayload;
};

export type Session = {
	accessToken: string | null;
	refreshToken: string | null;
	user: SessionPayload;
	// user: SessionPayload | null;
};

export type SessionPayload = {
	id: string;
	email: string;
	username: string;
	vinders: Partial<Vinder>[];
	profile: Partial<
		Pick<
			Profile,
			"firstName" | "lastName" | "phone" | "country" | "stripeCustomerId"
		>
	> | null;
	vinderProfile:
		| (Pick<
				VinderProfileAPI,
				| "name"
				| "logo"
				| "id"
				| "description"
				| "isBusiness"
				| "addresses"
				| "availability"
				| "jobReference"
		  > &
				Pick<Address, "state">)
		| null;
	memberProfile:
		| (Partial<Pick<Profile, "firstName" | "lastName">> &
				Pick<Member, "id" | "firstName" | "lastName" | "email" | "image">)
		| null;
};

export const initUserState = {
	id: "",
	email: "",
	username: "",
	profile: {
		firstName: "",
		lastName: "",
		phone: "",
		country: "",
	},
	vinderProfile: {
		id: "",
		name: "",
		logo: "",
		description: "",
		isBusiness: false,
		state: "",
		addresses: [],
		availability: {
			from: "",
			to: "",
			isAlwaysOpen: false,
			daysAvailable: [],
		},
	},
	vinders: [],
	memberProfile: {
		id: "",
		firstName: "",
		lastName: "",
		email: "",
		image: "",
	},
};

export type State = {
	session: Session;
	type: ROLES.MEMBER | ROLES.VINDER | null;
	splashScreen: boolean;
};

export const AuthReducer = (state: State, action: AuthAction): State => {
	switch (action.type) {
		case AuthActionKind.SET_USER_AUTHENTICATED:
			if (action.payload?.type === "VINDER") {
				const data = setVinderSessionAdapter(action.payload);
				return {
					...state,
					session: { ...data },
					type: action.payload?.type as ROLES,
				};
			} else if (action.payload?.type === "MEMBER") {
				const data = setMemberSessionAdapter(action.payload);
				return {
					...state,
					session: { ...data },
					type: action.payload?.type as ROLES,
				};
			}

			return {
				...state,
				session: { ...(action.payload as Session) },
				type: action.payload?.type as ROLES,
			};
		case AuthActionKind.SET_USER_LOGOUT:
			return {
				...state,
				session: {
					accessToken: null,
					refreshToken: null,
					user: { ...initUserState },
				},
				type: null,
			};
		case AuthActionKind.SHOW_SPLASH_SCREEN:
			return {
				...state,
				splashScreen: true,
			};
		case AuthActionKind.HIDE_SPLASH_SCREEN:
			return {
				...state,
				splashScreen: false,
			};
		default:
			return state;
	}
};
