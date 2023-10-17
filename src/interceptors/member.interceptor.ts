import { Preferences } from "@capacitor/preferences";
import { AxiosHeaders } from "axios";

export const MemberInterceptor = {
	onFulfilled: async (config: any) => {
		const { value } = await Preferences.get({ key: "auth" });
		const { value: session } = await Preferences.get({ key: "session" });
		const headers = new AxiosHeaders();

		if (value && session) {
			headers.set({
				Authorization: `Bearer ${JSON.parse(value)?.accessToken}`,
				"Content-Type": "application/json",
				VINDER: null,
				URV: `${JSON.parse(session)?.user?.id}`,
			});
		}
		config.headers = headers;

		return config;
	},
};
