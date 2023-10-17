import axios from "axios";
import {
	BusinessInfo,
	LoginFields,
	PersonalVinderFlow,
	RegisterBusinessVinderFields,
	RegisterMemberFields,
	RegisterPersonalVinderFields,
	SessionProp,
} from "./use-auth";
import { PATHS } from "../../server";
import { ROLES } from "./context/auth.reducer";
import { HttpMemberClient, HttpVinderClient } from "../../http-client";

const login = (data: LoginFields) => {
	return axios.post(`${PATHS.AUTH.LOGIN}`, data);
};

const logout = (type: ROLES.MEMBER | ROLES.VINDER) => {
	if (type === "VINDER") {
		return HttpVinderClient.post(`${PATHS.AUTH.LOGOUT}`);
	}
	return HttpMemberClient.post(`${PATHS.AUTH.LOGOUT}`);
};

const session = (data: SessionProp) => {
	const { userId, accessToken, role, refreshToken } = data;
	return axios.get(`${PATHS.AUTH.GET_SESSION_DATA(userId)}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
			role: role,
			userId: userId,
			refreshToken: refreshToken,
		},
	});
};

const registerMember = (data: RegisterMemberFields) => {
	return axios.post(`${PATHS.AUTH.REGISTER_MEMBER}`, data);
};

const verifyVinderUser = (email: string) => {
	return axios.get(`${PATHS.AUTH.VERIFY_VINDER_USER(email)}`);
};

const registerPersonalVinder = (data: RegisterPersonalVinderFields) => {
	return axios.post(`${PATHS.AUTH.REGISTER_VINDER}`, data);
};

const registerBusinessVinder = (data: RegisterBusinessVinderFields) => {
	return axios.post(`${PATHS.AUTH.REGISTER_VINDER}`, data);
};

const personalVinderFlow = (data: PersonalVinderFlow) => {
	const { userId } = data;
	return axios.post(`${PATHS.AUTH.PERSONAL_VINDER_FLOW(userId)}`, data);
};

const acceptUserTerms = (userId: string) => {
	return axios.post(`${PATHS.AUTH.ACCEPT_USER_TERMS(userId)}`);
};

const businessInfo = (data: BusinessInfo) => {
	const { vinderId } = data;
	return axios.post(`${PATHS.AUTH.BUSINESS_INFO(vinderId)}`, data);
};

export const authServices = {
	login,
	logout,
	session,
	registerMember,
	verifyVinderUser,
	acceptUserTerms,
	registerPersonalVinder,
	registerBusinessVinder,
	personalVinderFlow,
	businessInfo,
};
