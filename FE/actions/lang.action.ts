"use server";

import { constants } from "@/config";
import { cookies } from "next/headers";

export const setLanguageCookie = async (lang: string) => {
	cookies().set(constants.LANGUAGE, lang, { path: "/" });
};

export const getLanguageCookie = async (): Promise<any> => {
	return cookies().get(constants.LANGUAGE)?.value;
};
