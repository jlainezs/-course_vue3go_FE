<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Login</h1>
        <hr/>

        <form-tag method="POST" action="/login">
          <text-input
            label="Email"
            type="email"
            name="email"
            required="true"/>
          <text-input
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

<script setup>
import TextInput from "@/components/forms/TextInput.vue";
import FormTag from "@/components/forms/FormTag.vue";

</script>

<style scoped>

</style>
