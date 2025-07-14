<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Login</h1>
        <hr/>

        <form method="POST" action="/login" class="needs-validation" novalidate>
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

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from "@/components/forms/TextInput.vue";
import {onMounted} from "vue";

onMounted(() => {
  'use strict';
  let forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
});

</script>

<style scoped>

</style>
