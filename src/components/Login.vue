<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Login</h1>
        <hr/>

        <form-tag @myevent="submitHandler" name="myform" event="myevent">
          <text-input
            v-model="email"
            label="Email"
            type="email"
            name="email"
            required="true"/>
          <text-input
            v-model="password"
            label="Password"
            type="password"
            name="password"
            required="true"/>
          <hr/>
          <input type="submit" class="btn btn-primary" value="Login" />
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/forms/TextInput.vue"
import FormTag from "@/components/forms/FormTag.vue"
import { store } from "./store.js"
import router from "./../router/index.js"
import notie from "notie";
import Security from "./security.js";

// this is using options API
export default {
  name: "login",
  components: {
    FormTag,
    TextInput
  },
  data() {
    return {
      email: "",
      password: "",
      store,
    }
  },
  methods: {
    submitHandler() {
      const payload = {
        email: this.email,
        password: this.password
      }

      fetch(import.meta.env.VITE_API_URL + "/users/login", Security.requestOptions(payload))
      .then(response => response.json())
      .then((response) => {
        if (response.error) {
          notie.alert({
            type: "error",
            text: response.message,
          });
        } else {
          store.token = response.data.token.token;
          store.user = {
            id: response.data.user.id,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            email: response.data.user.email,
          }

          // save into a cookie
          let date = new Date();
          let expDays = 1;
          date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
          const expires = "expires=" + date.toUTCString();

          document.cookie = "_site_data="
            + JSON.stringify(response.data)
            + "; "
            + expires
            + "; path=/; SameSite=strict; Secure;";
          router.push("/");
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
