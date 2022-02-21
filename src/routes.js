import Cookies from "universal-cookie";
let cookies;
export const setup = () => {
  cookies = new Cookies();
};

export const getUserCookies = () => {
  return cookies.get("UserID");
};

export const setAuthCookies = (auth, userId) => {
  cookies.set("Authorization", auth);
  cookies.set("UserID", userId);
};

export const removeAuthCookies = () => {
  cookies.remove("Authorization");
  cookies.remove("UserID");
};

export const config = () => {
  return {
    headers: {
      Authorization: cookies.get("Authorization"),
    },
  };
};

export const baseURL = "http://localhost:8088/codeSnippetManager";
