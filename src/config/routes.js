import { Router } from "@beyonk/sapper-rbac";

const routes = new Router()
  .restrict("/admin.*", ["admin"])
  .restrict("/organisation.*", ["owner"])
  .restrict("/profile.*", ["admin", "owner", "user"])
  .unrestrict("/.*") // add this after the guarded sub-urls
  .build();

export default routes;

/* 
LOGIN IS THE ONLY OPEN ROUTE
if a route is restricted, a user must have one of the included scopes to access it
if they do not have that scope, they will be redirected, in this case to the check auth server route
if they have a valid access token, it means they are trying to hit a route they are not authorized for
    - redirect back to referring route
if they dont have access token, but do have a refresh token, they need to get new tokens
    - redirect back to referring route
if they have neither access or refresh token, they need to be redirected to login
    - redirect to login
*/
