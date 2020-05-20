import { post } from "../../utils/post";
import {
  deleteAccessCookie,
  deleteRefreshCookie,
} from "../../utils/create-cookie";

export async function get(req, res, next) {
  // check for refreshToken
  const refreshToken = req.cookies["refreshToken"];

  // call api with token
  try {
    const request = await post(
      "http://localhost:5000/api/v1/users/revoke-tokens",
      { refreshToken }
    );

    if (request.status === "success") {
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
  } catch (error) {}
}
