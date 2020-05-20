import { Router } from "@beyonk/sapper-rbac";
import scopes from "../utils/scopes";

/* 
SCOPES:
- super (for me only)
- admin (for the head of an org)
- consultant (any business builder)
- guest
*/

const routes = new Router()
  .unrestrict("/login")
  .unrestrict("/check-auth")
  .unrestrict("/verify-email")
  .unrestrict("/logout.*")
  .restrict("/admin.*", [scopes.adminScope])
  .restrict("/profile.*", [
    scopes.superScope,
    scopes.adminScope,
    scopes.consultantScope,
    scopes.guestScope,
  ])
  .restrict("/.*", [
    scopes.superScope,
    scopes.adminScope,
    scopes.consultantScope,
    scopes.guestScope,
  ])
  // add this after the guarded sub-urls
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
