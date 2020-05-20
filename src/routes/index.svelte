<script>
  import { goto, stores } from "@sapper/app";
  import authStore from "../stores/auth-store";

  const { session } = stores();

  let email = "test@test.com";

  async function submitForm() {
    authStore.login(email);
  }
</script>

<svelte:head>
  <title>30 Days</title>
</svelte:head>
{#if $session.authenticated}
  {#if $session.profile.scope.includes('super')}WE HAVE A SUPER{/if}
  {#if $session.profile.scope.includes('admin')}WE HAVE AN ADMIN{/if}
  <p>You are logged in as {$session.profile.firstName}</p>
{:else if $authStore.emailSent}
  email was sent. you can close this window
{:else}
  <form on:submit|preventDefault={submitForm}>
    <input type="text" bind:value={email} placeholder="Your Email" />
    <button type="submit" disabled={!email}>Log in</button>
  </form>
{/if}
{#if $authStore.error}{$authStore.message}{/if}
