<script>
  import { goto, stores } from "@sapper/app";
  import authStore from "../../stores/auth-store";

  const { session } = stores();

  let email = "test@test.com";

  async function submitForm() {
    authStore.login(email);
  }
</script>

<svelte:head>
  <title>30 Days - Login</title>
</svelte:head>

{#if $session.authenticated}
  you are already logged in
{:else if $authStore.emailSent}
  email was sent. you can close this window
{:else}
  <form on:submit|preventDefault={submitForm}>
    <input type="text" bind:value={email} placeholder="Your Email" />
    <button type="submit" disabled={!email}>Log in</button>
  </form>
{/if}
{#if $authStore.error}{$authStore.message}{/if}
