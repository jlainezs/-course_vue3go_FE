<template>
  <div class="mb-3">
    <label :for="name" class="form-label">{{ label }}</label>
    <select :id="name" class="form-select" :name="name" :required="required">
      <option v-for="option in items" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps([
  "items", "name", "required", "label"
])
</script>
