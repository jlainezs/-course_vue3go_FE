<template>
  <form autocomplete="off" :method="method" :action="action" class="needs-validation" novalidate>
    <slot/>
  </form>
</template>

<script setup>
import {onMounted} from "vue";

const props = defineProps([
  "method", "action",
])
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
