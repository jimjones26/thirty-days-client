<script>
  import routes from "../config/routes";
  import { guard } from "@beyonk/sapper-rbac";
  import { tick } from "svelte";
  import { stores, goto } from "@sapper/app";

  const { page, session } = stores();

  const options = {
    routes,
    deny: (path, scope) => {
      goto(`/check-auth?path=${path}`);
    }
  };

  // Listen to the page store.
  page.subscribe(async v => {
    await tick(); // let the previous routing finish first.
    guard(v.path, $session.profile, options);
  });

  export let segment;
</script>

<style>

</style>

<main>
  <slot />
</main>
