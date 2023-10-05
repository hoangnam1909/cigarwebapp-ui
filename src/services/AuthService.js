import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import authAPI from "~/apis/authAPI/authAPI";
import { parseJwt } from "~/utils/JwtUtils";

export const verifyToken = () => {
  let accessToken = Cookies.get("accessToken");
  if (accessToken == null) return false;

  const jwt = jwtDecode(accessToken);
  const refreshToken = async () => {
    const res = await authAPI.refreshToken(Cookies.get("refreshToken"));
    if (res.status === 200) {
      Cookies.set("accessToken", res.data.token);
    }
  };

  if (isTokenExpired() && Cookies.get("rememberMe") === "true") {
    refreshToken();
    return true;
  }

  return new Date(jwt.exp * 1000 - 10 * 60 * 1000) > new Date();
};

export const isTokenExpired = () => {
  let accessToken = Cookies.get("accessToken");
  const jwt = jwtDecode(accessToken);

  return new Date(jwt.exp * 1000 - 10 * 60 * 1000) < new Date();
};

export const tokenUserRole = () => {
  let payload = parseJwt(Cookies.get("accessToken"));

  if (!verifyToken()) {
    return null;
  }

  if (payload != null) {
    return payload.role;
  }

  return null;
};

export const removeAuthInfo = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("rememberMe");
};
