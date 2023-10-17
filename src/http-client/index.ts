import axios from "axios";

import { environment } from "../environments/enviroments";
import { VinderInterceptor } from "../interceptors/vinder.interceptor";
import { MemberInterceptor } from "../interceptors/member.interceptor";

type FetcherOptions = {
	url: string;
	params?: any;
};

const { PUBLIC_API_BASE_URL } = environment;

export const HttpVinderClient = axios.create({
	baseURL: `${PUBLIC_API_BASE_URL}`,
});

export const HttpMemberClient = axios.create({
	baseURL: `${PUBLIC_API_BASE_URL}`,
});

export const AuthHttpClient = axios.create({
	baseURL: `${PUBLIC_API_BASE_URL}`,
});

HttpVinderClient.interceptors.request.use(VinderInterceptor.onFulfilled);
HttpMemberClient.interceptors.request.use(MemberInterceptor.onFulfilled);

export const vinderFetcher = async (options: FetcherOptions) => {
	return HttpVinderClient.get(options.url, {
		params: options?.params ?? {},
	}).then((response) => {
		return response.data;
	});
};

export const memberFetcher = async (options: FetcherOptions) => {
	return HttpMemberClient.get(options.url, {
		params: options?.params ?? {},
	}).then((response) => {
		return response.data;
	});
};

export const authFetcher = async (options: FetcherOptions) => {
	return AuthHttpClient.get(options.url, {
		params: options?.params ?? {},
	}).then((response) => {
		return response.data;
	});
};

export const handleAxiosError = <T>(
	error: T,
	callback: (message: string) => void
) => {
	if (axios.isAxiosError(error)) {
		const data = error.response?.data as { message: string | string[] };
		if (Array.isArray(data.message)) {
			callback(data.message[0]);
		} else {
			callback(data.message);
		}
	} else {
		if (error instanceof Error) {
			callback(error.message);
		}
	}
};
