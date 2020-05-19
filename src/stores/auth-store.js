import { writable } from "svelte/store";
import { goto } from "@sapper/app";

import { post } from "../utils/post";

const authStore = writable({
  loading: false,
  error: false,
  message: null,
  emailSent: false,
});

const customAuthStore = {
  subscribe: authStore.subscribe,

  /* Request magic link */
  login: async (email) => {
    authStore.update((currentState) => {
      return { ...currentState, loading: true };
    });
    try {
      const request = await post("http://localhost:5000/api/v1/users/login", {
        email,
      });
      if (request.status === "success") {
        authStore.update((currentState) => {
          return { ...currentState, loading: false, emailSent: true };
        });
      } else {
        throw new Error("User Not Found");
      }
    } catch (error) {
      authStore.update((currentState) => {
        return {
          ...currentState,
          loading: false,
          emailSent: false,
          error: true,
          message: error.message,
        };
      });
    }
  },
};

export default customAuthStore;
