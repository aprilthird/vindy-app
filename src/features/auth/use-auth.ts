import { handleAxiosError } from "../../http-client";
import { CloudinaryResponse } from "../cloudinary";
import { authServices } from "./auth.services";
import { ROLES, SCREEN_VINDER, SessionPayload } from "./context/auth.reducer";

type BaseLoginFields = {
	email: string;
	password: string;
};

type BaseProfileFields = {
	country: string;
	state: string;
	nameAddress?: string;
	address?: string;
	addressReference?: string;
};

export type LoginFields = BaseLoginFields & {
	role: ROLES.MEMBER | ROLES.VINDER;
};

export type SessionProp = {
	userId: string;
	role: ROLES.MEMBER | ROLES.VINDER;
	accessToken: string;
	refreshToken: string;
};

export type RegisterMemberFields = BaseProfileFields & {
	role: ROLES.MEMBER | ROLES.VINDER;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	phone: string;
};

export type RegisterPersonalVinderFields = BaseLoginFields &
	BaseProfileFields & {
		screen: SCREEN_VINDER.DASHBOARD_SCREEN | SCREEN_VINDER.REGISTER_SCREEN;
		atPlace: boolean;
		name: string;
		description: string;
		dni: string;
		dniPicture: CloudinaryResponse | null;
		facePicture: CloudinaryResponse | null;
		isBusiness: boolean;
		isHome: boolean;
		logo: CloudinaryResponse | null;
		role: ROLES.MEMBER | ROLES.VINDER;
		username: string;
	};

export type RegisterBusinessVinderFields = BaseLoginFields &
	BaseProfileFields & {
		screen: SCREEN_VINDER.DASHBOARD_SCREEN | SCREEN_VINDER.REGISTER_SCREEN;
		atPlace: boolean;
		name: string;
		description: string;
		isBusiness: boolean;
		isHome: boolean;
		logo?: CloudinaryResponse | null;
		role: ROLES.MEMBER | ROLES.VINDER;
		username: string;
	};

export type PersonalVinderFlow = {
	userId: string;
	days: Record<string, string>[];
	isAlwaysOpen: boolean;
	from: string;
	to: string;
	jobReference: string;
	category: string;
	subCategory: string;
	licenseDriver?: CloudinaryResponse | null;
	typeTransport?: string;
	plate?: string;
	transportColor?: string;
};

export type BusinessInfo = {
	vinderId: string;
	country: string;
} & Record<string, string | Record<string, string>>;

export const useAuth = () => {
	const login = async (data: LoginFields) => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.login(data)
				.then(({ data, status }) => {
					if (status === 200) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message ? message : "las credenciales son incorrectas");
					});
				});
		});
	};

	const logout = async (type: ROLES.MEMBER | ROLES.VINDER) => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.logout(type)
				.then(() => {
					resolve("success");
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message ? message : "las credenciales son incorrectas");
					});
				});
		});
	};

	const userSession = async (data: SessionProp): Promise<SessionPayload> => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.session(data)
				.then(({ data, status }) => {
					if (status === 200) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message ? message : "las credenciales son incorrectas");
					});
				});
		});
	};

	const registerMember = async (data: RegisterMemberFields) => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.registerMember(data)
				.then(({ data, status }) => {
					if (status === 200) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	const verifyVinderUser = async (email: string) => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.verifyVinderUser(email)
				.then(({ data, status }) => {
					if (status === 200) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	const registerPersonalVinder = async (data: RegisterPersonalVinderFields) => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.registerPersonalVinder(data)
				.then(({ data, status }) => {
					if (status === 200) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	const registerBusinessVinder = async (data: RegisterBusinessVinderFields) => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.registerBusinessVinder(data)
				.then(({ data, status }) => {
					if (status === 200) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	const personalVinderFlow = async (data: PersonalVinderFlow) => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.personalVinderFlow(data)
				.then(({ data, status }) => {
					if (status === 200) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	const acceptUserTerms = async (userId: string) => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.acceptUserTerms(userId)
				.then(({ data, status }) => {
					if (status === 200) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	const businessInfo = async (data: BusinessInfo) => {
		return new Promise(async (resolve, reject) => {
			await authServices
				.businessInfo(data)
				.then(({ data, status }) => {
					if (status === 200) {
						resolve(data);
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};

	return {
		login,
		logout,
		userSession,
		registerMember,
		verifyVinderUser,
		acceptUserTerms,
		registerPersonalVinder,
		registerBusinessVinder,
		personalVinderFlow,
		businessInfo,
	};
};
