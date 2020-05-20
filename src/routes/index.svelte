<script>
  import { goto, stores } from "@sapper/app";

  const { session } = stores();
</script>

<svelte:head>
  <title>30 Days</title>
</svelte:head>
{#if $session.authenticated}
  {#if $session.profile.scope.includes('super')}WE HAVE A SUPER{/if}
  {#if $session.profile.scope.includes('admin')}WE HAVE AN ADMIN{/if}
  <p>You are logged in as {$session.profile.firstName}</p>
{/if}
