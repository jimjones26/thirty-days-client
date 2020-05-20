import { post } from "../utils/post";
import {
  createAccessCookie,
  createRefreshCookie,
  deleteAccessCookie,
  deleteRefreshCookie,
} from "../utils/create-cookie";

export async function get(req, res, next) {
  // check for refresh cookie
  const refreshToken = req.cookies["refreshToken"];

  if (refreshToken && refreshToken !== "undefined") {
    // call the auth api refresh token route
    const tokens = await post(
      "http://localhost:5000/api/v1/users/refresh-tokens",
      { refreshToken }
    );

    if (tokens.refreshToken && tokens.accessToken) {
      // valid tokens, create new cookies and redirect to
      // referring url
      res.setHeader("Set-Cookie", [
        createAccessCookie(tokens.accessToken),
        createRefreshCookie(tokens.refreshToken),
      ]);
      let url = "/";
      let str = `Redirecting to ${url}`;
      res.writeHead(302, {
        Location: url,
        "Content-Type": "text/plain",
        "Content-Length": str.length,
      });
      res.end(str);
    } else {
      res.setHeader("Set-Cookie", [
        deleteRefreshCookie(),
        deleteAccessCookie(),
      ]);
      let url = "/";
      let str = `Redirecting to ${url}`;
      res.writeHead(302, {
        Location: url,
        "Content-Type": "text/plain",
        "Content-Length": str.length,
      });
      res.end(str);
    }
  }
  res.end();
}
