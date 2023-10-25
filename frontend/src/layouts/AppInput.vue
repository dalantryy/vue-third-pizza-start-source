<template>
  <div class="input-wrapper">
  <input
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
  />

    <div>{{errorText}}</div>
  </div>
</template>
<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    type:{
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    errorText: {
      type: String,
      required: true
    }
  })

  defineEmits(['update:modelValue'])

  console.log(props.modelValue)
</script>