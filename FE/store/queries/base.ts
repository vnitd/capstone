import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { constants } from "@/config";
import { getLanguageCookie, setLanguageCookie } from "@/actions/lang.action";
import { getTokenCookie } from "@/actions/auth.action";

const baseQuery = fetchBaseQuery({
	baseUrl: constants.API_SERVER,
	prepareHeaders: async (headers) => {
		var language = await getLanguageCookie();
		if (!language) {
			language = constants.DEFAULT_LANGUAGE;
			await setLanguageCookie(language);
		}
		console.log(language);
		headers.set("Content-Language", language as string);

		const authToken = await getTokenCookie();
		if (authToken) {
			headers.set("Authorization", authToken as string);
		}

		return headers;
	},
});

export const baseApi = createApi({
	baseQuery,
	endpoints: () => ({}),
});
