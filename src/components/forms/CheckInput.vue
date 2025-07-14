<template>
  <div class="mb-3">
    <input class="form-check-input" type="checkbox" :checked="checked" :required="required" :value="value" :id="name">
    <label class="form-check-label" :for="name">{{ label }}</label>
  </div>
</template>

<script setup>
const props = defineProps([
  "label", "required", "name", "value", "checked",
])
</script>
