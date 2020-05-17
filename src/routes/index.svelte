<script>
  import { goto, stores } from "@sapper/app";

  const { session } = stores();

  let email = null;

  async function login() {
    await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    });

    //window.location.href = "profile";
  }
</script>

<svelte:head>
  <title>30 Days</title>
</svelte:head>

{#if $session.authenticated}
  <p>You are logged in as {$session.profile.name}</p>
{:else}
  <form>
    <input type="text" bind:value={email} placeholder="Your Email" />
    <button type="button" disabled={!email} on:click={login}>Log in</button>
  </form>
{/if}
