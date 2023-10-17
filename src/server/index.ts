import { environment } from "../environments/enviroments";
const { PUBLIC_API_BASE_URL, prroduction } = environment;

const ENVIRONTMENT = {
	PUBLIC_API_BASE_URL: PUBLIC_API_BASE_URL,
	PRODUCTION: prroduction,
};

export const PATHS = {
	AUTH: {
		LOGIN: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/auth/login`,
		LOGOUT: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/auth/logout`,
		GET_SESSION_DATA: (userId: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/auth/get-user-info/${userId}`;
		},
		REGISTER_MEMBER: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/auth/register-user`,
		ACCEPT_USER_TERMS: (userId: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/auth/accept-app-terms/${userId}`;
		},
		VERIFY_VINDER_USER: (email: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/auth/find-vinder/${email}`;
		},
		REGISTER_VINDER: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/auth/register-vinder`,
		PERSONAL_VINDER_FLOW: (userId: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/vinders/register-flow/${userId}`;
		},
		BUSINESS_INFO: (vinderId: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/vinders/save-business-representative/${vinderId}`;
		},
	},
	TAGS: {
		CREATE: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/tags`,
		GET_BY_VINDER: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/tags/vinder`,
	},
	SERVICES: {
		GET: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/services`,
		CREATE: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/services`,
		GET_BY_VINDER: (vinderId: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/services/vinder/${vinderId}`;
		},
		GET_ONE: (id: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/services/${id}`;
		},
	},
	CATEGORIES: {
		GET: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/category`,
		GET_ONE: (id: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/category/${id}`;
		},
	},
	SUB_CATEGORIES: {
		GET: (categoryId: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/category/${categoryId}/subcategories`;
		},
	},
	VINDERS: {
		GET_ONE: (vinderId: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/vinders/${vinderId}`;
		},
	},
	ADDRESSES: {
		GET: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/addresses`,
	},
	SHOPPING: {
		CREATE: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/shopping`,
		GET: `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/shopping`,
		GET_ONE: (shoppingId: string) => {
			return `${ENVIRONTMENT.PUBLIC_API_BASE_URL}/shopping/${shoppingId}`;
		},
	},
};
