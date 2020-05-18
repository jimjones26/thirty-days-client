const cookie = require("cookie");
const secure = process.env.NODE_ENV === "production" ? true : false;

export const createAccessCookie = (token) => {
  return cookie.serialize("accessToken", token, {
    httpOnly: true,
    secure: secure,
    expires: new Date(Date.now() + 15 * 60 * 1000),
    maxAge: 900,
    path: "/",
    sameSite: "strict",
    domain: "localhost",
  });
};

export const createRefreshCookie = (token) => {
  return cookie.serialize("refreshToken", token, {
    httpOnly: true,
    secure: secure,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 604800,
    path: "/",
    same: "strict",
    domain: "localhost",
  });
};
