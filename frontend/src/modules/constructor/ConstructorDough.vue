<template>
  <div
      class="content__dough"
  >
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
            v-for="doughItem in data.dough"
            :key="doughItem.id"
            class="dough__input"
            :class="`dough__input--${doughItem.value}`"
            @click="selectDough(doughItem.id)"
        >
          <input
              type="radio"
              name="dough"
              :value='doughItem.value'
              class="visually-hidden"
              :checked = 'doughItem.id === pizza.doughId'>
          <b>{{doughItem.name}}</b>
          <span>{{doughItem.description}}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useDataStore, usePizzaStore } from "@/store";
  const data = useDataStore()
  const pizza = usePizzaStore()

  console.log('hone', pizza)
  function selectDough(item){
    console.log('select dough', item)
    pizza.doughId = item
  }

</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds';
@import '@/assets/scss/mixins/mixins';
.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>