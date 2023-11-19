<template>
  <div
      class="content__diameter"
  >
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
            v-for="size in items"
            :key="size.id"
            class="diameter__input"
            :class="`diameter__input--${size.value}`"
            @click="emits('update:modelValue', size.id)"
        >
          <input
              type="radio"
              name="diameter"
              :value=size.value
              class="visually-hidden"
              :checked = 'size.id === pizza.sizeId'
          >
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDataStore, usePizzaStore} from "@/store";
const data = useDataStore(),
      pizza = usePizzaStore()

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])
</script>