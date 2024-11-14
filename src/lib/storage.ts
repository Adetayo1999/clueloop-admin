import { STORAGE_KEYS } from "./const";
import { UserDataType } from "./types";

export const getItem = (key: string) => {
  return localStorage.getItem(key) || null;
};
export const removeItem = (key: string) => {
  return localStorage.removeItem(key);
};

export const setItem = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const clearData = () => localStorage.clear();

export const storeUserToken = (token: string) => {
  return setItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY, token);
};

export const storeUserRefreshToken = (token: string) => {
  return setItem(STORAGE_KEYS.CLIENT_TOKEN_REFRESH_KEY, token);
};

export const storeUserData = (user: UserDataType) => {
  return setItem(STORAGE_KEYS.CLIENT_USER_DATA, JSON.stringify(user));
};

export const fetchUserData = () => {
  try {
    const stringifiedUser = getItem(STORAGE_KEYS.CLIENT_USER_DATA);

    if (!stringifiedUser) return null;

    const user = JSON.parse(stringifiedUser);

    if (!user?.id || !user?.name || !user?.email) {
      return null;
    }

    return user as UserDataType;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const clearUserData = () => {
  removeItem(STORAGE_KEYS.CLIENT_USER_DATA);
};

export const clearUserToken = () => {
  removeItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY);
};

export const fetchUserToken = () => {
  return getItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY);
};

export const fetchUserRefreshToken = () => {
  return getItem(STORAGE_KEYS.CLIENT_TOKEN_REFRESH_KEY);
};
