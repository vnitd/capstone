"use server";

import { constants } from "@/config";
import { cookies } from "next/headers";

export const createTokenCookie = async (token: string) => {
	cookies().set(constants.ACCESS_TOKEN, token, { secure: true, path: "/" });
};
export const getTokenCookie = async () => {
	return cookies().get(constants.ACCESS_TOKEN)?.value;
};

export const deleteTokenCookie = async () => {
	cookies().delete(constants.ACCESS_TOKEN);
};
