<script>
  import { goto, stores } from "@sapper/app";
  import scopes from "../utils/scopes";

  const { session } = stores();
</script>

<svelte:head>
  <title>30 Days</title>
</svelte:head>
{#if $session.authenticated}
  {#if $session.profile.scope.includes(scopes.superScope)}WE HAVE A SUPER{/if}
  {#if $session.profile.scope.includes(scopes.adminScope)}WE HAVE AN ADMIN{/if}
  <p>You are logged in as {$session.profile.firstName}</p>
  <a href="/logout">logout</a>
  <a href="/profile">profile</a>
{/if}
