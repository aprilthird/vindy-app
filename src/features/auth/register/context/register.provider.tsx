import { useReducer } from "react";
import { useInterpret } from "@xstate/react";
import { RegisterContext } from "./register.context";
import { RegisterActionKind, RegisterReducer } from "./register.reducer";
import { RegisterMachine } from "../register.machine";
import { ROLES, VINDER_TYPES } from "../../context/auth.reducer";

type RegisterContextProviderProps = {
	children: React.ReactNode;
};

export type FilesObject = {
	data: string;
	name: string;
	path: string;
};

export type updateUserProps = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
	state: string;
	phone: string;
};

export type UpdatePersonalVinderInfo = {
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
	address: string;
	nameAddress: string;
	addressReference: string;
};

export type UpdateBusinessVinderInfo = {
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
	name: string;
	description: string;
	logo: FilesObject | null;
	isHome: boolean;
	atPlace: boolean;
	state: string;
	address: string;
	nameAddress: string;
	addressReference: string;
	phone?: string;
};

export type UpdateVinderAvailability = {
	days: Record<string, string>[];
	from: string;
	to: string;
	isAlwaysOpen: boolean;
};

export type updateCategoryVinder = {
	jobReference: string;
	category: string;
	subCategory: string;
};

export type updateDriver = {
	licenseDriver: FilesObject | null;
	// licenseDriver: string;
	typeTransport?: string;
	plate?: string;
	transportColor?: string;
};

export type updateBusinessRepresentative = {
	country: string;
} & Record<string, string | Record<string, string>>;

export const RegisterContextProvider: React.FC<
	RegisterContextProviderProps
> = ({ children }) => {
	const [state, dispatch] = useReducer(RegisterReducer, {
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
	});

	const machineService = useInterpret(RegisterMachine, {
		actions: {
			goToSelectTypeAccount: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToRegisterUser: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToRegisterPersonalVinder: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToRegisterBusinessVinder: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToConfirmPhone: () => {
				console.log(
					"aqui hago el request para enviar codigo SMS y verificar el usuario"
				);
			},
			goToTerms: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToSuccessRegister: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToSelectTypeVinder: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToAvailabilityVinder: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToCategoryVinder: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToSaveDriverInfo: () => {
				console.log("esto hara algo al futuro ====>");
			},
			goToSaveBusinessInfo: () => {
				console.log("esto hara algo al futuro ====>");
			},
		},
	});

	const setTypeAccount = (value: ROLES) => {
		dispatch({
			type: RegisterActionKind.SET_ACCOUNT_TYPE,
			payload: value,
		});
	};

	const setVinderType = (value: VINDER_TYPES) => {
		dispatch({
			type: RegisterActionKind.SET_VINDER_TYPE,
			payload: value,
		});
	};

	const updateUserInfo = (data: updateUserProps) => {
		dispatch({
			type: RegisterActionKind.SET_MEMBER_INFO,
			payload: data,
		});
	};

	const updatePersonalVinderInfo = (
		data: Partial<UpdatePersonalVinderInfo>
	) => {
		dispatch({
			type: RegisterActionKind.SET_PERSONAL_VINDER_INFO,
			payload: data,
		});
	};

	const updateBusinessVinderInfo = (
		data: Partial<UpdateBusinessVinderInfo>
	) => {
		dispatch({
			type: RegisterActionKind.SET_BUSINESS_VINDER_INFO,
			payload: data,
		});
	};

	const UpdateVinderAvailability = (data: UpdateVinderAvailability) => {
		dispatch({
			type: RegisterActionKind.SET_VINDER_AVAILABILITY,
			payload: data,
		});
	};

	const UpdateCategoryVinder = (data: updateCategoryVinder) => {
		dispatch({
			type: RegisterActionKind.SET_VINDER_CATEGORY,
			payload: data,
		});
	};

	const UpdateVinderDriver = (data: Partial<updateDriver>) => {
		dispatch({
			type: RegisterActionKind.SET_VINDER_DRIVER,
			payload: data,
		});
	};

	const setUserId = (value: string) => {
		dispatch({
			type: RegisterActionKind.SET_USER_MEMBER_ID,
			payload: value,
		});
	};

	const setVinderId = (value: string) => {
		dispatch({
			type: RegisterActionKind.SET_VINDER_ID,
			payload: value,
		});
	};

	const updateBusinessRepresentative = (data: updateBusinessRepresentative) => {
		dispatch({
			type: RegisterActionKind.SET_BUSINESS_REPRESENTATIVE,
			payload: data,
		});
	};

	const resetState = () => {
		dispatch({
			type: RegisterActionKind.RESET_STATE,
		});
	};

	return (
		<RegisterContext.Provider
			value={{
				state,
				machineService,
				setTypeAccount,
				setVinderType,
				updateUserInfo,
				setUserId,
				setVinderId,
				updatePersonalVinderInfo,
				updateBusinessVinderInfo,
				resetState,
				UpdateCategoryVinder,
				UpdateVinderAvailability,
				UpdateVinderDriver,
				updateBusinessRepresentative,
			}}
		>
			{children}
		</RegisterContext.Provider>
	);
};

// export default React.memo(RegisterContextProvider);
