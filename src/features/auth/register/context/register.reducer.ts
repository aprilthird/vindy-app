import { User } from "../../../../features/users/entities";
import { ROLES, VINDER_TYPES } from "../../context/auth.reducer";
import {
	FilesObject,
	UpdateBusinessVinderInfo,
	UpdatePersonalVinderInfo,
	UpdateVinderAvailability,
	updateBusinessRepresentative,
	updateCategoryVinder,
	updateDriver,
	updateUserProps,
} from "./register.provider";

export enum RegisterActionKind {
	SET_ACCOUNT_TYPE = "SET_ACCOUNT_TYPE",
	SET_VINDER_TYPE = "SET_VINDER_TYPE",
	SET_MEMBER_INFO = "SET_MEMBER_INFO",
	SET_PERSONAL_VINDER_INFO = "SET_PERSONAL_VINDER_INFO",
	SET_BUSINESS_VINDER_INFO = "SET_BUSINESS_VINDER_INFO",
	SET_USER_MEMBER_ID = "SET_USER_MEMBER_ID",
	RESET_STATE = "RESET_STATE",
	SET_VINDER_AVAILABILITY = "SET_VINDER_AVAILABILITY",
	SET_VINDER_CATEGORY = "SET_VINDER_CATEGORY",
	SET_VINDER_DRIVER = "SET_VINDER_DRIVER",
	SET_VINDER_ID = "SET_VINDER_ID",
	SET_BUSINESS_REPRESENTATIVE = "SET_BUSINESS_REPRESENTATIVE",
}

export type ActionPayload = string | number | object | ROLES | Partial<User>;

export type Action = {
	type: RegisterActionKind;
	payload?: ActionPayload;
};

export type State = {
	step: number;
	steps: string[];
	role: ROLES.MEMBER | ROLES.VINDER | string;
	isBusiness: boolean;
	userId: string;
	vinderId: string;
	user: {
		firstName: string;
		lastName: string;
		username: string;
		email: string;
		password: string;
		confirmPassword?: string;
		state: string;
		phone: string;
	};
	personalVinder: {
		username: string;
		email: string;
		password: string;
		confirmPassword?: string;
		name: string;
		dni: string;
		description: string;
		dniPicture: FilesObject | null;
		facePicture: FilesObject | null;
		logo: FilesObject | null;
		isHome: boolean;
		atPlace: boolean;
		state: string;
		phone: string;
		nameAddress: string;
		address: string;
		addressReference: string;
	};
	businessVinder: {
		username: string;
		email: string;
		password: string;
		name: string;
		description: string;
		logo: FilesObject | null;
		isHome: boolean;
		atPlace: boolean;
		state: string;
		nameAddress: string;
		address: string;
		addressReference: string;
		phone?: string;
		confirmPassword?: string;
	};
	businessRepresentative: object;
	availability: {
		days: Record<string, string>[];
		from: string;
		to: string;
		isAlwaysOpen: boolean;
	};
	category: {
		jobReference: string;
		category: string;
		subCategory: string;
	};
	driver: {
		licenseDriver: FilesObject | null;
		// licenseDriver: string;
		typeTransport: string;
		plate: string;
		transportColor: string;
	};
};

const initState = {
	step: 0,
	steps: [],
	isBusiness: false,
	role: "",
	userId: "",
	vinderId: "",
	user: {
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		state: "",
		phone: "",
	},
	personalVinder: {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
		description: "",
		dni: "",
		dniPicture: null,
		facePicture: null,
		logo: null,
		isHome: false,
		atPlace: false,
		state: "",
		phone: "",
		nameAddress: "",
		address: "",
		addressReference: "",
	},
	businessVinder: {
		username: "",
		email: "",
		password: "",
		name: "",
		description: "",
		logo: null,
		isHome: false,
		atPlace: false,
		state: "",
		address: "",
		nameAddress: "",
		addressReference: "",
		phone: "",
		confirmPassword: "",
	},
	businessRepresentative: {
		country: "",
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		dni: "",
		dniPicture: "",
		facePicture: "",
		mercantileFile: "",
		state: "",
		address: "",
	},
	availability: {
		days: [],
		from: "",
		to: "",
		isAlwaysOpen: false,
	},
	category: {
		jobReference: "",
		category: "",
		subCategory: "",
	},
	driver: {
		licenseDriver: null,
		typeTransport: "",
		plate: "",
		transportColor: "",
	},
};

export const RegisterReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case RegisterActionKind.SET_ACCOUNT_TYPE:
			return { ...state, role: action.payload as ROLES };
		case RegisterActionKind.SET_VINDER_TYPE:
			return {
				...state,
				isBusiness: action.payload === VINDER_TYPES.BUSINESS ? true : false,
			};
		case RegisterActionKind.SET_MEMBER_INFO:
			return {
				...state,
				user: { ...state.user, ...(action.payload as updateUserProps) },
			};
		case RegisterActionKind.SET_PERSONAL_VINDER_INFO:
			return {
				...state,
				personalVinder: {
					...state.personalVinder,
					...(action.payload as Partial<UpdatePersonalVinderInfo>),
				},
			};
		case RegisterActionKind.SET_BUSINESS_VINDER_INFO:
			return {
				...state,
				businessVinder: {
					...state.businessVinder,
					...(action.payload as Partial<UpdateBusinessVinderInfo>),
				},
			};
		case RegisterActionKind.SET_VINDER_AVAILABILITY:
			return {
				...state,
				availability: {
					...state.availability,
					...(action.payload as Partial<UpdateVinderAvailability>),
				},
			};
		case RegisterActionKind.SET_VINDER_CATEGORY:
			return {
				...state,
				category: {
					...state.category,
					...(action.payload as Partial<updateCategoryVinder>),
				},
			};
		case RegisterActionKind.SET_VINDER_DRIVER:
			return {
				...state,
				driver: {
					...state.driver,
					...(action.payload as Partial<updateDriver>),
				},
			};
		case RegisterActionKind.SET_USER_MEMBER_ID:
			return {
				...state,
				userId: action.payload as string,
			};
		case RegisterActionKind.SET_VINDER_ID:
			return {
				...state,
				vinderId: action.payload as string,
			};
		case RegisterActionKind.SET_BUSINESS_REPRESENTATIVE:
			return {
				...state,
				businessRepresentative: {
					...(action.payload as updateBusinessRepresentative),
				},
			};
		case RegisterActionKind.RESET_STATE:
			return initState;

		default:
			return state;
	}
};
