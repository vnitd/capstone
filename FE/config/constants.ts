const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

console.log(API_SERVER);

const ACCESS_TOKEN = "__access_token";
const USER_INFO = "__user_info";
const LANGUAGE = "__language";
const DEFAULT_LANGUAGE = "vi-VN";

const constants = { API_SERVER, ACCESS_TOKEN, USER_INFO, LANGUAGE, DEFAULT_LANGUAGE };

export default constants;
