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
  <p>You are logged in as {$session.profile.name}</p>
{:else}
  <div>
    {#if $authStore.emailSent}
      email was sent
    {:else}
      <form on:submit|preventDefault={submitForm}>
        <input type="text" bind:value={email} placeholder="Your Email" />
        <button type="submit" disabled={!email}>Log in</button>
      </form>
    {/if}
  </div>
{/if}
