<template>
  <div class="content__constructor">
    <div
        class="pizza"
        :class="{
          'pizza--foundation--small-tomato': pizzaStore.doughId === 1 && pizzaStore.sauceId === 1,
          'pizza--foundation--big-tomato': pizzaStore.doughId === 2 && pizzaStore.sauceId === 1,
          'pizza--foundation--big-creamy': pizzaStore.doughId === 2 && pizzaStore.sauceId === 2,
          'pizza--foundation--small-creamy': pizzaStore.doughId === 1 && pizzaStore.sauceId === 2
        }"
    >
      <app-drop
          @drop="moveIngredient"
          class="pizza__wrapper"
      >
        <transition-group name="ingredients">
          <div
              v-for="ingredient in pizzaStore.ingredients"
              :key="ingredient.id"
              class="pizza__filling"
              :class="generateFillingClass(ingredient.value, ingredient.count)"
          >
          </div>
        </transition-group>
      </app-drop>
    </div>
  </div>
</template>

<script setup>
import AppDrop from "@/common/components/AppDrop.vue";
import AppButton from "@/common/components/AppButton.vue";

import {usePizzaStore} from "@/store";

const pizzaStore = usePizzaStore()


const emits = defineEmits(['drop'])

function moveIngredient(ingredient) {
  pizzaStore.incrementCount(ingredient)
}

function generateFillingClass(value, count) {
  if (count < 1) return false
  let fillingClass = 'pizza__filling--' + value
  let countClass = ''
  if (count === 2) {
    countClass = 'pizza__filling--second'
  } else if (count === 3) {
    countClass = 'pizza__filling--third'
  }
  return fillingClass + ' ' + countClass
}

// console.log('con res',props.pizza)
</script>

<style lang="scss" scoped>
.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  $bl: &;
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &::before,
  &::after {
    display: none;
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    content: "";

    background-image: inherit;
  }

  &--second {

    transition: all 0.5s ease;
    opacity: 1;
    &::before {
      display: block;
      transform: rotate(45deg);
    }
  }

  &--third {

    transition: all 0.5s ease;
    opacity: 1;
    &::before {
      display: block;
      transform: rotate(45deg);
    }

    &::after {
      display: block;
      transform: rotate(-45deg);
    }
  }

  &--ananas,
  &--ananas.pizza__filling--second::before,
  &--ananas.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/ananas.svg");
  }

  &--bacon,
  &--bacon.pizza__filling--second::before,
  &--bacon.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese,
  &--blue.pizza__filling--second::before,
  &--blue.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar,
  &--cheddar.pizza__filling--second::before,
  &--cheddar.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/cheddar.svg");
  }

  &--chile,
  &--chile.pizza__filling--second::before,
  &--chile.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/chile.svg");
  }

  &--ham,
  &--ham.pizza__filling--second::before,
  &--ham.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno,
  &--jalapeno.pizza__filling--second::before,
  &--jalapeno.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella,
  &--mozzarella.pizza__filling--second::before,
  &--mozzarella.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms,
  &--mushrooms.pizza__filling--second::before,
  &--mushrooms.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives,
  &--olives.pizza__filling--second::before,
  &--olives.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/olives.svg");
  }

  &--onion,
  &--onion.pizza__filling--second::before,
  &--onion.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/onion.svg");
  }

  &--parmesan,
  &--parmesan.pizza__filling--second::before,
  &--parmesan.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/parmesan.svg");
  }

  &--salami,
  &---salami.pizza__filling--second::before,
  &---salami.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/salami.svg");
  }

  &--salmon,
  &--salmon.pizza__filling--second::before,
  &--salmon.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes,
  &--tomatoes.pizza__filling--second::before,
  &--tomatoes.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/tomatoes.svg");
  }
}

.ingredients-enter-active,
.ingredients-leave-active {
  transition: all 0.5s ease;
}

.ingredients-enter-from,
.ingredients-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

@keyframes zoom {
  0% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>