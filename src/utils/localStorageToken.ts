const TOKEN_KEY = "sal-token";
export const getLocalStorageToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
export const setLocalStorageToken = (token: string) => {
  return localStorage.setItem(TOKEN_KEY, token);
};

export const removeLocalStorageToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};
